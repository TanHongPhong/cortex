---
categories:
  - "[[Projects]]"
  - "[[cortex.ai]]"
  - "[[cortex.ai Web]]"
  - "[[Requirements]]"
type: ["[[Implementation Plan]]"]
org: ["[[cortex.ai]]"]
start: 2026-06-03
year: 2026
url: https://github.com/TanHongPhong/cortex
status: "[[Draft]]"
---

# Course Editor Role Plan

## 1. Mục tiêu

Thêm role `course_editor` / **Editor khóa học** để nhân sự nội dung vào được đúng các trang chỉnh sửa khóa học và bài học.

Scope mới chỉ là **phân quyền trang**:

```text
course_editor được vào:
- /admin/courses
- /admin/courses/[id]
- /admin/lessons
- /admin/lessons/[id] nếu có route detail
```

Không thêm workspace `/editor/*`.
Không kế thừa chức năng instructor.
Không thêm quyền submissions, Q&A, học viên, tài chính, phân quyền hay audit.

---

## 2. Role canonical

| Field | Value |
| ----- | ----- |
| `users.role` | `course_editor` |
| Tên hiển thị | Editor khóa học |
| Khu vực truy cập | Content-only admin routes |
| Sidebar | Admin sidebar đã filter, chỉ hiện Courses và Lessons |
| Quan hệ với instructor | Tách biệt, không kế thừa quyền |
| Quan hệ với admin | Không phải admin thu nhỏ |

Role list sau khi thêm:

```text
student
instructor
course_editor
admin
```

---

## 3. Route permission

### Route-level access

| Route pattern | student | instructor | course_editor | admin |
| ------------- | :-----: | :--------: | :-----------: | :---: |
| `/(public)/*` | Yes | Yes | Yes | Yes |
| `/(auth)/*` | Yes | Yes | Yes | Yes |
| `/(student)/*` | Yes | No | No | Yes |
| `/(instructor)/*` | No | Yes | No | Yes |
| `/admin` | No | No | No | Yes |
| `/admin/courses` | No | No | Yes | Yes |
| `/admin/courses/*` | No | No | Yes | Yes |
| `/admin/lessons` | No | No | Yes | Yes |
| `/admin/lessons/*` | No | No | Yes | Yes |
| `/admin/orders` and commerce routes | No | No | No | Yes |
| `/admin/students` and user ops | No | No | No | Yes |
| `/admin/audit-logs` | No | No | No | Yes |

### API-level access

`course_editor` chỉ được gọi các API content tương ứng:

```text
GET/POST/PATCH /api/admin/courses
GET/PATCH /api/admin/courses/:id
GET/POST/PATCH /api/admin/lessons
GET/PATCH /api/admin/lessons/:id
GET/POST/PATCH /api/admin/modules
GET/POST/PATCH /api/admin/lesson-resources
GET/POST/PATCH /api/admin/quizzes
GET/POST/PATCH /api/admin/quiz-questions
GET/POST/PATCH /api/admin/video-assets
```

Không được gọi:

```text
/api/admin/orders/*
/api/admin/payments/*
/api/admin/invoices/*
/api/admin/coupons/*
/api/admin/referrals/*
/api/admin/revenue/*
/api/admin/students/*
/api/admin/users/*
/api/admin/system/*
/api/admin/audit-logs/*
/api/admin/certificates/*
/api/admin/announcements/*
/api/admin/reviews/*
/api/instructor/*
```

---

## 4. Sidebar behavior

Không render full admin sidebar cho `course_editor`.

Khi `users.role = course_editor`, layout admin chỉ hiện:

```text
Courses   -> /admin/courses
Lessons   -> /admin/lessons
```

Không hiện:

```text
Overview
Orders
Payments
Invoices
Coupons
Referrals
Revenue
Students
Submissions
Certificates
Certificate Templates
Leads
Announcements
Reviews
Audit Logs
System Users
```

Nếu dùng chung `AdminLayout`, sidebar phải filter bằng role trước khi render menu item. Không chỉ disable bằng CSS.

---

## 5. Action scope trong 2 trang được phép

### `/admin/courses`

Cho phép `course_editor`:

| Action | Allow |
| ------ | :---: |
| Xem danh sách khóa | Yes |
| Tạo khóa mới dạng draft | Yes |
| Sửa title, slug, mô tả, thumbnail, level, duration | Yes |
| Sửa cấu hình học theo thứ tự / tự do | Yes |
| Xem count module/lesson phục vụ chỉnh sửa | Yes |

Không cho phép:

| Action | Allow |
| ------ | :---: |
| Sửa giá / discount / revenue-related fields | No |
| Publish/archive/delete course đã có enrollment/order | No |
| Assign instructor/staff | No |
| Xem doanh thu/order/payment của course | No |
| Xem danh sách học viên của course | No |

### `/admin/lessons`

Cho phép `course_editor`:

| Action | Allow |
| ------ | :---: |
| Xem module/lesson list | Yes |
| Tạo/sửa/reorder module | Yes |
| Tạo/sửa/reorder lesson | Yes |
| Tạo/sửa lesson text content | Yes |
| Gắn/chọn video asset cho lesson | Yes |
| Tạo/sửa lesson resources | Yes |
| Tạo/sửa quiz và quiz questions | Yes |

Không cho phép:

| Action | Allow |
| ------ | :---: |
| Xem submission queue | No |
| Duyệt bài nộp | No |
| Trả lời Q&A | No |
| Cấp/revoke certificate | No |
| Gán học viên vào khóa | No |

---

## 6. Không kế thừa instructor

`course_editor` không được tự động có quyền instructor.

Không được vào:

```text
/instructor
/instructor/courses
/instructor/submissions
/instructor/questions
```

Không được có các capability:

```text
can_review_submissions
can_answer_questions
approve/reject submission
answer/resolve lesson question
view instructor queues
```

Nếu một người vừa là editor vừa cần chấm bài, xử lý bằng role/permission riêng sau này. Scope hiện tại chỉ là editor nội dung.

---

## 7. Data model changes tối thiểu

### `users.role`

Thêm value:

```text
course_editor
```

Không cần tạo `course_staff`.
Không cần mở rộng `course_instructors`.
Không cần thêm instructor permission flags.

### Ownership rule

Vì yêu cầu hiện tại là phân quyền trang đơn giản, P1 có thể cho `course_editor` chỉnh toàn bộ khóa học/nội dung trong `/admin/courses` và `/admin/lessons`.

Nếu sau này cần giới hạn theo khóa phụ trách, thêm rule:

```text
course.created_by = current_user.id
OR course_editors.user_id = current_user.id
OR user.role = admin
```

Nhưng rule này không nằm trong scope hiện tại.

---

## 8. Docs cần đồng bộ

| File | Việc cần làm |
| ---- | ------------ |
| `plan/web/unified_database_schema.md` | Thêm `course_editor` vào role rules; nói rõ không kế thừa instructor |
| `plan/web/security.md` | Thêm cột `course_editor` vào RBAC; chỉ allow `/admin/courses` và `/admin/lessons` |
| `plan/web/page_function_matrix.md` | Ghi `/admin/courses` và `/admin/lessons` cho admin + course_editor |
| `plan/web/page/admin/admin.md` | Chỉnh phần phân quyền admin/sidebar; thêm content-only editor |
| `plan/web/page/admin/admin-courses.md` | Ghi role `course_editor` được vào, action limits |
| `plan/web/page/admin/admin-lessons.md` | Ghi role `course_editor` được vào, action limits |
| `plan/web/page/instructor/*.md` | Không thêm quyền editor; chỉ cần đảm bảo không nói editor kế thừa instructor |

---

## 9. Implementation order

### Step 1 - Role value

- Thêm `users.role = course_editor`.
- Cập nhật login redirect:

```text
admin -> /admin
course_editor -> /admin/courses
instructor -> /instructor
student -> /dashboard
```

### Step 2 - Route guard

- Cho `course_editor` vào `/admin/courses*`.
- Cho `course_editor` vào `/admin/lessons*`.
- Chặn mọi route `/admin/*` còn lại.
- Chặn toàn bộ `/instructor/*`.

### Step 3 - Sidebar filter

- Dùng chung admin layout nếu tiện.
- Render menu theo role.
- Với `course_editor`, chỉ render Courses và Lessons.

### Step 4 - Action guard

- Trong `/admin/courses`, ẩn/chặn finance, assignment, publish/archive/delete nhạy cảm.
- Trong `/admin/lessons`, chỉ giữ content editing actions.
- API cũng phải guard, không chỉ UI.

### Step 5 - Test cases

| Test | Expected |
| ---- | -------- |
| `course_editor` login | Redirect `/admin/courses` |
| `course_editor` thấy sidebar | Chỉ Courses và Lessons |
| `course_editor` vào `/admin/courses` | Allow |
| `course_editor` vào `/admin/lessons` | Allow |
| `course_editor` vào `/admin/orders` | Deny |
| `course_editor` vào `/admin/students` | Deny |
| `course_editor` vào `/admin/audit-logs` | Deny |
| `course_editor` vào `/instructor/submissions` | Deny |
| `course_editor` gọi payment/refund API | Deny |
| `course_editor` gọi user role API | Deny |
| `instructor` vào `/admin/courses` | Deny |
| `admin` vào mọi admin route | Allow |

---

## 10. Recommendation chốt

Build theo hướng:

```text
role = course_editor
routes = /admin/courses*, /admin/lessons*
sidebar = chỉ Courses + Lessons
no /editor workspace
no instructor inheritance
no finance
no permission/user management
no audit access
```

Đây là thay đổi nhỏ nhất: chỉ thêm một role content-only vào hai trang chỉnh sửa khóa học/bài học hiện có, không mở thêm workflow nhân sự khác.
