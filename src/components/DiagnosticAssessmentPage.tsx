import { useState } from 'react';
import { ChevronLeft, ChevronRight, ClipboardCheck, Send } from 'lucide-react';
import { diagnosticQuestions } from '@/data/assessmentData';
import { targetRole } from '@/data/competencyData';

type Props = {
  onSubmit: (answers: Record<string, number>) => void;
  onBack: () => void;
};

export default function DiagnosticAssessmentPage({ onSubmit, onBack }: Props) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const question = diagnosticQuestions[current];
  const total = diagnosticQuestions.length;
  const answeredCount = Object.keys(answers).length;
  const isLast = current === total - 1;
  const canSubmit = answeredCount === total;
  const progress = (answeredCount / total) * 100;

  const select = (optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [question.id]: optionIndex }));
  };

  const handleSubmit = () => {
    if (canSubmit) onSubmit(answers);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="rounded-2xl border border-assess-200 bg-gradient-to-r from-assess-50 to-white p-5 shadow-card">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-assess-600 text-white shadow-md shadow-assess-600/30">
            <ClipboardCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-assess-700">
              Diagnostic Assessment
            </p>
            <h2 className="font-display text-xl font-extrabold text-navy-900">
              {targetRole} — Skills Check
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
            className="h-full rounded-full bg-assess-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ocean-50 px-2.5 py-1 text-[11px] font-semibold text-ocean-700">
            {question.skillName}
          </span>
          <h3 className="mt-3 font-display text-lg font-bold text-navy-900">
            {question.prompt}
          </h3>

          <div className="mt-5 space-y-3">
            {question.options.map((option, i) => {
              const selected = answers[question.id] === i;
              return (
                <button
                  key={i}
                  onClick={() => select(i)}
                  className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left text-sm transition-all ${
                    selected
                      ? 'border-assess-400 bg-assess-50 ring-2 ring-assess-200'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
                      selected
                        ? 'border-assess-600 bg-assess-600 text-white'
                        : 'border-slate-300 text-slate-400'
                    }`}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className={selected ? 'font-medium text-navy-900' : 'text-slate-700'}>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-navy-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>

          {isLast ? (
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="inline-flex items-center gap-2 rounded-xl bg-assess-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-assess-600/30 transition-all hover:bg-assess-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
            >
              <Send className="h-4 w-4" />
              Submit Assessment
            </button>
          ) : (
            <button
              onClick={() => setCurrent((c) => Math.min(total - 1, c + 1))}
              className="inline-flex items-center gap-1.5 rounded-xl bg-ocean-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-ocean-600/30 transition-all hover:bg-ocean-700"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <button
        onClick={onBack}
        className="text-sm font-medium text-slate-500 transition-colors hover:text-navy-700"
      >
        ← Back to Competency
      </button>
    </div>
  );
}
