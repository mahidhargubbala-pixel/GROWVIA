import React, { useState } from 'react';
import { Filter, ArrowDown, Sparkles, CheckCircle2, AlertCircle, ChevronRight } from 'lucide-react';

interface FunnelStage {
  id: string;
  name: string;
  count: number;
  formattedCount: string;
  conversionFromPrev: number; // percentage
  dropOffRate: number; // percentage
  estimatedValue: string;
  leakageCost?: string;
  bottleneckReason?: string;
  recommendedAction?: string;
  color: string;
  darkColor: string;
}

const FUNNEL_STAGES: FunnelStage[] = [
  {
    id: 'impressions',
    name: '1. Local Discovery & Views',
    count: 4820,
    formattedCount: '4,820',
    conversionFromPrev: 100,
    dropOffRate: 0,
    estimatedValue: 'Market reach pool',
    color: '#516051',
    darkColor: '#364036'
  },
  {
    id: 'inquiries',
    name: '2. Profile & Catalog Clicks',
    count: 1240,
    formattedCount: '1,240',
    conversionFromPrev: 25.7,
    dropOffRate: 74.3,
    estimatedValue: '$38,400 potential',
    leakageCost: '$12,000 lost at discovery',
    bottleneckReason: 'High bounce on unverified profile visitors',
    recommendedAction: 'Add 2 more verified photo badges and video clips',
    color: '#657764',
    darkColor: '#455144'
  },
  {
    id: 'needs_matched',
    name: '3. Quote Requests & RFQs',
    count: 428,
    formattedCount: '428',
    conversionFromPrev: 34.5,
    dropOffRate: 65.5,
    estimatedValue: '$24,800 active',
    leakageCost: '$4,200 lost to >4h response delays',
    bottleneckReason: 'Response lag exceeds 2 hours during peak weekend rushes',
    recommendedAction: 'Activate 1-Click Instant Quote auto-responder',
    color: '#7a8e79',
    darkColor: '#536152'
  },
  {
    id: 'converted',
    name: '4. Closed Contracts & Sales',
    count: 148,
    formattedCount: '148 Deals',
    conversionFromPrev: 34.6,
    dropOffRate: 65.4,
    estimatedValue: '$18,920 realized',
    recommendedAction: 'Invite closed clients into VIP Referral Loop',
    color: '#90a68f',
    darkColor: '#637362'
  }
];

interface ConversionFunnel3DProps {
  onTakeAction: (actionType: string) => void;
}

export const ConversionFunnel3D: React.FC<ConversionFunnel3DProps> = ({ onTakeAction }) => {
  const [activeStageId, setActiveStageId] = useState<string>('needs_matched');
  const [is3DMode, setIs3DMode] = useState<boolean>(true);

  const activeStage = FUNNEL_STAGES.find((s) => s.id === activeStageId) || FUNNEL_STAGES[2];

  return (
    <div className="bg-white border border-[#e3e3de] rounded-2xl p-6 shadow-subtle flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#eeeee9]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#d7e7d4] flex items-center justify-center text-[#516051]">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#1a1c19]">3D Conversion Funnel & Leakage Map</h2>
            <p className="text-xs text-[#747872]">Real user conversion rates from initial view to paid checkout</p>
          </div>
        </div>

        <button
          onClick={() => setIs3DMode(!is3DMode)}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#f4f4ef] hover:bg-[#e8e8e3] text-[#1a1c19] transition-all self-start sm:self-auto"
        >
          {is3DMode ? '3D Isometric View: ON' : 'Flat Layout'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-4">
        {/* Left: 3D Funnel Visualization */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center py-2" style={{ perspective: '800px' }}>
          <div 
            className="w-full max-w-sm space-y-2.5 transition-transform duration-500"
            style={{
              transform: is3DMode ? 'rotateX(20deg) rotateY(-4deg)' : 'none',
              transformStyle: 'preserve-3d'
            }}
          >
            {FUNNEL_STAGES.map((stage, idx) => {
              const isSelected = activeStageId === stage.id;
              const widthPercents = [100, 78, 58, 42];
              const currentWidth = widthPercents[idx];

              return (
                <div
                  key={stage.id}
                  onClick={() => setActiveStageId(stage.id)}
                  className={`relative mx-auto rounded-xl p-3 cursor-pointer transition-all duration-300 group ${
                    isSelected ? 'ring-2 ring-[#516051] ring-offset-2' : ''
                  }`}
                  style={{
                    width: `${currentWidth}%`,
                    backgroundColor: stage.color,
                    color: '#ffffff',
                    transform: isSelected ? 'translateZ(18px) scale(1.03)' : 'translateZ(0px)',
                    boxShadow: is3DMode 
                      ? `0 10px 15px -3px ${stage.darkColor}80, 0 4px 6px -4px ${stage.darkColor}60`
                      : '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  {/* Top Rim 3D Layer */}
                  {is3DMode && (
                    <div 
                      className="absolute inset-x-0 -top-1 h-2 rounded-t-xl bg-white/20 pointer-events-none"
                    />
                  )}

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-bold tracking-tight opacity-90 truncate max-w-[140px] sm:max-w-[180px]">
                        {stage.name}
                      </div>
                      <div className="text-sm font-extrabold tracking-tight mt-0.5">
                        {stage.formattedCount}
                      </div>
                    </div>

                    {idx > 0 && (
                      <div className="text-right">
                        <span className="text-[10px] font-bold bg-black/25 px-2 py-0.5 rounded-md">
                          {stage.conversionFromPrev}%
                        </span>
                        <div className="text-[9px] opacity-75 mt-0.5">step rate</div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 text-center">
            <span className="text-[11px] text-[#747872] italic">
              Click any tier to inspect bottlenecks and execute high-yield fixes
            </span>
          </div>
        </div>

        {/* Right: Stage Inspector & Recovery Action */}
        <div className="lg:col-span-6 bg-[#fafaf4] border border-[#eeeee9] rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#eeeee9]">
            <div>
              <span className="text-[10px] font-bold text-[#516051] uppercase">Selected Stage</span>
              <h3 className="text-sm font-extrabold text-[#1a1c19]">{activeStage.name}</h3>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-[#747872] uppercase">Yield Metric</span>
              <div className="text-sm font-extrabold text-[#516051]">{activeStage.estimatedValue}</div>
            </div>
          </div>

          {activeStage.bottleneckReason ? (
            <div className="p-3 bg-[#fdf2f2] border border-[#f5c6cb] rounded-lg space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#ba1a1a]">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Identified Bottleneck:</span>
              </div>
              <p className="text-xs text-[#721c24]">{activeStage.bottleneckReason}</p>
              {activeStage.leakageCost && (
                <div className="text-[11px] font-bold text-[#ba1a1a] pt-1">
                  Estimated Leakage: {activeStage.leakageCost}
                </div>
              )}
            </div>
          ) : (
            <div className="p-3 bg-[#e8f3e6] border border-[#c3e6cb] rounded-lg">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#245924]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Optimal Throughput Stage</span>
              </div>
              <p className="text-xs text-[#155724] mt-0.5">
                Top of funnel discovery is healthy with over 4,800 active monthly impressions.
              </p>
            </div>
          )}

          {activeStage.recommendedAction && (
            <div className="pt-2">
              <span className="text-[10px] font-bold text-[#747872] uppercase">Recommended Action</span>
              <div className="mt-1 flex items-center justify-between p-2.5 bg-white border border-[#e3e3de] rounded-lg">
                <span className="text-xs font-semibold text-[#1a1c19] max-w-[240px]">
                  {activeStage.recommendedAction}
                </span>
                <button
                  onClick={() => onTakeAction('funnel_optimize')}
                  className="bg-[#516051] hover:bg-[#3d493d] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 shrink-0"
                >
                  <span>Fix Now</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
