import React, { useState, useMemo } from 'react';
import { Opportunity, BusinessProfile, DemandGap } from '../../types';
import { 
  Search, 
  MapPin, 
  DollarSign, 
  Layers, 
  Briefcase, 
  Check, 
  Bookmark, 
  BookmarkCheck, 
  TrendingUp, 
  PlusCircle, 
  Sparkles, 
  Filter, 
  ArrowRight,
  Clock,
  AlertCircle,
  Bell,
  Send
} from 'lucide-react';

interface BusinessDiscoverProps {
  opportunities: Opportunity[];
  businesses: BusinessProfile[];
  demandGaps: DemandGap[];
  onSelectOpportunity: (opp: Opportunity) => void;
  onSelectBusiness: (biz: BusinessProfile) => void;
  onCreateNeed: () => void;
  onCreateOffer: () => void;
  onToggleSaveOpportunity: (id: string) => void;
  onToggleSaveBusiness: (id: string) => void;
  onExploreDemandGap: (gap: DemandGap) => void;
}

export const BusinessDiscover: React.FC<BusinessDiscoverProps> = ({
  opportunities,
  businesses,
  demandGaps,
  onSelectOpportunity,
  onSelectBusiness,
  onCreateNeed,
  onCreateOffer,
  onToggleSaveOpportunity,
  onToggleSaveBusiness,
  onExploreDemandGap
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'all' | 'opportunities' | 'businesses' | 'demand_gaps'>('all');
  const [notifiedGap, setNotifiedGap] = useState<string | null>(null);

  const categories = ['All', 'B2B Supply Chain', 'Digital Agency', 'Event Media & Photography', 'Cafe & Catering', 'Wellness & Fitness', 'Software & Tech'];
  const locations = ['All Locations', 'Chicago, IL', 'Downtown Area', 'West Loop', 'Vijayawada', 'Remote'];

  // Filtered Opportunities
  const filteredOpportunities = useMemo(() => {
    return opportunities.filter(opp => {
      const matchesSearch = 
        opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || selectedCategory === 'All' || opp.category.toLowerCase().includes(selectedCategory.toLowerCase());
      const matchesType = selectedType === 'all' || opp.type === selectedType;
      const matchesLoc = selectedLocation === 'all' || selectedLocation === 'All Locations' || opp.location.toLowerCase().includes(selectedLocation.toLowerCase());

      return matchesSearch && matchesCategory && matchesType && matchesLoc;
    });
  }, [opportunities, searchQuery, selectedCategory, selectedType, selectedLocation]);

  // Filtered Businesses
  const filteredBusinesses = useMemo(() => {
    return businesses.filter(biz => {
      const matchesSearch = 
        biz.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        biz.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        biz.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || selectedCategory === 'All' || biz.category.toLowerCase().includes(selectedCategory.toLowerCase());
      const matchesLoc = selectedLocation === 'all' || selectedLocation === 'All Locations' || biz.location.toLowerCase().includes(selectedLocation.toLowerCase());

      return matchesSearch && matchesCategory && matchesLoc;
    });
  }, [businesses, searchQuery, selectedCategory, selectedLocation]);

  const hasExactMatches = filteredOpportunities.length > 0 || filteredBusinesses.length > 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header & Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1c19] tracking-tight">Opportunity Discovery</h1>
          <p className="text-xs text-[#5f5e5e] mt-0.5">
            Intelligent opportunity matching based on requirements, budget, location, and operational capability.
          </p>
        </div>

        {/* Needs & Offers supply/demand layer creator buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onCreateNeed}
            className="px-3.5 py-2 rounded-lg bg-[#eeeee9] hover:bg-[#e3e3de] text-[#1a1c19] text-xs font-bold flex items-center gap-1.5 transition-colors border border-[#c4c8c0]"
          >
            <PlusCircle className="w-3.5 h-3.5 text-[#516051]" />
            "I'm looking for..."
          </button>
          <button
            onClick={onCreateOffer}
            className="px-3.5 py-2 rounded-lg bg-[#1a1c19] hover:bg-[#2f312e] text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5 text-[#d7e7d4]" />
            "I can provide..."
          </button>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#747872]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search businesses, products, services, demand gaps, or requirements..."
          className="w-full bg-white border border-[#e3e3de] rounded-xl py-3.5 pl-12 pr-4 text-sm text-[#1a1c19] placeholder:text-[#747872] focus:outline-none focus:border-[#1a1c19] transition-colors shadow-subtle"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#747872] hover:text-[#1a1c19]"
          >
            Clear
          </button>
        )}
      </div>

      {/* Pill Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {/* Category selector */}
        <div className="flex items-center gap-1.5 shrink-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat === 'All' ? 'all' : cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                (selectedCategory === 'all' && cat === 'All') || selectedCategory === cat
                  ? 'bg-[#1a1c19] text-white'
                  : 'bg-white text-[#5f5e5e] border border-[#e3e3de] hover:bg-[#f4f4ef]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Secondary Quick Filters: Location & View Tab */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-[#eeeee9]">
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#747872] font-semibold flex items-center gap-1">
            <MapPin className="w-3 h-3" /> Location:
          </span>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="bg-white text-xs font-medium text-[#1a1c19] border border-[#e3e3de] rounded-lg px-2.5 py-1 focus:outline-none"
          >
            {locations.map(loc => (
              <option key={loc} value={loc === 'All Locations' ? 'all' : loc}>{loc}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1 bg-[#eeeee9]/70 p-0.5 rounded-lg border border-[#e3e3de]">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
              activeTab === 'all' ? 'bg-white text-[#1a1c19] shadow-xs' : 'text-[#5f5e5e]'
            }`}
          >
            All Results
          </button>
          <button
            onClick={() => setActiveTab('opportunities')}
            className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
              activeTab === 'opportunities' ? 'bg-white text-[#1a1c19] shadow-xs' : 'text-[#5f5e5e]'
            }`}
          >
            Opportunities ({filteredOpportunities.length})
          </button>
          <button
            onClick={() => setActiveTab('businesses')}
            className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
              activeTab === 'businesses' ? 'bg-white text-[#1a1c19] shadow-xs' : 'text-[#5f5e5e]'
            }`}
          >
            Businesses ({filteredBusinesses.length})
          </button>
        </div>
      </div>

      {/* Main Results Container */}
      {hasExactMatches ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Opportunities Cards */}
          {(activeTab === 'all' || activeTab === 'opportunities') &&
            filteredOpportunities.map((opp) => (
              <article
                key={opp.id}
                className="bg-white border border-[#e3e3de] rounded-xl p-5 flex flex-col justify-between shadow-subtle hover:shadow-card-hover hover:border-[#516051] transition-all"
              >
                <div>
                  {/* Top Bar with Match Strength */}
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <span className="text-xs font-bold text-[#516051] bg-[#d7e7d4] px-2 py-0.5 rounded">
                      {opp.matchStrength || 'Strong match'}
                    </span>
                    <button
                      onClick={() => onToggleSaveOpportunity(opp.id)}
                      className="text-[#747872] hover:text-[#1a1c19] p-1 rounded-md"
                      title="Save Opportunity"
                    >
                      {opp.isSaved ? (
                        <BookmarkCheck className="w-4 h-4 text-[#516051]" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <h3 
                    onClick={() => onSelectOpportunity(opp)}
                    className="text-base font-bold text-[#1a1c19] hover:text-[#516051] transition-colors cursor-pointer"
                  >
                    {opp.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-xs text-[#5f5e5e] mt-1 mb-3">
                    <span>{opp.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5">
                      <MapPin className="w-3 h-3 text-[#747872]" /> {opp.location}
                    </span>
                  </div>

                  <p className="text-xs text-[#434842] line-clamp-2 mb-3">
                    {opp.description}
                  </p>

                  {/* Why this matches section */}
                  {opp.matchReasons && opp.matchReasons.length > 0 && (
                    <div className="bg-[#f4f4ef] rounded-lg p-3 my-3 border border-[#eeeee9]">
                      <p className="text-[10px] font-bold text-[#747872] uppercase tracking-wider mb-2">
                        Why this matches
                      </p>
                      <ul className="space-y-1.5">
                        {opp.matchReasons.map((reason, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs text-[#1a1c19]">
                            <Check className="w-3.5 h-3.5 text-[#516051] shrink-0" />
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {opp.budget && (
                    <div className="text-xs text-[#5f5e5e] flex items-center justify-between mt-2 pt-2 border-t border-[#eeeee9]">
                      <span className="font-semibold text-[#1a1c19]">Budget: {opp.budget}</span>
                      {opp.timing && <span>{opp.timing}</span>}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 flex gap-2">
                  <button
                    onClick={() => onSelectOpportunity(opp)}
                    className="flex-1 bg-[#1a1c19] text-white hover:bg-[#2f312e] text-xs font-bold py-2.5 rounded-lg transition-colors"
                  >
                    {opp.type === 'partnership' ? 'Connect' : 'Respond'}
                  </button>
                  <button
                    onClick={() => onSelectOpportunity(opp)}
                    className="px-3 border border-[#c4c8c0] rounded-lg text-xs font-semibold text-[#1a1c19] hover:bg-[#f4f4ef]"
                  >
                    Details
                  </button>
                </div>
              </article>
            ))}

          {/* Business Profiles Cards */}
          {(activeTab === 'all' || activeTab === 'businesses') &&
            filteredBusinesses.map((biz) => (
              <article
                key={biz.id}
                className="bg-white border border-[#e3e3de] rounded-xl p-5 flex flex-col justify-between shadow-subtle hover:shadow-card-hover hover:border-[#516051] transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={biz.logo}
                        alt={biz.name}
                        className="w-10 h-10 rounded-full object-cover border border-[#e3e3de]"
                      />
                      <div>
                        <h3 
                          onClick={() => onSelectBusiness(biz)}
                          className="text-sm font-bold text-[#1a1c19] hover:text-[#516051] transition-colors cursor-pointer"
                        >
                          {biz.name}
                        </h3>
                        <p className="text-xs text-[#5f5e5e]">{biz.category}</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-[#516051] bg-[#d7e7d4] px-2 py-0.5 rounded">
                      ★ {biz.rating}
                    </span>
                  </div>

                  <p className="text-xs text-[#434842] line-clamp-2 mb-3">
                    {biz.tagLine}
                  </p>

                  <div className="bg-[#f4f4ef] rounded-lg p-2.5 mb-3 text-xs space-y-1">
                    <div className="flex items-center justify-between text-[#5f5e5e]">
                      <span>Location:</span>
                      <span className="font-semibold text-[#1a1c19]">{biz.location}</span>
                    </div>
                    <div className="flex items-center justify-between text-[#5f5e5e]">
                      <span>Verified Interactions:</span>
                      <span className="font-semibold text-[#516051]">{biz.verifiedInteractionsCount} completed</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 flex gap-2">
                  <button
                    onClick={() => onSelectBusiness(biz)}
                    className="flex-1 bg-[#1a1c19] text-white hover:bg-[#2f312e] text-xs font-bold py-2.5 rounded-lg transition-colors"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => onToggleSaveBusiness(biz.id)}
                    className="px-3 border border-[#c4c8c0] rounded-lg text-[#1a1c19] hover:bg-[#f4f4ef]"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}

          {/* Demand Gap Banner card inside Discover */}
          {demandGaps.length > 0 && (
            <article className="bg-[#eeeee9] border border-[#d7e7d4] rounded-xl p-5 flex flex-col justify-between text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#d7e7d4] rounded-full opacity-50 blur-xl pointer-events-none" />
              <div>
                <div className="w-10 h-10 rounded-full bg-[#516051] text-white flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#1a1c19]">Demand Gap Identified</h3>
                <p className="text-xs text-[#5f5e5e] mt-1.5">
                  14 people are currently looking for <strong>{demandGaps[0].category}</strong> in your area. Consider expanding your services to meet this unfulfilled demand.
                </p>
                <div className="mt-3 text-xs font-bold text-[#516051] bg-[#d7e7d4] px-3 py-1 rounded-full inline-block">
                  Avg. Budget: {demandGaps[0].averageBudget}
                </div>
              </div>

              <div className="mt-5">
                <button
                  onClick={() => onExploreDemandGap(demandGaps[0])}
                  className="w-full bg-[#516051] text-white hover:bg-[#3c4a3d] text-xs font-bold py-2.5 rounded-lg transition-colors"
                >
                  Explore Opportunity
                </button>
              </div>
            </article>
          )}
        </div>
      ) : (
        /* Section 7: NO-MATCH FALLBACK SYSTEM - Never show dead 'No results' */
        <div className="bg-[#f4f4ef] border border-[#e3e3de] rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="text-center max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#d7e7d4] text-[#516051] flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-[#1a1c19]">No exact match yet</h2>
            <p className="text-xs text-[#5f5e5e] mt-1">
              We couldn't find a 100% exact match for "{searchQuery || selectedCategory}", but our fallback system activated near matches and alternative providers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Step 1: Near Match */}
            <div className="bg-white p-4 rounded-xl border border-[#e3e3de]">
              <div className="flex items-center gap-2 text-xs font-bold text-[#516051] mb-1">
                <MapPin className="w-3.5 h-3.5" /> Step 1: Near Match Found
              </div>
              <p className="text-xs text-[#1a1c19] font-medium">
                2 nearby providers found by expanding search radius to 15 miles.
              </p>
              <button
                onClick={() => {
                  setSelectedLocation('all');
                  setSearchQuery('');
                }}
                className="mt-3 text-xs font-bold text-[#516051] hover:underline flex items-center gap-1"
              >
                Expand Search Radius <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Step 2: Alternative Suggestion */}
            <div className="bg-white p-4 rounded-xl border border-[#e3e3de]">
              <div className="flex items-center gap-2 text-xs font-bold text-[#516051] mb-1">
                <Layers className="w-3.5 h-3.5" /> Step 2: Alternative Category
              </div>
              <p className="text-xs text-[#1a1c19] font-medium">
                No standalone photographers for that exact hour, but <strong>Lens & Light Media</strong> provides integrated event photo + highlight reels.
              </p>
              <button
                onClick={() => {
                  if (businesses[5]) onSelectBusiness(businesses[5]);
                }}
                className="mt-3 text-xs font-bold text-[#516051] hover:underline flex items-center gap-1"
              >
                View Alternative Provider <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Step 3: Open Opportunity */}
            <div className="bg-white p-4 rounded-xl border border-[#e3e3de]">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1a1c19] mb-1">
                <Send className="w-3.5 h-3.5 text-[#516051]" /> Step 3: Post Open Request
              </div>
              <p className="text-xs text-[#5f5e5e]">
                Publish your requirement as an active opportunity. Relevant businesses will receive direct notifications to respond.
              </p>
              <button
                onClick={onCreateNeed}
                className="mt-3 bg-[#1a1c19] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#2f312e]"
              >
                Post Open Opportunity
              </button>
            </div>

            {/* Step 4: Notify Me */}
            <div className="bg-white p-4 rounded-xl border border-[#e3e3de]">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1a1c19] mb-1">
                <Bell className="w-3.5 h-3.5 text-[#516051]" /> Step 4: Instant Match Alerts
              </div>
              <p className="text-xs text-[#5f5e5e]">
                Get notified automatically the moment a matching business or provider lists relevant capacity.
              </p>
              <button
                onClick={() => {
                  setNotifiedGap('active');
                  alert('Match alert saved! You will receive notifications when new providers join.');
                }}
                className="mt-3 border border-[#c4c8c0] text-[#1a1c19] px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#f4f4ef]"
              >
                Notify Me When Match Appears
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
