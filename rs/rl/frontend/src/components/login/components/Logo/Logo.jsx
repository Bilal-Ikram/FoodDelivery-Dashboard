import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <circle cx="20" cy="20" r="18" fill="#d70f64"/>
        <path d="M15,15 A5,5 0 1,0 15,25 A5,5 0 1,0 15,15" fill="white"/>
        <path d="M25,15 A5,5 0 1,0 25,25 A5,5 0 1,0 25,15" fill="white"/>
      </svg>
      <span className="text-2xl font-bold text-gray-900">pandapartner</span>
    </div>
  );
};

export default Logo;