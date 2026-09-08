import { X, ArrowRight, CheckCircle2, Lock } from 'lucide-react';
import Badge from '../common/Badge';
import { MIDIP_STEPS_TA, getTamilStep } from '../../utils/translations';

export default function StepOverviewModal({
  isOpen,
  onClose,
  steps,
  currentStepIndex,
  onSelectStep,
  activeProduct,
  litres,
  language = 'en',
  checkedItemsByStep = {},
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-white">
                {activeProduct.id}
              </span>
              <h3 className="text-base font-bold text-slate-900">
                {language === 'ta'
                  ? `செய்முறைப் படிகளின் அட்டவணை (${litres}L தொகுதி)`
                  : `Formulation Steps Index (${litres} L Batch)`}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === 'ta'
                ? 'செய்முறை வழிமுறைகள் மற்றும் புகைப்படங்களைக் காண ஏதேனும் ஒரு படியைத் தேர்ந்தெடுக்கவும்.'
                : 'Select any step to inspect standard operating instructions and realistic process visuals.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 border border-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step list */}
        <div className="p-5 overflow-y-auto space-y-3">
          {steps.map((step, idx) => {
            const isCurrent = idx === currentStepIndex;
            const isPast = idx < currentStepIndex;

            // Step is accessible if past, current, or all prior steps are confirmed
            let accessible = idx <= currentStepIndex;
            if (!accessible) {
              accessible = true;
              for (let s = 0; s < idx; s++) {
                if (!checkedItemsByStep[s] || !checkedItemsByStep[s][0]) {
                  accessible = false;
                  break;
                }
              }
            }

            return (
              <div
                key={step.stepNumber}
                onClick={
                  accessible
                    ? () => {
                        onSelectStep(idx);
                        onClose();
                      }
                    : undefined
                }
                className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3.5 rounded-2xl border transition-all ${
                  isCurrent
                    ? 'bg-indigo-50 border-indigo-400 shadow-sm ring-1 ring-indigo-300 cursor-pointer'
                    : accessible
                    ? 'bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-white cursor-pointer'
                    : 'bg-slate-100/70 border-slate-200 opacity-50 cursor-not-allowed'
                }`}
              >
                {/* Thumbnail */}
                <div className="w-20 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 relative shadow-xs">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1 left-1 bg-slate-900/80 rounded px-1 text-[10px] font-bold text-white">
                    #{step.stepNumber}
                  </div>
                </div>

                {/* Info */}
                {(() => {
                  const taData =
                    language === 'ta'
                      ? getTamilStep(step.stepNumber, litres) || MIDIP_STEPS_TA[step.stepNumber]
                      : null;
                  const displayTitle = (taData && taData.title) || step.title;
                  const displayInstruction = (taData && taData.instruction) || step.instruction;

                  return (
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-slate-900 truncate">
                          {language === 'ta' ? `படி ${step.stepNumber}` : step.stepNumber}. {displayTitle}
                        </span>
                        {step.hasTimer && (
                          <Badge variant="amber" size="sm">
                            {Math.round(step.timerSeconds / 60)} {language === 'ta' ? 'நிமிடம் கலக்குதல்' : 'm Stirring'}
                          </Badge>
                        )}
                        {isPast && (
                          <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {language === 'ta' ? 'முடிந்தது' : 'Completed'}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {displayInstruction}
                      </p>
                    </div>
                  );
                })()}

                {/* Jump arrow or Lock */}
                <div className="shrink-0 hidden sm:block">
                  <span
                    className={`p-2 rounded-xl flex items-center justify-center transition-colors ${
                      isCurrent
                        ? 'bg-indigo-600 text-white'
                        : accessible
                        ? 'bg-white border border-slate-200 text-slate-400'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    {accessible ? <ArrowRight className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
