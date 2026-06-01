# `/notifications` — Thông báo của tôi

**Status:** P1
**Owner area:** Student
**Source of truth:** `plan/requirement/page_function_matrix.md`, `plan/requirement/unified_database_schema.md`
**Build decision:** Build

## 1. Mục tiêu trang

Học viên xem tất cả in-app notification và mở đúng việc cần xử lý: học tiếp, xem order, xem feedback, tải certificate hoặc đọc announcement.

---

## 2. Layout chính

| Khu vực | Yêu cầu |
| ------- | ------- |
| Header | Tiêu đề, unread count, nút `Mark all as read`. |
| Filters | All, unread, course, payment, submission, certificate, Q&A. |
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
- Các event tạo notification: order paid, submission reviewed, certificate issued, announcement published, question answered.

---

## 5. Acceptance Criteria

| Tiêu chí | Đạt / Không |
| -------- | ----------- |
| User chưa login bị chuyển về login | |
| Chỉ thấy notification của chính mình | |
| Click notification mở đúng `target_url` | |
| Mark read/mark all read cập nhật `read_at` | |
| Empty/error state rõ ràng | |
