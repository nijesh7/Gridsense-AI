/**
 * GridSense AI - Firebase Configuration & Firestore Store
 * Implements Firestore Collections with fallback storage for local prototyping.
 */

const dotenv = require("dotenv");
dotenv.config();

// In-Memory Firestore collection store (synchronized with schema)
const firestoreStore = {
  users: [
    { id: "usr_admin", email: "admin@gridsense.ai", role: "ADMIN", name: "System Administrator" },
    { id: "usr_discom", email: "operator@discom.gov.in", role: "DISCOM_OPERATOR", name: "DISCOM Feeder Operator" },
    { id: "usr_community", email: "manager@greenvalley.org", role: "COMMUNITY_MANAGER", name: "Green Valley Microgrid Lead" },
    { id: "usr_citizen", email: "resident@greenvalley.org", role: "USER", name: "Smart Home Resident #42" },
  ],
  neighbourhoods: [
    {
      id: "area_a",
      name: "Green Valley (Area A)",
      feederId: "FDR-001",
      households: 100,
      evCount: 20,
      pumpsCount: 5,
      solarCapacityKW: 100,
      batteryCapacityKWh: 100,
      currentRenewable: 70.0,
      currentDemand: 90.0,
      gap: 20.0,
      batterySOC: 68,
      flexibleLoadKW: 30.0,
      riskLevel: "HIGH",
      feederStress: 118,
      position: { x: 30, y: 35 }
    },
    {
      id: "area_b",
      name: "Tech Park Hub (Area B)",
      feederId: "FDR-002",
      households: 220,
      evCount: 45,
      pumpsCount: 8,
      solarCapacityKW: 250,
      batteryCapacityKWh: 200,
      currentRenewable: 190.0,
      currentDemand: 240.0,
      gap: 50.0,
      batterySOC: 75,
      flexibleLoadKW: 65.0,
      riskLevel: "MEDIUM",
      feederStress: 72,
      position: { x: 70, y: 25 }
    },
    {
      id: "area_c",
      name: "Lakeside Enclave (Area C)",
      feederId: "FDR-003",
      households: 150,
      evCount: 32,
      pumpsCount: 6,
      solarCapacityKW: 80,
      batteryCapacityKWh: 80,
      currentRenewable: 35.0,
      currentDemand: 115.0,
      gap: 80.0,
      batterySOC: 42,
      flexibleLoadKW: 28.0,
      riskLevel: "HIGH",
      feederStress: 124,
      position: { x: 45, y: 75 }
    },
    {
      id: "area_d",
      name: "Sunrise Greens (Area D)",
      feederId: "FDR-004",
      households: 80,
      evCount: 12,
      pumpsCount: 3,
      solarCapacityKW: 120,
      batteryCapacityKWh: 100,
      currentRenewable: 95.0,
      currentDemand: 65.0,
      gap: 0.0,
      batterySOC: 90,
      flexibleLoadKW: 18.0,
      riskLevel: "LOW",
      feederStress: 45,
      position: { x: 80, y: 70 }
    }
  ],
  alerts: [
    {
      id: "alt_01",
      type: "HIGH RENEWABLE DROP EXPECTED",
      severity: "WARNING",
      neighbourhoodId: "area_a",
      timestamp: new Date().toISOString(),
      message: "Sunset solar decay approaching: Generation expected to drop from 70 kW down to 18 kW by 19:00."
    },
    {
      id: "alt_02",
      type: "ENERGY GAP DETECTED",
      severity: "HIGH",
      neighbourhoodId: "area_a",
      timestamp: new Date().toISOString(),
      message: "Predicted shortage of 75 kW at 18:30 on Feeder FDR-001. Flexibility dispatch recommended."
    },
    {
      id: "alt_03",
      type: "CRITICAL LOAD PROTECTED",
      severity: "INFO",
      neighbourhoodId: "area_a",
      timestamp: new Date().toISOString(),
      message: "Health Clinic (8 kW) & Emergency infrastructure granted 100% priority buffer. Zero curtailment."
    }
  ]
};

module.exports = {
  firestoreStore,
  isFirebaseActive: Boolean(process.env.FIREBASE_PROJECT_ID)
};
