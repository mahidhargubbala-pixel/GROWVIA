import React from 'react';
import { UserRole, BusinessTab, CustomerTab } from '../types';
import { 
  Home, 
  Compass, 
  Users2, 
  FlaskConical, 
  TrendingUp, 
  Sparkles, 
  FileText, 
  Bookmark, 
  MessageSquare, 
  User 
} from 'lucide-react';

interface BottomNavProps {
  userRole: UserRole;
  businessTab: BusinessTab;
  onBusinessTabChange: (tab: BusinessTab) => void;
  customerTab: CustomerTab;
  onCustomerTabChange: (tab: CustomerTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  userRole,
  businessTab,
  onBusinessTabChange,
  customerTab,
  onCustomerTabChange
}) => {
  if (userRole === 'business') {
    const tabs: { id: BusinessTab; label: string; icon: React.ReactNode }[] = [
      { id: 'home', label: 'Hub', icon: <Home className="w-5 h-5" /> },
      { id: 'discover', label: 'Discover', icon: <Compass className="w-5 h-5" /> },
      { id: 'network', label: 'Network', icon: <Users2 className="w-5 h-5" /> },
      { id: 'experiments', label: 'Tests', icon: <FlaskConical className="w-5 h-5" /> },
      { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> }
    ];

    return (
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#fafaf4] border-t border-[#e3e3de] h-[72px] flex items-center justify-around px-2 pb-safe">
        {tabs.map(tab => {
          const isActive = businessTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onBusinessTabChange(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-full transition-all duration-150 active:scale-95 ${
                isActive
                  ? 'text-[#121e13] bg-[#d7e7d4] font-bold'
                  : 'text-[#5f5e5e] hover:text-[#1a1c19]'
              }`}
            >
              {tab.icon}
              <span className="text-[11px] mt-0.5 tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    );
  }

  const customerTabs: { id: CustomerTab; label: string; icon: React.ReactNode }[] = [
    { id: 'explore', label: 'Explore', icon: <Compass className="w-5 h-5" /> },
    { id: 'requests', label: 'Requests', icon: <FileText className="w-5 h-5" /> },
    { id: 'saved', label: 'Saved', icon: <Bookmark className="w-5 h-5" /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#fafaf4] border-t border-[#e3e3de] h-[72px] flex items-center justify-around px-2 pb-safe">
      {customerTabs.map(tab => {
        const isActive = customerTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onCustomerTabChange(tab.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-full transition-all duration-150 active:scale-95 ${
              isActive
                ? 'text-[#121e13] bg-[#d7e7d4] font-bold'
                : 'text-[#5f5e5e] hover:text-[#1a1c19]'
            }`}
          >
            {tab.icon}
            <span className="text-[11px] mt-0.5 tracking-tight">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
