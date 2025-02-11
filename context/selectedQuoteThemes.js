"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const SelectedQuoteThemesContext = createContext();

export function SelectedQuoteThemesProvider({ children }) {
  const [selectedTopics, setSelectedTopics] = useState(() => {
    // Load initial state from localStorage (to prevent re-renders in useEffect)
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("selectedTopics")) || ["success", "motivation", "growth"];
    }
    return ["success", "motivation", "growth"];
  });

  // Update localStorage whenever selectedTopics changes
  useEffect(() => {
    localStorage.setItem("selectedTopics", JSON.stringify(selectedTopics));
  }, [selectedTopics]); // Dependency array ensures this runs only when selectedTopics changes

  const handleAddTheme = (theme) => {
    if (!selectedTopics.includes(theme)) {
      setSelectedTopics((prev) => [...prev, theme]);
    }
  };

  const handleRemoveTheme = (theme) => {
    setSelectedTopics((prev) => prev.filter((t) => t !== theme));
  };

  return (
    <SelectedQuoteThemesContext.Provider value={{ selectedTopics, handleAddTheme, handleRemoveTheme }}>
      {children}
    </SelectedQuoteThemesContext.Provider>
  );
}

// Custom hook to use the context
export function useSelectedQuoteThemes() {
  return useContext(SelectedQuoteThemesContext);
}