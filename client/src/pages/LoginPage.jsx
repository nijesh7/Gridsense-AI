import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Zap, ShieldCheck, Lock, Mail, ArrowRight, UserCheck, Sparkles, Building2, Radio, Home } from 'lucide-react';

export default function LoginPage() {
  const { switchRole, loginWithFirebase } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const quickRoles = [
    {
      role: "ADMIN",
      title: "Administrator",
      desc: "Full telemetry, models, & configuration",
      email: "admin@gridsense.ai",
      icon: ShieldCheck,
      color: "text-grid-emerald",
      bg: "bg-grid-emerald/10 border-grid-emerald/30",
    },
    {
      role: "DISCOM_OPERATOR",
      title: "DISCOM Operator",
      desc: "Feeder telemetry & DR dispatch",
      email: "operator@discom.gov.in",
      icon: Radio,
      color: "text-grid-cyan",
      bg: "bg-grid-cyan/10 border-grid-cyan/30",
    },
    {
      role: "COMMUNITY_MANAGER",
      title: "Community Manager",
      desc: "100-home microgrid & battery storage",
      email: "manager@greenvalley.org",
      icon: Building2,
      color: "text-solar-400",
      bg: "bg-solar-500/10 border-solar-500/30",
    },
    {
      role: "USER",
      title: "Prosumer Citizen",
      desc: "Home #42 personal EV & bill rebates",
      email: "resident@greenvalley.org",
      icon: Home,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10 border-indigo-500/30",
    }
  ];

  const handleCustomLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Map email to role or fallback
      let targetRole = "ADMIN";
      if (email.includes("operator") || email.includes("discom")) targetRole = "DISCOM_OPERATOR";
      else if (email.includes("manager") || email.includes("community")) targetRole = "COMMUNITY_MANAGER";
      else if (email.includes("resident") || email.includes("user")) targetRole = "USER";

      switchRole(targetRole);
      navigate(targetRole === "USER" ? "/my-home" : "/");
    } catch (err) {
      setError(err.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickRole = (role) => {
    switchRole(role);
    navigate(role === "USER" ? "/my-home" : "/");
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full glass-card p-8 border-white/10 shadow-2xl relative overflow-hidden space-y-6">
        {/* Glow Ambient Top Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-grid-emerald via-grid-cyan to-solar-500" />

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-grid-emerald to-grid-cyan p-0.5 shadow-glow-emerald">
            <div className="w-full h-full bg-dark-900 rounded-[14px] flex items-center justify-center text-grid-emerald">
              <Zap className="w-6 h-6 fill-current" />
            </div>
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">
            GRID SENSE <span className="text-transparent bg-clip-text bg-gradient-to-r from-grid-emerald to-grid-cyan">AI</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sign in to access your role-based neighbourhood energy portal
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-grid-rose/10 border border-grid-rose/30 text-grid-rose text-xs">
            {error}
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleCustomLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@gridsense.ai"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-dark-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs outline-none focus:border-grid-emerald transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-dark-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs outline-none focus:border-grid-emerald transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-grid-emerald to-grid-cyan hover:opacity-95 text-dark-900 font-heading font-extrabold text-xs shadow-glow-emerald transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Sign In to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* One-Click Quick Role Switcher for Fast Judge Demo */}
        <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-white/10">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="font-bold uppercase tracking-wider">Fast Demo Access</span>
            <span className="text-grid-cyan font-mono">1-Click Role Switch</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {quickRoles.map(qr => {
              const Icon = qr.icon;
              return (
                <button
                  key={qr.role}
                  type="button"
                  onClick={() => handleQuickRole(qr.role)}
                  className={`p-2.5 rounded-xl border text-left transition-all hover:scale-[1.02] cursor-pointer ${qr.bg}`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon className={`w-3.5 h-3.5 ${qr.color}`} />
                    <span className="font-heading font-bold text-xs text-slate-900 dark:text-white">
                      {qr.title}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                    {qr.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
