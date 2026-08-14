import React, { useState } from 'react';
import { UserAccount, BusinessProfile, BusinessService, BusinessOffer } from '../../types';
import { 
  Building2, 
  ShieldCheck, 
  Star, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  Edit3, 
  KeyRound, 
  Plus, 
  Tag, 
  Percent, 
  Lock, 
  CheckCircle2, 
  ExternalLink,
  MessageSquare,
  Sparkles,
  TrendingUp,
  Award
} from 'lucide-react';

interface BusinessProfileViewProps {
  currentUser: UserAccount;
  businessData: BusinessProfile;
  onOpenEditModal: () => void;
  onOpenCreateOffer: () => void;
  onUpdateServices?: (services: BusinessService[]) => void;
}

export const BusinessProfileView: React.FC<BusinessProfileViewProps> = ({
  currentUser,
  businessData,
  onOpenEditModal,
  onOpenCreateOffer,
  onUpdateServices
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'offers' | 'credentials'>('overview');

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Top Profile Card Banner */}
      <div className="bg-white border border-[#e3e3de] rounded-3xl p-6 sm:p-8 shadow-subtle relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-32 bg-gradient-to-bl from-[#d7e7d4]/30 to-transparent pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          {/* Logo / Avatar */}
          {currentUser.avatar || businessData.logo ? (
            <img 
              src={currentUser.avatar || businessData.logo} 
              alt={currentUser.name} 
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-[#bbcbb9] shadow-sm shrink-0"
            />
          ) : (
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#d7e7d4] border-2 border-[#bbcbb9] text-[#121e13] flex items-center justify-center font-black text-3xl shrink-0">
              {currentUser.name.slice(0, 2).toUpperCase()}
            </div>
          )}

          {/* Info */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1a1c19] tracking-tight">
                {currentUser.name}
              </h1>
              <span className="bg-[#d7e7d4] text-[#121e13] text-xs font-bold px-3 py-1 rounded-full inline-flex items-center gap-1.5 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#516051]" />
                Verified Business
              </span>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-[#516051]">
              {currentUser.category || businessData.category} • {currentUser.location || businessData.location}
            </p>

            <p className="text-xs text-[#5f5e5e] max-w-2xl leading-relaxed">
              {currentUser.bio || businessData.description}
            </p>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs">
              <div className="flex items-center gap-1 font-bold text-[#1a1c19]">
                <Star className="w-4 h-4 fill-[#ba1a1a] text-[#ba1a1a]" />
                <span>{businessData.rating || 4.9}</span>
                <span className="text-[#747872] font-normal">({businessData.reviewsCount || 38} reviews)</span>
              </div>

              <div className="flex items-center gap-1 text-[#516051] font-semibold">
                <Award className="w-4 h-4" />
                <span>Trust Score {businessData.trustScore || 96}%</span>
              </div>

              <div className="flex items-center gap-1 text-[#5f5e5e]">
                <MapPin className="w-3.5 h-3.5" />
                <span>{currentUser.address || businessData.address}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex sm:flex-col gap-2 shrink-0 w-full sm:w-auto">
            <button
              onClick={onOpenEditModal}
              className="flex-1 sm:flex-initial px-4 py-2.5 bg-[#1a1c19] hover:bg-[#2f312e] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit Profile
            </button>

            <button
              onClick={onOpenCreateOffer}
              className="flex-1 sm:flex-initial px-4 py-2.5 bg-[#d7e7d4] hover:bg-[#c9ddc6] text-[#121e13] text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-[#516051]" />
              New Offer
            </button>
          </div>
        </div>
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
          Profile Overview
        </button>
        <button
          onClick={() => setActiveTab('services')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'services'
              ? 'bg-[#1a1c19] text-white'
              : 'text-[#5f5e5e] hover:bg-[#eeeee9]'
          }`}
        >
          Services ({businessData.services?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab('offers')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'offers'
              ? 'bg-[#1a1c19] text-white'
              : 'text-[#5f5e5e] hover:bg-[#eeeee9]'
          }`}
        >
          Special Offers ({businessData.offers?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab('credentials')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'credentials'
              ? 'bg-[#1a1c19] text-white'
              : 'text-[#5f5e5e] hover:bg-[#eeeee9]'
          }`}
        >
          Credentials & Security
        </button>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Info Columns */}
          <div className="md:col-span-2 space-y-6">
            {/* Tagline & Story */}
            <div className="bg-white border border-[#e3e3de] rounded-2xl p-6 shadow-subtle space-y-3">
              <h3 className="text-sm font-bold text-[#1a1c19]">About {currentUser.name}</h3>
              <p className="text-xs text-[#434842] leading-relaxed">
                {currentUser.bio || businessData.description}
              </p>
              
              {currentUser.interests && currentUser.interests.length > 0 && (
                <div className="pt-2">
                  <div className="text-[11px] font-bold text-[#747872] uppercase tracking-wider mb-2">
                    Specialty & Core Competencies
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {currentUser.interests.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="px-2.5 py-1 bg-[#fafaf4] border border-[#e3e3de] text-[#1a1c19] text-xs font-medium rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Featured Services Preview */}
            <div className="bg-white border border-[#e3e3de] rounded-2xl p-6 shadow-subtle space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#1a1c19]">Core Offerings & Pricing</h3>
                <button
                  onClick={() => setActiveTab('services')}
                  className="text-xs font-bold text-[#516051] hover:underline"
                >
                  View All Services →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(businessData.services || []).map((srv) => (
                  <div key={srv.id} className="p-4 bg-[#fafaf4] border border-[#e3e3de] rounded-xl space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-xs text-[#1a1c19]">{srv.name}</span>
                      <span className="font-bold text-xs text-[#516051] shrink-0">{srv.price}</span>
                    </div>
                    <p className="text-[11px] text-[#5f5e5e]">{srv.description}</p>
                    <span className="inline-block text-[10px] bg-[#eeeee9] text-[#434842] font-semibold px-2 py-0.5 rounded">
                      {srv.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Reviews */}
            <div className="bg-white border border-[#e3e3de] rounded-2xl p-6 shadow-subtle space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#1a1c19]">Verified Client Testimonials</h3>
                  <p className="text-xs text-[#5f5e5e]">All reviews verified via completed on-platform interactions.</p>
                </div>
                <div className="flex items-center gap-1 font-bold text-sm text-[#1a1c19]">
                  <Star className="w-4 h-4 fill-[#ba1a1a] text-[#ba1a1a]" />
                  <span>{businessData.rating || 4.9} / 5.0</span>
                </div>
              </div>

              <div className="space-y-3">
                {(businessData.reviews || []).map((rev) => (
                  <div key={rev.id} className="p-4 bg-[#fafaf4] border border-[#e3e3de] rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[#1a1c19]">{rev.author}</span>
                        <span className="text-[10px] text-[#747872]">• {rev.authorRole}</span>
                      </div>
                      <span className="text-[10px] text-[#747872]">{rev.date}</span>
                    </div>
                    <p className="text-xs text-[#434842]">"{rev.content}"</p>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-[#516051]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified Match Delivery
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Contact, Verification & Credentials */}
          <div className="space-y-6">
            {/* Contact & Location Details */}
            <div className="bg-white border border-[#e3e3de] rounded-2xl p-5 shadow-subtle space-y-4">
              <h3 className="text-xs font-bold text-[#1a1c19] uppercase tracking-wider">
                Direct Contact & Credentials
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-[#747872] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-[11px] text-[#747872]">Business Email</div>
                    <div className="font-medium text-[#1a1c19]">{currentUser.email}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-[#747872] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-[11px] text-[#747872]">Phone / Dispatch</div>
                    <div className="font-medium text-[#1a1c19]">{currentUser.phone || '+1 (312) 555-0142'}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#747872] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-[11px] text-[#747872]">Commercial Facility</div>
                    <div className="font-medium text-[#1a1c19]">{currentUser.address || businessData.address}</div>
                  </div>
                </div>

                {currentUser.website && (
                  <div className="flex items-start gap-2.5">
                    <Globe className="w-4 h-4 text-[#747872] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[11px] text-[#747872]">Website</div>
                      <a href={currentUser.website} target="_blank" rel="noreferrer" className="font-medium text-[#516051] hover:underline flex items-center gap-1">
                        {currentUser.website.replace('https://', '')}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={onOpenEditModal}
                className="w-full py-2 bg-[#eeeee9] hover:bg-[#e3e3de] text-[#1a1c19] text-xs font-bold rounded-xl transition-colors"
              >
                Edit Contact Information
              </button>
            </div>

            {/* Verification Credentials Card */}
            <div className="bg-[#eeeee9] border border-[#d7e7d4] rounded-2xl p-5 space-y-3">
              <h3 className="text-xs font-bold text-[#1a1c19] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#516051]" />
                Merchant Verification Badges
              </h3>

              <div className="space-y-2 text-xs">
                <div className="bg-white p-2.5 rounded-xl border border-[#e3e3de] flex items-center justify-between">
                  <span className="text-[#434842]">Contact Shield</span>
                  <span className="font-bold text-[#516051] text-[11px]">Protected</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-[#e3e3de] flex items-center justify-between">
                  <span className="text-[#434842]">Business Registration</span>
                  <span className="font-bold text-[#516051] text-[11px]">Verified Active</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-[#e3e3de] flex items-center justify-between">
                  <span className="text-[#434842]">Two-Factor Authentication</span>
                  <span className="font-bold text-[#516051] text-[11px]">
                    {currentUser.security?.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SERVICES TAB */}
      {activeTab === 'services' && (
        <div className="bg-white border border-[#e3e3de] rounded-3xl p-6 sm:p-8 shadow-subtle space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#1a1c19]">Services Catalog & Pricing</h2>
              <p className="text-xs text-[#5f5e5e]">Customers and B2B partners match with your profile based on these listed services.</p>
            </div>
            <button
              onClick={onOpenEditModal}
              className="px-4 py-2 bg-[#1a1c19] text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Manage Services
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(businessData.services || []).map((service) => (
              <div key={service.id} className="p-5 bg-[#fafaf4] border border-[#e3e3de] rounded-2xl space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-sm text-[#1a1c19]">{service.name}</h4>
                  <span className="text-xs font-extrabold text-[#516051] bg-[#d7e7d4] px-2.5 py-1 rounded-lg">
                    {service.price}
                  </span>
                </div>
                <p className="text-xs text-[#5f5e5e]">{service.description}</p>
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-[#747872] uppercase tracking-wider bg-white px-2 py-0.5 rounded border border-[#e3e3de]">
                    Tag: {service.tag}
                  </span>
                  <span className="text-[11px] font-bold text-[#516051]">Active in Matching</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* OFFERS TAB */}
      {activeTab === 'offers' && (
        <div className="bg-white border border-[#e3e3de] rounded-3xl p-6 sm:p-8 shadow-subtle space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#1a1c19]">Active Special Offers & Promotions</h2>
              <p className="text-xs text-[#5f5e5e]">Special introductory offers and co-marketing promotions visible across Growvia.</p>
            </div>
            <button
              onClick={onOpenCreateOffer}
              className="px-4 py-2 bg-[#516051] text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Create New Promo
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(businessData.offers || []).map((offer) => (
              <div key={offer.id} className="p-5 bg-gradient-to-br from-[#fafaf4] to-[#f4f4ef] border border-[#bbcbb9] rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#121e13] bg-[#d7e7d4] px-2.5 py-1 rounded-lg">
                    {offer.discount}
                  </span>
                  <span className="text-[10px] text-[#747872]">{offer.expiry}</span>
                </div>
                <h4 className="font-bold text-sm text-[#1a1c19]">{offer.title}</h4>
                <p className="text-xs text-[#5f5e5e]">{offer.description}</p>
                <div className="pt-2 border-t border-[#e3e3de] flex items-center justify-between text-xs text-[#516051]">
                  <span>Claimed: {offer.claimedCount || 0} times</span>
                  <span className="font-bold">Live Status: Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CREDENTIALS & SECURITY TAB */}
      {activeTab === 'credentials' && (
        <div className="bg-white border border-[#e3e3de] rounded-3xl p-6 sm:p-8 shadow-subtle space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#1a1c19]">Account Credentials & Security Overview</h2>
              <p className="text-xs text-[#5f5e5e]">Manage your login credentials, passwords, and two-factor authentication.</p>
            </div>
            <button
              onClick={onOpenEditModal}
              className="px-4 py-2 bg-[#1a1c19] text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
            >
              <KeyRound className="w-3.5 h-3.5" />
              Change Password & Settings
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-[#fafaf4] border border-[#e3e3de] rounded-2xl space-y-3">
              <h4 className="font-bold text-xs text-[#1a1c19] flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#516051]" />
                Login Credentials
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-[#eeeee9]">
                  <span className="text-[#747872]">Primary Login Email:</span>
                  <span className="font-semibold text-[#1a1c19]">{currentUser.email}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#eeeee9]">
                  <span className="text-[#747872]">Account Password:</span>
                  <span className="font-semibold text-[#1a1c19]">••••••••••••</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#747872]">Last Password Change:</span>
                  <span className="font-semibold text-[#1a1c19]">{currentUser.security?.lastPasswordChange || '30 days ago'}</span>
                </div>
              </div>
            </div>

            <div className="p-5 bg-[#fafaf4] border border-[#e3e3de] rounded-2xl space-y-3">
              <h4 className="font-bold text-xs text-[#1a1c19] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#516051]" />
                Security Safeguards
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-[#eeeee9]">
                  <span className="text-[#747872]">2-Factor Authentication (2FA):</span>
                  <span className="font-bold text-[#516051]">
                    {currentUser.security?.twoFactorEnabled ? 'Active (SMS / App)' : 'Inactive'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#eeeee9]">
                  <span className="text-[#747872]">Login Alerts:</span>
                  <span className="font-semibold text-[#1a1c19]">
                    {currentUser.security?.loginNotifications ? 'Instant Email Alerts' : 'Disabled'}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#747872]">Active Sessions:</span>
                  <span className="font-semibold text-[#1a1c19]">1 Active Device (Current Browser)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
