# `/forgot-password` — Quên mật khẩu

**Status:** MVP
**Owner area:** Student
**Source of truth:** `plan/requirement/page_function_matrix.md`, `plan/requirement/unified_database_schema.md`
**Build decision:** Build

## 1. Mục tiêu

Cho user đặt lại mật khẩu khi quên, qua email reset link.

---

## 2. Flow tổng thể

```text
User quên mật khẩu
→ nhập email
→ hệ thống tạo reset token
→ gửi email chứa reset link
→ user bấm link
→ nhập mật khẩu mới
→ xác nhận mật khẩu
→ mật khẩu được cập nhật
```

---

## 3. Trang `/forgot-password`

### Layout

```text
Logo CORTEX

Đặt lại mật khẩu

Nhập email đã đăng ký, CORTEX sẽ gửi link đặt lại mật khẩu.

[Email]

[Gửi link đặt lại]

[Quay lại đăng nhập]
```

### Field

| Field | Bắt buộc | Ghi chú |
|-------|----------|---------|
| Email | Có | Phải là email đã đăng ký |

### CTA

```text
Gửi link đặt lại
```

### Rule

| Trường hợp | Xử lý |
|-----------|-------|
| Email hợp lệ | Gửi reset link, hiện thông báo "Đã gửi email" |
| Email không tồn tại | **Vẫn hiện thông báo "Đã gửi email"** (tránh leak email existence) |
| Email trống | Báo lỗi "Vui lòng nhập email" |
| Email sai format | Báo lỗi "Email không hợp lệ" |

### Success state

```text
Đã gửi email đặt lại mật khẩu.

Vui lòng kiểm tra hộp thư của bạn và bấm vào link đặt lại mật khẩu.
Link sẽ hết hạn sau 15 phút.

Không nhận được email? [Gửi lại]
```

### Error state

```text
Không thể gửi email đặt lại mật khẩu. Vui lòng thử lại sau.
```

---

## 4. Trang `/reset-password`

### Layout

```text
Logo CORTEX

Tạo mật khẩu mới

[Mật khẩu mới]
[Xác nhận mật khẩu mới]

[Đặt lại mật khẩu]
```

### Field

| Field | Bắt buộc | Ghi chú |
|-------|----------|---------|
| Mật khẩu mới | Có | Tối thiểu 8 ký tự |
| Xác nhận mật khẩu mới | Có | Phải trùng mật khẩu mới |

### Rule

| Trường hợp | Xử lý |
|-----------|-------|
| Token hợp lệ | Cho phép nhập mật khẩu mới |
| Token hết hạn | Báo "Link đã hết hạn", CTA "Gửi lại link mới" |
| Token đã dùng | Báo "Link đã được sử dụng", CTA "Đăng nhập" |
| Token không tồn tại | Báo "Link không hợp lệ" |
| Mật khẩu quá ngắn | Báo "Mật khẩu tối thiểu 8 ký tự" |
| Mật khẩu không khớp | Báo "Mật khẩu không khớp" |
| Thành công | Chuyển về `/login` với thông báo "Đã đổi mật khẩu thành công" |

### Success state

```text
Đã đặt lại mật khẩu thành công.

Bạn có thể đăng nhập bằng mật khẩu mới.
[Đăng nhập]
```

---

## 5. Data cần dùng

| Bảng | Dữ liệu |
|------|---------|
| `users` | email, password_hash |
| `password_reset_tokens` | user_id, token_hash, expires_at, used_at |

---

## 6. Security Rules

| Rule | Mô tả |
|------|-------|
| Token expiry | Reset token hết hạn sau **15 phút** |
| One-time use | Token chỉ dùng một lần (`used_at IS NULL`) |
| Hash token | Lưu hash của token vào DB, không lưu raw token |
| Rate limit | Giới hạn 5 lần gửi reset email / 15 phút / IP |
| Generic response | Không leak email có tồn tại hay không |
| HTTPS only | Reset link phải dùng HTTPS |
| Password validation | Mật khẩu mới tối thiểu 8 ký tự |

---

## 7. Email Template

### Subject

```
[CORTEX] Đặt lại mật khẩu của bạn
```

### Body

```
Xin chào {{full_name}},

Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản CORTEX.

Bấm vào link bên dưới để tạo mật khẩu mới:
{{reset_link}}

Link này sẽ hết hạn sau 15 phút.

Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.

---
CORTEX
```

---

## 8. API Endpoints

### POST `/api/auth/forgot-password`

```json
// Request
{ "email": "user@example.com" }

// Response (luôn trả 200 dù email có tồn tại hay không)
{ "message": "If the email exists, a reset link has been sent." }
```

### POST `/api/auth/reset-password`

```json
// Request
{
  "token": "abc123...",
  "password": "new_password",
  "password_confirmation": "new_password"
}

// Response
{ "message": "Password reset successfully." }

// Error
{ "error": "Token expired" }
{ "error": "Token already used" }
{ "error": "Passwords do not match" }
```

---

## 9. Component cần có

| Component | Mục đích |
|-----------|---------|
| `ForgotPasswordForm` | Form nhập email |
| `ResetPasswordForm` | Form nhập mật khẩu mới |
| `SuccessMessage` | Thông báo gửi email thành công |
| `TokenExpiredMessage` | Thông báo token hết hạn |
| `LoadingState` | Đang gửi email / đang reset |

---

## 10. Acceptance Criteria

| Tiêu chí | Đạt / Không |
|---------|-----------|
| User nhập email hợp lệ nhận được reset link | |
| Email không tồn tại vẫn hiện thông báo "Đã gửi email" | |
| Reset link dẫn đúng đến `/reset-password?token=...` | |
| Token hết hạn (15 phút) không cho reset | |
| Token đã dùng không cho reset lại | |
| Mật khẩu mới tối thiểu 8 ký tự | |
| Xác nhận mật khẩu phải khớp | |
| Reset thành công chuyển về `/login` | |
| Rate limit: tối đa 5 lần / 15 phút / IP | |
| Email gửi đúng template | |