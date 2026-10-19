import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  initialCurrentUser,
  initialHackathons,
  initialCandidates,
  initialTeam,
  initialInvitations,
  initialNotifications
} from '../data/mockData';
import { authService, DEMO_CREDENTIALS } from '../services/authService';
import { databaseService } from '../services/databaseService';

const AppContext = createContext();

const STORAGE_KEYS = {
  CURRENT_USER: 'skillsync_current_user_v1',
  TEAM: 'skillsync_team_v1',
  CANDIDATES: 'skillsync_candidates_v1',
  HACKATHONS: 'skillsync_hackathons_v1',
  INVITATIONS: 'skillsync_invitations_v1',
  NOTIFICATIONS: 'skillsync_notifications_v1',
};

export const AppProvider = ({ children }) => {
  // 1. AUTHENTICATION STATE
  const [authState, setAuthState] = useState(() => authService.getAuthState());

  // Current user representation (derived from auth or default demo profile)
  const [currentUser, setCurrentUser] = useState(() => {
    const auth = authService.getAuthState();
    if (auth.isAuthenticated && auth.user) {
      return { ...initialCurrentUser, ...auth.user };
    }
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return saved ? JSON.parse(saved) : initialCurrentUser;
  });

  // 2. DATABASE TEAMS STATE
  const [dbTeams, setDbTeams] = useState([]);
  const [savedHackathons, setSavedHackathons] = useState(() => databaseService.getSavedHackathonIds());

  // Active focused team (defaults to Team Nova)
  const [team, setTeam] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TEAM);
    return saved ? JSON.parse(saved) : initialTeam;
  });

  const [candidates, setCandidates] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CANDIDATES);
    return saved ? JSON.parse(saved) : initialCandidates;
  });

  const [hackathons, setHackathons] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.HACKATHONS);
    return saved ? JSON.parse(saved) : initialHackathons;
  });

  const [invitations, setInvitations] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.INVITATIONS);
    return saved ? JSON.parse(saved) : initialInvitations;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  // UI state
  const [toasts, setToasts] = useState([]);
  const [activeProfileCandidate, setActiveProfileCandidate] = useState(null);
  const [inviteModalCandidate, setInviteModalCandidate] = useState(null);
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);
  const [createTeamInitialHackathon, setCreateTeamInitialHackathon] = useState(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [authPromptModal, setAuthPromptModal] = useState({ isOpen: false, actionName: '', redirectPath: '' });

  // Fetch teams from database service on mount
  const refreshDbTeams = async () => {
    const { data } = await databaseService.getTeams();
    if (data) {
      setDbTeams(data);
    }
  };

  useEffect(() => {
    refreshDbTeams();
  }, []);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(team));
  }, [team]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CANDIDATES, JSON.stringify(candidates));
  }, [candidates]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HACKATHONS, JSON.stringify(hackathons));
  }, [hackathons]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INVITATIONS, JSON.stringify(invitations));
  }, [invitations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  // Toast helper
  const addToast = (toast) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    const newToast = { id, type: 'info', duration: 4500, ...toast };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      removeToast(id);
    }, newToast.duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Trigger celebration confetti
  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563EB', '#06B6D4', '#84CC16', '#16A34A', '#F59E0B']
      });
    } catch {
      // ignore
    }
  };

  // ==========================================
  // AUTHENTICATION METHODS
  // ==========================================

  const login = async (email, password) => {
    const res = await authService.login(email, password);
    if (!res.error && res.user) {
      const state = authService.getAuthState();
      setAuthState(state);
      setCurrentUser((prev) => ({
        ...prev,
        ...res.user
      }));
      addToast({
        type: 'success',
        title: 'Logged in',
        message: `Welcome back, ${res.user.name}!`
      });
      return { success: true, user: res.user };
    }
    return { success: false, error: res.error };
  };

  const signup = async (formData) => {
    const res = await authService.signup(formData);
    if (!res.error && res.user) {
      const state = authService.getAuthState();
      setAuthState(state);
      setCurrentUser((prev) => ({
        ...prev,
        ...res.user
      }));
      addToast({
        type: 'success',
        title: 'Account Created',
        message: `Welcome to SkillSync, ${res.user.name}!`
      });
      return { success: true, user: res.user };
    }
    return { success: false, error: res.error };
  };

  const logout = () => {
    authService.logout();
    setAuthState({
      isAuthenticated: false,
      userId: null,
      email: null,
      user: null
    });
    addToast({
      type: 'info',
      title: 'Logged out',
      message: 'Logged out successfully.'
    });
  };

  // Intercept actions that require authentication
  const requireAuth = (callback, actionName = 'perform this action', redirectPath = '') => {
    if (!authState.isAuthenticated) {
      setAuthPromptModal({
        isOpen: true,
        actionName,
        redirectPath
      });
      return false;
    }
    if (typeof callback === 'function') {
      callback();
    }
    return true;
  };

  // ==========================================
  // TEAM CREATION & DATABASE PERSISTENCE
  // ==========================================

  const createTeam = async (teamPayload) => {
    const payloadWithUser = {
      ...teamPayload,
      leader_id: authState.userId || 'aarav-demo',
      leader_name: currentUser.name || 'Aarav Mehta',
      leader_avatar: currentUser.avatar || 'AM',
      leader_role: currentUser.role || 'Team Lead'
    };

    const result = await databaseService.createTeam(payloadWithUser);
    if (!result.error && result.data) {
      await refreshDbTeams();
      triggerCelebration();
      addToast({
        type: 'success',
        title: '🎉 Team Created!',
        message: `Team "${result.data.name}" was successfully registered to the database.`
      });
      return { success: true, team: result.data };
    }

    addToast({
      type: 'error',
      title: 'Creation Failed',
      message: result.error || 'Unable to create team. Please try again.'
    });
    return { success: false, error: result.error };
  };

  const toggleSaveHackathon = (hackathonId) => {
    if (!requireAuth(null, 'save hackathons', `/hackathons/${hackathonId}`)) {
      return;
    }
    const res = databaseService.saveHackathon(hackathonId);
    setSavedHackathons(res.saved);
    addToast({
      type: res.isSaved ? 'success' : 'info',
      title: res.isSaved ? 'Hackathon Saved' : 'Removed from Saved',
      message: res.isSaved ? 'Added to your bookmarked hackathons.' : 'Removed from bookmarks.'
    });
  };

  // Open Create Team modal with optional preselected hackathon
  const openCreateTeamModal = (hackathon = null) => {
    if (!requireAuth(null, 'create a team', hackathon ? `/create-team?hackathon=${hackathon.id}` : '/create-team')) {
      return;
    }
    setCreateTeamInitialHackathon(hackathon);
    setIsCreateTeamOpen(true);
  };

  // ==========================================
  // INVITATIONS & INTERACTIVE DEMO FLOW
  // ==========================================

  const sendInvitation = (candidate, customNote = '') => {
    if (!requireAuth(null, 'send invitations', '/find-teammates')) {
      return;
    }

    const newSentId = `inv-sent-${Date.now()}`;
    const newSentInv = {
      id: newSentId,
      candidateId: candidate.id,
      candidateName: candidate.name,
      candidateAvatar: candidate.avatar,
      candidateRole: candidate.role,
      hackathonName: team.hackathonName || 'TechNova Challenge 2026',
      role: candidate.role,
      date: 'Just now',
      status: 'Pending',
      reason: customNote || `Filling the ${candidate.role} skill gap for ${team.name}`
    };

    const newRecId = `inv-rec-sim-${Date.now()}`;
    const newRecInv = {
      id: newRecId,
      originalSentId: newSentId,
      candidateId: candidate.id,
      candidateName: candidate.name,
      teamName: team.name,
      hackathonName: team.hackathonName || 'TechNova Challenge 2026',
      invitedBy: currentUser.name,
      invitedByAvatar: currentUser.avatar,
      role: candidate.role,
      date: 'Just now',
      status: 'Pending',
      teamSize: `${team.members.length} / ${team.targetMembers} Members`,
      message: customNote || `Hi ${candidate.name}, Aarav invited you to join ${team.name} as our ${candidate.role}!`,
      isSimulatedCandidateResponse: true
    };

    setInvitations((prev) => ({
      received: [newRecInv, ...prev.received],
      sent: [newSentInv, ...prev.sent]
    }));

    addToast({
      type: 'success',
      title: 'Invitation Sent',
      message: `Invitation successfully sent to ${candidate.name}.`
    });

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Invitation Sent',
        message: `You invited ${candidate.name} (${candidate.role}) to join ${team.name}.`,
        time: 'Just now',
        read: false,
        type: 'info'
      },
      ...prev
    ]);

    setInviteModalCandidate(null);
  };

  const cancelSentInvitation = (invitationId) => {
    setInvitations((prev) => ({
      ...prev,
      sent: prev.sent.filter((inv) => inv.id !== invitationId),
      received: prev.received.filter((inv) => inv.originalSentId !== invitationId)
    }));
    addToast({
      type: 'warning',
      title: 'Invitation Cancelled',
      message: 'The invitation has been cancelled.'
    });
  };

  const acceptInvitation = (invitation) => {
    const candidateToJoin = candidates.find(
      (c) =>
        c.id === invitation.candidateId ||
        c.name.toLowerCase() === (invitation.candidateName || '').toLowerCase() ||
        (invitation.role === 'Data Scientist' && c.id === 'cand-neha') ||
        (invitation.role === 'UI/UX Designer' && c.id === 'cand-rohan')
    );

    if (candidateToJoin) {
      addCandidateToTeam(candidateToJoin);
    } else {
      addToast({
        type: 'success',
        title: 'Invitation Accepted',
        message: `You accepted the invitation from ${invitation.teamName || 'the team'}.`
      });
    }

    setInvitations((prev) => ({
      received: prev.received.filter((i) => i.id !== invitation.id),
      sent: prev.sent.map((i) =>
        (i.candidateId === invitation.candidateId || i.id === invitation.originalSentId)
          ? { ...i, status: 'Accepted' }
          : i
      )
    }));
  };

  const addCandidateToTeam = (candidate) => {
    if (team.members.some((m) => m.name === candidate.name)) {
      addToast({
        type: 'info',
        title: 'Already on Team',
        message: `${candidate.name} is already a member of ${team.name}.`
      });
      return;
    }

    const newMember = {
      id: `member-${candidate.id}`,
      name: candidate.name,
      avatar: candidate.avatar,
      role: candidate.role,
      isLead: false,
      department: `${candidate.department} · ${candidate.year}`,
      skills: candidate.skills.slice(0, 4),
      contribution: `Leading ${candidate.role} modules and architecture`
    };

    const updatedMembers = [...team.members, newMember];
    const newCount = updatedMembers.length;

    let newSkillMap = [...team.skillMap];
    let newCriticalGaps = [...team.criticalGaps];
    let newOverallCoverage = team.overallCoverage;

    if (candidate.role.includes('Data') || candidate.name.includes('Neha')) {
      newSkillMap = newSkillMap.map((s) =>
        s.name === 'Data Science' ? { ...s, coverage: 100, level: 'strong' } : s
      );
      newCriticalGaps = newCriticalGaps.filter((g) => g !== 'Data Science');
      newOverallCoverage = newCount >= 6 ? 98 : 86;
    }

    if (candidate.role.includes('UI/UX') || candidate.role.includes('Design') || candidate.name.includes('Rohan')) {
      newSkillMap = newSkillMap.map((s) =>
        s.name === 'UI/UX' ? { ...s, coverage: 100, level: 'strong' } : s
      );
      newCriticalGaps = newCriticalGaps.filter((g) => g !== 'UI/UX');
      newOverallCoverage = newSkillMap.some((s) => s.name === 'Data Science' && s.coverage === 100) ? 98 : 85;
    }

    const newOpenPositions = team.openPositions.filter(
      (pos) => !pos.role.toLowerCase().includes(candidate.role.toLowerCase().split(' ')[0])
    );

    const updatedChecklist = team.eligibilityStatus.checklist.map((item) => {
      if (candidate.role.includes('Data') && item.gapRole === 'Data Science') {
        return { ...item, passed: true, text: 'Data Science role covered (Neha Kapoor)' };
      }
      if ((candidate.role.includes('UI/UX') || candidate.role.includes('Design')) && item.gapRole === 'UI/UX') {
        return { ...item, passed: true, text: 'UI/UX role covered (Rohan Mehta)' };
      }
      if (item.text.includes('Minimum team size')) {
        return { ...item, text: `Minimum team size met (${newCount}/3)` };
      }
      return item;
    });

    const isFullyComplete = newCount >= team.targetMembers;
    const remainingSpots = Math.max(0, team.targetMembers - newCount);

    const updatedTeam = {
      ...team,
      members: updatedMembers,
      openPositions: newOpenPositions,
      skillMap: newSkillMap,
      criticalGaps: newCriticalGaps,
      overallCoverage: newOverallCoverage,
      status: isFullyComplete ? 'Ready' : 'Building',
      eligibilityStatus: {
        statusText: isFullyComplete
          ? 'Team Complete & Ready for Submission'
          : `Needs ${remainingSpots} more member${remainingSpots > 1 ? 's' : ''}`,
        isReady: isFullyComplete,
        checklist: updatedChecklist
      }
    };

    setTeam(updatedTeam);
    triggerCelebration();

    addToast({
      type: 'success',
      title: '🎉 Teammate Added!',
      message: `${candidate.name} joined Team Nova! Skill coverage increased to ${newOverallCoverage}%.`
    });

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Invitation Accepted',
        message: `${candidate.name} accepted your invitation! Team coverage jumped to ${newOverallCoverage}%.`,
        time: 'Just now',
        read: false,
        type: 'success'
      },
      ...prev
    ]);
  };

  const declineInvitation = (invitationId) => {
    setInvitations((prev) => ({
      ...prev,
      received: prev.received.filter((i) => i.id !== invitationId)
    }));
    addToast({
      type: 'info',
      title: 'Invitation Declined',
      message: 'The invitation has been declined.'
    });
  };

  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast({
      type: 'info',
      title: 'Notifications Updated',
      message: 'All notifications marked as read.'
    });
  };

  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem(STORAGE_KEYS.TEAM);
    localStorage.removeItem(STORAGE_KEYS.CANDIDATES);
    localStorage.removeItem(STORAGE_KEYS.HACKATHONS);
    localStorage.removeItem(STORAGE_KEYS.INVITATIONS);
    localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);
    localStorage.removeItem('skillsync_db_teams_v2');
    localStorage.removeItem('skillsync_db_members_v2');
    localStorage.removeItem('skillsync_db_saved_hackathons_v2');

    setCurrentUser(initialCurrentUser);
    setTeam(initialTeam);
    setCandidates(initialCandidates);
    setHackathons(initialHackathons);
    setInvitations(initialInvitations);
    setNotifications(initialNotifications);
    setSavedHackathons([]);
    refreshDbTeams();

    addToast({
      type: 'info',
      title: 'Demo Data Reset',
      message: 'Application reset to pristine presentation state (4/6 members, 74% coverage).'
    });
  };

  return (
    <AppContext.Provider
      value={{
        authState,
        currentUser,
        setCurrentUser,
        team,
        setTeam,
        dbTeams,
        refreshDbTeams,
        createTeam,
        savedHackathons,
        toggleSaveHackathon,
        candidates,
        setCandidates,
        hackathons,
        setHackathons,
        invitations,
        notifications,
        toasts,
        addToast,
        removeToast,
        activeProfileCandidate,
        setActiveProfileCandidate,
        inviteModalCandidate,
        setInviteModalCandidate,
        isCreateTeamOpen,
        setIsCreateTeamOpen,
        createTeamInitialHackathon,
        setCreateTeamInitialHackathon,
        openCreateTeamModal,
        isEditProfileOpen,
        setIsEditProfileOpen,
        isNotificationsOpen,
        setIsNotificationsOpen,
        authPromptModal,
        setAuthPromptModal,
        login,
        signup,
        logout,
        requireAuth,
        sendInvitation,
        cancelSentInvitation,
        acceptInvitation,
        declineInvitation,
        addCandidateToTeam,
        markNotificationRead,
        markAllNotificationsRead,
        resetDemoData,
        triggerCelebration
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
