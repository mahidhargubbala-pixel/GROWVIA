import React, { useState } from 'react';
import { GrowthExperiment, BusinessProfile } from '../../types';
import { X, FlaskConical, Target, DollarSign, Clock, Users, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CreateExperimentModalProps {
  isOpen: boolean;
  onClose: () => void;
  businesses: BusinessProfile[];
  onSubmit: (newExp: GrowthExperiment) => void;
}

export const CreateExperimentModal: React.FC<CreateExperimentModalProps> = ({
  isOpen,
  onClose,
  businesses,
  onSubmit
}) => {
  const [title, setTitle] = useState('');
  const [goal, setGoal] = useState('');
  const [audience, setAudience] = useState('Local residents and young professionals within 3 miles');
  const [budget, setBudget] = useState('$300');
  const [duration, setDuration] = useState('7 Days');
  const [offer, setOffer] = useState('15% off first bundle purchase');
  const [selectedPartnerId, setSelectedPartnerId] = useState<string>('none');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const partner = businesses.find(b => b.id === selectedPartnerId);

    const newExperiment: GrowthExperiment = {
      id: `exp_${Date.now()}`,
      title,
      goal: goal || 'Drive measured customer acquisition and footfall',
      audience,
      budget,
      duration,
      offer,
      partnerBusinessName: partner ? partner.name : undefined,
      partnerBusinessId: partner ? partner.id : undefined,
      status: 'running',
      funnel: {
        reach: 1200,
        engagement: 180,
        leads: 12,
        conversions: null
      },
      recommendedNextStep: {
        text: 'Monitor click-through rates across the first 48 hours to optimize ad copy.',
        actionLabel: 'Check Live CTR',
        actionType: 'monitor_ctr'
      },
      createdAt: 'Just started'
    };

    onSubmit(newExperiment);
    confetti({ particleCount: 50, spread: 60 });
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
            <FlaskConical className="w-3.5 h-3.5" />
            Growth Test Setup
          </div>
          <h2 className="text-xl font-bold text-[#1a1c19]">Start a Growth Experiment</h2>
          <p className="text-xs text-[#5f5e5e] mt-0.5">
            Formulate a hypothesis, allocate a micro-budget, and track funnel conversion metrics.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#1a1c19] mb-1">
              Experiment Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Back-to-school co-marketing voucher, corporate coffee trial..."
              className="w-full bg-[#fafaf4] border border-[#e3e3de] rounded-xl p-3 text-xs text-[#1a1c19] focus:outline-none focus:border-[#1a1c19]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1a1c19] mb-1">
              Primary Goal / Hypothesis
            </label>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g. Generate 25 new corporate inquiries by offering free sample kits"
              className="w-full bg-[#fafaf4] border border-[#e3e3de] rounded-xl p-2.5 text-xs text-[#1a1c19] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#1a1c19] mb-1">
                Micro-Budget
              </label>
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g. $250"
                className="w-full bg-[#fafaf4] border border-[#e3e3de] rounded-xl p-2.5 text-xs text-[#1a1c19] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1a1c19] mb-1">
                Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-[#fafaf4] border border-[#e3e3de] rounded-xl p-2.5 text-xs text-[#1a1c19] focus:outline-none"
              >
                <option>7 Days</option>
                <option>14 Days</option>
                <option>30 Days</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1a1c19] mb-1">
              Specific Offer or Hook
            </label>
            <input
              type="text"
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
              placeholder="e.g. Free 14-day pass, 20% off catering setup"
              className="w-full bg-[#fafaf4] border border-[#e3e3de] rounded-xl p-2.5 text-xs text-[#1a1c19] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1a1c19] mb-1">
              Collaboration Partner (Optional)
            </label>
            <select
              value={selectedPartnerId}
              onChange={(e) => setSelectedPartnerId(e.target.value)}
              className="w-full bg-[#fafaf4] border border-[#e3e3de] rounded-xl p-2.5 text-xs text-[#1a1c19] focus:outline-none"
            >
              <option value="none">No partner (Solo experiment)</option>
              {businesses.map(b => (
                <option key={b.id} value={b.id}>{b.name} ({b.category})</option>
              ))}
            </select>
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
              <FlaskConical className="w-3.5 h-3.5 text-[#d7e7d4]" />
              Launch Experiment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
