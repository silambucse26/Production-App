import { useState } from 'react';
import { Maximize2, X, Sparkles } from 'lucide-react';
import Badge from '../common/Badge';

export default function StepImage({ image, title, caption, stepNumber }) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <>
      <div className="relative group rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-md">
        {/* Cartoon illustration */}
        <div className="aspect-[4/3] w-full relative overflow-hidden bg-slate-100">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="eager"
          />

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <Badge variant="primary" size="sm" className="bg-white/95 backdrop-blur-md shadow-sm">
              <Sparkles className="w-3 h-3 text-indigo-600" />
              <span>Step {stepNumber} Visual Guide</span>
            </Badge>
          </div>

          {/* Zoom action button */}
          <button
            onClick={() => setIsZoomed(true)}
            className="absolute top-3 right-3 p-2 rounded-xl bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 backdrop-blur-md border border-slate-200 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md cursor-pointer"
            title="Expand Full Illustration"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Caption bar */}
        {caption && (
          <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-xs font-medium text-slate-700 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0"></span>
            <span className="truncate">{caption}</span>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
              <span className="text-sm font-bold text-slate-900">Step {stepNumber}: {title}</span>
              <button
                onClick={() => setIsZoomed(false)}
                className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 border border-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-3 bg-slate-100 flex items-center justify-center">
              <img
                src={image}
                alt={title}
                className="max-h-[75vh] w-auto object-contain rounded-xl shadow-md"
              />
            </div>
            {caption && (
              <div className="p-4 bg-white text-sm text-slate-700 text-center border-t border-slate-100 font-medium">
                {caption}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
