-- ========================================================
-- SKILLSYNC SUPABASE DATABASE SCHEMA
-- Run this script in your Supabase SQL Editor
-- ========================================================

-- 1. PROFILES (USERS)
CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  university TEXT,
  course TEXT,
  year TEXT,
  branch TEXT,
  location TEXT,
  bio TEXT,
  primary_role TEXT,
  skills TEXT[] DEFAULT '{}',
  availability TEXT DEFAULT 'Available',
  github TEXT,
  linkedin TEXT,
  portfolio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. HACKATHONS
CREATE TABLE IF NOT EXISTS hackathons (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  organizer TEXT,
  university TEXT,
  start_date DATE,
  end_date DATE,
  registration_deadline DATE,
  mode TEXT DEFAULT 'Hybrid',
  location TEXT,
  registration_fee TEXT DEFAULT 'Free',
  prize_pool TEXT,
  min_team_size INT DEFAULT 3,
  max_team_size INT DEFAULT 6,
  eligibility TEXT,
  university_restrictions TEXT,
  domains TEXT[] DEFAULT '{}',
  required_skills TEXT[] DEFAULT '{}',
  rules TEXT[] DEFAULT '{}',
  official_website TEXT,
  contact_email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TEAMS
CREATE TABLE IF NOT EXISTS teams (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  hackathon_id TEXT REFERENCES hackathons(id) ON DELETE SET NULL,
  leader_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  min_team_size INT DEFAULT 3,
  max_team_size INT DEFAULT 6,
  university_preference TEXT,
  required_roles TEXT[] DEFAULT '{}',
  required_skills TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'Building',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TEAM MEMBERS
CREATE TABLE IF NOT EXISTS team_members (
  id TEXT PRIMARY KEY,
  team_id TEXT REFERENCES teams(id) ON DELETE CASCADE,
  user_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'Active'
);

-- 5. TEAM JOIN REQUESTS
CREATE TABLE IF NOT EXISTS team_join_requests (
  id TEXT PRIMARY KEY,
  team_id TEXT REFERENCES teams(id) ON DELETE CASCADE,
  user_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  message TEXT,
  requested_role TEXT,
  status TEXT DEFAULT 'Pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TEAM INVITATIONS
CREATE TABLE IF NOT EXISTS team_invitations (
  id TEXT PRIMARY KEY,
  team_id TEXT REFERENCES teams(id) ON DELETE CASCADE,
  sender_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  receiver_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  message TEXT,
  status TEXT DEFAULT 'Pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE hackathons ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_join_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_invitations ENABLE ROW LEVEL SECURITY;

-- Allow public read/write access for demo environment
CREATE POLICY "Allow public read hackathons" ON hackathons FOR SELECT USING (true);
CREATE POLICY "Allow public read teams" ON teams FOR SELECT USING (true);
CREATE POLICY "Allow public insert teams" ON teams FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update teams" ON teams FOR UPDATE USING (true);

CREATE POLICY "Allow public read team_members" ON team_members FOR SELECT USING (true);
CREATE POLICY "Allow public insert team_members" ON team_members FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Allow public insert profiles" ON profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update profiles" ON profiles FOR UPDATE USING (true);

CREATE POLICY "Allow public read invitations" ON team_invitations FOR SELECT USING (true);
CREATE POLICY "Allow public insert invitations" ON team_invitations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update invitations" ON team_invitations FOR UPDATE USING (true);

CREATE POLICY "Allow public read join requests" ON team_join_requests FOR SELECT USING (true);
CREATE POLICY "Allow public insert join requests" ON team_join_requests FOR INSERT WITH CHECK (true);
