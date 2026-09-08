import { useState, useEffect } from 'react';
import LoginScreen from './components/auth/LoginScreen';
import Header from './components/layout/Header';
import ProgressTracker from './components/layout/ProgressTracker';
import ProductCatalog from './components/home/ProductCatalog';
import PreCheckList from './components/precheck/PreCheckList';
import StepCard from './components/step/StepCard';
import StepOverviewModal from './components/step/StepOverviewModal';
import CompletionModal from './components/summary/CompletionModal';
import { PRODUCTS, MAX_LITRES } from './data/productsData';
import { playSound } from './utils/audio';

export default function App() {
  // Auth State (starts with Login screen as requested)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // App Language: 'en' | 'ta' (persisted in localStorage)
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('chimetech_lang') || 'en';
  });

  const handleToggleLanguage = () => {
    const next = language === 'en' ? 'ta' : 'en';
    setLanguage(next);
    localStorage.setItem('chimetech_lang', next);
  };

  // App Navigation: 'home' (Catalog) | 'precheck' (Pre-production checklist) | 'process' (Step-by-step)
  const [view, setView] = useState('home');

  // Selected Product & Batch Litres (default 700L for MiDip, max 700L)
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [litres, setLitres] = useState(PRODUCTS[0]?.defaultLitres || 700);

  // Compounding Process State
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [checkedItemsByStep, setCheckedItemsByStep] = useState({});
  const [isMuted, setIsMuted] = useState(false);
  const [isOverviewModalOpen, setIsOverviewModalOpen] = useState(false);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);
  const [preCheckData, setPreCheckData] = useState(null);

  // Dynamically calculate the steps for the selected product & chosen litres!
  const currentSteps = selectedProduct.generateSteps(litres);
  const currentStep = currentSteps[currentStepIndex] || currentSteps[0];
  const currentCheckedItems = checkedItemsByStep[currentStepIndex] || {};

  // Keyboard navigation when in process view
  useEffect(() => {
    if (!isAuthenticated || view !== 'process' || isOverviewModalOpen || isCompletionModalOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthenticated, view, currentStepIndex, currentSteps.length, isOverviewModalOpen, isCompletionModalOpen, checkedItemsByStep]);

  // Auth Handlers
  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setView('home');
  };

  const handleLogout = () => {
    playSound('click', isMuted);
    setIsAuthenticated(false);
    setUser(null);
    setView('home');
  };

  // Product Selection & Production Flow Handlers
  const handleSelectProduct = (prod) => {
    playSound('click', isMuted);
    setSelectedProduct(prod);
    setLitres(prod.defaultLitres || 700);
  };

  const handleChangeLitres = (newLitreVal) => {
    const num = typeof newLitreVal === 'number' ? newLitreVal : parseFloat(newLitreVal);
    setLitres(isNaN(num) ? 0 : Math.min(MAX_LITRES, Math.max(0, num)));
  };

  const handleStartPreCheck = (prod = selectedProduct) => {
    playSound('click', isMuted);
    setSelectedProduct(prod);
    setLitres(prod.defaultLitres || 700);
    setView('precheck');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreCheckComplete = (data) => {
    if (data) setPreCheckData(data);
    playSound('next', isMuted);
    setCurrentStepIndex(0);
    setCheckedItemsByStep({});
    setView('process');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    playSound('click', isMuted);
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isStepConfirmed = (stepIdx) => {
    const checks = checkedItemsByStep[stepIdx];
    return !!(checks && checks[0]);
  };

  // Step Navigation Handlers (Only go to next step if checklist is done!)
  const handleNext = () => {
    if (!isStepConfirmed(currentStepIndex)) {
      playSound('warning', isMuted);
      return;
    }
    if (currentStepIndex < currentSteps.length - 1) {
      playSound('next', isMuted);
      setCurrentStepIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      playSound('prev', isMuted);
      setCurrentStepIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectStep = (idx) => {
    if (idx >= 0 && idx < currentSteps.length) {
      // Operators cannot jump forward over unconfirmed steps
      if (idx > currentStepIndex) {
        for (let s = 0; s < idx; s++) {
          if (!isStepConfirmed(s)) {
            playSound('warning', isMuted);
            return;
          }
        }
      }
      playSound('click', isMuted);
      setCurrentStepIndex(idx);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleToggleCheckItem = (itemIdx) => {
    setCheckedItemsByStep((prev) => {
      const stepChecks = { ...(prev[currentStepIndex] || {}) };
      stepChecks[itemIdx] = !stepChecks[itemIdx];
      return {
        ...prev,
        [currentStepIndex]: stepChecks,
      };
    });
  };

  const handleResetProgress = () => {
    playSound('click', isMuted);
    setCurrentStepIndex(0);
    setCheckedItemsByStep({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleComplete = () => {
    if (!isStepConfirmed(currentSteps.length - 1)) {
      playSound('warning', isMuted);
      return;
    }
    playSound('complete', isMuted);
    setIsCompletionModalOpen(true);
  };

  // 1. If not authenticated, render Login Screen
  if (!isAuthenticated) {
    return (
      <LoginScreen
        onLogin={handleLogin}
        isMuted={isMuted}
        language={language}
        onToggleLanguage={handleToggleLanguage}
      />
    );
  }

  // 2. Authenticated: Render Light Theme Application
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-indigo-600 selection:text-white relative">
      {/* Top Main Navigation Header */}
      <Header
        activeProduct={selectedProduct}
        litres={litres}
        view={view}
        onGoHome={handleGoHome}
        onOpenOverviewModal={() => setIsOverviewModalOpen(true)}
        onResetProgress={handleResetProgress}
        onLogout={handleLogout}
        user={user}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted((prev) => !prev)}
        language={language}
        onToggleLanguage={handleToggleLanguage}
      />

      {/* Progress Tracker (Only visible when active in compounding process) */}
      {view === 'process' && (
        <ProgressTracker
          steps={currentSteps}
          currentStepIndex={currentStepIndex}
          onSelectStep={handleSelectStep}
          language={language}
          checkedItemsByStep={checkedItemsByStep}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {view === 'home' && (
          <ProductCatalog
            products={PRODUCTS}
            onSelectProduct={handleSelectProduct}
            onStartPreCheck={handleStartPreCheck}
            isMuted={isMuted}
            language={language}
          />
        )}

        {view === 'precheck' && (
          <PreCheckList
            product={selectedProduct}
            litres={litres}
            onChangeLitres={handleChangeLitres}
            onAllChecked={handlePreCheckComplete}
            onBack={handleGoHome}
            isMuted={isMuted}
            user={user}
            language={language}
          />
        )}

        {view === 'process' && (
          <StepCard
            step={currentStep}
            currentStepIndex={currentStepIndex}
            totalSteps={currentSteps.length}
            activeProduct={selectedProduct}
            litres={litres}
            onPrev={handlePrev}
            onNext={handleNext}
            onComplete={handleComplete}
            isMuted={isMuted}
            checkedItems={currentCheckedItems}
            onToggleCheckItem={handleToggleCheckItem}
            language={language}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 px-4 sm:px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            {language === 'ta'
              ? 'கைமர்டெக் ஆய்வக அமைப்புகள் • ஜிஎம்பி மருந்து தயாரிப்பு இயந்திரம்'
              : 'Chimetech Laboratory Systems • GMP Formulation Engine'}
          </div>
          <div className="font-mono text-slate-600">
            {language === 'ta' ? 'தேர்வு:' : 'Selected:'}{' '}
            <span className="font-bold text-slate-900">{selectedProduct.id}</span> ({litres}{' '}
            {language === 'ta' ? 'லிட்டர் தொகுதி' : 'L Batch'})
          </div>
        </div>
      </footer>

      {/* Modals */}
      <StepOverviewModal
        isOpen={isOverviewModalOpen}
        onClose={() => setIsOverviewModalOpen(false)}
        steps={currentSteps}
        currentStepIndex={currentStepIndex}
        onSelectStep={handleSelectStep}
        activeProduct={selectedProduct}
        litres={litres}
        language={language}
        checkedItemsByStep={checkedItemsByStep}
      />

      <CompletionModal
        isOpen={isCompletionModalOpen}
        onClose={() => setIsCompletionModalOpen(false)}
        product={selectedProduct}
        litres={litres}
        onRestart={handleResetProgress}
        onGoHome={handleGoHome}
        preCheckData={preCheckData}
        language={language}
      />
    </div>
  );
}
