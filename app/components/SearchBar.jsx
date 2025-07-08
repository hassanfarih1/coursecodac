import React from 'react';
import { SearchIcon } from '../constants';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="my-8 md:my-12 animate-slide-up">
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          {/* Couleur directe pour text-neutral-dark */}
          <SearchIcon className="h-6 w-6 text-[#64748b]" />
        </div>
        <input
          type="text"
          // Changed placeholder text to French
          placeholder="Rechercher des cours (ex: React, Python...)"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          // Couleurs directes pour text-neutral-darker, border-slate-300, focus:ring-primary, focus:border-primary
          className="w-full py-4 pl-14 pr-4 text-[#334155] bg-white border border-[#cbd5e1] rounded-xl shadow-sm focus:ring-2 focus:ring-[#0ea5e9] focus:border-[#0ea5e9] outline-none transition-shadow duration-200"
        />
      </div>
    </div>
  );
};

export default SearchBar;