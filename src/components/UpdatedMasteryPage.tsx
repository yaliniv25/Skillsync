import { TrendingUp, ArrowUp, Minus, ArrowRight, Gauge } from 'lucide-react';

export type MasteryRow = {
  skillId: string;
  skillName: string;
  previous: number;
  quiz: number;
  updated: number;
  change: number;
  status: string;
};

type Props = {
  rows: MasteryRow[];
  onViewNextAction: () => void;
};

export default function UpdatedMasteryPage({ rows, onViewNextAction }: Props) {
  const avgPrevious =
    rows.length > 0 ? Math.round(rows.reduce((a, r) => a + r.previous, 0) / rows.length) : 0;
  const avgUpdated =
    rows.length > 0 ? Math.round(rows.reduce((a, r) => a + r.updated, 0) / rows.length) : 0;
  const avgChange = avgUpdated - avgPrevious;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="rounded-2xl border border-success-200 bg-gradient-to-r from-success-50 to-white p-5 shadow-card">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-success-600 text-white shadow-md shadow-success-600/30">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-success-700">
              Updated Mastery
            </p>
            <h2 className="font-display text-xl font-extrabold text-navy-900">
              Your Skills After the Quiz
            </h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Avg. Previous" value={`${avgPrevious}%`} color="text-slate-600" />
        <StatCard label="Avg. Quiz Score" value={`${rows.length > 0 ? Math.round(rows.reduce((a, r) => a + r.quiz, 0) / rows.length) : 0}%`} color="text-tutor-700" />
        <StatCard
          label="Avg. Updated"
          value={`${avgUpdated}%`}
          color="text-success-700"
          delta={avgChange}
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-5 py-3 font-semibold">Skill</th>
                <th className="px-5 py-3 font-semibold">Previous</th>
                <th className="px-5 py-3 font-semibold">Quiz</th>
                <th className="px-5 py-3 font-semibold">Updated</th>
                <th className="px-5 py-3 font-semibold">Change</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((r) => {
                const positive = r.change > 0;
                const neutral = r.change === 0;
                return (
                  <tr key={r.skillId} className="transition-colors hover:bg-slate-50/70">
                    <td className="px-5 py-4 font-semibold text-navy-900">{r.skillName}</td>
                    <td className="px-5 py-4 text-slate-600">{r.previous}%</td>
                    <td className="px-5 py-4 text-tutor-700">{r.quiz}%</td>
                    <td className="px-5 py-4">
                      <span className="font-bold text-navy-900">{r.updated}%</span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1 font-bold ${
                          positive ? 'text-success-600' : neutral ? 'text-slate-400' : 'text-assess-600'
                        }`}
                      >
                        {positive ? <ArrowUp className="h-3.5 w-3.5" /> : neutral ? <Minus className="h-3.5 w-3.5" /> : <ArrowUp className="h-3.5 w-3.5 rotate-180" />}
                        {positive ? '+' : ''}{r.change}%
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                          r.status === 'Strong'
                            ? 'bg-success-100 text-success-700'
                            : r.status === 'On Track'
                              ? 'bg-ocean-100 text-ocean-700'
                              : 'bg-assess-100 text-assess-700'
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onViewNextAction}
          className="inline-flex items-center gap-2 rounded-xl bg-navy-800 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-navy-800/30 transition-all hover:bg-navy-900"
        >
          View Next-Best Action
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
  delta,
}: {
  label: string;
  value: string;
  color: string;
  delta?: number;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <div className="flex items-center gap-2">
        <Gauge className="h-4 w-4 text-slate-400" />
        <p className="text-xs font-medium text-slate-500">{label}</p>
      </div>
      <p className={`mt-1 font-display text-3xl font-extrabold ${color}`}>{value}</p>
      {delta !== undefined && (
        <p className={`mt-1 text-xs font-semibold ${delta > 0 ? 'text-success-600' : delta < 0 ? 'text-assess-600' : 'text-slate-400'}`}>
          {delta > 0 ? `+${delta}%` : `${delta}%`} change
        </p>
      )}
    </div>
  );
}
