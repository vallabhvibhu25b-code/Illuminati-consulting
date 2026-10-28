export interface QuarterData {
  quarter: string;
  revenue: number; // in ₹ Crore
  revenueGrowthYoY: number; // in %
  revenueGrowthQoQ?: number; // in %
  ebitdaMargin: number; // in %
  ebitdaAmount: number; // calculated in ₹ Crore
  operatingCashFlow: number; // in ₹ Crore
  cashConversionRatio: number; // OCF / EBITDA in %
  coreProductsGrowth: number; // in %
  emergingProductsGrowth: number; // in %
}

export interface ManagementCommitment {
  id: string;
  statement: string;
  targetHorizon: string;
  status: 'Critical Divergence' | 'Off Track' | 'Violated';
  q3Reality: string;
  varianceDetail: string;
  investorSensitivity: 'High' | 'Severe' | 'Critical';
}

export const SYNTHETIC_FINANCIALS: QuarterData[] = [
  {
    quarter: 'Q1 FY26',
    revenue: 1000,
    revenueGrowthYoY: 8.0,
    revenueGrowthQoQ: undefined,
    ebitdaMargin: 18.0,
    ebitdaAmount: 180.0, // 18% of 1000
    operatingCashFlow: 120,
    cashConversionRatio: 66.67, // 120 / 180 = 66.67%
    coreProductsGrowth: 12.0,
    emergingProductsGrowth: 3.0,
  },
  {
    quarter: 'Q2 FY26',
    revenue: 1080,
    revenueGrowthYoY: 9.0,
    revenueGrowthQoQ: 8.0, // (1080 - 1000)/1000 = +8.0%
    ebitdaMargin: 16.7,
    ebitdaAmount: 180.36, // 16.7% of 1080
    operatingCashFlow: 90,
    cashConversionRatio: 49.9, // 90 / 180.36 = 49.9%
    coreProductsGrowth: 13.0,
    emergingProductsGrowth: 2.0,
  },
  {
    quarter: 'Q3 FY26',
    revenue: 1160,
    revenueGrowthYoY: 8.0,
    revenueGrowthQoQ: 7.41, // (1160 - 1080)/1080 = +7.41%
    ebitdaMargin: 15.2,
    ebitdaAmount: 176.32, // 15.2% of 1160
    operatingCashFlow: 55,
    cashConversionRatio: 31.19, // 55 / 176.32 = 31.19%
    coreProductsGrowth: 12.0,
    emergingProductsGrowth: -1.0,
  },
];

export const SYNTHETIC_COMMITMENTS: ManagementCommitment[] = [
  {
    id: 'comm-1',
    statement: 'Sustain healthy growth while protecting profitability.',
    targetHorizon: 'Full Year FY26',
    status: 'Critical Divergence',
    q3Reality:
      'While top-line expanded by ₹160 cr (+16.0% Q1-to-Q3), EBITDA margin eroded by 280 bps from 18.0% to 15.2%, and absolute EBITDA fell from ₹180.36 cr in Q2 to ₹176.32 cr in Q3.',
    varianceDetail:
      'Revenue growth (+8% YoY) came at the cost of compressed unit economics; profitability was not protected.',
    investorSensitivity: 'Severe',
  },
  {
    id: 'comm-2',
    statement: 'Margins were expected to normalize in the second half of the financial year.',
    targetHorizon: 'H2 FY26 (commencing Q3)',
    status: 'Off Track',
    q3Reality:
      'Q3 FY26 is the first quarter of H2 FY26. Instead of stabilizing or recovering toward 18.0%, EBITDA margin deteriorated an additional 150 bps QoQ to 15.2%.',
    varianceDetail:
      'Guidance implied margin inflection starting in Q3; actual results show an accelerating decline rather than normalization.',
    investorSensitivity: 'Critical',
  },
  {
    id: 'comm-3',
    statement: 'Working-capital discipline was expected to support better cash conversion in Q3.',
    targetHorizon: 'Q3 FY26',
    status: 'Violated',
    q3Reality:
      'Operating cash flow collapsed to ₹55 crore (down 38.9% QoQ from ₹90 cr, and down 54.2% from ₹120 cr in Q1). OCF-to-EBITDA conversion dropped to a year-low of 31.2%.',
    varianceDetail:
      'Working-capital discipline failed to convert earnings into cash; ₹176.32 cr in quarterly EBITDA yielded merely ₹55 cr in operating cash.',
    investorSensitivity: 'Critical',
  },
];

export interface FinancialSummaryDelta {
  metric: string;
  unit: string;
  q1Val: string;
  q2Val: string;
  q3Val: string;
  qoqChange: string;
  twoQuarterDelta: string;
  trend: 'positive' | 'negative' | 'neutral';
  significance: string;
}

export const FINANCIAL_DELTAS: FinancialSummaryDelta[] = [
  {
    metric: 'Revenue',
    unit: '₹ Crore',
    q1Val: '1,000',
    q2Val: '1,080',
    q3Val: '1,160',
    qoqChange: '+₹80 (+7.4%)',
    twoQuarterDelta: '+₹160 (+16.0%)',
    trend: 'positive',
    significance: 'Healthy top-line momentum driven primarily by Core Products volume.',
  },
  {
    metric: 'EBITDA Margin',
    unit: '%',
    q1Val: '18.0%',
    q2Val: '16.7%',
    q3Val: '15.2%',
    qoqChange: '-150 bps',
    twoQuarterDelta: '-280 bps',
    trend: 'negative',
    significance: 'Continuous contraction across both quarters; misses H2 normalization commitment.',
  },
  {
    metric: 'Derived EBITDA',
    unit: '₹ Crore',
    q1Val: '180.0',
    q2Val: '180.4',
    q3Val: '176.3',
    qoqChange: '-₹4.0 (-2.2%)',
    twoQuarterDelta: '-₹3.7 (-2.0%)',
    trend: 'negative',
    significance: 'Absolute operational profit declined in Q3 despite ₹80 cr higher revenue.',
  },
  {
    metric: 'Operating Cash Flow',
    unit: '₹ Crore',
    q1Val: '120',
    q2Val: '90',
    q3Val: '55',
    qoqChange: '-₹35 (-38.9%)',
    twoQuarterDelta: '-₹65 (-54.2%)',
    trend: 'negative',
    significance: 'Severe cash generation strain; points directly to working capital blockage.',
  },
  {
    metric: 'Cash Conversion (OCF/EBITDA)',
    unit: '%',
    q1Val: '66.7%',
    q2Val: '49.9%',
    q3Val: '31.2%',
    qoqChange: '-18.7% pts',
    twoQuarterDelta: '-35.5% pts',
    trend: 'negative',
    significance: 'Conversion halved over two quarters, directly contradicting discipline guidance.',
  },
  {
    metric: 'Core Products Growth',
    unit: '% YoY',
    q1Val: '12.0%',
    q2Val: '13.0%',
    q3Val: '12.0%',
    qoqChange: '-100 bps',
    twoQuarterDelta: '0 bps',
    trend: 'neutral',
    significance: 'Steady bedrock performance; maintains double-digit expansion.',
  },
  {
    metric: 'Emerging Products Growth',
    unit: '% YoY',
    q1Val: '3.0%',
    q2Val: '2.0%',
    q3Val: '-1.0%',
    qoqChange: '-300 bps',
    twoQuarterDelta: '-400 bps',
    trend: 'negative',
    significance: 'Flipped into negative territory; indicates product-market fit or sales friction.',
  },
];
