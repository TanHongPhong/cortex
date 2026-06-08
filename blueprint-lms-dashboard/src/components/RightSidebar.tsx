/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import {
  User,
  GraduationCap,
  Sparkles,
  BookOpen,
  Clock,
  Calendar,
  Play,
  ClipboardList,
  CheckCircle2,
  Hourglass
} from "lucide-react";
import { Lesson, LessonStatus } from "../types";

interface RightSidebarProps {
  selectedLesson: Lesson;
  selectedLessonModuleTitle: string;
  onStudyLesson: (lessonId: string) => void;
  completedLessonIds: string[];
  totalLessonsCount: number;
}

export default function RightSidebar({
  selectedLesson,
  selectedLessonModuleTitle,
  onStudyLesson,
  completedLessonIds,
  totalLessonsCount,
}: RightSidebarProps) {
  // Compute dynamic legend values based on actual states
  const completedCount = completedLessonIds.length;
  
  // A lesson is "in progress" if it is the current selected one and indeed not completed yet
  const inProgressCount = completedLessonIds.includes(selectedLesson.id) ? 0 : 1;
  const notStartedCount = Math.max(0, totalLessonsCount - completedCount - inProgressCount);

  // Compute percentage dynamically for donut chart
  const progressPercent = Math.round((completedCount / totalLessonsCount) * 100);

  // SVG parameters for the dynamic donut chart
  const radius = 35;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="w-full lg:w-92 flex-shrink-0 space-y-4 font-sans select-none text-left">
      
      {/* 1. Thông tin khóa học */}
      <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-xs space-y-4">
        <h3 className="text-[14px] font-bold text-gray-800 tracking-tight">
          Thông tin khóa học
        </h3>
        
        <div className="space-y-3.5 text-xs font-medium">
          {/* Row: Giảng viên */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5 text-gray-400">
              <User size={15} />
              <span>Giảng viên</span>
            </div>
            <span className="text-gray-700 font-semibold">Blueprint Team</span>
          </div>

          {/* Row: Cấp độ */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5 text-gray-400">
              <GraduationCap size={15} />
              <span>Cấp độ</span>
            </div>
            <span className="text-gray-700 font-semibold text-blue-600 bg-blue-50/60 px-2 py-0.5 rounded-md">Core Program</span>
          </div>

          {/* Row: Tổng số bài học */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5 text-gray-400">
              <BookOpen size={15} />
              <span>Tổng số bài học</span>
            </div>
            <span className="text-gray-700 font-bold font-mono">{totalLessonsCount} lessons</span>
          </div>

          {/* Row: Thời lượng */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5 text-gray-400">
              <Clock size={15} />
              <span>Thời lượng</span>
            </div>
            <span className="text-gray-700 font-semibold font-mono">~ 6 giờ</span>
          </div>

          {/* Row: Ngày đăng ký */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5 text-gray-400">
              <Calendar size={15} />
              <span>Ngày đăng ký</span>
            </div>
            <span className="text-gray-700 font-semibold font-mono">21/05/2026</span>
          </div>

          {/* Row: Trạng thái */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5 text-gray-400">
              <Sparkles size={15} />
              <span>Trạng thái</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-gray-700 font-bold">Đang học</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bài tập / Project */}
      <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-xs space-y-4">
        <h3 className="text-[14px] font-bold text-gray-800 tracking-tight">
          Bài tập / Project
        </h3>

        <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100/60 space-y-4">
          <div className="space-y-1.5 text-left">
            <h4 className="text-xs font-bold text-gray-700 leading-snug">
              Bài tập: Viết prompt tạo layout
            </h4>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 bg-amber-55/15 text-amber-600 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Đang chờ duyệt</span>
            </div>
          </div>

          <button className="w-full py-2.5 text-xs font-bold text-gray-700 bg-white border border-gray-200/80 hover:border-gray-300 hover:text-gray-900 rounded-xl transition-colors active:scale-98">
            Xem bài đã nộp
          </button>
        </div>
      </div>

      {/* 4. Tiến độ tổng quan */}
      <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-xs space-y-4">
        <h3 className="text-[14px] font-bold text-gray-800 tracking-tight">
          Tiến độ tổng quan
        </h3>

        <div className="flex items-center justify-between">
          {/* Elegant Circular Progress SVG donut */}
          <div className="relative w-24 h-24 flex items-center justify-center flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              {/* Background circle track */}
              <circle
                cx="48"
                cy="48"
                r={radius}
                className="stroke-gray-100"
                strokeWidth={strokeWidth}
                fill="transparent"
              />
              {/* Filled circle track */}
              <circle
                cx="48"
                cy="48"
                r={radius}
                className="stroke-blue-600 transition-all duration-500 ease-out"
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-bold font-mono text-[18px] text-gray-900 leading-none">
                {progressPercent}%
              </span>
            </div>
          </div>

          {/* Legend section */}
          <div className="flex-1 ml-5 space-y-2 text-xs font-semibold text-gray-500">
            {/* Legend: Completed */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span>Completed</span>
              </div>
              <span className="text-gray-800 font-bold font-mono">{completedCount}</span>
            </div>

            {/* Legend: In progress */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span>In progress</span>
              </div>
              <span className="text-gray-800 font-bold font-mono">{inProgressCount}</span>
            </div>

            {/* Legend: Not started */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-gray-300" />
                <span>Not started</span>
              </div>
              <span className="text-gray-800 font-bold font-mono">{notStartedCount}</span>
            </div>

            {/* divider line */}
            <div className="h-[1px] bg-gray-50 w-full my-1.5" />

            {/* Legend: Total */}
            <div className="flex items-center justify-between font-bold">
              <span>Tổng cộng</span>
              <span className="text-gray-900 font-extrabold font-mono">{totalLessonsCount}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
