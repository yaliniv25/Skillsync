import { graphNodes, graphEdges, type GraphNode } from '@/data/competencyData';

const statusColors: Record<GraphNode['status'], { fill: string; stroke: string; text: string }> = {
  strong: { fill: '#ecfdf5', stroke: '#10b981', text: '#047857' },
  gap: { fill: '#fffbeb', stroke: '#f59e0b', text: '#b45309' },
  critical: { fill: '#fff7ed', stroke: '#f97316', text: '#c2410c' },
};

type CompetencyGraphProps = {
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export default function CompetencyGraph({ selectedId, onSelect }: CompetencyGraphProps) {
  const nodeMap = new Map(graphNodes.map((n) => [n.id, n]));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-base font-bold text-navy-900">Competency Graph</h3>
          <p className="text-xs text-slate-500">
            Prerequisite relationships between competencies — tap a node to inspect it.
          </p>
        </div>
        <div className="hidden items-center gap-4 sm:flex">
          <Legend color="#10b981" label="Strong" />
          <Legend color="#f59e0b" label="Gap" />
          <Legend color="#f97316" label="Critical" />
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <svg viewBox="0 0 100 100" className="h-[360px] w-full min-w-[480px]">
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
            </marker>
            <marker
              id="arrow-selected"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#3385fc" />
            </marker>
          </defs>

          {graphEdges.map((edge, i) => {
            const from = nodeMap.get(edge.from);
            const to = nodeMap.get(edge.to);
            if (!from || !to) return null;
            const involvesSelected =
              selectedId && (edge.from === selectedId || edge.to === selectedId);
            const isPrereq = edge.kind === 'prerequisite';
            return (
              <line
                key={i}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={involvesSelected ? '#3385fc' : '#cbd5e1'}
                strokeWidth={involvesSelected ? 1.1 : 0.6}
                strokeDasharray={isPrereq ? '0' : '2 1.5'}
                markerEnd={involvesSelected ? 'url(#arrow-selected)' : 'url(#arrow)'}
                opacity={selectedId && !involvesSelected ? 0.4 : 1}
              />
            );
          })}

          {graphNodes.map((node) => {
            const colors = statusColors[node.status];
            const isSelected = selectedId === node.id;
            return (
              <g
                key={node.id}
                onClick={() => onSelect(node.id)}
                className="cursor-pointer"
              >
                {isSelected && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={11}
                    fill="none"
                    stroke="#3385fc"
                    strokeWidth={0.8}
                    opacity={0.5}
                  />
                )}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={8.5}
                  fill={colors.fill}
                  stroke={colors.stroke}
                  strokeWidth={isSelected ? 1.4 : 0.9}
                />
                <text
                  x={node.x}
                  y={node.y + 0.5}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-display"
                  fontSize="2.6"
                  fontWeight="700"
                  fill={colors.text}
                >
                  {node.label.split(' ').map((w) => w[0]).join('')}
                </text>
                <text
                  x={node.x}
                  y={node.y + 13}
                  textAnchor="middle"
                  fontSize="3"
                  fontWeight="600"
                  fill="#1e3866"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-2 flex items-center justify-center gap-4 sm:hidden">
        <Legend color="#10b981" label="Strong" />
        <Legend color="#f59e0b" label="Gap" />
        <Legend color="#f97316" label="Critical" />
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}
