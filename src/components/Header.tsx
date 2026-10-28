import React from 'react';
import { Sparkles, FileText, BarChart3, HelpCircle, PenLine, BookOpen } from 'lucide-react';

export type ActiveTab = 'dashboard' | 'simulator' | 'generator' | 'practice' | 'guide';

interface HeaderProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenQuickPractice: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenQuickPractice,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={() => onSelectTab('dashboard')}
          className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer text-left"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-900 text-white font-mono text-xs font-semibold">
            EC
          </span>
          <span>Earnings Call Copilot</span>
        </button>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            type="button"
            onClick={() => onSelectTab('dashboard')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'dashboard'
                ? 'text-slate-950 font-semibold border-b-2 border-slate-900'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            <span>Financials</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('simulator')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'simulator'
                ? 'text-slate-950 font-semibold border-b-2 border-slate-900'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="h-4 w-4" />
            <span>Question Simulator</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('generator')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'generator'
                ? 'text-slate-950 font-semibold border-b-2 border-slate-900'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Response Generator</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('practice')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'practice'
                ? 'text-slate-950 font-semibold border-b-2 border-slate-900'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PenLine className="h-4 w-4" />
            <span>Practice Mode</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('guide')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'guide'
                ? 'text-slate-950 font-semibold border-b-2 border-slate-900'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Assignment & Publish</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenQuickPractice}
            className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>Practice Live Q&A</span>
          </button>
        </div>
      </div>

      {/* Mobile nav drawer / scrollable strip */}
      <div className="flex md:hidden overflow-x-auto border-t border-slate-200 px-4 py-2 gap-4 text-xs font-medium text-slate-600 scrollbar-none">
        <button
          type="button"
          onClick={() => onSelectTab('dashboard')}
          className={`whitespace-nowrap shrink-0 py-1 ${activeTab === 'dashboard' ? 'font-bold text-slate-900 border-b border-slate-900' : ''}`}
        >
          Financials
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('simulator')}
          className={`whitespace-nowrap shrink-0 py-1 ${activeTab === 'simulator' ? 'font-bold text-slate-900 border-b border-slate-900' : ''}`}
        >
          Questions
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('generator')}
          className={`whitespace-nowrap shrink-0 py-1 ${activeTab === 'generator' ? 'font-bold text-slate-900 border-b border-slate-900' : ''}`}
        >
          Dossier
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('practice')}
          className={`whitespace-nowrap shrink-0 py-1 ${activeTab === 'practice' ? 'font-bold text-slate-900 border-b border-slate-900' : ''}`}
        >
          Practice Mode
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('guide')}
          className={`whitespace-nowrap shrink-0 py-1 ${activeTab === 'guide' ? 'font-bold text-slate-900 border-b border-slate-900' : ''}`}
        >
          Publish Guide
        </button>
      </div>
    </header>
  );
};
