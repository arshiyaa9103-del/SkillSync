import React from 'react';
import { useApp } from '../context/AppContext';
import Avatar from '../components/common/Avatar';
import SkillBadge from '../components/common/SkillBadge';
import StatusBadge from '../components/common/StatusBadge';
import Button from '../components/common/Button';
import {
  Trophy,
  FolderGit2,
  Briefcase,
  Github,
  Linkedin,
  Globe,
  ExternalLink,
  Edit3,
  CheckCircle2,
  Sparkles,
  Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { currentUser, team, setIsEditProfileOpen } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm relative overflow-hidden space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-start gap-4 sm:gap-6">
            <Avatar
              name={currentUser.name}
              initials={currentUser.avatar}
              size="2xl"
              status="available"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
                  {currentUser.name}
                </h1>
                <span className="text-xs font-bold text-[#16A34A] bg-[#F0FDF4] px-3 py-1 rounded-full border border-green-200 inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
                  {currentUser.badge}
                </span>
              </div>
              <p className="text-sm font-semibold text-[#2563EB]">
                {currentUser.role}
              </p>
              <p className="text-xs text-[#64748B]">
                {currentUser.department} · {currentUser.year} · {currentUser.university}
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3 pt-2 text-xs text-[#475569] flex-wrap">
                {currentUser.socials.github && (
                  <a
                    href={`https://${currentUser.socials.github}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 hover:text-[#0F172A] transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>{currentUser.socials.github}</span>
                  </a>
                )}
                {currentUser.socials.linkedin && (
                  <a
                    href={`https://${currentUser.socials.linkedin}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 hover:text-[#2563EB] transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {currentUser.socials.portfolio && (
                  <a
                    href={`https://${currentUser.socials.portfolio}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 hover:text-[#06B6D4] transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5 text-[#06B6D4]" />
                    <span>{currentUser.socials.portfolio}</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="md"
              icon={Edit3}
              onClick={() => setIsEditProfileOpen(true)}
            >
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Experience Counters Row */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 text-center">
            <span className="text-2xl sm:text-3xl font-black text-[#2563EB]">
              {currentUser.experience.projects}
            </span>
            <span className="text-xs font-semibold text-[#64748B] block mt-0.5">
              Projects Completed
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-cyan-50/70 border border-cyan-100 text-center">
            <span className="text-2xl sm:text-3xl font-black text-[#0891B2]">
              {currentUser.experience.hackathons}
            </span>
            <span className="text-xs font-semibold text-[#64748B] block mt-0.5">
              Hackathons Attended
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-center">
            <span className="text-2xl sm:text-3xl font-black text-[#16A34A]">
              {currentUser.experience.internships}
            </span>
            <span className="text-xs font-semibold text-[#64748B] block mt-0.5">
              Internships
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: About & Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Bio & Projects (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* About Section */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-3">
            <h2 className="text-base font-bold text-[#0F172A] uppercase tracking-wider">
              About
            </h2>
            <p className="text-sm text-[#475569] leading-relaxed">
              "{currentUser.bio}"
            </p>
          </div>

          {/* Featured Projects Section */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-[#0F172A] uppercase tracking-wider pb-2 border-b border-slate-100">
              Featured Projects
            </h2>

            <div className="space-y-4">
              {currentUser.projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-bold text-[#0F172A]">
                      {proj.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-semibold text-[#2563EB] hover:underline flex items-center gap-1"
                        >
                          <Github className="w-3.5 h-3.5" />
                          Code
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-semibold text-[#16A34A] hover:underline flex items-center gap-1"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Demo
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-[#475569] leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-[#475569]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Skills with Proficiency Indicators & Preferred Roles (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          {/* Skills Section with Proficiency Indicators */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-[#0F172A] uppercase tracking-wider pb-2 border-b border-slate-100">
              Technical Skills & Proficiency
            </h2>

            <div className="space-y-3">
              {currentUser.skills.map((skill, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#0F172A]">{skill.name}</span>
                    <span className="font-semibold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded">
                      {skill.level}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        skill.level === 'Advanced'
                          ? 'bg-[#2563EB] w-[90%]'
                          : skill.level === 'Intermediate'
                          ? 'bg-[#06B6D4] w-[65%]'
                          : 'bg-slate-400 w-[40%]'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preferred Roles Section */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-3">
            <h2 className="text-base font-bold text-[#0F172A] uppercase tracking-wider pb-2 border-b border-slate-100">
              Preferred Roles
            </h2>
            <div className="flex flex-wrap gap-2">
              {currentUser.preferredRoles.map((role, idx) => (
                <span
                  key={idx}
                  className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-blue-50 text-[#2563EB] border border-blue-200"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>

          {/* Current Hackathon Team Link */}
          <div className="bg-gradient-to-tr from-blue-900 to-indigo-900 rounded-2xl p-6 text-white space-y-3 shadow-md">
            <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider block">
              Active Hackathon Squad
            </span>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-black text-white">{team.name}</p>
                <p className="text-xs text-blue-200">{team.hackathonName}</p>
              </div>
              <span className="text-xs font-bold bg-white/20 px-2.5 py-1 rounded-full">
                {team.members.length} / {team.targetMembers} Members
              </span>
            </div>
            <Link to="/teams/team-nova" className="block pt-2">
              <Button variant="white" size="sm" className="w-full text-[#2563EB]" icon={Layers}>
                Open Team Nova Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
