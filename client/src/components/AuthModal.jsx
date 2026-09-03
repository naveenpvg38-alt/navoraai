import React, { useState } from 'react';
import { X, Sparkles, Lock, Mail, User, AlertCircle, Zap } from 'lucide-react';
import { api } from '../api';

export default function AuthModal({ isOpen, initialMode = 'login', onClose, onSuccess }) {
  const [mode, setMode] = useState(initialMode); // 'login' or 'signup'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let data;
      if (mode === 'signup') {
        data = await api.signup({ name, email, password });
      } else {
        data = await api.login({ email, password });
      }

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
      setError(err.message || 'Failed to authenticate demo user.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md rounded-2xl glass-panel border border-slate-700/80 p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute -top-12 -right-12 w-44 h-44 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-violet-600/15 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" /> ✦ NAVORA AI Access
          </div>
          <h2 className="text-2xl font-bold font-display text-white">
            {mode === 'signup' ? 'Create Your Account' : 'Welcome Back'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {mode === 'signup'
              ? 'Join Navora AI to personalize, save, and complete outing plans.'
              : 'Sign in to access your saved itineraries and personalized preferences.'}
          </p>
        </div>

        {/* Quick Demo Access Button */}
        <button
          type="button"
          onClick={handleDemoLogin}
          disabled={loading}
          className="w-full mb-5 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-950/80 to-indigo-950/80 hover:from-cyan-900/90 hover:to-indigo-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm group cursor-pointer"
        >
          <Zap className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
          ⚡ Instant 1-Click Demo Login (Academic Evaluation)
        </button>

        <div className="relative flex py-1 items-center mb-5">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="flex-shrink mx-3 text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
            Or continue with email
          </span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Rivera"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-semibold text-sm shadow-glow-cyan/40 hover:shadow-glow-cyan transition-all duration-200 disabled:opacity-50"
          >
            {loading ? 'Processing...' : mode === 'signup' ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        {/* Tab switch */}
        <div className="mt-5 text-center text-xs text-slate-400">
          {mode === 'signup' ? (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setError('');
                }}
                className="text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-2 ml-1"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setError('');
                }}
                className="text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-2 ml-1"
              >
                Create Account
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
