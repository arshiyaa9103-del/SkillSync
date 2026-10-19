import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DEMO_CREDENTIALS } from '../services/authService';
import Button from '../components/common/Button';
import { LogIn, Sparkles, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Mail, Lock } from 'lucide-react';

const LoginPage = () => {
  const { login, authState } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const returnUrl = searchParams.get('returnUrl') || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If already logged in, redirect
  React.useEffect(() => {
    if (authState.isAuthenticated) {
      navigate(returnUrl, { replace: true });
    }
  }, [authState.isAuthenticated, navigate, returnUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      navigate(returnUrl, { replace: true });
    } else {
      setError(result.error || 'Invalid email or password.');
    }
  };

  const handleFillDemo = () => {
    setEmail(DEMO_CREDENTIALS.email);
    setPassword(DEMO_CREDENTIALS.password);
    setError('');
  };

  const handleQuickDemoLogin = async () => {
    setError('');
    setLoading(true);
    const result = await login(DEMO_CREDENTIALS.email, DEMO_CREDENTIALS.password);
    setLoading(false);
    if (result.success) {
      navigate(returnUrl, { replace: true });
    } else {
      setError(result.error || 'Failed to authenticate demo user.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#2563EB] to-[#06B6D4] text-white shadow-md mb-2">
            <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="7" cy="12" r="3" fill="white" fillOpacity="0.3" />
              <circle cx="17" cy="12" r="3" fill="white" fillOpacity="0.9" />
              <path d="M10 12h4" strokeWidth="2.5" />
              <circle cx="12" cy="7" r="1.5" fill="#84CC16" stroke="none" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Welcome back to SkillSync
          </h1>
          <p className="text-sm text-[#475569] leading-relaxed">
            Sign in to find teammates, join teams, and build better hackathon projects.
          </p>
        </div>

        {/* Demo Credentials Box */}
        <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#2563EB]" />
              Presentation Demo Account
            </span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-xs font-bold text-[#2563EB] hover:underline"
            >
              Fill Credentials
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono bg-white p-2.5 rounded-xl border border-blue-100">
            <div>
              <span className="text-[#64748B] block text-[10px] font-sans">EMAIL</span>
              <span className="font-bold text-[#0F172A]">AARAVMEHTA@GMAIL.COM</span>
            </div>
            <div>
              <span className="text-[#64748B] block text-[10px] font-sans">PASSWORD</span>
              <span className="font-bold text-[#0F172A]">SYNC@1234</span>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full bg-white text-[#2563EB] border-blue-300 hover:bg-blue-50"
            onClick={handleQuickDemoLogin}
            disabled={loading}
          >
            Continue as Demo User (One-Click)
          </Button>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#475569] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu"
                  required
                  className="w-full text-sm rounded-xl border border-slate-200 pl-10 pr-3.5 py-2.5 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-[#475569]">
                  Password
                </label>
                <span className="text-xs text-[#64748B]">Demo: SYNC@1234</span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full text-sm rounded-xl border border-slate-200 pl-10 pr-3.5 py-2.5 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full shadow-md"
                icon={LogIn}
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Login'}
              </Button>
            </div>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-[#64748B]">
              Don't have an account?{' '}
              <Link
                to={`/signup${returnUrl !== '/dashboard' ? `?returnUrl=${encodeURIComponent(returnUrl)}` : ''}`}
                className="font-bold text-[#2563EB] hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
