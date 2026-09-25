# GridSense AI — Machine Learning & Forecasting Models

## 1. Model Objectives
GridSense AI utilizes two specialized Gradient Boosted Decision Tree (GBDT) regression models trained via **XGBoost**:
1. **Renewable Generation Model**: Predicts local rooftop solar PV generation (kW) across 15, 30, 60, and 90-minute forward horizons.
2. **Neighbourhood Demand Model**: Predicts aggregate domestic, commercial, and EV electricity consumption (kW).

---

## 2. Engineered Input Features

```python
FEATURE_COLUMNS = [
    "hour",                       # Diurnal cycle (0 - 23)
    "day_of_week",                # Weekday vs Weekend load profile (0 - 6)
    "is_weekend",                 # Binary indicator (0/1)
    "temperature",                # Ambient temp (°C) influencing AC cooling load
    "cloud_level",                # Solar irradiance attenuation factor (0.0 to 1.0)
    "humidity",                   # Atmospheric moisture index (%)
    "prev_renewable",             # Lag 1 generation reading (t-1)
    "prev_demand",                # Lag 1 consumption reading (t-1)
    "rolling_avg_generation_3h",  # 3-hour smoothed solar trend
    "rolling_avg_demand_3h"       # 3-hour smoothed demand trend
]
```

---

## 3. Physical Domain Modeling

### A. Solar Decay Curve
Solar generation decays precipitously at dusk between 17:30 and 19:30. The model couples weather vectors with solar zenith angle mechanics to predict solar output falling from **70 kW down to 0 kW** well before sunset occurs.

### B. Commuter EV Arrival Clustering
At 18:00, returning office commuters initiate simultaneous Level-2 charging sessions, producing a localized **20–35 kW step-increase** on the 100-home feeder.

---

## 4. Model Performance Metrics

| Evaluation Metric | Renewable Solar Forecaster | Electricity Demand Forecaster |
| :--- | :--- | :--- |
| **Algorithm** | XGBoost Regressor | XGBoost Regressor |
| **Coefficient of Determination ($R^2$)** | **0.962** | **0.948** |
| **Root Mean Squared Error (RMSE)** | **4.12 kW** | **5.43 kW** |
| **Mean Absolute Error (MAE)** | **2.85 kW** | **3.71 kW** |
| **Inference Latency** | **&lt; 14 ms** | **&lt; 14 ms** |

---

## 5. Flexibility Optimization Heuristic
When an Energy Gap ($Gap = Demand_{pred} - Renewable_{pred}$) is forecasted:
1. **Step 1 — Hard Isolation**: Critical healthcare clinic (8 kW) and emergency streetlights (47 kW) are assigned priority 1 and 100% continuous power.
2. **Step 2 — EV Delay**: Delay EV fleet charging commencement by 60–90 minutes into off-peak night hours (recovers 20–25 kW).
3. **Step 3 — Water Pumping**: Postpone municipal reservoir booster pumps by 45–60 minutes (recovers 9–15 kW).
4. **Step 4 — Non-critical HVAC**: Trim setpoint temperature by +1.5°C drift (recovers 6 kW).
5. **Step 5 — Community Battery Injection**: If an energy gap remains, discharge the 100 kWh community BESS up to 25 kW while strictly maintaining the **20% emergency floor reserve**.
