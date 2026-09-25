/**
 * GridSense AI - Optimization Controller
 * Coordinates flexibility scheduling, critical load protection, and battery support.
 */

const mlService = require("../services/mlService");

exports.optimizeFlexibility = async (req, res, next) => {
  try {
    const {
      predictedDemand = 120.0,
      predictedRenewable = 45.0,
      batterySOC = 68.0,
      evFleetKW = 24.0,
      waterPumpsKW = 15.0,
      coolingKW = 12.0
    } = req.body;

    const result = await mlService.optimizeFlexibility({
      predicted_demand_kw: predictedDemand,
      predicted_renewable_kw: predictedRenewable,
      battery_soc_pct: batterySOC,
      ev_fleet_kw: evFleetKW,
      water_pumps_kw: waterPumpsKW,
      cooling_kw: coolingKW,
      critical_clinic_kw: 8.0,
      critical_essentials_kw: 47.0
    });

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    next(err);
  }
};
