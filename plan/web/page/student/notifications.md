---
categories:
  - "[[Projects]]"
  - "[[Blueprint]]"
  - "[[Blueprint Web]]"
  - "[[Requirements]]"
  - "[[Student Portal]]"
type: ["[[Page Spec]]"]
org: ["[[Blueprint]]"]
start: 2026-06-02
year: 2026
url: https://github.com/TanHongPhong/blueprint
status: "[[P1]]"
---

# `/notifications` — Thông báo của tôi

**Status:** P1
**Owner area:** Student
**Source of truth:** `plan/web/page_function_matrix.md`, `plan/web/unified_database_schema.md`
**Design source:** [[web/page/student/design|Student Portal Design — Warm Learning Workspace]]
**Build decision:** Build

## 1. Mục tiêu trang

Học viên xem tất cả in-app notification và mở đúng việc cần xử lý: học tiếp, xem order, xem feedback, tải [[web/page/website/certificate|certificate]] hoặc đọc announcement.

---

## 2. Layout chính

| Khu vực | Yêu cầu |
| ------- | ------- |
| Header | Tiêu đề, unread count, nút `Mark all as read`. |
| Filters | All, unread, course, payment, submission, [[web/page/website/certificate|certificate]], announcement. |
| Notification list | Title, body, type, created_at, read/unread state. |
| Action | Click item mở `target_url` và set `read_at`. |
| Empty state | “Bạn chưa có thông báo nào.” |
| Error state | Không load được notification thì cho retry. |

---

## 3. Data cần dùng

| Bảng | Dữ liệu |
| ---- | ------ |
| `notifications` | user_id, type, title, body, target_type, target_id, target_url fallback, read_at, delivery_status, created_at |
| `announcements` | Nguồn announcement nếu notification được tạo từ announcement |

---

## 4. Rule chức năng

- Chỉ hiển thị notification có `user_id = current_user.id`.
- Notification là delivery cá nhân; announcement vẫn là nội dung nguồn.
- MVP chỉ hỗ trợ in-app notification, chưa cần email/push.
- Các event tạo notification: order paid, submission reviewed, [[web/page/website/certificate|certificate]] issued, announcement published.

---

## 5. Acceptance Criteria

| Tiêu chí | Đạt / Không |
| -------- | ----------- |
| User chưa [[web/page/student/login|login]] bị chuyển về [[web/page/student/login|login]] | |
| Chỉ thấy notification của chính mình | |
| Click notification mở đúng `target_url` | |
| Mark read/mark all read cập nhật `read_at` | |
| Empty/error state rõ ràng | |

---

## 🗺️ Obsidian Meta

### Tags
- #blueprint/page/student
- #blueprint/plan
- #blueprint/requirement

### Navigation
- **Breadcrumbs:** [[BLUEPRINT_PLAN_MOC|Plan Home]] / [[web/page|Requirements]] / [[web/page/student/dashboard|Student Portal]]

### Relations
- **Outgoing Links:** [[web/page/student/login|/login — Đăng nhập]], [[web/page/website/certificate|/certificate — Trang chứng chỉ]]
- **Incoming Links (Backlinks):** [[web/architecture|Architecture — Kiến trúc kỹ thuật Blueprint]], [[web/hard_notes|Hard Notes]], [[web/page|1. Public Website — phần người ngoài nhìn thấy]], [[web/page/admin/admin|Admin Dashboard — Requirement]], [[web/page/admin/admin-announcements|/admin/announcements — Quản lý thông báo]], [[web/page/admin/admin-overview|/admin — Admin Overview]], [[web/page/instructor/overview|/instructor — Instructor Overview]], [[web/page/instructor/submissions|/instructor/submissions — Duyệt bài nộp]], [[web/page/student/dashboard|/dashboard — Trang tổng quan học viên]], [[web/page/student/learn-lesson|/learn/[course]/[lesson] — Trang bài học]], [[web/page_function_matrix|Page Function Matrix — Blueprint]], [[web/unified_database_schema|💎 Unified Database Schema - Blueprint Project]]
