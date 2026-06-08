/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Play, Award, ChevronRight } from "lucide-react";
import CourseCover from "./CourseCover";

interface CourseHeaderProps {
  completedLessonsCount: number;
  totalLessonsCount: number;
  onResumeLast: () => void;
  onCheckCertificate: () => void;
  onBackToCourses: () => void;
}

export default function CourseHeader({
  completedLessonsCount,
  totalLessonsCount,
  onResumeLast,
  onCheckCertificate,
  onBackToCourses,
}: CourseHeaderProps) {
  // Compute percentage dynamically!
  const progressPercent = Math.round((completedLessonsCount / totalLessonsCount) * 100);

  return (
    <div className="space-y-4 font-sans select-none">
      {/* Breadcrumb section */}
      <div className="flex items-center space-x-2.5 text-[13px] text-gray-500 font-medium">
        <span onClick={onBackToCourses} className="hover:text-blue-600 cursor-pointer transition-colors">Khóa học của tôi</span>
        <ChevronRight size={14} className="text-gray-400" />
        <span className="text-gray-800 font-semibold">AI Agent & Vibe Coding Bootcamp</span>
      </div>

      {/* Main card panel */}
      <div className="relative bg-white border border-gray-100 rounded-3xl p-5 flex flex-col md:flex-row gap-5 items-start shadow-xs">
        {/* Compact Course Cover */}
        <CourseCover size="md" />

        {/* Course Metadata Content */}
        <div className="flex-1 space-y-4 w-full">
          {/* Metadata title row */}
          <div className="space-y-1.5 text-left">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight leading-snug">
                AI Agent & Vibe Coding Bootcamp
              </h1>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <span className="px-2.5 py-0.5 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold uppercase tracking-wide">
                  Core Program
                </span>
                <span className="px-2.5 py-0.5 bg-green-50 text-green-600 rounded-full text-xs font-semibold uppercase tracking-wide">
                  Active
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-xl">
              Học cách xây website, AI assistant và workflow tự động bằng AI tools.
            </p>
          </div>

          {/* Progress Indicators & Action Buttons inline */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pt-1.5">
            {/* Progress indicators */}
            <div className="flex-1 space-y-2 text-left w-full">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 font-semibold">Tiến độ khóa học</span>
                <span className="text-gray-900 font-bold font-mono">{progressPercent}%</span>
              </div>
              
              {/* Dynamic Custom Progress Bar Tracker */}
              <div className="relative w-full h-[6px] bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-blue-600 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(37,99,235,0.2)]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="text-[12px] text-gray-500 font-medium">
                <span className="text-blue-600 font-bold font-mono">{completedLessonsCount}</span>
                {" / "}
                <span className="text-gray-700 font-semibold font-mono">{totalLessonsCount}</span> lessons completed
              </div>
            </div>

            {/* Actions panel */}
            <div className="flex-shrink-0 w-full sm:w-auto">
              <button
                onClick={onResumeLast}
                className="flex items-center justify-center space-x-2 bg-gray-950 text-white hover:bg-gray-800 hover:shadow-md hover:shadow-black/10 active:scale-98 text-[13px] font-bold px-5 py-3 rounded-xl transition-all duration-200 group w-full sm:w-auto cursor-pointer"
              >
                <Play size={14} fill="currentColor" className="text-white animate-pulse" />
                <span>Học tiếp bài gần nhất</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
