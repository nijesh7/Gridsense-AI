import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Play, Radio, AlertTriangle, Sun, Moon, LogIn, UserCheck } from 'lucide-react';
import RoleSwitcher from './RoleSwitcher';
import { useEnergy } from '../context/EnergyContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { dashboardData, triggerDemo } = useEnergy();
  const { theme, toggleTheme, isDark } = useTheme();
  const { currentRole, user } = useAuth();

  const risk = dashboardData?.metrics?.gridRisk || "HIGH";
  const getRiskStyle = () => {
    switch (risk) {
      case "CRITICAL": return "bg-grid-rose/20 text-rose-700 dark:text-grid-rose border-grid-rose/40 animate-pulse";
      case "HIGH": return "bg-grid-rose/15 text-rose-700 dark:text-grid-rose border-grid-rose/30";
      case "MEDIUM": return "bg-solar-500/15 text-amber-700 dark:text-solar-400 border-solar-500/30";
      default: return "bg-grid-emerald/15 text-emerald-700 dark:text-grid-emerald border-grid-emerald/30";
    }
  };

  return (
    <header className="h-16 px-6 bg-white/90 dark:bg-dark-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 flex items-center justify-between sticky top-0 z-40 transition-colors">
      {/* Brand */}
      <Link to="/" className="flex items-center gap-3 group">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-grid-emerald to-grid-cyan p-0.5 shadow-glow-emerald group-hover:scale-105 transition-transform">
          <div className="w-full h-full bg-white dark:bg-dark-900 rounded-[10px] flex items-center justify-center text-grid-emerald">
            <Zap className="w-5 h-5 fill-current" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">
              GRID SENSE <span className="text-transparent bg-clip-text bg-gradient-to-r from-grid-emerald to-grid-cyan">AI</span>
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 font-semibold">
              v1.0
            </span>
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 tracking-wider font-semibold uppercase">
            Predict • Optimize • Balance
          </p>
        </div>
      </Link>

      {/* Sub-grid Feeder Telemetry Pill */}
      <div className="hidden lg:flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-dark-800/80 border border-slate-200 dark:border-white/10 text-xs">
        <div className="w-2.5 h-2.5 rounded-full bg-solar-500 animate-ping" />
        <span className="font-mono text-slate-700 dark:text-slate-300 font-semibold">FEEDER FDR-001 SUB-GRID</span>
        <span className="text-slate-400 dark:text-slate-600">|</span>
        <span className="font-mono text-slate-500 dark:text-slate-400">18:00 Peak Transition</span>
        <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${getRiskStyle()}`}>
          {risk} RISK
        </span>
      </div>

      {/* Actions: Theme Toggle, Start Demo, Login & Role Switcher */}
      <div className="flex items-center gap-2.5">
        {/* Full Dark Mode vs Pure White Mode Segmented Toggle */}
        <div className="flex items-center p-1 rounded-xl bg-slate-200/80 dark:bg-dark-800 border border-slate-300/80 dark:border-white/10 text-xs font-semibold shadow-inner">
          <button
            onClick={() => isDark && toggleTheme()}
            title="Switch to Pure White Mode"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              !isDark
                ? 'bg-white text-slate-900 shadow-sm font-bold border border-slate-200'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sun className={`w-3.5 h-3.5 ${!isDark ? 'text-amber-500 fill-amber-500' : 'text-slate-400'}`} />
            <span className="text-[11px]">Light</span>
          </button>

          <button
            onClick={() => !isDark && toggleTheme()}
            title="Switch to Full Dark Mode"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              isDark
                ? 'bg-dark-700 text-white shadow-sm font-bold border border-white/15'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Moon className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400 fill-cyan-400' : 'text-slate-400'}`} />
            <span className="text-[11px]">Dark</span>
          </button>
        </div>

        {/* Demo Button */}
        <button
          onClick={triggerDemo}
          className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-solar-500 to-amber-600 hover:from-solar-400 hover:to-amber-500 text-dark-900 font-heading font-extrabold text-xs shadow-glow-amber transition-all transform hover:-translate-y-0.5 cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>START DEMO</span>
        </button>

        {/* Role Switcher */}
        <RoleSwitcher />

        {/* Login Page Link */}
        <Link
          to="/login"
          title="Sign in or Switch User"
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all cursor-pointer"
        >
          <LogIn className="w-3.5 h-3.5 text-grid-emerald" />
          <span className="hidden md:inline">Sign In</span>
        </Link>
      </div>
    </header>
  );
}
