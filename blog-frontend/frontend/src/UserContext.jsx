import { createContext, useState, useEffect } from "react";

/**
 * Default username in Portuguese. Change here for localization.
 */
const DEFAULT_USERNAME = "Usuário";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse saved user:", e);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = (role, name = null) => {
    const userData = { role, name: name || DEFAULT_USERNAME };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
