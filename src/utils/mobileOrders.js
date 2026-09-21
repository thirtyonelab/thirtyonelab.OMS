export const productionStates = {
  BELUM_DRAFT: 'Belum Draft',
  DRAFT: 'Draft',
  PENDING: 'Pending Kilang',
  PROCESSING: 'Sedang Diproses',
  COMPLETED: 'Siap (Selesai)',
  MAINTENANCE: 'Rework / Baik Pulih',
};

export const deliveryStates = {
  PENDING: 'Belum Pos',
  DROPOFF: 'Drop-off Kurier',
  PICKUP: 'Self Pick-up',
};

export const money = value => new Intl.NumberFormat('en-MY', { style: 'currency', currency: 'MYR' }).format(Number(value) || 0);

export const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export const balanceOf = inv => inv.status === 'Void' || inv.status === 'Paid' ? 0 : Math.max(0, Number(inv.grand_total || 0) - Number(inv.deposit || 0));

export const quantityOf = inv => (inv.items || []).reduce((total, item) => total + (Number(item.qty) || 0), 0);

export const isParcelCourier = inv => {
  if (!inv || !inv.has_delivery) return false;
  const courier = String(inv.postage_courier || '').trim().toLowerCase();
  if (courier.includes('lalamove') || courier.includes('pickup') || courier.includes('pick-up') || courier.includes('pick up') || courier.includes('ambil sendiri') || courier.includes('grab') || courier.includes('runner')) {
    return false;
  }
  return true;
};

export const needsAction = (inv, type, date = today()) => {
  if (inv.status === 'Void') return false;
  switch (type) {
    case 'late': return Boolean(inv.due_date && inv.due_date < date && inv.order_status !== 'COMPLETED');
    case 'draft': return !inv.order_status || inv.order_status === 'BELUM_DRAFT' || inv.order_status === 'DRAFT';
    case 'balance': return inv.order_status === 'COMPLETED' && balanceOf(inv) > 0;
    case 'dispatch': return inv.order_status === 'COMPLETED' && isParcelCourier(inv) && (!inv.postage_status || inv.postage_status === 'PENDING');
    default: return ['late', 'draft', 'balance', 'dispatch'].some(key => needsAction(inv, key, date));
  }
};

// The existing schema stores cumulative receipts, not a payment transaction history.
export function addedPayment(inv, amount) {
  const value = Number(amount);
  const remaining = balanceOf(inv);
  if (!Number.isFinite(value) || value <= 0 || Math.round(value * 100) > Math.round(remaining * 100)) throw new Error('Invalid payment amount');
  const deposit = Math.round((Number(inv.deposit || 0) + value) * 100) / 100;
  return { deposit, status: deposit >= Number(inv.grand_total) ? 'Paid' : 'Deposit' };
}

export function repeatOrderDraft(inv, invoiceNo) {
  const draft = {};
  for (const key of ['client_id', 'client_name', 'client_phone', 'client_address', 'job_name', 'items', 'subtotal', 'grand_total', 'discount_type', 'discount_value', 'discount_per_pcs', 'discount_applies_baju', 'discount_applies_seluar']) {
    if (inv[key] !== undefined) draft[key] = structuredClone(inv[key]);
  }
  return { ...draft, invoice_no: invoiceNo, date: today(), deposit: 0, balance: inv.grand_total, status: 'Unpaid', order_status: 'BELUM_DRAFT', pengeluaran: 0, has_delivery: false };
}
