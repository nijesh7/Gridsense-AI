/**
 * GridSense AI - Frontend API Service Client
 * Calls the Node.js Express backend (with resilient analytical fallback for instantaneous demo).
 */

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(endpoint, options = {}) {
  const role = localStorage.getItem("gridsense_user_role") || "ADMIN";
  const defaultHeaders = {
    "Content-Type": "application/json",
    "x-user-role": role,
  };

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: { ...defaultHeaders, ...(options.headers || {}) },
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    console.warn(`[GridSense API Warning] Falling back on analytical mock for ${endpoint}:`, err.message);
    return getLocalFallback(endpoint, options);
  }
}

// Fallback logic so the frontend is 100% self-sufficient
function getLocalFallback(endpoint, options) {
  if (endpoint.startsWith("/dashboard")) {
    return {
      success: true,
      data: {
        header: {
          title: "GRID SENSE AI",
          subtitle: "AI-Powered Neighbourhood Energy Flexibility Platform",
          neighbourhood: "Green Valley (Area A)",
          feederId: "FDR-001",
          timestamp: new Date().toISOString()
        },
        metrics: {
          renewableGeneration: 70.0,
          electricityDemand: 90.0,
          energyGap: 20.0,
          batterySOC: 68,
          flexibleLoadAvailable: 30.0,
          gridRisk: "HIGH",
          feederStress: 118
        },
        communityBattery: {
          capacity_kWh: 100,
          currentSOC: 68,
          maxChargeRate: 25,
          maxDischargeRate: 25,
          minimumReserve: 20,
          status: "DISCHARGING BUFFER"
        },
        criticalLoadStatus: "CRITICAL LOADS 100% PROTECTED",
        forecastHorizon: [
          { horizon: "15m", predicted_renewable_kw: 62.0, predicted_demand_kw: 102.0, energy_gap_kw: 40.0 },
          { horizon: "30m", predicted_renewable_kw: 45.0, predicted_demand_kw: 120.0, energy_gap_kw: 75.0 },
          { horizon: "60m", predicted_renewable_kw: 18.0, predicted_demand_kw: 132.0, energy_gap_kw: 114.0 },
          { horizon: "90m", predicted_renewable_kw: 0.0, predicted_demand_kw: 128.0, energy_gap_kw: 128.0 }
        ]
      }
    };
  }

  if (endpoint.startsWith("/forecast")) {
    return {
      success: true,
      model: "XGBoost Regressor (Dual Forecaster)",
      dataLabel: "Simulation / Demo Data",
      predictions: [
        { horizon: "15m", predicted_renewable_kw: 62.0, predicted_demand_kw: 102.0, energy_gap_kw: 40.0 },
        { horizon: "30m", predicted_renewable_kw: 45.0, predicted_demand_kw: 120.0, energy_gap_kw: 75.0 },
        { horizon: "60m", predicted_renewable_kw: 18.0, predicted_demand_kw: 132.0, energy_gap_kw: 114.0 },
        { horizon: "90m", predicted_renewable_kw: 0.0, predicted_demand_kw: 128.0, energy_gap_kw: 128.0 }
      ],
      metadata: { model_type: "XGBoost", r2: 0.962, rmse: 4.12, mae: 2.85 }
    };
  }

  if (endpoint.startsWith("/simulation") || endpoint.startsWith("/optimization")) {
    let body = {};
    if (options.body) {
      try { body = JSON.parse(options.body); } catch (_) {}
    }
    const dem = body.predictedDemand || 120.0;
    const ren = body.predictedRenewable || 45.0;
    const rawGap = Math.max(0, dem - ren);
    const shifted = 24.0 + 9.0;
    const batt = 12.0;
    const remGap = Math.max(0, dem - shifted - ren - batt);

    return {
      success: true,
      simulationData: {
        result: {
          before: { demand_kw: dem, renewable_kw: ren, energy_gap_kw: rawGap, feeder_stress_pct: 125, risk_level: "HIGH" },
          after: { optimized_demand_kw: dem - shifted, renewable_kw: ren, battery_support_kw: batt, remaining_gap_kw: remGap, feeder_stress_pct: 74, risk_level: "LOW" },
          impact_metrics: { gap_reduction_pct: 44.0, flexible_energy_shifted_kw: shifted, battery_contribution_kw: batt, critical_load_protected_pct: 100.0, data_label: "Simulation Result" },
          recommendations: [
            { action: "Delay EV charging by 60 minutes", target_asset: "EV Fleet", shifted_kw: 24.0, reason: "EV charging is flexible and renewable generation is expected to fall during the next 60 minutes." },
            { action: "Shift water pumping by 45 minutes", target_asset: "Water Pumps", shifted_kw: 9.0, reason: "Overhead storage tanks have sufficient capacity until off-peak hours." },
            { action: "Use 12 kW battery support", target_asset: "Community Battery", shifted_kw: 12.0, reason: "Flexible load shifting cannot fully cover the predicted energy gap while critical loads must remain protected." },
            { action: "Maintain battery reserve above 20%", target_asset: "Battery Management", shifted_kw: 0, reason: "Ensures essential emergency buffer is conserved." },
            { action: "Protect critical loads (Health Clinic & Emergency)", target_asset: "Health Clinic", shifted_kw: 0, reason: "Critical loads are hard-constrained with priority 1." }
          ],
          protected_loads: [
            { name: "Health Clinic & Emergency Care", category: "CRITICAL", allocated_kw: 8.0, status: "PROTECTED" },
            { name: "Streetlights & Domestic Essentials", category: "CRITICAL", allocated_kw: 47.0, status: "PROTECTED" }
          ],
          critical_load_status: "CRITICAL LOADS 100% PROTECTED"
        }
      }
    };
  }

  if (endpoint.startsWith("/neighbourhoods")) {
    return {
      success: true,
      data: [
        { id: "area_a", name: "Green Valley (Area A)", feederId: "FDR-001", households: 100, currentRenewable: 70, currentDemand: 90, gap: 20, batterySOC: 68, flexibleLoadKW: 30, riskLevel: "HIGH", feederStress: 118, position: { x: 30, y: 35 } },
        { id: "area_b", name: "Tech Park Hub (Area B)", feederId: "FDR-002", households: 220, currentRenewable: 190, currentDemand: 240, gap: 50, batterySOC: 75, flexibleLoadKW: 65, riskLevel: "MEDIUM", feederStress: 72, position: { x: 70, y: 25 } },
        { id: "area_c", name: "Lakeside Enclave (Area C)", feederId: "FDR-003", households: 150, currentRenewable: 35, currentDemand: 115, gap: 80, batterySOC: 42, flexibleLoadKW: 28, riskLevel: "HIGH", feederStress: 124, position: { x: 45, y: 75 } },
        { id: "area_d", name: "Sunrise Greens (Area D)", feederId: "FDR-004", households: 80, currentRenewable: 95, currentDemand: 65, gap: 0, batterySOC: 90, flexibleLoadKW: 18, riskLevel: "LOW", feederStress: 45, position: { x: 80, y: 70 } },
      ]
    };
  }

  if (endpoint.startsWith("/alerts")) {
    return {
      success: true,
      data: [
        { id: "alt_01", type: "HIGH RENEWABLE DROP EXPECTED", severity: "WARNING", timestamp: "18:00", message: "Sunset solar decay: Generation falling from 70 kW to 18 kW by 19:00." },
        { id: "alt_02", type: "ENERGY GAP DETECTED", severity: "HIGH", timestamp: "18:15", message: "Predicted shortage of 75 kW at 18:30 on Feeder FDR-001. Demand response recommended." },
        { id: "alt_03", type: "CRITICAL LOAD PROTECTED", severity: "INFO", timestamp: "18:20", message: "Health Clinic (8 kW) & Emergency lighting 100% protected." }
      ]
    };
  }

  return { success: true, data: {} };
}

export const api = {
  getDashboard: (neighbourhoodId = "area_a") => request(`/dashboard?neighbourhoodId=${neighbourhoodId}`),
  getForecast: (neighbourhoodId = "area_a", params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/forecast/${neighbourhoodId}?${qs}`);
  },
  getNeighbourhoods: () => request("/neighbourhoods"),
  getNeighbourhood: (id) => request(`/energy/${id}`),
  getBattery: (id = "area_a") => request(`/battery/${id}`),
  getAlerts: () => request("/alerts"),
  runSimulation: (params) => request("/simulation", { method: "POST", body: JSON.stringify(params) }),
  optimizeFlexibility: (params) => request("/optimization", { method: "POST", body: JSON.stringify(params) }),
  startDemo: () => request("/demo/start", { method: "POST" }),
};
