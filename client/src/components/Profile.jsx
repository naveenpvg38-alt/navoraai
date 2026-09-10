import React, { useState, useEffect } from 'react';
import {
  Bookmark, Heart, CheckCircle2, Clock, Wallet,
  Trash2, ArrowRight, Sparkles, Save, LogOut, Sliders,
  Sun, Moon
} from 'lucide-react';
import { api } from '../api';
import { useTheme } from '../context/ThemeContext';

const tabDef = [
  { id: 'saved',       label: 'Saved Plans',  icon: Bookmark,    accent: 'cyan'    },
  { id: 'favourites',  label: 'Favourites',   icon: Heart,       accent: 'rose'    },
  { id: 'completed',   label: 'Completed',    icon: CheckCircle2,accent: 'emerald' },
  { id: 'preferences', label: 'Preferences',  icon: Sliders,     accent: 'violet'  },
];

const accentBorder = {
  cyan:    'rgba(34,211,238,0.35)',
  rose:    'rgba(244,63,94,0.35)',
  emerald: 'rgba(16,185,129,0.35)',
  violet:  'rgba(124,58,237,0.35)',
};
const accentText = {
  cyan:    'text-cyan-300',
  rose:    'text-rose-300',
  emerald: 'text-emerald-300',
  violet:  'text-violet-300',
};

const inputStyle = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '12px',
  width: '100%',
  padding: '10px 16px',
  fontSize: '14px',
  color: '#E2E8F0',
  outline: 'none',
};

export default function Profile({ user, onSelectPlan, onLogout, defaultTab = 'saved', onOpenPlanner }) {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab]  = useState(defaultTab);
  const [plans, setPlans]          = useState([]);
  const [loading, setLoading]      = useState(true);
  const [savingPref, setSavingPref] = useState(false);
  const [prefSuccess, setPrefSuccess] = useState(false);

  const [name, setName]         = useState(user?.name || '');
  const [mood, setMood]         = useState('Relaxed');
  const [budget, setBudget]     = useState('Moderate ($$)');
  const [transport, setTransport] = useState('Bike / Two-Wheeler');
  const [location, setLocation] = useState('Tumkur, Karnataka');

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const [profRes, plansRes] = await Promise.all([api.getProfile(), api.getPlans()]);
        setPlans(plansRes);
        if (profRes.user) setName(profRes.user.name || '');
        if (profRes.preferences) {
          setMood(profRes.preferences.mood || 'Relaxed');
          setBudget(profRes.preferences.budget || 'Moderate ($$)');
          setTransport(profRes.preferences.transport || 'Bike / Two-Wheeler');
          setLocation(profRes.preferences.location || 'Tumkur, Karnataka');
        }
      } finally { setLoading(false); }
    };
    fetch();
  }, []);

  const handleDeletePlan = async (e, planId) => {
    e.stopPropagation();
    if (!window.confirm('Delete this saved plan?')) return;
    try {
      await api.deletePlan(planId);
      setPlans(plans.filter(p => p.plan_id !== planId));
    } catch { alert('Delete failed.'); }
  };

  const handleToggleFavourite = async (e, planId) => {
    e.stopPropagation();
    try {
      const res = await api.toggleFavourite(planId);
      setPlans(plans.map(p => p.plan_id === planId ? { ...p, is_favourite: res.is_favourite } : p));
    } catch {}
  };

  const handleToggleComplete = async (e, planId) => {
    e.stopPropagation();
    try {
      const res = await api.toggleComplete(planId);
      setPlans(plans.map(p => p.plan_id === planId ? { ...p, is_completed: res.is_completed } : p));
    } catch {}
  };

  const handleSavePreferences = async (e) => {
    e.preventDefault();
    setSavingPref(true);
    try {
      await api.updateProfile({ name, preferences: { mood, budget, transport, location } });
      setPrefSuccess(true);
      setTimeout(() => setPrefSuccess(false), 2500);
    } catch { alert('Save failed.'); }
    finally { setSavingPref(false); }
  };

  const filteredPlans = plans.filter(p => {
    if (activeTab === 'favourites') return p.is_favourite;
    if (activeTab === 'completed')  return p.is_completed;
    return true;
  });

  const savedCount    = plans.length;
  const favCount      = plans.filter(p => p.is_favourite).length;
  const completedCount= plans.filter(p => p.is_completed).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pb-28">

      {/* Profile hero */}
      <div className="p-7 sm:p-10 rounded-3xl mb-7 relative overflow-hidden"
        style={{ background: 'rgba(10,14,26,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.1), transparent)' }} />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          {/* Avatar + info */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #22D3EE, #7C3AED)', boxShadow: '0 0 30px -8px rgba(34,211,238,0.4)' }}>
              {user?.name ? user.name[0].toUpperCase() : 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{user?.name}</h1>
                <span className="font-mono text-[10px] text-cyan-400 px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)' }}>
                  EXPLORER
                </span>
              </div>
              <p className="text-slate-500 text-sm">{user?.email}</p>
              <p className="text-slate-700 text-xs font-mono mt-0.5">
                MEMBER SINCE {new Date(user?.created_at || Date.now()).toLocaleDateString('en-IN', { year: 'numeric', month: 'short' }).toUpperCase()}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button onClick={onOpenPlanner} className="btn-primary !py-2.5 !px-5 !text-sm !rounded-xl !gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Plan Outing
            </button>
            <button onClick={onLogout} title="Log Out"
              className="p-2.5 rounded-xl text-slate-600 hover:text-rose-400 cursor-pointer transition-all"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor='rgba(244,63,94,0.3)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-7 pt-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {[
            { val: savedCount,     label: 'Saved Plans',    color: 'text-cyan-400'    },
            { val: favCount,       label: 'Favourites',     color: 'text-rose-400'    },
            { val: completedCount, label: 'Completed',      color: 'text-emerald-400' },
          ].map((s) => (
            <div key={s.label} className="p-4 rounded-2xl text-center"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className={`font-mono text-2xl sm:text-3xl font-bold ${s.color}`}>{s.val}</div>
              <div className="label-overline text-slate-600 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-7 p-1 rounded-2xl"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
        {tabDef.map((tab) => {
          const active = activeTab === tab.id;
          const Icon   = tab.icon;
          const count  = tab.id === 'saved' ? savedCount : tab.id === 'favourites' ? favCount : tab.id === 'completed' ? completedCount : null;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium cursor-pointer transition-all duration-200 ${active ? accentText[tab.accent] : 'text-slate-600 hover:text-slate-400'}`}
              style={active ? { background: 'rgba(255,255,255,0.07)', border: `1px solid ${accentBorder[tab.accent]}` } : {}}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{tab.label}</span>
              {count !== null && <span className="font-mono text-[10px]">({count})</span>}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      {activeTab === 'preferences' ? (
        <div className="max-w-2xl p-7 rounded-3xl"
          style={{ background: 'rgba(10,14,26,0.7)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <h2 className="text-lg font-semibold text-white mb-1 tracking-tight">Preferences & Appearance</h2>
          <p className="text-slate-500 text-sm mb-6 font-light">Customize your interface theme and default trip settings.</p>

          {/* Quick Theme Switcher */}
          <div className="mb-6 pb-6 border-b border-white/8">
            <label className="block label-overline text-slate-500 mb-2.5">Website Theme</label>
            <div className="grid grid-cols-2 gap-3 max-w-xs">
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-300 shadow-glow-sm'
                    : 'border-white/10 text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Moon className="w-4 h-4 text-cyan-400" />
                <span>Dark Mode</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  theme === 'light'
                    ? 'bg-amber-500/15 border-amber-500/50 text-amber-600 dark:text-amber-300 shadow-sm'
                    : 'border-white/10 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <Sun className="w-4 h-4 text-amber-500" />
                <span>Light Mode</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSavePreferences} className="space-y-4">
            <div>
              <label className="block label-overline text-slate-600 mb-2">Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle}
                onFocus={(e) => e.target.style.borderColor='rgba(34,211,238,0.4)'}
                onBlur={(e)  => e.target.style.borderColor='rgba(255,255,255,0.08)'} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Default Mood', val: mood, set: setMood,
                  opts: ['Relaxed','Adventurous','Romantic','Energetic','Foodie','Cultural','Nature Explorer'] },
                { label: 'Default Budget', val: budget, set: setBudget,
                  opts: ['Free ($0)','Budget ($)','Moderate ($$)','Luxury ($$$)'] },
                { label: 'Default Transport', val: transport, set: setTransport,
                  opts: ['Scenic Walk','Bike / Two-Wheeler','KSRTC / Town Bus','Car / Cab'] },
              ].map((field) => (
                <div key={field.label}>
                  <label className="block label-overline text-slate-600 mb-2">{field.label}</label>
                  <select value={field.val} onChange={(e) => field.set(e.target.value)}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    className="appearance-none"
                    onFocus={(e) => e.target.style.borderColor='rgba(34,211,238,0.4)'}
                    onBlur={(e)  => e.target.style.borderColor='rgba(255,255,255,0.08)'}
                  >
                    {field.opts.map(o => <option key={o} value={o} style={{ background: '#0A0E1A' }}>{o}</option>)}
                  </select>
                </div>
              ))}
              <div>
                <label className="block label-overline text-slate-600 mb-2">Default Location</label>
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor='rgba(34,211,238,0.4)'}
                  onBlur={(e)  => e.target.style.borderColor='rgba(255,255,255,0.08)'} />
              </div>
            </div>

            <div className="pt-2">
              <button type="submit" disabled={savingPref}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all ${prefSuccess ? 'text-emerald-900' : 'text-slate-950'}`}
                style={prefSuccess
                  ? { background: '#10B981' }
                  : { background: '#22D3EE', boxShadow: '0 0 20px -6px rgba(34,211,238,0.4)' }
                }>
                <Save className="w-4 h-4" />
                {savingPref ? 'Saving...' : prefSuccess ? 'Saved!' : 'Save Preferences'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          {loading ? (
            <div className="text-center py-20">
              <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-slate-600 text-sm font-mono">LOADING ITINERARIES...</p>
            </div>
          ) : filteredPlans.length === 0 ? (
            <div className="text-center py-20 rounded-3xl"
              style={{ background: 'rgba(13,18,32,0.5)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <Bookmark className="w-10 h-10 text-slate-700 mx-auto mb-4" />
              <h3 className="text-base font-semibold text-white mb-2">
                {activeTab === 'favourites' ? 'No favourites yet' : activeTab === 'completed' ? 'No completed plans yet' : 'No saved plans yet'}
              </h3>
              <p className="text-slate-600 text-sm max-w-xs mx-auto mb-6 font-light">
                Generate a personalized outing and save it here.
              </p>
              <button onClick={onOpenPlanner} className="btn-primary !py-2.5 !px-6 !rounded-xl !text-sm">
                <Sparkles className="w-4 h-4" /> Create Your First Plan
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPlans.map((plan) => (
                <div key={plan.plan_id} onClick={() => onSelectPlan(plan)}
                  className="p-6 rounded-2xl flex flex-col justify-between cursor-pointer group transition-all duration-300"
                  style={{ background: 'rgba(13,18,32,0.7)', border: '1px solid rgba(255,255,255,0.06)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor='rgba(255,255,255,0.12)'; e.currentTarget.style.transform='translateY(-3px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor='rgba(255,255,255,0.06)'; e.currentTarget.style.transform='translateY(0)'; }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[11px] font-bold text-cyan-400 px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)' }}>
                        {plan.match_score || 95}% MATCH
                      </span>
                      <div className="flex items-center gap-1">
                        <button type="button" onClick={(e) => handleToggleFavourite(e, plan.plan_id)}
                          className="p-1.5 rounded-lg cursor-pointer transition-all"
                          style={plan.is_favourite
                            ? { background: 'rgba(244,63,94,0.15)', border: '1px solid rgba(244,63,94,0.3)' }
                            : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                          <Heart className={`w-3.5 h-3.5 ${plan.is_favourite ? 'fill-rose-400 text-rose-400' : 'text-slate-500'}`} />
                        </button>
                        <button type="button" onClick={(e) => handleToggleComplete(e, plan.plan_id)}
                          className="p-1.5 rounded-lg cursor-pointer transition-all"
                          style={plan.is_completed
                            ? { background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }
                            : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                          <CheckCircle2 className={`w-3.5 h-3.5 ${plan.is_completed ? 'text-emerald-400' : 'text-slate-500'}`} />
                        </button>
                        <button type="button" onClick={(e) => handleDeletePlan(e, plan.plan_id)}
                          className="p-1.5 rounded-lg cursor-pointer transition-all text-slate-500 hover:text-rose-400"
                          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-base font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors tracking-tight">
                      {plan.title}
                    </h3>
                    <p className="text-slate-600 text-xs line-clamp-2 mb-4 leading-relaxed">{plan.description}</p>

                    <div className="flex items-center gap-4 font-mono text-[11px] text-slate-600 pb-4"
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-cyan-700" />{plan.duration}</span>
                      <span className="flex items-center gap-1 text-emerald-700"><Wallet className="w-3 h-3" />{plan.estimated_cost}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 text-xs font-medium">
                    <span className="text-slate-600">{plan.items?.length || 0} stops</span>
                    <span className="text-cyan-500 flex items-center gap-1 group-hover:gap-2 transition-all">
                      View Itinerary <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
