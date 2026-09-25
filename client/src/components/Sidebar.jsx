import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  Zap,
  Battery,
  Building2,
  Map,
  Sliders,
  Radio,
  Bell,
  SlidersHorizontal,
  FileSpreadsheet,
  Home,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useEnergy } from '../context/EnergyContext';

export default function Sidebar() {
  const { currentRole, user } = useAuth();
  const { alerts } = useEnergy();

  // All available navigation items with allowed roles
  const allNavItems = [
    { 
      to: "/my-home", 
      label: "My Home Portal", 
      icon: Home, 
      roles: ["USER", "ADMIN"],
      highlight: true
    },
    { 
      to: "/", 
      label: "Microgrid Dashboard", 
      icon: LayoutDashboard, 
      roles: ["ADMIN", "COMMUNITY_MANAGER", "DISCOM_OPERATOR", "USER"] 
    },
    { 
      to: "/forecast", 
      label: "Solar & Load Forecast", 
      icon: TrendingUp, 
      roles: ["ADMIN", "COMMUNITY_MANAGER"] 
    },
    { 
      to: "/flexibility", 
      label: "AI Flexibility Plan", 
      icon: Zap, 
      roles: ["ADMIN", "COMMUNITY_MANAGER"] 
    },
    { 
      to: "/battery", 
      label: "Community Battery", 
      icon: Battery, 
      roles: ["ADMIN", "COMMUNITY_MANAGER"] 
    },
    { 
      to: "/discom", 
      label: "DISCOM Feeder Command", 
      icon: Radio, 
      roles: ["ADMIN", "DISCOM_OPERATOR"],
      highlight: true
    },
    { 
      to: "/neighbourhoods", 
      label: "Neighbourhood Feeders", 
      icon: Building2, 
      roles: ["ADMIN", "DISCOM_OPERATOR"] 
    },
    { 
      to: "/map", 
      label: "Grid Substation Map", 
      icon: Map, 
      roles: ["ADMIN", "DISCOM_OPERATOR"] 
    },
    { 
      to: "/simulator", 
      label: "What-If Simulator ⭐", 
      icon: Sliders, 
      roles: ["ADMIN", "COMMUNITY_MANAGER"],
      highlight: true 
    },
    { 
      to: "/alerts", 
      label: "System Alerts", 
      icon: Bell, 
      roles: ["ADMIN", "COMMUNITY_MANAGER", "DISCOM_OPERATOR", "USER"],
      badgeCount: alerts.length 
    },
    { 
      to: "/assumptions", 
      label: "Unit Economics", 
      icon: FileSpreadsheet, 
      roles: ["ADMIN", "COMMUNITY_MANAGER"] 
    },
    { 
      to: "/settings", 
      label: "Flexibility Settings", 
      icon: SlidersHorizontal, 
      roles: ["ADMIN", "USER"] 
    },
  ];

  // Filter items matching the active role
  const filteredNavItems = allNavItems.filter(item => 
    !item.roles || item.roles.includes(currentRole)
  );

  const getRoleBadge = () => {
    switch (currentRole) {
      case "ADMIN":
        return { label: "System Administrator", color: "text-grid-emerald", bg: "bg-grid-emerald/10 border-grid-emerald/30" };
      case "DISCOM_OPERATOR":
        return { label: "DISCOM Feeder Operator", color: "text-grid-cyan", bg: "bg-grid-cyan/10 border-grid-cyan/30" };
      case "COMMUNITY_MANAGER":
        return { label: "Community Manager", color: "text-solar-400", bg: "bg-solar-500/10 border-solar-500/30" };
      case "USER":
        return { label: "Citizen Prosumer", color: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/30" };
      default:
        return { label: currentRole, color: "text-white", bg: "bg-white/10 border-white/20" };
    }
  };

  const roleBadge = getRoleBadge();

  return (
    <aside className="w-64 min-h-[calc(100vh-4rem)] bg-white dark:bg-dark-900/80 border-r border-slate-200 dark:border-white/10 p-4 flex flex-col justify-between transition-colors">
      <div className="space-y-1">
        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {currentRole === 'USER' ? 'My Portal' : 'Navigation'}
          </span>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10">
            {filteredNavItems.length} Tabs
          </span>
        </div>

        {filteredNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `
                flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200
                ${isActive
                  ? 'bg-grid-emerald/15 text-emerald-700 dark:text-grid-emerald border border-grid-emerald/30 shadow-glow-emerald font-bold'
                  : item.highlight
                    ? 'text-solar-600 dark:text-solar-400 hover:bg-solar-500/10 border border-solar-500/20'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                }
              `}
            >
              <div className="flex items-center gap-2.5">
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </div>

              {item.badgeCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-grid-rose text-white text-[10px] flex items-center justify-center font-bold">
                  {item.badgeCount}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Role Footer Status Card */}
      <div className={`p-3.5 rounded-xl border text-xs transition-colors ${roleBadge.bg}`}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">
            Active Role
          </span>
          <UserCheck className={`w-3.5 h-3.5 ${roleBadge.color}`} />
        </div>
        <div className={`font-heading font-bold text-xs ${roleBadge.color}`}>
          {roleBadge.label}
        </div>
        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
          {user?.name || "Logged in"}
        </p>
      </div>
    </aside>
  );
}
