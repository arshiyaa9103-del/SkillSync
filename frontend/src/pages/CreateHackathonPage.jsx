import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Button from '../components/common/Button';
import { Trophy, Sparkles, CheckCircle2, ArrowLeft } from 'lucide-react';

const CreateHackathonPage = () => {
  const { addToast } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    organizer: '',
    university: '',
    startDate: '',
    endDate: '',
    mode: 'Hybrid',
    location: '',
    prizePool: '₹1,50,000',
    domains: 'Web, AI/ML, Cloud'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addToast({
      type: 'success',
      title: 'Hackathon Submitted',
      message: 'Your hackathon proposal has been submitted for university review.'
    });
    navigate('/hackathons');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#64748B] hover:text-[#2563EB]"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-bold">
          <Trophy className="w-3.5 h-3.5" />
          <span>Host a Challenge</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
          Create a Hackathon
        </h1>
        <p className="text-sm text-[#475569]">
          Publish a university or tech community hackathon to find ambitious student builders.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#475569] mb-1">
              Hackathon Name *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. NextGen AI Innovation Sprint 2026"
              className="w-full text-sm rounded-xl border border-slate-200 p-2.5 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#475569] mb-1">
              Tagline or Theme *
            </label>
            <input
              type="text"
              required
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              placeholder="e.g. Building sustainable smart infrastructure for tomorrow"
              className="w-full text-sm rounded-xl border border-slate-200 p-2.5 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#475569] mb-1">
                Organizer Organization / Club
              </label>
              <input
                type="text"
                value={formData.organizer}
                onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                placeholder="e.g. Developer Student Clubs"
                className="w-full text-sm rounded-xl border border-slate-200 p-2.5 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#475569] mb-1">
                Format / Mode
              </label>
              <select
                value={formData.mode}
                onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                className="w-full text-sm rounded-xl border border-slate-200 p-2.5 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              >
                <option value="Hybrid">Hybrid</option>
                <option value="Online">Online / Virtual</option>
                <option value="In-Person">In-Person</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#475569] mb-1">
                Total Prize Pool
              </label>
              <input
                type="text"
                value={formData.prizePool}
                onChange={(e) => setFormData({ ...formData, prizePool: e.target.value })}
                placeholder="e.g. ₹2,00,000"
                className="w-full text-sm rounded-xl border border-slate-200 p-2.5 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#475569] mb-1">
                Challenge Domains (comma separated)
              </label>
              <input
                type="text"
                value={formData.domains}
                onChange={(e) => setFormData({ ...formData, domains: e.target.value })}
                placeholder="AI/ML, Web3, FinTech, HealthTech"
                className="w-full text-sm rounded-xl border border-slate-200 p-2.5 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => navigate('/hackathons')}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md">
              Publish Challenge
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateHackathonPage;
