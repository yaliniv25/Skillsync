import { useState } from 'react';
import {
  Target,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  ArrowDown,
  Sparkles,
  ArrowRight,
  Layers,
  GitBranch,
  Lightbulb,
  ClipboardCheck,
} from 'lucide-react';
import {
  competencyDetails,
  competencySummary,
  skillGapAnalysis,
  prerequisiteChain,
  targetRole,
  type CompetencyStatus,
} from '@/data/competencyData';
import CompetencyGraph from '@/components/CompetencyGraph';

const statusConfig: Record<
  CompetencyStatus,
  { label: string; chip: string; bar: string; text: string; icon: typeof CheckCircle2 }
> = {
  strong: {
    label: 'Strong',
    chip: 'bg-success-100 text-success-700',
    bar: 'bg-success-500',
    text: 'text-success-700',
    icon: CheckCircle2,
  },
  gap: {
    label: 'Gap',
    chip: 'bg-amber-100 text-amber-700',
    bar: 'bg-amber-500',
    text: 'text-amber-700',
    icon: AlertTriangle,
  },
  critical: {
    label: 'Critical Gap',
    chip: 'bg-assess-100 text-assess-700',
    bar: 'bg-assess-500',
    text: 'text-assess-700',
    icon: AlertOctagon,
  },
};

type CompetencyPageProps = {
  onStartAssessment: () => void;
};

export default function CompetencyPage({ onStartAssessment }: CompetencyPageProps) {
  const [selectedId, setSelectedId] = useState<string | null>('model-evaluation');
  const selected = competencyDetails.find((c) => c.id === selectedId) ?? null;

  return (
    <div className="space-y-6">
      {/* Target role banner + start assessment CTA */}
      <div className="flex flex-col gap-4 rounded-2xl border border-ocean-200 bg-gradient-to-r from-ocean-50 to-white p-5 shadow-card sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ocean-600 text-white shadow-md shadow-ocean-600/30">
            <Target className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-ocean-700">
              Target Role
            </p>
            <h2 className="font-display text-xl font-extrabold text-navy-900">{targetRole}</h2>
          </div>
        </div>
        <button
          onClick={onStartAssessment}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-assess-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-assess-600/30 transition-all hover:bg-assess-700"
        >
          <ClipboardCheck className="h-4 w-4" />
          Start Assessment
        </button>
      </div>

      {/* 1. Competency Summary */}
      <section>
        <SectionHeader
          icon={Layers}
          title="Competency Summary"
          subtitle="Your overall standing against the competencies required for your target role"
        />
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryStat
            label="Overall Readiness"
            value={`${competencySummary.overall}%`}
            icon={TrendingUp}
            color="bg-ocean-600"
            ring="from-ocean-400 to-ocean-600"
          />
          <SummaryStat
            label="Strong Competencies"
            value={String(competencySummary.strong)}
            icon={CheckCircle2}
            color="bg-success-600"
            ring="from-success-400 to-success-600"
          />
          <SummaryStat
            label="Developing"
            value={String(competencySummary.developing)}
            icon={AlertTriangle}
            color="bg-amber-500"
            ring="from-amber-300 to-amber-500"
          />
          <SummaryStat
            label="Skill Gaps"
            value={String(competencySummary.gaps)}
            icon={AlertOctagon}
            color="bg-assess-600"
            ring="from-assess-400 to-assess-600"
          />
        </div>
      </section>

      {/* 2. Current vs Target Competencies */}
      <section>
        <SectionHeader
          icon={Target}
          title="Current vs Target Competencies"
          subtitle="Where you stand today compared to the target mastery for each competency"
        />
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {competencyDetails.map((c, i) => {
            const cfg = statusConfig[c.status];
            const gap = c.target - c.current;
            const Icon = cfg.icon;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                className={`group rounded-2xl border bg-white p-5 text-left shadow-card transition-all hover:shadow-card-hover ${
                  selectedId === c.id
                    ? 'border-ocean-400 ring-2 ring-ocean-200'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-navy-900">{c.name}</p>
                    <p className="text-xs text-slate-400">{c.category}</p>
                  </div>
                  <span
                    className={`flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${cfg.chip}`}
                  >
                    <Icon className="h-3 w-3" />
                    {cfg.label}
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-medium">
                      <span className="text-slate-500">Current</span>
                      <span className={cfg.text}>{c.current}%</span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full origin-left rounded-full ${cfg.bar} animate-grow-bar`}
                        style={{ width: `${c.current}%`, animationDelay: `${i * 60}ms` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-medium">
                      <span className="text-slate-500">Target</span>
                      <span className="text-slate-600">{c.target}%</span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full origin-left rounded-full bg-slate-300"
                        style={{ width: `${c.target}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                  <span className="text-slate-500">Gap</span>
                  <span
                    className={`font-bold ${
                      gap <= 0 ? 'text-success-600' : gap > 30 ? 'text-assess-600' : 'text-amber-600'
                    }`}
                  >
                    {gap <= 0 ? `+${Math.abs(gap)}%` : `${gap}%`}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Skill Gap Analysis */}
      <section>
        <SectionHeader
          icon={AlertTriangle}
          title="Your Skill Gaps"
          subtitle="Ranked by importance to your target role"
        />
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-3 font-semibold">Priority</th>
                  <th className="px-5 py-3 font-semibold">Competency</th>
                  <th className="px-5 py-3 font-semibold">Current</th>
                  <th className="px-5 py-3 font-semibold">Target</th>
                  <th className="px-5 py-3 font-semibold">Gap</th>
                  <th className="px-5 py-3 font-semibold">Why it matters</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {skillGapAnalysis.map((g) => (
                  <tr key={g.id} className="transition-colors hover:bg-slate-50/70">
                    <td className="px-5 py-4">
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                          g.priority === 1
                            ? 'bg-assess-100 text-assess-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {g.priority}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-semibold text-navy-900">{g.competency}</td>
                    <td className="px-5 py-4 text-slate-600">{g.current}%</td>
                    <td className="px-5 py-4 text-slate-600">{g.target}%</td>
                    <td className="px-5 py-4">
                      <span
                        className={`font-bold ${
                          g.gap > 35 ? 'text-assess-600' : 'text-amber-600'
                        }`}
                      >
                        {g.gap}%
                      </span>
                    </td>
                    <td className="max-w-xs px-5 py-4 text-xs leading-relaxed text-slate-500">
                      {g.whyItMatters}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. Prerequisite / Root-Cause Analysis */}
      <section>
        <SectionHeader
          icon={GitBranch}
          title="Prerequisite / Root-Cause Analysis"
          subtitle="Some gaps are symptoms of weaker prerequisite competencies"
        />
        <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card lg:col-span-2">
            <p className="text-sm leading-relaxed text-slate-600">{prerequisiteChain.description}</p>

            <div className="mt-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-0">
              {prerequisiteChain.steps.map((step, i) => (
                <div key={step.id} className="flex flex-col items-center sm:flex-row">
                  <div
                    className={`relative rounded-xl border px-5 py-3 text-center shadow-sm ${
                      step.isRootCause
                        ? 'border-tutor-300 bg-tutor-50'
                        : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    {step.isRootCause && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-tutor-600 px-2 py-0.5 text-[10px] font-semibold text-white">
                        Root cause
                      </span>
                    )}
                    <p className="text-sm font-bold text-navy-900">{step.label}</p>
                    <p className="mt-0.5 text-[11px] text-slate-500">{step.note}</p>
                  </div>
                  {i < prerequisiteChain.steps.length - 1 && (
                    <div className="my-1 flex rotate-90 items-center sm:mx-2 sm:rotate-0">
                      <ArrowDown className="h-5 w-5 text-slate-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-xl bg-tutor-50 p-4 ring-1 ring-tutor-100">
              <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-tutor-600" />
              <p className="text-sm text-navy-800">
                <span className="font-semibold text-tutor-700">Insight: </span>
                Statistics is flagged as a likely root-cause gap for Model Evaluation.
                Strengthening Statistics first should accelerate progress on both Machine
                Learning and Model Evaluation.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
            <h4 className="text-sm font-bold text-navy-900">Root-Cause Summary</h4>
            <div className="mt-4 space-y-3">
              <RootCauseRow
                label="Root cause"
                value="Statistics (51% vs 75%)"
                color="text-tutor-700"
              />
              <RootCauseRow
                label="Directly affected"
                value="Machine Learning, Model Evaluation"
                color="text-navy-800"
              />
              <RootCauseRow
                label="Recommended fix"
                value="Start with Statistics before ML"
                color="text-success-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Competency Graph + 6. Detail */}
      <section>
        <SectionHeader
          icon={Sparkles}
          title="Competency Graph & Detail"
          subtitle="Explore how competencies relate — select a node to see its details"
        />
        <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <CompetencyGraph selectedId={selectedId} onSelect={setSelectedId} />
          </div>
          <div className="lg:col-span-2">
            <CompetencyDetailPanel detail={selected} />
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: typeof Target;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy-100 text-navy-700">
        <Icon className="h-4.5 w-4.5" />
      </div>
      <div>
        <h3 className="font-display text-lg font-bold text-navy-900">{title}</h3>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}

function SummaryStat({
  label,
  value,
  icon: Icon,
  color,
  ring,
}: {
  label: string;
  value: string;
  icon: typeof TrendingUp;
  color: string;
  ring: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <div className={`absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br ${ring} opacity-10`} />
      <div className="relative flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-white ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500">{label}</p>
          <p className="font-display text-2xl font-extrabold text-navy-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

function RootCauseRow({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
      <span className="text-xs font-medium text-slate-500">{label}</span>
      <span className={`text-right text-sm font-semibold ${color}`}>{value}</span>
    </div>
  );
}

function CompetencyDetailPanel({
  detail,
}: {
  detail: { id: string; name: string; category: string; current: number; target: number; status: CompetencyStatus; importance: string; prerequisites: string[]; recommendedAction: string; whyItMatters: string } | null;
}) {
  if (!detail) {
    return (
      <div className="flex h-full min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-400">
        Select a competency from the graph to view its details.
      </div>
    );
  }

  const cfg = statusConfig[detail.status];
  const gap = detail.target - detail.current;
  const prereqNames = detail.prerequisites
    .map((id) => competencyDetails.find((c) => c.id === id)?.name)
    .filter(Boolean) as string[];

  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs text-slate-400">{detail.category}</p>
          <h4 className="font-display text-lg font-extrabold text-navy-900">{detail.name}</h4>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${cfg.chip}`}>
          {cfg.label}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <DetailStat label="Current" value={`${detail.current}%`} valueClass={cfg.text} />
        <DetailStat label="Target" value={`${detail.target}%`} valueClass="text-navy-800" />
        <DetailStat
          label="Gap"
          value={gap <= 0 ? `+${Math.abs(gap)}%` : `${gap}%`}
          valueClass={gap <= 0 ? 'text-success-600' : gap > 30 ? 'text-assess-600' : 'text-amber-600'}
        />
      </div>

      <div className="mt-5 space-y-4">
        <Field label="Importance to target role">
          <span className="font-semibold text-ocean-700">{detail.importance}</span>
        </Field>
        <Field label="Why it matters">
          <p className="text-sm leading-relaxed text-slate-600">{detail.whyItMatters}</p>
        </Field>
        <Field label="Prerequisites">
          {prereqNames.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {prereqNames.map((name) => (
                <span
                  key={name}
                  className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-navy-700"
                >
                  {name}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-xs text-slate-400">No prerequisites</span>
          )}
        </Field>
        <Field label="Recommended next action">
          <div className="flex items-start gap-2.5 rounded-xl bg-tutor-50 p-3 ring-1 ring-tutor-100">
            <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-tutor-600" />
            <p className="text-sm leading-relaxed text-navy-800">{detail.recommendedAction}</p>
          </div>
        </Field>
      </div>
    </div>
  );
}

function DetailStat({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 py-3">
      <p className="text-[11px] font-medium text-slate-400">{label}</p>
      <p className={`font-display text-lg font-extrabold ${valueClass}`}>{value}</p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </p>
      {children}
    </div>
  );
}
