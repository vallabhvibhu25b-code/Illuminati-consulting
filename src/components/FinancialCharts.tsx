import React, { useState } from 'react';
import { SYNTHETIC_FINANCIALS } from '../data/syntheticData';
import { TrendingDown, TrendingUp, Info } from 'lucide-react';

type ChartMetric = 'financials' | 'margins' | 'segments';

export const FinancialCharts: React.FC = () => {
  const [selectedView, setSelectedView] = useState<ChartMetric>('financials');
  const [activeQuarterIdx, setActiveQuarterIdx] = useState<number>(2); // Default to Q3 FY26

  const quarters = SYNTHETIC_FINANCIALS;
  const current = quarters[activeQuarterIdx];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
      {/* Chart Header & View Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Multi-Quarter Trajectory Analysis
            <span className="text-xs font-normal text-slate-500">
              (Q1 FY26 – Q3 FY26)
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Compare top-line expansion with underlying operational leverage and liquidity conversion.
          </p>
        </div>

        {/* Segmented Chart View Switcher */}
        <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setSelectedView('financials')}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition cursor-pointer whitespace-nowrap ${
              selectedView === 'financials'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Volume vs Cash (₹ Cr)
          </button>
          <button
            type="button"
            onClick={() => setSelectedView('margins')}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition cursor-pointer whitespace-nowrap ${
              selectedView === 'margins'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Margins & Conversion (%)
          </button>
          <button
            type="button"
            onClick={() => setSelectedView('segments')}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition cursor-pointer whitespace-nowrap ${
              selectedView === 'segments'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Segment Growth (%)
          </button>
        </div>
      </div>

      {/* Main Chart Canvas Area */}
      <div className="py-6">
        {selectedView === 'financials' && (
          <div>
            <div className="flex items-center justify-between mb-4 text-xs text-slate-600">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-xs bg-slate-800 inline-block" />
                  <span className="font-medium text-slate-900">Revenue (₹ Cr)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-xs bg-emerald-600 inline-block" />
                  <span className="font-medium text-slate-900">EBITDA (₹ Cr)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-xs bg-rose-500 inline-block" />
                  <span className="font-medium text-slate-900">Operating Cash Flow (₹ Cr)</span>
                </span>
              </div>
              <span className="font-mono text-[11px] text-slate-400">Values in ₹ Crore</span>
            </div>

            {/* SVG Visual */}
            <div className="relative h-64 w-full">
              <svg className="h-full w-full overflow-visible" viewBox="0 0 600 220" preserveAspectRatio="none">
                {/* Gridlines */}
                {[0, 300, 600, 900, 1200].map((val) => {
                  const y = 200 - (val / 1200) * 180;
                  return (
                    <g key={val}>
                      <line x1="50" y1={y} x2="580" y2={y} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                      <text x="42" y={y + 4} textAnchor="end" className="text-[10px] fill-slate-400 font-mono">
                        {val}
                      </text>
                    </g>
                  );
                })}

                {/* Quarters Bars / Points */}
                {quarters.map((q, idx) => {
                  const xGroup = 110 + idx * 170;
                  const revHeight = (q.revenue / 1200) * 180;
                  const ebitdaHeight = (q.ebitdaAmount / 1200) * 180;
                  const ocfHeight = (q.operatingCashFlow / 1200) * 180;

                  const isSelected = activeQuarterIdx === idx;

                  return (
                    <g
                      key={q.quarter}
                      className="cursor-pointer transition-opacity hover:opacity-90"
                      onClick={() => setActiveQuarterIdx(idx)}
                    >
                      {/* Selection highlight column */}
                      {isSelected && (
                        <rect
                          x={xGroup - 45}
                          y={10}
                          width={110}
                          height={195}
                          fill="#f8fafc"
                          rx={8}
                          stroke="#cbd5e1"
                          strokeWidth="1"
                        />
                      )}

                      {/* Revenue Bar */}
                      <rect
                        x={xGroup - 35}
                        y={200 - revHeight}
                        width={22}
                        height={revHeight}
                        fill="#1e293b"
                        rx={3}
                      />
                      <text
                        x={xGroup - 24}
                        y={192 - revHeight}
                        textAnchor="middle"
                        className="text-[10px] font-bold fill-slate-900 font-mono"
                      >
                        ₹{q.revenue}
                      </text>

                      {/* EBITDA Bar */}
                      <rect
                        x={xGroup - 10}
                        y={200 - ebitdaHeight}
                        width={22}
                        height={ebitdaHeight}
                        fill="#059669"
                        rx={3}
                      />
                      <text
                        x={xGroup + 1}
                        y={192 - ebitdaHeight}
                        textAnchor="middle"
                        className="text-[10px] font-bold fill-emerald-800 font-mono"
                      >
                        ₹{q.ebitdaAmount.toFixed(0)}
                      </text>

                      {/* Operating Cash Flow Bar */}
                      <rect
                        x={xGroup + 15}
                        y={200 - ocfHeight}
                        width={22}
                        height={ocfHeight}
                        fill="#e11d48"
                        rx={3}
                      />
                      <text
                        x={xGroup + 26}
                        y={192 - ocfHeight}
                        textAnchor="middle"
                        className="text-[10px] font-bold fill-rose-700 font-mono"
                      >
                        ₹{q.operatingCashFlow}
                      </text>

                      {/* Quarter Label */}
                      <text
                        x={xGroup + 1}
                        y={215}
                        textAnchor="middle"
                        className={`text-xs font-semibold ${
                          isSelected ? 'fill-slate-950 font-bold underline' : 'fill-slate-500'
                        }`}
                      >
                        {q.quarter}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        )}

        {selectedView === 'margins' && (
          <div>
            <div className="flex items-center justify-between mb-4 text-xs text-slate-600">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-amber-600 inline-block" />
                  <span className="font-medium text-slate-900">EBITDA Margin (%)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-indigo-600 inline-block" />
                  <span className="font-medium text-slate-900">Cash Conversion: OCF / EBITDA (%)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-0.5 w-4 bg-slate-300 inline-block border-t border-dashed border-slate-500" />
                  <span className="text-slate-500">Q1 Baseline Target (18.0%)</span>
                </span>
              </div>
              <span className="font-mono text-[11px] text-slate-400">Values in Percentage (%)</span>
            </div>

            {/* Line Chart */}
            <div className="relative h-64 w-full">
              <svg className="h-full w-full overflow-visible" viewBox="0 0 600 220" preserveAspectRatio="none">
                {/* Gridlines */}
                {[0, 20, 40, 60, 80].map((val) => {
                  const y = 200 - (val / 80) * 180;
                  return (
                    <g key={val}>
                      <line x1="50" y1={y} x2="580" y2={y} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                      <text x="42" y={y + 4} textAnchor="end" className="text-[10px] fill-slate-400 font-mono">
                        {val}%
                      </text>
                    </g>
                  );
                })}

                {/* 18% Commitment Baseline */}
                <line x1="50" y1={200 - (18 / 80) * 180} x2="580" y2={200 - (18 / 80) * 180} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="6 4" />
                <text x="585" y={200 - (18 / 80) * 180 + 3} className="text-[10px] fill-slate-500 font-mono">
                  18% Target
                </text>

                {/* Cash Conversion Line: Q1 (66.7%), Q2 (49.9%), Q3 (31.2%) */}
                {/* Coordinates: X1=120, X2=310, X3=500 */}
                <polyline
                  fill="none"
                  stroke="#4f46e5"
                  strokeWidth="3"
                  points={`120,${200 - (66.67 / 80) * 180} 310,${200 - (49.9 / 80) * 180} 500,${200 - (31.19 / 80) * 180}`}
                />

                {/* EBITDA Margin Line: Q1 (18.0%), Q2 (16.7%), Q3 (15.2%) */}
                <polyline
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="3"
                  points={`120,${200 - (18.0 / 80) * 180} 310,${200 - (16.7 / 80) * 180} 500,${200 - (15.2 / 80) * 180}`}
                />

                {/* Data Points */}
                {quarters.map((q, idx) => {
                  const x = 120 + idx * 190;
                  const ebitdaY = 200 - (q.ebitdaMargin / 80) * 180;
                  const convY = 200 - (q.cashConversionRatio / 80) * 180;
                  const isSelected = activeQuarterIdx === idx;

                  return (
                    <g key={q.quarter} onClick={() => setActiveQuarterIdx(idx)} className="cursor-pointer">
                      {/* EBITDA margin point */}
                      <circle cx={x} cy={ebitdaY} r={isSelected ? 6 : 4.5} fill="#d97706" stroke="#ffffff" strokeWidth="2" />
                      <text x={x} y={ebitdaY - 10} textAnchor="middle" className="text-[11px] font-bold fill-amber-700 font-mono">
                        {q.ebitdaMargin.toFixed(1)}%
                      </text>

                      {/* Cash conversion point */}
                      <circle cx={x} cy={convY} r={isSelected ? 6 : 4.5} fill="#4f46e5" stroke="#ffffff" strokeWidth="2" />
                      <text x={x} y={convY - 10} textAnchor="middle" className="text-[11px] font-bold fill-indigo-700 font-mono">
                        {q.cashConversionRatio.toFixed(1)}%
                      </text>

                      {/* Quarter Label */}
                      <text x={x} y={215} textAnchor="middle" className="text-xs font-semibold fill-slate-700">
                        {q.quarter}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        )}

        {selectedView === 'segments' && (
          <div>
            <div className="flex items-center justify-between mb-4 text-xs text-slate-600">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-xs bg-cyan-700 inline-block" />
                  <span className="font-medium text-slate-900">Core Products YoY Growth (%)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-xs bg-purple-600 inline-block" />
                  <span className="font-medium text-slate-900">Emerging Products YoY Growth (%)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-0.5 w-4 bg-slate-400 inline-block" />
                  <span className="text-slate-500">0% Growth Neutral Line</span>
                </span>
              </div>
              <span className="font-mono text-[11px] text-slate-400">YoY Growth Rate</span>
            </div>

            {/* SVG Visual for Segments */}
            <div className="relative h-64 w-full">
              <svg className="h-full w-full overflow-visible" viewBox="0 0 600 220" preserveAspectRatio="none">
                {/* 0% Line at Y = 175 */}
                {/* Range: -3% to +15% */}
                {[-2, 0, 5, 10, 15].map((val) => {
                  const y = 175 - (val / 18) * 150;
                  return (
                    <g key={val}>
                      <line
                        x1="50"
                        y1={y}
                        x2="580"
                        y2={y}
                        stroke={val === 0 ? '#64748b' : '#f1f5f9'}
                        strokeWidth={val === 0 ? '1.5' : '1'}
                        strokeDasharray={val === 0 ? 'none' : '4 4'}
                      />
                      <text x="42" y={y + 4} textAnchor="end" className={`text-[10px] font-mono ${val === 0 ? 'fill-slate-900 font-bold' : 'fill-slate-400'}`}>
                        {val}%
                      </text>
                    </g>
                  );
                })}

                {quarters.map((q, idx) => {
                  const xGroup = 130 + idx * 170;
                  const zeroY = 175;
                  const isSelected = activeQuarterIdx === idx;

                  // Core bar (always positive: 12%, 13%, 12%)
                  const coreHeight = (q.coreProductsGrowth / 18) * 150;
                  // Emerging bar (3%, 2%, -1%)
                  const emergingHeight = (Math.abs(q.emergingProductsGrowth) / 18) * 150;
                  const isEmergingNegative = q.emergingProductsGrowth < 0;

                  return (
                    <g key={q.quarter} onClick={() => setActiveQuarterIdx(idx)} className="cursor-pointer">
                      {isSelected && (
                        <rect x={xGroup - 40} y={15} width={95} height={195} fill="#f8fafc" rx={6} stroke="#cbd5e1" strokeWidth="1" />
                      )}

                      {/* Core Products Bar */}
                      <rect
                        x={xGroup - 28}
                        y={zeroY - coreHeight}
                        width={24}
                        height={coreHeight}
                        fill="#0e7490"
                        rx={3}
                      />
                      <text
                        x={xGroup - 16}
                        y={zeroY - coreHeight - 6}
                        textAnchor="middle"
                        className="text-[11px] font-bold fill-cyan-800 font-mono"
                      >
                        +{q.coreProductsGrowth}%
                      </text>

                      {/* Emerging Products Bar */}
                      <rect
                        x={xGroup + 2}
                        y={isEmergingNegative ? zeroY : zeroY - emergingHeight}
                        width={24}
                        height={emergingHeight}
                        fill={isEmergingNegative ? '#e11d48' : '#9333ea'}
                        rx={3}
                      />
                      <text
                        x={xGroup + 14}
                        y={isEmergingNegative ? zeroY + emergingHeight + 13 : zeroY - emergingHeight - 6}
                        textAnchor="middle"
                        className={`text-[11px] font-bold font-mono ${
                          isEmergingNegative ? 'fill-rose-700' : 'fill-purple-800'
                        }`}
                      >
                        {q.emergingProductsGrowth > 0 ? `+${q.emergingProductsGrowth}%` : `${q.emergingProductsGrowth}%`}
                      </text>

                      {/* Quarter Label */}
                      <text x={xGroup - 2} y={215} textAnchor="middle" className="text-xs font-semibold fill-slate-700">
                        {q.quarter}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Selected Quarter Drilldown Bar */}
      <div className="mt-2 rounded-lg bg-slate-50 border border-slate-200/80 p-3.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-900 bg-white border border-slate-200 px-2.5 py-1 rounded-md font-mono text-xs shadow-2xs">
            {current.quarter} Snapshot
          </span>
          <span className="text-slate-600">
            Revenue: <strong className="font-mono text-slate-900">₹{current.revenue} cr</strong> (+{current.revenueGrowthYoY}% YoY)
          </span>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span className="text-slate-600">
            EBITDA Margin: <strong className="font-mono text-slate-900">{current.ebitdaMargin}%</strong>
          </span>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span className="text-slate-600">
            OCF: <strong className="font-mono text-slate-900">₹{current.operatingCashFlow} cr</strong> ({current.cashConversionRatio.toFixed(1)}% conversion)
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-500 self-end md:self-auto">
          <Info className="h-3.5 w-3.5 text-slate-400" />
          <span>Click any quarter column to focus metrics</span>
        </div>
      </div>
    </div>
  );
};
