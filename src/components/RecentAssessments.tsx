import { CheckCircle2, AlertCircle, ClipboardCheck } from 'lucide-react';
import { assessments } from '@/data/mockData';

export default function RecentAssessments() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-assess-100">
            <ClipboardCheck className="h-4 w-4 text-assess-600" />
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-navy-900">Recent Assessments</h3>
            <p className="text-xs text-slate-500">Latest scored checkpoints</p>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {assessments.map((a) => {
          const passed = a.status === 'passed';
          return (
            <div
              key={a.id}
              className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 transition-colors hover:bg-slate-50"
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                  passed
                    ? 'bg-success-100 text-success-700'
                    : 'bg-assess-100 text-assess-700'
                }`}
              >
                {a.score}%
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-navy-900">{a.title}</p>
                <p className="text-xs text-slate-500">{a.date}</p>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {a.topics.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-500 ring-1 ring-slate-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {passed ? (
                <span className="flex shrink-0 items-center gap-1 rounded-full bg-success-100 px-2.5 py-1 text-xs font-semibold text-success-700">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Passed
                </span>
              ) : (
                <span className="flex shrink-0 items-center gap-1 rounded-full bg-assess-100 px-2.5 py-1 text-xs font-semibold text-assess-700">
                  <AlertCircle className="h-3.5 w-3.5" />
                  Needs work
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
