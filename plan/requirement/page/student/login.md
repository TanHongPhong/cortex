# `/login` — Đăng nhập

**Status:** MVP
**Owner area:** Student
**Source of truth:** `plan/requirement/page_function_matrix.md`, `plan/requirement/unified_database_schema.md`
**Build decision:** Build

## 1. Mục tiêu

| Mục tiêu             | Mô tả                                  |
| -------------------- | -------------------------------------- |
| Đăng nhập tài khoản  | Cho student/instructor/admin vào hệ thống |
| Điều hướng đúng role | Student vào [[requirement/page/student/dashboard|dashboard]], instructor vào instructor workspace, [[requirement/page/admin/admin|admin]] vào [[requirement/page/admin/admin|admin]] |
| Ít phân tâm          | Không cần nhiều nội dung marketing     |

---

## 2. Bố cục trang

```text
Logo CORTEX

Đăng nhập vào CORTEX

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
| Role redirect        | Student → `/dashboard`, instructor → `/instructor`, [[requirement/page/admin/admin|admin]] → `/admin` |
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
- #cortex/page/student
- #cortex/plan
- #cortex/requirement

### Navigation
- **Breadcrumbs:** [[CORTEX_PLAN_MOC|Plan Home]] / [[requirement/page|Requirements]] / [[requirement/page/student/dashboard|Student Portal]]

### Relations
- **Outgoing Links:** [[requirement/page/admin/admin|Admin Dashboard — Requirement]], [[requirement/page/student/dashboard|/dashboard — Trang tổng quan học viên]]
- **Incoming Links (Backlinks):** [[requirement/architecture|Architecture — Kiến trúc kỹ thuật CORTEX]], [[requirement/page/admin/admin-lessons|/admin/lessons — Quản lý module/bài học]], [[requirement/page/admin/admin-system-users-new|/admin/system/users/new — Hidden Staff Account Creation]], [[requirement/page/instructor/overview|/instructor — Instructor Overview]], [[requirement/page/student/checkout|/checkout/:courseSlug — Thanh toán khóa học]], [[requirement/page/student/coupon|/coupon — Coupon của tôi / Nhập mã giảm giá]], [[requirement/page/student/learn-course|/learn/course — Trang học của một khóa]], [[requirement/page/student/learn-lesson|/learn/course/lesson — Trang bài học]], [[requirement/page/student/my-certificates|/my-certificates — Chứng chỉ của tôi]], [[requirement/page/student/my-orders|/my-orders và /my-orders/:id — Đơn hàng của tôi]], [[requirement/page/student/notifications|/notifications — Thông báo của tôi]], [[requirement/page/student/profile|/profile — Hồ sơ cá nhân]], [[requirement/page/website/course-detail|/courses/slug — Trang chi tiết khóa học]], [[requirement/page/website/privacy|/privacy — Chính sách dữ liệu]], [[requirement/page/website/refund-policy|/refund-policy — Chính sách refund]], [[requirement/page/website/terms|/terms — Điều khoản sử dụng]], [[requirement/security|Security — Bảo mật hệ thống CORTEX]], [[requirement/unified_database_schema|💎 Unified Database Schema - CORTEX Project]]
