# Admin Dashboard — Tổng plan

## 1. Mục tiêu tổng

Admin Dashboard dùng để May Academy quản lý toàn bộ hệ thống học:

```text
1. Quản lý khóa học
2. Quản lý module/lesson
3. Quản lý học viên
4. Quản lý đăng ký khóa
5. Quản lý lead
6. Duyệt bài nộp assignment/final project
7. Cấp và kiểm soát certificate
8. Xem tổng quan vận hành
```

---

# 2. Cấu trúc route admin

| Trang                 | Mục đích                               |
| --------------------- | -------------------------------------- |
| `/admin`              | Tổng quan hệ thống                     |
| `/admin/courses`      | Quản lý khóa học                       |
| `/admin/lessons`      | Quản lý module và lesson               |
| `/admin/students`     | Quản lý học viên                       |
| `/admin/enrollments`  | Gán khóa cho học viên                  |
| `/admin/leads`        | Quản lý người quan tâm                 |
| `/admin/submissions`  | Duyệt bài nộp assignment/final project |
| `/admin/certificates` | Cấp và quản lý chứng chỉ               |

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
│ - Enrollments │                              │
│ - Leads       │                              │
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
| Enrollments  | `/admin/enrollments`  |
| Leads        | `/admin/leads`        |
| Submissions  | `/admin/submissions`  |
| Certificates | `/admin/certificates` |
| Logout       | Đăng xuất             |

---

# 4. `/admin` — Admin Overview

## Mục tiêu

Admin nhìn nhanh tình hình hệ thống.

## Các khu vực cần có

| Khu vực             | Nội dung                                                                       |
| ------------------- | ------------------------------------------------------------------------------ |
| KPI cards           | Tổng lead, tổng học viên, tổng khóa học, bài nộp chờ duyệt, certificate đã cấp |
| Recent leads        | Lead mới nhất                                                                  |
| Pending submissions | Assignment/final project đang chờ duyệt                                        |
| Quick actions       | Tạo khóa, thêm lesson, xem lead, cấp certificate                               |

## KPI nên hiển thị

| KPI                 | Ý nghĩa                     |
| ------------------- | --------------------------- |
| Total leads         | Tổng người để lại thông tin |
| New leads           | Lead mới chưa xử lý         |
| Total students      | Tổng học viên               |
| Active enrollments  | Số đăng ký khóa đang active |
| Published courses   | Số khóa đang mở             |
| Pending submissions | Bài nộp đang chờ duyệt      |
| Certificates issued | Số chứng chỉ đã cấp         |

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

# 8. `/admin/enrollments` — Quản lý đăng ký khóa

## Mục tiêu

Gán khóa cho học viên và quản lý trạng thái học.

## Các khu vực cần có

| Khu vực          | Nội dung                                     |
| ---------------- | -------------------------------------------- |
| Enrollment table | Học viên, khóa học, trạng thái, ngày đăng ký |
| Add enrollment   | Chọn học viên + chọn khóa để gán             |
| Status           | Active, completed, cancelled                 |
| Manual control   | Admin có thể đánh dấu hoàn thành nếu cần     |

## Enrollment status

| Status    | Ý nghĩa                     |
| --------- | --------------------------- |
| active    | Học viên đang học           |
| completed | Học viên đã hoàn thành khóa |
| cancelled | Đã hủy quyền học            |
| expired   | Hết hạn truy cập nếu có     |

---

# 9. `/admin/leads` — Quản lý lead

## Mục tiêu

Xử lý người quan tâm từ form contact, workshop, resource download hoặc CTA khóa học.

## Các khu vực cần có

| Khu vực         | Nội dung                                         |
| --------------- | ------------------------------------------------ |
| Lead table      | Tên, phone/Zalo, email, nhu cầu, ngày gửi        |
| Status pipeline | New, contacted, converted, lost                  |
| Notes           | Admin thêm ghi chú tư vấn                        |
| Actions         | Đổi trạng thái, tạo học viên từ lead nếu đã chốt |

## Lead status

| Status    | Ý nghĩa                  |
| --------- | ------------------------ |
| new       | Lead mới                 |
| contacted | Đã liên hệ               |
| converted | Đã chuyển thành học viên |
| lost      | Không chuyển đổi         |

## Action quan trọng

```text
Lead converted
→ tạo user/student nếu chưa có
→ tạo enrollment nếu đã chốt khóa
```

---

# 10. `/admin/submissions` — Duyệt bài nộp

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

## Flow 1 — Từ lead thành học viên

```text
/admin/leads
→ xem lead mới
→ liên hệ tư vấn
→ đổi status thành contacted
→ nếu chốt học
→ tạo student
→ tạo enrollment
→ lead status = converted
```

---

## Flow 2 — Tạo khóa học

```text
/admin/courses
→ tạo khóa học
→ set level, price, status
→ published khi sẵn sàng
```

---

## Flow 3 — Xây nội dung khóa học

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

## Flow 4 — Học viên học và nộp bài

```text
Student học tại /learn/[course]/[lesson]
→ video/resource hoàn thành bằng lesson_progress
→ assignment/final_project nộp vào submissions
→ admin duyệt ở /admin/submissions
```

---

## Flow 5 — Duyệt bài nộp

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

## Flow 6 — Cấp certificate

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

| Component            | Dùng ở đâu                                                       |
| -------------------- | ---------------------------------------------------------------- |
| `AdminLayout`        | Tất cả trang admin                                               |
| `AdminSidebar`       | Menu admin                                                       |
| `AdminTopbar`        | Search, notification, avatar                                     |
| `KpiCard`            | Overview                                                         |
| `DataTable`          | Courses, Students, Leads, Enrollments, Submissions, Certificates |
| `StatusBadge`        | Trạng thái khóa, lead, enrollment, submission, certificate       |
| `SearchFilterBar`    | Tìm kiếm/lọc                                                     |
| `CreateEditModal`    | Tạo/sửa dữ liệu                                                  |
| `ConfirmDialog`      | Xóa, revoke, block                                               |
| `FeedbackBox`        | Duyệt submissions                                                |
| `CertificatePreview` | Quản lý certificate                                              |
| `EmptyState`         | Khi chưa có dữ liệu                                              |
| `LoadingState`       | Khi đang tải                                                     |

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
| `leads`            | Người quan tâm                             |
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

| Thứ tự | Trang                |
| ------ | -------------------- |
| 5      | `/admin/students`    |
| 6      | `/admin/enrollments` |
| 7      | `/admin/leads`       |

## Phase 3 — Duyệt bài và certificate

| Thứ tự | Trang                 |
| ------ | --------------------- |
| 8      | `/admin/submissions`  |
| 9      | `/admin/certificates` |

---

# 17. Scope chốt cho Admin Dashboard

```text
Admin Dashboard cần có:

1. /admin
   - KPI
   - Recent leads
   - Pending submissions
   - Quick actions

2. /admin/courses
   - Course table
   - Create/edit course
   - Course status

3. /admin/lessons
   - Select course
   - Module manager
   - Lesson manager
   - Lesson type: video/resource/assignment/final_project

4. /admin/students
   - Student table
   - Student detail
   - Search/filter
   - Block/gán khóa

5. /admin/enrollments
   - Gán khóa cho học viên
   - Quản lý trạng thái học

6. /admin/leads
   - Lead pipeline
   - Notes
   - Convert lead thành student

7. /admin/submissions
   - Duyệt assignment/final project
   - Approve/reject/feedback

8. /admin/certificates
   - Cấp certificate
   - Generate PDF
   - Revoke
   - Copy verify link
```

Nói ngắn gọn: **Admin Dashboard là trung tâm vận hành của May Academy: tạo khóa → tạo lesson → gán học viên → theo dõi học → duyệt bài → cấp chứng chỉ.**
