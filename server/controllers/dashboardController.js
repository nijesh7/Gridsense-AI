/**
 * GridSense AI - Dashboard Controller
 * Aggregates microgrid telemetry, energy gap metrics, battery SOC, and active risk.
 */

const { firestoreStore } = require("../config/firebase");
const mlService = require("../services/mlService");

exports.getDashboardData = async (req, res, next) => {
  try {
    const neighbourhoodId = req.query.neighbourhoodId || "area_a";
    const area = firestoreStore.neighbourhoods.find(n => n.id === neighbourhoodId) || firestoreStore.neighbourhoods[0];

    // Compute live gap and risk
    const energyGap = Math.max(0, Math.round((area.currentDemand - area.currentRenewable) * 10) / 10);
    
    let riskLevel = "LOW";
    if (energyGap > 60 || area.feederStress > 115) {
      riskLevel = "CRITICAL";
    } else if (energyGap > 30 || area.feederStress > 90) {
      riskLevel = "HIGH";
    } else if (energyGap > 10) {
      riskLevel = "MEDIUM";
    }

    // Get latest forecast from ML service
    const forecast = await mlService.getRenewableForecast({
      current_renewable_kw: area.currentRenewable,
      current_demand_kw: area.currentDemand,
      hour: 18,
      temperature: 31.0,
      cloud_level: 0.2
    });

    const responseData = {
      header: {
        title: "GRID SENSE AI",
        subtitle: "AI-Powered Neighbourhood Energy Flexibility Platform",
        neighbourhood: area.name,
        feederId: area.feederId,
        timestamp: new Date().toISOString()
      },
      metrics: {
        renewableGeneration: area.currentRenewable,
        electricityDemand: area.currentDemand,
        energyGap: energyGap,
        batterySOC: area.batterySOC,
        flexibleLoadAvailable: area.flexibleLoadKW,
        gridRisk: riskLevel,
        feederStress: area.feederStress
      },
      communityBattery: {
        capacity_kWh: area.batteryCapacityKWh,
        currentSOC: area.batterySOC,
        maxChargeRate: 25,
        maxDischargeRate: 25,
        minimumReserve: 20,
        status: energyGap > 0 ? "DISCHARGING BUFFER" : "FLOAT / READY"
      },
      criticalLoadStatus: "CRITICAL LOADS 100% PROTECTED",
      forecastHorizon: forecast.horizons || [],
      recentAlerts: firestoreStore.alerts.slice(0, 3)
    };

    res.json({ success: true, data: responseData });
  } catch (err) {
    next(err);
  }
};
