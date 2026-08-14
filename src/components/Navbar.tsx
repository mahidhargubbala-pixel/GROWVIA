import React, { useState } from 'react';
import { GrowviaLogo } from './GrowviaLogo';
import { UserRole, BusinessTab, CustomerTab, AppNotification, UserAccount } from '../types';
import { 
  Bell, 
  MessageSquare, 
  User, 
  ChevronDown, 
  Sparkles, 
  Check, 
  ArrowRight,
  Briefcase,
  Users,
  KeyRound,
  LogOut,
  Settings,
  LogIn,
  UserPlus,
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  currentUser: UserAccount | null;
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  businessTab: BusinessTab;
  onBusinessTabChange: (tab: BusinessTab) => void;
  customerTab: CustomerTab;
  onCustomerTabChange: (tab: CustomerTab) => void;
  notifications: AppNotification[];
  onMarkNotificationRead: (id: string) => void;
  onOpenMessages: () => void;
  unreadMessagesCount: number;
  onOpenProfile: () => void;
  onOpenEditProfile: () => void;
  onOpenAuthModal: (mode?: 'signin' | 'signup' | 'demo') => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  userRole,
  onRoleChange,
  businessTab,
  onBusinessTabChange,
  customerTab,
  onCustomerTabChange,
  notifications,
  onMarkNotificationRead,
  onOpenMessages,
  unreadMessagesCount,
  onOpenProfile,
  onOpenEditProfile,
  onOpenAuthModal,
  onLogout
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const businessNavItems: { id: BusinessTab; label: string }[] = [
    { id: 'home', label: 'Hub' },
    { id: 'discover', label: 'Discover' },
    { id: 'network', label: 'Network' },
    { id: 'experiments', label: 'Tests' },
    { id: 'insights', label: 'Insights' },
    { id: 'profile', label: 'Profile' }
  ];

  const customerNavItems: { id: CustomerTab; label: string }[] = [
    { id: 'explore', label: 'Explore' },
    { id: 'requests', label: 'My Requests' },
    { id: 'saved', label: 'Saved' },
    { id: 'messages', label: 'Messages' },
    { id: 'profile', label: 'Profile' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-[#fafaf4]/95 backdrop-blur-md border-b border-[#e3e3de] px-4 md:px-8 flex items-center justify-between transition-colors">
      {/* Brand & Left Section */}
      <div className="flex items-center gap-4 sm:gap-6">
        <button 
          onClick={() => userRole === 'business' ? onBusinessTabChange('home') : onCustomerTabChange('explore')}
          className="flex items-center gap-2 focus:outline-none"
        >
          <GrowviaLogo size="sm" showText={true} />
        </button>

        {/* Role Mode Badge / Switcher */}
        {currentUser && (
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="flex items-center gap-1.5 px-3 py-1 bg-[#eeeee9] hover:bg-[#e8e8e3] text-[#1a1c19] text-xs font-semibold rounded-full border border-[#c4c8c0] transition-colors"
            >
              {userRole === 'business' ? (
                <>
                  <Briefcase className="w-3.5 h-3.5 text-[#516051]" />
                  <span className="hidden sm:inline">Business Mode</span>
                  <span className="sm:hidden">Biz</span>
                </>
              ) : (
                <>
                  <Users className="w-3.5 h-3.5 text-[#516051]" />
                  <span className="hidden sm:inline">Customer Mode</span>
                  <span className="sm:hidden">Customer</span>
                </>
              )}
              <ChevronDown className="w-3 h-3 text-[#747872]" />
            </button>

            {showRoleDropdown && (
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-card-hover border border-[#e3e3de] p-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-2 text-[11px] font-bold text-[#747872] uppercase tracking-wider">
                  Switch Workspace View
                </div>
                <button
                  onClick={() => {
                    onRoleChange('business');
                    setShowRoleDropdown(false);
                  }}
                  className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-colors ${
                    userRole === 'business' ? 'bg-[#d7e7d4]/40 text-[#121e13]' : 'hover:bg-[#f4f4ef]'
                  }`}
                >
                  <Briefcase className="w-4 h-4 mt-0.5 text-[#516051]" />
                  <div>
                    <div className="font-semibold text-sm">Business Growth Hub</div>
                    <div className="text-xs text-[#5f5e5e]">Discover leads, partner & run experiments</div>
                  </div>
                  {userRole === 'business' && <Check className="w-4 h-4 ml-auto text-[#516051]" />}
                </button>

                <button
                  onClick={() => {
                    onRoleChange('customer');
                    setShowRoleDropdown(false);
                  }}
                  className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-colors mt-1 ${
                    userRole === 'customer' ? 'bg-[#d7e7d4]/40 text-[#121e13]' : 'hover:bg-[#f4f4ef]'
                  }`}
                >
                  <Users className="w-4 h-4 mt-0.5 text-[#516051]" />
                  <div>
                    <div className="font-semibold text-sm">Customer View</div>
                    <div className="text-xs text-[#5f5e5e]">Explore businesses, post needs & get matches</div>
                  </div>
                  {userRole === 'customer' && <Check className="w-4 h-4 ml-auto text-[#516051]" />}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Desktop Main Navigation Tabs */}
      {currentUser && (
        <nav className="hidden md:flex items-center gap-1 bg-[#eeeee9]/60 p-1 rounded-full border border-[#e3e3de]">
          {userRole === 'business'
            ? businessNavItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => onBusinessTabChange(item.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    businessTab === item.id
                      ? 'bg-[#1a1c19] text-white shadow-sm'
                      : 'text-[#5f5e5e] hover:text-[#1a1c19] hover:bg-[#e3e3de]/60'
                  }`}
                >
                  {item.label}
                </button>
              ))
            : customerNavItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => onCustomerTabChange(item.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    customerTab === item.id
                      ? 'bg-[#1a1c19] text-white shadow-sm'
                      : 'text-[#5f5e5e] hover:text-[#1a1c19] hover:bg-[#e3e3de]/60'
                  }`}
                >
                  {item.label}
                </button>
              ))}
        </nav>
      )}

      {/* Right Controls: Notifications, Messages, Profile / Auth Buttons */}
      <div className="flex items-center gap-2">
        {currentUser ? (
          <>
            {/* Messages Action */}
            <button
              onClick={onOpenMessages}
              className="relative p-2 text-[#434842] hover:text-[#1a1c19] hover:bg-[#eeeee9] rounded-full transition-colors"
              title="Messages"
            >
              <MessageSquare className="w-5 h-5" />
              {unreadMessagesCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#516051] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadMessagesCount}
                </span>
              )}
            </button>

            {/* Notifications Popover */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-[#434842] hover:text-[#1a1c19] hover:bg-[#eeeee9] rounded-full transition-colors"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#ba1a1a] rounded-full border-2 border-[#fafaf4]" />
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-card-hover border border-[#e3e3de] p-4 z-50 animate-in fade-in">
                  <div className="flex items-center justify-between pb-3 border-b border-[#eeeee9]">
                    <div>
                      <h4 className="font-bold text-sm text-[#1a1c19]">Notifications</h4>
                      <p className="text-xs text-[#747872]">
                        {unreadNotificationsCount} unread update{unreadNotificationsCount === 1 ? '' : 's'}
                      </p>
                    </div>
                    <span className="text-[11px] font-semibold text-[#516051] bg-[#d7e7d4] px-2 py-0.5 rounded">
                      Live Stream
                    </span>
                  </div>

                  <div className="mt-3 space-y-2 max-h-80 overflow-y-auto pr-1">
                    {notifications.length === 0 ? (
                      <p className="text-center py-6 text-xs text-[#747872]">No new notifications.</p>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => onMarkNotificationRead(n.id)}
                          className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                            !n.read
                              ? 'bg-[#fafaf4] border-[#bbcbb9] shadow-xs'
                              : 'bg-white border-[#eeeee9] hover:bg-[#f4f4ef]'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-semibold text-xs text-[#1a1c19]">{n.title}</span>
                            <span className="text-[10px] text-[#747872] shrink-0">{n.timestamp}</span>
                          </div>
                          <p className="text-xs text-[#434842] mt-1 line-clamp-2">{n.description}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown Trigger */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 pl-1 focus:outline-none group"
              >
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover border border-[#bbcbb9] group-hover:ring-2 group-hover:ring-[#516051] transition-all"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#d7e7d4] border border-[#bbcbb9] text-[#121e13] flex items-center justify-center font-bold text-xs group-hover:ring-2 group-hover:ring-[#516051] transition-all">
                    {currentUser.name.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <ChevronDown className="w-3.5 h-3.5 text-[#747872] group-hover:text-[#1a1c19] hidden sm:block" />
              </button>

              {/* User Menu Popover */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-card-hover border border-[#e3e3de] p-3 z-50 animate-in fade-in zoom-in-95">
                  {/* Account Header */}
                  <div className="p-3 bg-[#fafaf4] rounded-xl border border-[#eeeee9] mb-2">
                    <div className="flex items-center gap-2.5">
                      {currentUser.avatar ? (
                        <img 
                          src={currentUser.avatar} 
                          alt={currentUser.name} 
                          className="w-10 h-10 rounded-full object-cover border border-[#bbcbb9]"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#d7e7d4] text-[#121e13] font-bold flex items-center justify-center text-xs">
                          {currentUser.name.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-xs text-[#1a1c19] truncate">{currentUser.name}</div>
                        <div className="text-[11px] text-[#5f5e5e] truncate">{currentUser.email}</div>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="text-[10px] bg-[#d7e7d4] text-[#121e13] font-bold px-1.5 py-0.2 rounded">
                            {userRole === 'business' ? 'Business Account' : 'Customer Account'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Menu Options */}
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        onOpenProfile();
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#1a1c19] hover:bg-[#fafaf4] transition-colors text-left"
                    >
                      <User className="w-4 h-4 text-[#516051]" />
                      <span>View Profile</span>
                    </button>

                    <button
                      onClick={() => {
                        onOpenEditProfile();
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#1a1c19] hover:bg-[#fafaf4] transition-colors text-left"
                    >
                      <Settings className="w-4 h-4 text-[#516051]" />
                      <span>Edit Profile & Credentials</span>
                    </button>

                    <button
                      onClick={() => {
                        onOpenAuthModal('demo');
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#516051] hover:bg-[#fafaf4] transition-colors text-left"
                    >
                      <Sparkles className="w-4 h-4 text-[#516051]" />
                      <span>Switch Demo Profile</span>
                    </button>

                    <div className="border-t border-[#eeeee9] my-1" />

                    <button
                      onClick={() => {
                        onLogout();
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#ba1a1a] hover:bg-[#fdf2f2] transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4 text-[#ba1a1a]" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Logged Out Buttons */
          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenAuthModal('signin')}
              className="px-3.5 py-1.5 text-xs font-bold text-[#1a1c19] hover:bg-[#eeeee9] rounded-xl transition-colors flex items-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              Sign In
            </button>

            <button
              onClick={() => onOpenAuthModal('signup')}
              className="px-4 py-1.5 bg-[#1a1c19] hover:bg-[#2f312e] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <UserPlus className="w-3.5 h-3.5" />
              Create Account
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
