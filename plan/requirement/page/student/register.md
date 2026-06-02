# `/register` — Đăng ký tài khoản

**Status:** MVP
**Owner area:** Student
**Source of truth:** `plan/requirement/page_function_matrix.md`, `plan/requirement/unified_database_schema.md`
**Build decision:** Build

## 1. Mục tiêu

| Mục tiêu               | Mô tả                                       |
| ---------------------- | ------------------------------------------- |
| Tạo tài khoản học viên | Cho người dùng đăng ký tài khoản để học     |
| Lấy thông tin cơ bản   | Họ tên, email, mật khẩu, số điện thoại/Zalo |
| Gán role mặc định      | User mới luôn là `student`                  |

---

## 2. Bố cục trang

```text
Logo CORTEX

Tạo tài khoản học viên

[Họ và tên]
[Email]
[Số điện thoại/Zalo]
[Mật khẩu]
[Xác nhận mật khẩu]

[Đăng ký tài khoản]

[Đã có tài khoản? Đăng nhập]
```

---

## 3. Field cần có

| Field              | Bắt buộc | Ghi chú                      |
| ------------------ | -------- | ---------------------------- |
| Họ và tên          | Có       | Dùng cho [[requirement/page/student/profile|profile]]/certificate |
| Email              | Có       | Không được trùng             |
| Số điện thoại/Zalo | Có       | Dùng để tư vấn/hỗ trợ        |
| Mật khẩu           | Có       | Tối thiểu 6–8 ký tự          |
| Xác nhận mật khẩu  | Có       | Phải trùng mật khẩu          |

---

## 4. Chức năng chính

| Chức năng               | Yêu cầu                                              |
| ----------------------- | ---------------------------------------------------- |
| Register email/password | Tạo tài khoản mới                                    |
| Validate form           | Kiểm tra thiếu field, email sai, mật khẩu không khớp |
| Check duplicate email   | Không cho đăng ký email đã tồn tại                   |
| Default role            | Gán role `student`                                   |
| Success redirect        | Đăng ký xong chuyển tới `/dashboard` hoặc `/login`   |
| Login link              | Dẫn tới `/login`                                     |

---

## 5. Rule quan trọng

| Trường hợp            | Xử lý                                |
| --------------------- | ------------------------------------ |
| Email đã tồn tại      | Báo “Email này đã được sử dụng”      |
| Mật khẩu không khớp   | Báo lỗi ngay dưới field              |
| Đăng ký thành công    | Tạo user + [[requirement/page/student/profile|profile]] student           |
| User mới              | Không được tự chọn role [[requirement/page/admin/admin|admin]]        |

MVP/P1 không build Google OAuth và không build email verification.

---

## 6. Data cần lưu

| Bảng    | Field                                                               |
| ------- | ------------------------------------------------------------------- |
| `users` | `id`, `full_name`, `email`, `phone`, `role = student`, `created_at` |

---

## 7. Acceptance Criteria

| Tiêu chí | Đạt / Không |
| -------- | ----------- |
| Tạo user mới với `role = student` | |
| Không cho user tự chọn role | |
| Email trùng bị chặn | |
| Referral param được giữ nếu có | |

---

## 🗺️ Obsidian Meta

### Tags
- #cortex/page/student
- #cortex/plan
- #cortex/requirement

### Navigation
- **Breadcrumbs:** [[CORTEX_PLAN_MOC|Plan Home]] / [[requirement/page|Requirements]] / [[requirement/page/student/dashboard|Student Portal]]

### Relations
- **Outgoing Links:** [[requirement/page/admin/admin|Admin Dashboard — Requirement]], [[requirement/page/student/profile|/profile — Hồ sơ cá nhân]]
- **Incoming Links (Backlinks):** [[requirement/architecture|Architecture — Kiến trúc kỹ thuật CORTEX]], [[requirement/page/admin/admin-students|/admin/students — Quản lý học viên]]
