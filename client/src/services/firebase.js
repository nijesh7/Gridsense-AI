/**
 * GridSense AI - Firebase Integration (Project: gridsense-4b9d8)
 * Configured with Cloud Firestore, Realtime Listeners, and Database Seeder.
 */

import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  addDoc, 
  getDocs,
  onSnapshot, 
  query, 
  orderBy, 
  limit 
} from "firebase/firestore";

// User's Real Firebase Project Configuration
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBUvZ3V7V3DLeyeCf_83AtmAHCk3Ykmx-I",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "gridsense-4b9d8.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "gridsense-4b9d8",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "gridsense-4b9d8.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "523960811845",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:523960811845:web:54223cbdacf7ccd235fe2c",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-VMQR605RQ3"
};

let app;
let auth;
let db;

try {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  auth = getAuth(app);
  db = getFirestore(app);
  console.log("⚡ [Firebase] Connected to project: gridsense-4b9d8 (Cloud Firestore active)");
} catch (err) {
  console.warn("⚠️ [Firebase] Initialization notice:", err.message);
}

/**
 * Automatically seeds initial collections into Firestore if empty
 */
export async function seedFirestoreDatabase() {
  if (!db) return;

  try {
    const snap = await getDocs(collection(db, "neighbourhoods"));
    if (snap.empty) {
      console.log("🌱 [Firebase] Seeding initial neighbourhood telemetry into Firestore...");
      
      const seedAreas = [
        {
          id: "area_a",
          name: "Green Valley (Area A)",
          feederId: "FDR-001",
          households: 100,
          evCount: 20,
          pumpsCount: 5,
          currentRenewable: 70.0,
          currentDemand: 90.0,
          gap: 20.0,
          batterySOC: 68,
          flexibleLoadKW: 30.0,
          riskLevel: "HIGH",
          feederStress: 118,
          lastUpdated: new Date().toISOString()
        },
        {
          id: "area_b",
          name: "Tech Park Hub (Area B)",
          feederId: "FDR-002",
          households: 220,
          evCount: 45,
          pumpsCount: 8,
          currentRenewable: 190.0,
          currentDemand: 240.0,
          gap: 50.0,
          batterySOC: 75,
          flexibleLoadKW: 65.0,
          riskLevel: "MEDIUM",
          feederStress: 72,
          lastUpdated: new Date().toISOString()
        },
        {
          id: "area_c",
          name: "Lakeside Enclave (Area C)",
          feederId: "FDR-003",
          households: 150,
          evCount: 32,
          pumpsCount: 6,
          currentRenewable: 35.0,
          currentDemand: 115.0,
          gap: 80.0,
          batterySOC: 42,
          flexibleLoadKW: 28.0,
          riskLevel: "HIGH",
          feederStress: 124,
          lastUpdated: new Date().toISOString()
        },
        {
          id: "area_d",
          name: "Sunrise Greens (Area D)",
          feederId: "FDR-004",
          households: 80,
          evCount: 12,
          pumpsCount: 3,
          currentRenewable: 95.0,
          currentDemand: 65.0,
          gap: 0.0,
          batterySOC: 90,
          flexibleLoadKW: 18.0,
          riskLevel: "LOW",
          feederStress: 45,
          lastUpdated: new Date().toISOString()
        }
      ];

      for (const area of seedAreas) {
        await setDoc(doc(db, "neighbourhoods", area.id), area);
      }

      // Seed Initial Alerts
      const seedAlerts = [
        {
          type: "HIGH RENEWABLE DROP EXPECTED",
          severity: "WARNING",
          neighbourhoodId: "area_a",
          timestamp: new Date().toISOString(),
          message: "Sunset solar decay approaching: Generation expected to drop from 70 kW down to 18 kW by 19:00."
        },
        {
          type: "ENERGY GAP DETECTED",
          severity: "HIGH",
          neighbourhoodId: "area_a",
          timestamp: new Date().toISOString(),
          message: "Predicted shortage of 75 kW at 18:30 on Feeder FDR-001. Demand-response plan recommended."
        },
        {
          type: "CRITICAL LOAD PROTECTED",
          severity: "INFO",
          neighbourhoodId: "area_a",
          timestamp: new Date().toISOString(),
          message: "Health Clinic (8 kW) & Emergency infrastructure granted 100% priority buffer. Zero curtailment."
        }
      ];

      for (const alt of seedAlerts) {
        await addDoc(collection(db, "alerts"), alt);
      }

      console.log("✅ [Firebase] Firestore collections seeded successfully: 'neighbourhoods', 'alerts'");
    }
  } catch (err) {
    console.warn("⚠️ [Firebase] Auto-seed status:", err.message);
  }
}

// Trigger background seed check
seedFirestoreDatabase();

/**
 * Real-time listener for a neighbourhood's live telemetry document in Firestore
 */
export function subscribeToNeighbourhoodLive(neighbourhoodId = "area_a", callback) {
  if (!db) return () => {};

  try {
    const docRef = doc(db, "neighbourhoods", neighbourhoodId);
    return onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        callback(docSnap.data());
      }
    }, (err) => {
      console.warn("[Firestore] onSnapshot notice:", err.message);
    });
  } catch (e) {
    return () => {};
  }
}

/**
 * Real-time listener for alerts collection in Firestore
 */
export function subscribeToAlertsLive(callback) {
  if (!db) return () => {};

  try {
    const q = query(collection(db, "alerts"), orderBy("timestamp", "desc"), limit(10));
    return onSnapshot(q, (snapshot) => {
      const items = [];
      snapshot.forEach(doc => items.push({ id: doc.id, ...doc.data() }));
      callback(items);
    }, (err) => {
      console.warn("[Firestore] Alerts onSnapshot notice:", err.message);
    });
  } catch (e) {
    return () => {};
  }
}

/**
 * Log What-If Simulation run into Firestore
 */
export async function logSimulationRun(scenarioData) {
  if (!db) return;
  try {
    await addDoc(collection(db, "simulationRuns"), {
      ...scenarioData,
      timestamp: new Date().toISOString()
    });
    console.log("✅ [Firebase] Simulation logged to Firestore collection 'simulationRuns'");
  } catch (err) {
    console.warn("[Firestore] Failed to log simulation run:", err.message);
  }
}

export { app, auth, db };
