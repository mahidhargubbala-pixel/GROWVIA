import React, { useState } from 'react';
import { 
  UserRole, 
  BusinessTab, 
  CustomerTab, 
  Opportunity, 
  BusinessProfile, 
  NetworkConnection, 
  GrowthExperiment, 
  DemandGap, 
  Conversation, 
  AppNotification, 
  BusinessOffer, 
  OpportunityLifecycle,
  Review,
  UserAccount 
} from './types';
import { 
  INITIAL_BUSINESSES, 
  INITIAL_OPPORTUNITIES, 
  INITIAL_EXPERIMENTS, 
  INITIAL_DEMAND_GAPS, 
  INITIAL_CONNECTIONS, 
  INITIAL_CONVERSATIONS, 
  INITIAL_NOTIFICATIONS,
  DEMO_BUSINESS_USER,
  DEMO_CUSTOMER_USER 
} from './data/mockData';

import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { BusinessHome } from './components/business/BusinessHome';
import { BusinessDiscover } from './components/business/BusinessDiscover';
import { BusinessNetwork } from './components/business/BusinessNetwork';
import { BusinessExperiments } from './components/business/BusinessExperiments';
import { BusinessInsights } from './components/business/BusinessInsights';
import { BusinessProfileView } from './components/business/BusinessProfileView';
import { CustomerExplore } from './components/customer/CustomerExplore';
import { CustomerRequests } from './components/customer/CustomerRequests';
import { CustomerSaved } from './components/customer/CustomerSaved';
import { CustomerProfile } from './components/customer/CustomerProfile';

import { CreateNeedModal } from './components/modals/CreateNeedModal';
import { CreateOfferModal } from './components/modals/CreateOfferModal';
import { CreateExperimentModal } from './components/modals/CreateExperimentModal';
import { BusinessProfileModal } from './components/modals/BusinessProfileModal';
import { OpportunityDetailModal } from './components/modals/OpportunityDetailModal';
import { MessagesModal } from './components/modals/MessagesModal';
import { ReviewModal } from './components/modals/ReviewModal';
import { AuthModal } from './components/modals/AuthModal';
import { EditProfileModal } from './components/modals/EditProfileModal';
import confetti from 'canvas-confetti';

export function App() {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(DEMO_BUSINESS_USER);
  const [userRole, setUserRole] = useState<UserRole>('business');
  const [businessTab, setBusinessTab] = useState<BusinessTab>('home');
  const [customerTab, setCustomerTab] = useState<CustomerTab>('explore');

  // Core Dynamic Data States
  const [businesses, setBusinesses] = useState<BusinessProfile[]>(INITIAL_BUSINESSES);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(INITIAL_OPPORTUNITIES);
  const [connections, setConnections] = useState<NetworkConnection[]>(INITIAL_CONNECTIONS);
  const [experiments, setExperiments] = useState<GrowthExperiment[]>(INITIAL_EXPERIMENTS);
  const [demandGaps, setDemandGaps] = useState<DemandGap[]>(INITIAL_DEMAND_GAPS);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);

  // Modals state
  const [isCreateNeedOpen, setIsCreateNeedOpen] = useState(false);
  const [isCreateOfferOpen, setIsCreateOfferOpen] = useState(false);
  const [isCreateExperimentOpen, setIsCreateExperimentOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessProfile | null>(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState<string | undefined>(undefined);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [opportunityForReview, setOpportunityForReview] = useState<Opportunity | null>(null);

  // Authentication & Profile Editing Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup' | 'demo'>('signin');
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  // Switch role handler with sync
  const handleRoleChange = (newRole: UserRole) => {
    setUserRole(newRole);
    if (newRole === 'business') {
      if (currentUser?.role !== 'business') {
        setCurrentUser(DEMO_BUSINESS_USER);
      }
    } else {
      if (currentUser?.role !== 'customer') {
        setCurrentUser(DEMO_CUSTOMER_USER);
      }
    }
  };

  const handleLoginSuccess = (account: UserAccount) => {
    setCurrentUser(account);
    setUserRole(account.role);
    if (account.role === 'business') {
      setBusinessTab('home');
    } else {
      setCustomerTab('explore');
    }

    setNotifications(prev => [
      {
        id: `n_${Date.now()}`,
        title: 'Welcome to Growvia',
        description: `Signed in as ${account.name} (${account.role === 'business' ? 'Business Partner' : 'Customer'}).`,
        timestamp: 'Just now',
        read: false,
        type: 'match'
      },
      ...prev
    ]);
    confetti({ particleCount: 35, spread: 50 });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setNotifications(prev => [
      {
        id: `n_${Date.now()}`,
        title: 'Logged Out',
        description: 'You have safely signed out of your account credentials.',
        timestamp: 'Just now',
        read: false,
        type: 'system'
      },
      ...prev
    ]);
  };

  const handleSaveProfile = (updated: UserAccount) => {
    setCurrentUser(updated);

    // If business user, also sync with matching business profile in list
    if (updated.role === 'business') {
      setBusinesses(prev =>
        prev.map(b => {
          if (b.id === 'biz_acme_logistics' || b.name === updated.name) {
            return {
              ...b,
              name: updated.name,
              category: updated.category || b.category,
              description: updated.bio || b.description,
              address: updated.address || b.address,
              location: updated.location,
              logo: updated.avatar || b.logo
            };
          }
          return b;
        })
      );
    }

    setNotifications(prev => [
      {
        id: `n_${Date.now()}`,
        title: 'Profile Updated',
        description: 'Your profile information and credentials were saved.',
        timestamp: 'Just now',
        read: false,
        type: 'system'
      },
      ...prev
    ]);
  };

  // Handlers for Opportunities
  const handleCreateNeed = (newNeed: Partial<Opportunity>) => {
    const opp: Opportunity = {
      id: `opp_${Date.now()}`,
      title: newNeed.title || 'New Requirement',
      type: newNeed.type || 'customer_need',
      category: newNeed.category || 'General',
      location: newNeed.location || 'Local Area',
      budget: newNeed.budget,
      timing: newNeed.timing,
      description: newNeed.description || '',
      requesterId: currentUser ? currentUser.id : 'guest',
      requesterName: currentUser ? currentUser.name : 'Anonymous Requester',
      requesterRole: userRole,
      requesterVerified: true,
      matchStrength: 'Strong match',
      matchReasons: ['Verified account posting', 'Matches active local providers in 5mi radius'],
      status: 'open',
      visibility: newNeed.visibility || 'public',
      responsesCount: 0,
      createdAt: 'Just now'
    };

    setOpportunities(prev => [opp, ...prev]);
    confetti({ particleCount: 40, spread: 60 });
    
    // Add notification
    setNotifications(prev => [
      {
        id: `n_${Date.now()}`,
        title: 'Requirement Published',
        description: `"${opp.title}" is now active in the Growvia network matching engine.`,
        timestamp: 'Just now',
        read: false,
        type: 'match'
      },
      ...prev
    ]);
  };

  const handleCreateOffer = (newOffer: Partial<Opportunity>) => {
    const opp: Opportunity = {
      id: `opp_${Date.now()}`,
      title: newOffer.title || 'New Service Offer',
      type: 'business_offer',
      category: newOffer.category || 'General Services',
      location: newOffer.location || 'Chicago Metro',
      budget: newOffer.budget,
      timing: newOffer.timing,
      description: newOffer.description || '',
      requesterId: currentUser ? currentUser.id : 'biz_current_user',
      requesterName: currentUser ? currentUser.name : 'Growvia Business Hub',
      requesterRole: 'business',
      requesterVerified: true,
      matchStrength: 'Strong match',
      matchReasons: ['Verified business credentials', 'Immediate booking availability'],
      status: 'open',
      visibility: 'public',
      responsesCount: 0,
      createdAt: 'Just now'
    };

    setOpportunities(prev => [opp, ...prev]);
    confetti({ particleCount: 40, spread: 60 });
  };

  const handleStartExperiment = (newExp: GrowthExperiment) => {
    setExperiments(prev => [newExp, ...prev]);
    setBusinessTab('experiments');
  };

  const handleAdvanceLifecycle = (reqId: string, nextStage: OpportunityLifecycle) => {
    setOpportunities(prev =>
      prev.map(opp => {
        if (opp.id === reqId) {
          return { ...opp, status: nextStage };
        }
        return opp;
      })
    );
  };

  const handleToggleSaveOpportunity = (id: string) => {
    setOpportunities(prev =>
      prev.map(opp => {
        if (opp.id === id) {
          return { ...opp, isSaved: !opp.isSaved };
        }
        return opp;
      })
    );
  };

  const handleToggleSaveBusiness = (id: string) => {
    setBusinesses(prev =>
      prev.map(biz => {
        if (biz.id === id) {
          return { ...biz, isSaved: !biz.isSaved };
        }
        return biz;
      })
    );
  };

  // Network & Connect actions
  const handleConnectConnection = (connId: string) => {
    setConnections(prev =>
      prev.map(c => {
        if (c.id === connId) {
          return { ...c, status: 'connected' };
        }
        return c;
      })
    );
    confetti({ particleCount: 50, spread: 60 });
    
    const conn = connections.find(c => c.id === connId);
    if (conn) {
      setNotifications(prev => [
        {
          id: `n_${Date.now()}`,
          title: 'New Connection Established',
          description: `You are now connected with ${conn.name}. Direct collaboration channels opened.`,
          timestamp: 'Just now',
          read: false,
          type: 'match'
        },
        ...prev
      ]);
    }
  };

  const handleOpenMessageWithConnection = (conn: NetworkConnection) => {
    const existing = conversations.find(c => c.partnerId === conn.businessId);
    if (existing) {
      setActiveConversationId(existing.id);
    } else {
      const newConv: Conversation = {
        id: `conv_${Date.now()}`,
        partnerId: conn.businessId,
        partnerName: conn.name,
        partnerRole: 'business',
        partnerAvatar: conn.avatar,
        partnerVerified: true,
        opportunityContext: {
          id: `ref_${conn.id}`,
          title: `${conn.connectionType}: Collaboration`,
          category: conn.category,
          status: 'connected'
        },
        lastUpdated: 'Just now',
        messages: [
          {
            id: `m_${Date.now()}`,
            senderId: currentUser ? currentUser.id : 'biz_current_user',
            senderName: currentUser ? currentUser.name : 'Growvia Business Hub',
            senderRole: 'business',
            text: `Hi ${conn.name}! We saw your profile on the Growvia Network. We'd love to explore joint co-marketing initiatives!`,
            timestamp: 'Just now',
            isRead: true
          }
        ]
      };
      setConversations(prev => [newConv, ...prev]);
      setActiveConversationId(newConv.id);
    }
    setIsMessagesOpen(true);
  };

  const handleRespondToOpportunity = (opp: Opportunity) => {
    setSelectedOpportunity(null);
    const existing = conversations.find(c => c.opportunityContext?.id === opp.id);
    if (existing) {
      setActiveConversationId(existing.id);
    } else {
      const newConv: Conversation = {
        id: `conv_${Date.now()}`,
        partnerId: opp.requesterId,
        partnerName: opp.requesterName,
        partnerRole: opp.requesterRole,
        partnerAvatar: opp.requesterAvatar,
        partnerVerified: true,
        opportunityContext: {
          id: opp.id,
          title: opp.title,
          category: opp.category,
          budget: opp.budget,
          status: 'connected'
        },
        lastUpdated: 'Just now',
        messages: [
          {
            id: `m_${Date.now()}`,
            senderId: currentUser ? currentUser.id : 'biz_current_user',
            senderName: currentUser ? currentUser.name : (userRole === 'business' ? 'Growvia Business Hub' : 'Sarah Miller'),
            senderRole: userRole,
            text: `Hello ${opp.requesterName}! We have reviewed your requirement for "${opp.title}" and would like to confirm our verified availability.`,
            timestamp: 'Just now',
            isRead: true
          }
        ]
      };
      setConversations(prev => [newConv, ...prev]);
      setActiveConversationId(newConv.id);
      
      // Update opportunity lifecycle
      handleAdvanceLifecycle(opp.id, 'connected');
    }
    setIsMessagesOpen(true);
  };

  const handleSendMessage = (conversationId: string, text: string) => {
    setConversations(prev =>
      prev.map(c => {
        if (c.id === conversationId) {
          const newMsg = {
            id: `m_${Date.now()}`,
            senderId: currentUser ? currentUser.id : (userRole === 'business' ? 'biz_current_user' : 'cust_sarah_m'),
            senderName: currentUser ? currentUser.name : (userRole === 'business' ? 'Growvia Business Hub' : 'Sarah Miller'),
            senderRole: userRole,
            text,
            timestamp: 'Just now',
            isRead: true
          };
          return {
            ...c,
            lastUpdated: 'Just now',
            messages: [...c.messages, newMsg]
          };
        }
        return c;
      })
    );
  };

  const handleClaimOffer = (biz: BusinessProfile, offer: BusinessOffer) => {
    setSelectedBusiness(null);
    const newConv: Conversation = {
      id: `conv_${Date.now()}`,
      partnerId: biz.id,
      partnerName: biz.name,
      partnerRole: 'business',
      partnerAvatar: biz.logo,
      partnerVerified: true,
      opportunityContext: {
        id: `offer_${offer.id}`,
        title: `${offer.title} (${offer.discount})`,
        category: biz.category,
        status: 'connected'
      },
      lastUpdated: 'Just now',
      messages: [
        {
          id: `m_${Date.now()}`,
          senderId: currentUser ? currentUser.id : 'cust_sarah_m',
          senderName: currentUser ? currentUser.name : 'Sarah Miller',
          senderRole: 'customer',
          text: `Hi ${biz.name}! I would like to claim the special community offer: "${offer.title}". What are the next steps to redeem?`,
          timestamp: 'Just now',
          isRead: true
        }
      ]
    };

    setConversations(prev => [newConv, ...prev]);
    setActiveConversationId(newConv.id);
    setIsMessagesOpen(true);
    confetti({ particleCount: 40, spread: 60 });
  };

  const handleOpenMessageWithBusiness = (biz: BusinessProfile, req: Opportunity) => {
    const newConv: Conversation = {
      id: `conv_${Date.now()}`,
      partnerId: biz.id,
      partnerName: biz.name,
      partnerRole: 'business',
      partnerAvatar: biz.logo,
      partnerVerified: true,
      opportunityContext: {
        id: req.id,
        title: req.title,
        category: req.category,
        budget: req.budget,
        status: req.status
      },
      lastUpdated: 'Just now',
      messages: [
        {
          id: `m_${Date.now()}`,
          senderId: currentUser ? currentUser.id : 'cust_sarah_m',
          senderName: currentUser ? currentUser.name : 'Sarah Miller',
          senderRole: 'customer',
          text: `Hi ${biz.name}, I am reaching out regarding my request "${req.title}". Are you available to discuss terms?`,
          timestamp: 'Just now',
          isRead: true
        }
      ]
    };

    setConversations(prev => [newConv, ...prev]);
    setActiveConversationId(newConv.id);
    setIsMessagesOpen(true);
  };

  const handleSubmitReview = (newReview: Partial<Review>) => {
    if (!opportunityForReview) return;
    
    // Add review to matching business
    setBusinesses(prev =>
      prev.map(b => {
        return {
          ...b,
          reviews: [
            {
              id: `r_${Date.now()}`,
              author: newReview.author || (currentUser ? currentUser.name : 'Sarah Miller'),
              authorRole: newReview.authorRole || 'Verified Client',
              rating: newReview.rating || 5,
              date: 'Just now',
              content: newReview.content || 'Excellent service and verified delivery.',
              isVerifiedInteraction: newReview.isVerifiedInteraction ?? true
            },
            ...b.reviews
          ]
        };
      })
    );

    // Update opportunity status to reviewed
    handleAdvanceLifecycle(opportunityForReview.id, 'reviewed');
    setOpportunityForReview(null);
  };

  const handleExploreDemandGap = (gap: DemandGap) => {
    setIsCreateOfferOpen(true);
  };

  const unreadMessagesCount = conversations.reduce(
    (acc, c) => acc + c.messages.filter(m => !m.isRead && m.senderRole !== userRole).length,
    0
  );

  return (
    <div className="min-h-screen bg-[#fafaf4] text-[#1a1c19] flex flex-col selection:bg-[#d7e7d4] selection:text-[#121e13]">
      {/* Top Navbar with Profile Dropdown & Auth Controls */}
      <Navbar
        currentUser={currentUser}
        userRole={userRole}
        onRoleChange={handleRoleChange}
        businessTab={businessTab}
        onBusinessTabChange={(tab) => setBusinessTab(tab)}
        customerTab={customerTab}
        onCustomerTabChange={(tab) => setCustomerTab(tab)}
        notifications={notifications}
        onMarkNotificationRead={(id) => {
          setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
        }}
        onOpenMessages={() => setIsMessagesOpen(true)}
        unreadMessagesCount={unreadMessagesCount}
        onOpenProfile={() => {
          if (userRole === 'customer') {
            setCustomerTab('profile');
          } else {
            setBusinessTab('profile');
          }
        }}
        onOpenEditProfile={() => setIsEditProfileModalOpen(true)}
        onOpenAuthModal={(mode = 'signin') => {
          setAuthModalMode(mode);
          setIsAuthModalOpen(true);
        }}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-28 md:pb-16">
        {userRole === 'business' ? (
          <>
            {businessTab === 'home' && (
              <BusinessHome
                opportunities={opportunities}
                onSelectOpportunity={(opp) => setSelectedOpportunity(opp)}
                onNavigateToTab={(tab) => setBusinessTab(tab)}
                onStartExperiment={() => setIsCreateExperimentOpen(true)}
                onConnectPartner={(opp) => handleRespondToOpportunity(opp)}
              />
            )}
            {businessTab === 'discover' && (
              <BusinessDiscover
                opportunities={opportunities}
                businesses={businesses}
                demandGaps={demandGaps}
                onSelectOpportunity={(opp) => setSelectedOpportunity(opp)}
                onSelectBusiness={(biz) => setSelectedBusiness(biz)}
                onCreateNeed={() => setIsCreateNeedOpen(true)}
                onCreateOffer={() => setIsCreateOfferOpen(true)}
                onToggleSaveOpportunity={handleToggleSaveOpportunity}
                onToggleSaveBusiness={handleToggleSaveBusiness}
                onExploreDemandGap={handleExploreDemandGap}
              />
            )}
            {businessTab === 'network' && (
              <BusinessNetwork
                connections={connections}
                businesses={businesses}
                onConnect={handleConnectConnection}
                onOpenMessage={handleOpenMessageWithConnection}
                onSelectBusiness={(biz) => setSelectedBusiness(biz)}
              />
            )}
            {businessTab === 'experiments' && (
              <BusinessExperiments
                experiments={experiments}
                onStartNewExperiment={() => setIsCreateExperimentOpen(true)}
                onSelectActionType={(actionType) => {
                  setIsCreateExperimentOpen(true);
                }}
              />
            )}
            {businessTab === 'insights' && (
              <BusinessInsights
                demandGaps={demandGaps}
                opportunities={opportunities}
                onSelectOpportunity={(opp) => setSelectedOpportunity(opp)}
                onExploreDemandGap={handleExploreDemandGap}
                onTakeAction={(actionType) => {
                  if (actionType === 'referral_test') {
                    setIsCreateExperimentOpen(true);
                  } else {
                    setBusinessTab('discover');
                  }
                }}
              />
            )}
            {businessTab === 'profile' && (
              <BusinessProfileView
                currentUser={currentUser || DEMO_BUSINESS_USER}
                businessData={businesses[0]}
                onOpenEditModal={() => setIsEditProfileModalOpen(true)}
                onOpenCreateOffer={() => setIsCreateOfferOpen(true)}
              />
            )}
          </>
        ) : (
          <>
            {customerTab === 'explore' && (
              <CustomerExplore
                businesses={businesses}
                onSelectBusiness={(biz) => setSelectedBusiness(biz)}
                onCreateRequest={() => setIsCreateNeedOpen(true)}
                onToggleSaveBusiness={handleToggleSaveBusiness}
                onClaimOffer={handleClaimOffer}
              />
            )}
            {customerTab === 'requests' && (
              <CustomerRequests
                requests={opportunities.filter(o => o.requesterRole === 'customer')}
                businesses={businesses}
                onCreateRequest={() => setIsCreateNeedOpen(true)}
                onSelectRequest={(req) => setSelectedOpportunity(req)}
                onOpenMessageWithBusiness={handleOpenMessageWithBusiness}
                onAdvanceLifecycle={handleAdvanceLifecycle}
                onOpenReviewModal={(req) => {
                  setOpportunityForReview(req);
                  setIsReviewModalOpen(true);
                }}
              />
            )}
            {customerTab === 'saved' && (
              <CustomerSaved
                savedBusinesses={businesses.filter(b => b.isSaved)}
                savedOpportunities={opportunities.filter(o => o.isSaved)}
                onSelectBusiness={(biz) => setSelectedBusiness(biz)}
                onSelectOpportunity={(opp) => setSelectedOpportunity(opp)}
                onRemoveSavedBusiness={handleToggleSaveBusiness}
                onRemoveSavedOpportunity={handleToggleSaveOpportunity}
                onExplore={() => setCustomerTab('explore')}
              />
            )}
            {customerTab === 'messages' && (
              <div className="bg-white rounded-2xl border border-[#e3e3de] p-6 shadow-subtle text-center space-y-4">
                <h2 className="text-xl font-bold text-[#1a1c19]">Messages & Active Conversations</h2>
                <p className="text-xs text-[#5f5e5e] max-w-md mx-auto">
                  All discussions, inquiries, and quotes with local providers are tied directly to your active requests.
                </p>
                <button
                  onClick={() => setIsMessagesOpen(true)}
                  className="bg-[#1a1c19] text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-[#2f312e]"
                >
                  Open Full Screen Chat
                </button>
              </div>
            )}
            {customerTab === 'profile' && (
              <CustomerProfile
                currentUser={currentUser || DEMO_CUSTOMER_USER}
                onOpenEditModal={() => setIsEditProfileModalOpen(true)}
                onSwitchToBusiness={() => handleRoleChange('business')}
              />
            )}
          </>
        )}
      </main>

      {/* Bottom Mobile Navigation */}
      <BottomNav
        userRole={userRole}
        businessTab={businessTab}
        onBusinessTabChange={(tab) => setBusinessTab(tab)}
        customerTab={customerTab}
        onCustomerTabChange={(tab) => setCustomerTab(tab)}
      />

      {/* Modals Container */}
      <CreateNeedModal
        isOpen={isCreateNeedOpen}
        onClose={() => setIsCreateNeedOpen(false)}
        onSubmit={handleCreateNeed}
      />

      <CreateOfferModal
        isOpen={isCreateOfferOpen}
        onClose={() => setIsCreateOfferOpen(false)}
        onSubmit={handleCreateOffer}
      />

      <CreateExperimentModal
        isOpen={isCreateExperimentOpen}
        onClose={() => setIsCreateExperimentOpen(false)}
        businesses={businesses}
        onSubmit={handleStartExperiment}
      />

      <BusinessProfileModal
        business={selectedBusiness}
        isOpen={!!selectedBusiness}
        onClose={() => setSelectedBusiness(null)}
        onOpenMessage={(biz) => {
          setSelectedBusiness(null);
          handleOpenMessageWithBusiness(biz, opportunities[0]);
        }}
        onToggleSave={handleToggleSaveBusiness}
        onClaimOffer={handleClaimOffer}
      />

      <OpportunityDetailModal
        opportunity={selectedOpportunity}
        isOpen={!!selectedOpportunity}
        onClose={() => setSelectedOpportunity(null)}
        onRespond={handleRespondToOpportunity}
        onToggleSave={handleToggleSaveOpportunity}
      />

      <MessagesModal
        isOpen={isMessagesOpen}
        onClose={() => setIsMessagesOpen(false)}
        conversations={conversations}
        activeConversationId={activeConversationId}
        userRole={userRole}
        onSendMessage={handleSendMessage}
      />

      <ReviewModal
        opportunity={opportunityForReview}
        isOpen={isReviewModalOpen}
        onClose={() => {
          setIsReviewModalOpen(false);
          setOpportunityForReview(null);
        }}
        onSubmitReview={handleSubmitReview}
      />

      {/* Auth Modal (Sign In, Sign Up, Quick Demo Switch) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
        initialRole={userRole}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Edit Profile & Credentials Modal */}
      {currentUser && (
        <EditProfileModal
          isOpen={isEditProfileModalOpen}
          onClose={() => setIsEditProfileModalOpen(false)}
          currentUser={currentUser}
          onSaveProfile={handleSaveProfile}
        />
      )}
    </div>
  );
}

export default App;
