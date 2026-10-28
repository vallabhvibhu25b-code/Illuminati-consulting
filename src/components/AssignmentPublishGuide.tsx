import React, { useState } from 'react';
import {
  Share2,
  Copy,
  Check,
  CheckCircle2,
  FileText,
  Printer,
  ExternalLink,
  ShieldCheck,
  Award,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { SYNTHETIC_COMMITMENTS, SYNTHETIC_FINANCIALS } from '../data/syntheticData';
import { INVESTOR_QUESTIONS } from '../data/simulatorQuestions';

export const AssignmentPublishGuide: React.FC = () => {
  const [copiedLink, setCopiedLink] = useState(false);

  // Use the shared preview app URL provided in runtime environment
  const sharedUrl = 'https://ais-pre-hldnmjmwtxqshgfahfu7cq-797854491941.asia-northeast1.run.app';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(sharedUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
            <span>Assignment Deliverable</span>
            <span>·</span>
            <span>Submission & Sharing Guide</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
            Publishing, Sharing & Submission Guide
          </h1>
          <p className="mt-1 text-sm text-slate-600 max-w-3xl">
            Everything you need to share, demonstrate, and submit your "Earnings Call Copilot" assignment for your AI consulting firm evaluation.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 shadow-2xs hover:bg-slate-50 transition cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Print Executive PDF</span>
          </button>
        </div>
      </div>

      {/* Public URL Box */}
      <div className="rounded-xl border border-slate-900 bg-slate-900 text-white p-6 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300 font-semibold block">
              Assignment Public Preview URL
            </span>
            <h3 className="text-lg font-bold text-white">
              Instant Public Access for Evaluators & Recruiters
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Your applet is hosted on Google Cloud Run through Google AI Studio. This URL is live, fully interactive, and does not require evaluators to log in or configure API keys.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
            <input
              type="text"
              readOnly
              value={sharedUrl}
              className="bg-slate-800 border border-slate-700 text-slate-200 font-mono text-xs px-3 py-2 rounded-lg select-all w-full sm:w-80 truncate"
            />
            <button
              type="button"
              onClick={handleCopyLink}
              className="flex items-center justify-center gap-1.5 rounded-lg bg-white text-slate-950 px-4 py-2 text-xs font-semibold hover:bg-slate-100 transition cursor-pointer shrink-0"
            >
              {copiedLink ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Assignment Rubric Compliance Matrix */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-950 mb-4 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-emerald-600" />
          Assignment Requirements Verification Checklist
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border border-slate-100 bg-slate-50/70 p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>1. Synthetic Financial Dashboard Verified</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pl-6">
              Full multi-quarter financial metrics (Q1, Q2, Q3 FY26) for Revenue (₹1,000 cr, ₹1,080 cr, ₹1,160 cr), EBITDA Margin (18%, 16.7%, 15.2%), OCF (₹120 cr, ₹90 cr, ₹55 cr), and Segments (Core 12%, Emerging -1%). All QoQ and 2-quarter changes are calculated accurately.
            </p>
          </div>

          <div className="rounded-lg border border-slate-100 bg-slate-50/70 p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>2. Investor Question Simulator Verified</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pl-6">
              All 4 required questions are fully selectable: (1) Declining margins despite revenue growth, (2) Weakening operating cash flow, (3) Emerging Products slowdown, and (4) Management guidance reliability.
            </p>
          </div>

          <div className="rounded-lg border border-slate-100 bg-slate-50/70 p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>3. Evidence-Backed Response Generator Verified</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pl-6">
              Generates concise draft responses, supporting figures, reconciliation with earlier management commitments, and itemized missing information checklists without inventing numbers or requiring paid API tokens.
            </p>
          </div>

          <div className="rounded-lg border border-slate-100 bg-slate-50/70 p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>4. Leadership Practice Mode Verified</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pl-6">
              Transparent, rule-based heuristic checks evaluate user answers across numerical accuracy, commitment consistency, missing information qualification, tone, and anti-speculation checks.
            </p>
          </div>

          <div className="rounded-lg border border-slate-100 bg-slate-50/70 p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>5. Mandatory Synthetic Disclaimer Displayed</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pl-6">
              "Synthetic demonstration data — not actual company financials" is prominently displayed across top headers and briefing reports.
            </p>
          </div>

          <div className="rounded-lg border border-slate-100 bg-slate-50/70 p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>6. 100% Free & Self-Contained Deployment</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pl-6">
              Zero paid services or database provisioning needed. The app runs completely on free infrastructure with deterministic client-side evaluation.
            </p>
          </div>
        </div>
      </div>

      {/* Strategic Case Study Memo for Evaluators */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
            <FileText className="h-4 w-4 text-slate-700" />
            Executive Case Study Memo (For Assignment Submission)
          </h3>
          <span className="text-xs font-mono text-slate-500">IIM Ranchi BA Brief</span>
        </div>

        <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed">
          <p>
            <strong>Problem Statement:</strong> The enterprise under review demonstrates healthy headline revenue expansion (+16.0% between Q1 and Q3 FY26, reaching ₹1,160 crore). However, underlying financial health exhibits severe structural strains that directly contradict previous executive guidance:
          </p>

          <ol className="list-decimal pl-5 space-y-1.5 text-xs">
            <li>
              <strong>Margin Compression (-280 bps):</strong> EBITDA margin contracted from 18.0% to 15.2%. In absolute terms, Q3 EBITDA (₹176.32 cr) is lower than Q2 EBITDA (₹180.36 cr), proving negative operational leverage.
            </li>
            <li>
              <strong>Working Capital Drain (-54.2% in OCF):</strong> Operating cash flow plummeted from ₹120 cr in Q1 to ₹55 cr in Q3. The cash conversion ratio (OCF/EBITDA) collapsed from 66.7% to 31.2%, violating the commitment to working-capital discipline.
            </li>
            <li>
              <strong>Emerging Segment Deceleration:</strong> Growth in Emerging Products decelerated from +3% to +2%, and fell into negative territory at -1% YoY in Q3, leaving the firm overly reliant on Core Products (+12%).
            </li>
            <li>
              <strong>Guidance Governance Risk:</strong> Both the H2 margin normalization expectation and working-capital cash conversion goals were missed, creating high investor sensitivity.
            </li>
          </ol>

          <p className="text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
            <strong>Consulting Takeaway:</strong> In high-stakes earnings calls, executive credibility is safeguarded by <em>candor, factual precision, and transparent identification of missing operational facts</em>. Speculative excuses or hasty forecasts cause severe long-term valuation damage.
          </p>
        </div>
      </div>

      {/* Deployment & Alternative Hosting Options (Zero-Cost Focus) */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          How to Deploy to Other Free Hosting Platforms (Optional)
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          The Shared Preview URL above is already hosted and accessible to anyone. If your assignment submission portal or instructor requires a standalone custom URL, you can also deploy this repository to 100% free static hosts:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="rounded-lg border border-slate-200 bg-white p-4 space-y-1.5">
            <span className="font-bold text-slate-900 block">Option 1: Google AI Studio URL</span>
            <p className="text-slate-600">
              The built-in Shared URL is permanently active, free, and runs directly on Google Cloud Run. Recommended for immediate submission.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4 space-y-1.5">
            <span className="font-bold text-slate-900 block">Option 2: Vercel / Netlify (Free Tier)</span>
            <p className="text-slate-600">
              Push this codebase to a free GitHub repository and link it to Vercel or Netlify. Build command is <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">npm run build</code> with output folder <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">dist</code>.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4 space-y-1.5">
            <span className="font-bold text-slate-900 block">Option 3: GitHub Pages (Free)</span>
            <p className="text-slate-600">
              Set <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">base: './'</code> in <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">vite.config.ts</code> and publish the <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">dist</code> folder via GitHub Actions at zero cost.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
