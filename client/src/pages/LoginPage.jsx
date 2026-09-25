import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Zap, 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  UserCheck, 
  Sparkles, 
  Building2, 
  Radio, 
  Home,
  CheckCircle2,
  LogIn
} from 'lucide-react';

export default function LoginPage() {
  const { loginWithRole, switchRole } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('roles'); // 'roles' | 'credentials'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingRole, setLoadingRole] = useState(null);
  const [error, setError] = useState('');

  const rolesList = [
    {
      role: "USER",
      title: "Prosumer Citizen",
      subtitle: "Vikram Mehta (Home #42)",
      desc: "Monitor your rooftop solar, schedule smart EV charging, earn ₹180 delay rebates, and view 100% protected essential appliances.",
      badge: "Citizen Home Portal",
      destination: "/my-home",
      icon: Home,
      color: "text-indigo-600 dark:text-indigo-400",
      accentBg: "bg-indigo-50 dark:bg-indigo-500/10",
      border: "border-indigo-200 hover:border-indigo-500 dark:border-indigo-500/30 dark:hover:border-indigo-500/80",
      btnClass: "bg-indigo-600 hover:bg-indigo-700 text-white"
    },
    {
      role: "DISCOM_OPERATOR",
      title: "DISCOM Feeder Operator",
      subtitle: "R. Sharma (Feeder Officer)",
      desc: "Substation feeder telemetry (FDR-001 to FDR-004), grid map, overload alarms, and 1-click automated Demand Response dispatch.",
      badge: "Substation Control",
      destination: "/discom",
      icon: Radio,
      color: "text-cyan-600 dark:text-grid-cyan",
      accentBg: "bg-cyan-50 dark:bg-grid-cyan/10",
      border: "border-cyan-200 hover:border-cyan-500 dark:border-grid-cyan/30 dark:hover:border-grid-cyan/80",
      btnClass: "bg-cyan-600 hover:bg-cyan-700 text-white"
    },
    {
      role: "COMMUNITY_MANAGER",
      title: "Community Energy Lead",
      subtitle: "Ananya Patel (Green Valley)",
      desc: "Coordinate 100-home aggregate microgrid, manage the 100 kWh community battery floor reserve, and run What-If stress tests.",
      badge: "Microgrid Management",
      destination: "/",
      icon: Building2,
      color: "text-amber-600 dark:text-solar-400",
      accentBg: "bg-amber-50 dark:bg-solar-500/10",
      border: "border-amber-200 hover:border-amber-500 dark:border-solar-500/30 dark:hover:border-solar-500/80",
      btnClass: "bg-amber-600 hover:bg-amber-700 text-white"
    },
    {
      role: "ADMIN",
      title: "System Administrator",
      subtitle: "Full Platform Controller",
      desc: "Complete administrative access to all 12 platform tabs, GBDT machine learning multi-horizon model weights, and live data telemetry.",
      badge: "Full System Controller",
      destination: "/",
      icon: ShieldCheck,
      color: "text-emerald-600 dark:text-grid-emerald",
      accentBg: "bg-emerald-50 dark:bg-grid-emerald/10",
      border: "border-emerald-200 hover:border-emerald-500 dark:border-grid-emerald/30 dark:hover:border-grid-emerald/80",
      btnClass: "bg-emerald-600 hover:bg-emerald-700 text-white"
    }
  ];

  // 1-Click Role Login Handler
  const handleRoleLogin = (roleItem) => {
    setLoadingRole(roleItem.role);
    try {
      const destination = loginWithRole(roleItem.role);
      navigate(destination || roleItem.destination);
    } catch (err) {
      setError("Failed to sign in as " + roleItem.title);
      setLoadingRole(null);
    }
  };

  // Credentials Login Handler
  const handleCredentialsSubmit = (e) => {
    e.preventDefault();
    setError('');

    let targetRole = "ADMIN";
    if (email.toLowerCase().includes("citizen") || email.toLowerCase().includes("resident") || email.toLowerCase().includes("user") || email.toLowerCase().includes("home")) {
      targetRole = "USER";
    } else if (email.toLowerCase().includes("operator") || email.toLowerCase().includes("discom")) {
      targetRole = "DISCOM_OPERATOR";
    } else if (email.toLowerCase().includes("manager") || email.toLowerCase().includes("community")) {
      targetRole = "COMMUNITY_MANAGER";
    }

    const destination = loginWithRole(targetRole);
    navigate(destination);
  };

  return (
    <div className="min-h-[82vh] flex flex-col items-center justify-center p-4 max-w-5xl mx-auto">
      {/* Brand Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-grid-emerald to-grid-cyan p-0.5 shadow-glow-emerald">
          <div className="w-full h-full bg-white dark:bg-dark-900 rounded-[14px] flex items-center justify-center text-grid-emerald">
            <Zap className="w-7 h-7 fill-current" />
          </div>
        </div>

        <div>
          <h1 className="font-heading font-extrabold text-3xl text-slate-900 dark:text-white tracking-tight">
            GRID SENSE <span className="text-transparent bg-clip-text bg-gradient-to-r from-grid-emerald to-grid-cyan">AI</span>
          </h1>
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mt-1">
            Neighbourhood-Level Smart Energy Coordination Platform
          </p>
        </div>

        {/* View Selection Tabs */}
        <div className="inline-flex rounded-xl p-1 bg-slate-200/80 dark:bg-dark-800 border border-slate-300 dark:border-white/10 text-xs font-semibold shadow-inner mt-2">
          <button
            onClick={() => setActiveTab('roles')}
            className={`px-4 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'roles'
                ? 'bg-white text-slate-900 dark:bg-white/20 dark:text-white shadow font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            ⚡ 1-Click Role Login (Instant Access)
          </button>
          <button
            onClick={() => setActiveTab('credentials')}
            className={`px-4 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'credentials'
                ? 'bg-white text-slate-900 dark:bg-white/20 dark:text-white shadow font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            🔑 Email & Password
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-grid-rose/10 border border-rose-200 dark:border-grid-rose/30 text-rose-700 dark:text-grid-rose text-xs max-w-md w-full text-center">
          {error}
        </div>
      )}

      {/* TAB 1: 1-Click Role Cards */}
      {activeTab === 'roles' && (
        <div className="w-full space-y-4 animate-in fade-in">
          <div className="text-center mb-2">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
              Click any role below to immediately sign in and launch that role's custom portal
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rolesList.map((item) => {
              const Icon = item.icon;
              const isLoading = loadingRole === item.role;

              return (
                <div
                  key={item.role}
                  onClick={() => handleRoleLogin(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleRoleLogin(item)}
                  className={`glass-card p-6 border-2 rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-xl cursor-pointer flex flex-col justify-between space-y-4 group ${item.border} ${item.accentBg}`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl bg-white dark:bg-dark-900 shadow-sm ${item.color}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h2 className="font-heading font-extrabold text-base text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-grid-emerald transition-colors">
                            {item.title}
                          </h2>
                          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-white dark:bg-dark-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 shadow-sm">
                        {item.badge}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      Destination: <strong className="text-slate-800 dark:text-white">{item.destination}</strong>
                    </span>

                    <button
                      type="button"
                      disabled={isLoading}
                      className={`px-4 py-2 rounded-xl text-xs font-heading font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer ${item.btnClass}`}
                    >
                      {isLoading ? (
                        <span>Logging in...</span>
                      ) : (
                        <>
                          <span>Login as {item.title.split(' ')[0]}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: Custom Credentials Form */}
      {activeTab === 'credentials' && (
        <div className="max-w-md w-full glass-card p-8 border border-slate-200 dark:border-white/10 shadow-2xl relative overflow-hidden space-y-6 animate-in fade-in">
          <div className="text-center space-y-1">
            <h2 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white">
              Standard Sign In
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Enter your credentials or demo email address
            </p>
          </div>

          <form onSubmit={handleCredentialsSubmit} className="space-y-4">
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
                  placeholder="resident@gridsense.ai or operator@discom.gov.in"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs outline-none focus:border-grid-emerald transition-colors"
                />
              </div>
              <p className="text-[10px] text-slate-400">
                Tip: Typing "resident" or "citizen" logs you into Home #42!
              </p>
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
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs outline-none focus:border-grid-emerald transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-grid-emerald to-grid-cyan hover:opacity-95 text-dark-900 font-heading font-extrabold text-xs shadow-glow-emerald transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In to Portal</span>
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              onClick={() => setActiveTab('roles')}
              className="text-xs text-grid-cyan hover:underline font-semibold cursor-pointer"
            >
              ← Back to 1-Click Role Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
