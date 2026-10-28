import React from 'react';
import {
  FINANCIAL_DELTAS,
  SYNTHETIC_COMMITMENTS,
  SYNTHETIC_FINANCIALS,
} from '../data/syntheticData';
import { FinancialCharts } from './FinancialCharts';
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  FileSpreadsheet,
  ShieldAlert,
} from 'lucide-react';
import { ActiveTab } from './Header';

interface FinancialDashboardProps {
  onNavigateTab: (tab: ActiveTab) => void;
  onSelectQuestion: (questionId: string) => void;
}

export const FinancialDashboard: React.FC<FinancialDashboardProps> = ({
  onNavigateTab,
  onSelectQuestion,
}) => {
  const q3 = SYNTHETIC_FINANCIALS[2];

  return (
    <div className="space-y-8">
      {/* Executive Overview Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
            <span>Executive Briefing</span>
            <span>·</span>
            <span>Q3 FY26 Performance Audit</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
            Earnings Call Financial Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-600 max-w-3xl">
            A fictional listed enterprise facing divergence between top-line expansion and operational margins, severe cash flow contraction, and emerging segment deceleration.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onNavigateTab('simulator')}
            className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-slate-900 cursor-pointer"
          >
            <HelpCircle className="h-4 w-4 text-slate-500" />
            <span>Simulate Investor Inquiries</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('practice')}
            className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-slate-800 cursor-pointer"
          >
            <span>Practice Leadership Responses</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Metric Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Revenue */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-slate-300">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-medium">Consolidated Revenue</span>
            <span className="font-mono text-[11px] text-slate-400">Q3 FY26</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-3xl font-bold tracking-tight text-slate-900 tabular-nums">
              ₹1,160
            </span>
            <span className="text-xs font-semibold text-slate-500">crore</span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
            <span className="flex items-center gap-1 font-semibold text-emerald-700">
              <ArrowUpRight className="h-3.5 w-3.5" />
              +8.0% YoY (QoQ +₹80 cr)
            </span>
            <span className="text-slate-500 font-mono text-[11px]">
              +16.0% since Q1
            </span>
          </div>
          <p className="mt-2 text-[11px] text-slate-500 leading-normal">
            Solid top-line volume sustained by Core Products (+12% YoY).
          </p>
        </div>

        {/* Card 2: EBITDA Margin */}
        <div className="rounded-xl border border-amber-200 bg-amber-50/30 p-5 shadow-xs transition hover:border-amber-300">
          <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
            <span className="font-medium text-amber-950">EBITDA Margin</span>
            <span className="font-mono text-[11px] text-amber-800">Off Guidance</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-3xl font-bold tracking-tight text-amber-950 tabular-nums">
              15.2%
            </span>
            <span className="text-xs font-semibold text-amber-800">of revenue</span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-amber-100 pt-3 text-xs">
            <span className="flex items-center gap-1 font-semibold text-rose-700">
              <ArrowDownRight className="h-3.5 w-3.5" />
              -150 bps QoQ
            </span>
            <span className="font-mono text-[11px] text-rose-800 font-semibold">
              -280 bps since Q1 (18.0%)
            </span>
          </div>
          <p className="mt-2 text-[11px] text-amber-900/80 leading-normal">
            Misses H2 normalization commitment; unit profitability eroded.
          </p>
        </div>

        {/* Card 3: Operating Cash Flow */}
        <div className="rounded-xl border border-rose-200 bg-rose-50/30 p-5 shadow-xs transition hover:border-rose-300">
          <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
            <span className="font-medium text-rose-950">Operating Cash Flow</span>
            <span className="font-mono text-[11px] text-rose-800">Critical Gap</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-3xl font-bold tracking-tight text-rose-950 tabular-nums">
              ₹55
            </span>
            <span className="text-xs font-semibold text-rose-800">crore</span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-rose-100 pt-3 text-xs">
            <span className="flex items-center gap-1 font-semibold text-rose-700">
              <ArrowDownRight className="h-3.5 w-3.5" />
              -38.9% QoQ (-₹35 cr)
            </span>
            <span className="font-mono text-[11px] text-rose-800 font-semibold">
              -54.2% since Q1 (₹120 cr)
            </span>
          </div>
          <p className="mt-2 text-[11px] text-rose-900/80 leading-normal">
            Severe working capital blockage; cash conversion down to 31.2%.
          </p>
        </div>

        {/* Card 4: Segment Performance Divergence */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-slate-300">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-medium">Segment Growth Divergence</span>
            <span className="font-mono text-[11px] text-slate-400">YoY Split</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600">Core Products:</span>
              <span className="font-mono font-bold text-emerald-700">+12.0% YoY</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600">Emerging Products:</span>
              <span className="font-mono font-bold text-rose-600">-1.0% YoY (Decelerated)</span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
            <span className="text-slate-500">Deceleration:</span>
            <span className="font-mono text-[11px] text-rose-700 font-semibold">
              -400 bps vs Q1 (+3%)
            </span>
          </div>
          <p className="mt-2 text-[11px] text-slate-500 leading-normal">
            Emerging growth engine contracted, shifting dependence to Core.
          </p>
        </div>
      </div>

      {/* Interactive Charts Section */}
      <FinancialCharts />

      {/* Comprehensive Synthetic Financial Breakdown & Calculated Deltas Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4 text-slate-600" />
              Verified Disclosed Figures & Calculated Deltas
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Exact mathematical differences between Q1, Q2, and Q3 FY26 reporting periods.
            </p>
          </div>
          <span className="font-mono text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-md self-start sm:self-auto">
            Audit Standard: Strict Disclosed Numbers
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/75 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold">Financial Metric</th>
                <th className="py-3 px-4 font-semibold text-right font-mono">Q1 FY26</th>
                <th className="py-3 px-4 font-semibold text-right font-mono">Q2 FY26</th>
                <th className="py-3 px-4 font-semibold text-right font-mono">Q3 FY26</th>
                <th className="py-3 px-4 font-semibold text-right font-mono">QoQ Change (Q2 → Q3)</th>
                <th className="py-3 px-4 font-semibold text-right font-mono">2-Quarter Delta (Q1 → Q3)</th>
                <th className="py-3 px-4 font-semibold">Analytical Significance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {FINANCIAL_DELTAS.map((row) => (
                <tr key={row.metric} className="hover:bg-slate-50/50 transition">
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    {row.metric}{' '}
                    <span className="text-[10px] text-slate-400 font-normal">
                      ({row.unit})
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono tabular-nums text-slate-800">
                    {row.q1Val}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono tabular-nums text-slate-800">
                    {row.q2Val}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono tabular-nums font-bold text-slate-950 bg-slate-50/40">
                    {row.q3Val}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono tabular-nums font-semibold">
                    <span
                      className={
                        row.trend === 'positive'
                          ? 'text-emerald-700'
                          : row.trend === 'negative'
                          ? 'text-rose-700'
                          : 'text-slate-600'
                      }
                    >
                      {row.qoqChange}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono tabular-nums font-semibold">
                    <span
                      className={
                        row.trend === 'positive'
                          ? 'text-emerald-700'
                          : row.trend === 'negative'
                          ? 'text-rose-700'
                          : 'text-slate-600'
                      }
                    >
                      {row.twoQuarterDelta}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 max-w-xs leading-relaxed text-[11px]">
                    {row.significance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Previous Management Commitments Reconciliation Section */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-700 mb-1">
              <ShieldAlert className="h-4 w-4" />
              <span>Guidance Integrity Audit</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Previous Synthetic Management Commitments vs Q3 Reality
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Reconciling historical executive promises against verified Q3 results to prepare for sharp investor scrutiny.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              onSelectQuestion('q4-guidance');
              onNavigateTab('generator');
            }}
            className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer self-start sm:self-auto"
          >
            <span>Analyze Guidance Question</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {SYNTHETIC_COMMITMENTS.map((comm, idx) => (
            <div
              key={comm.id}
              className="rounded-lg border border-slate-200 bg-slate-50/50 p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs mb-2">
                  <span className="font-mono text-slate-500 font-semibold">
                    Commitment #{idx + 1}
                  </span>
                  <span
                    className={`font-semibold text-[11px] ${
                      comm.status === 'Critical Divergence'
                        ? 'text-rose-700'
                        : comm.status === 'Off Track'
                        ? 'text-amber-700'
                        : 'text-rose-800'
                    }`}
                  >
                    {comm.status}
                  </span>
                </div>

                <blockquote className="text-xs font-semibold text-slate-900 border-l-2 border-slate-400 pl-2.5 py-0.5 my-2">
                  "{comm.statement}"
                </blockquote>

                <div className="mt-3 space-y-2 text-xs">
                  <div>
                    <span className="text-slate-500 font-medium">Target Horizon:</span>{' '}
                    <span className="text-slate-800 font-mono text-[11px]">
                      {comm.targetHorizon}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium">Q3 Reality:</span>
                    <p className="text-slate-800 text-[11px] mt-0.5 leading-relaxed">
                      {comm.q3Reality}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/80">
                <p className="text-[11px] text-rose-800 font-medium leading-normal">
                  <strong>Variance:</strong> {comm.varianceDetail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
