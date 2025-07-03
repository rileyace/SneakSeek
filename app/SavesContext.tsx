import React, { createContext, useContext, useState } from "react";

export type SavedItem = {
  id: string;
  photoUri: string;
  label: string;
  notes: string;
};

type SavesContextType = {
  saves: SavedItem[];
  addSave: (item: SavedItem) => void;
};

const SavesContext = createContext<SavesContextType | undefined>(undefined);

export const SavesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [saves, setSaves] = useState<SavedItem[]>([]);

  const addSave = (item: SavedItem) => {
    setSaves((prev) => [...prev, item]);
  };

  return (
    <SavesContext.Provider value={{ saves, addSave }}>
      {children}
    </SavesContext.Provider>
  );
};

export const useSaves = () => {
  const context = useContext(SavesContext);
  if (!context) throw new Error("useSaves must be used within SavesProvider");
  return context;
};