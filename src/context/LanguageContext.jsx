import React, { createContext, useContext, useState } from 'react';

// Natural Malaysian business / operational terms (Bahasa Melayu & English industry rojak)
const businessTranslations = {
  // Sidebar & Navigation
  overview: 'Ringkasan',
  orders: 'Invois & Tempahan',
  manufacturing: 'Kilang (Production)',
  postage: 'Penghantaran (Pos)',
  clients: 'Pelanggan (Clients)',
  ledger: 'Buku Tunai (Ledger)',
  reports: 'Laporan P&L',
  settings: 'Tetapan (Settings)',
  finance: 'KEWANGAN',
  settingsSection: 'TETAPAN',
  localMode: 'MOD LOKAL',
  localDesc: 'Simpan pada peranti',
  cloudSync: 'SINKRON AWAN',
  cloudDesc: 'Awan aktif',
  language: 'BAHASA',

  // Dashboard / Ringkasan
  dashboardTag: 'PUSAT KAWALAN UTAMA',
  dashboardTitle: 'RINGKASAN OPERASI',
  netProfit: 'UNTUNG BERSIH (NET PROFIT)',
  netProfitDesc: 'Kutipan Jualan - Kos Operasi (Lejar)',
  statusBayaran: 'STATUS BAYARAN',
  statusOperasi: 'STATUS OPERASI',
  unpaid: 'Belum Bayar',
  deposit: 'Deposit',
  paid: 'Lunas (Paid)',
  void: 'Batal (Void)',
  paidMonth: 'Lunas (Bulan ini)',
  belumDraft: 'Belum Draft',
  draft: 'Draft',
  notSubmitted: 'Belum Submit',
  pending: 'Pending (Belum Mula)',
  processing: 'Sedang Diproses',
  completed: 'Siap (Completed)',
  maintenance: 'Rework / Baik Pulih',
  totalKutipan: 'TOTAL JUALAN / KUTIPAN',
  totalKos: 'TOTAL KOS / PERBELANJAAN',
  thisMonth: 'Bulan Ini',
  kilangLejar: 'Kos Kilang + Lejar Kedai',
  newOrder: 'Tempahan Baru',
  recentInvoices: 'Invois Terkini',
  viewAll: 'Lihat Semua',
  refresh: 'Muat Semula',
  searchPlaceholder: 'Cari nama pelanggan atau no. invois...',
  searchClientPlaceholder: 'Cari nama atau no. telefon pelanggan...',
  allStatus: 'Semua Status',
  status: 'Status',
  month: 'Bulan',
  allMonths: 'Semua Bulan',

  // Orders / Invois
  ordersTag: 'SENARAI TEMPAHAN',
  ordersTitle: 'INVOIS & TEMPAHAN',

  // Manufacturing / Kilang
  mfgTag: 'OPERASI KILANG & PRODUCTION',
  mfgTitle: 'PENGELUARAN KILANG',
  mfgSubtitle: 'Pantau status tempahan dan rekod kos pengeluaran kilang',
  pendingOrders: 'PENDING KILANG',
  processingOrders: 'SEDANG DIPROSES',

  // Clients
  clientsTag: 'SENARAI PELANGGAN',
  clientsTitle: 'PELANGGAN & CRM',
  clientsSubtitle: 'Urus maklumat perhubungan dan rekod tempahan pelanggan',

  // Ledger / Buku Tunai
  ledgerTag: 'BUKU TUNAI',
  ledgerTitle: 'LEJAR & BUKU TUNAI',
  ledgerSubtitle: 'Rekod perbelanjaan kedai dan aliran keluar masuk tunai',

  // Reports / P&L
  reportsTag: 'LAPORAN KEWANGAN',
  reportsTitle: 'PENYATA UNTUNG RUGI (P&L)',
  reportsSubtitle: 'Laporan kewangan mengikut kategori untuk pengiraan rasmi perniagaan',

  // Table headers & common terms
  invNo: 'NO. INVOIS',
  clientName: 'NAMA PELANGGAN',
  amount: 'JUMLAH (RM)',
  actions: 'TINDAKAN',
  date: 'TARIKH',
  balance: 'BAKI (RM)',
  phone: 'NO. TELEFON',
  totalOrder: 'JUMLAH TEMPAHAN',
  totalSpent: 'JUMLAH BELANJA',
  items: 'ITEM (Baju/Banner)',
  kosKilang: 'KOS KILANG',
  category: 'KATEGORI',
  description: 'KETERANGAN',
  type: 'JENIS',
  loadingInvoice: 'Memuatkan invois...',
  noInvoice: 'Tiada invois ditemui.',
  loadingData: 'Memuatkan data...',
  noData: 'Tiada rekod ditemui.',
  loadingClient: 'Memuatkan data pelanggan...',
  noClient: 'Tiada pelanggan ditemui.',
  view: 'Lihat',
  edit: 'Edit',
  delete: 'Padam',
  save: 'SIMPAN',
  print: 'CETAK',
  previous: 'Sebelum',
  next: 'Seterusnya',
  cancel: 'Batal',
  saveChanges: 'Simpan Perubahan',
  close: 'Tutup',
  addExpense: 'TAMBAH PERBELANJAAN (Sewa, Gaji, Bil, dll)',
  editInfo: 'Edit Maklumat',
  saveInvoice: 'Simpan Invois',
  saveRecord: 'Simpan Rekod',
  saveSettings: 'Simpan Tetapan',
  printReport: 'Cetak Laporan',

  // Settings Page
  sysConfig: 'Konfigurasi Sistem',
  settingsTitle: 'Tetapan Sistem',
  compInfo: '1. Maklumat Syarikat & Kedai',
  compName: 'Nama Syarikat',
  phoneNo: 'No. Telefon',
  storeAddress: 'Alamat Kedai',
  compLogo: 'Logo Syarikat (Maksimum 500KB)',
  uploadLogo: 'Muat Naik Logo',
  invoicePrefix: 'Prefix Nombor Invois',
  invoicePrefixHelp: 'Prefix hadapan bagi nombor invois (cth: NO.00001)',
  paymentInfo: '2. Maklumat Pembayaran',
  paymentProfiles: 'Profil Akaun Pembayaran / Preset Bank',
  selectProfile: 'Pilih Profil Akaun',
  profileLabel: 'Nama Profil / Label',
  addProfile: '+ Tambah Profil Baru',
  deleteProfile: 'Padam Profil',
  bankName: 'Nama Bank',
  bankAccNo: 'No. Akaun Bank',
  accName: 'Nama Pemegang Akaun',
  qrCode: 'Kod QR DuitNow (Maksimum 500KB)',
  uploadQR: 'Muat Naik Kod QR',
  termsTitle: '3. Terma & Syarat (Nota Kaki Invois)',
  termsLabel: 'Syarat & Peraturan Perniagaan',
  termsHelp: 'Satu ayat setiap baris. Teks ini akan dicetak di bahagian nota kaki invois.',
  dbTitle: '4. Sambungan Pangkalan Data Supabase (Awan)',
  dbDesc: 'Masukkan maklumat database Supabase anda untuk penyegerakan data di antara peranti (komputer kedai dan telefon). Jika dibiarkan kosong, sistem akan beroperasi dalam **Mod LocalStorage**.',
  testConnection: 'Uji Sambungan Database',
  testingDb: 'Sedang menguji sambungan database...',
  backupTitle: '5. Sandaran Data (Backup & Restore)',
  backupDesc: 'Muat turun salinan data sistem ke fail JSON untuk keselamatan atau pindahkan data ke peranti lain.',
  downloadBackup: 'Muat Turun Data (Export JSON)',
  settingsSaved: 'Tetapan berjaya disimpan!',

  // Auth / Login
  login: 'Log Masuk',
  logout: 'Log Keluar',
  email: 'Alamat Emel',
  password: 'Kata Laluan',
  signIn: 'Log Masuk',
  signingIn: 'Sedang log masuk...',
  welcomeBack: 'Selamat Kembali',
  loginSubtitle: 'Portal Pengurusan ThirtyOne Lab OMS',
  invalidLogin: 'Emel atau kata laluan tidak sah. Sila cuba lagi.',
  accountRequired: 'Akaun staf dalaman diperlukan untuk mengakses sistem ini.',
};

const defaultContextValue = {
  language: 'MY',
  setLanguage: () => {},
  toggleLanguage: () => {},
  tr: (key) => (businessTranslations[key] !== undefined ? businessTranslations[key] : key)
};

const LanguageContext = createContext(defaultContextValue);

export const LanguageProvider = ({ children }) => {
  const tr = (key) => (businessTranslations[key] !== undefined ? businessTranslations[key] : key);

  return (
    <LanguageContext.Provider value={{ language: 'MY', setLanguage: () => {}, toggleLanguage: () => {}, tr }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  return context || defaultContextValue;
};


