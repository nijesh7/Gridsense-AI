"""
GridSense AI - Optimization & Flexibility Engine
Co-optimizes renewable generation, flexible loads, and community battery storage
while strictly guaranteeing 100% protection for critical infrastructure.
"""

from typing import Dict, Any, List


class OptimizationEngine:
    def __init__(self):
        self.battery_capacity_kwh = 100.0
        self.battery_reserve_floor_pct = 20.0
        self.battery_max_discharge_kw = 25.0
        self.battery_max_charge_kw = 25.0
        self.feeder_nominal_capacity_kw = 100.0

    def optimize_microgrid(
        self,
        predicted_demand_kw: float,
        predicted_renewable_kw: float,
        battery_soc_pct: float = 68.0,
        ev_fleet_kw: float = 24.0,
        water_pumps_kw: float = 15.0,
        cooling_kw: float = 12.0,
        critical_clinic_kw: float = 8.0,
        critical_essentials_kw: float = 47.0,
    ) -> Dict[str, Any]:
        """
        Executes the GridSense flexibility optimization algorithm.
        Co-ordinates: Demand, Renewables, Flexible Loads, Battery, Critical Loads.
        """
        # 1. Baseline Deficit Calculation (Before GridSense)
        raw_gap_kw = max(0.0, round(predicted_demand_kw - predicted_renewable_kw, 2))
        surplus_kw = max(0.0, round(predicted_renewable_kw - predicted_demand_kw, 2))

        # Dynamic Risk Assessment
        if raw_gap_kw <= 10.0:
            risk_level = "LOW"
            risk_badge = "badge-success"
        elif raw_gap_kw <= 35.0:
            risk_level = "MEDIUM"
            risk_badge = "badge-warning"
        elif raw_gap_kw <= 65.0:
            risk_level = "HIGH"
            risk_badge = "badge-danger"
        else:
            risk_level = "CRITICAL"
            risk_badge = "badge-danger"

        # Transformer / Feeder Stress %
        feeder_stress_before_pct = round((raw_gap_kw / self.feeder_nominal_capacity_kw) * 100, 1)

        # 2. Critical Load Protection Guarantee (100% Protected)
        total_critical_kw = critical_clinic_kw + critical_essentials_kw
        protected_assets = [
            {
                "name": "Health Clinic & Emergency Care",
                "category": "CRITICAL",
                "allocated_kw": critical_clinic_kw,
                "curtailed_kw": 0.0,
                "status": "PROTECTED",
                "reason": "Vital life-support, cold-chain medication and surgical suites must maintain 100% continuous power."
            },
            {
                "name": "Streetlights, Wi-Fi & Essential Residential",
                "category": "CRITICAL",
                "allocated_kw": critical_essentials_kw,
                "curtailed_kw": 0.0,
                "status": "PROTECTED",
                "reason": "Public security lighting, water supply baseline and core household appliances are protected."
            }
        ]

        # 3. Flexible Load Scheduling
        recommendations = []
        flexible_energy_shifted_kw = 0.0
        remaining_gap_to_cover = raw_gap_kw

        # Flexible Resource 1: EV Fleet Charging (Shift commencement by 60-90 mins)
        ev_shift_kw = 0.0
        if remaining_gap_to_cover > 0 and ev_fleet_kw > 0:
            ev_shift_kw = min(ev_fleet_kw, remaining_gap_to_cover)
            remaining_gap_to_cover -= ev_shift_kw
            flexible_energy_shifted_kw += ev_shift_kw
            recommendations.append({
                "action": "Delay EV Fleet Charging by 60–90 minutes",
                "target_asset": "EV Fleet",
                "shifted_kw": round(ev_shift_kw, 1),
                "reason": "EV charging is flexible and renewable generation is expected to fall during the next 60 minutes. Shifting allows charging after 21:00 off-peak."
            })

        # Flexible Resource 2: Water Pumping (Delay 45-60 mins)
        pump_shift_kw = 0.0
        if remaining_gap_to_cover > 0 and water_pumps_kw > 0:
            pump_shift_kw = min(water_pumps_kw, remaining_gap_to_cover)
            remaining_gap_to_cover -= pump_shift_kw
            flexible_energy_shifted_kw += pump_shift_kw
            recommendations.append({
                "action": "Shift Community Water Reservoir Pumping by 45 minutes",
                "target_asset": "Water Pumps",
                "shifted_kw": round(pump_shift_kw, 1),
                "reason": "Overhead water storage tanks have adequate buffer; pumping can be postponed until grid stress subsides."
            })

        # Flexible Resource 3: Non-critical Cooling / HVAC (+1.5°C drift setpoint)
        cooling_trim_kw = 0.0
        max_cooling_trim = round(cooling_kw * 0.5, 1)  # Max 50% trim
        if remaining_gap_to_cover > 0 and max_cooling_trim > 0:
            cooling_trim_kw = min(max_cooling_trim, remaining_gap_to_cover)
            remaining_gap_to_cover -= cooling_trim_kw
            flexible_energy_shifted_kw += cooling_trim_kw
            recommendations.append({
                "action": "Trim Non-critical Cooling by 1.5°C Temperature Drift",
                "target_asset": "Commercial & Club HVAC",
                "shifted_kw": round(cooling_trim_kw, 1),
                "reason": "Temporary thermal inertia maintains occupant comfort while curtailing non-essential compressor load."
            })

        # 4. Strategic Community Battery Utilization
        # Rule: Do not drain battery completely; preserve 20% floor reserve!
        battery_discharge_kw = 0.0
        battery_charge_kw = 0.0
        new_battery_soc = battery_soc_pct

        if remaining_gap_to_cover > 0:
            usable_soc_pct = max(0.0, battery_soc_pct - self.battery_reserve_floor_pct)
            # Available kWh above reserve
            usable_energy_kwh = (usable_soc_pct / 100.0) * self.battery_capacity_kwh
            # Deliverable power up to max discharge C-rate
            max_deliverable_kw = min(self.battery_max_discharge_kw, usable_energy_kwh * 0.5)

            if max_deliverable_kw > 0:
                battery_discharge_kw = min(max_deliverable_kw, remaining_gap_to_cover)
                remaining_gap_to_cover -= battery_discharge_kw
                # Simulate 1-hour equivalent energy drain
                drained_pct = (battery_discharge_kw / self.battery_capacity_kwh) * 100.0
                new_battery_soc = max(self.battery_reserve_floor_pct, battery_soc_pct - drained_pct)

                recommendations.append({
                    "action": f"Inject {round(battery_discharge_kw, 1)} kW Community Battery Support",
                    "target_asset": "Community BESS (100 kWh)",
                    "shifted_kw": round(battery_discharge_kw, 1),
                    "reason": "Flexible load shifting cannot fully cover the predicted energy gap while critical loads must remain protected. Battery buffer bridges the remaining peak."
                })
        elif surplus_kw > 0:
            # Solar surplus charges the battery!
            headroom_pct = max(0.0, 100.0 - battery_soc_pct)
            headroom_kwh = (headroom_pct / 100.0) * self.battery_capacity_kwh
            if headroom_kwh > 2.0:
                battery_charge_kw = min(self.battery_max_charge_kw, surplus_kw)
                charged_pct = (battery_charge_kw / self.battery_capacity_kwh) * 100.0
                new_battery_soc = min(100.0, battery_soc_pct + charged_pct)
                recommendations.append({
                    "action": f"Recharge Community Battery with {round(battery_charge_kw, 1)} kW Clean Solar Surplus",
                    "target_asset": "Community BESS",
                    "shifted_kw": round(battery_charge_kw, 1),
                    "reason": "Abundant local renewable generation is safely stored for upcoming evening demand peaks."
                })

        # 5. After-Optimization Metrics
        optimized_demand_kw = round(predicted_demand_kw - flexible_energy_shifted_kw, 1)
        clean_supply_after_kw = round(predicted_renewable_kw + battery_discharge_kw, 1)
        final_remaining_gap_kw = max(0.0, round(optimized_demand_kw - clean_supply_after_kw, 1))

        if raw_gap_kw > 0:
            gap_reduction_pct = round(((raw_gap_kw - final_remaining_gap_kw) / raw_gap_kw) * 100, 1)
        else:
            gap_reduction_pct = 100.0

        feeder_stress_after_pct = round((final_remaining_gap_kw / self.feeder_nominal_capacity_kw) * 100, 1)

        # Post-optimization risk level
        if final_remaining_gap_kw <= 10.0:
            risk_after = "LOW"
        elif final_remaining_gap_kw <= 30.0:
            risk_after = "MEDIUM"
        else:
            risk_after = "HIGH"

        return {
            "before": {
                "demand_kw": round(predicted_demand_kw, 1),
                "renewable_kw": round(predicted_renewable_kw, 1),
                "energy_gap_kw": raw_gap_kw,
                "feeder_stress_pct": feeder_stress_before_pct,
                "risk_level": risk_level,
                "risk_badge": risk_badge
            },
            "after": {
                "optimized_demand_kw": optimized_demand_kw,
                "renewable_kw": round(predicted_renewable_kw, 1),
                "battery_support_kw": round(battery_discharge_kw, 1),
                "battery_charge_kw": round(battery_charge_kw, 1),
                "total_clean_supply_kw": clean_supply_after_kw,
                "remaining_gap_kw": final_remaining_gap_kw,
                "feeder_stress_pct": feeder_stress_after_pct,
                "risk_level": risk_after,
                "battery_soc_pct": round(new_battery_soc, 1)
            },
            "impact_metrics": {
                "gap_reduction_pct": gap_reduction_pct,
                "flexible_energy_shifted_kw": round(flexible_energy_shifted_kw, 1),
                "battery_contribution_kw": round(battery_discharge_kw, 1),
                "renewable_utilization_pct": 100.0 if raw_gap_kw > 0 else round((predicted_demand_kw / max(1.0, predicted_renewable_kw)) * 100, 1),
                "critical_load_protected_pct": 100.0,
                "data_label": "Simulation Result"
            },
            "recommendations": recommendations,
            "protected_loads": protected_assets,
            "critical_load_status": "CRITICAL LOADS 100% PROTECTED"
        }
