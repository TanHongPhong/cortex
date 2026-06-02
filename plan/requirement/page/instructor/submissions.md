# `/instructor/submissions` — Duyệt bài nộp

**Status:** P1
**Owner area:** Instructor
**Source of truth:** `plan/requirement/page_function_matrix.md`, `plan/requirement/unified_database_schema.md`
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
| [[requirement/page/student/notifications|`notifications`]] | Báo kết quả review cho học viên |
| `audit_logs` | Log thao tác duyệt nếu cần |

---

## 4. Rule chức năng

- Instructor chỉ duyệt submission thuộc assigned courses.
- Instructor chỉ duyệt nếu `course_instructors.can_review_submissions = true`.
- Approve final project có thể làm học viên đủ điều kiện [[requirement/page/website/certificate|certificate]], nhưng instructor không tự cấp [[requirement/page/website/certificate|certificate]] nếu chưa có quyền [[requirement/page/admin/admin|admin]].
- Sau approve/reject/mark `revision_requested`, tạo `[[requirement/page/student/notifications|notifications]].type = submission_reviewed`.

---

## 5. Acceptance Criteria

| Tiêu chí | Đạt / Không |
| -------- | ----------- |
| Instructor không thấy bài của khóa ngoài phạm vi | |
| Instructor không có `can_review_submissions` không thấy action duyệt | |
| Approve/reject lưu reviewer và feedback | |
| Học viên nhận notification sau khi duyệt | |
| Không có action cấp/revoke [[requirement/page/website/certificate|certificate]] nếu không phải [[requirement/page/admin/admin|admin]] | |

---

## 🗺️ Obsidian Meta

### Tags
- #cortex/page/instructor
- #cortex/plan
- #cortex/requirement

### Navigation
- **Breadcrumbs:** [[CORTEX_PLAN_MOC|Plan Home]] / [[requirement/page|Requirements]] / [[requirement/page/instructor/overview|Instructor Workspace]]

### Relations
- **Outgoing Links:** [[requirement/page/admin/admin|Admin Dashboard — Requirement]], [[requirement/page/student/notifications|/notifications — Thông báo của tôi]], [[requirement/page/website/certificate|/certificate — Trang chứng chỉ]]
- **Incoming Links (Backlinks):** [[PLAN_CONFLICT_AUDIT|Plan Conflict Audit - CORTEX Requirements]], [[requirement/architecture|Architecture — Kiến trúc kỹ thuật CORTEX]], [[requirement/page|1. Public Website — phần người ngoài nhìn thấy]], [[requirement/page/admin/admin|Admin Dashboard — Requirement]], [[requirement/page/admin/admin-certificates|/admin/certificates — Quản lý chứng chỉ]], [[requirement/page/admin/admin-lessons|/admin/lessons — Quản lý module/bài học]], [[requirement/page/admin/admin-overview|/admin — Admin Overview]], [[requirement/page/admin/admin-students|/admin/students — Quản lý học viên]], [[requirement/page/admin/admin-submissions|/admin/submissions — Duyệt bài nộp]], [[requirement/page/instructor/courses|/instructor/courses — Khóa được phân công]], [[requirement/page/instructor/overview|/instructor — Instructor Overview]], [[requirement/page/student/assignments|/assignments — Legacy / Không ưu tiên MVP]], [[requirement/page/student/dashboard|/dashboard — Trang tổng quan học viên]], [[requirement/page/student/learn-course|/learn/course — Trang học của một khóa]], [[requirement/page/student/learn-lesson|/learn/course/lesson — Trang bài học]], [[requirement/page/student/my-certificates|/my-certificates — Chứng chỉ của tôi]], [[requirement/page/student/submit-project|/submit-project — Legacy / Không ưu tiên MVP]], [[requirement/page/website/projects|/projects — Trang dự án học viên]], [[requirement/page_function_matrix|Page Function Matrix — CORTEX]], [[requirement/security|Security — Bảo mật hệ thống CORTEX]], [[requirement/unified_database_schema|💎 Unified Database Schema - CORTEX Project]]
