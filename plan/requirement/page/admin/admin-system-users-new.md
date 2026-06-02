# /admin/system/users/new — Hidden Staff Account Creation

**Status:** P1
**Owner area:** Admin
**Source of truth:** `plan/requirement/page_function_matrix.md`, `plan/requirement/unified_database_schema.md`, `plan/requirement/security.md`
**Build decision:** Build hidden route

## 1. Mục tiêu

`/admin/system/users/new` là route ẩn để [[[[requirement/page/admin/admin|requirement/page/admin/admin]]|[[requirement/page/admin/admin|admin]]]] tạo tài khoản vận hành nội bộ:

- [[[[requirement/page/admin/admin|requirement/page/admin/admin]]|[[requirement/page/admin/admin|`admin`]]]]
- `instructor`

Route này không phải trang quản lý user công khai trong [[[[requirement/page/admin/admin|requirement/page/admin/admin]]|[[requirement/page/admin/admin|admin]]]] [[[[requirement/page/student/dashboard|requirement/page/student/dashboard]]|[[requirement/page/student/dashboard|dashboard]]]]. Không đưa vào sidebar, quick action, command palette, search nội bộ hoặc [[[[requirement/page/student/dashboard|requirement/page/student/dashboard]]|[[requirement/page/student/dashboard|dashboard]]]] card. Chỉ truy cập bằng direct URL sau khi đã đăng nhập [[[[requirement/page/admin/admin|requirement/page/admin/admin]]|[[requirement/page/admin/admin|admin]]]].

Student vẫn tạo tài khoản qua `/register`; user public không được tự chọn role.

## 2. Phân quyền

| Actor | Quyền |
| ----- | ----- |
| Guest | 401/redirect [[[[requirement/page/student/login|requirement/page/student/login]]|[[requirement/page/student/login|login]]]] |
| Student | 403 |
| Instructor | 403 |
| Admin | Được tạo [[[[requirement/page/admin/admin|requirement/page/admin/admin]]|[[requirement/page/admin/admin|`admin`]]]] hoặc `instructor` |

Hidden route không thay thế authorization. Backend vẫn phải kiểm tra role [[[[requirement/page/admin/admin|requirement/page/admin/admin]]|[[requirement/page/admin/admin|`admin`]]]] ở [[[[requirement/page|requirement/page]]|[[requirement/page|page]]]], server action/API và middleware.

## 3. Form tối thiểu

| Field | Rule |
| ----- | ---- |
| `full_name` | Required, max 255 |
| `email` | Required, unique, lowercase |
| `phone` | Optional |
| `role` | Chỉ cho chọn [[[[requirement/page/admin/admin|requirement/page/admin/admin]]|[[requirement/page/admin/admin|`admin`]]]] hoặc `instructor` |
| `status` | Default `active`, có thể chọn `blocked` nếu cần tạo trước |
| `temporary_password` hoặc invite/reset link | Password phải hash bằng bcrypt; không lưu plaintext |

Không cho tạo `student` ở route này.

## 4. Instructor Initial Assignment

Khi `role = instructor`, form có thể có phần phân công khóa ban đầu. Nếu chưa phân công tại đây, [[[[requirement/page/admin/admin|requirement/page/admin/admin]]|[[requirement/page/admin/admin|admin]]]] có thể phân công sau ở `/admin/courses/[id]`.

| Field | Data |
| ----- | ---- |
| `course_id` | FK `courses.id` |
| `can_view_course` | Default `true` |
| `can_answer_questions` | Default `true` |
| `can_review_submissions` | Default `true` |
| `can_view_student_progress` | Default `true` |
| `status` | Default `active` |

Mỗi instructor chỉ thấy và xử lý khóa được phân công trong `course_instructors`.

## 5. Data & Audit

| Hành động | Bảng | Audit action |
| --------- | ---- | ------------ |
| Tạo [[[[requirement/page/admin/admin|requirement/page/admin/admin]]|[[requirement/page/admin/admin|admin]]]] | `users` | `user.create_admin` |
| Tạo instructor | `users` | `user.create_instructor` |
| Gán instructor vào course | `course_instructors` | `instructor_assignment.create` |

Rules:

- `users.created_by` phải là [[[[requirement/page/admin/admin|requirement/page/admin/admin]]|[[requirement/page/admin/admin|admin]]]] hiện tại.
- Email unique theo account active/non-deleted. Account đã soft delete phải được đổi sang email archived trước đó, nên email thật có thể dùng lại.
- Password phải hash trước khi lưu.
- Không expose temporary password trong audit log.
- Audit log lưu actor, target user, role được tạo, IP và course assignment metadata nếu có.

## 6. Không làm trong P1

- Không tạo trang danh sách staff riêng.
- Không thêm role `super_admin` vào schema hiện tại.
- Không cho instructor tự mời instructor khác.
- Không cho public registration tạo [[[[requirement/page/admin/admin|requirement/page/admin/admin]]|[[requirement/page/admin/admin|admin]]]]/instructor.

## 7. Bootstrap [[[[requirement/page/admin/admin|requirement/page/admin/admin]]|[[requirement/page/admin/admin|admin]]]] đầu tiên

Admin đầu tiên được seed bằng environment variables lúc deploy/migrate production, không tạo qua public registration.

| Env | Mục đích |
| --- | -------- |
| `SEED_ADMIN_EMAIL` | Email [[[[requirement/page/admin/admin|requirement/page/admin/admin]]|[[requirement/page/admin/admin|admin]]]] đầu tiên |
| `SEED_ADMIN_PASSWORD` | Mật khẩu tạm thời, hash trước khi lưu |
| `SEED_ADMIN_FULL_NAME` | Tên hiển thị [[[[requirement/page/admin/admin|requirement/page/admin/admin]]|[[requirement/page/admin/admin|admin]]]] đầu tiên |

Seed script phải idempotent: nếu email đã tồn tại thì không tạo trùng, chỉ báo đã có [[[[requirement/page/admin/admin|requirement/page/admin/admin]]|[[requirement/page/admin/admin|admin]]]] bootstrap. Sau lần deploy đầu nên rotate password hoặc đổi qua forgot/reset password.

## Acceptance Criteria

| Case | Kết quả |
| ---- | ------- |
| Guest/student/instructor mở route | Không truy cập được |
| Admin mở route trực tiếp | Thấy form tạo [[[[requirement/page/admin/admin|requirement/page/admin/admin]]|[[requirement/page/admin/admin|`admin`]]]]/`instructor` |
| Sidebar [[[[requirement/page/admin/admin|requirement/page/admin/admin]]|[[requirement/page/admin/admin|admin]]]] | Không hiển thị route này |
| Chọn role `student` | Không có option hoặc bị backend reject |
| Email trùng | Không tạo user, báo lỗi rõ |
| Tạo [[[[requirement/page/admin/admin|requirement/page/admin/admin]]|[[requirement/page/admin/admin|admin]]]] thành công | Có `users.role = [[[[requirement/page/admin/admin|requirement/page/admin/admin]]|[[requirement/page/admin/admin|admin]]]]`, `created_by`, `audit_logs.action = user.create_admin` |
| Tạo instructor thành công | Có `users.role = instructor`, `created_by`, `audit_logs.action = user.create_instructor` |
| Tạo instructor kèm course | Có `course_instructors` và `audit_logs.action = instructor_assignment.create` |
| Database mới deploy lần đầu | Có thể seed [[[[requirement/page/admin/admin|requirement/page/admin/admin]]|[[requirement/page/admin/admin|admin]]]] đầu tiên bằng env, không cần public [[[[requirement/page/admin/admin|requirement/page/admin/admin]]|[[requirement/page/admin/admin|admin]]]] registration |

---

## 🗺️ Obsidian Meta

### Tags
- #cortex/page/admin
- #cortex/plan
- #cortex/requirement

### Navigation
- **Breadcrumbs:** [[CORTEX_PLAN_MOC|Plan Home]] / [[requirement/page|Requirements]] / [[requirement/page/admin/admin|Admin Dashboard]]

### Relations
- **Outgoing Links:** [[requirement/page|1. Public Website — phần người ngoài nhìn thấy]], [[requirement/page/admin/admin|Admin Dashboard — Requirement]], [[requirement/page/student/dashboard|/dashboard — Trang tổng quan học viên]], [[requirement/page/student/login|/login — Đăng nhập]]
- **Incoming Links (Backlinks):** *None*
