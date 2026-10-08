import React from "react";

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

export function SedanIcon({ className = "w-16 h-8", color = "#ffffff" }: IconProps) {
  return (
    <svg
      viewBox="0 0 90 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Body outline */}
      <path
        d="M12 30H7C5.3 30 4 28.7 4 27V23C4 21.3 5.3 20 7 20H15L23 11H54L66 20H78C80.8 20 83 22.2 83 25V30H77"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Wheels */}
      <circle cx="21" cy="30" r="6.5" stroke={color} strokeWidth="2.2" fill="#ecc298" />
      <circle cx="21" cy="30" r="2.5" fill={color} />
      <circle cx="69" cy="30" r="6.5" stroke={color} strokeWidth="2.2" fill="#ecc298" />
      <circle cx="69" cy="30" r="2.5" fill={color} />
      {/* Chassis underline */}
      <path d="M28 30H62" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      {/* Windows */}
      <path
        d="M24 19L29 13.5H51L60 19H24Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Window Pillar */}
      <path d="M42 13.5V19" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Door detail */}
      <path d="M42 19V28" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M46 22H50" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function SuvIcon({ className = "w-16 h-8", color = "#ffffff" }: IconProps) {
  return (
    <svg
      viewBox="0 0 90 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Roof rails */}
      <path d="M30 6.5H57" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* SUV Body outline */}
      <path
        d="M10 30H6C4.3 30 3 28.7 3 27V17C3 15.3 4.3 14 6 14H21L27 8.5H62L72 17H80C82.2 17 84 18.8 84 21V30H77"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Wheels */}
      <circle cx="19" cy="30" r="6.5" stroke={color} strokeWidth="2.2" fill="#ecc298" />
      <circle cx="19" cy="30" r="2.5" fill={color} />
      <circle cx="69" cy="30" r="6.5" stroke={color} strokeWidth="2.2" fill="#ecc298" />
      <circle cx="69" cy="30" r="2.5" fill={color} />
      {/* Chassis underline */}
      <path d="M26 30H62" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      {/* Windows */}
      <path
        d="M23 15L28 10.5H59L66 15H23Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Window Pillar */}
      <path d="M45 10.5V15" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Door cut */}
      <path d="M45 15V27" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M49 19H53" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function VanIcon({ className = "w-16 h-8", color = "#ffffff" }: IconProps) {
  return (
    <svg
      viewBox="0 0 90 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Van Body */}
      <path
        d="M7 30H5C3.9 30 3 29.1 3 28V9C3 7.9 3.9 7 5 7H57L68 18H81C83.2 18 85 19.8 85 22V30H78"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Wheels */}
      <circle cx="18" cy="30" r="6.5" stroke={color} strokeWidth="2.2" fill="#ecc298" />
      <circle cx="18" cy="30" r="2.5" fill={color} />
      <circle cx="70" cy="30" r="6.5" stroke={color} strokeWidth="2.2" fill="#ecc298" />
      <circle cx="70" cy="30" r="2.5" fill={color} />
      {/* Chassis */}
      <path d="M25 30H63" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      {/* Windows */}
      <path
        d="M54 9H27V18H63L54 9Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Window Pillar */}
      <path d="M42 9V18" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Sliding door line */}
      <path d="M27 18V28" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M3 18H27" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function AccessibleVanIcon({ className = "w-16 h-8", color = "#ffffff" }: IconProps) {
  return (
    <svg
      viewBox="0 0 90 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Accessible Van silhouette matching screenshot */}
      <path
        d="M5 30H4C2.9 30 2 29.1 2 28V15C2 13.9 2.9 13 4 13H36V18H52L62 9H78C80.2 9 82 10.8 82 13V30H76"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Rear utility rail */}
      <path
        d="M5 13V9H32V13"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Wheels */}
      <circle cx="17" cy="30" r="6.5" stroke={color} strokeWidth="2.2" fill="#ecc298" />
      <circle cx="17" cy="30" r="2.5" fill={color} />
      <circle cx="69" cy="30" r="6.5" stroke={color} strokeWidth="2.2" fill="#ecc298" />
      <circle cx="69" cy="30" r="2.5" fill={color} />
      {/* Chassis underline */}
      <path d="M24 30H62" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      {/* Cabin Window */}
      <path
        d="M54 13L60 13H71V18H47L54 13Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M60 13V18" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function MiniBusIcon({ className = "w-16 h-8", color = "#ffffff" }: IconProps) {
  return (
    <svg
      viewBox="0 0 90 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Minibus Profile */}
      <path
        d="M4 30C2.9 30 2 29.1 2 28V20C2 18.9 2.9 18 4 18H11L18 11H68L78 18H86C88.2 18 90 19.8 90 22V30H83"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Wheels */}
      <circle cx="18" cy="30" r="6.5" stroke={color} strokeWidth="2.2" fill="#ecc298" />
      <circle cx="18" cy="30" r="2.5" fill={color} />
      <circle cx="71" cy="30" r="6.5" stroke={color} strokeWidth="2.2" fill="#ecc298" />
      <circle cx="71" cy="30" r="2.5" fill={color} />
      {/* Chassis */}
      <path d="M25 30H64" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      {/* Windows row */}
      <path
        d="M20 13H64L71 18H15L20 13Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M34 13V18" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M50 13V18" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
