import React from 'react';
import { Opportunity } from '../../types';
import { X, Check, MapPin, DollarSign, Clock, ShieldCheck, Send, Bookmark, BookmarkCheck } from 'lucide-react';

interface OpportunityDetailModalProps {
  opportunity: Opportunity | null;
  isOpen: boolean;
  onClose: () => void;
  onRespond: (opp: Opportunity) => void;
  onToggleSave: (id: string) => void;
}

export const OpportunityDetailModal: React.FC<OpportunityDetailModalProps> = ({
  opportunity,
  isOpen,
  onClose,
  onRespond,
  onToggleSave
}) => {
  if (!isOpen || !opportunity) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl border border-[#e3e3de] max-w-xl w-full p-6 shadow-card-hover relative max-h-[90vh] overflow-y-auto space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#747872] hover:text-[#1a1c19] rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-bold text-[#516051] bg-[#d7e7d4] px-2.5 py-0.5 rounded">
              {opportunity.matchStrength || 'Strong match'}
            </span>
            <span className="text-xs text-[#747872] capitalize">
              Type: {opportunity.type.replace('_', ' ')}
            </span>
            <span className="text-xs text-[#747872]">• Posted {opportunity.createdAt}</span>
          </div>

          <h2 className="text-xl font-bold text-[#1a1c19]">{opportunity.title}</h2>
          <div className="flex items-center gap-2 text-xs text-[#5f5e5e] mt-1">
            <span>{opportunity.category}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#516051]" /> {opportunity.location}
            </span>
          </div>
        </div>

        {/* Section 5: Why this matches */}
        {opportunity.matchReasons && opportunity.matchReasons.length > 0 && (
          <div className="bg-[#f4f4ef] rounded-xl p-4 border border-[#eeeee9]">
            <p className="text-[11px] font-bold text-[#747872] uppercase tracking-wider mb-2">
              Why this opportunity matches
            </p>
            <ul className="space-y-2">
              {opportunity.matchReasons.map((reason, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs text-[#1a1c19]">
                  <Check className="w-4 h-4 text-[#516051] shrink-0" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h4 className="text-xs font-bold text-[#747872] uppercase tracking-wider mb-1">
            Scope & Specifications
          </h4>
          <p className="text-xs text-[#434842] leading-relaxed bg-[#fafaf4] p-3.5 rounded-xl border border-[#eeeee9]">
            {opportunity.description}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 bg-[#f4f4ef] rounded-xl text-xs">
          <div>
            <div className="text-[#747872]">Target Budget</div>
            <div className="font-bold text-[#1a1c19]">{opportunity.budget || 'Open / Negotiable'}</div>
          </div>
          <div>
            <div className="text-[#747872]">Timing</div>
            <div className="font-bold text-[#1a1c19]">{opportunity.timing || 'Immediate'}</div>
          </div>
          <div>
            <div className="text-[#747872]">Responses Logged</div>
            <div className="font-bold text-[#516051]">{opportunity.responsesCount} responses</div>
          </div>
        </div>

        {/* Requester Profile Snapshot */}
        <div className="p-3.5 bg-white border border-[#e3e3de] rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#d7e7d4] flex items-center justify-center font-bold text-[#121e13] text-sm overflow-hidden">
              {opportunity.requesterAvatar ? (
                <img src={opportunity.requesterAvatar} alt="" className="w-full h-full object-cover" />
              ) : (
                opportunity.requesterName.slice(0, 2)
              )}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#1a1c19]">{opportunity.requesterName}</span>
                {opportunity.requesterVerified && (
                  <ShieldCheck className="w-3.5 h-3.5 text-[#516051]" />
                )}
              </div>
              <p className="text-[11px] text-[#747872] capitalize">{opportunity.requesterRole} Account</p>
            </div>
          </div>

          <span className="text-[11px] font-semibold text-[#516051] bg-[#d7e7d4] px-2 py-0.5 rounded">
            Verified Contact
          </span>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#eeeee9] flex items-center justify-between gap-3">
          <button
            onClick={() => onToggleSave(opportunity.id)}
            className="p-2.5 border border-[#c4c8c0] rounded-xl text-[#1a1c19] hover:bg-[#f4f4ef]"
            title="Save Opportunity"
          >
            {opportunity.isSaved ? (
              <BookmarkCheck className="w-4 h-4 text-[#516051]" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-[#5f5e5e] hover:bg-[#f4f4ef] rounded-xl"
            >
              Close
            </button>
            <button
              onClick={() => onRespond(opportunity)}
              className="bg-[#1a1c19] text-white hover:bg-[#2f312e] text-xs font-bold px-6 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-[#d7e7d4]" />
              {opportunity.type === 'partnership' ? 'Connect with Partner' : 'Send Direct Response'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
