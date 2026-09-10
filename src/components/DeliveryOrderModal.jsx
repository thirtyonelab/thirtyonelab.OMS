import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Printer, FileText, Receipt, CheckCircle2, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function DeliveryOrderModal({ isOpen, onClose, invoice, settings, postageData, initialMode = 'invoice' }) {
  const { tr } = useLanguage();
  const [docMode, setDocMode] = useState(initialMode); // 'invoice' | 'receipt'
  const [scale, setScale] = useState(1);
  const [zoom, setZoom] = useState(1);
  const lastTapRef = useRef(0);

  useEffect(() => {
    setDocMode(initialMode || 'invoice');
  }, [initialMode, isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
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

  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (now - lastTapRef.current < DOUBLE_PRESS_DELAY) {
      setZoom(prev => (prev > 1 ? 1 : 1.8));
    }
    lastTapRef.current = now;
  };

  if (!isOpen || !invoice) return null;

  const companyName = settings?.company_name || 'THIRTYONE LAB';
  const companyAddress = settings?.company_address || 'No 12, Jalan Niaga 1, 43000 Kajang, Selangor';
  const companyPhone = settings?.company_phone || '012-3456789';
  const bankName = settings?.bank_name || 'Maybank';
  const bankAccount = settings?.bank_account || '5622 6300 0000 (THIRTYONE LAB)';

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

  const parsedBank = parseBankAccount(bankAccount);

  // Clean invoice number without redundant 'NO.'
  const invoiceNumClean = (invoice.invoice_no || '').replace(/^NO\.\s*/i, '').replace(/^#/, '').trim();
  const docInvoiceNo = `INV-DEL-${invoiceNumClean}`;
  const docReceiptNo = `RCP-DEL-${invoiceNumClean}`;

  const courierName = (postageData?.postage_courier || invoice.postage_courier || 'Courier Service').toUpperCase();
  const trackingNo = (postageData?.postage_tracking || invoice.postage_tracking || '').toUpperCase();
  const hasTracking = trackingNo && trackingNo !== '-' && trackingNo.trim() !== '';
  
  // All Uppercase for client details and shipping destination
  const clientName = (invoice.client_name || '').toUpperCase();
  const jobName = (invoice.job_name || '').toUpperCase();
  const rawShippingAddress = postageData?.client_address || invoice.client_address || 'ADDRESS NOT PROVIDED';
  const shippingAddress = rawShippingAddress.toUpperCase();

  const deliveryFee = parseFloat(postageData?.delivery_fee !== undefined ? postageData.delivery_fee : (invoice.delivery_fee || 0));
  const deliveryStatus = postageData?.delivery_payment_status || invoice.delivery_payment_status || 'Unpaid';
  const isPaid = deliveryStatus === 'Paid';
  const todayStr = new Date().toISOString().split('T')[0];
  const paidDate = postageData?.delivery_paid_date || invoice.delivery_paid_date || todayStr;
  const paymentMethod = (postageData?.delivery_payment_method || invoice.delivery_payment_method || 'Online Banking / DuitNow').toUpperCase();

  // Calculate items breakdown cleanly
  const items = invoice.items || [];
  let totalPieces = 0;

  items.forEach((item) => {
    let qty = 0;
    if (item.item_type === 'banner') {
      qty = parseInt(item.qty || 0, 10);
    } else if (item.sizes) {
      Object.entries(item.sizes).forEach(([, s]) => {
        const itemPcs = parseInt(s?.short || 0, 10) + parseInt(s?.long || 0, 10) + parseInt(s?.pants || 0, 10);
        qty += itemPcs;
      });
    } else {
      qty = parseInt(item.qty || 0, 10);
    }
    totalPieces += qty;
  });

  const finalScale = scale * zoom;

  const modalContent = (
    <div className="modal-overlay print-modal-overlay" onClick={onClose}>
      <div className="modal-content A4-modal-container" onClick={e => e.stopPropagation()} style={{ maxWidth: '840px' }}>
        
        {/* Controls Bar (Hidden during Print) - Exactly matched with InvoiceDetailModal */}
        <div className="modal-header print-controls no-print" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
          <div className="print-compact-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            
            {/* Left Controls: Title, Document Switcher, Print */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <div className="print-header-title">
                <span style={{ fontFamily: 'var(--font-primary)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-light)' }}>
                  Delivery Preview
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => setDocMode('invoice')}
                  className={`btn btn-sm ${docMode === 'invoice' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', textTransform: 'uppercase' }}
                >
                  <FileText size={12} /> Delivery Invoice
                </button>
                <button
                  type="button"
                  onClick={() => setDocMode('receipt')}
                  className={`btn btn-sm ${docMode === 'receipt' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', textTransform: 'uppercase' }}
                >
                  <Receipt size={12} /> Delivery Receipt
                </button>
              </div>

              <button 
                type="button"
                onClick={() => window.print()} 
                className="btn btn-primary btn-sm" 
                style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <Printer size={13} /> {tr('print')}
              </button>
            </div>

            {/* Right Controls: Close Modal */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button 
                className="modal-close" 
                onClick={onClose} 
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Printable Area Wrapper */}
        <div className="A4-scroll-wrapper" style={{ overflow: 'auto', flex: 1, padding: '0.5rem 0 1.5rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f1f5f9' }}>
          
          <div
            className="A4-scale-container"
            onTouchEnd={handleDoubleTap}
            onDoubleClick={() => setZoom(prev => (prev > 1 ? 1 : 1.8))}
            style={{
              width: `${794 * finalScale}px`,
              height: `${1122 * finalScale}px`,
              overflow: 'visible',
              flexShrink: 0,
              cursor: zoom > 1 ? 'zoom-out' : 'zoom-in'
            }}
          >
            <div className="A4-sheet" style={{
              width: '210mm',
              minHeight: '297mm',
              padding: '12mm',
              boxSizing: 'border-box',
              background: '#ffffff',
              border: 'none',
              overflow: 'visible',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transform: `scale(${finalScale})`,
              transformOrigin: 'top left',
              color: '#111111',
              fontFamily: 'var(--font-secondary, "Inter", sans-serif)'
            }}>
              
              <div className="invoice-container" style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                
                {/* 1. Header: Company Info Block */}
                <div className="invoice-header print-avoid-break" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                  <div className="company-info-block" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flex: 1 }}>
                    {settings?.company_logo ? (
                      <img src={settings.company_logo} alt="Company Logo" className="invoice-print-logo" style={{ maxHeight: '52px', maxWidth: '120px', objectFit: 'contain' }} />
                    ) : (
                      <img src={`${import.meta.env.BASE_URL}Logo%20Header.webp`} alt="Company Logo" className="invoice-print-logo" style={{ maxHeight: '52px', maxWidth: '120px', objectFit: 'contain' }} />
                    )}
                    <div className="company-text">
                      <h1 className="company-print-name" style={{ fontFamily: 'var(--font-primary)', fontSize: '1.05rem', fontWeight: 800, letterSpacing: '0.5px', margin: 0, color: '#111111' }}>
                        {companyName.toUpperCase().includes('LAB') ? (
                          <>
                            {companyName.toUpperCase().split('LAB')[0]}
                            <span style={{ color: 'var(--primary-red, #C51B27)' }}>LAB</span>
                            <sup style={{ color: 'var(--primary-red, #C51B27)', fontSize: '0.5em', fontWeight: '700' }}>&reg;</sup>
                            {companyName.toUpperCase().split('LAB')[1]}
                          </>
                        ) : (
                          companyName
                        )}
                      </h1>
                      <p className="company-print-details address" style={{ fontSize: '0.68rem', color: '#555555', lineHeight: 1.25, margin: '0.1rem 0 0 0', maxWidth: '340px', textTransform: 'uppercase' }}>
                        {companyAddress}
                      </p>
                      <p className="company-print-details" style={{ fontSize: '0.68rem', color: '#555555', lineHeight: 1.25, margin: 0 }}>
                        TEL: {companyPhone}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Document Meta Block (Matched to InvoiceDetailModal) */}
                <div className="document-meta-block print-avoid-break" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '0.2rem' }}>
                  <div>
                    <h2 className="document-type-title" style={{ fontFamily: 'var(--font-primary)', fontSize: '1.2rem', fontWeight: 900, letterSpacing: '1px', color: 'var(--primary-red, #C51B27)', margin: 0, textTransform: 'uppercase' }}>
                      {docMode === 'invoice' ? 'DELIVERY INVOICE' : 'DELIVERY RECEIPT'}
                    </h2>
                    <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#555555', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '1px', fontFamily: 'var(--font-primary)' }}>
                      {docMode === 'invoice' ? 'PAYMENT REQUEST FOR SHIPPING & DELIVERY' : 'OFFICIAL RECEIPT FOR DELIVERY SERVICES'}
                    </div>
                  </div>

                  <div className="meta-details-box" style={{ 
                    fontSize: '0.72rem', 
                    display: 'grid', 
                    gridTemplateColumns: 'auto auto', 
                    columnGap: '0.65rem',
                    rowGap: '0.15rem',
                    alignItems: 'center',
                    justifyContent: 'end'
                  }}>
                    <span style={{ color: '#555555', fontFamily: 'var(--font-primary)', fontWeight: 700, fontSize: '0.65rem', textAlign: 'left' }}>DOCUMENT NO:</span>
                    <span style={{ color: '#111111', fontWeight: 800, fontFamily: 'var(--font-primary)', fontSize: '0.75rem', textAlign: 'left' }}>{docMode === 'invoice' ? docInvoiceNo : docReceiptNo}</span>

                    <span style={{ color: '#555555', fontFamily: 'var(--font-primary)', fontWeight: 700, fontSize: '0.65rem', textAlign: 'left' }}>DATE:</span>
                    <span style={{ color: '#111111', fontFamily: 'var(--font-primary)', fontSize: '0.72rem', textAlign: 'left' }}>{docMode === 'invoice' ? todayStr : paidDate}</span>

                    <span style={{ color: '#555555', fontFamily: 'var(--font-primary)', fontWeight: 700, fontSize: '0.65rem', textAlign: 'left' }}>INVOICE REF:</span>
                    <span style={{ color: '#111111', fontWeight: 700, fontFamily: 'var(--font-primary)', fontSize: '0.72rem', textAlign: 'left' }}>#{invoiceNumClean}</span>
                  </div>
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid #111111', margin: '0.2rem 0' }} />

                {/* 3. Bill To & Shipping Destination (All UPPERCASE) */}
                <div className="invoice-billing-block print-avoid-break" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '2rem', padding: '0.1rem 0' }}>
                  <div>
                    <span className="section-title-print" style={{ fontFamily: 'var(--font-primary)', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '1px', color: '#111111', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
                      BILL TO:
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.05rem' }}>
                      <h4 className="client-print-name" style={{ fontFamily: 'var(--font-primary)', fontSize: '0.88rem', fontWeight: 800, color: '#111111', margin: 0, textTransform: 'uppercase' }}>
                        {clientName}
                      </h4>
                      <p style={{ fontSize: '0.75rem', color: '#555555', margin: '0.1rem 0 0 0' }}>
                        TEL: {invoice.client_phone}
                      </p>
                      {jobName && (
                        <p style={{ fontSize: '0.75rem', color: '#111111', margin: '0.15rem 0 0 0', textTransform: 'uppercase' }}>
                          <strong style={{ fontFamily: 'var(--font-primary)' }}>JOB NAME:</strong> {jobName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <span className="section-title-print" style={{ fontFamily: 'var(--font-primary)', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '1px', color: '#111111', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
                      SHIPPING DESTINATION:
                    </span>
                    <p style={{ fontSize: '0.75rem', color: '#111111', lineHeight: '1.35', whiteSpace: 'pre-wrap', margin: 0, textTransform: 'uppercase', fontWeight: 600 }}>
                      {shippingAddress}
                    </p>
                    <div style={{ marginTop: '0.35rem', fontSize: '0.72rem', color: '#555555', textTransform: 'uppercase' }}>
                      <strong style={{ fontFamily: 'var(--font-primary)' }}>COURIER SERVICE:</strong> <span style={{ color: '#111111', fontWeight: 800, fontFamily: 'var(--font-primary)' }}>{courierName}</span>
                    </div>
                  </div>
                </div>

                {/* 4. Tracking Bar (Receipt Mode) */}
                {docMode === 'receipt' && (
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.5rem 0.8rem',
                    border: '1.5px solid #111111',
                    backgroundColor: '#fafafa',
                    marginTop: '0.2rem',
                    marginBottom: '0.2rem',
                    textTransform: 'uppercase'
                  }}>
                    <div>
                      <span style={{ fontSize: '0.6rem', fontWeight: 800, color: '#64748b', display: 'block', fontFamily: 'var(--font-primary)' }}>COURIER SERVICE:</span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#111111', fontFamily: 'var(--font-primary)' }}>{courierName}</span>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.6rem', fontWeight: 800, color: '#64748b', display: 'block', fontFamily: 'var(--font-primary)' }}>TRACKING NUMBER:</span>
                      <span style={{ 
                        fontSize: '0.95rem', 
                        fontWeight: 900, 
                        fontFamily: 'var(--font-primary)', 
                        letterSpacing: '0.5px', 
                        color: hasTracking ? '#0f172a' : '#94a3b8' 
                      }}>
                        {hasTracking ? trackingNo : 'NOT ASSIGNED YET'}
                      </span>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.6rem', fontWeight: 800, color: '#64748b', display: 'block', fontFamily: 'var(--font-primary)' }}>DELIVERY STATUS:</span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#16A34A', fontFamily: 'var(--font-primary)' }}>
                        {(postageData?.postage_status || invoice.postage_status || 'PENDING').replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                )}

                <hr style={{ border: 'none', borderTop: '1px solid #111111', margin: '0.2rem 0' }} />

                {/* 5. Table Section (Clean Consignment Specifications) */}
                <div className="invoice-table-section" style={{ margin: '0.1rem 0' }}>
                  <table className="table invoice-print-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.72rem' }}>
                    <thead>
                      <tr>
                        <th style={{ borderBottom: '2px solid #111111', color: '#111111', padding: '0.45rem 0.4rem', fontSize: '0.65rem', textTransform: 'uppercase', width: '35px', textAlign: 'center', fontFamily: 'var(--font-primary)' }}>NO</th>
                        <th style={{ borderBottom: '2px solid #111111', color: '#111111', padding: '0.45rem 0.4rem', fontSize: '0.65rem', textTransform: 'uppercase', textAlign: 'left', fontFamily: 'var(--font-primary)' }}>ORDER DETAILS / DESCRIPTION</th>
                        <th style={{ borderBottom: '2px solid #111111', color: '#111111', padding: '0.45rem 0.4rem', fontSize: '0.65rem', textTransform: 'uppercase', width: '80px', textAlign: 'center', fontFamily: 'var(--font-primary)' }}>QTY</th>
                        <th style={{ borderBottom: '2px solid #111111', color: '#111111', padding: '0.45rem 0.4rem', fontSize: '0.65rem', textTransform: 'uppercase', width: '90px', textAlign: 'center', fontFamily: 'var(--font-primary)' }}>PRICE (RM)</th>
                        <th style={{ borderBottom: '2px solid #111111', color: '#111111', padding: '0.45rem 0.4rem', fontSize: '0.65rem', textTransform: 'uppercase', width: '90px', textAlign: 'center', fontFamily: 'var(--font-primary)' }}>TOTAL (RM)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ borderBottom: '1px solid #e6e2dc', padding: '0.75rem 0.4rem', textAlign: 'center', verticalAlign: 'middle', color: '#555555', fontFamily: 'var(--font-primary)', fontSize: '0.75rem' }}>1.</td>
                        <td style={{ borderBottom: '1px solid #e6e2dc', padding: '0.75rem 0.4rem', textAlign: 'left', verticalAlign: 'middle' }}>
                          <div style={{ fontWeight: 800, fontSize: '0.82rem', color: '#111111', textTransform: 'uppercase', fontFamily: 'var(--font-primary)', letterSpacing: '0.3px' }}>
                            {docMode === 'invoice' 
                              ? 'SHIPPING & COURIER DELIVERY SERVICE'
                              : 'COURIER DELIVERY & HANDLING SERVICE'
                            }
                          </div>
                          <div style={{ marginTop: '0.2rem', fontSize: '0.68rem', color: '#555555' }}>
                            <span style={{ color: '#777777', textTransform: 'uppercase', fontSize: '0.65rem', fontWeight: 700, marginRight: '0.35rem' }}>CONSIGNMENT:</span>
                            <strong style={{ color: '#111111', textTransform: 'uppercase', fontFamily: 'var(--font-primary)', fontSize: '0.72rem' }}>
                              {totalPieces} PCS {jobName ? `• ${jobName}` : '(APPAREL)'}
                            </strong>
                          </div>
                        </td>
                        <td style={{ borderBottom: '1px solid #e6e2dc', padding: '0.75rem 0.4rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700, whiteSpace: 'nowrap', textTransform: 'uppercase', fontFamily: 'var(--font-primary)', fontSize: '0.78rem' }}>
                          1 PKG
                        </td>
                        <td style={{ borderBottom: '1px solid #e6e2dc', padding: '0.75rem 0.4rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 600, fontFamily: 'var(--font-primary)', fontSize: '0.8rem', color: '#111111' }}>
                          {deliveryFee.toFixed(2)}
                        </td>
                        <td style={{ borderBottom: '1px solid #e6e2dc', padding: '0.75rem 0.4rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 800, fontSize: '0.85rem', fontFamily: 'var(--font-primary)', color: '#111111' }}>
                          {deliveryFee.toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* 6. Calculations Summary Section (English) */}
                <div className="invoice-calculations-section print-avoid-break" style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', padding: '0.15rem 0' }}>
                  <div className="calculation-invoice-summary" style={{ width: '230px', display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.72rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#555555' }}>
                      <span style={{ fontFamily: 'var(--font-primary)', fontSize: '0.68rem', fontWeight: 700 }}>SUBTOTAL (DELIVERY):</span>
                      <span style={{ fontWeight: 700, color: '#111', fontFamily: 'var(--font-primary)' }}>RM {deliveryFee.toFixed(2)}</span>
                    </div>

                    {docMode === 'receipt' ? (
                      <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16A34A', fontWeight: 800 }}>
                          <span style={{ fontFamily: 'var(--font-primary)', fontSize: '0.68rem' }}>TOTAL PAID:</span>
                          <span style={{ fontFamily: 'var(--font-primary)' }}>RM {deliveryFee.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1.5px solid #111111', paddingTop: '0.3rem', fontWeight: 800, color: '#111111', fontFamily: 'var(--font-primary)' }}>
                          <span>BALANCE DUE:</span>
                          <span>RM 0.00</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#555555' }}>
                          <span style={{ fontFamily: 'var(--font-primary)', fontSize: '0.68rem', fontWeight: 700 }}>DEPOSIT / PAID:</span>
                          <span style={{ fontFamily: 'var(--font-primary)' }}>RM 0.00</span>
                        </div>
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          borderTop: '1.5px solid #111111', 
                          paddingTop: '0.3rem', 
                          fontFamily: 'var(--font-primary)', 
                          fontWeight: 900, 
                          fontSize: '0.85rem', 
                          color: 'var(--primary-red, #C51B27)' 
                        }}>
                          <span>AMOUNT DUE:</span>
                          <span>RM {deliveryFee.toFixed(2)}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid #111111', margin: '0.2rem 0' }} />

                {/* 7. Bottom Section: Payment Details */}
                <div style={{ padding: '0.2rem 0' }}>
                  <div className="payment-bank-details" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', gap: '0.15rem' }}>
                    <span className="section-title-print" style={{ fontFamily: 'var(--font-primary)', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '1px', color: '#111111', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
                      {docMode === 'invoice' ? 'PAYMENT INSTRUCTIONS:' : 'PAYMENT INFORMATION:'}
                    </span>
                    <p style={{ margin: 0, fontSize: '0.78rem', fontWeight: 800, color: '#111111', textTransform: 'uppercase', fontFamily: 'var(--font-primary)' }}>{bankName}</p>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#222222', fontWeight: 600 }}>
                      {parsedBank.number || bankAccount}
                    </p>
                    {parsedBank.name && (
                      <p style={{ margin: 0, fontSize: '0.72rem', color: '#555555', textTransform: 'uppercase' }}>({parsedBank.name})</p>
                    )}
                  </div>
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid #111111', margin: '0.2rem 0' }} />

              </div>

              {/* 8. Footer (Identical to InvoiceDetailModal) */}
              <div style={{ marginTop: 'auto', paddingTop: '0.6rem' }}>
                <div style={{ marginBottom: '0.6rem' }}>
                  <span className="section-title-print" style={{ fontFamily: 'var(--font-primary)', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '1px', color: '#111111', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
                    DELIVERY NOTICE:
                  </span>
                  <p style={{ margin: 0, fontSize: '0.67rem', color: '#555555', lineHeight: '1.35' }}>
                    This document is digitally issued by ThirtyOne Lab specifically for shipping & delivery services. Please contact our customer support for any delivery inquiries.
                  </p>
                </div>

                <div className="thank-you-footer" style={{ textAlign: 'center', borderTop: '1px solid #e6e2dc', paddingTop: '0.5rem' }}>
                  <p style={{ margin: 0, fontFamily: 'var(--font-primary)', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.5px' }}>
                    THANK YOU FOR CHOOSING THIRTYONE LAB!
                  </p>
                  <p style={{ margin: '0.1rem 0 0 0', fontSize: '0.62rem', color: '#777777', fontStyle: 'italic' }}>
                    Wear With Pride.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );

  const mountTarget = document.querySelector('.app-layout') || document.body;
  return createPortal(modalContent, mountTarget);
}
