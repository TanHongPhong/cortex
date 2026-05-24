# 💎 Unified Database Schema - CORTEX Project

**Version:** 1.1 (Refined)
**Last Updated:** 2026-05-23
**Status:** Finalized Single Source of Truth

---

## 1. Entity Relationship Summary (ERD Logic)

- **User** (1) $\rightarrow$ (N) **Enrollment** $\rightarrow$ (1) **Course**
- **Course** (1) $\rightarrow$ (N) **Module** (1) $\rightarrow$ (N) **Lesson**
- **User** (1) $\rightarrow$ (N) **LessonProgress** $\rightarrow$ (1) **Lesson**
- **User** (1) $\rightarrow$ (N) **Submission** $\rightarrow$ (1) **Course**
- **User** (1) $\rightarrow$ (N) **Certificate** $\rightarrow$ (1) **Course**
- **User** (1) $\rightarrow$ (N) **Order** $\rightarrow$ (1) **Course**
- **Lead (Type B)**: Independent entity (Contact point only)
- **Project**: Independent showcase entity (manual promotion from submissions)

---

## 2. Detailed Table Definitions

### 2.1. `users` (Tài khoản & Hồ sơ)

| Field               | Type      | Constraint       | Description                        |
| :------------------ | :-------- | :--------------- | :--------------------------------- |
| `id`                | UUID      | PK               | Định danh duy nhất                 |
| `full_name`         | String    | Not Null         | Họ tên học viên/admin              |
| `email`             | String    | Unique, Not Null | Email đăng nhập (Case-insensitive) |
| `password_hash`     | String    | Not Null         | Mật khẩu mã hóa                    |
| `phone`             | String    | -                | Số điện thoại/Zalo                 |
| `avatar_url`        | String    | -                | Ảnh đại diện (Tùy chọn)            |
| `role`              | Enum      | Not Null         | `student`, `admin`                 |
| `status`            | Enum      | Not Null         | `active`, `blocked`                |
| `learning_interest` | Text      | -                | Nhu cầu học tập                    |
| `current_level`     | Text      | -                | Trình độ hiện tại                  |
| `learning_goal`     | Text      | -                | Mục tiêu học tập                   |
| `last_activity_at`  | Timestamp | -                | Lần hoạt động gần nhất             |
| `created_by`        | UUID      | FK → `users.id`  | Người tạo (admin/system)           |
| `updated_by`        | UUID      | FK → `users.id`  | Người cập nhật cuối                |
| `deleted_at`        | Timestamp | -                | Ngày xóa mềm (soft delete)         |
| `created_at`        | Timestamp | Default: now()   | Ngày tạo tài khoản                 |
| `updated_at`        | Timestamp | -                | Ngày cập nhật                      |

### 2.2. `courses` (Danh mục Khóa học)

| Field                   | Type      | Constraint       | Description                                                  |
| :---------------------- | :-------- | :--------------- | :----------------------------------------------------------- |
| `id`                    | UUID      | PK               | Định danh duy nhất                                           |
| `title`                 | String    | Not Null         | Tên khóa học                                                 |
| `slug`                  | String    | Unique, Not Null | URL thân thiện                                               |
| `description`           | Text      | -                | Mô tả tổng quan                                              |
| `short_description`     | String    | -                | Mô tả ngắn                                                   |
| `level`                 | Enum      | Not Null         | `free`, `starter`, `core`, `advanced`, `premium`, `b2b`      |
| `price_direction`       | Enum      | -                | `Free`, `Low`, `Main_product`, `Higher`, `Highest`, `Custom` |
| `price_amount`          | Decimal   | -                | Giá cụ thể (NULL nếu Free)                                   |
| `duration`              | String    | -                | Thời lượng (ví dụ: "4 tuần")                                 |
| `format`                | Enum      | -                | `online`, `live`, `self_paced`, `hybrid`                     |
| `thumbnail_url`         | String    | -                | Ảnh đại diện khóa học                                        |
| `status`                | Enum      | Not Null         | `draft`, `published`, `archived`                             |
| `certificate_available` | Boolean   | -                | Có cấp chứng chỉ không                                       |
| `lock_mode`             | Enum      | -                | `free`, `sequential`                                         |
| `is_featured`           | Boolean   | Default: false   | Hiển thị nổi bật                                             |
| `display_order`         | Integer   | -                | Thứ tự hiển thị                                              |
| `created_by`            | UUID      | FK → `users.id`  | Người tạo (admin/system)                                     |
| `updated_by`            | UUID      | FK → `users.id`  | Người cập nhật cuối                                          |
| `deleted_at`            | Timestamp | -                | Ngày xóa mềm (soft delete)                                   |
| `created_at`            | Timestamp | Default: now()   | Ngày tạo                                                     |
| `updated_at`            | Timestamp | -                | Ngày cập nhật                                                |

### 2.3. `modules` (Học phần)

| Field         | Type      | Constraint                          | Description                    |
| :------------ | :-------- | :---------------------------------- | :----------------------------- |
| `id`          | UUID      | PK                                  | Định danh duy nhất             |
| `course_id`   | UUID      | FK → `courses.id` ON DELETE CASCADE | Khóa học cha                   |
| `title`       | String    | Not Null                            | Tên module                     |
| `description` | Text      | -                                   | Mô tả ngắn                     |
| `order_index` | Integer   | Not Null                            | Thứ tự hiển thị                |
| `status`      | Enum      | -                                   | `draft`, `published`, `hidden` |
| `created_by`  | UUID      | FK → `users.id`                     | Người tạo                      |
| `updated_by`  | UUID      | FK → `users.id`                     | Người cập nhật cuối            |
| `deleted_at`  | Timestamp | -                                   | Ngày xóa mềm (soft delete)     |
| `created_at`  | Timestamp | Default: now()                      | Ngày tạo                       |
| `updated_at`  | Timestamp | -                                   | Ngày cập nhật                  |

### 2.4. `lessons` (Bài học)

| Field                        | Type      | Constraint                          | Description                                        |
| :--------------------------- | :-------- | :---------------------------------- | :------------------------------------------------- |
| `id`                         | UUID      | PK                                  | Định danh duy nhất                                 |
| `course_id`                  | UUID      | FK → `courses.id` ON DELETE CASCADE | Thuộc khóa học nào                                 |
| `module_id`                  | UUID      | FK → `modules.id` ON DELETE CASCADE | Thuộc module nào                                   |
| `title`                      | String    | Not Null                            | Tên bài học                                        |
| `lesson_type`                | Enum      | Not Null                            | `video`, `resource`, `assignment`, `final_project` |
| `content`                    | Text      | -                                   | Nội dung hướng dẫn/mô tả                           |
| `video_url`                  | String    | -                                   | Link video (cho loại `video`)                      |
| `duration`                   | String    | -                                   | Thời lượng bài học                                 |
| `order_index`                | Integer   | Not Null                            | Thứ tự trong module                                |
| `requires_submission`        | Boolean   | -                                   | Có yêu cầu nộp bài không                           |
| `is_required_for_completion` | Boolean   | -                                   | Bắt buộc để hoàn thành khóa                        |
| `is_course_final_project`    | Boolean   | Default: false                      | Là bài project cuối khóa                           |
| `status`                     | Enum      | -                                   | `draft`, `published`, `hidden`                     |
| `created_by`                 | UUID      | FK → `users.id`                     | Người tạo                                          |
| `updated_by`                 | UUID      | FK → `users.id`                     | Người cập nhật cuối                                |
| `deleted_at`                 | Timestamp | -                                   | Ngày xóa mềm (soft delete)                         |
| `created_at`                 | Timestamp | Default: now()                      | Ngày tạo                                           |
| `updated_at`                 | Timestamp | -                                   | Ngày cập nhật                                      |

### 2.5. `lesson_resources` (Tài liệu đính kèm)

| Field         | Type      | Constraint                          | Description                                 |
| :------------ | :-------- | :---------------------------------- | :------------------------------------------ |
| `id`          | UUID      | PK                                  | Định danh duy nhất                          |
| `lesson_id`   | UUID      | FK → `lessons.id` ON DELETE CASCADE | Thuộc bài học nào                           |
| `title`       | String    | Not Null                            | Tên tài liệu                                |
| `type`        | Enum      | -                                   | `pdf`, `prompt`, `link`, `template`, `file` |
| `description` | Text      | -                                   | Mô tả                                       |
| `url`         | String    | Not Null                            | Link hoặc đường dẫn file                    |
| `order_index` | Integer   | -                                   | Thứ tự hiển thị                             |
| `created_by`  | UUID      | FK → `users.id`                     | Người tạo                                   |
| `updated_by`  | UUID      | FK → `users.id`                     | Người cập nhật cuối                         |
| `deleted_at`  | Timestamp | -                                   | Ngày xóa mềm (soft delete)                  |
| `created_at`  | Timestamp | Default: now()                      | Ngày tạo                                    |
| `updated_at`  | Timestamp | -                                   | Ngày cập nhật                               |

### 2.6. `enrollments` (Đăng ký học)

| Field               | Type      | Constraint                                        | Description                                   |
| :------------------ | :-------- | :------------------------------------------------ | :-------------------------------------------- |
| `id`                | UUID      | PK                                                | Định danh duy nhất                            |
| `user_id`           | UUID      | **Not Null**, FK → `users.id` ON DELETE RESTRICT  | Học viên                                      |
| `course_id`         | UUID      | **Not Null**, FK → `courses.id` ON DELETE CASCADE | Khóa học                                      |
| `status`            | Enum      | Not Null                                          | `active`, `completed`, `cancelled`, `expired` |
| `enrolled_at`       | Timestamp | Default: now()                                    | Ngày đăng ký                                  |
| `completed_at`      | Timestamp | -                                                 | Ngày hoàn thành                               |
| `access_expires_at` | Timestamp | -                                                 | Ngày hết hạn truy cập                         |
| `note`              | Text      | -                                                 | Ghi chú của admin                             |
| `created_by`        | UUID      | FK → `users.id`                                   | Admin gán khóa                                |
| `updated_by`        | UUID      | FK → `users.id`                                   | Người cập nhật cuối                           |
| `deleted_at`        | Timestamp | -                                                 | Ngày xóa mềm (soft delete)                    |
| `created_at`        | Timestamp | Default: now()                                    | Ngày tạo                                      |
| `updated_at`        | Timestamp | -                                                 | Ngày cập nhật                                 |

**Partial Unique Index**: `UNIQUE (user_id, course_id) WHERE deleted_at IS NULL` - Ngăn đăng ký trùng lặp, fix race condition với soft delete.
**Composite Index**: `(course_id, status)` - Optimize admin queries theo course/status.
**Composite Index**: `(user_id, status)` - Optimize student's active enrollment list.

---

### 2.6.1. Soft Delete & Referential Integrity Rules

**Soft Delete Propagation:**

- Khi `courses.deleted_at IS NOT NULL` (course bị xóa mềm):
  - Enrollments của course đó **KHÔNG** tự động bị xóa mềm.
  - Middleware/Access Control phải check: `course.deleted_at IS NULL` trước khi cho phép truy cập.
  - Nếu course bị xóa mềm, enrollments vẫn tồn tại nhưng status có thể tự động chuyển thành `cancelled` (optional trigger).

**Unique Constraint với Soft Delete:**

- Partial Unique Index đảm bảo user có thể re-enroll vào cùng một course sau khi enrollment trước đó bị soft-deleted.
- Query kiểm tra trùng lặp phải include `WHERE deleted_at IS NULL`.

**Business Rule:**

```sql
-- Kiểm tra user đã enrolled chưa (bỏ soft-deleted)
SELECT 1 FROM enrollments
WHERE user_id = ? AND course_id = ? AND deleted_at IS NULL;
```

### 2.7. `lesson_progress` (Tiến độ bài học)

| Field          | Type      | Constraint                          | Description            |
| :------------- | :-------- | :---------------------------------- | :--------------------- |
| `user_id`      | UUID      | FK → `users.id` ON DELETE CASCADE   | Học viên               |
| `lesson_id`    | UUID      | FK → `lessons.id` ON DELETE CASCADE | Bài học                |
| `completed`    | Boolean   | Not Null                            | Đã hoàn thành hay chưa |
| `completed_at` | Timestamp | -                                   | Thời điểm hoàn thành   |
| `created_at`   | Timestamp | Default: now()                      | Ngày tạo               |
| `updated_at`   | Timestamp | -                                   | Ngày cập nhật          |

**PK**: (`user_id`, `lesson_id`)
**Composite Index**: `(lesson_id, completed)` - Optimize admin view of lesson completion.

### 2.8. `submissions` (Bài nộp)

| Field             | Type      | Constraint                                        | Description                       |
| :---------------- | :-------- | :------------------------------------------------ | :-------------------------------- |
| `id`              | UUID      | PK                                                | Định danh duy nhất                |
| `user_id`         | UUID      | **Not Null**, FK → `users.id` ON DELETE CASCADE   | Học viên                          |
| `course_id`       | UUID      | **Not Null**, FK → `courses.id` ON DELETE CASCADE | Khóa học                          |
| `lesson_id`       | UUID      | **Not Null**, FK → `lessons.id` ON DELETE CASCADE | Bài tập/Project nào               |
| `submission_type` | Enum      | Not Null                                          | `assignment`, `final_project`     |
| `submission_text` | Text      | -                                                 | Nội dung nộp bài                  |
| `project_title`   | String    | -                                                 | Tên project (cho `final_project`) |
| `demo_url`        | String    | -                                                 | Link demo sản phẩm                |
| `source_url`      | String    | -                                                 | Link source code                  |
| `tools_used`      | Text      | -                                                 | Các công cụ AI đã dùng            |
| `reflection`      | Text      | -                                                 | Bài học rút ra/tự đánh giá        |
| `attachment_url`  | String    | -                                                 | Link file đính kèm (nếu có)       |
| `status`          | Enum      | Not Null                                          | `pending`, `approved`, `rejected` |
| `feedback`        | Text      | -                                                 | Nhận xét của admin                |
| `submitted_at`    | Timestamp | Default: now()                                    | Ngày nộp                          |
| `reviewed_at`     | Timestamp | -                                                 | Ngày duyệt                        |
| `reviewed_by`     | UUID      | FK → `users.id`                                   | Admin duyệt bài                   |
| `created_by`      | UUID      | FK → `users.id`                                   | Người tạo                         |
| `updated_by`      | UUID      | FK → `users.id`                                   | Người cập nhật cuối               |
| `deleted_at`      | Timestamp | -                                                 | Ngày xóa mềm (soft delete)        |
| `created_at`      | Timestamp | Default: now()                                    | Ngày tạo                          |
| `updated_at`      | Timestamp | -                                                 | Ngày cập nhật                     |

**Composite Index**: `(user_id, status)` - Optimize lookup bài nộp của học viên.

### 2.9. `certificates` (Chứng chỉ)

| Field              | Type      | Constraint                                        | Description                          |
| :----------------- | :-------- | :------------------------------------------------ | :----------------------------------- |
| `id`               | UUID      | PK                                                | Định danh duy nhất                   |
| `certificate_code` | String    | Unique, Not Null                                  | Format: `CERT-{YYYY}{RRRR}-{NNNNNN}` |
| `user_id`          | UUID      | **Not Null**, FK → `users.id` ON DELETE CASCADE   | Học viên nhận chứng chỉ              |
| `course_id`        | UUID      | **Not Null**, FK → `courses.id` ON DELETE CASCADE | Khóa học liên quan                   |
| `issued_at`        | Timestamp | Default: now()                                    | Ngày cấp                             |
| `certificate_url`  | String    | -                                                 | Link file PDF chứng chỉ              |
| `status`           | Enum      | Not Null                                          | `valid`, `revoked`                   |
| `revoked_reason`   | Text      | -                                                 | Lý do thu hồi                        |
| `revoked_at`       | Timestamp | -                                                 | Ngày thu hồi                         |
| `created_by`       | UUID      | FK → `users.id`                                   | Admin cấp chứng chỉ                  |
| `revoked_by`       | UUID      | FK → `users.id`                                   | Admin thu hồi chứng chỉ              |
| `created_at`       | Timestamp | Default: now()                                    | Ngày tạo                             |
| `updated_at`       | Timestamp | -                                                 | Ngày cập nhật                        |

### 2.10. `orders` (Đơn hàng - Tài chính)

| Field             | Type      | Constraint                                                                     | Description                                          |
| :---------------- | :-------- | :----------------------------------------------------------------------------- | :--------------------------------------------------- |
| `id`              | UUID      | PK                                                                             | Định danh duy nhất                                   |
| `order_code`      | String    | Unique, Not Null                                                               | Mã đơn hàng (Format: `ORD-{YYYY}-{NNNNNN}`)          |
| `user_id`         | UUID      | **Not Null**, FK → `users.id` ON DELETE RESTRICT                               | Người mua (Bắt buộc có user account)                 |
| `course_id`       | UUID      | **Not Null**, FK → `courses.id` ON DELETE CASCADE                              | Khóa học mua                                         |
| `amount`          | Decimal   | Not Null, CHECK(amount >= 0)                                                   | Giá thực thu                                         |
| `discount_amount` | Decimal   | CHECK(discount_amount >= 0)                                                    | Số tiền giảm giá                                     |
| `final_amount`    | Decimal   | Not Null, CHECK(final_amount >= 0 AND final_amount = amount - discount_amount) | Số tiền cuối cùng (amount - discount)                |
| `currency`        | String    | Default: 'VND'                                                                 | Đơn vị tiền tệ                                       |
| `status`          | Enum      | Not Null                                                                       | `pending`, `paid`, `failed`, `refunded`, `cancelled` |
| `payment_method`  | String    | -                                                                              | VNPay, Momo, Bank Transfer, etc.                     |
| `transaction_id`  | String    | -                                                                              | Mã giao dịch từ cổng thanh toán                      |
| `lead_id`         | UUID      | FK → `leads.id` ON DELETE SET NULL                                             | Lead nguồn (analytics only, nullable)                |
| `created_by`      | UUID      | FK → `users.id`                                                                | Admin tạo đơn hàng thủ công                          |
| `updated_by`      | UUID      | FK → `users.id`                                                                | Người cập nhật cuối                                  |
| `deleted_at`      | Timestamp | -                                                                              | Ngày xóa mềm (soft delete)                           |
| `refunded_at`     | Timestamp | -                                                                              | Ngày hoàn tiền                                       |
| `refund_reason`   | Text      | -                                                                              | Lý do hoàn tiền                                      |
| `note`            | Text      | -                                                                              | Ghi chú đơn hàng                                     |
| `created_at`      | Timestamp | Default: now()                                                                 | Ngày tạo đơn                                         |
| `paid_at`         | Timestamp | -                                                                              | Ngày thanh toán thành công                           |

**Business Rule:**

- **Lead $\rightarrow$ User Conversion**: Lead phải tạo tài khoản (`/register`) trước khi đặt hàng.
- `orders.user_id` là **NOT NULL** - mọi order phải thuộc về một user.
- `orders.lead_id` chỉ dùng cho analytics (theo dõi conversion từ lead).
- `final_amount` luôn bằng `amount - discount_amount`.

### 2.11. `leads` (Lead tiềm năng - Type B)

| Field        | Type      | Constraint      | Description                         |
| :----------- | :-------- | :-------------- | :---------------------------------- |
| `id`         | UUID      | PK              | Định danh duy nhất                  |
| `full_name`  | String    | Not Null        | Họ tên                              |
| `email`      | String    | Not Null        | Email                               |
| `phone`      | String    | -               | Số điện thoại/Zalo                  |
| `interest`   | String    | -               | Nhu cầu quan tâm                    |
| `message`    | Text      | -               | Nội dung yêu cầu                    |
| `source`     | String    | -               | contact_page, workshop_signup, etc. |
| `status`     | Enum      | Not Null        | `new`, `contacted`, `lost`          |
| `created_by` | UUID      | FK → `users.id` | Người tạo (admin/system)            |
| `updated_by` | UUID      | FK → `users.id` | Người cập nhật cuối                 |
| `deleted_at` | Timestamp | -               | Ngày xóa mềm (soft delete)          |
| `created_at` | Timestamp | Default: now()  | Ngày tạo                            |
| `updated_at` | Timestamp | -               | Ngày cập nhật                       |

### 2.12. `projects` (Triển lãm Dự án - Independent)

| Field         | Type      | Constraint                           | Description                            |
| :------------ | :-------- | :----------------------------------- | :------------------------------------- |
| `id`          | UUID      | PK                                   | Định danh duy nhất                     |
| `slug`        | String    | Unique, Not Null                     | URL thân thiện cho dự án               |
| `student_id`  | UUID      | FK → `users.id` ON DELETE SET NULL   | Học viên (Nullable cho sample project) |
| `course_id`   | UUID      | FK → `courses.id` ON DELETE SET NULL | Khóa học liên quan                     |
| `title`       | String    | Not Null                             | Tên dự án                              |
| `description` | Text      | -                                    | Mô tả chi tiết                         |
| `demo_url`    | String    | -                                    | Link chạy demo                         |
| `source_url`  | String    | -                                    | Link mã nguồn                          |
| `category`    | String    | -                                    | Website / Agent / Automation / Chatbot |
| `type`        | Enum      | Not Null                             | `sample_project`, `student_project`    |
| `is_featured` | Boolean   | Default: false                       | Hiển thị nổi bật trên website          |
| `status`      | Enum      | Not Null                             | `draft`, `published`, `hidden`         |
| `created_by`  | UUID      | FK → `users.id`                      | Người tạo                              |
| `updated_by`  | UUID      | FK → `users.id`                      | Người cập nhật cuối                    |
| `deleted_at`  | Timestamp | -                                    | Ngày xóa mềm (soft delete)             |
| `created_at`  | Timestamp | Default: now()                       | Ngày tạo                               |
| `updated_at`  | Timestamp | -                                    | Ngày cập nhật                          |

### 2.13. `admin_notes` (Ghi chú Quản trị)

| Field        | Type      | Constraint                                      | Description                                    |
| :----------- | :-------- | :---------------------------------------------- | :--------------------------------------------- |
| `id`         | UUID      | PK                                              | Định danh duy nhất                             |
| `student_id` | UUID      | **Not Null**, FK → `users.id` ON DELETE CASCADE | Học viên được ghi chú                          |
| `admin_id`   | UUID      | **Not Null**, FK → `users.id`                   | Admin tạo ghi chú                              |
| `note`       | Text      | Not Null                                        | Nội dung ghi chú                               |
| `note_type`  | Enum      | Not Null                                        | `consulting`, `support`, `payment`, `learning` |
| `updated_by` | UUID      | FK → `users.id`                                 | Người cập nhật cuối                            |
| `deleted_at` | Timestamp | -                                               | Ngày xóa mềm (soft delete)                     |
| `created_at` | Timestamp | Default: now()                                  | Thời điểm tạo ghi chú                          |
| `updated_at` | Timestamp | -                                               | Ngày cập nhật                                  |

---

## 3. Business Logic & Rules

### 3.1. Order $\rightarrow$ Enrollment Flow

- **Trigger**: Khi `orders.status` chuyển sang `paid`.
- **Action**: Hệ thống tự động tạo bản ghi trong `enrollments` với `status = active`.
- **Exception**: Admin có thể gán `enrollment` thủ công cho học viên (cho mục đích scholarship hoặc trial).

### 3.2. Enrollment Status & Expiration

- **`active`**: Học viên có quyền truy cập khóa học.
- **`completed`**: Học viên đã hoàn thành khóa.
- **`cancelled`**: Hủy bởi admin/hệ thống.
- **`expired`**: Truy cập hết hạn (được set khi `access_expires_at` đã qua). Có thể tự động chuyển từ `active` $\rightarrow$ `expired` bằng cron job.

### 3.3. Progress Calculation

$$\text{Tiến độ \%} = \left( \frac{\text{Số bài bắt buộc đã hoàn thành}}{\text{Tổng số bài bắt buộc của khóa}} \right) \times 100$$
_Bài hoàn thành_ = (LessonProgress.completed = true) OR (Submission.status = 'approved').

### 3.4. Certificate Eligibility (Computed)

Một học viên **đủ điều kiện** nhận chứng chỉ khi thỏa mãn:

1. Khóa học có `certificate_available = true` và `deleted_at IS NULL`.
2. Có `enrollment` trạng thái `active` hoặc `completed` và `deleted_at IS NULL`.
3. Tất cả bài học có `is_required_for_completion = true` VÀ `status = 'published'` phải hoàn thành (qua `lesson_progress` hoặc `submissions`).
4. Nếu khóa có bài `final_project` (`is_course_final_project = true` VÀ `status = 'published'`), bài nộp tương ứng phải được `approved`.
5. Chưa có chứng chỉ `valid` cho khóa học này.

**Không lưu field `is_eligible_for_certificate` vào DB** $\rightarrow$ Tính-on-the-fly bằng function `check_certificate_eligibility` hoặc query mỗi lần cần.

---

### 3.5. Course Access Control

- **Free Course** (`level = 'free'`): Truy cập tự do cho mọi user (không yêu cầu login/enrollment). Tuy nhiên, để nhận chứng chỉ, vẫn yêu cầu một bản ghi `enrollment` (có thể tự động tạo).
- **Paid Course**: Yêu cầu `enrollment` trạng thái `active`. **Không hỗ trợ `is_preview` bài học**.
- **Enrollment Logic**: Enrollment được quản lý tích hợp trong Student Detail Drawer (Admin).

### 3.5. User Activity Tracking

- Trường `users.last_activity_at` được cập nhật mỗi khi user:
  - Đăng nhập thành công
  - Truy cập trang học (`/learn/*`)
  - Nộp bài (`submissions`)
- Dùng cho Admin Dashboard: xác định học viên "chăm học" vs "im lặng".

---

### 3.6. Certificate Revocation & Eligibility Separation

**Quy tắc THEN-ĐỊNH (THIẾT KẾ):**

- **Computed Eligibility** = **Học thuật**: "Học viên đã hoàn thành tất cả yêu cầu của khóa học".
- `certificates.status = revoked` = **Hành chính**: "Chứng chỉ bị tước quyền vì lý do kỷ luật, gian lận, hoặc yêu cầu pháp lý".

**Việc thu hồi chứng chỉ (Revoke):**

1. Admin bấm "Revoke Certificate" trong `/admin/certificates`.
2. Hệ thống ghi:
   - `certificates.status` $\rightarrow$ `revoked`
   - `revoked_at` $\rightarrow$ `NOW()`
   - `revoked_by` $\rightarrow$ `admin.id`
   - `revoked_reason` $\rightarrow$ lý do do admin nhập (ví dụ: "Gian lận bài final project", "Vi phạm chính sách").
3. **Không được** xóa bản ghi certificate (giữ lại lịch sử).
4. **Không được** thay đổi trạng thái học tập của học viên (vì học viên vẫn đã hoàn thành khóa học, chỉ bị tước bằng chứng).

**Tác dụng:**

- Admin vẫn có thể xem "Học viên X đã hoàn thành khóa Y nhưng chứng chỉ bị thu hồi".
- Report/KPI về số chứng chỉ cấp (`certificates.status = 'valid'`) không bị sai lệch.
- Khi verify chứng chỉ (QR code): Hiển thị "INVALID - Revoked" rõ ràng.

---

### 3.7. Lead $\rightarrow$ User Independence

**Lead là thực thể độc lập:**

- `leads` lưu thông tin liên hệ của người quan tâm nhưng **chưa có tài khoản**.
- `leads` không có `user_id` FK. Mối liên hệ với `User` chỉ thông qua `orders.lead_id`.
- Khi một Lead đăng ký tài khoản (`/register`):
  - Tạo `users` mới.
  - Không tự động gán `leads.user_id` (vì `leads` không có trường này).
  - Nếu Lead đó sau đó mua khóa, `orders.lead_id` sẽ trỏ đến lead gốc $\rightarrow$ giúp track conversion funnel.

**Mục đích:**

- Dữ liệu Lead (quảng cáo, marketing) tách biệt hoàn toàn với User data (học tập).
- Có thể xóa User mà không ảnh hưởng đến Lead record (nếu muốn).
- Conversion funnel analysis: `leads` (chưa mua) $\rightarrow$ `orders` (đã mua) $\rightarrow$ `users` (có account) có thể track độc lập.

---

### 3.8. Soft Delete Propagation Rules

**Soft Delete Không Propagate Tự Động:**

- Xóa mềm `courses` $\rightarrow$ `enrollments` **không** tự động xóa mềm.
- Xóa mềm `users` $\rightarrow$ `enrollments`, `submissions`, `orders` **có thể** SET NULL (tùy FK action). Tuy nhiên, với `orders.user_id` là `ON DELETE RESTRICT`, user không thể bị xóa (hard/soft) nếu còn orders liên kết.

**Access Control với Soft Delete:**

```text
Khi user truy cập khóa học:
1. Check course.deleted_at IS NULL
2. Check enrollment.deleted_at IS NULL
3. Check enrollment.status = 'active'
```

**Queries phải bao gồm `deleted_at IS NULL`:**

```sql
-- Lấy enrollments hiệu quả
SELECT * FROM enrollments
WHERE user_id = ? AND deleted_at IS NULL;

-- Lấy courses published
SELECT * FROM courses
WHERE status = 'published' AND deleted_at IS NULL;
```

---

## 4. Indexing Strategy

### 4.1. Core Indexes (Performance)

- `users(email)`: B-Tree Index (Login)
- `courses(slug)`: B-Tree Index (SEO/Route)
- `certificates(certificate_code)`: B-Tree Index (Verification)
- `lesson_progress(user_id, lesson_id)`: Composite PK (O(1) check)
- `enrollments(user_id, course_id)`: **Partial Unique Index** (WHERE `deleted_at IS NULL`) - Prevent duplicate enrollments, fix race condition with soft delete.
- `enrollments(course_id, status)`: Composite Index (Admin filter by course + status)
- `enrollments(course_id, status, user_id)`: Covering index for admin queries
- `enrollments(user_id, status)`: Composite Index (Student's active courses)
- `submissions(user_id, status)`: Composite Index (Student view + Admin queue)
- `submissions(course_id, status)`: Composite Index (Admin review by course)
- `lesson_progress(lesson_id, completed)`: Composite Index (Lesson completion analytics)
- `lesson_progress(lesson_id, completed, user_id)`: Covering index for analytics
- `orders(user_id, status)`: Composite Index (Student order history)
- `orders(lead_id)`: Index (Lead conversion tracking)
- `orders(created_at)`: Index (Revenue reporting by date)
- `lessons(course_id, status)`: Composite Index (Course curriculum loading)
- `lessons(course_id, order_index)`: Composite Index (Curriculum ordering)
- `modules(course_id, order_index)`: **Unique Index** (Ensure strict module order per course)
- `lessons(module_id, order_index)`: **Unique Index** (Ensure strict lesson order per module)
- `admin_notes(student_id, created_at)`: Composite Index (Admin note history)

### 4.2. Foreign Key Indexes

All foreign keys automatically indexed in PostgreSQL:

- `enrollments(user_id)` → `users(id)`
- `enrollments(course_id)` → `courses(id)`
- `submissions(user_id)` → `users(id)`
- `submissions(course_id)` → `courses(id)`
- `submissions(lesson_id)` → `lessons(id)`
- `submissions(reviewed_by)` → `users(id)`
- `certificates(user_id)` → `users(id)`
- `certificates(course_id)` → `courses(id)`
- `certificates(created_by)` → `users(id)`
- `certificates(revoked_by)` → `users(id)`
- `orders(user_id)` → `users(id)`
- `orders(course_id)` → `courses(id)`
- `orders(lead_id)` → `leads(id)`
- `orders(created_by)` → `users(id)`
- `projects(student_id)` → `users(id)`
- `projects(course_id)` → `courses(id)`
- `projects(created_by)` → `users(id)`
- `lesson_resources(lesson_id)` → `lessons(id)`
- `lesson_resources(created_by)` → `users(id)`
- `admin_notes(student_id)` → `users(id)`
- `admin_notes(admin_id)` → `users(id)`
- `admin_notes(created_by)` → `users(id)`
- `admin_notes(updated_by)` → `users(id)`
- All modules/lessons/lesson_resources `created_by`, `updated_by` → `users(id)`

### 4.3. Partial Indexes (Optional for Scale)

```sql
-- Only index active enrollments (most queried)
CREATE INDEX idx_enrollments_active ON enrollments(user_id, course_id) WHERE status = 'active';

-- Only index published courses
CREATE INDEX idx_courses_published ON courses(slug) WHERE status = 'published';

-- Only index non-deleted records (if soft delete pattern in app)
CREATE INDEX idx_users_not_deleted ON users(id) WHERE deleted_at IS NULL;

-- Enforce single final project per course (business rule)
CREATE UNIQUE INDEX idx_lessons_course_final_project ON lessons(course_id) WHERE is_course_final_project = true;

-- Case-insensitive email uniqueness (requires citext extension or functional index)
-- Option 1: Using citext (recommended)
-- CREATE EXTENSION IF NOT EXISTS citext;
-- ALTER TABLE users ALTER COLUMN email TYPE CITEXT;
-- Option 2: Functional index
-- CREATE UNIQUE INDEX idx_users_email_lower ON users(LOWER(email));
```

### 3.6. Submission $\rightarrow$ Project Promotion

- `submissions` và `projects` là 2 bảng độc lập.
- Không có logic tự động chuyển bài nộp thành project.
- **Luồng thủ công**: Admin xem bài nộp $\rightarrow$ Bấm "Add to Projects" $\rightarrow$ Mở form pre-fill từ submission $\rightarrow$ Tạo bản ghi trong bảng `projects`.

---

## 5. Database Objects (Views & Functions)

### 5.1. Materialized View: `course_enrollment_stats`

**Purpose:** Optimize dashboard and admin reports for course performance.
**Refresh Strategy:** Via cron job (e.g., every 1 hour) using `REFRESH MATERIALIZED VIEW CONCURRENTLY`.
**Concurrent Refresh Requirement**: `CREATE UNIQUE INDEX idx_course_enrollment_stats_course_id ON course_enrollment_stats(course_id);`

```sql
CREATE MATERIALIZED VIEW course_enrollment_stats AS
SELECT
    c.id AS course_id,
    COUNT(e.id) FILTER (WHERE e.status = 'active') AS active_students,
    COUNT(e.id) FILTER (WHERE e.status = 'completed') AS completed_students,
    COUNT(DISTINCT e.user_id) AS total_unique_enrollees,
    CASE
        WHEN COUNT(DISTINCT e.user_id) > 0
        THEN (COUNT(e.id) FILTER (WHERE e.status = 'completed') * 100.0) / COUNT(DISTINCT e.user_id)
        ELSE 0
    END AS completion_percentage
FROM courses c
LEFT JOIN enrollments e ON c.id = e.course_id AND e.deleted_at IS NULL
WHERE c.deleted_at IS NULL
GROUP BY c.id;
```

### 5.2. Function: `check_certificate_eligibility`

**Purpose:** Real-time computed check for certificate eligibility.
**Logic:** Validates course settings, enrollment status, and completion of required published lessons and final project.

```sql
CREATE OR REPLACE FUNCTION check_certificate_eligibility(p_user_id UUID, p_course_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    v_incomplete_required BOOLEAN;
    v_final_project_approved BOOLEAN;
BEGIN
    -- 0. Check that the course exists, is not deleted, and offers certificates
    IF NOT EXISTS (
        SELECT 1 FROM courses
        WHERE id = p_course_id
          AND deleted_at IS NULL
          AND certificate_available = true
    ) THEN
        RETURN FALSE;
    END IF;

    -- 1. Check enrollment: must have active or completed enrollment
    IF NOT EXISTS (
        SELECT 1 FROM enrollments
        WHERE user_id = p_user_id
          AND course_id = p_course_id
          AND deleted_at IS NULL
          AND status IN ('active', 'completed')
    ) THEN
        RETURN FALSE;
    END IF;

    -- 2. Check if any required published lesson is not completed
    SELECT EXISTS (
        SELECT 1 FROM lessons
        WHERE course_id = p_course_id
          AND is_required_for_completion = true
          AND status = 'published'
          AND deleted_at IS NULL
          AND NOT EXISTS (
              SELECT 1 FROM lesson_progress
              WHERE user_id = p_user_id AND lesson_id = lessons.id AND completed = true
          )
          AND NOT EXISTS (
              SELECT 1 FROM submissions
              WHERE user_id = p_user_id AND lesson_id = lessons.id AND status = 'approved'
          )
    ) INTO v_incomplete_required;

    -- 3. Check if the course final project (if any) is approved
    -- Only consider published final project lessons
    SELECT EXISTS (
        SELECT 1 FROM submissions
        WHERE user_id = p_user_id
          AND lesson_id = (
              SELECT id FROM lessons
              WHERE course_id = p_course_id
                AND is_course_final_project = true
                AND status = 'published'
                AND deleted_at IS NULL
              LIMIT 1
          )
          AND status = 'approved'
    ) INTO v_final_project_approved;

    -- Eligible if: no incomplete required lessons AND (no final project required OR final project approved)
    RETURN (NOT v_incomplete_required) AND
           (NOT EXISTS (
               SELECT 1 FROM lessons
               WHERE course_id = p_course_id
                 AND is_course_final_project = true
                 AND status = 'published'
                 AND deleted_at IS NULL
           ) OR v_final_project_approved);
END;
$$ LANGUAGE plpgsql;
```
