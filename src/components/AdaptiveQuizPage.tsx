import { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  ChevronRight,
  Sparkles,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { quizQuestions } from '@/data/assessmentData';
import type { SkillResult } from '@/data/flowState';

type Props = {
  weakSkillIds: string[];
  onComplete: (answers: Record<string, number>, score: number, skillResults: SkillResult[]) => void;
  onViewMastery: () => void;
  onRetake: () => void;
};

export default function AdaptiveQuizPage({
  weakSkillIds,
  onComplete,
  onViewMastery,
  onRetake,
}: Props) {
  const adaptiveQuestions = buildAdaptiveQuestions(weakSkillIds);
  const total = adaptiveQuestions.length;

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState(false);

  const question = adaptiveQuestions[current];
  const selected = answers[question.id];
  const isCorrect = revealed && selected === question.correctIndex;
  const isLast = current === total - 1;
  const answeredCount = Object.keys(answers).length;

  const handleSelect = (optionIndex: number) => {
    if (revealed) return;
    setAnswers((prev) => ({ ...prev, [question.id]: optionIndex }));
    setRevealed(true);
  };

  const handleNext = () => {
    if (isLast) {
      const score = Math.round(
        (Object.entries(answers).filter(([qid, idx]) => {
          const q = adaptiveQuestions.find((x) => x.id === qid);
          return q && q.correctIndex === idx;
        }).length /
          total) *
          100
      );
      const skillResults = computeSkillResults(adaptiveQuestions, answers);
      onComplete(answers, score, skillResults);
    } else {
      setCurrent((c) => c + 1);
      setRevealed(false);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setAnswers({});
    setRevealed(false);
    onRetake();
  };

  const progress = (answeredCount / total) * 100;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="rounded-2xl border border-tutor-200 bg-gradient-to-r from-tutor-50 to-white p-5 shadow-card">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-tutor-600 text-white shadow-md shadow-tutor-600/30">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-tutor-700">
              Adaptive Quiz
            </p>
            <h2 className="font-display text-xl font-extrabold text-navy-900">
              Focused on Your Weak Skills
            </h2>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
        <div className="flex items-center justify-between text-xs font-medium text-slate-500">
          <span>
            Question {current + 1} of {total}
          </span>
          <span>{answeredCount} answered</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-tutor-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-tutor-50 px-2.5 py-1 text-[11px] font-semibold text-tutor-700">
            {question.skillName}
          </span>
          <h3 className="mt-3 font-display text-lg font-bold text-navy-900">{question.prompt}</h3>

          <div className="mt-5 space-y-3">
            {question.options.map((option, i) => {
              const isSelected = selected === i;
              const showCorrect = revealed && i === question.correctIndex;
              const showWrong = revealed && isSelected && i !== question.correctIndex;

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={revealed}
                  className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left text-sm transition-all ${
                    showCorrect
                      ? 'border-success-400 bg-success-50 ring-2 ring-success-200'
                      : showWrong
                        ? 'border-assess-400 bg-assess-50 ring-2 ring-assess-200'
                        : isSelected
                          ? 'border-tutor-400 bg-tutor-50'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  } ${revealed ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
                      showCorrect
                        ? 'border-success-600 bg-success-600 text-white'
                        : showWrong
                          ? 'border-assess-600 bg-assess-600 text-white'
                          : 'border-slate-300 text-slate-400'
                    }`}
                  >
                    {showCorrect ? (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    ) : showWrong ? (
                      <XCircle className="h-3.5 w-3.5" />
                    ) : (
                      String.fromCharCode(65 + i)
                    )}
                  </span>
                  <span className={showCorrect || showWrong ? 'font-medium text-navy-900' : 'text-slate-700'}>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>

          {revealed && (
            <div
              className={`mt-4 flex items-start gap-2.5 rounded-xl p-4 ${
                isCorrect ? 'bg-success-50 ring-1 ring-success-100' : 'bg-assess-50 ring-1 ring-assess-100'
              }`}
            >
              {isCorrect ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success-600" />
              ) : (
                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-assess-600" />
              )}
              <div>
                <p className={`text-sm font-semibold ${isCorrect ? 'text-success-700' : 'text-assess-700'}`}>
                  {isCorrect ? 'Correct!' : 'Not quite.'}
                </p>
                <p className="mt-0.5 text-sm leading-relaxed text-slate-600">{question.explanation}</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-navy-700 transition-colors hover:bg-slate-50"
          >
            <RotateCcw className="h-4 w-4" />
            Restart
          </button>

          <button
            onClick={handleNext}
            disabled={!revealed}
            className="inline-flex items-center gap-2 rounded-xl bg-tutor-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-tutor-600/30 transition-all hover:bg-tutor-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
          >
            {isLast ? 'View Mastery' : 'Next'}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function buildAdaptiveQuestions(weakSkillIds: string[]) {
  const weak = quizQuestions.filter((q) => weakSkillIds.includes(q.skillId));
  const strong = quizQuestions.filter((q) => !weakSkillIds.includes(q.skillId));
  return [...weak, ...strong];
}

function computeSkillResults(
  questions: typeof quizQuestions,
  answers: Record<string, number>
): SkillResult[] {
  const bySkill = new Map<string, { correct: number; total: number; name: string }>();
  for (const q of questions) {
    const entry = bySkill.get(q.skillId) ?? { correct: 0, total: 0, name: q.skillName };
    entry.total += 1;
    if (answers[q.id] === q.correctIndex) entry.correct += 1;
    bySkill.set(q.skillId, entry);
  }
  return Array.from(bySkill.entries()).map(([skillId, { correct, total, name }]) => ({
    skillId,
    skillName: name,
    correct,
    total,
    mastery: Math.round((correct / total) * 100),
    strong: correct / total >= 0.7,
  }));
}
