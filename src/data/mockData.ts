export type Competency = {
  id: string;
  name: string;
  category: string;
  current: number;
  target: number;
  status: 'on-track' | 'gap' | 'critical';
};

export type Assessment = {
  id: string;
  title: string;
  date: string;
  score: number;
  maxScore: number;
  status: 'passed' | 'needs-work';
  topics: string[];
};

export type Activity = {
  id: string;
  type: 'course' | 'assessment' | 'material' | 'tutor';
  title: string;
  detail: string;
  time: string;
};

export type SkillGap = {
  id: string;
  skill: string;
  level: 'critical' | 'gap' | 'on-track';
  delta: number;
};

export const competencies: Competency[] = [
  {
    id: 'c1',
    name: 'Python & ML Libraries',
    category: 'Programming',
    current: 88,
    target: 90,
    status: 'on-track',
  },
  {
    id: 'c2',
    name: 'Deep Learning (Transformers)',
    category: 'Modeling',
    current: 64,
    target: 85,
    status: 'gap',
  },
  {
    id: 'c3',
    name: 'MLOps & Deployment',
    category: 'Engineering',
    current: 41,
    target: 80,
    status: 'critical',
  },
  {
    id: 'c4',
    name: 'Data Engineering',
    category: 'Engineering',
    current: 72,
    target: 75,
    status: 'on-track',
  },
  {
    id: 'c5',
    name: 'Statistics & Experimentation',
    category: 'Foundations',
    current: 79,
    target: 82,
    status: 'on-track',
  },
];

export const skillGaps: SkillGap[] = [
  { id: 's1', skill: 'Model Deployment (Kubernetes)', level: 'critical', delta: -39 },
  { id: 's2', skill: 'Transformer Fine-Tuning', level: 'gap', delta: -21 },
  { id: 's3', skill: 'ML Pipeline Orchestration', level: 'gap', delta: -18 },
  { id: 's4', skill: 'A/B Testing at Scale', level: 'on-track', delta: -3 },
];

export const assessments: Assessment[] = [
  {
    id: 'a1',
    title: 'Deep Learning Fundamentals',
    date: 'Aug 24, 2026',
    score: 78,
    maxScore: 100,
    status: 'passed',
    topics: ['CNNs', 'Attention', 'Optimization'],
  },
  {
    id: 'a2',
    title: 'MLOps Practices Checkpoint',
    date: 'Aug 21, 2026',
    score: 52,
    maxScore: 100,
    status: 'needs-work',
    topics: ['CI/CD', 'Containers', 'Monitoring'],
  },
  {
    id: 'a3',
    title: 'Statistical Inference Quiz',
    date: 'Aug 18, 2026',
    score: 91,
    maxScore: 100,
    status: 'passed',
    topics: ['Hypothesis Testing', 'Confidence Intervals'],
  },
];

export const activities: Activity[] = [
  {
    id: 'act1',
    type: 'tutor',
    title: 'AI Tutor session: "Why does my model overfit?"',
    detail: '12-min guided explanation · regularization & dropout',
    time: '2h ago',
  },
  {
    id: 'act2',
    type: 'course',
    title: 'Completed lesson 4 of "Transformer Architecture"',
    detail: 'Attention mechanisms & positional encoding',
    time: 'Yesterday',
  },
  {
    id: 'act3',
    type: 'assessment',
    title: 'Scored 78% on Deep Learning Fundamentals',
    detail: 'Passed · 2 topics flagged for review',
    time: '2 days ago',
  },
  {
    id: 'act4',
    type: 'material',
    title: 'Bookmarked "Production ML Systems"',
    detail: 'Reading material · 34 min read',
    time: '3 days ago',
  },
];

export const nextAction = {
  title: 'Complete "MLOps Foundations" module',
  rationale:
    'Your MLOps competency is 41% vs. an 80% target — the largest gap toward the AI/ML Engineer role. Closing it lifts overall readiness by ~9 points.',
  module: 'MLOps Foundations',
  duration: '45 min',
  difficulty: 'Intermediate',
  expectedGain: '+9 pts',
  steps: [
    'Watch: CI/CD for ML pipelines (12 min)',
    'Lab: Containerize a model endpoint (20 min)',
    'Quiz: Deployment checkpoints (8 min)',
  ],
};
