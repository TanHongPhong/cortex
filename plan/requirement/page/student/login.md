# `/login` — Đăng nhập

## 1. Mục tiêu

| Mục tiêu             | Mô tả                                  |
| -------------------- | -------------------------------------- |
| Đăng nhập tài khoản  | Cho student/admin vào hệ thống         |
| Điều hướng đúng role | Student vào dashboard, admin vào admin |
| Ít phân tâm          | Không cần nhiều nội dung marketing     |

---

## 2. Bố cục trang

```text
Logo CORTEX

Đăng nhập vào CORTEX

[Email]
[Password]

[Đăng nhập]

Hoặc đăng nhập với Google

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
| Google login         | Nên có để đăng nhập nhanh                |
| Forgot password      | Dẫn tới `/forgot-password`               |
| Register link        | Dẫn tới `/register`                      |
| Role redirect        | Student → `/dashboard`, admin → `/admin` |
| Error message        | Báo sai email/mật khẩu                   |
| Loading state        | Hiển thị đang đăng nhập                  |

---

## 5. Rule quan trọng

| Trường hợp           | Xử lý                  |
| -------------------- | ---------------------- |
| Sai email/password   | Báo lỗi ngắn           |
| Chưa xác thực email  | Nhắc xác thực email    |
| Tài khoản bị khóa    | Báo liên hệ hỗ trợ     |
| Đăng nhập thành công | Chuyển trang theo role |

---
