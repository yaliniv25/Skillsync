import { AlertTriangle, ArrowDownRight, CheckCircle2, Minus } from 'lucide-react';
import { skillGaps } from '@/data/mockData';

const levelConfig = {
  critical: {
    icon: AlertTriangle,
    badge: 'bg-assess-100 text-assess-700',
    dot: 'bg-assess-500',
    bar: 'bg-assess-500',
  },
  gap: {
    icon: ArrowDownRight,
    badge: 'bg-amber-100 text-amber-700',
    dot: 'bg-amber-500',
    bar: 'bg-amber-500',
  },
  'on-track': {
    icon: CheckCircle2,
    badge: 'bg-success-100 text-success-700',
    dot: 'bg-success-500',
    bar: 'bg-success-500',
  },
} as const;

export default function SkillGapSummary() {
  const counts = {
    critical: skillGaps.filter((s) => s.level === 'critical').length,
    gap: skillGaps.filter((s) => s.level === 'gap').length,
    'on-track': skillGaps.filter((s) => s.level === 'on-track').length,
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-base font-bold text-navy-900">Skill-Gap Summary</h3>
          <p className="text-xs text-slate-500">Priority areas toward your target role</p>
        </div>
        <span className="rounded-lg bg-navy-50 px-2.5 py-1 text-xs font-semibold text-navy-700">
          {skillGaps.length} tracked
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {(Object.keys(levelConfig) as (keyof typeof levelConfig)[]).map((level) => {
          const cfg = levelConfig[level];
          const Icon = cfg.icon;
          return (
            <div
              key={level}
              className={`rounded-xl p-3 ${cfg.badge} flex flex-col items-center text-center`}
            >
              <Icon className="h-4 w-4" />
              <span className="mt-1 font-display text-2xl font-extrabold leading-none">
                {counts[level]}
              </span>
              <span className="mt-1 text-[11px] font-medium capitalize leading-tight">
                {level.replace('-', ' ')}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-5 space-y-3">
        {skillGaps.map((gap) => {
          const cfg = levelConfig[gap.level];
          return (
            <div key={gap.id} className="flex items-center gap-3">
              <span className={`h-2 w-2 shrink-0 rounded-full ${cfg.dot}`} />
              <span className="flex-1 truncate text-sm font-medium text-navy-800">{gap.skill}</span>
              <div className="flex items-center gap-1.5">
                {gap.delta > -5 ? (
                  <Minus className="h-3.5 w-3.5 text-slate-400" />
                ) : (
                  <ArrowDownRight className="h-3.5 w-3.5 text-assess-500" />
                )}
                <span
                  className={`text-sm font-semibold ${
                    gap.delta > -5 ? 'text-slate-500' : 'text-assess-600'
                  }`}
                >
                  {gap.delta}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
