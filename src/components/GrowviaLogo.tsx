import React, { useState } from 'react';

interface GrowviaLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  spinning?: boolean;
  className?: string;
}

export const GrowviaLogo: React.FC<GrowviaLogoProps> = ({
  size = 'md',
  showText = true,
  spinning = true,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeMap = {
    sm: { width: 26, height: 36, text: 'text-lg', stroke: 9.5 },
    md: { width: 34, height: 48, text: 'text-2xl', stroke: 9.5 },
    lg: { width: 46, height: 64, text: 'text-3xl', stroke: 10 },
    xl: { width: 62, height: 86, text: 'text-4xl', stroke: 10.5 }
  };

  const { width, height, text } = sizeMap[size];

  // Exact reproduction of the Growvia Emblem from the user's image
  const EmblemSvg = () => (
    <svg
      viewBox="0 0 100 135"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="charcoalStemShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#1a1c19" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Charcoal Lower U-Stem */}
      <path
        d="M 59,48 L 59,93 C 59,112 41,112 41,93 L 41,70"
        stroke="#444a51"
        strokeWidth="9.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#charcoalStemShadow)"
      />

      {/* Sage Green Interlocking Dual-Leaf Loop */}
      <path
        d="M 50,56 C 52,38 63,20 76,20 C 89,20 89,38 73,56 C 61,68 40,68 23,56 C 13,46 22,34 36,44 C 44,50 48,54 50,56 Z"
        stroke="#7a8d78"
        strokeWidth="9.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div 
      className={`flex items-center gap-2.5 select-none cursor-pointer group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Rotating Logo Element */}
      <div 
        className="relative flex items-center justify-center shrink-0"
        style={{ 
          width, 
          height,
          perspective: '700px'
        }}
      >
        {/* Soft Contact Shadow beneath rotating logo */}
        <div 
          className={`absolute -bottom-1 w-[70%] h-2 bg-[#1a1c19]/25 rounded-full blur-[2px] pointer-events-none ${
            spinning ? 'animate-3d-shadow' : ''
          }`}
        />

        {/* 3D Standing Rotating Body */}
        <div 
          className={`relative w-full h-full flex items-center justify-center ${
            spinning ? 'animate-3d-standing' : ''
          }`}
          style={{
            transformStyle: 'preserve-3d',
            transformOrigin: '50% 60% 0px',
            animationDuration: isHovered ? '4s' : '8s'
          }}
        >
          {/* Back 3D Layer */}
          <div 
            className="absolute inset-0 flex items-center justify-center opacity-90"
            style={{ 
              transform: 'translateZ(-2px) rotateY(180deg)',
              backfaceVisibility: 'visible'
            }}
          >
            <EmblemSvg />
          </div>

          {/* Front 3D Layer */}
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ 
              transform: 'translateZ(2px)',
              backfaceVisibility: 'visible'
            }}
          >
            <EmblemSvg />
          </div>
        </div>
      </div>

      {/* Brand Wordmark */}
      {showText && (
        <span className={`font-bold tracking-tight text-[#1a1c19] group-hover:text-[#516051] transition-colors ${text}`}>
          GROWVIA
        </span>
      )}
    </div>
  );
};

