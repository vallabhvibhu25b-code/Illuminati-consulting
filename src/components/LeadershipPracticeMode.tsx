import React, { useState } from 'react';
import { INVESTOR_QUESTIONS, QuestionEvidence } from '../data/simulatorQuestions';
import { evaluateProposedResponse, EvaluationResult } from '../utils/responseEvaluator';
import {
  Sparkles,
  Send,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  Info,
  ShieldCheck,
  Award,
  BookOpen,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { ActiveTab } from './Header';

interface LeadershipPracticeModeProps {
  selectedQuestionId: string;
  onSelectQuestion: (questionId: string) => void;
  onNavigateTab: (tab: ActiveTab) => void;
}

export const LeadershipPracticeMode: React.FC<LeadershipPracticeModeProps> = ({
  selectedQuestionId,
  onSelectQuestion,
  onNavigateTab,
}) => {
  const activeQuestion =
    INVESTOR_QUESTIONS.find((q) => q.id === selectedQuestionId) ||
    INVESTOR_QUESTIONS[0];

  const [userText, setUserText] = useState<string>('');
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);

  const wordCount = userText.trim().split(/\s+/).filter(Boolean).length;

  const handleRunEvaluation = () => {
    setIsEvaluating(true);
    // Smooth micro-settling interaction
    setTimeout(() => {
      const result = evaluateProposedResponse(activeQuestion, userText);
      setEvaluation(result);
      setIsEvaluating(false);
    }, 250);
  };

  const handleLoadBenchmark = () => {
    setUserText(activeQuestion.draftAnswer);
    setEvaluation(null);
  };

  const handleLoadWeakSample = () => {
    // A sample answer full of real-world executive errors: unsupported raw material claims, ignoring earlier guidance, and no exact numbers
    let weakSample = '';
    if (activeQuestion.id === 'q1-margins') {
      weakSample =
        'Margins are a bit lower because raw material prices spiked by 25% and freight rates doubled due to geopolitical friction. We are confident this is just a temporary blip, and our new marketing initiatives will definitely rebound our margins to 20% in Q4.';
    } else if (activeQuestion.id === 'q2-cashflow') {
      weakSample =
        'Our cash flow was impacted because customers delayed payments due to seasonal factors. Working capital will automatically normalize very soon, so investors should not worry about liquidity.';
    } else if (activeQuestion.id === 'q3-emerging') {
      weakSample =
        'Emerging products had some slowdown because competitors cut prices aggressively in our key markets. We will launch an upgraded product suite next month that will restore rapid 25% growth.';
    } else {
      weakSample =
        'Investors can still trust our earlier guidance completely. External headwinds were beyond our control, but our fundamental long-term strategy remains unchanged and we stand by all targets.';
    }
    setUserText(weakSample);
    setEvaluation(null);
  };

  const handleClear = () => {
    setUserText('');
    setEvaluation(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
            <span>Executive Readiness Lab</span>
            <span>·</span>
            <span>Leadership Practice Mode</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
            Interactive Response Evaluation Simulator
          </h1>
          <p className="mt-1 text-sm text-slate-600 max-w-3xl">
            Draft an answer to test your executive precision. Responses are evaluated against disclosed facts, guidance reconciliation, transparent missing information qualification, and absence of speculative claims.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            type="button"
            onClick={() => onNavigateTab('generator')}
            className="rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            Review Evidence Dossier
          </button>
        </div>
      </div>

      {/* Select Question Bar */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Select Practice Question:
          </span>
          <span className="text-xs text-slate-500 font-mono">
            4 of 4 Scenarios Ready
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {INVESTOR_QUESTIONS.map((q, idx) => {
            const isSelected = q.id === activeQuestion.id;
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => {
                  onSelectQuestion(q.id);
                  setEvaluation(null);
                }}
                className={`text-left p-3 rounded-lg border text-xs font-medium transition cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-slate-900 bg-slate-900 text-white shadow-2xs'
                    : 'border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`font-mono text-[10px] ${isSelected ? 'text-amber-300' : 'text-slate-500'}`}>
                    Q0{idx + 1}
                  </span>
                  <span className={`text-[10px] ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {q.shortLabel}
                  </span>
                </div>
                <p className="line-clamp-2 font-semibold leading-snug">
                  {q.question}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Question Prompt Box */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Live Practice Query
            </span>
            <h3 className="text-lg font-bold text-slate-950">
              "{activeQuestion.question}"
            </h3>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              <strong className="text-slate-800">Key Disclosed Figures to Anchor:</strong>{' '}
              {activeQuestion.disclosedFacts.map((f) => `${f.label} (${f.value})`).join(' · ')}
            </p>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <label htmlFor="response-input" className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Type Your Proposed Response as CEO / CFO:
          </label>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={handleLoadBenchmark}
              className="text-xs text-slate-700 hover:text-slate-950 font-medium underline-offset-2 hover:underline cursor-pointer"
            >
              Load Benchmark Response
            </button>
            <span className="text-slate-300">·</span>
            <button
              type="button"
              onClick={handleLoadWeakSample}
              className="text-xs text-rose-700 hover:text-rose-900 font-medium underline-offset-2 hover:underline cursor-pointer"
            >
              Load Sample Evasive Answer
            </button>
            <span className="text-slate-300">·</span>
            <button
              type="button"
              onClick={handleClear}
              className="text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>

        <textarea
          id="response-input"
          value={userText}
          onChange={(e) => setUserText(e.target.value)}
          placeholder="Draft your executive response here... e.g. 'We acknowledge that our reported EBITDA margin compressed to 15.2% in Q3, despite revenue growing to ₹1,160 crore...'"
          rows={7}
          className="w-full rounded-lg border border-slate-300 p-4 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 focus:outline-none transition leading-relaxed font-sans"
        />

        {/* Input Bar Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs pt-1">
          <div className="flex items-center gap-3 text-slate-500 font-mono text-[11px]">
            <span>
              Words: <strong className="text-slate-900">{wordCount}</strong>
            </span>
            <span>·</span>
            <span>
              Target: <span className="text-slate-700">80 – 200 words</span>
            </span>
            <span>·</span>
            <span>
              Tone: <span className="text-slate-700">Non-defensive, direct</span>
            </span>
          </div>

          <button
            type="button"
            disabled={wordCount === 0 || isEvaluating}
            onClick={handleRunEvaluation}
            className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-semibold text-white shadow-2xs transition cursor-pointer self-start sm:self-auto ${
              wordCount === 0 || isEvaluating
                ? 'bg-slate-300 cursor-not-allowed'
                : 'bg-slate-900 hover:bg-slate-800 active:scale-[0.98]'
            }`}
          >
            {isEvaluating ? (
              <>
                <RotateCcw className="h-3.5 w-3.5 animate-spin" />
                <span>Auditing Response...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Evaluate Response</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Evaluation Result Display */}
      {evaluation && (
        <div className="space-y-6">
          {/* Top Score Banner */}
          <div
            className={`rounded-xl border p-6 shadow-xs ${
              evaluation.overallScore >= 80
                ? 'border-emerald-200 bg-emerald-50/50'
                : evaluation.overallScore >= 60
                ? 'border-amber-200 bg-amber-50/50'
                : 'border-rose-200 bg-rose-50/50'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-1">
                  <span
                    className={
                      evaluation.overallScore >= 80
                        ? 'text-emerald-800'
                        : evaluation.overallScore >= 60
                        ? 'text-amber-800'
                        : 'text-rose-800'
                    }
                  >
                    Evaluation Verdict:
                  </span>
                  <span className="font-bold text-slate-900">
                    {evaluation.overallAssessment}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-950">
                  {evaluation.summary}
                </h3>
                <p className="mt-1 text-xs text-slate-600 max-w-2xl leading-relaxed">
                  {evaluation.evaluationMethodologyNote}
                </p>
              </div>

              {/* Numerical Score Ring / Box */}
              <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-4 shadow-2xs self-start md:self-auto">
                <div className="text-center">
                  <span className="font-mono text-3xl font-extrabold text-slate-950 tabular-nums">
                    {evaluation.overallScore}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">/100</span>
                  <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    Score
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Rubric Checks Breakdown */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
              Executive Evaluation Rubric Checklist
            </h3>

            <div className="space-y-4">
              {evaluation.checks.map((check, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-slate-100 bg-slate-50/70 p-4 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs gap-3">
                    <div className="flex items-center gap-2">
                      {check.status === 'pass' ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      ) : check.status === 'warning' ? (
                        <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                      ) : (
                        <XCircle className="h-4 w-4 text-rose-600 shrink-0" />
                      )}
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">
                        {check.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span
                        className={`font-semibold ${
                          check.status === 'pass'
                            ? 'text-emerald-700'
                            : check.status === 'warning'
                            ? 'text-amber-700'
                            : 'text-rose-700'
                        }`}
                      >
                        {check.score}/100
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                    {check.details}
                  </p>

                  <div className="pl-6 pt-1 text-[11px] text-slate-700">
                    <strong className="text-slate-900">Actionable Suggestion:</strong> {check.actionableFeedback}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strengths & Actionable Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Response Strengths
              </h4>
              {evaluation.strengths.length > 0 ? (
                <ul className="space-y-2 text-xs text-slate-700">
                  {evaluation.strengths.map((str, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold shrink-0">✓</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-500 italic">
                  No clear quantitative or guidance strengths detected yet. Try incorporating the disclosed figures.
                </p>
              )}
            </div>

            {/* Improvement Suggestions */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                Key Improvement Opportunities
              </h4>
              {evaluation.improvementSuggestions.length > 0 ? (
                <ul className="space-y-2 text-xs text-slate-700">
                  {evaluation.improvementSuggestions.map((imp, iIdx) => (
                    <li key={iIdx} className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold shrink-0">→</span>
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-emerald-700 font-medium">
                  Response is highly disciplined and meets executive standards.
                </p>
              )}
            </div>
          </div>

          {/* Benchmark Comparison Accordion */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-slate-600" />
              Side-by-Side Comparison: Your Draft vs Benchmark Model Response
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* User Draft */}
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-2">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200">
                  <span className="font-bold text-slate-800">Your Submitted Draft</span>
                  <span className="font-mono text-[11px] text-slate-500">{wordCount} words</span>
                </div>
                <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-line font-sans">
                  {userText}
                </p>
              </div>

              {/* Benchmark Draft */}
              <div className="rounded-lg border border-slate-900 bg-slate-950 text-white p-4 space-y-2">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                  <span className="font-bold text-emerald-400">Official Benchmark Model Response</span>
                  <span className="font-mono text-[11px] text-slate-400">Gold Standard</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line font-sans">
                  {activeQuestion.draftAnswer}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
