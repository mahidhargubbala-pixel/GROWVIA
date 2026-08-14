import React, { useState } from 'react';
import { Conversation, Message, UserRole } from '../../types';
import { X, Send, ShieldCheck, CheckCheck, Paperclip, Sparkles } from 'lucide-react';

interface MessagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  conversations: Conversation[];
  activeConversationId?: string;
  userRole: UserRole;
  onSendMessage: (conversationId: string, text: string) => void;
}

export const MessagesModal: React.FC<MessagesModalProps> = ({
  isOpen,
  onClose,
  conversations,
  activeConversationId,
  userRole,
  onSendMessage
}) => {
  const [selectedConvId, setSelectedConvId] = useState<string>(activeConversationId || conversations[0]?.id || '');
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const currentConv = conversations.find(c => c.id === selectedConvId) || conversations[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !currentConv) return;
    onSendMessage(currentConv.id, inputText.trim());
    setInputText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl border border-[#e3e3de] max-w-3xl w-full h-[600px] shadow-card-hover relative flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-[#eeeee9] flex items-center justify-between bg-[#fafaf4]">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-base text-[#1a1c19]">Messages & Negotiations</h3>
            <span className="text-[11px] font-semibold text-[#516051] bg-[#d7e7d4] px-2 py-0.5 rounded-full">
              End-to-End Contextual
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#747872] hover:text-[#1a1c19] rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Conversations List on Left, Active Thread on Right */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left: Conversations sidebar */}
          <div className="w-1/3 border-r border-[#eeeee9] overflow-y-auto bg-[#f4f4ef]/50 p-2 space-y-1 hidden sm:block">
            {conversations.map(conv => {
              const isSelected = conv.id === currentConv?.id;
              const lastMsg = conv.messages[conv.messages.length - 1];

              return (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConvId(conv.id)}
                  className={`p-3 rounded-xl cursor-pointer transition-all ${
                    isSelected ? 'bg-white shadow-subtle border border-[#516051]' : 'hover:bg-white/80 border border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#1a1c19] truncate">{conv.partnerName}</span>
                    <span className="text-[10px] text-[#747872]">{conv.lastUpdated}</span>
                  </div>
                  {conv.opportunityContext && (
                    <div className="text-[10px] font-semibold text-[#516051] truncate mb-1">
                      Ref: {conv.opportunityContext.title}
                    </div>
                  )}
                  <p className="text-[11px] text-[#5f5e5e] truncate">{lastMsg?.text || 'No messages'}</p>
                </div>
              );
            })}
          </div>

          {/* Right: Active Conversation Thread */}
          {currentConv ? (
            <div className="flex-1 flex flex-col justify-between bg-white">
              {/* Pinned Opportunity Context Card (Section 16 requirement) */}
              {currentConv.opportunityContext && (
                <div className="p-3 bg-[#f4f4ef] border-b border-[#eeeee9] flex items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="text-[10px] font-bold text-[#747872] uppercase">Opportunity Context</div>
                    <div className="font-bold text-[#1a1c19] truncate">{currentConv.opportunityContext.title}</div>
                  </div>
                  {currentConv.opportunityContext.budget && (
                    <span className="text-xs font-bold text-[#516051] bg-[#d7e7d4] px-2.5 py-1 rounded">
                      Budget: {currentConv.opportunityContext.budget}
                    </span>
                  )}
                </div>
              )}

              {/* Messages Thread */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {currentConv.messages.map(msg => {
                  const isMe = msg.senderRole === userRole;

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div className="text-[10px] text-[#747872] mb-0.5 px-1">
                        {msg.senderName} • {msg.timestamp}
                      </div>
                      <div
                        className={`p-3 rounded-2xl max-w-[80%] text-xs leading-relaxed ${
                          isMe
                            ? 'bg-[#1a1c19] text-white rounded-tr-none'
                            : 'bg-[#eeeee9] text-[#1a1c19] rounded-tl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSend} className="p-3 border-t border-[#eeeee9] flex items-center gap-2 bg-[#fafaf4]">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type a message, quote, or schedule details..."
                  className="flex-1 bg-white border border-[#e3e3de] rounded-xl px-4 py-2.5 text-xs text-[#1a1c19] focus:outline-none focus:border-[#1a1c19]"
                />
                <button
                  type="submit"
                  className="bg-[#1a1c19] hover:bg-[#2f312e] text-white p-2.5 rounded-xl transition-colors shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-xs text-[#747872]">
              Select a conversation to begin messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
