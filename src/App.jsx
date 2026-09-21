import React, { useState, useEffect, useRef } from 'react';
import { LayoutDashboard, FileText, Users, Settings as SettingsIcon, Factory, Cloud, Database, ChevronRight, Menu } from 'lucide-react';
import { isCloudMode } from './services/storage';
import { getAuthSession, onAuthStateChange, logoutUser } from './services/auth';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import MobileWorkspace from './components/MobileWorkspace';
import { demoMode, demoSession } from './data/demo';
import './styles/mobile.css';

const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Invoices = React.lazy(() => import('./pages/Invoices'));
const Clients = React.lazy(() => import('./pages/Clients'));
const Manufacturing = React.lazy(() => import('./pages/Manufacturing'));
const Postage = React.lazy(() => import('./pages/Postage'));
const Settings = React.lazy(() => import('./pages/Settings'));
const Ledger = React.lazy(() => import('./pages/Ledger'));
const Wallet = React.lazy(() => import('./pages/Wallet'));
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
  const [mobile, setMobile] = useState(() => window.matchMedia('(max-width: 1024px)').matches);
  const [activeTab, setActiveTab] = useState(() => window.matchMedia('(max-width: 1024px)').matches ? 'invoices' : 'overview');
  useEffect(() => {
    const media = window.matchMedia('(max-width: 1024px)');
    const change = () => setMobile(media.matches);
    media.addEventListener('change', change);
    return () => media.removeEventListener('change', change);
  }, []);
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

  const closeOverlays = () => {
    setInvoiceModalOpen(false);
    setPaymentModalOpen(false);
    setDetailModalOpen(false);
    if (window.history.state?.modal) window.history.back();
  };

  useEffect(() => {
    if (!invoiceModalOpen && !paymentModalOpen && !detailModalOpen) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const dialog = document.querySelector('.modal-overlay .modal-content');
    const background = document.querySelector('.m-workspace');
    if (background) background.inert = true;
    dialog?.querySelector('button, input, select, textarea')?.focus();
    const onKey = event => {
      if (event.key === 'Escape') { event.preventDefault(); closeOverlays(); }
      if (event.key === 'Tab' && dialog) {
        const controls = [...dialog.querySelectorAll('button, input, select, textarea, a[href], [tabindex="0"]')].filter(el => !el.disabled && el.getClientRects().length);
        const first = controls[0], last = controls.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      if (background) background.inert = false;
      document.removeEventListener('keydown', onKey);
      previousFocus?.focus();
    };
  }, [invoiceModalOpen, paymentModalOpen, detailModalOpen]);

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
    const handlePopState = (event) => {
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

      setActiveTab(event.state?.tab || 'invoices');
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const pushModalHistory = (name) => {
    window.history.pushState({ ...window.history.state, app: true, tab: activeTab, modal: name }, '', window.location.href);
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
      case 'manufacturing-documents':
      case 'manufacturing':
        return <Manufacturing key={`mfg_${refreshKey}`} />;
      case 'postage-documents':
      case 'postage':
        return <Postage key={`post_${refreshKey}`} />;
      case 'wallet':
      case 'ledger':
        return <Ledger key={`ledger_${refreshKey}`} />;
      case 'reports':
        return <Reports key={`reports_${refreshKey}`} />;
      case 'settings':
        return <Settings key={`settings_${refreshKey}`} />;
      default:
        return (
          <Dashboard 
            setActiveTab={handleSelectTab} 
            onOpenInvoiceModal={handleOpenInvoiceModal}
            onOpenPaymentModal={handleOpenPaymentModal}
            onOpenInvoiceDetail={handleOpenInvoiceDetail}
          />
        );
    }
  };

  // 1. Sleek loading screen while checking auth session
  if (authLoading) {
    return (
      <div 
        style={{ 
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100dvh',
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          backgroundColor: 'var(--off-white-bg, #FAF9F6)',
          zIndex: 99999,
          padding: '1.5rem',
          boxSizing: 'border-box'
        }}
      >
        <img 
          src={`${import.meta.env.BASE_URL}Logo%20Header.webp`} 
          alt="ThirtyOne Lab" 
          style={{ height: '44px', maxWidth: '220px', width: 'auto', objectFit: 'contain', marginBottom: '1.5rem', opacity: 0.95 }} 
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div 
          style={{ 
            width: '30px', 
            height: '30px', 
            border: '2.5px solid rgba(197, 27, 39, 0.12)', 
            borderTopColor: 'var(--primary-red, #C51B27)', 
            borderRadius: '50%', 
            animation: 'authSpin 0.75s cubic-bezier(0.4, 0, 0.2, 1) infinite' 
          }} 
        />
        <style>{`@keyframes authSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // 2. Unauthenticated: Show Taste-Skill Login Screen
  if (!session && demoMode) {
    return <div className="m-content"><span className="m-eyebrow">THIRTYONE LAB · DEMO</span><h1>Mobile workspace</h1><p className="m-muted">Data contoh disimpan dalam browser ini sahaja.</p><button className="m-button m-primary" onClick={() => setSession(demoSession)}>Buka demo</button></div>;
  }
  if (!session) {
    return <Login onLoginSuccess={(newSession) => setSession(newSession)} />;
  }

  // 3. Authenticated: Render Main App
  return (
    <div className={`app-layout ${mobile ? 'mobile-app' : 'desktop-app'}`}>
      {mobile ? (
        <MobileWorkspace 
          activeTab={activeTab} 
          onNavigate={handleSelectTab} 
          onNew={() => handleOpenInvoiceModal()} 
          onEdit={handleOpenInvoiceModal} 
          onPrint={handleOpenInvoiceDetail} 
          onLogout={handleLogout} 
          refreshKey={refreshKey} 
          currentUser={session?.user}
        >
          <React.Suspense fallback={<div className="m-content">Loading…</div>}>{renderPage()}</React.Suspense>
        </MobileWorkspace>
      ) : (
        <>
          <Sidebar 
            activeTab={activeTab} 
            setActiveTab={handleSelectTab} 
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            currentUser={session?.user}
            onLogout={handleLogout}
          />
          <main className="main-content" style={{ backgroundColor: 'var(--off-white-bg, #f8f7f4)', minHeight: '100vh', padding: '2rem 3rem' }}>
            <React.Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Memuatkan...</div>}>
              {renderPage()}
            </React.Suspense>
          </main>
        </>
      )}

      {/* Modal 1: Create / Edit Invoice */}
      {invoiceModalOpen && (
        <InvoiceModal
          invoice={editingInvoice}
          mobile={mobile}
          prefilledClient={prefilledClient}
          onClose={closeOverlays}
          onSaveSuccess={() => {
            closeOverlays();
            triggerRefresh();
          }}
        />
      )}

      {/* Modal 2: Record / Update Payments */}
      {paymentModalOpen && (
        <PaymentModal
          invoice={paymentInvoice}
          onClose={closeOverlays}
          onSaveSuccess={() => {
            closeOverlays();
            triggerRefresh();
          }}
        />
      )}

      {/* Modal 3: View Invoice A4 Details & Printing */}
      {detailModalOpen && (
        <InvoiceDetailModal
          invoice={detailInvoice}
          onClose={closeOverlays}
        />
      )}
    </div>
  );
}
