import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { Check, ArrowRight, ArrowLeft, Trophy, Users, Shield, Sparkles, CheckCircle2 } from 'lucide-react';

const CreateTeamModal = () => {
  const {
    isCreateTeamOpen,
    setIsCreateTeamOpen,
    hackathons,
    createTeam,
    createTeamInitialHackathon,
    addToast,
    triggerCelebration
  } = useApp();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(createTeamInitialHackathon ? 2 : 1);
  const [formData, setFormData] = useState({
    hackathonId: createTeamInitialHackathon ? createTeamInitialHackathon.id : 'technova-2026',
    teamName: '',
    tagline: '',
    roles: ['Frontend Developer', 'Backend Developer'],
    skills: ['React.js', 'Node.js', 'Python', 'Figma'],
  });

  React.useEffect(() => {
    if (createTeamInitialHackathon) {
      setFormData((prev) => ({
        ...prev,
        hackathonId: createTeamInitialHackathon.id
      }));
      setCurrentStep(2);
    }
  }, [createTeamInitialHackathon]);

  if (!isCreateTeamOpen) return null;

  const totalSteps = 6;

  const availableRoles = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Data Scientist',
    'UI/UX Designer',
    'Mobile Developer',
    'Cloud / DevOps Engineer',
    'Cybersecurity Specialist',
    'Product Manager / Strategy'
  ];

  const availableSkills = [
    'React.js',
    'Node.js',
    'Python',
    'Machine Learning',
    'Figma',
    'Tailwind CSS',
    'MongoDB',
    'PostgreSQL',
    'Docker',
    'AWS',
    'Flutter',
    'SQL',
    'System Design'
  ];

  const handleRoleToggle = (role) => {
    setFormData((prev) => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter((r) => r !== role)
        : [...prev.roles, role]
    }));
  };

  const handleSkillToggle = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const selectedHackathon = hackathons.find((h) => h.id === formData.hackathonId) || hackathons[0];

  const handleFinish = async () => {
    const payload = {
      name: formData.teamName || 'Code Catalysts',
      description: formData.tagline || `Building a high-impact solution for ${selectedHackathon?.title || 'the hackathon'}.`,
      hackathon_id: selectedHackathon?.id,
      hackathon_name: selectedHackathon?.title,
      required_roles: formData.roles,
      required_skills: formData.skills,
      min_team_size: 3,
      max_team_size: 6
    };

    setIsCreateTeamOpen(false);
    const res = await createTeam(payload);
    if (res.success && res.team) {
      navigate(`/teams/${res.team.id}`);
    } else {
      navigate('/find-teammates');
    }
  };

  return (
    <Modal
      isOpen={isCreateTeamOpen}
      onClose={() => setIsCreateTeamOpen(false)}
      title="Create a Hackathon Team"
      subtitle={`Step ${currentStep} of ${totalSteps} — Set up your team foundation`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Step Indicator (1 to 6) */}
        <div className="flex items-center justify-between relative px-2">
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-slate-200 -translate-y-1/2 -z-0" />
          {[1, 2, 3, 4, 5, 6].map((step) => {
            const isDone = currentStep > step;
            const isCurrent = currentStep === step;
            return (
              <div
                key={step}
                className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  isDone
                    ? 'bg-[#16A34A] text-white'
                    : isCurrent
                    ? 'bg-[#2563EB] text-white ring-4 ring-blue-100'
                    : 'bg-white text-[#64748B] border-2 border-slate-300'
                }`}
              >
                {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : step}
              </div>
            );
          })}
        </div>

        {/* STEP 1: Choose Hackathon */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-in fade-in">
            <h4 className="text-sm font-bold text-[#0F172A]">
              1. Choose your target hackathon
            </h4>
            <div className="grid grid-cols-1 gap-2.5 max-h-64 overflow-y-auto pr-1">
              {hackathons.map((h) => (
                <div
                  key={h.id}
                  onClick={() => setFormData({ ...formData, hackathonId: h.id })}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                    formData.hackathonId === h.id
                      ? 'bg-blue-50/80 border-[#2563EB] ring-2 ring-blue-200'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-0.5">
                    <p className="font-bold text-sm text-[#0F172A]">{h.title}</p>
                    <p className="text-[#64748B]">{h.dates} · {h.mode} · {h.prizePool}</p>
                  </div>
                  {formData.hackathonId === h.id && (
                    <CheckCircle2 className="w-5 h-5 text-[#2563EB]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Team Name */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-in fade-in">
            <h4 className="text-sm font-bold text-[#0F172A]">
              2. Name your team
            </h4>
            <div>
              <label className="block text-xs font-semibold text-[#475569] mb-1">
                Team Name
              </label>
              <input
                type="text"
                value={formData.teamName}
                onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                placeholder="e.g. Team Nova, QuantumCraft, CodeCrafters"
                className="w-full text-sm rounded-xl border border-slate-200 p-3 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#475569] mb-1">
                Project Tagline or Objective
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                placeholder="e.g. Building an accessible assistive student workspace"
                className="w-full text-sm rounded-xl border border-slate-200 p-3 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
          </div>
        )}

        {/* STEP 3: Choose Team Roles */}
        {currentStep === 3 && (
          <div className="space-y-3 animate-in fade-in">
            <h4 className="text-sm font-bold text-[#0F172A]">
              3. Choose desired team roles
            </h4>
            <p className="text-xs text-[#64748B]">
              Select the disciplines and roles your team will need for the hackathon.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {availableRoles.map((role) => {
                const selected = formData.roles.includes(role);
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleRoleToggle(role)}
                    className={`text-xs px-3 py-2 rounded-xl border font-medium transition-all ${
                      selected
                        ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-xs'
                        : 'bg-white text-[#475569] border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {role} {selected && '✓'}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: Choose Required Skills */}
        {currentStep === 4 && (
          <div className="space-y-3 animate-in fade-in">
            <h4 className="text-sm font-bold text-[#0F172A]">
              4. Choose required technology skills
            </h4>
            <p className="text-xs text-[#64748B]">
              These skills will form your baseline Team Skill Map and gap detector.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {availableSkills.map((skill) => {
                const selected = formData.skills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleSkillToggle(skill)}
                    className={`text-xs px-3 py-2 rounded-xl border font-medium transition-all ${
                      selected
                        ? 'bg-[#06B6D4] text-white border-[#06B6D4] shadow-xs'
                        : 'bg-white text-[#475569] border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {skill} {selected && '✓'}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 5: Review Team */}
        {currentStep === 5 && (
          <div className="space-y-4 animate-in fade-in">
            <h4 className="text-sm font-bold text-[#0F172A]">
              5. Review team configuration
            </h4>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-[#64748B]">Target Challenge:</span>
                <span className="font-bold text-[#0F172A]">{selectedHackathon.title}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-[#64748B]">Team Name:</span>
                <span className="font-bold text-[#2563EB]">{formData.teamName || 'Team Nova'}</span>
              </div>
              <div>
                <span className="text-[#64748B] block mb-1">Target Roles ({formData.roles.length}):</span>
                <div className="flex flex-wrap gap-1">
                  {formData.roles.map((r, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-blue-100 text-[#2563EB] font-medium">
                      {r}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-[#64748B] block mb-1">Key Tech Skills ({formData.skills.length}):</span>
                <div className="flex flex-wrap gap-1">
                  {formData.skills.map((s, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-cyan-100 text-[#0891B2] font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: Find Teammates Ready */}
        {currentStep === 6 && (
          <div className="space-y-4 text-center py-4 animate-in fade-in">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 text-[#2563EB] flex items-center justify-center mx-auto shadow-sm">
              <Sparkles className="w-8 h-8 text-[#2563EB]" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A]">
              Ready to find candidates for {formData.teamName || 'your team'}!
            </h3>
            <p className="text-xs text-[#64748B] max-w-md mx-auto leading-relaxed">
              SkillSync will compare candidate profiles against your missing roles and skills, highlighting candidates with high compatibility scores.
            </p>
          </div>
        )}

        {/* Footer Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          {currentStep > 1 ? (
            <Button
              variant="outline"
              size="sm"
              icon={ArrowLeft}
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Back
            </Button>
          ) : (
            <div />
          )}

          {currentStep < totalSteps ? (
            <Button
              variant="primary"
              size="sm"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              Continue
            </Button>
          ) : (
            <Button
              variant="success"
              size="sm"
              icon={Check}
              onClick={handleFinish}
            >
              Create Team & Find Teammates
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CreateTeamModal;
