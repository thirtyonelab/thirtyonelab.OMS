import { createClient } from '@supabase/supabase-js';
import { generateUUID } from '../utils/uuid.js';

const DEFAULT_SUPABASE_URL = 'https://jcwvhpreptjfucrhbzcy.supabase.co';
const DEFAULT_SUPABASE_KEY = 'sb_publishable_tR03lALW-SHxK625ZoYpWA_n6cVQZqA';

// Keys for localStorage fallback
const STORAGE_KEYS = {
  SETTINGS: '31lab_settings',
  INVOICES: '31lab_invoices',
  CLIENTS: '31lab_clients',
  LEDGER: '31lab_ledger'
};

// --- HIGH-SPEED IN-MEMORY CACHE ---
let _cachedInvoices = null;
let _cachedClients = null;
let _cachedLedger = null;
let _cachedSettings = null;

let _invoicesFetchPromise = null;
let _clientsFetchPromise = null;
let _ledgerFetchPromise = null;
let _settingsFetchPromise = null;

let _lastInvoicesTime = 0;
let _lastClientsTime = 0;
let _lastLedgerTime = 0;
let _lastSettingsTime = 0;

const CACHE_TTL_MS = 60000; // 60 saat cache segar (maklum balas 0ms pantas)

// Global Supabase client instance (initialized dynamically)
let supabaseInstance = null;

// Initialize Supabase if credentials exist in localStorage or environment variables
export const getSupabaseClient = () => {
  const url = localStorage.getItem('supabase_url') || (typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_SUPABASE_URL : undefined) || DEFAULT_SUPABASE_URL;
  const key = localStorage.getItem('supabase_anon_key') || (typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_SUPABASE_ANON_KEY : undefined) || DEFAULT_SUPABASE_KEY;
  
  if (url && key) {
    if (supabaseInstance && supabaseInstance.supabaseUrl === url) {
      return supabaseInstance;
    }
    try {
      supabaseInstance = createClient(url, key);
      return supabaseInstance;
    } catch (error) {
      console.error('Failed to initialize Supabase client:', error);
      return null;
    }
  }
  
  supabaseInstance = null;
  return null;
};

// Check if we are currently using Supabase cloud mode
export const isCloudMode = () => {
  return getSupabaseClient() !== null;
};

// Default Settings
const DEFAULT_SETTINGS = {
  company_name: 'THIRTYONE LAB',
  company_address: '26A, Jalan 1, Jalan Sungai Jelok, Taman Bukit Cantik, 43000 Kajang, Selangor',
  company_phone: 'Tel: +60 11-2561 4436',
  company_logo: '/Logo Header.webp', // Loads from public/
  invoice_prefix: 'NO.',
  bank_name: 'CIMB Bank',
  bank_account: '7656497860 (Aiman Hambali bin Amran)',
  bank_opening_balance: 2000,
  bank_opening_balance_cimb: 2000,
  bank_opening_balance_islam: 0,
  qr_code: '', // Base64
  terms: 'The ordered goods will be processed within **two weeks** after we receive a **50% deposit (or half payment).**\nGoods sold are **neither returnable nor refundable.** Otherwise, a **20% cancellation fee** on the total purchase price will be imposed.'
};

// --- SETTINGS SERVICE ---
export const getSettings = async (forceRefresh = false) => {
  if (!forceRefresh && _cachedSettings && (Date.now() - _lastSettingsTime < CACHE_TTL_MS)) {
    return _cachedSettings;
  }
  if (_settingsFetchPromise) return _settingsFetchPromise;

  _settingsFetchPromise = (async () => {
    const localStored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    const localData = localStored ? JSON.parse(localStored) : {};

    const client = getSupabaseClient();
    if (client) {
      try {
        const { data, error } = await client
          .from('settings')
          .select('*')
          .eq('id', 'global')
          .single();
        
        if (!error && data) {
          const merged = { ...DEFAULT_SETTINGS, ...data, ...localData };
          if (merged.bank_opening_balance === undefined || merged.bank_opening_balance === 0) {
            merged.bank_opening_balance = localData.bank_opening_balance !== undefined ? localData.bank_opening_balance : 2000;
          }
          if (merged.bank_opening_balance_cimb === undefined) {
            merged.bank_opening_balance_cimb = localData.bank_opening_balance_cimb !== undefined ? localData.bank_opening_balance_cimb : 2000;
          }
          if (merged.bank_opening_balance_islam === undefined) {
            merged.bank_opening_balance_islam = localData.bank_opening_balance_islam !== undefined ? localData.bank_opening_balance_islam : 0;
          }
          localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(merged));
          _cachedSettings = merged;
          _lastSettingsTime = Date.now();
          return merged;
        }
      } catch (e) {
        console.error('Error fetching settings from Supabase, falling back:', e);
      }
    }
    
    // LocalStorage Fallback
    const res = localStored ? { ...DEFAULT_SETTINGS, ...localData } : DEFAULT_SETTINGS;
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(res));
    _cachedSettings = res;
    _lastSettingsTime = Date.now();
    return res;
  })().finally(() => {
    _settingsFetchPromise = null;
  });

  return _settingsFetchPromise;
};

export const saveSettings = async (settings) => {
  const mergedSettings = { ...DEFAULT_SETTINGS, ...settings };
  _cachedSettings = mergedSettings;
  _lastSettingsTime = Date.now();

  const client = getSupabaseClient();
  if (client) {
    try {
      const { payment_profiles, selected_payment_profile, bank_opening_balance, bank_opening_balance_cimb, bank_opening_balance_islam, ...dbSettings } = mergedSettings;
      const { error } = await client
        .from('settings')
        .upsert({ id: 'global', ...dbSettings });
      if (error) throw error;
    } catch (e) {
      console.error('Error saving settings to Supabase:', e);
    }
  }
  
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(mergedSettings));
  return true;
};

// --- CLIENTS SERVICE ---
export const getClients = async (forceRefresh = false) => {
  if (!forceRefresh && _cachedClients && (Date.now() - _lastClientsTime < CACHE_TTL_MS)) {
    return _cachedClients;
  }
  if (_clientsFetchPromise) return _clientsFetchPromise;

  _clientsFetchPromise = (async () => {
    const client = getSupabaseClient();
    if (client) {
      try {
        const { data, error } = await client
          .from('clients')
          .select('*')
          .order('name', { ascending: true });
        if (error) throw error;
        if (data) {
          localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(data));
          _cachedClients = data;
          _lastClientsTime = Date.now();
          return data;
        }
      } catch (e) {
        console.error('Error fetching clients from Supabase:', e);
      }
    }

    // LocalStorage Fallback
    const stored = localStorage.getItem(STORAGE_KEYS.CLIENTS);
    const parsed = stored ? JSON.parse(stored) : [];
    _cachedClients = parsed;
    _lastClientsTime = Date.now();
    return parsed;
  })().finally(() => {
    _clientsFetchPromise = null;
  });

  return _clientsFetchPromise;
};

export const cascadeClientUpdateToInvoices = async (clientData, oldClientData = null) => {
  const targetId = clientData.id;
  const newName = (clientData.name || '').trim();
  const newPhone = (clientData.phone || '').trim();
  const oldPhone = oldClientData?.phone?.trim();
  const oldName = (oldClientData?.name || '').trim().toLowerCase();

  // If both name and phone haven't changed, skip cascade
  if (oldClientData && oldClientData.name === clientData.name && oldClientData.phone === clientData.phone) {
    return;
  }

  const client = getSupabaseClient();
  const stored = localStorage.getItem(STORAGE_KEYS.INVOICES);
  let localInvoices = stored ? JSON.parse(stored) : [];

  const matchedInvoiceIds = [];

  localInvoices = localInvoices.map(inv => {
    const isLinkedById = targetId && inv.client_id === targetId;
    const isLinkedByOldPhone = oldPhone && inv.client_phone === oldPhone;
    const isLinkedByName = oldName && (inv.client_name || '').trim().toLowerCase() === oldName;

    if (isLinkedById || isLinkedByOldPhone || (isLinkedByName && (!inv.client_id || inv.client_id === targetId))) {
      matchedInvoiceIds.push(inv.id);
      return {
        ...inv,
        client_id: targetId || inv.client_id,
        client_name: newName || inv.client_name,
        client_phone: newPhone || inv.client_phone,
        updated_at: new Date().toISOString()
      };
    }
    return inv;
  });

  localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(localInvoices));

  if (client) {
    try {
      // 1. Update in Supabase by client_id
      if (targetId) {
        await client
          .from('invoices')
          .update({
            client_name: newName,
            client_phone: newPhone,
            updated_at: new Date().toISOString()
          })
          .eq('client_id', targetId);
      }

      // 2. Also update any matched invoices that had missing client_id
      if (matchedInvoiceIds.length > 0) {
        await client
          .from('invoices')
          .update({
            client_id: targetId,
            client_name: newName,
            client_phone: newPhone,
            updated_at: new Date().toISOString()
          })
          .in('id', matchedInvoiceIds);
      }
    } catch (e) {
      console.error('Error cascading client update to Supabase invoices:', e);
    }
  }
};

export const saveClient = async (clientData, oldClientData = null) => {
  const client = getSupabaseClient();
  let savedData = null;
  if (client) {
    try {
      const upsertOptions = clientData.id ? {} : { onConflict: 'phone' };
      const { data, error } = await client
        .from('clients')
        .upsert(clientData, upsertOptions)
        .select()
        .single();
      if (error) throw error;
      savedData = data;
    } catch (e) {
      console.error('Error saving client to Supabase:', e);
    }
  }

  // LocalStorage Fallback
  const clients = await getClients();
  let updatedClient = { ...clientData };
  
  if (clientData.id) {
    const index = clients.findIndex(c => c.id === clientData.id);
    if (index !== -1) {
      clients[index] = { ...clients[index], ...clientData, updated_at: new Date().toISOString() };
      updatedClient = clients[index];
    }
  } else {
    updatedClient.id = generateUUID();
    updatedClient.created_at = new Date().toISOString();
    updatedClient.orders_count = updatedClient.orders_count || 0;
    updatedClient.total_spent = updatedClient.total_spent || 0;
    clients.push(updatedClient);
  }
  
  localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(clients));
  _cachedClients = clients;
  _lastClientsTime = Date.now();

  // If client is being edited with changes, cascade to all related invoices
  if (clientData.id && oldClientData) {
    await cascadeClientUpdateToInvoices(savedData || updatedClient, oldClientData);
  }

  return savedData || updatedClient;
};

export const deleteClient = async (id) => {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { error } = await client
        .from('clients')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Error deleting client from Supabase:', e);
    }
  }

  // LocalStorage Fallback
  const clients = await getClients();
  const filtered = clients.filter(c => c.id !== id);
  localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(filtered));
  _cachedClients = null;
  return true;
};

// --- INVOICES SERVICE ---
export const getInvoices = async (forceRefresh = false) => {
  if (!forceRefresh && _cachedInvoices && (Date.now() - _lastInvoicesTime < CACHE_TTL_MS)) {
    return _cachedInvoices;
  }
  if (_invoicesFetchPromise) return _invoicesFetchPromise;

  _invoicesFetchPromise = (async () => {
    const client = getSupabaseClient();
    let invoicesList = [];
    if (client) {
      try {
        const { data, error } = await client
          .from('invoices')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        invoicesList = data || [];
      } catch (e) {
        console.error('Error fetching invoices from Supabase:', e);
        const stored = localStorage.getItem(STORAGE_KEYS.INVOICES);
        invoicesList = stored ? JSON.parse(stored) : [];
      }
    } else {
      const stored = localStorage.getItem(STORAGE_KEYS.INVOICES);
      invoicesList = stored ? JSON.parse(stored) : [];
    }

    const processed = invoicesList.map(invoice => {
      let discount_type = invoice.discount_type;
      let discount_value = invoice.discount_value;
      let client_address = invoice.client_address;
      let pengeluaran = invoice.pengeluaran;
      let order_status = invoice.order_status;
      let due_date = invoice.due_date;
      let discount_applies_baju = invoice.discount_applies_baju;
      let discount_applies_seluar = invoice.discount_applies_seluar;
      let postage_courier = invoice.postage_courier;
      let postage_tracking = invoice.postage_tracking;
      let postage_status = invoice.postage_status;
      let postage_date = invoice.postage_date;
      let postage_cost = invoice.postage_cost;
      let delivery_fee = invoice.delivery_fee;
      let delivery_payment_status = invoice.delivery_payment_status;
      let delivery_paid_date = invoice.delivery_paid_date;
      let delivery_payment_method = invoice.delivery_payment_method;
      let has_delivery = invoice.has_delivery;
      let payment_bank = invoice.payment_bank || '';
      let factory_payment_bank = invoice.factory_payment_bank || '';
      let factory_payment_date = invoice.factory_payment_date || '';
      let initial_deposit = invoice.initial_deposit;
      let postage_payment_bank = invoice.postage_payment_bank || '';
      let deposit_bank = invoice.deposit_bank || '';
      let balance_bank = invoice.balance_bank || '';
      let delivery_bank = invoice.delivery_bank || '';
      let cleanNotes = invoice.notes || '';
      let _raw_meta = {};

      if (invoice.notes && invoice.notes.includes('__METADATA__:')) {
        const parts = invoice.notes.split('__METADATA__:');
        cleanNotes = parts[0].trim();
        try {
          const meta = JSON.parse(parts[1]);
          _raw_meta = meta;
          if (meta.discount_type !== undefined) discount_type = meta.discount_type;
          if (meta.discount_value !== undefined) discount_value = meta.discount_value;
          if (meta.client_address !== undefined) client_address = meta.client_address;
          if (meta.pengeluaran !== undefined) pengeluaran = meta.pengeluaran;
          if (meta.due_date !== undefined) due_date = meta.due_date;
          if (meta.discount_applies_baju !== undefined) discount_applies_baju = meta.discount_applies_baju;
          if (meta.discount_applies_seluar !== undefined) discount_applies_seluar = meta.discount_applies_seluar;
          if (meta.order_status !== undefined) {
            order_status = meta.order_status;
          }
          if (meta.postage_courier !== undefined) postage_courier = meta.postage_courier;
          if (meta.postage_tracking !== undefined) postage_tracking = meta.postage_tracking;
          if (meta.postage_status !== undefined) postage_status = meta.postage_status;
          if (meta.postage_date !== undefined) postage_date = meta.postage_date;
          if (meta.postage_cost !== undefined) postage_cost = meta.postage_cost;
          if (meta.delivery_fee !== undefined) delivery_fee = meta.delivery_fee;
          if (meta.delivery_payment_status !== undefined) delivery_payment_status = meta.delivery_payment_status;
          if (meta.delivery_paid_date !== undefined) delivery_paid_date = meta.delivery_paid_date;
          if (meta.delivery_payment_method !== undefined) delivery_payment_method = meta.delivery_payment_method;
          if (meta.has_delivery !== undefined) has_delivery = meta.has_delivery;
          if (meta.payment_bank !== undefined) payment_bank = meta.payment_bank;
          if (meta.factory_payment_bank !== undefined) factory_payment_bank = meta.factory_payment_bank;
          if (meta.factory_payment_date !== undefined) factory_payment_date = meta.factory_payment_date;
          if (meta.initial_deposit !== undefined) initial_deposit = meta.initial_deposit;
          if (meta.postage_payment_bank !== undefined) postage_payment_bank = meta.postage_payment_bank;
          if (meta.deposit_bank !== undefined) deposit_bank = meta.deposit_bank;
          if (meta.balance_bank !== undefined) balance_bank = meta.balance_bank;
          if (meta.delivery_bank !== undefined) delivery_bank = meta.delivery_bank;
        } catch (e) {}
      }

      if (order_status === 'NOT_SUBMITTED' || !order_status) {
        order_status = 'BELUM_DRAFT';
      }

      // Default existing legacy records: only Syafiq has delivery, all other invoices require explicit addition via "+ Tambah"
      const isSyafiq = (invoice.client_name || '').toLowerCase().includes('syafiq');
      const finalHasDelivery = has_delivery !== undefined ? Boolean(has_delivery) : isSyafiq;

      // Inference for payment_bank: All historical records belong to Bank Islam unless explicitly set to CIMB Bank
      let finalPaymentBank = payment_bank || invoice.payment_bank;
      if (!finalPaymentBank) {
        finalPaymentBank = 'Bank Islam';
      }

      let finalFactoryPaymentBank = factory_payment_bank || invoice.factory_payment_bank;
      if (!finalFactoryPaymentBank) {
        finalFactoryPaymentBank = 'Bank Islam';
      }

      let finalPostagePaymentBank = postage_payment_bank || invoice.postage_payment_bank;
      if (!finalPostagePaymentBank) {
        finalPostagePaymentBank = 'Bank Islam';
      }

      let finalDepositBank = deposit_bank || finalPaymentBank;
      let finalBalanceBank = balance_bank || finalPaymentBank;
      let finalDeliveryBank = delivery_bank || finalPostagePaymentBank || finalPaymentBank;

      return {
        ...invoice,
        notes: cleanNotes,
        _raw_meta,
        payment_bank: finalPaymentBank,
        factory_payment_bank: finalFactoryPaymentBank,
        factory_payment_date: factory_payment_date || '',
        initial_deposit: initial_deposit !== undefined ? (parseFloat(initial_deposit) || 0) : 0,
        deposit_bank: finalDepositBank,
        balance_bank: finalBalanceBank,
        delivery_bank: finalDeliveryBank,
        postage_payment_bank: finalPostagePaymentBank,
        due_date: due_date || '',
        discount_type: discount_type !== undefined ? discount_type : (parseFloat(invoice.discount_per_pcs || 0) > 0 ? 'per_pcs' : 'bulk'),
        discount_value: discount_value !== undefined ? discount_value : (parseFloat(invoice.discount_per_pcs || 0) || 0),
        client_address: client_address || '',
        pengeluaran: pengeluaran !== undefined ? (parseFloat(pengeluaran) || 0) : 0,
        order_status: order_status,
        discount_applies_baju: discount_applies_baju !== undefined ? discount_applies_baju : true,
        discount_applies_seluar: discount_applies_seluar !== undefined ? discount_applies_seluar : false,
        has_delivery: finalHasDelivery,
        postage_courier: postage_courier || '',
        postage_tracking: postage_tracking || '',
        postage_status: postage_status || '',
        postage_date: postage_date || '',
        postage_cost: postage_cost !== undefined && postage_cost !== '' && postage_cost !== null ? (parseFloat(postage_cost) || 0) : '',
        delivery_fee: delivery_fee !== undefined && delivery_fee !== '' && delivery_fee !== null ? (parseFloat(delivery_fee) || 0) : '',
        delivery_payment_status: delivery_payment_status || '',
        delivery_paid_date: delivery_paid_date || '',
        delivery_payment_method: delivery_payment_method || ''
      };
    });

    localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(processed));
    _cachedInvoices = processed;
    _lastInvoicesTime = Date.now();
    return processed;
  })().finally(() => {
    _invoicesFetchPromise = null;
  });

  return _invoicesFetchPromise;
};

// Generates next sequential invoice number based on prefix
export const getNextInvoiceNo = async () => {
  const settings = await getSettings();
  const prefix = settings.invoice_prefix || 'NO.';
  const invoices = await getInvoices();

  // Test if prefix has numbers at the end, e.g. "NO.00164" -> prefix text "NO.", start number 164, padding 5
  const match = prefix.match(/^(.*?)([0-9]+)$/);
  
  if (match) {
    const textPrefix = match[1];
    const numStr = match[2];
    const startNum = parseInt(numStr, 10);
    const padding = numStr.length;

    if (invoices.length === 0) {
      return prefix; // If no invoices exist, return the exact prefix (which acts as the start number)
    }

    // Find highest number with matching textPrefix
    let maxNum = startNum - 1; // Start counting from just below the specified start number
    invoices.forEach(inv => {
      if (inv.invoice_no && inv.invoice_no.startsWith(textPrefix)) {
        const afterPrefix = inv.invoice_no.substring(textPrefix.length);
        const numMatch = afterPrefix.match(/^([0-9]+)/);
        if (numMatch) {
          const num = parseInt(numMatch[1], 10);
          if (!isNaN(num) && num > maxNum) {
            maxNum = num;
          }
        }
      }
    });

    const nextNum = maxNum + 1;
    const paddedNum = String(nextNum).padStart(padding, '0');
    return `${textPrefix}${paddedNum}`;
  } else {
    // Standard prefix without trailing numbers (e.g. "NO.")
    if (invoices.length === 0) {
      return `${prefix}00001`;
    }

    let maxNum = 0;
    invoices.forEach(inv => {
      if (inv.invoice_no && inv.invoice_no.startsWith(prefix)) {
        const numStr = inv.invoice_no.substring(prefix.length);
        const num = parseInt(numStr, 10);
        if (!isNaN(num) && num > maxNum) {
          maxNum = num;
        }
      }
    });

    const nextNum = maxNum + 1;
    const paddedNum = String(nextNum).padStart(5, '0');
    return `${prefix}${paddedNum}`;
  }
};

const SUPABASE_INVOICE_COLUMNS = [
  'id',
  'invoice_no',
  'client_id',
  'client_name',
  'client_phone',
  'job_name',
  'date',
  'items',
  'subtotal',
  'discount_per_pcs',
  'grand_total',
  'deposit',
  'balance',
  'status',
  'notes',
  'created_at',
  'updated_at',
  'order_status',
  'deposit_date',
  'paid_date'
];

export const saveInvoice = async (invoiceData) => {
  const client = getSupabaseClient();
  
  // 1. CRM Integration: Find or create client first, and update metrics
  let customerId = invoiceData.client_id;
  let clientsList = await getClients();
  
  const cleanPhone = (p) => (p || '').replace(/\D/g, '');
  const targetPhone = cleanPhone(invoiceData.client_phone);
  const targetName = (invoiceData.client_name || '').trim().toLowerCase();

  let existingClient = clientsList.find(c => {
    if (customerId && c.id === customerId) return true;
    const cPhone = cleanPhone(c.phone);
    if (targetPhone && cPhone && targetPhone === cPhone) return true;
    if (targetName && c.name && c.name.trim().toLowerCase() === targetName) return true;
    return false;
  });
  
  let savedClientObj = null;
  if (existingClient) {
    customerId = existingClient.id;
    savedClientObj = existingClient;
  } else {
    // Create new client
    const newClient = {
      name: invoiceData.client_name,
      phone: invoiceData.client_phone,
      orders_count: 0,
      total_spent: 0
    };
    savedClientObj = await saveClient(newClient);
    customerId = savedClientObj ? savedClientObj.id : null;
  }

  const finalInvoiceData = {
    ...invoiceData,
    client_id: customerId,
    order_status: invoiceData.order_status || 'BELUM_DRAFT',
    deposit_date: invoiceData.deposit_date !== undefined ? invoiceData.deposit_date : (invoiceData.deposit > 0 ? (invoiceData.deposit_date || invoiceData.date) : null),
    paid_date: invoiceData.paid_date !== undefined ? invoiceData.paid_date : (invoiceData.status === 'Paid' ? (invoiceData.paid_date || invoiceData.date) : null),
    updated_at: new Date().toISOString()
  };

  if (!finalInvoiceData.id) {
    finalInvoiceData.id = generateUUID();
  }
  if (!finalInvoiceData.created_at) {
    finalInvoiceData.created_at = new Date().toISOString();
  }

  let savedInvoiceObj = null;

  if (client) {
    try {
      const metadata = {
        ...(finalInvoiceData._raw_meta || {}),
        discount_type: finalInvoiceData.discount_type,
        discount_value: finalInvoiceData.discount_value,
        client_address: finalInvoiceData.client_address,
        pengeluaran: finalInvoiceData.pengeluaran,
        discount_per_pcs: finalInvoiceData.discount_per_pcs,
        discount_applies_baju: finalInvoiceData.discount_applies_baju !== undefined ? finalInvoiceData.discount_applies_baju : true,
        discount_applies_seluar: finalInvoiceData.discount_applies_seluar !== undefined ? finalInvoiceData.discount_applies_seluar : false,
        order_status: finalInvoiceData.order_status || 'BELUM_DRAFT',
        has_delivery: finalInvoiceData.has_delivery !== undefined ? Boolean(finalInvoiceData.has_delivery) : false,
        postage_courier: finalInvoiceData.postage_courier || '',
        postage_tracking: finalInvoiceData.postage_tracking || '',
        postage_status: finalInvoiceData.postage_status || '',
        postage_date: finalInvoiceData.postage_date || '',
        postage_cost: finalInvoiceData.postage_cost !== undefined && finalInvoiceData.postage_cost !== '' ? (parseFloat(finalInvoiceData.postage_cost) || 0) : '',
        delivery_fee: finalInvoiceData.delivery_fee !== undefined && finalInvoiceData.delivery_fee !== '' ? (parseFloat(finalInvoiceData.delivery_fee) || 0) : '',
        delivery_payment_status: finalInvoiceData.delivery_payment_status || '',
        delivery_paid_date: finalInvoiceData.delivery_paid_date || '',
        payment_bank: finalInvoiceData.payment_bank || 'Bank Islam',
        deposit_bank: finalInvoiceData.deposit_bank || finalInvoiceData.payment_bank || 'Bank Islam',
        balance_bank: finalInvoiceData.balance_bank || finalInvoiceData.payment_bank || 'CIMB Bank',
        delivery_bank: finalInvoiceData.delivery_bank || finalInvoiceData.postage_payment_bank || finalInvoiceData.payment_bank || 'Bank Islam',
        factory_payment_bank: finalInvoiceData.factory_payment_bank || 'Bank Islam',
        factory_payment_date: finalInvoiceData.factory_payment_date || '',
        initial_deposit: finalInvoiceData.initial_deposit !== undefined ? (parseFloat(finalInvoiceData.initial_deposit) || 0) : 0,
        postage_payment_bank: finalInvoiceData.postage_payment_bank || 'Bank Islam'
      };
      if (finalInvoiceData.due_date !== undefined) {
        metadata.due_date = finalInvoiceData.due_date;
      }

      let baseNotes = (finalInvoiceData.notes || '');
      if (baseNotes.includes('__METADATA__:')) {
        baseNotes = baseNotes.split('__METADATA__:')[0].trim();
      }
      const fullNotes = baseNotes ? `${baseNotes}\n\n__METADATA__:${JSON.stringify(metadata)}` : `__METADATA__:${JSON.stringify(metadata)}`;

      const dbInvoiceData = {};
      SUPABASE_INVOICE_COLUMNS.forEach(col => {
        if (col === 'notes') {
          dbInvoiceData.notes = fullNotes;
        } else if (finalInvoiceData[col] !== undefined) {
          dbInvoiceData[col] = finalInvoiceData[col];
        }
      });

      // Safety check: Avoid foreign key violation if client_id was generated locally and not in Supabase
      if (dbInvoiceData.client_id) {
        const isClientInSupabase = clientsList.some(c => c.id === dbInvoiceData.client_id) || (savedClientObj && savedClientObj.id === dbInvoiceData.client_id);
        if (!isClientInSupabase) {
          dbInvoiceData.client_id = null;
        }
      }

      const { data, error } = await client
        .from('invoices')
        .upsert(dbInvoiceData)
        .select()
        .single();
      if (error) throw error;
      savedInvoiceObj = data;
    } catch (e) {
      console.error('Error saving invoice to Supabase:', e);
      // Fallback to LocalStorage if Supabase encounters an issue
    }
  }

  if (!savedInvoiceObj) {
    // LocalStorage Fallback
    const invoices = await getInvoices();
    if (invoiceData.id) {
      const index = invoices.findIndex(i => i.id === invoiceData.id);
      if (index !== -1) {
        invoices[index] = finalInvoiceData;
      } else {
        invoices.push(finalInvoiceData);
      }
    } else {
      finalInvoiceData.id = generateUUID();
      invoices.push(finalInvoiceData);
    }
    localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
    savedInvoiceObj = finalInvoiceData;
  }
  _cachedInvoices = null;

  // 2. Recalculate client statistics (orders count & spent) based on all non-void invoices
  const allInvoices = await getInvoices();
  const clientInvoices = allInvoices.filter(inv => inv.client_id === customerId && inv.status !== 'Void');
  
  const orders_count = clientInvoices.length;
  // total spent is sum of grand_total of all non-void invoices
  const total_spent = clientInvoices.reduce((sum, inv) => sum + parseFloat(inv.grand_total || 0), 0);

  await saveClient({
    ...savedClientObj,
    orders_count,
    total_spent
  });

  return savedInvoiceObj;
};

export const deleteInvoice = async (id) => {
  const client = getSupabaseClient();
  const invoices = await getInvoices();
  const invoiceToDelete = invoices.find(inv => inv.id === id);
  const customerId = invoiceToDelete ? invoiceToDelete.client_id : null;

  if (client) {
    try {
      const { error } = await client
        .from('invoices')
        .delete()
        .eq('id', id);
      if (error) throw error;
    } catch (e) {
      console.error('Error deleting invoice from Supabase:', e);
    }
  } else {
    // LocalStorage Fallback
    const filtered = invoices.filter(inv => inv.id !== id);
    localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(filtered));
  }
  _cachedInvoices = null;

  // Recalculate client statistics if client exists
  if (customerId) {
    const clientsList = await getClients();
    const clientObj = clientsList.find(c => c.id === customerId);
    if (clientObj) {
      const allInvoices = await getInvoices();
      const clientInvoices = allInvoices.filter(inv => inv.client_id === customerId && inv.status !== 'Void');
      const orders_count = clientInvoices.length;
      const total_spent = clientInvoices.reduce((sum, inv) => sum + parseFloat(inv.grand_total || 0), 0);
      
      await saveClient({
        ...clientObj,
        orders_count,
        total_spent
      });
    }
  }

  return true;
};

export const updateInvoicePayment = async (id, depositAmount, status, pengeluaranVal, depositDate, paidDate, paymentBank, initialDepositVal, depositBankVal, balanceBankVal, deliveryBankVal) => {
  const invoices = await getInvoices();
  const invoice = invoices.find(inv => inv.id === id);
  if (!invoice) return false;

  const deposit = parseFloat(depositAmount);
  const grand_total = parseFloat(invoice.grand_total);
  const balance = Math.max(0, grand_total - deposit);

  let initialDeposit = initialDepositVal !== undefined ? (parseFloat(initialDepositVal) || 0) : (invoice.initial_deposit || 0);
  if (status === 'Deposit') {
    initialDeposit = deposit;
  } else if (status === 'Paid') {
    if (initialDepositVal !== undefined) {
      initialDeposit = parseFloat(initialDepositVal) || 0;
    } else if (!initialDeposit && invoice.deposit > 0 && invoice.deposit < grand_total) {
      initialDeposit = invoice.deposit;
    }
  } else if (status === 'Unpaid' || status === 'Void') {
    initialDeposit = 0;
  }

  const updatedInvoice = {
    ...invoice,
    deposit,
    balance,
    status,
    initial_deposit: initialDeposit,
    pengeluaran: pengeluaranVal !== undefined ? (parseFloat(pengeluaranVal) || 0) : invoice.pengeluaran,
    updated_at: new Date().toISOString()
  };

  if (depositDate !== undefined) updatedInvoice.deposit_date = depositDate;
  if (paidDate !== undefined) updatedInvoice.paid_date = paidDate;
  if (paymentBank !== undefined) updatedInvoice.payment_bank = paymentBank;
  if (depositBankVal !== undefined) updatedInvoice.deposit_bank = depositBankVal;
  if (balanceBankVal !== undefined) updatedInvoice.balance_bank = balanceBankVal;
  if (deliveryBankVal !== undefined) updatedInvoice.delivery_bank = deliveryBankVal;

  const saved = await saveInvoice(updatedInvoice);
  return saved !== null;
};

export const updateManufacturingStatus = async (id, order_status, pengeluaranVal, dueDateVal, factoryPaymentBankVal, factoryPaymentDateVal) => {
  const invoices = await getInvoices();
  const invoice = invoices.find(inv => inv.id === id);
  if (!invoice) return false;

  const updatedInvoice = {
    ...invoice,
    order_status,
    pengeluaran: parseFloat(pengeluaranVal) || 0,
    updated_at: new Date().toISOString()
  };
  
  if (dueDateVal !== undefined) {
    updatedInvoice.due_date = dueDateVal;
  }
  if (factoryPaymentBankVal !== undefined) {
    updatedInvoice.factory_payment_bank = factoryPaymentBankVal;
  }
  if (factoryPaymentDateVal !== undefined) {
    updatedInvoice.factory_payment_date = factoryPaymentDateVal;
  }

  const saved = await saveInvoice(updatedInvoice);
  return saved !== null;
};

export const updatePostageDetails = async (id, postageData) => {
  const invoices = await getInvoices();
  const invoice = invoices.find(inv => inv.id === id);
  if (!invoice) return false;

  const updatedInvoice = {
    ...invoice,
    has_delivery: true,
    postage_courier: postageData.postage_courier !== undefined ? postageData.postage_courier : (invoice.postage_courier || ''),
    postage_tracking: postageData.postage_tracking !== undefined ? postageData.postage_tracking : (invoice.postage_tracking || ''),
    postage_status: postageData.postage_status !== undefined ? postageData.postage_status : (invoice.postage_status || ''),
    postage_date: postageData.postage_date !== undefined ? postageData.postage_date : (invoice.postage_date || ''),
    postage_cost: postageData.postage_cost !== undefined && postageData.postage_cost !== '' ? (parseFloat(postageData.postage_cost) || 0) : (invoice.postage_cost !== undefined ? invoice.postage_cost : ''),
    delivery_fee: postageData.delivery_fee !== undefined && postageData.delivery_fee !== '' ? (parseFloat(postageData.delivery_fee) || 0) : (invoice.delivery_fee !== undefined ? invoice.delivery_fee : ''),
    delivery_payment_status: postageData.delivery_payment_status !== undefined ? postageData.delivery_payment_status : (invoice.delivery_payment_status || ''),
    delivery_paid_date: postageData.delivery_paid_date !== undefined ? postageData.delivery_paid_date : (invoice.delivery_paid_date || ''),
    delivery_payment_method: postageData.delivery_payment_method !== undefined ? postageData.delivery_payment_method : (invoice.delivery_payment_method || ''),
    postage_payment_bank: postageData.postage_payment_bank !== undefined ? postageData.postage_payment_bank : (invoice.postage_payment_bank || 'Bank Islam'),
    client_address: postageData.client_address !== undefined ? postageData.client_address : (invoice.client_address || ''),
    updated_at: new Date().toISOString()
  };

  const saved = await saveInvoice(updatedInvoice);
  return saved !== null;
};

export const removeDeliveryFromInvoice = async (id) => {
  const invoices = await getInvoices();
  const invoice = invoices.find(inv => inv.id === id);
  if (!invoice) return false;

  const updatedInvoice = {
    ...invoice,
    has_delivery: false,
    postage_courier: '',
    postage_tracking: '',
    postage_status: '',
    postage_date: '',
    postage_cost: '',
    delivery_fee: '',
    delivery_payment_status: '',
    delivery_paid_date: '',
    delivery_payment_method: '',
    updated_at: new Date().toISOString()
  };

  const saved = await saveInvoice(updatedInvoice);
  return saved !== null;
};

export const createPostageOrder = async (postageData) => {
  const nextNo = await getNextInvoiceNo();
  const dateStr = postageData.postage_date || new Date().toISOString().split('T')[0];
  const fee = parseFloat(postageData.delivery_fee) || 0;
  const isPaid = postageData.delivery_payment_status === 'Paid';

  const newInvoice = {
    invoice_no: nextNo,
    client_id: postageData.client_id || null,
    client_name: (postageData.client_name || 'Pelanggan').trim(),
    client_phone: (postageData.client_phone || '').trim(),
    client_address: (postageData.client_address || '').trim(),
    job_name: (postageData.job_name || 'Penghantaran Kurier').trim(),
    date: dateStr,
    items: [],
    subtotal: fee,
    grand_total: fee,
    deposit: isPaid ? fee : 0,
    balance: isPaid ? 0 : fee,
    status: isPaid ? 'Paid' : (fee > 0 ? 'Unpaid' : 'Paid'),
    deposit_date: isPaid ? (postageData.delivery_paid_date || dateStr) : null,
    paid_date: isPaid ? (postageData.delivery_paid_date || dateStr) : null,
    has_delivery: true,
    postage_courier: postageData.postage_courier || 'J&T Express',
    postage_tracking: (postageData.postage_tracking || '').trim().toUpperCase(),
    postage_status: postageData.postage_status || 'PENDING',
    postage_date: dateStr,
    postage_cost: postageData.postage_cost !== undefined && postageData.postage_cost !== '' ? (parseFloat(postageData.postage_cost) || 0) : '',
    delivery_fee: fee,
    delivery_payment_status: postageData.delivery_payment_status || 'Unpaid',
    delivery_paid_date: postageData.delivery_paid_date || '',
    delivery_payment_method: postageData.delivery_payment_method || 'Online Transfer',
    postage_payment_bank: postageData.postage_payment_bank || 'Bank Islam',
    payment_bank: postageData.postage_payment_bank || 'Bank Islam',
    notes: postageData.notes || 'Tempahan Dibuat dari Bahagian Pos / Penghantaran'
  };

  return await saveInvoice(newInvoice);
};

// --- LEDGER SERVICE ---
const cleanLedgerItem = (item) => {
  if (!item) return item;
  let bank = item.bank;
  let description = String(item.description || '');
  if (description.includes('__METADATA__:')) {
    const parts = description.split('__METADATA__:');
    description = parts[0].trim();
    try {
      const meta = JSON.parse(parts[1]);
      if (!bank && meta.bank) bank = meta.bank;
    } catch (e) {}
  }
  if (!bank) {
    const text = `${description} ${item.payee || ''} ${item.category || ''}`.toLowerCase();
    if (text.includes('cimb') || text.includes('meta ads') || (item.date && item.date >= '2026-09-21')) {
      bank = 'CIMB Bank';
    } else if (text.includes('islam')) {
      bank = 'Bank Islam';
    } else if (text.includes('tunai') || text.includes('cash')) {
      bank = 'Tunai';
    } else {
      bank = 'Bank Islam';
    }
  }
  return {
    ...item,
    description,
    bank
  };
};

export const getLedger = async (forceRefresh = false) => {
  if (!forceRefresh && _cachedLedger && (Date.now() - _lastLedgerTime < CACHE_TTL_MS)) {
    return _cachedLedger;
  }
  if (_ledgerFetchPromise) return _ledgerFetchPromise;

  _ledgerFetchPromise = (async () => {
    const client = getSupabaseClient();
    let data = null;
    if (client) {
      try {
        const { data: dbData, error } = await client
          .from('ledger')
          .select('*')
          .order('recorded_at', { ascending: false });
        if (error) throw error;
        data = dbData;
      } catch (e) {
        console.error('Error fetching ledger from Supabase:', e);
      }
    }

    if (data) {
      const formatted = data.map(cleanLedgerItem);
      localStorage.setItem(STORAGE_KEYS.LEDGER, JSON.stringify(formatted));
      _cachedLedger = formatted;
      _lastLedgerTime = Date.now();
      return formatted;
    }

    // LocalStorage Fallback (with automatic cleaning of any metadata residue)
    const stored = localStorage.getItem(STORAGE_KEYS.LEDGER);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const cleaned = parsed.map(cleanLedgerItem);
          localStorage.setItem(STORAGE_KEYS.LEDGER, JSON.stringify(cleaned));
          _cachedLedger = cleaned;
          _lastLedgerTime = Date.now();
          return cleaned;
        }
      } catch (e) {}
    }
    _cachedLedger = [];
    _lastLedgerTime = Date.now();
    return [];
  })().finally(() => {
    _ledgerFetchPromise = null;
  });

  return _ledgerFetchPromise;
};

export const saveLedgerEntry = async (entryData) => {
  const client = getSupabaseClient();
  let finalEntry = { ...entryData, updated_at: new Date().toISOString() };
  
  if (!finalEntry.id) {
    finalEntry.id = generateUUID();
    finalEntry.recorded_at = finalEntry.recorded_at || new Date().toISOString();
  }
  
  // Format description with metadata for bank persistence
  let baseDescription = finalEntry.description || '';
  if (baseDescription.includes('__METADATA__:')) {
    baseDescription = baseDescription.split('__METADATA__:')[0].trim();
  }
  const bankValue = finalEntry.bank || 'CIMB Bank';
  const metadata = { bank: bankValue };
  const fullDescription = `${baseDescription}\n\n__METADATA__:${JSON.stringify(metadata)}`;

  let savedEntry = null;
  
  if (client) {
    let dbPayload = {
      id: finalEntry.id,
      date: finalEntry.date,
      type: finalEntry.type,
      category: finalEntry.category,
      description: fullDescription,
      payee: finalEntry.payee || '',
      amount: Number(finalEntry.amount || 0),
      bank: bankValue,
      recorded_at: finalEntry.recorded_at || new Date().toISOString(),
      updated_at: finalEntry.updated_at
    };

    try {
      const { data, error } = await client
        .from('ledger')
        .upsert(dbPayload)
        .select()
        .single();

      if (error) {
        // If column 'bank' doesn't exist in Supabase schema, retry without bank column
        if (error.message && (error.message.includes('bank') || error.code === 'PGRST204')) {
          delete dbPayload.bank;
          const retryRes = await client
            .from('ledger')
            .upsert(dbPayload)
            .select()
            .single();
          if (retryRes.error) throw retryRes.error;
          savedEntry = { ...retryRes.data, bank: bankValue, description: baseDescription };
        } else {
          throw error;
        }
      } else {
        savedEntry = { ...data, bank: bankValue, description: baseDescription };
      }
    } catch (e) {
      console.error('Error saving ledger entry to Supabase:', e);
    }
  }
  
  // Update LocalStorage
  const stored = localStorage.getItem(STORAGE_KEYS.LEDGER);
  const ledger = stored ? JSON.parse(stored) : [];
  const cleanEntryToStore = {
    ...finalEntry,
    description: baseDescription,
    bank: bankValue
  };
  const index = ledger.findIndex(l => l.id === cleanEntryToStore.id);
  if (index !== -1) {
    ledger[index] = cleanEntryToStore;
  } else {
    ledger.push(cleanEntryToStore);
  }
  ledger.sort((a, b) => new Date(b.recorded_at || b.date) - new Date(a.recorded_at || a.date));
  localStorage.setItem(STORAGE_KEYS.LEDGER, JSON.stringify(ledger));
  _cachedLedger = null;
  
  return savedEntry || cleanEntryToStore;
};

export const deleteLedgerEntry = async (id) => {
  const client = getSupabaseClient();
  
  if (client) {
    try {
      const { error } = await client
        .from('ledger')
        .delete()
        .eq('id', id);
      if (error) throw error;
    } catch (e) {
      console.error('Error deleting ledger entry from Supabase:', e);
    }
  }

  // LocalStorage update
  const stored = localStorage.getItem(STORAGE_KEYS.LEDGER);
  if (stored) {
    const ledger = JSON.parse(stored);
    const filtered = ledger.filter(l => l.id !== id);
    localStorage.setItem(STORAGE_KEYS.LEDGER, JSON.stringify(filtered));
  }
  _cachedLedger = null;
  return true;
};

