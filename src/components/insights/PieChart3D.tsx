import React, { useState } from 'react';
import { Layers, PieChart as PieIcon, Eye, RotateCw, Sparkles, ChevronRight, Info } from 'lucide-react';

export interface PieSliceData {
  id: string;
  label: string;
  value: number;
  formattedValue: string;
  percentage: number;
  color: string;
  darkColor: string;
  description: string;
  growth: string;
}

export interface PieDataset {
  id: string;
  title: string;
  totalLabel: string;
  totalValue: string;
  slices: PieSliceData[];
}

interface PieChart3DProps {
  dataset: PieDataset;
  availableDatasets: PieDataset[];
  onSelectDataset: (datasetId: string) => void;
}

export const PieChart3D: React.FC<PieChart3DProps> = ({
  dataset,
  availableDatasets,
  onSelectDataset
}) => {
  const [activeSliceIndex, setActiveSliceIndex] = useState<number | null>(null);
  const [isOpenExploded, setIsOpenExploded] = useState<boolean>(true);
  const [is3DMode, setIs3DMode] = useState<boolean>(true);
  const [tiltAngle, setTiltAngle] = useState<number>(55);
  const [rotationOffset, setRotationOffset] = useState<number>(0);

  // Calculate slice angles
  let accumulatedAngle = 0;
  const slicesWithAngles = dataset.slices.map((slice, index) => {
    const startAngle = accumulatedAngle;
    const sliceAngle = (slice.percentage / 100) * 360;
    const endAngle = startAngle + sliceAngle;
    const midAngle = startAngle + sliceAngle / 2;
    accumulatedAngle = endAngle;

    return {
      ...slice,
      index,
      startAngle,
      endAngle,
      midAngle,
      sliceAngle
    };
  });

  // Helper to generate SVG Arc path
  const createArcPath = (
    cx: number,
    cy: number,
    r: number,
    innerR: number,
    startAngleDeg: number,
    endAngleDeg: number
  ) => {
    const startRad = ((startAngleDeg - 90) * Math.PI) / 180;
    const endRad = ((endAngleDeg - 90) * Math.PI) / 180;

    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);

    const ix1 = cx + innerR * Math.cos(endRad);
    const iy1 = cy + innerR * Math.sin(endRad);
    const ix2 = cx + innerR * Math.cos(startRad);
    const iy2 = cy + innerR * Math.sin(startRad);

    const largeArcFlag = endAngleDeg - startAngleDeg > 180 ? 1 : 0;

    return [
      `M ${x1} ${y1}`,
      `A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      `L ${ix1} ${iy1}`,
      `A ${innerR} ${innerR} 0 ${largeArcFlag} 0 ${ix2} ${iy2}`,
      'Z'
    ].join(' ');
  };

  const selectedSlice = activeSliceIndex !== null ? slicesWithAngles[activeSliceIndex] : null;

  return (
    <div className="bg-white border border-[#e3e3de] rounded-2xl p-6 shadow-subtle flex flex-col justify-between">
      {/* Header with Dataset Switching */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#eeeee9]">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#d7e7d4] flex items-center justify-center text-[#516051]">
              <PieIcon className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1a1c19]">{dataset.title}</h2>
              <p className="text-xs text-[#747872]">Interactive 3D slice breakdown with real metrics</p>
            </div>
          </div>
        </div>

        {/* Dataset Pill Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-1">
          {availableDatasets.map((d) => (
            <button
              key={d.id}
              onClick={() => {
                onSelectDataset(d.id);
                setActiveSliceIndex(null);
              }}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
                d.id === dataset.id
                  ? 'bg-[#1a1c19] text-white shadow-sm'
                  : 'bg-[#f4f4ef] text-[#5f5e5e] hover:bg-[#e8e8e3] hover:text-[#1a1c19]'
              }`}
            >
              {d.title}
            </button>
          ))}
        </div>
      </div>

      {/* Control Bar: Open/Close Explode + 3D View Angles */}
      <div className="flex flex-wrap items-center justify-between gap-3 py-3 px-3.5 my-3 bg-[#fafaf4] border border-[#eeeee9] rounded-xl text-xs">
        <div className="flex items-center gap-2">
          {/* Open / Close Pie Animation Button */}
          <button
            onClick={() => setIsOpenExploded(!isOpenExploded)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all shadow-xs ${
              isOpenExploded
                ? 'bg-[#516051] text-white'
                : 'bg-white border border-[#d2d2cc] text-[#1a1c19] hover:bg-[#f0f0ea]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isOpenExploded ? 'Pie Open (Exploded 3D)' : 'Pie Closed (Compact)'}</span>
          </button>

          {/* 3D Isometric Toggle */}
          <button
            onClick={() => setIs3DMode(!is3DMode)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-semibold transition-all ${
              is3DMode ? 'bg-[#e8f3e6] text-[#245924]' : 'bg-white border border-[#e3e3de] text-[#747872]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{is3DMode ? '3D Tilt: ON' : 'Flat 2D'}</span>
          </button>
        </div>

        {/* Rotate Wheel Button */}
        <div className="flex items-center gap-2 text-[#747872]">
          <span className="text-[11px]">Rotate View:</span>
          <button
            onClick={() => setRotationOffset((prev) => (prev + 45) % 360)}
            className="p-1.5 bg-white border border-[#e3e3de] hover:bg-[#f4f4ef] rounded-md text-[#1a1c19] transition-colors"
            title="Rotate 3D Pie 45 degrees"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Chart Body: 3D Stage + Stats Legend */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-2">
        {/* Left: 3D Rendered Pie Stage */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[300px] py-4">
          {/* Ground Shadow in 3D perspective */}
          <div 
            className="absolute bottom-6 w-60 h-24 bg-[#1a1c19]/15 rounded-full blur-xl pointer-events-none transition-all duration-700"
            style={{
              transform: is3DMode ? `scale(${isOpenExploded ? 1.2 : 0.95})` : 'scale(0.8)',
              opacity: is3DMode ? 0.35 : 0.1
            }}
          />

          {/* 3D Transform Container */}
          <div
            className="relative transition-all duration-700 ease-out"
            style={{
              perspective: '1000px',
              transformStyle: 'preserve-3d',
              transform: is3DMode
                ? `rotateX(${tiltAngle}deg) rotateZ(${rotationOffset}deg)`
                : 'rotateX(0deg) rotateZ(0deg)'
            }}
          >
            <svg
              width="280"
              height="280"
              viewBox="0 0 280 280"
              className="overflow-visible"
            >
              <defs>
                <filter id="pieDropShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#1a1c19" floodOpacity="0.3" />
                </filter>
              </defs>

              {/* Center Donut Hub Background */}
              <circle
                cx="140"
                cy="140"
                r="46"
                fill="#f8f8f3"
                stroke="#e3e3de"
                strokeWidth="2"
              />

              {/* Render 3D Slices */}
              {slicesWithAngles.map((slice) => {
                const isSelected = activeSliceIndex === slice.index;
                // Calculate radial explosion offset vector
                const explodeDistance = isOpenExploded ? (isSelected ? 22 : 12) : (isSelected ? 10 : 0);
                const rad = ((slice.midAngle - 90) * Math.PI) / 180;
                const offsetX = explodeDistance * Math.cos(rad);
                const offsetY = explodeDistance * Math.sin(rad);

                const arcPath = createArcPath(140, 140, 120, 52, slice.startAngle, slice.endAngle);

                return (
                  <g
                    key={slice.id}
                    onClick={() => setActiveSliceIndex(isSelected ? null : slice.index)}
                    onMouseEnter={() => setActiveSliceIndex(slice.index)}
                    className="cursor-pointer transition-all duration-500 group"
                    style={{
                      transform: `translate(${offsetX}px, ${offsetY}px)`,
                      transformOrigin: '140px 140px'
                    }}
                  >
                    {/* 3D Extrusion Side Wall Layer for Thickness */}
                    {is3DMode && (
                      <path
                        d={arcPath}
                        fill={slice.darkColor}
                        transform="translate(0, 10)"
                        opacity="0.9"
                      />
                    )}

                    {/* Main Top Slice Surface */}
                    <path
                      d={arcPath}
                      fill={slice.color}
                      stroke="#ffffff"
                      strokeWidth={isSelected ? "3" : "1.5"}
                      filter={isSelected ? "url(#pieDropShadow)" : undefined}
                      className="transition-all duration-300 group-hover:brightness-110"
                    />

                    {/* Slice Label Text (when pie is open) */}
                    {isOpenExploded && slice.percentage >= 12 && (
                      <text
                        x={140 + 86 * Math.cos(rad)}
                        y={140 + 86 * Math.sin(rad) + 4}
                        fill="#ffffff"
                        fontSize="11"
                        fontWeight="bold"
                        textAnchor="middle"
                        className="pointer-events-none drop-shadow-sm select-none"
                      >
                        {slice.percentage}%
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Central 3D Floating Indicator Hub */}
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none text-center"
              style={{
                transform: is3DMode ? 'translateZ(15px)' : 'none'
              }}
            >
              <span className="text-[10px] font-bold text-[#747872] uppercase tracking-wider">
                {dataset.totalLabel}
              </span>
              <span className="text-lg font-extrabold text-[#1a1c19] tracking-tight">
                {dataset.totalValue}
              </span>
            </div>
          </div>

          <div className="mt-4 text-center">
            <span className="text-[11px] text-[#747872] italic">
              Hover or click slices to inspect exact numerical metrics & trends
            </span>
          </div>
        </div>

        {/* Right: Detailed Quantitative Breakdown & Slices Legend */}
        <div className="lg:col-span-5 space-y-2.5">
          {/* Active Highlight Card if selected */}
          {selectedSlice ? (
            <div 
              className="p-3.5 rounded-xl border transition-all duration-300"
              style={{
                backgroundColor: '#fafaf4',
                borderColor: selectedSlice.color
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3.5 h-3.5 rounded-full shadow-xs"
                    style={{ backgroundColor: selectedSlice.color }}
                  />
                  <h4 className="text-sm font-bold text-[#1a1c19]">{selectedSlice.label}</h4>
                </div>
                <span className="text-xs font-bold text-[#516051] bg-[#d7e7d4] px-2 py-0.5 rounded-md">
                  {selectedSlice.growth}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2.5 pt-2 border-t border-[#eeeee9]">
                <div>
                  <span className="text-[10px] text-[#747872] uppercase font-bold">Total Volume</span>
                  <div className="text-base font-extrabold text-[#1a1c19]">{selectedSlice.formattedValue}</div>
                </div>
                <div>
                  <span className="text-[10px] text-[#747872] uppercase font-bold">Share of Total</span>
                  <div className="text-base font-extrabold text-[#516051]">{selectedSlice.percentage}%</div>
                </div>
              </div>

              <p className="text-xs text-[#5f5e5e] mt-2">
                {selectedSlice.description}
              </p>
            </div>
          ) : (
            <div className="p-3 bg-[#f8f8f3] border border-dashed border-[#d2d2cc] rounded-xl text-center">
              <span className="text-xs font-semibold text-[#5f5e5e]">
                Select any slice to inspect localized revenue & growth drivers
              </span>
            </div>
          )}

          {/* List of Slices with Progress Fill Bars */}
          <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
            {slicesWithAngles.map((slice) => {
              const isSelected = activeSliceIndex === slice.index;
              return (
                <button
                  key={slice.id}
                  onClick={() => setActiveSliceIndex(isSelected ? null : slice.index)}
                  onMouseEnter={() => setActiveSliceIndex(slice.index)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all flex flex-col gap-1.5 ${
                    isSelected
                      ? 'bg-white border-[#516051] shadow-xs'
                      : 'bg-[#fafaf4] hover:bg-white border-[#eeeee9]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-2.5 h-2.5 rounded-full shrink-0" 
                        style={{ backgroundColor: slice.color }} 
                      />
                      <span className="font-bold text-[#1a1c19]">{slice.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-[#1a1c19]">{slice.formattedValue}</span>
                      <span className="text-[11px] font-semibold text-[#747872]">({slice.percentage}%)</span>
                    </div>
                  </div>

                  {/* Animated Progress Meter */}
                  <div className="w-full bg-[#e8e8e3] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${slice.percentage}%`,
                        backgroundColor: slice.color
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
