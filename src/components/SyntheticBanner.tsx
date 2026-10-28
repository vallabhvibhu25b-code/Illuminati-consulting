import React, { useState } from 'react';
import { AlertCircle, ChevronDown, ChevronUp, Database } from 'lucide-react';

export const SyntheticBanner: React.FC = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <aside aria-label="Demonstration Notice" className="border-b border-amber-200 bg-amber-50/80 text-amber-950 transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8 text-xs">
        <div className="flex items-center gap-2.5">
          <AlertCircle className="h-4 w-4 shrink-0 text-amber-700" />
          <span className="font-semibold tracking-wide">
            Synthetic demonstration data — not actual company financials.
          </span>
          <span className="hidden md:inline text-amber-800">
            Prepared for Business Analyst Earnings Call Preparation Case Study.
          </span>
        </div>
        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-1 font-medium text-amber-900 underline-offset-4 hover:underline cursor-pointer"
        >
          <span>{showDetails ? 'Hide Scenario Notes' : 'Scenario Notes & Data Integrity'}</span>
          {showDetails ? (
            <ChevronUp className="h-3.5 w-3.5" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      {showDetails && (
        <div className="border-t border-amber-200/60 bg-amber-100/50 px-4 py-3 sm:px-6 lg:px-8 text-xs text-amber-900">
          <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="font-semibold text-amber-950 mb-1 flex items-center gap-1.5">
                <Database className="h-3.5 w-3.5" />
                Case Study Scope
              </p>
              <p className="leading-relaxed">
                Fictional listed enterprise demonstrating growing top-line revenue alongside compressed margins (-280 bps), severely deteriorating operating cash flow (-54.2%), and Emerging Products contraction (-1% YoY in Q3).
              </p>
            </div>
            <div>
              <p className="font-semibold text-amber-950 mb-1">
                Zero-Fabrication Guardrail
              </p>
              <p className="leading-relaxed">
                The generator uses deterministic, question-specific logic. It strictly delineates disclosed figures from missing operational items (COGS waterfall, DSO, channel inventory) requiring CFO verification.
              </p>
            </div>
            <div>
              <p className="font-semibold text-amber-950 mb-1">
                Self-Contained Execution
              </p>
              <p className="leading-relaxed">
                No external database, no paid AI tokens, and no user login required. Complete mathematical consistency and rubric evaluations execute entirely in-browser.
              </p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
