-- ========================================================
-- SKILLSYNC RELATIONAL DATABASE SCHEMA (MySQL 8.0+)
-- Matches the Project ER Model & Business Rules
-- ========================================================

CREATE DATABASE IF NOT EXISTS skillsync_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE skillsync_db;

-- --------------------------------------------------------
-- 1. ADMIN / FACULTY ENTITY
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS ADMIN_FACULTY (
    Admin_ID VARCHAR(50) PRIMARY KEY,
    Admin_Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- 2. HACKATHON ENTITY
-- Created by ADMIN_FACULTY (1:N)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS HACKATHON (
    Hack_ID VARCHAR(50) PRIMARY KEY,
    Hack_Name VARCHAR(150) NOT NULL,
    Start_Date DATE NOT NULL,
    End_Date DATE NOT NULL,
    Min_Team_Size INT NOT NULL DEFAULT 3,
    Max_Team_Size INT NOT NULL DEFAULT 6,
    Status ENUM('Open', 'Upcoming', 'Completed') DEFAULT 'Open',
    Admin_ID VARCHAR(50),
    Tagline VARCHAR(255),
    Prize_Pool VARCHAR(50),
    Mode ENUM('Hybrid', 'Online', 'In-Person') DEFAULT 'Hybrid',
    Location VARCHAR(150),
    Registration_Deadline DATE,
    Domains TEXT,
    Overview TEXT,
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Admin_ID) REFERENCES ADMIN_FACULTY(Admin_ID) ON DELETE SET NULL
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- 3. STUDENT ENTITY
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS STUDENT (
    Stu_ID VARCHAR(50) PRIMARY KEY,
    Stu_Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Password_Hash VARCHAR(255) NOT NULL,
    Department VARCHAR(100) NOT NULL,
    Year VARCHAR(20) NOT NULL,
    Availability_Status ENUM('Available', 'Busy') DEFAULT 'Available',
    University VARCHAR(150) DEFAULT 'National Institute of Technology',
    Primary_Role VARCHAR(100) DEFAULT 'Full-Stack Developer',
    Bio TEXT,
    Avatar VARCHAR(10) DEFAULT 'ST',
    Github VARCHAR(150),
    Linkedin VARCHAR(150),
    Portfolio VARCHAR(150),
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- 4. SKILLS_DICTIONARY ENTITY
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS SKILLS_DICTIONARY (
    Skill_ID VARCHAR(50) PRIMARY KEY,
    Skill_Name VARCHAR(100) NOT NULL UNIQUE,
    Skill_Category VARCHAR(50),
    Skill_Description TEXT
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- 5. STUDENT_SKILLS JUNCTION TABLE
-- M:N between STUDENT and SKILLS_DICTIONARY
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS STUDENT_SKILLS (
    Stu_ID VARCHAR(50) NOT NULL,
    Skill_ID VARCHAR(50) NOT NULL,
    Proficiency_Level VARCHAR(30) DEFAULT 'Advanced',
    PRIMARY KEY (Stu_ID, Skill_ID),
    FOREIGN KEY (Stu_ID) REFERENCES STUDENT(Stu_ID) ON DELETE CASCADE,
    FOREIGN KEY (Skill_ID) REFERENCES SKILLS_DICTIONARY(Skill_ID) ON DELETE CASCADE
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- 6. TEAM ENTITY
-- Belongs to HACKATHON (1:N) and created by STUDENT (1:N)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS TEAM (
    Team_ID VARCHAR(50) PRIMARY KEY,
    Team_Name VARCHAR(100) NOT NULL,
    Description TEXT,
    Status ENUM('Building', 'Ready', 'Full') DEFAULT 'Building',
    Hack_ID VARCHAR(50) NOT NULL,
    Created_By VARCHAR(50) NOT NULL,
    Min_Team_Size INT NOT NULL DEFAULT 3,
    Max_Team_Size INT NOT NULL DEFAULT 6,
    University_Preference VARCHAR(100) DEFAULT 'Open to all colleges',
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Hack_ID) REFERENCES HACKATHON(Hack_ID) ON DELETE CASCADE,
    FOREIGN KEY (Created_By) REFERENCES STUDENT(Stu_ID) ON DELETE CASCADE
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- 7. TEAM_MEMBERS JUNCTION TABLE
-- M:N between TEAM and STUDENT
-- Includes Role and Membership_Status (Active, Invited, Pending)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS TEAM_MEMBERS (
    Team_ID VARCHAR(50) NOT NULL,
    Stu_ID VARCHAR(50) NOT NULL,
    Role VARCHAR(50) NOT NULL,
    Membership_Status ENUM('Active', 'Invited', 'Pending') DEFAULT 'Active',
    Invitation_Note TEXT,
    Joined_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (Team_ID, Stu_ID),
    FOREIGN KEY (Team_ID) REFERENCES TEAM(Team_ID) ON DELETE CASCADE,
    FOREIGN KEY (Stu_ID) REFERENCES STUDENT(Stu_ID) ON DELETE CASCADE
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- 8. TEAM_REQUIREMENTS JUNCTION TABLE
-- M:N between TEAM and SKILLS_DICTIONARY (Requires / Refers_To)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS TEAM_REQUIREMENTS (
    Team_ID VARCHAR(50) NOT NULL,
    Skill_ID VARCHAR(50) NOT NULL,
    Required_Level VARCHAR(30) DEFAULT 'Intermediate',
    Priority ENUM('Critical Gap', 'High', 'Medium', 'Low') DEFAULT 'Critical Gap',
    PRIMARY KEY (Team_ID, Skill_ID),
    FOREIGN KEY (Team_ID) REFERENCES TEAM(Team_ID) ON DELETE CASCADE,
    FOREIGN KEY (Skill_ID) REFERENCES SKILLS_DICTIONARY(Skill_ID) ON DELETE CASCADE
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- 9. AUXILIARY: SAVED_HACKATHONS
-- Tracks bookmarked hackathons per student
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS SAVED_HACKATHONS (
    Stu_ID VARCHAR(50) NOT NULL,
    Hack_ID VARCHAR(50) NOT NULL,
    Saved_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (Stu_ID, Hack_ID),
    FOREIGN KEY (Stu_ID) REFERENCES STUDENT(Stu_ID) ON DELETE CASCADE,
    FOREIGN KEY (Hack_ID) REFERENCES HACKATHON(Hack_ID) ON DELETE CASCADE
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- 10. AUXILIARY: TEAM_MESSAGES
-- Persists team discussions in Team Chat
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS TEAM_MESSAGES (
    Message_ID VARCHAR(50) PRIMARY KEY,
    Team_ID VARCHAR(50) NOT NULL,
    Stu_ID VARCHAR(50) NOT NULL,
    Message_Text TEXT NOT NULL,
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Team_ID) REFERENCES TEAM(Team_ID) ON DELETE CASCADE,
    FOREIGN KEY (Stu_ID) REFERENCES STUDENT(Stu_ID) ON DELETE CASCADE
) ENGINE=InnoDB;
