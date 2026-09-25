import React, { useState } from 'react';
import { updateInvoicePayment } from '../services/storage';
import { X, Save, CheckCircle, Split } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const BANK_OPTIONS = [
  {
    id: 'CIMB Bank',
    name: 'CIMB Bank',
    holder: 'Aiman Hambali',
    account: '7656497860',
    badge: 'Akaun Operasi'
  },
  {
    id: 'Bank Islam',
    name: 'Bank Islam',
    holder: 'Hidayatul Rizman',
    account: '0502 1020 4490 03',
    badge: 'Akaun Simpanan'
  },
  {
    id: 'Tunai',
    name: 'Tunai / Cash',
    holder: 'Kaunter Tunai Fizikal',
    account: 'Penerimaan Tunai',
    badge: 'Tunai'
  }
];

export default function PaymentModal({ invoice, onClose, onSaveSuccess }) {
  const { tr } = useLanguage();
  const grandTotal = parseFloat(invoice.grand_total || 0);

  const [deposit, setDeposit] = useState(invoice.deposit || 0);
  const [status, setStatus] = useState(invoice.status || 'Unpaid');
  const [loading, setLoading] = useState(false);

  // Bank selection states
  const [paymentBank, setPaymentBank] = useState(invoice.payment_bank || 'CIMB Bank');
  const [depositBank, setDepositBank] = useState(invoice.deposit_bank || invoice.payment_bank || 'Bank Islam');
  const [balanceBank, setBalanceBank] = useState(invoice.balance_bank || invoice.payment_bank || 'CIMB Bank');

  const initialHasSplit = (parseFloat(invoice.initial_deposit) > 0 && parseFloat(invoice.initial_deposit) < grandTotal) ||
    (invoice.status === 'Paid' && invoice.deposit_bank && invoice.balance_bank && invoice.deposit_bank !== invoice.balance_bank);

  const [hasSplitPayment, setHasSplitPayment] = useState(initialHasSplit);
  const [initialDepositAmount, setInitialDepositAmount] = useState(
    parseFloat(invoice.initial_deposit) || (invoice.deposit > 0 && invoice.deposit < grandTotal ? invoice.deposit : grandTotal / 2)
  );

  const getToday = () => new Date().toISOString().split('T')[0];
  const [depositDate, setDepositDate] = useState(invoice.deposit_date || getToday());
  const [paidDate, setPaidDate] = useState(invoice.paid_date || getToday());

  const balance = Math.max(0, grandTotal - parseFloat(deposit || 0));

  // Auto-adjust status based on deposit amount
  const handleDepositChange = (value) => {
    const val = Math.max(0, parseFloat(value) || 0);
    setDeposit(val);
    
    if (val === 0) {
      setStatus('Unpaid');
    } else if (val >= grandTotal) {
      setStatus('Paid');
      if (val > grandTotal) {
        setDeposit(grandTotal);
      }
    } else {
      setStatus('Deposit');
    }
  };

  // Quick Action Buttons
  const markAsPaid = () => {
    setDeposit(grandTotal);
    setStatus('Paid');
    if (invoice.deposit > 0 && invoice.deposit < grandTotal) {
      setHasSplitPayment(true);
      setInitialDepositAmount(invoice.deposit);
    }
  };

  const markAsUnpaid = () => {
    setDeposit(0);
    setStatus('Unpaid');
    setHasSplitPayment(false);
  };

  const markAsDeposit = () => {
    if (deposit === 0 || deposit === grandTotal) {
      setDeposit(grandTotal / 2);
    }
    setStatus('Deposit');
  };

  const markAsVoid = () => {
    setDeposit(0);
    setStatus('Void');
    setHasSplitPayment(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let finalDep = deposit;
      let finalInitDep = 0;
      let finalDepBank = depositBank;
      let finalBalBank = balanceBank;
      let finalPayBank = paymentBank;

      if (status === 'Deposit') {
        finalDep = deposit;
        finalInitDep = deposit;
        finalDepBank = depositBank;
        finalBalBank = balanceBank;
        finalPayBank = depositBank;
      } else if (status === 'Paid') {
        if (hasSplitPayment && initialDepositAmount > 0 && initialDepositAmount < grandTotal) {
          finalDep = grandTotal;
          finalInitDep = initialDepositAmount;
          finalDepBank = depositBank;
          finalBalBank = balanceBank;
          finalPayBank = balanceBank;
        } else {
          finalDep = grandTotal;
          finalInitDep = 0;
          finalDepBank = paymentBank;
          finalBalBank = paymentBank;
          finalPayBank = paymentBank;
        }
      } else {
        finalDep = 0;
        finalInitDep = 0;
      }

      const success = await updateInvoicePayment(
        invoice.id,
        finalDep,
        status,
        invoice.pengeluaran,
        depositDate,
        paidDate,
        finalPayBank,
        finalInitDep,
        finalDepBank,
        finalBalBank
      );

      if (success) {
        onSaveSuccess();
      } else {
        alert('Gagal mengemas kini bayaran.');
      }
    } catch (err) {
      console.error(err);
      alert('Ralat semasa mengemas kini status bayaran.');
    } finally {
      setLoading(false);
    }
  };

  // Reusable bank selection cards
  const renderBankSelector = (selectedId, onSelect, fieldName) => {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
        {BANK_OPTIONS.map(b => {
          const isSelected = selectedId === b.id;
          return (
            <div
              key={b.id}
              onClick={() => onSelect(b.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '8px 6px',
                borderRadius: '6px',
                border: isSelected ? '1.5px solid var(--primary-red, #C51B27)' : '1px solid var(--border-color, #e4e4e7)',
                backgroundColor: isSelected ? 'rgba(197, 27, 39, 0.05)' : '#ffffff',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ fontSize: '12px', fontWeight: 700, color: isSelected ? 'var(--primary-red, #C51B27)' : 'var(--text-dark, #18181b)' }}>
                {b.name}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>
                {b.badge}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '460px' }}>
        <div className="modal-header">
          <h3>UPDATE INVOICE</h3>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body payment-modal-body">
            
            <div className="invoice-summary-strip">
              <span className="strip-label">No. Invois: <strong>{invoice.invoice_no}</strong></span>
              <span className="strip-label">Pelanggan: <strong>{invoice.client_name}</strong></span>
            </div>

            <div className="payment-total-box">
              <span className="label">Jumlah Perlu Dibayar</span>
              <span className="value">RM {grandTotal.toFixed(2)}</span>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions-row">
              <button
                type="button"
                onClick={markAsPaid}
                className={`btn btn-secondary btn-sm quick-btn ${status === 'Paid' ? 'active-paid' : ''}`}
              >
                Bayar Penuh (Paid)
              </button>
              <button
                type="button"
                onClick={markAsDeposit}
                className={`btn btn-secondary btn-sm quick-btn ${status === 'Deposit' ? 'active-deposit' : ''}`}
              >
                Deposit (Setengah)
              </button>
              <button
                type="button"
                onClick={markAsUnpaid}
                className={`btn btn-secondary btn-sm quick-btn ${status === 'Unpaid' ? 'active-unpaid' : ''}`}
              >
                Belum Bayar (Unpaid)
              </button>
              <button
                type="button"
                onClick={markAsVoid}
                className={`btn btn-secondary btn-sm quick-btn ${status === 'Void' ? 'active-void' : ''}`}
              >
                Batal (Void)
              </button>
            </div>

            {/* 1. STATUS DEPOSIT */}
            {status === 'Deposit' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '12px', backgroundColor: '#fcfcfc', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '11px', fontWeight: 700 }}>JUMLAH DEPOSIT (RM)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max={grandTotal}
                      value={deposit || ''}
                      onChange={(e) => handleDepositChange(e.target.value)}
                      placeholder="0.00"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '11px', fontWeight: 700 }}>TARIKH DEPOSIT</label>
                    <input
                      type="date"
                      value={depositDate}
                      onChange={(e) => setDepositDate(e.target.value)}
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontSize: '11px', fontWeight: 700, marginBottom: '6px' }}>
                    PILIH BANK DEPOSIT (DUIT MASUK)
                  </label>
                  {renderBankSelector(depositBank, setDepositBank, 'deposit_bank')}
                  <span style={{ fontSize: '10.5px', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                    * Deposit RM {parseFloat(deposit || 0).toFixed(2)} akan direkodkan ke akaun <strong>{depositBank}</strong>.
                  </span>
                </div>
              </div>
            )}

            {/* 2. STATUS PAID (BAYAR PENUH) */}
            {status === 'Paid' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* Mode Selector: 1 Transaksi vs 2 Peringkat */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setHasSplitPayment(false)}
                    style={{
                      padding: '8px 6px',
                      fontSize: '11.5px',
                      fontWeight: 650,
                      borderRadius: '6px',
                      border: !hasSplitPayment ? '1.5px solid var(--primary-red, #C51B27)' : '1px solid var(--border-color)',
                      backgroundColor: !hasSplitPayment ? '#ffffff' : '#f4f4f5',
                      color: !hasSplitPayment ? 'var(--primary-red, #C51B27)' : 'var(--text-muted)',
                      cursor: 'pointer'
                    }}
                  >
                    Bayar Penuh Sekaligus
                  </button>
                  <button
                    type="button"
                    onClick={() => setHasSplitPayment(true)}
                    style={{
                      padding: '8px 6px',
                      fontSize: '11.5px',
                      fontWeight: 650,
                      borderRadius: '6px',
                      border: hasSplitPayment ? '1.5px solid var(--primary-red, #C51B27)' : '1px solid var(--border-color)',
                      backgroundColor: hasSplitPayment ? '#ffffff' : '#f4f4f5',
                      color: hasSplitPayment ? 'var(--primary-red, #C51B27)' : 'var(--text-muted)',
                      cursor: 'pointer'
                    }}
                  >
                    Ada Deposit Terdahulu
                  </button>
                </div>

                {/* Case A: Bayar Penuh Sekaligus */}
                {!hasSplitPayment && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '12px', backgroundColor: '#fcfcfc', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label" style={{ fontSize: '11px', fontWeight: 700 }}>TARIKH BAYARAN PENUH</label>
                      <input
                        type="date"
                        value={paidDate}
                        onChange={(e) => setPaidDate(e.target.value)}
                        className="form-control"
                        required
                      />
                    </div>

                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label" style={{ fontSize: '11px', fontWeight: 700, marginBottom: '6px' }}>
                        PILIH AKAUN BANK (BAYARAN PENUH)
                      </label>
                      {renderBankSelector(paymentBank, setPaymentBank, 'payment_bank')}
                      <span style={{ fontSize: '10.5px', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                        * Jumlah penuh RM {grandTotal.toFixed(2)} akan direkodkan ke akaun <strong>{paymentBank}</strong>.
                      </span>
                    </div>
                  </div>
                )}

                {/* Case B: Ada Deposit Terdahulu (2 Peringkat - Split Bank) */}
                {hasSplitPayment && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {/* Bahagian 1: Deposit Awal */}
                    <div style={{ padding: '10px 12px', backgroundColor: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '11px', fontWeight: 750, color: '#92400e', textTransform: 'uppercase' }}>
                          Peringkat 1: Deposit Awal
                        </span>
                        <span style={{ fontSize: '10.5px', color: '#b45309', fontWeight: 600 }}>Dikutip Dulu</span>
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        <div>
                          <label style={{ fontSize: '10.5px', fontWeight: 700, color: '#92400e', display: 'block', marginBottom: '3px' }}>JUMLAH DEPO (RM)</label>
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            max={grandTotal}
                            value={initialDepositAmount || ''}
                            onChange={(e) => setInitialDepositAmount(parseFloat(e.target.value) || 0)}
                            className="form-control"
                            style={{ fontSize: '12px', padding: '5px 8px' }}
                            required
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '10.5px', fontWeight: 700, color: '#92400e', display: 'block', marginBottom: '3px' }}>TARIKH DEPOSIT</label>
                          <input
                            type="date"
                            value={depositDate}
                            onChange={(e) => setDepositDate(e.target.value)}
                            className="form-control"
                            style={{ fontSize: '12px', padding: '5px 8px' }}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ fontSize: '10.5px', fontWeight: 700, color: '#92400e', display: 'block', marginBottom: '4px' }}>
                          PILIH BANK DEPOSIT (DUIT MASUK DEPO)
                        </label>
                        {renderBankSelector(depositBank, setDepositBank, 'deposit_bank_split')}
                      </div>
                    </div>

                    {/* Bahagian 2: Baki Bayaran */}
                    <div style={{ padding: '10px 12px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '11px', fontWeight: 750, color: '#166534', textTransform: 'uppercase' }}>
                          Peringkat 2: Baki Bayaran
                        </span>
                        <span style={{ fontSize: '11px', fontWeight: 750, color: '#166534' }}>
                          RM {Math.max(0, grandTotal - initialDepositAmount).toFixed(2)}
                        </span>
                      </div>

                      <div>
                        <label style={{ fontSize: '10.5px', fontWeight: 700, color: '#166534', display: 'block', marginBottom: '3px' }}>TARIKH BAYARAN BAKI</label>
                        <input
                          type="date"
                          value={paidDate}
                          onChange={(e) => setPaidDate(e.target.value)}
                          className="form-control"
                          style={{ fontSize: '12px', padding: '5px 8px' }}
                          required
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '10.5px', fontWeight: 700, color: '#166534', display: 'block', marginBottom: '4px' }}>
                          PILIH BANK BAKI (DUIT MASUK BAKI)
                        </label>
                        {renderBankSelector(balanceBank, setBalanceBank, 'balance_bank_split')}
                      </div>
                    </div>

                    <p style={{ fontSize: '10.5px', color: 'var(--text-muted)', margin: 0 }}>
                      * Deposit RM {initialDepositAmount.toFixed(2)} direkod ke <strong>{depositBank}</strong>, dan baki RM {Math.max(0, grandTotal - initialDepositAmount).toFixed(2)} direkod ke <strong>{balanceBank}</strong>.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Custom Input for Non-Paid / Non-Deposit (e.g. Unpaid / Void) */}
            {status !== 'Paid' && status !== 'Deposit' && status !== 'Void' && (
              <div className="form-group">
                <label className="form-label">Jumlah Bayaran (RM)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max={grandTotal}
                  value={deposit || ''}
                  onChange={(e) => handleDepositChange(e.target.value)}
                  placeholder="0.00"
                  className="form-control"
                />
              </div>
            )}

            {/* Balance & Status Display */}
            <div className="payment-outcome-details">
              <div className="outcome-row">
                <span>Baki Terhutang:</span>
                <span className={`balance-value ${status === 'Void' ? 'text-muted' : balance === 0 ? 'paid-text' : 'unpaid-text'}`}>
                  {status === 'Void' ? 'RM 0.00 (Dibatalkan)' : `RM ${balance.toFixed(2)}`}
                </span>
              </div>
              <div className="outcome-row">
                <span>Status Invois:</span>
                <span className={`badge badge-${status.toLowerCase()}`}>
                  {status}
                </span>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              {tr('cancel')}
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              <Save size={16} /> {loading ? 'Menyimpan...' : tr('save')}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .payment-modal-body {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .invoice-summary-strip {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: var(--text-muted);
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.75rem;
        }

        .payment-total-box {
          background-color: var(--off-white-bg);
          border: 1px solid var(--border-color);
          padding: 1rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          border-radius: 6px;
        }

        .payment-total-box .label {
          font-size: 0.7rem;
          font-family: var(--font-primary);
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .payment-total-box .value {
          font-family: var(--font-primary);
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--primary-red);
        }

        .quick-actions-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.5rem;
        }

        .quick-btn {
          font-size: 0.7rem !important;
          padding: 0.6rem 0.4rem !important;
          letter-spacing: 0.5px !important;
          text-align: center;
          font-weight: 600;
        }

        .active-paid {
          background-color: #E2F5EA !important;
          border-color: #15803D !important;
          color: #15803D !important;
        }

        .active-deposit {
          background-color: #FEF3C7 !important;
          border-color: #B45309 !important;
          color: #B45309 !important;
        }

        .active-unpaid {
          background-color: #FEE2E2 !important;
          border-color: #B91C1C !important;
          color: #B91C1C !important;
        }

        .active-void {
          background-color: #64748B !important;
          border-color: #475569 !important;
          color: #ffffff !important;
        }

        .payment-outcome-details {
          border-top: 1px dashed var(--border-color);
          padding-top: 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .outcome-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .balance-value {
          font-weight: 700;
          font-size: 0.95rem;
        }

        .paid-text {
          color: #15803D;
        }

        .unpaid-text {
          color: #B91C1C;
        }

        @media (max-width: 500px) {
          .invoice-summary-strip {
            flex-direction: column;
            gap: 0.35rem;
            align-items: flex-start;
          }
          .quick-actions-row {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }
          .quick-btn {
            font-size: 0.75rem !important;
            padding: 0.8rem 0.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
