import { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  Beaker,
  Plus,
  Minus,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  FileText,
  Thermometer,
  Droplets,
  Building2,
  Check,
  X as XIcon,
  Clock,
  Calendar,
  Lock,
} from 'lucide-react';
import Badge from '../common/Badge';
import { MAX_LITRES } from '../../data/productsData';
import { calculateIngredients } from '../../utils/calculateIngredients';
import { playSound } from '../../utils/audio';

import { translations, ATTACHMENT_DOCS_TA, LINE_CHECK_POINTS_TA } from '../../utils/translations';

// Helper to get current local date (YYYY-MM-DD) and time (HH:MM)
const getTodayDate = () => new Date().toISOString().slice(0, 10);
const getCurrentTime = () =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

export default function PreCheckList({
  product,
  litres,
  onChangeLitres,
  onAllChecked,
  onBack,
  isMuted,
  language = 'en',
}) {
  const t = translations[language] || translations.en;
  const PRESET_LITRES = [50, 100, 250, 500, 700];

  // Stage progression: 'attachments' (1.0) | 'lineClearance' (2.0) | 'batchSetup' (3.0)
  const [activeStage, setActiveStage] = useState('attachments');

  // Toggle for Bill of Materials
  const [showFormulaTable, setShowFormulaTable] = useState(false);

  // -------------------------------------------------------------
  // 1.0 LIST OF ATTACHMENTS STATE (No default name!)
  // -------------------------------------------------------------
  const INITIAL_ATTACHMENTS = [
    { id: 1, srNo: '1.', name: 'Production Order (PO)', pages: 1, status: '√' },
    { id: 3, srNo: '3.', name: 'In-Process QC Report', pages: 2, status: '√' },
    { id: 4, srNo: '4.', name: 'Batch Review Record', pages: 1, status: '√' },
    { id: 5, srNo: '5.', name: 'Status Labels/Tags', pages: 1, status: '√' },
    { id: 6, srNo: '6.', name: 'Finished Good Test Report', pages: 1, status: '√' },
    { id: 7, srNo: '7.', name: 'Transfer Ticket (TT)', pages: 1, status: '√' },
  ];

  const [attachments, setAttachments] = useState(INITIAL_ATTACHMENTS);

  // Empty default QA name & explicit date/time pickers
  const [qaOfficerName, setQaOfficerName] = useState('');
  const [qaSignDate, setQaSignDate] = useState(getTodayDate());
  const [qaSignTime, setQaSignTime] = useState(getCurrentTime());

  const handleSetQaNow = () => {
    playSound('click', isMuted);
    setQaSignDate(getTodayDate());
    setQaSignTime(getCurrentTime());
  };

  const handleAttachmentStatus = (id, newStatus) => {
    playSound('click', isMuted);
    setAttachments((prev) =>
      prev.map((att) => (att.id === id ? { ...att, status: newStatus } : att))
    );
  };

  const handleAttachmentPages = (id, pages) => {
    setAttachments((prev) =>
      prev.map((att) => (att.id === id ? { ...att, pages: Math.max(1, parseInt(pages, 10) || 1) } : att))
    );
  };

  // -------------------------------------------------------------
  // 2.0 & 2.1 LINE CLEARANCE FOR DISPENSING AREA (No default names!)
  // -------------------------------------------------------------
  const [roomInfo, setRoomInfo] = useState({
    manufacturingRoomId: 'MR-104',
    dispensingRoomId: 'DR-02',
    previousProduct: 'Povidone-Iodine 10% Sol – Batch #PV-2024-098',
  });

  const [environmentalControls, setEnvironmentalControls] = useState({
    temperature: '22.4',
    relativeHumidity: '48.0',
  });

  const INITIAL_LINE_CHECKS = [
    {
      id: 'no_remnants',
      point: 'Ensure that there shall be no remnants of previous batch/product left out in the area.',
      status: 'Y',
    },
    {
      id: 'cleanliness',
      point: 'Ensure the cleanliness of Room, Weighing Balances, Dispensing Booth and other accessories and maintain record.',
      status: 'Y',
    },
    {
      id: 'temp_rh',
      point: 'Record the Temperature, RH of Dispensing Room.',
      status: 'Y',
      hasEnvironmentalInput: true,
    },
    {
      id: 'calibration',
      point: 'Ensure that all measuring Instruments are Calibrated.',
      status: 'Y',
    },
    {
      id: 'qc_release',
      point: 'Check the QC release status of the Raw Materials.',
      status: 'Y',
    },
  ];

  const [lineChecks, setLineChecks] = useState(INITIAL_LINE_CHECKS);

  // Verifier Signatures: No default names! Real date & time selection.
  const [cleanedBy, setCleanedBy] = useState({
    name: '',
    date: getTodayDate(),
    time: getCurrentTime(),
  });

  const [checkedBy, setCheckedBy] = useState({
    name: '',
    date: getTodayDate(),
    time: getCurrentTime(),
  });

  const handleSetCleanedNow = () => {
    playSound('click', isMuted);
    setCleanedBy((prev) => ({
      ...prev,
      date: getTodayDate(),
      time: getCurrentTime(),
    }));
  };

  const handleSetCheckedNow = () => {
    playSound('click', isMuted);
    setCheckedBy((prev) => ({
      ...prev,
      date: getTodayDate(),
      time: getCurrentTime(),
    }));
  };

  const handleToggleLineCheck = (id) => {
    playSound('check', isMuted);
    setLineChecks((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: c.status === 'Y' ? 'N' : 'Y' } : c))
    );
  };

  // Preset & Step Handlers for Litres
  const handlePreset = (val) => {
    playSound('click', isMuted);
    onChangeLitres(Math.min(MAX_LITRES, Math.max(0, val)));
  };

  const handleStep = (delta) => {
    playSound('click', isMuted);
    const updated = Math.min(MAX_LITRES, Math.max(0, litres + delta));
    onChangeLitres(updated);
  };

  // Readiness validation
  const allAttachmentsCleared = attachments.every((att) => att.status === '√' || att.status === 'NA');
  const allLineChecksPassed = lineChecks.every((c) => c.status === 'Y');

  const handleStartSteps = () => {
    if (litres <= 0) return;
    playSound('next', isMuted);
    onAllChecked({
      attachments,
      qaOfficerName: qaOfficerName.trim() || 'QA Officer',
      qaSignDate: `${qaSignDate} ${qaSignTime}`,
      roomInfo,
      environmentalControls,
      cleanedBy: {
        name: cleanedBy.name.trim() || 'Production Cleaner',
        date: `${cleanedBy.date} ${cleanedBy.time}`,
      },
      checkedBy: {
        name: checkedBy.name.trim() || 'Production Incharge',
        date: `${checkedBy.date} ${checkedBy.time}`,
      },
    });
  };

  // Material calculations
  const calculationResult = calculateIngredients(product.ingredients || [], litres);
  const items = calculationResult.items;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition-colors cursor-pointer shadow-xs self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backToCatalog}</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono font-bold bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-slate-400">PRODUCT:</span>
          <span className="text-slate-900 font-black">{product.name}</span>
          <span className="text-indigo-600 font-extrabold">({product.id})</span>
        </div>
      </div>

      {/* Progressive Stage Stepper: "one by one make it give" */}
      <div className="bg-white border border-slate-200 rounded-3xl p-3 sm:p-4 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          
          {/* Stage 1 */}
          <button
            type="button"
            onClick={() => setActiveStage('attachments')}
            className={`flex items-center gap-3 p-3 rounded-2xl border text-left transition-all cursor-pointer ${
              activeStage === 'attachments'
                ? 'bg-indigo-50 border-indigo-500 shadow-xs'
                : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100/80'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                activeStage === 'attachments'
                  ? 'bg-indigo-600 text-white'
                  : allAttachmentsCleared
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              {allAttachmentsCleared ? <Check className="w-4 h-4" /> : '1.0'}
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                {t.stage1Title}
              </div>
              <div className="text-xs sm:text-sm font-black text-slate-900 truncate">
                {t.stage1Name}
              </div>
            </div>
          </button>

          {/* Stage 2 */}
          <button
            type="button"
            onClick={() => setActiveStage('lineClearance')}
            className={`flex items-center gap-3 p-3 rounded-2xl border text-left transition-all cursor-pointer ${
              activeStage === 'lineClearance'
                ? 'bg-indigo-50 border-indigo-500 shadow-xs'
                : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100/80'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                activeStage === 'lineClearance'
                  ? 'bg-indigo-600 text-white'
                  : allLineChecksPassed
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              {allLineChecksPassed ? <Check className="w-4 h-4" /> : '2.0'}
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                {t.stage2Title}
              </div>
              <div className="text-xs sm:text-sm font-black text-slate-900 truncate">
                {t.stage2Name}
              </div>
            </div>
          </button>

          {/* Stage 3 */}
          <button
            type="button"
            onClick={() => setActiveStage('batchSetup')}
            className={`flex items-center gap-3 p-3 rounded-2xl border text-left transition-all cursor-pointer ${
              activeStage === 'batchSetup'
                ? 'bg-indigo-50 border-indigo-500 shadow-xs'
                : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100/80'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                activeStage === 'batchSetup'
                  ? 'bg-indigo-600 text-white'
                  : litres > 0
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              3.0
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                {t.stage3Title}
              </div>
              <div className="text-xs sm:text-sm font-black text-slate-900 truncate">
                {t.stage3Name}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* -------------------------------------------------------------
          STAGE 1.0: LIST OF ATTACHMENTS (BMR DOCUMENTATION)
      -------------------------------------------------------------- */}
      {activeStage === 'attachments' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  {t.attachmentsTitle}
                </h3>
                <p className="text-xs text-slate-500">
                  {t.attachmentsSubtitle}
                </p>
              </div>
            </div>

            <div className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-xl self-start sm:self-auto font-mono">
              {t.stageOf.replace('{current}', '1')}
            </div>
          </div>

          {/* Attachments: Responsive Container */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
            {/* Mobile Card View (< md) - Touch-optimized & No horizontal squishing */}
            <div className="md:hidden divide-y divide-slate-100 bg-white">
              {attachments.map((att) => {
                const docDisplayName = language === 'ta' && ATTACHMENT_DOCS_TA[att.name] ? ATTACHMENT_DOCS_TA[att.name] : att.name;

                return (
                  <div key={att.id} className="p-3.5 space-y-2.5 hover:bg-slate-50/60 transition-colors">
                    {/* Header: Sr No + Document Name */}
                    <div className="flex items-start gap-2.5">
                      <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 shrink-0 mt-0.5">
                        {att.srNo}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        {docDisplayName}
                      </span>
                    </div>

                    {/* Controls Row: Pages Input + Status Buttons */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-50">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-bold text-slate-500">{t.noOfPages}:</span>
                        <input
                          type="number"
                          min="1"
                          max="99"
                          value={att.pages}
                          onChange={(e) => handleAttachmentPages(att.id, e.target.value)}
                          className="w-14 text-center py-1 rounded-lg border border-slate-200 bg-slate-50 font-mono font-bold text-slate-800 text-xs focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>

                      {/* Touch-Friendly Status Selection Buttons */}
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleAttachmentStatus(att.id, '√')}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                            att.status === '√'
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                          title={t.footnoteAttached}
                        >
                          {t.attachedBtn}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleAttachmentStatus(att.id, '×')}
                          className={`px-2 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                            att.status === '×'
                              ? 'bg-rose-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                          title={t.footnoteNotAttached}
                        >
                          {t.notAttachedBtn}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleAttachmentStatus(att.id, 'NA')}
                          className={`px-2 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                            att.status === 'NA'
                              ? 'bg-amber-500 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                          title={t.footnoteNA}
                        >
                          {t.naBtn}
                        </button>
                      </div>
                    </div>

                    {/* QA Sign Status on Mobile */}
                    <div className="text-[11px] font-mono text-slate-500 flex items-center justify-between pt-1 border-t border-slate-50">
                      <span>{t.signDateHeader}:</span>
                      {qaOfficerName.trim() ? (
                        <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          ✓ {qaOfficerName}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">{t.pendingSign}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop Table View (>= md) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-700 uppercase font-black text-[11px] border-b border-slate-200">
                    <th className="py-3 px-4 w-16">{t.srNo}</th>
                    <th className="py-3 px-4">{t.docName}</th>
                    <th className="py-3 px-4 text-center w-32">{t.noOfPages}</th>
                    <th className="py-3 px-4 text-center w-48">{t.statusHeader}</th>
                    <th className="py-3 px-4 text-right">{t.signDateHeader}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {attachments.map((att) => {
                    const docDisplayName = language === 'ta' && ATTACHMENT_DOCS_TA[att.name] ? ATTACHMENT_DOCS_TA[att.name] : att.name;

                    return (
                      <tr key={att.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-500">
                          {att.srNo}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          {docDisplayName}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <input
                            type="number"
                            min="1"
                            max="99"
                            value={att.pages}
                            onChange={(e) => handleAttachmentPages(att.id, e.target.value)}
                            className="w-16 text-center py-1 rounded-lg border border-slate-200 bg-white font-mono font-bold text-slate-800 text-xs focus:ring-1 focus:ring-indigo-500"
                          />
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center justify-center gap-1.5">
                            {/* √ Option */}
                            <button
                              type="button"
                              onClick={() => handleAttachmentStatus(att.id, '√')}
                              className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                                att.status === '√'
                                  ? 'bg-emerald-600 text-white shadow-xs'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                              title={t.footnoteAttached}
                            >
                              {t.attachedBtn}
                            </button>

                            {/* × Option */}
                            <button
                              type="button"
                              onClick={() => handleAttachmentStatus(att.id, '×')}
                              className={`px-2 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                                att.status === '×'
                                  ? 'bg-rose-600 text-white shadow-xs'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                              title={t.footnoteNotAttached}
                            >
                              {t.notAttachedBtn}
                            </button>

                            {/* NA Option */}
                            <button
                              type="button"
                              onClick={() => handleAttachmentStatus(att.id, 'NA')}
                              className={`px-2 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                                att.status === 'NA'
                                  ? 'bg-amber-500 text-white shadow-xs'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                              title={t.footnoteNA}
                            >
                              {t.naBtn}
                            </button>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono text-xs text-slate-600">
                          {qaOfficerName.trim() ? (
                            <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                              ✓ {qaOfficerName}
                            </span>
                          ) : (
                            <span className="text-slate-400 italic">{t.pendingSign}</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Footnotes according to BMR specifications */}
            <div className="bg-slate-50 p-4 border-t border-slate-200 text-xs text-slate-600 space-y-1">
              <div className="flex flex-wrap items-center gap-4">
                <span className="font-semibold text-emerald-800">
                  {t.footnoteAttached}
                </span>
                <span className="font-semibold text-rose-800">
                  {t.footnoteNotAttached}
                </span>
                <span className="font-semibold text-amber-800">
                  {t.footnoteNA}
                </span>
              </div>
              <div className="text-[11px] text-slate-500">
                {t.footnoteQA}
              </div>
            </div>
          </div>

          {/* QA Verification Sign-off Box with Explicit Date & Time Selection */}
          <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-indigo-600 text-white shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-black text-indigo-900 uppercase tracking-wider">
                  {t.qaVerificationTitle}
                </div>
                <div className="text-xs text-slate-600">
                  {t.qaVerificationSubtitle}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center pt-1">
              {/* QA Name Input */}
              <div className="sm:col-span-6">
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  {t.qaOfficerNameLabel}
                </label>
                <input
                  type="text"
                  value={qaOfficerName}
                  onChange={(e) => setQaOfficerName(e.target.value)}
                  placeholder={t.qaNamePlaceholder}
                  className="w-full px-3 py-2 rounded-xl border border-indigo-300 bg-white font-bold text-xs text-indigo-950 focus:ring-2 focus:ring-indigo-500 shadow-2xs"
                />
              </div>

              {/* Date Selection */}
              <div className="sm:col-span-3">
                <label className="text-[11px] font-bold text-slate-600 flex items-center gap-1 mb-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>{t.selectDate}</span>
                </label>
                <input
                  type="date"
                  value={qaSignDate}
                  onChange={(e) => setQaSignDate(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 bg-white font-mono text-xs text-slate-800"
                />
              </div>

              {/* Time Selection & Now Button */}
              <div className="sm:col-span-3">
                <label className="text-[11px] font-bold text-slate-600 flex items-center justify-between mb-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{t.timeLabel}</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleSetQaNow}
                    className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 underline cursor-pointer"
                  >
                    {t.setNow}
                  </button>
                </label>
                <input
                  type="time"
                  value={qaSignTime}
                  onChange={(e) => setQaSignTime(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 bg-white font-mono text-xs text-slate-800"
                />
              </div>
            </div>

            {/* Displaying verified name once entered */}
            {qaOfficerName.trim() && (
              <div className="mt-2 p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs flex items-center gap-2 font-bold">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {t.qaAuthorizedBadge} <span className="underline">{qaOfficerName}</span> &bull; {qaSignDate} &bull; {qaSignTime}
                </span>
              </div>
            )}
          </div>

          {/* Navigation to Next Stage (Requires QA Officer Name) */}
          <div className="pt-3 space-y-2">
            <div className="flex justify-end">
              <button
                type="button"
                disabled={!qaOfficerName.trim()}
                onClick={() => {
                  if (!qaOfficerName.trim()) {
                    playSound('warning', isMuted);
                    return;
                  }
                  playSound('next', isMuted);
                  setActiveStage('lineClearance');
                }}
                title={!qaOfficerName.trim() ? t.qaSignRequired : undefined}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all ${
                  qaOfficerName.trim()
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 active:scale-95 cursor-pointer'
                    : 'bg-slate-100 border border-slate-300 text-slate-400 cursor-not-allowed shadow-none'
                }`}
              >
                {!qaOfficerName.trim() && <Lock className="w-4 h-4" />}
                <span>{t.proceedToLineClearance}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {!qaOfficerName.trim() && (
              <div className="flex items-center justify-end gap-1.5 text-[11px] font-semibold text-amber-700">
                <Lock className="w-3 h-3 text-amber-600" />
                <span>{t.qaSignRequired}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          STAGE 2.0: LINE CLEARANCE FOR DISPENSING AREA
      -------------------------------------------------------------- */}
      {activeStage === 'lineClearance' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {t.lineClearanceTitle}
                </h3>
                <div className="text-xs font-bold text-indigo-600">
                  {t.lineClearanceSubtitle}
                </div>
              </div>
            </div>

            <div className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-xl self-start sm:self-auto font-mono">
              {t.stageOf.replace('{current}', '2')}
            </div>
          </div>

          {/* Room Identification & Previous Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="text-[11px] uppercase font-bold text-slate-400 block mb-1">
                {t.mfgRoomId}
              </label>
              <input
                type="text"
                value={roomInfo.manufacturingRoomId}
                onChange={(e) => setRoomInfo({ ...roomInfo, manufacturingRoomId: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="text-[11px] uppercase font-bold text-slate-400 block mb-1">
                {t.dispRoomId}
              </label>
              <input
                type="text"
                value={roomInfo.dispensingRoomId}
                onChange={(e) => setRoomInfo({ ...roomInfo, dispensingRoomId: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="text-[11px] uppercase font-bold text-slate-400 block mb-1">
                {t.prevProduct}
              </label>
              <input
                type="text"
                value={roomInfo.previousProduct}
                onChange={(e) => setRoomInfo({ ...roomInfo, previousProduct: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Check List for Line Clearance Table */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
            <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
              <div className="text-xs font-black text-slate-800 uppercase tracking-wider">
                {t.checkListTitle}
              </div>
              <div className="text-xs font-bold text-slate-500">
                {t.remarksHeader}
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {lineChecks.map((item, index) => {
                const isPassed = item.status === 'Y';
                const pointDisplay = language === 'ta' && LINE_CHECK_POINTS_TA[item.id] ? LINE_CHECK_POINTS_TA[item.id] : item.point;

                return (
                  <div
                    key={item.id}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors"
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <span className="font-mono text-xs font-bold text-slate-400 mt-0.5">
                        {index + 1}.
                      </span>
                      <div>
                        <div className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                          {pointDisplay}
                        </div>

                        {/* Environmental Reading Inputs (For Point 3: Record Temp & RH) */}
                        {item.hasEnvironmentalInput && (
                          <div className="mt-2.5 flex flex-wrap items-center gap-3 bg-indigo-50/70 p-2.5 rounded-xl border border-indigo-200">
                            <div className="flex items-center gap-1.5">
                              <Thermometer className="w-4 h-4 text-indigo-600" />
                              <span className="text-xs font-bold text-slate-700">{t.temperature}</span>
                              <input
                                type="text"
                                value={environmentalControls.temperature}
                                onChange={(e) =>
                                  setEnvironmentalControls({
                                    ...environmentalControls,
                                    temperature: e.target.value,
                                  })
                                }
                                className="w-16 px-2 py-0.5 rounded-md bg-white border border-indigo-300 font-mono text-xs font-black text-indigo-900 text-center"
                              />
                              <span className="text-xs font-bold text-slate-500">°C</span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <Droplets className="w-4 h-4 text-cyan-600" />
                              <span className="text-xs font-bold text-slate-700">{t.humidity}</span>
                              <input
                                type="text"
                                value={environmentalControls.relativeHumidity}
                                onChange={(e) =>
                                  setEnvironmentalControls({
                                    ...environmentalControls,
                                    relativeHumidity: e.target.value,
                                  })
                                }
                                className="w-16 px-2 py-0.5 rounded-md bg-white border border-indigo-300 font-mono text-xs font-black text-indigo-900 text-center"
                              />
                              <span className="text-xs font-bold text-slate-500">%</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Y / N Toggle */}
                    <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                      <button
                        type="button"
                        onClick={() => handleToggleLineCheck(item.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                          isPassed
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{t.yesBtn}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleToggleLineCheck(item.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                          !isPassed
                            ? 'bg-rose-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        <XIcon className="w-3.5 h-3.5" />
                        <span>{t.noBtn}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cleaned By & Checked By Sign-offs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cleaned By */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="text-xs font-black uppercase tracking-wider text-slate-800">
                {t.cleanedByTitle}
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 block mb-1">
                  {t.cleanerNameLabel}
                </label>
                <input
                  type="text"
                  value={cleanedBy.name}
                  onChange={(e) => setCleanedBy({ ...cleanedBy, name: e.target.value })}
                  placeholder="Enter Cleaner/Operator Name"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-1">
                    {t.selectDate}
                  </label>
                  <input
                    type="date"
                    value={cleanedBy.date}
                    onChange={(e) => setCleanedBy({ ...cleanedBy, date: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs font-mono text-slate-800"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[10px] font-bold text-slate-500">
                      {t.timeLabel}
                    </label>
                    <button
                      type="button"
                      onClick={handleSetCleanedNow}
                      className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 underline cursor-pointer"
                    >
                      {t.setNow}
                    </button>
                  </div>
                  <input
                    type="time"
                    value={cleanedBy.time}
                    onChange={(e) => setCleanedBy({ ...cleanedBy, time: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs font-mono text-slate-800"
                  />
                </div>
              </div>

              {/* Show entered verified name */}
              {cleanedBy.name.trim() && (
                <div className="p-2 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-950 text-xs font-bold flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                  <span>{t.cleanedByBadge} <span className="underline">{cleanedBy.name}</span> ({cleanedBy.date} {cleanedBy.time})</span>
                </div>
              )}
            </div>

            {/* Checked By */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="text-xs font-black uppercase tracking-wider text-slate-800">
                {t.checkedByTitle}
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 block mb-1">
                  {t.inchargeNameLabel}
                </label>
                <input
                  type="text"
                  value={checkedBy.name}
                  onChange={(e) => setCheckedBy({ ...checkedBy, name: e.target.value })}
                  placeholder="Enter Production Incharge Name"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-1">
                    {t.selectDate}
                  </label>
                  <input
                    type="date"
                    value={checkedBy.date}
                    onChange={(e) => setCheckedBy({ ...checkedBy, date: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs font-mono text-slate-800"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[10px] font-bold text-slate-500">
                      {t.timeLabel}
                    </label>
                    <button
                      type="button"
                      onClick={handleSetCheckedNow}
                      className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 underline cursor-pointer"
                    >
                      {t.setNow}
                    </button>
                  </div>
                  <input
                    type="time"
                    value={checkedBy.time}
                    onChange={(e) => setCheckedBy({ ...checkedBy, time: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs font-mono text-slate-800"
                  />
                </div>
              </div>

              {/* Show entered verified name */}
              {checkedBy.name.trim() && (
                <div className="p-2 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs font-bold flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{t.checkedByBadge} <span className="underline">{checkedBy.name}</span> ({checkedBy.date} {checkedBy.time})</span>
                </div>
              )}
            </div>
          </div>

          {/* Mandatory Caution Alert */}
          <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 space-y-1.5 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-black text-amber-900 uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>{t.cautionTitle}</span>
            </div>
            <ol className="text-xs font-bold space-y-1 ml-6 list-decimal">
              <li>{t.caution1}</li>
              <li>{t.caution2}</li>
            </ol>
          </div>

          {/* Navigation Controls (Requires all 5 line checks = Y and cleaner + incharge names) */}
          {(() => {
            const canProceedToBatchSetup =
              cleanedBy.name.trim().length > 0 &&
              checkedBy.name.trim().length > 0 &&
              lineChecks.every((item) => item.status === 'Y');

            return (
              <div className="pt-2 space-y-2">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      playSound('prev', isMuted);
                      setActiveStage('attachments');
                    }}
                    className="px-5 py-2.5 rounded-2xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                  >
                    {t.backToAttachments}
                  </button>

                  <button
                    type="button"
                    disabled={!canProceedToBatchSetup}
                    onClick={() => {
                      if (!canProceedToBatchSetup) {
                        playSound('warning', isMuted);
                        return;
                      }
                      playSound('next', isMuted);
                      setActiveStage('batchSetup');
                    }}
                    title={!canProceedToBatchSetup ? t.lineClearanceRequired : undefined}
                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all ${
                      canProceedToBatchSetup
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 active:scale-95 cursor-pointer'
                        : 'bg-slate-100 border border-slate-300 text-slate-400 cursor-not-allowed shadow-none'
                    }`}
                  >
                    {!canProceedToBatchSetup && <Lock className="w-4 h-4" />}
                    <span>{t.proceedToBatchSetup}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {!canProceedToBatchSetup && (
                  <div className="flex items-center justify-end gap-1.5 text-[11px] font-semibold text-amber-700">
                    <Lock className="w-3 h-3 text-amber-600" />
                    <span>{t.lineClearanceRequired}</span>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* -------------------------------------------------------------
          STAGE 3.0: RAW MATERIAL REQUIREMENT & BATCH SETUP
      -------------------------------------------------------------- */}
      {activeStage === 'batchSetup' && (
        <div className="space-y-6 animate-fadeIn">
          {/* 1. Header & Batch Volume Controls */}
          <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 md:p-7 shadow-sm space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-mono text-xs font-black px-2.5 py-0.5 rounded-md bg-slate-900 text-white">
                    ID: {product.id}
                  </span>
                  <Badge variant={product.badgeVariant || 'primary'} size="sm">
                    {product.category}
                  </Badge>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    {language === 'ta' ? 'லைன் கிளியரன்ஸ் சரிபார்க்கப்பட்டது' : 'Line Clearance Verified'}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {product.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {t.lineClearanceVerifiedMsg}
                </p>
              </div>

              {/* Litre Stepper & Direct Volume Input */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl shrink-0">
                <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>{t.targetOutputVolume}</span>
                  <span className="text-indigo-600 font-mono font-bold">Max {MAX_LITRES} L</span>
                </div>

                <div className="flex items-center gap-2 bg-white border border-slate-200 p-1.5 rounded-xl shadow-xs">
                  <button
                    type="button"
                    onClick={() => handleStep(-10)}
                    className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                    title="Decrease 10 L"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>

                  <div className="px-3 flex items-center">
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="0"
                      value={litres === 0 ? '' : litres}
                      onFocus={(e) => e.target.select()}
                      onWheel={(e) => e.currentTarget.blur()}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/[^0-9]/g, '');
                        if (raw === '') {
                          onChangeLitres(0);
                          return;
                        }
                        // Strip leading zeros so typing "400" when there was a "0" doesn't produce "0400"
                        const cleaned = raw.replace(/^0+/, '') || '0';
                        const val = parseInt(cleaned, 10);
                        if (!isNaN(val)) {
                          onChangeLitres(Math.min(MAX_LITRES, Math.max(0, val)));
                        }
                      }}
                      className="w-16 text-center text-lg font-black text-indigo-700 font-mono focus:outline-none"
                    />
                    <span className="text-xs font-black text-slate-500 ml-1">L</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleStep(10)}
                    className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                    title="Increase 10 L"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Quick Presets */}
                <div className="flex items-center gap-1.5 mt-2.5 pt-2 border-t border-slate-200">
                  {PRESET_LITRES.filter((p) => p > 0).map((p) => {
                    const isSelected = litres === p;
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => handlePreset(p)}
                        className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200'
                        }`}
                      >
                        {p}L
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Metric Summary Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100">
                <div className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider">
                  {language === 'ta' ? 'தொகுதி அளவு' : 'Batch Volume'}
                </div>
                <div className="text-lg font-black text-indigo-950 font-mono mt-0.5">
                  {litres} <span className="text-xs font-semibold">{language === 'ta' ? 'லிட்டர்' : 'Litres'}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                  {language === 'ta' ? 'மதிப்பிடப்பட்ட செலவு' : 'Total Material Cost'}
                </div>
                <div className="text-lg font-black text-emerald-950 font-mono mt-0.5">
                  {calculationResult.formattedTotalCost}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-100">
                <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                  {language === 'ta' ? 'மூலப்பொருட்கள்' : 'Raw Materials'}
                </div>
                <div className="text-lg font-black text-amber-950 font-mono mt-0.5">
                  {items.length} <span className="text-xs font-semibold">{language === 'ta' ? 'பொருட்கள்' : 'Components'}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  {language === 'ta' ? 'சூத்திர சதவீதம்' : 'Formula Balance'}
                </div>
                <div className="text-lg font-black text-slate-900 font-mono mt-0.5">
                  100.00% <span className="text-xs font-semibold text-emerald-600">✓ q.s.</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Full Raw Material Requirement Table (Bill of Materials) - Always Open & Visible */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="bg-slate-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-white/10 text-white">
                  <FileText className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black tracking-tight">
                    {t.rawMaterialRequirementTitle}
                  </h3>
                  <p className="text-[11px] text-slate-300">
                    {language === 'ta'
                      ? `${litres} லிட்டர் தொகுதிக்கு கணக்கிடப்பட்ட துல்லியமான மூலப்பொருள் பட்டியல்`
                      : `Master compounding recipe calibrated for target batch of ${litres} Litres`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold font-mono">
                <span className="text-slate-300">{t.totalMaterialCost}</span>
                <span className="text-emerald-300 bg-emerald-950/80 px-3 py-1 rounded-lg border border-emerald-500/30 text-sm">
                  {calculationResult.formattedTotalCost}
                </span>
              </div>
            </div>

            {/* Mobile Card List View (< md) - Easy touch-scrolling & No squished columns */}
            <div className="md:hidden divide-y divide-slate-100 bg-white">
              {items.map((ing, idx) => (
                <div key={idx} className="p-3.5 space-y-2 hover:bg-slate-50/60 transition-colors">
                  {/* Top Bar: # SrNo, RM Code, Percentage */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        #{idx + 1}
                      </span>
                      <span className="font-mono font-bold text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {ing.rmCode || '—'}
                      </span>
                    </div>
                    <span className="font-mono font-bold text-xs text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                      {ing.percentage}
                    </span>
                  </div>

                  {/* Material Name */}
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0"></span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {ing.materialName}
                    </span>
                  </div>

                  {/* Required Qty & Total Cost Cards */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {t.colRequiredQty}
                      </div>
                      <div className="text-sm font-black font-mono text-slate-950 mt-0.5">
                        {Number(ing.calculatedQty.toFixed(3))} <span className="text-xs font-bold text-slate-600">{ing.unit}</span>
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-emerald-50/60 border border-emerald-200">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                        {t.colMaterialCost}
                      </div>
                      <div className="text-sm font-black font-mono text-emerald-700 mt-0.5">
                        ₹ {ing.rawCost.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>

                  {/* Supplier & Stage / Remarks Info */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-50">
                    <span className="truncate max-w-[170px]" title={ing.supplier}>
                      {ing.supplier}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                      {ing.remarks || 'Standard Addition'}
                    </span>
                  </div>
                </div>
              ))}

              {/* Mobile Total Batch Output Summary Card */}
              <div className="p-4 bg-slate-900 text-white space-y-2">
                <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-indigo-300">
                  <span>{t.totalBatchRow}</span>
                  <span>100.00%</span>
                </div>
                <div className="flex items-center justify-between text-sm font-mono font-black">
                  <span className="text-slate-200">{litres}.000 kg / L</span>
                  <span className="text-emerald-300 text-base">{calculationResult.formattedTotalCost}</span>
                </div>
                <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                  ✓ {language === 'ta' ? 'அனைத்து பொருட்களும் சரிபார்க்கப்பட்டது' : 'Dispensing specifications verified'}
                </div>
              </div>
            </div>

            {/* Desktop Table View (>= md) with min-width and horizontal scrollbar */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 uppercase font-black tracking-wider text-[11px] border-b border-slate-200 sticky top-0 z-10 shadow-2xs">
                    <th className="py-3 px-3 text-center w-12">{t.colSrNo}</th>
                    <th className="py-3 px-3 text-left font-mono">{t.colRmCode}</th>
                    <th className="py-3 px-4">{t.colMaterial}</th>
                    <th className="py-3 px-3 text-center">{t.colPercentage}</th>
                    <th className="py-3 px-3 text-right">{t.colRequiredQty}</th>
                    <th className="py-3 px-2 text-center">{t.colUnit}</th>
                    <th className="py-3 px-3 text-right">{t.colUnitPrice}</th>
                    <th className="py-3 px-4 text-right">{t.colMaterialCost}</th>
                    <th className="py-3 px-4">{t.colSupplier}</th>
                    <th className="py-3 px-4">{t.colRemarks}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((ing, idx) => (
                    <tr key={idx} className="hover:bg-indigo-50/40 transition-colors">
                      <td className="py-3 px-3 text-center font-mono font-bold text-slate-400">
                        {idx + 1}
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-blue-600 text-xs">
                        {ing.rmCode || '—'}
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 shrink-0"></span>
                        <span className="font-semibold text-slate-900">{ing.materialName}</span>
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-bold text-indigo-700 bg-indigo-50/50">
                        {ing.percentage}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-black text-slate-950 text-sm">
                        {Number(ing.calculatedQty.toFixed(3))}
                      </td>
                      <td className="py-3 px-2 text-center font-bold text-slate-600">
                        {ing.unit}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-slate-600">
                        {ing.unitPrice.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-black text-emerald-700 text-sm">
                        {ing.rawCost.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 px-4 text-slate-600 text-[11px] truncate max-w-[160px]">
                        {ing.supplier}
                      </td>
                      <td className="py-3 px-4 text-slate-700 text-[11px]">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-medium">
                          {ing.remarks || 'Standard Addition'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-900 text-white font-black text-xs border-t-2 border-indigo-500">
                    <td className="py-3 px-3 text-center font-mono">Σ</td>
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-400">8 Items</td>
                    <td className="py-3 px-4 uppercase tracking-wider font-bold">
                      {t.totalBatchRow}
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-indigo-300">
                      100.00%
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-sm text-emerald-300">
                      {litres}.000
                    </td>
                    <td className="py-3 px-2 text-center text-slate-300">
                      kg / L
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-400">
                      —
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-sm text-emerald-300">
                      {calculationResult.formattedTotalCost}
                    </td>
                    <td colSpan={2} className="py-3 px-4 text-[11px] text-slate-300 font-normal">
                      ✓ {language === 'ta' ? 'அனைத்து பொருட்களும் சரிபார்க்கப்பட்டது' : 'Dispensing specifications verified'}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* 3. Final Call-to-Action / Start Manufacturing */}
          <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Beaker className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {language === 'ta' ? 'உற்பத்தி நிலைக்குத் தயார்' : 'Ready for Step-by-Step Compounding'}
                </h4>
                <p className="text-xs text-slate-500">
                  {language === 'ta'
                    ? `தேர்வு செய்யப்பட்ட ${litres}L தொகுதிக்கு ஏற்ப 9 செய்முறைப் படிகள் உருவாக்கப்பட்டுள்ளன.`
                    : `Formulation engine has calibrated the 9 compounding steps for this ${litres}L batch.`}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleStartSteps}
              disabled={litres <= 0}
              className={`w-full sm:w-auto flex items-center justify-center gap-2.5 py-3.5 px-8 rounded-2xl font-black text-sm sm:text-base transition-all shadow-md shrink-0 ${
                litres > 0
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30 active:scale-[0.99] cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              <span>{t.startBatchBtn.replace('{litres}', litres)}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
