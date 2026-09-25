import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, DEFAULT_DEMO_USERS } from '../context/AuthContext';
import { 
  Zap, 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  User, 
  Sparkles, 
  Building2, 
  Radio, 
  Home,
  CheckCircle2,
  LogIn,
  UserPlus,
  Sun,
  MapPin,
  Cpu
} from 'lucide-react';

export default function LoginPage() {
  const { createAccount, signIn, loginWithRole } = useAuth();
  const navigate = useNavigate();

  // Mode: 'signin' | 'signup'
  const [mode, setMode] = useState('signin');

  // Sign In Form States
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // Create Account Form States
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpRole, setSignUpRole] = useState('USER');
  const [houseNumber, setHouseNumber] = useState('Home #42');
  const [solarCapacity, setSolarCapacity] = useState('5.0 kWp');
  const [feederId, setFeederId] = useState('FDR-001 Substation');
  const [subdivision, setSubdivision] = useState('Green Valley Eco-Community');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle Create Account Submit
  const handleCreateAccount = (e) => {
    e.preventDefault();
    setError('');

    if (!signUpName.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!signUpEmail.trim()) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const destination = createAccount({
        name: signUpName.trim(),
        email: signUpEmail.trim(),
        password: signUpPassword,
        role: signUpRole,
        houseNumber,
        solarCapacity,
        feederId,
        subdivision
      });

      navigate(destination);
    } catch (err) {
      setError(err.message || 'Failed to create account');
      setLoading(false);
    }
  };

  // Handle Standard Sign In Submit
  const handleSignIn = (e) => {
    e.preventDefault();
    setError('');

    if (!signInEmail.trim()) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      const destination = signIn(signInEmail, signInPassword);
      navigate(destination);
    } catch (err) {
      setError(err.message || 'Failed to sign in');
      setLoading(false);
    }
  };

  // Fast 1-Click Role Login
  const handleQuickRole = (roleKey) => {
    const demo = DEFAULT_DEMO_USERS[roleKey];
    const destination = loginWithRole(roleKey, demo.name);
    navigate(destination);
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center p-4 max-w-4xl mx-auto">
      {/* Brand Header */}
      <div className="text-center space-y-3 mb-6">
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

        {/* Mode Selector Tabs (Sign In vs Create Account) */}
        <div className="inline-flex rounded-xl p-1 bg-slate-200/80 dark:bg-dark-800 border border-slate-300 dark:border-white/10 text-xs font-semibold shadow-inner mt-2">
          <button
            onClick={() => { setMode('signin'); setError(''); }}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-lg transition-all cursor-pointer ${
              mode === 'signin'
                ? 'bg-white text-slate-900 dark:bg-white/20 dark:text-white shadow font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>

          <button
            onClick={() => { setMode('signup'); setError(''); }}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-lg transition-all cursor-pointer ${
              mode === 'signup'
                ? 'bg-white text-slate-900 dark:bg-white/20 dark:text-white shadow font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5 text-grid-emerald" />
            <span>Create Account</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-grid-rose/10 border border-rose-200 dark:border-grid-rose/30 text-rose-700 dark:text-grid-rose text-xs max-w-md w-full text-center">
          {error}
        </div>
      )}

      {/* ========================================================
          1. SIGN IN VIEW
         ======================================================== */}
      {mode === 'signin' && (
        <div className="w-full max-w-md space-y-6 animate-in fade-in">
          <div className="glass-card p-8 border border-slate-200 dark:border-white/10 shadow-xl rounded-2xl space-y-5">
            <div className="text-center space-y-1">
              <h2 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white">
                Welcome Back
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Sign in with your email address or use fast demo access below
              </p>
            </div>

            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs outline-none focus:border-grid-emerald transition-colors"
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
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs outline-none focus:border-grid-emerald transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-grid-emerald to-grid-cyan hover:opacity-95 text-dark-900 font-heading font-extrabold text-xs shadow-glow-emerald transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In to Dashboard</span>
              </button>
            </form>

            {/* Quick Demo 1-Click Role Login */}
            <div className="pt-4 border-t border-slate-200 dark:border-white/10 space-y-2.5">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-bold uppercase tracking-wider">Fast Demo Sign In:</span>
                <span className="text-grid-cyan font-mono">1-Click Access</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickRole('USER')}
                  className="p-2.5 rounded-xl border border-indigo-200 dark:border-indigo-500/20 bg-indigo-50/70 dark:bg-indigo-500/10 text-left hover:scale-[1.02] transition-transform cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold text-xs mb-0.5">
                    <Home className="w-3.5 h-3.5" />
                    <span>Citizen Home</span>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">Vikram (Home #42)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickRole('DISCOM_OPERATOR')}
                  className="p-2.5 rounded-xl border border-cyan-200 dark:border-cyan-500/20 bg-cyan-50/70 dark:bg-cyan-500/10 text-left hover:scale-[1.02] transition-transform cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 font-bold text-xs mb-0.5">
                    <Radio className="w-3.5 h-3.5" />
                    <span>DISCOM Operator</span>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">R. Sharma (Feeder)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickRole('COMMUNITY_MANAGER')}
                  className="p-2.5 rounded-xl border border-amber-200 dark:border-amber-500/20 bg-amber-50/70 dark:bg-amber-500/10 text-left hover:scale-[1.02] transition-transform cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold text-xs mb-0.5">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Microgrid Lead</span>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">Ananya (100 Homes)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickRole('ADMIN')}
                  className="p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50/70 dark:bg-emerald-500/10 text-left hover:scale-[1.02] transition-transform cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-xs mb-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Administrator</span>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">Full System View</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Switch Link to Create Account */}
          <div className="text-center p-4 rounded-xl bg-slate-100 dark:bg-dark-800/60 border border-slate-200 dark:border-white/5 text-xs text-slate-600 dark:text-slate-400">
            <span>Don't have an account? </span>
            <button
              type="button"
              onClick={() => { setMode('signup'); setError(''); }}
              className="font-bold text-emerald-600 dark:text-grid-emerald hover:underline cursor-pointer ml-1"
            >
              Create an Account here ➔
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          2. CREATE ACCOUNT VIEW (ALL NECESSARY DETAILS)
         ======================================================== */}
      {mode === 'signup' && (
        <div className="w-full max-w-xl space-y-6 animate-in fade-in">
          <div className="glass-card p-8 border border-slate-200 dark:border-white/10 shadow-xl rounded-2xl space-y-5">
            <div className="text-center space-y-1">
              <h2 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">
                Create Your Account
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Register with your details to personalize your smart energy dashboard
              </p>
            </div>

            <form onSubmit={handleCreateAccount} className="space-y-4">
              {/* 1. Full Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-emerald-600 dark:text-grid-emerald absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    placeholder="e.g. Ramakrishna S, Priya Sharma..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-dark-900 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs outline-none focus:border-grid-emerald focus:ring-1 focus:ring-grid-emerald transition-colors font-medium"
                  />
                </div>
                <p className="text-[10px] text-emerald-600 dark:text-grid-emerald font-medium">
                  ✨ This name will appear on your Home Dashboard and navigation bar!
                </p>
              </div>

              {/* 2. Email Address */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    placeholder="yourname@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs outline-none focus:border-grid-emerald transition-colors"
                  />
                </div>
              </div>

              {/* 3. Password */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    placeholder="Create a secure password"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs outline-none focus:border-grid-emerald transition-colors"
                  />
                </div>
              </div>

              {/* 4. Select Account Role */}
              <div className="space-y-2 pt-1">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  Select Your Account Role <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'USER', label: 'Citizen Prosumer', icon: Home, desc: 'Home Rooftop Solar & EV' },
                    { id: 'COMMUNITY_MANAGER', label: 'Community Lead', icon: Building2, desc: '100-Home Microgrid Lead' },
                    { id: 'DISCOM_OPERATOR', label: 'DISCOM Operator', icon: Radio, desc: 'Feeder Grid Control' },
                    { id: 'ADMIN', label: 'Administrator', icon: ShieldCheck, desc: 'Full Platform Access' },
                  ].map((r) => {
                    const RoleIcon = r.icon;
                    const isSelected = signUpRole === r.id;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setSignUpRole(r.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-grid-emerald/15 border-grid-emerald text-emerald-800 dark:text-grid-emerald font-bold shadow-sm'
                            : 'bg-slate-50 dark:bg-dark-900/60 border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <RoleIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-600 dark:text-grid-emerald' : 'text-slate-400'}`} />
                          <span className="text-xs font-bold">{r.label}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block">{r.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 5. Role-Specific Details Section */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-dark-900/80 border border-slate-200 dark:border-white/10 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-solar-500" />
                  Role Configuration Details
                </span>

                {signUpRole === 'USER' && (
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400">
                        House / Flat Number
                      </label>
                      <input
                        type="text"
                        value={houseNumber}
                        onChange={(e) => setHouseNumber(e.target.value)}
                        placeholder="e.g. Home #42, Villa 7"
                        className="w-full px-3 py-2 rounded-lg bg-white dark:bg-dark-800 border border-slate-200 dark:border-white/10 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400">
                        Rooftop Solar PV Size
                      </label>
                      <input
                        type="text"
                        value={solarCapacity}
                        onChange={(e) => setSolarCapacity(e.target.value)}
                        placeholder="e.g. 5.0 kWp"
                        className="w-full px-3 py-2 rounded-lg bg-white dark:bg-dark-800 border border-slate-200 dark:border-white/10 text-xs"
                      />
                    </div>
                  </div>
                )}

                {signUpRole === 'DISCOM_OPERATOR' && (
                  <div className="space-y-1 text-xs">
                    <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400">
                      Feeder Substation Assignment
                    </label>
                    <input
                      type="text"
                      value={feederId}
                      onChange={(e) => setFeederId(e.target.value)}
                      placeholder="e.g. FDR-001 Substation North"
                      className="w-full px-3 py-2 rounded-lg bg-white dark:bg-dark-800 border border-slate-200 dark:border-white/10 text-xs"
                    />
                  </div>
                )}

                {(signUpRole === 'COMMUNITY_MANAGER' || signUpRole === 'ADMIN') && (
                  <div className="space-y-1 text-xs">
                    <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400">
                      Subdivision / Microgrid Name
                    </label>
                    <input
                      type="text"
                      value={subdivision}
                      onChange={(e) => setSubdivision(e.target.value)}
                      placeholder="e.g. Green Valley Eco-Community"
                      className="w-full px-3 py-2 rounded-lg bg-white dark:bg-dark-800 border border-slate-200 dark:border-white/10 text-xs"
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-grid-emerald to-grid-cyan hover:opacity-95 text-dark-900 font-heading font-extrabold text-sm shadow-glow-emerald transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Create Account & Launch Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Bottom Switch Link to Sign In */}
          <div className="text-center p-4 rounded-xl bg-slate-100 dark:bg-dark-800/60 border border-slate-200 dark:border-white/5 text-xs text-slate-600 dark:text-slate-400">
            <span>Already have an account? </span>
            <button
              type="button"
              onClick={() => { setMode('signin'); setError(''); }}
              className="font-bold text-emerald-600 dark:text-grid-emerald hover:underline cursor-pointer ml-1"
            >
              Sign In here ➔
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
