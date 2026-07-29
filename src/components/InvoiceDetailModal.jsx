import React, { useState, useEffect, useRef } from 'react';
import { getSettings } from '../services/storage';
import { X, Printer, Receipt, ChevronDown, ChevronUp } from 'lucide-react';
import { CUTTINGS, NECKS, MATERIALS } from './InvoiceModal';
import { SIZES, getBasePrice, getSizeCost } from '../data/sizePricing';

const getPrintModeLabel = (mode) => {
  if (mode === 'Invoice') return 'Invoice';
  if (mode === 'DepositReceipt') return 'Deposit Receipt';
  if (mode === 'FullReceipt') return 'Full Receipt';
  return '';
};

const highlightTerms = (text) => {
  if (!text) return { __html: '' };
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
    
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  const keywords = [
    'two weeks', 
    'half payment', 
    'neither returnable nor refundable', 
    'cancellation fee of 20%'
  ];
  
  keywords.forEach(kw => {
    const regex = new RegExp(`(${kw})`, 'gi');
    html = html.replace(regex, '<strong>$1</strong>');
  });
  
  html = html.replace(/<strong><strong>(.*?)<\/strong><\/strong>/g, '<strong>$1</strong>');
  return { __html: html };
};
export default function InvoiceDetailModal({ invoice, onClose }) {
  const [settings, setSettings] = useState(null);
  const [printMode, setPrintMode] = useState('Invoice'); // 'Invoice' | 'DepositReceipt' | 'FullReceipt'
  const [controlsExpanded, setControlsExpanded] = useState(false);
  const [scale, setScale] = useState(1);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        // A4 sheet width is 210mm (approx 794px).
        // Scale to fit screen width with 16px margins on each side.
        const targetWidth = window.innerWidth - 32;
        const scaleFactor = Math.min(1, targetWidth / 794);
        setScale(scaleFactor);
      } else {
        setScale(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const lastTapRef = useRef(0);
  const handleDoubleTap = (e) => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (now - lastTapRef.current < DOUBLE_PRESS_DELAY) {
      setZoom(prev => (prev > 1 ? 1 : 1.8));
    }
    lastTapRef.current = now;
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const data = await getSettings();
    setSettings(data);
  };

  if (!settings) {
    return (
      <div className="modal-overlay">
        <div className="modal-content" style={{ maxWidth: '400px', padding: '2rem', textAlign: 'center' }}>
          Loading invoice...
        </div>
      </div>
    );
  }

  const parseBankAccount = (str) => {
    if (!str) return { number: '', name: '' };
    const match = str.match(/^(.*?)\s*\((.*?)\)\s*$/);
    if (match) {
      return {
        number: match[1].trim(),
        name: match[2].trim()
      };
    }
    return {
      number: str.trim(),
      name: ''
    };
  };

  // Helper: Format size breakdown string (e.g. "S(3), M(11), L(15)")
  const formatBreakdown = (sizesObj, sleeveType) => {
    const list = [];
    SIZES.forEach(size => {
      const qty = sizesObj[size]?.[sleeveType] || 0;
      if (qty > 0) {
        list.push(`${size}(${qty})`);
      }
    });
    return list.join(', ');
  };

  // Calculations for display
  const totalQty = invoice.items.reduce((total, item) => {
    return total + SIZES.reduce((itemTotal, size) => {
      const sQty = parseInt(item.sizes[size]?.short || 0, 10);
      const lQty = parseInt(item.sizes[size]?.long || 0, 10);
      return itemTotal + sQty + lQty;
    }, 0);
  }, 0);

  const basePrice = invoice.items[0]?.is_repeat_order 
    ? parseFloat(invoice.items[0].custom_base_price) || 0 
    : getBasePrice(totalQty);

  const calculateItemQty = (item) => {
    return SIZES.reduce((itemTotal, size) => {
      const sQty = parseInt(item.sizes[size]?.short || 0, 10);
      const lQty = parseInt(item.sizes[size]?.long || 0, 10);
      return itemTotal + sQty + lQty;
    }, 0);
  };

  const calculateItemSubtotal = (item, basePrice) => {
    let itemBaseTotal = 0;
    let itemAddonTotal = 0;

    const isRepeatOrder = item.is_repeat_order || false;
    const materialPrice = (isRepeatOrder && !item.material_addon) ? 0 : (MATERIALS.find(m => m.id === item.material)?.price || 0);
    const cuttingPrice = (isRepeatOrder && !item.cutting_addon) ? 0 : (CUTTINGS.find(c => c.id === item.cutting)?.price || 0);
    const neckPrice = (isRepeatOrder && !item.neck_addon) ? 0 : (NECKS.find(n => n.id === item.neck)?.price || 0);
    const nameSetPrice = item.name_set === 'Yes' ? ((isRepeatOrder && !item.name_set_addon) ? 0 : 3) : 0;
    const designWideAddons = materialPrice + cuttingPrice + neckPrice + nameSetPrice;

    SIZES.forEach(size => {
      const shortQty = parseInt(item.sizes[size]?.short || 0, 10);
      const longQty = parseInt(item.sizes[size]?.long || 0, 10);
      const subQty = shortQty + longQty;

      if (subQty > 0) {
        itemBaseTotal += subQty * basePrice;
        itemAddonTotal += subQty * designWideAddons;
        const sizeAddon = getSizeCost(size);
        itemAddonTotal += subQty * sizeAddon;
        itemAddonTotal += longQty * 5;
      }
    });

    return itemBaseTotal + itemAddonTotal;
  };

  const finalScale = scale * zoom;

  return (
    <div className="modal-overlay print-modal-overlay" onClick={onClose}>
      <div className="modal-content A4-modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Header Controls (Hides during printing) */}
        <div className="modal-header print-controls no-print" style={{ flexDirection: 'column', alignItems: 'stretch', gap: controlsExpanded ? '1rem' : '0' }}>
          
          {/* Always Visible Compact Bar */}
          <div className="print-compact-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            
            {/* Left Controls (Title, Active Selection, Print, & Zoom) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <div className="print-header-title">
                <span style={{ fontFamily: 'var(--font-primary)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-light)' }}>
                  Invoice Preview
                </span>
              </div>
              
              {/* Current Document Selection Trigger Button */}
              <button 
                onClick={() => setControlsExpanded(!controlsExpanded)}
                className="btn btn-secondary btn-sm active-preview-btn"
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', textTransform: 'uppercase' }}
              >
                {getPrintModeLabel(printMode)} {controlsExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </button>
              
              {/* Quick Print Button */}
              <button 
                onClick={() => window.print()} 
                className="btn btn-primary btn-sm"
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <Printer size={14} /> Print
              </button>

            </div>
            
            {/* Right Controls (Close Modal Button aligned to far right) */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button className="modal-close" onClick={onClose} style={{ display: 'flex', alignItems: 'center' }}>
                <X size={20} />
              </button>
            </div>

          </div>

          {/* Collapsible Options Panel */}
          {controlsExpanded && (
            <div className="print-selectors-panel" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', borderTop: '1px dashed var(--border-color)', paddingTop: '0.75rem' }}>
              <button 
                onClick={() => { setPrintMode('Invoice'); setControlsExpanded(false); }} 
                className={`btn btn-secondary btn-sm ${printMode === 'Invoice' ? 'active-preview-btn' : ''}`}
                style={{ flex: 1, minWidth: '100px' }}
              >
                Invoice
              </button>
              <button 
                onClick={() => { setPrintMode('DepositReceipt'); setControlsExpanded(false); }} 
                className={`btn btn-secondary btn-sm ${printMode === 'DepositReceipt' ? 'active-preview-btn' : ''}`}
                style={{ flex: 1, minWidth: '100px' }}
              >
                Deposit Receipt
              </button>
              <button 
                onClick={() => { setPrintMode('FullReceipt'); setControlsExpanded(false); }} 
                className={`btn btn-secondary btn-sm ${printMode === 'FullReceipt' ? 'active-preview-btn' : ''}`}
                style={{ flex: 1, minWidth: '100px' }}
              >
                Full Receipt
              </button>
            </div>
          )}
        </div>

        {/* Printable Area */}
        <div className="A4-scroll-wrapper" style={{ overflow: 'auto', flex: 1, padding: '1rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div 
            className="A4-scale-container" 
            onTouchEnd={handleDoubleTap}
            onDoubleClick={() => setZoom(prev => (prev > 1 ? 1 : 1.8))}
            style={{ 
              width: `${794 * finalScale}px`, 
              height: `${1122 * finalScale}px`, 
              overflow: 'hidden',
              flexShrink: 0,
              cursor: zoom > 1 ? 'zoom-out' : 'zoom-in'
            }}
          >
            <div 
              className="modal-body A4-sheet"
              style={{
                transform: `scale(${finalScale})`,
                transformOrigin: 'top left',
                margin: 0,
                flex: 'none',
                width: '210mm',
                height: '297mm',
                overflow: 'hidden'
              }}
            >
            <div className="invoice-container">
            
            {/* Header: Company Details (Left Aligned Stack) */}
            <div className="invoice-header print-avoid-break">
              <div className="company-info-block">
                {settings.company_logo ? (
                  <img src={settings.company_logo} alt="Company Logo" className="invoice-print-logo" />
                ) : (
                  <div className="logo-placeholder">{settings.company_name[0]}</div>
                )}
                <div className="company-text">
                  <h1 className="company-print-name">
                    {settings.company_name && settings.company_name.toUpperCase().includes('LAB') ? (
                      <>
                        {settings.company_name.toUpperCase().split('LAB')[0]}
                        <span style={{ color: 'var(--primary-red)' }}>LAB</span>
                        <sup style={{ color: 'var(--primary-red)', fontSize: '0.5em', fontWeight: '700' }}>&reg;</sup>
                        {settings.company_name.toUpperCase().split('LAB')[1]}
                      </>
                    ) : (
                      settings.company_name
                    )}
                  </h1>
                  <p className="company-print-details address">{settings.company_address}</p>
                  <p className="company-print-details">Tel: {settings.company_phone}</p>
                </div>
              </div>
            </div>

            {/* Document Title Block (Stacked below Header) */}
            <div className="document-meta-block print-avoid-break">
              <h2 className="document-type-title">
                {printMode === 'DepositReceipt' ? 'DEPOSIT RECEIPT' : printMode === 'FullReceipt' ? 'OFFICIAL RECEIPT' : 'INVOICE'}
              </h2>
              <div className="meta-details-box">
                <div className="meta-row">
                  <span className="meta-lbl">Invoice No:</span>
                  <span className="meta-val font-bold">{invoice.invoice_no}</span>
                </div>
                <div className="meta-row">
                  <span className="meta-lbl">Date:</span>
                  <span className="meta-val">{invoice.date}</span>
                </div>
              </div>
            </div>

            <hr className="divider-line print-avoid-break" />

            {/* Bill To & Job Name Details */}
            <div className="invoice-billing-block print-avoid-break">
              <span className="section-title-print">BILL TO:</span>
              <div className="billing-client-info">
                <h4 className="client-print-name">{invoice.client_name}</h4>
                <p className="client-print-phone">{invoice.client_phone}</p>
                {invoice.job_name && (
                  <p className="client-print-job">
                    <strong>Job Name:</strong> {invoice.job_name}
                  </p>
                )}
              </div>
            </div>

            <hr className="divider-line print-avoid-break" />

            {/* Items Table */}
            <div className="invoice-table-section">
              <table className="table invoice-print-table">
                <thead>
                  <tr>
                    <th style={{ width: '35px', textAlign: 'center' }}>No</th>
                    <th>Order Details</th>
                    <th style={{ width: '60px', textAlign: 'center' }}>Qty</th>
                    <th style={{ width: '90px', textAlign: 'center' }}>Price/pcs<br/>(RM)</th>
                    <th style={{ width: '90px', textAlign: 'center' }}>Total<br/>(RM)</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item, idx) => {
                    const itemQty = calculateItemQty(item);
                    // Fallback to dynamic calculation if subtotal is missing/old invoice
                    const itemSubtotal = item.subtotal !== undefined ? parseFloat(item.subtotal) : calculateItemSubtotal(item, basePrice);
                    const avgPrice = itemQty > 0 ? itemSubtotal / itemQty : basePrice;

                    const shortBreakdown = formatBreakdown(item.sizes, 'short');
                    const longBreakdown = formatBreakdown(item.sizes, 'long');

                    return (
                      <React.Fragment key={item.id}>
                        <tr className="print-avoid-break">
                          <td style={{ verticalAlign: 'top', textAlign: 'center' }}>{idx + 1}.</td>
                          <td>
                            <div className="print-item-desc">
                              <span className="print-design-name">Design: {item.design_name || 'Unnamed'}</span>
                              <div className="print-specs-row">
                                Material: {item.material} | Cutting: {item.cutting} | Neck: {item.neck} | Name Set: {item.name_set}
                              </div>
                              {shortBreakdown && (
                                <div className="print-breakdown-row">
                                  • Short Sleeve: {shortBreakdown}
                                </div>
                              )}
                              {longBreakdown && (
                                <div className="print-breakdown-row">
                                  • Long Sleeve (+RM5): {longBreakdown}
                                </div>
                              )}
                            </div>
                          </td>
                          <td style={{ textAlign: 'center', verticalAlign: 'top' }}>{itemQty}</td>
                          <td style={{ textAlign: 'center', verticalAlign: 'top' }}>
                            {avgPrice.toFixed(2)}
                          </td>
                          <td style={{ textAlign: 'center', verticalAlign: 'top' }} className="font-bold">
                            {itemSubtotal.toFixed(2)}
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <hr className="divider-line print-avoid-break" />

            {/* Calculations Summary Section (Right Aligned) */}
            <div className="invoice-calculations-section print-avoid-break">
              <div className="calculation-invoice-summary">
                <div className="summary-print-row">
                  <span>SUBTOTAL:</span>
                  <span>RM {parseFloat(invoice.subtotal).toFixed(2)}</span>
                </div>
                {parseFloat(invoice.discount_per_pcs) > 0 && (
                  <div className="summary-print-row">
                    <span>DISCOUNT (RM {invoice.discount_per_pcs}/pcs):</span>
                    <span>- RM {(parseFloat(invoice.discount_per_pcs) * totalQty).toFixed(2)}</span>
                  </div>
                )}
                <div className="summary-print-row grand-total-row-print">
                  <span>GRAND TOTAL:</span>
                  <span>RM {parseFloat(invoice.grand_total).toFixed(2)}</span>
                </div>

                {printMode === 'FullReceipt' && (
                  <>
                    <div className="summary-print-row receipt-highlight-row">
                      <span>TOTAL PAID:</span>
                      <span>RM {parseFloat(invoice.grand_total).toFixed(2)}</span>
                    </div>
                    <div className="summary-print-row">
                      <span>BALANCE:</span>
                      <span>RM 0.00</span>
                    </div>
                  </>
                )}

                {printMode === 'DepositReceipt' && (
                  <>
                    <div className="summary-print-row receipt-highlight-row">
                      <span>AMOUNT PAID (DEPOSIT):</span>
                      <span>RM {parseFloat(invoice.deposit || 0).toFixed(2)}</span>
                    </div>
                    <div className="summary-print-row balance-row-print">
                      <span>BALANCE DUE:</span>
                      <span>RM {parseFloat(invoice.balance ?? invoice.grand_total).toFixed(2)}</span>
                    </div>
                  </>
                )}

                {printMode === 'Invoice' && (
                  <>
                    <div className="summary-print-row">
                      <span>DEPOSIT:</span>
                      <span>RM {parseFloat(invoice.deposit || 0).toFixed(2)}</span>
                    </div>
                    <div className="summary-print-row balance-row-print">
                      <span>BALANCE DUE:</span>
                      <span>RM {parseFloat(invoice.balance ?? invoice.grand_total).toFixed(2)}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <hr className="divider-line print-avoid-break" />

            {/* Bottom Grid: T&C (Left), Bank Info (Right) */}
            <div className="invoice-bottom-grid print-avoid-break">
              <div className="bottom-grid-left">
                {settings.terms && (
                  <div className="terms-container">
                    <span className="section-title-print">Terms & Conditions:</span>
                    <ol className="terms-list">
                      {settings.terms.split('\n').map((line, i) => (
                        <li key={i} dangerouslySetInnerHTML={highlightTerms(line)} />
                      ))}
                    </ol>
                  </div>
                )}
              </div>

              <div className="bottom-grid-right">
                {(settings.bank_name || settings.bank_account) && (() => {
                  const parsedBank = parseBankAccount(settings.bank_account);
                  return (
                    <div className="payment-bank-details">
                      <span className="section-title-print">Payment Details:</span>
                      <p className="bank-info-line"><strong>{settings.bank_name}</strong></p>
                      <p className="bank-info-line">{parsedBank.number}</p>
                      {parsedBank.name && <p className="bank-info-line">{parsedBank.name}</p>}
                    </div>
                  );
                })()}
              </div>
            </div>

            <hr className="divider-line print-avoid-break" />

            {/* Centered Thank You Footer */}
            <div className="thank-you-footer print-avoid-break">
              <p>THANK YOU FOR CHOOSING THIRTYONE LAB!</p>
              <p style={{ textTransform: 'none', fontWeight: '500', fontStyle: 'italic', letterSpacing: '0.5px', marginTop: '0.15rem', color: '#777', fontSize: '0.6rem' }}>Wear With Pride.</p>
            </div>

          </div>
        </div>
        </div>
      </div>

      </div>

      <style>{`
        /* Styling for the modal overlay holding the sheet */
        .print-modal-overlay {
          background-color: rgba(0, 0, 0, 0.6);
          overflow-y: auto;
          padding: 1.5rem 0;
          align-items: flex-start;
        }

        .A4-modal-container {
          width: 210mm;
          min-height: auto;
          margin: 0 auto;
          background-color: transparent;
          box-shadow: none;
        }

        .print-controls {
          background: #fff;
          border-bottom: 1px solid var(--border-color);
          padding: 0.75rem 1.5rem;
          margin-bottom: 0.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .print-controls-right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .active-preview-btn {
          background-color: var(--text-dark) !important;
          color: #fff !important;
          border-color: var(--text-dark) !important;
        }

        /* Styling for the A4 Sheet container - compressed layout to fit exactly 1 page */
        .A4-sheet {
          width: 210mm;
          height: 297mm; /* Exactly 29.7 cm */
          box-sizing: border-box;
          background: #ffffff;
          padding: 12mm;
          box-shadow: none;
          border: 1px solid var(--border-color);
          margin: 0 auto;
          overflow: hidden;
        }

        .invoice-container {
          font-family: var(--font-secondary);
          color: #111111;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          height: 100%;
          justify-content: space-between;
        }

        .invoice-table-section {
          flex-grow: 1;
        }

        /* Header block styles */
        .invoice-header {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
        }

        .company-info-block {
          display: flex;
          gap: 1rem;
          align-items: center;
          flex: 1;
        }

        .invoice-print-logo {
          height: 52px;
          max-width: 120px;
          object-fit: contain;
        }

        .logo-placeholder {
          height: 44px;
          width: 44px;
          background-color: var(--primary-red);
          color: #fff;
          font-family: var(--font-primary);
          font-weight: 800;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .company-print-name {
          font-family: var(--font-primary);
          font-size: 1.05rem;
          font-weight: 800;
          letter-spacing: 0.5px;
          margin-bottom: 0.1rem;
          color: #111111;
        }

        .company-print-details {
          font-size: 0.68rem;
          color: #555555;
          line-height: 1.25;
        }

        .company-print-details.address {
          max-width: 320px;
        }

        /* Document Metadata Block (Left Aligned Stack) */
        .document-meta-block {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-top: 0.25rem;
        }

        .document-type-title {
          font-family: var(--font-primary);
          font-size: 1.2rem;
          font-weight: 900;
          letter-spacing: 1px;
          color: var(--primary-red);
          margin-bottom: 0.15rem;
        }

        .meta-details-box {
          font-size: 0.72rem;
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }

        .meta-row {
          display: flex;
          justify-content: flex-start;
          gap: 0.5rem;
        }

        .meta-lbl {
          color: #555555;
          min-width: 75px;
        }

        .meta-val {
          color: #111111;
        }

        .divider-line {
          border: none;
          border-top: 1px solid #111111;
          margin: 0.15rem 0;
        }

        /* Billing / Customer Block */
        .invoice-billing-block {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          padding: 0.1rem 0;
        }

        .section-title-print {
          font-family: var(--font-primary);
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 1px;
          color: #111111;
          text-transform: uppercase;
          margin-bottom: 0.1rem;
        }

        .billing-client-info {
          display: flex;
          flex-direction: column;
          gap: 0.05rem;
        }

        .client-print-name {
          font-size: 0.85rem;
          font-weight: 700;
          color: #111111;
        }

        .client-print-phone {
          font-size: 0.75rem;
          color: #555555;
        }

        .client-print-job {
          font-size: 0.75rem;
          color: #111111;
        }

        /* Table design */
        .invoice-print-table {
          width: 100%;
          margin: 0.15rem 0;
        }

        .invoice-print-table th {
          border-bottom: 2px solid #111111 !important;
          color: #111111 !important;
          padding: 0.35rem 0.25rem !important;
          font-size: 0.65rem !important;
          text-transform: uppercase;
        }

        .invoice-print-table td {
          border-bottom: 1px solid #e6e2dc !important;
          padding: 0.5rem 0.25rem !important;
          font-size: 0.72rem !important;
          color: #111111 !important;
        }

        .print-item-desc {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }

        .print-design-name {
          font-weight: 700;
          font-size: 0.78rem;
        }

        .print-specs-row {
          font-size: 0.68rem;
          color: #555555;
        }

        .print-breakdown-row {
          font-size: 0.68rem;
          font-weight: 500;
          color: #222;
        }

        /* Calculations Row Alignment */
        .invoice-calculations-section {
          display: flex;
          justify-content: flex-end;
          width: 100%;
          padding: 0.1rem 0;
        }

        .calculation-invoice-summary {
          width: 240px;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          font-size: 0.72rem;
        }

        .summary-print-row {
          display: flex;
          justify-content: space-between;
          color: #555555;
        }

        .grand-total-row-print {
          font-family: var(--font-primary);
          font-weight: 800;
          color: #111111;
          font-size: 0.78rem;
          border-top: 1px solid #111111;
          padding-top: 0.3rem;
          margin-top: 0.1rem;
        }

        .balance-row-print {
          font-weight: 700;
          color: var(--primary-red);
          border-top: 1px dashed #e6e2dc;
          padding-top: 0.3rem;
        }

        .receipt-highlight-row {
          font-weight: 700;
          color: #15803D;
          border-top: 1px dashed #e6e2dc;
          padding-top: 0.3rem;
        }

        /* Bottom grid split (T&C on left, QR on right) */
        .invoice-bottom-grid {
          display: grid;
          grid-template-columns: 1.3fr 0.7fr;
          gap: 1.5rem;
          padding: 0.15rem 0;
        }

        .bottom-grid-left {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .bottom-grid-right {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .terms-container {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .terms-list {
          padding-left: 0.8rem;
          font-size: 0.62rem;
          color: #555555;
          line-height: 1.3;
        }

        .payment-bank-details {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          gap: 0.2rem;
        }

        .bank-info-line {
          font-size: 0.72rem;
          color: #222222;
        }

        .thank-you-footer {
          text-align: center;
          font-family: var(--font-primary);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #555555;
          margin-top: 0.5rem;
        }

        @media screen and (max-width: 768px) {
          .print-header-title {
            display: none !important;
          }
          .print-controls {
            padding: 0.6rem 0.75rem !important;
          }
          .print-modal-overlay {
            padding: 0;
          }
          .A4-modal-container {
            width: 100%;
          }
          .A4-scroll-wrapper {
            width: 100%;
            overflow-x: auto;
            background-color: var(--border-color);
            padding: 1rem 0;
          }
          .A4-sheet {
            width: 210mm; /* Keep A4 width to prevent squishing */
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  );
}
