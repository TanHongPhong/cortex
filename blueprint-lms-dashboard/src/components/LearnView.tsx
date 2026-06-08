/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import {
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Play,
  PlayCircle,
  Clock,
  Check,
  CheckCircle,
  Bookmark,
  Volume2,
  Maximize2,
  Settings,
  Lightbulb,
  BookOpen,
  ArrowLeft,
  ArrowRight,
  UploadCloud,
  Lock,
  FileText,
  X,
  File,
  TrendingUp,
  HelpCircle,
  Award,
  Sparkles,
  Link,
  FileCode
} from "lucide-react";
import { Lesson, LessonStatus, LessonType, Module } from "../types";

interface LearnViewProps {
  modules: Module[];
  selectedLesson: Lesson;
  onSelectLesson: (lesson: Lesson, moduleTitle: string) => void;
  completedLessonIds: string[];
  onToggleComplete: (lessonId: string) => void;
  totalLessonsCount: number;
  onBackToCourses?: () => void;
  onBackToOverview?: () => void;
}

export default function LearnView({
  modules,
  selectedLesson,
  onSelectLesson,
  completedLessonIds,
  onToggleComplete,
  totalLessonsCount,
  onBackToCourses,
  onBackToOverview,
}: LearnViewProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "resources">("overview");
  const [expandedModuleId, setExpandedModuleId] = useState<number | null>(2); // Module 2 default expanded as in image

  // Assignment submissions tracking per lesson id
  interface SubmissionItem {
    fileName?: string;
    fileSize?: string;
    textDescription?: string;
    attachedLink?: string;
    isSubmitted: boolean;
    submittedAt?: string;
  }
  const [submissions, setSubmissions] = useState<Record<string, SubmissionItem>>({});
  const [assignmentText, setAssignmentText] = useState("");
  const [assignmentLink, setAssignmentLink] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync draft states when active lesson transitions
  React.useEffect(() => {
    const activeSub = submissions[selectedLesson.id];
    if (activeSub) {
      setAssignmentText(activeSub.textDescription || "");
      setAssignmentLink(activeSub.attachedLink || "");
    } else {
      setAssignmentText("");
      setAssignmentLink("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLesson.id]);
  
  // Custom Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const completedCount = completedLessonIds.length;
  // Compute percentage progress safely
  const progressPercent = Math.round((completedCount / totalLessonsCount) * 100);
  const isLessonCompleted = completedLessonIds.includes(selectedLesson.id);

  // Helper check for lesson type
  const isAssignment = selectedLesson.type === LessonType.QUIZ || selectedLesson.id === "2.3";

  // Find active module for layout context
  const activeModule = modules.find(m => m.lessons.some(l => l.id === selectedLesson.id)) || modules[0];

  React.useEffect(() => {
    if (activeModule) {
      setExpandedModuleId(activeModule.id);
    }
  }, [selectedLesson.id, activeModule]);

  // Logic to navigate prior and next lessons
  const allLessonsWithSubtitles: { lesson: Lesson; moduleTitle: string }[] = [];
  modules.forEach(m => {
    m.lessons.forEach(l => {
      allLessonsWithSubtitles.push({ lesson: l, moduleTitle: m.title });
    });
  });

  const activeIndex = allLessonsWithSubtitles.findIndex(item => item.lesson.id === selectedLesson.id);
  const prevItem = activeIndex > 0 ? allLessonsWithSubtitles[activeIndex - 1] : null;
  const nextItem = activeIndex < allLessonsWithSubtitles.length - 1 ? allLessonsWithSubtitles[activeIndex + 1] : null;

  const handlePrevClick = () => {
    if (prevItem) {
      onSelectLesson(prevItem.lesson, prevItem.moduleTitle);
      // Auto expand module
      const mod = modules.find(m => m.lessons.some(l => l.id === prevItem.lesson.id));
      if (mod) setExpandedModuleId(mod.id);
    }
  };

  const handleNextClick = () => {
    if (nextItem) {
      onSelectLesson(nextItem.lesson, nextItem.moduleTitle);
      // Auto expand module
      const mod = modules.find(m => m.lessons.some(l => l.id === nextItem.lesson.id));
      if (mod) setExpandedModuleId(mod.id);
    }
  };

  // Determine current overview outcomes depending on active lesson
  const getOutcomes = () => {
    if (selectedLesson.id === "2.3") {
      return [
        "Hiểu cách tạo layout landing page bằng AI",
        "Sử dụng AI để tạo nội dung và bố cục",
        "Tối ưu UI/UX cho landing page",
        "Deploy landing page lên nền tảng miễn phí"
      ];
    }
    if (selectedLesson.id.startsWith("1.")) {
      return [
        "Nắm rõ kiến thức cơ bản về Prompt Engineering và mô hình ngôn ngữ lớn",
        "Thực hành viết các prompt có cấu trúc rõ ràng, mạch lạc",
        "Biết cách lắp ghép công cụ AI vào quy trình làm việc hàng ngày"
      ];
    }
    return [
      "Thực hành trực tiếp ứng dụng công cụ hỗ trợ thông minh",
      "Triển khai tính năng code thực tế theo đúng tài liệu thiết kế",
      "Tối ưu hóa tài nguyên phần mềm và cấu hình môi trường"
    ];
  };

  const getDurationText = () => {
    if (selectedLesson.id === "2.3") return "60 phút";
    if (selectedLesson.id === "1.3") return "22 phút";
    if (selectedLesson.duration && selectedLesson.duration !== "--") return selectedLesson.duration;
    return "15 phút";
  };

  // Drag and Drop files upload handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const sizeStr = (file.size / (1024 * 1024)).toFixed(1) + " MB";
      setSubmissions(prev => ({
        ...prev,
        [selectedLesson.id]: {
          ...prev[selectedLesson.id],
          fileName: file.name,
          fileSize: sizeStr,
          isSubmitted: false
        }
      }));
      showToast(`Đã kéo thả file "${file.name}" thành công.`);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const sizeStr = (file.size / (1024 * 1024)).toFixed(1) + " MB";
      setSubmissions(prev => ({
        ...prev,
        [selectedLesson.id]: {
          ...prev[selectedLesson.id],
          fileName: file.name,
          fileSize: sizeStr,
          isSubmitted: false
        }
      }));
      showToast(`Đã chọn file "${file.name}" thành công.`);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setSubmissions(prev => {
      const updated = { ...prev };
      if (updated[selectedLesson.id]) {
        updated[selectedLesson.id] = {
          ...updated[selectedLesson.id],
          fileName: undefined,
          fileSize: undefined
        };
      }
      return updated;
    });
    showToast("Đã xóa file đã chọn.");
  };

  const handleFinalSubmit = () => {
    const currentSub = submissions[selectedLesson.id];
    const hasFile = !!(currentSub && currentSub.fileName);
    const hasText = !!(assignmentText.trim());
    const hasLink = !!(assignmentLink.trim());

    if (!hasFile && !hasText && !hasLink) {
      showToast("Vui lòng tải file lên, viết mô tả hoặc đính kèm link liên kết!");
      return;
    }

    setSubmissions(prev => ({
      ...prev,
      [selectedLesson.id]: {
        ...prev[selectedLesson.id],
        textDescription: assignmentText.trim(),
        attachedLink: assignmentLink.trim(),
        isSubmitted: true,
        submittedAt: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }) + " Hôm nay"
      }
    }));
    
    // Auto toggle completion standard of the assignment
    if (!completedLessonIds.includes(selectedLesson.id)) {
      onToggleComplete(selectedLesson.id);
    }

    showToast("Nộp bài tập thành công! Admin Blueprint sẽ chấm bài sớm.");
  };

  const currentSubmission = submissions[selectedLesson.id];
  const hasSub = currentSubmission && currentSubmission.isSubmitted;

  return (
    <div className="space-y-6 font-sans text-left selection:bg-blue-100 relative" id="learning_workspace">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 border border-gray-800 text-white rounded-2xl px-4 py-3.5 shadow-xl text-xs font-semibold flex items-center space-x-2 animate-fade-in">
          <Sparkles size={14} className="text-blue-400 animate-spin" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Breadcrumbs Path */}
      <div className="flex flex-wrap items-center gap-1.5 text-[13px] text-gray-500 font-semibold select-none">
        <span onClick={onBackToCourses} className="hover:text-blue-600 cursor-pointer transition-colors">Khóa học của tôi</span>
        <ChevronRight size={13} className="text-gray-300" />
        <span onClick={onBackToOverview} className="hover:text-blue-600 cursor-pointer transition-colors">AI Agent & Vibe Coding Bootcamp</span>
        <ChevronRight size={13} className="text-gray-300" />
        <span className="text-gray-800 font-extrabold truncate max-w-xs">
          {selectedLesson.id === "2.3" ? "2.3 " : ""}{selectedLesson.title}
        </span>
      </div>

      {/* 2. Headline & Primary Buttons */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        
        <div className="space-y-1.5 flex-1 text-left">
          {/* Assignment vs Video Badge tag */}
          {isAssignment ? (
            <span className="inline-flex items-center px-2.5 py-0.5 bg-blue-50 text-blue-600 font-black text-[10px] uppercase tracking-wider rounded-md select-none border border-blue-100">
              BÀI TẬP
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 bg-gray-100 text-gray-600 font-black text-[10px] uppercase tracking-wider rounded-md select-none">
              BÀI GIẢNG VIDEO
            </span>
          )}

          <h1 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight leading-tight">
            {selectedLesson.id === "2.3" ? "2.3 " : ""}{selectedLesson.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-3 text-xs select-none pt-0.5">
            {/* Duration / Workload */}
            <div className="flex items-center space-x-1 text-gray-500 font-bold">
              <Clock size={13} className="text-gray-400" />
              <span>{getDurationText()}</span>
            </div>

            {/* Level indicator */}
            <div className="flex items-center space-x-1.5 text-gray-500 font-bold border-l border-gray-200 pl-3">
              <TrendingUp size={13} className="text-gray-400" />
              <span>Cơ bàn</span>
            </div>

            {/* Submissions tracking badge */}
            <div className="border-l border-gray-200 pl-3">
              {hasSub ? (
                <span className="inline-flex items-center px-2 py-0.5 bg-green-50 text-green-700 border border-green-200 rounded-full font-bold text-[9px] uppercase tracking-wide leading-none select-none">
                  Đã nộp bài
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 bg-gray-50 text-gray-500 border border-gray-200 rounded-full font-bold text-[9px] uppercase tracking-wide leading-none select-none">
                  Chưa nộp bài
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Complete Toggle / Save */}
        <div className="flex items-center space-x-2 select-none self-start shrink-0">
          <button
            onClick={() => {
              onToggleComplete(selectedLesson.id);
              showToast(isLessonCompleted ? "Đã hủy đánh dấu hoàn thành." : "Đã lưu trạng thái hoàn thành bài học này.");
            }}
            className={`inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border font-bold text-xs transition-all active:scale-97 cursor-pointer shadow-3xs ${
              isLessonCompleted
                ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100/70"
                : "bg-white text-gray-800 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <Check size={14} className={isLessonCompleted ? "text-green-600" : "text-gray-500"} />
            <span>{isLessonCompleted ? "Đã hoàn thành" : "Đánh dấu hoàn thành"}</span>
          </button>

          <button
            onClick={() => showToast("Đã bookmark thành công!")}
            className="w-9 h-9 border border-gray-200 hover:border-gray-300 rounded-xl bg-white flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors active:scale-97 cursor-pointer"
          >
            <Bookmark size={14} />
          </button>
        </div>

      </div>

      {/* 3. Main Dual-Column Content */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Left main workspace column */}
        <div className="flex-1 w-full space-y-6">
          
          {/* Conditional Layout selection (QUIZ/ASSIGNMENT VS VIDEO) */}
          {isAssignment ? (
            /* Assignment Homework card workspace */
            <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xs text-left">
              
              {/* Task descriptions */}
              <div className="space-y-2">
                <h3 className="text-sm font-extrabold text-gray-800 uppercase tracking-wider leading-none">
                  Mô tả bài tập
                </h3>
                <p className="text-xs md:text-sm text-gray-650 font-medium leading-relaxed">
                  Trong bài tập này, bạn sẽ xây dựng một landing page AI hoàn chỉnh bằng AI, sử dụng prompt và các công cụ AI để tạo layout, nội dung và deploy.
                </p>
              </div>

              {/* Requirements checklist */}
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-extrabold text-gray-800 uppercase tracking-wider leading-none">
                  Yêu cầu
                </h3>
                
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {getOutcomes().map((req, index) => (
                    <li key={index} className="flex items-start space-x-2.5 p-3 rounded-2xl bg-blue-50/10 border border-blue-50/20">
                      <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className="text-xs text-gray-700 font-semibold leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-gray-100 pt-5" />

              {/* Help tip block info */}
              <div className="space-y-2">
                <h3 className="text-sm font-extrabold text-gray-800 uppercase tracking-wider leading-none">
                  Hướng dẫn
                </h3>
                
                <div className="bg-blue-50/30 border border-blue-105/20 rounded-2xl p-4.5 flex gap-3.5 items-start">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <Lightbulb size={14} className="text-blue-550 fill-blue-50/40" />
                  </div>
                  <p className="text-xs text-blue-800 font-bold leading-relaxed">
                    Hãy hoàn thành bài tập theo yêu cầu bên dưới và nộp kết quả để nhận phản hồi từ giảng viên.
                  </p>
                </div>
              </div>

              {/* Homework upload interactive panel */}
              <div className="space-y-3.5 pt-3">
                <h3 className="text-sm font-extrabold text-gray-800 uppercase tracking-wider leading-none">
                  Nộp bài
                </h3>

                <div 
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-3xl p-6 text-center space-y-4 transition-all relative ${
                    dragActive ? "border-blue-500 bg-blue-500/5 scale-[1.01]" : "border-gray-200/80 bg-gray-50/10 hover:border-blue-400"
                  }`}
                >
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    onChange={handleFileChange} 
                    className="hidden" 
                    accept=".zip,.rar,.pdf,.docx,.png,.jpg"
                  />

                  {/* Icon cloud */}
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-4xs">
                    <UploadCloud size={20} className="text-blue-550" />
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                      Kéo thả file vào đây hoặc <span onClick={triggerFileInput} className="text-blue-600 hover:underline cursor-pointer font-bold">chọn file</span> để tải lên
                    </p>
                    <p className="text-[10px] text-gray-400 font-medium">
                      Hỗ trợ .zip, .rar, .pdf, .docx, .png, .jpg (Tối đa 100MB)
                    </p>
                  </div>

                  <button 
                    onClick={triggerFileInput}
                    className="px-4 py-2 border border-gray-200 hover:border-gray-350 text-gray-700 bg-white hover:bg-gray-50 transition-all text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Chọn file
                  </button>
                </div>

                {/* Submissions selector details feedback */}
                {currentSubmission && currentSubmission.fileName ? (
                  <div className="flex items-center justify-between p-3.5 bg-gray-50/80 rounded-2xl border border-gray-100 text-xs animate-fade-in">
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <File size={16} className="text-blue-500 flex-shrink-0" />
                      <div className="min-w-0 leading-tight">
                        <p className="font-bold text-gray-800 truncate select-all">{currentSubmission.fileName}</p>
                        <span className="text-[10px] text-gray-400 font-semibold">{currentSubmission.fileSize} • {currentSubmission.isSubmitted ? "Đã tải lên hệ thống" : "File thô chưa nộp"}</span>
                      </div>
                    </div>
                    
                    {!currentSubmission.isSubmitted ? (
                      <button 
                        onClick={handleRemoveFile}
                        className="p-1 px-2 border border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors rounded-lg font-bold text-[10px] uppercase cursor-pointer"
                      >
                        Xóa
                      </button>
                    ) : (
                      <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100 flex items-center gap-1 leading-none select-none">
                        <Check size={10} strokeWidth={3} /> Đã nộp
                      </span>
                    )}
                  </div>
                ) : (
                  <p className="text-[11px] text-gray-400 font-semibold leading-relaxed">Chưa có file nào được đính kèm (Nộp bằng file là tùy chọn nếu đã điền text/link)</p>
                )}

                {/* Text Description / Script Input */}
                <div className="space-y-1.5 text-left pt-2">
                  <label htmlFor="assignment-desc" className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider">
                    Mô tả bài tập / Kịch bản Prompt / Script
                  </label>
                  <textarea
                    id="assignment-desc"
                    value={assignmentText}
                    onChange={(e) => setAssignmentText(e.target.value)}
                    disabled={hasSub}
                    placeholder="Nhập kịch bản Prompt, mã nguồn script hoặc mô tả thêm về sản phẩm của bạn..."
                    rows={4}
                    className="w-full text-xs font-semibold text-gray-800 bg-gray-50/50 hover:bg-gray-50/30 focus:bg-white border border-gray-200 focus:border-blue-500 rounded-2xl p-4 focus:outline-none transition-all disabled:opacity-85 disabled:bg-gray-100 disabled:select-text placeholder:text-gray-400 font-sans shadow-3xs"
                  />
                </div>

                {/* Attached URL Link Input */}
                <div className="space-y-1.5 text-left pt-1">
                  <label htmlFor="assignment-link" className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider">
                    Liên kết đính kèm (Link Github, Deploy Vercel, Figma...)
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 text-gray-400">
                      <Link size={14} className="text-gray-400 shrink-0" />
                    </div>
                    <input
                      id="assignment-link"
                      type="url"
                      value={assignmentLink}
                      onChange={(e) => setAssignmentLink(e.target.value)}
                      disabled={hasSub}
                      placeholder="https://github.com/tai-khoan/ai-landing-page"
                      className="w-full text-xs font-semibold text-gray-800 bg-gray-50/50 hover:bg-gray-50/30 focus:bg-white border border-gray-200 focus:border-blue-500 rounded-xl py-3 pl-10 pr-3.5 focus:outline-none transition-all disabled:opacity-85 disabled:bg-gray-100 disabled:select-text placeholder:text-gray-400 font-sans shadow-3xs"
                    />
                  </div>
                </div>

                {/* Submit trigger button row */}
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleFinalSubmit}
                    disabled={hasSub}
                    className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white transition-all select-none shadow-sm cursor-pointer ${
                      hasSub
                        ? "bg-green-600 text-white cursor-not-allowed opacity-90"
                        : "bg-blue-600 hover:bg-blue-700 active:scale-97"
                    }`}
                  >
                    {hasSub ? (
                      <>
                        <Check size={14} strokeWidth={2.5} />
                        <span>Đã nộp bài thành công</span>
                      </>
                    ) : (
                      <>
                        <ArrowRight size={14} className="transform rotate-270" />
                        <span>Nộp bài</span>
                      </>
                    )}
                  </button>
                </div>

                {hasSub && (
                  <div className="p-5 bg-green-50/40 border border-green-200/40 rounded-2xl space-y-3 text-xs animate-fade-in text-green-900">
                    <div className="space-y-1">
                      <span className="font-extrabold block text-green-800">Đã ghi nhận bài nộp ({currentSubmission.submittedAt})</span>
                      <span className="block font-medium text-[11px] text-green-700 leading-relaxed">Phòng đào tạo Blueprint Team sẽ tiến hành chấm bài và gửi feedback trực tiếp tới địa chỉ email của bạn trong 24 giờ tới. Bạn có thể tiếp tục tự học các bài tiếp theo!</span>
                    </div>

                    {/* Submitted details summary feedback */}
                    <div className="border-t border-green-200/50 pt-2.5 space-y-2 text-[11px]">
                      {currentSubmission?.textDescription && (
                        <div className="space-y-1 text-left">
                          <span className="font-bold text-green-800 block">Nội dung / Mô tả đã nộp:</span>
                          <div className="bg-white/90 border border-green-100 rounded-xl p-3 font-mono text-gray-750 whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto select-text">
                            {currentSubmission.textDescription}
                          </div>
                        </div>
                      )}
                      
                      {currentSubmission?.attachedLink && (
                        <div className="flex flex-wrap items-center gap-1.5 text-left">
                          <span className="font-bold text-green-800">Link liên kết đã nộp:</span>
                          <a 
                            href={currentSubmission.attachedLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-600 hover:underline hover:text-blue-700 font-semibold inline-flex items-center gap-1"
                          >
                            <span className="truncate max-w-sm">{currentSubmission.attachedLink}</span>
                            <Link size={10} />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}

              </div>

            </div>
          ) : (
            /* Regular Video Viewport container player workspace */
            <div className="space-y-6">
              
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#0a0f1d] border border-gray-950/20 shadow-lg group flex flex-col justify-end">
                
                <div className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-30" style={{
                  backgroundImage: "radial-gradient(#1e40af 1px, transparent 1px)",
                  backgroundSize: "24px 24px"
                }} />

                <div className="absolute top-1/4 left-1/3 w-72 h-72 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />

                <div className="absolute inset-x-8 top-8 bottom-16 z-10 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
                  
                  <div className="space-y-4 text-left max-w-md">
                    <span className="inline-flex px-2.5 py-0.5 bg-blue-600 text-white font-extrabold text-[10px] tracking-wide rounded select-none">
                      {selectedLesson.id.startsWith("1.") ? "MODULE 1" : "MODULE 2"}
                    </span>

                    <div className="space-y-1">
                      <h4 className="text-[10px] font-mono font-extrabold tracking-widest text-blue-450 uppercase leading-none drop-shadow-sm text-blue-450 select-none">
                        {selectedLesson.id.startsWith("1.") ? "AI WORKFLOW BASICS" : "VIBE CODING BASICS"}
                      </h4>
                      <h2 className="text-xl md:text-2xl font-black font-sans text-white tracking-tight leading-snug drop-shadow-md">
                        {selectedLesson.title}
                      </h2>
                    </div>
                  </div>

                  <div className="w-56 h-40 bg-[#0e1628] border border-gray-800 rounded-xl relative shadow-2xl flex-shrink-0 overflow-hidden items-center justify-center flex select-none">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/15 to-indigo-900/20" />
                    
                    <div className="absolute top-0 inset-x-0 h-4 bg-gray-900/60 border-b border-gray-800 flex items-center px-2 space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-450 bg-amber-400" />
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    </div>

                    <div className="space-y-2 text-center p-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-600/10 border border-blue-500/30 flex items-center justify-center mx-auto text-blue-500">
                        <Play size={18} fill="currentColor" className="ml-0.5" />
                      </div>
                      <span className="text-[9px] font-mono text-gray-500 block uppercase tracking-wider font-semibold">Video Viewport Mock</span>
                    </div>
                  </div>

                </div>

                {/* Video controls */}
                <div className="absolute bottom-0 inset-x-0 h-14 bg-gray-950/95 border-t border-gray-900/60 flex items-center justify-between px-4 text-gray-400 select-none z-20">
                  <div className="flex items-center space-x-3 text-xs">
                    <button
                      onClick={() => onToggleComplete(selectedLesson.id)}
                      className="hover:text-white transition-colors active:scale-95 cursor-pointer"
                    >
                      <Play size={13} fill="currentColor" />
                    </button>

                    <button className="hover:text-white transition-colors cursor-pointer">
                      <Volume2 size={14} />
                    </button>

                    <div className="text-[11px] font-mono font-bold font-semibold">
                      00:00 / {selectedLesson.id === "1.3" ? "22:15" : "15:00"}
                    </div>
                  </div>

                  <div className="flex-1 mx-6 relative h-1 bg-gray-800 rounded-full cursor-pointer hidden sm:block">
                    <div className="absolute left-0 top-0 h-full w-1/3 bg-blue-600 rounded-full" />
                    <div className="absolute left-[33%] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white border border-blue-600 shadow-sm" />
                  </div>

                  <div className="flex items-center space-x-3 text-xs font-mono font-bold">
                    <span className="hover:text-white cursor-pointer select-none">1x</span>
                    <button className="hover:text-white transition-colors cursor-pointer" title="Phụ đề giọng đọc">
                      <span className="border border-gray-600 px-1 py-0.2 text-[9px] rounded font-semibold font-sans tracking-wide leading-none hover:border-gray-400">CC</span>
                    </button>
                    <button className="hover:text-white transition-colors cursor-pointer">
                      <Settings size={13} />
                    </button>
                    <button className="hover:text-white transition-colors cursor-pointer">
                      <Maximize2 size={13} />
                    </button>
                  </div>
                </div>

              </div>

              {/* Sub tabs selection */}
              <div className="flex items-center space-x-4 border-b border-gray-100 select-none">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`pb-2.5 text-xs font-bold transition-all cursor-pointer relative ${
                    activeTab === "overview" ? "text-blue-600 font-extrabold" : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <span>Tổng quan</span>
                  {activeTab === "overview" && (
                    <div className="absolute bottom-0 inset-x-0 h-0.5 bg-blue-600 rounded-full animate-fade-in" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("resources")}
                  className={`pb-2.5 text-xs font-bold transition-all cursor-pointer relative ${
                    activeTab === "resources" ? "text-blue-600 font-extrabold" : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <span>Tài liệu & tài nguyên</span>
                  {activeTab === "resources" && (
                    <div className="absolute bottom-0 inset-x-0 h-0.5 bg-blue-600 rounded-full animate-fade-in" />
                  )}
                </button>
              </div>

              {activeTab === "overview" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border border-gray-100 rounded-2xl p-4 space-y-3.5 shadow-5xs">
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide border-b border-gray-50 pb-2 leading-none select-none">
                      Sau bài học này bạn sẽ:
                    </h3>
                    <ul className="space-y-2.5 text-[12px] font-semibold text-gray-750">
                      {getOutcomes().map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <div className="w-4 h-4 rounded-full bg-green-50 text-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check size={10} strokeWidth={3} />
                          </div>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-50/20 border border-blue-100/30 rounded-2xl p-4 space-y-3 flex flex-col justify-start">
                    <div className="flex items-center space-x-2 text-blue-605 select-none font-bold text-xs">
                      <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <Lightbulb size={13} className="text-blue-550 animate-pulse" />
                      </div>
                      <span className="text-blue-700">Mẹo học tập</span>
                    </div>
                    <p className="text-[12px] text-blue-900/80 font-semibold leading-relaxed text-left">
                      Hãy thử làm theo từng bước trong bài học và áp dụng ngay trên AI tool bạn đang dùng để tăng hiệu quả gấp 10 lần nhé.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-gray-100 rounded-2xl p-5 text-center py-8 select-none space-y-2 shadow-5xs">
                  <BookOpen size={20} className="text-gray-400 mx-auto" />
                  <div>
                    <span className="text-xs font-bold text-gray-800 block">Không có tài liệu nộp kèm</span>
                    <p className="text-[11px] text-gray-500 max-w-xs mx-auto leading-relaxed mt-1">
                      Vui lòng quay lại tab nội dung khóa học để đọc hoặc tải tài liệu Module 1.
                    </p>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* D. Bottom navigation index buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-100 pt-5 gap-3">
            <div className="flex items-center space-x-2 self-start sm:self-auto select-none">
              <button
                onClick={handlePrevClick}
                disabled={!prevItem}
                className="inline-flex items-center space-x-1 px-3.5 py-2.5 bg-white hover:bg-gray-55 border border-gray-200 hover:border-gray-300 text-gray-700 font-bold text-xs rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-97 cursor-pointer"
              >
                <ArrowLeft size={13} />
                <span>Bài trước</span>
              </button>

              {prevItem && (
                <span className="text-[11px] text-gray-450 font-bold max-w-40 truncate hidden lg:inline">
                  {prevItem.lesson.id} {prevItem.lesson.title}
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2 select-none self-end sm:self-auto">
              {nextItem && (
                <span className="text-[11px] text-gray-450 font-bold max-w-40 truncate hidden lg:inline text-right">
                  {nextItem.lesson.id} {nextItem.lesson.title}
                </span>
              )}

              <button
                onClick={handleNextClick}
                disabled={!nextItem}
                className="inline-flex items-center space-x-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-97 cursor-pointer"
              >
                <span>Bài tiếp theo</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN SIDEBAR: Academic metrics tracking & Interactive syllabus tree index */}
        <div className="w-full lg:w-80 flex-shrink-0 space-y-4">
          
          {/* Card 1: Academic progress metric box with Trend icon matching image */}
          <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-xs space-y-3.5">
            <h3 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest select-none leading-none text-left">
              Tiến độ học tập
            </h3>
            
            <div className="flex items-center justify-between select-none">
              <div className="space-y-0.5 text-left">
                <span id="progress_metric_large" className="text-3xl font-black text-gray-900 leading-none">
                  {progressPercent}%
                </span>
                <p className="text-[10px] text-gray-450 font-bold font-mono">
                  {completedCount} / {totalLessonsCount} bài đã hoàn thành
                </p>
              </div>

              {/* Light blue Trend Box containing diagonal TrendingUp icon */}
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <TrendingUp size={16} />
              </div>
            </div>

            {/* Simulated progress slider bar */}
            <div className="relative w-full h-1.5 bg-gray-100 rounded-full overflow-hidden select-none">
              <div
                className="absolute left-0 top-0 h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Card 2: Collapsible list of syllabus outline catalog */}
          <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-xs space-y-3 text-left">
            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider border-b border-gray-50 pb-2 select-none leading-none">
              Nội dung khóa học
            </h3>

            <div className="space-y-2">
              {modules.map((m) => {
                const isExpanded = expandedModuleId === m.id;
                const moduleCompletedLessons = m.lessons.filter(l => completedLessonIds.includes(l.id));

                return (
                  <div key={m.id} className="border border-gray-100 rounded-2xl overflow-hidden bg-gray-50/5 hover:bg-gray-50/10 transition-colors">
                    
                    {/* Collapsible header banner */}
                    <div
                      onClick={() => setExpandedModuleId(isExpanded ? null : m.id)}
                      className="p-3.5 flex items-center justify-between cursor-pointer select-none"
                    >
                      <div className="min-w-0 pr-1 text-left">
                        <span className="text-[11px] font-bold text-gray-800 leading-tight block truncate">
                          {m.title}
                        </span>
                        <span className="text-[9px] font-semibold text-gray-400 mt-0.5 font-mono block">
                          {moduleCompletedLessons.length}/{m.lessons.length} bài hoàn thành
                        </span>
                      </div>

                      <div className="text-gray-450 shrink-0">
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </div>
                    </div>

                    {/* Expanded modules lists */}
                    {isExpanded && (
                      <div className="bg-white border-t border-gray-100 divide-y divide-gray-100">
                        {m.lessons.map((lesson) => {
                          const isComp = completedLessonIds.includes(lesson.id);
                          const isSel = lesson.id === selectedLesson.id;
                          const isLesQuiz = lesson.type === LessonType.QUIZ || lesson.id === "2.3";

                          // Determine status dynamic matching list
                          const isLocked = lesson.id !== "1.1" && lesson.id !== "1.2" && lesson.id !== "1.3" && lesson.id !== "1.4" && 
                                           lesson.id !== "2.1" && lesson.id !== "2.2" && lesson.id !== "2.3" && lesson.id !== "2.5" && 
                                           lesson.id !== "3.1" && lesson.id !== "3.2" && lesson.id !== "3.3";

                          return (
                            <div
                              key={lesson.id}
                              onClick={() => {
                                if (isLocked) {
                                  showToast("Bài học này đang bị khóa. Nâng cấp tiến độ để hoàn thành nhé!");
                                  return;
                                }
                                onSelectLesson(lesson, m.title);
                              }}
                              className={`p-3 px-3.5 py-4.5 flex items-start gap-3 cursor-pointer text-left transition-all ${
                                isSel
                                  ? "bg-blue-50/40 text-blue-700 font-extrabold border-l-4 border-blue-600 pl-2.5"
                                  : isLocked 
                                  ? "opacity-55 cursor-not-allowed"
                                  : "hover:bg-gray-50/50"
                              }`}
                            >
                              {/* Icon left */}
                              <div className="shrink-0 pt-0.5 select-none">
                                {isSel ? (
                                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-sm">
                                    <Play size={8} fill="currentColor" className="ml-0.5" />
                                  </div>
                                ) : isLocked ? (
                                  <Lock size={14} className="text-gray-300" />
                                ) : (
                                  <FileText size={15} className="text-gray-300" />
                                )}
                              </div>

                              {/* Lesson title and Tag details info */}
                              <div className="min-w-0 flex-1 leading-tight space-y-0.5">
                                <span className={`text-[12px] font-sans font-bold leading-relaxed block ${isSel ? "text-blue-900" : isComp ? "text-gray-500 font-semibold" : "text-gray-700 font-semibold"}`}>
                                  {lesson.id} {lesson.title}
                                </span>
                                
                                {isLesQuiz ? (
                                  <span className="text-[10px] text-gray-400 font-bold block select-none">Bài tập</span>
                                ) : (
                                  <span className="text-[10px] text-gray-400 font-bold block select-none">Video • {lesson.duration}</span>
                                )}
                              </div>

                              {/* Completion circle right indicator */}
                              {!isLocked && (
                                <div className="shrink-0 pt-0.5 select-none">
                                  {isComp ? (
                                    <CheckCircle size={15} fill="#eff6ff" className="text-green-500 font-black" />
                                  ) : (
                                    <div className="w-3.5 h-3.5 rounded-full border border-gray-300 bg-white" />
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
