import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCard3DProps {
  id?: string;
  title: string;
  value: string;
  subValue?: string;
  changePercent: number;
  isPositive: boolean;
  timeframeText: string;
  benchmarkText?: string;
  icon: React.ReactNode;
  accentColor?: string;
}

export const MetricCard3D: React.FC<MetricCard3DProps> = ({
  id,
  title,
  value,
  subValue,
  changePercent,
  isPositive,
  timeframeText,
  benchmarkText,
  icon,
  accentColor = '#516051'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      id={id}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-white border border-[#e3e3de] hover:border-[#b8ccb6] rounded-2xl p-5 shadow-subtle hover:shadow-md transition-all duration-300 group overflow-hidden"
      style={{ perspective: '800px' }}
    >
      {/* Subtle background ambient light */}
      <div 
        className="absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-15 pointer-events-none transition-opacity duration-300"
        style={{ backgroundColor: isPositive ? '#516051' : '#ba1a1a' }}
      />

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <div 
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-sm transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundColor: accentColor }}
          >
            {icon}
          </div>
          <div>
            <h3 className="text-xs font-semibold text-[#5f5e5e] uppercase tracking-wider">{title}</h3>
            {benchmarkText && (
              <span className="text-[10px] text-[#747872]">{benchmarkText}</span>
            )}
          </div>
        </div>

        {/* 3D Animated Rising or Falling Arrow Badge */}
        <div 
          className="relative flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-300"
          style={{
            backgroundColor: isPositive ? '#e8f3e6' : '#fbe8e8',
            color: isPositive ? '#245924' : '#ba1a1a',
            transform: isHovered ? 'scale(1.08) translateZ(10px)' : 'scale(1)',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Animated 3D Arrow */}
          <div 
            className="relative flex items-center justify-center transition-transform duration-500"
            style={{
              transform: isPositive 
                ? (isHovered ? 'translateY(-3px) scale(1.15) rotate(-5deg)' : 'translateY(-1px)') 
                : (isHovered ? 'translateY(3px) scale(1.15) rotate(5deg)' : 'translateY(1px)')
            }}
          >
            {isPositive ? (
              <div className="relative">
                <ArrowUpRight className="w-4 h-4 stroke-[2.8]" />
                {/* 3D Elevation Depth Shadow */}
                <div className="absolute -bottom-0.5 left-0.5 w-3 h-1 bg-[#245924]/30 rounded-full blur-[1px] -z-10" />
              </div>
            ) : (
              <div className="relative">
                <ArrowDownRight className="w-4 h-4 stroke-[2.8]" />
                {/* 3D Dip Depth Shadow */}
                <div className="absolute -top-0.5 left-0.5 w-3 h-1 bg-[#ba1a1a]/30 rounded-full blur-[1px] -z-10" />
              </div>
            )}
          </div>

          <span>{isPositive ? '+' : ''}{changePercent}%</span>
        </div>
      </div>

      {/* Primary Quantitative Value & Sparkline/Subtext */}
      <div className="mt-4 flex items-baseline justify-between">
        <div>
          <div className="text-2xl font-extrabold text-[#1a1c19] tracking-tight">
            {value}
          </div>
          {subValue && (
            <div className="text-xs font-medium text-[#747872] mt-0.5">
              {subValue}
            </div>
          )}
        </div>

        {/* Mini 3D Animated Bar Spike Indicator */}
        <div className="flex items-end gap-1 h-7 px-1">
          {[40, 65, 50, 85, isPositive ? 100 : 35].map((height, i) => (
            <div
              key={i}
              className="w-1.5 rounded-t-sm transition-all duration-500"
              style={{
                height: `${height}%`,
                backgroundColor: i === 4 
                  ? (isPositive ? '#516051' : '#ba1a1a')
                  : (isPositive ? '#d7e7d4' : '#f5d5d5'),
                transform: isHovered && i === 4 ? 'scaleY(1.15)' : 'scaleY(1)',
                transformOrigin: 'bottom'
              }}
            />
          ))}
        </div>
      </div>

      {/* Timeframe footer */}
      <div className="mt-3 pt-2.5 border-t border-[#f0f0eb] flex items-center justify-between text-[11px] text-[#747872]">
        <span>{timeframeText}</span>
        <span className="flex items-center gap-1 font-medium text-[#434842]">
          {isPositive ? <TrendingUp className="w-3 h-3 text-[#516051]" /> : <TrendingDown className="w-3 h-3 text-[#ba1a1a]" />}
          {isPositive ? 'Accelerating' : 'Needs attention'}
        </span>
      </div>
    </div>
  );
};
