---
categories:
  - "[[Projects]]"
  - "[[cortex.ai]]"
  - "[[cortex.ai Web]]"
  - "[[Requirements]]"
  - "[[Admin Dashboard]]"
type: ["[[Page Spec]]"]
org: ["[[cortex.ai]]"]
start: 2026-06-02
year: 2026
url: https://github.com/TanHongPhong/cortex
status: "[[P1]]"
---

# /admin/system/users/new — Hidden Staff Account Creation

**Status:** P1
**Owner area:** Admin
**Source of truth:** `plan/web/page_function_matrix.md`, `plan/web/unified_database_schema.md`, `plan/web/security.md`
**Build decision:** Build hidden route

## 1. Mục tiêu

`/admin/system/users/new` là route ẩn để [[[[web/page/admin/admin|web/page/admin/admin]]|[[web/page/admin/admin|admin]]]] tạo tài khoản vận hành nội bộ:

- [[[[web/page/admin/admin|web/page/admin/admin]]|[[web/page/admin/admin|`admin`]]]]
- `instructor`

Route này không phải trang quản lý user công khai trong [[[[web/page/admin/admin|web/page/admin/admin]]|[[web/page/admin/admin|admin]]]] [[[[web/page/student/dashboard|web/page/student/dashboard]]|[[web/page/student/dashboard|dashboard]]]]. Không đưa vào sidebar, quick action, command palette, search nội bộ hoặc [[[[web/page/student/dashboard|web/page/student/dashboard]]|[[web/page/student/dashboard|dashboard]]]] card. Chỉ truy cập bằng direct URL sau khi đã đăng nhập [[[[web/page/admin/admin|web/page/admin/admin]]|[[web/page/admin/admin|admin]]]].

Student vẫn tạo tài khoản qua `/register`; user public không được tự chọn role.

## 2. Phân quyền

| Actor | Quyền |
| ----- | ----- |
| Guest | 401/redirect [[[[web/page/student/login|web/page/student/login]]|[[web/page/student/login|login]]]] |
| Student | 403 |
| Instructor | 403 |
| Admin | Được tạo [[[[web/page/admin/admin|web/page/admin/admin]]|[[web/page/admin/admin|`admin`]]]] hoặc `instructor` |

Hidden route không thay thế authorization. Backend vẫn phải kiểm tra role [[[[web/page/admin/admin|web/page/admin/admin]]|[[web/page/admin/admin|`admin`]]]] ở [[[[web/page|web/page]]|[[web/page|page]]]], server action/API và middleware.

## 3. Form tối thiểu

| Field | Rule |
| ----- | ---- |
| `full_name` | Required, max 255 |
| `email` | Required, unique, lowercase |
| `phone` | Optional |
| `role` | Chỉ cho chọn [[[[web/page/admin/admin|web/page/admin/admin]]|[[web/page/admin/admin|`admin`]]]] hoặc `instructor` |
| `status` | Default `active`, có thể chọn `blocked` nếu cần tạo trước |
| `temporary_password` hoặc invite/reset link | Password phải hash bằng bcrypt; không lưu plaintext |

Không cho tạo `student` ở route này.

## 4. Instructor Initial Assignment

Khi `role = instructor`, form có thể có phần phân công khóa ban đầu. Nếu chưa phân công tại đây, [[[[web/page/admin/admin|web/page/admin/admin]]|[[web/page/admin/admin|admin]]]] có thể phân công sau ở `/admin/courses/[id]`.

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
| Tạo [[[[web/page/admin/admin|web/page/admin/admin]]|[[web/page/admin/admin|admin]]]] | `users` | `user.create_admin` |
| Tạo instructor | `users` | `user.create_instructor` |
| Gán instructor vào course | `course_instructors` | `instructor_assignment.create` |

Rules:

- `users.created_by` phải là [[[[web/page/admin/admin|web/page/admin/admin]]|[[web/page/admin/admin|admin]]]] hiện tại.
- Email unique theo account active/non-deleted. Account đã soft delete phải được đổi sang email archived trước đó, nên email thật có thể dùng lại.
- Password phải hash trước khi lưu.
- Không expose temporary password trong audit log.
- Audit log lưu actor, target user, role được tạo, IP và course assignment metadata nếu có.

## 6. Không làm trong P1

- Không tạo trang danh sách staff riêng.
- Không thêm role `super_admin` vào schema hiện tại.
- Không cho instructor tự mời instructor khác.
- Không cho public registration tạo [[[[web/page/admin/admin|web/page/admin/admin]]|[[web/page/admin/admin|admin]]]]/instructor.

## 7. Bootstrap [[[[web/page/admin/admin|web/page/admin/admin]]|[[web/page/admin/admin|admin]]]] đầu tiên

Admin đầu tiên được seed bằng environment variables lúc deploy/migrate production, không tạo qua public registration.

| Env | Mục đích |
| --- | -------- |
| `SEED_ADMIN_EMAIL` | Email [[[[web/page/admin/admin|web/page/admin/admin]]|[[web/page/admin/admin|admin]]]] đầu tiên |
| `SEED_ADMIN_PASSWORD` | Mật khẩu tạm thời, hash trước khi lưu |
| `SEED_ADMIN_FULL_NAME` | Tên hiển thị [[[[web/page/admin/admin|web/page/admin/admin]]|[[web/page/admin/admin|admin]]]] đầu tiên |

Seed script phải idempotent: nếu email đã tồn tại thì không tạo trùng, chỉ báo đã có [[[[web/page/admin/admin|web/page/admin/admin]]|[[web/page/admin/admin|admin]]]] bootstrap. Sau lần deploy đầu nên rotate password hoặc đổi qua forgot/reset password.

## Acceptance Criteria

| Case | Kết quả |
| ---- | ------- |
| Guest/student/instructor mở route | Không truy cập được |
| Admin mở route trực tiếp | Thấy form tạo [[[[web/page/admin/admin|web/page/admin/admin]]|[[web/page/admin/admin|`admin`]]]]/`instructor` |
| Sidebar [[[[web/page/admin/admin|web/page/admin/admin]]|[[web/page/admin/admin|admin]]]] | Không hiển thị route này |
| Chọn role `student` | Không có option hoặc bị backend reject |
| Email trùng | Không tạo user, báo lỗi rõ |
| Tạo [[[[web/page/admin/admin|web/page/admin/admin]]|[[web/page/admin/admin|admin]]]] thành công | Có `users.role = [[[[web/page/admin/admin|web/page/admin/admin]]|[[web/page/admin/admin|admin]]]]`, `created_by`, `audit_logs.action = user.create_admin` |
| Tạo instructor thành công | Có `users.role = instructor`, `created_by`, `audit_logs.action = user.create_instructor` |
| Tạo instructor kèm course | Có `course_instructors` và `audit_logs.action = instructor_assignment.create` |
| Database mới deploy lần đầu | Có thể seed [[[[web/page/admin/admin|web/page/admin/admin]]|[[web/page/admin/admin|admin]]]] đầu tiên bằng env, không cần public [[[[web/page/admin/admin|web/page/admin/admin]]|[[web/page/admin/admin|admin]]]] registration |

---

## 🗺️ Obsidian Meta

### Tags
- #cortex/page/admin
- #cortex/plan
- #cortex/requirement

### Navigation
- **Breadcrumbs:** [[CORTEX_PLAN_MOC|Plan Home]] / [[web/page|Requirements]] / [[web/page/admin/admin|Admin Dashboard]]

### Relations
- **Outgoing Links:** [[web/page|1. Public Website — phần người ngoài nhìn thấy]], [[web/page/admin/admin|Admin Dashboard — Requirement]], [[web/page/student/dashboard|/dashboard — Trang tổng quan học viên]], [[web/page/student/login|/login — Đăng nhập]]
- **Incoming Links (Backlinks):** *None*
