export interface QuestionEvidence {
  id: string;
  shortLabel: string;
  question: string;
  analystIntent: string;
  disclosedFacts: {
    label: string;
    value: string;
    detail: string;
  }[];
  earlierCommitments: {
    commitment: string;
    horizon: string;
    alignmentStatus: 'Direct Conflict' | 'Divergent' | 'Under Pressure';
    reconciliationNotes: string;
  }[];
  draftAnswer: string;
  missingInformation: {
    item: string;
    whyRequired: string;
    actionOwner: string;
  }[];
  doNotSay: string[];
  keyTermsForScoring: string[];
}

export const INVESTOR_QUESTIONS: QuestionEvidence[] = [
  {
    id: 'q1-margins',
    shortLabel: 'Declining Margins',
    question: 'Why are margins declining despite revenue growth?',
    analystIntent:
      'Analysts want to understand operational leverage breakdown. Top-line expanded 16% over two quarters (₹1,000 cr to ₹1,160 cr), yet EBITDA margin eroded 280 bps (from 18.0% to 15.2%), and Q3 absolute EBITDA declined to ₹176.3 cr.',
    disclosedFacts: [
      {
        label: 'Q1 to Q3 Margin Trajectory',
        value: '18.0% → 16.7% → 15.2%',
        detail: 'Cumulative compression of 280 basis points over two quarters (-130 bps in Q2, -150 bps in Q3).',
      },
      {
        label: 'Top-line vs Profit Disconnect',
        value: '+16.0% Rev vs -2.0% EBITDA',
        detail: 'Revenue grew from ₹1,000 cr to ₹1,160 cr (+₹160 cr), while derived EBITDA fell from ₹180.0 cr to ₹176.3 cr (-₹3.7 cr).',
      },
      {
        label: 'Segment Contribution Mix',
        value: 'Core +12% / Emerging -1%',
        detail: 'Core Products held at +12% YoY, whereas higher-growth Emerging Products decelerated into contraction (-1% YoY).',
      },
    ],
    earlierCommitments: [
      {
        commitment: 'Sustain healthy growth while protecting profitability.',
        horizon: 'FY26',
        alignmentStatus: 'Direct Conflict',
        reconciliationNotes:
          'Profitability was not protected. Even though revenue grew 8% YoY, unit operational profitability compressed significantly.',
      },
      {
        commitment: 'Margins were expected to normalize in the second half of the financial year.',
        horizon: 'H2 FY26 (Q3 & Q4)',
        alignmentStatus: 'Direct Conflict',
        reconciliationNotes:
          'Q3 represents the start of H2 FY26. Rather than normalizing or stabilizing, EBITDA margin contracted by another 150 bps QoQ.',
      },
    ],
    draftAnswer:
      'We acknowledge that our reported EBITDA margin compressed from 18.0% in Q1 to 16.7% in Q2 and 15.2% in Q3, despite revenue growing from ₹1,000 crore to ₹1,160 crore. Disclosed numbers confirm that higher top-line scale did not yield margin expansion this quarter, and this diverges from our earlier expectation that margins would normalize starting in H2.\n\nWhile our Core Products continued to expand steadily at 12% YoY, the contraction in Emerging Products (-1% YoY) affected our operational mix. To provide full transparency without speculation: itemized cost breakdowns across raw materials, logistics, overheads, and product-level gross margins are currently undergoing detailed reconciliation. We will not offer speculative drivers until these underlying figures are formally verified by our finance leadership.',
    missingInformation: [
      {
        item: 'Cost of Goods Sold (COGS) & Gross Margin Waterfall',
        whyRequired:
          'Determine whether margin compression was driven by raw material input inflation, discounting, or lower manufacturing yields.',
        actionOwner: 'CFO / Financial Controller',
      },
      {
        item: 'Operating Expense & SG&A Breakdown',
        whyRequired:
          'Identify whether selling, marketing, logistics, or general administrative costs expanded ahead of revenue.',
        actionOwner: 'FP&A Team',
      },
      {
        item: 'Product Segment Margin Differences',
        whyRequired:
          'Ascertain the standalone margin profile of Core Products vs Emerging Products to isolate mix effects.',
        actionOwner: 'Commercial Business Unit Heads',
      },
      {
        item: 'H2 FY26 Margin Guidance Revision',
        whyRequired:
          'Provide updated, board-approved margin target ranges for Q4 FY26 in light of Q3 actuals.',
        actionOwner: 'Executive Board',
      },
    ],
    doNotSay: [
      'Do NOT claim raw materials or freight rates increased without disclosed data.',
      'Do NOT promise that Q4 margins will magically rebound to 18% without verified operational initiatives.',
      'Do NOT dismiss the margin drop as "transitory noise"; the 280 bps erosion is a material multi-quarter trend.',
    ],
    keyTermsForScoring: [
      '15.2%',
      '18.0%',
      '16.7%',
      '280',
      'basis points',
      '1,160',
      '1,000',
      'normalize',
      'second half',
      'H2',
      'profitability',
      'cogs',
      'missing',
      'verified',
    ],
  },
  {
    id: 'q2-cashflow',
    shortLabel: 'Weakening Cash Flow',
    question: 'Why has operating cash flow weakened?',
    analystIntent:
      'Cash flow is the ultimate test of earnings quality. In Q3, OCF dropped to ₹55 cr (from ₹120 cr in Q1 and ₹90 cr in Q2), representing an OCF/EBITDA cash conversion collapse from 66.7% to 31.2%, directly breaking the promise of working-capital discipline.',
    disclosedFacts: [
      {
        label: 'Operating Cash Flow Erosion',
        value: '₹120 cr → ₹90 cr → ₹55 cr',
        detail: 'OCF fell by 54.2% (-₹65 cr) between Q1 and Q3, and dropped 38.9% (-₹35 cr) QoQ in Q3 alone.',
      },
      {
        label: 'Cash Conversion Ratio (OCF / EBITDA)',
        value: '66.7% → 49.9% → 31.2%',
        detail: 'Cash conversion more than halved over two quarters, indicating severe working capital absorption.',
      },
      {
        label: 'Earnings vs Cash Generation Gap',
        value: '₹176.3 cr EBITDA vs ₹55 cr OCF',
        detail: 'Of ₹176.32 crore in operational profit generated during Q3, only ₹55 crore converted into cash from operations.',
      },
    ],
    earlierCommitments: [
      {
        commitment: 'Working-capital discipline was expected to support better cash conversion in Q3.',
        horizon: 'Q3 FY26',
        alignmentStatus: 'Direct Conflict',
        reconciliationNotes:
          'Q3 cash conversion collapsed to 31.2% (down from 49.9% in Q2 and 66.7% in Q1). The commitment to better conversion was clearly missed.',
      },
    ],
    draftAnswer:
      'The disclosed data clearly reflects a significant weakening in our cash generation. Operating cash flow fell from ₹120 crore in Q1 to ₹90 crore in Q2, and further to ₹55 crore in Q3. Consequently, our cash conversion ratio dropped from 66.7% in Q1 to 31.2% in Q3.\n\nWe directly acknowledge that this trend contradicts our stated expectation that working-capital discipline would support improved cash conversion in Q3. While top-line revenue expanded to ₹1,160 crore, cash realization lagged substantially behind reported EBITDA of ₹176.3 crore.\n\nWe must transparently note that specific granular drivers—such as changes in customer payment cycles (DSO), inventory holdings, or supplier credit terms—are still being audited. We will present verified working capital schedules as soon as the detailed audit is completed.',
    missingInformation: [
      {
        item: 'Working Capital Cycle Schedule (DSO, DIO, DPO)',
        whyRequired:
          'Pinpoint whether cash was absorbed by delayed receivables collections, excess finished goods inventory, or shortened trade payables.',
        actionOwner: 'Treasury & Working Capital Head',
      },
      {
        item: 'Customer Aging & Overdue Receivables Report',
        whyRequired:
          'Determine if revenue growth (+₹80 cr QoQ) was achieved on lenient credit terms or uncollected invoices.',
        actionOwner: 'Credit Control & Sales Ops',
      },
      {
        item: 'Inventory Build-up Analysis',
        whyRequired:
          'Assess whether unsold inventory (especially in Emerging Products) trapped operating liquidity.',
        actionOwner: 'Supply Chain Operations',
      },
      {
        item: 'Quarterly Free Cash Flow (FCF) & Capex Reconciliation',
        whyRequired:
          'Reconcile capital expenditure outflows against net cash from operations to establish total cash burn.',
        actionOwner: 'Corporate Finance',
      },
    ],
    doNotSay: [
      'Do NOT claim that cash collections are healthy when OCF has dropped by 54% from Q1.',
      'Do NOT invent customer contract delays or seasonal payment timing without verified balance sheet reports.',
      'Do NOT pretend working-capital discipline was executed; the 31.2% conversion rate proves otherwise.',
    ],
    keyTermsForScoring: [
      '55',
      '120',
      '90',
      'crore',
      '31.2%',
      '66.7%',
      'conversion',
      'working-capital',
      'discipline',
      'ebitda',
      '176.3',
      'unverified',
      'receivables',
      'inventory',
      'dso',
    ],
  },
  {
    id: 'q3-emerging',
    shortLabel: 'Emerging Products Slowdown',
    question: 'What explains the Emerging Products slowdown?',
    analystIntent:
      'Emerging Products was positioned as the future high-growth catalyst. However, growth decelerated from +3% in Q1 to +2% in Q2, and turned negative to -1% in Q3, raising questions about demand, customer traction, and capital allocation.',
    disclosedFacts: [
      {
        label: 'Emerging Products Growth Trend',
        value: '+3.0% → +2.0% → -1.0%',
        detail: 'Growth rate dropped 400 basis points over two quarters, entering outright contraction in Q3 FY26.',
      },
      {
        label: 'Segment Growth Divergence',
        value: 'Core (+12%) vs Emerging (-1%)',
        detail: 'Core Products demonstrated steady volume growth (12% in Q1, 13% in Q2, 12% in Q3), highlighting that the weakness is concentrated in Emerging Products.',
      },
      {
        label: 'Total Revenue Context',
        value: 'Company Revenue: ₹1,160 cr (+8% YoY)',
        detail: 'Because Core Products held at +12%, overall revenue grew 8% YoY, partially masking the contraction in Emerging Products.',
      },
    ],
    earlierCommitments: [
      {
        commitment: 'Sustain healthy growth while protecting profitability.',
        horizon: 'FY26',
        alignmentStatus: 'Under Pressure',
        reconciliationNotes:
          'While total company growth (+8% YoY) appears intact on the surface, portfolio diversification is under pressure as Emerging Products turned negative.',
      },
    ],
    draftAnswer:
      'The disclosed data shows a clear deceleration in our Emerging Products segment, with YoY growth slowing from +3% in Q1 to +2% in Q2, and shifting into negative territory at -1% in Q3 FY26. In contrast, our Core Products maintained healthy and resilient expansion at 12% YoY.\n\nWhile our consolidated revenue reached ₹1,160 crore (supported by Core Products), we recognize that Emerging Products did not perform in line with strategic expectations.\n\nAt this time, we do not have board-approved customer churn data, pricing realization figures, or product-level channel inventory metrics to disclose. It would be premature to attribute this contraction to specific external or internal factors until the commercial business review is concluded and verified by management.',
    missingInformation: [
      {
        item: 'Segment Volume vs Price Realization Breakdown',
        whyRequired:
          'Determine whether the -1% contraction was caused by unit volume drop, aggressive discounting, or product mix shifts.',
        actionOwner: 'Emerging Business Unit Head',
      },
      {
        item: 'Customer Retention & Churn Metrics',
        whyRequired:
          'Assess whether initial pilot customers discontinued orders or if new logo acquisition stalled.',
        actionOwner: 'Chief Commercial Officer',
      },
      {
        item: 'Channel Inventory & Distributor Sell-through Data',
        whyRequired:
          'Verify if distributors are de-stocking inventory rather than underlying consumer demand disappearing.',
        actionOwner: 'Sales Distribution Operations',
      },
      {
        item: 'Emerging Segment Profitability Contribution',
        whyRequired:
          'Check if Emerging Products is operating at negative EBITDA and diluting consolidated margins.',
        actionOwner: 'Management Accounting',
      },
    ],
    doNotSay: [
      'Do NOT claim that "new product updates next quarter will fix the slowdown" without verified launch schedules.',
      'Do NOT blame macro conditions or competition without documented evidence.',
      'Do NOT claim Emerging Products is profitable when segment-level P&L has not been disclosed.',
    ],
    keyTermsForScoring: [
      '-1%',
      '+3%',
      '+2%',
      'core products',
      '12%',
      'deceleration',
      'contraction',
      'emerging',
      'mix',
      'unverified',
      'churn',
      'volume',
      'commercial review',
    ],
  },
  {
    id: 'q4-guidance',
    shortLabel: 'Management Guidance Reliability',
    question: 'Can investors still rely on earlier management guidance?',
    analystIntent:
      'Credibility is at stake. Prior management commitments regarding H2 margin normalization and Q3 working-capital discipline have both diverged sharply from reported results. Investors need to know what management is doing about credibility and guidance.',
    disclosedFacts: [
      {
        label: 'Commitment #1: Profitability Protection',
        value: 'Margin fell 280 bps (18.0% → 15.2%)',
        detail: 'Absolute EBITDA declined to ₹176.3 cr in Q3 despite ₹160 cr revenue growth since Q1.',
      },
      {
        label: 'Commitment #2: H2 Margin Normalization',
        value: 'Q3 Margin dropped -150 bps QoQ',
        detail: 'Q3 is the first half of H2; instead of normalizing, margin compression accelerated from Q2.',
      },
      {
        label: 'Commitment #3: Q3 Working-Capital Discipline',
        value: 'OCF fell to ₹55 cr; conversion 31.2%',
        detail: 'Cash conversion fell from 66.7% in Q1 to 31.2% in Q3, the sharpest quarterly decline of the year.',
      },
    ],
    earlierCommitments: [
      {
        commitment: 'Sustain healthy growth while protecting profitability.',
        horizon: 'FY26',
        alignmentStatus: 'Direct Conflict',
        reconciliationNotes: 'Profitability eroded across consecutive quarters.',
      },
      {
        commitment: 'Margins were expected to normalize in the second half of the financial year.',
        horizon: 'H2 FY26',
        alignmentStatus: 'Direct Conflict',
        reconciliationNotes: 'Q3 margin fell to 15.2%, showing further compression rather than normalization.',
      },
      {
        commitment: 'Working-capital discipline was expected to support better cash conversion in Q3.',
        horizon: 'Q3 FY26',
        alignmentStatus: 'Direct Conflict',
        reconciliationNotes: 'Cash conversion plummeted to 31.2%, failing the guidance.',
      },
    ],
    draftAnswer:
      'We understand and respect the scrutiny regarding our previous commitments. We must be forthright: our Q3 performance did not match our stated guidance in two critical dimensions. First, rather than normalizing in H2, our EBITDA margin fell to 15.2%. Second, our operating cash flow fell to ₹55 crore with cash conversion dropping to 31.2%, contrary to our expectation of working-capital improvement in Q3.\n\nWhile our revenue trajectory reached ₹1,160 crore and Core Products held steady at 12% growth, we recognize that guidance credibility depends on delivering both profitability and cash generation.\n\nRather than offering revised forecasts today without complete operational substantiation, management is conducting a thorough operational audit across cost structures, inventory velocity, and segment pricing. We will provide an updated, audited guidance framework only when validated by our board.',
    missingInformation: [
      {
        item: 'Root-Cause Reconciliation of H2 Guidance Miss',
        whyRequired:
          'Audit the exact assumptions (pricing, volumes, cost inflation) that failed between original guidance and Q3 actuals.',
        actionOwner: 'Chief Financial Officer & Strategy Committee',
      },
      {
        item: 'Board-Approved Revised Guidance Range for Q4 FY26 & FY27',
        whyRequired:
          'Provide realistic, stress-tested ranges for revenue, EBITDA margin, and cash conversion.',
        actionOwner: 'Board of Directors & Executive Committee',
      },
      {
        item: 'Working Capital Recovery Milestones',
        whyRequired:
          'Establish tangible, measurable targets for cash collection and inventory normalization in Q4.',
        actionOwner: 'CFO & Operations Leadership',
      },
      {
        item: 'Capital Allocation & Discretionary Spend Freeze Plan',
        whyRequired:
          'Demonstrate concrete actions being evaluated to protect liquidity without harming core operational capabilities.',
        actionOwner: 'Executive Committee',
      },
    ],
    doNotSay: [
      'Do NOT brush off the divergence as "external factors beyond our control".',
      'Do NOT reiterate old, broken guidance targets that the Q3 numbers mathematically disprove.',
      'Do NOT fabricate new quantitative targets on the fly during the call.',
    ],
    keyTermsForScoring: [
      'guidance',
      'credibility',
      'commitments',
      '15.2%',
      '55',
      'crore',
      '31.2%',
      'normalize',
      'h2',
      'second half',
      'working-capital',
      'audit',
      'board',
      'reconciliation',
      'unverified',
    ],
  },
];
