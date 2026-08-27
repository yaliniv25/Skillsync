import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import RoleReadinessCard from '@/components/RoleReadinessCard';
import SkillGapSummary from '@/components/SkillGapSummary';
import CompetencyOverview from '@/components/CompetencyOverview';
import NextBestActionCard from '@/components/NextBestActionCard';
import RecentAssessments from '@/components/RecentAssessments';
import RecentActivity from '@/components/RecentActivity';
import CompetencyPage from '@/components/CompetencyPage';
import DiagnosticAssessmentPage from '@/components/DiagnosticAssessmentPage';
import AssessmentResultsPage from '@/components/AssessmentResultsPage';
import LearningPathPage from '@/components/LearningPathPage';
import AdaptiveQuizPage from '@/components/AdaptiveQuizPage';
import UpdatedMasteryPage from '@/components/UpdatedMasteryPage';
import NextBestActionPage from '@/components/NextBestActionPage';
import { diagnosticQuestions, learningPath } from '@/data/assessmentData';
import {
  createInitialFlowState,
  type FlowState,
  type FlowPage,
  type SkillResult,
  type LearningItemState,
} from '@/data/flowState';

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  dashboard: {
    title: 'Dashboard',
    subtitle: "Welcome back, Maya — here's your learning snapshot.",
  },
  competency: {
    title: 'Competency',
    subtitle: 'Understand your current capabilities vs. your target role.',
  },
  assessment: {
    title: 'Diagnostic Assessment',
    subtitle: 'A short skills check for your target role.',
  },
  results: {
    title: 'Assessment Results',
    subtitle: 'Your diagnostic score and identified skill gaps.',
  },
  'learning-path': {
    title: 'Learning Path',
    subtitle: 'Your personalized roadmap to close skill gaps.',
  },
  quiz: {
    title: 'Adaptive Quiz',
    subtitle: 'Focused practice on your weak skills.',
  },
  mastery: {
    title: 'Updated Mastery',
    subtitle: 'How your skills changed after the quiz.',
  },
  'next-action': {
    title: 'Next-Best Action',
    subtitle: 'Your recommended next step.',
  },
};

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [page, setPage] = useState<FlowPage>('dashboard');
  const [flow, setFlow] = useState<FlowState>(createInitialFlowState());

  const handleNavigate = (id: string) => {
    setPage(id as FlowPage);
    setSidebarOpen(false);
  };

  const goTo = (p: FlowPage) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Flow handlers ---

  const handleDiagnosticSubmit = (answers: Record<string, number>) => {
    const correctCount = diagnosticQuestions.filter(
      (q) => answers[q.id] === q.correctIndex
    ).length;
    const score = Math.round((correctCount / diagnosticQuestions.length) * 100);

    const skillMap = new Map<string, { correct: number; total: number; name: string }>();
    for (const q of diagnosticQuestions) {
      const entry = skillMap.get(q.skillId) ?? { correct: 0, total: 0, name: q.skillName };
      entry.total += 1;
      if (answers[q.id] === q.correctIndex) entry.correct += 1;
      skillMap.set(q.skillId, entry);
    }
    const skillResults: SkillResult[] = Array.from(skillMap.entries()).map(
      ([skillId, { correct, total, name }]) => ({
        skillId,
        skillName: name,
        correct,
        total,
        mastery: Math.round((correct / total) * 100),
        strong: correct / total >= 0.7,
      })
    );
    const weakSkillIds = skillResults.filter((s) => !s.strong).map((s) => s.skillId);
    const learningItems: LearningItemState[] = learningPath
      .filter((lp) => weakSkillIds.includes(lp.skillId))
      .map((lp) => ({ id: lp.id, status: 'not-started' as const }));

    setFlow((prev) => ({
      ...prev,
      diagnosticAnswers: answers,
      diagnosticScore: score,
      skillResults,
      weakSkillIds,
      learningItems,
    }));
    goTo('results');
  };

  const handleToggleLearningStatus = (itemId: string) => {
    setFlow((prev) => ({
      ...prev,
      learningItems: prev.learningItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              status:
                item.status === 'not-started'
                  ? 'in-progress'
                  : item.status === 'in-progress'
                    ? 'completed'
                    : 'not-started',
            }
          : item
      ),
    }));
  };

  const handleQuizComplete = (
    answers: Record<string, number>,
    score: number,
    quizSkillResults: SkillResult[]
  ) => {
    const updatedMastery = quizSkillResults.map((qr) => {
      const prevResult = flow.skillResults.find((s) => s.skillId === qr.skillId);
      const previous = prevResult ? prevResult.mastery : 50;
      const updated = Math.round(previous * 0.6 + qr.mastery * 0.4);
      const change = updated - previous;
      const status =
        updated >= 75 ? 'Strong' : updated >= 50 ? 'On Track' : 'Needs Work';
      return {
        skillId: qr.skillId,
        skillName: qr.skillName,
        previous,
        quiz: qr.mastery,
        updated,
        change,
        status,
      };
    });

    const lowest = [...updatedMastery].sort((a, b) => a.updated - b.updated)[0];
    let nextAction: { title: string; detail: string; cta: string };
    if (lowest && lowest.updated < 50) {
      nextAction = {
        title: `Continue learning ${lowest.skillName} fundamentals`,
        detail: `Your ${lowest.skillName} mastery is ${lowest.updated}% — below the 50% threshold. Focus on the recommended resource before attempting the next assessment.`,
        cta: 'Continue Learning',
      };
    } else if (lowest && lowest.updated < 75) {
      nextAction = {
        title: `Take the ${lowest.skillName} practice module next`,
        detail: `You're at ${lowest.updated}% in ${lowest.skillName}. A focused practice module can push you past the 75% target.`,
        cta: 'Start Practice Module',
      };
    } else {
      nextAction = {
        title: 'You are ready for the next assessment',
        detail: 'All assessed skills are at or above the 75% target. Move on to the next competency tier or a more advanced assessment.',
        cta: 'Start Next Assessment',
      };
    }

    setFlow((prev) => ({
      ...prev,
      quizAnswers: answers,
      quizScore: score,
      quizSkillResults,
      updatedMastery,
      nextAction,
    }));
    goTo('mastery');
  };

  const handleRestartFlow = () => {
    setFlow(createInitialFlowState());
    goTo('dashboard');
  };

  const meta = pageMeta[page] ?? { title: 'Skill-Sync', subtitle: '' };

  return (
    <div className="flex min-h-screen bg-slate-50 text-navy-900">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        active={page}
        onNavigate={handleNavigate}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar onMenuClick={() => setSidebarOpen(true)} title={meta.title} subtitle={meta.subtitle} />

        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {page === 'dashboard' && <DashboardView />}
          {page === 'competency' && (
            <CompetencyPage onStartAssessment={() => goTo('assessment')} />
          )}
          {page === 'assessment' && (
            <DiagnosticAssessmentPage
              onSubmit={handleDiagnosticSubmit}
              onBack={() => goTo('competency')}
            />
          )}
          {page === 'results' && (
            <AssessmentResultsPage
              score={flow.diagnosticScore}
              skillResults={flow.skillResults}
              weakSkillIds={flow.weakSkillIds}
              onStartLearning={() => goTo('learning-path')}
            />
          )}
          {page === 'learning-path' && (
            <LearningPathPage
              itemStates={flow.learningItems}
              onToggleStatus={handleToggleLearningStatus}
              onTakeQuiz={() => goTo('quiz')}
            />
          )}
          {page === 'quiz' && (
            <AdaptiveQuizPage
              weakSkillIds={flow.weakSkillIds}
              onComplete={handleQuizComplete}
              onViewMastery={() => goTo('mastery')}
              onRetake={() => {}}
            />
          )}
          {page === 'mastery' && (
            <UpdatedMasteryPage
              rows={flow.updatedMastery}
              onViewNextAction={() => goTo('next-action')}
            />
          )}
          {page === 'next-action' && flow.nextAction && (
            <NextBestActionPage
              action={flow.nextAction}
              onContinue={() => goTo('learning-path')}
              onRestart={handleRestartFlow}
            />
          )}
          {page === 'next-action' && !flow.nextAction && (
            <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-card">
              <p className="text-sm text-slate-500">
                Complete the quiz first to see your next-best action.
              </p>
              <button
                onClick={() => goTo('quiz')}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-tutor-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-tutor-600/30 transition-all hover:bg-tutor-700"
              >
                Take Quiz
              </button>
            </div>
          )}

          <footer className="mt-8 border-t border-slate-200 pt-5 text-center text-xs text-slate-400">
            Skill-Sync · AI-powered competency & learning platform
          </footer>
        </main>
      </div>
    </div>
  );
}

function DashboardView() {
  return (
    <div className="space-y-6">
      <RoleReadinessCard readiness={72} role="AI/ML Engineer" />

      <NextBestActionCard />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CompetencyOverview />
        </div>
        <SkillGapSummary />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentAssessments />
        <RecentActivity />
      </div>
    </div>
  );
}

export default App;
