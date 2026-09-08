import { CheckSquare, Square, CheckCircle2 } from 'lucide-react';
import { playSound } from '../../utils/audio';

export default function StepChecklist({
  checklist = [],
  checkedItems = {},
  onToggleItem,
  isMuted = false,
}) {
  if (!checklist || checklist.length === 0) return null;

  const totalCount = checklist.length;
  const checkedCount = checklist.filter((_, idx) => checkedItems[idx]).length;
  const allCompleted = checkedCount === totalCount;

  const handleToggle = (idx) => {
    playSound('check', isMuted);
    onToggleItem(idx);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
      <div className="flex items-center justify-between gap-2 mb-3.5">
        <div className="flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-indigo-600" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Protocol Confirmation Checklist
          </h4>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold">
          <span
            className={`px-2.5 py-0.5 rounded-full border text-[11px] ${
              allCompleted
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-slate-100 text-slate-600 border-slate-200'
            }`}
          >
            {checkedCount}/{totalCount} Completed
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {checklist.map((item, idx) => {
          const isChecked = !!checkedItems[idx];
          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleToggle(idx)}
              className={`w-full flex items-start gap-3 p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                isChecked
                  ? 'bg-emerald-50/60 border-emerald-300 text-slate-800'
                  : 'bg-slate-50/60 border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isChecked ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400" />
                )}
              </div>
              <span
                className={`text-xs sm:text-sm leading-snug font-medium transition-colors ${
                  isChecked ? 'line-through text-slate-400' : 'text-slate-800'
                }`}
              >
                {item}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
