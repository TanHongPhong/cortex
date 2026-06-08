# Dashboard Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Simplify the dashboard page by removing redundant action rows and progress tracking, and consolidating the next lesson and homework tasks into a single vertically stacked card.

**Architecture:** We will replace the "Tiến độ học tập" card in `DashboardView.tsx` with a new "Bài học & Bài tập cần làm" card that has two stacked sub-cards. We will delete the three-column row at the bottom of the dashboard. Finally, we will update `App.tsx`'s `onStudyLesson` prop passed to `<DashboardView>` to handle menu and view transitions to the study view of the respective lesson.

**Tech Stack:** React, TypeScript, TailwindCSS v4, Lucide-react

---

### Task 1: Update DashboardView Props and Render Combined Card

**Files:**
- Modify: `src/components/DashboardView.tsx`

- [ ] **Step 1: Replace "Tiến độ học tập" card and delete the three-column action row**
  Edit `src/components/DashboardView.tsx` around lines 171-307 to:
  1. Remove the "Tiến độ học tập" card.
  2. Insert the new "Bài học & Bài tập cần làm" combined card.
  3. Remove the entire three-column row at the bottom.

  The replacement content for lines 171-307 will look exactly like:
  ```tsx
        {/* Card: Bài học & Bài tập cần làm (Combined Next Lesson & Homework) */}
        <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-800 text-[14px] tracking-tight">
              Bài học &amp; Bài tập cần làm
            </h3>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Target size={16} className="animate-pulse" />
            </div>
          </div>

          <div className="space-y-3 flex-1">
            {/* Sub-Card 1: Next Lesson */}
            <div 
              onClick={() => onStudyLesson(selectedLesson.id)}
              className="flex items-center justify-between p-3 rounded-2xl bg-blue-50/30 hover:bg-blue-50/60 border border-blue-100/30 transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <Play size={13} fill="currentColor" className="ml-0.5" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">Bài học tiếp theo</span>
                  <h4 className="font-bold text-xs text-gray-900 truncate leading-snug group-hover:text-blue-600 transition-colors">
                    {selectedLesson.title}
                  </h4>
                  <p className="text-[10px] text-gray-450 font-semibold truncate">
                    {selectedLessonModuleTitle}
                  </p>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
            </div>

            {/* Sub-Card 2: Homework */}
            <div 
              onClick={() => onStudyLesson("2.3")}
              className="flex items-center justify-between p-3 rounded-2xl bg-amber-50/20 hover:bg-amber-50/40 border border-amber-100/30 transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <FileText size={15} />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Bài tập cần làm</span>
                    <span className="px-1.5 py-0.2 bg-amber-505/10 bg-amber-500/10 text-amber-600 text-[8px] font-bold rounded uppercase">
                      Cần chỉnh sửa
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-gray-900 truncate leading-snug group-hover:text-amber-600 transition-colors">
                    Write responsive CSS prompts layout
                  </h4>
                  <p className="text-[10px] text-gray-450 font-medium truncate">
                    Feedback: Demo link chưa hoạt động, vui lòng cập nhật lại.
                  </p>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </div>
  ```

---

### Task 2: Implement Navigation Handler in App.tsx

**Files:**
- Modify: `src/App.tsx:435-449`

- [ ] **Step 1: Update `<DashboardView>` component call in `src/App.tsx`**
  Modify lines 435-449 of `src/App.tsx` to pass the updated `onStudyLesson` logic that resolves target lessons and changes states to active lesson view:
  ```tsx
        {/* 3. Dashboard Analytics */}
        {activeMenu === "dashboard" && (
          <DashboardView
            completedLessonIds={completedLessonIds}
            totalLessonsCount={totalLessonsCount}
            selectedLesson={selectedLesson}
            selectedLessonModuleTitle={selectedLessonModuleTitle}
            onStudyLesson={(lessonId) => {
              // Find the lesson in modules list to sync selectedLesson state
              let foundLesson = null;
              let foundModuleTitle = "";
              for (const m of modules) {
                const l = m.lessons.find(les => les.id === lessonId);
                if (l) {
                  foundLesson = l;
                  foundModuleTitle = m.title;
                  break;
                }
              }
              if (foundLesson) {
                setSelectedLesson(foundLesson);
                setSelectedLessonModuleTitle(foundModuleTitle);
              }
              // Switch tab and view mode to study view
              setActiveMenu("learn");
              setLearnViewMode("lesson");
            }}
            modules={modules}
            onNavigateToCourses={() => {
              setActiveMenu("learn");
              setLearnViewMode("overview");
              setActiveTab("content");
            }}
            onCheckCertificate={() => setIsCertAlertOpen(true)}
          />
        )}
  ```

---

### Task 3: Verify and Build

**Files:**
- Test/Run: project dev build check

- [ ] **Step 1: Run build check to verify TypeScript and build compilation**
  Run command: `npm run build`
  Expected output: Successful Vite production bundle compilation with no TypeScript or build errors.
