import React, { useState, useEffect } from 'react';
import { getInvoices } from '../services/storage';
import { Search } from 'lucide-react';

export default function Manufacturing() {
  const [invoices, setInvoices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    setLoading(true);
    try {
      const data = await getInvoices();
      // Sort invoices by latest first
      const sortedData = data.sort((a, b) => b.invoice_no.localeCompare(a.invoice_no));
      setInvoices(sortedData);
    } catch (e) {
      console.error('Error loading invoices in manufacturing:', e);
    } finally {
      setLoading(false);
    }
  };

  const filteredInvoices = invoices.filter(inv => {
    return inv.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           inv.invoice_no.toLowerCase().includes(searchQuery.toLowerCase());
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
      case 'Paid': return '✅ Selesai';
      case 'Deposit': return '🟡 Deposit';
      case 'Unpaid': return '🔴 Unpaid';
      default: return status;
    }
  };

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
                    const untung = total - pengeluaran;
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
                const untung = total - pengeluaran;
                
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

      <style>{`
        .search-filters-bar {
          display: flex;
          gap: 2rem;
          align-items: center;
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
          
        .font-bold {
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
