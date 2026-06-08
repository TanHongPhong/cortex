# Dashboard Redesign Design Spec

## Overview
This specification details the layout and functional changes to the main student dashboard view of the Blueprint LMS application. The user has requested to simplify the dashboard page by removing redundant progress tracking and action rows, and consolidating the next lesson and homework tasks into a single vertically stacked dashboard card.

## Proposed Changes

### 1. `DashboardView.tsx` Redesign
We will make the following structural updates in [DashboardView.tsx](file:///home/tan-hong-phong/Documents/Blueprint/blueprint-lms-dashboard/src/components/DashboardView.tsx):
* Remove the **Tiến độ học tập** (Learning Progress) card (originally columns 2 of the top twin row grid).
* Insert a new card called **Bài học & Bài tập cần làm** in its place.
  * The new card will contain two vertically stacked rounded sub-cards:
    1. **Bài học tiếp theo**: Shows the next lesson's title, module title, and a play icon. It is interactive (hover scaling/colors) and triggers `onStudyLesson(selectedLesson.id)` when clicked.
    2. **Bài tập cần làm**: Shows the static exercise "Write responsive CSS prompts layout" with the badge "Cần chỉnh sửa" and feedback. It is interactive and triggers `onStudyLesson("2.3")` when clicked.
* Remove the **Three-column Action row** at the bottom (Next Lesson, Homework status, Certificate status) entirely.

### 2. `App.tsx` Navigation Improvements
We will update the `<DashboardView>` component instance in [App.tsx](file:///home/tan-hong-phong/Documents/Blueprint/blueprint-lms-dashboard/src/App.tsx):
* Implement navigation inside the `onStudyLesson` callback:
  * Find the lesson in `modules` by its `lessonId` to set `selectedLesson` and `selectedLessonModuleTitle` correctly in state.
  * Switch the sidebar view to `"learn"` (using `setActiveMenu("learn")`).
  * Switch the learning view to `"lesson"` (using `setLearnViewMode("lesson")`).

## Verification Plan

### Manual Verification
1. Access the local web dashboard at `http://localhost:3000`.
2. Verify that:
   * The "Tiến độ học tập" card is gone.
   * The 3-column bottom row is gone.
   * The new "Bài học & Bài tập cần làm" card displays correctly beside the "Khóa học hiện tại" card.
3. Click on the **Bài học tiếp theo** sub-card:
   * Expect the app to navigate to the Learn page and open the active lesson's study/video view.
4. Click on the **Bài tập cần làm** sub-card:
   * Expect the app to navigate to the Learn page and open the Lesson 2.3 "Build your first AI landing page" assignment submission view showing feedback.
