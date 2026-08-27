import {
  LayoutDashboard,
  Target,
  Route,
  ClipboardCheck,
  Sparkles,
  BookOpen,
  History,
  X,
} from 'lucide-react';

type NavItem = {
  id: string;
  label: string;
  icon: typeof LayoutDashboard;
};

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'competency', label: 'Competency', icon: Target },
  { id: 'learning-path', label: 'Learning Path', icon: Route },
  { id: 'assessments', label: 'Assessments', icon: ClipboardCheck },
  { id: 'ai-tutor', label: 'AI Tutor', icon: Sparkles },
  { id: 'materials', label: 'Materials', icon: BookOpen },
  { id: 'history', label: 'History', icon: History },
];

type SidebarProps = {
  open: boolean;
  onClose: () => void;
  active: string;
  onNavigate: (id: string) => void;
};

export default function Sidebar({ open, onClose, active, onNavigate }: SidebarProps) {

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-navy-950/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed z-40 flex h-full w-72 flex-col bg-navy-900 text-navy-100 transition-transform duration-300 lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-ocean-400 to-ocean-600 shadow-lg shadow-ocean-900/30">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-display text-lg font-extrabold tracking-tight text-white">
                Skill-Sync
              </h1>
              <p className="text-[11px] font-medium uppercase tracking-wider text-navy-300">
                AI Learning Platform
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-navy-200 hover:bg-navy-800 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-2">
          <p className="px-3 pb-2 pt-3 text-[10px] font-semibold uppercase tracking-wider text-navy-400">
            Menu
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-ocean-600 text-white shadow-md shadow-ocean-900/30'
                    : 'text-navy-200 hover:bg-navy-800 hover:text-white'
                }`}
              >
                <Icon
                  className={`h-5 w-5 shrink-0 transition-colors ${
                    isActive ? 'text-white' : 'text-navy-300 group-hover:text-white'
                  }`}
                />
                {item.label}
                {item.id === 'ai-tutor' && (
                  <span className="ml-auto rounded-full bg-tutor-500/20 px-2 py-0.5 text-[10px] font-semibold text-tutor-200">
                    AI
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="m-4 rounded-2xl bg-gradient-to-br from-navy-800 to-navy-950 p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-tutor-500/20">
              <Sparkles className="h-4 w-4 text-tutor-300" />
            </div>
            <p className="text-sm font-semibold text-white">Weekly Goal</p>
          </div>
          <p className="mt-2 text-xs text-navy-300">
            4 of 6 learning hours completed this week.
          </p>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-navy-700">
            <div className="h-full rounded-full bg-gradient-to-r from-success-400 to-success-500" style={{ width: '67%' }} />
          </div>
        </div>
      </aside>
    </>
  );
}
