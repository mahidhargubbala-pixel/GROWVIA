import React, { useState } from 'react';
import { BusinessProfile, BusinessOffer } from '../../types';
import { 
  Search, 
  MapPin, 
  Star, 
  Sparkles, 
  PlusCircle, 
  Tag, 
  ArrowRight, 
  Bookmark, 
  BookmarkCheck,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CustomerExploreProps {
  businesses: BusinessProfile[];
  onSelectBusiness: (biz: BusinessProfile) => void;
  onCreateRequest: () => void;
  onToggleSaveBusiness: (id: string) => void;
  onClaimOffer: (biz: BusinessProfile, offer: BusinessOffer) => void;
}

export const CustomerExplore: React.FC<CustomerExploreProps> = ({
  businesses,
  onSelectBusiness,
  onCreateRequest,
  onToggleSaveBusiness,
  onClaimOffer
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Cafe & Food', 'Wellness', 'Retail & Fashion', 'Media & Events', 'B2B Logistics'];

  const filteredBusinesses = businesses.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.tagLine.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || b.category.toLowerCase().includes(selectedCategory.toLowerCase().slice(0, 4));
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Search & Hero Banner */}
      <div className="relative bg-[#eeeee9] border border-[#e3e3de] rounded-2xl p-6 sm:p-8 space-y-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#d7e7d4] text-[#121e13] text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#516051]" />
            Discover Trusted Local Solutions
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1a1c19] tracking-tight">
            Find the right service, space, or collaboration
          </h1>
          <p className="text-xs text-[#5f5e5e] max-w-lg">
            Post what you need and get matched with verified, reviewed local businesses with zero spam.
          </p>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#747872]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search coffee catering, sound baths, sustainable retail, event photography..."
            className="w-full bg-white border border-[#c4c8c0] rounded-xl py-3.5 pl-12 pr-4 text-sm text-[#1a1c19] focus:outline-none focus:border-[#1a1c19] transition-colors shadow-xs"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#1a1c19] text-white'
                  : 'bg-white text-[#5f5e5e] border border-[#e3e3de] hover:bg-[#f4f4ef]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Special Offers Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-[#516051]" />
            <h2 className="text-lg font-bold text-[#1a1c19]">Special Community Offers</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {businesses.flatMap(b => b.offers.map(o => ({ biz: b, offer: o }))).slice(0, 2).map(({ biz, offer }) => (
            <div
              key={offer.id}
              className="bg-white border border-[#e3e3de] rounded-xl p-5 shadow-subtle flex flex-col justify-between hover:border-[#516051] transition-all relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#d7e7d4] rounded-full opacity-40 blur-lg pointer-events-none" />
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[11px] font-bold text-[#121e13] bg-[#d7e7d4] px-2.5 py-0.5 rounded">
                    {offer.discount}
                  </span>
                  <span className="text-xs text-[#747872]">{offer.expiry}</span>
                </div>

                <h3 className="text-base font-bold text-[#1a1c19] mt-1">{offer.title}</h3>
                <p className="text-xs text-[#5f5e5e] mt-1">{offer.description}</p>
                <p className="text-xs font-semibold text-[#516051] mt-2 flex items-center gap-1">
                  Provided by {biz.name} ({biz.location})
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#eeeee9] flex items-center justify-between">
                <span className="text-xs text-[#747872]">{offer.claimedCount || 12} people claimed</span>
                <button
                  onClick={() => onClaimOffer(biz, offer)}
                  className="bg-[#1a1c19] hover:bg-[#2f312e] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                >
                  Claim Offer
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended Businesses Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#1a1c19]">Recommended Businesses</h2>
          <span className="text-xs text-[#747872]">{filteredBusinesses.length} verified available</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBusinesses.map((biz) => (
            <article
              key={biz.id}
              className="bg-white border border-[#e3e3de] rounded-xl p-5 shadow-subtle flex flex-col justify-between hover:border-[#516051] transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={biz.logo}
                      alt={biz.name}
                      className="w-12 h-12 rounded-full object-cover border border-[#e3e3de]"
                    />
                    <div>
                      <h3
                        onClick={() => onSelectBusiness(biz)}
                        className="text-base font-bold text-[#1a1c19] hover:text-[#516051] transition-colors cursor-pointer"
                      >
                        {biz.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-[#5f5e5e]">
                        <span>{biz.category}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onToggleSaveBusiness(biz.id)}
                    className="p-1 text-[#747872] hover:text-[#1a1c19]"
                    title="Save Business"
                  >
                    {biz.isSaved ? (
                      <BookmarkCheck className="w-4 h-4 text-[#516051]" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <p className="text-xs text-[#434842] line-clamp-2 mb-3">
                  {biz.tagLine}
                </p>

                {/* Trust and Verification indicators */}
                <div className="bg-[#f4f4ef] rounded-lg p-2.5 space-y-1.5 mb-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#5f5e5e] flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-[#516051] text-[#516051]" />
                      Rating:
                    </span>
                    <span className="font-bold text-[#1a1c19]">{biz.rating} ({biz.reviewsCount} reviews)</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#5f5e5e] flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#516051]" />
                      Trust Score:
                    </span>
                    <span className="font-bold text-[#516051]">{biz.trustScore}/100 Verified</span>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-[#747872] pt-1 border-t border-[#eeeee9]">
                    <MapPin className="w-3 h-3 text-[#516051]" />
                    <span>{biz.location}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#eeeee9] flex gap-2">
                <button
                  onClick={() => onSelectBusiness(biz)}
                  className="flex-1 bg-[#1a1c19] hover:bg-[#2f312e] text-white text-xs font-bold py-2.5 rounded-lg transition-colors"
                >
                  View Services & Offers
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Floating Request Trigger Bar */}
      <div className="fixed bottom-20 sm:bottom-6 right-6 z-30">
        <button
          onClick={onCreateRequest}
          className="bg-[#1a1c19] text-white hover:bg-[#2f312e] px-5 py-3 rounded-full shadow-card-hover font-bold text-xs flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
        >
          <PlusCircle className="w-4 h-4 text-[#d7e7d4]" />
          Post What You Need
        </button>
      </div>
    </div>
  );
};
