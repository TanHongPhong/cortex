# `/instructor` — Instructor Overview

**Status:** P1
**Owner area:** Instructor
**Source of truth:** `plan/requirement/page_function_matrix.md`, `plan/requirement/unified_database_schema.md`
**Build decision:** Build

## 1. Mục tiêu trang

Instructor xem nhanh các khóa được phân công và các queue cần xử lý: bài nộp pending, câu hỏi chưa trả lời, notification mới.

**Nguyên tắc:** Instructor chỉ chấm bài và hỗ trợ học viên — không quản lý khóa học, video, học viên hay announcement.

---

## 2. Layout chính

| Khu vực | Yêu cầu |
| ------- | ------- |
| Header | Chào instructor, tổng số khóa được phân công. |
| KPI cards | Assigned courses, pending submissions, open questions, unread notifications. |
| Pending submissions | 5-10 bài mới nhất cần duyệt. |
| Open questions | Câu hỏi lesson chưa trả lời/resolved. |
| Quick links | `/instructor/courses`, `/instructor/submissions`, `/instructor/questions`. |

---

## 3. Data cần dùng

| Bảng | Dữ liệu |
| ---- | ------ |
| `users` | Instructor profile |
| `course_instructors` | Phân công instructor theo khóa |
| `courses` | Khóa được phân công |
| `submissions` | Queue bài nộp |
| `lesson_questions` | Queue Q&A |
| `notifications` | Notification cá nhân |

---

## 4. Permission Rule

- Chỉ role `instructor` hoặc `admin` được vào.
- Instructor chỉ thấy khóa được phân công.
- Queue chỉ hiện theo permission flags: submissions khi `can_review_submissions = true`, questions khi `can_answer_questions = true`.
- Không hiển thị commerce: orders, payments, coupons, invoices, referrals, revenue.
- **KHÔNG có quyền:** upload video, sửa lesson, quản lý khóa/học viên, tạo announcement.

---

## 5. Acceptance Criteria

| Tiêu chí | Đạt / Không |
| -------- | ----------- |
| Instructor chưa login bị chuyển về login | |
| Student không vào được workspace | |
| Không thấy dữ liệu khóa không được phân công | |
| Không có link commerce/admin finance | |
| Không có quyền upload video, sửa lesson, quản lý khóa/học viên | |
