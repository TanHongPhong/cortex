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
| `notifications` | Báo kết quả review cho học viên |
| `audit_logs` | Log thao tác duyệt nếu cần |

---

## 4. Rule chức năng

- Instructor chỉ duyệt submission thuộc assigned courses.
- Instructor chỉ duyệt nếu `course_instructors.can_review_submissions = true`.
- Approve final project có thể làm học viên đủ điều kiện certificate, nhưng instructor không tự cấp certificate nếu chưa có quyền admin.
- Sau approve/reject/mark `revision_requested`, tạo `notifications.type = submission_reviewed`.

---

## 5. Acceptance Criteria

| Tiêu chí | Đạt / Không |
| -------- | ----------- |
| Instructor không thấy bài của khóa ngoài phạm vi | |
| Instructor không có `can_review_submissions` không thấy action duyệt | |
| Approve/reject lưu reviewer và feedback | |
| Học viên nhận notification sau khi duyệt | |
| Không có action cấp/revoke certificate nếu không phải admin | |
