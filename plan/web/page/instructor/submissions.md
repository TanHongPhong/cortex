---
categories:
  - "[[Projects]]"
  - "[[cortex.ai]]"
  - "[[cortex.ai Web]]"
  - "[[Requirements]]"
  - "[[Instructor Workspace]]"
type: ["[[Page Spec]]"]
org: ["[[cortex.ai]]"]
start: 2026-06-02
year: 2026
url: https://github.com/TanHongPhong/cortex
status: "[[P1]]"
---

# `/instructor/submissions` — Duyệt bài nộp

**Status:** P1
**Owner area:** Instructor
**Source of truth:** `plan/web/page_function_matrix.md`, `plan/web/unified_database_schema.md`
**Build decision:** Build

## 1. Mục tiêu trang

Instructor duyệt assignment/final project của các khóa được phân công.

---

## 2. Layout chính

| Khu vực | Yêu cầu |
| ------- | ------- |
| Queue table | Student, course, lesson, submission_type, status, submitted_at. |
| Filters | Course, lesson, status, date range. |
| Detail drawer | Submission text, project info, demo_url, source_url, attachment_url. |
| Feedback box | Nhận xét rõ lý do approve/reject/revision request. |
| Actions | Approve, reject, mark `revision_requested`. |

---

## 3. Data cần dùng

| Bảng | Dữ liệu |
| ---- | ------ |
| `submissions` | Bài nộp |
| `course_instructors` | Xác định khóa instructor được duyệt |
| `users` | Học viên |
| `courses`, `lessons` | Ngữ cảnh khóa/bài |
| [[web/page/student/notifications|`notifications`]] | Báo kết quả review cho học viên |
| `audit_logs` | Log thao tác duyệt nếu cần |

---

## 4. Rule chức năng

- Instructor chỉ duyệt submission thuộc assigned courses.
- Instructor chỉ duyệt nếu `course_instructors.can_review_submissions = true`.
- Approve final project có thể làm học viên đủ điều kiện [[web/page/website/certificate|certificate]], nhưng instructor không tự cấp [[web/page/website/certificate|certificate]] nếu chưa có quyền [[web/page/admin/admin|admin]].
- Sau approve/reject/mark `revision_requested`, tạo `[[web/page/student/notifications|notifications]].type = submission_reviewed`.

---

## 5. Acceptance Criteria

| Tiêu chí | Đạt / Không |
| -------- | ----------- |
| Instructor không thấy bài của khóa ngoài phạm vi | |
| Instructor không có `can_review_submissions` không thấy action duyệt | |
| Approve/reject lưu reviewer và feedback | |
| Học viên nhận notification sau khi duyệt | |
| Không có action cấp/revoke [[web/page/website/certificate|certificate]] nếu không phải [[web/page/admin/admin|admin]] | |

---

## 🗺️ Obsidian Meta

### Tags
- #cortex/page/instructor
- #cortex/plan
- #cortex/requirement

### Navigation
- **Breadcrumbs:** [[CORTEX_PLAN_MOC|Plan Home]] / [[web/page|Requirements]] / [[web/page/instructor/overview|Instructor Workspace]]

### Relations
- **Outgoing Links:** [[web/page/admin/admin|Admin Dashboard — Requirement]], [[web/page/student/notifications|/notifications — Thông báo của tôi]], [[web/page/website/certificate|/certificate — Trang chứng chỉ]]
- **Incoming Links (Backlinks):** [[PLAN_CONFLICT_AUDIT|Plan Conflict Audit - CORTEX Requirements]], [[web/architecture|Architecture — Kiến trúc kỹ thuật CORTEX]], [[web/page|1. Public Website — phần người ngoài nhìn thấy]], [[web/page/admin/admin|Admin Dashboard — Requirement]], [[web/page/admin/admin-certificates|/admin/certificates — Quản lý chứng chỉ]], [[web/page/admin/admin-lessons|/admin/lessons — Quản lý module/bài học]], [[web/page/admin/admin-overview|/admin — Admin Overview]], [[web/page/admin/admin-students|/admin/students — Quản lý học viên]], [[web/page/admin/admin-submissions|/admin/submissions — Duyệt bài nộp]], [[web/page/instructor/courses|/instructor/courses — Khóa được phân công]], [[web/page/instructor/overview|/instructor — Instructor Overview]], [[web/page/student/assignments|/assignments — Legacy / Không ưu tiên MVP]], [[web/page/student/dashboard|/dashboard — Trang tổng quan học viên]], [[web/page/student/learn-course|/learn/course — Trang học của một khóa]], [[web/page/student/learn-lesson|/learn/analysis/lesson — Trang bài học]], [[web/page/student/my-certificates|/my-certificates — Chứng chỉ của tôi]], [[web/page/student/submit-project|/submit-project — Legacy / Không ưu tiên MVP]], [[web/page/website/projects|/projects — Trang dự án học viên]], [[web/page_function_matrix|Page Function Matrix — CORTEX]], [[web/security|Security — Bảo mật hệ thống CORTEX]], [[web/unified_database_schema|💎 Unified Database Schema - CORTEX Project]]
