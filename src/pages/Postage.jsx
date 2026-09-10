import React, { useState, useEffect } from 'react';
import { Truck, Package, Search, Calendar, Printer, Save, CheckCircle, Clock, MapPin, ExternalLink, Send, FileText, Receipt, AlertCircle, Edit2, X, Plus, Trash2 } from 'lucide-react';
import { getInvoices, getSettings, updatePostageDetails, removeDeliveryFromInvoice } from '../services/storage';
import { useLanguage } from '../context/LanguageContext';
import DeliveryOrderModal from '../components/DeliveryOrderModal';

const ITEMS_PER_PAGE = 10;

export default function Postage() {
  const { tr, language } = useLanguage();
  const [invoices, setInvoices] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filters & search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [paymentFilter, setPaymentFilter] = useState('All');
  const [monthFilter, setMonthFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  // Add Delivery Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addForm, setAddForm] = useState({
    invoice_id: '',
    postage_courier: 'J&T Express',
    postage_tracking: '',
    postage_status: 'PENDING',
    postage_cost: '',
    delivery_fee: '',
    delivery_payment_status: 'Unpaid',
    delivery_paid_date: '',
    delivery_payment_method: 'Online Transfer',
    client_address: ''
  });

  // Edit Modal state (Clean modal matching Invoices / Orders)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [editForm, setEditForm] = useState({
    postage_courier: 'J&T Express',
    postage_tracking: '',
    postage_status: 'PENDING',
    postage_cost: '',
    delivery_fee: '',
    delivery_payment_status: 'Unpaid',
    delivery_paid_date: '',
    delivery_payment_method: 'Online Transfer',
    client_address: ''
  });

  // Delivery Document Print/Preview Modal
  const [selectedInvoiceForModal, setSelectedInvoiceForModal] = useState(null);
  const [modalInitialMode, setModalInitialMode] = useState('receipt');
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);

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

  const courierOptions = [
    'J&T Express',
    'Pos Laju',
    'Flash Express',
    'Ninja Van',
    'DHL eCommerce',
    'Lain-lain'
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [invData, settingsData] = await Promise.all([
        getInvoices(),
        getSettings()
      ]);
      setInvoices(invData);
      setSettings(settingsData);
    } catch (e) {
      console.error('Error loading postage data:', e);
    } finally {
      setLoading(false);
    }
  };

  // Open clean Edit Modal
  const openEditModal = (inv) => {
    setEditingInvoice(inv);
    setEditForm({
      postage_courier: inv.postage_courier || '',
      postage_tracking: inv.postage_tracking || '',
      postage_status: inv.postage_status || '',
      postage_cost: inv.postage_cost !== undefined && inv.postage_cost !== null && inv.postage_cost !== '' ? inv.postage_cost : '',
      delivery_fee: inv.delivery_fee !== undefined && inv.delivery_fee !== null && inv.delivery_fee !== '' ? inv.delivery_fee : '',
      delivery_payment_status: inv.delivery_payment_status || '',
      delivery_paid_date: inv.delivery_paid_date || '',
      delivery_payment_method: inv.delivery_payment_method || '',
      client_address: inv.client_address || ''
    });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingInvoice(null);
  };

  // Save Edit Modal
  const handleSaveEditModal = async (e) => {
    e.preventDefault();
    if (!editingInvoice) return;

    let paidDate = editForm.delivery_paid_date;
    if (editForm.delivery_payment_status === 'Paid' && !paidDate) {
      paidDate = new Date().toISOString().split('T')[0];
    }

    const payload = {
      has_delivery: true,
      postage_courier: editForm.postage_courier || 'J&T Express',
      postage_tracking: (editForm.postage_tracking || '').trim().toUpperCase(),
      postage_status: editForm.postage_status || 'PENDING',
      postage_cost: editForm.postage_cost !== '' ? (parseFloat(editForm.postage_cost) || 0) : '',
      delivery_fee: editForm.delivery_fee !== '' ? (parseFloat(editForm.delivery_fee) || 0) : '',
      delivery_payment_status: editForm.delivery_payment_status || 'Unpaid',
      delivery_paid_date: paidDate,
      delivery_payment_method: editForm.delivery_payment_method || 'Online Transfer',
      client_address: (editForm.client_address || '').trim().toUpperCase()
    };

    setLoading(true);
    try {
      const success = await updatePostageDetails(editingInvoice.id, payload);
      if (success) {
        closeEditModal();
        await loadData();
      } else {
        alert('Gagal menyimpan maklumat penghantaran.');
      }
    } catch (err) {
      console.error(err);
      alert('Ralat semasa menyimpan maklumat.');
    } finally {
      setLoading(false);
    }
  };

  // Add Delivery Modal handlers
  const openAddModal = () => {
    const available = invoices.filter(inv => !inv.has_delivery && inv.status !== 'Void');
    const firstInv = available[0] || null;

    setAddForm({
      invoice_id: firstInv ? firstInv.id : '',
      postage_courier: 'J&T Express',
      postage_tracking: '',
      postage_status: 'PENDING',
      postage_cost: '',
      delivery_fee: '',
      delivery_payment_status: 'Unpaid',
      delivery_paid_date: '',
      delivery_payment_method: 'Online Transfer',
      client_address: firstInv ? (firstInv.client_address || '') : ''
    });
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleSelectInvoiceToAdd = (selectedId) => {
    const selectedInv = invoices.find(i => i.id === selectedId);
    setAddForm(prev => ({
      ...prev,
      invoice_id: selectedId,
      client_address: selectedInv?.client_address || prev.client_address
    }));
  };

  const handleSaveAddModal = async (e) => {
    e.preventDefault();
    if (!addForm.invoice_id) {
      alert('Sila pilih pesanan / invois terlebih dahulu.');
      return;
    }

    let paidDate = addForm.delivery_paid_date;
    if (addForm.delivery_payment_status === 'Paid' && !paidDate) {
      paidDate = new Date().toISOString().split('T')[0];
    }

    const payload = {
      has_delivery: true,
      postage_courier: addForm.postage_courier || 'J&T Express',
      postage_tracking: (addForm.postage_tracking || '').trim().toUpperCase(),
      postage_status: addForm.postage_status || 'PENDING',
      postage_cost: addForm.postage_cost !== '' ? (parseFloat(addForm.postage_cost) || 0) : '',
      delivery_fee: addForm.delivery_fee !== '' ? (parseFloat(addForm.delivery_fee) || 0) : '',
      delivery_payment_status: addForm.delivery_payment_status || 'Unpaid',
      delivery_paid_date: paidDate,
      delivery_payment_method: addForm.delivery_payment_method || 'Online Transfer',
      client_address: (addForm.client_address || '').trim().toUpperCase()
    };

    setLoading(true);
    try {
      const success = await updatePostageDetails(addForm.invoice_id, payload);
      if (success) {
        setIsAddModalOpen(false);
        await loadData();
      } else {
        alert('Gagal menambah rekod penghantaran.');
      }
    } catch (err) {
      console.error(err);
      alert('Ralat semasa menambah rekod.');
    } finally {
      setLoading(false);
    }
  };

  // Delete Delivery handler
  const handleDeleteDelivery = async (inv) => {
    if (!inv) return;
    const confirmDelete = window.confirm(
      `Adakah anda pasti mahu memadam rekod penghantaran bagi #${inv.invoice_no} (${inv.client_name})?\n\n(Invois jualan asal tidak akan dipadam, hanya rekod penghantaran kurier akan dikeluarkan)`
    );
    if (!confirmDelete) return;

    setLoading(true);
    try {
      const success = await removeDeliveryFromInvoice(inv.id);
      if (success) {
        if (isEditModalOpen) closeEditModal();
        await loadData();
      } else {
        alert('Gagal memadam rekod penghantaran.');
      }
    } catch (err) {
      console.error(err);
      alert('Ralat semasa memadam rekod penghantaran.');
    } finally {
      setLoading(false);
    }
  };

  // WhatsApp Share helper
  const handleSendWhatsApp = (inv) => {
    const courier = inv.postage_courier || 'Kurier';
    const tracking = inv.postage_tracking || '-';
    const deliveryFee = parseFloat(inv.delivery_fee || 0);
    const isDeliveryPaid = inv.delivery_payment_status === 'Paid';

    const cleanPhone = (inv.client_phone || '').replace(/\D/g, '');
    const phoneWithCode = cleanPhone.startsWith('60') ? cleanPhone : (cleanPhone.startsWith('0') ? `6${cleanPhone}` : cleanPhone);

    const company = settings?.company_name || 'ThirtyOne Lab';
    const bankName = settings?.bank_name || 'Maybank';
    const bankAcc = settings?.bank_account || 'Akaun Syarikat';

    let message = '';
    if (!isDeliveryPaid && deliveryFee > 0) {
      message = 
        `Salam sejahtera *${inv.client_name}*,\n\n` +
        `Pesanan anda *#${inv.invoice_no}* di *${company}* telah siap dan sedia untuk dihantar melalui *${courier}*.\n\n` +
        `🚚 *Caj Penghantaran (Delivery Fee):* *RM ${deliveryFee.toFixed(2)}*\n\n` +
        `Sila buat pembayaran ke akaun rasmi kami:\n` +
        `• Bank: *${bankName}*\n` +
        `• No. Akaun: *${bankAcc}*\n\n` +
        `Setelah bayaran dibuat, sila hantarkan slip bukti pembayaran ke sini untuk kami serahkan bungkusan kepada pihak kurier dan berikan resit rasmi penghantaran. Terima kasih!`;
    } else {
      message = 
        `Salam sejahtera *${inv.client_name}*,\n\n` +
        `Terima kasih! Maklumat penghantaran bagi pesanan *#${inv.invoice_no}* di *${company}*:\n\n` +
        `📦 *Maklumat Penghantaran:*\n` +
        `• Kurier: *${courier}*\n` +
        `• No. Tracking: *${tracking}*\n\n` +
        (deliveryFee > 0 ? `Bayaran caj penghantaran (RM ${deliveryFee.toFixed(2)}) telah disahkan lunas.\n\n` : '') +
        `Resit rasmi pembayaran delivery anda telah dijana di sistem kami. Terima kasih kerana berurusan dengan *${company}*!`;
    }

    window.open(`https://wa.me/${phoneWithCode}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const openDocumentModal = (inv, mode) => {
    setSelectedInvoiceForModal(inv);
    setModalInitialMode(mode);
    setIsDocModalOpen(true);
  };

  // Available invoices for adding to delivery
  const availableInvoicesForDelivery = invoices.filter(inv => !inv.has_delivery && inv.status !== 'Void');

  // Only invoices that have delivery active
  const deliveryInvoices = invoices.filter(inv => inv.has_delivery === true);

  // Filtering
  const filteredInvoices = deliveryInvoices.filter(inv => {
    const matchesSearch =
      (inv.client_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inv.invoice_no || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inv.postage_tracking || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inv.client_phone || '').toLowerCase().includes(searchQuery.toLowerCase());

    let matchesMonth = true;
    if (monthFilter !== 'All') {
      const invDate = new Date(inv.date);
      matchesMonth = invDate.getMonth() === parseInt(monthFilter, 10);
    }

    const postStatus = inv.postage_status || '';
    const payStatus = inv.delivery_payment_status || '';

    let matchesStatus = true;
    if (statusFilter === 'UNSET') {
      matchesStatus = !postStatus;
    } else if (statusFilter !== 'All') {
      matchesStatus = postStatus === statusFilter;
    }

    let matchesPayment = true;
    if (paymentFilter === 'UNSET') {
      matchesPayment = !payStatus;
    } else if (paymentFilter !== 'All') {
      matchesPayment = payStatus === paymentFilter;
    }

    return matchesSearch && matchesMonth && matchesStatus && matchesPayment;
  });

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, paymentFilter, monthFilter]);

  // Pagination calculation
  const totalItems = filteredInvoices.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedInvoices = filteredInvoices.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const getPostageStatusBadgeClass = (status) => {
    const s = (status || '').toUpperCase();
    switch (s) {
      case 'DROPOFF':
      case 'DROP OFF':
      case 'DELIVERED':
        return 'badge-paid'; // Green / Settle
      case 'PICKUP':
      case 'PICK UP':
      case 'SHIPPED':
        return 'badge-paid'; // Green / Settle
      case 'PENDING':
      case 'BELUM':
      case 'BELUM POS':
      default:
        return 'badge-unpaid'; // Soft red
    }
  };

  const getPostageStatusLabel = (status) => {
    const s = (status || '').toUpperCase();
    switch (s) {
      case 'DROPOFF':
      case 'DROP OFF':
      case 'DELIVERED':
        return 'Drop Off';
      case 'PICKUP':
      case 'PICK UP':
      case 'SHIPPED':
        return 'Pick Up';
      case 'PENDING':
      case 'BELUM':
      case 'BELUM POS':
      default:
        return status ? (status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()) : 'Belum Pos';
    }
  };

  return (
    <div className="main-content">
      {/* Header - Aligned with Orders (Invoices.jsx) */}
      <div className="invoices-header" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span className="section-tag">{language === 'EN' ? 'LOGISTICS & COURIER' : 'LOGISTIK & KURIER'}</span>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800', marginTop: '0.5rem' }}>
            {language === 'EN' ? 'Courier Delivery' : 'Penghantaran Kurier'}
          </h1>
        </div>

        <button
          onClick={openAddModal}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 1.25rem', fontWeight: 600 }}
        >
          <Plus size={18} /> {language === 'EN' ? 'Add Delivery' : 'Tambah Penghantaran'}
        </button>
      </div>

      {/* Advanced Filters Bar - Exactly matched with Orders (Invoices.jsx) */}
      <div className="search-filters-bar card">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder={language === 'EN' ? 'Search invoice, client, or tracking...' : 'Cari invois, pelanggan, atau tracking...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control search-input"
          />
        </div>

        <div className="filter-group-row">
          <div className="filter-box">
            <span className="select-label">{tr('month')}</span>
            <select
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
              className="form-control filter-select"
            >
              <option value="All">{tr('allMonths')}</option>
              {monthsList.map(m => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </div>

          <div className="filter-box">
            <span className="select-label">Status Pos</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-control filter-select"
            >
              <option value="All">{tr('allStatus')}</option>
              <option value="PENDING">Belum Pos</option>
              <option value="DROPOFF">Drop Off</option>
              <option value="PICKUP">Pick Up</option>
            </select>
          </div>

          <div className="filter-box">
            <span className="select-label">Bayaran Delivery</span>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="form-control filter-select"
            >
              <option value="All">Semua Bayaran</option>
              <option value="Unpaid">Belum Bayar (Unpaid)</option>
              <option value="Paid">Lunas (Paid)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Table Card - Exactly matched with Orders (Invoices.jsx) */}
      <div className="card" style={{ padding: 0 }}>
        {loading && invoices.length === 0 ? (
          <div className="loading-state">Memuatkan rekod penghantaran...</div>
        ) : paginatedInvoices.length === 0 ? (
          <div className="empty-state" style={{ padding: '3.5rem 1.5rem', textAlign: 'center' }}>
            <Package size={44} style={{ color: '#cbd5e1', marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '0.35rem' }}>
              Tiada Rekod Penghantaran Kurier
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: '420px', margin: '0 auto 1.25rem auto' }}>
              Bahagian ini dikhaskan untuk pesanan yang dihantar menggunakan kurier sahaja. Tekan butang di bawah untuk menambah rekod penghantaran baharu.
            </p>
            <button
              onClick={openAddModal}
              className="btn btn-primary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', margin: '0 auto' }}
            >
              <Plus size={15} /> Tambah Penghantaran
            </button>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="table-container desktop-only">
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ textAlign: 'center' }}>{tr('invNo')}</th>
                    <th style={{ textAlign: 'left' }}>{tr('clientName')}</th>
                    <th style={{ textAlign: 'left' }}>DESTINATION & COURIER</th>
                    <th style={{ textAlign: 'left' }}>TRACKING NO.</th>
                    <th style={{ textAlign: 'right' }}>DELIVERY FEE</th>
                    <th style={{ textAlign: 'center', width: '130px' }}>{tr('status')}</th>
                    <th style={{ textAlign: 'center', width: '175px', paddingRight: '1.75rem' }}>{tr('actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedInvoices.map((inv) => {
                    const isVoid = inv.status === 'Void';
                    const isDeliveryPaid = inv.delivery_payment_status === 'Paid';
                    const fee = parseFloat(inv.delivery_fee || 0);

                    return (
                      <tr 
                        key={inv.id}
                        style={isVoid ? { backgroundColor: '#f8fafc' } : {}}
                      >
                        {/* No. Invois */}
                        <td style={{ textAlign: 'center' }} className="font-bold">
                          #{inv.invoice_no}
                        </td>

                        {/* Pelanggan */}
                        <td>
                          <div className="client-cell">
                            <span className="client-name">{inv.client_name}</span>
                            <span className="client-phone-sub">{inv.client_phone || '-'}</span>
                          </div>
                        </td>

                        {/* Destinasi & Kurier */}
                        <td>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: inv.postage_courier ? '700' : 'normal', color: inv.postage_courier ? 'var(--text-dark)' : 'var(--text-muted)' }}>
                              {inv.postage_courier || '-'}
                            </span>
                            <span 
                              style={{ 
                                fontSize: '0.72rem', 
                                color: 'var(--text-muted)', 
                                maxWidth: '240px', 
                                overflow: 'hidden', 
                                textOverflow: 'ellipsis', 
                                whiteSpace: 'nowrap' 
                              }}
                              title={inv.client_address || ''}
                            >
                              {inv.client_address ? inv.client_address.toUpperCase() : <em style={{ color: '#94a3b8' }}>Tiada alamat</em>}
                            </span>
                          </div>
                        </td>

                        {/* No. Tracking */}
                        <td>
                          {inv.postage_tracking ? (
                            <span style={{ fontFamily: 'monospace', fontWeight: '700', fontSize: '0.82rem', letterSpacing: '0.5px' }}>
                              {inv.postage_tracking.toUpperCase()}
                            </span>
                          ) : (
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>-</span>
                          )}
                        </td>

                        {/* Caj Delivery (RM) & Status Bayaran */}
                        <td style={{ textAlign: 'right', verticalAlign: 'middle' }}>
                          {inv.postage_courier === 'Lalamove' ? (
                            <span style={{ 
                              fontSize: '0.72rem', 
                              color: '#0284c7', 
                              fontWeight: 600, 
                              backgroundColor: '#f0f9ff', 
                              padding: '3px 8px', 
                              borderRadius: '4px', 
                              border: '1px solid #bae6fd',
                              display: 'inline-block'
                            }}>
                              Bayar ke Lalamove
                            </span>
                          ) : inv.postage_courier === 'Runner / Grab' ? (
                            <span style={{ 
                              fontSize: '0.72rem', 
                              color: '#0284c7', 
                              fontWeight: 600, 
                              backgroundColor: '#f0f9ff', 
                              padding: '3px 8px', 
                              borderRadius: '4px', 
                              border: '1px solid #bae6fd',
                              display: 'inline-block'
                            }}>
                              Bayar ke Runner
                            </span>
                          ) : inv.postage_courier === 'Self Pick-Up' ? (
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>-</span>
                          ) : inv.delivery_fee !== undefined && inv.delivery_fee !== null && inv.delivery_fee !== '' && parseFloat(inv.delivery_fee) > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '3px' }}>
                              <span style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                                RM {parseFloat(inv.delivery_fee).toFixed(2)}
                              </span>
                              {inv.postage_cost !== undefined && inv.postage_cost !== null && inv.postage_cost !== '' && parseFloat(inv.postage_cost) > 0 && (
                                <span style={{ 
                                  fontSize: '0.65rem', 
                                  fontWeight: 700, 
                                  color: (parseFloat(inv.delivery_fee) - parseFloat(inv.postage_cost)) >= 0 ? '#15803d' : '#b91c1c',
                                  backgroundColor: (parseFloat(inv.delivery_fee) - parseFloat(inv.postage_cost)) >= 0 ? '#f0fdf4' : '#fef2f2',
                                  border: `1px solid ${(parseFloat(inv.delivery_fee) - parseFloat(inv.postage_cost)) >= 0 ? '#bbf7d0' : '#fecaca'}`,
                                  padding: '1px 5px',
                                  borderRadius: '4px',
                                  whiteSpace: 'nowrap'
                                }}>
                                  +RM {(parseFloat(inv.delivery_fee) - parseFloat(inv.postage_cost)).toFixed(2)} untung
                                </span>
                              )}
                            </div>
                          ) : (
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>-</span>
                          )}
                        </td>

                        {/* Status Pos & Bayaran */}
                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                          {isVoid ? (
                            <span className="badge badge-void">VOID</span>
                          ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                              {inv.postage_status ? (
                                <span className={`badge ${getPostageStatusBadgeClass(inv.postage_status)}`}>
                                  {getPostageStatusLabel(inv.postage_status)}
                                </span>
                              ) : (
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>-</span>
                              )}
                              {inv.delivery_payment_status && (
                                <span 
                                  className={`badge ${isDeliveryPaid ? 'badge-paid' : 'badge-unpaid'}`}
                                  style={{ fontWeight: 700 }}
                                >
                                  {isDeliveryPaid ? 'Paid' : 'Unpaid'}
                                </span>
                              )}
                            </div>
                          )}
                        </td>

                        {/* Tindakan (Staging / Stacked Grid) */}
                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                          <div className="actions-cell">
                            <button
                              disabled={isVoid}
                              onClick={() => openEditModal(inv)}
                              className="btn btn-secondary btn-sm"
                              title="Kemas Kini Maklumat Penghantaran"
                              style={{ 
                                opacity: isVoid ? 0.4 : 1, 
                                cursor: isVoid ? 'not-allowed' : 'pointer'
                              }}
                            >
                              <Edit2 size={12} /> {tr('edit')}
                            </button>

                            <button
                              onClick={() => openDocumentModal(inv, isDeliveryPaid ? 'receipt' : 'invoice')}
                              className="btn btn-secondary btn-sm"
                              title={isDeliveryPaid ? "Cetak Resit Delivery" : "Cetak Invois Delivery"}
                              style={{ 
                                opacity: isVoid ? 0.4 : 1, 
                                cursor: isVoid ? 'not-allowed' : 'pointer'
                              }}
                            >
                              <Printer size={12} /> {isDeliveryPaid ? 'Resit' : 'Invois'}
                            </button>

                            <button
                              disabled={isVoid}
                              onClick={() => handleDeleteDelivery(inv)}
                              className="btn btn-secondary btn-sm"
                              style={{ 
                                gridColumn: 'span 2',
                                color: '#dc2626', 
                                borderColor: '#fca5a5',
                                opacity: isVoid ? 0.4 : 1, 
                                cursor: isVoid ? 'not-allowed' : 'pointer'
                              }}
                              title="Padam dari Rekod Penghantaran"
                            >
                              <Trash2 size={12} /> Padam
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View - Matched with Orders */}
            <div className="mobile-cards-list mobile-only">
              {paginatedInvoices.map((inv) => {
                const isVoid = inv.status === 'Void';
                const isDeliveryPaid = inv.delivery_payment_status === 'Paid';
                const fee = parseFloat(inv.delivery_fee || 0);

                return (
                  <div key={inv.id} className="mobile-card" style={isVoid ? { backgroundColor: '#f8fafc' } : {}}>
                    <div className="mobile-card-row">
                      <span className="mobile-card-title">#{inv.invoice_no}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                        {isVoid ? (
                          <span className="badge badge-void">VOID</span>
                        ) : (
                          <>
                            {inv.postage_status ? (
                              <span className={`badge ${getPostageStatusBadgeClass(inv.postage_status)}`}>
                                {getPostageStatusLabel(inv.postage_status)}
                              </span>
                            ) : null}
                            {inv.delivery_payment_status && (
                              <span className={`badge ${isDeliveryPaid ? 'badge-paid' : 'badge-unpaid'}`} style={{ fontWeight: 700 }}>
                                {isDeliveryPaid ? 'Paid' : 'Unpaid'}
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    <div className="mobile-card-row">
                      <div className="mobile-card-detail">
                        <div className="mobile-card-bold">{inv.client_name}</div>
                        <div>Tel: {inv.client_phone || '-'}</div>
                        <div>Kurier: <strong>{inv.postage_courier || '-'}</strong></div>
                        {inv.postage_tracking && <div>Track: <code style={{ fontWeight: 'bold' }}>{inv.postage_tracking}</code></div>}
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        {inv.delivery_fee !== undefined && inv.delivery_fee !== null && inv.delivery_fee !== '' && parseFloat(inv.delivery_fee) > 0 ? (
                          <>
                            <div className="mobile-card-detail">
                              Caj Pos: <span className="mobile-card-bold">RM {parseFloat(inv.delivery_fee).toFixed(2)}</span>
                            </div>
                            {inv.postage_cost !== undefined && inv.postage_cost !== null && inv.postage_cost !== '' && parseFloat(inv.postage_cost) > 0 && (
                              <div style={{ 
                                fontSize: '0.65rem', 
                                fontWeight: 600, 
                                color: (parseFloat(inv.delivery_fee) - parseFloat(inv.postage_cost)) >= 0 ? '#16a34a' : '#dc2626' 
                              }}>
                                +RM {(parseFloat(inv.delivery_fee) - parseFloat(inv.postage_cost)).toFixed(2)} untung
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="mobile-card-detail" style={{ color: 'var(--text-muted)' }}>-</div>
                        )}
                      </div>
                    </div>

                    <div className="mobile-card-actions" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem', width: '100%' }}>
                      <button
                        disabled={isVoid}
                        onClick={() => openEditModal(inv)}
                        className="btn btn-secondary btn-sm"
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}
                      >
                        <Edit2 size={12} /> {tr('edit')}
                      </button>

                      <button
                        onClick={() => openDocumentModal(inv, isDeliveryPaid ? 'receipt' : 'invoice')}
                        className="btn btn-secondary btn-sm"
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}
                      >
                        <Printer size={12} /> {isDeliveryPaid ? 'Resit' : 'Invois'}
                      </button>

                      <button
                        onClick={() => handleDeleteDelivery(inv)}
                        className="btn btn-secondary btn-sm"
                        style={{ color: '#dc2626', borderColor: '#fca5a5', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}
                        title="Padam dari Penghantaran"
                      >
                        <Trash2 size={12} /> Padam
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Pagination Controls - Matched with Orders (Invoices.jsx) */}
      {totalPages > 1 && (
        <div className="pagination-wrapper" style={{ marginTop: '1.5rem' }}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="btn btn-secondary btn-sm pag-btn"
          >
            {tr('previous')}
          </button>
          
          <div className="pagination-numbers">
            {Array.from({ length: totalPages }, (_, idx) => {
              const pageNum = idx + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`btn btn-secondary btn-sm pag-num-btn ${currentPage === pageNum ? 'active-page' : ''}`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="btn btn-secondary btn-sm pag-btn"
          >
            {tr('next')}
          </button>
        </div>
      )}

      {/* Clean Edit Delivery Modal (Pop-up Form matching InvoiceModal / PaymentModal) */}
      {isEditModalOpen && editingInvoice && (
        <div className="modal-overlay" onClick={closeEditModal} style={{ zIndex: 1000 }}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px', width: '90%', backgroundColor: '#ffffff', borderRadius: '12px', overflow: 'hidden' }}>
            <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', backgroundColor: '#ffffff' }}>
              <div>
                <span className="section-tag" style={{ fontSize: '0.65rem' }}>KEMAS KINI LOGISTIK</span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0.2rem 0 0 0' }}>
                  Penghantaran #{editingInvoice.invoice_no}
                </h3>
              </div>
              <button className="modal-close" onClick={closeEditModal} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEditModal}>
              <div className="modal-body" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: '#ffffff', maxHeight: '75vh', overflowY: 'auto' }}>
                
                {/* Client Info Banner */}
                <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0.75rem 1rem' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-dark)' }}>{editingInvoice.client_name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tel: {editingInvoice.client_phone || '-'}</div>
                </div>

                {/* Alamat Penuh */}
                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                    Alamat Lengkap Penghantaran
                  </label>
                  <textarea
                    rows={3}
                    value={editForm.client_address}
                    onChange={e => setEditForm(prev => ({ ...prev, client_address: e.target.value.toUpperCase() }))}
                    placeholder="NO. RUMAH, JALAN, TAMAN, POSKOD, BANDAR, NEGERI..."
                    className="form-control"
                    style={{ fontSize: '0.8rem', textTransform: 'uppercase', resize: 'vertical' }}
                  />
                </div>

                {/* Kurier & No. Tracking */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                      Syarikat Kurier / Kaedah
                    </label>
                    <select
                      value={editForm.postage_courier}
                      onChange={e => setEditForm(prev => ({ ...prev, postage_courier: e.target.value }))}
                      className="form-control"
                      style={{ fontSize: '0.85rem' }}
                    >
                      <option value="">-- Belum Dipilih --</option>
                      {courierOptions.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                      No. Tracking
                    </label>
                    <input
                      type="text"
                      value={editForm.postage_tracking}
                      onChange={e => setEditForm(prev => ({ ...prev, postage_tracking: e.target.value.toUpperCase() }))}
                      placeholder="CONTOH: SPX12345678MY"
                      className="form-control"
                      style={{ fontSize: '0.85rem', fontFamily: 'monospace', fontWeight: '700', textTransform: 'uppercase' }}
                    />
                  </div>
                </div>

                {/* Caj Pelanggan & Kos Sebenar Kurier */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                      Caj Pelanggan (RM)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={editForm.delivery_fee}
                      onChange={e => setEditForm(prev => ({ ...prev, delivery_fee: e.target.value }))}
                      placeholder="0.00"
                      className="form-control"
                      style={{ fontSize: '0.85rem', fontWeight: '700', textAlign: 'right' }}
                    />
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Caj dikutip dari pelanggan (cth: 12.00)</span>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                      Kos Sebenar Kurier (RM)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={editForm.postage_cost}
                      onChange={e => setEditForm(prev => ({ ...prev, postage_cost: e.target.value }))}
                      placeholder="0.00"
                      className="form-control"
                      style={{ fontSize: '0.85rem', fontWeight: '700', textAlign: 'right' }}
                    />
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Kos syarikat bayar kurier (cth: 7.50)</span>
                  </div>
                </div>

                {/* Live Margin Calculation */}
                {(editForm.delivery_fee !== '' || editForm.postage_cost !== '') && (
                  <div style={{ 
                    padding: '0.65rem 1rem', 
                    backgroundColor: (parseFloat(editForm.delivery_fee || 0) - parseFloat(editForm.postage_cost || 0)) >= 0 ? '#f0fdf4' : '#fef2f2', 
                    borderRadius: '6px', 
                    border: `1px solid ${(parseFloat(editForm.delivery_fee || 0) - parseFloat(editForm.postage_cost || 0)) >= 0 ? '#bbf7d0' : '#fecaca'}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.82rem'
                  }}>
                    <span style={{ fontWeight: 600, color: '#334155' }}>Untung Bersih Delivery Syarikat:</span>
                    <span style={{ 
                      fontWeight: 700, 
                      fontSize: '0.9rem',
                      color: (parseFloat(editForm.delivery_fee || 0) - parseFloat(editForm.postage_cost || 0)) >= 0 ? '#16a34a' : '#dc2626' 
                    }}>
                      RM {(parseFloat(editForm.delivery_fee || 0) - parseFloat(editForm.postage_cost || 0)).toFixed(2)}
                    </span>
                  </div>
                )}

                {/* Status Bayaran Pelanggan & Kaedah */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                      Status Bayaran Delivery
                    </label>
                    <select
                      value={editForm.delivery_payment_status}
                      onChange={e => setEditForm(prev => ({ ...prev, delivery_payment_status: e.target.value }))}
                      className="form-control"
                      style={{ fontSize: '0.85rem', fontWeight: '700' }}
                    >
                      <option value="Unpaid">Belum Bayar (Unpaid)</option>
                      <option value="Paid">Lunas (Paid)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                      Kaedah Bayaran
                    </label>
                    <select
                      value={editForm.delivery_payment_method}
                      onChange={e => setEditForm(prev => ({ ...prev, delivery_payment_method: e.target.value }))}
                      className="form-control"
                      style={{ fontSize: '0.85rem' }}
                    >
                      <option value="Online Transfer">Online Transfer</option>
                      <option value="DuitNow QR">DuitNow QR</option>
                      <option value="Tunai / Cash">Tunai / Cash</option>
                      <option value="Termasuk Dalam Invois">Termasuk Dalam Invois</option>
                    </select>
                  </div>
                </div>

                {/* Status Penghantaran (Pos) */}
                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                    Status Penghantaran (Pos)
                  </label>
                  <select
                    value={editForm.postage_status}
                    onChange={e => setEditForm(prev => ({ ...prev, postage_status: e.target.value }))}
                    className="form-control"
                    style={{ fontSize: '0.85rem', fontWeight: '700' }}
                  >
                    <option value="PENDING">Belum Pos</option>
                    <option value="DROPOFF">Drop Off</option>
                    <option value="PICKUP">Pick Up</option>
                  </select>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="modal-footer" style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff' }}>
                <button
                  type="button"
                  onClick={() => handleDeleteDelivery(editingInvoice)}
                  className="btn btn-secondary btn-sm"
                  style={{ color: '#dc2626', borderColor: '#fca5a5', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <Trash2 size={13} /> Padam Rekod
                </button>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={closeEditModal}
                    className="btn btn-secondary btn-sm"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary btn-sm"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <Save size={14} /> Simpan Maklumat
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Tambah Penghantaran Kurier */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={closeAddModal} style={{ zIndex: 1000 }}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '620px', width: '90%', backgroundColor: '#ffffff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)' }}>
            <div className="modal-header" style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff' }}>
              <div>
                <span className="section-tag" style={{ fontSize: '0.65rem' }}>PENGHANTARAN KURIER</span>
                <h3 style={{ margin: '0.2rem 0 0 0', fontSize: '1.15rem', fontWeight: 800 }}>
                  Tambah Rekod Penghantaran
                </h3>
              </div>
              <button onClick={closeAddModal} className="btn-icon" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveAddModal} style={{ backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', margin: 0 }}>
              <div className="modal-body" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.1rem', backgroundColor: '#ffffff', maxHeight: '75vh', overflowY: 'auto' }}>
                
                {/* Pilih Invois / Pesanan */}
                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                    Pilih Invois / Pesanan Pelanggan <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  {availableInvoicesForDelivery.length === 0 ? (
                    <div style={{ padding: '0.75rem 1rem', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', color: '#991b1b', fontSize: '0.82rem' }}>
                      Semua invois aktif telah mempunyai rekod penghantaran atau tiada invois baharu ditemui.
                    </div>
                  ) : (
                    <select
                      required
                      value={addForm.invoice_id}
                      onChange={e => handleSelectInvoiceToAdd(e.target.value)}
                      className="form-control"
                      style={{ fontSize: '0.85rem', fontWeight: '600' }}
                    >
                      <option value="">-- Pilih Invois Pelanggan --</option>
                      {availableInvoicesForDelivery.map(inv => (
                        <option key={inv.id} value={inv.id}>
                          #{inv.invoice_no} - {inv.client_name} (RM {parseFloat(inv.grand_total || 0).toFixed(2)})
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Kurier & No. Tracking */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                      Syarikat Kurier <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <select
                      required
                      value={addForm.postage_courier}
                      onChange={e => setAddForm(prev => ({ ...prev, postage_courier: e.target.value }))}
                      className="form-control"
                      style={{ fontSize: '0.85rem' }}
                    >
                      <option value="">-- Pilih Kurier --</option>
                      {courierOptions.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                      No. Tracking
                    </label>
                    <input
                      type="text"
                      value={addForm.postage_tracking}
                      onChange={e => setAddForm(prev => ({ ...prev, postage_tracking: e.target.value.toUpperCase() }))}
                      placeholder="CONTOH: SPX12345678MY"
                      className="form-control"
                      style={{ fontSize: '0.85rem', fontFamily: 'monospace', fontWeight: '700', textTransform: 'uppercase' }}
                    />
                  </div>
                </div>

                {/* Caj Pelanggan & Kos Sebenar Kurier */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                      Caj Pelanggan (RM)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={addForm.delivery_fee}
                      onChange={e => setAddForm(prev => ({ ...prev, delivery_fee: e.target.value }))}
                      placeholder="0.00"
                      className="form-control"
                      style={{ fontSize: '0.85rem', fontWeight: '700', textAlign: 'right' }}
                    />
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Caj dikutip dari pelanggan (cth: 12.00)</span>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                      Kos Sebenar Kurier (RM)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={addForm.postage_cost}
                      onChange={e => setAddForm(prev => ({ ...prev, postage_cost: e.target.value }))}
                      placeholder="0.00"
                      className="form-control"
                      style={{ fontSize: '0.85rem', fontWeight: '700', textAlign: 'right' }}
                    />
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Kos dibayar ke kurier (cth: 7.50)</span>
                  </div>
                </div>

                {/* Live Margin Calculation */}
                {(addForm.delivery_fee !== '' || addForm.postage_cost !== '') && (
                  <div style={{ 
                    padding: '0.65rem 1rem', 
                    backgroundColor: (parseFloat(addForm.delivery_fee || 0) - parseFloat(addForm.postage_cost || 0)) >= 0 ? '#f0fdf4' : '#fef2f2', 
                    borderRadius: '6px', 
                    border: `1px solid ${(parseFloat(addForm.delivery_fee || 0) - parseFloat(addForm.postage_cost || 0)) >= 0 ? '#bbf7d0' : '#fecaca'}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.82rem'
                  }}>
                    <span style={{ fontWeight: 600, color: '#334155' }}>Untung Bersih Delivery Syarikat:</span>
                    <span style={{ 
                      fontWeight: 700, 
                      fontSize: '0.9rem',
                      color: (parseFloat(addForm.delivery_fee || 0) - parseFloat(addForm.postage_cost || 0)) >= 0 ? '#16a34a' : '#dc2626' 
                    }}>
                      RM {(parseFloat(addForm.delivery_fee || 0) - parseFloat(addForm.postage_cost || 0)).toFixed(2)}
                    </span>
                  </div>
                )}

                {/* Status Bayaran Pelanggan & Kaedah */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                      Status Bayaran Delivery
                    </label>
                    <select
                      value={addForm.delivery_payment_status}
                      onChange={e => setAddForm(prev => ({ ...prev, delivery_payment_status: e.target.value }))}
                      className="form-control"
                      style={{ fontSize: '0.85rem', fontWeight: '700' }}
                    >
                      <option value="Unpaid">Belum Bayar (Unpaid)</option>
                      <option value="Paid">Lunas (Paid)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                      Kaedah Bayaran
                    </label>
                    <select
                      value={addForm.delivery_payment_method}
                      onChange={e => setAddForm(prev => ({ ...prev, delivery_payment_method: e.target.value }))}
                      className="form-control"
                      style={{ fontSize: '0.85rem' }}
                    >
                      <option value="Online Transfer">Online Transfer</option>
                      <option value="Cash">Cash (Tunai)</option>
                      <option value="Cheque">Cheque</option>
                      <option value="Lain-lain">Lain-lain</option>
                    </select>
                  </div>
                </div>

                {/* Status Penghantaran (Pos) */}
                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                    Status Penghantaran (Pos)
                  </label>
                  <select
                    value={addForm.postage_status}
                    onChange={e => setAddForm(prev => ({ ...prev, postage_status: e.target.value }))}
                    className="form-control"
                    style={{ fontSize: '0.85rem', fontWeight: '700' }}
                  >
                    <option value="PENDING">Belum Pos</option>
                    <option value="DROPOFF">Drop Off</option>
                    <option value="PICKUP">Pick Up</option>
                  </select>
                </div>

                {/* Alamat Penghantaran */}
                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                    Alamat Lengkap Penghantaran
                  </label>
                  <textarea
                    rows={2}
                    value={addForm.client_address}
                    onChange={e => setAddForm(prev => ({ ...prev, client_address: e.target.value.toUpperCase() }))}
                    placeholder="NO. RUMAH, JALAN, TAMAN, POSKOD, BANDAR, NEGERI..."
                    className="form-control"
                    style={{ fontSize: '0.8rem', textTransform: 'uppercase', resize: 'vertical' }}
                  />
                </div>

              </div>

              {/* Modal Footer */}
              <div className="modal-footer" style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', backgroundColor: '#ffffff' }}>
                <button
                  type="button"
                  onClick={closeAddModal}
                  className="btn btn-secondary btn-sm"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading || availableInvoicesForDelivery.length === 0 || !addForm.invoice_id}
                  className="btn btn-primary btn-sm"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <Plus size={14} /> Tambah Penghantaran
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delivery Order Document Modal (Invois / Resit Rasmi) */}
      {isDocModalOpen && selectedInvoiceForModal && (
        <DeliveryOrderModal
          isOpen={isDocModalOpen}
          invoice={selectedInvoiceForModal}
          settings={settings}
          onClose={() => {
            setIsDocModalOpen(false);
            setSelectedInvoiceForModal(null);
            loadData();
          }}
          initialMode={modalInitialMode}
        />
      )}

      <style>{`
        .invoices-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .search-filters-bar {
          display: flex !important;
          flex-direction: row !important;
          align-items: flex-end !important;
          gap: 1.5rem !important;
          padding: 1.25rem 2rem !important;
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
          flex: 1;
          height: 42px;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          color: var(--text-light);
        }

        .search-input {
          padding-left: 2.75rem;
          width: 100%;
          height: 42px;
        }

        .filter-group-row {
          display: flex !important;
          flex-direction: row !important;
          gap: 1rem !important;
          flex-shrink: 0 !important;
          align-items: flex-end !important;
        }

        .filter-box {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .select-label {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 0;
        }

        .filter-select {
          min-width: 150px;
          height: 42px;
          font-size: 0.85rem;
        }

        .client-cell {
          display: flex;
          flex-direction: column;
        }

        .client-name {
          font-weight: 600;
        }

        .client-phone-sub {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .actions-cell {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.35rem 0.4rem;
          width: fit-content;
          margin: 0 auto;
        }

        .actions-cell .btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.25rem;
          padding: 0.28rem 0.45rem;
          font-size: 0.72rem;
          white-space: nowrap;
          min-width: 58px;
        }

        .loading-state, .empty-state {
          padding: 3rem;
          text-align: center;
          color: var(--text-muted);
          font-family: var(--font-primary);
          font-size: 0.85rem;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .font-bold {
          font-weight: 600;
        }

        /* Pagination Styles */
        .pagination-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1.5rem;
          margin-bottom: 3rem;
        }

        .pagination-numbers {
          display: flex;
          gap: 0.5rem;
        }

        .pag-btn {
          width: 110px;
        }

        .pag-num-btn {
          min-width: 36px;
          height: 36px;
          padding: 0 !important;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem !important;
        }

        .active-page {
          background-color: var(--primary-red) !important;
          color: var(--white) !important;
          border-color: var(--primary-red) !important;
        }

        @media (max-width: 992px) {
          .search-filters-bar {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 1rem !important;
            padding: 1.25rem !important;
          }
          .filter-group-row {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            width: 100% !important;
            gap: 1rem !important;
          }
          .filter-box {
            display: flex;
            flex-direction: column;
            gap: 0.3rem;
          }
          .filter-select {
            width: 100%;
            min-width: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
