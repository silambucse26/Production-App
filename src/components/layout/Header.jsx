import { FlaskConical, Volume2, VolumeX, Home, LogOut, RotateCcw, ListFilter, User, Globe } from 'lucide-react';
import { translations } from '../../utils/translations';
import { playSound } from '../../utils/audio';

export default function Header({
  activeProduct,
  litres,
  view,
  onGoHome,
  onOpenOverviewModal,
  onResetProgress,
  onLogout,
  user,
  isMuted,
  onToggleMute,
  language = 'en',
  onToggleLanguage,
}) {
  const t = translations[language] || translations.en;

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Home Navigation */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playSound('click', isMuted);
              onGoHome();
            }}
            className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition-colors cursor-pointer"
            title={t.catalog}
          >
            <FlaskConical className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold text-slate-900 tracking-tight">{t.portalTitle}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                {t.gmpCertified}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-mono font-bold text-slate-800">{activeProduct.id}</span>
              <span>•</span>
              <span className="truncate max-w-[200px] sm:max-w-xs">{activeProduct.shortName}</span>
              <span>•</span>
              <span className="font-bold text-indigo-600 font-mono">{litres} L {t.batch}</span>
            </div>
          </div>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Language Selector Button with Sound */}
          <button
            onClick={() => {
              playSound('click', isMuted);
              onToggleLanguage();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 text-xs font-black transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
            title="Switch Language / மொழியை மாற்றுக"
          >
            <Globe className="w-3.5 h-3.5 text-indigo-600" />
            <span>{language === 'ta' ? 'English' : 'தமிழ்'}</span>
          </button>

          {/* Home / Catalog Button */}
          <button
            onClick={() => {
              playSound('click', isMuted);
              onGoHome();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
              view === 'home'
                ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
            }`}
          >
            <Home className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden sm:inline">{t.catalog}</span>
          </button>

          {/* Step Index (when in process) */}
          {view === 'process' && (
            <button
              onClick={() => {
                playSound('click', isMuted);
                onOpenOverviewModal();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold transition-colors cursor-pointer"
              title="All Steps Overview"
            >
              <ListFilter className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">{t.steps}</span>
            </button>
          )}

          {/* Reset progress (when in process) */}
          {view === 'process' && (
            <button
              onClick={onResetProgress}
              className="p-2 rounded-xl bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 border border-slate-200 text-xs transition-colors cursor-pointer"
              title="Restart from Step 1"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          {/* Sound Toggle */}
          <button
            onClick={() => {
              playSound('click', !isMuted ? true : false); // play sound right before muting if unmuted
              onToggleMute();
            }}
            className={`p-2 rounded-xl border text-xs font-medium transition-colors cursor-pointer ${
              isMuted
                ? 'bg-white text-slate-400 border-slate-200 hover:text-slate-700'
                : 'bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-100'
            }`}
            title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* User Profile Badge & Logout */}
          <div className="flex items-center gap-1.5 pl-1.5 border-l border-slate-200">
            {user && (
              <div
                className="hidden md:inline-flex items-center gap-1.5 text-xs text-slate-700 font-semibold px-2.5 py-1.5 rounded-xl bg-slate-100 border border-slate-200 shadow-2xs"
                title="Active Operator"
              >
                <User className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span>{user.operatorName || user.phone}</span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100/70 px-1 py-0.5 rounded">
                  {user.licenseNo || 'CHM-LAB-9921'}
                </span>
              </div>
            )}
            <button
              onClick={onLogout}
              className="flex items-center gap-1 p-2 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-700 hover:border-red-200 text-slate-600 border border-slate-200 text-xs transition-colors cursor-pointer"
              title={t.signOut}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
