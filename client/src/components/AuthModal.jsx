import React, { useState } from 'react';
import { X, Zap, Mail, Lock, User, AlertCircle, ArrowRight } from 'lucide-react';
import { api } from '../api';

const InputField = ({ icon: Icon, type, placeholder, value, onChange, required }) => (
  <div className="relative">
    <Icon className="w-4 h-4 text-slate-600 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
    <input
      type={type}
      required={required}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full pl-11 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none transition-all duration-200"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
      }}
      onFocus={(e) => { e.target.style.borderColor = 'rgba(34,211,238,0.45)'; }}
      onBlur={(e)  => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; }}
    />
  </div>
);

export default function AuthModal({ isOpen, initialMode = 'login', onClose, onSuccess }) {
  const [mode, setMode]         = useState(initialMode);
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = mode === 'signup'
        ? await api.signup({ name, email, password })
        : await api.login({ email, password });
      localStorage.setItem('navora_token', data.token);
      onSuccess(data.user);
      onClose();
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const data = await api.demoLogin();
      localStorage.setItem('navora_token', data.token);
      onSuccess(data.user);
      onClose();
    } catch (err) {
      setError(err.message || 'Demo login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
    >
      <div
        className="relative w-full max-w-md overflow-hidden"
        style={{
          background: 'rgba(10, 14, 26, 0.97)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '24px',
          boxShadow: '0 40px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04) inset',
        }}
      >
        {/* Ambient glow orbs */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 p-8">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-slate-600 hover:text-white transition-colors cursor-pointer"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <X className="w-4 h-4" />
          </button>

          {/* Brand mark */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(13,18,36,0.9)', border: '1px solid rgba(34,211,238,0.3)', boxShadow: '0 0 14px rgba(34,211,238,0.15)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9.5" stroke="url(#am-ring)" strokeWidth="1" opacity="0.45"/>
                <line x1="12" y1="2.8" x2="12" y2="4.5" stroke="#22D3EE" strokeWidth="1.3" strokeLinecap="round"/>
                <line x1="12" y1="19.5" x2="12" y2="21.2" stroke="#7C3AED" strokeWidth="1.3" strokeLinecap="round"/>
                <line x1="2.8" y1="12" x2="4.5" y2="12" stroke="#22D3EE" strokeWidth="1.3" strokeLinecap="round"/>
                <line x1="19.5" y1="12" x2="21.2" y2="12" stroke="#22D3EE" strokeWidth="1.3" strokeLinecap="round"/>
                <path d="M12 5.5L13.3 11H10.7L12 5.5Z" fill="#22D3EE"/>
                <path d="M12 18.5L10.7 13H13.3L12 18.5Z" fill="#7C3AED" opacity="0.65"/>
                <circle cx="12" cy="12" r="1.7" fill="url(#am-center)"/>
                <circle cx="5.2" cy="17.8" r="1.1" fill="#22D3EE" opacity="0.45"/>
                <circle cx="7.5" cy="15.8" r="0.7" fill="#22D3EE" opacity="0.3"/>
                <defs>
                  <linearGradient id="am-ring" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#22D3EE"/>
                    <stop offset="1" stopColor="#7C3AED"/>
                  </linearGradient>
                  <radialGradient id="am-center" cx="50%" cy="50%" r="50%">
                    <stop stopColor="#22D3EE"/>
                    <stop offset="1" stopColor="#7C3AED"/>
                  </radialGradient>
                </defs>
              </svg>
            </div>
            <div>
              <span className="font-display font-extrabold text-xl text-white tracking-tight">
                NAVORA <span className="text-cyan-400">AI</span>
              </span>
              <span className="block label-overline text-slate-500 mt-0.5">Tumkur</span>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold text-white tracking-tight mb-1">
            {mode === 'signup' ? 'Create an account' : 'Welcome back'}
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            {mode === 'signup'
              ? 'Join to save and personalise your outing plans.'
              : 'Sign in to access your saved itineraries.'}
          </p>

          {/* Demo Login */}
          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl cursor-pointer transition-all duration-200 mb-2 group"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(34,211,238,0.3)'; e.currentTarget.style.background = 'rgba(34,211,238,0.05)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
          >
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-xs tracking-widest text-slate-300">
              ⚡ 1-CLICK DEMO ACCESS
            </span>
          </button>
          <p className="text-center text-[10px] text-slate-700 font-mono mb-5">
            FOR ACADEMIC EVALUATION ONLY
          </p>

          {/* Divider */}
          <div className="divider-gradient mb-5" />

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 rounded-xl flex items-center gap-2.5 text-xs text-rose-300"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5 ml-1">Full Name</label>
                <InputField icon={User} type="text" placeholder="e.g. Naveen Kumar"
                  value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5 ml-1">Email</label>
              <InputField icon={Mail} type="email" placeholder="you@example.com"
                value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5 ml-1">Password</label>
              <InputField icon={Lock} type="password" placeholder="Min. 6 characters"
                value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full !rounded-xl !py-3.5 justify-center mt-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </span>
              ) : (
                <>
                  {mode === 'signup' ? 'Create Account' : 'Sign In'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Toggle */}
          <p className="text-center text-xs text-slate-600 mt-5">
            {mode === 'signup' ? 'Already have an account? ' : "Don't have an account? "}
            <button
              type="button"
              onClick={() => { setMode(mode === 'signup' ? 'login' : 'signup'); setError(''); }}
              className="text-cyan-400 hover:text-cyan-300 font-medium underline underline-offset-2 cursor-pointer"
            >
              {mode === 'signup' ? 'Sign In' : 'Create Account'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
