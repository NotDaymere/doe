import { createContext, useState } from "react";

export const ConsoleContext = createContext();

export const ConsoleProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <ConsoleContext.Provider value={{ isVisible, setIsVisible }}>
      {children}
    </ConsoleContext.Provider>
  );
};
