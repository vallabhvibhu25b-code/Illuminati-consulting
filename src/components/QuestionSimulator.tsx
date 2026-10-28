import React from 'react';
import { INVESTOR_QUESTIONS, QuestionEvidence } from '../data/simulatorQuestions';
import {
  HelpCircle,
  ArrowRight,
  TrendingDown,
  AlertTriangle,
  FileCheck,
  PenTool,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { ActiveTab } from './Header';

interface QuestionSimulatorProps {
  selectedQuestionId: string;
  onSelectQuestion: (questionId: string) => void;
  onNavigateTab: (tab: ActiveTab) => void;
}

export const QuestionSimulator: React.FC<QuestionSimulatorProps> = ({
  selectedQuestionId,
  onSelectQuestion,
  onNavigateTab,
}) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
            <span>Investor Relations Simulator</span>
            <span>·</span>
            <span>Live Q&A Readiness</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
            High-Stakes Investor Question Simulator
          </h1>
          <p className="mt-1 text-sm text-slate-600 max-w-3xl">
            Simulate the four most challenging questions equity research analysts and institutional investors will press management on during the Q3 earnings call.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg self-start md:self-auto font-mono">
          <span>4 Critical Scenarios Modeled</span>
        </div>
      </div>

      {/* Questions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {INVESTOR_QUESTIONS.map((q, idx) => {
          const isSelected = q.id === selectedQuestionId;

          return (
            <div
              key={q.id}
              className={`rounded-xl border transition-all p-6 flex flex-col justify-between ${
                isSelected
                  ? 'border-slate-900 bg-white shadow-md ring-1 ring-slate-900/10'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div>
                {/* Meta header */}
                <div className="flex items-center justify-between gap-3 text-xs mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-400">
                      0{idx + 1}.
                    </span>
                    <span className="font-semibold text-slate-700">
                      {q.shortLabel}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-slate-500">
                    High Analyst Scrutiny
                  </span>
                </div>

                {/* Question Title */}
                <h3 className="text-lg font-bold text-slate-950 tracking-tight leading-snug">
                  "{q.question}"
                </h3>

                {/* Analyst Intent */}
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">Analyst Perspective:</strong> {q.analystIntent}
                </p>

                {/* Key Disclosed Facts Summary Strip */}
                <div className="mt-4 rounded-lg bg-slate-50 p-3 border border-slate-100 space-y-2">
                  <span className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider block">
                    Disclosed Financial Baseline:
                  </span>
                  <div className="grid grid-cols-1 gap-1.5">
                    {q.disclosedFacts.map((fact, fIdx) => (
                      <div key={fIdx} className="flex items-start justify-between text-xs gap-2">
                        <span className="text-slate-500">{fact.label}:</span>
                        <span className="font-mono font-bold text-slate-900 shrink-0 text-right">
                          {fact.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Conflicting Commitments Warning */}
                {q.earlierCommitments.length > 0 && (
                  <div className="mt-3 text-xs text-amber-950 bg-amber-50/70 border border-amber-200/80 rounded-md p-2.5">
                    <span className="font-semibold block text-[11px] text-amber-900 mb-0.5">
                      Conflicting Guidance Commitment:
                    </span>
                    <p className="text-[11px] text-amber-900/90 italic">
                      "{q.earlierCommitments[0].commitment}"
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onSelectQuestion(q.id);
                    onNavigateTab('generator');
                  }}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-950 transition cursor-pointer"
                >
                  <FileCheck className="h-3.5 w-3.5 text-slate-500" />
                  <span>View Prepared Dossier</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onSelectQuestion(q.id);
                    onNavigateTab('practice');
                  }}
                  className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-slate-800 transition cursor-pointer"
                >
                  <PenTool className="h-3.5 w-3.5 text-amber-300" />
                  <span>Practice Response</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Simulator Guidance Note */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-xs text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-slate-900 text-sm">
            Methodology Note for Business Analysts
          </h4>
          <p className="mt-1 leading-relaxed text-slate-600">
            In actual corporate earnings calls, spontaneous, defensive answers without factual substantiation lead directly to analyst downgrades and share price volatility. Every simulated response must reconcile prior management commitments and isolate unverified operational drivers.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigateTab('guide')}
          className="rounded-lg bg-white border border-slate-300 px-3.5 py-2 font-semibold text-slate-800 hover:bg-slate-100 transition whitespace-nowrap shrink-0 cursor-pointer text-xs"
        >
          View Case Study Rubric
        </button>
      </div>
    </div>
  );
};
