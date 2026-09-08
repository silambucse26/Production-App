import { Check, Lock } from 'lucide-react';
import { MIDIP_STEPS_TA } from '../../utils/translations';

export default function ProgressTracker({
  steps,
  currentStepIndex,
  onSelectStep,
  language = 'en',
  checkedItemsByStep = {},
}) {
  const totalSteps = steps.length;
  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  // A step is only clickable if all previous steps have been confirmed
  const isAccessible = (targetIdx) => {
    if (targetIdx <= currentStepIndex) return true;
    for (let s = 0; s < targetIdx; s++) {
      if (!checkedItemsByStep[s] || !checkedItemsByStep[s][0]) {
        return false;
      }
    }
    return true;
  };

  return (
    <div className="w-full bg-white border-b border-slate-200/80 px-4 sm:px-6 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto">
        {/* Progress bar line */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
          <div className="font-bold text-slate-700">
            {language === 'ta'
              ? `படி ${currentStepIndex + 1} / ${totalSteps}`
              : `Step ${currentStepIndex + 1} of ${totalSteps}`}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-28 sm:w-44 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div
                className="h-full bg-indigo-600 transition-all duration-300 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-mono font-bold text-indigo-700 text-xs">{progressPercent}%</span>
          </div>
        </div>

        {/* Step buttons bar */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 overflow-x-auto pb-1 scrollbar-thin">
          {steps.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            const accessible = isAccessible(idx);
            const taData = language === 'ta' ? MIDIP_STEPS_TA[step.stepNumber] : null;
            const displayTitle = (taData && taData.shortTitle) || step.shortTitle || (language === 'ta' ? `படி ${step.stepNumber}` : `Step ${step.stepNumber}`);

            return (
              <button
                key={step.stepNumber}
                onClick={accessible ? () => onSelectStep(idx) : undefined}
                disabled={!accessible}
                title={!accessible ? (language === 'ta' ? 'அடுத்த படிக்குச் செல்ல தற்போதைய படியை உறுதிப்படுத்தவும்' : 'Confirm current step checklist to unlock') : undefined}
                className={`flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-xl text-left transition-all border shrink-0 ${
                  isCurrent
                    ? 'bg-indigo-50 border-indigo-500 shadow-xs ring-1 ring-indigo-300 font-bold cursor-pointer'
                    : isCompleted
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900 cursor-pointer'
                    : accessible
                    ? 'bg-white border-slate-200 hover:border-slate-300 cursor-pointer'
                    : 'bg-slate-100/70 border-slate-200 opacity-50 cursor-not-allowed'
                }`}
              >
                {/* Number, Checkmark or Lock */}
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                    isCurrent
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : isCompleted
                      ? 'bg-emerald-600 text-white'
                      : accessible
                      ? 'bg-slate-100 text-slate-600'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : !accessible ? (
                    <Lock className="w-3 h-3" />
                  ) : (
                    step.stepNumber
                  )}
                </div>

                {/* Step Short Title */}
                <div className="hidden md:block min-w-0">
                  <div
                    className={`text-xs truncate max-w-[120px] ${
                      isCurrent ? 'text-indigo-950 font-bold' : accessible ? 'text-slate-700' : 'text-slate-400'
                    }`}
                  >
                    {displayTitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
