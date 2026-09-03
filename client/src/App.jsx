import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import AuthModal from './components/AuthModal';
import Home from './components/Home';
import Planner from './components/Planner';
import GenerationLoader from './components/GenerationLoader';
import ItineraryView from './components/ItineraryView';
import Profile from './components/Profile';
import { api } from './api';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState(null);
  const [activeView, setActiveView] = useState('home'); // 'home', 'planner', 'itinerary', 'profile', 'saved'
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [pendingPreferences, setPendingPreferences] = useState({});
  const [plannerInitialPrefs, setPlannerInitialPrefs] = useState({});

  // Check existing session on load
  useEffect(() => {
    const token = localStorage.getItem('navora_token');
    if (token) {
      api.getMe()
        .then((res) => {
          if (res.user) setUser(res.user);
        })
        .catch(() => {
          localStorage.removeItem('navora_token');
        });
    }
  }, []);

  const handleOpenAuth = (mode = 'login') => {
    setAuthModal({ isOpen: true, mode });
  };

  const handleCloseAuth = () => {
    setAuthModal({ isOpen: false, mode: 'login' });
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('navora_token');
    setUser(null);
    setActiveView('home');
  };

  const handleStartPlanning = () => {
    setActiveView('planner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickTemplate = (preset) => {
    setPlannerInitialPrefs(preset);
    setActiveView('planner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGeneratePlan = async (preferences) => {
    setPendingPreferences(preferences);
    setIsGenerating(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      // Simulate minimum 2.5s for the immersive AI multi-step animation
      const [planResult] = await Promise.all([
        api.generatePlan(preferences),
        new Promise((resolve) => setTimeout(resolve, 2800))
      ]);

      setCurrentPlan(planResult);
      setActiveView('itinerary');
    } catch (err) {
      alert(err.message || 'Failed to generate plan.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSavePlan = async (planToSave) => {
    try {
      const res = await api.savePlan(planToSave);
      setCurrentPlan((prev) => ({
        ...prev,
        plan_id: res.plan_id
      }));
      return res;
    } catch (err) {
      alert(err.message || 'Failed to save plan.');
    }
  };

  const handleToggleFavourite = async (planId) => {
    try {
      const res = await api.toggleFavourite(planId);
      setCurrentPlan((prev) => (prev ? { ...prev, is_favourite: res.is_favourite } : prev));
    } catch (err) {
      console.error('Favourite error:', err);
    }
  };

  const handleToggleComplete = async (planId) => {
    try {
      const res = await api.toggleComplete(planId);
      setCurrentPlan((prev) => (prev ? { ...prev, is_completed: res.is_completed } : prev));
    } catch (err) {
      console.error('Complete error:', err);
    }
  };

  const handleSelectSavedPlan = (plan) => {
    setCurrentPlan(plan);
    setActiveView('itinerary');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#06080F] text-slate-100 flex flex-col font-sans">
      {/* 1. Splash Screen */}
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      {/* 2. Top Navigation Bar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        user={user}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
      />

      {/* 3. Main Views */}
      <main className="flex-grow">
        {isGenerating ? (
          <GenerationLoader preferences={pendingPreferences} />
        ) : (
          <>
            {activeView === 'home' && (
              <Home
                onStartPlanning={handleStartPlanning}
                onQuickTemplate={handleQuickTemplate}
              />
            )}

            {activeView === 'planner' && (
              <Planner
                onGenerate={handleGeneratePlan}
                initialPreferences={plannerInitialPrefs}
              />
            )}

            {activeView === 'itinerary' && (
              <ItineraryView
                plan={currentPlan}
                user={user}
                onSave={handleSavePlan}
                onToggleFavourite={handleToggleFavourite}
                onToggleComplete={handleToggleComplete}
                onBack={() => setActiveView('planner')}
                onOpenAuth={handleOpenAuth}
              />
            )}

            {activeView === 'profile' && user && (
              <Profile
                user={user}
                onSelectPlan={handleSelectSavedPlan}
                onLogout={handleLogout}
                defaultTab="saved"
                onOpenPlanner={handleStartPlanning}
              />
            )}

            {activeView === 'saved' && user && (
              <Profile
                user={user}
                onSelectPlan={handleSelectSavedPlan}
                onLogout={handleLogout}
                defaultTab="saved"
                onOpenPlanner={handleStartPlanning}
              />
            )}
          </>
        )}
      </main>

      {/* 4. Mobile Bottom Navigation */}
      <MobileNav
        activeView={activeView}
        setActiveView={setActiveView}
        user={user}
        onOpenAuth={handleOpenAuth}
      />

      {/* 5. Authentication Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        initialMode={authModal.mode}
        onClose={handleCloseAuth}
        onSuccess={handleAuthSuccess}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-8 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-400 glass-card">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-white">✦ NAVORA AI</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">“Plan Less. Experience Tumkur.”</span>
          </div>
          <div>Website Version • Prepared for Academic Project Submission</div>
        </div>
      </footer>
    </div>
  );
}
