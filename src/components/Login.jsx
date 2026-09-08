import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, Loader2, AlertCircle, ShieldCheck, Globe } from 'lucide-react';
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
        // Map common error messages
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
    <div className="login-viewport">
      {/* Subtle brand ambient accents */}
      <div className="login-glow top-glow" />
      <div className="login-glow bottom-glow" />

      {/* Language Switcher on Top Right */}
      <div className="login-topbar">
        <button 
          type="button" 
          onClick={toggleLanguage} 
          className="login-lang-btn"
          title="Tukar Bahasa / Switch Language"
        >
          <Globe size={15} />
          <span>{language === 'EN' ? 'English (EN)' : 'Bahasa Melayu (BM)'}</span>
        </button>
      </div>

      {/* Main Login Card */}
      <div className="login-card">
        {/* Brand Header */}
        <div className="login-brand-header">
          <img 
            src={`${import.meta.env.BASE_URL}Logo%20Header.webp`} 
            alt="ThirtyOne Lab Logo" 
            className="login-brand-logo"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="login-brand-tagline">
            <span className="brand-badge">OMS PORTAL</span>
          </div>
          <h1 className="login-title">{tr('welcomeBack')}</h1>
          <p className="login-subtitle">{tr('loginSubtitle')}</p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="login-error-alert" role="alert">
            <AlertCircle size={18} className="error-icon" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="login-form">
          {/* Email Input */}
          <div className="login-field-group">
            <label className="login-label" htmlFor="login-email">
              {tr('email')}
            </label>
            <div className="login-input-wrapper">
              <Mail size={17} className="input-leading-icon" />
              <input
                id="login-email"
                type="email"
                required
                autoComplete="email"
                placeholder="nama@thirtyonelab.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
                disabled={loading}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="login-field-group">
            <div className="login-label-row">
              <label className="login-label" htmlFor="login-password">
                {tr('password')}
              </label>
            </div>
            <div className="login-input-wrapper">
              <Lock size={17} className="input-leading-icon" />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle-btn"
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="login-submit-btn"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="spinner" />
                <span>{tr('signingIn')}</span>
              </>
            ) : (
              <>
                <span>{tr('signIn')}</span>
              </>
            )}
          </button>
        </form>

        {/* Security Footer Notice */}
        <div className="login-footer-notice">
          <ShieldCheck size={14} className="shield-icon" />
          <span>{tr('accountRequired')}</span>
        </div>
      </div>

      {/* Embedded Component Styles (Taste Skill aligned) */}
      <style>{`
        .login-viewport {
          min-height: 100vh;
          width: 100vw;
          background-color: #0b0f17;
          background-image: 
            radial-gradient(at 100% 0%, rgba(225, 29, 72, 0.08) 0px, transparent 50%),
            radial-gradient(at 0% 100%, rgba(15, 23, 42, 0.9) 0px, transparent 50%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 1.5rem;
          overflow: hidden;
          font-family: var(--font-secondary, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
          box-sizing: border-box;
        }

        .login-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          opacity: 0.35;
        }

        .top-glow {
          width: 380px;
          height: 380px;
          top: -100px;
          right: -80px;
          background: #e11d48;
        }

        .bottom-glow {
          width: 450px;
          height: 450px;
          bottom: -150px;
          left: -120px;
          background: #1e293b;
        }

        .login-topbar {
          position: absolute;
          top: 1.5rem;
          right: 2rem;
          z-index: 20;
        }

        .login-lang-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #cbd5e1;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.45rem 0.85rem;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          gap: 0.45rem;
          cursor: pointer;
          backdrop-filter: blur(12px);
          transition: all 0.2s ease;
        }

        .login-lang-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.25);
        }

        .login-card {
          width: 100%;
          max-width: 440px;
          background: #111827;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 16px;
          padding: 2.75rem 2.5rem;
          box-shadow: 
            0 20px 25px -5px rgba(0, 0, 0, 0.6),
            0 8px 10px -6px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
          position: relative;
          z-index: 10;
          animation: cardAppear 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes cardAppear {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .login-brand-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .login-brand-logo {
          height: 48px;
          max-width: 220px;
          object-fit: contain;
          margin: 0 auto 1.25rem auto;
          display: block;
          filter: drop-shadow(0 2px 8px rgba(0,0,0,0.4));
        }

        .login-brand-tagline {
          display: flex;
          justify-content: center;
          margin-bottom: 0.75rem;
        }

        .brand-badge {
          font-family: var(--font-primary, inherit);
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: #fda4af;
          background: rgba(225, 29, 72, 0.12);
          border: 1px solid rgba(225, 29, 72, 0.3);
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          text-transform: uppercase;
        }

        .login-title {
          font-family: var(--font-primary, inherit);
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #f8fafc;
          margin: 0 0 0.35rem 0;
        }

        .login-subtitle {
          font-size: 0.85rem;
          color: #94a3b8;
          margin: 0;
          line-height: 1.4;
        }

        .login-error-alert {
          background: rgba(225, 29, 72, 0.12);
          border: 1px solid rgba(225, 29, 72, 0.35);
          color: #fca5a5;
          padding: 0.75rem 1rem;
          border-radius: 10px;
          font-size: 0.825rem;
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin-bottom: 1.5rem;
          line-height: 1.4;
        }

        .error-icon {
          flex-shrink: 0;
          color: #f43f5e;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.35rem;
        }

        .login-field-group {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        .login-label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .login-label {
          font-size: 0.78rem;
          font-weight: 600;
          color: #cbd5e1;
          letter-spacing: 0.3px;
        }

        .login-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-leading-icon {
          position: absolute;
          left: 1rem;
          color: #64748b;
          pointer-events: none;
          transition: color 0.2s ease;
        }

        .login-input {
          width: 100%;
          background: #0d121f;
          border: 1px solid #1f293d;
          border-radius: 10px;
          padding: 0.8rem 1rem 0.8rem 2.65rem;
          font-size: 0.925rem;
          color: #f1f5f9;
          outline: none;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }

        .login-input:focus {
          border-color: #e11d48;
          box-shadow: 0 0 0 3px rgba(225, 29, 72, 0.22);
          background: #0f172a;
        }

        .login-input:focus + .input-leading-icon,
        .login-input-wrapper:focus-within .input-leading-icon {
          color: #e11d48;
        }

        .login-input::placeholder {
          color: #475569;
          font-size: 0.85rem;
        }

        .password-toggle-btn {
          position: absolute;
          right: 0.85rem;
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          padding: 0.25rem;
          display: flex;
          align-items: center;
          transition: color 0.2s ease;
        }

        .password-toggle-btn:hover {
          color: #cbd5e1;
        }

        .login-submit-btn {
          margin-top: 0.5rem;
          background: #e11d48;
          border: 1px solid #be123c;
          color: #ffffff;
          font-family: var(--font-primary, inherit);
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          padding: 0.875rem 1.25rem;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          box-shadow: 0 4px 14px rgba(225, 29, 72, 0.4);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .login-submit-btn:hover:not(:disabled) {
          background: #f43f5e;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(225, 29, 72, 0.5);
        }

        .login-submit-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .login-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spinner {
          animation: spin 0.9s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .login-footer-notice {
          margin-top: 2rem;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          font-size: 0.75rem;
          color: #64748b;
          text-align: center;
        }

        .shield-icon {
          color: #94a3b8;
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 2rem 1.5rem;
            border-radius: 14px;
          }
          .login-title {
            font-size: 1.3rem;
          }
          .login-topbar {
            top: 1rem;
            right: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
