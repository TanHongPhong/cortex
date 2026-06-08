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
status: "[[MVP]]"
---

# `/login` — Đăng nhập

**Status:** MVP
**Owner area:** Student
**Source of truth:** `plan/web/page_function_matrix.md`, `plan/web/unified_database_schema.md`
**Design source:** [[web/page/student/design|Student Portal Design — Warm Learning Workspace]]
**Build decision:** Build

## 1. Mục tiêu

| Mục tiêu             | Mô tả                                  |
| -------------------- | -------------------------------------- |
| Đăng nhập tài khoản  | Cho student/instructor/admin vào hệ thống |
| Điều hướng đúng role | Student vào [[web/page/student/dashboard|dashboard]], instructor vào instructor workspace, [[web/page/admin/admin|admin]] vào [[web/page/admin/admin|admin]] |
| Ít phân tâm          | Không cần nhiều nội dung marketing     |

---

## 2. Bố cục trang

```text
Logo Blueprint

Đăng nhập vào Blueprint

[Email]
[Password]

[Đăng nhập]

[Quên mật khẩu?]
[Chưa có tài khoản? Đăng ký]
```

---

## 3. Field cần có

| Field       | Yêu cầu                           |
| ----------- | --------------------------------- |
| Email       | Bắt buộc, đúng định dạng email    |
| Password    | Bắt buộc, có nút hiện/ẩn mật khẩu |
| Remember me | Có thể có, không bắt buộc         |

---

## 4. Chức năng chính

| Chức năng            | Yêu cầu                                  |
| -------------------- | ---------------------------------------- |
| Login email/password | Xác thực tài khoản                       |
| Forgot password      | Dùng `password_reset_tokens`, dẫn tới `/forgot-password` |
| Register link        | Dẫn tới `/register`                      |
| Role redirect        | Student → `/dashboard`, instructor → `/instructor`, [[web/page/admin/admin|admin]] → `/admin` |
| Error message        | Báo sai email/mật khẩu                   |
| Loading state        | Hiển thị đang đăng nhập                  |

---

## 5. Rule quan trọng

| Trường hợp           | Xử lý                  |
| -------------------- | ---------------------- |
| Sai email/password   | Báo lỗi ngắn           |
| Tài khoản bị khóa    | Báo liên hệ hỗ trợ     |
| Đăng nhập thành công | Cập nhật `users.last_login_at`, chuyển trang theo role |

MVP/P1 không build Google OAuth và không build email verification. Email là username duy nhất.

---

## 6. Data cần dùng

| Bảng/API | Dữ liệu |
| -------- | ------- |
| `users`/auth | email, password_hash, role, status, last_login_at |
| `password_reset_tokens` | Forgot password token hash, expiry, used_at |

---

## 7. Acceptance Criteria

| Tiêu chí | Đạt / Không |
| -------- | ----------- |
| Student đăng nhập chuyển `/dashboard` | |
| Instructor đăng nhập chuyển `/instructor` | |
| Admin đăng nhập chuyển `/admin` | |
| User bị khóa không đăng nhập được | |

---

## 🗺️ Obsidian Meta

### Tags
- #blueprint/page/student
- #blueprint/plan
- #blueprint/requirement

### Navigation
- **Breadcrumbs:** [[BLUEPRINT_PLAN_MOC|Plan Home]] / [[web/page|Requirements]] / [[web/page/student/dashboard|Student Portal]]

### Relations
- **Outgoing Links:** [[web/page/admin/admin|Admin Dashboard — Requirement]], [[web/page/student/dashboard|/dashboard — Trang tổng quan học viên]]
- **Incoming Links (Backlinks):** [[web/architecture|Architecture — Kiến trúc kỹ thuật Blueprint]], [[web/page/admin/admin-lessons|/admin/lessons — Quản lý module/bài học]], [[web/page/admin/admin-system-users|/admin/system/users — System Users]], [[web/page/instructor/overview|/instructor — Instructor Overview]], [[web/page/student/checkout|/checkout/:courseSlug — Thanh toán khóa học]], [[web/page/student/learn-course|/learn/[course] — Trang học của một khóa]], [[web/page/student/learn-lesson|/learn/[course]/[lesson] — Trang bài học]], [[web/page/student/my-certificates|/my-certificates — Chứng chỉ của tôi]], [[web/page/student/my-orders|/my-orders và /my-orders/:id — Đơn hàng của tôi]], [[web/page/student/notifications|/notifications — Thông báo của tôi]], [[web/page/student/profile|/profile — Hồ sơ cá nhân]], [[web/page/website/course-detail|/courses/[slug] — Trang chi tiết khóa học]], [[web/page/website/privacy|/privacy — Chính sách dữ liệu]], [[web/page/website/refund-policy|/refund-policy — Chính sách refund]], [[web/page/website/terms|/terms — Điều khoản sử dụng]], [[web/security|Security — Bảo mật hệ thống Blueprint]], [[web/unified_database_schema|💎 Unified Database Schema - Blueprint Project]]
