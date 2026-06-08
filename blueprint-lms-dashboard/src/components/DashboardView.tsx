/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import {
  Play,
  TrendingUp,
  FileText,
  Award,
  Bell,
  Calendar,
  MessageSquare,
  Trophy,
  MoreVertical,
  ChevronRight,
  BookOpen,
  Target,
  Sparkles
} from "lucide-react";
import CourseCover from "./CourseCover";
import { Lesson, Module } from "../types";

interface DashboardViewProps {
  completedLessonIds: string[];
  totalLessonsCount: number;
  selectedLesson: Lesson;
  selectedLessonModuleTitle: string;
  onStudyLesson: (lessonId: string) => void;
  modules: Module[];
  onNavigateToCourses: () => void;
  onNavigateToMyCourses: () => void;
  onCheckCertificate: () => void;
  onNavigateToTab?: (menu: string, tab?: string) => void;
}

export default function DashboardView({
  completedLessonIds,
  totalLessonsCount,
  selectedLesson,
  selectedLessonModuleTitle,
  onStudyLesson,
  modules,
  onNavigateToCourses,
  onNavigateToMyCourses,
  onCheckCertificate,
  onNavigateToTab,
}: DashboardViewProps) {
  // Sync the primary progress percentage based on actual simulation completions
  const progressPercent = Math.round((completedLessonIds.length / totalLessonsCount) * 100);

  // Helper functions for notification icons and styling
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquare size={14} />;
      case 'calendar':
        return <Calendar size={14} />;
      case 'trophy':
        return <Trophy size={14} />;
      default:
        return <MessageSquare size={14} />;
    }
  };

  const getNotificationBgClass = (type: string) => {
    switch (type) {
      case 'message':
        return 'bg-blue-50 text-blue-600';
      case 'calendar':
        return 'bg-purple-50 text-purple-600';
      case 'trophy':
        return 'bg-amber-50 text-amber-600';
      default:
        return 'bg-blue-50 text-blue-600';
    }
  };

  // Min is 2, max is 4 child cards rule
  const enforceMinMaxRule = <T,>(data: T[], createPlaceholder: (index: number) => T): T[] => {
    const result = data.slice(0, 4); // max 4
    while (result.length < 2) { // min 2
      result.push(createPlaceholder(result.length));
    }
    return result;
  };

  // Mock notifications data
  const notificationsData = [
    {
      id: 'n1',
      type: 'message',
      title: "Giảng viên đã phản hồi bài nộp của bạn",
      time: "2 giờ trước",
      subtitle: "AI Agent & Vibe Coding Bootcamp",
      unread: true
    },
    {
      id: 'n2',
      type: 'calendar',
      title: "Buổi Q&A trực tiếp tuần này",
      time: "5 giờ trước",
      subtitle: "Hôm nay, 20:00",
      unread: true
    },
    {
      id: 'n3',
      type: 'trophy',
      title: "Bạn đã đạt 40% tiến độ khóa học!",
      time: "1 ngày trước",
      subtitle: "Tiếp tục phát huy nhé!",
      unread: true
    }
  ];

  const renderedNotifications = enforceMinMaxRule(notificationsData, (index) => ({
    id: `placeholder-n-${index}`,
    type: 'message',
    title: "Không có thông báo mới",
    time: "",
    subtitle: "Hệ thống hoạt động bình thường",
    unread: false,
    isPlaceholder: true
  }));

  // Mock courses list
  const myCoursesData = [
    {
      id: 'c1',
      title: "AI Agent & Vibe Coding",
      badgeText: "Core",
      badgeClass: "bg-blue-50 text-blue-600",
      progress: progressPercent,
      progressColorClass: "bg-blue-600",
      onClick: onNavigateToMyCourses
    },
    {
      id: 'c2',
      title: "Prompting + AI Tools",
      badgeText: "Core",
      badgeClass: "bg-blue-50 text-blue-600",
      progress: 100,
      progressColorClass: "bg-green-500",
      coverTitle: "PROMPTING +",
      coverSubtitle: "AI MINI COURSE",
      onClick: onNavigateToMyCourses
    },
    {
      id: 'c3',
      title: "Advanced AI Agent",
      badgeText: "Advanced",
      badgeClass: "bg-purple-50 text-purple-600",
      progress: 20,
      progressColorClass: "bg-blue-600",
      coverTitle: "ADVANCED",
      coverSubtitle: "AGENT AUTOMATION",
      onClick: onNavigateToMyCourses
    }
  ];

  const renderedCourses = enforceMinMaxRule(myCoursesData, (index) => ({
    id: `placeholder-c-${index}`,
    title: "Chưa đăng ký khóa học mới",
    badgeText: "Trống",
    badgeClass: "bg-gray-150 text-gray-500",
    progress: 0,
    progressColorClass: "bg-gray-200",
    coverTitle: "EMPTY",
    coverSubtitle: "VACANT COURSE",
    onClick: () => {},
    isPlaceholder: true
  }));

  return (
    <div className="space-y-6 font-sans text-left selection:bg-blue-100">
      
      {/* 1. Welcome Header Banner Block */}
      <div className="relative bg-gradient-to-r from-blue-50/60 via-indigo-50/30 to-blue-100/40 border border-blue-100/30 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center overflow-hidden gap-6 shadow-xs select-none">
        
        {/* Soft elegant neon glowing background mesh blur */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl pointer-events-none filter" />
        
        <div className="space-y-4 max-w-lg z-10">
          <div className="space-y-1.5">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-950 tracking-tight flex items-center gap-2">
              Chào mừng trở lại, Trí <span className="animate-bounce inline-block">👋</span>
            </h1>
            <p className="text-gray-500 font-medium text-base">
              Tiếp tục hành trình học tập và phát triển cùng AI.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => onStudyLesson(selectedLesson.id)}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-10 py-3.5 rounded-xl shadow-xs hover:shadow-md hover:shadow-blue-500/10 active:scale-98 transition-all duration-150 cursor-pointer min-w-[160px]"
            >
              <Play size={14} fill="currentColor" className="text-white" />
              <span>Tiếp tục học</span>
            </button>
            <button
              onClick={() => onNavigateToTab && onNavigateToTab("orders")}
              className="inline-flex items-center justify-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold text-sm px-8 py-3.5 rounded-xl border border-blue-200/80 shadow-sm shadow-blue-500/10 hover:shadow-md hover:shadow-blue-500/15 active:scale-98 transition-all duration-150 cursor-pointer min-w-[140px]"
            >
              <Sparkles size={14} className="text-blue-600 fill-blue-200 animate-pulse" />
              <span>Mua khóa học</span>
            </button>
          </div>
        </div>

        {/* CSS/SVG Premium illustration of books and 3D columns chart */}
        <div className="relative w-full md:w-80 h-32 flex items-end justify-center md:justify-end z-10 pr-0 md:pr-4">
          <div className="relative flex items-end space-x-2 pointer-events-none">
            
            {/* 3D Glowing Graph bars columns */}
            <div className="flex items-end space-x-1.5 h-24 mr-4">
              <div className="w-2.5 bg-blue-200 rounded-t-md h-[40%]" />
              <div className="w-2.5 bg-blue-300 rounded-t-md h-[60%]" />
              <div className="w-2.5 bg-blue-400 rounded-t-md h-[80%]" />
              <div className="w-2.5 bg-blue-600 rounded-t-md h-[100%] shadow-[0_0_12px_rgba(37,99,235,0.4)] animate-pulse" />
            </div>

            {/* Custom SVG book outline */}
            <div className="relative w-24 h-18 bg-white border border-gray-100 rounded-lg shadow-lg flex items-center justify-between p-2 rotate-[-5deg] transform origin-bottom-right hover:rotate-[-2deg] transition-transform">
              <div className="w-[45%] h-full border-r border-gray-100 flex flex-col justify-between pr-1">
                <div className="w-7 h-1 bg-blue-100 rounded" />
                <div className="w-5 h-1 bg-gray-100 rounded" />
                <div className="space-y-0.5">
                  <div className="w-full h-0.5 bg-gray-50" />
                  <div className="w-6 h-0.5 bg-gray-50" />
                </div>
              </div>
              <div className="w-[45%] h-full flex flex-col justify-between pl-1">
                <div className="w-6 h-1 bg-indigo-100 rounded" />
                <div className="w-4 h-1 bg-gray-100 rounded" />
                <div className="space-y-0.5">
                  <div className="w-full h-0.5 bg-gray-50" />
                  <div className="w-5 h-0.5 bg-gray-50" />
                </div>
              </div>
            </div>

            {/* Behind floating circle mesh elements */}
            <div className="absolute top-0 right-10 w-4 h-4 rounded-full bg-blue-400/20 blur-xs animate-ping" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        
        {/* Card: Khóa học hiện tại */}
        <div className="bg-white border border-gray-100 rounded-3xl p-3.5 shadow-xs space-y-2.5 h-full flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-base md:text-[17px] tracking-tight">
              Khóa học hiện tại
            </h3>
            <button
              onClick={onNavigateToMyCourses}
              className="text-gray-400 hover:text-blue-600 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div 
            onClick={onNavigateToMyCourses}
            className="relative flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-gray-50/20 hover:bg-blue-50/15 border border-gray-100/40 hover:border-blue-100/50 p-3 rounded-2xl flex-1 cursor-pointer active:scale-[0.995] transition-all duration-200"
          >
            {/* Badges in the top-right corner of the grey container */}
            <div className="absolute top-3 right-3 flex items-center space-x-1.5 leading-none">
              <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[11px] font-bold uppercase tracking-wide">Core Program</span>
            </div>

            {/* Medium Cover image thumb exact lookup ratio */}
            <CourseCover size="md" />
            
            <div className="flex-1 flex flex-col justify-between sm:h-32 sm:py-0.5 gap-3 sm:gap-0 w-full">
              <div className="space-y-1.5 pr-24">
                <div className="flex items-center space-x-1.5 leading-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[11px] font-bold text-green-600 uppercase tracking-wider">Đang học</span>
                </div>
                <h4 className="font-bold text-base text-gray-900 leading-tight">
                  AI Agent & Vibe Coding Bootcamp
                </h4>
              </div>

              {/* Course micro bar tracking */}
              <div className="space-y-1 text-left">
                <div className="flex items-center justify-between text-[13px] font-semibold text-gray-500">
                  <span>Tiến độ khóa học</span>
                  <span className="font-mono text-gray-900 font-bold text-sm">{progressPercent}%</span>
                </div>
                <div className="relative w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-blue-600 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="text-[11px] text-gray-400 font-semibold font-mono">
                  {completedLessonIds.length} / {totalLessonsCount} lessons completed
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card: Bài học & Bài tập cần làm (Combined Next Lesson & Homework) */}
        <div className="bg-white border border-gray-100 rounded-3xl p-3.5 shadow-xs space-y-2 flex flex-col justify-between h-full">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-base md:text-[17px] tracking-tight">
              Bài học &amp; Bài tập cần làm
            </h3>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Target size={15} className="animate-pulse" />
            </div>
          </div>

          <div className="space-y-2 flex-1 flex flex-col justify-center">
            {/* Sub-Card 1: Next Lesson */}
            <div 
              onClick={() => onStudyLesson(selectedLesson.id)}
              className="flex items-center justify-between py-1.5 px-2.5 rounded-xl bg-blue-50/30 hover:bg-blue-50/60 border border-blue-100/30 transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-center space-x-2.5 min-w-0 flex-1">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <Play size={11} fill="currentColor" className="ml-0.5" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block leading-none">Bài học tiếp theo</span>
                  <h4 className="font-bold text-sm text-gray-900 truncate leading-snug group-hover:text-blue-600 transition-colors">
                    {selectedLesson.title}
                  </h4>
                </div>
              </div>
              <ChevronRight size={14} className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
            </div>

            {/* Sub-Card 2: Homework */}
            <div 
              onClick={() => onStudyLesson("2.3")}
              className="flex items-center justify-between py-1.5 px-2.5 rounded-xl bg-amber-50/20 hover:bg-amber-50/40 border border-amber-100/30 transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-center space-x-2.5 min-w-0 flex-1">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <FileText size={13} />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center space-x-1.5 leading-none">
                    <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">Bài tập cần làm</span>
                    <span className="px-1.5 py-0.2 bg-amber-500/10 text-amber-600 text-[10px] font-bold rounded uppercase">
                      Cần chỉnh sửa
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-gray-900 truncate leading-snug group-hover:text-amber-600 transition-colors">
                    Write responsive CSS prompts layout
                  </h4>
                </div>
              </div>
              <ChevronRight size={14} className="text-gray-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </div>

      </div>

      {/* 4. Lower Grid layout: Announcements, Custom course list list, target habit visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

        {/* Block 1: Thông báo mới */}
        <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-xs space-y-4 text-left h-fit">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-base md:text-[17px] tracking-tight">Thông báo mới</h3>
            <button
              onClick={() => onNavigateToTab && onNavigateToTab("notifications")}
              className="text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center space-x-0.5 cursor-pointer"
            >
              <span>Xem tất cả</span>
              <ChevronRight size={14} />
            </button>
          </div>
          
          <div className="space-y-4">
            {renderedNotifications.map((notif) => (
              <div key={notif.id} className={`flex items-start space-x-3 text-sm ${'isPlaceholder' in notif && notif.isPlaceholder ? 'opacity-40 select-none pointer-events-none' : ''}`}>
                <div className={`w-8.5 h-8.5 rounded-full flex items-center justify-center flex-shrink-0 pt-0.5 ${getNotificationBgClass(notif.type)}`}>
                  {getNotificationIcon(notif.type)}
                </div>
                <div className="flex-1 min-w-0 space-y-0.5 relative pr-4">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="font-bold text-gray-800 leading-snug truncate">
                      {notif.title}
                    </h4>
                    {notif.time && (
                      <span className="text-[10px] text-gray-400 font-semibold font-mono flex-shrink-0">{notif.time}</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 font-medium truncate">
                    {notif.subtitle}
                  </p>
                  
                  {notif.unread && (
                    /* Blue unread dot mark */
                    <div className="absolute right-0 top-1.5 w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Block 2: Khóa học của tôi */}
        <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-xs space-y-4 text-left h-fit">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-base md:text-[17px] tracking-tight">Khóa học của tôi</h3>
            <button
              onClick={onNavigateToMyCourses}
              className="text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center space-x-0.5 cursor-pointer"
            >
              <span>Xem tất cả</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="space-y-3.5">
            {renderedCourses.map((course) => (
              <div 
                key={course.id}
                onClick={course.onClick}
                className={`flex items-center justify-between gap-3 text-sm p-1 hover:bg-gray-50/80 rounded-xl transition-all cursor-pointer active:scale-[0.99] duration-150 ${'isPlaceholder' in course && course.isPlaceholder ? 'opacity-40 select-none pointer-events-none' : ''}`}
              >
                {course.coverTitle ? (
                  <CourseCover size="xs" title={course.coverTitle} subtitle={course.coverSubtitle} />
                ) : (
                  <CourseCover size="xs" />
                )}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-800 block truncate max-w-40 leading-none text-sm">
                      {course.title}
                    </span>
                    <span className={`px-1.5 py-0.5 text-[10.5px] font-bold rounded uppercase leading-none scale-90 ${course.badgeClass}`}>
                      {course.badgeText}
                    </span>
                  </div>
                  {/* completion tracking info */}
                  <div className="flex items-center justify-between text-xs font-semibold text-gray-400 leading-none">
                    <div className="relative w-24 h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`absolute h-full rounded-full ${course.progressColorClass}`} style={{ width: `${course.progress}%` }} />
                    </div>
                    <span className={`font-bold font-mono ${course.progress === 100 ? 'text-green-600' : 'text-gray-700'}`}>
                      {course.progress}%
                    </span>
                  </div>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <MoreVertical size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* Block 3: Giữ vững nhịp học tập (Light blue bento card) */}
        <div className="bg-gradient-to-br from-blue-50/70 via-[#eff6ff]/50 to-[#e0f2fe]/40 border border-blue-100/30 rounded-3xl p-5 shadow-xs flex flex-col justify-between min-h-[225px] max-h-[360px] text-center space-y-4 relative overflow-hidden select-none">
          <div className="absolute inset-0 z-0 opacity-10" style={{
            backgroundImage: "radial-gradient(#2563eb 0.8px, transparent 0.8px)",
            backgroundSize: "14px 14px"
          }} />

          <div className="space-y-1 z-10 text-center">
            <h3 className="font-bold text-gray-900 text-base md:text-[17px] tracking-tight">
              Giữ vững nhịp học tập!
            </h3>
            <p className="text-[12.5px] text-gray-500 leading-relaxed font-medium max-w-xs mx-auto">
              Duy trì thói quen học mỗi ngày để đạt được mục tiêu của bạn.
            </p>
          </div>

          {/* Darts hitting target graphics illustration */}
          <div className="relative flex justify-center py-2 z-10">
            <div className="relative w-24 h-24 flex items-center justify-center bg-transparent">
              {/* Bullseye rings animation placeholder */}
              <div className="absolute w-20 h-20 rounded-full border border-blue-400/20 animate-ping opacity-45 pointer-events-none" />
              <div className="absolute w-16 h-16 rounded-full border border-blue-400/30" />
              <div className="absolute w-10 h-10 rounded-full border border-blue-500/40 bg-blue-50/10" />

              {/* Targets and star items */}
              <Target size={44} className="text-blue-600 drop-shadow-[0_4px_10px_rgba(37,99,235,0.2)]" />
              <Sparkles size={11} className="absolute top-2 right-2 text-yellow-400 animate-pulse" />
              <Sparkles size={9} className="absolute bottom-3 left-4 text-indigo-400" />
            </div>
          </div>

          <button
            onClick={() => onStudyLesson(selectedLesson.id)}
            className="w-full py-3.5 bg-white hover:bg-gray-50/60 text-blue-600 border border-blue-200 hover:border-blue-300 font-bold text-sm rounded-xl active:scale-98 transition-all z-10 cursor-pointer flex items-center justify-center space-x-1.5 hover:shadow-xs"
          >
            <BookOpen size={14} />
            <span>Xem gợi ý học tập</span>
          </button>
        </div>

      </div>

    </div>
  );
}
