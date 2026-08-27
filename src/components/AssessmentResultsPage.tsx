import {
  CheckCircle2,
  AlertOctagon,
  AlertTriangle,
  ArrowRight,
  ClipboardCheck,
  TrendingDown,
} from 'lucide-react';
import type { SkillResult } from '@/data/flowState';

type Props = {
  score: number;
  skillResults: SkillResult[];
  weakSkillIds: string[];
  onStartLearning: () => void;
};

export default function AssessmentResultsPage({
  score,
  skillResults,
  weakSkillIds,
  onStartLearning,
}: Props) {
  const strong = skillResults.filter((s) => s.strong);
  const weak = skillResults.filter((s) => !s.strong);
  const avgGap =
    skillResults.length > 0
      ? Math.round(
          skillResults.reduce((acc, s) => acc + Math.max(0, 80 - s.mastery), 0) /
            skillResults.length
        )
      : 0;

  const priority =
    score >= 75 ? { label: 'Low', chip: 'bg-success-100 text-success-700' } :
    score >= 50 ? { label: 'Medium', chip: 'bg-amber-100 text-amber-700' } :
    { label: 'High', chip: 'bg-assess-100 text-assess-700' };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-assess-600 text-white shadow-md shadow-assess-600/30">
            <ClipboardCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-assess-700">
              Assessment Results
            </p>
            <h2 className="font-display text-xl font-extrabold text-navy-900">
              Diagnostic — Skills Check
            </h2>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-gradient-to-br from-navy-800 to-navy-950 p-5 text-white">
            <p className="text-xs font-medium text-navy-200">Overall Score</p>
            <p className="mt-1 font-display text-4xl font-extrabold">{score}%</p>
            <p className="mt-1 text-xs text-navy-300">
              {score >= 75 ? 'Strong baseline' : score >= 50 ? 'Developing' : 'Needs work'}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-medium text-slate-500">Skill-Gap Percentage</p>
            <p className="mt-1 font-display text-4xl font-extrabold text-assess-600">{avgGap}%</p>
            <p className="mt-1 text-xs text-slate-500">Average gap to 80% target</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-medium text-slate-500">Priority Level</p>
            <p className="mt-1">
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold ${priority.chip}`}>
                {priority.label}
              </span>
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {weak.length} skill{weak.length === 1 ? '' : 's'} need attention
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-success-600" />
            <h3 className="font-display text-base font-bold text-navy-900">Strong Skills</h3>
          </div>
          {strong.length > 0 ? (
            <div className="mt-4 space-y-3">
              {strong.map((s) => (
                <div key={s.skillId} className="rounded-xl bg-success-50 p-3 ring-1 ring-success-100">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-navy-900">{s.skillName}</p>
                    <span className="text-sm font-bold text-success-700">{s.mastery}%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-success-100">
                    <div className="h-full rounded-full bg-success-500" style={{ width: `${s.mastery}%` }} />
                  </div>
                  <p className="mt-1.5 text-xs text-slate-500">
                    {s.correct} of {s.total} correct
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-400">No strong skills identified yet.</p>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
          <div className="flex items-center gap-2">
            <AlertOctagon className="h-5 w-5 text-assess-600" />
            <h3 className="font-display text-base font-bold text-navy-900">Weak / Missing Skills</h3>
          </div>
          {weak.length > 0 ? (
            <div className="mt-4 space-y-3">
              {weak.map((s) => (
                <div key={s.skillId} className="rounded-xl bg-assess-50 p-3 ring-1 ring-assess-100">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-navy-900">{s.skillName}</p>
                    <span className="text-sm font-bold text-assess-700">{s.mastery}%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-assess-100">
                    <div className="h-full rounded-full bg-assess-500" style={{ width: `${s.mastery}%` }} />
                  </div>
                  <p className="mt-1.5 text-xs text-slate-500">
                    {s.correct} of {s.total} correct
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-400">No weak skills — great job!</p>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
        <h3 className="font-display text-base font-bold text-navy-900">Skills Assessed</h3>
        <div className="mt-4 space-y-2">
          {skillResults.map((s) => (
            <div key={s.skillId} className="flex items-center gap-3 rounded-lg border border-slate-100 px-4 py-2.5">
              {s.strong ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-success-600" />
              ) : (
                <TrendingDown className="h-4 w-4 shrink-0 text-assess-600" />
              )}
              <span className="flex-1 text-sm font-medium text-navy-800">{s.skillName}</span>
              <span className="text-xs text-slate-400">{s.correct}/{s.total}</span>
              <span className={`text-sm font-bold ${s.strong ? 'text-success-700' : 'text-assess-700'}`}>
                {s.mastery}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onStartLearning}
          className="inline-flex items-center gap-2 rounded-xl bg-ocean-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-ocean-600/30 transition-all hover:bg-ocean-700"
        >
          Start Learning
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
