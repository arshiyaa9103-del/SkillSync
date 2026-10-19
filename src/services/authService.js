import { initialCurrentUser } from '../data/mockData';

const AUTH_STORAGE_KEY = 'skillsync_auth';
const REGISTERED_USERS_KEY = 'skillsync_registered_users_v2';

// Demo credentials specified by requirements
export const DEMO_CREDENTIALS = {
  email: 'AARAVMEHTA@GMAIL.COM',
  password: 'SYNC@1234'
};

export const authService = {
  // Get current logged-in user and authentication status
  getAuthState() {
    try {
      const data = localStorage.getItem(AUTH_STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (parsed && parsed.isAuthenticated) {
          return {
            isAuthenticated: true,
            userId: parsed.userId,
            email: parsed.email,
            user: parsed.user
          };
        }
      }
    } catch {
      // Fallback
    }

    return {
      isAuthenticated: false,
      userId: null,
      email: null,
      user: null
    };
  },

  // Perform login
  async login(email, password) {
    const cleanEmail = (email || '').trim().toUpperCase();
    const cleanPass = (password || '').trim();

    // Check demo credentials
    if (cleanEmail === DEMO_CREDENTIALS.email && cleanPass === DEMO_CREDENTIALS.password) {
      const authData = {
        isAuthenticated: true,
        userId: 'aarav-demo',
        email: DEMO_CREDENTIALS.email,
        user: {
          id: 'aarav-demo',
          name: initialCurrentUser.name,
          email: DEMO_CREDENTIALS.email,
          avatar: initialCurrentUser.avatar,
          role: initialCurrentUser.role,
          year: initialCurrentUser.year,
          department: initialCurrentUser.department,
          university: initialCurrentUser.university,
          badge: initialCurrentUser.badge
        }
      };

      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
      return { user: authData.user, error: null };
    }

    // Check any registered accounts
    const registered = JSON.parse(localStorage.getItem(REGISTERED_USERS_KEY) || '[]');
    const matched = registered.find(
      (u) => u.email.toUpperCase() === cleanEmail && u.passwordHash === btoa(cleanPass)
    );

    if (matched) {
      const authData = {
        isAuthenticated: true,
        userId: matched.id,
        email: matched.email,
        user: {
          id: matched.id,
          name: matched.full_name,
          email: matched.email,
          avatar: matched.full_name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .substring(0, 2)
            .toUpperCase(),
          role: matched.primary_role || 'Developer',
          year: matched.year || 'Year 2',
          department: matched.branch || matched.course || 'Computer Science',
          university: matched.university || 'Tech University',
          badge: 'Available for Hackathons'
        }
      };

      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
      return { user: authData.user, error: null };
    }

    return {
      user: null,
      error: 'Invalid email or password. Please check your credentials or use the Demo User option.'
    };
  },

  // Perform sign up
  async signup(formData) {
    const {
      fullName,
      email,
      password,
      confirmPassword,
      university,
      course,
      year,
      branch,
      primaryRole,
      skills,
      agreedToTerms
    } = formData;

    // Validations
    if (!fullName || !email || !password || !confirmPassword || !university || !course || !year || !branch) {
      return { user: null, error: 'Please fill in all required fields.' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { user: null, error: 'Please enter a valid email address.' };
    }

    if (password.length < 6) {
      return { user: null, error: 'Password must be at least 6 characters long.' };
    }

    if (password !== confirmPassword) {
      return { user: null, error: 'Passwords do not match.' };
    }

    if (!agreedToTerms) {
      return { user: null, error: 'You must agree to the SkillSync terms and privacy policy.' };
    }

    // Check if email already exists
    const registered = JSON.parse(localStorage.getItem(REGISTERED_USERS_KEY) || '[]');
    if (
      email.toUpperCase() === DEMO_CREDENTIALS.email ||
      registered.some((u) => u.email.toUpperCase() === email.toUpperCase())
    ) {
      return { user: null, error: 'An account with this email address already exists.' };
    }

    // Create user profile record (without storing plain text password)
    const newUserId = `usr-${Date.now().toString(36)}`;
    const initials = fullName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    const newUserRecord = {
      id: newUserId,
      full_name: fullName,
      email: email,
      passwordHash: btoa(password), // simple base64 obfuscation for frontend demo
      university,
      course,
      year,
      branch,
      primary_role: primaryRole || 'Full Stack Developer',
      skills: Array.isArray(skills) ? skills : (skills || '').split(',').map((s) => s.trim()).filter(Boolean),
      created_at: new Date().toISOString()
    };

    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify([...registered, newUserRecord]));

    // Auto log in newly registered user
    const authData = {
      isAuthenticated: true,
      userId: newUserId,
      email: email,
      user: {
        id: newUserId,
        name: fullName,
        email: email,
        avatar: initials,
        role: primaryRole || 'Developer',
        year,
        department: branch || course,
        university,
        badge: 'Available for Hackathons'
      }
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
    return { user: authData.user, error: null };
  },

  // Perform logout
  logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return { success: true };
  }
};
