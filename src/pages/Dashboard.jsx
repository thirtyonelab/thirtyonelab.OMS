import React, { useState, useEffect } from 'react';
import { getInvoices } from '../services/storage';
import { Search, DollarSign, AlertCircle, Wallet, Plus, ArrowRight, Eye, RefreshCw, Factory } from 'lucide-react';

export default function Dashboard({ setActiveTab, onOpenInvoiceModal, onOpenPaymentModal, onOpenInvoiceDetail }) {
  const [invoices, setInvoices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    setLoading(true);
    try {
      const data = await getInvoices();
      setInvoices(data);
    } catch (e) {
      console.error('Error loading invoices in dashboard:', e);
    } finally {
      setLoading(false);
    }
  };

  // --- METRIC CALCULATIONS ---
  const calculateMetrics = () => {
    const now = new Date();
    const currentMonth = now.getMonth(); // 0-11
    const currentYear = now.getFullYear();

    let totalThisMonth = 0;
    let totalUnpaid = 0;
    let totalDeposit = 0;
    let countThisMonth = 0;
    let countUnpaid = 0;
    let countDeposit = 0;
    let totalPengeluaranThisMonth = 0;
    let countPengeluaranThisMonth = 0;
    let countUntungThisMonth = 0;

    let totalCollectedForUntung = 0;

    invoices.forEach(inv => {
      const invDate = new Date(inv.date);
      const isCurrentMonth = invDate.getMonth() === currentMonth && invDate.getFullYear() === currentYear;

      if (isCurrentMonth) {
        const p = parseFloat(inv.pengeluaran || 0);
        if (p > 0) countPengeluaranThisMonth++;
        totalPengeluaranThisMonth += p;

        countUntungThisMonth++;
        const paidAmount = inv.status === 'Paid' ? parseFloat(inv.grand_total || 0) : parseFloat(inv.deposit || 0);
        totalCollectedForUntung += paidAmount;
      }

      if (inv.status === 'Paid' && isCurrentMonth) {
        totalThisMonth += parseFloat(inv.grand_total || 0);
        countThisMonth++;
      } else if (inv.status === 'Unpaid') {
        totalUnpaid += parseFloat(inv.grand_total || 0);
        countUnpaid++;
      } else if (inv.status === 'Deposit') {
        totalDeposit += parseFloat(inv.deposit || 0);
        countDeposit++;
        // Include the remaining unpaid balance of the deposit invoice in totalUnpaid
        const balance = inv.balance !== undefined ? parseFloat(inv.balance) : (parseFloat(inv.grand_total || 0) - parseFloat(inv.deposit || 0));
        totalUnpaid += balance;
        if (balance > 0) {
          countUnpaid++;
        }
      }
    });

    return {
      totalThisMonth,
      totalUnpaid,
      totalDeposit,
      countThisMonth,
      countUnpaid,
      countDeposit,
      totalPengeluaranThisMonth,
      countPengeluaranThisMonth,
      countUntungThisMonth,
      untungBersih: totalCollectedForUntung - totalPengeluaranThisMonth
    };
  };

  const metrics = calculateMetrics();

  // Search & Filter lists
  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = 
      inv.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.invoice_no.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = statusFilter === 'All' || inv.status === statusFilter;
    
    return matchesSearch && matchesFilter;
  });

  // Display only recent 5 invoices in the table, sorted latest first
  const recentInvoices = [...filteredInvoices].sort((a, b) => b.invoice_no.localeCompare(a.invoice_no)).slice(0, 5);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Paid': return 'badge-paid';
      case 'Deposit': return 'badge-deposit';
      case 'Unpaid': return 'badge-unpaid';
      default: return '';
    }
  };

  return (
    <div className="main-content">
      {/* Welcome & New Invoice Button */}
      <div className="dashboard-header">
        <div>
          <span className="section-tag">Pusat Kawalan Utama</span>
          <h1>Overview Dashboard</h1>
        </div>
        <button onClick={() => onOpenInvoiceModal(null)} className="btn btn-primary">
          <Plus size={16} /> New Invoice
        </button>
      </div>

      {/* Summary Metrics Cards */}
      <div className="metrics-grid">
        
        {/* Metric Card 1: Total Paid This Month */}
        <div className="card metric-card">
          <div className="metric-icon-wrapper paid">
            <DollarSign size={24} />
          </div>
          <div className="metric-content">
            <span className="metric-title-lbl">Kutipan Bulan Ni</span>
            <h3 className="metric-value">
              RM {metrics.totalThisMonth.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
            <span className="metric-subtitle">Invoice paid penuh bulan semasa</span>
            <span style={{ display: 'block', marginTop: '0.5rem', fontSize: '0.8rem', fontWeight: 'bold', color: '#15803D' }}>{metrics.countThisMonth} Invoice</span>
          </div>
        </div>

        {/* Metric Card 2: Total Unpaid */}
        <div className="card metric-card">
          <div className="metric-icon-wrapper unpaid">
            <AlertCircle size={24} />
          </div>
          <div className="metric-content">
            <span className="metric-title-lbl">Belum Bayar (Unpaid)</span>
            <h3 className="metric-value" style={{ color: 'var(--primary-red)' }}>
              RM {metrics.totalUnpaid.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
            <span className="metric-subtitle">Nilai keseluruhan invoice unpaid</span>
            <span style={{ display: 'block', marginTop: '0.5rem', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--primary-red)' }}>{metrics.countUnpaid} Invoice</span>
          </div>
        </div>

        {/* Metric Card 3: Total Deposit Only */}
        <div className="card metric-card">
          <div className="metric-icon-wrapper deposit">
            <Wallet size={24} />
          </div>
          <div className="metric-content">
            <span className="metric-title-lbl">Deposit Only</span>
            <h3 className="metric-value" style={{ color: '#D97706' }}>
              RM {metrics.totalDeposit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
            <span className="metric-subtitle">Jumlah kutipan deposit setakat ini</span>
            <span style={{ display: 'block', marginTop: '0.5rem', fontSize: '0.8rem', fontWeight: 'bold', color: '#D97706' }}>{metrics.countDeposit} Invoice</span>
          </div>
        </div>
        
        {/* Metric Card 4: Total Pengeluaran */}
        <div className="card metric-card">
          <div className="metric-icon-wrapper" style={{ backgroundColor: '#F3F4F6', color: '#4B5563' }}>
            <Factory size={24} />
          </div>
          <div className="metric-content">
            <span className="metric-title-lbl">Pengeluaran</span>
            <h3 className="metric-value">
              RM {metrics.totalPengeluaranThisMonth.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
            <span className="metric-count">{metrics.countPengeluaranThisMonth} Invoices</span>
          </div>
        </div>

        {/* Metric Card 5: Untung Bersih */}
        <div className="card metric-card untung-card" style={{ backgroundColor: '#E2F5EA', borderColor: '#15803D' }}>
          <div className="metric-content" style={{ width: '100%' }}>
            <span className="metric-title-lbl" style={{ color: '#15803D' }}>Untung Bersih</span>
            <h3 className="metric-value" style={{ color: '#15803D', fontSize: '1.5rem' }}>
              RM {metrics.untungBersih.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
            <span className="metric-count" style={{ color: '#166534', backgroundColor: '#DCFCE7' }}>{metrics.countUntungThisMonth} Invoices</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="search-filters-bar card">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Cari nama pelanggan atau nombor invoice..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control search-input"
          />
        </div>

        <div className="filter-box">
          <span className="select-label">Status</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-control filter-select"
          >
            <option value="All">Semua Status</option>
            <option value="Paid">Paid</option>
            <option value="Deposit">Deposit</option>
            <option value="Unpaid">Unpaid</option>
          </select>
        </div>
      </div>

      {/* Recent Invoices Table */}
      <div className="card" style={{ padding: 0 }}>
        <div className="table-header-row">
          <h3 className="table-title">Recent Invoices</h3>
          <button onClick={() => setActiveTab('invoices')} className="btn-text view-all-btn">
            View All <ArrowRight size={14} />
          </button>
        </div>

        {loading ? (
          <div className="loading-state">Memuatkan invoice terkini...</div>
        ) : recentInvoices.length === 0 ? (
          <div className="empty-state">Tiada invoice terkini ditemui.</div>
        ) : (
          <>
            <div className="table-container desktop-only">
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ textAlign: 'center' }}>No. Invoice</th>
                    <th style={{ textAlign: 'center' }}>Tarikh</th>
                    <th style={{ textAlign: 'center' }}>Nama Pelanggan</th>
                    <th style={{ textAlign: 'center' }}>Jumlah (RM)</th>
                    <th style={{ textAlign: 'center' }}>Baki (RM)</th>
                    <th style={{ textAlign: 'center' }}>Status</th>
                    <th style={{ textAlign: 'center' }}>Tindakan</th>
                  </tr>
                </thead>
                <tbody>
                  {recentInvoices.map((inv) => (
                    <tr key={inv.id}>
                      <td style={{ textAlign: 'center' }} className="font-bold">{inv.invoice_no}</td>
                      <td style={{ textAlign: 'center' }}>{inv.date}</td>
                      <td style={{ textAlign: 'center' }}>
                        <div className="client-cell" style={{ alignItems: 'center' }}>
                          <span className="client-name">{inv.client_name}</span>
                          <span className="client-phone-sub">{inv.client_phone}</span>
                        </div>
                      </td>
                      <td style={{ textAlign: 'center' }} className="font-bold">
                        {parseFloat(inv.grand_total).toFixed(2)}
                      </td>
                      <td style={{ textAlign: 'center' }} className={parseFloat(inv.balance) > 0 ? 'text-red font-bold' : 'font-bold'}>
                        {parseFloat(inv.balance ?? inv.grand_total).toFixed(2)}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span className={`badge ${getStatusBadgeClass(inv.status)}`}>
                          {inv.status}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <div className="actions-cell">
                          <button
                            onClick={() => onOpenInvoiceDetail(inv)}
                            className="btn btn-secondary btn-sm"
                          >
                            <Eye size={12} /> View/Print
                          </button>
                          <button
                            onClick={() => onOpenPaymentModal(inv)}
                            className="btn btn-secondary btn-sm"
                            style={{ color: '#D97706', borderColor: '#FEF3C7' }}
                          >
                            <RefreshCw size={12} /> Update Payment
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mobile-cards-list mobile-only">
              {recentInvoices.map((inv) => (
                <div key={inv.id} className="mobile-card">
                  <div className="mobile-card-row">
                    <span className="mobile-card-title">{inv.invoice_no}</span>
                    <span className={`badge ${getStatusBadgeClass(inv.status)}`}>
                      {inv.status}
                    </span>
                  </div>
                  <div className="mobile-card-row">
                    <div className="mobile-card-detail">
                      <div className="mobile-card-bold">{inv.client_name}</div>
                      <div>Tel: {inv.client_phone}</div>
                      <div>Tarikh: {inv.date}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div className="mobile-card-detail">Jumlah: <span className="mobile-card-bold">RM {parseFloat(inv.grand_total).toFixed(2)}</span></div>
                      <div className="mobile-card-detail">Baki: <span className={`mobile-card-bold ${parseFloat(inv.balance ?? inv.grand_total) > 0 ? 'text-red' : ''}`}>RM {parseFloat(inv.balance ?? inv.grand_total).toFixed(2)}</span></div>
                    </div>
                  </div>
                  <div className="mobile-card-actions">
                    <button
                      onClick={() => onOpenInvoiceDetail(inv)}
                      className="btn btn-secondary btn-sm"
                    >
                      <Eye size={12} /> View/Print
                    </button>
                    <button
                      onClick={() => onOpenPaymentModal(inv)}
                      className="btn btn-secondary btn-sm"
                      style={{ color: '#D97706', borderColor: '#FEF3C7' }}
                    >
                      <RefreshCw size={12} /> Update Payment
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <style>{`
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .metric-card {
          flex-direction: row !important;
          align-items: center;
          gap: 1.5rem;
          padding: 1.75rem 2rem;
        }

        .metric-icon-wrapper {
          height: 52px;
          width: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .metric-icon-wrapper.paid {
          background-color: #E2F5EA;
          color: #15803D;
        }

        .metric-icon-wrapper.unpaid {
          background-color: #FEE2E2;
          color: #B91C1C;
        }

        .metric-icon-wrapper.deposit {
          background-color: #FEF3C7;
          color: #D97706;
        }

        .metric-content {
          display: flex;
          flex-direction: column;
        }

        .metric-title-lbl {
          font-family: var(--font-primary);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 0.25rem;
        }

        .metric-value {
          font-family: var(--font-primary);
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--text-dark);
          line-height: 1.2;
        }

        .metric-subtitle {
          font-size: 0.7rem;
          color: var(--text-light);
          margin-top: 0.25rem;
        }

        /* Search & Filter Layout */
        .search-filters-bar {
          display: flex;
          gap: 2rem;
          align-items: center;
          padding: 1.25rem 2rem;
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

        .filter-box {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          flex-shrink: 0;
        }

        .select-label {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 0;
        }

        .filter-select {
          min-width: 150px;
          padding: 0.5rem 0.75rem;
          font-size: 0.85rem;
        }

        /* Table header row decoration */
        .table-header-row {
          padding: 1.5rem 2rem;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .table-title {
          font-family: var(--font-primary);
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .view-all-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
        }

        .client-cell {
          display: flex;
          flex-direction: column;
        }

        .client-name {
          font-weight: 600;
        }

        .client-phone-sub {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .actions-cell {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .loading-state, .empty-state {
          padding: 3rem;
          text-align: center;
          color: var(--text-muted);
          font-family: var(--font-primary);
          font-size: 0.85rem;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .text-red {
          color: var(--primary-red);
        }

        .font-bold {
          font-weight: 600;
        }

        @media (max-width: 1200px) {
          .metrics-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .untung-card {
            grid-column: span 2;
          }
        }

        @media (max-width: 900px) {
          .search-filters-bar {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
          }
          
          .filter-box {
            width: 100%;
            flex-direction: column;
            gap: 0.3rem;
          }
          
          .filter-select {
            flex: 1;
            width: 100%;
          }
        }

        @media (max-width: 640px) {
          .metrics-grid {
            grid-template-columns: 1fr 1fr;
            gap: 0.75rem;
          }
          .untung-card {
            grid-column: 1 / -1;
          }
          .metric-card {
            flex-direction: column !important;
            align-items: flex-start;
            padding: 1.25rem 1rem;
            gap: 0.75rem;
          }
          .metric-value {
            font-size: 1.15rem;
          }
        }
      `}</style>
    </div>
  );
}
