import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Avatar from './Avatar';
import Button from './Button';
import {
  Bell,
  ChevronDown,
  Menu,
  X,
  Compass,
  Trophy,
  Users,
  Layers,
  UserCheck,
  CheckCircle,
  Inbox,
  LogOut,
  RotateCcw,
  Sparkles,
  Bookmark,
  Home,
  LayoutDashboard,
  LogIn,
  UserPlus
} from 'lucide-react';

const Navbar = () => {
  const {
    authState,
    currentUser,
    team,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    resetDemoData,
    invitations,
    logout
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeAllDropdowns = () => {
    setNotificationsOpen(false);
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    closeAllDropdowns();
    logout();
    navigate('/');
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const pendingInvitesCount = invitations.received.length;

  // Logged in vs Logged out navigation links as requested
  const loggedInLinks = [
    { name: 'Home', to: '/', icon: Home },
    { name: 'Hackathons', to: '/hackathons', icon: Trophy },
    { name: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
    { name: 'Find Teammates', to: '/find-teammates', icon: Users },
    { name: 'Teams', to: '/teams', icon: Layers },
  ];

  const loggedOutLinks = [
    { name: 'Home', to: '/', icon: Home },
    { name: 'Hackathons', to: '/hackathons', icon: Trophy },
    { name: 'Teams', to: '/teams', icon: Layers },
  ];

  const navLinks = authState.isAuthenticated ? loggedInLinks : loggedOutLinks;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LEFT: SkillSync Logo */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              onClick={closeAllDropdowns}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#06B6D4] flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                {/* Modern two connected nodes icon */}
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="7" cy="12" r="3" fill="white" fillOpacity="0.3" />
                  <circle cx="17" cy="12" r="3" fill="white" fillOpacity="0.9" />
                  <path d="M10 12h4" strokeWidth="2.5" />
                  <circle cx="12" cy="7" r="1.5" fill="#84CC16" stroke="none" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
                  Skill<span className="text-[#2563EB]">Sync</span>
                </span>
                <span className="hidden sm:block text-[10px] text-[#64748B] font-medium tracking-wide uppercase">
                  Build smarter. Team better.
                </span>
              </div>
            </Link>
          </div>

          {/* CENTER: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.to}
                  onClick={closeAllDropdowns}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                      isActive
                        ? 'text-[#2563EB] bg-[#EFF6FF]'
                        : 'text-[#475569] hover:text-[#0F172A] hover:bg-slate-50'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 opacity-75" />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>

          {/* RIGHT: Auth Dependent State */}
          <div className="flex items-center gap-2 sm:gap-3">
            {authState.isAuthenticated ? (
              // ============================================
              // LOGGED IN RIGHT SECTION
              // ============================================
              <>
                {/* Team Invitations Link */}
                <Link
                  to="/invitations"
                  onClick={closeAllDropdowns}
                  className="relative p-2 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 transition-colors hidden sm:flex items-center"
                  title="Team Invitations"
                >
                  <Inbox className="w-5 h-5" />
                  {pendingInvitesCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#06B6D4] text-white text-[10px] font-bold flex items-center justify-center">
                      {pendingInvitesCount}
                    </span>
                  )}
                </Link>

                {/* Notifications Dropdown */}
                <div className="relative" ref={notifRef}>
                  <button
                    type="button"
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      setNotificationsOpen(!notificationsOpen);
                    }}
                    className="relative p-2 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 transition-colors focus:outline-none"
                    aria-label="View notifications"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#EF4444] ring-2 ring-white" />
                    )}
                  </button>

                  {notificationsOpen && (
                    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in zoom-in-95">
                      <div className="p-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-[#0F172A]">Notifications</span>
                          {unreadCount > 0 && (
                            <span className="px-2 py-0.5 rounded-full bg-blue-100 text-[#2563EB] text-xs font-bold">
                              {unreadCount} new
                            </span>
                          )}
                        </div>
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllNotificationsRead}
                            className="text-xs text-[#2563EB] hover:underline font-medium"
                          >
                            Mark all as read
                          </button>
                        )}
                      </div>

                      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                        {notifications.length === 0 ? (
                          <div className="p-6 text-center text-xs text-[#64748B]">
                            No notifications yet
                          </div>
                        ) : (
                          notifications.map((notif) => (
                            <div
                              key={notif.id}
                              onClick={() => markNotificationRead(notif.id)}
                              className={`p-3.5 transition-colors cursor-pointer hover:bg-slate-50 flex items-start gap-3 ${
                                !notif.read ? 'bg-[#EFF6FF]/40' : ''
                              }`}
                            >
                              <span
                                className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${
                                  notif.type === 'success'
                                    ? 'bg-emerald-500'
                                    : notif.type === 'warning'
                                    ? 'bg-amber-500'
                                    : 'bg-[#2563EB]'
                                }`}
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-[#0F172A]">{notif.title}</p>
                                <p className="text-xs text-[#475569] mt-0.5 line-clamp-2 leading-relaxed">
                                  {notif.message}
                                </p>
                                <span className="text-[10px] text-[#94A3B8] mt-1 block">
                                  {notif.time}
                                </span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      <div className="p-2 border-t border-slate-100 bg-slate-50 text-center">
                        <Link
                          to="/invitations"
                          onClick={closeAllDropdowns}
                          className="text-xs font-semibold text-[#2563EB] hover:underline inline-flex items-center gap-1"
                        >
                          View all invitations & alerts
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile Avatar & Dropdown */}
                <div className="relative" ref={profileRef}>
                  <button
                    type="button"
                    onClick={() => {
                      setNotificationsOpen(false);
                      setProfileDropdownOpen(!profileDropdownOpen);
                    }}
                    className="flex items-center gap-2.5 p-1 sm:px-2.5 sm:py-1.5 rounded-xl hover:bg-slate-100 transition-colors focus:outline-none"
                  >
                    <Avatar
                      name={currentUser.name}
                      initials={currentUser.avatar}
                      size="sm"
                      status="online"
                    />
                    <span className="hidden sm:inline-block text-sm font-bold text-[#0F172A]">
                      {currentUser.name}
                    </span>
                    <ChevronDown className="w-4 h-4 text-[#64748B] hidden sm:block" />
                  </button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in zoom-in-95">
                      <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                        <p className="text-sm font-bold text-[#0F172A]">{currentUser.name}</p>
                        <p className="text-xs text-[#64748B] truncate">{currentUser.email || authState.email || 'aaravmehta@gmail.com'}</p>
                        <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-[#16A34A] bg-[#F0FDF4] px-2 py-0.5 rounded-full border border-green-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                          {currentUser.badge || 'Available for Hackathons'}
                        </span>
                      </div>

                      <div className="p-1.5 text-xs space-y-0.5">
                        <Link
                          to="/profile"
                          onClick={closeAllDropdowns}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[#334155] hover:bg-slate-100 font-medium"
                        >
                          <UserCheck className="w-4 h-4 text-[#2563EB]" />
                          Profile
                        </Link>

                        <Link
                          to="/dashboard"
                          onClick={closeAllDropdowns}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[#334155] hover:bg-slate-100 font-medium"
                        >
                          <LayoutDashboard className="w-4 h-4 text-[#2563EB]" />
                          Dashboard
                        </Link>

                        <Link
                          to="/teams?filter=my-teams"
                          onClick={closeAllDropdowns}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[#334155] hover:bg-slate-100 font-medium"
                        >
                          <Layers className="w-4 h-4 text-[#2563EB]" />
                          My Teams
                        </Link>

                        <Link
                          to="/saved"
                          onClick={closeAllDropdowns}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[#334155] hover:bg-slate-100 font-medium"
                        >
                          <Bookmark className="w-4 h-4 text-[#2563EB]" />
                          Saved Hackathons
                        </Link>
                      </div>

                      {/* Logout Action */}
                      <div className="p-2 border-t border-slate-100 bg-slate-50 space-y-1">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            resetDemoData();
                            closeAllDropdowns();
                          }}
                          className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-[#64748B] hover:text-[#0F172A] transition-colors"
                        >
                          <RotateCcw className="w-3 h-3" />
                          Reset Demo Data
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              // ============================================
              // LOGGED OUT RIGHT SECTION
              // ============================================
              <div className="flex items-center gap-2">
                <Link to="/login" onClick={closeAllDropdowns}>
                  <Button variant="ghost" size="sm" icon={LogIn}>
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={closeAllDropdowns}>
                  <Button variant="primary" size="sm" icon={UserPlus} className="shadow-xs">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation slide-down menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-3">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.to}
                onClick={closeAllDropdowns}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-[#2563EB] bg-[#EFF6FF]'
                      : 'text-[#475569] hover:bg-slate-50'
                  }`
                }
              >
                <Icon className="w-5 h-5 text-[#2563EB]" />
                {item.name}
              </NavLink>
            );
          })}

          {authState.isAuthenticated ? (
            <div className="pt-2 border-t border-slate-100 space-y-1">
              <Link
                to="/invitations"
                onClick={closeAllDropdowns}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-[#475569] hover:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <Inbox className="w-5 h-5 text-[#2563EB]" />
                  Invitations
                </div>
                {pendingInvitesCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-[#2563EB] text-xs font-bold">
                    {pendingInvitesCount}
                  </span>
                )}
              </Link>

              <Link
                to="/profile"
                onClick={closeAllDropdowns}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-[#475569] hover:bg-slate-50"
              >
                <UserCheck className="w-5 h-5 text-[#2563EB]" />
                My Profile ({currentUser.name})
              </Link>

              <Link
                to="/saved"
                onClick={closeAllDropdowns}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-[#475569] hover:bg-slate-50"
              >
                <Bookmark className="w-5 h-5 text-[#2563EB]" />
                Saved Hackathons
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 text-left"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          ) : (
            <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
              <Link to="/login" onClick={closeAllDropdowns}>
                <Button variant="outline" size="sm" className="w-full" icon={LogIn}>
                  Login
                </Button>
              </Link>
              <Link to="/signup" onClick={closeAllDropdowns}>
                <Button variant="primary" size="sm" className="w-full" icon={UserPlus}>
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
