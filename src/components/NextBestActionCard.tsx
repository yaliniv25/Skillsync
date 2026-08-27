import { ArrowRight, Clock, Gauge, Play, Sparkles, TrendingUp } from 'lucide-react';
import { nextAction } from '@/data/mockData';

export default function NextBestActionCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-tutor-200 bg-gradient-to-br from-tutor-50 via-white to-ocean-50 p-6 shadow-card">
      <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-tutor-200/40 blur-2xl" />

      <div className="relative">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-tutor-100 px-3 py-1 text-xs font-semibold text-tutor-700">
            <Sparkles className="h-3.5 w-3.5" />
            AI Recommended · Next-Best Action
          </span>
        </div>

        <h3 className="mt-4 font-display text-xl font-extrabold text-navy-900">
          {nextAction.title}
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
          {nextAction.rationale}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-navy-700">
            <Play className="h-3.5 w-3.5 text-tutor-600" />
            {nextAction.module}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-navy-700">
            <Clock className="h-3.5 w-3.5 text-ocean-600" />
            {nextAction.duration}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-navy-700">
            <Gauge className="h-3.5 w-3.5 text-amber-600" />
            {nextAction.difficulty}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-success-200 bg-success-50 px-3 py-1.5 text-xs font-semibold text-success-700">
            <TrendingUp className="h-3.5 w-3.5" />
            {nextAction.expectedGain} readiness
          </span>
        </div>

        <div className="mt-5 rounded-xl border border-slate-200 bg-white/70 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Suggested steps
          </p>
          <ol className="mt-2 space-y-1.5">
            {nextAction.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-navy-800">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-tutor-100 text-[11px] font-bold text-tutor-700">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <button className="mt-5 inline-flex items-center gap-2 rounded-xl bg-tutor-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-tutor-600/30 transition-all hover:bg-tutor-700 hover:shadow-tutor-600/40">
          Start learning now
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
