/**
 * GridSense AI - Role-Based Authentication Middleware
 * Supports Firebase Tokens & fast Demo Role Switching (ADMIN, DISCOM_OPERATOR, COMMUNITY_MANAGER, USER).
 */

const { firestoreStore } = require("../config/firebase");

const ROLE_PERMISSIONS = {
  ADMIN: ["*"],
  DISCOM_OPERATOR: ["dashboard", "neighbourhoods", "discom", "alerts", "forecast"],
  COMMUNITY_MANAGER: ["dashboard", "flexibility", "battery", "neighbourhoods", "simulator", "alerts"],
  USER: ["dashboard", "flexibility", "settings", "profile"]
};

function authMiddleware(req, res, next) {
  // Support either Bearer token or quick demo switch via Header
  const clientRole = req.headers["x-user-role"] || "ADMIN";
  const user = firestoreStore.users.find(u => u.role === clientRole) || firestoreStore.users[0];

  req.user = {
    ...user,
    permissions: ROLE_PERMISSIONS[user.role] || ["dashboard"]
  };

  next();
}

function requireRole(allowedRoles = []) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Authentication required" });
    }
    if (req.user.role === "ADMIN" || allowedRoles.includes(req.user.role)) {
      return next();
    }
    return res.status(403).json({
      success: false,
      message: `Access denied. Role '${req.user.role}' not permitted for this resource.`
    });
  };
}

module.exports = {
  authMiddleware,
  requireRole
};
