import { Bell, Menu, Search } from 'lucide-react';

type TopBarProps = {
  onMenuClick: () => void;
  title: string;
  subtitle?: string;
};

export default function TopBar({ onMenuClick, title, subtitle }: TopBarProps) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-slate-200 bg-white/80 px-4 py-3.5 backdrop-blur-md sm:px-6 lg:px-8">
      <button
        onClick={onMenuClick}
        className="rounded-lg p-2 text-navy-700 hover:bg-slate-100 lg:hidden"
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="min-w-0 flex-1">
        <h2 className="font-display text-lg font-bold text-navy-900 sm:text-xl">{title}</h2>
        {subtitle && (
          <p className="hidden text-xs text-slate-500 sm:block">{subtitle}</p>
        )}
      </div>

      <div className="hidden items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 md:flex">
        <Search className="h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search skills, courses…"
          className="ml-2 w-44 bg-transparent text-sm text-navy-800 placeholder:text-slate-400 focus:outline-none lg:w-56"
        />
      </div>

      <button
        className="relative rounded-xl p-2.5 text-navy-700 transition-colors hover:bg-slate-100"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        <span className="absolute right-2 top-2 flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-assess-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-assess-500" />
        </span>
      </button>

      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white py-1.5 pl-1.5 pr-3 shadow-card sm:pr-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-ocean-500 to-navy-700 text-sm font-bold text-white">
          MA
        </div>
        <div className="hidden sm:block">
          <p className="text-sm font-semibold leading-tight text-navy-900">Maya Arora</p>
          <p className="text-xs leading-tight text-slate-500">Learner · Pro</p>
        </div>
      </div>
    </header>
  );
}
