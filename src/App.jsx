import React, { useState, useEffect, useRef } from 'react';
import { LayoutDashboard, FileText, Users, Settings as SettingsIcon, Factory, Cloud, Database, ChevronRight, Menu } from 'lucide-react';
import { isCloudMode } from './services/storage';
import { getAuthSession, onAuthStateChange, logoutUser } from './services/auth';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Sidebar from './components/Sidebar';
import Login from './components/Login';

const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Invoices = React.lazy(() => import('./pages/Invoices'));
const Clients = React.lazy(() => import('./pages/Clients'));
const Manufacturing = React.lazy(() => import('./pages/Manufacturing'));
const Postage = React.lazy(() => import('./pages/Postage'));
const Settings = React.lazy(() => import('./pages/Settings'));
const Ledger = React.lazy(() => import('./pages/Ledger'));
const Reports = React.lazy(() => import('./pages/Reports'));

// Modals
import InvoiceModal from './components/InvoiceModal';
import PaymentModal from './components/PaymentModal';
import InvoiceDetailModal from './components/InvoiceDetailModal';

// Print Styles
import './styles/print.css';

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}

function MainApp() {
  const { tr, language } = useLanguage();
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [cloudActive, setCloudActive] = useState(isCloudMode());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Modals state
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [prefilledClient, setPrefilledClient] = useState(null);

  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentInvoice, setPaymentInvoice] = useState(null);

  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [detailInvoice, setDetailInvoice] = useState(null);

  // State ref for browser back-button (popstate) event listener
  const stateRef = useRef({
    isMobileMenuOpen: false,
    invoiceModalOpen: false,
    paymentModalOpen: false,
    detailModalOpen: false,
    activeTab: 'overview',
    session: null
  });

  useEffect(() => {
    stateRef.current = {
      isMobileMenuOpen,
      invoiceModalOpen,
      paymentModalOpen,
      detailModalOpen,
      activeTab,
      session
    };
  }, [isMobileMenuOpen, invoiceModalOpen, paymentModalOpen, detailModalOpen, activeTab, session]);

  // Handle mobile gesture/hardware Back button smoothly
  useEffect(() => {
    if (session) {
      window.history.replaceState({ app: true, tab: activeTab }, '', window.location.href);
      window.history.pushState({ app: true, tab: activeTab }, '', window.location.href);
    }
  }, [session]);

  useEffect(() => {
    const handlePopState = () => {
      if (!stateRef.current.session) return;
      const { isMobileMenuOpen, invoiceModalOpen, paymentModalOpen, detailModalOpen, activeTab } = stateRef.current;

      // 1. If mobile menu drawer is open, close it
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        return;
      }

      // 2. If any modal is active, close it
      if (invoiceModalOpen || paymentModalOpen || detailModalOpen) {
        setInvoiceModalOpen(false);
        setPaymentModalOpen(false);
        setDetailModalOpen(false);
        return;
      }

      // 3. If navigated to a subtab, back button returns to overview
      if (activeTab !== 'overview') {
        setActiveTab('overview');
        return;
      }

      // 4. If already on overview with no overlays, keep the session locked in app instead of exiting to login
      window.history.pushState({ app: true, tab: 'overview' }, '', window.location.href);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const pushModalHistory = (name) => {
    window.history.pushState({ app: true, modal: name }, '', window.location.href);
  };

  const handleSelectTab = (newTab) => {
    if (newTab !== activeTab) {
      window.history.pushState({ app: true, tab: newTab }, '', window.location.href);
      setActiveTab(newTab);
    }
  };

  useEffect(() => {
    // Check initial auth session
    getAuthSession().then((currSession) => {
      setSession(currSession);
      setAuthLoading(false);
    });

    // Listen to Supabase auth events (login, logout, token refresh)
    const { data: { subscription } } = onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setAuthLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    setCloudActive(isCloudMode());
  }, [activeTab]);

  // Lock background scroll while the mobile drawer is open
  useEffect(() => {
    document.body.classList.toggle('drawer-open', isMobileMenuOpen);
    return () => document.body.classList.remove('drawer-open');
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleConnectionChange = () => {
      setCloudActive(isCloudMode());
    };
    window.addEventListener('supabase-connection-changed', handleConnectionChange);
    return () => {
      window.removeEventListener('supabase-connection-changed', handleConnectionChange);
    };
  }, []);

  const handleLogout = async () => {
    const confirmLogout = window.confirm(
      language === 'EN'
        ? 'Are you sure you want to log out of ThirtyOne Lab OMS?'
        : 'Adakah anda pasti mahu log keluar daripada ThirtyOne Lab OMS?'
    );
    if (confirmLogout) {
      await logoutUser();
      setSession(null);
    }
  };

  // Trigger page refreshes on successful saves
  const [refreshKey, setRefreshKey] = useState(0);
  const triggerRefresh = () => setRefreshKey(prev => prev + 1);

  // --- MODAL TRIGGERS ---
  const handleOpenInvoiceModal = (inv = null) => {
    pushModalHistory('invoice');
    setEditingInvoice(inv);
    setPrefilledClient(null);
    setInvoiceModalOpen(true);
  };

  const handleOpenInvoiceForClient = (client) => {
    pushModalHistory('invoice');
    setEditingInvoice(null);
    setPrefilledClient(client);
    setInvoiceModalOpen(true);
  };

  const handleOpenPaymentModal = (inv) => {
    pushModalHistory('payment');
    setPaymentInvoice(inv);
    setPaymentModalOpen(true);
  };

  const handleOpenInvoiceDetail = (inv) => {
    pushModalHistory('detail');
    setDetailInvoice(inv);
    setDetailModalOpen(true);
  };

  // --- RENDER CURRENT PAGE ---
  const renderPage = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <Dashboard
            key={`dash_${refreshKey}`}
            setActiveTab={handleSelectTab}
            onOpenInvoiceModal={handleOpenInvoiceModal}
            onOpenPaymentModal={handleOpenPaymentModal}
            onOpenInvoiceDetail={handleOpenInvoiceDetail}
          />
        );
      case 'invoices':
        return (
          <Invoices
            key={`inv_${refreshKey}`}
            onOpenInvoiceModal={handleOpenInvoiceModal}
            onOpenPaymentModal={handleOpenPaymentModal}
            onOpenInvoiceDetail={handleOpenInvoiceDetail}
          />
        );
      case 'clients':
        return (
          <Clients
            key={`cli_${refreshKey}`}
            onOpenInvoiceForClient={handleOpenInvoiceForClient}
            onOpenInvoiceDetail={handleOpenInvoiceDetail}
          />
        );
      case 'manufacturing':
        return <Manufacturing key={`mfg_${refreshKey}`} />;
      case 'postage':
        return <Postage key={`post_${refreshKey}`} />;
      case 'ledger':
        return <Ledger key={`ledger_${refreshKey}`} />;
      case 'reports':
        return <Reports key={`reports_${refreshKey}`} />;
      case 'settings':
        return <Settings key={`settings_${refreshKey}`} />;
      default:
        return <Dashboard setActiveTab={handleSelectTab} />;
    }
  };

  // 1. Sleek loading screen while checking auth session
  if (authLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--off-white-bg, #FAF9F6)' }}>
        <img 
          src={`${import.meta.env.BASE_URL}Logo%20Header.webp`} 
          alt="ThirtyOne Lab" 
          style={{ height: '44px', marginBottom: '1.5rem', opacity: 0.95 }} 
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div style={{ width: '28px', height: '28px', border: '2.5px solid rgba(197, 27, 39, 0.15)', borderTopColor: 'var(--primary-red, #C51B27)', borderRadius: '50%', animation: 'authSpin 0.8s linear infinite' }} />
        <style>{`@keyframes authSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // 2. Unauthenticated: Show Taste-Skill Login Screen
  if (!session) {
    return <Login onLoginSuccess={(newSession) => setSession(newSession)} />;
  }

  // 3. Authenticated: Render Main App
  return (
    <div className="app-layout">
      {/* Mobile Top Header (Visible only on mobile) */}
      <header className="mobile-top-bar mobile-only">
        <span className="mobile-brand-name">THIRTYONE <span style={{ color: 'var(--primary-red)' }}>LAB</span><sup style={{ color: 'var(--primary-red)', fontSize: '0.5em' }}>&reg;</sup></span>
        <button 
          className="mobile-menu-btn mobile-only" 
          onClick={() => {
            pushModalHistory('menu');
            setIsMobileMenuOpen(true);
          }} 
          aria-label="Menu"
        >
          <Menu size={22} />
        </button>
      </header>

      {/* Sidebar (Navigation) */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={handleSelectTab} 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        currentUser={session?.user}
        onLogout={handleLogout}
      />

      {/* Main Pages Content */}
      <React.Suspense fallback={<div style={{padding: '2rem', textAlign: 'center'}}>Loading...</div>}>
        {renderPage()}
      </React.Suspense>

      {/* Modal 1: Create / Edit Invoice */}
      {invoiceModalOpen && (
        <InvoiceModal
          invoice={editingInvoice}
          prefilledClient={prefilledClient}
          onClose={() => setInvoiceModalOpen(false)}
          onSaveSuccess={() => {
            setInvoiceModalOpen(false);
            triggerRefresh();
          }}
        />
      )}

      {/* Modal 2: Record / Update Payments */}
      {paymentModalOpen && (
        <PaymentModal
          invoice={paymentInvoice}
          onClose={() => setPaymentModalOpen(false)}
          onSaveSuccess={() => {
            setPaymentModalOpen(false);
            triggerRefresh();
          }}
        />
      )}

      {/* Modal 3: View Invoice A4 Details & Printing */}
      {detailModalOpen && (
        <InvoiceDetailModal
          invoice={detailInvoice}
          onClose={() => setDetailModalOpen(false)}
        />
      )}
    </div>
  );
}
