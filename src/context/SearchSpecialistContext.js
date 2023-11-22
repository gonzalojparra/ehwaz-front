'use client';

import { createContext, useContext, useState } from 'react';

const SearchSpecialistContext = createContext();

export const SearchSpecialistProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SearchSpecialistContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchSpecialistContext.Provider>
  );
}

export function useSearchSpecialist() {
  const context = useContext(SearchSpecialistContext);
  return context;
}