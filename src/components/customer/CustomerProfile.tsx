import React, { useState } from 'react';
import { UserAccount } from '../../types';
import { 
  User, 
  ShieldCheck, 
  FileText, 
  Star, 
  Bookmark, 
  Briefcase, 
  Settings, 
  Check, 
  Edit3, 
  Mail, 
  Phone, 
  MapPin, 
  KeyRound, 
  Lock,
  Smartphone
} from 'lucide-react';

interface CustomerProfileProps {
  currentUser: UserAccount;
  onOpenEditModal: () => void;
  onSwitchToBusiness: () => void;
}

export const CustomerProfile: React.FC<CustomerProfileProps> = ({
  currentUser,
  onOpenEditModal,
  onSwitchToBusiness
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'credentials'>('overview');

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-300">
      {/* Profile Header Banner */}
      <div className="bg-white border border-[#e3e3de] rounded-3xl p-6 sm:p-8 shadow-subtle flex flex-col sm:flex-row items-center sm:items-start gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-24 bg-gradient-to-bl from-[#d7e7d4]/30 to-transparent pointer-events-none" />

        {/* Avatar */}
        {currentUser.avatar ? (
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-[#bbcbb9] shadow-xs shrink-0"
          />
        ) : (
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#d7e7d4] border-2 border-[#bbcbb9] text-[#121e13] flex items-center justify-center font-extrabold text-2xl shrink-0">
            {currentUser.name ? currentUser.name.slice(0, 2).toUpperCase() : 'SM'}
          </div>
        )}

        {/* Profile Info */}
        <div className="flex-1 text-center sm:text-left space-y-1.5">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-[#1a1c19]">{currentUser.name}</h1>
            <span className="bg-[#d7e7d4] text-[#121e13] text-xs font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#516051]" />
              Verified Customer
            </span>
          </div>

          <p className="text-xs text-[#5f5e5e] flex items-center justify-center sm:justify-start gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#747872]" />
            <span>{currentUser.location}</span>
            <span>• Member since {currentUser.memberSince || '2024'}</span>
          </p>

          <p className="text-xs text-[#434842] pt-1 max-w-lg leading-relaxed">
            {currentUser.bio || 'Connecting with local artisans, event media teams, and sustainable goods.'}
          </p>

          {/* Interests & Categories Tags */}
          {currentUser.interests && currentUser.interests.length > 0 && (
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-2">
              {currentUser.interests.map((tag, idx) => (
                <span 
                  key={idx} 
                  className="px-2 py-0.5 bg-[#fafaf4] border border-[#e3e3de] text-[#1a1c19] text-[11px] font-medium rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={onOpenEditModal}
          className="px-4 py-2 bg-[#1a1c19] hover:bg-[#2f312e] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-colors shrink-0"
        >
          <Edit3 className="w-3.5 h-3.5" />
          Edit Profile
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#e3e3de] pb-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'overview'
              ? 'bg-[#1a1c19] text-white'
              : 'text-[#5f5e5e] hover:bg-[#eeeee9]'
          }`}
        >
          Activity & Badges
        </button>
        <button
          onClick={() => setActiveTab('credentials')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'credentials'
              ? 'bg-[#1a1c19] text-white'
              : 'text-[#5f5e5e] hover:bg-[#eeeee9]'
          }`}
        >
          Credentials & Login Security
        </button>
      </div>

      {activeTab === 'overview' ? (
        <>
          {/* Activity Summary Bento */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white border border-[#e3e3de] rounded-2xl p-4 text-center shadow-subtle">
              <div className="w-8 h-8 rounded-lg bg-[#eeeee9] text-[#516051] flex items-center justify-center mx-auto mb-1">
                <FileText className="w-4 h-4" />
              </div>
              <div className="text-xl font-bold text-[#1a1c19]">4</div>
              <div className="text-[11px] text-[#747872]">Requests Created</div>
            </div>

            <div className="bg-white border border-[#e3e3de] rounded-2xl p-4 text-center shadow-subtle">
              <div className="w-8 h-8 rounded-lg bg-[#d7e7d4] text-[#516051] flex items-center justify-center mx-auto mb-1">
                <Star className="w-4 h-4" />
              </div>
              <div className="text-xl font-bold text-[#1a1c19]">6</div>
              <div className="text-[11px] text-[#747872]">Verified Reviews</div>
            </div>

            <div className="bg-white border border-[#e3e3de] rounded-2xl p-4 text-center shadow-subtle">
              <div className="w-8 h-8 rounded-lg bg-[#eeeee9] text-[#516051] flex items-center justify-center mx-auto mb-1">
                <Bookmark className="w-4 h-4" />
              </div>
              <div className="text-xl font-bold text-[#1a1c19]">5</div>
              <div className="text-[11px] text-[#747872]">Saved Places</div>
            </div>
          </div>

          {/* Switch to Business Hub Card */}
          <div className="bg-[#eeeee9] border border-[#d7e7d4] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-[#1a1c19] flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#516051]" />
                Are you a local business owner or creator?
              </h2>
              <p className="text-xs text-[#5f5e5e] mt-1">
                Switch to the Business Growth Hub to discover client leads, connect with non-competing partners, and run growth experiments.
              </p>
            </div>

            <button
              onClick={onSwitchToBusiness}
              className="bg-[#1a1c19] hover:bg-[#2f312e] text-white text-xs font-bold px-5 py-2.5 rounded-xl whitespace-nowrap transition-colors shrink-0"
            >
              Open Business Growth Hub
            </button>
          </div>

          {/* Trust & Verification Rules */}
          <div className="bg-white border border-[#e3e3de] rounded-2xl p-6 shadow-subtle space-y-3">
            <h3 className="text-sm font-bold text-[#1a1c19]">Trust & Security Protection</h3>
            <ul className="space-y-2 text-xs text-[#434842]">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#516051]" />
                <span>Direct contact is shielded until you explicitly accept a connection request.</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#516051]" />
                <span>All reviews require verified interaction logs to prevent fake sentiment.</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#516051]" />
                <span>Zero automated cold ad spam — only high-intent contextual matchmaking.</span>
              </li>
            </ul>
          </div>
        </>
      ) : (
        /* Credentials & Security Tab */
        <div className="bg-white border border-[#e3e3de] rounded-2xl p-6 shadow-subtle space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#1a1c19]">Account Credentials & Sign-In Info</h3>
              <p className="text-xs text-[#5f5e5e]">Keep your personal credentials and two-factor access up to date.</p>
            </div>
            <button
              onClick={onOpenEditModal}
              className="px-3.5 py-1.5 bg-[#1a1c19] text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
            >
              <KeyRound className="w-3.5 h-3.5" />
              Update Credentials
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-[#fafaf4] rounded-xl border border-[#e3e3de] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#747872]" />
                <div>
                  <div className="text-[11px] text-[#747872]">Primary Sign-In Email</div>
                  <div className="font-semibold text-[#1a1c19]">{currentUser.email}</div>
                </div>
              </div>
              <span className="text-[10px] bg-[#d7e7d4] text-[#121e13] font-bold px-2 py-0.5 rounded">
                Verified
              </span>
            </div>

            <div className="p-3 bg-[#fafaf4] rounded-xl border border-[#e3e3de] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#747872]" />
                <div>
                  <div className="text-[11px] text-[#747872]">Contact Mobile</div>
                  <div className="font-semibold text-[#1a1c19]">{currentUser.phone || 'Not added'}</div>
                </div>
              </div>
              <span className="text-[10px] text-[#516051] font-semibold">Shielded</span>
            </div>

            <div className="p-3 bg-[#fafaf4] rounded-xl border border-[#e3e3de] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Lock className="w-4 h-4 text-[#747872]" />
                <div>
                  <div className="text-[11px] text-[#747872]">Account Password</div>
                  <div className="font-semibold text-[#1a1c19]">••••••••••••</div>
                </div>
              </div>
              <span className="text-[10px] text-[#747872]">
                Updated {currentUser.security?.lastPasswordChange || '14 days ago'}
              </span>
            </div>

            <div className="p-3 bg-[#fafaf4] rounded-xl border border-[#e3e3de] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Smartphone className="w-4 h-4 text-[#747872]" />
                <div>
                  <div className="text-[11px] text-[#747872]">2-Factor Authentication</div>
                  <div className="font-semibold text-[#1a1c19]">
                    {currentUser.security?.twoFactorEnabled ? 'Active (SMS Protection)' : 'Disabled'}
                  </div>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                currentUser.security?.twoFactorEnabled ? 'bg-[#d7e7d4] text-[#121e13]' : 'bg-[#eeeee9] text-[#747872]'
              }`}>
                {currentUser.security?.twoFactorEnabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
