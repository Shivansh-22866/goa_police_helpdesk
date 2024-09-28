import React from "react";

const SvgDecorations: React.FC = () => {
  return (
    <>
      {/* First Decorative Shape */}
      <div className="hidden -z-1 md:block absolute top-0 end-0 translate-x-8 translate-y-56">
        <svg
          className="w-16 h-auto transition-transform duration-300 hover:scale-105"
          width="121"
          height="135"
          viewBox="0 0 121 135"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#3b82f6", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#1e3a8a", stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <circle cx="60" cy="40" r="40" fill="url(#gradient1)" />
        </svg>
      </div>


      {/* Second Decorative Shape */}
      <div className="hidden -z-1 md:block absolute top-0 end-0 -translate-x-8 translate-y-56">
        <svg
          className="w-16 h-auto transition-transform duration-300 hover:scale-105"
          width="121"
          height="135"
          viewBox="0 0 121 135"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#3b82f6", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#1e3a8a", stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <circle cx="60" cy="40" r="40" fill="url(#gradient1)" />
        </svg>
      </div>
    </>
  );
};

export default SvgDecorations;
