import React, { useState, useEffect, useMemo } from 'react';
import { getInvoices, getLedger, saveLedgerEntry, deleteLedgerEntry, getSettings, saveSettings } from '../services/storage';
import { Plus, Trash2, Printer, Wallet, Pencil, Building2, AlertTriangle, Edit3, X, Save, Search, User } from 'lucide-react';
import AddTransactionModal from '../components/AddTransactionModal';
import PaymentVoucherModal from '../components/PaymentVoucherModal';
import { useLanguage } from '../context/LanguageContext';
import { money } from '../utils/mobileOrders';

export default function Ledger() {
  const { tr } = useLanguage();
  const [invoices, setInvoices] = useState(() => {
    try {
      const stored = localStorage.getItem('oms_invoices');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [entries, setEntries] = useState(() => {
    try {
      const stored = localStorage.getItem('oms_ledger');
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.sort((a, b) => new Date(b.date) - new Date(a.date));
      }
      return [];
    } catch {
      return [];
    }
  });
  const [settings, setSettings] = useState(() => {
    try {
      const stored = localStorage.getItem('oms_settings');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const [selectedBank, setSelectedBank] = useState('cimb'); // 'cimb' | 'islam' | 'all'
  const [flowFilter, setFlowFilter] = useState('all'); // 'all' | 'in' | 'out'
  const [searchQuery, setSearchQuery] = useState('');

  const [isOpeningModalOpen, setIsOpeningModalOpen] = useState(false);
  const [editingBankKey, setEditingBankKey] = useState('cimb');
  const [openingInput, setOpeningInput] = useState('');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [selectedVoucherEntry, setSelectedVoucherEntry] = useState(null);
  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [invs, data, setts] = await Promise.all([getInvoices(), getLedger(), getSettings()]);
      setInvoices(invs);
      setEntries(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
      setSettings(setts);
    } catch (e) {
      console.error('Error loading data:', e);
    } finally {
      setLoading(false);
    }
  };

  const cimbOpening = Number(settings?.bank_opening_balance_cimb ?? settings?.bank_opening_balance ?? 2000);
  const islamOpening = Number(settings?.bank_opening_balance_islam ?? 0);
  const tunaiOpening = Number(settings?.bank_opening_balance_tunai ?? 0);

  const bankDetails = {
    cimb: { name: 'CIMB Bank', account: '7656497860 (Aiman Hambali)', opening: cimbOpening },
    islam: { name: 'Bank Islam', account: '0502 1020 4490 03 (Hidayatul Rizman)', opening: islamOpening },
    tunai: { name: 'Tunai Fizikal', account: 'Tunai Di Tangan / Peti Wang', opening: tunaiOpening },
    all: { name: 'Semua Akaun Bank & Tunai', account: 'Ringkasan Aliran Tunai Gabungan', opening: cimbOpening + islamOpening + tunaiOpening }
  };

  // 1. Duit Masuk (IN): Kutipan Invois Jualan mengikut deposit_bank / balance_bank / payment_bank
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
        // SOP THIRTYONE LAB: Kos Kilang hanya keluar dari akaun bank bila invois disahkan berbayar/deposit, atau kerja telah dihantar proses di kilang
        const hasPayment = Number(inv.deposit || 0) > 0 || inv.status === 'Deposit' || inv.status === 'Paid';
        const isSentToFactory = inv.order_status && inv.order_status !== 'BELUM_DRAFT';
        return hasPayment || isSentToFactory;
      })
      .map(inv => {
        const b = inv.factory_payment_bank || 'Bank Islam';
        // Tarikh Kos Kilang: Utamakan tarikh bayaran kilang atau tarikh deposit (bukan tarikh invois mula dibuka)
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

  // 5. Transaksi Tambahan Lejar (Meta Ads, Operasi, dll.)
  const ledgerEvents = useMemo(() => {
    return entries.map(e => {
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
      const cleanRawEntry = {
        ...e,
        description: title,
        bank: b
      };
      return {
        id: e.id,
        date: e.date || '',
        type: e.type || 'OUT',
        title: title,
        category: e.category || 'Belanja',
        payee: e.payee || '',
        amount: Number(e.amount || 0),
        source: 'ledger',
        bank: b,
        rawEntry: cleanRawEntry
      };
    });
  }, [entries]);

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

  // Combined real-time cashflow feed across Invoices, Factory Costs, Postage & Ledger
  const allFeed = useMemo(() => {
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
    if (target === 'tunai') return itemBank === 'Tunai' || itemBank?.toLowerCase().includes('tunai') || itemBank?.toLowerCase().includes('cash');
    return false;
  };

  const activeOpening = bankDetails[selectedBank]?.opening || 0;
  const activeInflow = allFeed.filter(item => item.type === 'IN' && isBankMatch(item.bank, selectedBank)).reduce((sum, item) => sum + item.amount, 0);
  const activeOutflow = allFeed.filter(item => item.type === 'OUT' && isBankMatch(item.bank, selectedBank)).reduce((sum, item) => sum + item.amount, 0);
  const currentBankBalance = activeOpening + activeInflow - activeOutflow;

  const visibleFeed = allFeed
    .filter(item => isBankMatch(item.bank, selectedBank))
    .filter(item => {
      if (flowFilter === 'in') return item.type === 'IN';
      if (flowFilter === 'out') return item.type === 'OUT';
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

  const handleSaveTransaction = async (newTransaction) => {
    try {
      await saveLedgerEntry(newTransaction);
      setIsAddModalOpen(false);
      setEditingEntry(null);
      await loadData();
    } catch (err) {
      console.error('Error saving transaction:', err);
      alert('Gagal menyimpan transaksi: ' + (err.message || 'Sila cuba lagi'));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Padam rekod transaksi ini?')) {
      await deleteLedgerEntry(id);
      loadData();
    }
  };

  const handleRowClick = (item) => {
    if (item.source === 'ledger' && item.rawEntry) {
      setEditingEntry(item.rawEntry);
      setIsAddModalOpen(true);
    }
  };

  const openOpeningBalanceModal = (bankKey) => {
    const key = bankKey === 'all' ? 'cimb' : bankKey;
    setEditingBankKey(key);
    const curVal = key === 'cimb' ? cimbOpening : (key === 'islam' ? islamOpening : tunaiOpening);
    setOpeningInput(String(curVal));
    setIsOpeningModalOpen(true);
  };

  const saveOpeningBalance = async (e) => {
    e.preventDefault();
    const val = parseFloat(openingInput) || 0;
    const updated = {
      ...(settings || {}),
      ...(editingBankKey === 'cimb'
        ? { bank_opening_balance_cimb: val, bank_opening_balance: val }
        : editingBankKey === 'islam'
          ? { bank_opening_balance_islam: val }
          : { bank_opening_balance_tunai: val })
    };
    await saveSettings(updated);
    setSettings(updated);
    setIsOpeningModalOpen(false);
  };

  return (
    <div className="main-content">
      {/* Responsive Header (Visible on Mobile & Desktop) */}
      <div style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <span className="section-tag" style={{ fontSize: '10.5px', fontWeight: 800, color: 'var(--primary-red)', letterSpacing: '1px' }}>PENGURUSAN KEWANGAN</span>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 900, margin: '2px 0 0 0', color: '#18181b', letterSpacing: '-0.5px' }}>Buku Tunai & Bank</h1>
          <p className="desktop-only" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '3px', marginBottom: 0 }}>
            Pengurusan baki akaun bank, penyata aliran tunai, dan rekod perbelanjaan operasi.
          </p>
        </div>

        <button
          onClick={() => { setEditingEntry(null); setIsAddModalOpen(true); }}
          className="btn btn-primary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '0.55rem 1rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}
        >
          <Plus size={16} /> Tambah Transaksi
        </button>
      </div>

      {/* Bank Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.25rem' }}>
        {[
          { key: 'cimb', label: 'CIMB Bank' },
          { key: 'islam', label: 'Bank Islam' },
          { key: 'tunai', label: 'Tunai' },
          { key: 'all', label: 'Semua Akaun' }
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
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Baki Akaun Semasa</div>
          <div style={{ fontSize: '2.4rem', fontWeight: 900, color: currentBankBalance >= 0 ? 'var(--text-dark)' : 'var(--primary-red)', letterSpacing: '-0.5px' }}>
            {money(currentBankBalance)}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
          <div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', fontWeight: 650 }}>Duit Masuk Terkumpul</span>
            <strong style={{ color: '#16a34a', fontSize: '15px', fontWeight: 800 }}>+{money(activeInflow)}</strong>
          </div>
          <div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', fontWeight: 650 }}>Duit Keluar Terkumpul</span>
            <strong style={{ color: 'var(--primary-red)', fontSize: '15px', fontWeight: 800 }}>−{money(activeOutflow)}</strong>
          </div>
        </div>
      </div>

      {/* Bank Islam Warning Notice */}
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
            <strong>Nota Akaun Bank Islam:</strong> Baki di atas dikira berasaskan anggaran transaksi sejarah invois dalam sistem OMS. Sila buat penyelarasan (*reconcile*) mengikut penyata bank fizikal sebenar.
          </div>
        </div>
      )}

      {/* Statement Feed Controls */}
      <div className="card" style={{ padding: '1rem 1.25rem', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', borderRadius: '12px' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          {[
            { key: 'all', label: `Semua (${visibleFeed.length})` },
            { key: 'in', label: 'Duit Masuk (+IN)' },
            { key: 'out', label: 'Duit Keluar (−OUT)' }
          ].map(f => {
            const isSelected = flowFilter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFlowFilter(f.key)}
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
            placeholder="Cari transaksi atau nama..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control"
            style={{ paddingLeft: '32px', fontSize: '12px', borderRadius: '6px' }}
          />
        </div>
      </div>

      {/* BUKU REKOD TRANSAKSI (Strict 4-line hierarchy) */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            PENYATA TRANSAKSI & BUKU TUNAI ({visibleFeed.length})
          </span>
        </div>

        {loading ? (
          <div className="loading-state" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid var(--border-color)' }}>{tr('loadingData')}</div>
        ) : visibleFeed.length === 0 ? (
          <div className="empty-state" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid var(--border-color)' }}>{tr('noData')}</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '0.85rem' }}>
            {visibleFeed.map(item => {
              const isIN = item.type === 'IN';
              const isLedger = item.source === 'ledger';

              return (
                <div 
                  key={item.id} 
                  className="card" 
                  onClick={() => handleRowClick(item)} 
                  style={{ 
                    cursor: isLedger ? 'pointer' : 'default',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color, #E6E2DC)',
                    padding: '1.25rem',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    transition: 'border-color 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {/* 1. Nota Tujuan Apa */}
                      <div style={{ fontSize: '14.5px', fontWeight: 800, color: 'var(--text-dark, #18181b)', lineHeight: 1.35, overflowWrap: 'anywhere' }}>
                        {item.title}
                      </div>

                      {/* 2. Tarikh · Bank Apa */}
                      <div style={{ fontSize: '11.5px', color: 'var(--text-muted, #71717a)', marginTop: '3px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span>{item.date}</span>
                        <span>·</span>
                        <span style={{ fontWeight: 650, color: '#3f3f46' }}>{item.bank}</span>
                      </div>

                      {/* 3. Group Apa */}
                      {item.category && (
                        <div style={{ marginTop: '5px' }}>
                          <span style={{ 
                            fontSize: '10.5px', 
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
                          <User size={12} color="#71717a" style={{ flexShrink: 0 }} />
                          <span>{item.payee}</span>
                        </div>
                      )}
                    </div>

                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flexShrink: 0 }}>
                      <span style={{ color: isIN ? '#16a34a' : 'var(--primary-red)', fontSize: '16px', fontWeight: 900 }}>
                        {isIN ? '+' : '−'}{money(item.amount)}
                      </span>
                      <span style={{ 
                        fontSize: '10px', 
                        fontWeight: 750, 
                        color: isIN ? '#16a34a' : '#dc2626',
                        background: isIN ? '#f0fdf4' : '#fee2e2',
                        padding: '1px 6px',
                        borderRadius: '4px',
                        marginTop: '4px'
                      }}>
                        {isIN ? '● WANG MASUK' : '● WANG KELUAR'}
                      </span>
                    </div>
                  </div>

                  {isLedger && (
                    <div style={{ display: 'flex', gap: '0.4rem', marginTop: 'auto', paddingTop: '0.35rem', borderTop: '1px dashed var(--border-color)' }} onClick={event => event.stopPropagation()}>
                      <button 
                        onClick={() => { setEditingEntry(item.rawEntry); setIsAddModalOpen(true); }}
                        className="btn btn-secondary btn-sm"
                        style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', borderRadius: '8px', fontWeight: 650, fontSize: '0.78rem' }}
                      >
                        <Pencil size={12} /> Edit
                      </button>
                      {!isIN && (
                        <button 
                          onClick={() => { setSelectedVoucherEntry(item.rawEntry); setIsVoucherModalOpen(true); }}
                          className="btn btn-secondary btn-sm"
                          style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', borderRadius: '8px', fontWeight: 650, fontSize: '0.78rem' }}
                          title="Print Payment Voucher"
                        >
                          <Printer size={12} /> Voucher
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(item.id)} 
                        className="btn btn-secondary btn-sm" 
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', color: 'var(--primary-red)', borderColor: '#FEE2E2', padding: '0 10px' }}
                        title="Padam"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add / Edit Transaction Modal */}
      <AddTransactionModal 
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingEntry(null);
        }}
        onSave={handleSaveTransaction}
        editEntry={editingEntry}
        defaultBank={selectedBank === 'islam' ? 'Bank Islam' : (selectedBank === 'tunai' ? 'Tunai' : 'CIMB Bank')}
      />

      {/* Payment Voucher Modal */}
      {isVoucherModalOpen && selectedVoucherEntry && (
        <PaymentVoucherModal 
          isOpen={isVoucherModalOpen}
          onClose={() => {
            setIsVoucherModalOpen(false);
            setSelectedVoucherEntry(null);
          }}
          entry={selectedVoucherEntry}
          settings={settings}
        />
      )}

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
