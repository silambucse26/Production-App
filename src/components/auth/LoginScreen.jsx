import { useState } from 'react';
import {
  Phone,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  FlaskConical,
  ArrowRight,
  AlertCircle,
  KeyRound,
  Globe,
} from 'lucide-react';
import { playSound } from '../../utils/audio';
import { translations } from '../../utils/translations';

export default function LoginScreen({ onLogin, isMuted, language = 'en', onToggleLanguage }) {
  const t = translations[language] || translations.en;

  // Read credentials from .env file (Vite VITE_ prefix)
  const envPhone = import.meta.env.VITE_AUTH_PHONE || '9876543210';
  const envPassword = import.meta.env.VITE_AUTH_PASSWORD || 'admin123';

  // State
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Submit credentials
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const cleanInputPhone = phoneNumber.replace(/\D/g, '');
    const cleanEnvPhone = envPhone.replace(/\D/g, '');

    if (!phoneNumber.trim()) {
      setError(t.phoneRequiredError || 'Please enter your registered mobile phone number.');
      playSound('prev', isMuted);
      return;
    }

    if (!password) {
      setError(t.passwordRequiredError || 'Please enter your password.');
      playSound('prev', isMuted);
      return;
    }

    // Verify against .env credentials
    if (cleanInputPhone !== cleanEnvPhone || password !== envPassword) {
      setError(t.invalidCredentialsError || 'Invalid credentials. Check your phone number or password.');
      playSound('prev', isMuted);
      return;
    }

    setError('');
    playSound('next', isMuted);
    onLogin({
      phone: phoneNumber,
      operatorName: 'Dr. Pharmacist',
      role: 'Lead Compounding Chemist',
      licenseNo: 'CHM-LAB-9921',
      authMethod: 'password',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50/40 to-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 selection:bg-indigo-600 selection:text-white relative">
      {/* Decorative subtle background ambient glows */}
      <div className="fixed top-12 left-1/3 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-12 right-1/3 w-96 h-96 bg-cyan-200/40 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Language Switcher Bar on Login Screen */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
        <button
          type="button"
          onClick={() => {
            playSound('click', isMuted);
            if (onToggleLanguage) onToggleLanguage();
          }}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white/90 hover:bg-white text-indigo-900 border border-slate-200 shadow-md text-xs font-black transition-all cursor-pointer hover:scale-105 active:scale-95"
          title="Switch Language / மொழியை மாற்றுக"
        >
          <Globe className="w-4 h-4 text-indigo-600" />
          <span>{language === 'ta' ? 'English' : 'தமிழ்'}</span>
        </button>
      </div>

      <div className="max-w-md w-full">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 mb-3">
            <FlaskConical className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Chimetech PharmaCraft
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {language === 'ta'
              ? 'ஜிஎம்பி சான்றளிக்கப்பட்ட மருந்து தயாரிப்பு தளம்'
              : 'GMP Certified Medicine Compounding Portal'}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7 shadow-xl shadow-slate-200/50">
          {/* Card Top Title */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                <KeyRound className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">{t.loginHeaderTitle}</h2>
                <p className="text-[11px] text-slate-400">{t.loginHeaderSubtitle}</p>
              </div>
            </div>

            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {t.gmpCertified}
            </span>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            {/* Phone Number Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                {t.phoneLabel}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  placeholder={t.phonePlaceholder}
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    if (error) setError('');
                  }}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                {t.passwordLabel}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t.passwordPlaceholder}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  className="w-full pl-10 pr-11 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => {
                    playSound('click', isMuted);
                    setShowPassword((prev) => !prev);
                  }}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/25 active:scale-[0.99] transition-all cursor-pointer mt-3"
            >
              <span>{t.authenticateBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Security badge */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mt-5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>{t.securityBadgeText}</span>
        </div>
      </div>
    </div>
  );
}
