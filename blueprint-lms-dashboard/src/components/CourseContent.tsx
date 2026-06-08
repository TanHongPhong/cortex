/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import {
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  PlusCircle,
  HelpCircle,
  Lock,
  FileText,
  PlayCircle,
  AlertCircle
} from "lucide-react";
import { Lesson, LessonStatus, LessonType, Module } from "../types";

interface CourseContentProps {
  modules: Module[];
  expandedModuleId: number | null;
  toggleModule: (moduleId: number) => void;
  selectedLessonId: string;
  onSelectLesson: (lesson: Lesson, moduleTitle: string) => void;
  completedLessonIds: string[];
}

export default function CourseContent({
  modules,
  expandedModuleId,
  toggleModule,
  selectedLessonId,
  onSelectLesson,
  completedLessonIds,
}: CourseContentProps) {
  
  // Custom toast notification logic for locked items
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  return (
    <div className="space-y-3 font-sans select-none text-left relative">
      {/* Dynamic notifications toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-gray-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-lg border border-gray-800 flex items-center space-x-2 animate-bounce">
          <AlertCircle size={15} className="text-yellow-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {modules.map((m) => {
        const isExpanded = expandedModuleId === m.id;
        
        // Recompute module progress dynamically based on completedLessonIds
        const moduleCompletedCount = m.lessons.filter(lesson => completedLessonIds.includes(lesson.id)).length;
        const moduleProgressPercent = m.lessons.length > 0
          ? Math.round((moduleCompletedCount / m.lessons.length) * 100)
          : 0;

        return (
          <div
            key={m.id}
            className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xs transition-shadow duration-200"
          >
            {/* Accordion Trigger Header */}
            <div
              onClick={() => toggleModule(m.id)}
              className="flex items-center justify-between p-5 cursor-pointer selection:bg-transparent hover:bg-gray-50/45 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                {/* Visual arrow state indicators */}
                <div className="text-gray-400 transition-transform duration-200">
                  {isExpanded ? <ChevronDown size={18} /> : <span className="transform rotate-270 block"><ChevronDown size={18} /></span>}
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-gray-800 leading-tight">
                    {m.title}
                  </h3>
                  <p className="text-[11px] text-gray-500 font-medium mt-0.5">
                    {moduleCompletedCount} / {m.lessons.length} lessons completed
                  </p>
                </div>
              </div>

              {/* Progress details row */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {/* Miniature beautiful dynamic progress bar */}
                  <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden hidden sm:block">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-300 pointer-events-none"
                      style={{ width: `${moduleProgressPercent}%` }}
                    />
                  </div>
                  <span className="font-mono text-[11px] font-bold text-gray-600">
                    {moduleProgressPercent}%
                  </span>
                </div>
                
                {/* Far-right chevron */}
                <div className="text-gray-400">
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>
            </div>

            {/* Accordion Content Box */}
            {isExpanded && (
              <div className="border-t border-gray-50 divide-y divide-gray-50 bg-white">
                {m.lessons.map((lesson) => {
                  const isCompleted = completedLessonIds.includes(lesson.id);
                  const isSelected = selectedLessonId === lesson.id;
                  
                  // Calculate dynamic status for this lesson
                  let currentStatus: LessonStatus = LessonStatus.LOCKED;
                  
                  if (isCompleted) {
                    currentStatus = LessonStatus.COMPLETED;
                  } else if (isSelected) {
                    currentStatus = LessonStatus.CURRENT;
                  } else {
                    // Rule: first uncompleted lesson is Current/Available, others depend on locks
                    // For simulation/mock robustness, we mark available based on indexing or completed criteria
                    const lessonIndex = m.lessons.findIndex(l => l.id === lesson.id);
                    const previousLessonsCompleted = m.lessons
                      .slice(0, lessonIndex)
                      .every(l => completedLessonIds.includes(l.id));

                    if (previousLessonsCompleted) {
                      currentStatus = LessonStatus.AVAILABLE;
                    } else {
                      currentStatus = LessonStatus.LOCKED;
                    }
                  }

                  // Force 1.3 as current default matching image
                  if (lesson.id === "1.3" && !completedLessonIds.includes("1.3") && selectedLessonId === "1.3") {
                    currentStatus = LessonStatus.CURRENT;
                  }

                  const isLocked = currentStatus === LessonStatus.LOCKED;

                  // Get icon based on lesson type
                  const getLessonIcon = () => {
                    if (lesson.type === LessonType.VIDEO) {
                      return <PlayCircle size={16} className={isSelected ? "text-blue-500" : "text-gray-400"} />;
                    } else if (lesson.type === LessonType.RESOURCE) {
                      return <FileText size={16} className={isSelected ? "text-blue-500" : "text-gray-400"} />;
                    } else {
                      return <HelpCircle size={16} className={isSelected ? "text-blue-500" : "text-gray-400"} />;
                    }
                  };

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => {
                        if (isLocked) {
                          showToast("Bài học này bị khóa. Hãy hoàn thành các bài học trước!");
                          return;
                        }
                        onSelectLesson(lesson, m.title);
                      }}
                      className={`flex flex-col sm:flex-row sm:items-center justify-between px-5 py-3.5 transition-all duration-150 cursor-pointer ${
                        isSelected
                          ? "bg-blue-50/40 border-l-4 border-blue-600 pl-4"
                          : "hover:bg-gray-50/50"
                      } ${isLocked ? "opacity-60 cursor-not-allowed" : ""}`}
                    >
                      {/* Left: Indicator circles & Title */}
                      <div className="flex items-center space-x-3.5 flex-1 min-w-0">
                        {/* Completion / Lock Indicator Circle */}
                        <div className="flex-shrink-0">
                          {isCompleted ? (
                            <CheckCircle2 size={16} className="text-green-500 fill-green-50 animate-fade-in" />
                          ) : isLocked ? (
                            <Lock size={15} className="text-gray-300" />
                          ) : isSelected ? (
                            <div className="w-4 h-4 rounded-full border-2 border-blue-500 flex items-center justify-center bg-blue-50 animate-pulse">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            </div>
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-gray-300 bg-white hover:border-blue-400 transition-colors" />
                          )}
                        </div>

                        {/* Plus indicator next to checkbox */}
                        {!isLocked && (
                          <PlusCircle
                            size={15}
                            className={`flex-shrink-0 ${
                              isSelected
                                ? "text-blue-500 fill-blue-50"
                                : isCompleted
                                ? "text-green-500 fill-green-50"
                                : "text-gray-300 hover:text-blue-400"
                            }`}
                          />
                        )}

                        {/* Lesson metadata */}
                        <div className="flex items-center space-x-2 min-w-0">
                          <span className={`font-mono text-xs font-semibold ${
                            isSelected ? "text-blue-600" : "text-gray-400"
                          }`}>
                            {lesson.id}
                          </span>
                          <span className={`font-sans text-[13px] font-semibold truncate ${
                            isSelected
                              ? "text-blue-600 font-bold"
                              : isLocked
                              ? "text-gray-400"
                              : "text-gray-700"
                          }`}>
                            {lesson.title}
                          </span>
                        </div>
                      </div>

                      {/* Right: Badge, Format tag, Duration */}
                      <div className="flex items-center space-x-4 ml-8 sm:ml-0 mt-2 sm:mt-0 flex-shrink-0 justify-between sm:justify-end">
                        {/* Format Tag */}
                        <span className="px-2 py-0.5 bg-gray-100 rounded-md font-sans text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                          {lesson.type}
                        </span>

                        {/* Duration or Format info */}
                        <span className="font-mono text-xs font-semibold text-gray-500 w-12 text-right">
                          {lesson.duration}
                        </span>

                        {/* High fidelity pill badge status */}
                        <div className="w-20 text-right">
                          {isCompleted ? (
                            <span className="inline-block px-2.5 py-0.5 bg-green-50 text-green-600 rounded-full text-[10px] font-bold tracking-wide leading-none">
                              Completed
                            </span>
                          ) : isSelected ? (
                            <span className="inline-block px-2.5 py-0.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold tracking-wide leading-none animate-pulse">
                              Current
                            </span>
                          ) : isLocked ? (
                            <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 bg-gray-50 text-gray-400 rounded-full text-[10px] font-bold tracking-wide leading-none">
                              <Lock size={9} className="opacity-70" />
                              <span>Locked</span>
                            </div>
                          ) : (
                            <span className="inline-block px-2.5 py-0.5 bg-gray-50 text-gray-500 rounded-full text-[10px] font-bold tracking-wide leading-none">
                              Available
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
