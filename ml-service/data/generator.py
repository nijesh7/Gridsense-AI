"""
GridSense AI - Neighbourhood Energy Data Generator
Generates realistic multi-week synthetic data for 100-home microgrid.
Labeled clearly as 'Simulation / Demo Data'.
"""

import math
import random
from datetime import datetime, timedelta
import pandas as pd
import numpy as np


def generate_neighbourhood_dataset(days: int = 28, seed: int = 42) -> pd.DataFrame:
    """
    Generate synthetic hourly energy records for 100 households with:
    - Solar PV (100 kWp nominal)
    - EV Fleet (20-30 connected vehicles)
    - Municipal Water Pumps (15-20 kW)
    - Commercial / Residential HVAC
    - Health clinic & emergency loads (critical)
    """
    random.seed(seed)
    np.random.seed(seed)

    start_date = datetime(2026, 6, 1, 0, 0, 0)
    records = []

    base_temp = 28.0  # Celsius summer baseline

    for step in range(days * 24):
        current_time = start_date + timedelta(hours=step)
        hour = current_time.hour
        day_of_week = current_time.weekday()
        is_weekend = day_of_week >= 5

        # 1. Weather Simulation
        # Diurnal temp cycle: coldest at 5 AM, hottest at 2 PM
        temp_cycle = 7.0 * math.sin((hour - 8) * math.pi / 12)
        weather_noise = np.random.normal(0, 1.2)
        temperature = round(base_temp + temp_cycle + weather_noise, 1)

        # Cloud cover (0.0 to 1.0) with random weather fronts
        weather_front = (math.sin(step / 36.0) + 1.0) / 2.0  # Slow rolling weather wave
        cloud_noise = np.random.beta(1.5, 3.0)
        cloud_level = round(min(1.0, max(0.0, 0.25 * weather_front + 0.75 * cloud_noise)), 2)

        humidity = round(min(98.0, max(30.0, 65.0 - (temperature - 25.0) * 1.5 + np.random.normal(0, 3))), 1)

        # 2. Solar PV Generation (100 kWp array)
        if 6 <= hour <= 18:
            # Solar elevation angle factor (peak at 12:00-13:00)
            solar_elevation = max(0.0, math.sin((hour - 6) * math.pi / 12))
            clean_sky_solar = 100.0 * (solar_elevation ** 1.3)
            # Cloud attenuation: thick clouds reduce generation by up to 80%
            cloud_attenuation = 1.0 - (cloud_level * 0.78)
            solar_generation = max(0.0, float(clean_sky_solar * cloud_attenuation + np.random.normal(0, 2.0)))
        else:
            solar_generation = 0.0
        solar_generation = round(solar_generation, 2)

        # 3. Neighbourhood Electricity Demand Components
        # A. Base Domestic & Critical Load (Clinic 8 kW + Lighting/Essentials 45-55 kW)
        critical_clinic = 8.0 + np.random.normal(0, 0.4)
        base_domestic = 48.0 + (5.0 if is_weekend else 0.0) + np.random.normal(0, 2.5)

        # B. HVAC / Cooling load (highly correlated with temperature > 26C)
        cooling_load = max(4.0, (temperature - 24.0) * 1.8 + np.random.normal(0, 1.2))

        # C. Water Pumping (flexible municipal pumps run morning 7-9 AM & evening 6-8 PM)
        if hour in [7, 8, 18, 19]:
            water_pump_load = 15.0 + np.random.normal(0, 1.0)
        elif hour in [14, 15]:
            water_pump_load = 8.0 + np.random.normal(0, 0.8)
        else:
            water_pump_load = 0.0

        # D. EV Charging (Major surge 18:00 - 22:00 as commuters plug in)
        if 18 <= hour <= 22:
            ev_load = 26.0 + 8.0 * math.sin((hour - 18) * math.pi / 4) + np.random.normal(0, 2.5)
        elif 9 <= hour <= 17:
            ev_load = 6.0 + np.random.normal(0, 1.5)
        else:
            ev_load = 2.0 + np.random.normal(0, 0.8)
        ev_load = max(0.0, ev_load)

        total_demand = round(critical_clinic + base_domestic + cooling_load + water_pump_load + ev_load, 2)

        # Energy Gap (Demand - Renewable)
        energy_gap = round(max(0.0, total_demand - solar_generation), 2)

        # Simple simulated community battery state (100 kWh, 20% floor)
        # Charges when solar > demand, discharges when gap > 0
        battery_soc = 68.0  # Baseline indicator

        records.append({
            "timestamp": current_time.strftime("%Y-%m-%d %H:%M:%S"),
            "hour": hour,
            "day_of_week": day_of_week,
            "is_weekend": int(is_weekend),
            "temperature": temperature,
            "cloud_level": cloud_level,
            "humidity": humidity,
            "renewable_generation": solar_generation,
            "electricity_demand": total_demand,
            "energy_gap": energy_gap,
            "critical_load": round(critical_clinic + 45.0, 2),
            "ev_load": round(ev_load, 2),
            "water_pump_load": round(water_pump_load, 2),
            "hvac_load": round(cooling_load, 2),
            "battery_soc": battery_soc,
            "data_type": "Simulation / Demo Data"
        })

    df = pd.DataFrame(records)

    # Calculate lag features and rolling averages for ML training
    df["prev_renewable"] = df["renewable_generation"].shift(1).bfill()
    df["prev_demand"] = df["electricity_demand"].shift(1).bfill()
    df["rolling_avg_generation_3h"] = df["renewable_generation"].rolling(window=3, min_periods=1).mean().round(2)
    df["rolling_avg_demand_3h"] = df["electricity_demand"].rolling(window=3, min_periods=1).mean().round(2)

    return df


if __name__ == "__main__":
    df = generate_neighbourhood_dataset(days=28)
    output_path = "neighbourhood_simulation_dataset.csv"
    df.to_csv(output_path, index=False)
    print(f"Generated {len(df)} records of simulated neighbourhood energy data -> {output_path}")
