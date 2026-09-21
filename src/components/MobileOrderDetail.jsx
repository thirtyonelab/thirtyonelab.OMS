import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, Check, ChevronRight, FileText, Pencil, Wallet, Copy, Trash2, Printer } from 'lucide-react';
import { updateInvoicePayment, getNextInvoiceNo, deleteInvoice, getSettings } from '../services/storage';
import { money, today, balanceOf, quantityOf, addedPayment, repeatOrderDraft } from '../utils/mobileOrders';

export default function MobileOrderDetail({ invoice: inv, section, onBack, onEdit, onPrint, onSaved }) {
  const [panel, setPanel] = useState(
    section === 'payment' ? 'payment' :
    section === 'items' ? 'items' : 'payment'
  );
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    getSettings().then(s => setSettings(s));
  }, []);

  const defaultBank = inv.payment_bank || 'CIMB Bank';
  const [paymentBank, setPaymentBank] = useState(defaultBank);
  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState(today());
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const remaining = balanceOf(inv);

  const toggle = name => {
    setPanel(panel === name ? '' : name);
    setFeedback('');
    setError('');
  };

  const updateDelivery = (name, value) => setDelivery(prev => ({ ...prev, [name]: value }));

  const save = async (event, operation) => {
    event.preventDefault();
    setBusy(true);
    setFeedback('');
    setError('');
    try {
      if (!await operation()) throw new Error('Save failed');
      await onSaved();
      setAmount('');
      setFeedback('Perubahan berjaya disimpan.');
    } catch {
      setError('Tidak dapat menyimpan data. Sila semak input dan cuba lagi.');
    } finally {
      setBusy(false);
    }
  };

  const heading = (name, Icon, title, subtitle) => (
    <button className="m-disclosure" aria-expanded={panel === name} aria-controls={`order-${name}`} onClick={() => toggle(name)}>
      <span className="m-section-icon"><Icon size={19} /></span>
      <span>
        <strong>{title}</strong>
        <small>{subtitle}</small>
      </span>
      <ChevronRight size={18} className={panel === name ? 'm-rotate' : ''} />
    </button>
  );

  const submit = label => (
    <button className="m-button m-primary" type="submit" disabled={busy}>
      {busy ? 'Menyimpan...' : label}
      <Check size={17} />
    </button>
  );

  return (
    <main className="m-content m-order-detail">
      <button className="m-back" onClick={onBack}>
        <ArrowLeft size={18} />
        Kembali ke Senarai Tempahan
        <span>{inv.invoice_no || 'DRAFT'}</span>
      </button>

      <div className="m-detail-title">
        <span className="m-eyebrow">{inv.job_name || 'Tempahan Pelanggan'}</span>
        <h1>{inv.client_name || 'Pelanggan'}</h1>
        {inv.client_phone && (
          <a className="m-contact" href={`tel:${inv.client_phone}`}>
            Hubungi: {inv.client_phone}
            <ArrowUpRight size={14} />
          </a>
        )}
      </div>

      <section className="m-total-panel" aria-label="Ringkasan Bayaran">
        <span>Jumlah Nilai Tempahan</span>
        <strong>{money(inv.grand_total)}</strong>
        <div>
          <span>Deposit / Telah Diterima<b>{money(inv.deposit)}</b></span>
          <span>Baki Belum Bayar<b>{money(remaining)}</b></span>
        </div>
      </section>

      {inv.status === 'Void' && <p className="m-notice">* Tempahan ini telah dibatalkan (VOID).</p>}
      {feedback && <p className="m-success" role="status"><Check size={16} />{feedback}</p>}
      {error && <p className="m-error" role="alert">{error}</p>}

      <section className="m-detail-section">
        {heading(
          'payment',
          Wallet,
          'Rekod Bayaran (Payment)',
          remaining > 0 ? `Baki Tertunggak: ${money(remaining)}` : 'Lunas (Tiada Baki)'
        )}
        {panel === 'payment' && (
          <div id="order-payment" className="m-panel-body">
            {remaining > 0 ? (
              <form onSubmit={e => save(e, () => {
                const next = addedPayment(inv, amount);
                return updateInvoicePayment(
                  inv.id,
                  next.deposit,
                  next.status,
                  inv.pengeluaran,
                  inv.deposit_date || paymentDate,
                  next.status === 'Paid' ? paymentDate : inv.paid_date,
                  paymentBank
                );
              })}>
                <button
                  type="button"
                  className="m-button m-soft"
                  onClick={() => setAmount(remaining.toFixed(2))}
                >
                  Bayar Baki Penuh · {money(remaining)}
                </button>
                <label>
                  Masuk ke Akaun Bank
                  <select
                    value={paymentBank}
                    onChange={e => setPaymentBank(e.target.value)}
                  >
                    <option value="CIMB Bank">CIMB Bank (Aiman Hambali - 7656497860)</option>
                    <option value="Bank Islam">Bank Islam (Hidayatul Rizman - 05021020449003)</option>
                    <option value="Tunai">Tunai / Lain-lain</option>
                  </select>
                </label>
                <label>
                  Jumlah Bayaran Masuk (RM)
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0.01"
                    max={remaining}
                    step="0.01"
                    required
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    placeholder="0.00"
                  />
                </label>
                <label>
                  Tarikh Bayaran Diterima
                  <input
                    type="date"
                    required
                    value={paymentDate}
                    onChange={e => setPaymentDate(e.target.value)}
                  />
                </label>
                <p className="m-calculation">
                  Baki Selepas Bayaran Ini
                  <strong>{money(Math.max(0, remaining - Number(amount || 0)))}</strong>
                </p>
                {submit('Simpan Rekod Bayaran')}
              </form>
            ) : (
              <p className="m-muted">Semua bayaran untuk tempahan ini telah selesai direkod (Lunas).</p>
            )}
            <small>Akaun Bank: <strong>{inv.payment_bank || defaultBank}</strong></small>
            {inv.deposit_date && <small>Tarikh Deposit: {inv.deposit_date}</small>}
            {inv.paid_date && <small>Tarikh Bayaran Penuh: {inv.paid_date}</small>}
          </div>
        )}
      </section>

      <section className="m-detail-section">
        {heading(
          'items',
          FileText,
          'Senarai Item & Rekaan',
          `${quantityOf(inv)} pcs · ${(inv.items || []).length} rekod rekaan`
        )}
        {panel === 'items' && (
          <div id="order-items" className="m-panel-body">
            {(inv.items || []).map((item, index) => (
              <div className="m-item" key={item.id || index}>
                <strong>{item.design_name || `Rekaan #${index + 1}`}</strong>
                <span>{item.qty || 0} pcs · {money(item.subtotal)}</span>
                <small>{[item.material, item.cutting, item.neck].filter(Boolean).join(' · ')}</small>
              </div>
            ))}
            {inv.notes && <p className="m-notes"><strong>Nota:</strong> {inv.notes}</p>}
          </div>
        )}
      </section>

      <div className="m-detail-actions">
        <button className="m-button m-soft" onClick={() => onEdit(inv)}>
          <Pencil size={16} /> Edit Tempahan Penuh
        </button>
        <button className="m-button m-soft" onClick={() => onPrint(inv)}>
          <FileText size={16} /> Cetak / Lihat Invois
        </button>
      </div>

      <button
        className="m-button m-soft"
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          try {
            onEdit(repeatOrderDraft(inv, await getNextInvoiceNo()));
          } catch {
            setError('Tidak dapat menyalin tempahan ini. Sila cuba lagi.');
          } finally {
            setBusy(false);
          }
        }}
      >
        <Copy size={16} /> Salin Sebagai Tempahan Baru (Repeat Order)
      </button>

      <button
        className="m-button m-delete-btn"
        disabled={busy}
        onClick={async () => {
          if (window.confirm(`Adakah anda pasti mahu memadam invois "${inv.invoice_no || 'DRAFT'}" secara kekal? Tindakan ini tidak boleh diundur.`)) {
            setBusy(true);
            try {
              await deleteInvoice(inv.id);
              await onSaved();
              onBack();
            } catch {
              setError('Gagal memadam invois. Sila cuba lagi.');
              setBusy(false);
            }
          }
        }}
      >
        <Trash2 size={16} /> Padam Invois Ini
      </button>

      {isVoucherOpen && settings && (
        <KilangVoucherModal
          isOpen={isVoucherOpen}
          onClose={() => setIsVoucherOpen(false)}
          invoice={inv}
          settings={settings}
        />
      )}
    </main>
  );
}
