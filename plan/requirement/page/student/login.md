# `/login` — Đăng nhập

**Status:** MVP
**Owner area:** Student
**Source of truth:** `plan/requirement/page_function_matrix.md`, `plan/requirement/unified_database_schema.md`
**Build decision:** Build

## 1. Mục tiêu

| Mục tiêu             | Mô tả                                  |
| -------------------- | -------------------------------------- |
| Đăng nhập tài khoản  | Cho student/instructor/admin vào hệ thống |
| Điều hướng đúng role | Student vào dashboard, instructor vào instructor workspace, admin vào admin |
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
| Role redirect        | Student → `/dashboard`, instructor → `/instructor`, admin → `/admin` |
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
