# ⚡ GRID SENSE AI

> **“Predict. Optimize. Balance.”**  
> *Theme 1: Grid Reliability — Renewable Intermittency*  
> *Challenge: Making clean power dependable, neighbourhood by neighbourhood.*

---

## 1. What is GridSense AI?

**GridSense AI** is an intelligent neighbourhood energy coordination platform that predicts electricity shortages before they happen and coordinates flexible electricity usage, community battery storage, and critical loads to eliminate grid stress.

> *"GridSense AI does not create more electricity. It intelligently coordinates the electricity already available."*

### What it is NOT:
- ❌ **NOT** just a solar monitoring dashboard.
- ❌ **NOT** just a battery management system.
- ❌ **NOT** an expensive hardware retrofit with Arduinos or physical sensors.

### What it IS:
- ✅ **Proactive Shortage Prediction**: Dual XGBoost ML models forecast solar decay and evening demand surges 15, 30, 60, and 90 minutes in advance.
- ✅ **Dynamic Energy Gap Engine**: Automatically calculates $Energy\ Gap = Predicted\ Demand - Predicted\ Renewable$.
- ✅ **Coordinated Flexibility Scheduling**: Autonomously reschedules flexible loads (EV charging, municipal water pumping, HVAC setpoint drift) into off-peak hours.
- ✅ **Strategic Community Battery Storage**: Evaluates load flexibility *first*, then uses community battery storage without draining below the 20% emergency floor reserve.
- ✅ **100% Critical Load Protection**: Health clinics, dialysis machines, and emergency streetlighting are hard-constrained with priority 1 and zero curtailment.
- ✅ **DISCOM Collaboration**: Gives distribution utilities early visibility and automated demand-response capability at the local feeder level.

---

## 2. The Problem & The Solution

### The 6:00 PM Neighbourhood Challenge
Imagine a neighbourhood of **100 households**, 20 EVs, municipal water pumps, shops, a local health clinic, rooftop solar panels, and a shared community battery.

During the afternoon, solar generation is high. But at 6:00 PM:
1. ☀️ **Solar generation rapidly drops** (e.g. 70 kW → 45 kW).
2. 🚗 **Residents return home & plug in EVs** (demand spikes from 90 kW → 120 kW).
3. 🚨 **An Energy Gap of 75 kW appears** ($120 - 45 = 75\text{ kW}$).
4. ⚠️ **Feeder FDR-001 enters severe thermal overload (125%)**, risking transformer tripping and rolling blackouts.

### The GridSense AI Response
Instead of a reactive blackout or blindly draining the battery, GridSense AI:
1. **Forecasts the 75 kW deficit 60 minutes ahead**.
2. **Delays EV Fleet charging by 60 minutes** (+24 kW relief).
3. **Postpones municipal water pumping by 45 minutes** (+9 kW relief).
4. **Trims non-critical cooling by +1.5°C drift** (+6 kW relief).
5. **Injects 12 kW from the 100 kWh community battery** (preserving &gt;20% reserve).
6. **Protects the Health Clinic (8 kW) at 100% continuous power**.
7. **Result**: Energy gap is reduced from **75 kW down to 42 kW** (44% deficit reduction!), and feeder stress drops safely to 74%.

---

## 3. Technology Stack

```
React.js (Vite + Tailwind CSS + Recharts + Lucide React)
               │
               ▼
     Node.js + Express REST API Gateway
               │
     ┌─────────┴─────────┐
     ▼                   ▼
Firebase Firestore   Python FastAPI Service (XGBoost)
```

| Layer | Component | Details |
| :--- | :--- | :--- |
| **Frontend** | React 18, Vite | Component-driven SPA with dark energy aesthetics |
| **Styling** | Tailwind CSS | Curated color system, glassmorphism, responsive grid |
| **Data Visualization** | Recharts | Multi-horizon predictive curves, Before/After bar charts |
| **Icons** | Lucide React | Modern tech iconography |
| **Routing** | React Router v7 | Multi-view navigation (Dashboard, Forecast, What-If, DISCOM) |
| **Backend** | Node.js, Express.js | API gateway, telemetry aggregator, RBAC middleware |
| **Database** | Firebase Firestore | NoSQL documents for neighbourhoods, telemetry, alerts |
| **Authentication** | Firebase Auth | Role-based personas: `ADMIN`, `DISCOM_OPERATOR`, `COMMUNITY_MANAGER`, `USER` |
| **AI / ML Service** | Python, FastAPI, XGBoost | Multi-horizon regression ($R^2 = 0.962$ solar, $R^2 = 0.948$ demand) |

---

## 4. Key Application Features

1. **Main Microgrid Dashboard**: 6 dynamic KPI cards (Renewable, Demand, Energy Gap, Battery SOC, Flexible Load, Grid Risk).
2. **Predictive Horizon Forecast**: 15m, 30m, 60m, 90m multi-horizon curves with XGBoost model validation metrics.
3. **AI Flexibility Plan**: Side-by-side Hero Before vs After comparison with transparent **"WHY"** reasons for every recommended action.
4. **Community Battery Storage**: 100 kWh LiFePO4 BESS with a strict 20% floor reserve mark.
5. **What-If Energy Simulator ⭐**: Interactive judge sandbox to tweak Solar (100–40%), Demand (+10–30%), Battery SOC (20–80%), EV Fleet (Low–High), and Weather shocks with instant recalculation.
6. **DISCOM Operator Command Center**: Feeder FDR-001, FDR-002, FDR-003 monitoring and one-click "ACTIVATE DEMAND RESPONSE".
7. **Multi-Neighbourhood Sub-Grids**: Scalable Area A, B, C, D cards demonstrating expansion to city-wide networks.
8. **Simulated Grid Topology Map**: Clean SVG transmission map with live status nodes.
9. **Automated Demo Mode**: Big "START DEMO" button with step-by-step walkthrough of the 6:00 PM transition.
10. **Role Switcher**: Instant one-click persona switching (Admin, DISCOM Operator, Community Manager, Citizen).

---

## 5. How to Run Locally

### Prerequisites
- **Node.js** (v18+) & **npm**
- **Python** (v3.10+) with pip

### 1. Start the React Frontend
```bash
cd client
npm install
npm run dev
# Running on http://localhost:3000 (or Vite default port)
```

### 2. Start the Node.js Express Backend
```bash
cd server
npm install
npm run dev
# Running on http://localhost:5000
```

### 3. Start the Python FastAPI ML Microservice
```bash
cd ml-service
pip install -r requirements.txt
python main.py
# Running on http://localhost:8000 (FastAPI docs at http://localhost:8000/docs)
```

---

## 6. Project Documentation
- **[System Architecture](docs/ARCHITECTURE.md)**: Data flows, protocols, and microservice topology.
- **[AI Models & Training](docs/AI_MODEL.md)**: XGBoost feature engineering, solar decay curves, and metrics.
- **[Judge Demo Guide (3-5 mins)](docs/DEMO_GUIDE.md)**: 16-step walkthrough script for hackathon presentations.
- **[Assumptions & Unit Economics](docs/ASSUMPTIONS.md)**: Hardware-free model, deployment costs, and tariff basis.

---

## 7. License
Developed for the National Hackathon Challenge — Grid Reliability & Renewable Intermittency.
© 2026 GridSense AI Team. Open source under the MIT License.
