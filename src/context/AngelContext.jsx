import { createContext, useState } from "react";

export const AngelContext = createContext();

export const AngelProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  return (
    <AngelContext.Provider value={{ token, setToken }}>
      {children}
    </AngelContext.Provider>
  );
};
