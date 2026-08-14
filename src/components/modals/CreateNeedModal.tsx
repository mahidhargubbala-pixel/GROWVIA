import React, { useState } from 'react';
import { Opportunity, VisibilityLevel } from '../../types';
import { X, Send, MapPin, DollarSign, Calendar, Lock, Globe, ShieldCheck } from 'lucide-react';

interface CreateNeedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newNeed: Partial<Opportunity>) => void;
}

export const CreateNeedModal: React.FC<CreateNeedModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Event Media & Photography');
  const [location, setLocation] = useState('Downtown Area, Chicago');
  const [budget, setBudget] = useState('$500 - $1,000');
  const [timing, setTiming] = useState('Next Weekend');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState<VisibilityLevel>('public');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title,
      category,
      location,
      budget,
      timing,
      description: description || 'Looking for verified local services matching our project requirements.',
      visibility,
      type: 'customer_need',
      status: 'matching',
      matchStrength: 'Strong match',
      matchReasons: ['Target category match', 'Budget range compatible', 'Active local availability'],
      responsesCount: 0,
      createdAt: 'Just now'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl border border-[#e3e3de] max-w-lg w-full p-6 shadow-card-hover relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#747872] hover:text-[#1a1c19] rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5">
          <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#516051] bg-[#d7e7d4] px-2.5 py-0.5 rounded-full mb-1">
            Requirement Builder
          </div>
          <h2 className="text-xl font-bold text-[#1a1c19]">"I'm looking for..."</h2>
          <p className="text-xs text-[#5f5e5e] mt-0.5">
            Post a need and get matched with verified local businesses. No cold calling or public spam.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#1a1c19] mb-1">
              What do you need? *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Event photographer for college fest, refrigerated staging..."
              className="w-full bg-[#fafaf4] border border-[#e3e3de] rounded-xl p-3 text-xs text-[#1a1c19] focus:outline-none focus:border-[#1a1c19]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#1a1c19] mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#fafaf4] border border-[#e3e3de] rounded-xl p-2.5 text-xs text-[#1a1c19] focus:outline-none"
              >
                <option>Event Media & Photography</option>
                <option>B2B Supply Chain & Storage</option>
                <option>Cafe & Catering</option>
                <option>Wellness & Fitness</option>
                <option>Retail & Product Consignment</option>
                <option>Software & Integrations</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1a1c19] mb-1">
                Location / Radius
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-[#fafaf4] border border-[#e3e3de] rounded-xl p-2.5 text-xs text-[#1a1c19] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#1a1c19] mb-1">
                Budget Range
              </label>
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g. $400 - $800"
                className="w-full bg-[#fafaf4] border border-[#e3e3de] rounded-xl p-2.5 text-xs text-[#1a1c19] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1a1c19] mb-1">
                Date / Time Window
              </label>
              <input
                type="text"
                value={timing}
                onChange={(e) => setTiming(e.target.value)}
                placeholder="e.g. This Saturday, Sept 14"
                className="w-full bg-[#fafaf4] border border-[#e3e3de] rounded-xl p-2.5 text-xs text-[#1a1c19] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1a1c19] mb-1">
              Detailed Description & Requirements
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Specify requirements, deliverables, team size, equipment or delivery details..."
              className="w-full bg-[#fafaf4] border border-[#e3e3de] rounded-xl p-3 text-xs text-[#1a1c19] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1a1c19] mb-2">
              Visibility & Privacy
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setVisibility('public')}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                  visibility === 'public'
                    ? 'bg-[#d7e7d4] border-[#516051] font-bold text-[#121e13]'
                    : 'bg-[#fafaf4] border-[#e3e3de] text-[#5f5e5e]'
                }`}
              >
                <Globe className="w-3.5 h-3.5 mb-1 text-[#516051]" />
                <div>Public</div>
                <div className="text-[10px] text-[#747872] font-normal">All businesses</div>
              </button>

              <button
                type="button"
                onClick={() => setVisibility('verified_only')}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                  visibility === 'verified_only'
                    ? 'bg-[#d7e7d4] border-[#516051] font-bold text-[#121e13]'
                    : 'bg-[#fafaf4] border-[#e3e3de] text-[#5f5e5e]'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 mb-1 text-[#516051]" />
                <div>Verified Only</div>
                <div className="text-[10px] text-[#747872] font-normal">Trust rating &gt;90%</div>
              </button>

              <button
                type="button"
                onClick={() => setVisibility('private')}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                  visibility === 'private'
                    ? 'bg-[#d7e7d4] border-[#516051] font-bold text-[#121e13]'
                    : 'bg-[#fafaf4] border-[#e3e3de] text-[#5f5e5e]'
                }`}
              >
                <Lock className="w-3.5 h-3.5 mb-1 text-[#516051]" />
                <div>Direct Match</div>
                <div className="text-[10px] text-[#747872] font-normal">Private invitation</div>
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-[#eeeee9] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#5f5e5e] hover:bg-[#f4f4ef] rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#1a1c19] text-white hover:bg-[#2f312e] text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm"
            >
              <Send className="w-3.5 h-3.5 text-[#d7e7d4]" />
              Publish Requirement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
