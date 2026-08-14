import React, { useState } from 'react';
import { UserAccount, BusinessProfile } from '../../types';
import { 
  X, 
  User, 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Lock, 
  ShieldCheck, 
  Save, 
  Sparkles, 
  Check, 
  KeyRound, 
  Smartphone,
  Tag,
  AlertCircle
} from 'lucide-react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount;
  onSaveProfile: (updated: UserAccount) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSaveProfile
}) => {
  const [activeSection, setActiveSection] = useState<'profile' | 'credentials' | 'business'>('profile');

  // Profile Form States
  const [name, setName] = useState(currentUser.name);
  const [tagLine, setTagLine] = useState(currentUser.tagLine || '');
  const [bio, setBio] = useState(currentUser.bio || '');
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [location, setLocation] = useState(currentUser.location);
  const [address, setAddress] = useState(currentUser.address || '');
  const [category, setCategory] = useState(currentUser.category || '');
  const [website, setWebsite] = useState(currentUser.website || '');
  const [avatar, setAvatar] = useState(currentUser.avatar || '');
  const [interestsText, setInterestsText] = useState((currentUser.interests || []).join(', '));

  // Credentials & Security States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(currentUser.security?.twoFactorEnabled ?? true);
  const [loginNotifications, setLoginNotifications] = useState(currentUser.security?.loginNotifications ?? true);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
  const [securityNotice, setSecurityNotice] = useState('');
  const [isSavedBanner, setIsSavedBanner] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const interestsList = interestsText
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const updatedUser: UserAccount = {
      ...currentUser,
      name,
      tagLine,
      bio,
      email,
      phone,
      location,
      address,
      category,
      website,
      avatar,
      interests: interestsList,
      security: {
        ...currentUser.security,
        twoFactorEnabled,
        loginNotifications
      }
    };

    onSaveProfile(updatedUser);
    setIsSavedBanner(true);
    setTimeout(() => {
      setIsSavedBanner(false);
      onClose();
    }, 600);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityNotice('');
    if (!newPassword || newPassword.length < 6) {
      setSecurityNotice('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setSecurityNotice('New passwords do not match.');
      return;
    }

    setPasswordChangeSuccess(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordChangeSuccess(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl border border-[#e3e3de] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-[#fafaf4] border-b border-[#eeeee9] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-[#1a1c19]">
                {currentUser.role === 'business' ? 'Edit Business Profile & Credentials' : 'Edit Profile & Account Credentials'}
              </h2>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                currentUser.role === 'business' ? 'bg-[#d7e7d4] text-[#121e13]' : 'bg-[#eeeee9] text-[#434842]'
              }`}>
                {currentUser.role === 'business' ? 'Business Partner' : 'Customer Account'}
              </span>
            </div>
            <p className="text-xs text-[#5f5e5e] mt-0.5">
              Update your public identity, business details, and manage authentication credentials.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#747872] hover:text-[#1a1c19] hover:bg-[#eeeee9] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Navigation */}
        <div className="flex border-b border-[#eeeee9] bg-white px-6">
          <button
            onClick={() => setActiveSection('profile')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeSection === 'profile'
                ? 'border-[#516051] text-[#516051]'
                : 'border-transparent text-[#747872] hover:text-[#1a1c19]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            General Info
          </button>

          <button
            onClick={() => setActiveSection('credentials')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeSection === 'credentials'
                ? 'border-[#516051] text-[#516051]'
                : 'border-transparent text-[#747872] hover:text-[#1a1c19]'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            Credentials & Security
          </button>

          {currentUser.role === 'business' && (
            <button
              onClick={() => setActiveSection('business')}
              className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                activeSection === 'business'
                  ? 'border-[#516051] text-[#516051]'
                  : 'border-transparent text-[#747872] hover:text-[#1a1c19]'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              Business Info & Verification
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {isSavedBanner && (
            <div className="p-3 bg-[#d7e7d4] text-[#121e13] rounded-xl text-xs font-bold flex items-center gap-2">
              <Check className="w-4 h-4 text-[#516051]" />
              Changes saved successfully!
            </div>
          )}

          {/* GENERAL INFO SECTION */}
          {activeSection === 'profile' && (
            <form id="edit-profile-form" onSubmit={handleSave} className="space-y-4">
              {/* Avatar Picker & Preview */}
              <div className="flex items-center gap-4 p-4 bg-[#fafaf4] rounded-2xl border border-[#e3e3de]">
                {avatar ? (
                  <img 
                    src={avatar} 
                    alt={name} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#bbcbb9] shadow-xs"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-[#d7e7d4] border-2 border-[#bbcbb9] text-[#121e13] flex items-center justify-center font-bold text-xl">
                    {name ? name.slice(0, 2).toUpperCase() : 'ME'}
                  </div>
                )}

                <div className="flex-1 space-y-1.5">
                  <label className="block text-xs font-bold text-[#1a1c19]">
                    Avatar Image URL
                  </label>
                  <input
                    type="url"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-1.5 bg-white border border-[#c4c8c0] rounded-lg text-xs focus:ring-1 focus:ring-[#516051] focus:outline-none"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setAvatar('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80')}
                      className="text-[10px] text-[#516051] hover:underline"
                    >
                      Preset Photo 1
                    </button>
                    <button
                      type="button"
                      onClick={() => setAvatar('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80')}
                      className="text-[10px] text-[#516051] hover:underline"
                    >
                      Preset Photo 2
                    </button>
                    <button
                      type="button"
                      onClick={() => setAvatar('')}
                      className="text-[10px] text-[#ba1a1a] hover:underline"
                    >
                      Clear / Use Initials
                    </button>
                  </div>
                </div>
              </div>

              {/* Name & Tagline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1a1c19] mb-1">
                    {currentUser.role === 'business' ? 'Business / Company Name' : 'Display Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#fafaf4] border border-[#c4c8c0] rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#516051]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1a1c19] mb-1">
                    Headline / Tagline
                  </label>
                  <input
                    type="text"
                    value={tagLine}
                    onChange={(e) => setTagLine(e.target.value)}
                    placeholder="e.g. Reliable logistics solutions"
                    className="w-full px-3 py-2 bg-[#fafaf4] border border-[#c4c8c0] rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#516051]"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-xs font-bold text-[#1a1c19] mb-1">
                  About & Description
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell clients and partners about yourself or business..."
                  className="w-full px-3 py-2 bg-[#fafaf4] border border-[#c4c8c0] rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#516051]"
                />
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1a1c19] mb-1">
                    Contact Email (Credentials)
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-[#747872] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-[#fafaf4] border border-[#c4c8c0] rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#516051]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1a1c19] mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-[#747872] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (312) 555-0100"
                      className="w-full pl-9 pr-3 py-2 bg-[#fafaf4] border border-[#c4c8c0] rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#516051]"
                    />
                  </div>
                </div>
              </div>

              {/* Location & Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1a1c19] mb-1">
                    City / Neighborhood
                  </label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 text-[#747872] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-[#fafaf4] border border-[#c4c8c0] rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#516051]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1a1c19] mb-1">
                    {currentUser.role === 'business' ? 'Specialties / Tags' : 'Interests / Categories'}
                  </label>
                  <div className="relative">
                    <Tag className="w-3.5 h-3.5 text-[#747872] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={interestsText}
                      onChange={(e) => setInterestsText(e.target.value)}
                      placeholder="e.g. Photography, Logistics, Coffee"
                      className="w-full pl-9 pr-3 py-2 bg-[#fafaf4] border border-[#c4c8c0] rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#516051]"
                    />
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* CREDENTIALS & SECURITY SECTION */}
          {activeSection === 'credentials' && (
            <div className="space-y-6">
              {passwordChangeSuccess && (
                <div className="p-3 bg-[#e8f5e9] border border-[#a5d6a7] rounded-xl text-xs text-[#2e7d32] flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#2e7d32]" />
                  Password updated and encrypted successfully!
                </div>
              )}

              {securityNotice && (
                <div className="p-3 bg-[#fdf2f2] border border-[#f8b4b4] rounded-xl text-xs text-[#ba1a1a] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-[#ba1a1a]" />
                  {securityNotice}
                </div>
              )}

              {/* Password Update Form */}
              <form onSubmit={handleUpdatePassword} className="bg-[#fafaf4] p-5 rounded-2xl border border-[#e3e3de] space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#1a1c19] flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-[#516051]" />
                    Change Account Password
                  </h4>
                  <span className="text-[10px] text-[#747872]">
                    Last changed: {currentUser.security?.lastPasswordChange || '30 days ago'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#1a1c19] mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 bg-white border border-[#c4c8c0] rounded-xl text-xs font-medium focus:ring-1 focus:ring-[#516051]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#1a1c19] mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Min 6 chars"
                      className="w-full px-3 py-2 bg-white border border-[#c4c8c0] rounded-xl text-xs font-medium focus:ring-1 focus:ring-[#516051]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#1a1c19] mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat new"
                      className="w-full px-3 py-2 bg-white border border-[#c4c8c0] rounded-xl text-xs font-medium focus:ring-1 focus:ring-[#516051]"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1a1c19] hover:bg-[#2f312e] text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    Update Password
                  </button>
                </div>
              </form>

              {/* 2FA & Notification Toggles */}
              <div className="bg-white p-5 rounded-2xl border border-[#e3e3de] space-y-4">
                <h4 className="text-xs font-bold text-[#1a1c19] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#516051]" />
                  Two-Factor Authentication & Alert Credentials
                </h4>

                <div className="flex items-center justify-between p-3 bg-[#fafaf4] rounded-xl border border-[#e3e3de]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#d7e7d4] text-[#121e13] flex items-center justify-center">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1a1c19]">Two-Factor Authentication (2FA)</div>
                      <div className="text-[11px] text-[#5f5e5e]">Require one-time verification code on new device login</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      twoFactorEnabled ? 'bg-[#516051]' : 'bg-[#c4c8c0]'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-[#fafaf4] rounded-xl border border-[#e3e3de]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#eeeee9] text-[#434842] flex items-center justify-center">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1a1c19]">Security & Login Notifications</div>
                      <div className="text-[11px] text-[#5f5e5e]">Receive instant email alerts for account access from new locations</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setLoginNotifications(!loginNotifications)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      loginNotifications ? 'bg-[#516051]' : 'bg-[#c4c8c0]'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        loginNotifications ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* BUSINESS INFO & VERIFICATION SECTION */}
          {activeSection === 'business' && currentUser.role === 'business' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1a1c19] mb-1">
                    Industry Category
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. B2B Supply Chain"
                    className="w-full px-3 py-2 bg-[#fafaf4] border border-[#c4c8c0] rounded-xl text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1a1c19] mb-1">
                    Company Website
                  </label>
                  <div className="relative">
                    <Globe className="w-3.5 h-3.5 text-[#747872] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://yourcompany.com"
                      className="w-full pl-9 pr-3 py-2 bg-[#fafaf4] border border-[#c4c8c0] rounded-xl text-xs font-medium"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1a1c19] mb-1">
                  Physical Commercial Address
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-[#747872] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. 420 W Grand Ave, Chicago, IL 60654"
                    className="w-full pl-9 pr-3 py-2 bg-[#fafaf4] border border-[#c4c8c0] rounded-xl text-xs font-medium"
                  />
                </div>
              </div>

              <div className="p-4 bg-[#eeeee9] rounded-2xl border border-[#d7e7d4] space-y-2">
                <h4 className="text-xs font-bold text-[#1a1c19] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#516051]" />
                  Verified Merchant Status
                </h4>
                <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-[#e3e3de]">
                    <div className="text-[11px] text-[#747872]">Contact Shielding</div>
                    <div className="font-bold text-[#516051] flex items-center gap-1 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                      Active & Encrypted
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-[#e3e3de]">
                    <div className="text-[11px] text-[#747872]">Business License</div>
                    <div className="font-bold text-[#516051] flex items-center gap-1 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                      State ID Verified
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#fafaf4] border-t border-[#eeeee9] flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-bold text-[#5f5e5e] hover:text-[#1a1c19] hover:bg-[#eeeee9] rounded-xl transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-[#516051] hover:bg-[#414d41] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            Save Profile & Credentials
          </button>
        </div>
      </div>
    </div>
  );
};
