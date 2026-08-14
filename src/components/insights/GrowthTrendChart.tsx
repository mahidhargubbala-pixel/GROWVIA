import React, { useState } from 'react';
import { BarChart3, TrendingUp, Calendar, Zap, ArrowUpRight } from 'lucide-react';

interface DataPoint {
  date: string;
  revenue: number;
  leads: number;
  conversion: number;
  dealSize: number;
}

const TIMEFRAME_DATA: Record<'7d' | '30d' | '90d' | '1y', DataPoint[]> = {
  '7d': [
    { date: 'Mon', revenue: 1450, leads: 12, conversion: 28.5, dealSize: 320 },
    { date: 'Tue', revenue: 1920, leads: 16, conversion: 31.0, dealSize: 360 },
    { date: 'Wed', revenue: 1680, leads: 14, conversion: 29.4, dealSize: 310 },
    { date: 'Thu', revenue: 2450, leads: 22, conversion: 35.8, dealSize: 410 },
    { date: 'Fri', revenue: 3100, leads: 28, conversion: 38.2, dealSize: 450 },
    { date: 'Sat', revenue: 3850, leads: 34, conversion: 42.0, dealSize: 490 },
    { date: 'Sun', revenue: 2980, leads: 25, conversion: 36.5, dealSize: 430 }
  ],
  '30d': [
    { date: 'Week 1', revenue: 8400, leads: 64, conversion: 30.2, dealSize: 380 },
    { date: 'Week 2', revenue: 10250, leads: 82, conversion: 33.5, dealSize: 410 },
    { date: 'Week 3', revenue: 13800, leads: 108, conversion: 37.8, dealSize: 445 },
    { date: 'Week 4', revenue: 16950, leads: 132, conversion: 41.2, dealSize: 485 }
  ],
  '90d': [
    { date: 'Month 1', revenue: 34500, leads: 280, conversion: 31.5, dealSize: 395 },
    { date: 'Month 2', revenue: 42800, leads: 340, conversion: 35.0, dealSize: 425 },
    { date: 'Month 3', revenue: 56400, leads: 430, conversion: 39.8, dealSize: 470 }
  ],
  '1y': [
    { date: 'Q1', revenue: 78000, leads: 620, conversion: 29.5, dealSize: 380 },
    { date: 'Q2', revenue: 104000, leads: 810, conversion: 33.2, dealSize: 415 },
    { date: 'Q3', revenue: 138000, leads: 1040, conversion: 36.8, dealSize: 460 },
    { date: 'Q4', revenue: 182000, leads: 1350, conversion: 41.5, dealSize: 510 }
  ]
};

export const GrowthTrendChart: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('7d');
  const [activeMetric, setActiveMetric] = useState<'revenue' | 'leads' | 'conversion'>('revenue');
  const [chartType, setChartType] = useState<'curve' | 'bar3d'>('curve');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const rawData = TIMEFRAME_DATA[timeframe];

  // Helper to extract values
  const values = rawData.map((d) => d[activeMetric]);
  const maxValue = Math.max(...values) * 1.15;
  const minValue = 0;

  // Formatting helpers
  const formatVal = (val: number) => {
    if (activeMetric === 'revenue') return `$${val.toLocaleString()}`;
    if (activeMetric === 'conversion') return `${val.toFixed(1)}%`;
    return `${val} leads`;
  };

  // Dimensions for SVG
  const width = 600;
  const height = 220;
  const paddingX = 40;
  const paddingY = 30;

  const points = rawData.map((d, i) => {
    const x = paddingX + (i / (rawData.length - 1)) * (width - paddingX * 2);
    const val = d[activeMetric];
    const y = height - paddingY - ((val - minValue) / (maxValue - minValue)) * (height - paddingY * 2);
    return { x, y, data: d };
  });

  // Construct smooth SVG path
  const pathD = points.reduce((acc, point, i, arr) => {
    if (i === 0) return `M ${point.x},${point.y}`;
    const prev = arr[i - 1];
    const cx = (prev.x + point.x) / 2;
    return `${acc} C ${cx},${prev.y} ${cx},${point.y} ${point.x},${point.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x},${height - paddingY} L ${points[0].x},${height - paddingY} Z`;

  const activePoint = hoveredIndex !== null ? points[hoveredIndex] : points[points.length - 1];

  return (
    <div className="bg-white border border-[#e3e3de] rounded-2xl p-6 shadow-subtle flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#eeeee9]">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#d7e7d4] flex items-center justify-center text-[#516051]">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1a1c19]">Growth Trajectory & Revenue Velocity</h2>
              <p className="text-xs text-[#747872]">Interactive multi-dimensional statistical performance curve</p>
            </div>
          </div>
        </div>

        {/* Controls: Timeframe & Metric Selector */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Metric Selector */}
          <div className="flex items-center bg-[#f4f4ef] p-1 rounded-xl">
            <button
              onClick={() => setActiveMetric('revenue')}
              className={`text-xs font-bold px-2.5 py-1 rounded-lg transition-all ${
                activeMetric === 'revenue'
                  ? 'bg-white text-[#1a1c19] shadow-xs'
                  : 'text-[#5f5e5e] hover:text-[#1a1c19]'
              }`}
            >
              Revenue ($)
            </button>
            <button
              onClick={() => setActiveMetric('leads')}
              className={`text-xs font-bold px-2.5 py-1 rounded-lg transition-all ${
                activeMetric === 'leads'
                  ? 'bg-white text-[#1a1c19] shadow-xs'
                  : 'text-[#5f5e5e] hover:text-[#1a1c19]'
              }`}
            >
              Lead Volume
            </button>
            <button
              onClick={() => setActiveMetric('conversion')}
              className={`text-xs font-bold px-2.5 py-1 rounded-lg transition-all ${
                activeMetric === 'conversion'
                  ? 'bg-white text-[#1a1c19] shadow-xs'
                  : 'text-[#5f5e5e] hover:text-[#1a1c19]'
              }`}
            >
              Conversion (%)
            </button>
          </div>

          {/* Timeframe Buttons */}
          <div className="flex items-center bg-[#fafaf4] border border-[#e3e3de] p-0.5 rounded-lg text-xs font-semibold">
            {(['7d', '30d', '90d', '1y'] as const).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTimeframe(t);
                  setHoveredIndex(null);
                }}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  timeframe === t
                    ? 'bg-[#516051] text-white'
                    : 'text-[#5f5e5e] hover:text-[#1a1c19]'
                }`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time Metric Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 my-3 px-4 bg-[#fafaf4] border border-[#eeeee9] rounded-xl">
        <div>
          <span className="text-[10px] uppercase font-bold text-[#747872]">Inspected Period</span>
          <div className="text-sm font-bold text-[#1a1c19]">{activePoint.data.date}</div>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-[#747872]">Gross Revenue</span>
          <div className="text-sm font-extrabold text-[#516051]">${activePoint.data.revenue.toLocaleString()}</div>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-[#747872]">Qualified Inquiries</span>
          <div className="text-sm font-bold text-[#1a1c19]">{activePoint.data.leads} Leads</div>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-[#747872]">Avg Deal Value</span>
          <div className="text-sm font-bold text-[#1a1c19]">${activePoint.data.dealSize} / deal</div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="relative w-full overflow-hidden my-2">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible select-none"
        >
          <defs>
            {/* Smooth Area Gradient */}
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#516051" stopOpacity="0.32" />
              <stop offset="60%" stopColor="#516051" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#516051" stopOpacity="0.0" />
            </linearGradient>

            {/* Grid Line Pattern */}
            <pattern id="chartGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f0f0ea" strokeWidth="1" />
            </pattern>

            <filter id="pointGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#516051" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Grid lines */}
          <rect x={paddingX} y={paddingY} width={width - paddingX * 2} height={height - paddingY * 2} fill="url(#chartGrid)" opacity="0.8" />

          {/* Horizontal Reference Lines */}
          {[0.25, 0.5, 0.75, 1.0].map((ratio, idx) => {
            const yPos = height - paddingY - ratio * (height - paddingY * 2);
            return (
              <line
                key={idx}
                x1={paddingX}
                y1={yPos}
                x2={width - paddingX}
                y2={yPos}
                stroke="#e8e8e3"
                strokeDasharray="4 4"
              />
            );
          })}

          {/* 3D Extruded Bar Columns (if bar mode or secondary visualization) */}
          {points.map((pt, i) => {
            const isHovered = hoveredIndex === i;
            const barWidth = Math.max(14, (width - paddingX * 2) / (points.length * 3));
            const barHeight = height - paddingY - pt.y;

            return (
              <g key={i} className="transition-all duration-300">
                {/* 3D Bar shadow and side */}
                <rect
                  x={pt.x - barWidth / 2 + 3}
                  y={pt.y - 2}
                  width={barWidth}
                  height={barHeight}
                  fill="#3d493d"
                  opacity={isHovered ? 0.35 : 0.12}
                  rx="3"
                />
                {/* Front Bar Pillar */}
                <rect
                  x={pt.x - barWidth / 2}
                  y={pt.y}
                  width={barWidth}
                  height={barHeight}
                  fill={isHovered ? '#516051' : '#b8ccb6'}
                  opacity={isHovered ? 0.9 : 0.45}
                  rx="3"
                />
              </g>
            );
          })}

          {/* Curved Area Fill */}
          <path d={areaD} fill="url(#areaGradient)" />

          {/* Glowing Trend Line */}
          <path
            d={pathD}
            fill="none"
            stroke="#516051"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Active Data Points and Interactive Scrub Hitboxes */}
          {points.map((pt, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <g 
                key={i} 
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(i)}
              >
                {/* Invisible Hover Scrub Area */}
                <rect
                  x={pt.x - 25}
                  y={0}
                  width={50}
                  height={height}
                  fill="transparent"
                />

                {/* Vertical Cursor Guide Line */}
                {isHovered && (
                  <line
                    x1={pt.x}
                    y1={paddingY}
                    x2={pt.x}
                    y2={height - paddingY}
                    stroke="#516051"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                )}

                {/* Outer halo */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 8 : 5}
                  fill="#ffffff"
                  stroke="#516051"
                  strokeWidth={isHovered ? 3.5 : 2.5}
                  filter="url(#pointGlow)"
                  className="transition-all duration-300"
                />

                {/* Center dot */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 3.5 : 2}
                  fill="#516051"
                />

                {/* Bottom X-Axis Label */}
                <text
                  x={pt.x}
                  y={height - 8}
                  fill={isHovered ? '#1a1c19' : '#747872'}
                  fontSize="11"
                  fontWeight={isHovered ? 'bold' : 'normal'}
                  textAnchor="middle"
                >
                  {pt.data.date}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Action Footer Callout */}
      <div className="pt-3 border-t border-[#eeeee9] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#5f5e5e]">
        <div className="flex items-center gap-1.5 font-medium">
          <Zap className="w-3.5 h-3.5 text-[#516051]" />
          <span>Growth acceleration rate is currently pacing <strong>+24.6%</strong> ahead of local industry median.</span>
        </div>
        <span className="text-[11px] text-[#747872] italic">Updated 2 mins ago</span>
      </div>
    </div>
  );
};
