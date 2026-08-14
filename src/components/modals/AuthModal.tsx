import React, { useState } from 'react';
import { UserRole, UserAccount } from '../../types';
import { GrowviaLogo } from '../GrowviaLogo';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Building2, 
  MapPin, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  KeyRound,
  Users
} from 'lucide-react';
import { DEMO_ACCOUNTS } from '../../data/mockData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup' | 'demo';
  initialRole?: UserRole;
  onLoginSuccess: (user: UserAccount) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signin',
  initialRole = 'business',
  onLoginSuccess
}) => {
  const [tab, setTab] = useState<'signin' | 'signup' | 'demo'>(initialMode);
  const [role, setRole] = useState<UserRole>(initialRole);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordSent, setForgotPasswordSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Sign In Form State
  const [signInEmail, setSignInEmail] = useState('sarah.miller@growvia.network');
  const [signInPassword, setSignInPassword] = useState('••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  // Sign Up Form State
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpCategory, setSignUpCategory] = useState('');
  const [signUpLocation, setSignUpLocation] = useState('Chicago, IL');
  const [agreeTerms, setAgreeTerms] = useState(true);

  if (!isOpen) return null;

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      // Check if matches any demo account
      const matched = DEMO_ACCOUNTS.find(
        acc => acc.email.toLowerCase() === signInEmail.trim().toLowerCase()
      );

      if (matched) {
        onLoginSuccess(matched);
        onClose();
      } else {
        // Create authenticated user on the fly
        const customUser: UserAccount = {
          id: `usr_${Date.now()}`,
          role: role,
          name: signInEmail.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
          email: signInEmail,
          phone: '+1 (312) 555-0100',
          avatar: '',
          tagLine: role === 'business' ? 'Verified Local Partner' : 'Community Member',
          bio: 'Active member on the Growvia network.',
          location: 'Chicago, IL',
          isVerified: true,
          memberSince: 'Just now',
          security: {
            twoFactorEnabled: false,
            lastPasswordChange: 'Just now',
            loginNotifications: true
          }
        };
        onLoginSuccess(customUser);
        onClose();
      }
    }, 600);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpName || !signUpEmail || !signUpPassword) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const newUser: UserAccount = {
        id: `usr_${Date.now()}`,
        role: role,
        name: signUpName,
        email: signUpEmail,
        phone: '+1 (312) 555-0199',
        tagLine: role === 'business' ? `Professional ${signUpCategory || 'Services'}` : 'Local Explorer',
        bio: role === 'business' 
          ? `Local verified business providing ${signUpCategory || 'custom services'} in ${signUpLocation}.`
          : `Looking for local services and providers in ${signUpLocation}.`,
        location: signUpLocation,
        category: signUpCategory || (role === 'business' ? 'General Services' : 'General'),
        isVerified: true,
        memberSince: 'Today',
        interests: [signUpCategory || 'Local Services'],
        security: {
          twoFactorEnabled: false,
          lastPasswordChange: 'Today',
          loginNotifications: true
        }
      };

      onLoginSuccess(newUser);
      onClose();
    }, 700);
  };

  const handleSelectDemoAccount = (acc: UserAccount) => {
    onLoginSuccess(acc);
    onClose();
  };

  const handleForgotPassword = () => {
    if (!signInEmail) {
      setErrorMsg('Enter your email address above first.');
      return;
    }
    setForgotPasswordSent(true);
    setTimeout(() => setForgotPasswordSent(false), 5000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-[#e3e3de] overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-b from-[#fafaf4] to-white border-b border-[#eeeee9] relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-[#747872] hover:text-[#1a1c19] hover:bg-[#eeeee9] rounded-full transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-3">
            <GrowviaLogo size="sm" showText={true} />
            <span className="text-[11px] font-bold text-[#516051] bg-[#d7e7d4] px-2.5 py-0.5 rounded-full">
              Authentication & Credentials
            </span>
          </div>

          <h2 className="text-xl font-bold text-[#1a1c19]">
            {tab === 'signin' && 'Welcome Back to Growvia'}
            {tab === 'signup' && 'Create Your Growvia Account'}
            {tab === 'demo' && 'Quick Switch Demo Credentials'}
          </h2>
          <p className="text-xs text-[#5f5e5e] mt-1">
            {tab === 'signin' && 'Sign in to access your business dashboard, local leads, and verified messages.'}
            {tab === 'signup' && 'Join the trusted local commerce network for high-intent connections.'}
            {tab === 'demo' && 'Test the platform instantly with preloaded verified profiles.'}
          </p>

          {/* Mode Switch Tabs */}
          <div className="flex bg-[#eeeee9] p-1 rounded-xl mt-4 border border-[#e3e3de]">
            <button
              onClick={() => { setTab('signin'); setErrorMsg(''); }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                tab === 'signin' ? 'bg-[#1a1c19] text-white shadow-xs' : 'text-[#5f5e5e] hover:text-[#1a1c19]'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setTab('signup'); setErrorMsg(''); }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                tab === 'signup' ? 'bg-[#1a1c19] text-white shadow-xs' : 'text-[#5f5e5e] hover:text-[#1a1c19]'
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => { setTab('demo'); setErrorMsg(''); }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 ${
                tab === 'demo' ? 'bg-[#516051] text-white shadow-xs' : 'text-[#516051] hover:text-[#1a1c19]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Demo Roles
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {errorMsg && (
            <div className="p-3 bg-[#fdf2f2] border border-[#f8b4b4] rounded-xl text-xs text-[#ba1a1a] flex items-center gap-2">
              <span className="font-bold">Error:</span> {errorMsg}
            </div>
          )}

          {forgotPasswordSent && (
            <div className="p-3 bg-[#e8f5e9] border border-[#a5d6a7] rounded-xl text-xs text-[#2e7d32] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Password recovery instructions sent to <b>{signInEmail}</b>.</span>
            </div>
          )}

          {/* SIGN IN VIEW */}
          {tab === 'signin' && (
            <form onSubmit={handleSignInSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1a1c19] mb-1.5">
                  Email Address / Username
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#747872] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-[#fafaf4] border border-[#c4c8c0] rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#516051] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-[#1a1c19]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-[11px] font-semibold text-[#516051] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#747872] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 bg-[#fafaf4] border border-[#c4c8c0] rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#516051] focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#747872] hover:text-[#1a1c19]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-[#516051] focus:ring-[#516051]"
                  />
                  <span className="text-[#5f5e5e]">Remember this browser</span>
                </label>
                <span className="text-[11px] text-[#747872] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#516051]" />
                  256-Bit Encrypted
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#1a1c19] hover:bg-[#2f312e] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Sign In to Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-2 text-center">
                <p className="text-xs text-[#5f5e5e]">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setTab('signup')}
                    className="text-[#516051] font-bold hover:underline"
                  >
                    Create one now
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* SIGN UP VIEW */}
          {tab === 'signup' && (
            <form onSubmit={handleSignUpSubmit} className="space-y-4">
              {/* Role Selection */}
              <div>
                <label className="block text-xs font-bold text-[#1a1c19] mb-1.5">
                  I want to use Growvia as:
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setRole('business')}
                    className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                      role === 'business'
                        ? 'border-[#516051] bg-[#d7e7d4]/30 ring-1 ring-[#516051]'
                        : 'border-[#c4c8c0] hover:bg-[#fafaf4]'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-[#516051] mt-0.5 shrink-0" />
                    <div>
                      <div className="font-bold text-xs text-[#1a1c19]">Business & Pro</div>
                      <div className="text-[10px] text-[#5f5e5e] leading-tight">Find client leads & partner</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole('customer')}
                    className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                      role === 'customer'
                        ? 'border-[#516051] bg-[#d7e7d4]/30 ring-1 ring-[#516051]'
                        : 'border-[#c4c8c0] hover:bg-[#fafaf4]'
                    }`}
                  >
                    <Users className="w-4 h-4 text-[#516051] mt-0.5 shrink-0" />
                    <div>
                      <div className="font-bold text-xs text-[#1a1c19]">Customer / Seeker</div>
                      <div className="text-[10px] text-[#5f5e5e] leading-tight">Post needs & hire pros</div>
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1a1c19] mb-1.5">
                  {role === 'business' ? 'Business / Company Name' : 'Full Name'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#747872] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    placeholder={role === 'business' ? 'e.g. Apex Studio & Media' : 'e.g. Alex Morgan'}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-[#fafaf4] border border-[#c4c8c0] rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#516051] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#1a1c19] mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#747872] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-[#fafaf4] border border-[#c4c8c0] rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#516051] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1a1c19] mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#747872] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      placeholder="Min 8 characters"
                      className="w-full pl-10 pr-9 py-2.5 bg-[#fafaf4] border border-[#c4c8c0] rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#516051] focus:border-transparent transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#747872]"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#1a1c19] mb-1.5">
                    {role === 'business' ? 'Industry Category' : 'Primary Interest'}
                  </label>
                  <input
                    type="text"
                    value={signUpCategory}
                    onChange={(e) => setSignUpCategory(e.target.value)}
                    placeholder={role === 'business' ? 'e.g. Specialty Coffee, Photography' : 'e.g. Artisans, Events'}
                    className="w-full px-3.5 py-2.5 bg-[#fafaf4] border border-[#c4c8c0] rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#516051] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1a1c19] mb-1.5">
                    Location / City
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#747872] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={signUpLocation}
                      onChange={(e) => setSignUpLocation(e.target.value)}
                      placeholder="e.g. Chicago, IL"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-[#fafaf4] border border-[#c4c8c0] rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#516051] focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              <label className="flex items-start gap-2 cursor-pointer text-xs pt-1 select-none">
                <input
                  type="checkbox"
                  required
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="rounded text-[#516051] focus:ring-[#516051] mt-0.5"
                />
                <span className="text-[#5f5e5e] text-[11px]">
                  I agree to the Growvia Verified Commerce Terms, Contact Shielding Policy, and Anti-Spam standards.
                </span>
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#516051] hover:bg-[#414d41] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Setting Up Account...</span>
                ) : (
                  <>
                    <span>Create Free Growvia Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-1 text-center">
                <p className="text-xs text-[#5f5e5e]">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setTab('signin')}
                    className="text-[#516051] font-bold hover:underline"
                  >
                    Sign In instead
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* DEMO PROFILES VIEW */}
          {tab === 'demo' && (
            <div className="space-y-3">
              <div className="bg-[#d7e7d4]/40 p-3 rounded-xl border border-[#bbcbb9] text-xs text-[#121e13]">
                <p className="font-semibold flex items-center gap-1.5">
                  <KeyRound className="w-4 h-4 text-[#516051]" />
                  Instant One-Click Login Roles
                </p>
                <p className="text-[11px] text-[#434842] mt-0.5">
                  Click any verified test account below to authenticate immediately and test either Business Growth Hub or Customer Seekers.
                </p>
              </div>

              <div className="space-y-2.5 pt-1">
                {DEMO_ACCOUNTS.map((acc) => (
                  <button
                    key={acc.id}
                    onClick={() => handleSelectDemoAccount(acc)}
                    className="w-full p-3.5 bg-[#fafaf4] hover:bg-[#f4f4ef] border border-[#e3e3de] hover:border-[#516051] rounded-2xl text-left flex items-center justify-between gap-3 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      {acc.avatar ? (
                        <img 
                          src={acc.avatar} 
                          alt={acc.name} 
                          className="w-10 h-10 rounded-full object-cover border border-[#c4c8c0]"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#d7e7d4] text-[#121e13] font-extrabold flex items-center justify-center text-xs">
                          {acc.name.slice(0, 2).toUpperCase()}
                        </div>
                      )}

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-[#1a1c19] group-hover:text-[#516051] transition-colors">
                            {acc.name}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            acc.role === 'business' 
                              ? 'bg-[#d7e7d4] text-[#121e13]' 
                              : 'bg-[#eeeee9] text-[#434842]'
                          }`}>
                            {acc.role === 'business' ? 'Business' : 'Customer'}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#5f5e5e]">{acc.email}</div>
                        <div className="text-[10px] text-[#747872]">{acc.tagLine}</div>
                      </div>
                    </div>

                    <div className="shrink-0 text-xs font-bold text-[#516051] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>Select</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
