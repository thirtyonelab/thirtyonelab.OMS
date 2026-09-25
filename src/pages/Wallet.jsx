import React, { useState, useEffect, useMemo } from 'react';
import { getInvoices, getLedger, getSettings } from '../services/storage';
import { Building2, Wallet, ArrowDownLeft, ArrowUpRight, AlertTriangle, Edit3, X, Save, Search, Filter, Printer, CheckCircle2, User } from 'lucide-react';
import { money } from '../utils/mobileOrders';
import { useLanguage } from '../context/LanguageContext';

export default function WalletPage() {
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
  const [selectedBank, setSelectedBank] = useState('cimb'); // 'cimb' | 'islam' | 'all'
  const [bankFlowFilter, setBankFlowFilter] = useState('all'); // 'all' | 'in' | 'out'
  const [searchQuery, setSearchQuery] = useState('');

  // Opening balance state
  const [openingBalance, setOpeningBalance] = useState(() => {
    try {
      const stored = localStorage.getItem('31lab_bank_openings');
      return stored ? JSON.parse(stored) : { cimb: 0, islam: 0 };
    } catch {
      return { cimb: 0, islam: 0 };
    }
  });

  const [isOpeningModalOpen, setIsOpeningModalOpen] = useState(false);
  const [editingBankKey, setEditingBankKey] = useState('cimb');
  const [openingInput, setOpeningInput] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [invs, ledg] = await Promise.all([getInvoices(), getLedger()]);
      setInvoices(invs);
      setLedger(ledg);
    } catch (e) {
      console.error('Error loading wallet data:', e);
    } finally {
      setLoading(false);
    }
  };

  const bankDetails = {
    cimb: { name: 'CIMB Bank', account: '7656497860 (Aiman Hambali)', opening: openingBalance.cimb || 0 },
    islam: { name: 'Bank Islam', account: '0502 1020 4490 03 (Hidayatul Rizman)', opening: openingBalance.islam || 0 },
    all: { name: 'Semua Akaun Bank', account: 'Ringkasan Aliran Tunai Gabungan', opening: (openingBalance.cimb || 0) + (openingBalance.islam || 0) }
  };

  // Build combined live statement feed
  const invoiceInEvents = useMemo(() => {
    const events = [];
    invoices.forEach(inv => {
      if (inv.status === 'Void') return;
      const defaultBank = inv.payment_bank || 'Bank Islam';
      const depBank = inv.deposit_bank || defaultBank;
      const balBank = inv.balance_bank || defaultBank;
      const grandTotal = Number(inv.grand_total || 0);
      const curDeposit = Number(inv.deposit || 0);

      // Situation A: Status 'Deposit' (deposit dikutip, baki belum)
      if (inv.status === 'Deposit' && curDeposit > 0) {
        events.push({
          id: `inv_in_dep_${inv.id}`,
          date: inv.deposit_date || inv.date || '',
          type: 'IN',
          title: `Kutipan Deposit: ${inv.job_name || `Invois #${inv.invoice_no}`}`,
          category: 'Invois Jualan (Deposit)',
          payee: inv.client_name || 'Pelanggan',
          amount: curDeposit,
          source: 'invoice',
          bank: depBank,
          rawInvoice: inv
        });
      }
      // Situation B: Status 'Paid' (bayaran penuh)
      else if (inv.status === 'Paid') {
        const initDep = Number(inv.initial_deposit || 0);
        // Jika ada deposit awal yang sah (bayaran 2 peringkat / split bank)
        if (initDep > 0 && initDep < grandTotal) {
          // Peringkat 1: Deposit awal
          events.push({
            id: `inv_in_dep_${inv.id}`,
            date: inv.deposit_date || inv.date || '',
            type: 'IN',
            title: `Kutipan Deposit: ${inv.job_name || `Invois #${inv.invoice_no}`}`,
            category: 'Invois Jualan (Deposit)',
            payee: inv.client_name || 'Pelanggan',
            amount: initDep,
            source: 'invoice',
            bank: depBank,
            rawInvoice: inv
          });
          // Peringkat 2: Baki Bayaran
          events.push({
            id: `inv_in_bal_${inv.id}`,
            date: inv.paid_date || inv.deposit_date || inv.date || '',
            type: 'IN',
            title: `Kutipan Baki: ${inv.job_name || `Invois #${inv.invoice_no}`}`,
            category: 'Invois Jualan (Baki)',
            payee: inv.client_name || 'Pelanggan',
            amount: grandTotal - initDep,
            source: 'invoice',
            bank: balBank,
            rawInvoice: inv
          });
        } else {
          // Bayaran penuh sekaligus
          events.push({
            id: `inv_in_paid_${inv.id}`,
            date: inv.paid_date || inv.deposit_date || inv.date || '',
            type: 'IN',
            title: `Kutipan Invois Penuh: ${inv.job_name || `Invois #${inv.invoice_no}`}`,
            category: 'Invois Jualan',
            payee: inv.client_name || 'Pelanggan',
            amount: grandTotal > 0 ? grandTotal : curDeposit,
            source: 'invoice',
            bank: balBank,
            rawInvoice: inv
          });
        }
      }
      // Situation C: Status lain tetapi ada kutipan deposit
      else if (curDeposit > 0) {
        events.push({
          id: `inv_in_${inv.id}`,
          date: inv.deposit_date || inv.date || '',
          type: 'IN',
          title: `Kutipan Invois: ${inv.job_name || `Invois #${inv.invoice_no}`}`,
          category: 'Invois Jualan',
          payee: inv.client_name || 'Pelanggan',
          amount: curDeposit,
          source: 'invoice',
          bank: depBank,
          rawInvoice: inv
        });
      }
    });
    return events;
  }, [invoices]);

  // 2. Duit Keluar (OUT): Kos Pengeluaran Kilang mengikut factory_payment_bank
  const factoryOutEvents = useMemo(() => {
    return invoices
      .filter(inv => {
        if (inv.status === 'Void') return false;
        const kos = Number(inv.pengeluaran || 0);
        if (kos <= 0) return false;
        const hasPayment = Number(inv.deposit || 0) > 0 || inv.status === 'Deposit' || inv.status === 'Paid';
        const isSentToFactory = inv.order_status && inv.order_status !== 'BELUM_DRAFT';
        return hasPayment || isSentToFactory;
      })
      .map(inv => {
        const b = inv.factory_payment_bank || 'Bank Islam';
        const factoryDate = inv.factory_payment_date || inv.deposit_date || inv.date || '';
        return {
          id: `inv_mfg_${inv.id}`,
          date: factoryDate,
          type: 'OUT',
          title: `Kos Kilang: ${inv.job_name || `Invois #${inv.invoice_no}`}`,
          category: 'Pengeluaran Kilang',
          payee: `Kilang (Tempahan #${inv.invoice_no} - ${inv.client_name || ''})`,
          amount: Number(inv.pengeluaran || 0),
          source: 'manufacturing',
          bank: b,
          rawInvoice: inv
        };
      });
  }, [invoices]);

  // 3. Duit Keluar (OUT): Kos Penghantaran Kurier mengikut postage_payment_bank
  const postageOutEvents = useMemo(() => {
    return invoices
      .filter(inv => inv.status !== 'Void' && inv.has_delivery && Number(inv.postage_cost || 0) > 0)
      .map(inv => {
        const b = inv.postage_payment_bank || 'Bank Islam';
        return {
          id: `inv_post_${inv.id}`,
          date: inv.postage_date || inv.date || '',
          type: 'OUT',
          title: `Kos Pos (${inv.postage_courier || 'Kurier'}): ${inv.job_name || `Invois #${inv.invoice_no}`}`,
          category: 'Penghantaran Kurier',
          payee: `${inv.postage_courier || 'Kurier'} (Penghantaran #${inv.invoice_no} - ${inv.client_name || ''})`,
          amount: Number(inv.postage_cost || 0),
          source: 'postage',
          bank: b,
          rawInvoice: inv
        };
      });
  }, [invoices]);

  // 4. Duit Masuk (IN): Caj Pos Pelanggan Dikutip (jika berasingan dari invois jualan)
  const deliveryInEvents = useMemo(() => {
    return invoices
      .filter(inv => inv.status !== 'Void' && inv.has_delivery && inv.delivery_payment_status === 'Paid' && inv.delivery_payment_method !== 'Termasuk Dalam Invois' && Number(inv.delivery_fee || 0) > 0)
      .map(inv => {
        const b = inv.delivery_bank || inv.postage_payment_bank || inv.payment_bank || 'Bank Islam';
        return {
          id: `inv_del_in_${inv.id}`,
          date: inv.delivery_paid_date || inv.postage_date || inv.date || '',
          type: 'IN',
          title: `Caj Pos Pelanggan: ${inv.job_name || `Invois #${inv.invoice_no}`}`,
          category: 'Caj Pos Pelanggan',
          payee: inv.client_name || 'Pelanggan',
          amount: Number(inv.delivery_fee || 0),
          source: 'delivery_in',
          bank: b,
          rawInvoice: inv
        };
      });
  }, [invoices]);

  const ledgerEvents = useMemo(() => {
    return ledger.map(e => {
      let b = e.bank;
      let title = e.description || '';
      if (title.includes('__METADATA__:')) {
        const parts = title.split('__METADATA__:');
        title = parts[0].trim();
        try {
          const meta = JSON.parse(parts[1]);
          if (!b && meta.bank) b = meta.bank;
        } catch (err) {}
      }
      if (!title) {
        title = e.type === 'IN' ? 'Duit Masuk' : 'Duit Keluar';
      }
      if (!b) {
        const text = `${title} ${e.payee || ''} ${e.category || ''}`.toLowerCase();
        if (text.includes('cimb') || text.includes('farhan') || text.includes('meta ads') || (e.date && e.date >= '2026-09-21')) {
          b = 'CIMB Bank';
        } else if (text.includes('islam')) {
          b = 'Bank Islam';
        } else if (text.includes('tunai') || text.includes('cash')) {
          b = 'Tunai';
        } else {
          b = 'Bank Islam';
        }
      }
      return {
        id: `led_${e.id}`,
        date: e.date || '',
        type: e.type || 'OUT',
        title: title,
        category: e.category || 'Belanja',
        payee: e.payee || '',
        amount: Number(e.amount || 0),
        source: 'ledger',
        bank: b,
        ledgerEntry: { ...e, description: title, bank: b }
      };
    });
  }, [ledger]);

  const getEventPriority = (item) => {
    // Urutan keutamaan bagi tarikh yang sama (Paling terkini / latest di atas):
    // 4. Kutipan Baki / Bayaran Penuh (peringkat akhir)
    // 3. Kos Pos Kurier & Caj Pos Pelanggan (peringkat penghantaran)
    // 2. Kos Pengeluaran Kilang (peringkat kilang - berlaku selepas deposit)
    // 1. Kutipan Deposit Pelanggan (peringkat mula-mula tempahan)
    if (item.category === 'Invois Jualan (Baki)' || item.category === 'Invois Jualan') return 4;
    if (item.source === 'postage' || item.source === 'delivery_in') return 3;
    if (item.source === 'manufacturing') return 2;
    if (item.category === 'Invois Jualan (Deposit)') return 1;
    return 2.5;
  };

  const allBankFeed = useMemo(() => {
    return [...invoiceInEvents, ...factoryOutEvents, ...postageOutEvents, ...deliveryInEvents, ...ledgerEvents].sort((a, b) => {
      const dateDiff = String(b.date || '').localeCompare(String(a.date || ''));
      if (dateDiff !== 0) return dateDiff;
      return getEventPriority(b) - getEventPriority(a);
    });
  }, [invoiceInEvents, factoryOutEvents, postageOutEvents, deliveryInEvents, ledgerEvents]);

  const isBankMatch = (itemBank, target) => {
    if (target === 'all') return true;
    if (target === 'cimb') return itemBank === 'CIMB Bank' || itemBank?.toLowerCase().includes('cimb');
    if (target === 'islam') return itemBank === 'Bank Islam' || itemBank?.toLowerCase().includes('islam');
    return true;
  };

  const activeOpening = bankDetails[selectedBank]?.opening || 0;
  const activeInflow = allBankFeed.filter(item => item.type === 'IN' && isBankMatch(item.bank, selectedBank)).reduce((sum, item) => sum + item.amount, 0);
  const activeOutflow = allBankFeed.filter(item => item.type === 'OUT' && isBankMatch(item.bank, selectedBank)).reduce((sum, item) => sum + item.amount, 0);
  const currentBankBalance = activeOpening + activeInflow - activeOutflow;

  const currentMonthStr = new Date().toISOString().slice(0, 7);
  const curMonthIn = allBankFeed
    .filter(item => item.type === 'IN' && String(item.date || '').startsWith(currentMonthStr) && isBankMatch(item.bank, selectedBank))
    .reduce((sum, item) => sum + item.amount, 0);
  const curMonthOut = allBankFeed
    .filter(item => item.type === 'OUT' && String(item.date || '').startsWith(currentMonthStr) && isBankMatch(item.bank, selectedBank))
    .reduce((sum, item) => sum + item.amount, 0);
  const curMonthNet = curMonthIn - curMonthOut;

  const visibleBankFeed = allBankFeed
    .filter(item => isBankMatch(item.bank, selectedBank))
    .filter(item => {
      if (bankFlowFilter === 'in') return item.type === 'IN';
      if (bankFlowFilter === 'out') return item.type === 'OUT';
      return true;
    })
    .filter(item => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        (item.title || '').toLowerCase().includes(q) ||
        (item.payee || '').toLowerCase().includes(q) ||
        (item.category || '').toLowerCase().includes(q) ||
        (item.date || '').includes(q)
      );
    });

  const openOpeningBalanceModal = (bankKey) => {
    setEditingBankKey(bankKey);
    setOpeningInput(String(openingBalance[bankKey] || ''));
    setIsOpeningModalOpen(true);
  };

  const saveOpeningBalance = (e) => {
    e.preventDefault();
    const val = parseFloat(openingInput) || 0;
    const next = { ...openingBalance, [editingBankKey]: val };
    setOpeningBalance(next);
    localStorage.setItem('31lab_bank_openings', JSON.stringify(next));
    setIsOpeningModalOpen(false);
  };

  return (
    <div className="main-content">
      {/* Header */}
      <div className="dashboard-header" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span className="section-tag">PENGURUSAN KEWANGAN</span>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800', marginTop: '0.5rem' }}>Akaun Bank & Aliran Tunai</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Penyata aliran tunai semasa bank, kutipan jualan, dan bayaran perbelanjaan.
          </p>
        </div>
      </div>

      {/* Bank Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.25rem' }}>
        {[
          { key: 'cimb', label: 'CIMB Bank' },
          { key: 'islam', label: 'Bank Islam' },
          { key: 'all', label: 'Semua Akaun Bank' }
        ].map(b => {
          const isSelected = selectedBank === b.key;
          return (
            <button
              key={b.key}
              onClick={() => setSelectedBank(b.key)}
              style={{
                padding: '0.55rem 1.15rem',
                borderRadius: '8px',
                border: isSelected ? '1px solid #18181b' : '1px solid var(--border-color)',
                backgroundColor: isSelected ? '#18181b' : '#ffffff',
                color: isSelected ? '#ffffff' : '#52525b',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {b.label}
            </button>
          );
        })}
      </div>

      {/* Main Bank Summary Bento Hero */}
      <div className="card" style={{ padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', backgroundColor: '#ffffff', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-muted)', fontWeight: '700' }}>
              <Building2 size={16} color="var(--primary-red)" />
              {bankDetails[selectedBank]?.name}
            </span>
            <div style={{ color: 'var(--text-dark)', fontSize: '12px', fontWeight: 600, marginTop: '2px' }}>
              {bankDetails[selectedBank]?.account}
            </div>
          </div>

          <button
            onClick={() => openOpeningBalanceModal(selectedBank === 'all' ? 'cimb' : selectedBank)}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', borderRadius: '6px' }}
          >
            <Edit3 size={12} /> Set Baki Awal
          </button>
        </div>

        <div style={{ marginTop: '0.75rem', marginBottom: '1rem' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Baki Bank Semasa</div>
          <div style={{ fontSize: '2.4rem', fontWeight: 900, color: currentBankBalance >= 0 ? 'var(--text-dark)' : 'var(--primary-red)', letterSpacing: '-0.5px' }}>
            {money(currentBankBalance)}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
          <div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', fontWeight: 650 }}>Duit Masuk Terkumpul</span>
            <strong style={{ color: '#16a34a', fontSize: '15px', fontWeight: 800 }}>+{money(activeInflow)}</strong>
          </div>
          <div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', fontWeight: 650 }}>Duit Keluar Terkumpul</span>
            <strong style={{ color: 'var(--primary-red)', fontSize: '15px', fontWeight: 800 }}>−{money(activeOutflow)}</strong>
          </div>
          <div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', fontWeight: 650 }}>Aliran Bersih Bulan Ini</span>
            <strong style={{ color: curMonthNet >= 0 ? '#16a34a' : 'var(--primary-red)', fontSize: '15px', fontWeight: 800 }}>
              {curMonthNet >= 0 ? `+${money(curMonthNet)}` : `−${money(Math.abs(curMonthNet))}`}
            </strong>
          </div>
        </div>
      </div>

      {/* Bank Islam Warning Banner */}
      {selectedBank === 'islam' && (
        <div
          style={{
            padding: '12px 16px',
            borderRadius: '10px',
            background: '#fffbeb',
            border: '1px solid #fde68a',
            marginBottom: '1.25rem',
            display: 'flex',
            gap: '10px',
            alignItems: 'center'
          }}
        >
          <AlertTriangle size={18} color="#d97706" style={{ flexShrink: 0 }} />
          <div style={{ fontSize: '12px', color: '#92400e', lineHeight: 1.4 }}>
            <strong>Nota Penting Akaun Bank Islam:</strong> Baki di atas dikira berasaskan anggaran transaksi sejarah invois dalam sistem OMS. Sila buat penyelarasan (*reconcile*) mengikut penyata bank fizikal sebenar.
          </div>
        </div>
      )}

      {/* Statement Feed Controls */}
      <div className="card" style={{ padding: '1rem 1.25rem', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', borderRadius: '12px' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          {[
            { key: 'all', label: `Semua (${visibleBankFeed.length})` },
            { key: 'in', label: 'Duit Masuk (+IN)' },
            { key: 'out', label: 'Duit Keluar (−OUT)' }
          ].map(f => {
            const isSelected = bankFlowFilter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setBankFlowFilter(f.key)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: isSelected ? '1px solid #18181b' : '1px solid var(--border-color)',
                  backgroundColor: isSelected ? '#18181b' : '#ffffff',
                  color: isSelected ? '#ffffff' : '#52525b',
                  fontSize: '11.5px',
                  fontWeight: 650,
                  cursor: 'pointer'
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Cari transaksi bank..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control"
            style={{ paddingLeft: '32px', fontSize: '12px', borderRadius: '6px' }}
          />
        </div>
      </div>

      {/* Bank Statement Record Cards (4-line format) */}
      <div>
        <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
          PENYATA TRANSAKSI BANK ({visibleBankFeed.length})
        </div>

        {loading ? (
          <div className="loading-state" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid var(--border-color)' }}>Memuatkan penyata bank...</div>
        ) : visibleBankFeed.length === 0 ? (
          <div className="empty-state" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid var(--border-color)' }}>Tiada rekod transaksi bagi akaun bank ini.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '0.85rem' }}>
            {visibleBankFeed.map(item => {
              const isIN = item.type === 'IN';
              return (
                <div
                  key={item.id}
                  className="card"
                  style={{
                    padding: '1.15rem',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.65rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {/* 1. Nota Tujuan Apa */}
                      <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-dark)', lineHeight: 1.35, overflowWrap: 'anywhere' }}>
                        {item.title}
                      </div>

                      {/* 2. Tarikh · Bank Apa */}
                      <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '3px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span>{item.date}</span>
                        <span>·</span>
                        <span style={{ fontWeight: 650, color: '#3f3f46' }}>{item.bank}</span>
                      </div>

                      {/* 3. Group Apa */}
                      {item.category && (
                        <div style={{ marginTop: '5px' }}>
                          <span style={{
                            fontSize: '10px',
                            padding: '1px 6px',
                            borderRadius: '4px',
                            background: '#f4f4f5',
                            color: '#3f3f46',
                            border: '1px solid #e4e4e7',
                            fontWeight: 700,
                            display: 'inline-block'
                          }}>
                            {item.category}
                          </span>
                        </div>
                      )}

                      {/* 4. Nama */}
                      {item.payee && (
                        <div style={{ fontSize: '11.5px', color: '#52525b', fontWeight: 600, marginTop: '3px', overflowWrap: 'anywhere', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <User size={12} /> {item.payee}
                        </div>
                      )}
                    </div>

                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flexShrink: 0 }}>
                      <span style={{ color: isIN ? '#16a34a' : 'var(--primary-red)', fontSize: '15.5px', fontWeight: 900 }}>
                        {isIN ? '+' : '−'}{money(item.amount)}
                      </span>
                      <span style={{
                        fontSize: '9.5px',
                        fontWeight: 750,
                        color: isIN ? '#16a34a' : '#dc2626',
                        background: isIN ? '#f0fdf4' : '#fee2e2',
                        padding: '1px 5px',
                        borderRadius: '4px',
                        marginTop: '4px'
                      }}>
                        {isIN ? '● MASUK' : '● KELUAR'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Opening Balance Modal */}
      {isOpeningModalOpen && (
        <div className="modal-overlay" onClick={() => setIsOpeningModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '400px', padding: '1.5rem', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: 0 }}>
                Set Baki Awal ({bankDetails[editingBankKey]?.name})
              </h3>
              <button onClick={() => setIsOpeningModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={saveOpeningBalance}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Jumlah Baki Awal (RM)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={openingInput}
                  onChange={(e) => setOpeningInput(e.target.value)}
                  className="form-control"
                  placeholder="0.00"
                  required
                  autoFocus
                />
              </div>

              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setIsOpeningModalOpen(false)} className="btn btn-secondary btn-sm">
                  Batal
                </button>
                <button type="submit" className="btn btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Save size={13} /> Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
