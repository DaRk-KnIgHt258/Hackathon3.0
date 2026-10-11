import React from 'react';

export function Card({ children, className = '', hover = false }) {
  return (
    <div
      className={`rounded-xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-md p-5 shadow-lg transition-all duration-300 ${
        hover ? 'hover:border-slate-700 hover:bg-slate-900/80 hover:shadow-xl' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
