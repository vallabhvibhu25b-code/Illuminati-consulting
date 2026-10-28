import React, { useState } from 'react';
import { SyntheticBanner } from './components/SyntheticBanner';
import { Header, ActiveTab } from './components/Header';
import { FinancialDashboard } from './components/FinancialDashboard';
import { QuestionSimulator } from './components/QuestionSimulator';
import { ResponseGenerator } from './components/ResponseGenerator';
import { LeadershipPracticeMode } from './components/LeadershipPracticeMode';
import { AssignmentPublishGuide } from './components/AssignmentPublishGuide';
import { INVESTOR_QUESTIONS } from './data/simulatorQuestions';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>('q1-margins');

  const handleSelectQuestion = (questionId: string) => {
    setSelectedQuestionId(questionId);
  };

  const handleOpenQuickPractice = () => {
    setActiveTab('practice');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-slate-900 selection:text-white">
      {/* 1. Mandatory Synthetic Data Banner */}
      <SyntheticBanner />

      {/* 2. Top Bar Contract: Brand, Nav links, Primary Action */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenQuickPractice={handleOpenQuickPractice}
      />

      {/* 3. Main Workspace Canvas */}
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {activeTab === 'dashboard' && (
          <FinancialDashboard
            onNavigateTab={setActiveTab}
            onSelectQuestion={handleSelectQuestion}
          />
        )}

        {activeTab === 'simulator' && (
          <QuestionSimulator
            selectedQuestionId={selectedQuestionId}
            onSelectQuestion={handleSelectQuestion}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'generator' && (
          <ResponseGenerator
            selectedQuestionId={selectedQuestionId}
            onSelectQuestion={handleSelectQuestion}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'practice' && (
          <LeadershipPracticeMode
            selectedQuestionId={selectedQuestionId}
            onSelectQuestion={handleSelectQuestion}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'guide' && <AssignmentPublishGuide />}
      </main>

      {/* 4. Executive Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">Earnings Call Copilot</span>
            <span>·</span>
            <span>AI Consulting Business Analyst Assignment</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span>Synthetic Demonstration Data</span>
            <span>·</span>
            <span>Deterministic Zero-Cost Logic</span>
            <span>·</span>
            <button
              type="button"
              onClick={() => setActiveTab('guide')}
              className="text-slate-800 font-medium hover:underline cursor-pointer"
            >
              Public URL & Submission
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
