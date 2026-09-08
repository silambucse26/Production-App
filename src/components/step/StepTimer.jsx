import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, CheckCircle2, Clock } from 'lucide-react';
import { playSound } from '../../utils/audio';

export default function StepTimer({
  initialSeconds = 600,
  label = '10-Minute Stirring Countdown',
  isMuted = false,
  onComplete,
}) {
  const [totalSeconds, setTotalSeconds] = useState(initialSeconds);
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setTotalSeconds(initialSeconds);
    setSecondsLeft(initialSeconds);
    setIsRunning(false);
    setIsFinished(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [initialSeconds]);

  useEffect(() => {
    if (isRunning && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setIsFinished(true);
            playSound('timerEnd', isMuted);
            if (onComplete) onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, secondsLeft, isMuted, onComplete]);

  const handleToggle = () => {
    playSound('click', isMuted);
    if (isFinished) {
      setSecondsLeft(totalSeconds);
      setIsFinished(false);
      setIsRunning(true);
    } else {
      setIsRunning((prev) => !prev);
    }
  };

  const handleReset = (newSec = totalSeconds) => {
    playSound('click', isMuted);
    setIsRunning(false);
    setIsFinished(false);
    setSecondsLeft(newSec);
  };

  const handlePreset = (presetSec) => {
    playSound('click', isMuted);
    setIsRunning(false);
    setIsFinished(false);
    setTotalSeconds(presetSec);
    setSecondsLeft(presetSec);
  };

  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const progressPercent = totalSeconds > 0 ? ((totalSeconds - secondsLeft) / totalSeconds) * 100 : 0;

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm relative overflow-hidden">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-indigo-50 text-indigo-600">
            <Clock className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            {label}
          </span>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-1 text-[11px] text-slate-500">
          <span className="hidden sm:inline mr-1 text-slate-400 font-medium">Preset:</span>
          <button
            type="button"
            onClick={() => handlePreset(600)}
            className={`px-2.5 py-0.5 rounded-lg font-bold cursor-pointer transition-colors ${
              totalSeconds === 600 ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            10m
          </button>
          <button
            type="button"
            onClick={() => handlePreset(60)}
            className={`px-2.5 py-0.5 rounded-lg font-bold cursor-pointer transition-colors ${
              totalSeconds === 60 ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            1m
          </button>
          <button
            type="button"
            onClick={() => handlePreset(10)}
            className={`px-2.5 py-0.5 rounded-lg font-bold cursor-pointer transition-colors ${
              totalSeconds === 10 ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
            title="Fast 10-second demo"
          >
            10s
          </button>
        </div>
      </div>

      {/* Main Timer Display */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 bg-slate-50 border border-slate-200/80 rounded-2xl px-6">
        <div className="flex items-center gap-4">
          <div className="font-mono text-4xl sm:text-5xl font-black tracking-wider text-slate-900">
            {formatTime(secondsLeft)}
          </div>
          {isFinished ? (
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Mixing Complete!</span>
            </div>
          ) : isRunning ? (
            <div className="flex items-center gap-1.5 text-xs text-indigo-700 font-bold px-3 py-1 rounded-full bg-indigo-100 border border-indigo-200">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping"></span>
              <span>Stirring in progress...</span>
            </div>
          ) : (
            <div className="text-xs text-slate-500 font-medium">
              Ready to start
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleToggle}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md cursor-pointer ${
              isRunning
                ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300'
                : isFinished
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </>
            ) : isFinished ? (
              <>
                <RotateCcw className="w-4 h-4" />
                <span>Restart</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Start Stirring</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => handleReset()}
            className="p-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 border border-slate-200 transition-colors cursor-pointer"
            title="Reset timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-3">
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
          <div
            className={`h-full transition-all duration-300 ${
              isFinished ? 'bg-emerald-500' : 'bg-indigo-600'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
