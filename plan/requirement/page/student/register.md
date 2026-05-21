# `/register` — Đăng ký tài khoản

## 1. Mục tiêu

| Mục tiêu               | Mô tả                                       |
| ---------------------- | ------------------------------------------- |
| Tạo tài khoản học viên | Cho người dùng đăng ký tài khoản để học     |
| Lấy thông tin cơ bản   | Họ tên, email, mật khẩu, số điện thoại/Zalo |
| Gán role mặc định      | User mới luôn là `student`                  |

---

## 2. Bố cục trang

```text
Logo May Academy

Tạo tài khoản học viên

[Họ và tên]
[Email]
[Số điện thoại/Zalo]
[Mật khẩu]
[Xác nhận mật khẩu]

[Đăng ký tài khoản]

Hoặc đăng ký với Google

[Đã có tài khoản? Đăng nhập]
```

---

## 3. Field cần có

| Field              | Bắt buộc | Ghi chú                      |
| ------------------ | -------- | ---------------------------- |
| Họ và tên          | Có       | Dùng cho profile/certificate |
| Email              | Có       | Không được trùng             |
| Số điện thoại/Zalo | Có       | Dùng để tư vấn/hỗ trợ        |
| Mật khẩu           | Có       | Tối thiểu 6–8 ký tự          |
| Xác nhận mật khẩu  | Có       | Phải trùng mật khẩu          |

---

## 4. Chức năng chính

| Chức năng               | Yêu cầu                                              |
| ----------------------- | ---------------------------------------------------- |
| Register email/password | Tạo tài khoản mới                                    |
| Google register         | Nên có để đăng ký nhanh                              |
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
| Đăng ký thành công    | Tạo user + profile student           |
| Có email verification | Yêu cầu xác thực email trước khi học |
| User mới              | Không được tự chọn role admin        |

---

## 6. Data cần lưu

| Bảng    | Field                                                               |
| ------- | ------------------------------------------------------------------- |
| `users` | `id`, `full_name`, `email`, `phone`, `role = student`, `created_at` |

---
