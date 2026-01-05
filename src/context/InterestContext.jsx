import React, { createContext, useContext, useState } from 'react';

const InterestContext = createContext();

export const interests = [
  { id: 'software', label: 'Software Engineering', color: 'from-blue-500 to-cyan-500', accent: 'cyan' },
  { id: 'data', label: 'Data Science', color: 'from-purple-500 to-pink-500', accent: 'pink' },
  { id: 'ai', label: 'AI & Machine Learning', color: 'from-emerald-500 to-teal-500', accent: 'emerald' },
  { id: 'cyber', label: 'Cybersecurity', color: 'from-red-500 to-orange-500', accent: 'orange' },
  { id: 'cloud', label: 'Cloud Computing', color: 'from-indigo-500 to-violet-500', accent: 'violet' }
];

export const InterestProvider = ({ children }) => {
  const [currentInterest, setCurrentInterest] = useState(interests[0]);

  return (
    <InterestContext.Provider value={{ currentInterest, setCurrentInterest, interests }}>
      {children}
    </InterestContext.Provider>
  );
};

export const useInterest = () => useContext(InterestContext);
