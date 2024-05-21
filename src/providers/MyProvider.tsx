"use client";
import React, { createContext, useContext, useState } from "react";

const MyContext = createContext<any>(undefined);

export const MyProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOnDialog, setOnDialog] = useState(false);

  return (
    <MyContext.Provider value={{ isOnDialog, setOnDialog }}>
      {children}
    </MyContext.Provider>
  );
};

export function useAppContext() {
  return useContext(MyContext);
}
