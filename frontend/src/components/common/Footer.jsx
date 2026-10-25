import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { RotateCcw, Heart, Shield, Terminal, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const { resetDemoData } = useApp();

  return (
    <footer className="bg-white border-t border-[#E2E8F0] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#2563EB] to-[#06B6D4] flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="7" cy="12" r="3" fill="white" fillOpacity="0.3" />
                  <circle cx="17" cy="12" r="3" fill="white" fillOpacity="0.9" />
                  <path d="M10 12h4" strokeWidth="2.5" />
                </svg>
              </div>
              <span className="text-xl font-extrabold text-[#0F172A] tracking-tight">
                Skill<span className="text-[#2563EB]">Sync</span>
              </span>
            </div>
            <p className="text-sm font-semibold text-[#2563EB]">
              Build smarter. Team better.
            </p>
            <p className="text-xs text-[#64748B] max-w-sm leading-relaxed">
              Find the people who complete your team — by skills, roles and hackathon goals.
              Designed specifically for university hackathon participants and fast-moving project teams.
            </p>
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={resetDemoData}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-[#475569] transition-colors border border-slate-200"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Prototype Data
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs font-medium text-[#475569]">
              <li>
                <Link to="/dashboard" className="hover:text-[#2563EB] transition-colors">
                  Discover Dashboard
                </Link>
              </li>
              <li>
                <Link to="/hackathons" className="hover:text-[#2563EB] transition-colors">
                  Explore Hackathons
                </Link>
              </li>
              <li>
                <Link to="/find-teammates" className="hover:text-[#2563EB] transition-colors">
                  Find Teammates
                </Link>
              </li>
              <li>
                <Link to="/teams/team-nova" className="hover:text-[#2563EB] transition-colors">
                  Team Nova
                </Link>
              </li>
              <li>
                <Link to="/invitations" className="hover:text-[#2563EB] transition-colors">
                  Team Invitations
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Ethics & Demo Context */}
          <div>
            <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-3">
              Hackathon Prototype
            </h4>
            <ul className="space-y-2 text-xs text-[#64748B]">
              <li className="flex items-center gap-1.5 text-slate-700">
                <Shield className="w-3.5 h-3.5 text-[#2563EB]" />
                University Hackathon Demo
              </li>
              <li className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#06B6D4]" />
                Frontend-Only Architecture
              </li>
              <li className="text-[11px] leading-relaxed text-slate-500 pt-1">
                Match percentages are computed via predefined skill compatibility logic for clean, deterministic demonstrations.
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <p>© 2026 SkillSync. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with React, Vite & Tailwind for university tech teams
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
