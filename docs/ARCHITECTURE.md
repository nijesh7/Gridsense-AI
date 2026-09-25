# GridSense AI — System Architecture Specification

## 1. Executive Summary
**GridSense AI** is an AI-powered neighbourhood energy coordination platform designed to address **Renewable Intermittency (Theme 1: Grid Reliability)**. Its core premise:

> *"GridSense AI does not create more electricity. It intelligently coordinates the electricity already available."*

---

## 2. End-to-End Information Architecture

```
                  GRID SENSE AI
                       │
                       ▼
              React.js Frontend (Vite + Tailwind + Recharts)
                       │
                       ▼
              Node.js + Express REST API Gateway
                       │
             ┌─────────┴─────────┐
             ▼                   ▼
      Firebase Firestore     Python FastAPI Service
      (NoSQL State)          (Dual XGBoost Forecaster)
                                  │
                    ┌─────────────┴─────────────┐
                    ▼                           ▼
             Demand Forecast          Renewable Forecast
             (15, 30, 60, 90m)        (15, 30, 60, 90m)
                    │                           │
                    └─────────────┬─────────────┘
                                  ▼
                           Energy Gap Engine
                         (Gap = Demand - Solar)
                                  ▼
                       Risk Detection Engine
                    (LOW / MED / HIGH / CRITICAL)
                                  ▼
                    Flexibility Optimization
                         ↙              ↘
                Flexible Loads       Community BESS
             (EVs, Pumps, HVAC)     (100 kWh LiFePO4)
                         ↘              ↙
                         Optimized Plan
                                │
                                ▼
                    Critical Load Protection
                  (Health Clinic & Emergency - 100%)
                                │
                                ▼
                       Before / After Metrics
                                │
                                ▼
                         DISCOM Dashboard
```

---

## 3. Technology Stack Mapping

| Layer | Technology | Role & Justification |
| :--- | :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, Lucide React | High-performance SPA with modern dark cyber-grid aesthetics and instant micro-interactions. |
| **Charts** | Recharts & Chart.js | Responsive dual-horizon area charts and Before/After comparative bar graphs. |
| **Backend** | Node.js, Express.js | API orchestrator, telemetry aggregation, role-based authorization, and proxy. |
| **Database** | Firebase Firestore | NoSQL document storage for neighbourhoods, telemetry streams, and audit logs. |
| **Authentication** | Firebase Authentication + RBAC | Multi-persona dashboard views: `ADMIN`, `DISCOM_OPERATOR`, `COMMUNITY_MANAGER`, `USER`. |
| **AI / ML Service** | Python, FastAPI, XGBoost, Pandas, NumPy | Multi-horizon regression and constraint-satisfaction load dispatch heuristics. |

---

## 4. Hardware-Free Software Architecture
GridSense AI is a **100% software-only solution**. It requires zero proprietary IoT microcontroller boards (no ESP32, Arduino, or custom sensor retrofits). In future deployments, it connects directly with utility smart-meter gateways via open industry standards:
- **OpenADR 2.0b**: Automated Demand Response signaling with utility distribution companies (DISCOMs).
- **OCPP 2.0.1**: Open Charge Point Protocol for smart EV fleet throttling and scheduled delay.
- **IEEE 2030.5**: Smart Energy Profile for community battery dispatch.
