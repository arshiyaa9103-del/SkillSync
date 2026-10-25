import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { Check, User, Save } from 'lucide-react';

const EditProfileModal = () => {
  const { isEditProfileOpen, setIsEditProfileOpen, currentUser, setCurrentUser, addToast } = useApp();

  const [formData, setFormData] = useState({
    name: currentUser.name,
    role: currentUser.role,
    department: currentUser.department,
    bio: currentUser.bio,
    badge: currentUser.badge,
    github: currentUser.socials.github,
    portfolio: currentUser.socials.portfolio
  });

  if (!isEditProfileOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentUser((prev) => ({
      ...prev,
      name: formData.name,
      role: formData.role,
      department: formData.department,
      bio: formData.bio,
      badge: formData.badge,
      socials: {
        ...prev.socials,
        github: formData.github,
        portfolio: formData.portfolio
      }
    }));
    addToast({
      type: 'success',
      title: 'Profile Updated',
      message: 'Your student profile information has been saved.'
    });
    setIsEditProfileOpen(false);
  };

  return (
    <Modal
      isOpen={isEditProfileOpen}
      onClose={() => setIsEditProfileOpen(false)}
      title="Edit Student Profile"
      subtitle="Update your student information, role and bio"
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[#475569] mb-1">Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full text-xs rounded-xl border border-slate-200 p-2.5 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#475569] mb-1">Primary Role</label>
          <input
            type="text"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full text-xs rounded-xl border border-slate-200 p-2.5 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#475569] mb-1">Department & Year</label>
          <input
            type="text"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            className="w-full text-xs rounded-xl border border-slate-200 p-2.5 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#475569] mb-1">About / Bio</label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={3}
            className="w-full text-xs rounded-xl border border-slate-200 p-2.5 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB] resize-none"
          />
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditProfileOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            icon={Save}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditProfileModal;
