import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const DEMO_USERS = {
  ADMIN: { 
    id: "usr_admin", 
    name: "System Administrator", 
    email: "admin@gridsense.ai", 
    role: "ADMIN", 
    title: "Full System Controller",
    badge: "Full Control",
    destination: "/"
  },
  DISCOM_OPERATOR: { 
    id: "usr_discom", 
    name: "R. Sharma (Feeder Officer)", 
    email: "operator@discom.gov.in", 
    role: "DISCOM_OPERATOR", 
    title: "DISCOM Feeder Operator",
    badge: "Grid Control",
    destination: "/discom"
  },
  COMMUNITY_MANAGER: { 
    id: "usr_community", 
    name: "Ananya Patel", 
    email: "manager@greenvalley.org", 
    role: "COMMUNITY_MANAGER", 
    title: "Green Valley Energy Lead",
    badge: "Microgrid Lead",
    destination: "/"
  },
  USER: { 
    id: "usr_citizen", 
    name: "Vikram Mehta (Home #42)", 
    email: "vikram@greenvalley.org", 
    role: "USER", 
    title: "Prosumer Smart Home",
    badge: "Citizen Home",
    destination: "/my-home"
  },
};

export function AuthProvider({ children }) {
  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem("gridsense_user_role") || "ADMIN";
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("gridsense_logged_in") !== "false";
  });

  const [user, setUser] = useState(DEMO_USERS[currentRole] || DEMO_USERS.ADMIN);

  useEffect(() => {
    const updated = DEMO_USERS[currentRole] || DEMO_USERS.ADMIN;
    setUser(updated);
    localStorage.setItem("gridsense_user_role", currentRole);
  }, [currentRole]);

  const loginWithRole = (role) => {
    const validRole = DEMO_USERS[role] ? role : "ADMIN";
    setCurrentRole(validRole);
    setIsLoggedIn(true);
    localStorage.setItem("gridsense_user_role", validRole);
    localStorage.setItem("gridsense_logged_in", "true");
    return DEMO_USERS[validRole].destination;
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("gridsense_logged_in", "false");
  };

  const switchRole = (newRole) => {
    if (DEMO_USERS[newRole]) {
      setCurrentRole(newRole);
      setIsLoggedIn(true);
      localStorage.setItem("gridsense_logged_in", "true");
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      currentRole, 
      isLoggedIn, 
      loginWithRole, 
      logout, 
      switchRole, 
      allRoles: Object.keys(DEMO_USERS),
      DEMO_USERS 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
