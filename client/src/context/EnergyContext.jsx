import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { subscribeToNeighbourhoodLive, subscribeToAlertsLive } from '../services/firebase';

const EnergyContext = createContext(null);

export function EnergyProvider({ children }) {
  const [selectedNeighbourhood, setSelectedNeighbourhood] = useState("area_a");
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);
  const [demoState, setDemoState] = useState({
    isActive: false,
    currentStepIndex: 0,
    steps: [],
    scenarioResult: null,
  });

  // Fetch initial telemetry
  const refreshData = async () => {
    try {
      setLoading(true);
      const res = await api.getDashboard(selectedNeighbourhood);
      if (res && res.data) {
        setDashboardData(res.data);
      }
      const altRes = await api.getAlerts();
      if (altRes && altRes.data) {
        setAlerts(altRes.data);
      }
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();

    // Subscribe to live Firestore updates if configured
    const unsubNeighbourhood = subscribeToNeighbourhoodLive(selectedNeighbourhood, (liveData) => {
      setDashboardData(prev => prev ? {
        ...prev,
        metrics: {
          ...prev.metrics,
          renewableGeneration: liveData.currentRenewable ?? prev.metrics.renewableGeneration,
          electricityDemand: liveData.currentDemand ?? prev.metrics.electricityDemand,
          energyGap: liveData.gap ?? prev.metrics.energyGap,
          batterySOC: liveData.batterySOC ?? prev.metrics.batterySOC,
        }
      } : prev);
    });

    const unsubAlerts = subscribeToAlertsLive((liveAlerts) => {
      if (liveAlerts.length > 0) setAlerts(liveAlerts);
    });

    return () => {
      if (unsubNeighbourhood) unsubNeighbourhood();
      if (unsubAlerts) unsubAlerts();
    };
  }, [selectedNeighbourhood]);

  // Demo Mode Sequencer
  const triggerDemo = async () => {
    try {
      const demoRes = await api.startDemo();
      const steps = demoRes?.demoScenario?.timeline || [];
      const scenarioResult = demoRes?.demoScenario?.optimizationResult || null;

      setDemoState({
        isActive: true,
        currentStepIndex: 0,
        steps: steps,
        scenarioResult: scenarioResult,
      });

      // Update dashboard values to reflect the demo sequence peak at 18:30
      if (dashboardData) {
        setDashboardData(prev => ({
          ...prev,
          metrics: {
            renewableGeneration: 45.0,
            electricityDemand: 120.0,
            energyGap: 75.0,
            batterySOC: 68,
            flexibleLoadAvailable: 33.0,
            gridRisk: "HIGH",
            feederStress: 125
          }
        }));
      }
    } catch (err) {
      console.error("Demo failed to start:", err);
    }
  };

  const nextDemoStep = () => {
    setDemoState(prev => {
      const nextIdx = prev.currentStepIndex + 1;
      if (nextIdx >= prev.steps.length) {
        return { ...prev, isActive: false, currentStepIndex: 0 };
      }
      return { ...prev, currentStepIndex: nextIdx };
    });
  };

  const closeDemo = () => {
    setDemoState({ isActive: false, currentStepIndex: 0, steps: [], scenarioResult: null });
    refreshData();
  };

  return (
    <EnergyContext.Provider
      value={{
        selectedNeighbourhood,
        setSelectedNeighbourhood,
        dashboardData,
        setDashboardData,
        loading,
        refreshData,
        alerts,
        demoState,
        triggerDemo,
        nextDemoStep,
        closeDemo,
      }}
    >
      {children}
    </EnergyContext.Provider>
  );
}

export const useEnergy = () => useContext(EnergyContext);
