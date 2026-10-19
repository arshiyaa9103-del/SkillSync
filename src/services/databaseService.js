import { createClient } from '@supabase/supabase-js';
import { initialTeam, initialHackathons, initialCurrentUser } from '../data/mockData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('http') &&
  !supabaseUrl.includes('your_supabase_project_url')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Local persistent keys for fallback demo mode
const STORAGE_KEYS = {
  TEAMS: 'skillsync_db_teams_v2',
  MEMBERS: 'skillsync_db_members_v2',
  SAVED_HACKATHONS: 'skillsync_db_saved_hackathons_v2',
};

// Seed initial data if not already present in localStorage
const initializeLocalStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.TEAMS)) {
    // Seed Team Nova
    const defaultTeams = [
      {
        id: initialTeam.id,
        name: initialTeam.name,
        description: initialTeam.description,
        hackathon_id: initialTeam.hackathonId,
        hackathon_name: initialTeam.hackathonName,
        leader_id: 'aarav-demo',
        leader_name: initialTeam.teamLead,
        min_team_size: initialTeam.minMembers,
        max_team_size: initialTeam.targetMembers,
        required_roles: ['Data Scientist', 'UI/UX Designer'],
        required_skills: ['Python', 'Pandas', 'Figma', 'UI/UX'],
        status: initialTeam.status,
        overall_coverage: initialTeam.overallCoverage,
        critical_gaps: initialTeam.criticalGaps,
        created_at: new Date('2026-10-01').toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
    localStorage.setItem(STORAGE_KEYS.TEAMS, JSON.stringify(defaultTeams));
  }

  if (!localStorage.getItem(STORAGE_KEYS.MEMBERS)) {
    const defaultMembers = initialTeam.members.map((m) => ({
      id: `mem-${m.id}`,
      team_id: initialTeam.id,
      user_id: m.id === 'user-aarav' ? 'aarav-demo' : m.id,
      name: m.name,
      avatar: m.avatar,
      role: m.role,
      is_lead: m.isLead,
      department: m.department,
      skills: m.skills,
      joined_at: new Date('2026-10-01').toISOString()
    }));
    localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(defaultMembers));
  }
};

initializeLocalStorage();

// ==========================================
// TEAMS API
// ==========================================

export const databaseService = {
  // Fetch all teams
  async getTeams() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('teams')
          .select('*, profiles:leader_id(full_name), hackathons:hackathon_id(name)');
        if (!error && data && data.length > 0) {
          return { data, error: null };
        }
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local storage:', err);
      }
    }

    const localTeams = JSON.parse(localStorage.getItem(STORAGE_KEYS.TEAMS) || '[]');
    const localMembers = JSON.parse(localStorage.getItem(STORAGE_KEYS.MEMBERS) || '[]');

    // Enrich with member count
    const enriched = localTeams.map((team) => {
      const members = localMembers.filter((m) => m.team_id === team.id);
      return {
        ...team,
        member_count: members.length,
        members
      };
    });

    return { data: enriched, error: null };
  },

  // Fetch team by ID
  async getTeamById(teamId) {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('teams')
          .select('*, profiles:leader_id(full_name), team_members(*)')
          .eq('id', teamId)
          .single();
        if (!error && data) {
          return { data, error: null };
        }
      } catch (err) {
        console.warn('Supabase getTeamById failed, falling back to local storage:', err);
      }
    }

    const localTeams = JSON.parse(localStorage.getItem(STORAGE_KEYS.TEAMS) || '[]');
    const localMembers = JSON.parse(localStorage.getItem(STORAGE_KEYS.MEMBERS) || '[]');

    const team = localTeams.find((t) => t.id === teamId);
    if (!team) {
      return { data: null, error: 'Team not found' };
    }

    const members = localMembers.filter((m) => m.team_id === teamId);
    return {
      data: {
        ...team,
        members,
        member_count: members.length
      },
      error: null
    };
  },

  // Create a new team and persist to DB
  async createTeam(teamPayload) {
    const {
      name,
      description,
      hackathon_id,
      hackathon_name,
      leader_id,
      leader_name,
      leader_avatar = 'U',
      leader_role = 'Team Lead',
      min_team_size = 3,
      max_team_size = 6,
      required_roles = [],
      required_skills = []
    } = teamPayload;

    const newTeamId = `team-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
    const now = new Date().toISOString();

    const newTeamRecord = {
      id: newTeamId,
      name,
      description: description || `Building a project for ${hackathon_name || 'the hackathon'}.`,
      hackathon_id: hackathon_id || null,
      hackathon_name: hackathon_name || 'Open Challenge',
      leader_id: leader_id || 'aarav-demo',
      leader_name: leader_name || 'Aarav Mehta',
      min_team_size: Number(min_team_size) || 3,
      max_team_size: Number(max_team_size) || 6,
      required_roles,
      required_skills,
      status: 'Building',
      overall_coverage: 50,
      critical_gaps: required_roles.slice(0, 3),
      created_at: now,
      updated_at: now
    };

    const newMemberRecord = {
      id: `mem-${Date.now().toString(36)}`,
      team_id: newTeamId,
      user_id: leader_id || 'aarav-demo',
      name: leader_name || 'Aarav Mehta',
      avatar: leader_avatar || 'AM',
      role: leader_role || 'Team Lead',
      is_lead: true,
      department: 'Computer Science',
      skills: ['Full Stack', 'System Design'],
      joined_at: now
    };

    // If Supabase is active, try writing to cloud first
    if (isSupabaseConfigured) {
      try {
        const { error: teamError } = await supabase.from('teams').insert([
          {
            id: newTeamRecord.id,
            name: newTeamRecord.name,
            description: newTeamRecord.description,
            hackathon_id: newTeamRecord.hackathon_id,
            leader_id: newTeamRecord.leader_id,
            min_team_size: newTeamRecord.min_team_size,
            max_team_size: newTeamRecord.max_team_size,
            required_roles: newTeamRecord.required_roles,
            required_skills: newTeamRecord.required_skills,
            status: newTeamRecord.status
          }
        ]);

        if (!teamError) {
          await supabase.from('team_members').insert([
            {
              id: newMemberRecord.id,
              team_id: newMemberRecord.team_id,
              user_id: newMemberRecord.user_id,
              role: newMemberRecord.role,
              status: 'Active'
            }
          ]);
        }
      } catch (err) {
        console.warn('Supabase insert failed, keeping in local storage:', err);
      }
    }

    // Always keep updated in local storage for instant sync & offline resilience
    const localTeams = JSON.parse(localStorage.getItem(STORAGE_KEYS.TEAMS) || '[]');
    const localMembers = JSON.parse(localStorage.getItem(STORAGE_KEYS.MEMBERS) || '[]');

    localStorage.setItem(STORAGE_KEYS.TEAMS, JSON.stringify([newTeamRecord, ...localTeams]));
    localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify([...localMembers, newMemberRecord]));

    return {
      data: {
        ...newTeamRecord,
        members: [newMemberRecord],
        member_count: 1
      },
      error: null
    };
  },

  // Save / Bookmark a hackathon
  saveHackathon(hackathonId) {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.SAVED_HACKATHONS) || '[]');
    if (!saved.includes(hackathonId)) {
      const updated = [...saved, hackathonId];
      localStorage.setItem(STORAGE_KEYS.SAVED_HACKATHONS, JSON.stringify(updated));
      return { isSaved: true, saved: updated };
    } else {
      const updated = saved.filter((id) => id !== hackathonId);
      localStorage.setItem(STORAGE_KEYS.SAVED_HACKATHONS, JSON.stringify(updated));
      return { isSaved: false, saved: updated };
    }
  },

  getSavedHackathonIds() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.SAVED_HACKATHONS) || '[]');
  }
};
