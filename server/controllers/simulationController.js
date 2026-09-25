/**
 * GridSense AI - Simulation & Demo Mode Controller
 */

const mlService = require("../services/mlService");

exports.runSimulation = async (req, res, next) => {
  try {
    const {
      renewablePercentage = 100,
      demandLevel = "Normal",
      batterySOC = 68,
      evLoadLevel = "Medium",
      weather = "Sunny"
    } = req.body;

    const result = await mlService.runSimulation({
      renewable_percentage: Number(renewablePercentage),
      demand_level: demandLevel,
      battery_soc_pct: Number(batterySOC),
      ev_load_level: evLoadLevel,
      weather: weather
    });

    res.json({
      success: true,
      simulationData: result
    });
  } catch (err) {
    next(err);
  }
};

exports.startDemoScenario = async (req, res, next) => {
  try {
    // 6:00 PM -> 6:30 PM canonical scenario:
    // Renewable drops: 70 kW -> 45 kW
    // Demand increases: 90 kW -> 120 kW
    // Gap: 75 kW
    const optPlan = await mlService.optimizeFlexibility({
      predicted_demand_kw: 120.0,
      predicted_renewable_kw: 45.0,
      battery_soc_pct: 68.0,
      ev_fleet_kw: 24.0,
      water_pumps_kw: 15.0,
      cooling_kw: 12.0
    });

    const demoSteps = [
      { step: 1, time: "18:00", description: "Current Status: 70 kW Renewable, 90 kW Demand. Stable microgrid.", status: "NORMAL" },
      { step: 2, time: "18:15", description: "Weather & human pattern alert: Sunset decay begins, residents plug in EVs.", status: "MONITORING" },
      { step: 3, time: "18:30", description: "AI Forecast: Renewable drops to 45 kW, Demand surges to 120 kW. Predicted Gap = 75 kW!", status: "HIGH_DEFICIT_RISK" },
      { step: 4, time: "18:31", description: "GridSense identifies flexible loads: EV charging, water pumps, cooling.", status: "ANALYZING_FLEXIBILITY" },
      { step: 5, time: "18:32", description: "Critical loads (Clinic 8 kW + Domestic essentials) 100% safeguarded. Zero curtailment.", status: "CRITICAL_PROTECTED" },
      { step: 6, time: "18:33", description: "AI schedules: Delay EVs (+60 min), shift water pump (+45 min), inject 12 kW battery support.", status: "PLAN_APPLIED" },
      { step: 7, time: "18:34", description: "Result: Energy Gap reduced from 75 kW down to 42 kW (44% reduction!). Feeder safe at 74%.", status: "BALANCED" }
    ];

    res.json({
      success: true,
      demoScenario: {
        neighbourhood: "Green Valley (100 homes, 20 EVs, 5 pumps, 10 shops, 1 clinic, 1 battery)",
        timeline: demoSteps,
        optimizationResult: optPlan
      }
    });
  } catch (err) {
    next(err);
  }
};
