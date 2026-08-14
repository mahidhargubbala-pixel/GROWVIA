import React, { useState } from 'react';
import { DemandGap } from '../../types';
import { Radar, ArrowUpRight, Plus, Sparkles, MapPin, Zap } from 'lucide-react';

interface DemandGapMatrixProps {
  demandGaps: DemandGap[];
  onExploreDemandGap: (gap: DemandGap) => void;
}

export const DemandGapMatrix: React.FC<DemandGapMatrixProps> = ({
  demandGaps,
  onExploreDemandGap
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredGaps = selectedCategory === 'all' 
    ? demandGaps 
    : demandGaps.filter((g) => g.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <div className="bg-white border border-[#e3e3de] rounded-2xl p-6 shadow-subtle flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#eeeee9]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#d7e7d4] flex items-center justify-center text-[#516051]">
            <Radar className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#1a1c19]">Unfulfilled Local Demand Statistics</h2>
            <p className="text-xs text-[#747872]">Quantified supply deficit and immediate revenue opportunities</p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-1">
          {['all', 'catering', 'staging', 'wellness', 'tech'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-all capitalize whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#1a1c19] text-white'
                  : 'bg-[#f4f4ef] text-[#5f5e5e] hover:bg-[#e8e8e3] hover:text-[#1a1c19]'
              }`}
            >
              {cat === 'all' ? 'All Gaps' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
        {filteredGaps.map((gap) => {
          const ratio = (gap.activeRequestsCount / Math.max(1, gap.availableProvidersCount)).toFixed(1);
          const isHighDeficit = gap.activeRequestsCount / Math.max(1, gap.availableProvidersCount) >= 4;

          return (
            <div
              key={gap.id}
              className="bg-[#fafaf4] hover:bg-white border border-[#e3e3de] hover:border-[#b8ccb6] rounded-xl p-4 transition-all duration-300 flex flex-col justify-between group shadow-2xs hover:shadow-subtle"
            >
              <div>
                <div className="flex items-start justify-between">
                  <span className="text-[11px] font-bold text-[#516051] bg-[#d7e7d4] px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {gap.growthRate} Demand
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-[#747872]">
                    <MapPin className="w-3 h-3" />
                    <span>{gap.location}</span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-[#1a1c19] mt-2 group-hover:text-[#516051] transition-colors">
                  {gap.category}
                </h3>

                {/* Supply vs Demand Comparison Meter */}
                <div className="my-3 p-3 bg-white border border-[#eeeee9] rounded-lg space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#747872] text-[11px]">Demand / Supply Ratio:</span>
                    <span className="font-extrabold text-[#ba1a1a] bg-[#fbe8e8] px-2 py-0.5 rounded">
                      {ratio}x Gap
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center pt-1 border-t border-[#f4f4ef]">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-[#747872]">Active Requests</div>
                      <div className="text-sm font-extrabold text-[#1a1c19]">{gap.activeRequestsCount}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-[#747872]">Providers</div>
                      <div className="text-sm font-extrabold text-[#ba1a1a]">{gap.availableProvidersCount}</div>
                    </div>
                  </div>

                  {/* Dual comparative bar */}
                  <div className="space-y-1 pt-1">
                    <div className="flex items-center justify-between text-[10px] text-[#747872]">
                      <span>Requests (Demand)</span>
                      <span>{gap.activeRequestsCount}</span>
                    </div>
                    <div className="w-full bg-[#e8e8e3] h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#516051] h-full rounded-full" 
                        style={{ width: `${Math.min(100, gap.activeRequestsCount * 5)}%` }} 
                      />
                    </div>
                  </div>
                </div>

                <div className="text-xs text-[#5f5e5e] line-clamp-2">
                  {gap.suggestedAction}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#eeeee9] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#747872] block">Avg. Budget</span>
                  <span className="text-xs font-bold text-[#1a1c19]">{gap.averageBudget}</span>
                </div>

                <button
                  onClick={() => onExploreDemandGap(gap)}
                  className="bg-[#1a1c19] hover:bg-[#333530] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Fill Gap</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
