import { today } from '../utils/mobileOrders.js';
import { SIZES } from './sizePricing.js';

export const demoMode = import.meta.env.VITE_DEMO_MODE === 'true';
export const demoSession = { user: { id: 'local-demo', email: 'demo@thirtyonelab.local' } };

export function seedDemo() {
  if (!demoMode || localStorage.getItem('31lab_mobile_demo_invoices') !== null) return;
  const date = today();
  const day = offset => {
    const d = new Date(`${date}T12:00:00`);
    d.setDate(d.getDate() + offset);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };
  const rows = [
    ['Kelab Larian Kajang', 'Jersey komuniti · Batch 02', 30, 1170, 585, 'PROCESSING', -1, 720, true],
    ['Kopi Sudut', 'Uniform kru kafe', 15, 585, 585, 'COMPLETED', 0, 360, true],
    ['Team Rimba', 'Jersey trail run', 45, 1665, 832.5, 'BELUM_DRAFT', 5, 0, false],
    ['Studio Awan', 'T-shirt pasukan kreatif', 20, 780, 390, 'COMPLETED', 1, 480, false],
    ['SMK Seri Jelok', 'Baju rumah sukan', 80, 2720, 1360, 'PROCESSING', 3, 1840, true],
    ['Nadi Cycling', 'Jersey hujung minggu', 25, 975, 975, 'COMPLETED', -3, 600, true],
  ];
  const clients = rows.map((row, i) => ({ id: `demo-client-${i}`, name: row[0], phone: `010000000${i}`, orders_count: 1, total_spent: row[3] }));
  const invoices = rows.map(([name, job, qty, total, deposit, order_status, offset, cost, delivery], i) => ({
    id: `demo-order-${i}`, invoice_no: `NO.${String(164 + i).padStart(5, '0')}`,
    client_id: clients[i].id, client_name: name, client_phone: clients[i].phone,
    client_address: 'Alamat contoh, Kajang, Selangor', job_name: job,
    date, due_date: day(offset), created_at: `${date}T08:00:00.000Z`, updated_at: `${date}T08:00:00.000Z`,
    items: [{ id: `demo-item-${i}`, design_name: job, material: 'Eyelet', cutting: 'Normal', neck: 'Roundneck', rib: 'Tiada', name_set: 'No', own_brand: 'No', design_image: '', qty, subtotal: total,
      sizes: Object.fromEntries(SIZES.map(size => [size, { short: size === 'M' ? Math.floor(qty / 2) : size === 'L' ? qty - Math.floor(qty / 2) : 0, long: 0, pants: 0 }])) }],
    subtotal: total, grand_total: total, deposit, balance: total - deposit,
    status: total === deposit ? 'Paid' : 'Deposit', order_status, pengeluaran: cost,
    deposit_date: date, paid_date: total === deposit ? date : null,
    has_delivery: delivery, postage_status: i === 5 ? 'DROPOFF' : delivery ? 'PENDING' : '',
    postage_courier: delivery ? 'J&T Express' : '', postage_tracking: i === 5 ? 'DEMO-000169' : '',
    postage_date: i === 5 ? date : '', delivery_fee: delivery ? 15 : '', postage_cost: delivery ? 10 : '',
    discount_type: 'bulk', discount_value: 0, notes: 'Data contoh untuk mencuba paparan mobile.',
  }));
  localStorage.setItem('31lab_mobile_demo_clients', JSON.stringify(clients));
  localStorage.setItem('31lab_mobile_demo_invoices', JSON.stringify(invoices));
  localStorage.setItem('31lab_mobile_demo_ledger', JSON.stringify([
    { id: 'demo-ledger-1', date, type: 'OUT', category: 'Belanja Operasi', description: 'Sewa ruang kerja (contoh)', payee: 'Pemilik premis', amount: 1200, recorded_at: `${date}T07:00:00Z` },
    { id: 'demo-ledger-2', date, type: 'OUT', category: 'Kos Meta Ads', description: 'Kempen September (contoh)', amount: 180, recorded_at: `${date}T06:00:00Z` },
  ]));
}
