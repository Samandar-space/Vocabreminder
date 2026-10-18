import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { BottomNav } from './components/common/BottomNav';
import { MoreMenuModal } from './components/common/MoreMenuModal';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { Toast } from './components/common/Toast';
import { OfflineBanner } from './components/common/OfflineBanner';
import { Plus } from 'lucide-react';

// Auth & Onboarding
import { AuthFlow } from './components/auth/AuthFlow';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';

// Main Views
import { HomeDashboard } from './components/home/HomeDashboard';
import { WordList } from './components/words/WordList';
import { ReviewSession } from './components/review/ReviewSession';
import { ProfileSettings } from './components/profile/ProfileSettings';

// Learning Modules
import { WritingChecker } from './components/learning/WritingChecker';
import { ReadingSection } from './components/learning/ReadingSection';
import { GrammarSection } from './components/learning/GrammarSection';
import { LevelPlacementTest } from './components/learning/LevelPlacementTest';
import { MockTestSection } from './components/learning/MockTestSection';
import { MiniTest } from './components/learning/MiniTest';

// Gamification & Market
import { MarketView } from './components/market/MarketView';
import { GameZone } from './components/games/GameZone';

// Modals
import { AddWordModal } from './components/words/AddWordModal';
import { BackupModal } from './components/words/BackupModal';
import { NotificationSimulator } from './components/notifications/NotificationSimulator';
import { QuickPopupQuizModal } from './components/notifications/QuickPopupQuizModal';

const MainAppContent = () => {
  const { user, currentTab, setCurrentTab } = useApp();

  // Modals state
  const [isAddWordOpen, setIsAddWordOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMiniTestOpen, setIsMiniTestOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isBackupOpen, setIsBackupOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isQuickQuizOpen, setIsQuickQuizOpen] = useState(false);
  const [quickQuizWordId, setQuickQuizWordId] = useState(null);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Listen for ?popup=quiz query param and Service Worker messages
  useEffect(() => {
    // 1. Check URL parameters (e.g. from notification click)
    const params = new URLSearchParams(window.location.search);
    if (params.get('popup') === 'quiz') {
      const wordId = params.get('wordId');
      if (wordId) setQuickQuizWordId(wordId);
      setIsQuickQuizOpen(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // 2. Listen for postMessage from active Service Worker
    if ('serviceWorker' in navigator) {
      const handleSwMessage = (event) => {
        if (event.data && event.data.type === 'OPEN_QUICK_QUIZ') {
          if (event.data.wordId) setQuickQuizWordId(event.data.wordId);
          setIsQuickQuizOpen(true);
        }
      };
      navigator.serviceWorker.addEventListener('message', handleSwMessage);
      return () => navigator.serviceWorker.removeEventListener('message', handleSwMessage);
    }
  }, []);

  // 1. If user is not authenticated -> show AuthFlow in centered card
  if (!user.isAuth) {
    return (
      <div className="auth-centered-wrapper">
        <div className="auth-card">
          <AuthFlow onComplete={() => setCurrentTab('home')} />
        </div>
        <Toast />
      </div>
    );
  }

  // 2. If user is authenticated but not yet onboarded -> show OnboardingFlow
  if (!user.isOnboarded) {
    return (
      <div className="auth-centered-wrapper">
        <div className="auth-card">
          <OnboardingFlow onFinish={() => setCurrentTab('home')} />
        </div>
        <Toast />
      </div>
    );
  }

  // 3. Mini test overlay modal
  if (isMiniTestOpen) {
    return (
      <div className="app-shell">
        <div className="app-main-workspace" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <MiniTest
            onClose={() => setIsMiniTestOpen(false)}
            onOpenAddWord={() => { setIsMiniTestOpen(false); setIsAddWordOpen(true); }}
          />
        </div>
        <Toast />
      </div>
    );
  }

  // 4. Main App Responsive Shell (Desktop Sidebar + Mobile BottomNav)
  return (
    <div className="app-shell">
      {/* Desktop & Laptop Sticky Sidebar (Visible on screens >= 768px) */}
      <Sidebar
        onOpenAddModal={() => setIsAddWordOpen(true)}
        onOpenBackup={() => setIsBackupOpen(true)}
      />

      {/* Main Workspace Area */}
      <div className="app-main-workspace">
        {/* Offline Alert Banner */}
        <OfflineBanner />

        {/* Top Header Bar */}
        <Header 
          onNotificationClick={() => setIsNotificationOpen(true)} 
          onOpenAddModal={() => setIsAddWordOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        {/* Main Workspace Content (Scrollable) */}
        <main className="app-main-content">
          {currentTab === 'home' && (
            <HomeDashboard
              onOpenAddModal={() => setIsAddWordOpen(true)}
              onStartReview={() => setCurrentTab('review')}
              onStartMiniTest={() => setIsMiniTestOpen(true)}
              onStartQuickQuiz={() => setIsQuickQuizOpen(true)}
            />
          )}

          {currentTab === 'words' && (
            <WordList onOpenAddModal={() => setIsAddWordOpen(true)} />
          )}

          {currentTab === 'review' && (
            <ReviewSession onFinish={() => setCurrentTab('home')} />
          )}

          {currentTab === 'profile' && (
            <ProfileSettings onOpenNotifications={() => setIsNotificationOpen(true)} />
          )}

          {/* Interactive Practice Modules */}
          {currentTab === 'mock' && (
            <MockTestSection onBack={() => setCurrentTab('home')} />
          )}

          {currentTab === 'games' && (
            <GameZone onBack={() => setCurrentTab('home')} />
          )}

          {currentTab === 'market' && (
            <MarketView onBack={() => setCurrentTab('home')} />
          )}

          {currentTab === 'writing' && (
            <WritingChecker onBack={() => setCurrentTab('home')} />
          )}

          {currentTab === 'reading' && (
            <ReadingSection onBack={() => setCurrentTab('home')} />
          )}

          {currentTab === 'grammar' && (
            <GrammarSection onBack={() => setCurrentTab('home')} />
          )}

          {currentTab === 'levelTest' && (
            <LevelPlacementTest
              onBack={() => setCurrentTab('home')}
              onComplete={() => setCurrentTab('home')}
            />
          )}
        </main>

        {/* Mobile Floating Action Button (Quick Add Word) */}
        {(currentTab === 'home' || currentTab === 'words') && (
          <button 
            className="mobile-fab btn-press"
            onClick={() => setIsAddWordOpen(true)}
            aria-label="Yangi so'z qo'shish"
            title="Yangi so'z qo'shish"
          >
            <Plus size={28} strokeWidth={2.6} />
          </button>
        )}

        {/* Bottom Navigation (Only visible on mobile screens < 768px) */}
        <BottomNav onOpenMoreMenu={() => setIsMoreMenuOpen(true)} />
      </div>

      {/* Modals & Drawers */}
      <AddWordModal
        isOpen={isAddWordOpen}
        onClose={() => setIsAddWordOpen(false)}
      />

      <NotificationSimulator
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        onOpenQuickQuiz={() => setIsQuickQuizOpen(true)}
      />

      <QuickPopupQuizModal
        isOpen={isQuickQuizOpen}
        onClose={() => {
          setIsQuickQuizOpen(false);
          setQuickQuizWordId(null);
        }}
        initialWordId={quickQuizWordId}
      />

      <MoreMenuModal
        isOpen={isMoreMenuOpen}
        onClose={() => setIsMoreMenuOpen(false)}
        onOpenBackup={() => setIsBackupOpen(true)}
      />

      <BackupModal
        isOpen={isBackupOpen}
        onClose={() => setIsBackupOpen(false)}
      />

      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onOpenAddModal={() => setIsAddWordOpen(true)}
        onOpenBackup={() => setIsBackupOpen(true)}
      />

      {/* Toast Notifications */}
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}