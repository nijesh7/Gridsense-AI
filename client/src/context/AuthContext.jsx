import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const DEMO_USERS = {
  ADMIN: { id: "usr_admin", name: "System Administrator", email: "admin@gridsense.ai", role: "ADMIN", title: "Full System Controller" },
  DISCOM_OPERATOR: { id: "usr_discom", name: "R. Sharma (Feeder Officer)", email: "operator@discom.gov.in", role: "DISCOM_OPERATOR", title: "DISCOM Feeder Operator" },
  COMMUNITY_MANAGER: { id: "usr_community", name: "Ananya Patel", email: "manager@greenvalley.org", role: "COMMUNITY_MANAGER", title: "Green Valley Energy Lead" },
  USER: { id: "usr_citizen", name: "Vikram Mehta (Home #42)", email: "vikram@greenvalley.org", role: "USER", title: "Prosumer Smart Home" },
};

export function AuthProvider({ children }) {
  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem("gridsense_user_role") || "ADMIN";
  });

  const [user, setUser] = useState(DEMO_USERS[currentRole] || DEMO_USERS.ADMIN);

  useEffect(() => {
    const updated = DEMO_USERS[currentRole] || DEMO_USERS.ADMIN;
    setUser(updated);
    localStorage.setItem("gridsense_user_role", currentRole);
  }, [currentRole]);

  const switchRole = (newRole) => {
    if (DEMO_USERS[newRole]) {
      setCurrentRole(newRole);
    }
  };

  return (
    <AuthContext.Provider value={{ user, currentRole, switchRole, allRoles: Object.keys(DEMO_USERS) }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
