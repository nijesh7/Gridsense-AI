/**
 * GridSense AI - Central API Routes
 */

const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");
const neighbourhoodController = require("../controllers/neighbourhoodController");
const forecastController = require("../controllers/forecastController");
const optimizationController = require("../controllers/optimizationController");
const simulationController = require("../controllers/simulationController");
const alertController = require("../controllers/alertController");
const { authMiddleware, requireRole } = require("../middleware/auth");

router.use(authMiddleware);

// User & Role State
router.get("/auth/me", (req, res) => {
  res.json({ success: true, user: req.user });
});

// Dashboard & Microgrid Telemetry
router.get("/dashboard", dashboardController.getDashboardData);

// Multi-Neighbourhoods & Map
router.get("/neighbourhoods", neighbourhoodController.getAllNeighbourhoods);
router.get("/energy/:neighbourhoodId", neighbourhoodController.getNeighbourhoodById);

// Forecasts (XGBoost)
router.get("/forecast/:neighbourhoodId", forecastController.getForecast);

// What-If Simulator & Flexibility Optimization
router.post("/simulation", simulationController.runSimulation);
router.post("/optimization", optimizationController.optimizeFlexibility);

// Community Battery
router.get("/battery/:neighbourhoodId", (req, res) => {
  res.json({
    success: true,
    battery: {
      capacity_kWh: 100,
      currentSOC: 68,
      maxChargeRate: 25,
      maxDischargeRate: 25,
      minimumReserve: 20,
      currentPower: 12.0,
      health: "98% (LiFePO4 Community BESS)",
      status: "DISCHARGING BUFFER"
    }
  });
});

// Alerts
router.get("/alerts", alertController.getAlerts);
router.post("/alerts", alertController.createAlert);

// Automated Demo Mode Trigger
router.post("/demo/start", simulationController.startDemoScenario);

module.exports = router;
