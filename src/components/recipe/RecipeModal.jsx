import { X, Check, Clock, Layers, Shield } from 'lucide-react';
import Badge from '../common/Badge';

export default function RecipeModal({
  isOpen,
  onClose,
  recipes,
  activeRecipeId,
  onSelectRecipe,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/60">
          <div>
            <h3 className="text-lg font-bold text-white">Select Formulation Recipe</h3>
            <p className="text-xs text-slate-400">
              Choose a standard laboratory compounding procedure.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Recipe Cards */}
        <div className="p-5 overflow-y-auto space-y-4">
          {recipes.map((rec) => {
            const isSelected = rec.id === activeRecipeId;

            return (
              <div
                key={rec.id}
                onClick={() => {
                  onSelectRecipe(rec);
                  onClose();
                }}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600/15 border-indigo-500 shadow-lg shadow-indigo-500/10'
                    : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <Badge variant={isSelected ? 'primary' : 'slate'} size="sm" className="mb-1.5">
                      {rec.category}
                    </Badge>
                    <h4 className="text-base font-bold text-white">{rec.name}</h4>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {rec.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-3 border-t border-slate-800/60">
                  <div className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{rec.steps.length} Steps</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Est: {rec.estDuration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Batch: {rec.batchSize}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
