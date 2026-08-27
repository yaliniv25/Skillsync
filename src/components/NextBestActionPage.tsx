import { Sparkles, ArrowRight, Lightbulb, CheckCircle2, RotateCcw } from 'lucide-react';

type Props = {
  action: { title: string; detail: string; cta: string };
  onContinue: () => void;
  onRestart: () => void;
};

export default function NextBestActionPage({ action, onContinue, onRestart }: Props) {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="relative overflow-hidden rounded-2xl border border-tutor-200 bg-gradient-to-br from-tutor-50 via-white to-ocean-50 p-8 shadow-card">
        <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-tutor-200/40 blur-2xl" />

        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-tutor-100 px-3 py-1 text-xs font-semibold text-tutor-700">
            <Sparkles className="h-3.5 w-3.5" />
            Next-Best Action
          </span>

          <h2 className="mt-5 font-display text-2xl font-extrabold text-navy-900">
            {action.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
            {action.detail}
          </p>

          <div className="mt-6 flex items-start gap-3 rounded-xl bg-white/70 p-4 ring-1 ring-tutor-100">
            <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-tutor-600" />
            <p className="text-sm text-navy-800">
              <span className="font-semibold text-tutor-700">Why now: </span>
              Based on your updated mastery, this is the highest-leverage next step to keep your
              readiness trending upward.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={onContinue}
              className="inline-flex items-center gap-2 rounded-xl bg-tutor-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-tutor-600/30 transition-all hover:bg-tutor-700"
            >
              {action.cta}
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={onRestart}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-navy-700 transition-colors hover:bg-slate-50"
            >
              <RotateCcw className="h-4 w-4" />
              Restart Flow
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-success-600" />
          <h3 className="font-display text-base font-bold text-navy-900">Flow Complete</h3>
        </div>
        <p className="mt-2 text-sm text-slate-600">
          You've completed the full Skill-Sync prototype flow: assessment → results → learning path →
          quiz → updated mastery → next-best action. Return to the dashboard anytime to see your
          updated snapshot.
        </p>
      </div>
    </div>
  );
}
