---
categories:
  - "[[Projects]]"
  - "[[Blueprint]]"
  - "[[Blueprint Web]]"
  - "[[Requirements]]"
  - "[[Instructor Workspace]]"
type: ["[[Page Spec]]"]
org: ["[[Blueprint]]"]
start: 2026-06-02
year: 2026
url: https://github.com/TanHongPhong/blueprint
status: "[[P1]]"
---

# `/instructor` — Instructor Overview

**Status:** P1
**Owner area:** Instructor
**Source of truth:** `plan/web/page_function_matrix.md`, `plan/web/unified_database_schema.md`
**Design source:** [[web/page/instructor/design|Instructor Workspace Design — Focused Review Console]]
**Build decision:** Build

## 1. Mục tiêu trang

Instructor xem nhanh các khóa được phân công và các queue cần xử lý: bài nộp pending, notification mới.

**Nguyên tắc:** Instructor chỉ chấm bài, hỗ trợ học viên và tạo thông báo cho khóa phụ trách — không quản lý khóa học tổng thể, video hay học viên.

---

## 2. Layout chính

| Khu vực | Yêu cầu |
| ------- | ------- |
| Header | Chào instructor, tổng số khóa được phân công. |
| KPI cards | Assigned courses, pending [[web/page/instructor/submissions|submissions]], unread [[web/page/student/notifications|notifications]]. |
| Pending [[web/page/instructor/submissions|submissions]] | 5-10 bài mới nhất cần duyệt. |
| Quick links | `/instructor/courses`, `/instructor/submissions`. |

---

## 3. Data cần dùng

| Bảng | Dữ liệu |
| ---- | ------ |
| `users` | Instructor [[web/page/student/profile|profile]] |
| `course_instructors` | Phân công instructor theo khóa |
| `courses` | Khóa được phân công |
| [[web/page/instructor/submissions|`submissions`]] | Queue bài nộp |
| [[web/page/student/notifications|`notifications`]] | Notification cá nhân |

---

## 4. Permission Rule

- Chỉ role `instructor` hoặc [[web/page/admin/admin|`admin`]] được vào.
- Instructor chỉ thấy khóa được phân công.
- Queue chỉ hiện theo permission flags: [[web/page/instructor/submissions|submissions]] khi `can_review_submissions = true`.
- Content edit chỉ hiện khi `course_instructors.can_edit_course_content = true`.
- Không hiển thị commerce: orders, payments, coupons, invoices, referrals, revenue.
- **KHÔNG có quyền:** quản lý học viên, tạo thông báo toàn hệ thống (Global), xử lý tài chính, cấp chứng chỉ hoặc phân quyền. (Được tạo thông báo cho khóa học phụ trách).

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
- #blueprint/page/instructor
- #blueprint/plan
- #blueprint/requirement

### Navigation
- **Breadcrumbs:** [[BLUEPRINT_PLAN_MOC|Plan Home]] / [[web/page|Requirements]] / [[web/page/instructor/overview|Instructor Workspace]]

### Relations
- **Outgoing Links:** [[web/page/admin/admin|Admin Dashboard — Requirement]], [[web/page/instructor/submissions|/instructor/submissions — Duyệt bài nộp]], [[web/page/student/login|/login — Đăng nhập]], [[web/page/student/notifications|/notifications — Thông báo của tôi]], [[web/page/student/profile|/profile — Hồ sơ cá nhân]]
- **Incoming Links (Backlinks):** [[web/page/admin/admin-overview|/admin — Admin Overview]]
