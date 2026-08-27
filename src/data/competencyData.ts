export type CompetencyStatus = 'strong' | 'gap' | 'critical';

export type CompetencyDetail = {
  id: string;
  name: string;
  category: string;
  current: number;
  target: number;
  status: CompetencyStatus;
  importance: string;
  prerequisites: string[];
  recommendedAction: string;
  whyItMatters: string;
};

export type GraphNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  status: CompetencyStatus;
};

export type GraphEdge = {
  from: string;
  to: string;
  kind: 'prerequisite' | 'related';
};

export const targetRole = 'AI/ML Engineer';

export const competencyDetails: CompetencyDetail[] = [
  {
    id: 'python',
    name: 'Python',
    category: 'Programming',
    current: 82,
    target: 80,
    status: 'strong',
    importance: 'Foundational',
    prerequisites: [],
    recommendedAction:
      'Maintain fluency with periodic practice. Explore advanced libraries (NumPy, pandas, scikit-learn) to push toward 90%.',
    whyItMatters:
      'Python is the primary language for AI/ML engineering — used for data wrangling, model training, and production pipelines.',
  },
  {
    id: 'statistics',
    name: 'Statistics',
    category: 'Foundations',
    current: 51,
    target: 75,
    status: 'gap',
    importance: 'High',
    prerequisites: ['python'],
    recommendedAction:
      'Complete the "Statistics for ML" module: distributions, hypothesis testing, and regression fundamentals.',
    whyItMatters:
      'Statistics underpins model evaluation, experimentation, and interpreting results — weak statistics cascades into weaker ML and evaluation skills.',
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    category: 'Modeling',
    current: 43,
    target: 80,
    status: 'gap',
    importance: 'Critical',
    prerequisites: ['python', 'statistics'],
    recommendedAction:
      'Take "Applied Machine Learning" — supervised learning, regularization, and model selection with hands-on labs.',
    whyItMatters:
      'Core to the AI/ML Engineer role: building, tuning, and validating models is the daily work of the position.',
  },
  {
    id: 'model-evaluation',
    name: 'Model Evaluation',
    category: 'Modeling',
    current: 38,
    target: 80,
    status: 'critical',
    importance: 'Critical',
    prerequisites: ['statistics', 'machine-learning'],
    recommendedAction:
      'Start with "Evaluation Metrics & Validation" — metrics selection, cross-validation, and error analysis.',
    whyItMatters:
      'Without rigorous evaluation, models cannot be trusted in production. This is the highest-priority gap for the target role.',
  },
  {
    id: 'deep-learning',
    name: 'Deep Learning',
    category: 'Modeling',
    current: 25,
    target: 70,
    status: 'critical',
    importance: 'High',
    prerequisites: ['machine-learning'],
    recommendedAction:
      'Begin "Deep Learning Foundations" — neural networks, backpropagation, and modern architectures.',
    whyItMatters:
      'Deep learning powers modern AI systems (NLP, vision). Required for senior AI/ML engineering tracks.',
  },
];

export const competencySummary = {
  overall: 48,
  strong: 1,
  developing: 2,
  gaps: 2,
};

export type SkillGapEntry = {
  id: string;
  competency: string;
  current: number;
  target: number;
  gap: number;
  priority: number;
  whyItMatters: string;
};

export const skillGapAnalysis: SkillGapEntry[] = [
  {
    id: 'model-evaluation',
    competency: 'Model Evaluation',
    current: 38,
    target: 80,
    gap: 42,
    priority: 1,
    whyItMatters:
      'Evaluation is the bottleneck — you cannot reliably ship or compare models without it. Closing this gap unlocks all downstream modeling work.',
  },
  {
    id: 'deep-learning',
    competency: 'Deep Learning',
    current: 25,
    target: 70,
    gap: 45,
    priority: 2,
    whyItMatters:
      'Deep learning is central to modern AI/ML engineering roles, especially for NLP and vision tasks.',
  },
  {
    id: 'machine-learning',
    competency: 'Machine Learning',
    current: 43,
    target: 80,
    gap: 37,
    priority: 3,
    whyItMatters:
      'Core modeling competency — the daily craft of building, tuning, and validating predictive models.',
  },
  {
    id: 'statistics',
    competency: 'Statistics',
    current: 51,
    target: 75,
    gap: 24,
    priority: 4,
    whyItMatters:
      'Statistics is a prerequisite for both ML and model evaluation. Strengthening it accelerates progress on the gaps above.',
  },
];

export const graphNodes: GraphNode[] = [
  { id: 'python', label: 'Python', x: 15, y: 80, status: 'strong' },
  { id: 'statistics', label: 'Statistics', x: 38, y: 20, status: 'gap' },
  { id: 'machine-learning', label: 'Machine Learning', x: 50, y: 55, status: 'gap' },
  { id: 'model-evaluation', label: 'Model Evaluation', x: 80, y: 30, status: 'critical' },
  { id: 'deep-learning', label: 'Deep Learning', x: 82, y: 75, status: 'critical' },
];

export const graphEdges: GraphEdge[] = [
  { from: 'python', to: 'machine-learning', kind: 'prerequisite' },
  { from: 'statistics', to: 'machine-learning', kind: 'prerequisite' },
  { from: 'statistics', to: 'model-evaluation', kind: 'prerequisite' },
  { from: 'machine-learning', to: 'model-evaluation', kind: 'prerequisite' },
  { from: 'machine-learning', to: 'deep-learning', kind: 'prerequisite' },
  { from: 'model-evaluation', to: 'deep-learning', kind: 'related' },
];

export const prerequisiteChain = {
  title: 'Statistics → Machine Learning → Model Evaluation',
  description:
    'Some competency gaps are caused by weaker prerequisite competencies. Statistics is a foundational prerequisite for both Machine Learning and Model Evaluation — a weak grasp of statistics limits your ability to evaluate models rigorously.',
  steps: [
    { id: 'statistics', label: 'Statistics', note: 'Possible root-cause gap', isRootCause: true },
    { id: 'machine-learning', label: 'Machine Learning', note: 'Depends on Statistics', isRootCause: false },
    { id: 'model-evaluation', label: 'Model Evaluation', note: 'Depends on both', isRootCause: false },
  ],
};
