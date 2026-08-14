import React, { useState } from 'react';
import { NetworkConnection, BusinessProfile } from '../../types';
import { 
  Users2, 
  Handshake, 
  Video, 
  Truck, 
  Check, 
  MessageSquare, 
  MapPin, 
  ArrowRight, 
  Sparkles,
  Search
} from 'lucide-react';

interface BusinessNetworkProps {
  connections: NetworkConnection[];
  businesses: BusinessProfile[];
  onConnect: (connectionId: string) => void;
  onOpenMessage: (connection: NetworkConnection) => void;
  onSelectBusiness: (biz: BusinessProfile) => void;
}

export const BusinessNetwork: React.FC<BusinessNetworkProps> = ({
  connections,
  businesses,
  onConnect,
  onOpenMessage,
  onSelectBusiness
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const filteredConnections = connections.filter(conn => {
    const matchesFilter = filterType === 'all' || conn.connectionType === filterType;
    const matchesSearch = conn.name.toLowerCase().includes(search.toLowerCase()) || 
                          conn.category.toLowerCase().includes(search.toLowerCase()) ||
                          conn.reason.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getBadgeStyle = (type: NetworkConnection['connectionType']) => {
    switch (type) {
      case 'Potential Partner':
        return 'bg-[#d7e7d4] text-[#121e13] border-[#bbcbb9]';
      case 'Potential Creator':
        return 'bg-[#eeeee9] text-[#1a1c19] border-[#c4c8c0]';
      case 'Potential Supplier':
        return 'bg-[#f4f4ef] text-[#434842] border-[#e3e3de]';
      default:
        return 'bg-[#eeeee9] text-[#1a1c19]';
    }
  };

  const getIcon = (type: NetworkConnection['connectionType']) => {
    switch (type) {
      case 'Potential Partner':
        return <Handshake className="w-3.5 h-3.5 text-[#516051]" />;
      case 'Potential Creator':
        return <Video className="w-3.5 h-3.5 text-[#5c5d54]" />;
      case 'Potential Supplier':
        return <Truck className="w-3.5 h-3.5 text-[#5f5e5e]" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1c19] tracking-tight">Growth Network</h1>
          <p className="text-xs text-[#5f5e5e] mt-0.5">
            Connect with non-competing businesses, creators, and suppliers sharing your audience.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#747872]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search network..."
              className="bg-white border border-[#e3e3de] rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#1a1c19] focus:outline-none focus:border-[#1a1c19]"
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {[
          { id: 'all', label: 'All Connections' },
          { id: 'Potential Partner', label: 'Potential Partners' },
          { id: 'Potential Creator', label: 'Potential Creators' },
          { id: 'Potential Supplier', label: 'Suppliers & Logistics' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              filterType === tab.id
                ? 'bg-[#1a1c19] text-white'
                : 'bg-white text-[#5f5e5e] border border-[#e3e3de] hover:bg-[#f4f4ef]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Connection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredConnections.map((conn) => {
          const correspondingBiz = businesses.find(b => b.id === conn.businessId);

          return (
            <article
              key={conn.id}
              className="bg-white border border-[#e3e3de] rounded-xl p-5 flex flex-col justify-between shadow-subtle hover:border-[#516051] transition-all relative group"
            >
              <div>
                {/* Header with connection type badge */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={conn.avatar}
                      alt={conn.name}
                      className="w-11 h-11 rounded-full object-cover border border-[#e3e3de]"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-[#1a1c19] group-hover:text-[#516051] transition-colors">
                        {conn.name}
                      </h3>
                      <p className="text-xs text-[#5f5e5e]">{conn.category}</p>
                    </div>
                  </div>
                </div>

                {/* Connection Badge */}
                <div className="flex items-center justify-between my-2">
                  <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border flex items-center gap-1 ${getBadgeStyle(conn.connectionType)}`}>
                    {getIcon(conn.connectionType)}
                    {conn.connectionType}
                  </span>
                  <span className="text-[11px] font-bold text-[#516051]">
                    {conn.audienceOverlap}
                  </span>
                </div>

                {/* Why this connection? */}
                <div className="bg-[#f4f4ef] rounded-lg p-3 my-3 border border-[#eeeee9]">
                  <p className="text-[10px] font-bold text-[#747872] uppercase tracking-wider mb-1">
                    Why connect?
                  </p>
                  <p className="text-xs text-[#1a1c19] leading-relaxed">
                    {conn.reason}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-[#747872] mb-2">
                  <MapPin className="w-3 h-3 text-[#516051]" />
                  <span>{conn.location}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-[#eeeee9] flex items-center gap-2">
                {conn.status === 'connected' ? (
                  <button
                    onClick={() => onOpenMessage(conn)}
                    className="flex-1 bg-[#d7e7d4] text-[#121e13] text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 hover:bg-[#bbcbb9] transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Message
                  </button>
                ) : (
                  <button
                    onClick={() => onConnect(conn.id)}
                    className="flex-1 bg-[#1a1c19] hover:bg-[#2f312e] text-white text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Users2 className="w-3.5 h-3.5 text-[#d7e7d4]" />
                    Connect
                  </button>
                )}

                {correspondingBiz && (
                  <button
                    onClick={() => onSelectBusiness(correspondingBiz)}
                    className="px-3 border border-[#c4c8c0] rounded-lg text-xs font-semibold text-[#1a1c19] hover:bg-[#f4f4ef] py-2"
                  >
                    Profile
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
