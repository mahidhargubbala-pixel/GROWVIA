import React, { useState } from 'react';
import { BusinessProfile, BusinessOffer } from '../../types';
import { 
  X, 
  ShieldCheck, 
  Star, 
  MapPin, 
  CheckCircle2, 
  MessageSquare, 
  Bookmark, 
  BookmarkCheck, 
  Flag, 
  Tag, 
  Layers,
  ArrowRight
} from 'lucide-react';

interface BusinessProfileModalProps {
  business: BusinessProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenMessage: (biz: BusinessProfile) => void;
  onToggleSave: (id: string) => void;
  onClaimOffer: (biz: BusinessProfile, offer: BusinessOffer) => void;
}

export const BusinessProfileModal: React.FC<BusinessProfileModalProps> = ({
  business,
  isOpen,
  onClose,
  onOpenMessage,
  onToggleSave,
  onClaimOffer
}) => {
  const [activeTab, setActiveTab] = useState<'services' | 'offers' | 'reviews'>('services');
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [reportReason, setReportReason] = useState('Fake business information');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  if (!isOpen || !business) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl border border-[#e3e3de] max-w-2xl w-full p-6 shadow-card-hover relative max-h-[90vh] overflow-y-auto space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#747872] hover:text-[#1a1c19] rounded-full z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Business Header Banner */}
        <div className="flex flex-col sm:flex-row items-start gap-4 pb-4 border-b border-[#eeeee9]">
          <img
            src={business.logo}
            alt={business.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-[#e3e3de] shrink-0"
          />

          <div className="flex-1 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold text-[#1a1c19]">{business.name}</h2>
              <span className="bg-[#d7e7d4] text-[#121e13] text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#516051]" />
                {business.trustScore}/100 Trust Score
              </span>
            </div>

            <p className="text-xs text-[#5f5e5e]">{business.category} • {business.subcategory || 'Verified Provider'}</p>
            <p className="text-xs text-[#434842] flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#516051]" />
              {business.address}
            </p>
          </div>
        </div>

        {/* Section 18: Trust Indicators Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 bg-[#f4f4ef] rounded-xl border border-[#eeeee9] text-center">
          <div>
            <div className="flex items-center justify-center text-[#516051] gap-1 text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" /> Verified
            </div>
            <div className="text-[10px] text-[#747872]">Contact & ID</div>
          </div>

          <div>
            <div className="flex items-center justify-center text-[#516051] gap-1 text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" /> Registered
            </div>
            <div className="text-[10px] text-[#747872]">Business Entity</div>
          </div>

          <div>
            <div className="text-xs font-bold text-[#1a1c19]">{business.verifiedInteractionsCount}</div>
            <div className="text-[10px] text-[#747872]">Verified Interactions</div>
          </div>

          <div>
            <div className="text-xs font-bold text-[#1a1c19]">{business.verifiedTransactionsCount}</div>
            <div className="text-[10px] text-[#747872]">Closed Contracts</div>
          </div>
        </div>

        {/* Tagline & Description */}
        <div>
          <h4 className="text-xs font-bold text-[#747872] uppercase tracking-wider mb-1">About the Business</h4>
          <p className="text-xs font-semibold text-[#1a1c19] mb-1">{business.tagLine}</p>
          <p className="text-xs text-[#434842] leading-relaxed">{business.description}</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-[#eeeee9] pb-2">
          <button
            onClick={() => setActiveTab('services')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeTab === 'services' ? 'bg-[#1a1c19] text-white' : 'text-[#5f5e5e] hover:bg-[#f4f4ef]'
            }`}
          >
            Services & Packages ({business.services.length})
          </button>
          <button
            onClick={() => setActiveTab('offers')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeTab === 'offers' ? 'bg-[#1a1c19] text-white' : 'text-[#5f5e5e] hover:bg-[#f4f4ef]'
            }`}
          >
            Active Offers ({business.offers.length})
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeTab === 'reviews' ? 'bg-[#1a1c19] text-white' : 'text-[#5f5e5e] hover:bg-[#f4f4ef]'
            }`}
          >
            Verified Reviews ({business.reviews.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-3">
          {activeTab === 'services' && (
            <div className="space-y-3">
              {business.services.map(svc => (
                <div key={svc.id} className="p-3.5 bg-[#fafaf4] border border-[#eeeee9] rounded-xl flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-[#1a1c19]">{svc.name}</h4>
                      <span className="text-[10px] font-semibold bg-[#eeeee9] text-[#1a1c19] px-2 py-0.5 rounded">
                        {svc.tag}
                      </span>
                    </div>
                    <p className="text-xs text-[#5f5e5e] mt-0.5">{svc.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-[#1a1c19]">{svc.price}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'offers' && (
            <div className="space-y-3">
              {business.offers.map(offer => (
                <div key={offer.id} className="p-4 bg-[#fafaf4] border border-[#d7e7d4] rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-[#121e13] bg-[#d7e7d4] px-2 py-0.5 rounded">
                        {offer.discount}
                      </span>
                      <span className="text-[10px] text-[#747872]">{offer.expiry}</span>
                    </div>
                    <h4 className="text-sm font-bold text-[#1a1c19]">{offer.title}</h4>
                    <p className="text-xs text-[#5f5e5e] mt-0.5">{offer.description}</p>
                  </div>
                  <button
                    onClick={() => onClaimOffer(business, offer)}
                    className="bg-[#1a1c19] text-white hover:bg-[#2f312e] text-xs font-bold px-4 py-2 rounded-lg transition-colors shrink-0"
                  >
                    Claim Offer
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-3">
              {business.reviews.map(rev => (
                <div key={rev.id} className="p-3.5 bg-[#fafaf4] border border-[#eeeee9] rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#1a1c19]">{rev.author}</span>
                      <span className="text-[11px] text-[#747872]">({rev.authorRole})</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[#516051] font-bold">
                      <Star className="w-3 h-3 fill-[#516051]" /> {rev.rating}.0
                    </div>
                  </div>

                  <p className="text-xs text-[#434842] leading-relaxed">"{rev.content}"</p>

                  <div className="flex items-center justify-between pt-1 border-t border-[#eeeee9] text-[10px] text-[#747872]">
                    <span className="text-[#516051] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Verified Interaction Record
                    </span>
                    <span>{rev.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#eeeee9] flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => setShowReportDialog(!showReportDialog)}
            className="text-xs text-[#747872] hover:text-[#ba1a1a] flex items-center gap-1"
          >
            <Flag className="w-3.5 h-3.5" />
            Report Business
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(business.id)}
              className="p-2.5 border border-[#c4c8c0] rounded-xl text-[#1a1c19] hover:bg-[#f4f4ef]"
              title="Save Business"
            >
              {business.isSaved ? (
                <BookmarkCheck className="w-4 h-4 text-[#516051]" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={() => onOpenMessage(business)}
              className="bg-[#1a1c19] hover:bg-[#2f312e] text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4 text-[#d7e7d4]" />
              Contact Business
            </button>
          </div>
        </div>

        {/* Report Dialog Overlay */}
        {showReportDialog && (
          <div className="p-4 bg-[#fafaf4] border border-[#ba1a1a]/30 rounded-xl space-y-3">
            <h4 className="text-xs font-bold text-[#ba1a1a]">Report This Business</h4>
            <p className="text-xs text-[#5f5e5e]">
              Help maintain network trust. Reports are audited against verified activity records.
            </p>
            {reportSubmitted ? (
              <p className="text-xs font-bold text-[#516051]">
                Thank you. Report received for trust audit.
              </p>
            ) : (
              <div className="space-y-2">
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="w-full bg-white border border-[#e3e3de] rounded-lg p-2 text-xs text-[#1a1c19]"
                >
                  <option>Fake business information</option>
                  <option>Spam or unsolicited advertising</option>
                  <option>Unfulfilled contract or bad experience</option>
                  <option>Inappropriate content</option>
                </select>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => setShowReportDialog(false)}
                    className="px-3 py-1.5 text-xs text-[#5f5e5e]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setReportSubmitted(true)}
                    className="bg-[#ba1a1a] text-white text-xs font-bold px-3 py-1.5 rounded-lg"
                  >
                    Submit Report
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
