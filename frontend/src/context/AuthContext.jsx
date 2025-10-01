import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);

  const [loading, setLoading] = React.useState(true);

const loadUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    setLoading(false);
    return;
  }
  try {
    const res = await axios.get("http://127.0.0.1:8000/api/auth/me/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(res.data);
  } catch (err) {
    setUser(null);
    localStorage.removeItem("token");
  } finally {
    setLoading(false);
  }
};


  React.useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loadUser, loading }}>
      {children}
    </AuthContext.Provider>

  );
};
