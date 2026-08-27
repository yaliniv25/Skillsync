import {
  Route,
  Circle,
  CircleDot,
  CheckCircle2,
  Clock,
  ArrowRight,
  BookOpen,
  Target,
} from 'lucide-react';
import { learningPath } from '@/data/assessmentData';
import type { LearningItemState } from '@/data/flowState';

type Props = {
  itemStates: LearningItemState[];
  onToggleStatus: (itemId: string) => void;
  onTakeQuiz: () => void;
};

const statusOrder: LearningItemState['status'][] = ['not-started', 'in-progress', 'completed'];

const statusConfig = {
  'not-started': {
    label: 'Not Started',
    icon: Circle,
    chip: 'bg-slate-100 text-slate-600',
    bar: 'bg-slate-300',
  },
  'in-progress': {
    label: 'In Progress',
    icon: CircleDot,
    chip: 'bg-ocean-100 text-ocean-700',
    bar: 'bg-ocean-500',
  },
  'completed': {
    label: 'Completed',
    icon: CheckCircle2,
    chip: 'bg-success-100 text-success-700',
    bar: 'bg-success-500',
  },
} as const;

export default function LearningPathPage({
  itemStates,
  onToggleStatus,
  onTakeQuiz,
}: Props) {
  const stateMap = new Map(itemStates.map((s) => [s.id, s.status]));
  const completedCount = itemStates.filter((s) => s.status === 'completed').length;
  const inProgressCount = itemStates.filter((s) => s.status === 'in-progress').length;
  const progress = learningPath.length > 0 ? (completedCount / learningPath.length) * 100 : 0;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="rounded-2xl border border-ocean-200 bg-gradient-to-r from-ocean-50 to-white p-5 shadow-card">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ocean-600 text-white shadow-md shadow-ocean-600/30">
            <Route className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-ocean-700">
              Personalized Learning Path
            </p>
            <h2 className="font-display text-xl font-extrabold text-navy-900">
              Your Roadmap to AI/ML Engineer
            </h2>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-base font-bold text-navy-900">Roadmap Progress</h3>
            <p className="text-xs text-slate-500">
              {completedCount} completed · {inProgressCount} in progress · {learningPath.length - completedCount - inProgressCount} not started
            </p>
          </div>
          <span className="font-display text-2xl font-extrabold text-ocean-700">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-ocean-400 to-success-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-4">
        {learningPath.map((item, i) => {
          const status = stateMap.get(item.id) ?? 'not-started';
          const cfg = statusConfig[status];
          const Icon = cfg.icon;
          const gap = item.targetLevel - item.currentLevel;

          return (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition-all hover:shadow-card-hover"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy-100 font-display text-sm font-bold text-navy-700">
                  {i + 1}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-bold text-navy-900">{item.skillName}</p>
                      <p className="text-xs text-slate-400">
                        Current {item.currentLevel}% → Target {item.targetLevel}%
                        <span className="ml-1.5 font-semibold text-assess-600">({gap}% gap)</span>
                      </p>
                    </div>
                    <span className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${cfg.chip}`}>
                      <Icon className="h-3 w-3" />
                      {cfg.label}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.whyItMatters}</p>

                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="flex items-start gap-2 rounded-lg bg-slate-50 p-3">
                      <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-ocean-600" />
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          Resource
                        </p>
                        <p className="text-xs text-navy-700">{item.resource}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 rounded-lg bg-slate-50 p-3">
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          Estimated Time
                        </p>
                        <p className="text-xs text-navy-700">{item.estimatedTime}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Status:
                    </span>
                    <div className="flex gap-1.5">
                      {statusOrder.map((s) => {
                        const sCfg = statusConfig[s];
                        const SIcon = sCfg.icon;
                        const isActive = status === s;
                        return (
                          <button
                            key={s}
                            onClick={() => {
                              if (status !== s) onToggleStatus(item.id);
                            }}
                            className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-all ${
                              isActive
                                ? `${sCfg.chip} border-transparent ring-1 ring-current/20`
                                : 'border-slate-200 text-slate-400 hover:bg-slate-50'
                            }`}
                          >
                            <SIcon className="h-3 w-3" />
                            {sCfg.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-tutor-200 bg-gradient-to-r from-tutor-50 to-white p-5 shadow-card">
        <div className="flex items-center gap-2.5">
          <Target className="h-5 w-5 text-tutor-600" />
          <p className="text-sm text-navy-800">
            Ready to test your knowledge? Take the adaptive quiz focused on your weak skills.
          </p>
        </div>
        <button
          onClick={onTakeQuiz}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-tutor-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-tutor-600/30 transition-all hover:bg-tutor-700"
        >
          Take Quiz
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
