import { QuestionEvidence } from '../data/simulatorQuestions';

export interface EvaluationResult {
  overallScore: number; // 0 to 100
  overallAssessment: 'Executive Ready' | 'Credible with Minor Gaps' | 'Needs Substantiation' | 'High Risk of Backlash';
  summary: string;
  checks: {
    category: string;
    title: string;
    score: number; // 0 to 100
    status: 'pass' | 'warning' | 'fail';
    details: string;
    actionableFeedback: string;
  }[];
  detectedNumbers: string[];
  unsupportedClaimsDetected: string[];
  strengths: string[];
  improvementSuggestions: string[];
  evaluationMethodologyNote: string;
}

export function evaluateProposedResponse(
  question: QuestionEvidence,
  userResponse: string
): EvaluationResult {
  const trimmed = userResponse.trim();
  const lower = trimmed.toLowerCase();
  const words = trimmed.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // 1. Length & Basic Structure Check
  if (wordCount < 15) {
    return {
      overallScore: 20,
      overallAssessment: 'Needs Substantiation',
      summary: 'The submitted response is too brief to address an earnings call query responsibly.',
      checks: [
        {
          category: 'Completeness',
          title: 'Response Length',
          score: 15,
          status: 'fail',
          details: `Response contains only ${wordCount} words. Analysts expect structured, substantive answers.`,
          actionableFeedback: 'Provide at least 3-4 structured sentences incorporating disclosed figures and acknowledging guidance status.',
        },
      ],
      detectedNumbers: [],
      unsupportedClaimsDetected: [],
      strengths: [],
      improvementSuggestions: [
        'State the disclosed Q3 numbers directly (e.g., revenue ₹1,160 cr, margin 15.2%, OCF ₹55 cr).',
        'Directly address the previous management commitment instead of avoiding it.',
        'Clarify which cost or operational items remain to be verified before final audit.',
      ],
      evaluationMethodologyNote:
        'Transparent rule-based heuristic: Evaluates keyword presence, numerical patterns, commitment acknowledgment, and speculative claim boundaries without AI fabrication.',
    };
  }

  // 2. Numerical Accuracy Check
  const detectedNumbers: string[] = [];
  const requiredNumbersByQuestion: Record<string, { term: RegExp; label: string }[]> = {
    'q1-margins': [
      { term: /15\.2%?/, label: '15.2% (Q3 EBITDA margin)' },
      { term: /18(\.0)?%?/, label: '18.0% (Q1 baseline margin)' },
      { term: /16\.7%?/, label: '16.7% (Q2 margin)' },
      { term: /280/, label: '280 bps (cumulative compression)' },
      { term: /(1,?160|1160)/, label: '₹1,160 crore (Q3 revenue)' },
      { term: /(1,?000|1000)/, label: '₹1,000 crore (Q1 revenue)' },
    ],
    'q2-cashflow': [
      { term: /55(\s*(cr|crore))?/, label: '₹55 crore (Q3 OCF)' },
      { term: /120(\s*(cr|crore))?/, label: '₹120 crore (Q1 OCF)' },
      { term: /90(\s*(cr|crore))?/, label: '₹90 crore (Q2 OCF)' },
      { term: /31(\.2)?%?/, label: '31.2% (Q3 cash conversion)' },
      { term: /66(\.7)?%?/, label: '66.7% (Q1 cash conversion)' },
      { term: /176/, label: '₹176.3 cr (Q3 EBITDA)' },
    ],
    'q3-emerging': [
      { term: /-1%?|-1\.0%?|negative 1%?|contract(ion|ed)?/, label: '-1% (Emerging Products Q3 growth)' },
      { term: /\+?3%?/, label: '+3% (Q1 growth)' },
      { term: /\+?2%?/, label: '+2% (Q2 growth)' },
      { term: /12%?/, label: '+12% (Core Products resilience)' },
      { term: /(1,?160|1160)/, label: '₹1,160 crore (Consolidated revenue)' },
    ],
    'q4-guidance': [
      { term: /15\.2%?/, label: '15.2% (EBITDA margin miss)' },
      { term: /55(\s*(cr|crore))?/, label: '₹55 crore (OCF miss)' },
      { term: /31(\.2)?%?/, label: '31.2% (Conversion drop)' },
      { term: /(1,?160|1160)/, label: '₹1,160 crore (Revenue)' },
    ],
  };

  const expectedPatterns = requiredNumbersByQuestion[question.id] || [];
  let matchedNumCount = 0;
  expectedPatterns.forEach((item) => {
    if (item.term.test(userResponse)) {
      matchedNumCount++;
      detectedNumbers.push(item.label);
    }
  });

  const numericalScore = Math.min(100, Math.round((matchedNumCount / Math.max(2, expectedPatterns.length * 0.5)) * 100));

  // 3. Commitment Reconciliation Check
  let commitmentScore = 40;
  let commitmentDetails = '';
  let commitmentStatus: 'pass' | 'warning' | 'fail' = 'warning';

  const commitmentKeywords = [
    'guidance',
    'commitment',
    'expected',
    'earlier',
    'promised',
    'normalize',
    'normalization',
    'second half',
    'h2',
    'working capital',
    'working-capital',
    'discipline',
    'diverge',
    'divergence',
    'acknowledge',
    'missed',
    'accordance',
    'reconcile',
  ];
  const matchedCommitmentTerms = commitmentKeywords.filter((term) => lower.includes(term));

  if (matchedCommitmentTerms.length >= 3) {
    commitmentScore = 95;
    commitmentStatus = 'pass';
    commitmentDetails = `Directly acknowledges earlier management guidance and reconciles the divergence (terms detected: ${matchedCommitmentTerms.slice(0, 4).join(', ')}).`;
  } else if (matchedCommitmentTerms.length >= 1) {
    commitmentScore = 70;
    commitmentStatus = 'warning';
    commitmentDetails = `Mentions earlier guidance (${matchedCommitmentTerms.join(', ')}), but could more explicitly address whether commitments were met or off-track.`;
  } else {
    commitmentScore = 30;
    commitmentStatus = 'fail';
    commitmentDetails = 'Fails to explicitly address previous management commitments. Investors will perceive this as evasive.';
  }

  // 4. Candor & Missing Information Qualification Check
  let candorScore = 50;
  let candorStatus: 'pass' | 'warning' | 'fail' = 'warning';
  let candorDetails = '';

  const candorKeywords = [
    'missing',
    'unverified',
    'verify',
    'verified',
    'audit',
    'reconcil',
    'underway',
    'breakdown',
    'preliminary',
    'cfo',
    'board',
    'detailed',
    'investigate',
    'schedule',
    'further analysis',
  ];
  const matchedCandorTerms = candorKeywords.filter((term) => lower.includes(term));

  if (matchedCandorTerms.length >= 2) {
    candorScore = 95;
    candorStatus = 'pass';
    candorDetails = 'Clearly distinguishes disclosed facts from unverified operational details, stating that further audit is required.';
  } else if (matchedCandorTerms.length === 1) {
    candorScore = 75;
    candorStatus = 'warning';
    candorDetails = 'Partially indicates that further information is needed, but could be clearer about what remains unverified.';
  } else {
    candorScore = 40;
    candorStatus = 'fail';
    candorDetails = 'Does not explicitly separate disclosed facts from missing or unverified data. Executive responses must avoid ungrounded assumptions.';
  }

  // 5. Unsupported Claims & Speculation Detection
  const speculativeKeywords = [
    { pattern: /raw material (prices?|cost|inflation) (rose|jumped|increased by \d+)/i, reason: 'Claims unverified raw material inflation figures' },
    { pattern: /freight (costs?|rates?) (spiked|doubled|\d+%)/i, reason: 'Asserts specific unverified freight or shipping spikes' },
    { pattern: /competitor(s)? (cut prices|discounted|stole)/i, reason: 'Speculates on competitor actions without verified market data' },
    { pattern: /marketing spend was (too high|overspent|\d+)/i, reason: 'Claims unverified SG&A overspending' },
    { pattern: /will (definitely|guarantee|rebound to \d+% in q4)/i, reason: 'Provides unapproved future forecasts or margin promises' },
    { pattern: /temporary blip|transitory noise/i, reason: 'Dismisses severe multi-quarter divergence as mere noise' },
  ];

  const unsupportedClaimsDetected: string[] = [];
  speculativeKeywords.forEach((rule) => {
    if (rule.pattern.test(userResponse)) {
      unsupportedClaimsDetected.push(rule.reason);
    }
  });

  let unsupportedClaimsScore = 100 - unsupportedClaimsDetected.length * 35;
  if (unsupportedClaimsScore < 20) unsupportedClaimsScore = 20;

  // 6. Tone & Clarity Check
  let toneScore = 80;
  if (wordCount < 40) {
    toneScore = 60;
  } else if (wordCount > 350) {
    toneScore = 65; // Overly verbose
  } else if (wordCount >= 60 && wordCount <= 220) {
    toneScore = 95;
  }

  // Calculate Weighted Overall Score
  // Weights: Numerical Accuracy (25%), Commitment Consistency (25%), Candor/Missing Info (20%), Unsupported Claims (15%), Tone (15%)
  const overallScore = Math.round(
    numericalScore * 0.25 +
    commitmentScore * 0.25 +
    candorScore * 0.2 +
    unsupportedClaimsScore * 0.15 +
    toneScore * 0.15
  );

  let overallAssessment: EvaluationResult['overallAssessment'] = 'Executive Ready';
  if (overallScore < 50) {
    overallAssessment = 'High Risk of Backlash';
  } else if (overallScore < 70) {
    overallAssessment = 'Needs Substantiation';
  } else if (overallScore < 85) {
    overallAssessment = 'Credible with Minor Gaps';
  } else {
    overallAssessment = 'Executive Ready';
  }

  // Synthesize Strengths and Improvements
  const strengths: string[] = [];
  const improvementSuggestions: string[] = [];

  if (detectedNumbers.length > 0) {
    strengths.push(`Accurately cited disclosed data points: ${detectedNumbers.join(', ')}.`);
  } else {
    improvementSuggestions.push(`Include concrete disclosed figures (e.g., ${expectedPatterns.map((p) => p.label).slice(0, 3).join(', ')}).`);
  }

  if (commitmentStatus === 'pass') {
    strengths.push('Directly addressed and reconciled previous management commitments without dodging.');
  } else {
    improvementSuggestions.push('Explicitly state how the current quarter results relate to earlier management commitments (e.g. H2 normalization or working capital discipline).');
  }

  if (candorStatus === 'pass') {
    strengths.push('Demonstrated high professional candor by clearly identifying what details remain to be verified.');
  } else {
    improvementSuggestions.push('Clearly flag unverified operational items (e.g. detailed COGS breakdown or working capital schedule) rather than guessing.');
  }

  if (unsupportedClaimsDetected.length > 0) {
    improvementSuggestions.push(`Remove or qualify speculative statements: ${unsupportedClaimsDetected.join('; ')}.`);
  } else {
    strengths.push('Maintained disciplined boundaries: avoided fabricating unverified cost drivers or unapproved forward guidance.');
  }

  if (wordCount >= 60 && wordCount <= 220) {
    strengths.push(`Well-calibrated length (${wordCount} words) suitable for an executive live spoken answer.`);
  } else if (wordCount > 300) {
    improvementSuggestions.push(`Streamline response length (${wordCount} words). Aim for ~80-180 words to keep executive delivery sharp.`);
  }

  const checks = [
    {
      category: 'Accuracy',
      title: 'Disclosed Numerical Accuracy',
      score: numericalScore,
      status: (numericalScore >= 75 ? 'pass' : numericalScore >= 45 ? 'warning' : 'fail') as 'pass' | 'warning' | 'fail',
      details: detectedNumbers.length > 0
        ? `Identified ${detectedNumbers.length} disclosed financial facts in your draft.`
        : 'Did not detect specific disclosed figures for this question.',
      actionableFeedback: detectedNumbers.length > 0
        ? 'Good quantitative precision.'
        : `Quote key disclosed figures such as ${expectedPatterns.map((p) => p.label).slice(0, 2).join(' or ')}.`,
    },
    {
      category: 'Commitment',
      title: 'Previous Commitment Reconciliation',
      score: commitmentScore,
      status: commitmentStatus,
      details: commitmentDetails,
      actionableFeedback: commitmentStatus === 'pass'
        ? 'Maintains executive credibility by facing previous commitments directly.'
        : 'Acknowledge prior commitments by name and directly explain that Q3 experienced divergence.',
    },
    {
      category: 'Transparency',
      title: 'Missing Information Qualification',
      score: candorScore,
      status: candorStatus,
      details: candorDetails,
      actionableFeedback: candorStatus === 'pass'
        ? 'Excellent integrity: clearly outlines data undergoing verification.'
        : 'Explicitly state that granular cost schedules or working capital components are being reconciled before confirmation.',
    },
    {
      category: 'Governance',
      title: 'Anti-Speculation & Unsupported Claims',
      score: unsupportedClaimsScore,
      status: (unsupportedClaimsDetected.length === 0 ? 'pass' : unsupportedClaimsDetected.length === 1 ? 'warning' : 'fail') as 'pass' | 'warning' | 'fail',
      details: unsupportedClaimsDetected.length === 0
        ? 'Zero unsupported claims detected. Fully compliant with disclosed facts.'
        : `Detected ${unsupportedClaimsDetected.length} unverified assertion(s): ${unsupportedClaimsDetected.join(', ')}.`,
      actionableFeedback: unsupportedClaimsDetected.length === 0
        ? 'No speculative claims detected.'
        : 'Never invent specific external cost pressures or future quarter guarantees unless verified in writing by leadership.',
    },
    {
      category: 'Delivery',
      title: 'Executive Structure & Tone',
      score: toneScore,
      status: (toneScore >= 80 ? 'pass' : toneScore >= 60 ? 'warning' : 'fail') as 'pass' | 'warning' | 'fail',
      details: `Response is ${wordCount} words. Direct-answer structure observed.`,
      actionableFeedback: wordCount < 60
        ? 'Expand slightly to explain context and missing verification items.'
        : wordCount > 250
        ? 'Condense slightly to maintain high executive impact.'
        : 'Balanced length and professional tone.',
    },
  ];

  return {
    overallScore,
    overallAssessment,
    summary:
      overallScore >= 80
        ? 'Outstanding response. Grounded in disclosed facts, transparent on prior commitments, and avoids speculative promises.'
        : overallScore >= 60
        ? 'Solid foundation, but requires tighter alignment with earlier commitments and clearer demarcation of unverified details.'
        : 'Significant risk of analyst pushback. Needs concrete disclosed numbers, direct commitment acknowledgment, and removal of unverified speculation.',
    checks,
    detectedNumbers,
    unsupportedClaimsDetected,
    strengths,
    improvementSuggestions,
    evaluationMethodologyNote:
      'Transparent rule-based heuristic: Evaluates exact keyword patterns, disclosed metric citations, commitment alignment phrasing, and speculative boundaries. Fully client-side with no third-party API dependencies.',
  };
}
