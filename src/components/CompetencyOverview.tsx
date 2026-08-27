import { competencies } from '@/data/mockData';

const statusConfig = {
  'on-track': { label: 'On track', color: 'text-success-700', bar: 'bg-success-500', chip: 'bg-success-100 text-success-700' },
  gap: { label: 'Gap', color: 'text-amber-700', bar: 'bg-amber-500', chip: 'bg-amber-100 text-amber-700' },
  critical: { label: 'Critical', color: 'text-assess-700', bar: 'bg-assess-500', chip: 'bg-assess-100 text-assess-700' },
} as const;

export default function CompetencyOverview() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-base font-bold text-navy-900">Competency Overview</h3>
          <p className="text-xs text-slate-500">Current level vs. target for your role</p>
        </div>
        <button className="rounded-lg px-3 py-1.5 text-xs font-semibold text-ocean-700 transition-colors hover:bg-ocean-50">
          View all
        </button>
      </div>

      <div className="mt-5 space-y-5">
        {competencies.map((c, i) => {
          const cfg = statusConfig[c.status];
          return (
            <div key={c.id} className="group">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-navy-900">{c.name}</p>
                  <p className="text-xs text-slate-400">{c.category}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${cfg.chip}`}>
                  {cfg.label}
                </span>
              </div>

              <div className="mt-2 flex items-center gap-3">
                <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="absolute left-0 top-0 h-full origin-left rounded-full bg-slate-300"
                    style={{ width: `${c.target}%` }}
                  />
                  <div
                    className={`absolute left-0 top-0 h-full origin-left rounded-full ${cfg.bar} animate-grow-bar`}
                    style={{ width: `${c.current}%`, animationDelay: `${i * 80}ms` }}
                  />
                </div>
                <div className="flex w-20 shrink-0 items-center justify-end gap-1 text-xs font-semibold">
                  <span className={cfg.color}>{c.current}%</span>
                  <span className="text-slate-300">/</span>
                  <span className="text-slate-400">{c.target}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
