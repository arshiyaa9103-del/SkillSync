import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { Lock, LogIn, X } from 'lucide-react';

const AuthPromptModal = () => {
  const { authPromptModal, setAuthPromptModal } = useApp();
  const navigate = useNavigate();

  if (!authPromptModal.isOpen) return null;

  const handleLoginRedirect = () => {
    const returnUrl = encodeURIComponent(authPromptModal.redirectPath || window.location.pathname);
    setAuthPromptModal({ isOpen: false, actionName: '', redirectPath: '' });
    navigate(`/login?returnUrl=${returnUrl}`);
  };

  const handleClose = () => {
    setAuthPromptModal({ isOpen: false, actionName: '', redirectPath: '' });
  };

  return (
    <Modal
      isOpen={authPromptModal.isOpen}
      onClose={handleClose}
      title="Authentication Required"
      subtitle="Sign in to continue on SkillSync"
      maxWidth="max-w-md"
    >
      <div className="space-y-5 text-center py-2">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 text-[#2563EB] flex items-center justify-center mx-auto shadow-sm">
          <Lock className="w-7 h-7" />
        </div>

        <div className="space-y-1.5">
          <h3 className="text-lg font-bold text-[#0F172A]">
            Please log in to continue
          </h3>
          <p className="text-sm text-[#64748B] leading-relaxed">
            You need to be signed in to {authPromptModal.actionName || 'perform this action'}. Join teams, send invites, and track team readiness with your verified profile.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-left space-y-1">
          <p className="font-bold text-[#0F172A]">Demo Account Available:</p>
          <p className="text-[#475569]">
            Email: <code className="text-[#2563EB] font-bold">AARAVMEHTA@GMAIL.COM</code>
          </p>
          <p className="text-[#475569]">
            Password: <code className="text-[#2563EB] font-bold">SYNC@1234</code>
          </p>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button
            variant="outline"
            size="md"
            className="flex-1"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="md"
            className="flex-1 shadow-md"
            icon={LogIn}
            onClick={handleLoginRedirect}
          >
            Login
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AuthPromptModal;
