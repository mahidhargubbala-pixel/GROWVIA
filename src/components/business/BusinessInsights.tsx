import React, { useState } from 'react';
import { DemandGap, Opportunity } from '../../types';
import { 
  TrendingUp, 
  TrendingDown,
  AlertTriangle, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Radar, 
  Compass, 
  Zap, 
  Clock,
  Layers,
  DollarSign,
  Users,
  Target,
  Activity,
  Sliders,
  Play,
  RotateCcw
} from 'lucide-react';
import { MetricCard3D } from '../insights/MetricCard3D';
import { PieChart3D, PieDataset } from '../insights/PieChart3D';
import { GrowthTrendChart } from '../insights/GrowthTrendChart';
import { ConversionFunnel3D } from '../insights/ConversionFunnel3D';
import { DemandGapMatrix } from '../insights/DemandGapMatrix';

interface BusinessInsightsProps {
  demandGaps: DemandGap[];
  opportunities: Opportunity[];
  onSelectOpportunity: (opp: Opportunity) => void;
  onExploreDemandGap: (gap: DemandGap) => void;
  onTakeAction: (actionType: string) => void;
}

// Rich Datasets for the 3D Pie / Donut Explorer
const PIE_DATASETS: PieDataset[] = [
  {
    id: 'revenue_channels',
    title: 'Revenue by Service Offering',
    totalLabel: 'Gross Output',
    totalValue: '$24,850',
    slices: [
      {
        id: 'catering',
        label: 'Artisan Corporate Catering',
        value: 9820,
        formattedValue: '$9,820',
        percentage: 39.5,
        color: '#516051',
        darkColor: '#343f34',
        description: 'Highest gross margin offering. Strong repeat cadence on corporate weekday breakfasts.',
        growth: '+32% MoM'
      },
      {
        id: 'staging',
        label: 'Pop-Up Staging & Decor',
        value: 6450,
        formattedValue: '$6,450',
        percentage: 25.9,
        color: '#6e856c',
        darkColor: '#4a5b48',
        description: 'Rapidly growing seasonal demand driven by local merchant collaborations.',
        growth: '+18% MoM'
      },
      {
        id: 'consulting',
        label: 'B2B Integration & Consulting',
        value: 5200,
        formattedValue: '$5,200',
        percentage: 20.9,
        color: '#8ba688',
        darkColor: '#5e725c',
        description: 'High value contracts with 88% retention rate across 6-month cycles.',
        growth: '+45% MoM'
      },
      {
        id: 'events',
        label: 'Private Event Bundles',
        value: 3380,
        formattedValue: '$3,380',
        percentage: 13.7,
        color: '#adcca9',
        darkColor: '#758d72',
        description: 'Weekend experiential dining packages with partner cross-promotions.',
        growth: '+12% MoM'
      }
    ]
  },
  {
    id: 'acquisition_sources',
    title: 'Customer Acquisition Sources',
    totalLabel: 'New Customers',
    totalValue: '184 Leads',
    slices: [
      {
        id: 'smart_match',
        label: 'Growvia Intent Matches',
        value: 83,
        formattedValue: '83 Leads',
        percentage: 45.1,
        color: '#516051',
        darkColor: '#343f34',
        description: 'High-affinity matches with verified local customer budget requests.',
        growth: '+54% MoM'
      },
      {
        id: 'co_marketing',
        label: 'Partner Cross-Promotions',
        value: 51,
        formattedValue: '51 Leads',
        percentage: 27.7,
        color: '#6e856c',
        darkColor: '#4a5b48',
        description: 'Referrals flowing from active wellness & artisan studio network partnerships.',
        growth: '+38% MoM'
      },
      {
        id: 'direct_search',
        label: 'Direct Directory Search',
        value: 31,
        formattedValue: '31 Leads',
        percentage: 16.8,
        color: '#8ba688',
        darkColor: '#5e725c',
        description: 'Organic local queries for verified local commercial providers.',
        growth: '+14% MoM'
      },
      {
        id: 'word_of_mouth',
        label: 'Customer Referral Loops',
        value: 19,
        formattedValue: '19 Leads',
        percentage: 10.4,
        color: '#adcca9',
        darkColor: '#758d72',
        description: 'Clients sharing promotional discounts with neighboring business owners.',
        growth: '+22% MoM'
      }
    ]
  },
  {
    id: 'regional_zones',
    title: 'Demand Concentration by Zone',
    totalLabel: 'Total Inquiries',
    totalValue: '298 Active',
    slices: [
      {
        id: 'downtown',
        label: 'Downtown & Financial District',
        value: 124,
        formattedValue: '124 Requests',
        percentage: 41.6,
        color: '#516051',
        darkColor: '#343f34',
        description: 'Heavy corporate appetite for ongoing artisan catering and catering subs.',
        growth: '+29% MoM'
      },
      {
        id: 'arts_district',
        label: 'Arts & Cultural Quarter',
        value: 86,
        formattedValue: '86 Requests',
        percentage: 28.9,
        color: '#6e856c',
        darkColor: '#4a5b48',
        description: 'Creative pop-ups, maker collaborations, and shared event activations.',
        growth: '+21% MoM'
      },
      {
        id: 'tech_corridor',
        label: 'North Tech Corridor',
        value: 58,
        formattedValue: '58 Requests',
        percentage: 19.5,
        color: '#8ba688',
        darkColor: '#5e725c',
        description: 'Fast-moving team offsites and wellness bundle requirements.',
        growth: '+34% MoM'
      },
      {
        id: 'westside',
        label: 'Westside Commercial Strip',
        value: 30,
        formattedValue: '30 Requests',
        percentage: 10.0,
        color: '#adcca9',
        darkColor: '#758d72',
        description: 'Emerging retail and boutique service partnerships.',
        growth: '+15% MoM'
      }
    ]
  }
];

export const BusinessInsights: React.FC<BusinessInsightsProps> = ({
  demandGaps,
  opportunities,
  onSelectOpportunity,
  onExploreDemandGap,
  onTakeAction
}) => {
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>('revenue_channels');
  const [simulationScenario, setSimulationScenario] = useState<'live' | 'surge' | 'dip' | 'collab'>('live');

  const currentDataset = PIE_DATASETS.find((d) => d.id === selectedDatasetId) || PIE_DATASETS[0];

  // Dynamic values based on active simulation scenario
  const getSimulatedMetrics = () => {
    switch (simulationScenario) {
      case 'surge':
        return {
          revenue: '$34,800',
          revChange: 41.8,
          revPositive: true,
          inquiries: '218 Requests',
          inqChange: 52.4,
          inqPositive: true,
          conversion: '44.2%',
          convChange: 9.6,
          convPositive: true,
          unmetValue: '$28,400',
          unmetChange: 35.0,
          unmetPositive: true,
          subtitle: 'Simulating Peak Season & Flash Co-Marketing Campaign'
        };
      case 'dip':
        return {
          revenue: '$19,200',
          revChange: 14.2,
          revPositive: false,
          inquiries: '94 Requests',
          inqChange: 22.5,
          inqPositive: false,
          conversion: '26.8%',
          convChange: 7.8,
          convPositive: false,
          unmetValue: '$11,600',
          unmetChange: 18.0,
          unmetPositive: false,
          subtitle: 'Simulating Low Season & Response Delay Bottlenecks'
        };
      case 'collab':
        return {
          revenue: '$29,400',
          revChange: 31.2,
          revPositive: true,
          inquiries: '184 Requests',
          inqChange: 38.0,
          inqPositive: true,
          conversion: '39.5%',
          convChange: 5.9,
          convPositive: true,
          unmetValue: '$22,100',
          unmetChange: 24.5,
          unmetPositive: true,
          subtitle: 'Simulating Active 3-Way Partner Referral Loop'
        };
      case 'live':
      default:
        return {
          revenue: '$24,850',
          revChange: 28.4,
          revPositive: true,
          inquiries: '142 Requests',
          inqChange: 18.2,
          inqPositive: true,
          conversion: '34.6%',
          convChange: 5.4,
          convPositive: true,
          unmetValue: '$18,400',
          unmetChange: 12.8,
          unmetPositive: true,
          subtitle: 'Real-Time Live Network Activity & Validated Transactions'
        };
    }
  };

  const metrics = getSimulatedMetrics();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header & Scenario Simulation Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1a1c19] tracking-tight">Growth & Market Insights</h1>
          <p className="text-xs text-[#5f5e5e] mt-0.5">
            {metrics.subtitle}
          </p>
        </div>

        {/* Live Scenario Simulator Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-[#fafaf4] border border-[#e3e3de] rounded-xl self-start md:self-auto text-xs">
          <span className="text-[11px] font-bold text-[#747872] px-2 flex items-center gap-1">
            <Sliders className="w-3.5 h-3.5" />
            <span>Scenario:</span>
          </span>
          <button
            onClick={() => setSimulationScenario('live')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              simulationScenario === 'live'
                ? 'bg-[#1a1c19] text-white shadow-xs'
                : 'text-[#5f5e5e] hover:text-[#1a1c19]'
            }`}
          >
            Live Baseline
          </button>
          <button
            onClick={() => setSimulationScenario('surge')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              simulationScenario === 'surge'
                ? 'bg-[#516051] text-white shadow-xs'
                : 'text-[#5f5e5e] hover:text-[#1a1c19]'
            }`}
          >
            🚀 Peak Surge
          </button>
          <button
            onClick={() => setSimulationScenario('dip')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              simulationScenario === 'dip'
                ? 'bg-[#ba1a1a] text-white shadow-xs'
                : 'text-[#5f5e5e] hover:text-[#1a1c19]'
            }`}
          >
            🍂 Off-Season Dip
          </button>
          <button
            onClick={() => setSimulationScenario('collab')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              simulationScenario === 'collab'
                ? 'bg-[#3b5e43] text-white shadow-xs'
                : 'text-[#5f5e5e] hover:text-[#1a1c19]'
            }`}
          >
            🤝 Partner Collab
          </button>
        </div>
      </div>

      {/* 4 Quantitative 3D Metrics with Animated Rising/Falling 3D Arrows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard3D
          id="metric-revenue"
          title="Gross Monthly Output"
          value={metrics.revenue}
          subValue="+$4,250 vs prev period"
          changePercent={metrics.revChange}
          isPositive={metrics.revPositive}
          timeframeText="Trailing 30-Day Period"
          benchmarkText="Top 10% in District"
          icon={<DollarSign className="w-4 h-4" />}
          accentColor="#516051"
        />

        <MetricCard3D
          id="metric-inquiries"
          title="Demand Inflow Velocity"
          value={metrics.inquiries}
          subValue="4.7 avg requests / day"
          changePercent={metrics.inqChange}
          isPositive={metrics.inqPositive}
          timeframeText="Pacing vs 30D Target"
          benchmarkText="1.8x Category Median"
          icon={<Users className="w-4 h-4" />}
          accentColor="#4a6350"
        />

        <MetricCard3D
          id="metric-conversion"
          title="Conversion Efficiency"
          value={metrics.conversion}
          subValue="148 closed contracts"
          changePercent={metrics.convChange}
          isPositive={metrics.convPositive}
          timeframeText="Inquiry to Contract"
          benchmarkText="+6.2% with Fast Quote"
          icon={<Target className="w-4 h-4" />}
          accentColor="#687e67"
        />

        <MetricCard3D
          id="metric-unmet"
          title="Unmet Addressable Gap"
          value={metrics.unmetValue}
          subValue="14 high-intent unserviced RFQs"
          changePercent={metrics.unmetChange}
          isPositive={metrics.unmetPositive}
          timeframeText="Local Market Opportunity"
          benchmarkText="7.1x Supply Imbalance"
          icon={<Radar className="w-4 h-4" />}
          accentColor="#3a483a"
        />
      </div>

      {/* Interactive 3D Open/Close Pie Chart & Segment Intelligence */}
      <PieChart3D
        dataset={currentDataset}
        availableDatasets={PIE_DATASETS}
        onSelectDataset={(id) => setSelectedDatasetId(id)}
      />

      {/* Growth Trajectory Trend Chart with SVG Area Curves & 3D Columns */}
      <GrowthTrendChart />

      {/* 3D Conversion Funnel & Leakage Diagnostics */}
      <ConversionFunnel3D onTakeAction={onTakeAction} />

      {/* Demand Gap Matrix & Deficit Ratios */}
      <DemandGapMatrix
        demandGaps={demandGaps}
        onExploreDemandGap={onExploreDemandGap}
      />

      {/* 3-Part Intelligence Framework: Opportunities | Bottlenecks | Next Actions */}
      <section className="space-y-4 pt-4 border-t border-[#eeeee9]">
        <div>
          <h2 className="text-lg font-bold text-[#1a1c19]">Actionable Intelligence Matrix</h2>
          <p className="text-xs text-[#5f5e5e]">Real synthesized priorities to accelerate revenue conversion.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1: Opportunities */}
          <div className="bg-white border border-[#e3e3de] rounded-2xl p-5 shadow-subtle flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#eeeee9]">
                <div className="w-8 h-8 rounded-lg bg-[#d7e7d4] flex items-center justify-center text-[#516051]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1a1c19]">Growth Opportunities</h3>
                  <p className="text-[11px] text-[#747872]">What can expand your business now?</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-[#fafaf4] border border-[#eeeee9] rounded-xl">
                  <span className="text-[10px] font-bold text-[#516051] uppercase">High Intent</span>
                  <h4 className="text-xs font-bold text-[#1a1c19] mt-0.5">
                    14 local businesses seeking B2B API integrations
                  </h4>
                  <p className="text-[11px] text-[#5f5e5e] mt-1">
                    Demand outpaces supply 7:1 in the regional zone with $5,200 avg ticket.
                  </p>
                </div>

                <div className="p-3 bg-[#fafaf4] border border-[#eeeee9] rounded-xl">
                  <span className="text-[10px] font-bold text-[#516051] uppercase">Co-Marketing Match</span>
                  <h4 className="text-xs font-bold text-[#1a1c19] mt-0.5">
                    Audience cross-sell with Zenith Studio
                  </h4>
                  <p className="text-[11px] text-[#5f5e5e] mt-1">
                    84% audience match for wellness & specialty catering bundles.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => onExploreDemandGap(demandGaps[0])}
              className="mt-4 text-xs font-bold text-[#516051] hover:underline flex items-center gap-1 pt-3 border-t border-[#eeeee9]"
            >
              Review All Market Opportunities <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Column 2: Bottlenecks */}
          <div className="bg-white border border-[#e3e3de] rounded-2xl p-5 shadow-subtle flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#eeeee9]">
                <div className="w-8 h-8 rounded-lg bg-[#eeeee9] flex items-center justify-center text-[#5c5d54]">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1a1c19]">Identified Friction</h3>
                  <p className="text-[11px] text-[#747872]">What is restricting throughput?</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-[#fafaf4] border border-[#eeeee9] rounded-xl">
                  <span className="text-[10px] font-bold text-[#5c5d54] uppercase">Response Time Lag</span>
                  <h4 className="text-xs font-bold text-[#1a1c19] mt-0.5">
                    2 incoming requests pending {'>'} 4 hours
                  </h4>
                  <p className="text-[11px] text-[#5f5e5e] mt-1">
                    Average response under 1 hour yields 3.2x higher conversion rate.
                  </p>
                </div>

                <div className="p-3 bg-[#fafaf4] border border-[#eeeee9] rounded-xl">
                  <span className="text-[10px] font-bold text-[#5c5d54] uppercase">Capacity Constraints</span>
                  <h4 className="text-xs font-bold text-[#1a1c19] mt-0.5">
                    Weekend booking slots filling at 95%
                  </h4>
                  <p className="text-[11px] text-[#5f5e5e] mt-1">
                    Spillover demand can be routed through trusted partner referral tiers.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => onTakeAction('resolve_pending')}
              className="mt-4 text-xs font-bold text-[#1a1c19] hover:underline flex items-center gap-1 pt-3 border-t border-[#eeeee9]"
            >
              Resolve Pending Requests <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Column 3: Next Actions */}
          <div className="bg-white border border-[#e3e3de] rounded-2xl p-5 shadow-subtle flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#eeeee9]">
                <div className="w-8 h-8 rounded-lg bg-[#d7e7d4] flex items-center justify-center text-[#516051]">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1a1c19]">High-Yield Next Actions</h3>
                  <p className="text-[11px] text-[#747872]">Recommended execution sequence</p>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => onSelectOpportunity(opportunities[0])}
                  className="w-full text-left p-3 bg-[#f4f4ef] hover:bg-[#e8e8e3] border border-[#e3e3de] rounded-xl transition-all block group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1a1c19] group-hover:text-[#516051]">
                      1. Respond to Sarah Miller
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#516051]" />
                  </div>
                  <p className="text-[11px] text-[#5f5e5e] mt-0.5">
                    $1,200 local pop-up staging opportunity matching this weekend.
                  </p>
                </button>

                <button
                  onClick={() => onTakeAction('referral_test')}
                  className="w-full text-left p-3 bg-[#f4f4ef] hover:bg-[#e8e8e3] border border-[#e3e3de] rounded-xl transition-all block group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1a1c19] group-hover:text-[#516051]">
                      2. Launch Referral Loop
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#516051]" />
                  </div>
                  <p className="text-[11px] text-[#5f5e5e] mt-0.5">
                    Activate top 15% happy customers with automated referral rewards.
                  </p>
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-[#eeeee9] text-[11px] text-[#747872] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#516051]" />
              <span>Calibrated with real-time local transaction records</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

