import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserCheck, ChevronDown, Shield } from 'lucide-react';

export default function RoleSwitcher() {
  const { user, currentRole, switchRole, allRoles } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const roleLabels = {
    ADMIN: "Administrator (Full Access)",
    DISCOM_OPERATOR: "DISCOM Operator (Grid Control)",
    COMMUNITY_MANAGER: "Community Manager (Microgrid)",
    USER: "Prosumer Citizen (Personal Home)",
  };

  const handleRoleSelect = (role) => {
    switchRole(role);
    setOpen(false);
    if (role === 'USER') {
      navigate('/my-home');
    } else if (role === 'DISCOM_OPERATOR') {
      navigate('/discom');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-dark-800 dark:hover:bg-dark-700 border border-slate-200 dark:border-white/10 hover:border-grid-cyan/40 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
      >
        <Shield className="w-3.5 h-3.5 text-grid-cyan" />
        <span className="font-mono text-cyan-700 dark:text-grid-cyan font-bold">{currentRole}</span>
        <ChevronDown className="w-3 h-3 text-slate-400" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white dark:bg-dark-800 border border-slate-200 dark:border-white/10 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 mb-1 border-b border-slate-100 dark:border-white/5">
            Switch Perspective Role
          </div>
          {allRoles.map(role => (
            <button
              key={role}
              onClick={() => handleRoleSelect(role)}
              className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                currentRole === role
                  ? 'bg-grid-cyan/15 text-cyan-700 dark:text-grid-cyan font-bold'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              <span>{roleLabels[role]}</span>
              {currentRole === role && <UserCheck className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
