import React, { createContext, useState, useEffect } from "react";
import API from "../lib/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loadUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const res = await API.get("http://127.0.0.1:8000/api/auth/me/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      console.log("AuthContext: setUser called with", res.data);
    } catch (err) {
      setUser(null);
      localStorage.removeItem("token");
    }
  };

  // Check if user is logged in on load
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loadUser }}>
      {children}
    </AuthContext.Provider>
  );
};
