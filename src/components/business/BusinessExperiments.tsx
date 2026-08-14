import React from 'react';
import { GrowthExperiment } from '../../types';
import { 
  FlaskConical, 
  Plus, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Target, 
  DollarSign, 
  Clock, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BusinessExperimentsProps {
  experiments: GrowthExperiment[];
  onStartNewExperiment: () => void;
  onSelectActionType: (actionType: string) => void;
}

export const BusinessExperiments: React.FC<BusinessExperimentsProps> = ({
  experiments,
  onStartNewExperiment,
  onSelectActionType
}) => {
  const activeExperiments = experiments.filter(e => e.status === 'running');
  const completedExperiments = experiments.filter(e => e.status === 'completed');

  const triggerCelebration = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1c19] tracking-tight">Growth Experiments</h1>
          <p className="text-xs text-[#5f5e5e] mt-0.5">
            Turn networking connections into measurable, structured growth loops.
          </p>
        </div>

        <button
          onClick={onStartNewExperiment}
          className="bg-[#1a1c19] hover:bg-[#2f312e] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
        >
          <Plus className="w-4 h-4 text-[#d7e7d4]" />
          Start New Experiment
        </button>
      </div>

      {/* Active Experiments Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#516051] animate-pulse" />
          <h2 className="text-base font-bold text-[#1a1c19]">Active Experiments</h2>
        </div>

        <div className="space-y-4">
          {activeExperiments.map((exp) => (
            <div
              key={exp.id}
              className="bg-white border border-[#e3e3de] rounded-2xl p-6 shadow-subtle hover:border-[#516051] transition-all space-y-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-[#eeeee9]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold text-[#516051] bg-[#d7e7d4] px-2.5 py-0.5 rounded-full">
                      Running
                    </span>
                    <span className="text-xs text-[#747872] flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {exp.duration}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#1a1c19]">{exp.title}</h3>
                  <p className="text-xs text-[#5f5e5e] mt-0.5">{exp.goal}</p>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <div className="bg-[#f4f4ef] px-3 py-1.5 rounded-lg border border-[#e3e3de]">
                    <span className="text-[#747872]">Target Audience: </span>
                    <span className="font-semibold text-[#1a1c19]">{exp.audience}</span>
                  </div>
                  <div className="bg-[#f4f4ef] px-3 py-1.5 rounded-lg border border-[#e3e3de]">
                    <span className="text-[#747872]">Budget: </span>
                    <span className="font-semibold text-[#1a1c19]">{exp.budget}</span>
                  </div>
                </div>
              </div>

              {/* Funnel Progress Tracker: Reach -> Engagement -> Leads -> Conversions */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-[#747872] mb-2">
                  <span>Experiment Funnel Progression</span>
                  <span className="text-[#516051] font-bold">45 Qualified Leads Logged</span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {/* Step 1: Reach */}
                  <div className="bg-[#fafaf4] border border-[#d7e7d4] rounded-xl p-3 text-center">
                    <div className="text-[11px] font-bold text-[#747872] uppercase">1. Reach</div>
                    <div className="text-base font-extrabold text-[#1a1c19] mt-1">
                      {exp.funnel.reach.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-[#516051] font-semibold mt-0.5">Target reached</div>
                  </div>

                  {/* Step 2: Engagement */}
                  <div className="bg-[#fafaf4] border border-[#d7e7d4] rounded-xl p-3 text-center">
                    <div className="text-[11px] font-bold text-[#747872] uppercase">2. Engagement</div>
                    <div className="text-base font-extrabold text-[#1a1c19] mt-1">
                      {exp.funnel.engagement.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-[#516051] font-semibold mt-0.5">Clicks & Views</div>
                  </div>

                  {/* Step 3: Leads */}
                  <div className="bg-[#fafaf4] border border-[#d7e7d4] rounded-xl p-3 text-center">
                    <div className="text-[11px] font-bold text-[#747872] uppercase">3. Leads</div>
                    <div className="text-base font-extrabold text-[#516051] mt-1">
                      {exp.funnel.leads}
                    </div>
                    <div className="text-[10px] text-[#516051] font-semibold mt-0.5">In discussions</div>
                  </div>

                  {/* Step 4: Conversions */}
                  <div className="bg-[#f4f4ef] border border-dashed border-[#c4c8c0] rounded-xl p-3 text-center">
                    <div className="text-[11px] font-bold text-[#747872] uppercase">4. Conversions</div>
                    <div className="text-sm font-semibold text-[#747872] mt-1">
                      Calculating...
                    </div>
                    <div className="text-[10px] text-[#747872] mt-0.5">Tracking sales</div>
                  </div>
                </div>
              </div>

              {/* Recommended Next Step Callout */}
              {exp.recommendedNextStep && (
                <div className="bg-[#eeeee9] border border-[#d7e7d4] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#516051] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-[#1a1c19]">AI Recommended Growth Action</p>
                      <p className="text-xs text-[#5f5e5e]">{exp.recommendedNextStep.text}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      triggerCelebration();
                      onSelectActionType(exp.recommendedNextStep!.actionType);
                    }}
                    className="bg-[#516051] text-white hover:bg-[#3c4a3d] text-xs font-bold px-4 py-2 rounded-lg shrink-0 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>{exp.recommendedNextStep.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Completed Experiments Section */}
      <section className="space-y-4">
        <h2 className="text-base font-bold text-[#1a1c19]">Completed Results & Historical Impact</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {completedExperiments.map((exp) => (
            <div
              key={exp.id}
              className="bg-white border border-[#e3e3de] rounded-xl p-5 shadow-subtle flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[11px] font-bold text-[#5c5d54] bg-[#eeeee9] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#516051]" />
                    Completed
                  </span>
                  <span className="text-xs text-[#747872]">{exp.duration}</span>
                </div>

                <h3 className="text-base font-bold text-[#1a1c19]">{exp.title}</h3>
                <p className="text-xs text-[#5f5e5e] mt-1">{exp.goal}</p>

                {/* Measurable Results Block */}
                {exp.completedResult && (
                  <div className="bg-[#fafaf4] rounded-lg p-3.5 my-3 border border-[#eeeee9] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#5f5e5e]">Conversion Boost</span>
                      <span className="text-xs font-bold text-[#516051] bg-[#d7e7d4] px-2 py-0.5 rounded">
                        {exp.completedResult.conversionRate}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#5f5e5e]">Acquired Leads</span>
                      <span className="text-xs font-bold text-[#1a1c19]">
                        +{exp.completedResult.newLeads} Qualified
                      </span>
                    </div>
                    <p className="text-xs text-[#434842] pt-2 border-t border-[#eeeee9]">
                      {exp.completedResult.summary}
                    </p>
                  </div>
                )}
              </div>

              {exp.recommendedNextStep && (
                <button
                  onClick={() => onSelectActionType(exp.recommendedNextStep!.actionType)}
                  className="w-full bg-[#1a1c19] text-white hover:bg-[#2f312e] text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>{exp.recommendedNextStep.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
