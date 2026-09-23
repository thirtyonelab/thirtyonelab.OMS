import React, { useState, useEffect, useMemo } from 'react';
import { getInvoices, deleteInvoice } from '../services/storage';
import { Search, Plus, Eye, Edit2, RefreshCw, Trash2, LayoutGrid, List, Clock, FileText, CheckCircle2, AlertTriangle, Factory, Truck, ChevronRight, Calendar, SlidersHorizontal, Wallet } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { money, balanceOf, quantityOf, productionStates, deliveryStates, needsAction } from '../utils/mobileOrders';

export default function Invoices({ onOpenInvoiceModal, onOpenPaymentModal, onOpenInvoiceDetail }) {
  const { tr, language } = useLanguage();
  const [invoices, setInvoices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [actionFilter, setActionFilter] = useState('all'); // 'all' | 'late' | 'draft' | 'balance' | 'unpaid'
  const [monthFilter, setMonthFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    setLoading(true);
    try {
      const data = await getInvoices();
      const sortedData = data.sort((a, b) => b.invoice_no.localeCompare(a.invoice_no));
      setInvoices(sortedData);
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

  // Status counts
  const lateCount = useMemo(() => invoices.filter(inv => needsAction(inv, 'late')).length, [invoices]);
  const draftCount = useMemo(() => invoices.filter(inv => needsAction(inv, 'draft')).length, [invoices]);
  const balanceCount = useMemo(() => invoices.filter(inv => needsAction(inv, 'balance')).length, [invoices]);
  const unpaidCount = useMemo(() => invoices.filter(inv => inv.status === 'Unpaid').length, [invoices]);

  // Filter Logic
  const filteredInvoices = useMemo(() => {
    return invoices.filter(inv => {
      // Search
      const text = `${inv.client_name || ''} ${inv.invoice_no || ''} ${inv.job_name || ''} ${inv.client_phone || ''}`.toLowerCase();
      if (searchQuery.trim() && !text.includes(searchQuery.toLowerCase().trim())) return false;

      // Status dropdown
      if (statusFilter !== 'All' && inv.status !== statusFilter) return false;

      // Month dropdown
      if (monthFilter !== 'All') {
        const invDate = new Date(inv.date);
        if (invDate.getMonth() !== parseInt(monthFilter, 10)) return false;
      }

      // Quick Action Chips Filter
      if (actionFilter === 'late' && !needsAction(inv, 'late')) return false;
      if (actionFilter === 'draft' && !needsAction(inv, 'draft')) return false;
      if (actionFilter === 'balance' && !needsAction(inv, 'balance')) return false;
      if (actionFilter === 'unpaid' && inv.status !== 'Unpaid') return false;

      return true;
    });
  }, [invoices, searchQuery, statusFilter, monthFilter, actionFilter]);

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

  const getStatusDotClass = (status) => {
    switch (status) {
      case 'Paid': return 'badge-paid';
      case 'Deposit': return 'badge-deposit';
      case 'Unpaid': return 'badge-unpaid';
      case 'Void': return 'badge-void';
      default: return 'badge-void';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'Paid': return 'Lunas';
      case 'Deposit': return 'Deposit';
      case 'Unpaid': return 'Belum Bayar';
      case 'Void': return 'Dibatalkan';
      default: return status;
    }
  };

  return (
    <div className="main-content" style={{ padding: 'clamp(1rem, 2.5vw, 2rem)', maxWidth: '1440px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      {/* Responsive Header (Visible on Desktop & Mobile) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', gap: '0.75rem', flexWrap: 'wrap' }}>
        <div>
          <span className="section-tag" style={{ fontSize: '10.5px', fontWeight: 800, color: 'var(--primary-red)', letterSpacing: '1px' }}>{tr('ordersTag')}</span>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '900', letterSpacing: '-0.5px', margin: '2px 0 0 0', color: 'var(--text-dark)' }}>
            Invois & Tempahan<span style={{ color: 'var(--primary-red)' }}>.</span>
          </h1>
          <p className="desktop-only" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '3px', marginBottom: 0 }}>
            Urus semua tempahan jualan, semak status kilang, dan rekod baki bayaran.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {/* View Toggle (Desktop Only) */}
          <div className="desktop-only" style={{ background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '3px' }}>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                background: viewMode === 'grid' ? '#18181b' : 'none',
                color: viewMode === 'grid' ? '#ffffff' : 'var(--text-muted)',
                border: 0,
                borderRadius: '6px',
                padding: '6px 10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '0.8rem',
                fontWeight: 650
              }}
              title="Paparan Kad Bento"
            >
              <LayoutGrid size={15} /> Kad
            </button>
            <button
              onClick={() => setViewMode('table')}
              style={{
                background: viewMode === 'table' ? '#18181b' : 'none',
                color: viewMode === 'table' ? '#ffffff' : 'var(--text-muted)',
                border: 0,
                borderRadius: '6px',
                padding: '6px 10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '0.8rem',
                fontWeight: 650
              }}
              title="Paparan Jadual"
            >
              <List size={15} /> Jadual
            </button>
          </div>

          <button 
            onClick={() => onOpenInvoiceModal(null)} 
            className="btn btn-primary" 
            style={{ 
              background: '#18181b', 
              color: '#ffffff', 
              border: '1px solid #18181b', 
              borderRadius: '8px', 
              padding: '0.55rem 1rem', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px', 
              fontWeight: 700,
              fontSize: '0.85rem',
              flexShrink: 0
            }}
          >
            <Plus size={16} strokeWidth={2.5} /> {tr('newOrder')}
          </button>
        </div>
      </div>

      {/* Action Filter Chips (Clean Icon Badges, Zero Emojis) */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        overflowX: 'auto', 
        paddingBottom: '6px', 
        marginBottom: '14px', 
        scrollbarWidth: 'none',
        flexShrink: 0,
        alignItems: 'center',
        minHeight: '42px'
      }}>
        {[
          { key: 'all', label: 'Semua', count: invoices.length, Icon: FileText },
          { key: 'late', label: 'Lewat Siap', count: lateCount, Icon: Clock, isAlert: lateCount > 0 },
          { key: 'draft', label: 'Belum Masuk Kilang', count: draftCount, Icon: Factory },
          { key: 'balance', label: 'Siap & Ada Baki', count: balanceCount, Icon: CheckCircle2 },
          { key: 'unpaid', label: 'Belum Bayar', count: unpaidCount, Icon: Wallet, isAlert: unpaidCount > 0 },
        ].map(({ key, label, count, Icon, isAlert }) => {
          const isSelected = actionFilter === key;
          return (
            <button
              key={key}
              onClick={() => setActionFilter(key)}
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
                background: isSelected ? '#18181b' : '#ffffff',
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
                background: isSelected ? 'rgba(255,255,255,0.2)' : '#f4f4f5',
                color: isSelected ? '#ffffff' : isAlert ? 'var(--primary-red)' : '#71717a',
                fontWeight: 700
              }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Modern Compact Search & Dropdown Filters Toolbar */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        marginBottom: '16px', 
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        {/* Search input with leading icon and clear button */}
        <div style={{ flex: '1 1 240px', position: 'relative', minWidth: '200px' }}>
          <Search size={15} style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)', color: '#a1a1aa' }} />
          <input
            type="text"
            placeholder="Cari nama pelanggan, no. invois, atau projek..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control"
            style={{ 
              width: '100%',
              padding: '7px 28px 7px 34px',
              borderRadius: '8px',
              border: '1px solid #e4e4e7',
              fontSize: '12.5px',
              backgroundColor: '#ffffff',
              height: '36px',
              boxSizing: 'border-box'
            }}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')} 
              style={{ 
                position: 'absolute', 
                right: '8px', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                background: 'none', 
                border: 0, 
                cursor: 'pointer', 
                color: '#a1a1aa', 
                padding: '2px 4px', 
                fontSize: '12px' 
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Month Dropdown with Icon */}
        <div style={{ position: 'relative', flex: '0 0 auto' }}>
          <Calendar size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#71717a', pointerEvents: 'none' }} />
          <select
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            className="form-control"
            style={{ 
              padding: '7px 10px 7px 30px', 
              borderRadius: '8px', 
              border: '1px solid #e4e4e7', 
              fontSize: '12.5px', 
              fontWeight: 650, 
              backgroundColor: '#ffffff',
              height: '36px',
              cursor: 'pointer',
              width: 'auto'
            }}
          >
            <option value="All">Semua Bulan</option>
            {monthsList.map(m => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>

        {/* Status Dropdown with Icon */}
        <div style={{ position: 'relative', flex: '0 0 auto' }}>
          <SlidersHorizontal size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#71717a', pointerEvents: 'none' }} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-control"
            style={{ 
              padding: '7px 10px 7px 30px', 
              borderRadius: '8px', 
              border: '1px solid #e4e4e7', 
              fontSize: '12.5px', 
              fontWeight: 650, 
              backgroundColor: '#ffffff',
              height: '36px',
              cursor: 'pointer',
              width: 'auto'
            }}
          >
            <option value="All">Semua Status</option>
            <option value="Paid">Lunas</option>
            <option value="Deposit">Deposit</option>
            <option value="Unpaid">Belum Bayar</option>
            <option value="Void">Dibatalkan</option>
          </select>
        </div>

        {/* Refresh Button */}
        <button 
          onClick={loadInvoices}
          className="btn btn-secondary"
          style={{ 
            padding: '7px 11px', 
            height: '36px', 
            borderRadius: '8px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            border: '1px solid #e4e4e7',
            backgroundColor: '#ffffff',
            cursor: 'pointer',
            flexShrink: 0
          }}
          title="Muat Semula"
        >
          <RefreshCw size={14} className={loading ? 'm-spin' : ''} />
        </button>

        {/* Reset Active Filters Button */}
        {(monthFilter !== 'All' || statusFilter !== 'All' || actionFilter !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              setMonthFilter('All');
              setStatusFilter('All');
              setActionFilter('all');
              setSearchQuery('');
            }}
            style={{
              background: 'none',
              border: 0,
              color: 'var(--primary-red, #c51b27)',
              fontSize: '12px',
              fontWeight: 650,
              cursor: 'pointer',
              padding: '4px 6px',
              textDecoration: 'underline'
            }}
          >
            Reset Tapisan
          </button>
        )}
      </div>

      {/* Content Rendering: Bento Cards (Default) or Table View */}
      {loading ? (
        <div style={{ background: '#ffffff', padding: '3rem', borderRadius: '12px', textAlign: 'center', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
          <RefreshCw size={24} className="m-spin" style={{ margin: '0 auto 10px', display: 'block' }} />
          Memuatkan senarai tempahan...
        </div>
      ) : filteredInvoices.length === 0 ? (
        <div style={{ background: '#ffffff', padding: '3.5rem 2rem', borderRadius: '12px', textAlign: 'center', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
          <FileText size={36} color="var(--border-color)" style={{ margin: '0 auto 12px', display: 'block' }} />
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '4px' }}>Tiada tempahan ditemui</h3>
          <p style={{ fontSize: '13px', margin: '0 0 16px' }}>Cuba tukar kata kunci carian atau tetapan tapisan anda.</p>
          <button onClick={() => onOpenInvoiceModal(null)} className="btn btn-primary" style={{ padding: '8px 16px', background: '#18181b', border: '1px solid #18181b' }}>
            <Plus size={15} /> Cipta Tempahan Baharu
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* Bento Card Grid */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', gap: '16px' }}>
          {filteredInvoices.map((inv) => {
            const isLate = needsAction(inv, 'late');
            const remaining = balanceOf(inv);
            const prodState = productionStates[inv.order_status] || inv.order_status || 'Belum Draft';
            const totalQty = quantityOf(inv);

            return (
              <div 
                key={inv.id} 
                style={{
                  background: '#ffffff',
                  border: isLate ? '1.5px solid #f87171' : '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '18px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                  position: 'relative'
                }}
              >
                {/* Top Row: Invoice No & Fintech Status Dot */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.5px', color: 'var(--text-muted)' }}>
                    {inv.invoice_no || 'DRAFT'}
                  </span>
                  <span className={`badge ${getStatusDotClass(inv.status)}`}>
                    {getStatusLabel(inv.status)}
                  </span>
                </div>

                {/* Client & Project Info */}
                <div style={{ cursor: 'pointer' }} onClick={() => onOpenInvoiceDetail(inv)}>
                  <h2 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-dark)', margin: 0, lineHeight: 1.3 }}>
                    {inv.client_name || 'Pelanggan'}
                  </h2>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '4px 0 0', lineHeight: 1.4 }}>
                    {inv.job_name || 'Tempahan Pakaian / Percetakan'}
                  </p>
                  {inv.client_phone && (
                    <span style={{ fontSize: '11px', color: 'var(--text-light)', display: 'inline-block', marginTop: '2px' }}>
                      📞 {inv.client_phone}
                    </span>
                  )}
                </div>

                {/* Amount & Specs Banner */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  background: '#f8f7f4', 
                  padding: '10px 14px', 
                  borderRadius: '8px', 
                  border: '1px solid #e6e2d8' 
                }}>
                  <span style={{ fontSize: '12px', fontWeight: 650, color: 'var(--text-muted)' }}>
                    {totalQty > 0 ? `${totalQty} pcs` : 'Item Khas'}
                  </span>
                  <strong style={{ fontSize: '17px', fontWeight: 850, color: 'var(--text-dark)' }}>
                    {money(inv.grand_total)}
                  </strong>
                </div>

                {/* Production Status & Due Date */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ 
                      width: '7px', 
                      height: '7px', 
                      borderRadius: '50%', 
                      background: inv.order_status === 'COMPLETED' ? '#16a34a' : inv.order_status === 'PROCESSING' ? '#d97706' : '#a1a1aa' 
                    }} />
                    {prodState}
                  </span>
                  {inv.due_date && (
                    <span style={{ color: isLate ? 'var(--primary-red)' : 'var(--text-muted)', fontWeight: isLate ? 750 : 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} />
                      {new Date(`${inv.due_date}T12:00:00`).toLocaleDateString('ms-MY', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  )}
                </div>

                {/* Remaining Balance Indicator */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  paddingTop: '8px', 
                  borderTop: '1px solid #f4f4f5',
                  fontSize: '12px'
                }}>
                  <span style={{ color: 'var(--text-muted)' }}>Baki Bayaran:</span>
                  <strong style={{ color: remaining > 0 ? 'var(--primary-red)' : '#16a34a', fontWeight: 750 }}>
                    {remaining > 0 ? money(remaining) : 'Lunas (RM 0.00)'}
                  </strong>
                </div>

                {/* Card Action Buttons */}
                <div style={{ display: 'grid', gridTemplateColumns: remaining > 0 ? '1fr 1fr auto auto' : '1fr auto auto', gap: '6px', marginTop: '4px' }}>
                  <button
                    onClick={() => onOpenInvoiceDetail(inv)}
                    className="btn btn-secondary"
                    style={{ padding: '7px 10px', fontSize: '11.5px', fontWeight: 650, borderRadius: '6px', background: '#18181b', color: '#ffffff', border: '1px solid #18181b' }}
                  >
                    <Eye size={13} /> Lihat
                  </button>

                  {remaining > 0 && (
                    <button
                      onClick={() => onOpenPaymentModal(inv)}
                      className="btn btn-secondary"
                      style={{ padding: '7px 10px', fontSize: '11.5px', fontWeight: 650, borderRadius: '6px', color: '#92400e', background: '#fffbeb', border: '1px solid #fde68a' }}
                    >
                      <RefreshCw size={13} /> Bayar
                    </button>
                  )}

                  <button
                    onClick={() => onOpenInvoiceModal(inv)}
                    className="btn btn-secondary"
                    style={{ padding: '7px 10px', fontSize: '11.5px', fontWeight: 650, borderRadius: '6px' }}
                    title="Edit Invois"
                  >
                    <Edit2 size={13} />
                  </button>

                  <button
                    onClick={() => handleDelete(inv.id, inv.invoice_no)}
                    className="btn btn-secondary"
                    style={{ padding: '7px 10px', fontSize: '11.5px', fontWeight: 650, borderRadius: '6px', color: 'var(--primary-red)', borderColor: '#fecaca' }}
                    title="Padam Invois"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Clean Table View */
        <div style={{ background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f7f4', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '12px', color: 'var(--text-muted)' }}>NO. INVOIS</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '12px', color: 'var(--text-muted)' }}>PELANGGAN & PROJEK</th>
                <th style={{ textAlign: 'center', padding: '12px 16px', fontSize: '12px', color: 'var(--text-muted)' }}>TARIKH</th>
                <th style={{ textAlign: 'right', padding: '12px 16px', fontSize: '12px', color: 'var(--text-muted)' }}>JUMLAH (RM)</th>
                <th style={{ textAlign: 'center', padding: '12px 16px', fontSize: '12px', color: 'var(--text-muted)' }}>STATUS</th>
                <th style={{ textAlign: 'center', padding: '12px 16px', fontSize: '12px', color: 'var(--text-muted)' }}>TINDAKAN</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 800, fontSize: '13px' }}>{inv.invoice_no}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 750, color: 'var(--text-dark)', fontSize: '14px' }}>{inv.client_name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{inv.job_name || inv.client_phone}</div>
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)' }}>{inv.date}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'right', fontWeight: 800, fontSize: '14px' }}>
                    {money(inv.grand_total)}
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                    <span className={`badge ${getStatusDotClass(inv.status)}`}>
                      {getStatusLabel(inv.status)}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      <button onClick={() => onOpenInvoiceDetail(inv)} className="btn btn-secondary btn-sm" style={{ padding: '4px 8px', fontSize: '11px' }}>
                        <Eye size={12} /> Lihat
                      </button>
                      <button onClick={() => onOpenInvoiceModal(inv)} className="btn btn-secondary btn-sm" style={{ padding: '4px 8px', fontSize: '11px' }}>
                        <Edit2 size={12} /> Edit
                      </button>
                      {balanceOf(inv) > 0 && (
                        <button onClick={() => onOpenPaymentModal(inv)} className="btn btn-secondary btn-sm" style={{ padding: '4px 8px', fontSize: '11px', color: '#92400e', background: '#fffbeb', borderColor: '#fde68a' }}>
                          <RefreshCw size={12} /> Bayar
                        </button>
                      )}
                      <button onClick={() => handleDelete(inv.id, inv.invoice_no)} className="btn btn-secondary btn-sm" style={{ padding: '4px 8px', fontSize: '11px', color: 'var(--primary-red)', borderColor: '#fecaca' }}>
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
