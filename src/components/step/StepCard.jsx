import { useState } from 'react';
import StepImage from './StepImage';
import StepTimer from './StepTimer';
import StepNavigation from './StepNavigation';
import Badge from '../common/Badge';
import { 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Circle, 
  Beaker, 
  Lightbulb, 
  Scale, 
  ShieldAlert
} from 'lucide-react';
import { playSound } from '../../utils/audio';
import { translations, MIDIP_STEPS_TA, getTamilStep } from '../../utils/translations';

export default function StepCard({
  step,
  currentStepIndex,
  totalSteps,
  activeProduct,
  litres,
  onPrev,
  onNext,
  onComplete,
  isMuted,
  checkedItems,
  onToggleCheckItem,
  language = 'en',
}) {
  const [showDetails, setShowDetails] = useState(false);
  const t = translations[language] || translations.en;

  // If in Tamil and viewing Intas Order / MiDip, provide fluent Tamil step instructions scaled for chosen litres
  const tamilStep =
    language === 'ta' && (activeProduct.id === 'INTAS-700' || activeProduct.id === 'MIDIP-700')
      ? getTamilStep(step.stepNumber, litres) || MIDIP_STEPS_TA[step.stepNumber]
      : null;
  const displayTitle = tamilStep?.title || step.title.replace(/^Step\s*\d+\s*[-–]\s*/i, '');
  const displayInstruction = tamilStep?.instruction || step.instruction;
  const displayWarning = tamilStep?.warning || step.warning;
  const displayStudentNote = tamilStep?.studentNote || step.studentNote;
  const displayTankBadge = tamilStep?.tankBadge || step.tankBadge;

  // Determine if the current step is marked as done
  const isStepConfirmed = !!checkedItems[0] || (step.checklist && step.checklist.every((_, i) => checkedItems[i]));

  const handleToggleConfirm = () => {
    playSound('check', isMuted);
    onToggleCheckItem(0);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      {/* Clean Focused Step Card */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-7 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* 1. Visual Guide (Prominent, High-Quality Step Image) */}
          <div className="lg:col-span-5">
            <StepImage
              image={step.image}
              title={step.title}
              caption={step.imageCaption}
              stepNumber={step.stepNumber}
            />
          </div>

          {/* 2. Step Action & Controls */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            
            {/* Header: Step Number & Tank Location */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-mono text-xs font-black px-3 py-1 rounded-full bg-indigo-600 text-white shadow-xs">
                  {t.stepCounter.replace('{current}', step.stepNumber).replace('{total}', totalSteps)}
                </span>

                {displayTankBadge && (
                  <span
                    className={`font-mono text-xs font-bold px-3 py-1 rounded-full border flex items-center gap-1.5 ${
                      displayTankBadge.includes('Tank 2') || displayTankBadge.includes('Separate') || displayTankBadge.includes('தனி')
                        ? 'bg-amber-50 text-amber-900 border-amber-300'
                        : 'bg-slate-100 text-slate-800 border-slate-200'
                    }`}
                  >
                    <span>{displayTankBadge.includes('Tank 2') || displayTankBadge.includes('Separate') || displayTankBadge.includes('தனி') ? '🧪' : '🏭'}</span>
                    <span>{displayTankBadge}</span>
                  </span>
                )}

                {step.hasTimer && (
                  <Badge variant="amber" size="sm">
                    ⏱️ {Math.round(step.timerSeconds / 60)}m Timer
                  </Badge>
                )}
              </div>

              {/* Step Title */}
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {displayTitle}
              </h2>
            </div>

            {/* Critical Warning (Only if crucial for this step) */}
            {displayWarning && (
              <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-amber-50/90 border border-amber-300 text-amber-900 text-xs sm:text-sm font-semibold">
                <AlertTriangle className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />
                <span>{displayWarning}</span>
              </div>
            )}

            {/* Main Action Instruction - Crisp, Large & Uncluttered */}
            <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200/80">
              <div className="text-[11px] font-black uppercase tracking-wider text-indigo-700 mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
                {t.actionRequired.replace('{litres}', litres)}
              </div>
              <p className="text-base sm:text-lg text-slate-900 font-extrabold leading-snug">
                {displayInstruction}
              </p>
            </div>

            {/* Step Timer (Only if active on this step) */}
            {step.hasTimer && (
              <div className="pt-1">
                <StepTimer
                  initialSeconds={step.timerSeconds || 1800}
                  label={step.timerLabel || 'Timer'}
                  isMuted={isMuted}
                />
              </div>
            )}

            {/* Single Easy One-Click Confirmation */}
            <button
              type="button"
              onClick={handleToggleConfirm}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                isStepConfirmed
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold shadow-xs'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3 text-left">
                {isStepConfirmed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-400 shrink-0" />
                )}
                <span className="text-xs sm:text-sm font-medium">
                  {isStepConfirmed
                    ? t.stepConfirmedBadge
                    : t.stepPendingBadge}
                </span>
              </div>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                  isStepConfirmed ? 'bg-emerald-200/70 text-emerald-900' : 'bg-slate-200 text-slate-600'
                }`}
              >
                {isStepConfirmed ? t.doneBadge : t.pendingBadge}
              </span>
            </button>

            {/* Simple Step Navigation (Previous / Next) */}
            <StepNavigation
              currentStepIndex={currentStepIndex}
              totalSteps={totalSteps}
              onPrev={onPrev}
              onNext={onNext}
              onComplete={onComplete}
              language={language}
              canProceed={isStepConfirmed}
            />
          </div>
        </div>
      </div>

      {/* 3. Optional Collapsible Details (Keeps screen clean by default) */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
        <button
          type="button"
          onClick={() => setShowDetails((prev) => !prev)}
          className="w-full px-5 py-3 flex items-center justify-between text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-50/80 hover:bg-slate-100/80 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Beaker className="w-4 h-4 text-indigo-600" />
            <span>{t.showTechDetails}</span>
            <span className="text-[10px] font-normal text-slate-400">
              ({showDetails ? t.clickToHide : t.clickToView})
            </span>
          </span>
          {showDetails ? (
            <ChevronUp className="w-4 h-4 text-slate-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-500" />
          )}
        </button>

        {showDetails && (
          <div className="p-5 space-y-4 border-t border-slate-200 bg-white">
            {/* Parameters Grid */}
            {step.parameters && step.parameters.length > 0 && (
              <div>
                <div className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span>{t.calculatedQuantities}</span>
                  <span className="text-indigo-600 font-mono font-bold">({litres} L)</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {step.parameters.map((param, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-200"
                    >
                      <div className="text-[10px] uppercase text-slate-400 font-bold truncate">
                        {param.label}
                      </div>
                      <div className="text-xs font-black text-slate-900 truncate mt-0.5 font-mono">
                        {param.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Student Explanation */}
            {displayStudentNote && (
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-slate-800 text-xs sm:text-sm">
                <Lightbulb className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-emerald-900 text-xs mb-0.5">{t.simpleExplanation}</div>
                  <div>{displayStudentNote}</div>
                </div>
              </div>
            )}

            {/* Weight Balance (Step 9) */}
            {step.weightBalance && (
              <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
                  <span className="flex items-center gap-1.5">
                    <Scale className="w-4 h-4" />
                    {t.weightBalanceTitle}
                  </span>
                  <span>Target: {step.weightBalance.targetWeight} kg</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded bg-white/10">
                    <div className="text-[10px] text-slate-400">{t.materialsAdded}</div>
                    <div className="font-bold font-mono text-white">
                      {step.weightBalance.currentWeight.toFixed(2)} kg
                    </div>
                  </div>
                  <div className="p-2 rounded bg-white/10">
                    <div className="text-[10px] text-slate-400">{t.batchTarget}</div>
                    <div className="font-bold font-mono text-white">
                      {step.weightBalance.targetWeight.toFixed(2)} kg
                    </div>
                  </div>
                  <div className="p-2 rounded bg-emerald-500/20 border border-emerald-400/40">
                    <div className="text-[10px] text-emerald-300">{t.waterToAdd}</div>
                    <div className="font-black font-mono text-emerald-300">
                      +{step.weightBalance.pendingWater.toFixed(2)} kg
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Scientific Notes */}
            {step.detailedNotes && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>{step.detailedNotes}</span>
              </div>
            )}

            {/* Safety notes */}
            {activeProduct.safetyNotes && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{activeProduct.safetyNotes}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

