import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check login on refresh
 useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/profile`,
        { withCredentials: true }
      );
      setUser(res.data.user);
    } catch (err) {
      // 🔕 SILENT FAIL (user not logged in)
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, []);


  const logout = async () => {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/users/logout`,
      {},
      { withCredentials: true }
    );
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
