import React, { useState, useEffect, useRef } from 'react';
import { getInvoices, getSettings } from '../services/storage';
import { Search, Printer, X, ChevronDown, ChevronUp } from 'lucide-react';

export default function Manufacturing() {
  const [invoices, setInvoices] = useState([]);
  const [settings, setSettings] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [monthFilter, setMonthFilter] = useState('All');
  const [loading, setLoading] = useState(false);
  const [showVoucherModal, setShowVoucherModal] = useState(false);

  // Modal zoom/scale states
  const [controlsExpanded, setControlsExpanded] = useState(false);
  const [scale, setScale] = useState(1);
  const [zoom, setZoom] = useState(1);
  const lastTapRef = useRef(0);

  const monthsList = [
    { value: '0', label: 'Januari' },
    { value: '1', label: 'Februari' },
    { value: '2', label: 'Mac' },
    { value: '3', label: 'April' },
    { value: '4', label: 'Mei' },
    { value: '5', label: 'Jun' },
    { value: '6', label: 'Julai' },
    { value: '7', label: 'Ogos' },
    { value: '8', label: 'September' },
    { value: '9', label: 'Oktober' },
    { value: '10', label: 'November' },
    { value: '11', label: 'Disember' }
  ];

  useEffect(() => {
    loadInvoicesAndSettings();
  }, []);

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

  const loadInvoicesAndSettings = async () => {
    setLoading(true);
    try {
      const data = await getInvoices();
      const setts = await getSettings();
      const sortedData = data.sort((a, b) => b.invoice_no.localeCompare(a.invoice_no));
      setInvoices(sortedData);
      setSettings(setts);
    } catch (e) {
      console.error('Error loading data in manufacturing:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (now - lastTapRef.current < DOUBLE_PRESS_DELAY) {
      setZoom(prev => (prev > 1 ? 1 : 1.8));
    }
    lastTapRef.current = now;
  };

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch =
      inv.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.invoice_no.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesMonth = true;
    if (monthFilter !== 'All') {
      const invDate = new Date(inv.date);
      matchesMonth = invDate.getMonth() === parseInt(monthFilter, 10);
    }

    return matchesSearch && matchesMonth;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Paid': return 'badge-paid';
      case 'Deposit': return 'badge-deposit';
      case 'Unpaid': return 'badge-unpaid';
      default: return '';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'Paid': return 'Paid';
      case 'Deposit': return 'Deposit';
      case 'Unpaid': return 'Unpaid';
      default: return status;
    }
  };

  // Calculations for Payment Voucher
  const totalNilaiInvois = filteredInvoices.reduce((sum, inv) => sum + parseFloat(inv.grand_total || 0), 0);
  const totalDuitDiterima = filteredInvoices.reduce((sum, inv) => {
    if (inv.status === 'Paid') return sum + parseFloat(inv.grand_total || 0);
    if (inv.status === 'Deposit') return sum + parseFloat(inv.deposit || 0);
    return sum;
  }, 0);
  const totalPengeluaran = filteredInvoices.reduce((sum, inv) => sum + parseFloat(inv.pengeluaran || 0), 0);
  const untungSebenar = totalDuitDiterima - totalPengeluaran;

  const currentMonthLabel = monthFilter === 'All'
    ? 'Semua Bulan'
    : monthsList.find(m => m.value === monthFilter)?.label || '';

  const finalScale = scale * zoom;

  return (
    <div className="main-content">
      <div className="dashboard-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <span className="section-tag">Senarai Pengeluaran</span>
          <h1>Manufacturing</h1>
        </div>
      </div>

      <div className="search-filters-bar card" style={{ marginBottom: '1.5rem', padding: '1.25rem' }}>
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Cari nama pelanggan atau no. invoice..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control search-input"
          />
        </div>

        <div className="filter-group-row">
          <div className="filter-box">
            <span className="select-label">Bulan</span>
            <select
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
              className="form-control filter-select"
            >
              <option value="All">Semua Bulan</option>
              {monthsList.map(m => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setShowVoucherModal(true)}
            className="btn btn-primary"
            title="Cetak Payment Voucher"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', height: '42px', alignSelf: 'flex-end', whiteSpace: 'nowrap' }}
          >
            <Printer size={16} /> Print Statement
          </button>
        </div>
      </div>

      <div className="card" style={{ padding: 0 }}>
        {loading ? (
          <div className="loading-state" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Memuatkan data...</div>
        ) : filteredInvoices.length === 0 ? (
          <div className="empty-state" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Tiada rekod pengeluaran ditemui.</div>
        ) : (
          <>
            <div className="table-container desktop-only">
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left' }}>No. Invoice</th>
                    <th style={{ textAlign: 'left' }}>Nama Pelanggan</th>
                    <th style={{ textAlign: 'center' }}>Total Invoice (RM)</th>
                    <th style={{ textAlign: 'center' }}>Pengeluaran (RM)</th>
                    <th style={{ textAlign: 'center' }}>Untung (RM)</th>
                    <th style={{ textAlign: 'center' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.map((inv) => {
                    const total = parseFloat(inv.grand_total || 0);
                    const pengeluaran = parseFloat(inv.pengeluaran || 0);
                    const paid = inv.status === 'Paid' ? total : parseFloat(inv.deposit || 0);
                    const untung = paid - pengeluaran;
                    return (
                      <tr key={inv.id}>
                        <td className="font-bold">{inv.invoice_no}</td>
                        <td className="font-bold">{inv.client_name}</td>
                        <td style={{ textAlign: 'center' }}>{total.toFixed(2)}</td>
                        <td style={{ textAlign: 'center', color: 'var(--primary-red)' }}>{pengeluaran.toFixed(2)}</td>
                        <td style={{ textAlign: 'center', color: '#15803D' }} className="font-bold">{untung.toFixed(2)}</td>
                        <td style={{ textAlign: 'center' }}>
                          <span className={`badge ${getStatusBadgeClass(inv.status)}`}>
                            {getStatusText(inv.status)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mobile-cards-list mobile-only">
              {filteredInvoices.map((inv) => {
                const total = parseFloat(inv.grand_total || 0);
                const pengeluaran = parseFloat(inv.pengeluaran || 0);
                const paid = inv.status === 'Paid' ? total : parseFloat(inv.deposit || 0);
                const untung = paid - pengeluaran;

                return (
                  <div key={inv.id} className="mobile-card">
                    <div className="mobile-card-row">
                      <span className="mobile-card-title">{inv.invoice_no}</span>
                      <span className={`badge ${getStatusBadgeClass(inv.status)}`}>
                        {getStatusText(inv.status)}
                      </span>
                    </div>
                    <div className="mobile-card-row" style={{ marginTop: '0.5rem' }}>
                      <div className="mobile-card-detail" style={{ width: '100%' }}>
                        <div className="mobile-card-bold" style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>{inv.client_name}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>Invoice:</span>
                          <span className="font-bold">RM {total.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--primary-red)' }}>
                          <span>Pengeluaran:</span>
                          <span className="font-bold">RM {pengeluaran.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed var(--border-color)', margin: '0.5rem 0', paddingTop: '0.5rem' }}>
                          <span>Untung:</span>
                          <span className="mobile-card-bold" style={{ color: '#15803D' }}>RM {untung.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* --- PAYMENT VOUCHER A4 MODAL --- */}
      {showVoucherModal && settings && (
        <div className="modal-overlay print-modal-overlay">
          <div className="A4-modal-container">
            {/* Top Toolbar */}
            <div className="print-controls no-print" style={{ borderRadius: '8px 8px 0 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button
                  onClick={() => setShowVoucherModal(false)}
                  className="btn btn-secondary btn-sm"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                >
                  <X size={16} /> Close
                </button>

                <div className="mobile-only">
                  <button
                    type="button"
                    onClick={() => setControlsExpanded(!controlsExpanded)}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '0.35rem 0.5rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
                  >
                    Options {controlsExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>
              </div>

              <div className={`print-controls-right ${controlsExpanded ? 'mobile-controls-open' : ''}`}>
                <button
                  onClick={() => window.print()}
                  className="btn btn-primary btn-sm"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <Printer size={16} /> Print / Download PDF
                </button>
              </div>
            </div>

            {/* Printable A4 Container */}
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
                    {/* Header: Company Details */}
                    <div className="invoice-header print-avoid-break">
                      <div className="company-info-block">
                        {settings.company_logo ? (
                          <img src={settings.company_logo} alt="Company Logo" className="invoice-print-logo" />
                        ) : (
                          <div className="logo-placeholder">{settings.company_name?.[0] || 'T'}</div>
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

                    {/* Document Title Block */}
                    <div className="document-meta-block print-avoid-break">
                      <h2 className="document-type-title">PAYMENT VOUCHER</h2>
                      <div className="meta-details-box">
                        <div className="meta-row">
                          <span className="meta-lbl">Voucher No:</span>
                          <span className="meta-val font-bold">
                            PV-{new Date().getFullYear()}-{(new Date().getMonth() + 1).toString().padStart(2, '0')}
                          </span>
                        </div>
                        <div className="meta-row">
                          <span className="meta-lbl">Date:</span>
                          <span className="meta-val">{new Date().toLocaleDateString('en-GB')}</span>
                        </div>
                        <div className="meta-row">
                          <span className="meta-lbl">Month:</span>
                          <span className="meta-val font-bold">{currentMonthLabel.toUpperCase()}</span>
                        </div>
                      </div>
                    </div>

                    <hr className="divider-line print-avoid-break" />

                    {/* Section Label */}
                    <div className="invoice-billing-block print-avoid-break">
                      <span className="section-title-print">PRODUCTION & REVENUE DETAILS:</span>
                    </div>

                    {/* Table Details */}
                    <div className="invoice-table-section" style={{ flex: 1 }}>
                      <table className="table invoice-print-table">
                        <thead>
                          <tr>
                            <th style={{ width: '35px', textAlign: 'center' }}>No</th>
                            <th style={{ textAlign: 'left' }}>No. Invoice</th>
                            <th style={{ textAlign: 'left' }}>Nama Pelanggan</th>
                            <th style={{ width: '80px', textAlign: 'center' }}>Status</th>
                            <th style={{ width: '100px', textAlign: 'center' }}>Total Invoice<br/>(RM)</th>
                            <th style={{ width: '100px', textAlign: 'center' }}>Pengeluaran<br/>(RM)</th>
                            <th style={{ width: '100px', textAlign: 'center' }}>Untung<br/>(RM)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredInvoices.length === 0 ? (
                            <tr>
                              <td colSpan="7" style={{ textAlign: 'center', padding: '1rem' }}>Tiada rekod pengeluaran untuk bulan ini.</td>
                            </tr>
                          ) : (
                            filteredInvoices.map((inv, idx) => {
                              const total = parseFloat(inv.grand_total || 0);
                              const pengeluaran = parseFloat(inv.pengeluaran || 0);
                              const paid = inv.status === 'Paid' ? total : parseFloat(inv.deposit || 0);
                              const untung = paid - pengeluaran;

                              return (
                                <tr key={inv.id} className="print-avoid-break">
                                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{idx + 1}.</td>
                                  <td style={{ textAlign: 'left', verticalAlign: 'middle' }} className="font-bold">{inv.invoice_no}</td>
                                  <td style={{ textAlign: 'left', verticalAlign: 'middle' }}>{inv.client_name}</td>
                                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                    <span className={`badge ${getStatusBadgeClass(inv.status)}`} style={{ padding: '0.15rem 0.5rem', fontSize: '0.7rem' }}>
                                      {getStatusText(inv.status)}
                                    </span>
                                  </td>
                                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{total.toFixed(2)}</td>
                                  <td style={{ textAlign: 'center', verticalAlign: 'middle', color: 'var(--primary-red)' }}>{pengeluaran.toFixed(2)}</td>
                                  <td style={{ textAlign: 'center', verticalAlign: 'middle', color: '#15803D' }} className="font-bold">{untung.toFixed(2)}</td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>

                    <hr className="divider-line print-avoid-break" />

                    {/* Summary Section (Sales vs Real Cashflow & Profit) */}
                    <div className="invoice-calculations-section print-avoid-break" style={{ justifyContent: 'space-between', display: 'flex' }}>
                      <div style={{ flex: 1, paddingRight: '1.5rem' }}>
                        <span className="section-title-print" style={{ marginBottom: '0.3rem', display: 'block' }}>[ JUALAN / NILAI INVOIS ]</span>
                        <div className="summary-print-row" style={{ justifyContent: 'flex-start', gap: '1rem', fontSize: '0.85rem' }}>
                          <span>Total Nilai Invois:</span>
                          <span className="font-bold">RM {totalNilaiInvois.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="calculation-invoice-summary" style={{ width: '320px' }}>
                        <span className="section-title-print" style={{ marginBottom: '0.3rem', display: 'block', textAlign: 'left' }}>[ ALIRAN TUNAI SEBENAR ]</span>
                        <div className="summary-print-row">
                          <span>(+) Duit Diterima (Paid + Deposit):</span>
                          <span>RM {totalDuitDiterima.toFixed(2)}</span>
                        </div>
                        <div className="summary-print-row" style={{ color: 'var(--primary-red)' }}>
                          <span>(-) Pengeluaran (Kos Modal):</span>
                          <span>- RM {totalPengeluaran.toFixed(2)}</span>
                        </div>
                        <div className="summary-print-row grand-total-row-print" style={{ borderTop: '2px solid #111', marginTop: '0.25rem', paddingTop: '0.25rem' }}>
                          <span>(=) UNTUNG SEBENAR:</span>
                          <span style={{ color: '#15803D' }}>RM {untungSebenar.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <hr className="divider-line print-avoid-break" />

                    {/* Notes Footer */}
                    <div className="invoice-bottom-grid print-avoid-break" style={{ marginBottom: 0 }}>
                      <div className="bottom-grid-left" style={{ width: '100%' }}>
                        <div className="terms-container">
                          <span className="section-title-print">NOTES:</span>
                          <p style={{ fontSize: '0.75rem', color: '#555', marginTop: '0.15rem' }}>
                            This payment voucher is automatically generated for internal production and financial records.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Centered Footer */}
                    <div className="thank-you-footer print-avoid-break" style={{ marginTop: 'auto' }}>
                      <p>THIRTYONE LAB DESIGN - INTERNAL FINANCIAL STATEMENT</p>
                      <p style={{ textTransform: 'none', fontWeight: '500', fontStyle: 'italic', letterSpacing: '0.5px', marginTop: '0.15rem', color: '#777', fontSize: '0.6rem' }}>Wear With Pride.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .search-filters-bar {
          display: flex;
          gap: 1.5rem;
          align-items: flex-end;
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
          flex: 1;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          color: var(--text-light);
        }

        .search-input {
          padding-left: 2.75rem;
          width: 100%;
        }

        .filter-group-row {
          display: flex;
          gap: 1rem;
          align-items: flex-end;
        }

        .filter-box {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .select-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-light);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .filter-select {
          min-width: 140px;
          height: 42px;
        }
          
        .font-bold {
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}

