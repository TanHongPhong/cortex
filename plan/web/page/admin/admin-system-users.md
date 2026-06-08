---
categories:
  - "[[Projects]]"
  - "[[Blueprint]]"
  - "[[Blueprint Web]]"
  - "[[Requirements]]"
  - "[[Admin Dashboard]]"
type: ["[[Page Spec]]"]
org: ["[[Blueprint]]"]
start: 2026-06-02
year: 2026
url: https://github.com/TanHongPhong/blueprint
status: "[[P1]]"
---

# /admin/system/users — System Users

**Status:** P1
**Owner area:** Admin
**Source of truth:** `plan/web/page_function_matrix.md`, `plan/web/unified_database_schema.md`, `plan/web/security.md`
**Design source:** [[web/page/admin/design|Admin Dashboard Design — Warm Operational System]]
**Build decision:** Build

## 1. Mục tiêu

`/admin/system/users` là trang quản lý tài khoản vận hành nội bộ:

- [[web/page/admin/admin|`admin`]]
- `instructor`

Trang này không dùng để tạo `student`; student vẫn tự đăng ký qua `/register`.

**Nguyên tắc:** danh sách và phân quyền là trải nghiệm chính. Tạo tài khoản mới chỉ là action phụ khi cần, mở bằng modal/drawer `Create account`.

---

## 2. Layout chính

| Khu vực | Yêu cầu |
| ------- | ------- |
| Header | Tiêu đề `System Users`, mô tả ngắn, nút `Create Account`. |
| KPI cards | Total users, Admin, Instructor, Blocked. |
| Filters | Search theo tên/email, role filter, status filter. |
| User table | User, role, status, assigned courses, permissions, last login, actions. |
| Create modal | Form tạo admin/instructor mới khi admin bấm `Create Account`. |
| Permission note | Nhắc rõ instructor content edit là per-course qua `can_edit_course_content`. |

---

## 3. Phân quyền

| Actor | Quyền |
| ----- | ----- |
| Guest | 401/redirect [[web/page/student/login|login]] |
| Student | 403 |
| Instructor | 403 |
| Admin | Xem danh sách, tạo/sửa/block/unblock admin hoặc instructor |

Backend vẫn phải kiểm tra role [[web/page/admin/admin|`admin`]] ở page, server action/API và middleware.

---

## 4. Create Account Modal

| Field | Rule |
| ----- | ---- |
| `full_name` | Required, max 255 |
| `email` | Required, unique, lowercase |
| `phone` | Optional |
| `role` | Chỉ cho chọn [[web/page/admin/admin|`admin`]] hoặc `instructor` |
| `status` | Default `active`, có thể chọn `blocked` nếu cần tạo trước |
| `temporary_password` hoặc invite/reset link | Password phải hash bằng bcrypt; không lưu plaintext |

Khi `role = instructor`, modal có thể có phần phân công khóa ban đầu. Nếu chưa phân công tại đây, [[web/page/admin/admin|admin]] có thể phân công sau ở `/admin/courses/[id]`.

| Field | Data |
| ----- | ---- |
| `course_id` | FK `courses.id` |
| `can_view_course` | Default `true` |
| `can_review_submissions` | Default `true` |
| `can_view_student_progress` | Default `true` |
| `can_edit_course_content` | Default `false`; bật `true` nếu instructor được chỉnh content course/module/lesson/resource/quiz/video asset |
| `status` | Default `active` |

---

## 5. Data & Audit

| Hành động | Bảng | Audit action |
| --------- | ---- | ------------ |
| Tạo [[web/page/admin/admin|admin]] | `users` | `user.create_admin` |
| Tạo instructor | `users` | `user.create_instructor` |
| Gán instructor vào course | `course_instructors` | `instructor_assignment.create` |
| Cập nhật permission instructor | `course_instructors` | `instructor_assignment.update` |
| Block/unblock user nội bộ | `users` | `user.block` / `user.unblock` |
| Reset mật khẩu | `password_reset_tokens` hoặc invite flow | `user.password_reset_requested` |

Rules:

- `users.created_by` phải là [[web/page/admin/admin|admin]] hiện tại.
- Email unique theo account active/non-deleted.
- Không expose temporary password trong audit log.
- Audit log lưu actor, target user, role, IP và assignment metadata nếu có.

---

## 6. Không làm trong P1

- Không cho instructor tự mời instructor khác.
- Không cho public registration tạo [[web/page/admin/admin|admin]]/instructor.
- Không quản lý `student` trong trang này; dùng `/admin/students`.
- Không thêm role `super_admin` vào schema hiện tại.

---

## Acceptance Criteria

| Case | Kết quả |
| ---- | ------- |
| Guest/student/instructor mở route | Không truy cập được |
| Admin mở route | Thấy bảng System Users gồm admin và instructor |
| Search/filter | Lọc được theo tên/email, role, status |
| Admin bấm Create Account | Mở modal tạo [[web/page/admin/admin|`admin`]]/`instructor` |
| Chọn role `student` | Không có option hoặc bị backend reject |
| Email trùng | Không tạo user, báo lỗi rõ |
| Tạo [[web/page/admin/admin|admin]] thành công | Có `users.role = admin`, `created_by`, `audit_logs.action = user.create_admin` |
| Tạo instructor thành công | Có `users.role = instructor`, `created_by`, `audit_logs.action = user.create_instructor` |
| Tạo instructor kèm course | Có `course_instructors` gồm các permission flags, có `audit_logs.action = instructor_assignment.create` |
| Instructor có `can_edit_course_content = true` | Chỉ edit content của course được phân công; không thấy finance/students/audit/certificate; có quyền tạo và quản lý announcements cho khóa học phụ trách |

---

## 🗺️ Obsidian Meta

### Tags
- #blueprint/page/admin
- #blueprint/plan
- #blueprint/requirement

### Navigation
- **Breadcrumbs:** [[BLUEPRINT_PLAN_MOC|Plan Home]] / [[web/page|Requirements]] / [[web/page/admin/admin|Admin Dashboard]]

### Relations
- **Outgoing Links:** [[web/page|1. Public Website — phần người ngoài nhìn thấy]], [[web/page/admin/admin|Admin Dashboard — Requirement]], [[web/page/student/login|/login — Đăng nhập]]
- **Incoming Links (Backlinks):** *None*
