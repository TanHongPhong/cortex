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
| KPI cards | Assigned courses, pending [[requirement/page/instructor/submissions|submissions]], open [[requirement/page/instructor/questions|questions]], unread [[requirement/page/student/notifications|notifications]]. |
| Pending [[requirement/page/instructor/submissions|submissions]] | 5-10 bài mới nhất cần duyệt. |
| Open [[requirement/page/instructor/questions|questions]] | Câu hỏi lesson chưa trả lời/resolved. |
| Quick links | `/instructor/courses`, `/instructor/submissions`, `/instructor/questions`. |

---

## 3. Data cần dùng

| Bảng | Dữ liệu |
| ---- | ------ |
| `users` | Instructor [[requirement/page/student/profile|profile]] |
| `course_instructors` | Phân công instructor theo khóa |
| `courses` | Khóa được phân công |
| [[requirement/page/instructor/submissions|`submissions`]] | Queue bài nộp |
| `lesson_questions` | Queue Q&A |
| [[requirement/page/student/notifications|`notifications`]] | Notification cá nhân |

---

## 4. Permission Rule

- Chỉ role `instructor` hoặc [[requirement/page/admin/admin|`admin`]] được vào.
- Instructor chỉ thấy khóa được phân công.
- Queue chỉ hiện theo permission flags: [[requirement/page/instructor/submissions|submissions]] khi `can_review_submissions = true`, [[requirement/page/instructor/questions|questions]] khi `can_answer_questions = true`.
- Không hiển thị commerce: orders, payments, coupons, invoices, referrals, revenue.
- **KHÔNG có quyền:** upload video, sửa lesson, quản lý khóa/học viên, tạo announcement.

---

## 5. Acceptance Criteria

| Tiêu chí | Đạt / Không |
| -------- | ----------- |
| Instructor chưa [[requirement/page/student/login|login]] bị chuyển về [[requirement/page/student/login|login]] | |
| Student không vào được workspace | |
| Không thấy dữ liệu khóa không được phân công | |
| Không có link commerce/admin finance | |
| Không có quyền upload video, sửa lesson, quản lý khóa/học viên | |

---

## 🗺️ Obsidian Meta

### Tags
- #cortex/page/instructor
- #cortex/plan
- #cortex/requirement

### Navigation
- **Breadcrumbs:** [[CORTEX_PLAN_MOC|Plan Home]] / [[requirement/page|Requirements]] / [[requirement/page/instructor/overview|Instructor Workspace]]

### Relations
- **Outgoing Links:** [[requirement/page/admin/admin|Admin Dashboard — Requirement]], [[requirement/page/instructor/questions|/instructor/questions — Trả lời Q&A]], [[requirement/page/instructor/submissions|/instructor/submissions — Duyệt bài nộp]], [[requirement/page/student/login|/login — Đăng nhập]], [[requirement/page/student/notifications|/notifications — Thông báo của tôi]], [[requirement/page/student/profile|/profile — Hồ sơ cá nhân]]
- **Incoming Links (Backlinks):** [[requirement/page/admin/admin-overview|/admin — Admin Overview]]
