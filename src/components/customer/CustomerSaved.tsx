import React from 'react';
import { BusinessProfile, Opportunity } from '../../types';
import { Bookmark, Star, MapPin, Trash2, ArrowRight } from 'lucide-react';

interface CustomerSavedProps {
  savedBusinesses: BusinessProfile[];
  savedOpportunities: Opportunity[];
  onSelectBusiness: (biz: BusinessProfile) => void;
  onSelectOpportunity: (opp: Opportunity) => void;
  onRemoveSavedBusiness: (id: string) => void;
  onRemoveSavedOpportunity: (id: string) => void;
  onExplore: () => void;
}

export const CustomerSaved: React.FC<CustomerSavedProps> = ({
  savedBusinesses,
  savedOpportunities,
  onSelectBusiness,
  onSelectOpportunity,
  onRemoveSavedBusiness,
  onRemoveSavedOpportunity,
  onExplore
}) => {
  const hasSavedItems = savedBusinesses.length > 0 || savedOpportunities.length > 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-[#1a1c19] tracking-tight">Saved Items</h1>
        <p className="text-xs text-[#5f5e5e] mt-0.5">
          Bookmark businesses, offers, and growth opportunities to review or contact later.
        </p>
      </div>

      {!hasSavedItems ? (
        <div className="bg-white border border-[#e3e3de] rounded-2xl p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#eeeee9] text-[#747872] flex items-center justify-center mx-auto">
            <Bookmark className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#1a1c19]">No saved items yet</h3>
          <p className="text-xs text-[#5f5e5e] max-w-sm mx-auto">
            Browse the explore tab and click the bookmark icon on businesses or opportunities you want to follow.
          </p>
          <button
            onClick={onExplore}
            className="bg-[#1a1c19] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#2f312e]"
          >
            Explore Directory
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Saved Businesses */}
          {savedBusinesses.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-[#1a1c19]">Saved Businesses ({savedBusinesses.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedBusinesses.map(biz => (
                  <div
                    key={biz.id}
                    className="bg-white border border-[#e3e3de] rounded-xl p-4 shadow-subtle flex flex-col justify-between hover:border-[#516051] transition-all"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2.5">
                          <img src={biz.logo} alt={biz.name} className="w-9 h-9 rounded-full object-cover border border-[#e3e3de]" />
                          <div>
                            <h3 className="text-sm font-bold text-[#1a1c19]">{biz.name}</h3>
                            <p className="text-[11px] text-[#5f5e5e]">{biz.category}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => onRemoveSavedBusiness(biz.id)}
                          className="text-[#747872] hover:text-[#ba1a1a] p-1"
                          title="Remove bookmark"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-[#434842] line-clamp-2 my-2">{biz.tagLine}</p>
                      <div className="text-[11px] text-[#747872] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#516051]" /> {biz.location}
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectBusiness(biz)}
                      className="mt-4 w-full bg-[#1a1c19] hover:bg-[#2f312e] text-white text-xs font-bold py-2 rounded-lg transition-colors"
                    >
                      View Profile
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Opportunities */}
          {savedOpportunities.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-[#1a1c19]">Saved Opportunities ({savedOpportunities.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedOpportunities.map(opp => (
                  <div
                    key={opp.id}
                    className="bg-white border border-[#e3e3de] rounded-xl p-4 shadow-subtle flex flex-col justify-between hover:border-[#516051] transition-all"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-[10px] font-bold text-[#516051] bg-[#d7e7d4] px-2 py-0.5 rounded">
                          {opp.matchStrength || 'Matched'}
                        </span>
                        <button
                          onClick={() => onRemoveSavedOpportunity(opp.id)}
                          className="text-[#747872] hover:text-[#ba1a1a] p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <h3 className="text-sm font-bold text-[#1a1c19] line-clamp-2">{opp.title}</h3>
                      <p className="text-xs text-[#5f5e5e] line-clamp-2 my-2">{opp.description}</p>
                    </div>

                    <button
                      onClick={() => onSelectOpportunity(opp)}
                      className="mt-3 w-full bg-[#1a1c19] text-white text-xs font-bold py-2 rounded-lg hover:bg-[#2f312e]"
                    >
                      View Opportunity
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
