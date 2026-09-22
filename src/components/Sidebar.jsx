import React, { useEffect, useState } from 'react';
import { LayoutDashboard, FileText, Users, Settings, Database, HardDrive, Factory, Truck, BookOpen, BarChart2, Globe, Cloud, Download, LogOut, Wallet, Smartphone, ShieldCheck } from 'lucide-react';
import { isCloudMode, getSettings } from '../services/storage';
import { useLanguage } from '../context/LanguageContext';
import { getInstallPrompt, clearInstallPrompt } from '../pwaInstall';

export default function Sidebar({ activeTab, setActiveTab, isMobileMenuOpen, setIsMobileMenuOpen, currentUser, onLogout }) {
  const [cloudActive, setCloudActive] = useState(isCloudMode());
  const [logo, setLogo] = useState('');
  const { language, setLanguage, toggleLanguage, tr } = useLanguage();

  useEffect(() => {
    setCloudActive(isCloudMode());
    loadLogo();
  }, [activeTab]);

  useEffect(() => {
    const handleConnectionChange = () => {
      setCloudActive(isCloudMode());
      loadLogo();
    };
    window.addEventListener('supabase-connection-changed', handleConnectionChange);
    return () => {
      window.removeEventListener('supabase-connection-changed', handleConnectionChange);
    };
  }, []);

  const loadLogo = async () => {
    const data = await getSettings();
    if (data && data.company_logo) {
      setLogo(data.company_logo);
    } else {
      setLogo('');
    }
  };

  const topNavItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'invoices', label: 'Invois & Tempahan', icon: FileText },
    { id: 'manufacturing', label: 'Kilang (Production)', icon: Factory },
    { id: 'postage', label: 'Penghantaran (Pos)', icon: Truck },
    { id: 'clients', label: 'Pelanggan (Clients)', icon: Users },
  ];

  const financeNavItems = [
    { id: 'ledger', label: 'Buku Tunai & Bank', icon: Wallet },
    { id: 'reports', label: 'Laporan Untung Rugi (P&L)', icon: BarChart2 },
  ];

  const bottomNavItems = [
    { id: 'settings', label: 'Tetapan (Settings)', icon: Settings },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (setIsMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleInstallClick = () => {
    const prompt = getInstallPrompt();
    if (!prompt) {
      alert("Pemasangan aplikasi terus ke desktop atau telefon boleh dibuat melalui pelayar (cth: Chrome 'Install app' atau Safari 'Add to Home Screen').");
      return;
    }
    prompt.prompt();
    prompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        clearInstallPrompt();
      }
    });
  };

  return (
    <>
      <div 
        className={`sidebar-backdrop ${isMobileMenuOpen ? 'active' : ''} mobile-only`}
        onClick={() => setIsMobileMenuOpen && setIsMobileMenuOpen(false)}
      />

      <aside className={`sidebar no-print ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        {/* Brand Header */}
        <div className="sidebar-brand">
          {logo ? (
            <img src={logo} alt="Company Logo" style={{ maxHeight: '42px', objectFit: 'contain' }} />
          ) : (
            <img src={`${import.meta.env.BASE_URL}Logo%20Header.webp`} alt="Company Logo" style={{ maxHeight: '42px', objectFit: 'contain' }} />
          )}
          <h2 className="brand-name">
            THIRTYONE <span>LAB</span><sup>®</sup>
          </h2>
        </div>

        {/* Navigation List */}
        <nav className="sidebar-nav">
          <div className="nav-section-title">RUANG KERJA</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {topNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                >
                  <Icon size={17} strokeWidth={isActive ? 2.5 : 1.8} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="nav-section-title" style={{ marginTop: '16px' }}>PENGURUSAN KEWANGAN</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {financeNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                >
                  <Icon size={17} strokeWidth={isActive ? 2.5 : 1.8} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
            <div className="nav-section-title">SISTEM & TETAPAN</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {bottomNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`nav-item ${isActive ? 'active' : ''}`}
                  >
                    <Icon size={17} strokeWidth={isActive ? 2.5 : 1.8} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Footer Area */}
        <div className="sidebar-footer">
          {currentUser && (
            <div className="user-profile-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
                <div className="user-avatar">
                  {(currentUser.email || 'A').charAt(0).toUpperCase()}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 750, color: 'var(--text-dark)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {currentUser.email?.split('@')[0]}
                  </span>
                  <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', marginTop: '1px' }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#16a34a' }}></span>
                    Aktif (Cloud)
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={onLogout}
                className="logout-btn"
                title="Log Keluar"
              >
                <LogOut size={15} />
              </button>
            </div>
          )}

          <button 
            onClick={handleInstallClick}
            className="install-app-btn" 
          >
            <Smartphone size={16} strokeWidth={2} />
            <span>Pasang PWA App</span>
          </button>
        </div>

        <style>{`
          .sidebar {
            width: 260px;
            background-color: #ffffff;
            border-right: 1px solid var(--border-color);
            display: flex;
            flex-direction: column;
            height: 100vh;
            flex-shrink: 0;
            z-index: 20;
          }

          .sidebar-brand {
            padding: 1.5rem 1.25rem 1.25rem;
            border-bottom: 1px solid var(--border-color);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            gap: 0.35rem;
          }

          .brand-name {
            font-family: var(--font-primary);
            font-size: 1.05rem;
            font-weight: 900;
            letter-spacing: 0.5px;
            color: var(--text-dark);
            margin-top: 4px;
          }

          .brand-name span {
            color: var(--primary-red);
          }

          .brand-name sup {
            color: var(--primary-red);
            font-size: 0.55em;
            margin-left: 2px;
          }

          .sidebar-nav {
            padding: 1rem 0.85rem;
            display: flex;
            flex-direction: column;
            flex: 1;
            overflow-y: auto;
            min-height: 0;
          }

          .nav-section-title {
            font-family: var(--font-primary);
            font-size: 0.65rem;
            font-weight: 800;
            letter-spacing: 0.8px;
            color: var(--text-muted);
            padding: 0.5rem 0.75rem 0.35rem;
          }

          .nav-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 0.65rem 0.85rem;
            border: 0;
            background: none;
            color: #52525b;
            font-family: var(--font-primary);
            font-size: 0.82rem;
            font-weight: 650;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.15s ease;
            text-align: left;
            width: 100%;
          }

          .nav-item:hover {
            color: #18181b;
            background-color: #f4f4f5;
          }

          .nav-item.active {
            color: #ffffff;
            background-color: #18181b;
            font-weight: 750;
          }

          .sidebar-footer {
            padding: 1rem 0.85rem;
            border-top: 1px solid var(--border-color);
            background-color: #ffffff;
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .user-profile-card {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 10px;
            background-color: #f8f7f4;
            border: 1px solid var(--border-color);
            border-radius: 8px;
          }

          .user-avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background-color: #18181b;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8rem;
            font-weight: 800;
            flex-shrink: 0;
          }

          .logout-btn {
            background: none;
            border: none;
            color: var(--text-muted);
            cursor: pointer;
            padding: 6px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.15s ease, background 0.15s ease;
          }

          .logout-btn:hover {
            color: var(--primary-red);
            background-color: #fee2e2;
          }

          .install-app-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: 100%;
            padding: 8px 10px;
            background-color: #ffffff;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            color: var(--text-dark);
            font-size: 0.78rem;
            font-weight: 650;
            cursor: pointer;
            transition: all 0.15s ease;
          }

          .install-app-btn:hover {
            background-color: #f4f4f5;
            border-color: #d4d4d8;
          }

          @media (max-width: 1024px) {
            .sidebar-backdrop {
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              background-color: rgba(0, 0, 0, 0.5);
              z-index: 100;
              opacity: 0;
              pointer-events: none;
              transition: var(--transition);
            }
            
            .sidebar-backdrop.active {
              opacity: 1;
              pointer-events: auto;
            }

            .sidebar {
              display: flex !important;
              position: fixed;
              top: 0;
              left: -280px;
              width: 280px;
              height: 100vh;
              height: 100dvh;
              z-index: 101;
              transition: var(--transition);
              box-shadow: var(--shadow-lg);
              overflow: hidden;
            }

            .sidebar.mobile-open {
              left: 0;
            }
          }
        `}</style>
      </aside>
    </>
  );
}
