import React from 'react';
import { Opportunity, BusinessProfile, GrowthExperiment } from '../../types';
import { GrowthBackgroundCanvas } from '../GrowthBackgroundCanvas';
import { 
  Users, 
  UserPlus, 
  ArrowLeftRight, 
  TrendingUp, 
  ArrowUp, 
  Radar, 
  Handshake, 
  Bolt, 
  UserCheck, 
  FlaskConical, 
  MapPin, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface BusinessHomeProps {
  opportunities: Opportunity[];
  onSelectOpportunity: (opp: Opportunity) => void;
  onNavigateToTab: (tab: 'discover' | 'network' | 'experiments' | 'insights') => void;
  onStartExperiment: () => void;
  onConnectPartner: (opp: Opportunity) => void;
}

export const BusinessHome: React.FC<BusinessHomeProps> = ({
  opportunities,
  onSelectOpportunity,
  onNavigateToTab,
  onStartExperiment,
  onConnectPartner
}) => {
  const localLead = opportunities.find(o => o.type === 'local_lead') || opportunities[0];
  const partnershipOpp = opportunities.find(o => o.type === 'partnership') || opportunities[1];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Header with Ambient Background Shader */}
      <section className="relative p-6 sm:p-8 rounded-2xl overflow-hidden border border-[#e3e3de] bg-[#f4f4ef]/80">
        <GrowthBackgroundCanvas opacity={0.35} />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#d7e7d4] text-[#121e13] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#516051]" />
            Overview
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1a1c19] tracking-tight">
            Growth Hub
          </h1>
          <p className="text-sm text-[#434842] mt-1 max-w-xl">
            Live opportunity matching, automated demand detection, and actionable growth steps for your business.
          </p>
        </div>
      </section>

      {/* Bento Grid: 4 Core Performance Metrics */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Customers */}
          <div className="bg-white border border-[#e3e3de] rounded-xl p-5 flex flex-col justify-between shadow-subtle hover:border-[#516051] transition-all h-40">
            <div className="flex justify-between items-start">
              <div className="w-8 h-8 rounded-lg bg-[#d7e7d4] flex items-center justify-center text-[#516051]">
                <Users className="w-4 h-4" />
              </div>
              <svg className="overflow-visible" height="20" viewBox="0 0 40 20" width="40">
                <path
                  className="sparkline"
                  d="M0 20 Q10 15 20 10 T40 4"
                  fill="none"
                  stroke="#d97706"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs text-[#5f5e5e] font-medium">Customers</p>
              <p className="text-2xl font-bold text-[#1a1c19] tracking-tight mt-0.5">1,248</p>
              <p className="text-xs text-[#516051] font-semibold mt-1 flex items-center gap-0.5">
                <ArrowUp className="w-3 h-3" /> +12%
              </p>
            </div>
          </div>

          {/* Leads */}
          <div className="bg-white border border-[#e3e3de] rounded-xl p-5 flex flex-col justify-between shadow-subtle hover:border-[#516051] transition-all h-40">
            <div className="flex justify-between items-start">
              <div className="w-8 h-8 rounded-lg bg-[#eeeee9] flex items-center justify-center text-[#516051]">
                <UserPlus className="w-4 h-4" />
              </div>
              <svg className="overflow-visible" height="20" viewBox="0 0 40 20" width="40">
                <path
                  className="sparkline"
                  d="M0 20 L10 12 L20 16 L30 8 L40 4"
                  fill="none"
                  stroke="#7d8c7c"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs text-[#5f5e5e] font-medium">Leads</p>
              <p className="text-2xl font-bold text-[#1a1c19] tracking-tight mt-0.5">342</p>
              <p className="text-xs text-[#516051] font-semibold mt-1 flex items-center gap-0.5">
                <ArrowUp className="w-3 h-3" /> +5%
              </p>
            </div>
          </div>

          {/* Conversions */}
          <div className="bg-white border border-[#e3e3de] rounded-xl p-5 flex flex-col justify-between shadow-subtle hover:border-[#516051] transition-all h-40">
            <div className="flex justify-between items-start">
              <div className="w-8 h-8 rounded-lg bg-[#eeeee9] flex items-center justify-center text-[#516051]">
                <ArrowLeftRight className="w-4 h-4" />
              </div>
              <svg className="overflow-visible" height="20" viewBox="0 0 40 20" width="40">
                <path
                  className="sparkline"
                  d="M0 18 C10 18 15 6 25 10 S35 2 40 2"
                  fill="none"
                  stroke="#d97706"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs text-[#5f5e5e] font-medium">Conversions</p>
              <p className="text-2xl font-bold text-[#1a1c19] tracking-tight mt-0.5">89</p>
              <p className="text-xs text-[#516051] font-semibold mt-1 flex items-center gap-0.5">
                <ArrowUp className="w-3 h-3" /> +18%
              </p>
            </div>
          </div>

          {/* Overall Growth */}
          <div className="bg-white border border-[#e3e3de] rounded-xl p-5 flex flex-col justify-between shadow-subtle hover:border-[#516051] transition-all relative overflow-hidden group h-40">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#d7e7d4] rounded-full opacity-60 group-hover:scale-125 transition-transform duration-500 blur-xl pointer-events-none" />
            <div className="flex justify-between items-start relative z-10">
              <div className="w-8 h-8 rounded-lg bg-[#d7e7d4] flex items-center justify-center text-[#516051]">
                <TrendingUp className="w-4 h-4" />
              </div>
              <svg className="overflow-visible" height="20" viewBox="0 0 40 20" width="40">
                <path
                  className="sparkline"
                  d="M0 20 L10 15 L20 18 L30 5 L40 0"
                  fill="none"
                  stroke="#516051"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                />
              </svg>
            </div>
            <div className="relative z-10">
              <p className="text-xs text-[#5f5e5e] font-medium">Overall Growth</p>
              <p className="text-2xl font-bold text-[#1a1c19] tracking-tight mt-0.5">24%</p>
              <p className="text-xs text-[#516051] font-semibold mt-1 flex items-center gap-0.5">
                <ArrowUp className="w-3 h-3" /> This Month
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Active Opportunities Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#1a1c19]">Active Opportunities</h2>
          <button
            onClick={() => onNavigateToTab('discover')}
            className="text-xs font-semibold text-[#516051] hover:underline flex items-center gap-1"
          >
            View All Opportunities <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Opportunity Card 1: Local Lead */}
          {localLead && (
            <div 
              onClick={() => onSelectOpportunity(localLead)}
              className="bg-white border border-[#e3e3de] rounded-xl p-5 shadow-subtle relative overflow-hidden flex flex-col justify-between hover:border-[#516051] transition-all cursor-pointer group"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#516051]" />
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-[#d7e7d4] text-[#121e13] px-2.5 py-0.5 rounded text-[11px] font-bold inline-flex items-center gap-1">
                    <Radar className="w-3.5 h-3.5 text-[#516051]" />
                    Local Lead
                  </span>
                  <span className="text-xs text-[#747872]">{localLead.createdAt}</span>
                </div>
                <h3 className="text-base font-bold text-[#1a1c19] group-hover:text-[#516051] transition-colors line-clamp-2">
                  {localLead.title}
                </h3>
                <p className="text-xs text-[#5f5e5e] mt-1.5 line-clamp-2">
                  {localLead.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#eeeee9] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#f4f4ef] border border-[#e3e3de] flex items-center justify-center text-[#516051] overflow-hidden">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-[#1a1c19]">{localLead.location}</span>
                </div>
                <span className="text-xs font-bold text-[#516051] bg-[#d7e7d4]/60 px-2.5 py-1 rounded">
                  {localLead.matchStrength || 'Strong match'}
                </span>
              </div>
            </div>
          )}

          {/* Opportunity Card 2: Partnership */}
          {partnershipOpp && (
            <div 
              onClick={() => onSelectOpportunity(partnershipOpp)}
              className="bg-white border border-[#e3e3de] rounded-xl p-5 shadow-subtle relative overflow-hidden flex flex-col justify-between hover:border-[#516051] transition-all cursor-pointer group"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#75756c]" />
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-[#e3e3de] text-[#1a1c19] px-2.5 py-0.5 rounded text-[11px] font-bold inline-flex items-center gap-1">
                    <Handshake className="w-3.5 h-3.5 text-[#5c5d54]" />
                    Partnership
                  </span>
                  <span className="text-xs text-[#747872]">{partnershipOpp.createdAt}</span>
                </div>
                <h3 className="text-base font-bold text-[#1a1c19] group-hover:text-[#516051] transition-colors line-clamp-2">
                  {partnershipOpp.title}
                </h3>
                <p className="text-xs text-[#5f5e5e] mt-1.5 line-clamp-2">
                  {partnershipOpp.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#eeeee9] flex items-center justify-between">
                <div className="flex -space-x-2 items-center">
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-[#d7e7d4] flex items-center justify-center text-[10px] font-bold text-[#121e13]">
                    AR
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-[#e5e2e1] flex items-center justify-center text-[10px] font-bold text-[#1a1c19]">
                    ZS
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-[#f4f4ef] flex items-center justify-center text-[10px] font-bold text-[#747872]">
                    +1
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#1a1c19] flex items-center gap-1">
                  Co-Marketing Fit <ArrowRight className="w-3 h-3 text-[#516051]" />
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Recommended Actions: "What should I do next?" */}
      <section className="bg-[#f4f4ef] border border-[#e3e3de] rounded-2xl p-6 shadow-subtle">
        <div className="mb-4">
          <h3 className="text-base font-bold text-[#1a1c19]">Recommended Next Actions</h3>
          <p className="text-xs text-[#5f5e5e]">Take action on high-yield opportunities curated for your growth stage.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => {
              if (localLead) onSelectOpportunity(localLead);
              else onNavigateToTab('discover');
            }}
            className="w-full bg-[#1a1c19] text-white hover:bg-[#2f312e] transition-all py-3.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm active:scale-[0.99]"
          >
            <Bolt className="w-4 h-4 text-[#d7e7d4]" />
            Respond to Opportunity
          </button>

          <button
            onClick={() => onNavigateToTab('network')}
            className="w-full bg-[#516051] text-white hover:bg-[#3c4a3d] transition-all py-3.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm active:scale-[0.99]"
          >
            <UserCheck className="w-4 h-4 text-[#d7e7d4]" />
            Connect with Partner
          </button>

          <button
            onClick={onStartExperiment}
            className="w-full bg-white border border-[#c4c8c0] text-[#1a1c19] hover:bg-[#eeeee9] transition-all py-3.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm active:scale-[0.99]"
          >
            <FlaskConical className="w-4 h-4 text-[#516051]" />
            Start Experiment
          </button>
        </div>
      </section>
    </div>
  );
};
