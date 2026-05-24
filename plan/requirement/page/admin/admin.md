# Admin Dashboard — Tổng plan

## 1. Mục tiêu tổng

Admin Dashboard dùng để CORTEX quản lý toàn bộ hệ thống học:

```text
1. Quản lý khóa học
2. Quản lý module/lesson
3. Quản lý học viên
4. Duyệt bài nộp assignment/final project
5. Cấp và kiểm soát certificate
6. Xem tổng quan vận hành
```

---

# 2. Cấu trúc route admin

| Trang                 | Mục đích                               |
| --------------------- | -------------------------------------- |
| `/admin`              | Tổng quan hệ thống                     |
| `/admin/courses`      | Quản lý khóa học                       |
| `/admin/orders`       | Quản lý đơn hàng và thanh toán         |
| `/admin/lessons`      | Quản lý module và lesson               |
| `/admin/students`     | Quản lý học viên                       |
| `/admin/submissions`  | Duyệt bài nộp assignment/final project |
| `/admin/certificates` | Cấp và quản lý chứng chỉ               |
| `/admin/leads`        | Quản lý lead tiềm năng (Type B)        |

---

# 3. Layout chung cho Admin Dashboard

## Admin layout

```text
┌──────────────────────────────────────────────┐
│ Top Bar: Search / Notification / Admin Avatar │
├───────────────┬──────────────────────────────┤
│ Admin Sidebar │ Main Content                  │
│ - Overview    │ Nội dung từng trang            │
│ - Courses     │                              │
│ - Lessons     │                              │
│ - Students    │                              │
│ - Submissions │                              │
│ - Certificates│                              │
└───────────────┴──────────────────────────────┘
```

## Sidebar admin

| Menu         | Dẫn tới               |
| ------------ | --------------------- |
| Overview     | `/admin`              |
| Courses      | `/admin/courses`      |
| Lessons      | `/admin/lessons`      |
| Students     | `/admin/students`     |
| Submissions  | `/admin/submissions`  |
| Certificates | `/admin/certificates` |
| Leads        | `/admin/leads`        |
| Logout       | Đăng xuất             |

---

# 4. `/admin` — Admin Overview

## Mục tiêu

Admin nhìn nhanh tình hình hệ thống.

## Các khu vực cần có

| Khu vực             | Nội dung                                                                                |
| ------------------- | --------------------------------------------------------------------------------------- |
| KPI cards           | Tổng học viên, tổng khóa học, bài nộp chờ duyệt, certificate đã cấp, active enrollments |
| Pending submissions | Assignment/final project đang chờ duyệt                                                 |
| Quick actions       | Tạo khóa, thêm lesson, duyệt bài, cấp certificate                                       |

## KPI nên hiển thị

| KPI                 | Ý nghĩa                           |
| ------------------- | --------------------------------- |
| Total students      | Tổng học viên                     |
| Active enrollments  | Số đăng ký khóa đang active       |
| Published courses   | Số khóa đang mở                   |
| Pending submissions | Bài nộp đang chờ duyệt            |
| Certificates issued | Số chứng chỉ đã cấp               |
| New leads           | Số lead Type B mới (contact page) |

---

# 5. `/admin/courses` — Quản lý khóa học

## Mục tiêu

Tạo, sửa, ẩn và quản lý các khóa học.

## Các khu vực cần có

| Khu vực          | Nội dung                                        |
| ---------------- | ----------------------------------------------- |
| Course table     | Tên khóa, level, giá, trạng thái, số học viên   |
| Create/Edit form | Tên, slug, mô tả, thumbnail, giá, level, status |
| Status           | Draft, published, archived                      |
| Actions          | Xem, sửa, ẩn, xóa nếu chưa có học viên          |

## Field khóa học

| Field                 | Ghi chú                                          |
| --------------------- | ------------------------------------------------ |
| Title                 | Tên khóa                                         |
| Slug                  | URL khóa học                                     |
| Short description     | Mô tả ngắn                                       |
| Description           | Mô tả đầy đủ                                     |
| Level                 | Free / Starter / Core / Advanced / Premium / B2B |
| Price                 | Giá hoặc custom                                  |
| Thumbnail             | Ảnh khóa học                                     |
| Status                | draft / published / archived                     |
| Certificate available | Có certificate không                             |
| Lock mode             | free / sequential                                |

---

# 6. `/admin/lessons` — Quản lý module/bài học

## Mục tiêu

Xây nội dung học: module, video lesson, resource, assignment và final project.

## Các khu vực cần có

| Khu vực        | Nội dung                                                         |
| -------------- | ---------------------------------------------------------------- |
| Select course  | Chọn khóa cần chỉnh                                              |
| Module manager | Tạo/sửa/xóa module                                               |
| Lesson manager | Tạo lesson trong module                                          |
| Lesson form    | Title, lesson type, video URL, content, resource URL, thứ tự bài |
| Drag/drop      | Kéo thả thứ tự module/lesson nếu làm được                        |

## Lesson type cần hỗ trợ

| Lesson type     | Mục đích           |
| --------------- | ------------------ |
| `video`         | Bài giảng video    |
| `resource`      | Tài liệu/tham khảo |
| `assignment`    | Bài tập thực hành  |
| `final_project` | Project cuối khóa  |

## Field lesson

| Field                   | Ghi chú                                       |
| ----------------------- | --------------------------------------------- |
| Title                   | Tên lesson                                    |
| Course                  | Thuộc khóa nào                                |
| Module                  | Thuộc module nào                              |
| Lesson type             | video / resource / assignment / final_project |
| Content                 | Nội dung mô tả bài                            |
| Video URL               | Chỉ dùng cho video lesson                     |
| Resources               | Tài liệu kèm theo                             |
| Requires submission     | true/false                                    |
| Required for completion | true/false                                    |
| Order index             | Thứ tự bài                                    |
| Status                  | draft / published / hidden                    |

---

# 7. `/admin/students` — Quản lý học viên

## Mục tiêu

Theo dõi học viên, tiến độ học, khóa đã đăng ký, bài nộp và certificate.

## Các khu vực cần có

| Khu vực        | Nội dung                                               |
| -------------- | ------------------------------------------------------ |
| Student table  | Tên, email, phone, số khóa học, trạng thái             |
| Search/filter  | Tìm theo tên/email, lọc theo khóa                      |
| Student detail | Xem khóa đã đăng ký, tiến độ, submissions, certificate |
| Actions        | Gán khóa, khóa tài khoản nếu cần                       |

## Student table nên có

| Cột          | Nội dung              |
| ------------ | --------------------- |
| Name         | Họ tên                |
| Email        | Email                 |
| Phone/Zalo   | Liên hệ               |
| Courses      | Số khóa đã enrolled   |
| Status       | active / blocked      |
| Created date | Ngày tạo tài khoản    |
| Actions      | View / Enroll / Block |

---

# 7. `/admin/students` — Quản lý học viên

## Mục tiêu

Duyệt bài nộp của học viên, gồm:

```text
1. Assignment trong module
2. Final project cuối khóa
```

## Các khu vực cần có

| Khu vực           | Nội dung                                               |
| ----------------- | ------------------------------------------------------ |
| Submission table  | Học viên, khóa, lesson, loại bài, trạng thái, ngày nộp |
| Submission detail | Xem mô tả, link demo, link source/file                 |
| Feedback box      | Admin viết nhận xét                                    |
| Actions           | Approve, reject, request revision                      |

## Submission status

| Status   | Ý nghĩa             |
| -------- | ------------------- |
| pending  | Đang chờ duyệt      |
| approved | Đã duyệt            |
| rejected | Bị trả lại, cần sửa |

## Rule

```text
Assignment approved → lesson đó được tính hoàn thành.

Final project approved → học viên đủ điều kiện xét certificate nếu đã hoàn thành các lesson bắt buộc.
```

---

# 11. `/admin/certificates` — Quản lý chứng chỉ

## Mục tiêu

Cấp và kiểm soát certificate.

## Các khu vực cần có

| Khu vực           | Nội dung                                             |
| ----------------- | ---------------------------------------------------- |
| Certificate table | Certificate ID, học viên, khóa, ngày cấp, trạng thái |
| Issue certificate | Chọn học viên + khóa đủ điều kiện để cấp             |
| PDF generation    | Tạo file certificate từ template                     |
| Actions           | View, download, revoke, copy verify link             |

## Rule

```text
Certificate ID phải unique, không trùng.
Chỉ cấp certificate khi học viên đủ điều kiện.
```

## Điều kiện cấp certificate

```text
1. Học viên đã enrolled khóa học
2. Hoàn thành các lesson bắt buộc
3. Assignment bắt buộc đã approved
4. Final project đã approved
5. Chưa từng được cấp certificate cho khóa đó
```

---

# 12. Flow vận hành chính của Admin Dashboard

---

## Flow 1 — Tạo khóa học

```text
/admin/courses
→ tạo khóa học
→ set level, price, status
→ published khi sẵn sàng
```

---

## Flow 2 — Xây nội dung khóa học

```text
/admin/lessons
→ chọn course
→ tạo module
→ tạo lesson
→ chọn lesson_type:
   - video
   - resource
   - assignment
   - final_project
→ set thứ tự bài
→ publish lesson
```

---

## Flow 3 — Học viên học và nộp bài

```text
Student học tại /learn/[course]/[lesson]
→ video/resource hoàn thành bằng lesson_progress
→ assignment/final_project nộp vào submissions
→ admin duyệt ở /admin/submissions
```

---

## Flow 4 — Duyệt bài nộp

```text
/admin/submissions
→ mở submission detail
→ xem link demo/source/text
→ viết feedback
→ approve hoặc reject

Nếu approved:
→ lesson tính completed

Nếu rejected:
→ học viên sửa và nộp lại
```

---

## Flow 5 — Cấp certificate

```text
/admin/certificates
→ chọn học viên + khóa học
→ kiểm tra điều kiện
→ tạo Certificate ID
→ generate PDF
→ status = valid
→ học viên thấy certificate ở /my-certificates
```

---

# 13. Component dùng chung

| Component            | Dùng ở đâu                                   |
| -------------------- | -------------------------------------------- |
| `AdminLayout`        | Tất cả trang admin                           |
| `AdminSidebar`       | Menu admin                                   |
| `AdminTopbar`        | Search, notification, avatar                 |
| `KpiCard`            | Overview                                     |
| `DataTable`          | Courses, Students, Submissions, Certificates |
| `StatusBadge`        | Trạng thái khóa, submission, certificate     |
| `SearchFilterBar`    | Tìm kiếm/lọc                                 |
| `CreateEditModal`    | Tạo/sửa dữ liệu                              |
| `ConfirmDialog`      | Xóa, revoke, block                           |
| `FeedbackBox`        | Duyệt submissions                            |
| `CertificatePreview` | Quản lý certificate                          |
| `EmptyState`         | Khi chưa có dữ liệu                          |
| `LoadingState`       | Khi đang tải                                 |

---

# 14. Data chính cần dùng

| Bảng               | Dùng cho                                   |
| ------------------ | ------------------------------------------ |
| `users`            | Admin, học viên                            |
| `courses`          | Khóa học                                   |
| `modules`          | Module trong khóa                          |
| `lessons`          | Video, resource, assignment, final project |
| `lesson_resources` | Tài liệu kèm lesson                        |
| `enrollments`      | Học viên đăng ký khóa                      |
| `lesson_progress`  | Tiến độ học video/resource                 |
| `submissions`      | Bài nộp assignment/final project           |
| `certificates`     | Chứng chỉ                                  |
| `audit_logs`       | Lịch sử thao tác admin, nên có sau         |

---

# 15. Phân quyền admin

## MVP

```text
Chỉ cần 2 role:
- admin
- student
```

## Sau này có thể mở rộng

| Role        | Quyền                                  |
| ----------- | -------------------------------------- |
| super_admin | Toàn quyền                             |
| admin       | Quản lý vận hành                       |
| instructor  | Quản lý khóa được phân công, duyệt bài |
| student     | Học viên                               |

## Rule quan trọng

```text
Student không được vào /admin.
Admin mới được tạo/sửa/xóa khóa học.
Admin mới được duyệt submission.
Admin mới được cấp/revoke certificate.
```

---

# 16. Thứ tự build MVP Admin Dashboard

## Phase 1 — Admin nền tảng

| Thứ tự | Trang                           |
| ------ | ------------------------------- |
| 1      | Admin layout + sidebar + topbar |
| 2      | `/admin` Overview               |
| 3      | `/admin/courses`                |
| 4      | `/admin/lessons`                |

## Phase 2 — Quản lý học viên

| Thứ tự | Trang             |
| ------ | ----------------- |
| 5      | `/admin/students` |

## Phase 3 — Duyệt bài và certificate

| Thứ tự | Trang                 |
| ------ | --------------------- |
| 6      | `/admin/submissions`  |
| 7      | `/admin/certificates` |

---

# 17. Scope chốt cho Admin Dashboard

```text
Admin Dashboard cần có:

1. /admin
   - KPI (6 cards: students, enrollments, courses, submissions, certificates, new students)
   - Pending submissions
   - Quick actions

2. /admin/courses
   - Course table
   - Create/edit course
   - Course status
   - Manage lessons button

3. /admin/lessons
   - Select course
   - Module manager
   - Lesson manager
   - Lesson type: video/resource/assignment/final_project

4. /admin/students
   - Student table
   - Student detail drawer (5 tabs: Profile, Learning, Enrollments, Submissions, Certificates)
   - Search
   - Block/unblock
   - Gán khóa trong Enrollments tab

5. /admin/submissions
   - Duyệt assignment/final project
   - Approve/reject/feedback
   - Filter status/type/course

6. /admin/certificates
   - Cấp certificate
   - Generate PDF
   - Revoke
   - Copy verify link
   - Eligible students section
```

Nói ngắn gọn: **Admin Dashboard là trung tâm vận hành của CORTEX: tạo khóa → tạo lesson → gán học viên → theo dõi học → duyệt bài → cấp chứng chỉ.**
