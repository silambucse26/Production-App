import { Beaker, Plus, Minus } from 'lucide-react';
import { playSound } from '../../utils/audio';

export default function LitreSelector({ litres, onChangeLitres, isMuted }) {
  const PRESET_LITRES = [0.5, 1.0, 2.0, 5.0, 10.0, 20.0];

  const handlePreset = (val) => {
    playSound('click', isMuted);
    onChangeLitres(val);
  };

  const handleStep = (delta) => {
    playSound('click', isMuted);
    const updated = Math.max(0.25, parseFloat((litres + delta).toFixed(2)));
    onChangeLitres(updated);
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
            <Beaker className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Batch Production Volume (Litres)
            </h4>
            <p className="text-[11px] text-slate-500">
              Ingredients & instructions scale automatically based on selected litres
            </p>
          </div>
        </div>

        {/* Current Litres Display with Stepper */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-50 border border-slate-200 p-1.5 rounded-xl">
          <button
            type="button"
            onClick={() => handleStep(-0.5)}
            className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
            title="Decrease 0.5 L"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          <div className="px-3 text-center min-w-[70px]">
            <span className="text-lg font-black text-indigo-700 font-mono">{litres}</span>
            <span className="text-xs font-bold text-slate-500 ml-1">L</span>
          </div>

          <button
            type="button"
            onClick={() => handleStep(0.5)}
            className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
            title="Increase 0.5 L"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Preset Pills */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
        <span className="text-xs font-semibold text-slate-400 mr-1">Quick Presets:</span>
        {PRESET_LITRES.map((p) => {
          const isSelected = Math.abs(litres - p) < 0.01;
          return (
            <button
              key={p}
              type="button"
              onClick={() => handlePreset(p)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {p} L
            </button>
          );
        })}

        {/* Custom Input */}
        <div className="flex items-center gap-1.5 ml-auto text-xs text-slate-500">
          <span>Custom:</span>
          <input
            type="number"
            min="0.1"
            max="1000"
            step="0.1"
            value={litres}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              if (!isNaN(val) && val > 0) onChangeLitres(val);
            }}
            className="w-20 px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  );
}
