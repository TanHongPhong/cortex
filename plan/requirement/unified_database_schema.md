# 💎 Unified Database Schema - CORTEX Project

**Version:** 1.6 (Balance Refund + Permission Hardening + Policy Pages)
**Last Updated:** 2026-06-01
**Status:** Single Source of Truth - Learning + Commerce + Data Integrity + Video Streaming + P1 Learning Operations + Balance Refund

---

## 1. Entity Relationship Summary (ERD Logic)

- **User** (1) $\rightarrow$ (N) **Enrollment** $\rightarrow$ (1) **Course**
- **User** (1) $\rightarrow$ (N) **PasswordResetToken**
- **User** (1) $\rightarrow$ (N) **AccountBalanceTransaction**
- **Course** (1) $\rightarrow$ (N) **Module** (1) $\rightarrow$ (N) **Lesson**
- **Course** (1) $\rightarrow$ (N) **CourseFaq**
- **Resource**: Public content/resource hub source for `/blog` and homepage resources
- **VideoAsset** (1) $\rightarrow$ (N) **Lesson** (`lesson_type = video`)
- **File** (1) $\rightarrow$ (N) **LessonResource** / certificates / invoices / attachments
- **User** (1) $\rightarrow$ (N) **LessonProgress** $\rightarrow$ (1) **Lesson**
- **User** (1) $\rightarrow$ (N) **Submission** $\rightarrow$ (1) **Course**
- **User** (1) $\rightarrow$ (N) **Certificate** $\rightarrow$ (1) **Course**
- **User** (1) $\rightarrow$ (N) **Order** $\rightarrow$ (1) **Course**
- **Order** (1) $\rightarrow$ (N) **PaymentTransaction**
- **Order** (1) $\rightarrow$ (N) **Invoice** (versioned receipts/invoices)
- **Coupon** (1) $\rightarrow$ (N) **CouponRedemption** $\rightarrow$ (1) **Order**
- **ReferralCode** (1) $\rightarrow$ (N) **ReferralConversion** $\rightarrow$ (1) **Order**
- **Course** (1) $\rightarrow$ (N) **Announcement**
- **Course** (1) $\rightarrow$ (N) **CourseInstructor** $\rightarrow$ (1) **User(role=instructor)**
- **User** (1) $\rightarrow$ (N) **Notification**
- **Lesson** (1) $\rightarrow$ (N) **LessonQuestion**
- **Lesson** (1) $\rightarrow$ (0..1) **Quiz** $\rightarrow$ (N) **QuizQuestion**
- **User** (1) $\rightarrow$ (N) **QuizAttempt**
- **Course** (1) $\rightarrow$ (N) **CourseReview**
- **CertificateTemplate** (1) $\rightarrow$ (N) **Certificate**
- **Lead (Type B)**: Independent entity (Contact point only)
- **Project**: Independent showcase entity (manual promotion from [[requirement/page/instructor/submissions|submissions]])
- **AuditLog**: Append-only system/admin/instructor activity log

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
| `role`              | Enum      | Not Null         | `student`, `instructor`, [[requirement/page/admin/admin|`admin`]]   |
| `status`            | Enum      | Not Null         | `active`, `blocked`                |
| `learning_interest` | Text      | -                | Nhu cầu học tập                    |
| `current_level`     | Text      | -                | Trình độ hiện tại                  |
| `learning_goal`     | Text      | -                | Mục tiêu học tập                   |
| `account_balance`   | Decimal   | Default: 0, CHECK(account_balance >= 0) | Số dư nội bộ của user, currency mặc định VND |
| `email_verified_at` | Timestamp | -                | Future only; MVP/P1 không build email verification |
| `last_login_at`     | Timestamp | -                | Lần đăng nhập thành công gần nhất  |
| `last_activity_at`  | Timestamp | -                | Lần hoạt động gần nhất             |
| `created_by`        | UUID      | FK → `users.id`  | Người tạo ([[requirement/page/admin/admin|admin]]/system)           |
| `updated_by`        | UUID      | FK → `users.id`  | Người cập nhật cuối                |
| `deleted_at`        | Timestamp | -                | Ngày xóa mềm (soft delete)         |
| `created_at`        | Timestamp | Default: now()   | Ngày tạo tài khoản                 |
| `updated_at`        | Timestamp | -                | Ngày cập nhật                      |

### 2.1.1. `password_reset_tokens` (Token đặt lại mật khẩu)

| Field        | Type      | Constraint                                    | Description                                  |
| :----------- | :-------- | :-------------------------------------------- | :------------------------------------------- |
| `id`         | UUID      | PK                                            | Định danh duy nhất                           |
| `user_id`    | UUID      | Not Null, FK → `users.id` ON DELETE CASCADE   | User yêu cầu đặt lại mật khẩu                |
| `token_hash` | String    | Unique, Not Null                              | Hash của reset token, không lưu raw token    |
| `expires_at` | Timestamp | Not Null                                      | Thời điểm token hết hạn                      |
| `used_at`    | Timestamp | -                                             | Thời điểm token đã dùng                      |
| `created_at` | Timestamp | Default: now()                                | Ngày tạo                                     |

**Business Rule:** Reset token chỉ dùng một lần, chỉ hợp lệ khi `used_at IS NULL` và `expires_at > now()`.

**Auth Rule:** MVP/P1 chỉ hỗ trợ đăng nhập bằng `email + password`. Email là username duy nhất. Không build Google OAuth, không build email verification, và không tạo `auth_providers` hoặc `email_verification_tokens` trong scope hiện tại.

### 2.1.2. `account_balance_transactions` (Ledger số dư tài khoản)

`account_balance_transactions` là ledger bắt buộc cho mọi thay đổi `users.account_balance`. Không được cập nhật balance trực tiếp nếu không tạo ledger record và audit log tương ứng.

| Field            | Type      | Constraint                                  | Description                                      |
| :--------------- | :-------- | :------------------------------------------ | :----------------------------------------------- |
| `id`             | UUID      | PK                                          | Định danh duy nhất                               |
| `user_id`        | UUID      | Not Null, FK → `users.id` ON DELETE RESTRICT | User sở hữu số dư                                |
| `type`           | Enum      | Not Null                                    | `refund_credit`, `admin_withdrawal_reset`, `admin_adjustment_reset` |
| `amount`         | Decimal   | Not Null, CHECK(amount >= 0)                | Số tiền thay đổi                                 |
| `currency`       | String    | Default: 'VND'                              | Đơn vị tiền                                      |
| `balance_before` | Decimal   | Not Null, CHECK(balance_before >= 0)        | Số dư trước giao dịch                            |
| `balance_after`  | Decimal   | Not Null, CHECK(balance_after >= 0)         | Số dư sau giao dịch                              |
| `source_type`    | String    | -                                           | Entity nguồn: `order`, `admin_adjustment`        |
| `source_id`      | UUID      | -                                           | ID entity nguồn                                  |
| `reason`         | Text      | -                                           | Lý do hiển thị/audit                             |
| `created_by`     | UUID      | FK → `users.id`                             | Admin/system tạo giao dịch                       |
| `created_at`     | Timestamp | Default: now()                              | Ngày tạo                                         |

**Business Rule:** Refund chỉ cộng credit nội bộ vào `users.account_balance`; balance không dùng để [[requirement/page/student/checkout|checkout]]/mua khóa trong MVP/P1. User muốn rút tiền phải liên hệ [[requirement/page/admin/admin|admin]], [[requirement/page/admin/admin|admin]] xử lý offline rồi tạo transaction `admin_withdrawal_reset` hoặc `admin_adjustment_reset` để đưa balance về `0`.

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
| `created_by`            | UUID      | FK → `users.id`  | Người tạo ([[requirement/page/admin/admin|admin]]/system)                                     |
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
| `lesson_type`                | Enum      | Not Null                            | `video`, `resource`, `quiz`, `assignment`, `final_project` |
| `content`                    | Text      | -                                   | Nội dung hướng dẫn/mô tả                           |
| `video_asset_id`             | UUID      | FK → `video_assets.id` ON DELETE SET NULL | Video asset chính từ streaming provider      |
| `video_url`                  | String    | -                                   | Legacy/fallback external URL, không phải nguồn chính cho paid course |
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

**Video lesson rule:** `lesson_type = video` chỉ được publish khi `video_asset_id` trỏ tới `video_assets.processing_status = ready`. `video_url` chỉ dùng cho migration/fallback/demo, không dùng làm chuẩn cho paid course production.

### 2.4.1. `video_assets` (Video streaming provider assets)

`video_assets` lưu metadata và liên kết tới video trên streaming provider. App/database không lưu binary video và không tự xử lý encode/streaming.

| Field               | Type      | Constraint                         | Description                                      |
| :------------------ | :-------- | :--------------------------------- | :----------------------------------------------- |
| `id`                | UUID      | PK                                 | Định danh duy nhất                               |
| `title`             | String    | Not Null                           | Tên video nội bộ                                 |
| `provider`          | Enum      | Not Null                           | `cloudflare_stream`, `bunny_stream`, `vimeo`, `external_url` |
| `provider_asset_id` | String    | -                                  | ID asset từ provider                             |
| `playback_url`      | String    | -                                  | URL phát video/tokenized playback nếu provider dùng |
| `embed_url`         | String    | -                                  | URL embed player                                 |
| `thumbnail_url`     | String    | -                                  | Thumbnail từ provider                            |
| `duration_seconds`  | Integer   | CHECK(duration_seconds >= 0)       | Thời lượng video tính bằng giây                  |
| `processing_status` | Enum      | Not Null                           | `pending`, `processing`, `ready`, `failed`, `archived` |
| `visibility`        | Enum      | Not Null                           | `private`, `unlisted`                            |
| `created_by`        | UUID      | FK → `users.id`                    | Admin upload/tạo asset                           |
| `updated_by`        | UUID      | FK → `users.id`                    | Người cập nhật cuối                              |
| `created_at`        | Timestamp | Default: now()                     | Ngày tạo                                         |
| `updated_at`        | Timestamp | -                                  | Ngày cập nhật                                    |

**Business Rule:**

- Video bài học phải dùng streaming provider làm nguồn chính.
- Paid course không dùng YouTube/Google Drive public link làm nguồn video chính.
- Student chỉ nhận `embed_url`/playback token sau khi backend kiểm tra quyền học.
- Nếu `processing_status != ready`, lesson không được publish và student không được mark complete.

### 2.4.2. `files` (File metadata dùng chung)

`files` lưu metadata cho file nội bộ như avatar, thumbnail, tài liệu, attachment, [[requirement/page/website/certificate|certificate]] PDF, invoice PDF, payment proof. File binary nằm ở object storage/CDN, không nằm trong database.

| Field             | Type      | Constraint                         | Description                                      |
| :---------------- | :-------- | :--------------------------------- | :----------------------------------------------- |
| `id`              | UUID      | PK                                 | Định danh duy nhất                               |
| `owner_type`      | String    | -                                  | Entity sở hữu: `user`, `course`, `lesson`, `submission`, [[requirement/page/website/certificate|`certificate`]], `invoice`, `order` |
| `owner_id`        | UUID      | -                                  | ID entity sở hữu                                 |
| `file_name`       | String    | Not Null                           | Tên file gốc/hiển thị                            |
| `mime_type`       | String    | -                                  | MIME type                                        |
| `size_bytes`      | Integer   | CHECK(size_bytes >= 0)             | Kích thước file                                  |
| `storage_provider` | String   | Not Null                           | Provider storage/CDN                             |
| `storage_key`     | String    | Not Null                           | Key/path trong object storage                    |
| `public_url`      | String    | -                                  | URL public nếu file được phép public             |
| `visibility`      | Enum      | Not Null                           | `public`, `private`                              |
| `created_by`      | UUID      | FK → `users.id`                    | Người upload                                     |
| `created_at`      | Timestamp | Default: now()                     | Ngày tạo                                         |

### 2.5. `lesson_resources` (Tài liệu đính kèm)

| Field         | Type      | Constraint                          | Description                                 |
| :------------ | :-------- | :---------------------------------- | :------------------------------------------ |
| `id`          | UUID      | PK                                  | Định danh duy nhất                          |
| `lesson_id`   | UUID      | FK → `lessons.id` ON DELETE CASCADE | Thuộc bài học nào                           |
| `file_id`     | UUID      | FK → `files.id` ON DELETE SET NULL  | File nội bộ nếu resource là file upload     |
| `title`       | String    | Not Null                            | Tên tài liệu                                |
| `type`        | Enum      | -                                   | `pdf`, `prompt`, `link`, `template`, `file` |
| `description` | Text      | -                                   | Mô tả                                       |
| `url`         | String    | -                                   | External link fallback nếu không dùng `file_id` |
| `order_index` | Integer   | -                                   | Thứ tự hiển thị                             |
| `created_by`  | UUID      | FK → `users.id`                     | Người tạo                                   |
| `updated_by`  | UUID      | FK → `users.id`                     | Người cập nhật cuối                         |
| `deleted_at`  | Timestamp | -                                   | Ngày xóa mềm (soft delete)                  |
| `created_at`  | Timestamp | Default: now()                      | Ngày tạo                                    |
| `updated_at`  | Timestamp | -                                   | Ngày cập nhật                               |

**Business Rule:** Video chính của lesson không lưu trong `lesson_resources`; video lesson phải trỏ qua `lessons.video_asset_id`. `lesson_resources` chỉ chứa tài liệu kèm theo bài học.

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
| `note`              | Text      | -                                                 | Ghi chú của [[requirement/page/admin/admin|admin]]                             |
| `created_by`        | UUID      | FK → `users.id`                                   | Admin gán khóa                                |
| `updated_by`        | UUID      | FK → `users.id`                                   | Người cập nhật cuối                           |
| `deleted_at`        | Timestamp | -                                                 | Ngày xóa mềm (soft delete)                    |
| `created_at`        | Timestamp | Default: now()                                    | Ngày tạo                                      |
| `updated_at`        | Timestamp | -                                                 | Ngày cập nhật                                 |

**Partial Unique Index**: `UNIQUE (user_id, course_id) WHERE deleted_at IS NULL` - Ngăn đăng ký trùng lặp, fix race condition với soft delete.
**Composite Index**: `(course_id, status)` - Optimize [[requirement/page/admin/admin|admin]] queries theo course/status.
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
**Composite Index**: `(lesson_id, completed)` - Optimize [[requirement/page/admin/admin|admin]] view of lesson completion.
**Business Rule:** Chỉ video/resource lesson được ghi complete trực tiếp vào `lesson_progress`. Quiz completion tính từ `quiz_attempts.passed`; assignment/final_project completion tính từ `[[requirement/page/instructor/submissions|submissions]].status = approved`.

### 2.8. [[requirement/page/instructor/submissions|`submissions`]] (Bài nộp)

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
| `attempt_no`      | Integer   | Not Null, Default: 1                              | Lần nộp thứ mấy cho lesson này    |
| `status`          | Enum      | Not Null                                          | `pending`, `approved`, `revision_requested`, `rejected` |
| `feedback`        | Text      | -                                                 | Nhận xét của [[requirement/page/admin/admin|admin]]                |
| `submitted_at`    | Timestamp | Default: now()                                    | Ngày nộp                          |
| `reviewed_at`     | Timestamp | -                                                 | Ngày duyệt                        |
| `reviewed_by`     | UUID      | FK → `users.id`                                   | Admin duyệt bài                   |
| `created_by`      | UUID      | FK → `users.id`                                   | Người tạo                         |
| `updated_by`      | UUID      | FK → `users.id`                                   | Người cập nhật cuối               |
| `deleted_at`      | Timestamp | -                                                 | Ngày xóa mềm (soft delete)        |
| `created_at`      | Timestamp | Default: now()                                    | Ngày tạo                          |
| `updated_at`      | Timestamp | -                                                 | Ngày cập nhật                     |

**Composite Index**: `(user_id, status)` - Optimize lookup bài nộp của học viên.
**Unique Index**: `UNIQUE(user_id, lesson_id, attempt_no)` - Mỗi lần nộp lại tạo một attempt mới, không ghi đè lịch sử.
**Business Rule:** `revision_requested` cho phép học viên nộp lại; chỉ `approved` mới tính hoàn thành assignment/final_project.

### 2.9. `certificates` (Chứng chỉ)

| Field              | Type      | Constraint                                        | Description                          |
| :----------------- | :-------- | :------------------------------------------------ | :----------------------------------- |
| `id`               | UUID      | PK                                                | Định danh duy nhất                   |
| `certificate_code` | String    | Unique, Not Null                                  | Format: `CERT-{YYYY}{RRRR}-{NNNNNN}` |
| `user_id`          | UUID      | **Not Null**, FK → `users.id` ON DELETE CASCADE   | Học viên nhận chứng chỉ              |
| `course_id`        | UUID      | **Not Null**, FK → `courses.id` ON DELETE CASCADE | Khóa học liên quan                   |
| `template_id`      | UUID      | FK → `certificate_templates.id` ON DELETE SET NULL | Template dùng khi cấp chứng chỉ      |
| `template_name_snapshot` | String | -                                             | Tên template tại thời điểm cấp       |
| `template_version_snapshot` | Integer | -                                          | Version template tại thời điểm cấp   |
| `issued_at`        | Timestamp | Default: now()                                    | Ngày cấp                             |
| `certificate_url`  | String    | -                                                 | Link file PDF chứng chỉ              |
| `status`           | Enum      | Not Null                                          | `valid`, `revoked`                   |
| `revoked_reason`   | Text      | -                                                 | Lý do thu hồi                        |
| `revoked_at`       | Timestamp | -                                                 | Ngày thu hồi                         |
| `created_by`       | UUID      | FK → `users.id`                                   | Admin cấp chứng chỉ                  |
| `revoked_by`       | UUID      | FK → `users.id`                                   | Admin thu hồi chứng chỉ              |
| `created_at`       | Timestamp | Default: now()                                    | Ngày tạo                             |
| `updated_at`       | Timestamp | -                                                 | Ngày cập nhật                        |

**Snapshot rule:** Certificate đã cấp không render lại bằng template hiện tại nếu template thay đổi. `certificate_url` và snapshot template giữ lịch sử cấp chứng chỉ.

### 2.10. `orders` (Đơn hàng - Tài chính)

`orders` là bản ghi tổng của một lần mua **một khóa học**. MVP vẫn giữ `orders.course_id`, không thêm `order_items`, `pricing_packages`, hoặc `package_courses`.

| Field                   | Type      | Constraint                                                                     | Description                                                  |
| :---------------------- | :-------- | :----------------------------------------------------------------------------- | :----------------------------------------------------------- |
| `id`                    | UUID      | PK                                                                             | Định danh duy nhất                                           |
| `order_code`            | String    | Unique, Not Null                                                               | Mã đơn hàng (Format: `ORD-{YYYY}-{NNNNNN}`)                  |
| `user_id`               | UUID      | **Not Null**, FK → `users.id` ON DELETE RESTRICT                               | Người mua (Bắt buộc có user account)                         |
| `course_id`             | UUID      | **Not Null**, FK → `courses.id` ON DELETE RESTRICT                             | Khóa học mua. Không cascade để tránh mất lịch sử đơn hàng     |
| `lead_id`               | UUID      | FK → `leads.id` ON DELETE SET NULL                                             | Lead nguồn (analytics only, nullable)                        |
| `amount`                | Decimal   | Not Null, CHECK(amount >= 0)                                                   | Giá gốc tại thời điểm tạo đơn                                |
| `discount_amount`       | Decimal   | Default: 0, CHECK(discount_amount >= 0)                                        | Tổng tiền giảm giá                                           |
| `final_amount`          | Decimal   | Not Null, CHECK(final_amount >= 0 AND final_amount = amount - discount_amount) | Số tiền cuối cùng                                            |
| `currency`              | String    | Default: 'VND'                                                                 | Đơn vị tiền tệ                                               |
| `status`                | Enum      | Not Null                                                                       | `pending`, `paid`, `failed`, `refunded`, `cancelled`         |
| `payment_status`        | Enum      | Not Null                                                                       | `unpaid`, `paid`, `refunded`, `partially_refunded`           |
| `payment_method`        | String    | -                                                                              | `bank_transfer`, `momo`, `vnpay`, `cash`, `manual`           |
| `transaction_id`        | String    | -                                                                              | Mã giao dịch chính/legacy. Chi tiết nằm ở `payment_transactions` |
| `payment_proof_url`     | String    | -                                                                              | Ảnh/chứng từ chuyển khoản thủ công                           |
| `billing_name`          | String    | -                                                                              | Tên người mua/người nhận biên nhận                           |
| `billing_email`         | String    | -                                                                              | Email nhận biên nhận/hóa đơn                                 |
| `billing_phone`         | String    | -                                                                              | Số điện thoại/Zalo thanh toán                                |
| `billing_address`       | Text      | -                                                                              | Địa chỉ xuất hóa đơn/biên nhận                               |
| `company_name`          | String    | -                                                                              | Tên công ty nếu cần hóa đơn                                  |
| `tax_code`              | String    | -                                                                              | Mã số thuế                                                   |
| `invoice_requested`     | Boolean   | Default: false                                                                 | Người mua yêu cầu hóa đơn/biên nhận                          |
| `course_title_snapshot` | String    | Not Null                                                                       | Tên khóa tại thời điểm mua                                   |
| `course_price_snapshot` | Decimal   | Not Null, CHECK(course_price_snapshot >= 0)                                    | Giá khóa tại thời điểm mua                                   |
| `coupon_id`             | UUID      | FK → `coupons.id` ON DELETE SET NULL                                           | Coupon được áp dụng nếu có                                   |
| `coupon_code_snapshot`  | String    | -                                                                              | Mã [[requirement/page/student/coupon|coupon]] tại thời điểm mua                                  |
| `referral_code_id`      | UUID      | FK → `referral_codes.id` ON DELETE SET NULL                                    | Mã giới thiệu nếu có                                         |
| `created_by`            | UUID      | FK → `users.id`                                                                | Admin tạo đơn hàng thủ công                                  |
| `updated_by`            | UUID      | FK → `users.id`                                                                | Người cập nhật cuối                                          |
| `deleted_at`            | Timestamp | -                                                                              | Ngày xóa mềm (soft delete)                                   |
| `paid_at`               | Timestamp | -                                                                              | Ngày thanh toán thành công                                   |
| `refunded_at`           | Timestamp | -                                                                              | Ngày hoàn tiền cuối cùng                                     |
| `refund_reason`         | Text      | -                                                                              | Lý do hoàn tiền                                              |
| `note`                  | Text      | -                                                                              | Ghi chú đơn hàng                                             |
| `created_at`            | Timestamp | Default: now()                                                                 | Ngày tạo đơn                                                 |
| `updated_at`            | Timestamp | -                                                                              | Ngày cập nhật                                                |

**Business Rule:**

- **Lead $\rightarrow$ User Conversion**: Lead phải tạo tài khoản (`/register`) trước khi đặt hàng.
- `orders.user_id` là **NOT NULL** - mọi order phải thuộc về một user.
- `orders.lead_id` chỉ dùng cho analytics (theo dõi conversion từ lead).
- `final_amount` luôn bằng `amount - discount_amount`.
- `course_title_snapshot`, `course_price_snapshot`, `coupon_code_snapshot` không được cập nhật sau khi order tạo, trừ khi [[requirement/page/admin/admin|admin]] hủy order và tạo lại.
- Refund trong MVP/P1 không hoàn tiền tự động qua gateway. Khi [[requirement/page/admin/admin|admin]] mark refunded, hệ thống cộng `orders.final_amount` vào `users.account_balance`, tạo `account_balance_transactions.type = refund_credit`, chuyển enrollment liên quan sang `cancelled`, và ghi `audit_logs`.
- Không hard delete orders. Nếu cần ẩn, dùng `deleted_at`, nhưng báo cáo tài chính mặc định vẫn phải có tùy chọn xem lịch sử.

### 2.10.1. `coupons` (Mã giảm giá)

| Field                  | Type      | Constraint                                      | Description                                      |
| :--------------------- | :-------- | :---------------------------------------------- | :----------------------------------------------- |
| `id`                   | UUID      | PK                                              | Định danh duy nhất                               |
| `code`                 | String    | Unique, Not Null                                | Mã giảm giá, nên lưu uppercase                   |
| `name`                 | String    | -                                               | Tên chiến dịch                                   |
| `description`          | Text      | -                                               | Mô tả nội bộ/marketing                           |
| `discount_type`        | Enum      | Not Null                                        | `percentage`, `fixed_amount`                     |
| `discount_value`       | Decimal   | Not Null, CHECK(discount_value > 0)             | Giá trị giảm                                     |
| `max_discount_amount`  | Decimal   | CHECK(max_discount_amount >= 0)                 | Trần giảm cho percentage                         |
| `min_order_amount`     | Decimal   | CHECK(min_order_amount >= 0)                    | Giá trị đơn tối thiểu                            |
| `usage_limit_total`    | Integer   | CHECK(usage_limit_total >= 0)                   | Tổng lượt dùng tối đa                            |
| `usage_limit_per_user` | Integer   | CHECK(usage_limit_per_user >= 0)                | Lượt dùng tối đa mỗi user                        |
| `used_count`           | Integer   | Default: 0, CHECK(used_count >= 0)              | Số lượt đã applied thành công                    |
| `applicable_scope`     | Enum      | Not Null                                        | `all`, `course`, `level`, `first_order`          |
| `course_id`            | UUID      | FK → `courses.id` ON DELETE SET NULL            | Nếu chỉ áp dụng cho một khóa                     |
| `level`                | Enum      | -                                               | Nếu áp dụng cho level: `starter`, `core`, ...    |
| `starts_at`            | Timestamp | -                                               | Thời điểm bắt đầu                                |
| `expires_at`           | Timestamp | -                                               | Thời điểm hết hạn                                |
| `is_stackable`         | Boolean   | Default: false                                  | Có được stack với [[requirement/page/student/referral|referral]] không                 |
| `status`               | Enum      | Not Null                                        | `active`, `paused`, `expired`, `archived`        |
| `created_by`           | UUID      | FK → `users.id`                                 | Admin tạo mã                                     |
| `updated_by`           | UUID      | FK → `users.id`                                 | Người cập nhật cuối                              |
| `deleted_at`           | Timestamp | -                                               | Ngày xóa mềm                                     |
| `created_at`           | Timestamp | Default: now()                                  | Ngày tạo                                         |
| `updated_at`           | Timestamp | -                                               | Ngày cập nhật                                    |

### 2.10.2. `coupon_redemptions` (Lịch sử dùng [[requirement/page/student/coupon|coupon]])

| Field             | Type      | Constraint                                | Description                                   |
| :---------------- | :-------- | :---------------------------------------- | :-------------------------------------------- |
| `id`              | UUID      | PK                                        | Định danh duy nhất                            |
| `coupon_id`       | UUID      | Not Null, FK → `coupons.id`               | Coupon được dùng                              |
| `order_id`        | UUID      | Not Null, FK → `orders.id`                | Đơn hàng áp dụng                              |
| `user_id`         | UUID      | Not Null, FK → `users.id`                 | User dùng [[requirement/page/student/coupon|coupon]]                              |
| `course_id`       | UUID      | Not Null, FK → `courses.id`               | Khóa học áp dụng                              |
| `redeemed_amount` | Decimal   | Not Null, CHECK(redeemed_amount >= 0)     | Số tiền giảm thực tế                          |
| `status`          | Enum      | Not Null                                  | `reserved`, `applied`, `cancelled`, `refunded` |
| `reserved_expires_at` | Timestamp | -                                      | Hạn giữ [[requirement/page/student/coupon|coupon]] khi order còn pending          |
| `redeemed_at`     | Timestamp | -                                         | Thời điểm [[requirement/page/student/coupon|coupon]] được applied                 |
| `created_at`      | Timestamp | Default: now()                            | Ngày tạo                                      |

**Business Rule:** `reserved` quá `reserved_expires_at` không được tính là giữ chỗ khi check usage limit; cleanup job có thể chuyển sang `cancelled`.

### 2.10.3. `payment_transactions` (Giao dịch thanh toán)

| Field                     | Type      | Constraint                            | Description                                      |
| :------------------------ | :-------- | :------------------------------------ | :----------------------------------------------- |
| `id`                      | UUID      | PK                                    | Định danh duy nhất                               |
| `order_id`                | UUID      | Not Null, FK → `orders.id`            | Đơn hàng liên quan                               |
| `provider`                | Enum      | Not Null                              | `bank_transfer`, `momo`, `vnpay`, `manual`, `cash` |
| `provider_transaction_id` | String    | -                                     | Mã giao dịch từ provider                         |
| `idempotency_key`         | String    | -                                     | Key chống duplicate khi webhook/admin retry      |
| `amount`                  | Decimal   | Not Null, CHECK(amount >= 0)          | Số tiền giao dịch                                |
| `currency`                | String    | Default: 'VND'                        | Đơn vị tiền                                      |
| `status`                  | Enum      | Not Null                              | `pending`, `success`, `failed`, `refunded`       |
| `raw_payload`             | JSONB     | -                                     | Payload từ provider/webhook                      |
| `processed_at`            | Timestamp | -                                     | Thời điểm xử lý thành công/thất bại              |
| `created_at`              | Timestamp | Default: now()                        | Ngày tạo                                         |
| `updated_at`              | Timestamp | -                                     | Ngày cập nhật                                    |

**Business Rule:** Webhook/admin retry không được tạo duplicate transaction nếu trùng `provider + idempotency_key` hoặc trùng `provider + provider_transaction_id`.

### 2.10.4. `payment_webhook_logs` (Log webhook thanh toán)

| Field                     | Type      | Constraint                 | Description                                      |
| :------------------------ | :-------- | :------------------------- | :----------------------------------------------- |
| `id`                      | UUID      | PK                         | Định danh duy nhất                               |
| `provider`                | Enum      | Not Null                   | `momo`, `vnpay`, `bank_transfer`, `manual`       |
| `event_type`              | String    | -                          | Loại sự kiện provider gửi                        |
| `provider_transaction_id` | String    | -                          | Mã giao dịch từ provider                         |
| `order_id`                | UUID      | FK → `orders.id`           | Nullable nếu chưa match được order               |
| `raw_payload`             | JSONB     | Not Null                   | Payload gốc                                      |
| `processing_status`       | Enum      | Not Null                   | `received`, `processed`, `failed`, `ignored`     |
| `provider_event_id`       | String    | -                          | ID event gốc từ payment provider để chống duplicate webhook |
| `error_message`           | Text      | -                          | Lỗi xử lý nếu có                                 |
| `created_at`              | Timestamp | Default: now()             | Ngày nhận webhook                                |

**Business Rule:** Nếu webhook trùng `provider + provider_event_id`, record mới phải được xử lý là `ignored` và không được tạo duplicate `payment_transactions`.

### 2.10.5. `invoices` (Biên nhận / hóa đơn)

| Field             | Type      | Constraint                         | Description                               |
| :---------------- | :-------- | :--------------------------------- | :---------------------------------------- |
| `id`              | UUID      | PK                                 | Định danh duy nhất                        |
| `order_id`        | UUID      | Not Null, FK → `orders.id`         | Đơn hàng liên quan                        |
| `replaced_invoice_id` | UUID  | FK → `invoices.id`                 | Invoice bị thay thế nếu phát hành bản mới |
| `invoice_version` | Integer   | Not Null, Default: 1               | Version invoice trong cùng order          |
| `invoice_code`    | String    | Unique, Not Null                   | Mã biên nhận/hóa đơn                      |
| `buyer_name`      | String    | Not Null                           | Tên người mua                             |
| `buyer_email`     | String    | -                                  | Email người mua                           |
| `buyer_phone`     | String    | -                                  | Số điện thoại                             |
| `company_name`    | String    | -                                  | Tên công ty                               |
| `tax_code`        | String    | -                                  | Mã số thuế                                |
| `billing_address` | Text      | -                                  | Địa chỉ                                   |
| `amount`          | Decimal   | Not Null, CHECK(amount >= 0)       | Số tiền trên biên nhận                    |
| `status`          | Enum      | Not Null                           | `draft`, `issued`, `cancelled`            |
| `issued_at`       | Timestamp | -                                  | Ngày phát hành                            |
| `invoice_url`     | String    | -                                  | Link file PDF                             |
| `created_at`      | Timestamp | Default: now()                     | Ngày tạo                                  |
| `updated_at`      | Timestamp | -                                  | Ngày cập nhật                             |

**Unique Index**: `UNIQUE(order_id, invoice_version)` - Cho phép nhiều version invoice/receipt trên cùng order nhưng không trùng version.
**Business Rule:** Invoice đã `issued` không sửa âm thầm. Nếu billing cần sửa, tạo invoice version mới và link `replaced_invoice_id`.

### 2.10.6. `referral_codes` (Mã giới thiệu)

| Field                    | Type      | Constraint                          | Description                                  |
| :----------------------- | :-------- | :---------------------------------- | :------------------------------------------- |
| `id`                     | UUID      | PK                                  | Định danh duy nhất                           |
| `user_id`                | UUID      | Not Null, FK → `users.id`           | Chủ mã giới thiệu                            |
| `code`                   | String    | Unique, Not Null                    | Mã giới thiệu                                |
| `referred_discount_type` | Enum      | -                                   | `percentage`, `fixed_amount`                 |
| `referred_discount_value`| Decimal   | CHECK(referred_discount_value >= 0) | Giá trị giảm cho người được giới thiệu       |
| `reward_type`            | Enum      | Not Null                            | [[requirement/page/student/coupon|`coupon`]], `credit`, `cash`, `project_review`, `mentoring` |
| `reward_value`           | String    | -                                   | Giá trị/thông tin phần thưởng                |
| `usage_limit_total`      | Integer   | CHECK(usage_limit_total >= 0)       | Tổng lượt dùng tối đa                        |
| `used_count`             | Integer   | Default: 0                          | Số conversion đã paid                        |
| `status`                 | Enum      | Not Null                            | `active`, `paused`, `archived`               |
| `created_at`             | Timestamp | Default: now()                      | Ngày tạo                                     |
| `updated_at`             | Timestamp | -                                   | Ngày cập nhật                                |

### 2.10.7. `referral_conversions` (Chuyển đổi [[requirement/page/student/referral|referral]])

| Field              | Type      | Constraint                          | Description                              |
| :----------------- | :-------- | :---------------------------------- | :--------------------------------------- |
| `id`               | UUID      | PK                                  | Định danh duy nhất                       |
| `referral_code_id` | UUID      | Not Null, FK → `referral_codes.id`  | Mã giới thiệu                            |
| `referrer_user_id` | UUID      | Not Null, FK → `users.id`           | Người giới thiệu                         |
| `referred_user_id` | UUID      | Not Null, FK → `users.id`           | Người được giới thiệu                    |
| `order_id`         | UUID      | Unique, Not Null, FK → `orders.id`  | Đơn hàng tạo conversion                  |
| `reward_status`    | Enum      | Not Null                            | `pending`, `approved`, `issued`, `cancelled` |
| `reward_issued_at` | Timestamp | -                                   | Ngày phát thưởng                         |
| `created_at`       | Timestamp | Default: now()                      | Ngày tạo                                 |

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
| `source_entity_type` | String | -            | Entity nguồn cụ thể: `resource`, `course`, [[requirement/page|`page`]] |
| `source_entity_id` | UUID | -                | ID entity nguồn nếu có               |
| `consent_marketing` | Boolean | Default: false | Đồng ý nhận tư vấn/marketing        |
| `consent_privacy_policy` | Boolean | Default: false | Đồng ý chính sách dữ liệu          |
| `utm_source` | String    | -               | UTM source                          |
| `utm_medium` | String    | -               | UTM medium                          |
| `utm_campaign` | String  | -               | UTM campaign                        |
| `landing_page_url` | String | -             | URL landing [[requirement/page|page]] nguồn              |
| `status`     | Enum      | Not Null        | `new`, `contacted`, `lost`          |
| `created_by` | UUID      | FK → `users.id` | Người tạo ([[requirement/page/admin/admin|admin]]/system)            |
| `updated_by` | UUID      | FK → `users.id` | Người cập nhật cuối                 |
| `deleted_at` | Timestamp | -               | Ngày xóa mềm (soft delete)          |
| `created_at` | Timestamp | Default: now()  | Ngày tạo                            |
| `updated_at` | Timestamp | -               | Ngày cập nhật                       |

### 2.12. [[requirement/page/website/projects|`projects`]] (Triển lãm Dự án - Independent)

| Field         | Type      | Constraint                           | Description                            |
| :------------ | :-------- | :----------------------------------- | :------------------------------------- |
| `id`          | UUID      | PK                                   | Định danh duy nhất                     |
| `slug`        | String    | Unique, Not Null                     | URL thân thiện cho dự án               |
| `student_id`  | UUID      | FK → `users.id` ON DELETE SET NULL   | Học viên (Nullable cho sample project) |
| `course_id`   | UUID      | FK → `courses.id` ON DELETE SET NULL | Khóa học liên quan                     |
| `title`       | String    | Not Null                             | Tên dự án                              |
| `short_description` | String | -                                   | Mô tả ngắn cho card public             |
| `description` | Text      | -                                    | Mô tả chi tiết                         |
| `thumbnail_url` | String | -                                    | Ảnh preview public                     |
| `demo_url`    | String    | -                                    | Link chạy demo                         |
| `source_url`  | String    | -                                    | Link mã nguồn                          |
| `category`    | String    | -                                    | Website / Agent / Automation / Chatbot |
| `type`        | Enum      | Not Null                             | `sample_project`, `student_project`    |
| `is_featured` | Boolean   | Default: false                       | Hiển thị nổi bật trên website          |
| `display_order` | Integer | -                                    | Thứ tự hiển thị public                 |
| `status`      | Enum      | Not Null                             | `draft`, `published`, `hidden`         |
| `published_at` | Timestamp | -                                   | Thời điểm public                       |
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

### 2.14. `resources` (Public resource / [[requirement/page/website/blog|blog]] hub)

`resources` là source duy nhất cho `/blog`, resource hub và resource section trên homepage. Không tạo song song bảng nội dung public khác trong MVP/P1.

| Field          | Type      | Constraint                 | Description                                  |
| :------------- | :-------- | :------------------------- | :------------------------------------------- |
| `id`           | UUID      | PK                         | Định danh duy nhất                           |
| `title`        | String    | Not Null                   | Tiêu đề resource                             |
| `slug`         | String    | Unique, Not Null           | URL thân thiện                               |
| `course_id`    | UUID      | FK → `courses.id` ON DELETE SET NULL | Khóa liên quan nếu resource dùng cho course |
| `resource_type` | Enum     | Not Null                   | `article`, `guide`, `template`, `download`, `case_study` |
| `category`     | String    | -                          | Nhóm nội dung                                |
| `excerpt`      | Text      | -                          | Mô tả ngắn                                   |
| `content`      | Text      | -                          | Nội dung bài/resource                        |
| `file_id`      | UUID      | FK → `files.id`            | File nội bộ nếu là downloadable resource     |
| `external_url` | String    | -                          | Link ngoài nếu không dùng file nội bộ        |
| `thumbnail_url` | String   | -                          | Ảnh đại diện                                 |
| `access_type`  | Enum      | Not Null, Default: `free`  | `free`, `email_required`, `student_only`     |
| `reading_time` | String    | -                          | Thời gian đọc hiển thị                       |
| `status`       | Enum      | Not Null                   | `draft`, `published`, `archived`             |
| `is_featured`  | Boolean   | Default: false             | Hiển thị nổi bật                             |
| `published_at` | Timestamp | -                          | Thời điểm publish                            |
| `created_by`   | UUID      | FK → `users.id`            | Người tạo                                    |
| `updated_by`   | UUID      | FK → `users.id`            | Người cập nhật cuối                          |
| `created_at`   | Timestamp | Default: now()             | Ngày tạo                                     |
| `updated_at`   | Timestamp | -                          | Ngày cập nhật                                |

### 2.15. `course_faqs` (FAQ theo khóa học)

| Field         | Type      | Constraint                  | Description                                  |
| :------------ | :-------- | :-------------------------- | :------------------------------------------- |
| `id`          | UUID      | PK                          | Định danh duy nhất                           |
| `course_id`   | UUID      | Not Null, FK → `courses.id` | Khóa học liên quan                           |
| `question`    | Text      | Not Null                    | Câu hỏi                                      |
| `answer`      | Text      | Not Null                    | Câu trả lời                                  |
| `order_index` | Integer   | Not Null                    | Thứ tự hiển thị                              |
| `status`      | Enum      | Not Null                    | `draft`, `published`, `hidden`               |
| `created_by`  | UUID      | FK → `users.id`             | Người tạo                                    |
| `updated_by`  | UUID      | FK → `users.id`             | Người cập nhật cuối                          |
| `created_at`  | Timestamp | Default: now()              | Ngày tạo                                     |
| `updated_at`  | Timestamp | -                           | Ngày cập nhật                                |

**Business Rule:** Public course detail chỉ hiển thị FAQ có `status = published`.

### 2.16. `announcements` (Thông báo khóa học / hệ thống)

| Field        | Type      | Constraint                           | Description                                  |
| :----------- | :-------- | :----------------------------------- | :------------------------------------------- |
| `id`         | UUID      | PK                                   | Định danh duy nhất                           |
| `scope`      | Enum      | Not Null                             | `global`, `course`                           |
| `course_id`  | UUID      | FK → `courses.id` ON DELETE CASCADE  | Bắt buộc nếu `scope = course`                |
| `title`      | String    | Not Null                             | Tiêu đề thông báo                            |
| `content`    | Text      | Not Null                             | Nội dung thông báo                           |
| `priority`   | Enum      | Not Null                             | `normal`, `important`, `urgent`              |
| `status`     | Enum      | Not Null                             | `draft`, `published`, `archived`             |
| `published_at` | Timestamp | -                                  | Thời điểm publish                            |
| `created_by` | UUID      | FK → `users.id`                      | Admin tạo thông báo                          |
| `updated_by` | UUID      | FK → `users.id`                      | Người cập nhật cuối                          |
| `deleted_at` | Timestamp | -                                    | Ngày xóa mềm                                 |
| `created_at` | Timestamp | Default: now()                       | Ngày tạo                                     |
| `updated_at` | Timestamp | -                                    | Ngày cập nhật                                |

### 2.17. `course_instructors` (Phân công instructor theo khóa)

| Field           | Type      | Constraint                        | Description                                  |
| :-------------- | :-------- | :-------------------------------- | :------------------------------------------- |
| `id`            | UUID      | PK                                | Định danh duy nhất                           |
| `course_id`     | UUID      | Not Null, FK → `courses.id`       | Khóa học được phân công                      |
| `instructor_id` | UUID      | Not Null, FK → `users.id`         | User role instructor/admin                   |
| `status`        | Enum      | Not Null                          | `active`, `inactive`                         |
| `can_view_course` | Boolean | Default: true                     | Được xem course/curriculum được phân công    |
| `can_answer_questions` | Boolean | Default: true                | Được trả lời Q&A lesson                      |
| `can_review_submissions` | Boolean | Default: true              | Được duyệt assignment/final_project          |
| `can_view_student_progress` | Boolean | Default: true            | Được xem tiến độ học viên trong course       |
| `assigned_by`   | UUID      | FK → `users.id`                   | Admin phân công                              |
| `assigned_at`   | Timestamp | Default: now()                    | Ngày phân công                               |
| `created_at`    | Timestamp | Default: now()                    | Ngày tạo                                     |
| `updated_at`    | Timestamp | -                                 | Ngày cập nhật                                |

**Unique Index**: `UNIQUE(course_id, instructor_id)` - Một instructor không được phân công trùng cùng khóa.

**Permission Rule:** Default: instructor được xem course (read-only), trả lời Q&A, duyệt [[requirement/page/instructor/submissions|submissions]] và xem progress của course được phân công. Instructor không được upload video, sửa lesson content, quản lý khóa/học viên, tạo announcement, xử lý order/payment/coupon/invoice/referral/revenue, hoặc cấp/revoke [[requirement/page/website/certificate|certificate]]. Tất cả quản lý khóa học, video, học viên, announcement là quyền của [[requirement/page/admin/admin|admin]].

### 2.18. [[requirement/page/student/notifications|`notifications`]] (Thông báo cá nhân in-app)

| Field            | Type      | Constraint                         | Description                                      |
| :--------------- | :-------- | :--------------------------------- | :----------------------------------------------- |
| `id`             | UUID      | PK                                 | Định danh duy nhất                               |
| `user_id`        | UUID      | Not Null, FK → `users.id`          | Người nhận                                       |
| `announcement_id` | UUID     | FK → `announcements.id`            | Nguồn announcement nếu có                        |
| `type`           | Enum      | Not Null                           | `order_paid`, `submission_reviewed`, `certificate_issued`, `announcement`, `question_answered`, `system` |
| `title`          | String    | Not Null                           | Tiêu đề hiển thị                                 |
| `body`           | Text      | -                                  | Nội dung ngắn                                    |
| `target_type`    | String    | -                                  | Entity đích: `course`, `lesson`, `order`, [[requirement/page/website/certificate|`certificate`]], `question`, `announcement` |
| `target_id`      | UUID      | -                                  | ID entity đích                                  |
| `target_url`     | String    | -                                  | Link điều hướng                                  |
| `read_at`        | Timestamp | -                                  | Đã đọc lúc nào                                   |
| `delivery_status` | Enum     | Not Null                           | `pending`, `delivered`, `failed`                 |
| `created_at`     | Timestamp | Default: now()                     | Ngày tạo                                         |

**Business Rule:** App ưu tiên điều hướng bằng `target_type + target_id`; `target_url` là fallback khi route cần deep link cụ thể.

### 2.19. `lesson_questions` (Q&A / Comment trong lesson)

| Field        | Type      | Constraint                          | Description                                  |
| :----------- | :-------- | :---------------------------------- | :------------------------------------------- |
| `id`         | UUID      | PK                                  | Định danh duy nhất                           |
| `lesson_id`  | UUID      | Not Null, FK → `lessons.id`         | Lesson liên quan                             |
| `course_id`  | UUID      | Not Null, FK → `courses.id`         | Denormalized để filter theo khóa             |
| `user_id`    | UUID      | Not Null, FK → `users.id`           | Người hỏi/trả lời                            |
| `parent_id`  | UUID      | FK → `lesson_questions.id`          | Reply cho question/comment khác              |
| `content`    | Text      | Not Null                            | Nội dung câu hỏi/trả lời                     |
| `status`     | Enum      | Not Null                            | `open`, `answered`, `resolved`, `hidden`     |
| `is_instructor_answer` | Boolean | Default: false              | Đánh dấu câu trả lời từ instructor/admin     |
| `resolved_at` | Timestamp | -                                  | Thời điểm giải quyết                         |
| `resolved_by` | UUID     | FK → `users.id`                     | Admin/instructor mark resolved               |
| `created_at` | Timestamp | Default: now()                      | Ngày tạo                                     |
| `updated_at` | Timestamp | -                                   | Ngày cập nhật                                |

### 2.20. `quizzes` (Quiz gắn với lesson)

| Field                  | Type      | Constraint                         | Description                                  |
| :--------------------- | :-------- | :--------------------------------- | :------------------------------------------- |
| `id`                   | UUID      | PK                                 | Định danh duy nhất                           |
| `lesson_id`            | UUID      | Unique, Not Null, FK → `lessons.id` | Một lesson quiz có một quiz chính            |
| `course_id`            | UUID      | Not Null, FK → `courses.id`        | Khóa học liên quan                           |
| `title`                | String    | Not Null                           | Tên quiz                                     |
| `description`          | Text      | -                                  | Mô tả ngắn                                   |
| `passing_score`        | Integer   | Default: 70                        | Điểm tối thiểu để pass                       |
| `max_attempts`         | Integer   | -                                  | Số lần làm tối đa, NULL là không giới hạn    |
| `status`               | Enum      | Not Null                           | `draft`, `published`, `archived`             |
| `created_by`           | UUID      | FK → `users.id`                    | Người tạo                                    |
| `updated_by`           | UUID      | FK → `users.id`                    | Người cập nhật cuối                          |
| `created_at`           | Timestamp | Default: now()                     | Ngày tạo                                     |
| `updated_at`           | Timestamp | -                                  | Ngày cập nhật                                |

### 2.21. `quiz_questions` (Câu hỏi quiz)

| Field             | Type      | Constraint                  | Description                                  |
| :---------------- | :-------- | :-------------------------- | :------------------------------------------- |
| `id`              | UUID      | PK                          | Định danh duy nhất                           |
| `quiz_id`         | UUID      | Not Null, FK → `quizzes.id` | Quiz cha                                     |
| `question_type`   | Enum      | Not Null                    | `single_choice`, `multiple_choice`, `short_text` |
| `question_text`   | Text      | Not Null                    | Nội dung câu hỏi                             |
| `options`         | JSONB     | -                           | Danh sách lựa chọn cho choice question       |
| `correct_answer`  | JSONB     | -                           | Đáp án đúng, chỉ [[requirement/page/admin/admin|admin]]/instructor xem        |
| `explanation`     | Text      | -                           | Giải thích sau khi nộp                       |
| `points`          | Integer   | Default: 1                  | Điểm câu hỏi                                 |
| `order_index`     | Integer   | Not Null                    | Thứ tự câu hỏi                               |
| `created_at`      | Timestamp | Default: now()              | Ngày tạo                                     |
| `updated_at`      | Timestamp | -                           | Ngày cập nhật                                |

### 2.22. `quiz_attempts` (Lần làm quiz)

| Field          | Type      | Constraint                         | Description                                  |
| :------------- | :-------- | :--------------------------------- | :------------------------------------------- |
| `id`           | UUID      | PK                                 | Định danh duy nhất                           |
| `quiz_id`      | UUID      | Not Null, FK → `quizzes.id`        | Quiz đã làm                                  |
| `lesson_id`    | UUID      | Not Null, FK → `lessons.id`        | Lesson liên quan                             |
| `course_id`    | UUID      | Not Null, FK → `courses.id`        | Khóa học liên quan                           |
| `user_id`      | UUID      | Not Null, FK → `users.id`          | Học viên                                     |
| `answers`      | JSONB     | Not Null                           | Câu trả lời của học viên                     |
| `score`        | Integer   | Not Null                           | Điểm đạt được                                |
| `passed`       | Boolean   | Not Null                           | Có đạt passing_score không                   |
| `attempt_no`   | Integer   | Not Null                           | Lần làm thứ mấy                              |
| `submitted_at` | Timestamp | Default: now()                     | Ngày nộp                                     |

### 2.23. `course_reviews` (Review/rating khóa học)

| Field        | Type      | Constraint                         | Description                                  |
| :----------- | :-------- | :--------------------------------- | :------------------------------------------- |
| `id`         | UUID      | PK                                 | Định danh duy nhất                           |
| `course_id`  | UUID      | Not Null, FK → `courses.id`        | Khóa học được review                         |
| `user_id`    | UUID      | Not Null, FK → `users.id`          | Học viên review                              |
| `rating`     | Integer   | Not Null, CHECK(rating BETWEEN 1 AND 5) | Điểm 1-5 sao                             |
| `title`      | String    | -                                  | Tiêu đề review                               |
| `content`    | Text      | -                                  | Nội dung review                              |
| `status`     | Enum      | Not Null                           | `pending`, `published`, `hidden`, `rejected` |
| `moderated_by` | UUID    | FK → `users.id`                    | Admin kiểm duyệt                             |
| `moderated_at` | Timestamp | -                                | Thời điểm kiểm duyệt                         |
| `moderation_note` | Text | -                                  | Ghi chú kiểm duyệt nội bộ                    |
| `published_at` | Timestamp | -                                | Thời điểm public                             |
| `created_at` | Timestamp | Default: now()                     | Ngày tạo                                     |
| `updated_at` | Timestamp | -                                  | Ngày cập nhật                                |

**Partial Unique Index**: `UNIQUE (course_id, user_id) WHERE status != 'rejected'` - Một học viên chỉ có một review active cho mỗi khóa.

### 2.24. `certificate_templates` (Template chứng chỉ)

| Field        | Type      | Constraint                         | Description                                  |
| :----------- | :-------- | :--------------------------------- | :------------------------------------------- |
| `id`         | UUID      | PK                                 | Định danh duy nhất                           |
| `name`       | String    | Not Null                           | Tên template                                 |
| `course_id`  | UUID      | FK → `courses.id` ON DELETE SET NULL | Template riêng cho khóa, nullable nếu global |
| `preview_image_url` | String | -                               | Ảnh preview                                  |
| `layout_json` | JSONB    | Not Null                           | Cấu hình layout/text placeholder             |
| `version`    | Integer   | Default: 1                         | Version template                             |
| `status`     | Enum      | Not Null                           | `draft`, `active`, `archived`                |
| `created_by` | UUID      | FK → `users.id`                    | Admin tạo                                    |
| `updated_by` | UUID      | FK → `users.id`                    | Người cập nhật cuối                          |
| `created_at` | Timestamp | Default: now()                     | Ngày tạo                                     |
| `updated_at` | Timestamp | -                                  | Ngày cập nhật                                |

### 2.25. `audit_logs` (Lịch sử thao tác quan trọng)

| Field         | Type      | Constraint                 | Description                                  |
| :------------ | :-------- | :------------------------- | :------------------------------------------- |
| `id`          | UUID      | PK                         | Định danh duy nhất                           |
| `actor_id`    | UUID      | FK → `users.id`            | Người thực hiện                              |
| `actor_role`  | String    | Not Null                   | Role tại thời điểm thao tác                  |
| `action`      | String    | Not Null                   | Ví dụ: `order.confirm_paid`, `[[requirement/page/website/certificate|certificate]].revoke` |
| `entity_type` | String    | Not Null                   | Bảng/loại entity bị tác động                 |
| `entity_id`   | UUID      | -                          | ID entity                                    |
| `metadata`    | JSONB     | -                          | Snapshot thay đổi/lý do                      |
| `ip_address`  | String    | -                          | IP nếu có                                    |
| `created_at`  | Timestamp | Default: now()             | Thời điểm ghi log                            |

---

## 3. Business Logic & Rules

### 3.1. Order $\rightarrow$ Enrollment Flow

- **Trigger**: Khi `orders.status` chuyển sang `paid`.
- **Action**: Hệ thống tự động tạo bản ghi trong `enrollments` với `status = active`.
- **Exception**: Admin có thể gán `enrollment` thủ công cho học viên (cho mục đích scholarship hoặc trial).
- **Idempotency**: Trước khi tạo enrollment phải check partial unique index `(user_id, course_id) WHERE deleted_at IS NULL` để không tạo trùng khi webhook retry hoặc [[requirement/page/admin/admin|admin]] bấm confirm nhiều lần.
- **Source of truth**: `orders.status` quyết định quyền học tổng thể; `payment_transactions.status` chỉ ghi nhận từng lần thanh toán cụ thể.

### 3.1.1. Checkout / Payment / Coupon / Referral Flow

**Checkout bán khóa đơn:**

```text
1. User đăng nhập hoặc đăng ký tài khoản
2. User chọn course và mở /checkout/:courseSlug
3. Backend tạo order pending, payment_status = unpaid
4. Snapshot course_title_snapshot và course_price_snapshot vào order
5. Nếu có [[requirement/page/student/coupon|coupon]]/referral, validate trước rồi ghi snapshot vào order
6. Tạo payment_transactions cho từng lần thanh toán/thử thanh toán
7. Khi thanh toán thành công:
   - payment_transactions.status = success
   - orders.status = paid
   - orders.payment_status = paid
   - orders.paid_at = now()
   - coupon_redemptions.status = applied nếu có [[requirement/page/student/coupon|coupon]]
   - referral_conversions.reward_status = approved nếu có [[requirement/page/student/referral|referral]]
   - tạo enrollment active nếu chưa tồn tại
```

**Coupon usage rule:**

- Khi user nhập [[requirement/page/student/coupon|coupon]] vào order pending, có thể tạo `coupon_redemptions.status = reserved`.
- `reserved` phải có `reserved_expires_at`; reservation hết hạn không được tính vào usage limit.
- Khi apply [[requirement/page/student/coupon|coupon]] thành paid, validate usage limit trong transaction và lock [[requirement/page/student/coupon|coupon]] row để tránh vượt limit do race condition.
- Chỉ tăng `coupons.used_count` khi order chuyển sang `paid` và redemption chuyển sang `applied`.
- Nếu order `cancelled` hoặc `failed`, redemption chuyển `cancelled` và không tăng `used_count`.
- Nếu order `refunded`, redemption chuyển `refunded`; `coupons.used_count` giữ nguyên để audit, không trừ lại.

**Referral anti-abuse rule:**

- User không được dùng [[requirement/page/student/referral|referral]] code của chính mình.
- Một `referred_user_id` chỉ được tính một conversion đầu tiên đã paid.
- Chỉ tạo/phê duyệt reward khi `orders.status = paid`.
- Nếu order refunded thì `referral_conversions.reward_status = cancelled`.

**Refund to balance rule:**

- Admin chỉ refund order đang `paid`.
- Khi refund: `orders.status = refunded`, `orders.payment_status = refunded`, `orders.refunded_at = now()`, bắt buộc có `refund_reason`.
- Hệ thống tạo một `account_balance_transactions.type = refund_credit` với `source_type = order`, `source_id = orders.id`, `amount = orders.final_amount`.
- `users.account_balance` tăng đúng bằng `orders.final_amount`; không dùng balance để [[requirement/page/student/checkout|checkout]] trong MVP/P1.
- Enrollment sinh từ order refunded chuyển `cancelled` để khóa quyền học. Nếu [[requirement/page/admin/admin|admin]] muốn giữ quyền học, phải tạo override riêng và ghi audit log `enrollment.override_after_refund`.
- User muốn rút số dư phải liên hệ [[requirement/page/admin/admin|admin]] qua `/contact?type=support`; [[requirement/page/admin/admin|admin]] xử lý offline và tạo ledger reset balance về `0`.

**Invoice / receipt rule:**

- `invoices` lấy dữ liệu từ billing snapshot trên `orders`.
- Nếu thông tin billing cần sửa sau khi issued, không sửa âm thầm; tạo invoice version mới và link `replaced_invoice_id`.
- MVP có thể dùng `invoices` như receipt/biên nhận, chưa bắt buộc là hóa đơn thuế hợp pháp.

### 3.2. Enrollment Status & Expiration

- **`active`**: Học viên có quyền truy cập khóa học.
- **`completed`**: Học viên đã hoàn thành khóa.
- **`cancelled`**: Hủy bởi [[requirement/page/admin/admin|admin]]/hệ thống.
- **`expired`**: Truy cập hết hạn (được set khi `access_expires_at` đã qua). Có thể tự động chuyển từ `active` $\rightarrow$ `expired` bằng cron job.
- Sau mỗi lần hoàn thành video/resource, pass quiz, hoặc submission được approved, hệ thống recompute required lessons. Nếu tất cả bài bắt buộc đã hoàn thành, set `enrollments.status = completed` và `completed_at = now()` idempotently.

### 3.3. Progress Calculation

$$\text{Tiến độ \%} = \left( \frac{\text{Số bài bắt buộc đã hoàn thành}}{\text{Tổng số bài bắt buộc của khóa}} \right) \times 100$$
_Bài hoàn thành_:

- `video` / `resource`: `lesson_progress.completed = true`.
- `quiz`: có ít nhất một `quiz_attempts.passed = true`.
- `assignment` / `final_project`: có ít nhất một `[[requirement/page/instructor/submissions|submissions]].status = approved`.
- `pending`, `revision_requested`, `rejected` không tính là hoàn thành.

### 3.4. Certificate Eligibility (Computed)

Một học viên **đủ điều kiện** nhận chứng chỉ khi thỏa mãn:

1. Khóa học có `certificate_available = true` và `deleted_at IS NULL`.
2. Có `enrollment` trạng thái `active` hoặc `completed` và `deleted_at IS NULL`.
3. Tất cả bài học có `is_required_for_completion = true` VÀ `status = 'published'` phải hoàn thành theo đúng lesson type.
4. Nếu khóa có bài `final_project` (`is_course_final_project = true` VÀ `status = 'published'`), bài nộp tương ứng phải được `approved`.
5. Chưa có chứng chỉ `valid` cho khóa học này.

**Không lưu field `is_eligible_for_certificate` vào DB** $\rightarrow$ Tính-on-the-fly bằng function `check_certificate_eligibility` hoặc query mỗi lần cần.

---

### 3.5. Course Access Control

- **Free Course** (`level = 'free'`): Truy cập tự do cho mọi user (không yêu cầu [[requirement/page/student/login|login]]/enrollment). Tuy nhiên, để nhận chứng chỉ, vẫn yêu cầu một bản ghi `enrollment` (có thể tự động tạo).
- **Paid Course**: Yêu cầu `enrollment` trạng thái `active`. **Không hỗ trợ `is_preview` bài học**.
- **Enrollment Logic**: Enrollment được quản lý tích hợp trong Student Detail Drawer (Admin).

### 3.6. User Activity Tracking

- Trường `users.last_activity_at` được cập nhật mỗi khi user:
  - Đăng nhập thành công
  - Truy cập trang học (`/learn/*`)
  - Nộp bài ([[requirement/page/instructor/submissions|`submissions`]])
- Dùng cho Admin Dashboard: xác định học viên "chăm học" vs "im lặng".

---

### 3.7. Certificate Revocation & Eligibility Separation

**Quy tắc THEN-ĐỊNH (THIẾT KẾ):**

- **Computed Eligibility** = **Học thuật**: "Học viên đã hoàn thành tất cả yêu cầu của khóa học".
- `certificates.status = revoked` = **Hành chính**: "Chứng chỉ bị tước quyền vì lý do kỷ luật, gian lận, hoặc yêu cầu pháp lý".

**Việc thu hồi chứng chỉ (Revoke):**

1. Admin bấm "Revoke Certificate" trong `/admin/certificates`.
2. Hệ thống ghi:
   - `certificates.status` $\rightarrow$ `revoked`
   - `revoked_at` $\rightarrow$ `NOW()`
   - `revoked_by` $\rightarrow$ `[[requirement/page/admin/admin|admin]].id`
   - `revoked_reason` $\rightarrow$ lý do do [[requirement/page/admin/admin|admin]] nhập (ví dụ: "Gian lận bài final project", "Vi phạm chính sách").
3. **Không được** xóa bản ghi [[requirement/page/website/certificate|certificate]] (giữ lại lịch sử).
4. **Không được** thay đổi trạng thái học tập của học viên (vì học viên vẫn đã hoàn thành khóa học, chỉ bị tước bằng chứng).

**Tác dụng:**

- Admin vẫn có thể xem "Học viên X đã hoàn thành khóa Y nhưng chứng chỉ bị thu hồi".
- Report/KPI về số chứng chỉ cấp (`certificates.status = 'valid'`) không bị sai lệch.
- Khi verify chứng chỉ (QR code): Hiển thị "INVALID - Revoked" rõ ràng.

---

### 3.8. Lead $\rightarrow$ User Independence

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

### 3.9. Soft Delete Propagation Rules

**Soft Delete Không Propagate Tự Động:**

- Xóa mềm `courses` $\rightarrow$ `enrollments` **không** tự động xóa mềm.
- Xóa mềm `users` $\rightarrow$ `enrollments`, [[requirement/page/instructor/submissions|`submissions`]], `orders` **có thể** SET NULL (tùy FK action). Tuy nhiên, với `orders.user_id` là `ON DELETE RESTRICT`, user không thể bị xóa (hard/soft) nếu còn orders liên kết.

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

### 3.10. P1 Learning Operations Rules

**Announcement / Notification:**

- **Chỉ [[requirement/page/admin/admin|admin]]** tạo và quản lý `announcements` với `scope = global` hoặc `scope = course`.
- Instructor không có quyền tạo/sửa/xóa announcement.
- Announcement scope course chỉ hiển thị với user có quyền học course đó hoặc instructor được phân công.
- Khi publish announcement, hệ thống tạo `[[requirement/page/student/notifications|notifications]].type = announcement` cho người nhận phù hợp.
- [[requirement/page/student/notifications|`notifications`]] là delivery cá nhân; không thay thế `announcements` là nội dung nguồn.
- MVP chỉ hỗ trợ in-app notification. Email/push là future.

**Lesson Q&A:**

- Student phải có enrollment active mới được xem/tạo `lesson_questions`.
- Instructor/admin được trả lời, ẩn nội dung vi phạm, và mark `resolved`.
- Q&A chỉ là thread theo lesson. Không build forum/community trong P1.
- Khi instructor/admin trả lời, tạo notification `question_answered` cho người hỏi.

**Quiz:**

- Quiz gắn với `lesson_type = quiz`; mỗi quiz lesson có một `quizzes` record.
- Quiz MVP hỗ trợ `single_choice`, `multiple_choice`, `short_text`.
- `short_text` trong MVP/P1 chỉ auto-grade bằng normalized exact match: trim, lowercase, so với danh sách accepted answers trong `quiz_questions.correct_answer`. Không build manual grading trong P1.
- Nếu lesson quiz có `is_required_for_completion = true`, học viên phải có ít nhất một `quiz_attempts.passed = true` để tính hoàn thành lesson.
- Không lưu đáp án đúng trong payload trả về cho student trước khi submit.

**Video Streaming:**

- Video bài học dùng `video_assets` làm source chính; `lessons.video_url` chỉ là legacy/fallback.
- Admin upload/chọn video asset trong `/admin/lessons`; provider xử lý encode/thumbnail/duration ngoài app.
- Lesson video chỉ publish khi `video_assets.processing_status = ready`.
- Student playback phải check [[requirement/page/student/login|login]], enrollment active, course/lesson published trước khi trả `embed_url` hoặc playback token.
- Không expose raw private video file cho client. Nếu provider cần signed token, backend phát token sau khi kiểm tra quyền.
- Video đang `pending`, `processing`, `failed`, hoặc `archived` không được mark complete.

**Course Review:**

- Chỉ user đã enrolled course mới được tạo review.
- Mỗi user chỉ có một review active cho mỗi course.
- Review public cần `status = published`; [[requirement/page/admin/admin|admin]] có thể hide/reject nếu spam hoặc vi phạm.

**Certificate Template:**

- Khi cấp [[requirement/page/website/certificate|certificate]], phải chọn active `certificate_templates`.
- Certificate lưu `template_id`, `template_name_snapshot`, `template_version_snapshot` để không sai lịch sử khi template đổi.

**Audit Log:**

- `audit_logs` là append-only, không sửa/xóa qua UI thường.
- Bắt buộc ghi log cho: confirm paid, refund to balance, balance reset, issue/revoke [[requirement/page/website/certificate|certificate]], change course publish status, change user role, instructor assignment/permission change, review moderation, announcement publish/archive, [[requirement/page/student/coupon|coupon]] create/update/archive, webhook manual match, resource publish/archive, video asset retry/fail, enrollment cancel/override, archive/delete/restore content.

**Instructor Role (Chuyên trách chấm bài & hỗ trợ học viên):**

- `instructor` chỉ xử lý các công việc liên quan đến **chấm bài và hỗ trợ học viên** trong khóa được phân công.
- Phân công instructor hợp lệ khi `course_instructors.status = active` và permission flag tương ứng là `true`.
- Default flags: `can_view_course = true`, `can_answer_questions = true`, `can_review_submissions = true`, `can_view_student_progress = true`.
- **KHÔNG có flag `can_manage_announcements`** — tất cả announcement do [[requirement/page/admin/admin|admin]] quản lý.

**Instructor KHÔNG có quyền:**

- Upload/sửa video lesson hoặc quản lý nội dung khóa học (đây là quyền của [[requirement/page/admin/admin|admin]]).
- Quản lý học viên, gán khóa, block/unblock (đây là quyền của [[requirement/page/admin/admin|admin]]).
- Tạo/sửa/xóa course, module, lesson (đây là quyền của [[requirement/page/admin/admin|admin]]).
- Xử lý order/payment/coupon/invoice/referral/revenue.
- Cấp/revoke [[requirement/page/website/certificate|certificate]].
- Quản lý announcement.

**Instructor CHỈ có quyền:**

- Xem curriculum (module/lesson) của khóa được phân công (read-only).
- Duyệt assignment/final project: approve, reject, mark `revision_requested`.
- Trả lời Q&A lesson: reply, mark resolved, hide nếu vi phạm.
- Xem tiến độ học viên trong khóa (nếu `can_view_student_progress = true`).

### 3.11. Submission $\rightarrow$ Project Promotion

- [[requirement/page/instructor/submissions|`submissions`]] và [[requirement/page/website/projects|`projects`]] là 2 bảng độc lập.
- Không có logic tự động chuyển bài nộp thành project.
- **Luồng thủ công**: Admin xem bài nộp $\rightarrow$ Bấm "Add to Projects" $\rightarrow$ Mở form pre-fill từ submission $\rightarrow$ Tạo bản ghi trong bảng [[requirement/page/website/projects|`projects`]].

## 4. Indexing Strategy

### 4.1. Core Indexes (Performance)

- `users(email)`: B-Tree Index (Login)
- `account_balance_transactions(user_id, created_at)`: Composite Index (Balance ledger history)
- `account_balance_transactions(source_type, source_id)`: Composite Index (Trace refund/admin adjustment source)
- `password_reset_tokens(token_hash)`: Unique Index (Reset password lookup)
- `password_reset_tokens(user_id, expires_at)`: Composite Index (Active reset token cleanup)
- `courses(slug)`: B-Tree Index (SEO/Route)
- `certificates(certificate_code)`: B-Tree Index (Verification)
- `lesson_progress(user_id, lesson_id)`: Composite PK (O(1) check)
- `enrollments(user_id, course_id)`: **Partial Unique Index** (WHERE `deleted_at IS NULL`) - Prevent duplicate enrollments, fix race condition with soft delete.
- `enrollments(course_id, status)`: Composite Index (Admin filter by course + status)
- `enrollments(course_id, status, user_id)`: Covering index for [[requirement/page/admin/admin|admin]] queries
- `enrollments(user_id, status)`: Composite Index (Student's active courses)
- `[[requirement/page/instructor/submissions|submissions]](user_id, status)`: Composite Index (Student view + Admin queue)
- `[[requirement/page/instructor/submissions|submissions]](course_id, status)`: Composite Index (Admin review by course)
- `[[requirement/page/instructor/submissions|submissions]](user_id, lesson_id, attempt_no)`: Unique Index (Submission retry history)
- `lesson_progress(lesson_id, completed)`: Composite Index (Lesson completion analytics)
- `lesson_progress(lesson_id, completed, user_id)`: Covering index for analytics
- `orders(user_id, status)`: Composite Index (Student order history)
- `orders(lead_id)`: Index (Lead conversion tracking)
- `orders(created_at)`: Index (Revenue reporting by date)
- `orders(status, payment_status)`: Composite Index (Admin finance filters)
- `orders(course_id, status)`: Composite Index (Revenue/course reporting)
- `orders(coupon_id)`: Index (Coupon analytics)
- `orders(referral_code_id)`: Index (Referral analytics)
- `coupons(code)`: Unique Index (Coupon lookup)
- `coupons(status, starts_at, expires_at)`: Composite Index (Active [[requirement/page/student/coupon|coupon]] validation)
- `coupon_redemptions(coupon_id, status)`: Composite Index (Coupon usage count)
- `coupon_redemptions(user_id, coupon_id, status)`: Composite Index (Per-user limit check)
- `coupon_redemptions(status, reserved_expires_at)`: Composite Index (Expired reservation cleanup)
- `payment_transactions(order_id, status)`: Composite Index (Order payment history)
- `payment_transactions(provider, provider_transaction_id)`: Composite Index (Webhook matching)
- `payment_transactions(provider, idempotency_key)`: Unique/Partial Index where `idempotency_key IS NOT NULL` (Retry safety)
- `payment_webhook_logs(provider, provider_transaction_id)`: Composite Index (Webhook debug)
- `payment_webhook_logs(provider, provider_event_id)`: Unique/Partial Index where `provider_event_id IS NOT NULL` (Webhook duplicate protection)
- `invoices(order_id, invoice_version)`: Unique Index (Invoice versioning per order)
- `invoices(replaced_invoice_id)`: Index (Invoice replacement chain)
- `referral_codes(code)`: Unique Index (Referral lookup)
- `referral_conversions(referred_user_id)`: Partial Unique Index for first paid conversion policy
- `announcements(scope, status, published_at)`: Composite Index (Published announcement feed)
- `announcements(course_id, status)`: Composite Index (Course announcement feed)
- `course_instructors(instructor_id, status)`: Composite Index (Instructor workspace course list)
- `course_instructors(course_id, status)`: Composite Index (Course instructor lookup)
- `[[requirement/page/student/notifications|notifications]](user_id, read_at, created_at)`: Composite Index (Student notification inbox)
- `[[requirement/page/student/notifications|notifications]](user_id, delivery_status)`: Composite Index (Failed/pending delivery debug)
- `lesson_questions(lesson_id, status, created_at)`: Composite Index (Lesson Q&A thread)
- `lesson_questions(course_id, status)`: Composite Index (Instructor question queue)
- `quizzes(lesson_id)`: Unique Index (One quiz per quiz lesson)
- `quiz_questions(quiz_id, order_index)`: Unique Index (Quiz question ordering)
- `quiz_attempts(user_id, quiz_id, attempt_no)`: Composite Index (Attempt history)
- `quiz_attempts(user_id, lesson_id, passed)`: Composite Index (Progress completion check)
- `course_reviews(course_id, status, rating)`: Composite Index (Public review display)
- `course_reviews(course_id, user_id)`: Partial Unique Index (One active review per student/course)
- `resources(slug)`: Unique Index (Resource route)
- `resources(course_id, status)`: Composite Index (Course resource listing)
- `resources(status, published_at)`: Composite Index (Public resource listing)
- `resources(is_featured, status)`: Composite Index (Homepage featured resources)
- `leads(source_entity_type, source_entity_id)`: Composite Index (Resource/course lead attribution)
- `course_faqs(course_id, status, order_index)`: Composite Index (Course FAQ display)
- `certificate_templates(course_id, status)`: Composite Index (Template lookup)
- `audit_logs(actor_id, created_at)`: Composite Index (Actor audit trail)
- `audit_logs(entity_type, entity_id, created_at)`: Composite Index (Entity audit trail)
- `lessons(course_id, status)`: Composite Index (Course curriculum loading)
- `lessons(course_id, order_index)`: Composite Index (Curriculum ordering)
- `lessons(video_asset_id)`: Index (Video lesson asset lookup)
- `video_assets(provider, provider_asset_id)`: Composite Index (Provider asset lookup/webhook sync)
- `video_assets(processing_status)`: Composite Index (Upload/processing queue)
- `files(owner_type, owner_id)`: Composite Index (Entity file lookup)
- `modules(course_id, order_index)`: **Unique Index** (Ensure strict module order per course)
- `lessons(module_id, order_index)`: **Unique Index** (Ensure strict lesson order per module)
- `admin_notes(student_id, created_at)`: Composite Index (Admin note history)

### 4.2. Foreign Key Indexes

All foreign keys automatically indexed in PostgreSQL:

- `password_reset_tokens(user_id)` → `users(id)`
- `account_balance_transactions(user_id)` → `users(id)`
- `account_balance_transactions(created_by)` → `users(id)`
- `enrollments(user_id)` → `users(id)`
- `enrollments(course_id)` → `courses(id)`
- `[[requirement/page/instructor/submissions|submissions]](user_id)` → `users(id)`
- `[[requirement/page/instructor/submissions|submissions]](course_id)` → `courses(id)`
- `[[requirement/page/instructor/submissions|submissions]](lesson_id)` → `lessons(id)`
- `[[requirement/page/instructor/submissions|submissions]](reviewed_by)` → `users(id)`
- `certificates(user_id)` → `users(id)`
- `certificates(course_id)` → `courses(id)`
- `certificates(template_id)` → `certificate_templates(id)`
- `certificates(created_by)` → `users(id)`
- `certificates(revoked_by)` → `users(id)`
- `orders(user_id)` → `users(id)`
- `orders(course_id)` → `courses(id)`
- `orders(lead_id)` → `leads(id)`
- `orders(coupon_id)` → `coupons(id)`
- `orders(referral_code_id)` → `referral_codes(id)`
- `orders(created_by)` → `users(id)`
- `coupons(course_id)` → `courses(id)`
- `coupons(created_by)` → `users(id)`
- `coupons(updated_by)` → `users(id)`
- `coupon_redemptions(coupon_id)` → `coupons(id)`
- `coupon_redemptions(order_id)` → `orders(id)`
- `coupon_redemptions(user_id)` → `users(id)`
- `coupon_redemptions(course_id)` → `courses(id)`
- `payment_transactions(order_id)` → `orders(id)`
- `payment_webhook_logs(order_id)` → `orders(id)`
- `invoices(order_id)` → `orders(id)`
- `invoices(replaced_invoice_id)` → `invoices(id)`
- `referral_codes(user_id)` → `users(id)`
- `referral_conversions(referral_code_id)` → `referral_codes(id)`
- `referral_conversions(referrer_user_id)` → `users(id)`
- `referral_conversions(referred_user_id)` → `users(id)`
- `referral_conversions(order_id)` → `orders(id)`
- `[[requirement/page/website/projects|projects]](student_id)` → `users(id)`
- `[[requirement/page/website/projects|projects]](course_id)` → `courses(id)`
- `[[requirement/page/website/projects|projects]](created_by)` → `users(id)`
- `lessons(video_asset_id)` → `video_assets(id)`
- `video_assets(created_by)` → `users(id)`
- `video_assets(updated_by)` → `users(id)`
- `files(created_by)` → `users(id)`
- `lesson_resources(lesson_id)` → `lessons(id)`
- `lesson_resources(file_id)` → `files(id)`
- `lesson_resources(created_by)` → `users(id)`
- `admin_notes(student_id)` → `users(id)`
- `admin_notes(admin_id)` → `users(id)`
- `admin_notes(created_by)` → `users(id)`
- `admin_notes(updated_by)` → `users(id)`
- `resources(file_id)` → `files(id)`
- `resources(course_id)` → `courses(id)`
- `resources(created_by)` → `users(id)`
- `resources(updated_by)` → `users(id)`
- `course_faqs(course_id)` → `courses(id)`
- `course_faqs(created_by)` → `users(id)`
- `course_faqs(updated_by)` → `users(id)`
- `announcements(course_id)` → `courses(id)`
- `announcements(created_by)` → `users(id)`
- `announcements(updated_by)` → `users(id)`
- `course_instructors(course_id)` → `courses(id)`
- `course_instructors(instructor_id)` → `users(id)`
- `course_instructors(assigned_by)` → `users(id)`
- `[[requirement/page/student/notifications|notifications]](user_id)` → `users(id)`
- `[[requirement/page/student/notifications|notifications]](announcement_id)` → `announcements(id)`
- `lesson_questions(lesson_id)` → `lessons(id)`
- `lesson_questions(course_id)` → `courses(id)`
- `lesson_questions(user_id)` → `users(id)`
- `lesson_questions(parent_id)` → `lesson_questions(id)`
- `lesson_questions(resolved_by)` → `users(id)`
- `quizzes(lesson_id)` → `lessons(id)`
- `quizzes(course_id)` → `courses(id)`
- `quizzes(created_by)` → `users(id)`
- `quizzes(updated_by)` → `users(id)`
- `quiz_questions(quiz_id)` → `quizzes(id)`
- `quiz_attempts(quiz_id)` → `quizzes(id)`
- `quiz_attempts(lesson_id)` → `lessons(id)`
- `quiz_attempts(course_id)` → `courses(id)`
- `quiz_attempts(user_id)` → `users(id)`
- `course_reviews(course_id)` → `courses(id)`
- `course_reviews(user_id)` → `users(id)`
- `course_reviews(moderated_by)` → `users(id)`
- `certificate_templates(course_id)` → `courses(id)`
- `certificate_templates(created_by)` → `users(id)`
- `certificate_templates(updated_by)` → `users(id)`
- `audit_logs(actor_id)` → `users(id)`
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

## 5. Database Objects (Views & Functions)

### 5.1. Materialized View: `course_enrollment_stats`

**Purpose:** Optimize [[requirement/page/student/dashboard|dashboard]] and [[requirement/page/admin/admin|admin]] reports for course performance.
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

**Purpose:** Real-time computed check for [[requirement/page/website/certificate|certificate]] eligibility.
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
          AND (
              (lesson_type IN ('video', 'resource') AND NOT EXISTS (
                  SELECT 1 FROM lesson_progress
                  WHERE user_id = p_user_id AND lesson_id = lessons.id AND completed = true
              ))
              OR (lesson_type = 'quiz' AND NOT EXISTS (
                  SELECT 1 FROM quiz_attempts
                  WHERE user_id = p_user_id AND lesson_id = lessons.id AND passed = true
              ))
              OR (lesson_type IN ('assignment', 'final_project') AND NOT EXISTS (
                  SELECT 1 FROM [[requirement/page/instructor/submissions|submissions]]
                  WHERE user_id = p_user_id AND lesson_id = lessons.id AND status = 'approved'
              ))
          )
    ) INTO v_incomplete_required;

    -- 3. Check if the course final project (if any) is approved
    -- Only consider published final project lessons
    SELECT EXISTS (
        SELECT 1 FROM [[requirement/page/instructor/submissions|submissions]]
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

---

## 🗺️ Obsidian Meta

### Tags
- #cortex/plan
- #cortex/requirement

### Navigation
- **Breadcrumbs:** [[CORTEX_PLAN_MOC|Plan Home]] / [[requirement/page|Requirements]]

### Relations
- **Outgoing Links:** [[requirement/page|1. Public Website — phần người ngoài nhìn thấy]], [[requirement/page/admin/admin|Admin Dashboard — Requirement]], [[requirement/page/instructor/submissions|/instructor/submissions — Duyệt bài nộp]], [[requirement/page/student/checkout|/checkout/:courseSlug — Thanh toán khóa học]], [[requirement/page/student/coupon|/coupon — Coupon của tôi / Nhập mã giảm giá]], [[requirement/page/student/dashboard|/dashboard — Trang tổng quan học viên]], [[requirement/page/student/login|/login — Đăng nhập]], [[requirement/page/student/notifications|/notifications — Thông báo của tôi]], [[requirement/page/student/referral|/referral — Mã giới thiệu]], [[requirement/page/website/blog|/blog — Blog / Resources Hub]], [[requirement/page/website/certificate|/certificate — Trang chứng chỉ]], [[requirement/page/website/projects|/projects — Trang dự án học viên]]
- **Incoming Links (Backlinks):** [[PLAN_CONFLICT_AUDIT|Plan Conflict Audit - CORTEX Requirements]], [[requirement/hard_notes|Hard Notes]], [[requirement/page/admin/admin|Admin Dashboard — Requirement]]
