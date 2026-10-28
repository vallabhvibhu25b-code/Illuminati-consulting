import React, { useState } from 'react';
import { INVESTOR_QUESTIONS, QuestionEvidence } from '../data/simulatorQuestions';
import {
  Copy,
  Check,
  ShieldCheck,
  AlertOctagon,
  FileText,
  Volume2,
  VolumeX,
  ExternalLink,
  CheckSquare,
  Square,
  HelpCircle,
  PenTool,
  Bookmark,
} from 'lucide-react';
import { ActiveTab } from './Header';

interface ResponseGeneratorProps {
  selectedQuestionId: string;
  onSelectQuestion: (questionId: string) => void;
  onNavigateTab: (tab: ActiveTab) => void;
}

export const ResponseGenerator: React.FC<ResponseGeneratorProps> = ({
  selectedQuestionId,
  onSelectQuestion,
  onNavigateTab,
}) => {
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [verifiedItems, setVerifiedItems] = useState<Record<string, boolean>>({});

  const activeQuestion =
    INVESTOR_QUESTIONS.find((q) => q.id === selectedQuestionId) ||
    INVESTOR_QUESTIONS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeQuestion.draftAnswer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleSpeak = () => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(activeQuestion.draftAnswer);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const toggleVerificationItem = (itemKey: string) => {
    setVerifiedItems((prev) => ({
      ...prev,
      [itemKey]: !prev[itemKey],
    }));
  };

  return (
    <div className="space-y-8">
      {/* Page Title & Question Selector Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
            <span>Executive Response Dossier</span>
            <span>·</span>
            <span>Deterministic Synthesis</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
            Evidence-Backed Response Generator
          </h1>
          <p className="mt-1 text-sm text-slate-600 max-w-3xl">
            Fact-grounded briefings structured for CEO & CFO delivery. Each response reconciles prior guidance, proves claims with verified figures, and explicitly lists missing data points.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigateTab('practice')}
          className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-slate-800 transition cursor-pointer self-start md:self-auto shrink-0"
        >
          <PenTool className="h-3.5 w-3.5 text-amber-300" />
          <span>Practice This Response</span>
        </button>
      </div>

      {/* Horizontal Question Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200 scrollbar-none">
        {INVESTOR_QUESTIONS.map((q, idx) => {
          const isActive = q.id === activeQuestion.id;
          return (
            <button
              key={q.id}
              type="button"
              onClick={() => onSelectQuestion(q.id)}
              className={`rounded-lg px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-2 shrink-0 ${
                isActive
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span className={`font-mono ${isActive ? 'text-amber-300' : 'text-slate-400'}`}>
                0{idx + 1}
              </span>
              <span>{q.shortLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Active Question Context Banner */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold block mb-1">
              Active Inquiring Scenario
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight">
              "{activeQuestion.question}"
            </h2>
            <p className="mt-2 text-xs text-slate-600 max-w-3xl leading-relaxed">
              <strong className="text-slate-800">Analyst Scrutiny Context:</strong> {activeQuestion.analystIntent}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start shrink-0">
            <span className="text-xs font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md font-mono">
              Zero-Hallucination Standard
            </span>
          </div>
        </div>
      </div>

      {/* 2-Column Responsive Layout: Left: Draft Answer & Commitments, Right: Evidence & Missing Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Draft Answer & Earlier Commitments */}
        <div className="lg:col-span-7 space-y-6">
          {/* Executive Draft Answer Card */}
          <div className="rounded-xl border border-slate-900 bg-slate-950 text-white p-6 shadow-md">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <h3 className="text-sm font-bold tracking-tight text-white uppercase">
                  Executive-Ready Draft Answer
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {'speechSynthesis' in window && (
                  <button
                    type="button"
                    onClick={toggleSpeak}
                    className="flex items-center gap-1.5 rounded-md bg-slate-800 px-2.5 py-1.5 text-[11px] font-medium text-slate-200 hover:bg-slate-700 transition cursor-pointer"
                    title={isSpeaking ? 'Stop Audio' : 'Listen to Spoken Delivery'}
                  >
                    {isSpeaking ? (
                      <>
                        <VolumeX className="h-3.5 w-3.5 text-rose-400" />
                        <span>Stop</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="h-3.5 w-3.5 text-slate-300" />
                        <span>Listen</span>
                      </>
                    )}
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 rounded-md bg-white text-slate-950 px-2.5 py-1.5 text-[11px] font-semibold hover:bg-slate-100 transition cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Answer</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Answer Text */}
            <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-200 leading-relaxed space-y-3 font-sans whitespace-pre-line">
              {activeQuestion.draftAnswer}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>Delivery Time: ~45–60 seconds</span>
              <span>Tone: Direct, Factual, Non-Defensive</span>
            </div>
          </div>

          {/* Earlier Management Commitments Reconciliation */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4 text-slate-600" />
              Prior Management Commitments & Reconciliation
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Addressing earlier guidance head-on protects executive credibility and pre-empts hostile analyst follow-ups.
            </p>

            <div className="space-y-4">
              {activeQuestion.earlierCommitments.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-slate-900">
                      Commitment: "{item.commitment}"
                    </span>
                    <span
                      className={`font-semibold text-[11px] ${
                        item.alignmentStatus === 'Direct Conflict'
                          ? 'text-rose-700'
                          : 'text-amber-700'
                      }`}
                    >
                      {item.alignmentStatus}
                    </span>
                  </div>

                  <div className="text-slate-600 text-[11px]">
                    <span className="font-medium text-slate-700">Original Horizon:</span> {item.horizon}
                  </div>

                  <div className="pt-2 border-t border-slate-200 text-slate-800 leading-relaxed text-xs">
                    <strong className="text-slate-900">Reconciliation Logic:</strong> {item.reconciliationNotes}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Critical Pitfalls: What NOT to Say */}
          <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-5 shadow-xs">
            <h3 className="text-sm font-bold text-rose-950 uppercase tracking-wider mb-2 flex items-center gap-2">
              <AlertOctagon className="h-4 w-4 text-rose-600" />
              Critical Traps: What NOT to Say on the Call
            </h3>
            <p className="text-xs text-rose-900/80 mb-3">
              Common executive communication errors that trigger immediate analyst skepticism.
            </p>

            <ul className="space-y-2 text-xs text-rose-950">
              {activeQuestion.doNotSay.map((trap, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-white/80 border border-rose-200/60 rounded-md p-2.5">
                  <span className="font-bold text-rose-700 shrink-0 font-mono">✕</span>
                  <span className="leading-relaxed">{trap}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column (5 cols): Disclosed Facts & Missing Information Checklist */}
        <div className="lg:col-span-5 space-y-6">
          {/* Disclosed Financial Figures Panel */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Disclosed Supporting Figures
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Verified financial facts approved for public citation.
            </p>

            <div className="space-y-3">
              {activeQuestion.disclosedFacts.map((fact, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-slate-100 bg-slate-50/75 p-3.5 space-y-1"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{fact.label}</span>
                    <span className="font-mono font-bold text-slate-950 text-right">{fact.value}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-normal">
                    {fact.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Missing Information & Verification Checklist (Crucial for Business Analyst!) */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Missing Information Checklist
              </h3>
              <span className="font-mono text-[11px] text-slate-500">
                Action Owner Audit
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Items that must be audited and verified before providing granular causal explanations. Check off items as you verify with finance leads.
            </p>

            <div className="space-y-3">
              {activeQuestion.missingInformation.map((info, idx) => {
                const key = `${activeQuestion.id}-${idx}`;
                const isChecked = !!verifiedItems[key];

                return (
                  <div
                    key={idx}
                    onClick={() => toggleVerificationItem(key)}
                    className={`rounded-lg border p-3.5 cursor-pointer transition select-none ${
                      isChecked
                        ? 'border-emerald-300 bg-emerald-50/40 text-slate-800'
                        : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="mt-0.5 shrink-0 text-slate-600">
                        {isChecked ? (
                          <CheckSquare className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <Square className="h-4 w-4 text-slate-400" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <h4 className={`text-xs font-semibold ${isChecked ? 'text-emerald-950 line-through' : 'text-slate-900'}`}>
                            {info.item}
                          </h4>
                          <span className="font-mono text-[10px] text-slate-500 bg-slate-200/60 px-1.5 py-0.5 rounded shrink-0">
                            {info.actionOwner}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          <strong>Why Required:</strong> {info.whyRequired}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>
                Verified: {Object.keys(verifiedItems).filter((k) => k.startsWith(activeQuestion.id) && verifiedItems[k]).length} of {activeQuestion.missingInformation.length} items
              </span>
              <button
                type="button"
                onClick={() => {
                  const newMap = { ...verifiedItems };
                  activeQuestion.missingInformation.forEach((_, i) => {
                    newMap[`${activeQuestion.id}-${i}`] = true;
                  });
                  setVerifiedItems(newMap);
                }}
                className="text-xs text-slate-700 font-medium underline cursor-pointer hover:text-slate-900"
              >
                Mark all verified
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
