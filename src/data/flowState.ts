export type FlowPage =
  | 'dashboard'
  | 'competency'
  | 'assessment'
  | 'results'
  | 'learning-path'
  | 'quiz'
  | 'mastery'
  | 'next-action';

export type SkillResult = {
  skillId: string;
  skillName: string;
  correct: number;
  total: number;
  mastery: number;
  strong: boolean;
};

export type LearningItemState = {
  id: string;
  status: 'not-started' | 'in-progress' | 'completed';
};

export type FlowState = {
  diagnosticAnswers: Record<string, number>;
  diagnosticScore: number;
  skillResults: SkillResult[];
  weakSkillIds: string[];
  learningItems: LearningItemState[];
  quizAnswers: Record<string, number>;
  quizScore: number;
  quizSkillResults: SkillResult[];
  updatedMastery: { skillId: string; skillName: string; previous: number; quiz: number; updated: number; change: number; status: string }[];
  nextAction: { title: string; detail: string; cta: string } | null;
};

export function createInitialFlowState(): FlowState {
  return {
    diagnosticAnswers: {},
    diagnosticScore: 0,
    skillResults: [],
    weakSkillIds: [],
    learningItems: [],
    quizAnswers: {},
    quizScore: 0,
    quizSkillResults: [],
    updatedMastery: [],
    nextAction: null,
  };
}
