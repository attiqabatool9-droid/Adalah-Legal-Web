import { createContext, useState, useEffect } from "react";

// 1. Context Create kiya
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 2. Jaise hi website load ho, check karo ke kya user pehle se logged in hai?
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  // 3. Login function (Jab user naya login karega)
  const login = (userData) => {
    localStorage.setItem("userInfo", JSON.stringify(userData)); // Browser mein save
    setUser(userData); // React state mein save
  };

  // 4. Logout function
  const logout = () => {
    localStorage.removeItem("userInfo"); // Browser se delete
    setUser(null); // React state se delete
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};