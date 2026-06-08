/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from "react";
import Sidebar from "./components/Sidebar";
import LearnView from "./components/LearnView";
import DashboardView from "./components/DashboardView";
import OrdersView from "./components/OrdersView";
import NotificationsView from "./components/NotificationsView";
import ProfileView from "./components/ProfileView";
import CertificatesView from "./components/CertificatesView";
import MyCoursesView from "./components/MyCoursesView";
import CourseHeader from "./components/CourseHeader";
import CourseTabs from "./components/CourseTabs";
import CourseContent from "./components/CourseContent";
import RightSidebar from "./components/RightSidebar";
import { Lesson, LessonStatus, LessonType, Module } from "./types";
import {
  initialModules,
  defaultCompletedLessonIds
} from "./data";
import {
  Award,
  BookOpen,
  Calendar,
  Clock,
  Heart,
  MessageSquare,
  Search,
  CheckCircle,
  FileText,
  User,
  Shield,
  Send,
  Sparkles,
  Zap,
  Info,
  Menu
} from "lucide-react";

type AppRouteState = {
  menu: string;
  activeTab: string;
  learnViewMode: "overview" | "lesson";
  selectedOrderCode: string | null;
  selectedLesson: Lesson;
  selectedLessonModuleTitle: string;
  expandedModuleId: number | null;
};

const DEFAULT_LESSON: Lesson = {
  id: "2.3",
  title: "Build your first AI landing page",
  type: LessonType.QUIZ,
  duration: "60 phút",
  status: LessonStatus.CURRENT,
};

const DEFAULT_LESSON_MODULE_TITLE = "Module 2: Vibe Coding Basics";
const DEFAULT_EXPANDED_MODULE_ID = 2;

const normalizeRoutePath = (path: string) => {
  if (!path) return "/";
  const trimmed = path.trim();
  if (trimmed === "") return "/";
  return trimmed.replace(/\/+$/, "") || "/";
};

const getLessonContextFromModules = (moduleList: Module[], lessonId: string) => {
  for (const module of moduleList) {
    const lesson = module.lessons.find((item) => item.id === lessonId);
    if (lesson) {
      return {
        lesson,
        moduleId: module.id,
        moduleTitle: module.title,
      };
    }
  }
  return null;
};

const getDefaultLessonContext = (moduleList: Module[]) => {
  return getLessonContextFromModules(moduleList, DEFAULT_LESSON.id) ?? {
    lesson: DEFAULT_LESSON,
    moduleId: DEFAULT_EXPANDED_MODULE_ID,
    moduleTitle: DEFAULT_LESSON_MODULE_TITLE,
  };
};

const getPathFromLocation = () => {
  if (typeof window === "undefined") {
    return "/";
  }

  const hash = window.location.hash;
  if (hash.startsWith("#/")) {
    return normalizeRoutePath(hash.slice(1));
  }

  return normalizeRoutePath(window.location.pathname);
};

const getRouteStateFromPath = (path: string, moduleList: Module[]): AppRouteState => {
  const defaultLessonContext = getDefaultLessonContext(moduleList);
  const normalizedPath = normalizeRoutePath(path).toLowerCase();

  const baseState: AppRouteState = {
    menu: "dashboard",
    activeTab: "content",
    learnViewMode: "overview",
    selectedOrderCode: null,
    selectedLesson: defaultLessonContext.lesson,
    selectedLessonModuleTitle: defaultLessonContext.moduleTitle,
    expandedModuleId: defaultLessonContext.moduleId,
  };

  if (normalizedPath === "/" || normalizedPath === "/dashboard" || normalizedPath === "/index.html") {
    return baseState;
  }

  if (normalizedPath === "/my-courses") {
    return { ...baseState, menu: "courses" };
  }

  if (normalizedPath === "/my-certificates") {
    return { ...baseState, menu: "certificates" };
  }

  if (normalizedPath === "/my-orders") {
    return { ...baseState, menu: "orders" };
  }

  if (normalizedPath.startsWith("/my-orders/")) {
    const orderCode = path.split("/").filter(Boolean).at(-1) ?? null;
    return { ...baseState, menu: "orders", selectedOrderCode: orderCode };
  }

  if (normalizedPath === "/notifications") {
    return { ...baseState, menu: "notifications" };
  }

  if (normalizedPath === "/profile") {
    return { ...baseState, menu: "profile" };
  }

  if (normalizedPath === "/learn/ai-agent-bootcamp") {
    return { ...baseState, menu: "learn" };
  }

  if (normalizedPath.startsWith("/learn/ai-agent-bootcamp/")) {
    const lessonId = path.split("/").filter(Boolean).at(-1) ?? DEFAULT_LESSON.id;
    const lessonContext = getLessonContextFromModules(moduleList, lessonId) ?? defaultLessonContext;

    return {
      ...baseState,
      menu: "learn",
      learnViewMode: "lesson",
      selectedLesson: lessonContext.lesson,
      selectedLessonModuleTitle: lessonContext.moduleTitle,
      expandedModuleId: lessonContext.moduleId,
    };
  }

  return baseState;
};

export default function App() {
  const mainContentRef = useRef<HTMLDivElement | null>(null);
  const initialRouteRef = useRef<AppRouteState>(getRouteStateFromPath(getPathFromLocation(), initialModules));

  // Navigation & Tabs States
  const [activeMenu, setActiveMenu] = useState<string>(initialRouteRef.current.menu);
  const [activeTab, setActiveTab] = useState<string>(initialRouteRef.current.activeTab);
  const [expandedModuleId, setExpandedModuleId] = useState<number | null>(initialRouteRef.current.expandedModuleId);
  const [learnViewMode, setLearnViewMode] = useState<"overview" | "lesson">(initialRouteRef.current.learnViewMode);
  const [selectedOrderCode, setSelectedOrderCode] = useState<string | null>(initialRouteRef.current.selectedOrderCode);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Dynamic Simulator State
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(defaultCompletedLessonIds);
  
  // Interactive selected lesson state
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(initialRouteRef.current.selectedLesson);
  const [selectedLessonModuleTitle, setSelectedLessonModuleTitle] = useState<string>(initialRouteRef.current.selectedLessonModuleTitle);

  // Dynamic modules list (for updates if needed)
  const [modules, setModules] = useState<Module[]>(initialModules);

  // Core Q&A Forum Static/Dynamic List State
  const [qaList, setQaList] = useState([
    {
      id: 1,
      author: "Hoàng Long",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80",
      content: "Cho mình hỏi bài 1.3 khi chạy API key của OpenAI có cần nạp tiền trước vào tài khoản không ạ?",
      likes: 6,
      commentsCount: 3,
      date: "3 giờ trước",
      likedByUser: false,
    },
    {
      id: 2,
      author: "Minh Thư",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80",
      content: "Tài liệu prompt engineering cheatsheet cực kỳ chi tiết, cảm ơn đội ngũ admin Blueprint nhiều!",
      likes: 12,
      commentsCount: 0,
      date: "Hôm qua",
      likedByUser: true,
    }
  ]);
  const [newQuestionText, setNewQuestionText] = useState("");

  // Support / Live-Chat modal states
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [supportText, setSupportText] = useState("");
  const [supportStatus, setSupportStatus] = useState<"idle" | "sending" | "success">("idle");

  // Certificate unlock popup alert state
  const [isCertAlertOpen, setIsCertAlertOpen] = useState(false);

  // Routing sync functions
  const getPathFromState = (menu: string, viewMode: string, lessonId: string | null, orderCode: string | null) => {
    switch (menu) {
      case "dashboard":
        return "/dashboard";
      case "courses":
        return "/my-courses";
      case "certificates":
        return "/my-certificates";
      case "orders":
        return orderCode ? `/my-orders/${orderCode}` : "/my-orders";
      case "notifications":
        return "/notifications";
      case "profile":
        return "/profile";
      case "learn":
        if (viewMode === "lesson" && lessonId) {
          return `/learn/ai-agent-bootcamp/${lessonId}`;
        } else {
          return "/learn/ai-agent-bootcamp";
        }
      default:
        return "/dashboard";
    }
  };

  const applyRouteState = (routeState: AppRouteState) => {
    setActiveMenu(routeState.menu);
    setActiveTab(routeState.activeTab);
    setLearnViewMode(routeState.learnViewMode);
    setSelectedOrderCode(routeState.selectedOrderCode);
    setSelectedLesson(routeState.selectedLesson);
    setSelectedLessonModuleTitle(routeState.selectedLessonModuleTitle);
    setExpandedModuleId(routeState.expandedModuleId);
  };

  React.useEffect(() => {
    const handleLocationChange = () => {
      applyRouteState(getRouteStateFromPath(getPathFromLocation(), modules));
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, [modules]);

  React.useEffect(() => {
    const currentPath = normalizeRoutePath(window.location.pathname);
    const expectedPath = getPathFromState(activeMenu, learnViewMode, selectedLesson.id, selectedOrderCode);
    
    if (currentPath !== expectedPath) {
      if (currentPath === "/" || currentPath === "/index.html") {
        window.history.replaceState(null, "", expectedPath);
      } else {
        window.history.pushState(null, "", expectedPath);
      }
    }
  }, [activeMenu, learnViewMode, selectedLesson.id, selectedOrderCode]);

  const scrollMainContentToTop = () => {
    mainContentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const findLessonContext = (lessonId: string) => {
    for (const module of modules) {
      const lesson = module.lessons.find((item) => item.id === lessonId);
      if (lesson) {
        return {
          lesson,
          moduleId: module.id,
          moduleTitle: module.title,
        };
      }
    }
    return null;
  };

  const syncLessonContext = (lessonId: string) => {
    const context = findLessonContext(lessonId);
    if (!context) return null;

    setSelectedLesson(context.lesson);
    setSelectedLessonModuleTitle(context.moduleTitle);
    setExpandedModuleId(context.moduleId);

    return context;
  };

  const navigateToLesson = (lessonId: string) => {
    const context = syncLessonContext(lessonId);
    if (!context) return;

    setActiveMenu("learn");
    setLearnViewMode("lesson");
    setActiveTab("content");
    scrollMainContentToTop();
  };

  const navigateToCurrentLesson = () => {
    navigateToLesson(selectedLesson.id);
  };

  const navigateToCertificates = () => {
    setActiveMenu("certificates");
    scrollMainContentToTop();
  };

  const navigateToDestination = (menu: string, tab?: string, targetId?: string) => {
    setIsMobileMenuOpen(false);

    if (menu === "learn") {
      const lessonContext = targetId ? findLessonContext(targetId) : null;

      setActiveMenu("learn");
      setActiveTab(tab ?? "content");

      if (lessonContext && (tab === "content" || !tab)) {
        setSelectedLesson(lessonContext.lesson);
        setSelectedLessonModuleTitle(lessonContext.moduleTitle);
        setExpandedModuleId(lessonContext.moduleId);
        setLearnViewMode("lesson");
      } else {
        if (lessonContext) {
          setSelectedLesson(lessonContext.lesson);
          setSelectedLessonModuleTitle(lessonContext.moduleTitle);
          setExpandedModuleId(lessonContext.moduleId);
        }
        setLearnViewMode("overview");
      }

      scrollMainContentToTop();
      return;
    }

    setActiveMenu(menu);

    if (tab) {
      setActiveTab(tab);
    }

    if (menu === "orders") {
      setSelectedOrderCode(targetId && targetId.startsWith("ORD-") ? targetId : null);
    } else if (menu !== "learn") {
      setSelectedOrderCode(null);
    }

    scrollMainContentToTop();
  };

  // Accordion toggle action
  const handleToggleModule = (moduleId: number) => {
    setExpandedModuleId(expandedModuleId === moduleId ? null : moduleId);
  };

  // Select lesson action
  const handleSelectLesson = (lesson: Lesson, moduleTitle: string) => {
    setSelectedLesson(lesson);
    setSelectedLessonModuleTitle(moduleTitle);
    const context = findLessonContext(lesson.id);
    if (context) {
      setExpandedModuleId(context.moduleId);
    }
    scrollMainContentToTop();
  };

  // Study lesson state updater ("Học bài này" click simulation)
  const handleStudyLesson = (lessonId: string) => {
    if (completedLessonIds.includes(lessonId)) return;

    // Add current lesson to completed list
    const updatedCompletions = [...completedLessonIds, lessonId];
    setCompletedLessonIds(updatedCompletions);

    // Look for next logical lesson to make active in current or subsequent modules
    let nextFound = false;
    for (const m of modules) {
      for (const les of m.lessons) {
        if (!updatedCompletions.includes(les.id) && les.id !== lessonId) {
          setSelectedLesson(les);
          setSelectedLessonModuleTitle(m.title);
          nextFound = true;
          // Expand that module if it's different
          if (expandedModuleId !== m.id) {
            setExpandedModuleId(m.id);
          }
          break;
        }
      }
      if (nextFound) break;
    }
  };

  // Header quick "Study closest uncompleted" action
  const handleResumeLastUncompleted = () => {
    for (const m of modules) {
      for (const les of m.lessons) {
        if (!completedLessonIds.includes(les.id)) {
          handleSelectLesson(les, m.title);
          return;
        }
      }
    }
  };

  // Submit Q&A forum question builder
  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    const newQ = {
      id: Date.now(),
      author: "Trí Nguyễn",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?bg=f9f9f9&w=150&h=150&fit=crop",
      content: newQuestionText,
      likes: 0,
      commentsCount: 0,
      date: "Vừa xong",
      likedByUser: false,
    };

    setQaList([newQ, ...qaList]);
    setNewQuestionText("");
  };

  const handleLikeQuestion = (id: number) => {
    setQaList(qaList.map(q => {
      if (q.id === id) {
        return {
          ...q,
          likes: q.likedByUser ? q.likes - 1 : q.likes + 1,
          likedByUser: !q.likedByUser
        };
      }
      return q;
    }));
  };

  // Mock Support Form sender
  const handleSendSupportMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportText.trim()) return;

    setSupportStatus("sending");
    setTimeout(() => {
      setSupportStatus("success");
      setSupportText("");
      setTimeout(() => {
        setSupportStatus("idle");
        setIsSupportOpen(false);
      }, 1500);
    }, 1200);
  };

  // Compute stats details
  const totalLessonsCount = modules.reduce((acc, m) => acc + m.lessons.length, 0); // Should be 20

  const handleGoToDashboard = () => {
    navigateToDestination("dashboard");
  };

  return (
    <div id="applet_main" className="relative flex bg-[#f8fafc] text-gray-800 h-screen overflow-hidden font-sans">

      {/* Mobile Topbar — only shown on mobile (hidden on md+) */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-100 px-4 h-14 flex items-center justify-between shadow-xs">
        <button
          type="button"
          onClick={handleGoToDashboard}
          className="flex items-center space-x-2.5 rounded-xl pr-2 py-1 hover:bg-gray-50 transition-colors cursor-pointer"
          aria-label="Về Dashboard"
        >
          <div className="blueprint-brand-mark blueprint-brand-mark--mobile" aria-hidden="true" />
          <span className="font-bold text-base uppercase tracking-wider text-gray-900">BLUEPRINT</span>
        </button>
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
          aria-label="Mở menu"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile backdrop overlay — darkens background when sidebar open */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-40 backdrop-blur-xs"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* 1. Left Fixed Sidebar Column */}
      <Sidebar
        activeMenu={activeMenu}
        setActiveMenu={(menu) => navigateToDestination(menu)}
        onOpenSupport={() => setIsSupportOpen(true)}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* 2. Main Canvas Scroll Area */}
      <div ref={mainContentRef} className="flex-1 h-full overflow-y-auto pt-14 md:pt-0">
        <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">
        
        {/* Render Page Conditionally based on Sidebar Active State */}
        {activeMenu === "learn" && (
          learnViewMode === "overview" ? (
            <div id="course_overview_layout" className="flex flex-col lg:flex-row gap-6 items-start animate-fade-in text-left">
              {/* Cột chính ở giữa */}
              <div className="flex-1 w-full space-y-6">
                <CourseHeader
                  completedLessonsCount={completedLessonIds.length}
                  totalLessonsCount={totalLessonsCount}
                  onResumeLast={() => {
                    handleResumeLastUncompleted();
                    setLearnViewMode("lesson");
                  }}
                  onCheckCertificate={() => {
                    setIsCertAlertOpen(true);
                  }}
                  onBackToCourses={() => navigateToDestination("courses")}
                />

                <CourseTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* Tab Content Panels */}
                {activeTab === "content" && (
                  <CourseContent
                    modules={modules}
                    expandedModuleId={expandedModuleId}
                    toggleModule={handleToggleModule}
                    selectedLessonId={selectedLesson.id}
                    onSelectLesson={(lesson, moduleTitle) => {
                      handleSelectLesson(lesson, moduleTitle);
                      setLearnViewMode("lesson");
                    }}
                    completedLessonIds={completedLessonIds}
                  />
                )}

              {activeTab === "info" && (
                <div id="info_tab" className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 space-y-6 text-left shadow-xs font-sans">
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-gray-900">Giới thiệu khóa học</h3>
                    <p className="text-sm text-gray-500 leading-relaxed font-semibold">
                      Khóa học <strong className="text-gray-800">AI Agent & Vibe Coding Bootcamp</strong> là chương trình huấn luyện thực chiến đầu tiên tại Việt Nam tập trung vào việc áp dụng các trợ lý AI thông minh và triết lý "Vibe Coding" để phát triển ứng dụng thần tốc mà không cần lượng lớn code thủ công.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 border border-blue-50/50 bg-blue-50/10 rounded-2xl space-y-1">
                      <span className="text-[10px] uppercase font-bold text-blue-500 tracking-wide block">Đối tượng học tập</span>
                      <span className="text-xs font-bold text-gray-800">Coder, Designer, Product Manager muốn nâng cao hiệu suất gấp 10 lần nhờ Generative AI.</span>
                    </div>
                    <div className="p-4 border border-indigo-50/50 bg-indigo-50/10 rounded-2xl space-y-1">
                      <span className="text-[10px] uppercase font-bold text-indigo-500 tracking-wide block">Kết quả đầu ra</span>
                      <span className="text-xs font-bold text-gray-800">Xây dựng trơn tru landing pages, tích hợp LLMs APIs và làm chủ hệ thống automation workflow.</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "announcements" && (
                <div id="announcements_tab" className="space-y-4 text-left font-sans">
                  <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-xs relative">
                    <span className="absolute top-5 right-5 text-[10px] font-mono text-gray-450 font-bold">2 giờ trước</span>
                    <div className="flex gap-4.5 items-start">
                      <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0 font-bold">📢</div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-gray-800">Cập nhật tài liệu thực hành Module 2</h4>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed">
                          Chào các bạn học viên, link GitHub repo mẫu cho bài 2.3 đã được bổ sung tài liệu hướng dẫn cấu hình chi tiết .env.example. Vui lòng kiểm tra tab Resources để download nhé.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-xs relative">
                    <span className="absolute top-5 right-5 text-[10px] font-mono text-gray-450 font-bold">3 ngày trước</span>
                    <div className="flex gap-4.5 items-start">
                      <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0 font-bold">📢</div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-gray-800">Lịch livestream Q&A tuần này</h4>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed">
                          Hội đồng Blueprint sẽ tổ chức buổi sửa bài tập trực tiếp lớp Vibe Coding vào lúc 20:00 tối thứ Tư này. Các bạn lưu ý nộp bài tập đúng hạn để được giảng viên review trực tiếp trên luồng phát sóng.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "qa" && (
                <div id="qa_tab" className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start text-left font-sans">
                  <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-xs">
                      <form onSubmit={handleAddQuestion} className="space-y-3">
                        <textarea
                          required
                          placeholder="Bạn có thắc mắc gì trong lúc học? Đặt câu hỏi tại đây..."
                          rows={2}
                          value={newQuestionText}
                          onChange={(e) => setNewQuestionText(e.target.value)}
                          className="w-full p-3.5 border border-gray-200/80 rounded-2xl text-xs font-semibold focus:ring-1 focus:ring-blue-500 bg-gray-50/20 focus:bg-white outline-none"
                        />
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-3xs"
                          >
                            Gửi câu hỏi
                          </button>
                        </div>
                      </form>
                    </div>

                    <div className="space-y-3.5">
                      {qaList.map((q) => (
                        <div key={q.id} className="bg-white border border-gray-100 rounded-3xl p-5 shadow-xs flex items-start gap-4">
                          <img src={q.avatar} alt={q.author} className="w-9 h-9 rounded-full object-cover" />
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-gray-800">{q.author}</span>
                              <span className="text-[10px] font-medium text-gray-400 font-mono">{q.date}</span>
                            </div>
                            <p className="text-xs text-gray-600 font-medium leading-relaxed">{q.content}</p>
                            
                            <div className="flex items-center space-x-4 pt-1 text-[11px] font-bold text-gray-400">
                              <button
                                onClick={() => handleLikeQuestion(q.id)}
                                className={`flex items-center space-x-1.5 transition-colors ${q.likedByUser ? "text-blue-600 font-extrabold" : "hover:text-gray-600"}`}
                              >
                                <Heart size={12} fill={q.likedByUser ? "currentColor" : "none"} />
                                <span>{q.likes} Thích</span>
                              </button>
                              <div className="flex items-center space-x-1.5 cursor-not-allowed">
                                <MessageSquare size={12} />
                                <span>{q.commentsCount} trả lời</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-xs space-y-4 leading-relaxed font-sans">
                    <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Nguyên tắc cộng đồng</h4>
                    <p className="text-[11px] text-gray-400 font-semibold leading-relaxed">
                      Khu vực trao đổi học tập văn minh. Vui lòng không chia sẻ mã độc, thông tin xúc phạm hoặc hỏi ngoài lề bài học.
                    </p>
                    <div className="p-3.5 border border-amber-50/50 bg-amber-50/10 rounded-2xl flex items-start gap-3.5 select-none font-sans">
                      <span className="text-lg">💡</span>
                      <div className="space-y-0.5">
                        <span className="text-[10px] uppercase font-bold text-amber-500 block">Mẹo tìm kiếm câu trả lời</span>
                        <span className="text-[10px] text-gray-500 font-semibold block">Bạn hoàn toàn có thể nhấn Ctrl+F để tìm nhanh các thắc mắc thông dụng.</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              </div>

              {/* Cột thông tin khóa học bên phải */}
              <RightSidebar
                selectedLesson={selectedLesson}
                selectedLessonModuleTitle={selectedLessonModuleTitle}
                onStudyLesson={(lessonId) => {
                  handleStudyLesson(lessonId);
                  setLearnViewMode("lesson");
                  scrollMainContentToTop();
                }}
                completedLessonIds={completedLessonIds}
                totalLessonsCount={totalLessonsCount}
              />
            </div>
          ) : (
            <LearnView
              modules={modules}
              selectedLesson={selectedLesson}
              onSelectLesson={handleSelectLesson}
              completedLessonIds={completedLessonIds}
              onToggleComplete={(lessonId) => {
                if (completedLessonIds.includes(lessonId)) {
                  setCompletedLessonIds(completedLessonIds.filter(id => id !== lessonId));
                } else {
                  setCompletedLessonIds([...completedLessonIds, lessonId]);
                }
              }}
              totalLessonsCount={totalLessonsCount}
              onBackToCourses={() => navigateToDestination("courses")}
              onBackToOverview={() => setLearnViewMode("overview")}
            />
          )
        )}

        {/* MOCK PAGE VIEW: 2. My Registered Courses Block */}
        {activeMenu === "courses" && (
          <MyCoursesView
            completedLessonIds={completedLessonIds}
            totalLessonsCount={totalLessonsCount}
            onContinueLearning={navigateToCurrentLesson}
            onOpenSupport={() => setIsSupportOpen(true)}
            onCheckCertificate={navigateToCertificates}
            onNavigateToTab={(menu, tab) => navigateToDestination(menu, tab)}
          />
        )}

        {/* 3. Dashboard Analytics */}
        {activeMenu === "dashboard" && (
          <DashboardView
            completedLessonIds={completedLessonIds}
            totalLessonsCount={totalLessonsCount}
            selectedLesson={selectedLesson}
            selectedLessonModuleTitle={selectedLessonModuleTitle}
            onStudyLesson={(lessonId) => {
              navigateToLesson(lessonId);
            }}
            modules={modules}
            onNavigateToCourses={() => {
              navigateToDestination("learn", "content");
            }}
            onNavigateToMyCourses={() => {
              navigateToDestination("courses");
            }}
            onCheckCertificate={navigateToCertificates}
            onNavigateToTab={(menu, tab) => navigateToDestination(menu, tab)}
          />
        )}

        {/* MOCK PAGE VIEW: 4. Certificates Achieved */}
        {activeMenu === "certificates" && (
          <CertificatesView
            onNavigateToTab={(menu, tab) => navigateToDestination(menu, tab)}
          />
        )}

        {activeMenu === "orders" && (
          <OrdersView 
            selectedOrderCode={selectedOrderCode}
            onSelectOrderCode={setSelectedOrderCode}
            onNavigateToTab={(menu, tab, targetId) => navigateToDestination(menu, tab, targetId)}
          />
        )}

        {activeMenu === "notifications" && (
          <NotificationsView 
            onNavigateToTab={(menu, tab, targetId) => navigateToDestination(menu, tab, targetId)}
          />
        )}

        {/* MOCK PAGE VIEW: 6. Profile controls */}
        {activeMenu === "profile" && (
          <ProfileView />
        )}

      </main>
      </div>

      {/* 3. Support Live-Chat Modal Overlay */}
      {isSupportOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 animate-fade-in font-sans p-4">
          <div className="bg-white border border-gray-100 rounded-3xl w-full max-w-md p-6 relative shadow-2xl animate-scale-up text-left space-y-4">
            
            {/* Header */}
            <div>
              <h3 className="text-base font-bold text-gray-900">Liên hệ trung tâm hỗ trợ Blueprint</h3>
              <p className="text-xs text-gray-500 mt-1">Đội ngũ kỹ thuật viên và trợ giảng sẽ phản hồi bạn trong vòng 5-10 phút.</p>
            </div>

            {/* Form */}
            {supportStatus === "success" ? (
              <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-green-50 text-green-500 flex items-center justify-center">
                  <CheckCircle size={26} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-800">Đã gửi tin nhắn thành công!</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Chúng tôi đã nhận được thông tin liên hệ.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendSupportMessage} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Học viên đang cần trợ giúp về:</label>
                  <textarea
                    required
                    value={supportText}
                    onChange={(e) => setSupportText(e.target.value)}
                    placeholder="Mô tả chi tiết câu thắc mắc của bạn (ví dụ: bị crash khi chạy command npm build...)"
                    rows={4}
                    className="w-full p-3 border border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 rounded-2xl text-xs font-medium outline-none bg-gray-50/20"
                  />
                </div>

                <div className="flex space-x-2 justify-end pt-2 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setIsSupportOpen(false)}
                    className="px-4 py-2 border border-gray-200 hover:bg-gray-100 text-gray-600 rounded-xl transition-colors cursor-pointer"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    disabled={supportStatus === "sending"}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors shadow-xs flex items-center space-x-1.5 cursor-pointer"
                  >
                    {supportStatus === "sending" ? (
                      <span>Đang gửi...</span>
                    ) : (
                      <>
                        <Send size={12} fill="currentColor" />
                        <span>Gửi định dạng</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Close trigger button */}
            <button
              onClick={() => setIsSupportOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-sm font-bold"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* 4. Certificate Preview Modal */}
      {isCertAlertOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 animate-fade-in font-sans p-4">
          <div className="bg-white border border-gray-100 rounded-3xl w-full max-w-2xl p-6 relative shadow-2xl animate-scale-up text-left space-y-5">
            <div>
              <h3 className="text-base font-bold text-gray-900 flex items-center space-x-1.5">
                <Award size={20} className="text-blue-500 animate-bounce" />
                <span>Xem chi tiết chứng nhận học viên</span>
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">Một bản sao PDF chính thức được tải trực tiếp từ hệ thống lưu trữ Blueprint.</p>
            </div>

            {/* High visual mockup of a framed certificate */}
            <div className="border-[10px] border-double border-blue-900/45 p-6 bg-amber-50/10 rounded-2xl flex flex-col items-center justify-between text-center min-h-84 space-y-4 relative overflow-hidden select-none">
              <div className="absolute inset-0 z-0 opacity-5" style={{
                backgroundImage: "radial-gradient(#1e3a8a 1px, transparent 1px)",
                backgroundSize: "20px 20px"
              }} />

              <div className="z-10 space-y-1">
                <h2 className="font-serif italic font-extrabold text-[#111827] text-2xl tracking-wide uppercase">CERTIFICATE OF EXCELLENCE</h2>
                <h4 className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">BLUEPRINT ONLINE PROGRAM</h4>
              </div>

              <div className="z-10 space-y-2">
                <p className="text-xs text-gray-500 font-medium">Chứng nhận này được trao tặng một cách danh giá cho học viên:</p>
                <h3 className="text-xl font-bold font-serif italic text-blue-900 underline decoration-indigo-400 underline-offset-4">TRÍ NGUYỄN</h3>
                <p className="text-xs text-gray-500 max-w-md font-medium leading-relaxed">
                  Vì đã hoàn thành xuất sắc các yêu cầu chuyên môn, đề thi thực hành, đồ án tốt nghiệp trong chương trình huấn luyện toàn diện 
                  <span className="font-bold text-gray-700 block mt-1">"AI Agent & Vibe Coding Bootcamp"</span>
                </p>
              </div>

              {/* Certificate Signatures */}
              <div className="z-10 w-full flex justify-between items-end px-6 pt-4 text-xs font-semibold text-gray-500 font-sans">
                <div className="flex flex-col items-center">
                  <span className="font-mono text-[10px] font-bold text-gray-900">Blueprint Team</span>
                  <div className="h-[1px] bg-gray-200 w-24 my-1" />
                  <span className="text-[9px] text-gray-400">Hội Đồng Đào Tạo</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <div className="w-10 h-10 rounded-full border-2 border-red-100 flex items-center justify-center text-red-500 animate-pulse font-bold text-[8px] tracking-wider font-mono">
                    SEAL Approved
                  </div>
                  <span className="text-[9px] text-gray-450 font-mono">21 / 05 / 2026</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 text-xs font-bold">
              <button
                onClick={() => setIsCertAlertOpen(false)}
                className="px-4 py-2 border border-gray-200 hover:bg-gray-100 text-gray-700 rounded-xl transition-colors cursor-pointer"
              >
                Đóng lại
              </button>
              <button
                onClick={() => {
                  setIsCertAlertOpen(false);
                  navigateToCertificates();
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors shadow-xs cursor-pointer"
              >
                Tải xuống bản in PDF
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
