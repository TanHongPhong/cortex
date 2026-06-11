/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Routes, Route, Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  LayoutGrid,
  Users,
  BookOpen,
  PlayCircle,
  CheckSquare,
  Award,
  FileBadge,
  Library,
  ShoppingCart,
  CreditCard,
  FileText,
  Tag,
  UserPlus,
  Megaphone,
  MessageSquare,
  Activity,
  GitBranch,
  TrendingUp,
  Settings as SettingsIcon,
  UserCheck,
  LogOut,
  X,
  Menu,
  ChevronDown
} from 'lucide-react';

// Data Mock Sources
import {
  initialCourses,
  initialStudents,
  initialLeads,
  initialSubmissions
} from './data';

import { Course, Student, Lead, Submission } from './types';

// Page imports
import Overview from './pages/Overview';
import Courses from './pages/Courses';
import Lessons from './pages/Lessons';
import Students from './pages/Students';
import Leads from './pages/Leads';
import Submissions from './pages/Submissions';
import Payments from './pages/Payments';
import Certificates from './pages/Certificates';
import Templates from './pages/Templates';
import Resources from './pages/Resources';
import Coupons from './pages/Coupons';
import Reviews from './pages/Reviews';
import Referrals from './pages/Referrals';
import Announcements from './pages/Announcements';
import Audits from './pages/Audits';
import Orders from './pages/Orders';
import Invoices from './pages/Invoices';
import Revenue from './pages/Revenue';
import Settings from './pages/Settings';
import SystemUsers from './pages/SystemUsers';

export default function App() {
  // Mobile navigation trigger
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Global Theme Mode synchronization
  const [themeMode, setThemeMode] = useState(() => localStorage.getItem('themeMode') || 'dark');

  useEffect(() => {
    const root = document.documentElement;
    const applyTheme = (mode: string) => {
      if (mode === 'dark') {
        root.setAttribute('data-theme', 'dark');
        root.classList.add('dark');
      } else if (mode === 'system') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (isDark) {
          root.setAttribute('data-theme', 'dark');
          root.classList.add('dark');
        } else {
          root.removeAttribute('data-theme');
          root.classList.remove('dark');
        }
      } else {
        root.removeAttribute('data-theme');
        root.classList.remove('dark');
      }
    };

    applyTheme(themeMode);
    localStorage.setItem('themeMode', themeMode);

    // Dispatch custom event to sync other headers/settings
    window.dispatchEvent(new CustomEvent('themeModeChanged', { detail: { themeMode } }));

    if (themeMode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => applyTheme('system');
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [themeMode]);

  useEffect(() => {
    const handleThemeChange = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && detail.themeMode && detail.themeMode !== themeMode) {
        setThemeMode(detail.themeMode);
      }
    };
    window.addEventListener('themeModeChanged', handleThemeChange);
    return () => window.removeEventListener('themeModeChanged', handleThemeChange);
  }, [themeMode]);

  // Core synchronized application states
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions);

  // React Router integration
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Derived state from URL routing
  const path = location.pathname.substring(1).toLowerCase();
  const activeTab = path === '' ? 'overview' : path;

  // Deep-linking parameters read from search params
  const selectedCourseId = searchParams.get('courseId') || undefined;
  const selectedStudentId = searchParams.get('studentId') || undefined;
  const selectedSubmissionId = searchParams.get('submissionId') || undefined;

  // Smooth scroll to Certificates section if URL contains certId or #certificates
  useEffect(() => {
    if (location.pathname === '/templates' && (location.search.includes('certId') || location.hash === '#certificates')) {
      const timer = setTimeout(() => {
        const el = document.getElementById('certificates-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300); // Small timeout to ensure DOM has fully rendered
      return () => clearTimeout(timer);
    }
  }, [location]);

  // Course handlers
  const handleCreateCourse = (newCourse: Course) => {
    setCourses(prev => [newCourse, ...prev]);
  };

  const handleUpdateCourse = (updatedCourse: Course) => {
    setCourses(prev => prev.map(c => c.id === updatedCourse.id ? updatedCourse : c));
  };

  // Student handlers
  const handleCreateStudent = (newStudent: Student) => {
    setStudents(prev => [newStudent, ...prev]);
  };

  const handleUpdateStudent = (updatedStudent: Student) => {
    setStudents(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
  };

  // Automatic course allocation upon payment success
  const handleEnrollStudent = (studentEmail: string, courseCode: string) => {
    const courseMap: Record<string, string> = {
      'ai': 'AI Agent & Vibe Coding Bootcamp',
      'full': 'Fullstack Web Development',
      'be': 'Backend & Cloud System Architecture',
    };
    const courseName = courseMap[courseCode] || 'AI Agent & Vibe Coding Bootcamp';

    setStudents(prev => prev.map(student => {
      if (student.email.toLowerCase() === studentEmail.toLowerCase()) {
        const hasCourse = student.courses.some(c => c.name.toLowerCase() === courseName.toLowerCase());
        if (!hasCourse) {
          return {
            ...student,
            courses: [
              ...student.courses,
              {
                name: courseName,
                status: 'Active',
                statusClass: 'badge-green',
                progress: 0,
                progressClass: 'orange',
                date: new Date().toLocaleDateString('vi-VN')
              }
            ]
          };
        }
      }
      return student;
    }));
  };

  // Leads handlers
  const handleCreateLead = (newLead: Lead) => {
    setLeads(prev => [newLead, ...prev]);
  };

  const handleUpdateLead = (updatedLead: Lead) => {
    setLeads(prev => prev.map(l => l.email === updatedLead.email ? updatedLead : l));
  };

  // Converter lead directly into student in Student CRM!
  const handleConvertLeadToStudent = (leadToConvert: Lead) => {
    // 1. Mark lead as contacted/converted
    setLeads(prev => prev.map(l => {
      if (l.email === leadToConvert.email) {
        return {
          ...l,
          status: 'contacted' as const,
          statusName: 'ĐÃ CHUYỂN ĐỔI'
        };
      }
      return l;
    }));

    // 2. Add as fresh active Student in CRM
    const newStudentId = String(students.length + 1);
    const newStudent: Student = {
      id: newStudentId,
      name: leadToConvert.name,
      email: leadToConvert.email,
      phone: leadToConvert.phone,
      status: 'Active',
      statusClass: 'badge-green',
      createdAt: new Date().toLocaleDateString('vi-VN'),
      updatedAt: new Date().toLocaleDateString('vi-VN') + ' ' + '12:00',
      avatar: leadToConvert.initials || 'ST',
      avatarClass: 'bg-indigo-600',
      needCourse: leadToConvert.needs || 'AI Agent & Vibe Coding Bootcamp',
      needLevel: 'Chuyển đổi từ Prospect',
      needGoal: 'Tích hợp tự động hóa',
      needNote: leadToConvert.note || 'Nhận thông tin qua Form Leads.',
      courses: [
        {
          name: leadToConvert.needs || "AI Agent & Vibe Coding Bootcamp",
          status: "Active",
          statusClass: "badge-green",
          progress: 5,
          progressClass: "orange",
          date: new Date().toLocaleDateString('vi-VN')
        }
      ],
      lessons: "0 / 24 bài",
      quiz: "—",
      time: "—",
      exercises: "—",
      submissions: [],
      certificates: [],
      notes: "Lead chuyển đổi từ chiến dịch marketing."
    };

    setStudents(prev => [newStudent, ...prev]);
    handleGlobalNavigation('students'); // Jump straight into students CRM
  };

  // Submissions handlers
  const handleCreateSubmission = (newSub: Submission) => {
    setSubmissions(prev => [newSub, ...prev]);
  };

  const handleUpdateSubmission = (updatedSub: Submission) => {
    setSubmissions(prev => prev.map(s => s.id === updatedSub.id ? updatedSub : s));
  };

  // Flat list of navigation items grouped by category
  const menuCategories = [
    {
      title: 'ACADEMY OPERATIONS',
      items: [
        { id: 'overview', name: 'Overview', icon: LayoutGrid },
        { id: 'students', name: 'Students', icon: Users },
        { id: 'leads', name: 'Leads', icon: UserPlus },
        { id: 'courses', name: 'Courses', icon: BookOpen },
        { id: 'lessons', name: 'Lessons', icon: PlayCircle },
        { id: 'submissions', name: 'Submissions', icon: CheckSquare }
      ]
    },
    {
      title: 'FINANCE & GROWTH',
      items: [
        { id: 'revenue', name: 'Revenue', icon: TrendingUp },
        { id: 'orders', name: 'Orders', icon: ShoppingCart },
        { id: 'payments', name: 'Payments', icon: CreditCard },
        { id: 'invoices', name: 'Invoices', icon: FileText },
        { id: 'coupons', name: 'Coupons', icon: Tag },
        { id: 'referrals', name: 'Referrals', icon: GitBranch }
      ]
    },
    {
      title: 'CREDENTIALS & DESIGN',
      items: [
        { id: 'certificates', name: 'Certificates', icon: Award },
        { id: 'templates', name: 'Templates', icon: FileBadge }
      ]
    },
    {
      title: 'CHANNELS & RESOURCES',
      items: [
        { id: 'announcements', name: 'Announcements', icon: Megaphone },
        { id: 'reviews', name: 'Reviews', icon: MessageSquare },
        { id: 'resources', name: 'Resources', icon: Library }
      ]
    },
    {
      title: 'SYSTEM & CONFIG',
      items: [
        { id: 'settings', name: 'Settings', icon: SettingsIcon },
        { id: 'system-users', name: 'System Users', icon: UserCheck },
        { id: 'audits', name: 'Audit Logs', icon: Activity }
      ]
    }
  ];

  // Global Navigation Coordinator
  const handleGlobalNavigation = (tab: string, params?: any) => {
    let targetTab = tab.toLowerCase();
    
    setIsSidebarOpen(false);

    // Build URL queries for deep link parameters
    const sp = new URLSearchParams();
    if (params) {
      if (params.selectedCourseId) {
        sp.set('courseId', params.selectedCourseId);
      }
      if (params.selectedStudentId) {
        sp.set('studentId', params.selectedStudentId);
      }
      if (params.selectedId || params.selectedSubmissionId) {
        sp.set('submissionId', params.selectedId || params.selectedSubmissionId);
      }
      if (params.selectedCertId) {
        sp.set('certId', params.selectedCertId);
      }
      if (params.statusFilter) {
        sp.set('statusFilter', params.statusFilter);
      }
    }
    
    const queryString = sp.toString();
    navigate('/' + targetTab + (queryString ? '?' + queryString : ''));
  };



  return (
    <div className="app-container">
      
      {/* SIDEBAR FOR DESKTOP */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        
        {/* Workspace Brand profile */}
        <div className="sidebar-brand flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="blueprint-brand-mark" aria-hidden="true" />
            <span className="font-sans font-black text-sm uppercase tracking-widest text-[var(--text-primary)]" style={{ fontFamily: '"Inter", sans-serif' }}>
              Blueprint
            </span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-md hover:bg-[var(--sidebar-active-bg)] transition-colors text-[var(--text-secondary)]"
            title="Đóng sidebar"
          >
            <X size={15} />
          </button>
        </div>

        {/* Categorized List element */}
        <nav className="sidebar-nav custom-scrollbar select-none">
          {menuCategories.map((category) => (
            <div key={category.title} className="sidebar-category">
              <div className="sidebar-category-title">{category.title}</div>
              <ul className="sidebar-category-list list-none p-0 m-0">
                {category.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  
                  // Color map for navigation icons
                  const iconColors: Record<string, string> = {
                    overview: '#3b82f6', // Blue
                    students: '#10b981', // Emerald
                    leads: '#ec4899', // Pink
                    courses: '#8b5cf6', // Purple
                    lessons: '#f59e0b', // Amber
                    submissions: '#06b6d4', // Cyan
                    revenue: '#10b981', // Emerald
                    orders: '#8b5cf6', // Purple
                    payments: '#f59e0b', // Amber
                    invoices: '#06b6d4', // Cyan
                    coupons: '#ec4899', // Pink
                    referrals: '#ef4444', // Red
                    certificates: '#f59e0b', // Amber
                    templates: '#3b82f6', // Blue
                    announcements: '#8b5cf6', // Purple
                    reviews: '#f59e0b', // Amber
                    resources: '#10b981', // Emerald
                    settings: '#64748b', // Slate
                    'system-users': '#3b82f6', // Blue
                    audits: '#ef4444' // Red
                  };
                  const iconColor = iconColors[item.id] || '#64748b';

                  return (
                    <li key={item.id} className="list-none">
                      <button
                        onClick={() => handleGlobalNavigation(item.id)}
                        className={`sidebar-link w-full ${isActive ? 'active' : ''}`}
                      >
                        <Icon size={16} style={{ color: iconColor }} />
                        <span>{item.name}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Logging Admin user details */}
        <div className="sidebar-footer">
          <div className="sidebar-user-row">
            <div className="flex items-center gap-3 min-w-0">
              <div className="sidebar-avatar-circle">
                HP
              </div>
              <div className="sidebar-user-details">
                <span className="sidebar-user-name">Tân Hồng Phong</span>
                <span className="sidebar-user-email">tanhongphong30@gmail.com</span>
              </div>
            </div>
            <button
              onClick={() => alert("Hồ sơ hệ thống được khóa an toàn bởi JWT.")}
              className="sidebar-logout-btn"
              title="Đóng phiên làm việc"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* BACKDROP INTERCEPT FOR MOBILE SIDEBAR */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-30 lg:hidden"
        />
      )}

      {/* MAIN LAYOUT BODY VIEWPORT */}
      <main className="main-viewport" id="viewport-canvas-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="viewport-anim-wrapper"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
            >
              <Routes location={location}>
              <Route path="/" element={<Navigate to="/overview" replace />} />
              <Route path="/overview" element={
                <Overview
                  students={students}
                  submissions={submissions}
                  onNavigate={handleGlobalNavigation}
                  onToggleSidebar={() => setIsSidebarOpen(true)}
                />
              } />
              <Route path="/students" element={
                <Students
                  students={students}
                  onUpdateStudents={setStudents}
                  onNavigate={handleGlobalNavigation}
                  selectedStudentId={selectedStudentId}
                  onToggleSidebar={() => setIsSidebarOpen(true)}
                />
              } />
              <Route path="/leads" element={
                <Leads
                  leads={leads}
                  onCreateLead={handleCreateLead}
                  onUpdateLead={handleUpdateLead}
                  onConvertLead={handleConvertLeadToStudent}
                  onToggleSidebar={() => setIsSidebarOpen(true)}
                />
              } />
              <Route path="/courses" element={
                <Courses
                  courses={courses}
                  onAddCourse={handleCreateCourse}
                  onNavigate={handleGlobalNavigation}
                  onToggleSidebar={() => setIsSidebarOpen(true)}
                />
              } />
              <Route path="/lessons" element={
                <Lessons 
                  courses={courses} 
                  selectedCourseId={selectedCourseId} 
                  onToggleSidebar={() => setIsSidebarOpen(true)}
                />
              } />
              <Route path="/submissions" element={
                <Submissions
                  submissions={submissions}
                  onUpdateSubmissions={setSubmissions}
                  selectedSubmissionId={selectedSubmissionId}
                  onToggleSidebar={() => setIsSidebarOpen(true)}
                />
              } />
              <Route path="/orders" element={
                <Orders 
                  courses={courses} 
                  onToggleSidebar={() => setIsSidebarOpen(true)}
                />
              } />
              <Route path="/payments" element={
                <Payments
                  students={students}
                  onEnrollStudent={handleEnrollStudent}
                  onToggleSidebar={() => setIsSidebarOpen(true)}
                />
              } />
              <Route path="/invoices" element={
                <Invoices 
                  courses={courses} 
                  onToggleSidebar={() => setIsSidebarOpen(true)}
                />
              } />
              <Route path="/revenue" element={
                <Revenue 
                  courses={courses} 
                  onToggleSidebar={() => setIsSidebarOpen(true)}
                />
              } />
              <Route path="/certificates" element={
                <Certificates
                  students={students}
                  onNavigate={handleGlobalNavigation}
                  onToggleSidebar={() => setIsSidebarOpen(true)}
                />
              } />
              <Route path="/templates" element={
                <Templates 
                  courses={courses} 
                  onToggleSidebar={() => setIsSidebarOpen(true)}
                />
              } />
              <Route path="/resources" element={
                <Resources 
                  courses={courses} 
                  onToggleSidebar={() => setIsSidebarOpen(true)}
                />
              } />
              <Route path="/coupons" element={
                <Coupons 
                  courses={courses} 
                  onToggleSidebar={() => setIsSidebarOpen(true)}
                />
              } />
              <Route path="/reviews" element={
                <Reviews 
                  courses={courses} 
                  onToggleSidebar={() => setIsSidebarOpen(true)}
                />
              } />
              <Route path="/referrals" element={
                <Referrals 
                  courses={courses} 
                  onToggleSidebar={() => setIsSidebarOpen(true)}
                />
              } />
              <Route path="/announcements" element={
                <Announcements 
                  courses={courses} 
                  onToggleSidebar={() => setIsSidebarOpen(true)}
                />
              } />
              <Route path="/settings" element={
                <Settings 
                  courses={courses} 
                  onToggleSidebar={() => setIsSidebarOpen(true)}
                  themeMode={themeMode}
                  setThemeMode={setThemeMode}
                />
              } />
              <Route path="/system-users" element={
                <SystemUsers 
                  courses={courses} 
                  onNavigate={handleGlobalNavigation} 
                  onToggleSidebar={() => setIsSidebarOpen(true)}
                />
              } />
              <Route path="/audits" element={
                <Audits 
                  onToggleSidebar={() => setIsSidebarOpen(true)}
                />
              } />
              <Route path="*" element={
                <div className="py-20 text-center text-gray-400 italic">
                  Chương mục quản lý đang phát triển.
                </div>
              } />
              </Routes>
            </motion.div>
          </AnimatePresence>
      </main>

    </div>
  );
}
