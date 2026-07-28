import React, { useState, useEffect } from 'react';
import { getClients, saveInvoice, getNextInvoiceNo } from '../services/storage';
import { X, Plus, Trash2, Upload, AlertTriangle, Save, Check } from 'lucide-react';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', '6XL', '7XL', '8XL', '9XL', '10XL', '11XL'];

const MATERIALS = ['Eyelet', 'Mini-Eyelet', 'Diamond', 'Lycra', 'Interlock', 'RJPK', 'Mesh', 'Popcorn'];

export const CUTTINGS = [
  { id: 'Normal', label: 'Normal (+RM0)', price: 0 },
  { id: 'Raglan', label: 'Raglan (+RM4)', price: 4 },
  { id: 'Boxy', label: 'Boxy (+RM5)', price: 5 },
  { id: 'Baseball', label: 'Baseball (+RM5)', price: 5 },
  { id: 'Singlet', label: 'Singlet (+RM5)', price: 5 },
  { id: 'Sleeveless', label: 'Sleeveless (+RM5)', price: 5 }
];

export const NECKS = [
  { id: 'Roundneck', label: 'Roundneck (+RM0)', price: 0 },
  { id: 'V-Neck', label: 'V-Neck (+RM0)', price: 0 },
  { id: 'V-Neck End', label: 'V-Neck End (+RM0)', price: 0 },
  { id: 'Collar Button (Polo)', label: 'Collar Button (Polo) (+RM6)', price: 6 },
  { id: 'Mandarin Zip', label: 'Mandarin Zip (+RM6)', price: 6 },
  { id: 'Retro', label: 'Retro (+RM6)', price: 6 },
  { id: 'Retro End', label: 'Retro End (+RM6)', price: 6 },
  { id: 'V-Neck Outer', label: 'V-Neck Outer (+RM6)', price: 6 }
];

export const getBasePrice = (totalQty) => {
  if (totalQty < 5) return 55;
  if (totalQty <= 9) return 50;
  if (totalQty <= 39) return 39;
  if (totalQty <= 69) return 37;
  if (totalQty <= 99) return 34;
  return 30; // 100+ pcs
};

export const getSizeCost = (size) => {
  if (['3XL', '4XL', '5XL'].includes(size)) return 3;
  if (['6XL', '7XL', '8XL'].includes(size)) return 6;
  if (['9XL', '10XL', '11XL'].includes(size)) return 9;
  return 0;
};

const createEmptyItem = () => ({
  id: crypto.randomUUID(),
  design_name: '',
  design_image: '',
  material: 'Eyelet',
  cutting: 'Normal',
  neck: 'Roundneck',
  name_set: 'No', // 'Yes' or 'No'
  // Size Breakdown: sizeName -> { shortQty: 0, longQty: 0 }
  sizes: SIZES.reduce((acc, size) => {
    acc[size] = { short: 0, long: 0 };
    return acc;
  }, {})
});

export default function InvoiceModal({ invoice, prefilledClient, onClose, onSaveSuccess }) {
  const [clients, setClients] = useState([]);
  const [clientSearch, setClientSearch] = useState('');
  const [showClientSuggestions, setShowClientSuggestions] = useState(false);

  // Form Fields
  const [invoiceNo, setInvoiceNo] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientId, setClientId] = useState('');
  const [jobName, setJobName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [items, setItems] = useState([createEmptyItem()]);
  const [discountPerPcs, setDiscountPerPcs] = useState(0);
  const [notes, setNotes] = useState('');
  
  // UI States
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadClients();
    initForm();
  }, [invoice, prefilledClient]);

  const loadClients = async () => {
    const list = await getClients();
    setClients(list);
  };

  const initForm = async () => {
    if (invoice) {
      setInvoiceNo(invoice.invoice_no);
      setClientName(invoice.client_name);
      setClientPhone(invoice.client_phone);
      setClientId(invoice.client_id || '');
      setJobName(invoice.job_name || '');
      setDate(invoice.date);
      setItems(JSON.parse(JSON.stringify(invoice.items))); // Deep clone
      setDiscountPerPcs(invoice.discount_per_pcs || 0);
      setNotes(invoice.notes || '');
    } else {
      const nextNo = await getNextInvoiceNo();
      setInvoiceNo(nextNo);
      
      if (prefilledClient) {
        setClientName(prefilledClient.name);
        setClientPhone(prefilledClient.phone);
        setClientId(prefilledClient.id);
      }
    }
  };

  // Autocomplete / Search Client
  const handleClientNameChange = (e) => {
    const val = e.target.value;
    setClientName(val);
    setClientId(''); // Clear ID if typing custom
    setShowClientSuggestions(true);
  };

  const selectClient = (c) => {
    setClientName(c.name);
    setClientPhone(c.phone);
    setClientId(c.id);
    setShowClientSuggestions(false);
  };

  // Items Management
  const addItem = () => {
    setItems(prev => [...prev, createEmptyItem()]);
  };

  const removeItem = (id) => {
    if (items.length === 1) return;
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateItemField = (itemId, field, value) => {
    setItems(prev => prev.map(item => {
      if (item.id === itemId) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const updateItemQty = (itemId, size, type, val) => {
    const intVal = parseInt(val, 10) || 0;
    setItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const updatedSizes = { ...item.sizes };
        updatedSizes[size] = {
          ...updatedSizes[size],
          [type]: Math.max(0, intVal)
        };
        return { ...item, sizes: updatedSizes };
      }
      return item;
    }));
  };

  const handleItemImageUpload = (e, itemId) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 300 * 1024) {
      alert('Had saiz fail imej design adalah 300KB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      updateItemField(itemId, 'design_image', reader.result);
    };
    reader.readAsDataURL(file);
  };

  // --- CALCULATION ENGINE ---
  // 1. Total Quantity in the whole invoice
  const calculateTotalQty = () => {
    return items.reduce((total, item) => {
      return total + SIZES.reduce((itemTotal, size) => {
        const sQty = item.sizes[size]?.short || 0;
        const lQty = item.sizes[size]?.long || 0;
        return itemTotal + sQty + lQty;
      }, 0);
    }, 0);
  };

  const totalQty = calculateTotalQty();
  const basePrice = getBasePrice(totalQty);

  // 2. Calculations per Design Item
  const calculateItemSummary = (item) => {
    let itemBaseTotal = 0;
    let itemAddonTotal = 0;
    let itemQty = 0;

    const cuttingPrice = CUTTINGS.find(c => c.id === item.cutting)?.price || 0;
    const neckPrice = NECKS.find(n => n.id === item.neck)?.price || 0;
    const nameSetPrice = item.name_set === 'Yes' ? 3 : 0;
    const designWideAddons = cuttingPrice + neckPrice + nameSetPrice; // Apply to every piece

    SIZES.forEach(size => {
      const shortQty = item.sizes[size]?.short || 0;
      const longQty = item.sizes[size]?.long || 0;
      const subQty = shortQty + longQty;

      if (subQty > 0) {
        itemQty += subQty;
        // Base Price part
        itemBaseTotal += subQty * basePrice;
        
        // Design-wide addons (Cutting, Neck, Nameset)
        itemAddonTotal += subQty * designWideAddons;

        // Size specific addon (XS-2XL = 0, 3XL-5XL = +3, etc)
        const sizeAddon = getSizeCost(size);
        itemAddonTotal += subQty * sizeAddon;

        // Sleeve specific addon (+RM5 for Long Sleeve)
        itemAddonTotal += longQty * 5;
      }
    });

    const subtotal = itemBaseTotal + itemAddonTotal;

    return {
      qty: itemQty,
      base: itemBaseTotal,
      addons: itemAddonTotal,
      subtotal: subtotal
    };
  };

  // 3. Overall Invoice Summaries
  const grossSubtotal = items.reduce((sum, item) => sum + calculateItemSummary(item).subtotal, 0);
  const totalDiscount = discountPerPcs * totalQty;
  const grandTotal = Math.max(0, grossSubtotal - totalDiscount);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!clientName.trim()) {
      alert('Sila masukkan nama pelanggan.');
      return;
    }
    if (!clientPhone.trim()) {
      alert('Sila masukkan nombor telefon pelanggan.');
      return;
    }
    if (totalQty === 0) {
      alert('Sila masukkan kuantiti baju (sekurang-kurangnya 1 helai).');
      return;
    }

    setLoading(true);
    
    const processedItems = items.map(item => {
      const summary = calculateItemSummary(item);
      return {
        ...item,
        subtotal: summary.subtotal,
        qty: summary.qty
      };
    });

    // Construct database invoice object
    const finalInvoice = {
      id: invoice?.id || undefined,
      invoice_no: invoiceNo,
      client_id: clientId || null,
      client_name: clientName.trim(),
      client_phone: clientPhone.trim(),
      job_name: jobName.trim(),
      date: date,
      items: processedItems,
      subtotal: grossSubtotal,
      discount_per_pcs: parseFloat(discountPerPcs) || 0,
      grand_total: grandTotal,
      // If editing, preserve payments, otherwise set default
      deposit: invoice ? invoice.deposit : 0,
      balance: invoice ? grandTotal - invoice.deposit : grandTotal,
      status: invoice ? invoice.status : 'Unpaid',
      notes: notes.trim()
    };

    try {
      await saveInvoice(finalInvoice);
      onSaveSuccess();
    } catch (err) {
      console.error(err);
      alert('Ralat semasa menyimpan invois.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '1000px' }}>
        <div className="modal-header">
          <h3>{invoice ? 'KEMASKINI INVOIS' : 'CIPTA INVOIS BAHARU'}</h3>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body form-modal-body">
            
            {/* Row 1: Basic Details */}
            <div className="invoice-meta-section">
              <h4 className="meta-section-title">A. Maklumat Asas Tempahan</h4>
              <div className="grid-3">
                
                {/* Client Name Input with Autocomplete */}
                <div className="form-group autocomplete-container">
                  <label className="form-label">Nama Pelanggan *</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={handleClientNameChange}
                    onFocus={() => setShowClientSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowClientSuggestions(false), 200)}
                    placeholder="Taip nama..."
                    className="form-control"
                    required
                  />
                  {showClientSuggestions && clients.length > 0 && (
                    <div className="suggestions-box">
                      {clients
                        .filter(c => c.name.toLowerCase().includes(clientName.toLowerCase()))
                        .map(c => (
                          <div
                            key={c.id}
                            className="suggestion-item"
                            onMouseDown={() => selectClient(c)}
                          >
                            <span className="suggestion-name">{c.name}</span>
                            <span className="suggestion-phone">{c.phone}</span>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">No. Telefon Pelanggan *</label>
                  <input
                    type="text"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="Cth: 0123456789"
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">No. Invois</label>
                  <input
                    type="text"
                    value={invoiceNo}
                    className="form-control disabled-input"
                    disabled
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Nama Job (Nama Projek)</label>
                  <input
                    type="text"
                    value={jobName}
                    onChange={(e) => setJobName(e.target.value)}
                    placeholder="Cth: KKM"
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Tarikh Invois</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group quota-banner">
                  <div className="quota-info">
                    <span className="quota-label">Kuantiti Invois</span>
                    <span className="quota-value">{totalQty} pcs</span>
                  </div>
                  <div className="quota-info">
                    <span className="quota-label">Harga Asas /pcs</span>
                    <span className="quota-value">RM {basePrice}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Row 2: Design Items List */}
            <div className="design-items-section">
              <div className="section-header-row">
                <h4 className="meta-section-title">B. Butiran Rekaan Baju (Items)</h4>
                <button type="button" onClick={addItem} className="btn btn-secondary btn-sm btn-add-design">
                  <Plus size={14} /> Tambah Design Baru
                </button>
              </div>

              {items.map((item, index) => {
                const summary = calculateItemSummary(item);
                return (
                  <div key={item.id} className="design-item-card card">
                    
                    {/* Header: Design Info & Remove Button */}
                    <div className="design-item-header">
                      <h5>DESIGN #{index + 1}</h5>
                      {items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="btn-text text-red"
                          style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                        >
                          <Trash2 size={14} /> Padam Rekaan
                        </button>
                      )}
                    </div>

                    {/* Specification Dropdowns */}
                    <div className="grid-4 specs-grid">
                      <div className="form-group">
                        <label className="form-label">Nama/Code Design</label>
                        <input
                          type="text"
                          value={item.design_name}
                          onChange={(e) => updateItemField(item.id, 'design_name', e.target.value)}
                          placeholder="Cth: Shield Pro/ 26#0110"
                          className="form-control"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Jenis Material</label>
                        <select
                          value={item.material}
                          onChange={(e) => updateItemField(item.id, 'material', e.target.value)}
                          className="form-control"
                        >
                          {MATERIALS.map(m => (
                            <option key={m} value={m}>{m} (+RM0)</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Jenis Potongan (Cutting)</label>
                        <select
                          value={item.cutting}
                          onChange={(e) => updateItemField(item.id, 'cutting', e.target.value)}
                          className="form-control"
                        >
                          {CUTTINGS.map(c => (
                            <option key={c.id} value={c.id}>{c.label}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Jenis Kolar (Neck)</label>
                        <select
                          value={item.neck}
                          onChange={(e) => updateItemField(item.id, 'neck', e.target.value)}
                          className="form-control"
                        >
                          {NECKS.map(n => (
                            <option key={n.id} value={n.id}>{n.label}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Name Set (+RM3/pcs)</label>
                        <select
                          value={item.name_set}
                          onChange={(e) => updateItemField(item.id, 'name_set', e.target.value)}
                          className="form-control"
                        >
                          <option value="No">No (+RM0)</option>
                          <option value="Yes">Yes (+RM3)</option>
                        </select>
                      </div>

                      <div className="form-group col-span-2">
                        <label className="form-label">Imej Design (Maks 300KB)</label>
                        <div className="design-upload-row">
                          <input
                            type="file"
                            id={`img_${item.id}`}
                            accept="image/*"
                            onChange={(e) => handleItemImageUpload(e, item.id)}
                            className="file-input-hidden"
                          />
                          <label htmlFor={`img_${item.id}`} className="btn btn-secondary btn-sm" style={{ flexShrink: 0 }}>
                            <Upload size={12} /> Pilih Imej
                          </label>
                          {item.design_image ? (
                            <div className="design-image-preview-wrapper">
                              <img src={item.design_image} className="design-img-preview" alt="Design Preview" />
                              <button
                                type="button"
                                onClick={() => updateItemField(item.id, 'design_image', '')}
                                className="btn-text btn-delete-img"
                              >
                                Buang
                              </button>
                            </div>
                          ) : (
                            <span className="no-image-text">Tiada imej</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Breakdown Matrix */}
                    <div className="size-breakdown-section">
                      <label className="form-label size-breakdown-title">Pecahan Saiz & Kuantiti Lengan</label>
                      <div className="breakdown-grid-wrapper">
                        <table className="breakdown-table">
                          <thead>
                            <tr>
                              <th>Lengan</th>
                              {SIZES.map(s => (
                                <th key={s} className={getSizeCost(s) > 0 ? 'extra-cost-header' : ''}>
                                  {s}
                                  {getSizeCost(s) > 0 && <span className="extra-cost-badge">+{getSizeCost(s)}</span>}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="row-label">Short</td>
                              {SIZES.map(s => (
                                <td key={s}>
                                  <input
                                    type="number"
                                    min="0"
                                    value={item.sizes[s]?.short || ''}
                                    onChange={(e) => updateItemQty(item.id, s, 'short', e.target.value)}
                                    placeholder="0"
                                    className="qty-input"
                                  />
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td className="row-label">Long (+RM5)</td>
                              {SIZES.map(s => (
                                <td key={s}>
                                  <input
                                    type="number"
                                    min="0"
                                    value={item.sizes[s]?.long || ''}
                                    onChange={(e) => updateItemQty(item.id, s, 'long', e.target.value)}
                                    placeholder="0"
                                    className="qty-input"
                                  />
                                </td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Item Calculations Footnote */}
                    <div className="item-calculations-footer">
                      <div className="calc-pill">
                        Qty: <strong>{summary.qty} pcs</strong>
                      </div>
                      <div className="calc-pill">
                        Base ({basePrice}x): <strong>RM {summary.base.toFixed(2)}</strong>
                      </div>
                      <div className="calc-pill">
                        Add-ons: <strong>RM {summary.addons.toFixed(2)}</strong>
                      </div>
                      <div className="calc-pill subtotal-pill">
                        Subtotal Item: <strong>RM {summary.subtotal.toFixed(2)}</strong>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Row 3: Notes & Discount */}
            <div className="invoice-summary-section">
              <h4 className="meta-section-title">C. Ringkasan & Diskaun</h4>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Catatan Invois (Opsyenal)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows="3"
                    placeholder="Catatan tambahan untuk dicetak di atas invois..."
                    className="form-control"
                    style={{ resize: 'none' }}
                  ></textarea>
                </div>

                <div className="summary-card-calc">
                  <div className="calc-row">
                    <span>Jumlah Kasar (Subtotal)</span>
                    <span className="font-bold">RM {grossSubtotal.toFixed(2)}</span>
                  </div>

                  <div className="calc-row discount-row">
                    <div className="discount-input-row">
                      <label className="form-label discount-label">Diskaun per helai (/pcs)</label>
                      <div className="discount-input-wrapper">
                        <span className="currency-prefix">RM</span>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={discountPerPcs || ''}
                          onChange={(e) => setDiscountPerPcs(Math.max(0, parseFloat(e.target.value) || 0))}
                          className="form-control discount-input"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    <span className="text-red font-bold">- RM {totalDiscount.toFixed(2)}</span>
                  </div>

                  <div className="calc-row grand-total-row">
                    <span>Jumlah Bersih (Grand Total)</span>
                    <span className="grand-total-val">RM {grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Batal
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              <Save size={16} /> {loading ? 'Menyimpan...' : 'Simpan Invois'}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .form-modal-body {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          max-height: 70vh;
          overflow-y: auto;
        }

        .meta-section-title {
          font-family: var(--font-primary);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.5rem;
          margin-bottom: 1.25rem;
          color: var(--text-dark);
        }

        .disabled-input {
          background-color: var(--off-white-bg);
          cursor: not-allowed;
        }

        /* Autocomplete Suggestions */
        .autocomplete-container {
          position: relative;
        }

        .suggestions-box {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: #fff;
          border: 1px solid var(--border-color);
          z-index: 100;
          max-height: 200px;
          overflow-y: auto;
          box-shadow: var(--shadow-md);
        }

        .suggestion-item {
          padding: 0.75rem 1rem;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid var(--off-white-bg);
          transition: var(--transition);
        }

        .suggestion-item:hover {
          background-color: var(--primary-red-light);
        }

        .suggestion-name {
          font-weight: 600;
          font-size: 0.85rem;
        }

        .suggestion-phone {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        /* Quota Info Box */
        .quota-banner {
          display: flex;
          background-color: var(--primary-red-light);
          border: 1px solid var(--primary-red);
          padding: 0.75rem 1.25rem !important;
          flex-direction: row !important;
          justify-content: space-around;
          align-items: center;
          gap: 1rem;
        }

        .quota-info {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .quota-label {
          font-size: 0.65rem;
          font-family: var(--font-primary);
          font-weight: 700;
          letter-spacing: 0.5px;
          color: var(--primary-red-hover);
        }

        .quota-value {
          font-family: var(--font-primary);
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--primary-red);
        }

        /* Design Item Card */
        .section-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.25rem;
        }

        .btn-add-design {
          margin-top: -1.25rem;
        }

        .design-item-card {
          margin-bottom: 1.5rem;
          border: 1px solid var(--border-color);
          background-color: #fff;
          padding: 1.5rem;
        }

        .design-item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px dashed var(--border-color);
          padding-bottom: 0.5rem;
          margin-bottom: 1.25rem;
        }

        .design-item-header h5 {
          font-family: var(--font-primary);
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 2px;
          color: var(--text-muted);
        }

        .specs-grid {
          margin-bottom: 1.5rem;
        }

        .col-span-2 {
          grid-column: span 2;
        }

        .design-upload-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 0.25rem;
        }

        .design-image-preview-wrapper {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .design-img-preview {
          height: 40px;
          width: 40px;
          object-fit: cover;
          border: 1px solid var(--border-color);
          background: var(--off-white-bg);
        }

        .no-image-text {
          font-size: 0.8rem;
          color: var(--text-light);
        }

        /* Size Breakdown Grid */
        .size-breakdown-section {
          margin-bottom: 1.5rem;
        }

        .size-breakdown-title {
          margin-bottom: 0.75rem;
          display: block;
        }

        .breakdown-grid-wrapper {
          overflow-x: auto;
          border: 1px solid var(--border-color);
          background-color: var(--off-white-bg);
        }

        .breakdown-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.85rem;
          min-width: 700px;
        }

        .breakdown-table th {
          font-family: var(--font-primary);
          font-size: 0.7rem;
          font-weight: 700;
          text-align: center;
          padding: 0.6rem 0.4rem;
          border-bottom: 1px solid var(--border-color);
          border-right: 1px solid var(--border-color);
          background: #fff;
          position: relative;
        }

        .extra-cost-header {
          background-color: var(--primary-red-light) !important;
          color: var(--primary-red) !important;
        }

        .extra-cost-badge {
          display: block;
          font-size: 0.55rem;
          font-weight: 800;
          color: var(--primary-red);
          margin-top: 0.15rem;
        }

        .breakdown-table td {
          padding: 0.5rem 0.4rem;
          text-align: center;
          border-bottom: 1px solid var(--border-color);
          border-right: 1px solid var(--border-color);
        }

        .row-label {
          font-weight: 700;
          text-align: left !important;
          padding-left: 0.75rem !important;
          font-size: 0.75rem;
          background: #fff;
          width: 130px;
          min-width: 130px;
        }

        .qty-input {
          width: 100%;
          max-width: 45px;
          padding: 0.35rem 0.25rem;
          border: 1px solid var(--border-color);
          text-align: center;
          font-family: var(--font-secondary);
          font-size: 0.85rem;
          border-radius: 0;
          background: #fff;
        }

        .qty-input:focus {
          border-color: var(--border-color-hover);
          outline: none;
        }

        /* Removing arrows from input type number */
        .qty-input::-webkit-outer-spin-button,
        .qty-input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .qty-input[type=number] {
          -moz-appearance: textfield;
        }

        /* Item calculations footer */
        .item-calculations-footer {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
          flex-wrap: wrap;
        }

        .calc-pill {
          padding: 0.5rem 1rem;
          background-color: var(--off-white-bg);
          border: 1px solid var(--border-color);
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .subtotal-pill {
          background-color: var(--primary-red-light);
          border-color: var(--primary-red);
          color: var(--primary-red-hover);
        }

        /* Overall calculations card */
        .summary-card-calc {
          background-color: var(--off-white-bg);
          border: 1px solid var(--border-color);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .calc-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
        }

        .discount-row {
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-color);
          align-items: flex-end;
        }

        .discount-input-row {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .discount-label {
          font-size: 0.65rem;
          margin-bottom: 0;
        }

        .discount-input-wrapper {
          display: flex;
          position: relative;
          align-items: center;
          max-width: 120px;
        }

        .currency-prefix {
          position: absolute;
          left: 0.75rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .discount-input {
          padding-left: 2rem;
          padding-top: 0.4rem;
          padding-bottom: 0.4rem;
          font-size: 0.85rem;
        }

        .grand-total-row {
          font-family: var(--font-primary);
          font-weight: 800;
          color: var(--text-dark);
          font-size: 1rem;
          letter-spacing: 0.5px;
          padding-top: 0.25rem;
        }

        .grand-total-val {
          color: var(--primary-red);
          font-size: 1.3rem;
        }

        @media (max-width: 768px) {
          .specs-grid {
            grid-template-columns: 1fr;
          }
          .col-span-2 {
            grid-column: span 1;
          }
          .item-calculations-footer {
            justify-content: flex-start;
          }
        }
      `}</style>
    </div>
  );
}
