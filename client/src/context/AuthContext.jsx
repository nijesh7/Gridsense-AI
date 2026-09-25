import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const DEFAULT_DEMO_USERS = {
  USER: { 
    id: "usr_citizen", 
    name: "Vikram Mehta", 
    email: "resident@greenvalley.org", 
    role: "USER", 
    title: "Prosumer Smart Home",
    houseNumber: "Home #42",
    solarCapacity: "5.0 kWp",
    destination: "/my-home"
  },
  DISCOM_OPERATOR: { 
    id: "usr_discom", 
    name: "R. Sharma", 
    email: "operator@discom.gov.in", 
    role: "DISCOM_OPERATOR", 
    title: "DISCOM Feeder Operator",
    feederId: "FDR-001 Substation",
    destination: "/discom"
  },
  COMMUNITY_MANAGER: { 
    id: "usr_community", 
    name: "Ananya Patel", 
    email: "manager@greenvalley.org", 
    role: "COMMUNITY_MANAGER", 
    title: "Green Valley Energy Lead",
    subdivision: "Green Valley Eco-Community",
    destination: "/"
  },
  ADMIN: { 
    id: "usr_admin", 
    name: "Platform Administrator", 
    email: "admin@gridsense.ai", 
    role: "ADMIN", 
    title: "Full System Controller",
    destination: "/"
  },
};

export function AuthProvider({ children }) {
  // Stored registered users in localStorage
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const saved = localStorage.getItem("gridsense_registered_users");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return Object.values(DEFAULT_DEMO_USERS);
  });

  // Active user state
  const [user, setUser] = useState(() => {
    try {
      const savedActive = localStorage.getItem("gridsense_active_user");
      if (savedActive) return JSON.parse(savedActive);
    } catch (e) {}

    // Default to Citizen Prosumer instead of System Administrator!
    const savedName = localStorage.getItem("gridsense_user_name") || "";
    const savedRole = localStorage.getItem("gridsense_user_role") || "USER";
    const base = DEFAULT_DEMO_USERS[savedRole] || DEFAULT_DEMO_USERS.USER;

    return {
      ...base,
      name: savedName.trim() || base.name
    };
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("gridsense_logged_in") !== "false";
  });

  const currentRole = user?.role || "USER";

  // Sync to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("gridsense_active_user", JSON.stringify(user));
      localStorage.setItem("gridsense_user_name", user.name);
      localStorage.setItem("gridsense_user_role", user.role);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("gridsense_registered_users", JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  // CREATE ACCOUNT / SIGN UP
  const createAccount = ({ name, email, password, role = "USER", houseNumber, solarCapacity, feederId, subdivision }) => {
    const trimmedName = name.trim();
    const destination = role === "USER" ? "/my-home" : role === "DISCOM_OPERATOR" ? "/discom" : "/";
    
    let title = "Prosumer Smart Home";
    if (role === "DISCOM_OPERATOR") title = "DISCOM Feeder Operator";
    else if (role === "COMMUNITY_MANAGER") title = "Community Energy Lead";
    else if (role === "ADMIN") title = "System Administrator";

    const newUser = {
      id: "usr_" + Date.now(),
      name: trimmedName,
      email: email.trim().toLowerCase(),
      password: password || "demo123",
      role,
      title,
      houseNumber: houseNumber || "Home #42",
      solarCapacity: solarCapacity || "5.0 kWp",
      feederId: feederId || "FDR-001",
      subdivision: subdivision || "Green Valley",
      destination,
      createdAt: new Date().toISOString()
    };

    // Add to registered list if not already there
    setRegisteredUsers(prev => {
      const filtered = prev.filter(u => u.email !== newUser.email);
      return [...filtered, newUser];
    });

    // Immediately activate user and log in
    setUser(newUser);
    setIsLoggedIn(true);
    localStorage.setItem("gridsense_logged_in", "true");
    localStorage.setItem("gridsense_user_name", trimmedName);
    localStorage.setItem("gridsense_user_role", role);
    localStorage.setItem("gridsense_active_user", JSON.stringify(newUser));

    return destination;
  };

  // SIGN IN with email & password
  const signIn = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    
    // Check if user exists in registered list
    const found = registeredUsers.find(u => u.email.toLowerCase() === cleanEmail);
    if (found) {
      setUser(found);
      setIsLoggedIn(true);
      localStorage.setItem("gridsense_logged_in", "true");
      localStorage.setItem("gridsense_user_name", found.name);
      localStorage.setItem("gridsense_user_role", found.role);
      localStorage.setItem("gridsense_active_user", JSON.stringify(found));
      return found.destination || (found.role === "USER" ? "/my-home" : found.role === "DISCOM_OPERATOR" ? "/discom" : "/");
    }

    // Fallback: derive role and name from email
    let derivedRole = "USER";
    if (cleanEmail.includes("operator") || cleanEmail.includes("discom")) derivedRole = "DISCOM_OPERATOR";
    else if (cleanEmail.includes("manager") || cleanEmail.includes("community")) derivedRole = "COMMUNITY_MANAGER";
    else if (cleanEmail.includes("admin")) derivedRole = "ADMIN";

    const base = DEFAULT_DEMO_USERS[derivedRole] || DEFAULT_DEMO_USERS.USER;
    const derivedName = cleanEmail.split('@')[0].replace(/[._-]/g, ' ') || base.name;
    const formattedName = derivedName.charAt(0).toUpperCase() + derivedName.slice(1);

    const fallbackUser = {
      ...base,
      email: cleanEmail,
      name: formattedName
    };

    setUser(fallbackUser);
    setIsLoggedIn(true);
    localStorage.setItem("gridsense_logged_in", "true");
    localStorage.setItem("gridsense_user_name", fallbackUser.name);
    localStorage.setItem("gridsense_user_role", fallbackUser.role);
    localStorage.setItem("gridsense_active_user", JSON.stringify(fallbackUser));

    return fallbackUser.destination;
  };

  // 1-Click Fast Role Sign In
  const loginWithRole = (role, customName = "") => {
    const base = DEFAULT_DEMO_USERS[role] || DEFAULT_DEMO_USERS.USER;
    const finalName = customName && customName.trim() ? customName.trim() : (user?.name && user.name !== "System Administrator" ? user.name : base.name);

    const updated = {
      ...base,
      name: finalName
    };

    setUser(updated);
    setIsLoggedIn(true);
    localStorage.setItem("gridsense_logged_in", "true");
    localStorage.setItem("gridsense_user_name", finalName);
    localStorage.setItem("gridsense_user_role", role);
    localStorage.setItem("gridsense_active_user", JSON.stringify(updated));

    return base.destination;
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("gridsense_logged_in", "false");
  };

  const switchRole = (newRole) => {
    const base = DEFAULT_DEMO_USERS[newRole] || DEFAULT_DEMO_USERS.USER;
    const currentName = user?.name || base.name;
    const updated = {
      ...base,
      name: currentName
    };
    setUser(updated);
    setIsLoggedIn(true);
    localStorage.setItem("gridsense_logged_in", "true");
    localStorage.setItem("gridsense_user_role", newRole);
    localStorage.setItem("gridsense_active_user", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      currentRole, 
      isLoggedIn, 
      createAccount,
      signIn,
      loginWithRole, 
      logout, 
      switchRole, 
      registeredUsers,
      allRoles: Object.keys(DEFAULT_DEMO_USERS),
      DEFAULT_DEMO_USERS 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
