import React, { useState } from 'react';
import { Opportunity } from '../../types';
import { X, Sparkles, Plus, DollarSign, MapPin, Tag } from 'lucide-react';

interface CreateOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newOffer: Partial<Opportunity>) => void;
}

export const CreateOfferModal: React.FC<CreateOfferModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('B2B Supply Chain & Storage');
  const [priceRange, setPriceRange] = useState('$250 - $800');
  const [location, setLocation] = useState('Chicago Metro (50 mi radius)');
  const [availability, setAvailability] = useState('Immediate (Same Week)');
  const [description, setDescription] = useState('');
  const [badge, setBadge] = useState('Special Offer');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title,
      category,
      location,
      budget: priceRange,
      timing: availability,
      description: description || 'Verified business capacity available with preferred rates for network members.',
      visibility: 'public',
      type: 'business_offer',
      status: 'open',
      matchStrength: 'Strong match',
      matchReasons: ['Verified business profile', 'Immediate slot availability', 'Competitive pricing guarantee'],
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
            Capacity & Supply Provider
          </div>
          <h2 className="text-xl font-bold text-[#1a1c19]">"I can provide..."</h2>
          <p className="text-xs text-[#5f5e5e] mt-0.5">
            List your service, product package, or unused capacity to be matched with active demands.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#1a1c19] mb-1">
              Offer / Service Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 20% Off Weekend Pop-up Staging & Cold Distribution..."
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
                <option>B2B Supply Chain & Storage</option>
                <option>Event Media & Photography</option>
                <option>Cafe & Catering</option>
                <option>Wellness & Corporate Retreats</option>
                <option>Digital Agency & Growth Tests</option>
                <option>Retail Shelf Placement</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1a1c19] mb-1">
                Price / Rate
              </label>
              <input
                type="text"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                placeholder="e.g. $350 - $1,200"
                className="w-full bg-[#fafaf4] border border-[#e3e3de] rounded-xl p-2.5 text-xs text-[#1a1c19] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#1a1c19] mb-1">
                Service Area / Coverage
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-[#fafaf4] border border-[#e3e3de] rounded-xl p-2.5 text-xs text-[#1a1c19] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1a1c19] mb-1">
                Availability
              </label>
              <input
                type="text"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                placeholder="e.g. Weekends & Evenings"
                className="w-full bg-[#fafaf4] border border-[#e3e3de] rounded-xl p-2.5 text-xs text-[#1a1c19] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1a1c19] mb-1">
              Package Description & What is Included
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detail your capabilities, verified team, equipment, turnaround time, or discounts..."
              className="w-full bg-[#fafaf4] border border-[#e3e3de] rounded-xl p-3 text-xs text-[#1a1c19] focus:outline-none"
            />
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
              <Plus className="w-3.5 h-3.5 text-[#d7e7d4]" />
              Publish Live Offer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
