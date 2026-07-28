import React, { useState, useEffect } from 'react';
import { getInvoices, deleteInvoice } from '../services/storage';
import { Search, Plus, Eye, Edit2, RefreshCw, Trash2 } from 'lucide-react';

const ITEMS_PER_PAGE = 10;

export default function Invoices({ onOpenInvoiceModal, onOpenPaymentModal, onOpenInvoiceDetail }) {
  const [invoices, setInvoices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [monthFilter, setMonthFilter] = useState('All'); // 'All' or '0' - '11' representing Jan - Dec
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
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
      console.error('Error loading invoices list:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, invoiceNo) => {
    if (window.confirm(`Adakah anda pasti mahu memadam invoice "${invoiceNo}"?`)) {
      await deleteInvoice(id);
      loadInvoices();
    }
  };

  // --- FILTER LOGIC ---
  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = 
      inv.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.invoice_no.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || inv.status === statusFilter;
    
    let matchesMonth = true;
    if (monthFilter !== 'All') {
      const invDate = new Date(inv.date);
      matchesMonth = invDate.getMonth() === parseInt(monthFilter, 10);
    }

    return matchesSearch && matchesStatus && matchesMonth;
  });

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, monthFilter]);

  // Pagination calculation
  const totalItems = filteredInvoices.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedInvoices = filteredInvoices.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Paid': return 'badge-paid';
      case 'Deposit': return 'badge-deposit';
      case 'Unpaid': return 'badge-unpaid';
      default: return '';
    }
  };

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

  return (
    <div className="main-content">
      {/* Header */}
      <div className="invoices-header">
        <div>
          <span className="section-tag">Pengurusan Dokumen</span>
          <h1>Invoices & Bil</h1>
        </div>
        <button onClick={() => onOpenInvoiceModal(null)} className="btn btn-primary">
          <Plus size={16} /> New Invoice
        </button>
      </div>

      {/* Advanced Filters Bar */}
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
      </div>

      {/* Invoices List Table */}
      <div className="card" style={{ padding: 0 }}>
        {loading ? (
          <div className="loading-state">Memuatkan semua invoice...</div>
        ) : paginatedInvoices.length === 0 ? (
          <div className="empty-state">Tiada invoice ditemui.</div>
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
                  {paginatedInvoices.map((inv) => (
                    <tr key={inv.id}>
                      <td className="font-bold">{inv.invoice_no}</td>
                      <td>{inv.date}</td>
                      <td>
                        <div className="client-cell">
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
                            title="Lihat / Cetak PDF"
                          >
                            <Eye size={12} /> View/Print
                          </button>
                          <button
                            onClick={() => onOpenInvoiceModal(inv)}
                            className="btn btn-secondary btn-sm"
                            title="Edit Invoice"
                          >
                            <Edit2 size={12} /> Edit
                          </button>
                          <button
                            onClick={() => onOpenPaymentModal(inv)}
                            className="btn btn-secondary btn-sm"
                            style={{ color: '#D97706', borderColor: '#FEF3C7' }}
                            title="Rekod Bayaran"
                          >
                            <RefreshCw size={12} /> Update
                          </button>
                          <button
                            onClick={() => handleDelete(inv.id, inv.invoice_no)}
                            className="btn btn-secondary btn-sm"
                            style={{ borderColor: '#FEE2E2', color: '#B91C1C' }}
                            title="Padam Invoice"
                          >
                            <Trash2 size={12} /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mobile-cards-list mobile-only">
              {paginatedInvoices.map((inv) => (
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
                  <div className="mobile-card-actions" style={{ flexWrap: 'wrap' }}>
                    <button
                      onClick={() => onOpenInvoiceDetail(inv)}
                      className="btn btn-secondary btn-sm"
                    >
                      <Eye size={12} /> View
                    </button>
                    <button
                      onClick={() => onOpenInvoiceModal(inv)}
                      className="btn btn-secondary btn-sm"
                    >
                      <Edit2 size={12} /> Edit
                    </button>
                    <button
                      onClick={() => onOpenPaymentModal(inv)}
                      className="btn btn-secondary btn-sm"
                      style={{ color: '#D97706', borderColor: '#FEF3C7' }}
                    >
                      <RefreshCw size={12} /> Bayar
                    </button>
                    <button
                      onClick={() => handleDelete(inv.id, inv.invoice_no)}
                      className="btn btn-secondary btn-sm"
                      style={{ borderColor: '#FEE2E2', color: '#B91C1C' }}
                    >
                      <Trash2 size={12} /> Padam
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination-wrapper">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="btn btn-secondary btn-sm pag-btn"
          >
            Sebelum
          </button>
          
          <div className="pagination-numbers">
            {Array.from({ length: totalPages }, (_, idx) => {
              const pageNum = idx + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`btn btn-secondary btn-sm pag-num-btn ${currentPage === pageNum ? 'active-page' : ''}`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="btn btn-secondary btn-sm pag-btn"
          >
            Seterusnya
          </button>
        </div>
      )}

      <style>{`
        .invoices-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

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

        .filter-group-row {
          display: flex;
          gap: 1rem;
          flex-shrink: 0;
          align-items: flex-end;
        }

        .filter-box {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
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

        /* Pagination Styles */
        .pagination-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1.5rem;
          margin-bottom: 3rem;
        }

        .pagination-numbers {
          display: flex;
          gap: 0.5rem;
        }

        .pag-btn {
          width: 110px;
        }

        .pag-num-btn {
          min-width: 36px;
          height: 36px;
          padding: 0 !important;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem !important;
        }

        .active-page {
          background-color: var(--primary-red) !important;
          color: var(--white) !important;
          border-color: var(--primary-red) !important;
        }

        @media (max-width: 992px) {
          .search-filters-bar {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
            padding: 1.25rem 1.25rem !important; /* Reduce padding on mobile to give more space */
          }
          .filter-group-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            width: 100%;
            gap: 1rem;
          }
          .filter-box {
            display: flex;
            flex-direction: column;
            gap: 0.3rem;
          }
          .filter-select {
            width: 100%;
            min-width: 0 !important; /* Allow inputs to shrink and balance layout */
          }
        }
      `}</style>
    </div>
  );
}
