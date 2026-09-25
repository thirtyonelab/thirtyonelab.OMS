import React, { useState, useEffect, useMemo } from 'react';
import { getInvoices, getLedger } from '../services/storage';
import { Search, Plus, ArrowUpRight, Eye, RefreshCw, CreditCard, Clock, AlertTriangle, CheckCircle2, Factory, Truck, Wallet, FileText, ChevronRight, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { formatTelegramStatus } from '../utils/telegramFormatter.js';
import { money, balanceOf, quantityOf, productionStates, deliveryStates, needsAction, getOrderCategoryLabel } from '../utils/mobileOrders';

const TelegramIcon = ({ size = 16, className = '' }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.892-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

export default function Dashboard({ setActiveTab, onOpenInvoiceModal, onOpenPaymentModal, onOpenInvoiceDetail }) {
  const { tr } = useLanguage();
  const [invoices, setInvoices] = useState(() => {
    try {
      const stored = localStorage.getItem('oms_invoices');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [ledger, setLedger] = useState(() => {
    try {
      const stored = localStorage.getItem('oms_ledger');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(false);

  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth().toString());
  const [selectedYear, setSelectedYear] = useState(now.getFullYear().toString());

  const monthsList = [
    { value: '0', label: 'Jan' },
    { value: '1', label: 'Feb' },
    { value: '2', label: 'Mar' },
    { value: '3', label: 'Apr' },
    { value: '4', label: 'May' },
    { value: '5', label: 'Jun' },
    { value: '6', label: 'Jul' },
    { value: '7', label: 'Aug' },
    { value: '8', label: 'Sep' },
    { value: '9', label: 'Oct' },
    { value: '10', label: 'Nov' },
    { value: '11', label: 'Dec' }
  ];

  const yearsList = [
    (now.getFullYear()).toString(),
    (now.getFullYear() - 1).toString(),
    (now.getFullYear() - 2).toString()
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const invs = await getInvoices();
      setInvoices(invs);
      const ledg = await getLedger();
      setLedger(ledg);
    } catch (e) {
      console.error('Error loading data in dashboard:', e);
    } finally {
      setLoading(false);
    }
  };

  const [tgStatus, setTgStatus] = useState('idle');

  const handleSendTelegram = async () => {
    setTgStatus('sending');
    try {
      const text = formatTelegramStatus(invoices);
      const url = import.meta.env.VITE_SUPABASE_URL;
      const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
      if (!url) throw new Error("Supabase URL tidak dijumpai.");
      const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
      const funcUrl = `${baseUrl}/functions/v1/tg-send`;
      const res = await fetch(funcUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(key ? { 'Authorization': `Bearer ${key}`, 'apikey': key } : {})
        },
        body: JSON.stringify({ text })
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP ${res.status}`);
      }
      setTgStatus('sent');
      setTimeout(() => setTgStatus('idle'), 3000);
    } catch (error) {
      setTgStatus(`error: ${error.message}`);
      setTimeout(() => setTgStatus('idle'), 4000);
    }
  };

  // Metrics
  const metrics = useMemo(() => {
    const currentMonth = parseInt(selectedMonth, 10);
    const currentYear = parseInt(selectedYear, 10);

    let collectedInvoicesMonth = 0;
    let kosKilangMonth = 0;
    let unpaidBalanceMonth = 0;

    invoices.forEach(inv => {
      if (inv.status === 'Void') return;
      const invDate = new Date(inv.date);
      const isCurrentMonth = invDate.getMonth() === currentMonth && invDate.getFullYear() === currentYear;

      if (isCurrentMonth) {
        const grandTotal = parseFloat(inv.grand_total || 0);
        const deposit = parseFloat(inv.deposit || 0);
        const hasPayment = inv.status === 'Paid' || inv.status === 'Deposit' || deposit > 0;

        if (hasPayment) {
          const paidAmount = inv.status === 'Paid' ? grandTotal : deposit;
          const unpaid = inv.status === 'Paid' ? 0 : Math.max(0, grandTotal - deposit);

          collectedInvoicesMonth += paidAmount;
          kosKilangMonth += parseFloat(inv.pengeluaran || 0);
          unpaidBalanceMonth += unpaid;
        }
      }
    });

    let ledgerINMonth = 0;
    let ledgerOUTMonth = 0;

    ledger.forEach(entry => {
      const entryDate = new Date(entry.date);
      const isCurrentMonth = entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear;

      if (isCurrentMonth) {
        if (entry.type === 'IN') {
          ledgerINMonth += parseFloat(entry.amount || 0);
        } else {
          ledgerOUTMonth += parseFloat(entry.amount || 0);
        }
      }
    });

    const totalKutipanJualan = collectedInvoicesMonth + ledgerINMonth;
    const totalKosKeluar = kosKilangMonth + ledgerOUTMonth;
    const untungBersih = totalKutipanJualan - totalKosKeluar;

    const lateCount = invoices.filter(inv => needsAction(inv, 'late')).length;
    const draftCount = invoices.filter(inv => needsAction(inv, 'draft')).length;
    const balanceCount = invoices.filter(inv => needsAction(inv, 'balance')).length;
    const dispatchCount = invoices.filter(inv => needsAction(inv, 'dispatch')).length;
    const actionableCount = lateCount + draftCount + balanceCount + dispatchCount;

    return {
      totalKutipanJualan,
      totalKosKeluar,
      untungBersih,
      collectedInvoicesMonth,
      kosKilangMonth,
      ledgerOUTMonth,
      unpaidBalanceMonth,
      lateCount,
      draftCount,
      balanceCount,
      dispatchCount,
      actionableCount
    };
  }, [invoices, ledger, selectedMonth, selectedYear]);

  const recentOrders = useMemo(() => {
    return [...invoices].sort((a, b) => b.invoice_no.localeCompare(a.invoice_no)).slice(0, 6);
  }, [invoices]);

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
    <div className="main-content" style={{ padding: '16px', maxWidth: '1440px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', gap: '10px', flexWrap: 'wrap' }}>
        <div>
          <span style={{ fontSize: '11.5px', fontWeight: 750, color: 'var(--primary-red, #c51b27)', letterSpacing: '0.6px', textTransform: 'uppercase' }}>
            THIRTYONE LAB OMS
          </span>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 900, letterSpacing: '-0.3px', margin: '2px 0 0', color: 'var(--text-dark)' }}>
            Dashboard Operasi<span style={{ color: 'var(--primary-red)' }}>.</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '3px 0 0' }}>
            {new Date().toLocaleDateString('ms-MY', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        {/* Toolbar Controls */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', width: '100%', maxWidth: '100%', marginTop: '6px' }}>
          {/* Month & Year Select */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0 8px', height: '36px', flex: '1 1 auto', minWidth: 0 }}>
            <Calendar size={13} color="var(--text-muted)" style={{ flexShrink: 0 }} />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              style={{ border: 'none', outline: 'none', background: 'transparent', padding: '0 1px', fontSize: '12px', fontWeight: 700, color: 'var(--text-dark)', cursor: 'pointer', minWidth: 0 }}
            >
              {monthsList.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
            </select>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              style={{ border: 'none', outline: 'none', background: 'transparent', padding: '0 1px', fontSize: '12px', fontWeight: 700, color: 'var(--text-dark)', cursor: 'pointer', minWidth: 0 }}
            >
              {yearsList.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          {/* Telegram Status Button */}
          <button
            onClick={handleSendTelegram}
            disabled={tgStatus === 'sending'}
            className="btn btn-secondary"
            style={{ 
              background: '#ffffff', 
              border: '1px solid var(--border-color)', 
              color: '#0088cc', 
              borderRadius: '8px', 
              padding: '0 10px', 
              height: '36px',
              fontSize: '12px', 
              fontWeight: 650,
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
            title="Hantar ringkasan ke Telegram"
          >
            <TelegramIcon size={13} /> {tgStatus === 'sending' ? 'Hantar...' : tgStatus === 'sent' ? 'Dihantar!' : 'Send Status'}
          </button>

          {/* New Order Button */}
          <button 
            onClick={() => onOpenInvoiceModal(null)} 
            className="btn btn-primary" 
            style={{ 
              background: '#18181b', 
              color: '#ffffff', 
              border: '1px solid #18181b', 
              borderRadius: '8px', 
              padding: '0 11px', 
              height: '36px',
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px', 
              fontWeight: 700,
              fontSize: '12px',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >
            <Plus size={15} strokeWidth={2.5} /> Tempahan
          </button>
        </div>
      </div>

      {/* Hero Net Profit Card */}
      <div style={{
        background: '#ffffff',
        border: '1px solid var(--border-color)',
        borderRadius: '14px',
        padding: '16px 18px',
        marginBottom: '14px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        {/* Top Net Profit Header */}
        <div style={{ paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 750, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              UNTUNG BERSIH (BULAN INI)
            </span>
            <span style={{ 
              fontSize: '10.5px', 
              fontWeight: 700, 
              padding: '2px 8px', 
              borderRadius: '6px', 
              background: '#ecfdf5', 
              color: '#065f46', 
              border: '1px solid #a7f3d0',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></span>
              Aliran Tunai Sebenar (Cash-In)
            </span>
          </div>
          <div style={{ 
            fontSize: '1.95rem', 
            fontWeight: 900, 
            color: metrics.untungBersih >= 0 ? '#166534' : 'var(--primary-red)', 
            margin: '4px 0 2px',
            lineHeight: 1.15
          }}>
            {money(metrics.untungBersih)}
          </div>
          <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
            Kutipan Jualan − (Kos Kilang + Belanja Operasi)
          </span>
        </div>

        {/* 3 Sub-Metrics Rows / Stacks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            background: '#f8f7f4', 
            padding: '10px 14px', 
            borderRadius: '10px', 
            border: '1px solid #e6e2d8' 
          }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-dark)', display: 'block' }}>Kutipan Jualan Masuk</span>
              <small style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Invois & Lejar Masuk</small>
            </div>
            <strong style={{ fontSize: '15px', fontWeight: 850, color: '#166534' }}>
              +{money(metrics.totalKutipanJualan)}
            </strong>
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            background: '#f8f7f4', 
            padding: '10px 14px', 
            borderRadius: '10px', 
            border: '1px solid #e6e2d8' 
          }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-dark)', display: 'block' }}>Kos Pengeluaran Kilang</span>
              <small style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Bahan & Upah Kilang</small>
            </div>
            <strong style={{ fontSize: '15px', fontWeight: 850, color: 'var(--primary-red)' }}>
              −{money(metrics.kosKilangMonth)}
            </strong>
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            background: '#f8f7f4', 
            padding: '10px 14px', 
            borderRadius: '10px', 
            border: '1px solid #e6e2d8' 
          }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-dark)', display: 'block' }}>Belanja Buku Tunai (Lejar)</span>
              <small style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Operasi & Iklan</small>
            </div>
            <strong style={{ fontSize: '15px', fontWeight: 850, color: '#92400e' }}>
              −{money(metrics.ledgerOUTMonth)}
            </strong>
          </div>
        </div>

        {/* Real-Time Cash vs Baki Belum Settle Alert Banner */}
        <div style={{
          marginTop: '12px',
          padding: '12px 14px',
          background: metrics.unpaidBalanceMonth > 0 ? '#fffbeb' : '#f0fdf4',
          border: `1px solid ${metrics.unpaidBalanceMonth > 0 ? '#fde68a' : '#bbf7d0'}`,
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '14px' }}>{metrics.unpaidBalanceMonth > 0 ? '⚠️' : '✅'}</span>
              <strong style={{ fontSize: '11.5px', color: metrics.unpaidBalanceMonth > 0 ? '#92400e' : '#166534', fontWeight: 750 }}>
                Status Aliran Tunai (Real-Time Data)
              </strong>
            </div>
            {metrics.unpaidBalanceMonth > 0 && (
              <span style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#b45309',
                background: '#fef3c7',
                padding: '2px 8px',
                borderRadius: '6px'
              }}>
                Baki Belum Kutip: {money(metrics.unpaidBalanceMonth)}
              </span>
            )}
          </div>

          <p style={{ margin: 0, fontSize: '11px', color: '#4b5563', lineHeight: 1.45 }}>
            Kiraan di atas berasaskan <strong>duit tunai & deposit sebenar yang telah dikutip</strong>. 
            {metrics.unpaidBalanceMonth > 0 ? (
              <> Baki invois belum <em>settle</em> (<strong>{money(metrics.unpaidBalanceMonth)}</strong>) belum dimasukkan ke dalam untung tunai semasa ini sehingga pelanggan membuat bayaran penuh.</>
            ) : (
              <> Tiada baki tertunggak. Semua invois bagi bulan ini telah dijelaskan sepenuhnya.</>
            )}
          </p>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            paddingTop: '8px', 
            borderTop: `1px dashed ${metrics.unpaidBalanceMonth > 0 ? '#fde68a' : '#bbf7d0'}`,
            fontSize: '11px',
            gap: '8px',
            flexWrap: 'wrap'
          }}>
            <span style={{ color: '#6b7280' }}>
              Ingin semak unjuran penuh termasuk invois atas kertas?
            </span>
            <button
              type="button"
              onClick={() => setActiveTab && setActiveTab('reports')}
              style={{
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                color: 'var(--text-dark)',
                fontWeight: 700,
                fontSize: '11px',
                cursor: 'pointer',
                padding: '5px 12px',
                borderRadius: '6px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              <FileText size={12} style={{ color: 'var(--primary-red)' }} />
              Buka Penyata P&L
              <ArrowUpRight size={12} style={{ color: 'var(--text-muted)' }} />
            </button>
          </div>
        </div>
      </div>

      {/* Focus & Attention Action Staging Section */}
      <div style={{
        background: '#ffffff',
        border: '1px solid var(--border-color)',
        borderRadius: '14px',
        padding: '16px 18px',
        marginBottom: '16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '6px' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 750, color: 'var(--primary-red)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              FOKUS TINDAKAN OPERASI
            </span>
            <h3 style={{ fontSize: '14.5px', fontWeight: 800, margin: '2px 0 0', color: 'var(--text-dark)' }}>
              {metrics.actionableCount} Tempahan Perlukan Tindakan Segera
            </h3>
          </div>
          <button 
            onClick={() => setActiveTab('invoices')}
            style={{ background: 'none', border: 0, color: 'var(--text-muted)', fontSize: '12px', fontWeight: 650, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}
          >
            Buka Semua <ArrowUpRight size={13} />
          </button>
        </div>

        {/* Operational Staging Vertical List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { 
              id: 'late', 
              stage: '01', 
              label: 'Lewat Tarikh Siap', 
              desc: 'Perlu perhatian & semakan kilang segera', 
              count: metrics.lateCount, 
              Icon: Clock, 
              isAlert: metrics.lateCount > 0, 
              target: 'manufacturing' 
            },
            { 
              id: 'draft', 
              stage: '02', 
              label: 'Belum Masuk Kilang', 
              desc: 'Draft siap, menunggu giliran production', 
              count: metrics.draftCount, 
              Icon: Factory, 
              isAlert: false, 
              target: 'manufacturing' 
            },
            { 
              id: 'balance', 
              stage: '03', 
              label: 'Siap & Ada Baki', 
              desc: 'Sedia diserah dan kutip baki bayaran', 
              count: metrics.balanceCount, 
              Icon: Wallet, 
              isAlert: false, 
              target: 'invoices' 
            },
            { 
              id: 'dispatch', 
              stage: '04', 
              label: 'Sedia Dipos / Kurier', 
              desc: 'Sedia untuk cetak waybill & pos', 
              count: metrics.dispatchCount, 
              Icon: Truck, 
              isAlert: false, 
              target: 'postage' 
            },
          ].map(action => (
            <button
              key={action.id}
              onClick={() => setActiveTab(action.target)}
              style={{
                background: action.isAlert ? '#fff5f5' : '#fcfbf9',
                border: action.isAlert ? '1px solid #fecaca' : '1px solid #e6e2d8',
                borderRadius: '10px',
                padding: '11px 14px',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
                <span style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '8px', 
                  background: action.isAlert ? '#fee2e2' : '#ffffff', 
                  color: action.isAlert ? 'var(--primary-red)' : 'var(--text-dark)',
                  border: action.isAlert ? '1px solid #fca5a5' : '1px solid #e6e2d8',
                  display: 'grid',
                  placeItems: 'center',
                  flexShrink: 0
                }}>
                  <action.Icon size={15} />
                </span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', background: '#eceae3', padding: '1px 5px', borderRadius: '4px' }}>
                      {action.stage}
                    </span>
                    <strong style={{ fontSize: '13px', fontWeight: 750, color: action.isAlert ? 'var(--primary-red)' : 'var(--text-dark)' }}>
                      {action.label}
                    </strong>
                  </div>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '2px 0 0', whiteSpace: 'normal' }}>
                    {action.desc}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                <span style={{
                  padding: '3px 9px',
                  borderRadius: '12px',
                  background: action.isAlert ? '#fee2e2' : action.count > 0 ? '#18181b' : '#eceae3',
                  color: action.isAlert ? 'var(--primary-red)' : action.count > 0 ? '#ffffff' : '#71717a',
                  fontSize: '13px',
                  fontWeight: 850
                }}>
                  {action.count}
                </span>
                <ChevronRight size={14} color="var(--text-muted)" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Orders Cards Section */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '6px' }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-dark)' }}>
              Tempahan Terkini
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '1px 0 0' }}>
              Pilihan tempahan aktif yang baru dimasukkan ke dalam sistem.
            </p>
          </div>
          <button 
            onClick={() => setActiveTab('invoices')}
            className="btn btn-secondary"
            style={{ padding: '6px 12px', fontSize: '12px', fontWeight: 650, borderRadius: '8px', height: '32px' }}
          >
            Lihat Semua <ChevronRight size={13} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '10px' }}>
          {recentOrders.map(inv => {
            const isLate = needsAction(inv, 'late');
            const remaining = balanceOf(inv);
            const totalQty = quantityOf(inv);
            const prodState = productionStates[inv.order_status] || inv.order_status || 'Belum Draft';

            return (
              <div
                key={inv.id}
                style={{
                  background: '#ffffff',
                  border: isLate ? '1.5px solid #f87171' : '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                  cursor: 'pointer'
                }}
                onClick={() => onOpenInvoiceDetail(inv)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11.5px', fontWeight: 800, color: 'var(--text-muted)' }}>#{inv.invoice_no}</span>
                  <span className={`badge ${getStatusDotClass(inv.status)}`} style={{ fontSize: '11px', padding: '2px 8px' }}>
                    {getStatusLabel(inv.status)}
                  </span>
                </div>

                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 800, margin: 0, color: 'var(--text-dark)' }}>
                    {inv.client_name}
                  </h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '1px 0 0' }}>
                    {inv.job_name || getOrderCategoryLabel(inv)}
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8f7f4', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e6e2d8' }}>
                  <span style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--text-muted)' }}>
                    {totalQty > 0 ? `${totalQty} pcs` : 'Item Khas'}
                  </span>
                  <strong style={{ fontSize: '14px', fontWeight: 850, color: 'var(--text-dark)' }}>
                    {money(inv.grand_total)}
                  </strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px', color: 'var(--text-muted)', paddingTop: '2px' }}>
                  <span>{prodState}</span>
                  <span style={{ fontWeight: 700, color: remaining > 0 ? 'var(--primary-red)' : '#166534' }}>
                    {remaining > 0 ? `Baki: ${money(remaining)}` : 'Lunas'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
