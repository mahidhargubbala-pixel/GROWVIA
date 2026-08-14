import React, { useState } from 'react';
import { Opportunity, Review } from '../../types';
import { X, Star, ShieldCheck, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReviewModalProps {
  opportunity: Opportunity | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: Partial<Review>) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  opportunity,
  isOpen,
  onClose,
  onSubmitReview
}) => {
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [isVerified, setIsVerified] = useState(true);

  if (!isOpen || !opportunity) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    onSubmitReview({
      author: 'Sarah Miller',
      authorRole: 'Verified Client',
      rating,
      date: 'Just now',
      content,
      isVerifiedInteraction: isVerified
    });

    confetti({ particleCount: 60, spread: 70 });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl border border-[#e3e3de] max-w-md w-full p-6 shadow-card-hover relative space-y-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#747872] hover:text-[#1a1c19] rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#516051] bg-[#d7e7d4] px-2.5 py-0.5 rounded-full mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified Review
          </div>
          <h2 className="text-xl font-bold text-[#1a1c19]">Leave a Verified Review</h2>
          <p className="text-xs text-[#5f5e5e] mt-0.5">
            Share your experience for "{opportunity.title}".
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#1a1c19] mb-1.5">
              Rating
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 text-[#516051] focus:outline-none"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= rating ? 'fill-[#516051] text-[#516051]' : 'text-[#e3e3de]'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-bold text-[#1a1c19] ml-2">{rating}.0 / 5.0</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1a1c19] mb-1">
              Your Review / Feedback
            </label>
            <textarea
              rows={4}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Describe the quality of service, communication, timeliness, and outcome..."
              className="w-full bg-[#fafaf4] border border-[#e3e3de] rounded-xl p-3 text-xs text-[#1a1c19] focus:outline-none focus:border-[#1a1c19]"
            />
          </div>

          <div className="p-3 bg-[#f4f4ef] rounded-xl flex items-center justify-between text-xs">
            <span className="text-[#434842] flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#516051]" />
              Attach Verified Interaction Proof
            </span>
            <input
              type="checkbox"
              checked={isVerified}
              onChange={(e) => setIsVerified(e.target.checked)}
              className="w-4 h-4 rounded text-[#516051] accent-[#516051]"
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
              className="bg-[#1a1c19] text-white hover:bg-[#2f312e] text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5 text-[#d7e7d4]" />
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
