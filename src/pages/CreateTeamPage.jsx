import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Button from '../components/common/Button';
import {
  Layers,
  Trophy,
  CheckCircle2,
  Lock,
  ArrowLeft,
  Sparkles,
  AlertCircle,
  Users,
  Shield,
  Plus,
  X
} from 'lucide-react';

const CreateTeamPage = () => {
  const { hackathons, createTeam, currentUser } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const hackathonParam = searchParams.get('hackathon');

  // Check if hackathon matches any existing hackathon
  const lockedHackathon = hackathonParam
    ? hackathons.find((h) => h.id === hackathonParam || h.title.toLowerCase().includes(hackathonParam.toLowerCase())) || {
        id: hackathonParam,
        title: hackathonParam.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        dates: 'Upcoming 2026',
        mode: 'Hybrid',
        prizePool: '₹2,00,000'
      }
    : null;

  const [selectedHackathonId, setSelectedHackathonId] = useState(
    lockedHackathon ? lockedHackathon.id : (hackathons[0]?.id || 'technova-2026')
  );

  const [teamName, setTeamName] = useState('');
  const [description, setDescription] = useState('');
  const [minTeamSize, setMinTeamSize] = useState(3);
  const [maxTeamSize, setMaxTeamSize] = useState(6);
  const [universityPreference, setUniversityPreference] = useState('Open to all colleges');
  const [selectedRoles, setSelectedRoles] = useState(['Frontend Developer', 'Backend Developer']);
  const [selectedSkills, setSelectedSkills] = useState(['React.js', 'Node.js']);
  const [customSkillInput, setCustomSkillInput] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const availableRoles = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Data Scientist',
    'UI/UX Designer',
    'Mobile Developer',
    'Cloud / DevOps Engineer',
    'Cybersecurity Specialist',
    'Product Manager'
  ];

  const presetSkills = [
    'React.js',
    'Node.js',
    'Python',
    'Machine Learning',
    'Figma',
    'UI/UX',
    'MongoDB',
    'PostgreSQL',
    'AWS',
    'Docker',
    'Flutter',
    'SQL'
  ];

  const handleRoleToggle = (role) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const handleSkillToggle = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleAddCustomSkill = (e) => {
    e.preventDefault();
    if (customSkillInput.trim() && !selectedSkills.includes(customSkillInput.trim())) {
      setSelectedSkills((prev) => [...prev, customSkillInput.trim()]);
      setCustomSkillInput('');
    }
  };

  const activeHackathonObj = lockedHackathon || hackathons.find((h) => h.id === selectedHackathonId) || hackathons[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!teamName.trim()) {
      setError('Please provide a name for your team.');
      return;
    }

    if (selectedRoles.length === 0) {
      setError('Please choose at least one desired team role.');
      return;
    }

    setLoading(true);

    const teamPayload = {
      name: teamName.trim(),
      description: description.trim() || `Building a high-impact solution for ${activeHackathonObj?.title || 'the hackathon'}.`,
      hackathon_id: activeHackathonObj?.id || selectedHackathonId,
      hackathon_name: activeHackathonObj?.title || 'Open Hackathon Challenge',
      min_team_size: Number(minTeamSize),
      max_team_size: Number(maxTeamSize),
      university_preference: universityPreference,
      required_roles: selectedRoles,
      required_skills: selectedSkills
    };

    const result = await createTeam(teamPayload);
    setLoading(false);

    if (result.success && result.team) {
      // Redirect directly to the newly created persistent team page
      navigate(`/teams/${result.team.id}`);
    } else {
      setError(result.error || 'Failed to create team. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top back navigation */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#64748B] hover:text-[#2563EB] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Team Formation & Registration</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
          Create Your Team
        </h1>
        <p className="text-sm text-[#475569]">
          Register a new team, define skill requirements, and find teammates to complete your squad.
        </p>
      </div>

      {/* Main Form Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-9 border border-slate-200/90 shadow-sm space-y-8">
        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-7">
          {/* 1. HACKATHON SELECTION / LOCKED STATE */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#475569]">
              Target Hackathon
            </label>

            {lockedHackathon ? (
              // LOCKED / PRESELECTED STATE FROM HACKATHON DETAIL PAGE
              <div className="p-4 rounded-2xl bg-[#EFF6FF] border-2 border-[#2563EB]/40 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#2563EB] text-white flex items-center justify-center font-bold shadow-xs">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-[#0F172A]">
                        {lockedHackathon.title}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#16A34A] bg-[#F0FDF4] px-2 py-0.5 rounded-full border border-green-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Selected
                      </span>
                    </div>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      Locked from hackathon details · {lockedHackathon.dates || 'Active Challenge'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#64748B] font-semibold bg-white/80 px-2.5 py-1.5 rounded-lg border border-blue-100">
                  <Lock className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Locked</span>
                </div>
              </div>
            ) : (
              // GENERAL MANUAL SELECTION STATE
              <div className="space-y-2">
                <select
                  value={selectedHackathonId}
                  onChange={(e) => setSelectedHackathonId(e.target.value)}
                  className="w-full text-sm rounded-xl border border-slate-200 p-3 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                >
                  {hackathons.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.title} ({h.dates} · {h.mode})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-[#64748B]">
                  Choose which challenge your team is aiming to compete in.
                </p>
              </div>
            )}
          </div>

          {/* 2. TEAM NAME & DESCRIPTION */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                Team Name *
              </label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="e.g. Code Catalysts, ByteBuilders, Nexus Squad"
                required
                className="w-full text-sm rounded-xl border border-slate-200 p-3 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                Project Objective or Pitch Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Briefly describe what your team intends to build, your problem domain of focus, or your project vision..."
                className="w-full text-sm rounded-xl border border-slate-200 p-3 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
          </div>

          {/* 3. TEAM SIZE & PREFERENCE */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                Min Team Size
              </label>
              <input
                type="number"
                min={2}
                max={maxTeamSize}
                value={minTeamSize}
                onChange={(e) => setMinTeamSize(e.target.value)}
                className="w-full text-sm rounded-xl border border-slate-200 p-2.5 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                Max Team Size
              </label>
              <input
                type="number"
                min={minTeamSize}
                max={8}
                value={maxTeamSize}
                onChange={(e) => setMaxTeamSize(e.target.value)}
                className="w-full text-sm rounded-xl border border-slate-200 p-2.5 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                College Preference
              </label>
              <select
                value={universityPreference}
                onChange={(e) => setUniversityPreference(e.target.value)}
                className="w-full text-sm rounded-xl border border-slate-200 p-2.5 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              >
                <option value="Open to all colleges">Open to all colleges</option>
                <option value="Same University Only">Same University Only</option>
                <option value="Inter-college preferred">Inter-college preferred</option>
              </select>
            </div>
          </div>

          {/* 4. REQUIRED ROLES */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#475569]">
                Required Team Roles *
              </label>
              <p className="text-xs text-[#64748B]">
                Select the disciplines your team needs to recruit. SkillSync will use these to detect skill gaps.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {availableRoles.map((role) => {
                const isSelected = selectedRoles.includes(role);
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleRoleToggle(role)}
                    className={`text-xs px-3.5 py-2 rounded-xl border font-semibold transition-all ${
                      isSelected
                        ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-xs'
                        : 'bg-white text-[#475569] border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {role} {isSelected && '✓'}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. REQUIRED SKILLS */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#475569]">
                Required Technology Skills
              </label>
              <p className="text-xs text-[#64748B]">
                Define the stack requirements for candidate compatibility matching.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {presetSkills.map((skill) => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleSkillToggle(skill)}
                    className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                      isSelected
                        ? 'bg-[#06B6D4] text-white border-[#06B6D4] shadow-xs'
                        : 'bg-white text-[#475569] border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {skill} {isSelected && '✓'}
                  </button>
                );
              })}
            </div>

            {/* Custom Skill Input */}
            <div className="flex items-center gap-2 pt-1 max-w-sm">
              <input
                type="text"
                value={customSkillInput}
                onChange={(e) => setCustomSkillInput(e.target.value)}
                placeholder="Add custom skill (e.g., Rust, GraphQL)"
                className="text-xs rounded-xl border border-slate-200 p-2 flex-1 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                icon={Plus}
                onClick={handleAddCustomSkill}
              >
                Add
              </Button>
            </div>
          </div>

          {/* Summary Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <span className="font-bold text-[#0F172A] block">Team Summary</span>
            <div className="text-[#64748B] flex flex-wrap gap-4">
              <span>Leader: <strong className="text-[#0F172A]">{currentUser.name}</strong></span>
              <span>Hackathon: <strong className="text-[#2563EB]">{activeHackathonObj?.title}</strong></span>
              <span>Team Size: <strong className="text-[#0F172A]">{minTeamSize}–{maxTeamSize} Members</strong></span>
              <span>Roles: <strong className="text-[#0F172A]">{selectedRoles.length} Selected</strong></span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => navigate(-1)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="shadow-md"
              icon={Layers}
              disabled={loading}
            >
              {loading ? 'Creating Team in Database...' : 'Create Team'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTeamPage;
