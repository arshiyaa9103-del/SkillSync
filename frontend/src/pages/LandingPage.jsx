import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Button from '../components/common/Button';
import {
  Users,
  Search,
  CheckCircle,
  Trophy,
  ArrowRight,
  Sparkles,
  Shield,
  Layers,
  SlidersHorizontal,
  TrendingUp,
  UserCheck,
  CheckCircle2,
  Code2,
  Cpu,
  Palette,
  Database,
  Cloud
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* ==================================================
          HERO SECTION (Rebalanced without the large box)
          ================================================== */}
      <section className="relative pt-16 sm:pt-24 pb-12 sm:pb-16 overflow-hidden">
        {/* Subtle decorative background gradient glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-tr from-blue-100/60 via-cyan-100/40 to-slate-50/20 blur-3xl -z-10 rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EFF6FF] border border-blue-200 text-[#2563EB] text-xs font-bold tracking-wide shadow-xs mx-auto animate-in fade-in">
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Next-Gen Hackathon Teaming Platform</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#0F172A] tracking-tight leading-[1.08] max-w-4xl mx-auto">
            Build smarter.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-[#1D4ED8] to-[#06B6D4]">
              Team better.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-[#475569] max-w-2xl mx-auto leading-relaxed font-normal">
            Find the right people, fill your team’s skill gaps, and build a stronger hackathon team.
          </p>

          {/* Primary & Secondary Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link to="/find-teammates" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="xl"
                className="w-full sm:w-auto shadow-lg shadow-blue-500/25 px-8"
                icon={Users}
              >
                Find Your Team
              </Button>
            </Link>

            <Link to="/hackathons" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="xl"
                className="w-full sm:w-auto bg-white hover:bg-slate-50 border-slate-300 px-8"
                icon={Trophy}
              >
                Explore Hackathons
              </Button>
            </Link>
          </div>

          {/* Feature Highlights Row */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-medium text-[#64748B]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
              Skill gap visualization
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
              Role compatibility scoring
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
              Team eligibility tracking
            </span>
          </div>

          {/* Balanced Floating Discipline Badges */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 text-xs font-semibold text-[#0F172A] shadow-xs">
              <Code2 className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Frontend Engineering</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 text-xs font-semibold text-[#0F172A] shadow-xs">
              <Database className="w-3.5 h-3.5 text-[#0891B2]" />
              <span>Backend Architecture</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 text-xs font-semibold text-[#0F172A] shadow-xs">
              <Cpu className="w-3.5 h-3.5 text-indigo-600" />
              <span>Data Science & ML</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 text-xs font-semibold text-[#0F172A] shadow-xs">
              <Palette className="w-3.5 h-3.5 text-pink-600" />
              <span>UI/UX & Product Design</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 text-xs font-semibold text-[#0F172A] shadow-xs">
              <Cloud className="w-3.5 h-3.5 text-amber-600" />
              <span>Cloud & DevOps</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          TRUST / DEMO STATISTICS ROW
          ================================================== */}
      <section className="border-y border-slate-200 bg-white py-12 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-[#2563EB] tracking-tight">
                2,400+
              </p>
              <p className="text-xs sm:text-sm font-semibold text-[#64748B]">
                Students Enrolled
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
                180+
              </p>
              <p className="text-xs sm:text-sm font-semibold text-[#64748B]">
                Teams Created
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-[#06B6D4] tracking-tight">
                75+
              </p>
              <p className="text-xs sm:text-sm font-semibold text-[#64748B]">
                Hackathons Supported
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-[#16A34A] tracking-tight">
                92%
              </p>
              <p className="text-xs sm:text-sm font-semibold text-[#64748B]">
                Team Completion Rate
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          HOW IT WORKS (TIMELINE)
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
            Clear Four-Step Teaming
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            From individual skills to complete teams.
          </h2>
          <p className="text-sm sm:text-base text-[#64748B]">
            Great hackathon teams aren't built by chance. SkillSync helps you identify the skills you already have, discover what's missing, and connect with students who complete your vision.
          </p>
        </div>

        {/* Desktop Horizontal / Mobile Vertical Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Connector line for desktop */}
          <div className="hidden md:block absolute top-7 left-12 right-12 h-0.5 bg-blue-100 -z-0" />

          {/* Step 1 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-3 relative z-10 hover:border-blue-200 transition-colors">
            <span className="w-12 h-12 rounded-xl bg-blue-50 text-[#2563EB] font-black text-lg flex items-center justify-center border border-blue-200 shadow-xs">
              01
            </span>
            <h3 className="text-base font-bold text-[#0F172A]">Create your profile</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Add your tech stack, primary roles, past hackathons, and github project showcases.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-3 relative z-10 hover:border-blue-200 transition-colors">
            <span className="w-12 h-12 rounded-xl bg-cyan-50 text-[#0891B2] font-black text-lg flex items-center justify-center border border-cyan-200 shadow-xs">
              02
            </span>
            <h3 className="text-base font-bold text-[#0F172A]">Choose a hackathon</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Explore opportunities, challenge domains, prize pools, and eligibility rules.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-3 relative z-10 hover:border-blue-200 transition-colors">
            <span className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 font-black text-lg flex items-center justify-center border border-amber-200 shadow-xs">
              03
            </span>
            <h3 className="text-base font-bold text-[#0F172A]">Find your missing skills</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              See your team skill map update live. Identify critical missing disciplines instantly.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-3 relative z-10 hover:border-blue-200 transition-colors">
            <span className="w-12 h-12 rounded-xl bg-emerald-50 text-[#16A34A] font-black text-lg flex items-center justify-center border border-green-200 shadow-xs">
              04
            </span>
            <h3 className="text-base font-bold text-[#0F172A]">Build your team</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Discover and invite suitable teammates by compatibility score, year, and availability.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================
          PRODUCT VALUE SECTION (4 DISTINCT CARDS)
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold text-[#06B6D4] uppercase tracking-wider">
            Engineered For Hackathons
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Everything you need to build your next hackathon team.
          </h2>
          <p className="text-sm text-[#64748B]">
            Stop cold-messaging random Discord channels. Structure your team with data and purpose.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Team Discovery */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center shadow-xs">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#0F172A]">TEAM DISCOVERY</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Find students with complementary skills who are actively looking for a hackathon squad.
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-semibold text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded-md">
                Predefined Compatibility
              </span>
            </div>
          </div>

          {/* Card 2: Skill Coverage */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#16A34A] flex items-center justify-center shadow-xs">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#0F172A]">SKILL COVERAGE</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Understand what your team has and what it lacks across Frontend, Backend, UI/UX, and ML.
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-semibold text-[#16A34A] bg-emerald-50 px-2.5 py-1 rounded-md">
                Live Coverage Bar
              </span>
            </div>
          </div>

          {/* Card 3: Smart Filters */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-[#0891B2] flex items-center justify-center shadow-xs">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#0F172A]">SMART FILTERS</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Filter people by role, tech stack, academic year, department, and sprint availability.
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-semibold text-[#0891B2] bg-cyan-50 px-2.5 py-1 rounded-md">
                Multi-Attribute Search
              </span>
            </div>
          </div>

          {/* Card 4: Team Management */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-xs">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#0F172A]">TEAM MANAGEMENT</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Invite members, manage invitations, monitor open roles, and track competition eligibility.
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                Eligibility Checklist
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          LARGE BRIGHT BLUE / CYAN CTA SECTION
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#2563EB] via-[#1D4ED8] to-[#06B6D4] p-8 sm:p-14 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-cyan-200 text-xs font-bold tracking-wider uppercase backdrop-blur-xs">
              Start Building Today
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Your next great teammate is out there.
            </h2>
            <p className="text-base sm:text-lg text-blue-100 max-w-xl mx-auto leading-relaxed">
              Stop searching randomly. Build a team around the skills you actually need to build, submit, and win.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link to="/find-teammates">
              <Button
                variant="white"
                size="xl"
                className="w-full sm:w-auto text-[#2563EB] shadow-xl"
                icon={Users}
              >
                Start Building
              </Button>
            </Link>
            <Link to="/hackathons">
              <Button
                variant="outline"
                size="xl"
                className="w-full sm:w-auto text-white border-white/40 hover:bg-white/10 hover:text-white"
              >
                Browse Open Hackathons
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
