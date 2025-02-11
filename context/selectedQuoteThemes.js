"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const SelectedQuoteThemesContext = createContext();

export function SelectedQuoteThemesProvider({ children }) {
  const [selectedTopics, setSelectedTopics] = useState([]);

  const handleChangeSelectedTopics = (event) => {
    setSelectedTopics(event.target.value);
    localStorage.setItem("selectedTopics", JSON.stringify(event.target.value));
  };

  useEffect(() => {
    setSelectedTopics(
      localStorage.getItem("selectedTopics") || [
        "success",
        "motivation",
        "growth",
      ]
    );
  }, []);

  return (
    <SelectedQuoteThemesContext.Provider
      value={{ selectedTopics, handleChangeSelectedTopics }}
    >
      {children}
    </SelectedQuoteThemesContext.Provider>
  );
}

// Hook to use modal context
export function useSelectedQuoteThemes() {
  return useContext(SelectedQuoteThemesContext);
}
