import React, { useEffect, useState } from 'react';
import { LayoutDashboard, FileText, Users, Settings, Database, HardDrive } from 'lucide-react';
import { isCloudMode, getSettings } from '../services/storage';

export default function Sidebar({ activeTab, setActiveTab }) {
  const [cloudActive, setCloudActive] = useState(isCloudMode());
  const [logo, setLogo] = useState('');

  // Check storage status periodically or when activeTab changes (e.g., after settings update)
  useEffect(() => {
    setCloudActive(isCloudMode());
    loadLogo();
  }, [activeTab]);

  // Listen to custom connection status change event
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

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'invoices', label: 'Invoices', icon: FileText },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="sidebar no-print">
      <div className="sidebar-brand" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '0.35rem', paddingTop: '3.5rem' }}>
        {logo ? (
          <img src={logo} alt="Company Logo" style={{ maxHeight: '45px', objectFit: 'contain' }} />
        ) : (
          <span className="brand-tag" style={{ color: 'var(--primary-red)', letterSpacing: '4px', fontSize: '0.75rem', fontWeight: '800' }}>31LAB</span>
        )}
        <h2 className="brand-name" style={{ fontSize: '1.15rem', fontWeight: '900', letterSpacing: '1px', lineHeight: '1', whiteSpace: 'nowrap' }}>
          THIRTYONE <span style={{ color: 'var(--primary-red)' }}>LAB</span><sup style={{ color: 'var(--primary-red)', fontSize: '0.5em', fontWeight: '700' }}>&reg;</sup>
        </h2>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} strokeWidth={isActive ? 2.5 : 1.8} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="status-indicator">
          {cloudActive ? (
            <>
              <div className="status-dot cloud"></div>
              <div className="status-text">
                <span className="status-label">SUPABASE SYNC</span>
                <span className="status-desc">Awan Aktif</span>
              </div>
            </>
          ) : (
            <>
              <div className="status-dot local"></div>
              <div className="status-text">
                <span className="status-label">LOCAL MODE</span>
                <span className="status-desc">Simpan Peranti</span>
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        .sidebar {
          width: 260px;
          background-color: var(--white);
          border-right: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          height: 100vh;
          flex-shrink: 0;
          z-index: 10;
        }

        .sidebar-brand {
          padding: 2.5rem 2rem;
          border-bottom: 1px solid var(--border-color);
        }

        .brand-tag {
          font-family: var(--font-primary);
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 3px;
          color: var(--primary-red);
          text-transform: uppercase;
          margin-bottom: 0.3rem;
          display: block;
        }

        .brand-name {
          font-family: var(--font-primary);
          font-size: 1.1rem;
          font-weight: 800;
          letter-spacing: 1px;
          color: var(--text-dark);
        }

        .sidebar-nav {
          padding: 2rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex: 1;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          border: none;
          background: none;
          color: var(--text-muted);
          font-family: var(--font-primary);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: var(--transition);
          text-align: left;
          width: 100%;
        }

        .nav-item:hover {
          color: var(--primary-red);
          background-color: var(--primary-red-light);
        }

        .nav-item.active {
          color: var(--white);
          background-color: var(--primary-red);
        }

        .sidebar-footer {
          padding: 1.5rem 2rem;
          border-top: 1px solid var(--border-color);
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          background-color: var(--off-white-bg);
          border: 1px solid var(--border-color);
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .status-dot.cloud {
          background-color: var(--primary-red);
          box-shadow: 0 0 8px var(--primary-red);
        }

        .status-dot.local {
          background-color: var(--text-light);
        }

        .status-text {
          display: flex;
          flex-direction: column;
        }

        .status-label {
          font-family: var(--font-primary);
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 1px;
          color: var(--text-dark);
        }

        .status-desc {
          font-size: 0.65rem;
          color: var(--text-muted);
        }
      `}</style>
    </aside>
  );
}
