export type UserRole = 'business' | 'customer';

export type BusinessTab = 'home' | 'discover' | 'network' | 'experiments' | 'insights' | 'profile';
export type CustomerTab = 'explore' | 'requests' | 'saved' | 'messages' | 'profile';

export interface UserAccount {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  tagLine?: string;
  bio?: string;
  location: string;
  address?: string;
  category?: string;
  website?: string;
  isVerified: boolean;
  memberSince: string;
  interests?: string[];
  security: {
    twoFactorEnabled: boolean;
    lastPasswordChange: string;
    loginNotifications: boolean;
  };
}

export type OpportunityLifecycle = 
  | 'open'
  | 'matching'
  | 'interested'
  | 'connected'
  | 'in_progress'
  | 'completed'
  | 'reviewed';

export type OpportunityType = 
  | 'local_lead' 
  | 'partnership' 
  | 'demand_gap' 
  | 'customer_need' 
  | 'business_offer'
  | 'creator_collab'
  | 'supplier_need';

export type VisibilityLevel = 'public' | 'verified_only' | 'private';

export interface Opportunity {
  id: string;
  title: string;
  type: OpportunityType;
  category: string;
  location: string;
  distance?: string;
  budget?: string;
  timing?: string;
  description: string;
  requesterId: string;
  requesterName: string;
  requesterRole: 'customer' | 'business';
  requesterAvatar?: string;
  requesterVerified?: boolean;
  matchStrength?: 'Strong match' | 'Good match' | 'Near match';
  matchReasons?: string[];
  status: OpportunityLifecycle;
  visibility: VisibilityLevel;
  targetAudience?: string;
  responsesCount: number;
  createdAt: string;
  isSaved?: boolean;
  alternativeSuggestion?: string;
}

export interface BusinessService {
  id: string;
  name: string;
  price: string;
  description: string;
  tag: string;
}

export interface BusinessOffer {
  id: string;
  title: string;
  discount: string;
  description: string;
  badge: string;
  expiry: string;
  claimedCount?: number;
}

export interface Review {
  id: string;
  author: string;
  authorRole: string;
  rating: number;
  date: string;
  content: string;
  isVerifiedInteraction: boolean;
}

export interface BusinessProfile {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  location: string;
  address: string;
  tagLine: string;
  description: string;
  logo: string;
  coverImage?: string;
  rating: number;
  reviewsCount: number;
  trustScore: number; // 0-100
  isContactVerified: boolean;
  isBusinessVerified: boolean;
  verifiedInteractionsCount: number;
  verifiedTransactionsCount: number;
  services: BusinessService[];
  offers: BusinessOffer[];
  reviews: Review[];
  isSaved?: boolean;
}

export interface NetworkConnection {
  id: string;
  businessId: string;
  name: string;
  category: string;
  connectionType: 'Potential Partner' | 'Potential Creator' | 'Potential Supplier';
  location: string;
  reason: string;
  audienceOverlap: string;
  status: 'recommended' | 'connected' | 'pending';
  avatar: string;
}

export interface GrowthExperiment {
  id: string;
  title: string;
  goal: string;
  audience: string;
  budget: string;
  duration: string;
  offer: string;
  partnerBusinessName?: string;
  partnerBusinessId?: string;
  status: 'draft' | 'running' | 'completed';
  funnel: {
    reach: number;
    engagement: number;
    leads: number;
    conversions: number | null;
  };
  completedResult?: {
    conversionRate: string;
    newLeads: number;
    percentImprovement: string;
    summary: string;
  };
  recommendedNextStep?: {
    text: string;
    actionLabel: string;
    actionType: string;
  };
  createdAt: string;
}

export interface DemandGap {
  id: string;
  category: string;
  activeRequestsCount: number;
  availableProvidersCount: number;
  averageBudget: string;
  location: string;
  growthRate: string;
  suggestedAction: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  partnerId: string;
  partnerName: string;
  partnerRole: UserRole;
  partnerAvatar?: string;
  partnerVerified: boolean;
  opportunityContext?: {
    id: string;
    title: string;
    category: string;
    budget?: string;
    status: OpportunityLifecycle;
  };
  messages: Message[];
  lastUpdated: string;
}

export interface AppNotification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  type: 'lead' | 'match' | 'message' | 'experiment' | 'lifecycle' | 'demand';
  linkTab?: string;
}
