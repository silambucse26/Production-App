import { Award, CheckCircle2, RotateCcw, Printer, Sparkles, X, ShieldCheck, Home } from 'lucide-react';
import Badge from '../common/Badge';
import { translations } from '../../utils/translations';

export default function CompletionModal({
  isOpen,
  onClose,
  product,
  litres,
  onRestart,
  onGoHome,
  preCheckData,
  language = 'en',
}) {
  if (!isOpen) return null;

  const t = translations[language] || translations.en;
  const batchNumber = `CHM-${Math.floor(100000 + Math.random() * 900000)}`;
  const dateStr = new Date().toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-white border border-slate-200 rounded-3xl max-w-2xl w-full my-8 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gradient Banner */}
        <div className="h-2 bg-gradient-to-r from-emerald-500 via-indigo-600 to-cyan-500" />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 text-center">
          {/* Header icon */}
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 border border-emerald-200 mx-auto mb-4 flex items-center justify-center shadow-lg shadow-emerald-100">
            <Award className="w-8 h-8" />
          </div>

          <Badge variant="emerald" size="md" className="mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.formulationCertified}</span>
          </Badge>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-1">
            {t.medicinePreparedSuccess}
          </h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
            {t.completionSubtitle}
          </p>

          {/* Finished Product Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left mb-6 flex flex-col sm:flex-row items-center gap-5">
            <div className="w-28 h-28 rounded-2xl overflow-hidden shrink-0 border border-slate-200 shadow-md bg-white">
              <img
                src={product.image || '/images/products/midip_antiseptic.jpg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  {t.qcPassed}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-white">
                  {product.id}
                </span>
                <h4 className="text-base font-bold text-slate-900 truncate">{product.name}</h4>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3 text-xs text-slate-600">
                <div>
                  <span className="text-slate-400 font-medium">{t.batchNumberLabel}</span>{' '}
                  <span className="font-mono font-bold text-slate-800">{batchNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">{t.targetOutputLabel}</span>{' '}
                  <span className="font-bold text-indigo-700 font-mono">
                    {litres} {language === 'ta' ? 'லிட்டர்' : 'Litres'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">{t.compoundedLabel}</span>{' '}
                  <span className="text-slate-800 font-medium">{dateStr}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">{t.sterilityLabel}</span>{' '}
                  <span className="text-emerald-700 font-semibold">{t.sterilityValue}</span>
                </div>
              </div>

              {/* BMR Sign-off Verifier Names */}
              {preCheckData && (
                <div className="mt-3 pt-2.5 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="text-slate-400 block font-medium">{t.qaClearanceBadge}</span>
                    <span className="font-bold text-emerald-800 truncate block">
                      ✓ {preCheckData.qaOfficerName || (language === 'ta' ? 'QA அதிகாரி' : 'QA Officer')}
                    </span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="text-slate-400 block font-medium">{t.cleanedByBadge}</span>
                    <span className="font-bold text-cyan-800 truncate block">
                      ✓ {preCheckData.cleanedBy?.name || (language === 'ta' ? 'உற்பத்திப் பணியாளர்' : 'Production Tech')}
                    </span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="text-slate-400 block font-medium">{t.checkedByBadge}</span>
                    <span className="font-bold text-amber-800 truncate block">
                      ✓ {preCheckData.checkedBy?.name || (language === 'ta' ? 'உற்பத்திப் பொறுப்பாளர்' : 'Production Incharge')}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-sm font-bold transition-colors cursor-pointer shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>{t.printReportBtn}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onRestart();
                onClose();
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.restartBtn} {product.id}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onGoHome();
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>{t.returnCatalogBtn}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
