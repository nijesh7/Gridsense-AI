/**
 * GridSense AI - Forecast Controller
 * Exposes 15m, 30m, 60m, 90m multi-horizon predictions for Renewable and Demand.
 */

const mlService = require("../services/mlService");
const { firestoreStore } = require("../config/firebase");

exports.getForecast = async (req, res, next) => {
  try {
    const neighbourhoodId = req.params.neighbourhoodId || "area_a";
    const area = firestoreStore.neighbourhoods.find(n => n.id === neighbourhoodId) || firestoreStore.neighbourhoods[0];

    const params = {
      current_renewable_kw: Number(req.query.renewable) || area.currentRenewable,
      current_demand_kw: Number(req.query.demand) || area.currentDemand,
      hour: Number(req.query.hour) || 18,
      temperature: Number(req.query.temp) || 30.5,
      cloud_level: Number(req.query.cloud) || 0.2
    };

    const forecastData = await mlService.getRenewableForecast(params);

    res.json({
      success: true,
      neighbourhoodId: area.id,
      feederId: area.feederId,
      model: "XGBoost Regressor (Dual Forecaster)",
      dataLabel: "Simulation / Demo Data",
      predictions: forecastData.horizons,
      metadata: forecastData.model_metadata
    });
  } catch (err) {
    next(err);
  }
};
