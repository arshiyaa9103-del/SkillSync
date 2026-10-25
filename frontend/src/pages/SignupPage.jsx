import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Button from '../components/common/Button';
import { UserPlus, Sparkles, AlertCircle, CheckCircle2, User, Mail, Lock, School, BookOpen, Layers } from 'lucide-react';

const SignupPage = () => {
  const { signup, authState } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const returnUrl = searchParams.get('returnUrl') || '/dashboard';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    university: '',
    course: '',
    year: 'Year 2',
    branch: '',
    primaryRole: 'Full Stack Developer',
    skills: '',
    agreedToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect
  React.useEffect(() => {
    if (authState.isAuthenticated) {
      navigate(returnUrl, { replace: true });
    }
  }, [authState.isAuthenticated, navigate, returnUrl]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear inline error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email format.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!formData.university.trim()) {
      newErrors.university = 'University or college name is required.';
    }

    if (!formData.course.trim()) {
      newErrors.course = 'Degree/Course is required (e.g., B.Tech, B.S., MCA).';
    }

    if (!formData.branch.trim()) {
      newErrors.branch = 'Branch or specialization is required (e.g., CSE, IT, ECE).';
    }

    if (!formData.agreedToTerms) {
      newErrors.agreedToTerms = 'You must agree to the SkillSync terms and privacy policy.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const result = await signup(formData);
    setLoading(false);

    if (result.success) {
      navigate(returnUrl, { replace: true });
    } else {
      setErrors((prev) => ({ ...prev, general: result.error || 'Failed to create account.' }));
    }
  };

  const roles = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Data Scientist',
    'UI/UX Designer',
    'Cloud Engineer',
    'Mobile Developer',
    'Cybersecurity Specialist',
    'Product Manager'
  ];

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#2563EB] to-[#06B6D4] text-white shadow-md mb-2">
            <UserPlus className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Create your SkillSync account
          </h1>
          <p className="text-sm text-[#475569]">
            Build your profile and find the right teammates.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          {errors.general && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{errors.general}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Section 1: Basic Info */}
            <div className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#2563EB] pb-1 border-b border-slate-100">
                1. Personal & Account Credentials
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#475569] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Neha Kapoor"
                    className={`w-full text-sm rounded-xl border p-2.5 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB] ${
                      errors.fullName ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                    }`}
                  />
                  {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#475569] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="student@university.edu"
                    className={`w-full text-sm rounded-xl border p-2.5 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB] ${
                      errors.email ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#475569] mb-1">
                    Password * (min 6 chars)
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full text-sm rounded-xl border p-2.5 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB] ${
                      errors.password ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                    }`}
                  />
                  {errors.password && <p className="text-[11px] text-red-600 mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#475569] mb-1">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full text-sm rounded-xl border p-2.5 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB] ${
                      errors.confirmPassword ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                    }`}
                  />
                  {errors.confirmPassword && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Section 2: Academic Details */}
            <div className="space-y-4 pt-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#2563EB] pb-1 border-b border-slate-100">
                2. Academic & University Background
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#475569] mb-1">
                    University / College *
                  </label>
                  <input
                    type="text"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    placeholder="e.g. National Institute of Technology"
                    className={`w-full text-sm rounded-xl border p-2.5 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB] ${
                      errors.university ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                    }`}
                  />
                  {errors.university && <p className="text-[11px] text-red-600 mt-1">{errors.university}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#475569] mb-1">
                    Course / Degree *
                  </label>
                  <input
                    type="text"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    placeholder="e.g. B.Tech, B.S., MCA"
                    className={`w-full text-sm rounded-xl border p-2.5 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB] ${
                      errors.course ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                    }`}
                  />
                  {errors.course && <p className="text-[11px] text-red-600 mt-1">{errors.course}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#475569] mb-1">
                    Current Year *
                  </label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full text-sm rounded-xl border border-slate-200 p-2.5 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  >
                    <option value="Year 1">Year 1 (Freshman)</option>
                    <option value="Year 2">Year 2 (Sophomore)</option>
                    <option value="Year 3">Year 3 (Junior)</option>
                    <option value="Year 4">Year 4 (Senior)</option>
                    <option value="Postgraduate">Postgraduate</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#475569] mb-1">
                    Branch / Specialization *
                  </label>
                  <input
                    type="text"
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    placeholder="e.g. Computer Science, AI & Data Science, Electronics"
                    className={`w-full text-sm rounded-xl border p-2.5 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB] ${
                      errors.branch ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                    }`}
                  />
                  {errors.branch && <p className="text-[11px] text-red-600 mt-1">{errors.branch}</p>}
                </div>
              </div>
            </div>

            {/* Section 3: Professional & Skills (Optional) */}
            <div className="space-y-4 pt-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#2563EB] pb-1 border-b border-slate-100">
                3. Primary Role & Skills (Optional)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#475569] mb-1">
                    Primary Role
                  </label>
                  <select
                    name="primaryRole"
                    value={formData.primaryRole}
                    onChange={handleChange}
                    className="w-full text-sm rounded-xl border border-slate-200 p-2.5 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  >
                    {roles.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#475569] mb-1">
                    Skills (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="React, Node.js, Python, Figma"
                    className="w-full text-sm rounded-xl border border-slate-200 p-2.5 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>
              </div>
            </div>

            {/* Checkbox: Terms */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 rounded text-[#2563EB] focus:ring-[#2563EB]"
                />
                <span className="text-xs text-[#475569]">
                  I agree to the SkillSync terms and privacy policy. I certify that my student academic details are accurate for hackathon eligibility checking.
                </span>
              </label>
              {errors.agreedToTerms && (
                <p className="text-[11px] text-red-600 mt-1">{errors.agreedToTerms}</p>
              )}
            </div>

            {/* Submit */}
            <div className="pt-3">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full shadow-md"
                icon={UserPlus}
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </div>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-[#64748B]">
              Already have an account?{' '}
              <Link
                to={`/login${returnUrl !== '/dashboard' ? `?returnUrl=${encodeURIComponent(returnUrl)}` : ''}`}
                className="font-bold text-[#2563EB] hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
