import { BusinessProfile, Opportunity, NetworkConnection, GrowthExperiment, DemandGap, Conversation, AppNotification, UserAccount } from '../types';

export const DEMO_CUSTOMER_USER: UserAccount = {
  id: 'cust_sarah_m',
  role: 'customer',
  name: 'Sarah Miller',
  email: 'sarah.miller@growvia.network',
  phone: '+1 (312) 555-0198',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  tagLine: 'Local Artisan & Event Seeker',
  bio: 'Connecting with local artisans, event media teams, and sustainable goods in the Chicago & Metro area.',
  location: 'Downtown Area, Chicago, IL',
  address: '350 N LaSalle St, Apt 14B, Chicago, IL 60654',
  category: 'Event Planning & Sustainable Goods',
  isVerified: true,
  memberSince: 'March 2024',
  interests: ['Event Photography', 'Craft Roasters', 'Sustainable Goods', 'Mindfulness', 'Logistics'],
  security: {
    twoFactorEnabled: true,
    lastPasswordChange: '14 days ago',
    loginNotifications: true
  }
};

export const DEMO_BUSINESS_USER: UserAccount = {
  id: 'biz_acme_logistics',
  role: 'business',
  name: 'Acme Logistics & Staging',
  email: 'ops@acmelogistics.com',
  phone: '+1 (312) 555-0142',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnVKnsror5Pgu6cCCWCR0VaNe_vurjpVbW5SMrgGTpNjbUd5DFQBm7VfftOZEVHmsJPEXI5szIvw3WRA9_VCgiU1xOuFd2RVTDTqaeOa3D5nhpye5b0efhh5ZNrJxigq4xSiwLbIPv73ihh9KYHrgd-P-PnBwQk3X68QaFnmXgEwoPsBTWXZIaK18XCICF8OskFyY5cuSHJa2Idc4M19mg8exAZTpnF9FzSyt7-7EePCTRE7toYK8Q',
  tagLine: 'Reliable cold-chain & regional distribution solutions',
  bio: 'Specializing in mid-market B2B freight consolidation, local warehousing, and just-in-time logistics fulfillment with verified temperature control.',
  location: 'Chicago, IL',
  address: '420 W Grand Ave, Chicago, IL 60654',
  category: 'B2B Supply Chain & Logistics',
  website: 'https://acmelogistics.example.com',
  isVerified: true,
  memberSince: 'January 2024',
  interests: ['Freight Consolidation', 'Cold Storage', 'Warehousing', 'B2B Logistics'],
  security: {
    twoFactorEnabled: true,
    lastPasswordChange: '30 days ago',
    loginNotifications: true
  }
};

export const DEMO_ACCOUNTS: UserAccount[] = [
  DEMO_BUSINESS_USER,
  DEMO_CUSTOMER_USER,
  {
    id: 'biz_artisan_roasters',
    role: 'business',
    name: 'Artisan Roasters & Cafe',
    email: 'hello@artisanroasters.com',
    phone: '+1 (312) 555-0276',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTjkNN5Sv8nWJaAsSFqVt6YHMZBILuSuC6Iwq1XV1BV9tUEeJEhRjEBWk9XfNHVqKgFLJzdj88sNTUd1cPKkboZEmBfDiwJSLuXjHEXQ9w-x-O_mbJfHFidqWxdTn9U9knYKO2DLvbRSLtH2BAfcKhp_ic98XdmkMM4c6_7ZslU7awW-usMOEPxtXNIdrb_msGSpsinZBxqiYvAYn9wjuf8zooWjFBaXaBoDeDd78KmuZvEWpbGY1u',
    tagLine: 'Micro-roasted coffee & community event venue',
    bio: 'Direct-trade specialty coffee roastery with private evening event rental and corporate pop-up bar setups.',
    location: 'Downtown Area, Chicago, IL',
    address: '142 S Michigan Ave, Chicago, IL',
    category: 'Cafe & Specialty Roastery',
    website: 'https://artisanroasters.example.com',
    isVerified: true,
    memberSince: 'February 2024',
    interests: ['Specialty Coffee', 'Event Venue', 'Corporate Catering', 'Co-Marketing'],
    security: {
      twoFactorEnabled: false,
      lastPasswordChange: '45 days ago',
      loginNotifications: true
    }
  },
  {
    id: 'biz_lens_focus',
    role: 'business',
    name: 'Lens & Light Media Studio',
    email: 'contact@lenslightmedia.com',
    phone: '+91 98480 22334',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWuOihfTGCnByAiN_xgccZS-2QZdgTh2f5aqQuijCV5hnfA-ILMzr7bEavv-Iv22woKiCWuMG9C-YPnmTSWTa6ZyvVJ9XtAlfb7DoX4LiqcVbQ4WkqLNEfD4AIu_SLXnJknbPjBkw03SkQDOGeGxAqcjbiUW_x14sx4vJWR9WSgVWDMh8zCcH5J67__eFOaal3eAtfcr_x5OzjLTaREzAtWkotS7g247NH4HguJxjfUTfqRwhzZz6h',
    tagLine: 'Commercial event photography, video reels, and drone coverage',
    bio: 'High-speed turnaround photography and video production for festivals, brand launches, and campus celebrations.',
    location: 'Vijayawada / Chicago Metro',
    address: 'MG Road, Vijayawada / Michigan Ave, Chicago',
    category: 'Event Media & Photography',
    website: 'https://lenslightmedia.example.com',
    isVerified: true,
    memberSince: 'May 2024',
    interests: ['Event Photography', 'Drone Shoots', 'Reels Production', 'Commercial Video'],
    security: {
      twoFactorEnabled: true,
      lastPasswordChange: '7 days ago',
      loginNotifications: false
    }
  }
];

export const INITIAL_BUSINESSES: BusinessProfile[] = [
  {
    id: 'biz_acme_logistics',
    name: 'Acme Logistics',
    category: 'B2B Supply Chain',
    subcategory: 'Freight & Warehousing',
    location: 'Chicago, IL',
    address: '420 W Grand Ave, Chicago, IL 60654',
    tagLine: 'Reliable cold-chain & regional distribution solutions',
    description: 'Specializing in mid-market B2B freight consolidation, local warehousing, and just-in-time logistics fulfillment with verified temperature control.',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnVKnsror5Pgu6cCCWCR0VaNe_vurjpVbW5SMrgGTpNjbUd5DFQBm7VfftOZEVHmsJPEXI5szIvw3WRA9_VCgiU1xOuFd2RVTDTqaeOa3D5nhpye5b0efhh5ZNrJxigq4xSiwLbIPv73ihh9KYHrgd-P-PnBwQk3X68QaFnmXgEwoPsBTWXZIaK18XCICF8OskFyY5cuSHJa2Idc4M19mg8exAZTpnF9FzSyt7-7EePCTRE7toYK8Q',
    rating: 4.9,
    reviewsCount: 38,
    trustScore: 96,
    isContactVerified: true,
    isBusinessVerified: true,
    verifiedInteractionsCount: 52,
    verifiedTransactionsCount: 29,
    services: [
      { id: 's1', name: 'Regional Same-Day Dispatch', price: '$250 - $1,200', description: 'Guaranteed 4-hour pickup and same-day delivery within 75 miles.', tag: 'Popular' },
      { id: 's2', name: 'Pallet Warehousing & Pick/Pack', price: '$18 / pallet / mo', description: 'Secure heated and refrigerated cross-docking space.', tag: 'B2B' }
    ],
    offers: [
      { id: 'o1', title: 'First Month Free Pallet Storage', discount: '100% OFF', description: 'For new local B2B manufacturers booking 10+ pallets.', badge: 'Limited Time', expiry: 'Ends in 5 days', claimedCount: 14 }
    ],
    reviews: [
      { id: 'r1', author: 'Marcus Vance', authorRole: 'Procurement Director, Apex Goods', rating: 5, date: '3 days ago', content: 'Acme solved our weekend supply pinch with zero downtime. Verified tracking was crystal clear.', isVerifiedInteraction: true },
      { id: 'r2', author: 'Elena Rostova', authorRole: 'Founder, GreenLeaf Organics', rating: 5, date: '2 weeks ago', content: 'Seamless B2B coordination. Highly recommend for any local brand scaling production.', isVerifiedInteraction: true }
    ]
  },
  {
    id: 'biz_nexus_marketing',
    name: 'Nexus Marketing',
    category: 'Digital Agency',
    subcategory: 'Growth & Co-Marketing',
    location: 'Remote / National',
    address: '100 N Riverside Plaza, Chicago, IL',
    tagLine: 'Performance-driven growth experiments & B2B customer acquisition',
    description: 'We help growing businesses build predictable lead engines through structured audience tests, local partnerships, and high-conversion funnels.',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmS3_IGvhcOYA73fkBjLXiJHnWmz3QtKw63qypyBSvTiAWrkcTKiSFB6cyNQbZ1yjPBsQIarQd0WFEXO4gL46XiNpQ82oNY2E6cmQLDuO30z1QYWdtpH-N8aSbzRqQo0CnoLPt39Ohdj_R0YIjaucvDWitFGwzOg-acLAOCcPZSZxraeuSeqnAQuByHgZ-FnpXU6CASLZAHLwcr9SfxUl-P9-bKaanh8w_a2DN0svAVmcovYkAuMxl',
    rating: 4.8,
    reviewsCount: 42,
    trustScore: 94,
    isContactVerified: true,
    isBusinessVerified: true,
    verifiedInteractionsCount: 64,
    verifiedTransactionsCount: 41,
    services: [
      { id: 's3', name: '7-Day Growth Experiment Blueprint', price: '$850', description: 'Full audience research, creative set, and measurable conversion tracking setup.', tag: 'Featured' },
      { id: 's4', name: 'Local Co-Marketing Campaign Manager', price: '$1,400 / campaign', description: 'Connect with 3 non-competing businesses to cross-promote services.', tag: 'Partnership' }
    ],
    offers: [
      { id: 'o2', title: 'Free Co-Marketing Fit Audit', discount: '$250 Value', description: 'We evaluate your customer profile and identify 3 high-probability collaboration partners.', badge: 'Growth Offer', expiry: 'Ends Friday', claimedCount: 22 }
    ],
    reviews: [
      { id: 'r3', author: 'Siddharth Rao', authorRole: 'Co-founder, CampusBites', rating: 5, date: '1 week ago', content: 'Their 7-day experiment drove +28% weekend footfall for our college launch. Exceptional clarity.', isVerifiedInteraction: true }
    ]
  },
  {
    id: 'biz_artisan_roasters',
    name: 'Artisan Roasters',
    category: 'Cafe & Roastery',
    subcategory: 'Specialty Coffee & Events',
    location: 'Downtown Area, Chicago, IL',
    address: '142 S Michigan Ave, Chicago, IL',
    tagLine: 'Specialty micro-roasted coffee & event catering in a minimalist setting',
    description: 'Direct-trade coffee roasters providing artisan beverages, organic catering, and flexible evening event space hosting workshops and business meetups.',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTjkNN5Sv8nWJaAsSFqVt6YHMZBILuSuC6Iwq1XV1BV9tUEeJEhRjEBWk9XfNHVqKgFLJzdj88sNTUd1cPKkboZEmBfDiwJSLuXjHEXQ9w-x-O_mbJfHFidqWxdTn9U9knYKO2DLvbRSLtH2BAfcKhp_ic98XdmkMM4c6_7ZslU7awW-usMOEPxtXNIdrb_msGSpsinZBxqiYvAYn9wjuf8zooWjFBaXaBoDeDd78KmuZvEWpbGY1u',
    rating: 4.9,
    reviewsCount: 112,
    trustScore: 98,
    isContactVerified: true,
    isBusinessVerified: true,
    verifiedInteractionsCount: 180,
    verifiedTransactionsCount: 95,
    services: [
      { id: 's5', name: 'Corporate Coffee Bar & Pop-up Setup', price: '$400 - $1,200', description: 'Full espresso bar with trained barista for offsite meetings, launches, and events.', tag: 'Catering' },
      { id: 's6', name: 'Private Event Space Rental', price: '$150 / hour', description: 'Minimalist industrial cafe space with AV setup for up to 60 guests.', tag: 'Venue' }
    ],
    offers: [
      { id: 'o3', title: '20% Off Design Consultations & Coffee Bundles', discount: '20% OFF', description: 'Elevate your space with our premium beverage bar. Offer ends Friday.', badge: 'Limited Time', expiry: 'Ends Friday', claimedCount: 19 }
    ],
    reviews: [
      { id: 'r4', author: 'Maya Lin', authorRole: 'Community Lead, TechHub', rating: 5, date: '4 days ago', content: 'Held our quarterly founder mixer here. Coffee was top tier and space was spotless.', isVerifiedInteraction: true }
    ]
  },
  {
    id: 'biz_zenith_studio',
    name: 'Zenith Studio',
    category: 'Wellness & Fitness',
    subcategory: 'Mindfulness & Movement',
    location: 'West Loop, Chicago, IL',
    address: '833 W Randolph St, Chicago, IL',
    tagLine: 'Premium yoga, sound baths, and corporate mindfulness workshops',
    description: 'Serene wellness studio dedicated to restorative movement, corporate stress-reduction retreats, and holistic team workshops.',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeSxOA8lAsogHPtmrDnfrJUbdWCHmzDfDCOOgOkxt-W77MnlvGGUst445rBfM63IRTo-CjsTpySFvAf5oDxz6M5EHaZv-vEgs150MgxuvxpIc32ONJepBW_JpfHEvKf45FipYwgkeZQrl775xk70iN_ZcI82k7Fxi378lPgpI6V3zILe55itscy2MkB7uVz4YvATT4HLxmH8iYliaLPhOBpbt-T3BCmeqEbg0IuED01GVuyoBMOkX3',
    rating: 4.8,
    reviewsCount: 76,
    trustScore: 92,
    isContactVerified: true,
    isBusinessVerified: true,
    verifiedInteractionsCount: 89,
    verifiedTransactionsCount: 44,
    services: [
      { id: 's7', name: 'Corporate Wellness & Desk Ergonomics Workshop', price: '$450', description: '60-minute guided mindfulness and mobility session on-site or virtual.', tag: 'Corporate' },
      { id: 's8', name: 'Unlimited Monthly Studio Pass', price: '$140 / mo', description: 'Access to 40+ weekly classes and member networking lounge.', tag: 'Membership' }
    ],
    offers: [
      { id: 'o4', title: 'Free 14-Day Network Access Trial', discount: '100% FREE', description: 'Connect with premium wellness instructors for 14 days, completely free.', badge: 'New Member', expiry: 'Ongoing', claimedCount: 31 }
    ],
    reviews: [
      { id: 'r5', author: 'David K.', authorRole: 'HR Manager, PivotHQ', rating: 5, date: '1 month ago', content: 'Our engineering team loved the sound bath and mobility session. Will book monthly.', isVerifiedInteraction: true }
    ]
  },
  {
    id: 'biz_aura_boutique',
    name: 'Aura Boutique',
    category: 'Retail & Fashion',
    subcategory: 'Sustainable Goods',
    location: 'Wicker Park, Chicago, IL',
    address: '1540 N Damen Ave, Chicago, IL',
    tagLine: 'Curated sustainable fashion, handcrafted goods, and local lifestyle brands',
    description: 'Boutique retail space showcasing ethical designers and eco-friendly home goods, with an active shelf-share program for local makers.',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAV5yf4YoNcsJRshPfw4dhWaB3no_21wp9jif8X3vw2pWfXK0IdVx3OtlOi1joBnK-bCq0ZkVhhyT9oTbPiKCp7jnZZ0QLlz6eF_WRVPlk2WCzftTO5AZEXndvt0YNdT8cogj3GVPnJUBv_jlySXwNsMjiqW1qFTH9CxN1Jgt8EGy3itDlNpixf9LvbJputNwlhYWgUt1FHz1Lid8OHL1xt85Ofu1Rq7p2xxrY38eWXxJPS-OAv7zY5',
    rating: 4.7,
    reviewsCount: 54,
    trustScore: 90,
    isContactVerified: true,
    isBusinessVerified: true,
    verifiedInteractionsCount: 71,
    verifiedTransactionsCount: 38,
    services: [
      { id: 's9', name: 'Artisan Shelf Placement & Consignment', price: '15% commission', description: 'Prime retail display for local sustainable product creators.', tag: 'Partnership' },
      { id: 's10', name: 'Private Styling & Gift Curation', price: '$75 / hr', description: 'Personalized wardrobe and corporate gift box packaging.', tag: 'Service' }
    ],
    offers: [
      { id: 'o5', title: '15% Off First Consignment Showcase', discount: '15% OFF', description: 'For local creators launching their first physical retail capsule.', badge: 'Creator Offer', expiry: 'Ends next week', claimedCount: 8 }
    ],
    reviews: [
      { id: 'r6', author: 'Claire Dupont', authorRole: 'Candle Maker, Lumina Studio', rating: 5, date: '3 weeks ago', content: 'Consigned 40 units and sold out within 10 days. The customer demographic match was perfect.', isVerifiedInteraction: true }
    ]
  },
  {
    id: 'biz_lens_focus',
    name: 'Lens & Light Media',
    category: 'Event Media & Photography',
    subcategory: 'Photo & Video Production',
    location: 'Vijayawada / Chicago Metro',
    address: 'MG Road, Vijayawada / Michigan Ave, Chicago',
    tagLine: 'High-end event photography, video reels, and corporate coverage',
    description: 'Specializing in commercial event photography, student festivals, brand activations, and rapid turnaround social media recap reels.',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWuOihfTGCnByAiN_xgccZS-2QZdgTh2f5aqQuijCV5hnfA-ILMzr7bEavv-Iv22woKiCWuMG9C-YPnmTSWTa6ZyvVJ9XtAlfb7DoX4LiqcVbQ4WkqLNEfD4AIu_SLXnJknbPjBkw03SkQDOGeGxAqcjbiUW_x14sx4vJWR9WSgVWDMh8zCcH5J67__eFOaal3eAtfcr_x5OzjLTaREzAtWkotS7g247NH4HguJxjfUTfqRwhzZz6h',
    rating: 4.9,
    reviewsCount: 62,
    trustScore: 97,
    isContactVerified: true,
    isBusinessVerified: true,
    verifiedInteractionsCount: 94,
    verifiedTransactionsCount: 68,
    services: [
      { id: 's11', name: 'Event Photography & 24hr Edited Reel', price: '₹7,500 - ₹12,000 ($350 - $600)', description: 'Full event coverage with 150+ high-res photos and 60s highlight video.', tag: 'Bestseller' },
      { id: 's12', name: 'College Fest & Campus Coverage Package', price: '₹8,000 ($400)', description: 'Multi-camera team tailored for cultural and technical symposiums.', tag: 'Event' }
    ],
    offers: [
      { id: 'o6', title: 'Complimentary Aerial Drone Footage', discount: 'Free Drone Add-on', description: 'Included with any 6+ hour event photography booking this month.', badge: 'Special', expiry: 'Ends in 10 days', claimedCount: 12 }
    ],
    reviews: [
      { id: 'r7', author: 'Rahul Varma', authorRole: 'Student Council President, VJIT', rating: 5, date: '5 days ago', content: 'Turned our annual cultural fest photos around in 18 hours. Outstanding quality and punctual.', isVerifiedInteraction: true }
    ]
  }
];

export const INITIAL_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp_local_lead_1',
    title: 'A customer nearby is looking for your service',
    type: 'local_lead',
    category: 'Commercial Cleaning & Logistics',
    location: 'Downtown Area (2.1 miles away)',
    distance: '2.1 mi',
    budget: '$800 - $1,500',
    timing: 'This Weekend (Sept 14)',
    description: 'A high-intent search matches your business profile within a 5-mile radius. Needs pallet movement and warehouse staging for a 2-day pop-up expo.',
    requesterId: 'cust_sarah_m',
    requesterName: 'Sarah Miller',
    requesterRole: 'customer',
    requesterAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    requesterVerified: true,
    matchStrength: 'Strong match',
    matchReasons: ['Same location (Downtown)', 'Within budget range ($1,200)', 'Available on requested dates', 'High operational overlap'],
    status: 'open',
    visibility: 'verified_only',
    responsesCount: 2,
    createdAt: 'Just now'
  },
  {
    id: 'opp_partner_1',
    title: '3 businesses could be potential collaboration partners',
    type: 'partnership',
    category: 'Co-Marketing & Student Audience',
    location: 'Near Campus & Downtown',
    distance: '1.4 mi',
    budget: 'Revenue Share / Cross-Promo',
    timing: 'Ongoing Q3 Campaign',
    description: 'Based on your shared customer demographics (college students and young professionals), these businesses present strong co-marketing potential for back-to-school bundles.',
    requesterId: 'biz_nexus_marketing',
    requesterName: 'Nexus Marketing + 2 Partners',
    requesterRole: 'business',
    requesterAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmS3_IGvhcOYA73fkBjLXiJHnWmz3QtKw63qypyBSvTiAWrkcTKiSFB6cyNQbZ1yjPBsQIarQd0WFEXO4gL46XiNpQ82oNY2E6cmQLDuO30z1QYWdtpH-N8aSbzRqQo0CnoLPt39Ohdj_R0YIjaucvDWitFGwzOg-acLAOCcPZSZxraeuSeqnAQuByHgZ-FnpXU6CASLZAHLwcr9SfxUl-P9-bKaanh8w_a2DN0svAVmcovYkAuMxl',
    requesterVerified: true,
    matchStrength: 'Strong match',
    matchReasons: ['Complementary services (Beverage + Wellness)', '82% audience demographic overlap', 'Mutual verified trust rating > 90%'],
    status: 'interested',
    visibility: 'public',
    responsesCount: 5,
    createdAt: '2h ago'
  },
  {
    id: 'opp_photo_event',
    title: 'Looking for a photographer for college annual fest',
    type: 'customer_need',
    category: 'Event Photography',
    location: 'Vijayawada / Downtown Campus',
    distance: '3.0 mi',
    budget: '₹8,000 ($400)',
    timing: 'Sept 12 · 4:00 PM - 10:00 PM',
    description: 'Need an energetic photographer and videographer team for our 600-person college annual cultural gala. Must capture stage performances, lighting, and guest arrivals.',
    requesterId: 'cust_ananya_k',
    requesterName: 'Ananya Krishnan',
    requesterRole: 'customer',
    requesterAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    requesterVerified: true,
    matchStrength: 'Strong match',
    matchReasons: ['Same category (Photography)', 'Exact date match (Sept 12)', 'Within target budget (₹8,000)', 'Verified campus organizer'],
    status: 'matching',
    visibility: 'public',
    responsesCount: 4,
    createdAt: '3h ago'
  },
  {
    id: 'opp_demand_api',
    title: 'Demand Gap: 14 people seeking B2B API integrations',
    type: 'demand_gap',
    category: 'Software & Integrations',
    location: 'Chicago Metro',
    budget: 'Avg. $1,800 - $3,500',
    timing: 'Immediate Need',
    description: '14 businesses in your area are currently searching for custom ERP/inventory webhooks and QuickBooks API connections with only 2 active providers available.',
    requesterId: 'sys_growvia_engine',
    requesterName: 'Growvia Market Intelligence',
    requesterRole: 'business',
    requesterVerified: true,
    matchStrength: 'Good match',
    matchReasons: ['Low local supplier density (2 providers)', 'High commercial intent', 'Average budget +40% above baseline'],
    status: 'open',
    visibility: 'public',
    responsesCount: 1,
    createdAt: '4h ago'
  },
  {
    id: 'opp_home_renov',
    title: 'Home Renovation & Kitchen Workspace Consultation',
    type: 'business_offer',
    category: 'Home & Architecture',
    location: '0.5 mi away',
    distance: '0.5 mi',
    budget: 'Free Initial 45-min Consult',
    timing: 'Available This Week',
    description: 'BuildRight Contracting is offering complimentary on-site layout evaluations and 3D floorplan consultations this week for residential workspaces.',
    requesterId: 'biz_buildright',
    requesterName: 'BuildRight Contracting',
    requesterRole: 'business',
    requesterAvatar: 'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f7?w=100&auto=format&fit=crop&q=80',
    requesterVerified: true,
    matchStrength: 'Good match',
    matchReasons: ['Immediate availability', 'Under 1 mile away', 'Free promotional tier'],
    status: 'open',
    visibility: 'public',
    responsesCount: 8,
    createdAt: '1d ago'
  },
  {
    id: 'opp_farmers_mkt',
    title: 'Local Farmers Market Stall Setup & Maker Space',
    type: 'customer_need',
    category: 'Community & Retail',
    location: '1.2 mi away · Grant Park',
    distance: '1.2 mi',
    budget: 'Stipend + Free Stall space',
    timing: 'This Saturday 7:00 AM',
    description: 'Looking for 3 volunteers and 2 local artisan vendors to help coordinate and showcase goods at the community weekend market.',
    requesterId: 'cust_jordan_t',
    requesterName: 'Jordan Taylor',
    requesterRole: 'customer',
    requesterAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    requesterVerified: true,
    matchStrength: 'Good match',
    matchReasons: ['Community verified', 'Nearby location', 'Strong local audience overlap'],
    status: 'in_progress',
    visibility: 'public',
    responsesCount: 6,
    createdAt: '1d ago'
  }
];

export const INITIAL_EXPERIMENTS: GrowthExperiment[] = [
  {
    id: 'exp_weekend_cust',
    title: 'Increase weekend customers',
    goal: 'Boost Saturday & Sunday footfall for specialty beverages and artisan pastry boxes',
    audience: 'Young professionals and students within 3 miles',
    budget: '$320',
    duration: '14 Days (Active: Day 9)',
    offer: 'Free cold brew upgrade with any weekend brunch box order',
    partnerBusinessName: 'Zenith Studio (Cross-ticket voucher)',
    partnerBusinessId: 'biz_zenith_studio',
    status: 'running',
    funnel: {
      reach: 12400,
      engagement: 1820,
      leads: 45,
      conversions: null
    },
    recommendedNextStep: {
      text: 'Try a referral campaign with your highest-value customers to double Saturday morning reservations.',
      actionLabel: 'Draft Referral Campaign',
      actionType: 'referral_test'
    },
    createdAt: '9 days ago'
  },
  {
    id: 'exp_summer_discount',
    title: 'Summer Discount Promo',
    goal: 'Acquire new quarterly corporate catering clients',
    audience: 'Office managers and tech startups in Downtown & West Loop',
    budget: '$450',
    duration: '7 Days',
    offer: '20% off first corporate coffee bar setup + free pastry tray',
    status: 'completed',
    funnel: {
      reach: 18600,
      engagement: 3200,
      leads: 58,
      conversions: 11
    },
    completedResult: {
      conversionRate: '+18%',
      newLeads: 42,
      percentImprovement: '+18% conversion improvement',
      summary: '11 new enterprise contracts closed with an average recurring monthly value of $820.'
    },
    recommendedNextStep: {
      text: 'Launch an automated loyalty renewal test to convert the 11 acquired contracts into 6-month commitments.',
      actionLabel: 'Setup Loyalty Loop',
      actionType: 'loyalty_test'
    },
    createdAt: '3 weeks ago'
  }
];

export const INITIAL_DEMAND_GAPS: DemandGap[] = [
  {
    id: 'gap_event_photo',
    category: 'Event Photography & Video',
    activeRequestsCount: 14,
    availableProvidersCount: 4,
    averageBudget: '₹7,500 ($380)',
    location: 'Vijayawada / Chicago Metro',
    growthRate: '+34% MoM',
    suggestedAction: 'Create an event photography package to capture 10+ unfulfilled requests.'
  },
  {
    id: 'gap_b2b_api',
    category: 'B2B API & Webhook Integrations',
    activeRequestsCount: 18,
    availableProvidersCount: 2,
    averageBudget: '$2,400',
    location: 'Regional Midwest',
    growthRate: '+45% MoM',
    suggestedAction: 'List custom connector services to access high-budget enterprise leads.'
  },
  {
    id: 'gap_organic_catering',
    category: 'Organic Workplace Catering',
    activeRequestsCount: 9,
    availableProvidersCount: 3,
    averageBudget: '$650 / event',
    location: 'West Loop / River North',
    growthRate: '+22% MoM',
    suggestedAction: 'Partner with a local roastery or bakery for joint office lunch deliveries.'
  }
];

export const INITIAL_CONNECTIONS: NetworkConnection[] = [
  {
    id: 'conn_1',
    businessId: 'biz_zenith_studio',
    name: 'Zenith Studio',
    category: 'Wellness & Mindfulness',
    connectionType: 'Potential Partner',
    location: 'West Loop, Chicago (0.8 mi)',
    reason: 'Both businesses target health-conscious professionals with high disposable income. Great for cross-promotional vouchers.',
    audienceOverlap: '84% Audience Overlap',
    status: 'recommended',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeSxOA8lAsogHPtmrDnfrJUbdWCHmzDfDCOOgOkxt-W77MnlvGGUst445rBfM63IRTo-CjsTpySFvAf5oDxz6M5EHaZv-vEgs150MgxuvxpIc32ONJepBW_JpfHEvKf45FipYwgkeZQrl775xk70iN_ZcI82k7Fxi378lPgpI6V3zILe55itscy2MkB7uVz4YvATT4HLxmH8iYliaLPhOBpbt-T3BCmeqEbg0IuED01GVuyoBMOkX3'
  },
  {
    id: 'conn_2',
    businessId: 'biz_nexus_marketing',
    name: 'Nexus Marketing Studio',
    category: 'Growth Agency',
    connectionType: 'Potential Creator',
    location: 'National / Remote',
    reason: 'Strong local video production capabilities and active newsletter readership among 12,000+ local retail buyers.',
    audienceOverlap: '78% Engagement Alignment',
    status: 'recommended',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmS3_IGvhcOYA73fkBjLXiJHnWmz3QtKw63qypyBSvTiAWrkcTKiSFB6cyNQbZ1yjPBsQIarQd0WFEXO4gL46XiNpQ82oNY2E6cmQLDuO30z1QYWdtpH-N8aSbzRqQo0CnoLPt39Ohdj_R0YIjaucvDWitFGwzOg-acLAOCcPZSZxraeuSeqnAQuByHgZ-FnpXU6CASLZAHLwcr9SfxUl-P9-bKaanh8w_a2DN0svAVmcovYkAuMxl'
  },
  {
    id: 'conn_3',
    businessId: 'biz_acme_logistics',
    name: 'Acme Logistics Hub',
    category: 'Supply Chain & Storage',
    connectionType: 'Potential Supplier',
    location: 'Chicago, IL (2.1 mi)',
    reason: 'Provides cold-storage distribution and eco-friendly packaging materials in your required volume tier at discounted wholesale rates.',
    audienceOverlap: 'Direct Supply Match',
    status: 'connected',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnVKnsror5Pgu6cCCWCR0VaNe_vurjpVbW5SMrgGTpNjbUd5DFQBm7VfftOZEVHmsJPEXI5szIvw3WRA9_VCgiU1xOuFd2RVTDTqaeOa3D5nhpye5b0efhh5ZNrJxigq4xSiwLbIPv73ihh9KYHrgd-P-PnBwQk3X68QaFnmXgEwoPsBTWXZIaK18XCICF8OskFyY5cuSHJa2Idc4M19mg8exAZTpnF9FzSyt7-7EePCTRE7toYK8Q'
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv_1',
    partnerId: 'cust_sarah_m',
    partnerName: 'Sarah Miller',
    partnerRole: 'customer',
    partnerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    partnerVerified: true,
    opportunityContext: {
      id: 'opp_local_lead_1',
      title: 'Commercial Cleaning & Logistics Staging',
      category: 'Logistics',
      budget: '$1,200',
      status: 'connected'
    },
    lastUpdated: '10m ago',
    messages: [
      {
        id: 'm1',
        senderId: 'cust_sarah_m',
        senderName: 'Sarah Miller',
        senderRole: 'customer',
        text: 'Hi! I saw your profile on Growvia matching our pop-up staging requirements for this weekend.',
        timestamp: '11:42 AM',
        isRead: true
      },
      {
        id: 'm2',
        senderId: 'biz_current_user',
        senderName: 'Growvia Business Hub',
        senderRole: 'business',
        text: 'Hello Sarah! Yes, we have 2 dedicated staging crew members and vehicle dispatch available for Saturday morning. What is the exact delivery window?',
        timestamp: '11:48 AM',
        isRead: true
      },
      {
        id: 'm3',
        senderId: 'cust_sarah_m',
        senderName: 'Sarah Miller',
        senderRole: 'customer',
        text: 'We need loading between 8:00 AM and 10:30 AM at the West Grand warehouse. Can we confirm the $1,200 quote on-platform?',
        timestamp: 'Just now',
        isRead: false
      }
    ]
  },
  {
    id: 'conv_2',
    partnerId: 'biz_zenith_studio',
    partnerName: 'Zenith Studio',
    partnerRole: 'business',
    partnerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeSxOA8lAsogHPtmrDnfrJUbdWCHmzDfDCOOgOkxt-W77MnlvGGUst445rBfM63IRTo-CjsTpySFvAf5oDxz6M5EHaZv-vEgs150MgxuvxpIc32ONJepBW_JpfHEvKf45FipYwgkeZQrl775xk70iN_ZcI82k7Fxi378lPgpI6V3zILe55itscy2MkB7uVz4YvATT4HLxmH8iYliaLPhOBpbt-T3BCmeqEbg0IuED01GVuyoBMOkX3',
    partnerVerified: true,
    opportunityContext: {
      id: 'opp_partner_1',
      title: 'Co-Marketing Weekend Voucher Campaign',
      category: 'Partnership',
      status: 'in_progress'
    },
    lastUpdated: '1h ago',
    messages: [
      {
        id: 'm4',
        senderId: 'biz_zenith_studio',
        senderName: 'Zenith Studio',
        senderRole: 'business',
        text: 'Hey team! The shared experiment results looking really promising. We have generated 45 qualified leads so far!',
        timestamp: '9:30 AM',
        isRead: true
      },
      {
        id: 'm5',
        senderId: 'biz_current_user',
        senderName: 'Growvia Business Hub',
        senderRole: 'business',
        text: 'That is fantastic! Let us extend the voucher code for another 7 days to capture the end-of-month surge.',
        timestamp: '10:15 AM',
        isRead: true
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1',
    title: 'New High-Intent Local Match',
    description: 'A customer nearby is looking for your service within a 5-mile radius.',
    timestamp: 'Just now',
    read: false,
    type: 'lead',
    linkTab: 'discover'
  },
  {
    id: 'n2',
    title: 'Partnership Recommendation',
    description: 'Zenith Studio has an 84% audience overlap with your target customers.',
    timestamp: '2h ago',
    read: false,
    type: 'match',
    linkTab: 'network'
  },
  {
    id: 'n3',
    title: 'Experiment Milestones',
    description: 'Increase weekend customers reached 1,820 engagements (+18% above benchmark).',
    timestamp: '5h ago',
    read: true,
    type: 'experiment',
    linkTab: 'experiments'
  },
  {
    id: 'n4',
    title: 'Demand Gap Emerging',
    description: '14 active requests logged for Event Photography in Vijayawada / Metro with low supply.',
    timestamp: '1d ago',
    read: true,
    type: 'demand',
    linkTab: 'insights'
  }
];
