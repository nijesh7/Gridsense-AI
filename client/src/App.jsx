import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { EnergyProvider } from './context/EnergyContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DemoModal from './components/DemoModal';
import AICopilotWidget from './components/AICopilotWidget';

import DashboardPage from './pages/DashboardPage';
import ForecastPage from './pages/ForecastPage';
import FlexibilityPage from './pages/FlexibilityPage';
import BatteryPage from './pages/BatteryPage';
import NeighbourhoodsPage from './pages/NeighbourhoodsPage';
import MapPage from './pages/MapPage';
import SimulatorPage from './pages/SimulatorPage';
import DiscomPage from './pages/DiscomPage';
import AlertsPage from './pages/AlertsPage';
import AssumptionsPage from './pages/AssumptionsPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import UserHomePortal from './pages/UserHomePortal';

function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-900 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Top Navigation */}
      <Navbar />

      {/* Layout Body with Sidebar + Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />

        <main className="flex-1 p-4 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/my-home" element={<UserHomePortal />} />
            <Route path="/forecast" element={<ForecastPage />} />
            <Route path="/flexibility" element={<FlexibilityPage />} />
            <Route path="/battery" element={<BatteryPage />} />
            <Route path="/neighbourhoods" element={<NeighbourhoodsPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/simulator" element={<SimulatorPage />} />
            <Route path="/discom" element={<DiscomPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/assumptions" element={<AssumptionsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      {/* Interactive Demo Walkthrough Modal */}
      <DemoModal />

      {/* Smart AI Energy Copilot Assistant */}
      <AICopilotWidget />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <EnergyProvider>
          <BrowserRouter>
            <AppLayout />
          </BrowserRouter>
        </EnergyProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
