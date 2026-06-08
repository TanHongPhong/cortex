/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import {
  Compass,
  CheckCircle,
  Clock,
  Sparkles,
  Calendar,
  Award,
  ChevronRight,
  Info,
  BookOpen,
  ArrowUpRight
} from "lucide-react";
import CourseCover from "./CourseCover";

interface MyCoursesViewProps {
  completedLessonIds: string[];
  totalLessonsCount: number;
  onContinueLearning: () => void;
  onOpenSupport: () => void;
  onCheckCertificate: () => void;
  onNavigateToTab: (menu: string, tab?: string) => void;
}

export default function MyCoursesView({
  completedLessonIds,
  totalLessonsCount,
  onContinueLearning,
  onOpenSupport,
  onCheckCertificate,
  onNavigateToTab,
}: MyCoursesViewProps) {
  
  const progressPercent = Math.round((completedLessonIds.length / totalLessonsCount) * 100);

  // High quality list of enrolled courses
  const registeredCourses = [
    {
      id: "course-1",
      title: "AI AGENT &",
      subtitle: "VIBE CODING BOOTCAMP",
      fullName: "AI Agent & Vibe Coding Bootcamp",
      level: "Core Program",
      levelBadgeClass: "bg-blue-50 text-blue-600 border border-blue-100/50",
      status: "active", 
      statusLabel: "Đang học",
      statusClass: "bg-emerald-50 text-emerald-700 border border-emerald-150/50",
      progress: progressPercent,
      lessonsText: `${completedLessonIds.length}/${totalLessonsCount} bài học đã xong`,
      lastActivity: "20 phút trước",
      nextLesson: "Xây dựng AI landing page với Vibe Coding",
      ctaLabel: "Vào học tiếp",
      actionType: "continue"
    },
    {
      id: "course-2",
      title: "PROMPTING +",
      subtitle: "AI MINI COURSE",
      fullName: "Prompting + AI Tools Mini Course",
      level: "Starter",
      levelBadgeClass: "bg-slate-50 text-slate-600 border border-slate-150",
      status: "completed",
      statusLabel: "Đã hoàn thành",
      statusClass: "bg-blue-50 text-blue-600 border border-blue-100",
      progress: 100,
      lessonsText: "10/10 bài học đã xong",
      lastActivity: "14/12/2025",
      nextLesson: "Chứng chỉ điện tử đã sẵn sàng tải về",
      ctaLabel: "Xem lại bài học",
      actionType: "review"
    },
    {
      id: "course-3",
      title: "ADVANCED",
      subtitle: "AGENT AUTOMATION",
      fullName: "Advanced AI Agent Automation",
      level: "Advanced Program",
      levelBadgeClass: "bg-purple-50 text-purple-600 border border-purple-100/50",
      status: "pending",
      statusLabel: "Chưa học được",
      statusClass: "bg-red-50 text-red-700 border border-red-100/50",
      progress: 0,
      lessonsText: "0/18 bài học",
      lastActivity: "Chưa bắt đầu",
      nextLesson: "Khóa học chưa sẵn sàng để học. Vui lòng liên hệ hỗ trợ để được kiểm tra quyền truy cập.",
      ctaLabel: "Hỗ trợ học viên",
      actionType: "unavailable_support"
    },
    {
      id: "course-4",
      title: "FULLSTACK",
      subtitle: "DEV WITH AGENTS",
      fullName: "Fullstack Web & Advanced AI Integration",
      level: "Advanced Program",
      levelBadgeClass: "bg-purple-50 text-purple-600 border border-purple-100/50",
      status: "expired",
      statusLabel: "Hết hạn thẻ",
      statusClass: "bg-red-50 text-red-700 border border-red-100/50",
      progress: 45,
      lessonsText: "9/20 bài học",
      lastActivity: "3 tháng trước",
      nextLesson: "Vui lòng liên hệ hỗ trợ nâng cấp gia hạn học tập",
      ctaLabel: "Hỗ trợ học viên",
      actionType: "expired_support"
    }
  ];

  const handleCtaClick = (course: typeof registeredCourses[0]) => {
    if (course.actionType === "continue" || course.actionType === "review") {
      onContinueLearning();
    } else if (course.actionType === "expired_support" || course.actionType === "unavailable_support") {
      onOpenSupport();
    }
  };

  const handleSummaryClick = (course: typeof registeredCourses[0]) => {
    if (course.status === "completed") {
      onCheckCertificate();
    } else if (course.status === "active") {
      onContinueLearning();
    } else {
      onOpenSupport();
    }
  };

  return (
    <div className="space-y-6 font-sans text-left selection:bg-blue-100 pb-8 animate-fade-in" id="my_courses_page">
      
      {/* A. Page Header - Beautiful & Minimal */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none">
        <div className="space-y-1">
          <h1 className="text-xl font-extrabold text-gray-950 tracking-tight flex items-center gap-2">
            Khóa học của tôi
          </h1>
          <p className="text-gray-500 font-medium text-xs">
            Theo dõi tiến trình bài giảng, tài liệu bổ trợ và tiếp tục học tập.
          </p>
        </div>

        <button
          onClick={() => onNavigateToTab("orders")}
          className="inline-flex items-center space-x-1 px-3 py-2 border border-gray-200 hover:bg-gray-55 text-gray-700 font-bold text-xs rounded-xl transition-all cursor-pointer shadow-5xs"
        >
          <Compass size={13} className="text-gray-500" />
          <span>Tìm hiểu khóa học khác</span>
          <ArrowUpRight size={12} className="text-gray-400" />
        </button>
      </div>

      {/* C. Clean high-fidelity List of registered courses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {registeredCourses.map((course) => {
          const isCompleted = course.status === "completed";
          const isPending = course.status === "pending";
          const isExpired = course.status === "expired";
          const isUnavailable = isPending || isExpired;

          return (
            <div
              key={course.id}
              className={`bg-white border border-gray-100 rounded-3xl p-3.5 shadow-xs flex flex-col justify-between transition-all duration-200 ${
                isUnavailable 
                  ? "opacity-75" 
                  : "hover:border-blue-100/80 hover:shadow-2xs"
              }`}
            >
              <div className="space-y-2.5">
                {/* Inner Grey Container Block exactly mirroring Dashboard's current course container */}
                <div 
                  onClick={() => handleCtaClick(course)}
                  className="relative flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-gray-50/20 hover:bg-blue-50/15 border border-gray-100/40 hover:border-blue-100/50 p-3 rounded-2xl cursor-pointer active:scale-[0.995] transition-all duration-200"
                >
                  {/* Absolute Program Badges in the top-right corner of the grey container */}
                  <div className="absolute top-3 right-3 flex items-center space-x-1.5 leading-none z-10">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wide ${course.levelBadgeClass}`}>
                      {course.level}
                    </span>
                  </div>

                  <div className="relative shrink-0 select-none">
                    <CourseCover
                      size="md"
                      title={course.title}
                      subtitle={course.subtitle}
                    />
                    {isCompleted && (
                      <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1 border-2 border-white shadow-4xs">
                        <CheckCircle size={10} />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col justify-between sm:h-32 sm:py-0.5 gap-3 sm:gap-0 w-full">
                    <div className="space-y-1.5 pr-24 text-left">
                      <div className="flex items-center space-x-1.5 leading-none">
                        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                          isCompleted ? "bg-blue-500" : isUnavailable ? "bg-red-500" : "bg-green-500"
                        }`} />
                        <span className={`text-[11px] font-bold uppercase tracking-wider ${
                          isCompleted ? "text-blue-600" : isUnavailable ? "text-red-600" : "text-green-600"
                        }`}>
                          {course.statusLabel}
                        </span>
                      </div>
                      <h4 className="font-bold text-base text-gray-900 leading-tight">
                        {course.fullName}
                      </h4>
                      <div className="flex items-center space-x-1.5 text-[10px] text-gray-400 font-semibold font-mono">
                        <Calendar size={11} className="text-gray-400" />
                        <span>Học gần nhất: {course.lastActivity}</span>
                      </div>
                    </div>

                    {/* Progress tracking info synchronized with dashboard sizes */}
                    <div className="space-y-1 text-left">
                      <div className="flex items-center justify-between text-[13px] font-semibold text-gray-500">
                        <span>Tiến độ khóa học</span>
                        <span className="font-mono text-gray-900 font-bold text-sm">
                          {course.progress}%
                        </span>
                      </div>
                      <div className="relative w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`absolute left-0 top-0 h-full rounded-full transition-all duration-300 ${
                            isCompleted ? "bg-green-500" : isUnavailable ? "bg-gray-400" : "bg-blue-600"
                          }`}
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      <div className="text-[11px] text-gray-400 font-semibold font-mono">
                        {course.lessonsText}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtitle summary context box */}
                <button
                  type="button"
                  onClick={() => handleSummaryClick(course)}
                  className="w-full bg-gray-50/50 border border-gray-100 text-[11px] rounded-xl p-3 flex items-start gap-2 select-none text-left cursor-pointer hover:border-blue-100 hover:bg-blue-50/30 transition-colors"
                >
                  {isCompleted ? (
                    <CheckCircle size={12} className="text-green-500 flex-shrink-0 mt-0.5" />
                  ) : isUnavailable ? (
                    <Clock size={12} className="text-red-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Clock size={12} className="text-blue-500 flex-shrink-0 mt-0.5" />
                  )}
                  
                  <div className="space-y-0.5 text-left leading-normal">
                    <span className="text-[9px] font-extrabold text-gray-400 block uppercase tracking-wider leading-none">
                      {isCompleted ? "Trạng thái hoàn tất" : isUnavailable ? "Trạng thái truy cập" : "Nội dung bài học tiếp theo"}
                    </span>
                    <span className="font-sans font-bold text-gray-700">
                      {course.nextLesson}
                    </span>
                  </div>
                </button>

              </div>

              {/* Bottom level support prompt + CTA action call */}
              <div className="mt-3.5 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                {isCompleted ? (
                  <button
                    onClick={onCheckCertificate}
                    className="inline-flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-700 font-extrabold cursor-pointer hover:underline"
                  >
                    <Award size={13} className="text-blue-500" />
                    <span>Xem chứng chỉ của tôi</span>
                  </button>
                ) : (
                  <span className="text-[10px] text-gray-400 font-mono font-semibold">
                    ID: {course.id.toUpperCase()}
                  </span>
                )}

                <button
                  onClick={() => handleCtaClick(course)}
                  className={`inline-flex items-center justify-center space-x-1.5 font-bold text-xs w-44 py-2.5 rounded-xl active:scale-97 transition-all cursor-pointer shadow-xs ${
                    isUnavailable
                      ? "bg-white border border-red-500 text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 shadow-red-500/10 hover:shadow-red-500/25"
                      : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/10 hover:shadow-blue-500/25"
                  }`}
                >
                  <span>{course.ctaLabel}</span>
                  <ChevronRight size={13} />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Simple CTA Banner to Buy More Courses */}
      <div 
        onClick={() => onNavigateToTab("orders")}
        className="w-full bg-gray-50 rounded-2xl p-3.5 px-5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4.5 cursor-pointer select-none text-center sm:text-left"
      >
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-750">
          <Sparkles size={14} className="text-blue-500 shrink-0" />
          <span>Mở khóa toàn bộ lộ trình học từ Starter đến Core/Advanced Program với đặc quyền Blueprint Pro.</span>
        </div>
        <span className="text-xs font-black text-blue-600 hover:text-blue-700 transition-colors shrink-0">
          Mua khóa học ngay &rarr;
        </span>
      </div>

      {/* Aesthetic Policy Prompt Card at the Bottom */}
      <div className="bg-blue-50/20 rounded-2xl p-4 max-w-full flex items-start gap-3 select-none">
        <Info size={15} className="text-blue-500 shrink-0 mt-0.5" />
        <div className="text-left space-y-0.5 font-sans">
          <span className="text-[10.5px] font-black text-blue-700 block leading-tight">Điều kiện cấp chứng chỉ tốt nghiệp Excellence</span>
          <p className="text-[10px] text-gray-450 font-normal leading-relaxed">
            Học viên cần đạt tối thiểu 80% tiến trình học tập bài giảng và hoàn thành đầy đủ các bài tập thực hành/Checkpoint để được Hội đồng Học thuật Blueprint kiểm định và cấp chứng chỉ số Excellence điện tử.
          </p>
        </div>
      </div>

    </div>
  );
}
