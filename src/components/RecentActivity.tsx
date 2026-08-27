import { BookOpen, ClipboardCheck, History, Sparkles } from 'lucide-react';
import { activities } from '@/data/mockData';

const typeConfig = {
  course: { icon: BookOpen, color: 'bg-ocean-100 text-ocean-700' },
  assessment: { icon: ClipboardCheck, color: 'bg-assess-100 text-assess-700' },
  tutor: { icon: Sparkles, color: 'bg-tutor-100 text-tutor-700' },
  material: { icon: BookOpen, color: 'bg-success-100 text-success-700' },
} as const;

export default function RecentActivity() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-100">
          <History className="h-4 w-4 text-navy-700" />
        </div>
        <div>
          <h3 className="font-display text-base font-bold text-navy-900">Recent Learning Activity</h3>
          <p className="text-xs text-slate-500">Your latest interactions on the platform</p>
        </div>
      </div>

      <div className="mt-5">
        <div className="relative space-y-4 pl-2">
          <div className="absolute left-[18px] top-2 h-[calc(100%-1rem)] w-px bg-slate-200" />
          {activities.map((act) => {
            const cfg = typeConfig[act.type];
            const Icon = cfg.icon;
            return (
              <div key={act.id} className="relative flex items-start gap-3">
                <div
                  className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-4 ring-white ${cfg.color}`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1 pb-1">
                  <p className="text-sm font-medium leading-snug text-navy-900">{act.title}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{act.detail}</p>
                  <p className="mt-1 text-[11px] font-medium text-slate-400">{act.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
