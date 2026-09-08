import { ArrowLeft, ArrowRight, Award, Lock, CheckCircle2 } from 'lucide-react';
import { translations } from '../../utils/translations';

export default function StepNavigation({
  currentStepIndex,
  totalSteps,
  onPrev,
  onNext,
  onComplete,
  language = 'en',
  canProceed = false,
}) {
  const t = translations[language] || translations.en;
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === totalSteps - 1;

  return (
    <div className="space-y-2 pt-5 border-t border-slate-200">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Previous Button */}
        <button
          type="button"
          onClick={onPrev}
          disabled={isFirstStep}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl border text-sm font-bold transition-all ${
            isFirstStep
              ? 'opacity-40 cursor-not-allowed border-slate-200 text-slate-400 bg-slate-50'
              : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 cursor-pointer shadow-sm'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.prevStepBtn}</span>
        </button>

        {/* Step Counter Indicator */}
        <div className="text-xs text-slate-400 font-semibold font-mono">
          {t.stepCounter.replace('{current}', currentStepIndex + 1).replace('{total}', totalSteps)}
        </div>

        {/* Next or Complete Button (Only enabled when checklist is confirmed!) */}
        {isLastStep ? (
          <button
            type="button"
            onClick={canProceed ? onComplete : undefined}
            disabled={!canProceed}
            title={!canProceed ? t.confirmToProceed : undefined}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-2xl text-sm font-bold transition-all ${
              canProceed
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/25 active:scale-95 cursor-pointer animate-pulse'
                : 'bg-slate-100 border border-slate-300 text-slate-400 cursor-not-allowed shadow-none'
            }`}
          >
            {canProceed ? <Award className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            <span>{t.completeFormulationBtn}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={canProceed ? onNext : undefined}
            disabled={!canProceed}
            title={!canProceed ? t.confirmToProceed : undefined}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-2xl text-sm font-bold transition-all ${
              canProceed
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/25 active:scale-95 cursor-pointer'
                : 'bg-slate-100 border border-slate-300 text-slate-400 cursor-not-allowed shadow-none'
            }`}
          >
            {!canProceed && <Lock className="w-3.5 h-3.5" />}
            <span>{t.nextStepBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Helper reminder if checklist is not confirmed yet */}
      {!canProceed && (
        <div className="flex items-center justify-end gap-1.5 text-[11px] font-semibold text-amber-700">
          <Lock className="w-3 h-3 text-amber-600" />
          <span>{t.confirmToProceed}</span>
        </div>
      )}
    </div>
  );
}
