# GridSense AI — Prototype Assumptions & Constraints

All figures and operational metrics described herein are explicitly designated as **Prototype Assumptions** for academic and competition simulation purposes.

---

## 1. Microgrid Scope Assumptions
- **Scale**: 100 domestic residential households connected to a single 11kV / 415V distribution feeder (Feeder FDR-001).
- **Rooftop Solar Array**: 100 kWp cumulative installed capacity across residential and community carports.
- **Community Battery (BESS)**: 100 kWh Lithium Iron Phosphate (LiFePO4) pack with a minimum 20% emergency reserve floor (20 kWh) and max continuous C-rate of 0.25C (25 kW).
- **Critical Load Baseline**: Primary health center (8 kW dialysis and vaccine refrigeration) and public streetlighting (47 kW essential infrastructure) are treated as strictly inviolable (Priority 1, 0% curtailment).

---

## 2. Communications & Protocol Assumptions
- **Software-Only Model**: Assumes direct cloud-to-cloud integration via utility AMI (Advanced Metering Infrastructure) head-end systems.
- **EV Smart Chargers**: Assumed compatible with OCPP 2.0.1 (Open Charge Point Protocol) supporting remote scheduling and start-delay profiles.
- **DISCOM Demand Response**: Compatible with OpenADR 2.0b VEN/VTN signaling.

---

## 3. Financial & Tariff Assumptions
- **Peak Penalty / Diesel Displacement Tariff**: ₹29 per kWh (avoided diesel generator running cost during peak deficits).
- **Carbon Abatement Metric**: 0.76 kg CO₂ abated per kWh of grid peak shaving.
- **Software Deployment Cost**: Estimated ₹1,20,000 annual software subscription per 100-home feeder cluster.
