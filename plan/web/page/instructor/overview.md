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

# `/instructor` — Instructor Overview

**Status:** P1
**Owner area:** Instructor
**Source of truth:** `plan/web/page_function_matrix.md`, `plan/web/unified_database_schema.md`
**Build decision:** Build

## 1. Mục tiêu trang

Instructor xem nhanh các khóa được phân công và các queue cần xử lý: bài nộp pending, câu hỏi chưa trả lời, notification mới.

**Nguyên tắc:** Instructor chỉ chấm bài và hỗ trợ học viên — không quản lý khóa học, video, học viên hay announcement.

---

## 2. Layout chính

| Khu vực | Yêu cầu |
| ------- | ------- |
| Header | Chào instructor, tổng số khóa được phân công. |
| KPI cards | Assigned courses, pending [[web/page/instructor/submissions|submissions]], open [[web/page/instructor/questions|questions]], unread [[web/page/student/notifications|notifications]]. |
| Pending [[web/page/instructor/submissions|submissions]] | 5-10 bài mới nhất cần duyệt. |
| Open [[web/page/instructor/questions|questions]] | Câu hỏi lesson chưa trả lời/resolved. |
| Quick links | `/instructor/courses`, `/instructor/submissions`, `/instructor/questions`. |

---

## 3. Data cần dùng

| Bảng | Dữ liệu |
| ---- | ------ |
| `users` | Instructor [[web/page/student/profile|profile]] |
| `course_instructors` | Phân công instructor theo khóa |
| `courses` | Khóa được phân công |
| [[web/page/instructor/submissions|`submissions`]] | Queue bài nộp |
| `lesson_questions` | Queue Q&A |
| [[web/page/student/notifications|`notifications`]] | Notification cá nhân |

---

## 4. Permission Rule

- Chỉ role `instructor` hoặc [[web/page/admin/admin|`admin`]] được vào.
- Instructor chỉ thấy khóa được phân công.
- Queue chỉ hiện theo permission flags: [[web/page/instructor/submissions|submissions]] khi `can_review_submissions = true`, [[web/page/instructor/questions|questions]] khi `can_answer_questions = true`.
- Không hiển thị commerce: orders, payments, coupons, invoices, referrals, revenue.
- **KHÔNG có quyền:** upload video, sửa lesson, quản lý khóa/học viên, tạo announcement.

---

## 5. Acceptance Criteria

| Tiêu chí | Đạt / Không |
| -------- | ----------- |
| Instructor chưa [[web/page/student/login|login]] bị chuyển về [[web/page/student/login|login]] | |
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
- **Breadcrumbs:** [[CORTEX_PLAN_MOC|Plan Home]] / [[web/page|Requirements]] / [[web/page/instructor/overview|Instructor Workspace]]

### Relations
- **Outgoing Links:** [[web/page/admin/admin|Admin Dashboard — Requirement]], [[web/page/instructor/questions|/instructor/questions — Trả lời Q&A]], [[web/page/instructor/submissions|/instructor/submissions — Duyệt bài nộp]], [[web/page/student/login|/login — Đăng nhập]], [[web/page/student/notifications|/notifications — Thông báo của tôi]], [[web/page/student/profile|/profile — Hồ sơ cá nhân]]
- **Incoming Links (Backlinks):** [[web/page/admin/admin-overview|/admin — Admin Overview]]
