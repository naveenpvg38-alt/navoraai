import React, { useState, useEffect } from 'react';
import { 
  User, 
  Settings, 
  Bookmark, 
  Heart, 
  CheckCircle2, 
  Clock, 
  Wallet, 
  MapPin, 
  Trash2, 
  ArrowRight, 
  Sparkles, 
  Save, 
  LogOut,
  Sliders
} from 'lucide-react';
import { api } from '../api';

export default function Profile({ 
  user, 
  onSelectPlan, 
  onLogout, 
  defaultTab = 'saved',
  onOpenPlanner 
}) {
  const [activeTab, setActiveTab] = useState(defaultTab); // 'saved', 'favourites', 'completed', 'preferences'
  const [plans, setPlans] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingPref, setSavingPref] = useState(false);
  const [prefSuccess, setPrefSuccess] = useState(false);

  // Preference form state
  const [name, setName] = useState(user?.name || '');
  const [mood, setMood] = useState('Relaxed');
  const [budget, setBudget] = useState('Moderate ($$)');
  const [transport, setTransport] = useState('Metro / Public Transit');
  const [location, setLocation] = useState('Bengaluru');

  const fetchProfileAndPlans = async () => {
    try {
      setLoading(true);
      const [profRes, plansRes] = await Promise.all([
        api.getProfile(),
        api.getPlans()
      ]);

      setProfileData(profRes);
      setPlans(plansRes);

      if (profRes.user) {
        setName(profRes.user.name || '');
      }
      if (profRes.preferences) {
        setMood(profRes.preferences.mood || 'Relaxed');
        setBudget(profRes.preferences.budget || 'Moderate ($$)');
        setTransport(profRes.preferences.transport || 'Metro / Public Transit');
        setLocation(profRes.preferences.location || 'Bengaluru');
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileAndPlans();
  }, []);

  const handleDeletePlan = async (e, planId) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this saved outing plan?')) return;
    try {
      await api.deletePlan(planId);
      setPlans(plans.filter(p => p.plan_id !== planId));
    } catch (err) {
      alert('Failed to delete plan.');
    }
  };

  const handleToggleFavourite = async (e, planId) => {
    e.stopPropagation();
    try {
      const res = await api.toggleFavourite(planId);
      setPlans(plans.map(p => p.plan_id === planId ? { ...p, is_favourite: res.is_favourite } : p));
    } catch (err) {
      console.error('Favourite error:', err);
    }
  };

  const handleToggleComplete = async (e, planId) => {
    e.stopPropagation();
    try {
      const res = await api.toggleComplete(planId);
      setPlans(plans.map(p => p.plan_id === planId ? { ...p, is_completed: res.is_completed } : p));
    } catch (err) {
      console.error('Complete error:', err);
    }
  };

  const handleSavePreferences = async (e) => {
    e.preventDefault();
    setSavingPref(true);
    try {
      await api.updateProfile({
        name,
        preferences: {
          mood,
          budget,
          transport,
          location
        }
      });
      setPrefSuccess(true);
      setTimeout(() => setPrefSuccess(false), 2500);
    } catch (err) {
      alert('Failed to update preferences.');
    } finally {
      setSavingPref(false);
    }
  };

  const filteredPlans = plans.filter(p => {
    if (activeTab === 'favourites') return p.is_favourite;
    if (activeTab === 'completed') return p.is_completed;
    return true; // 'saved' shows all
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pb-24 animate-fade-in">
      {/* Profile Banner */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 mb-8 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-violet-600 flex items-center justify-center text-2xl font-extrabold text-white uppercase shadow-glow-cyan/40">
              {user?.name ? user.name[0] : 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold font-display text-white">{user?.name}</h1>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 text-[10px] font-semibold border border-cyan-500/20">
                  Explorer
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{user?.email}</p>
              <p className="text-[11px] text-slate-400 mt-1">Member since {new Date(user?.created_at || Date.now()).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenPlanner}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-semibold shadow-glow-cyan/30 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Plan New Outing</span>
            </button>
            <button
              onClick={onLogout}
              className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-rose-500/10 border border-slate-800 hover:border-rose-500/30 text-slate-400 hover:text-rose-400 transition-colors"
              title="Log Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* User Statistics Counters */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6 pt-6 border-t border-slate-800/80">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
            <div className="text-xl sm:text-2xl font-bold font-display text-cyan-400">
              {plans.length}
            </div>
            <div className="text-[10px] uppercase font-semibold text-slate-400 mt-0.5">Saved Plans</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
            <div className="text-xl sm:text-2xl font-bold font-display text-rose-400">
              {plans.filter(p => p.is_favourite).length}
            </div>
            <div className="text-[10px] uppercase font-semibold text-slate-400 mt-0.5">Favourites</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
            <div className="text-xl sm:text-2xl font-bold font-display text-emerald-400">
              {plans.filter(p => p.is_completed).length}
            </div>
            <div className="text-[10px] uppercase font-semibold text-slate-400 mt-0.5">Completed</div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation (Section 26) */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('saved')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'saved'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved Plans ({plans.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('favourites')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'favourites'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Favourites ({plans.filter(p => p.is_favourite).length})</span>
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'completed'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Completed ({plans.filter(p => p.is_completed).length})</span>
        </button>

        <button
          onClick={() => setActiveTab('preferences')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'preferences'
              ? 'bg-violet-500/20 text-violet-300 border border-violet-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Preferences</span>
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'preferences' ? (
        /* Preferences & Settings Form */
        <div className="max-w-2xl p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800">
          <h2 className="text-lg font-bold font-display text-white mb-2">Default Outing Preferences</h2>
          <p className="text-xs text-slate-400 mb-6">These defaults will automatically pre-fill your outing planner.</p>

          <form onSubmit={handleSavePreferences} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Default Mood</label>
                <select
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white"
                >
                  <option value="Relaxed">Relaxed</option>
                  <option value="Adventurous">Adventurous</option>
                  <option value="Romantic">Romantic</option>
                  <option value="Energetic">Energetic</option>
                  <option value="Foodie">Foodie</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Nature Explorer">Nature Explorer</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Default Budget</label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white"
                >
                  <option value="Free ($0)">Free ($0)</option>
                  <option value="Budget ($)">Budget ($)</option>
                  <option value="Moderate ($$)">Moderate ($$)</option>
                  <option value="Luxury ($$$)">Luxury ($$$)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Default Transport</label>
                <select
                  value={transport}
                  onChange={(e) => setTransport(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white"
                >
                  <option value="Scenic Walk">Scenic Walk</option>
                  <option value="Bicycle / Scooter">Bicycle</option>
                  <option value="Metro / Public Transit">Metro / Transit</option>
                  <option value="Car / Cab">Car / Cab</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Default City</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={savingPref}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{savingPref ? 'Saving...' : prefSuccess ? 'Saved Successfully!' : 'Save Preferences'}</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Plans Grid */
        <div>
          {loading ? (
            <div className="text-center py-16 text-slate-400 text-sm">
              <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <span>Loading saved itineraries...</span>
            </div>
          ) : filteredPlans.length === 0 ? (
            <div className="text-center py-16 rounded-3xl glass-card border border-slate-800 p-8">
              <Bookmark className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white mb-1">
                {activeTab === 'favourites' ? 'No favourite plans yet' : activeTab === 'completed' ? 'No completed plans yet' : 'No saved plans yet'}
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6">
                Use the AI planner to generate personalized outing plans and save them here for your trips.
              </p>
              <button
                onClick={onOpenPlanner}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-xs font-semibold shadow-glow-cyan/30"
              >
                Create Your First Plan
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlans.map((plan) => (
                <div
                  key={plan.plan_id}
                  onClick={() => onSelectPlan(plan)}
                  className="p-6 rounded-2xl glass-card border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 text-[11px] font-bold border border-cyan-500/20">
                        {plan.match_score || 95}% Match
                      </span>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={(e) => handleToggleFavourite(e, plan.plan_id)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            plan.is_favourite
                              ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                          title="Toggle Favourite"
                        >
                          <Heart className={`w-3.5 h-3.5 ${plan.is_favourite ? 'fill-rose-500' : ''}`} />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleToggleComplete(e, plan.plan_id)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            plan.is_completed
                              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                          title="Mark Completed"
                        >
                          <CheckCircle2 className={`w-3.5 h-3.5 ${plan.is_completed ? 'fill-emerald-500 text-slate-950' : ''}`} />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleDeletePlan(e, plan.plan_id)}
                          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/30 transition-colors"
                          title="Delete Plan"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-base font-bold font-display text-white group-hover:text-cyan-300 transition-colors mb-2">
                      {plan.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                      {plan.description}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-slate-400 py-3 border-t border-slate-800/80">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-cyan-400" /> {plan.duration}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-emerald-400">
                        <Wallet className="w-3 h-3" /> {plan.estimated_cost}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/50 flex items-center justify-between text-xs text-cyan-400 font-semibold group-hover:text-cyan-300">
                    <span>{plan.items?.length || 0} Curated Stops</span>
                    <span className="flex items-center gap-1">
                      View Itinerary <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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
