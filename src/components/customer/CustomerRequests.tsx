import React, { useState } from 'react';
import { Opportunity, OpportunityLifecycle, BusinessProfile } from '../../types';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  DollarSign, 
  PlusCircle, 
  MessageSquare, 
  Star, 
  ChevronRight, 
  Check, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CustomerRequestsProps {
  requests: Opportunity[];
  businesses: BusinessProfile[];
  onCreateRequest: () => void;
  onSelectRequest: (req: Opportunity) => void;
  onOpenMessageWithBusiness: (biz: BusinessProfile, req: Opportunity) => void;
  onAdvanceLifecycle: (reqId: string, nextStage: OpportunityLifecycle) => void;
  onOpenReviewModal: (req: Opportunity) => void;
}

const LIFECYCLE_STAGES: { key: OpportunityLifecycle; label: string }[] = [
  { key: 'open', label: 'Open' },
  { key: 'matching', label: 'Matching' },
  { key: 'interested', label: 'Interested' },
  { key: 'connected', label: 'Connected' },
  { key: 'in_progress', label: 'In Progress' },
  { key: 'completed', label: 'Completed' },
  { key: 'reviewed', label: 'Reviewed' }
];

export const CustomerRequests: React.FC<CustomerRequestsProps> = ({
  requests,
  businesses,
  onCreateRequest,
  onSelectRequest,
  onOpenMessageWithBusiness,
  onAdvanceLifecycle,
  onOpenReviewModal
}) => {
  const [selectedReqId, setSelectedReqId] = useState<string | null>(requests[0]?.id || null);

  const activeRequest = requests.find(r => r.id === selectedReqId) || requests[0];

  const getStageIndex = (stage: OpportunityLifecycle) => {
    return LIFECYCLE_STAGES.findIndex(s => s.key === stage);
  };

  const currentStageIndex = activeRequest ? getStageIndex(activeRequest.status) : 0;

  const handleNextStage = () => {
    if (!activeRequest) return;
    const nextIdx = currentStageIndex + 1;
    if (nextIdx < LIFECYCLE_STAGES.length) {
      const nextStage = LIFECYCLE_STAGES[nextIdx].key;
      onAdvanceLifecycle(activeRequest.id, nextStage);
      if (nextStage === 'completed' || nextStage === 'reviewed') {
        confetti({ particleCount: 50, spread: 60 });
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1c19] tracking-tight">My Active Requests</h1>
          <p className="text-xs text-[#5f5e5e] mt-0.5">
            Track your requirements through the 7-stage opportunity lifecycle from match to completion.
          </p>
        </div>

        <button
          onClick={onCreateRequest}
          className="bg-[#1a1c19] hover:bg-[#2f312e] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          <PlusCircle className="w-4 h-4 text-[#d7e7d4]" />
          Create New Request
        </button>
      </div>

      {requests.length === 0 ? (
        <div className="bg-white border border-[#e3e3de] rounded-2xl p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#d7e7d4] text-[#516051] flex items-center justify-center mx-auto">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#1a1c19]">No requests posted yet</h3>
          <p className="text-xs text-[#5f5e5e] max-w-sm mx-auto">
            Create your first request (e.g. event photography, catering, equipment logistics) to get matched with verified local businesses.
          </p>
          <button
            onClick={onCreateRequest}
            className="bg-[#1a1c19] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#2f312e]"
          >
            Post a Requirement
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: List of Requests */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold text-[#747872] uppercase tracking-wider">Your Requests ({requests.length})</h2>
            {requests.map(req => {
              const isSelected = req.id === activeRequest?.id;
              return (
                <div
                  key={req.id}
                  onClick={() => setSelectedReqId(req.id)}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#fafaf4] border-[#516051] shadow-subtle ring-1 ring-[#516051]'
                      : 'bg-white border-[#e3e3de] hover:bg-[#f4f4ef]'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-bold text-[#516051] bg-[#d7e7d4] px-2 py-0.5 rounded capitalize">
                      {req.status.replace('_', ' ')}
                    </span>
                    <span className="text-[10px] text-[#747872]">{req.createdAt}</span>
                  </div>

                  <h3 className="text-sm font-bold text-[#1a1c19] line-clamp-2 mt-1">{req.title}</h3>
                  <div className="flex items-center gap-2 text-[11px] text-[#5f5e5e] mt-1.5">
                    <span>{req.category}</span>
                    {req.budget && <span>• {req.budget}</span>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: 7-Stage Lifecycle Visualizer & Response Actions */}
          {activeRequest && (
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white border border-[#e3e3de] rounded-2xl p-6 shadow-subtle space-y-6">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-[#516051] bg-[#d7e7d4] px-2.5 py-0.5 rounded capitalize">
                      Stage: {activeRequest.status.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-[#747872]">Visibility: {activeRequest.visibility.replace('_', ' ')}</span>
                  </div>

                  <h2 className="text-xl font-bold text-[#1a1c19]">{activeRequest.title}</h2>
                  <p className="text-xs text-[#434842] mt-1">{activeRequest.description}</p>
                </div>

                {/* 7-Stage Lifecycle Stepper (Section 14) */}
                <div>
                  <h3 className="text-xs font-bold text-[#747872] uppercase tracking-wider mb-3">
                    7-Stage Opportunity Lifecycle
                  </h3>

                  {/* Stepper Bar */}
                  <div className="relative">
                    <div className="overflow-x-auto pb-2 scrollbar-hide">
                      <div className="flex items-center justify-between min-w-[540px] relative">
                        {/* Background track line */}
                        <div className="absolute top-3.5 left-4 right-4 h-0.5 bg-[#e3e3de] z-0" />
                        {/* Completed fill track */}
                        <div
                          className="absolute top-3.5 left-4 h-0.5 bg-[#516051] z-0 transition-all duration-500"
                          style={{
                            width: `${(currentStageIndex / (LIFECYCLE_STAGES.length - 1)) * 92}%`
                          }}
                        />

                        {LIFECYCLE_STAGES.map((stage, idx) => {
                          const isDone = idx < currentStageIndex;
                          const isCurrent = idx === currentStageIndex;

                          return (
                            <div
                              key={stage.key}
                              className="relative z-10 flex flex-col items-center group cursor-pointer"
                              onClick={() => onAdvanceLifecycle(activeRequest.id, stage.key)}
                            >
                              <div
                                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                  isDone
                                    ? 'bg-[#516051] text-white'
                                    : isCurrent
                                    ? 'bg-[#1a1c19] text-white ring-4 ring-[#d7e7d4]'
                                    : 'bg-white border-2 border-[#e3e3de] text-[#747872]'
                                }`}
                              >
                                {isDone ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                              </div>
                              <span
                                className={`text-[10px] mt-1.5 whitespace-nowrap font-medium ${
                                  isCurrent ? 'text-[#1a1c19] font-bold' : isDone ? 'text-[#516051]' : 'text-[#747872]'
                                }`}
                              >
                                {stage.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details & Actions */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 bg-[#fafaf4] rounded-xl border border-[#eeeee9] text-xs">
                  <div>
                    <div className="text-[#747872]">Location</div>
                    <div className="font-semibold text-[#1a1c19]">{activeRequest.location}</div>
                  </div>
                  <div>
                    <div className="text-[#747872]">Target Budget</div>
                    <div className="font-semibold text-[#1a1c19]">{activeRequest.budget || 'Flexible'}</div>
                  </div>
                  <div>
                    <div className="text-[#747872]">Date & Timing</div>
                    <div className="font-semibold text-[#1a1c19]">{activeRequest.timing || 'Immediate'}</div>
                  </div>
                </div>

                {/* Active Stage Next Action Trigger */}
                <div className="bg-[#eeeee9] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-[#1a1c19]">
                      Current Action: {activeRequest.status === 'open' ? 'Review Matched Providers' : activeRequest.status === 'matching' ? 'Connect with Matched Business' : activeRequest.status === 'connected' ? 'Coordinate Details & Execution' : activeRequest.status === 'in_progress' ? 'Service in Execution' : activeRequest.status === 'completed' ? 'Leave Verified Review' : 'Service Successfully Reviewed'}
                    </p>
                    <p className="text-[11px] text-[#5f5e5e]">
                      {activeRequest.status === 'completed'
                        ? 'Leave an honest review to build verified local reputation.'
                        : 'Move to the next step when ready.'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {activeRequest.status === 'completed' ? (
                      <button
                        onClick={() => onOpenReviewModal(activeRequest)}
                        className="bg-[#516051] text-white hover:bg-[#3c4a3d] px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5"
                      >
                        <Star className="w-3.5 h-3.5" />
                        Write Verified Review
                      </button>
                    ) : (
                      <button
                        onClick={handleNextStage}
                        className="bg-[#1a1c19] text-white hover:bg-[#2f312e] px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5"
                      >
                        <span>Advance to Next Stage</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Matched Businesses for this Request */}
                <div className="space-y-3 pt-4 border-t border-[#eeeee9]">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-[#1a1c19] uppercase tracking-wider">
                      Matched Businesses ({businesses.length > 2 ? 3 : businesses.length})
                    </h4>
                  </div>

                  <div className="space-y-2">
                    {businesses.slice(0, 3).map(biz => (
                      <div
                        key={biz.id}
                        className="p-3 bg-white border border-[#e3e3de] rounded-xl flex items-center justify-between gap-3 hover:border-[#516051] transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <img src={biz.logo} alt={biz.name} className="w-9 h-9 rounded-full object-cover border border-[#e3e3de]" />
                          <div>
                            <h5 className="text-xs font-bold text-[#1a1c19]">{biz.name}</h5>
                            <p className="text-[11px] text-[#5f5e5e]">★ {biz.rating} ({biz.reviewsCount} reviews) • {biz.location}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => onOpenMessageWithBusiness(biz, activeRequest)}
                          className="bg-[#fafaf4] hover:bg-[#eeeee9] text-[#1a1c19] border border-[#c4c8c0] text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-[#516051]" />
                          Message
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
