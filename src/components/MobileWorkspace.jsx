import { useState } from 'react';
import {
  Plus, LayoutDashboard, FileText, Wallet, Menu, Factory, Truck, Users, Settings, LogOut,
  ArrowLeft, Smartphone, DownloadCloud, X
} from 'lucide-react';
import { demoMode } from '../data/demo';
import { getInstallPrompt, clearInstallPrompt } from '../pwaInstall';

export default function MobileWorkspace({ activeTab, onNavigate, onNew, onLogout, currentUser, children }) {
  // PWA Install state
  const [installModalOpen, setInstallModalOpen] = useState(false);

  const handleInstallClick = () => {
    const prompt = getInstallPrompt();
    if (prompt) {
      prompt.prompt();
      prompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          clearInstallPrompt();
        }
      });
    } else {
      setInstallModalOpen(true);
    }
  };

  const orderTabs = ['invoices', 'manufacturing', 'postage', 'manufacturing-documents', 'postage-documents'];
  const moneyTabs = ['wallet', 'ledger', 'reports'];
  const isOrders = orderTabs.includes(activeTab);
  const isMoney = moneyTabs.includes(activeTab);

  const groupedTabs = isOrders
    ? [['invoices', 'Invois'], ['manufacturing', 'Kilang'], ['postage', 'Pos']]
    : [['ledger', 'Buku Tunai'], ['reports', 'Laporan P&L']];

  const navigate = (tab) => {
    onNavigate(tab);
    window.scrollTo(0, 0);
  };

  return (
    <div className="m-workspace">
      {/* Top Header */}
      <header className="m-topbar">
        <span className="m-wordmark">THIRTYONE<span>LAB</span><sup>®</sup></span>
        <span className="m-environment">{demoMode ? 'Data Contoh (Demo)' : 'Sistem OMS'}</span>
      </header>

      {/* Subtabs for Orders or Money */}
      {(isOrders || isMoney) && (
        <div className="m-group-heading" style={{ background: '#ffffff', borderBottom: '1px solid var(--m-border)', padding: '12px 16px 8px' }}>
          <div className="m-title-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div>
              <span className="m-eyebrow" style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--m-text-muted)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                {isOrders ? 'RUANG KERJA TEMPAHAN' : 'PENGURUSAN KEWANGAN'}
              </span>
              <h1 style={{ fontSize: '1.45rem', fontWeight: 900, letterSpacing: '-0.4px', margin: '2px 0 0', color: 'var(--m-text)' }}>
                {isOrders ? 'Tempahan' : 'Kewangan'}<span className="m-title-dot" style={{ color: 'var(--m-red)' }}>.</span>
              </h1>
            </div>
            {isOrders && (
              <button
                className="m-add"
                onClick={onNew}
                aria-label="Tempahan Baharu"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'var(--m-red, #C51B27)',
                  color: '#ffffff',
                  border: 0,
                  display: 'grid',
                  placeItems: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(197, 27, 39, 0.25)'
                }}
              >
                <Plus size={22} />
              </button>
            )}
          </div>
          <nav 
            className="m-section-tabs" 
            aria-label="Bahagian" 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: `repeat(${groupedTabs.length}, 1fr)`, 
              gap: '6px', 
              width: '100%', 
              overflow: 'hidden', 
              margin: 0,
              padding: 0,
              border: 0
            }}
          >
            {groupedTabs.map(([id, label]) => {
              const isActive = activeTab === id || (id === 'ledger' && activeTab === 'wallet');
              return (
                <button
                  key={id}
                  onClick={() => navigate(id)}
                  aria-current={isActive ? 'page' : undefined}
                  style={{
                    padding: '8px 4px',
                    borderRadius: '8px',
                    fontSize: '12.5px',
                    fontWeight: isActive ? 750 : 600,
                    textAlign: 'center',
                    border: isActive ? '1px solid #18181b' : '1px solid transparent',
                    background: isActive ? '#18181b' : '#f4f4f5',
                    color: isActive ? '#ffffff' : '#52525b',
                    cursor: 'pointer',
                    width: '100%',
                    minHeight: 'auto'
                  }}
                >
                  {label}
                </button>
              );
            })}
          </nav>
        </div>
      )}

      {/* Menu Screen (When Menu Tab is Active) */}
      {activeTab === 'menu' ? (
        <main className="m-content" style={{ padding: '16px', paddingBottom: '90px' }}>
          <div className="m-title-row" style={{ marginBottom: '6px' }}>
            <div>
              <span className="m-eyebrow" style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--m-text-muted)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                THIRTYONE LAB OMS
              </span>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 900, margin: '2px 0 0' }}>
                Menu Utama<span className="m-title-dot" style={{ color: 'var(--m-red)' }}>.</span>
              </h1>
            </div>
          </div>
          <p className="m-muted" style={{ marginBottom: '14px', fontSize: '12.5px', color: 'var(--m-text-muted)' }}>
            Akses pantas ke semua modul pengurusan dan tetapan sistem.
          </p>

          {/* Account Card */}
          <div style={{
            background: 'var(--m-surface, #ffffff)',
            border: '1px solid var(--m-border, #e6e2d8)',
            borderRadius: 'var(--m-radius-md, 12px)',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: 'var(--m-shadow-sm, 0 1px 2px rgba(0,0,0,0.04))',
            marginBottom: '12px'
          }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: '#18181b',
              color: '#ffffff',
              display: 'grid',
              placeItems: 'center',
              flexShrink: 0,
              fontWeight: 750,
              fontSize: '15px'
            }}>
              {(currentUser?.email || 'Admin')[0].toUpperCase()}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '10.5px', fontWeight: 650, color: 'var(--m-text-muted)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                Akaun Log Masuk
              </div>
              <div style={{ fontSize: '13.5px', fontWeight: 750, color: 'var(--m-text)', overflowWrap: 'anywhere', lineHeight: 1.3 }}>
                {currentUser?.email || 'admin@thirtyonelab.com'}
              </div>
              <div style={{ fontSize: '11px', color: '#15803d', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16a34a', display: 'inline-block' }}></span>
                Pentadbir Sistem · Aktif
              </div>
            </div>
          </div>

          {/* PWA Install Card */}
          <div style={{
            background: 'var(--m-surface, #ffffff)',
            border: '1px solid var(--m-border, #e6e2d8)',
            borderRadius: 'var(--m-radius-md, 12px)',
            padding: '14px 16px',
            marginBottom: '16px',
            boxShadow: 'var(--m-shadow-sm, 0 1px 2px rgba(0,0,0,0.04))'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <span className="m-action-icon" style={{
                background: '#18181b',
                color: '#ffffff',
                flexShrink: 0,
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                display: 'grid',
                placeItems: 'center'
              }}>
                <Smartphone size={19} />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <strong style={{ fontSize: '13.5px', color: 'var(--m-text)', display: 'block', lineHeight: 1.3 }}>
                  Pasang Aplikasi ke Telefon (PWA)
                </strong>
                <p style={{ fontSize: '11.5px', color: 'var(--m-text-secondary, #5e594e)', margin: '3px 0 10px', lineHeight: 1.4 }}>
                  Guna sistem OMS terus dari skrin utama telefon tanpa perlu buka pelayar web.
                </p>
                <button
                  className="m-button"
                  onClick={handleInstallClick}
                  style={{
                    background: '#18181b',
                    color: '#ffffff',
                    border: '1px solid #18181b',
                    borderRadius: '8px',
                    fontWeight: 650,
                    fontSize: '12.5px',
                    padding: '9px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    width: '100%',
                    cursor: 'pointer'
                  }}
                >
                  <DownloadCloud size={15} /> Muat Turun / Pasang App
                </button>
              </div>
            </div>
          </div>

          {/* Quick Menu List */}
          <div className="m-action-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              ['ledger', Wallet, 'Buku Tunai & Bank'],
              ['reports', FileText, 'Penyata Untung Rugi (P&L)'],
              ['clients', Users, 'Pelanggan & CRM'],
              ['manufacturing', Factory, 'Operasi Kilang & Kos'],
              ['postage', Truck, 'Penghantaran & Pos Kurier'],
              ['settings', Settings, 'Tetapan & Sambungan Cloud'],
            ].map(([id, Icon, label]) => (
              <button
                key={id}
                onClick={() => navigate(id)}
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--m-border, #e6e2d8)',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <span style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  background: '#f4f4f5',
                  color: '#18181b',
                  display: 'grid',
                  placeItems: 'center',
                  flexShrink: 0
                }}>
                  <Icon size={17} />
                </span>
                <span style={{ fontSize: '13.5px', fontWeight: 650, color: 'var(--m-text)', flex: 1 }}>{label}</span>
              </button>
            ))}

            <button
              onClick={onLogout}
              style={{
                background: '#ffffff',
                border: '1px solid #fecaca',
                borderRadius: '10px',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                cursor: 'pointer',
                textAlign: 'left',
                marginTop: '6px'
              }}
            >
              <span style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: '#fee2e2',
                color: 'var(--m-red, #c9232d)',
                display: 'grid',
                placeItems: 'center',
                flexShrink: 0
              }}>
                <LogOut size={17} />
              </span>
              <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--m-red, #c9232d)', flex: 1 }}>Log Keluar Sistem</span>
            </button>
          </div>
        </main>
      ) : (
        /* Render Full Core Module for all tabs with identical desktop functionality */
        <div className="m-legacy-page" style={{ paddingBottom: '84px' }}>
          {['clients', 'settings'].includes(activeTab) && (
            <button
              className="m-back"
              onClick={() => navigate('menu')}
              style={{
                margin: '12px 16px 0',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#ffffff',
                border: '1px solid var(--m-border)',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '12.5px',
                fontWeight: 650,
                cursor: 'pointer',
                color: 'var(--m-text)'
              }}
            >
              <ArrowLeft size={16} /> Kembali ke Menu
            </button>
          )}
          {children}
        </div>
      )}

      {/* PWA Install Guide Modal */}
      {installModalOpen && (
        <div className="modal-overlay" onClick={() => setInstallModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '440px', padding: '20px', borderRadius: '16px', margin: 'auto', height: 'auto', maxHeight: '90vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Smartphone size={20} color="var(--m-red)" />
                <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--m-text)' }}>PANDUAN PASANG APLIKASI</h3>
              </div>
              <button onClick={() => setInstallModalOpen(false)} style={{ background: 'none', border: 0, cursor: 'pointer', padding: '4px' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: 'var(--m-text)' }}>
              <div style={{ background: '#f8f7f4', padding: '12px 14px', borderRadius: '10px', border: '1px solid #e6e2d8' }}>
                <strong style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: 'var(--m-text)' }}>
                  Untuk iOS / iPhone (Safari):
                </strong>
                <ol style={{ paddingLeft: '18px', margin: 0, lineHeight: 1.5, color: 'var(--m-text-secondary)', fontSize: '12.5px' }}>
                  <li>Tekan butang <b>Share (Kongsikan)</b> di bar bawah pelayar Safari.</li>
                  <li>Tatal ke bawah dan tekan <b>"Add to Home Screen" (Tambah ke Skrin Utama)</b>.</li>
                  <li>Tekan <b>Add (Tambah)</b> di sudut atas kanan.</li>
                </ol>
              </div>

              <div style={{ background: '#f8f7f4', padding: '12px 14px', borderRadius: '10px', border: '1px solid #e6e2d8' }}>
                <strong style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: 'var(--m-text)' }}>
                  Untuk Android (Chrome):
                </strong>
                <ol style={{ paddingLeft: '18px', margin: 0, lineHeight: 1.5, color: 'var(--m-text-secondary)', fontSize: '12.5px' }}>
                  <li>Tekan menu <b>tiga titik (⋮)</b> di penjuru atas pelayar Chrome.</li>
                  <li>Pilih <b>"Install app"</b> atau <b>"Add to Home screen"</b>.</li>
                </ol>
              </div>
            </div>

            <button 
              className="m-button" 
              onClick={() => setInstallModalOpen(false)} 
              style={{ marginTop: '16px', width: '100%', background: '#18181b', color: '#ffffff', borderRadius: '8px', padding: '11px', fontWeight: 650 }}
            >
              Faham & Tutup
            </button>
          </div>
        </div>
      )}

      {/* Fixed Bottom Navigation */}
      <nav className="m-bottom-nav" aria-label="Navigasi Utama">
        {[
          ['invoices', FileText, 'Tempahan', isOrders],
          ['overview', LayoutDashboard, 'Dashboard', activeTab === 'overview'],
          ['ledger', Wallet, 'Kewangan', isMoney],
          ['menu', Menu, 'Menu', ['menu', 'clients', 'settings'].includes(activeTab)],
        ].map(([id, Icon, label, active]) => (
          <button
            key={id}
            aria-current={active ? 'page' : undefined}
            onClick={() => navigate(id)}
            style={{ color: active ? 'var(--m-red, #C51B27)' : 'var(--m-text-muted)' }}
          >
            <Icon size={21} strokeWidth={active ? 2.4 : 1.7} />
            <span style={{ fontWeight: active ? 750 : 500 }}>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
