import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, Loader2, AlertCircle, Globe, Shield } from 'lucide-react';
import { loginWithEmail } from '../services/auth';
import { useLanguage } from '../context/LanguageContext';

export default function Login({ onLoginSuccess }) {
  const { tr, language, toggleLanguage } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password) {
      setErrorMessage(tr('invalidLogin'));
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await loginWithEmail(email, password);
      if (error) {
        if (error.message && (error.message.includes('Invalid login') || error.message.includes('credentials'))) {
          setErrorMessage(tr('invalidLogin'));
        } else {
          setErrorMessage(error.message || tr('invalidLogin'));
        }
      } else if (data?.session) {
        if (onLoginSuccess) {
          onLoginSuccess(data.session);
        }
      }
    } catch (err) {
      setErrorMessage(err.message || 'Ralat sambungan. Sila cuba sebentar lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-root">
      {/* Top utility bar */}
      <header className="login-topbar">
        <div className="topbar-brand">
          <span className="brand-dot" />
          <span className="brand-label">INTERNAL SYSTEM</span>
        </div>
        <button 
          type="button" 
          onClick={toggleLanguage} 
          className="lang-pill-btn"
          aria-label="Switch Language"
        >
          <Globe size={14} />
          <span>{language === 'EN' ? 'EN' : 'BM'}</span>
        </button>
      </header>

      {/* Main Container */}
      <main className="login-main">
        <div className="login-box card">
          {/* Header block with Logo and metadata */}
          <div className="login-box-header">
            <div className="logo-wrapper">
              <img 
                src={`${import.meta.env.BASE_URL}Logo%20Header.webp`} 
                alt="ThirtyOne Lab" 
                className="brand-logo"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
            <div className="title-group">
              <h1 className="box-title">ThirtyOne Lab</h1>
              <p className="box-subtitle">Order Management System &bull; Restricted Access</p>
            </div>
          </div>

          <div className="divider-line" />

          {/* Error display */}
          {errorMessage && (
            <div className="error-banner" role="alert">
              <AlertCircle size={16} className="error-icon" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-item">
              <label className="field-label" htmlFor="user-email">
                {tr('email')}
              </label>
              <div className="field-input-box">
                <Mail size={16} className="field-icon" />
                <input
                  id="user-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="name@thirtyonelab.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="clean-input"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-item">
              <label className="field-label" htmlFor="user-password">
                {tr('password')}
              </label>
              <div className="field-input-box">
                <Lock size={16} className="field-icon" />
                <input
                  id="user-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="clean-input"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="field-toggle-btn"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="submit-action-btn"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="btn-spinner" />
                  <span>{tr('signingIn')}</span>
                </>
              ) : (
                <span>{tr('signIn')}</span>
              )}
            </button>
          </form>

          {/* Security notice */}
          <footer className="login-box-footer">
            <Shield size={13} className="shield-icon" />
            <span>Authorized personnel only. Sessions are monitored.</span>
          </footer>
        </div>
      </main>

      <style>{`
        /* Authentic ThirtyOne Lab Brand Design Tokens */
        .login-root {
          min-height: 100dvh;
          width: 100%;
          background-color: var(--off-white-bg, #FAF9F6);
          display: flex;
          flex-direction: column;
          font-family: var(--font-secondary, 'Inter', sans-serif);
          color: var(--text-dark, #111111);
          position: relative;
          box-sizing: border-box;
        }

        .login-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 2.5rem;
          border-bottom: 1px solid var(--border-color, #E6E2DC);
          background-color: var(--white, #FFFFFF);
        }

        .topbar-brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .brand-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--primary-red, #C51B27);
        }

        .brand-label {
          font-family: var(--font-primary, 'Montserrat', sans-serif);
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: var(--text-muted, #666666);
        }

        .lang-pill-btn {
          background-color: var(--white, #FFFFFF);
          border: 1px solid var(--border-color, #E6E2DC);
          color: var(--text-dark, #111111);
          font-family: var(--font-primary, 'Montserrat', sans-serif);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-sm, 8px);
          display: flex;
          align-items: center;
          gap: 0.4rem;
          cursor: pointer;
          transition: var(--transition, all 0.2s ease);
        }

        .lang-pill-btn:hover {
          border-color: var(--primary-red, #C51B27);
          color: var(--primary-red, #C51B27);
        }

        .login-main {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2.5rem 1.25rem;
        }

        .login-box {
          width: 100%;
          max-width: 420px;
          background-color: var(--white, #FFFFFF);
          border: 1px solid var(--border-color, #E6E2DC);
          border-radius: var(--radius-md, 12px);
          padding: 2.5rem 2.25rem;
          box-shadow: var(--shadow-md, 0 12px 30px rgba(0, 0, 0, 0.04));
          box-sizing: border-box;
        }

        .login-box-header {
          text-align: left;
          margin-bottom: 1.5rem;
        }

        .logo-wrapper {
          margin-bottom: 1.25rem;
        }

        .brand-logo {
          height: 42px;
          max-width: 190px;
          object-fit: contain;
          display: block;
        }

        .title-group {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .box-title {
          font-family: var(--font-primary, 'Montserrat', sans-serif);
          font-size: 1.35rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text-dark, #111111);
          margin: 0;
        }

        .box-subtitle {
          font-size: 0.78rem;
          color: var(--text-muted, #666666);
          margin: 0;
          letter-spacing: 0.2px;
        }

        .divider-line {
          height: 1px;
          background-color: var(--border-color, #E6E2DC);
          margin-bottom: 1.5rem;
        }

        .error-banner {
          background-color: var(--primary-red-light, #FDF2F3);
          border: 1px solid rgba(197, 27, 39, 0.25);
          color: var(--primary-red, #C51B27);
          padding: 0.75rem 0.9rem;
          border-radius: var(--radius-sm, 8px);
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
          line-height: 1.35;
        }

        .error-icon {
          color: var(--primary-red, #C51B27);
          flex-shrink: 0;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-item {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .field-label {
          font-family: var(--font-primary, 'Montserrat', sans-serif);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: var(--text-dark, #111111);
        }

        .field-input-box {
          position: relative;
          display: flex;
          align-items: center;
        }

        .field-icon {
          position: absolute;
          left: 0.85rem;
          color: var(--text-light, #8E8B82);
          pointer-events: none;
        }

        .clean-input {
          width: 100%;
          background-color: var(--white, #FFFFFF);
          border: 1px solid var(--border-color, #E6E2DC);
          border-radius: var(--radius-sm, 8px);
          padding: 0.75rem 0.85rem 0.75rem 2.4rem;
          font-family: var(--font-secondary, 'Inter', sans-serif);
          font-size: 0.9rem;
          color: var(--text-dark, #111111);
          outline: none;
          transition: var(--transition, all 0.2s ease);
          box-sizing: border-box;
        }

        .clean-input:focus {
          border-color: var(--primary-red, #C51B27);
          box-shadow: 0 0 0 3px rgba(197, 27, 39, 0.1);
        }

        .clean-input::placeholder {
          color: var(--text-light, #8E8B82);
          font-size: 0.825rem;
        }

        .field-toggle-btn {
          position: absolute;
          right: 0.75rem;
          background: none;
          border: none;
          color: var(--text-light, #8E8B82);
          cursor: pointer;
          padding: 0.25rem;
          display: flex;
          align-items: center;
          transition: color 0.15s ease;
        }

        .field-toggle-btn:hover {
          color: var(--text-dark, #111111);
        }

        .submit-action-btn {
          margin-top: 0.5rem;
          background-color: var(--primary-red, #C51B27);
          border: 1px solid var(--primary-red, #C51B27);
          color: var(--white, #FFFFFF);
          font-family: var(--font-primary, 'Montserrat', sans-serif);
          font-size: 0.82rem;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 0.85rem 1.25rem;
          border-radius: var(--radius-sm, 8px);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          box-shadow: var(--shadow-sm, 0 2px 8px rgba(0, 0, 0, 0.02));
          transition: var(--transition, all 0.2s ease);
        }

        .submit-action-btn:hover:not(:disabled) {
          background-color: var(--primary-red-hover, #A1141E);
          border-color: var(--primary-red-hover, #A1141E);
          box-shadow: var(--shadow-md, 0 12px 30px rgba(0, 0, 0, 0.04));
        }

        .submit-action-btn:active:not(:disabled) {
          transform: translateY(1px);
        }

        .submit-action-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-spinner {
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .login-box-footer {
          margin-top: 1.75rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color, #E6E2DC);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          font-size: 0.68rem;
          color: var(--text-light, #8E8B82);
          text-align: center;
          letter-spacing: 0.2px;
        }

        .shield-icon {
          color: var(--text-muted, #666666);
          flex-shrink: 0;
        }

        @media (max-width: 480px) {
          .login-topbar {
            padding: 1rem 1.25rem;
          }
          .login-box {
            padding: 1.75rem 1.25rem;
          }
          .box-title {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
}
