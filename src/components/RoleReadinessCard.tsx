import { Target, TrendingUp, Calendar } from 'lucide-react';

type Props = {
  readiness: number;
  role: string;
};

export default function RoleReadinessCard({ readiness, role }: Props) {
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (readiness / 100) * circumference;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 p-6 text-white shadow-card">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-ocean-500/20 blur-2xl" />
      <div className="absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-tutor-500/10 blur-2xl" />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-ocean-100 backdrop-blur">
            <Target className="h-3.5 w-3.5" />
            Target Role
          </div>
          <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight">{role}</h3>
          <p className="mt-1 text-sm text-navy-200">
            Based on 14 skills mapped to industry benchmarks
          </p>

          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-success-300" />
              <span className="text-navy-200">+8 pts this month</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-ocean-200" />
              <span className="text-navy-200">Est. readiness: Nov 2026</span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-center">
          <div className="relative h-36 w-36">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="10"
              />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="url(#readinessGrad)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
              />
              <defs>
                <linearGradient id="readinessGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#3385fc" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-4xl font-extrabold">{readiness}%</span>
              <span className="text-xs font-medium uppercase tracking-wider text-navy-300">
                Readiness
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
