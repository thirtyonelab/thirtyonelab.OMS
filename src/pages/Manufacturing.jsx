import React, { useState, useEffect, useRef } from 'react';
import { getInvoices, getSettings, updateManufacturingStatus } from '../services/storage';
import { Search, Printer, X, Save, Inbox, Pencil, Clock, Factory, CheckCircle2, Wrench, Building2 } from 'lucide-react';
import KilangVoucherModal from '../components/KilangVoucherModal';
import { useLanguage } from '../context/LanguageContext';

export default function Manufacturing() {
  const { tr, language } = useLanguage();
  const [invoices, setInvoices] = useState([]);
  const [settings, setSettings] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [monthFilter, setMonthFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(false);

  // States for inline editing
  const [editedData, setEditedData] = useState({});

  // State for Kilang Statement Modal (Monthly Summary Voucher)
  const [showVoucherModal, setShowVoucherModal] = useState(false);

  // State for printing single Invoice Payment Voucher
  const [selectedVoucherInvoice, setSelectedVoucherInvoice] = useState(null);
  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);

  // Modal zoom/scale states for the monthly print modal
  const [scale, setScale] = useState(1);
  const [zoom, setZoom] = useState(1);
  const lastTapRef = useRef(0);

  const monthsList = [
    { value: '0', label: language === 'EN' ? 'January' : 'Januari' },
    { value: '1', label: language === 'EN' ? 'February' : 'Februari' },
    { value: '2', label: language === 'EN' ? 'March' : 'Mac' },
    { value: '3', label: language === 'EN' ? 'April' : 'April' },
    { value: '4', label: language === 'EN' ? 'May' : 'Mei' },
    { value: '5', label: language === 'EN' ? 'June' : 'Jun' },
    { value: '6', label: language === 'EN' ? 'July' : 'Julai' },
    { value: '7', label: language === 'EN' ? 'August' : 'Ogos' },
    { value: '8', label: language === 'EN' ? 'September' : 'September' },
    { value: '9', label: language === 'EN' ? 'October' : 'Oktober' },
    { value: '10', label: language === 'EN' ? 'November' : 'November' },
    { value: '11', label: language === 'EN' ? 'December' : 'Disember' }
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
      const [invData, setData] = await Promise.all([getInvoices(), getSettings()]);
      const sortedInvoices = [...invData].sort((a, b) => (b.invoice_no || '').localeCompare(a.invoice_no || ''));
      setInvoices(sortedInvoices);
      setSettings(setData);
    } catch (err) {
      console.error(err);
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

  const handleFieldChange = (id, field, value) => {
    setEditedData(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  const handleSaveInline = async (inv) => {
    const rawKos = editedData[inv.id]?.pengeluaran;
    const kos = rawKos !== undefined ? (parseFloat(rawKos) || 0) : (inv.pengeluaran || 0);
    const status = editedData[inv.id]?.order_status !== undefined ? editedData[inv.id].order_status : (inv.order_status || 'BELUM_DRAFT');
    const due = editedData[inv.id]?.due_date !== undefined ? editedData[inv.id].due_date : (inv.due_date || '');
    const factoryBank = editedData[inv.id]?.factory_payment_bank !== undefined ? editedData[inv.id].factory_payment_bank : (inv.factory_payment_bank || 'Bank Islam');
    
    setLoading(true);
    try {
      const success = await updateManufacturingStatus(inv.id, status, kos, due, factoryBank);
      if (success) {
        alert('Kemaskini berjaya disimpan!');
        setEditedData(prev => {
          const copy = { ...prev };
          delete copy[inv.id];
          return copy;
        });
        loadInvoicesAndSettings();
      } else {
        alert('Gagal menyimpan kemaskini.');
      }
    } catch (err) {
      console.error(err);
      alert('Ralat semasa menyimpan kemaskini.');
    } finally {
      setLoading(false);
    }
  };

  const baseInvoices = invoices.filter(inv => {
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

  const filteredInvoices = baseInvoices.filter(inv => {
    if (statusFilter === 'All') return true;
    const orderStatus = inv.order_status || 'BELUM_DRAFT';
    return orderStatus === statusFilter;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Paid': return 'badge-paid';
      case 'Deposit': return 'badge-deposit';
      case 'Unpaid': return 'badge-unpaid';
      case 'Void': return 'badge-void';
      default: return '';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'Paid': return 'Paid';
      case 'Deposit': return 'Deposit';
      case 'Unpaid': return 'Unpaid';
      case 'Void': return 'Void';
      default: return status;
    }
  };

  const getItemSummary = (inv) => {
    if (!inv.items || !Array.isArray(inv.items)) return '-';
    return inv.items.map((item, idx) => {
      let qty = 0;
      if (item.item_type === 'banner') {
        qty = parseInt(item.qty || 0, 10);
      } else if (item.sizes) {
        qty = Object.values(item.sizes).reduce((sum, s) => {
          return sum + parseInt(s?.short || 0, 10) + parseInt(s?.long || 0, 10) + parseInt(s?.pants || 0, 10);
        }, 0);
      }
      const typeLabel = item.item_type === 'banner' ? 'unit' : 'pcs';
      const itemName = item.design_name || (item.item_type ? (item.item_type.charAt(0).toUpperCase() + item.item_type.slice(1)) : 'Item');
      return (
        <div key={item.id || idx} style={{ padding: '2px 0' }}>
          • {itemName} ({qty} {typeLabel})
        </div>
      );
    });
  };

  // Summary counts & financials (exclude Void) based on baseInvoices (all statuses for current search & month)
  const nonVoidInvoices = baseInvoices.filter(inv => inv.status !== 'Void');
  const belumDraftCount = nonVoidInvoices.filter(inv => (inv.order_status || 'BELUM_DRAFT') === 'BELUM_DRAFT').length;
  const draftCount = nonVoidInvoices.filter(inv => inv.order_status === 'DRAFT').length;
  const pendingCount = nonVoidInvoices.filter(inv => inv.order_status === 'PENDING').length;
  const processingCount = nonVoidInvoices.filter(inv => inv.order_status === 'PROCESSING').length;
  const completedCount = nonVoidInvoices.filter(inv => inv.order_status === 'COMPLETED').length;
  const maintenanceCount = nonVoidInvoices.filter(inv => inv.order_status === 'MAINTENANCE').length;

  const totalNilaiInvois = nonVoidInvoices.reduce((sum, inv) => sum + parseFloat(inv.grand_total || 0), 0);
  const totalDuitDiterima = nonVoidInvoices.reduce((sum, inv) => {
    if (inv.status === 'Paid') return sum + parseFloat(inv.grand_total || 0);
    if (inv.status === 'Deposit') return sum + parseFloat(inv.deposit || 0);
    return sum;
  }, 0);
  const totalPengeluaran = nonVoidInvoices.reduce((sum, inv) => {
    // Check if there is an unsaved edit first
    const rawKos = editedData[inv.id]?.pengeluaran;
    return sum + (rawKos !== undefined ? (parseFloat(rawKos) || 0) : parseFloat(inv.pengeluaran || 0));
  }, 0);
  const untungSebenar = totalDuitDiterima - totalPengeluaran;

  const currentMonthLabel = monthFilter === 'All'
    ? (tr('allMonths') || 'Semua Bulan')
    : monthsList.find(m => m.value === monthFilter)?.label || '';

  const finalScale = scale * zoom;

  return (
    <div className="main-content" style={{ padding: '1rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Responsive Header (Visible on Desktop & Mobile) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--primary-red, #c51b27)', letterSpacing: '1px', textTransform: 'uppercase' }}>
            {tr('mfgTag')}
          </span>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 900, margin: '2px 0 0 0', color: '#18181b', letterSpacing: '-0.5px' }}>
            {tr('mfgTitle')}
          </h1>
        </div>

        <button
          onClick={() => setShowVoucherModal(true)}
          className="btn btn-secondary btn-sm"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, padding: '0.5rem 0.9rem', flexShrink: 0 }}
          title="Cetak Monthly Statement"
        >
          <Printer size={14} /> Penyata Bulanan Kilang
        </button>
      </div>

      {/* COMPACT STATUS FILTER CHIPS (MATCHED WITH INVOICES) */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        overflowX: 'auto', 
        paddingBottom: '6px', 
        marginBottom: '14px', 
        scrollbarWidth: 'none',
        WebkitOverflowScrolling: 'touch',
        flexShrink: 0,
        alignItems: 'center',
        minHeight: '42px'
      }}>
        {[
          { key: 'All', label: 'Semua', count: nonVoidInvoices.length, Icon: Factory },
          { key: 'BELUM_DRAFT', label: tr('belumDraft') || 'Belum Draft', count: belumDraftCount, Icon: Clock },
          { key: 'DRAFT', label: tr('draft') || 'Draft', count: draftCount, Icon: Pencil },
          { key: 'PENDING', label: tr('pending') || 'Pending', count: pendingCount, Icon: Inbox },
          { key: 'PROCESSING', label: tr('processing') || 'Sedang Diproses', count: processingCount, Icon: Building2 },
          { key: 'COMPLETED', label: tr('completed') || 'Siap', count: completedCount, Icon: CheckCircle2 },
          { key: 'MAINTENANCE', label: tr('maintenance') || 'Baik Pulih', count: maintenanceCount, Icon: Wrench, isAlert: maintenanceCount > 0 }
        ].map(({ key, label, count, Icon, isAlert }) => {
          const isSelected = statusFilter === key;
          return (
            <button 
              key={key}
              onClick={() => setStatusFilter(key)}
              style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                height: '34px',
                minHeight: '34px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 650,
                cursor: 'pointer',
                border: isSelected ? '1px solid #18181b' : '1px solid var(--border-color)',
                backgroundColor: isSelected ? '#18181b' : '#ffffff',
                color: isSelected ? '#ffffff' : isAlert ? 'var(--primary-red)' : 'var(--text-dark)',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                boxSizing: 'border-box'
              }}
            >
              <Icon size={14} color={isSelected ? '#ffffff' : isAlert ? 'var(--primary-red)' : 'var(--text-muted)'} />
              <span>{label}</span>
              <span style={{ 
                fontSize: '10.5px',
                padding: '1px 6px',
                borderRadius: '6px',
                backgroundColor: isSelected ? 'rgba(255,255,255,0.2)' : '#f4f4f5',
                color: isSelected ? '#ffffff' : isAlert ? 'var(--primary-red)' : '#71717a',
                fontWeight: 700
              }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* SEARCH AND MONTH FILTER BAR (COMPACT 1-LINE) */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.25rem', alignItems: 'center' }}>
        <div style={{ flex: '1', position: 'relative' }}>
          <Search size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#a1a1aa' }} />
          <input
            type="text"
            placeholder={tr('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control"
            style={{ 
              width: '100%',
              padding: '7px 10px 7px 32px',
              borderRadius: '8px',
              border: '1px solid #e4e4e7',
              fontSize: '12.5px',
              backgroundColor: '#ffffff'
            }}
          />
        </div>

        <select
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
          className="form-control"
          style={{ 
            width: 'auto',
            padding: '7px 10px',
            borderRadius: '8px',
            border: '1px solid #e4e4e7',
            fontSize: '12.5px',
            fontWeight: 650,
            backgroundColor: '#ffffff',
            cursor: 'pointer',
            flexShrink: 0
          }}
        >
          <option value="All">{tr('allMonths')}</option>
          {monthsList.map(m => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>
      </div>

      {/* SENARAI TEMPAHAN CARD GRID / LIST */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            SENARAI PESANAN KILANG ({filteredInvoices.length})
          </span>
          {statusFilter !== 'All' && (
            <button 
              onClick={() => setStatusFilter('All')} 
              style={{ background: 'none', border: 'none', color: '#b91c1c', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}
            >
              Reset Tapisan
            </button>
          )}
        </div>

        {loading && invoices.length === 0 ? (
          <div className="loading-state" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid var(--border-color)' }}>{tr('loadingData')}</div>
        ) : filteredInvoices.length === 0 ? (
          <div className="empty-state" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid var(--border-color)' }}>{tr('noData')}</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', gap: '1rem' }}>
            {filteredInvoices.map((inv) => {
              const isVoid = inv.status === 'Void';
              const currentKos = editedData[inv.id]?.pengeluaran !== undefined 
                ? editedData[inv.id].pengeluaran 
                : (inv.pengeluaran || '');
              
              const currentStatus = editedData[inv.id]?.order_status !== undefined 
                ? editedData[inv.id].order_status 
                : (inv.order_status || 'BELUM_DRAFT');

              const currentDueDate = editedData[inv.id]?.due_date !== undefined 
                ? editedData[inv.id].due_date 
                : (inv.due_date || '');

              const currentFactoryBank = editedData[inv.id]?.factory_payment_bank !== undefined 
                ? editedData[inv.id].factory_payment_bank 
                : (inv.factory_payment_bank || 'Bank Islam');

              const statusColor = 
                currentStatus === 'COMPLETED' ? '#16a34a' :
                currentStatus === 'PROCESSING' ? '#2563eb' :
                currentStatus === 'PENDING' ? '#d97706' :
                currentStatus === 'MAINTENANCE' ? '#dc2626' : '#71717a';

              return (
                <div 
                  key={inv.id} 
                  className="card"
                  style={{ 
                    padding: '1.25rem',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: isVoid ? '#fafafa' : '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.85rem',
                    transition: 'border-color 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--text-dark)' }}>#{inv.invoice_no}</span>
                        {isVoid && <span style={{ fontSize: '10px', fontWeight: 800, color: '#dc2626', background: '#fee2e2', padding: '1px 6px', borderRadius: '4px' }}>VOID</span>}
                      </div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 650, color: '#52525b', marginTop: '2px' }}>
                        {inv.client_name}
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                      <span style={{ 
                        fontSize: '11px', 
                        fontWeight: 700, 
                        color: statusColor, 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '4px',
                        padding: '3px 8px',
                        background: `${statusColor}15`,
                        borderRadius: '6px'
                      }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: statusColor }}></span>
                        {currentStatus.replace('_', ' ')}
                      </span>
                      <span style={{ 
                        fontSize: '10px', 
                        fontWeight: 650, 
                        color: '#52525b', 
                        background: '#f4f4f5', 
                        padding: '2px 6px', 
                        borderRadius: '4px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <Building2 size={11} color="var(--primary-red)" />
                        {currentFactoryBank}
                      </span>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.82rem', color: '#71717a', lineHeight: 1.4, borderTop: '1px dashed var(--border-color)', paddingTop: '0.65rem' }}>
                    {getItemSummary(inv)}
                  </div>

                  {/* Inline Controls (Kos Kilang, Status & Pilihan Bank) */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', background: '#f8f7f4', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 750, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '3px' }}>
                        Kos Kilang (RM)
                      </label>
                      <input 
                        type="number"
                        step="0.01"
                        min="0"
                        disabled={isVoid}
                        value={currentKos}
                        onChange={e => handleFieldChange(inv.id, 'pengeluaran', e.target.value)}
                        className="form-control"
                        style={{ 
                          width: '100%', 
                          padding: '0.35rem 0.5rem', 
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          borderRadius: '6px'
                        }}
                        placeholder="0.00"
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 750, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '3px' }}>
                        Status Kerja
                      </label>
                      <select
                        value={currentStatus}
                        onChange={e => handleFieldChange(inv.id, 'order_status', e.target.value)}
                        className="form-control"
                        style={{ 
                          width: '100%',
                          padding: '0.35rem 0.5rem', 
                          fontSize: '0.82rem',
                          fontWeight: 650,
                          borderRadius: '6px',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="BELUM_DRAFT">Belum Draft</option>
                        <option value="DRAFT">Draft</option>
                        <option value="PENDING">Pending</option>
                        <option value="PROCESSING">Processing</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="MAINTENANCE">Maintenance</option>
                      </select>
                    </div>

                    <div style={{ gridColumn: 'span 2' }}>
                      <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 750, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '3px' }}>
                        Pilihan Bank (Bayar Kos Kilang)
                      </label>
                      <select
                        value={currentFactoryBank}
                        onChange={e => handleFieldChange(inv.id, 'factory_payment_bank', e.target.value)}
                        className="form-control"
                        disabled={isVoid}
                        style={{ 
                          width: '100%',
                          padding: '0.35rem 0.5rem', 
                          fontSize: '0.82rem',
                          fontWeight: 650,
                          borderRadius: '6px',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="CIMB Bank">CIMB Bank (Aiman Hambali - 7656497860)</option>
                        <option value="Bank Islam">Bank Islam (Hidayatul Rizman - 05021020449003)</option>
                        <option value="Tunai">Tunai / Cash</option>
                      </select>
                    </div>

                    {currentStatus === 'PROCESSING' && (
                      <div style={{ gridColumn: 'span 2' }}>
                        <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 750, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '3px' }}>
                          Tarikh Siap Dijangka
                        </label>
                        <input
                          type="date"
                          value={currentDueDate}
                          onChange={e => handleFieldChange(inv.id, 'due_date', e.target.value)}
                          className="form-control"
                          style={{ 
                            width: '100%', 
                            padding: '0.35rem 0.5rem', 
                            fontSize: '0.82rem',
                            borderRadius: '6px',
                            cursor: 'pointer'
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', paddingTop: '0.35rem' }}>
                    <button 
                      disabled={isVoid}
                      onClick={() => handleSaveInline(inv)}
                      className="btn btn-primary"
                      style={{ 
                        flex: 1, 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        gap: '6px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        padding: '0.45rem 0.75rem',
                        borderRadius: '8px'
                      }}
                    >
                      <Save size={14} /> Simpan
                    </button>
                    <button 
                      onClick={() => { setSelectedVoucherInvoice(inv); setIsVoucherModalOpen(true); }}
                      className="btn btn-secondary"
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '6px',
                        fontSize: '0.8rem',
                        fontWeight: 650,
                        padding: '0.45rem 0.75rem',
                        borderRadius: '8px'
                      }}
                      title="Cetak Baucar Kilang"
                    >
                      <Printer size={14} /> Voucher
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* --- PAYMENT VOUCHER A4 MODAL --- */}
      {showVoucherModal && settings && (
        <div className="modal-overlay print-modal-overlay" onClick={() => setShowVoucherModal(false)}>
          <div className="modal-content A4-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header print-controls no-print">
              <div className="print-compact-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '0.75rem 1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontFamily: 'var(--font-primary)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--text-dark)' }}>
                    STATEMENT
                  </span>

                  <button
                    onClick={() => window.print()}
                    className="btn btn-primary btn-sm"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.4rem 0.8rem' }}
                  >
                    <Printer size={13} /> PRINT
                  </button>
                </div>

                <button className="modal-close" onClick={() => setShowVoucherModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', padding: 0 }}>
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="A4-scroll-wrapper" style={{ overflow: 'auto', flex: 1, padding: '0.25rem 0 1rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#ffffff' }}>
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
                <div
                  className="modal-body A4-sheet"
                  style={{
                    transform: `scale(${finalScale})`,
                    transformOrigin: 'top left',
                    margin: 0,
                    flex: 'none',
                    width: '210mm',
                    minHeight: '297mm',
                    overflow: 'visible'
                  }}
                >
                  <div className="invoice-container">
                    <div className="invoice-header print-avoid-break">
                      <div className="company-info-block">
                        {settings.company_logo ? (
                          <img src={settings.company_logo} alt="Company Logo" className="invoice-print-logo" />
                        ) : (
                          <img src={`${import.meta.env.BASE_URL}Logo%20Header.webp`} alt="Company Logo" className="invoice-print-logo" />
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

                    <div className="document-meta-block print-avoid-break">
                      <h2 className="document-type-title">PAYMENT VOUCHER</h2>
                      <div className="meta-details-box">
                        <div className="meta-row">
                          <span className="meta-lbl">Voucher No:</span>
                          <span className="meta-val font-bold">
                            &nbsp;PV-{new Date().getFullYear()}-{(new Date().getMonth() + 1).toString().padStart(2, '0')}
                          </span>
                        </div>
                        <div className="meta-row">
                          <span className="meta-lbl">Date:</span>
                          <span className="meta-val">&nbsp;{new Date().toLocaleDateString('en-GB')}</span>
                        </div>
                        <div className="meta-row">
                          <span className="meta-lbl">Month:</span>
                          <span className="meta-val font-bold">&nbsp;{currentMonthLabel.toUpperCase()}</span>
                        </div>
                      </div>
                    </div>

                    <hr className="divider-line print-avoid-break" />

                    <div className="invoice-billing-block print-avoid-break" style={{ marginBottom: '0.2rem' }}>
                      <span className="section-title-print">PRODUCTION & REVENUE DETAILS:</span>
                    </div>

                    <div className="invoice-table-section">
                      <table className="table invoice-print-table">
                        <thead>
                          <tr>
                            <th style={{ width: '35px', textAlign: 'center' }}>No</th>
                            <th style={{ textAlign: 'left' }}>No. Invoice</th>
                            <th style={{ textAlign: 'left' }}>Client Name</th>
                            <th style={{ width: '80px', textAlign: 'center' }}>Status</th>
                            <th style={{ width: '100px', textAlign: 'center' }}>Total Invoice<br/>(RM)</th>
                            <th style={{ width: '100px', textAlign: 'center' }}>Production Cost<br/>(RM)</th>
                            <th style={{ width: '100px', textAlign: 'center' }}>Profit<br/>(RM)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {baseInvoices.length === 0 ? (
                            <tr>
                              <td colSpan="7" style={{ textAlign: 'center', padding: '0.75rem' }}>No production records for this month.</td>
                            </tr>
                          ) : (
                            [...baseInvoices]
                              .sort((a, b) => (a.invoice_no || '').localeCompare(b.invoice_no || ''))
                              .map((inv, idx) => {
                              const isVoid = inv.status === 'Void';
                              const total = parseFloat(inv.grand_total || 0);
                              const pengeluaran = parseFloat(inv.pengeluaran || 0);
                              const paid = isVoid ? 0 : inv.status === 'Paid' ? total : parseFloat(inv.deposit || 0);
                              const untung = isVoid ? 0 : (paid - pengeluaran);

                              return (
                                <tr key={inv.id} className="print-avoid-break" style={isVoid ? { opacity: 0.6 } : {}}>
                                  <td style={{ textAlign: 'center', verticalAlign: 'middle', padding: '0.35rem 0.25rem' }}>{idx + 1}.</td>
                                  <td style={{ textAlign: 'left', verticalAlign: 'middle', padding: '0.35rem 0.25rem' }} className="font-bold">{inv.invoice_no}</td>
                                  <td style={{ textAlign: 'left', verticalAlign: 'middle', padding: '0.35rem 0.25rem' }}>{inv.client_name}</td>
                                  <td style={{ textAlign: 'center', verticalAlign: 'middle', padding: '0.35rem 0.25rem' }}>
                                    <span className={`badge ${getStatusBadgeClass(inv.status)}`} style={{ padding: '0.1rem 0.4rem', fontSize: '0.68rem' }}>
                                      {getStatusText(inv.status)}
                                    </span>
                                  </td>
                                  <td style={{ textAlign: 'center', verticalAlign: 'middle', padding: '0.35rem 0.25rem' }}>
                                    {isVoid ? <span style={{ textDecoration: 'line-through', color: '#94a3b8' }}>{total.toFixed(2)}</span> : total.toFixed(2)}
                                  </td>
                                  <td style={{ textAlign: 'center', verticalAlign: 'middle', padding: '0.35rem 0.25rem', color: isVoid ? '#94a3b8' : 'var(--primary-red)' }}>
                                    {isVoid ? '-' : pengeluaran.toFixed(2)}
                                  </td>
                                  <td style={{ textAlign: 'center', verticalAlign: 'middle', padding: '0.35rem 0.25rem', color: isVoid ? '#94a3b8' : '#15803D' }} className="font-bold">
                                    {isVoid ? '-' : untung.toFixed(2)}
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>

                    <hr className="divider-line print-avoid-break" style={{ margin: '0.4rem 0' }} />

                    <div className="invoice-calculations-section print-avoid-break" style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'flex-start', margin: '0.2rem 0' }}>
                      <div style={{ flex: 1, paddingRight: '2rem' }}>
                        <span className="section-title-print" style={{ marginBottom: '0.3rem', display: 'block' }}>TOTAL SALES VALUE</span>
                        <div className="summary-print-row" style={{ justifyContent: 'space-between', fontSize: '0.72rem', color: '#111' }}>
                          <span>Total Invoice Value:</span>
                          <span className="font-bold">RM {totalNilaiInvois.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="calculation-invoice-summary" style={{ width: '340px' }}>
                        <span className="section-title-print" style={{ marginBottom: '0.3rem', display: 'block', textAlign: 'left' }}>CASHFLOW & PROFIT</span>
                        <div className="summary-print-row" style={{ fontSize: '0.72rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span>Cash Received (Paid + Deposit):</span>
                          <span className="font-bold" style={{ color: '#111' }}>RM {totalDuitDiterima.toFixed(2)}</span>
                        </div>
                        <div className="summary-print-row" style={{ fontSize: '0.72rem', color: 'var(--primary-red)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.2rem' }}>
                          <span>Production Cost:</span>
                          <span className="font-bold">- RM {totalPengeluaran.toFixed(2)}</span>
                        </div>
                        <div className="summary-print-row grand-total-row-print" style={{ borderTop: '1px solid #111', marginTop: '0.35rem', paddingTop: '0.35rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 800 }}>NET PROFIT:</span>
                          <span style={{ color: '#15803D', fontSize: '0.82rem', fontWeight: 800 }}>RM {untungSebenar.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <hr className="divider-line print-avoid-break" style={{ margin: '0.4rem 0' }} />

                    <div className="invoice-bottom-grid print-avoid-break" style={{ marginBottom: 0 }}>
                      <div className="bottom-grid-left" style={{ width: '100%' }}>
                        <div className="terms-container">
                          <span className="section-title-print">NOTES:</span>
                          <p style={{ fontSize: '0.72rem', color: '#555', marginTop: '0.1rem' }}>
                            This payment voucher is automatically generated for internal production and financial records.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="thank-you-footer print-avoid-break" style={{ marginTop: 'auto', paddingTop: '0.3rem' }}>
                      <p style={{ margin: 0 }}>THIRTYONE LAB DESIGN - INTERNAL FINANCIAL STATEMENT</p>
                      <p style={{ textTransform: 'none', fontWeight: '500', fontStyle: 'italic', letterSpacing: '0.5px', marginTop: '0.1rem', color: '#777', fontSize: '0.6rem', margin: 0 }}>Wear With Pride.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- SINGLE INVOICE KILANG VOUCHER MODAL --- */}
      {isVoucherModalOpen && selectedVoucherInvoice && (
        <KilangVoucherModal 
          isOpen={isVoucherModalOpen}
          onClose={() => {
            setIsVoucherModalOpen(false);
            setSelectedVoucherInvoice(null);
          }}
          invoice={selectedVoucherInvoice}
          settings={settings}
        />
      )}

      <style>{`
        /* Common Print Voucher Styles */
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
          flex-shrink: 0;
        }

        .company-text {
          display: flex;
          flex-direction: column;
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
          margin: 0;
        }

        .company-print-details.address {
          max-width: 320px;
        }

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

        .A4-sheet {
          width: 210mm;
          min-height: 297mm;
          box-sizing: border-box;
          background: #ffffff;
          padding: 12mm;
          box-shadow: none;
          border: none;
          margin: 0 auto;
          overflow: visible;
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

        .divider-line {
          border: none;
          border-top: 1px solid #111111;
          margin: 0.15rem 0;
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

        .meta-lbl {
          color: #555555;
          min-width: 85px;
          font-weight: 600;
        }

        .meta-val {
          color: #111111;
          font-weight: 700;
        }

        .summary-box {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding: 1.25rem;
        }

        .summary-label {
          font-family: var(--font-primary);
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .summary-val {
          font-size: 1.25rem;
          font-weight: 700;
        }

        .search-filters-bar {
          display: flex !important;
          flex-direction: row !important;
          align-items: flex-end !important;
          gap: 1.25rem !important;
          flex-wrap: nowrap !important;
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
          flex: 1;
          min-width: 200px;
          height: 42px;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          color: var(--text-light);
        }

        .search-input {
          padding-left: 2.75rem;
          width: 100%;
          height: 42px;
        }

        .filter-group-row {
          display: flex !important;
          flex-direction: row !important;
          gap: 1rem !important;
          align-items: flex-end !important;
          flex-shrink: 0 !important;
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

        .print-stmt-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          height: 42px;
          align-self: flex-end;
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .modal-header.print-controls {
            flex-direction: row !important;
            flex-wrap: nowrap !important;
          }
          .mfg-summary-row {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.75rem !important;
          }

          .search-filters-bar {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 1rem !important;
            padding: 1.25rem !important;
          }

          .search-box {
            width: 100% !important;
          }

          .filter-group-row {
            display: flex !important;
            flex-direction: column !important;
            width: 100% !important;
            gap: 0.75rem !important;
            align-items: stretch !important;
          }

          .filter-box {
            width: 100% !important;
          }

          .print-stmt-btn {
            width: 100% !important;
            justify-content: center !important;
            height: 42px !important;
          }
        }

        @media (max-width: 768px) {
          .A4-scroll-wrapper {
            align-items: flex-start !important;
            padding-top: 0.25rem !important;
          }
          .A4-scale-container {
            width: 100% !important;
            height: auto !important;
          }
          .A4-sheet {
            width: 100% !important;
            min-height: auto !important;
            transform: none !important;
            padding: 12mm 10mm !important;
          }
          .modal-header.print-controls {
            flex-direction: row !important;
            flex-wrap: nowrap !important;
          }
        }
      `}</style>
    </div>
  );
}
