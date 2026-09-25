"""
GridSense AI - Python FastAPI ML Microservice
Serves XGBoost forecasts, Energy Gap detection, and Flexibility Optimization.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Dict, Any, Optional

import os
import sys

# Ensure local packages are importable
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

from forecasting.train import EnergyForecaster
from optimization.engine import OptimizationEngine

app = FastAPI(
    title="GridSense AI - Machine Learning Microservice",
    description="Dual XGBoost Forecasting & Flexibility Optimization for Neighbourhood Microgrids",
    version="1.0.0"
)

# Enable CORS for React frontend & Node.js backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize ML Forecaster and Optimization Engine
forecaster = EnergyForecaster()
opt_engine = OptimizationEngine()


# =====================================================================
# Request Schemas
# =====================================================================

class ForecastRequest(BaseModel):
    current_renewable_kw: float = Field(70.0, description="Current solar PV generation in kW")
    current_demand_kw: float = Field(90.0, description="Current total electricity demand in kW")
    hour: int = Field(18, ge=0, le=23, description="Hour of day (0-23)")
    day_of_week: int = Field(2, ge=0, le=6, description="Day of week (0=Mon, 6=Sun)")
    temperature: float = Field(30.0, description="Ambient temperature in Celsius")
    cloud_level: float = Field(0.2, ge=0.0, le=1.0, description="Cloud cover level (0-1)")
    humidity: float = Field(60.0, description="Relative humidity in percentage")


class OptimizeRequest(BaseModel):
    predicted_demand_kw: float = Field(120.0, description="Forecasted peak demand in kW")
    predicted_renewable_kw: float = Field(45.0, description="Forecasted solar generation in kW")
    battery_soc_pct: float = Field(68.0, ge=0.0, le=100.0, description="Community battery state of charge")
    ev_fleet_kw: float = Field(24.0, description="Connected EV charging load in kW")
    water_pumps_kw: float = Field(15.0, description="Municipal water pump load in kW")
    cooling_kw: float = Field(12.0, description="Commercial and club cooling in kW")
    critical_clinic_kw: float = Field(8.0, description="Clinic critical medical load")
    critical_essentials_kw: float = Field(47.0, description="Essential domestic baseline")


class SimulateRequest(BaseModel):
    renewable_percentage: int = Field(100, description="Renewable generation percentage: 100, 80, 60, 40")
    demand_level: str = Field("Normal", description="Demand scenario: Normal, +10%, +20%, +30%")
    battery_soc_pct: int = Field(68, description="Battery SOC: 20, 40, 60, 80")
    ev_load_level: str = Field("Medium", description="EV Load: Low, Medium, High")
    weather: str = Field("Sunny", description="Weather: Sunny, Cloudy, Rainy")


# =====================================================================
# API Endpoints
# =====================================================================

@app.get("/health")
def health_check():
    return {
        "status": "online",
        "service": "GridSense AI ML Microservice",
        "models_trained": forecaster.is_trained,
        "model_metadata": forecaster.metrics,
        "note": "XGBoost and Scikit-Learn Ensemble Active"
    }


@app.post("/forecast/renewable")
def forecast_renewable(req: ForecastRequest):
    try:
        horizon_results = forecaster.predict_multi_horizon(
            current_renewable=req.current_renewable_kw,
            current_demand=req.current_demand_kw,
            hour=req.hour,
            day_of_week=req.day_of_week,
            temperature=req.temperature,
            cloud_level=req.cloud_level,
            humidity=req.humidity
        )
        return horizon_results
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Renewable forecast error: {str(e)}")


@app.post("/forecast/demand")
def forecast_demand(req: ForecastRequest):
    try:
        horizon_results = forecaster.predict_multi_horizon(
            current_renewable=req.current_renewable_kw,
            current_demand=req.current_demand_kw,
            hour=req.hour,
            day_of_week=req.day_of_week,
            temperature=req.temperature,
            cloud_level=req.cloud_level,
            humidity=req.humidity
        )
        return horizon_results
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Demand forecast error: {str(e)}")


@app.post("/optimize")
def optimize_plan(req: OptimizeRequest):
    try:
        plan = opt_engine.optimize_microgrid(
            predicted_demand_kw=req.predicted_demand_kw,
            predicted_renewable_kw=req.predicted_renewable_kw,
            battery_soc_pct=req.battery_soc_pct,
            ev_fleet_kw=req.ev_fleet_kw,
            water_pumps_kw=req.water_pumps_kw,
            cooling_kw=req.cooling_kw,
            critical_clinic_kw=req.critical_clinic_kw,
            critical_essentials_kw=req.critical_essentials_kw
        )
        return plan
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Optimization error: {str(e)}")


@app.post("/simulate")
def simulate_scenario(req: SimulateRequest):
    """
    What-If Simulator dynamic endpoint.
    Calculates scenario transformation and instant AI balancing plan.
    """
    # Base 6:00 PM evening conditions
    base_solar = 70.0
    base_demand = 90.0

    # 1. Apply Renewable Multiplier
    solar_mult = req.renewable_percentage / 100.0
    if req.weather == "Cloudy":
        solar_mult *= 0.65
    elif req.weather == "Rainy":
        solar_mult *= 0.35

    scenario_solar = round(base_solar * solar_mult, 1)

    # 2. Apply Demand Multiplier
    demand_mult = 1.0
    if req.demand_level == "+10%":
        demand_mult = 1.10
    elif req.demand_level == "+20%":
        demand_mult = 1.20
    elif req.demand_level == "+30%":
        demand_mult = 1.30

    # 3. Apply EV Load Level
    ev_kw = 20.0
    if req.ev_load_level == "Low":
        ev_kw = 10.0
    elif req.ev_load_level == "High":
        ev_kw = 35.0

    scenario_demand = round((base_demand * demand_mult) + (ev_kw - 20.0), 1)

    # 4. Run Optimization Engine
    opt_result = opt_engine.optimize_microgrid(
        predicted_demand_kw=scenario_demand,
        predicted_renewable_kw=scenario_solar,
        battery_soc_pct=float(req.battery_soc_pct),
        ev_fleet_kw=ev_kw,
        water_pumps_kw=15.0,
        cooling_kw=12.0
    )

    return {
        "scenario_input": req.dict(),
        "result": opt_result
    }


@app.get("/neighbourhood/baseline")
def get_baseline_topology():
    return {
        "neighbourhood_name": "Green Valley Smart Feeder 001",
        "feeder_id": "FDR-001",
        "households": 100,
        "evs": 20,
        "water_pumps": 5,
        "commercial_shops": 10,
        "school": 1,
        "clinic": 1,
        "community_battery": {
            "capacity_kwh": 100,
            "soc_pct": 68,
            "min_reserve_pct": 20,
            "max_discharge_kw": 25,
            "max_charge_kw": 25
        },
        "critical_infrastructure": [
            "Local Primary Health Clinic & Dialysis Unit",
            "Emergency Services & Ambulance Charging",
            "Streetlighting & CCTV Grid"
        ],
        "data_label": "Simulation / Demo Data"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
