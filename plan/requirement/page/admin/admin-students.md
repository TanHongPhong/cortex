# `/admin/students` — Quản lý học viên

## 1. Mục tiêu trang

Admin dùng trang này để:

```text
1. Xem danh sách học viên
2. Xem thông tin cá nhân và nhu cầu học của học viên
3. Theo dõi học viên đang học khóa nào
4. Theo dõi tiến độ học tập
5. Xem bài nộp assignment/final project
6. Xem certificate của học viên
7. Gán khóa hoặc khóa tài khoản nếu cần
```

Trang này quản lý học viên theo góc nhìn **từng người học**. Quản lý lượt đăng ký khóa học (enrollment) hiện được tích hợp trực tiếp vào Student Detail Drawer.

---

# 2. Layout đề xuất

```text
/admin/students

[Page Header]
- Title: Quản lý học viên

[Student Summary]
- Total students
- Active students
- Blocked students

[Student Search]
- Search by name / email / phone

[Student Table]
- Danh sách học viên

[Student Detail Drawer / Page]
- Profile
- Learning Profile
- Enrollments
- Progress
- Submissions
- Certificates
```

---

# 3. Các vùng chính trên trang

## A. Page Header

| Thành phần | Yêu cầu                                                                    |
| ---------- | -------------------------------------------------------------------------- |
| Title      | `Quản lý học viên`                                                         |
| Subtitle   | “Theo dõi thông tin, tiến độ học và trạng thái học viên.”                  |
| CTA chính  | `Thêm học viên` nếu cần                                                    |
| CTA phụ    | `Gán khóa học` (thực hiện trong tab Enrollments của Student Detail Drawer) |

---

## B. Student Summary Cards

| Card             | Nội dung                      |
| ---------------- | ----------------------------- |
| Total students   | Tổng số học viên              |
| Active students  | Học viên đang hoạt động       |
| Blocked students | Học viên bị khóa              |
| New students     | Học viên mới gần đây, nếu cần |

MVP có thể chỉ cần:

```text
Total students
Active students
Blocked students
```

---

# 4. Student Search

Với học viên, nên có search nhẹ vì sau này số lượng học viên sẽ tăng.

| Chức năng     | Mục đích                              |
| ------------- | ------------------------------------- |
| Search        | Tìm theo tên, email, phone/Zalo       |
| Status filter | active / blocked, có thể để sau       |
| Course filter | Lọc học viên theo khóa, có thể để sau |

MVP chỉ cần:

```text
Search theo tên / email / phone
```

---

# 5. Student Table

## Cột nên có

| Cột               | Nội dung               |
| ----------------- | ---------------------- |
| Name              | Họ tên học viên        |
| Email             | Email                  |
| Phone/Zalo        | Thông tin liên hệ      |
| Learning interest | Nhu cầu học chính      |
| Courses           | Số khóa đã enrolled    |
| Current course    | Khóa đang học gần nhất |
| Progress          | Tiến độ khóa gần nhất  |
| Status            | active / blocked       |
| Created at        | Ngày tạo tài khoản     |
| Actions           | View / Enroll / Block  |

---

## Ví dụ row

```text
Phạm Đức Trí
tri@email.com
Zalo: 09xxxxxxxx

Interest: AI Agent & Vibe Coding Bootcamp
Courses: 2
Current course: AI Agent & Vibe Coding Bootcamp
Progress: 45%
Status: Active

[View] [Enroll] [Block]
```

---

# 6. Student Detail

Khi admin bấm `View`, mở drawer hoặc trang chi tiết.

| Cách                               | Nên dùng khi nào                     |
| ---------------------------------- | ------------------------------------ |
| Detail drawer                      | MVP, thao tác nhanh, không rời trang |
| Trang riêng `/admin/students/[id]` | Khi dữ liệu học viên nhiều hơn       |

Anh khuyên MVP dùng **drawer** trước.

---

## Student Detail cần có

```text
Student Detail

[Profile Info]
[Learning Profile]
[Enrollments]
[Progress]
[Submissions]
[Certificates]
[Admin Notes]
```

---

# 7. Profile Info

| Field      | Nội dung           |
| ---------- | ------------------ |
| Full name  | Họ tên             |
| Email      | Email              |
| Phone/Zalo | Liên hệ            |
| Role       | student            |
| Status     | active / blocked   |
| Created at | Ngày tạo tài khoản |

Không cần hiển thị/quản lý avatar tại đây.

---

# 8. Learning Profile

Dữ liệu lấy từ form register/profile.

| Field             | Nội dung              |
| ----------------- | --------------------- |
| Learning interest | Nhu cầu học           |
| Current level     | Mức độ hiện tại       |
| Learning goal     | Mục tiêu học          |
| Notes             | Ghi chú tư vấn nếu có |

Ví dụ:

```text
Learning interest: AI Agent & Vibe Coding Bootcamp
Current level: Đã dùng ChatGPT cơ bản
Learning goal: Tạo website/app bằng AI
```

---

# 9. Enrollments trong Student Detail

Hiển thị các khóa học viên đã được gán.

| Cột          | Nội dung                                 |
| ------------ | ---------------------------------------- |
| Course       | Tên khóa                                 |
| Status       | active / completed / cancelled / expired |
| Progress     | % hoàn thành                             |
| Enrolled at  | Ngày đăng ký                             |
| Completed at | Ngày hoàn thành nếu có                   |
| Action       | View course / Update enrollment          |

**Rules:**

- Chỉ hiển thị enrollments chưa bị soft delete
- Không cho tạo enrollment trùng (user_id + course_id unique)
- Check race condition khi gán khóa

CTA:

```text
Gán khóa mới
```

Mở modal trong drawer chọn course → tạo enrollment.

Modal fields:

| Field  | Bắt buộc | Ghi chú                 |
| ------ | -------- | ----------------------- |
| Course | Có       | Dropdown danh sách khóa |
| Status | Có       | active (mặc định)       |
| Note   | Không    | Ghi chú cho enrollment  |

Rules:

```text
- Check duplicate: nếu student đã enrolled khóa → báo lỗi
- Tạo enrollment mới với status = active
- enrolled_at = now
- Lưu created_by = admin hiện tại
```

---

# 10. Progress

Hiển thị tiến độ học của từng khóa.

| Nội dung          | Mô tả                   |
| ----------------- | ----------------------- |
| Course progress   | % hoàn thành            |
| Lessons completed | Số lesson đã hoàn thành |
| Current lesson    | Bài đang học gần nhất   |
| Last activity     | Lần học gần nhất        |
| Required lessons  | Số lesson bắt buộc      |

Rule tính progress:

```text
Video/resource completed → tính từ lesson_progress
Assignment/final_project approved → tính từ submissions
```

---

# 11. Submissions

Hiển thị bài nộp assignment/final project của học viên.

| Cột          | Nội dung                      |
| ------------ | ----------------------------- |
| Lesson       | Tên assignment/final project  |
| Course       | Khóa liên quan                |
| Type         | assignment / final_project    |
| Status       | pending / approved / rejected |
| Submitted at | Ngày nộp                      |
| Action       | Review                        |

CTA `Review` dẫn đến:

```text
/admin/submissions
```

hoặc mở submission detail ngay trong drawer.

---

# 12. Certificates

Hiển thị chứng chỉ học viên đã nhận.

| Cột            | Nội dung               |
| -------------- | ---------------------- |
| Course         | Khóa học               |
| Certificate ID | Mã chứng chỉ           |
| Issued at      | Ngày cấp               |
| Status         | valid / revoked        |
| Action         | View / Verify / Revoke |

Nếu học viên đủ điều kiện nhưng chưa cấp:

```text
Eligible for certificate
[Issue certificate]
```

Dẫn đến:

```text
/admin/certificates
```

---

# 13. Admin Notes

**Mục đích:** admin ghi chú quá trình tư vấn/hỗ trợ học viên.

| Field        | Nội dung                                  |
| ------------ | ----------------------------------------- |
| Note content | Nội dung ghi chú                          |
| Created by   | Admin tạo ghi chú                         |
| Created at   | Ngày tạo                                  |
| Type         | consulting / support / learning / payment |

MVP có thể để sau, nhưng nếu làm được thì rất hữu ích.

---

# 14. Actions trên học viên

| Action              | Chức năng             |
| ------------------- | --------------------- |
| `View`              | Xem chi tiết học viên |
| `Enroll`            | Gán khóa cho học viên |
| `Block`             | Khóa tài khoản        |
| `Unblock`           | Mở khóa tài khoản     |
| `View progress`     | Xem tiến độ học       |
| `View submissions`  | Xem bài nộp           |
| `View certificates` | Xem certificate       |

---

# 15. Rule quan trọng

| Trường hợp               | Cách xử lý                                        |
| ------------------------ | ------------------------------------------------- |
| Student bị blocked       | Không cho đăng nhập/học tiếp tùy policy           |
| Student đã có enrollment | Không tạo enrollment trùng cùng khóa              |
| Student có certificate   | Không xóa user                                    |
| Student có submission    | Không xóa user                                    |
| Email user               | Không nên sửa trực tiếp ở MVP                     |
| Role                     | Admin không đổi student thành admin tại trang này |
| Xóa học viên             | Không nên làm ở MVP, chỉ block/unblock            |

---

# 16. Yêu cầu chức năng cụ thể

| Nhóm              | Yêu cầu                                              |
| ----------------- | ---------------------------------------------------- |
| Auth              | Chỉ admin mới vào được                               |
| Student list      | Hiển thị danh sách học viên                          |
| Search            | Tìm theo tên/email/phone                             |
| Student detail    | Xem profile, learning profile, enrollments, progress |
| Enrollment action | Gán khóa cho học viên                                |
| Progress view     | Xem tiến độ từng khóa                                |
| Submissions view  | Xem bài nộp assignment/final project                 |
| Certificates view | Xem chứng chỉ học viên                               |
| Block/unblock     | Khóa hoặc mở tài khoản                               |
| Safety            | Không xóa học viên có dữ liệu học tập                |
| Responsive        | Ưu tiên desktop, mobile xem được                     |

---

# 17. Data cần dùng

| Bảng              | Dữ liệu                          |
| ----------------- | -------------------------------- |
| `users`           | Thông tin học viên               |
| `courses`         | Tên khóa                         |
| `enrollments`     | Khóa học viên đã đăng ký         |
| `modules`         | Nếu cần tính module hiện tại     |
| `lessons`         | Tổng lesson trong khóa           |
| `lesson_progress` | Bài video/resource đã hoàn thành |
| `submissions`     | Assignment/final project đã nộp  |
| `certificates`    | Chứng chỉ của học viên           |
| `admin_notes`     | Ghi chú admin, nếu có            |

---

# 18. Cấu trúc dữ liệu liên quan

## Bảng `users`

| Field               | Mục đích           |
| ------------------- | ------------------ |
| `id`                | ID user            |
| `full_name`         | Họ tên             |
| `email`             | Email              |
| `phone`             | Số điện thoại/Zalo |
| `role`              | student/admin      |
| `learning_interest` | Nhu cầu học        |
| `current_level`     | Mức độ hiện tại    |
| `learning_goal`     | Mục tiêu học       |
| `status`            | active / blocked   |
| `created_at`        | Ngày tạo           |

Không cần field `avatar_url`.

---

## Bảng `admin_notes`, nếu cần

| Field        | Mục đích                                  |
| ------------ | ----------------------------------------- |
| `id`         | ID note                                   |
| `student_id` | Học viên                                  |
| `admin_id`   | Admin tạo note                            |
| `note`       | Nội dung ghi chú                          |
| `note_type`  | consulting / support / learning / payment |
| `created_at` | Ngày tạo                                  |

---

# 19. Logic chính

## Lấy danh sách học viên

```text
Lấy users where role = student
→ join enrollments để đếm số khóa
→ lấy current course gần nhất
→ tính progress khóa gần nhất nếu cần
```

## Tính progress

```text
total_required_lessons = tổng lesson bắt buộc của khóa

completed_lessons =
- video/resource lesson đã completed trong lesson_progress
- assignment/final_project đã approved trong submissions

progress = completed_lessons / total_required_lessons * 100
```

## Gán khóa cho học viên

```text
Admin chọn student
→ chọn course
→ kiểm tra chưa có enrollment trùng
→ tạo enrollment status = active
```

## Block học viên

```text
Admin bấm Block
→ confirm
→ users.status = blocked
```

---

# 20. Component cần có

| Component              | Mục đích                       |
| ---------------------- | ------------------------------ |
| `AdminLayout`          | Sidebar + topbar               |
| `StudentsHeader`       | Title + CTA                    |
| `StudentSummaryCards`  | Tổng học viên, active, blocked |
| `StudentSearchBar`     | Tìm học viên                   |
| `StudentTable`         | Danh sách học viên             |
| `StudentDetailDrawer`  | Chi tiết học viên              |
| `EnrollmentMiniTable`  | Khóa học của học viên          |
| `ProgressMiniTable`    | Tiến độ học                    |
| `SubmissionMiniTable`  | Bài nộp                        |
| `CertificateMiniTable` | Chứng chỉ                      |
| `StatusBadge`          | active / blocked               |
| `ConfirmDialog`        | Block/unblock                  |
| `EmptyState`           | Khi chưa có học viên           |
| `LoadingState`         | Khi đang tải                   |

---

# 21. Empty State

## Chưa có học viên

```text
Chưa có học viên nào.

Học viên sẽ xuất hiện sau khi đăng ký tài khoản hoặc được admin tạo từ lead.
```

## Không tìm thấy học viên

```text
Không tìm thấy học viên phù hợp.

Thử kiểm tra lại tên, email hoặc số điện thoại.
```

---

# 22. UI style đề xuất

| Phần          | Gợi ý                              |
| ------------- | ---------------------------------- |
| Tổng thể      | Admin app, sạch, rõ, ưu tiên table |
| Student table | Dễ scan, hiển thị contact rõ       |
| Detail drawer | Dùng tab để tránh quá dài          |
| Status badge  | Active xanh nhẹ, blocked đỏ nhẹ    |
| Search        | Đặt trên table                     |
| Mobile        | Table chuyển thành card list       |

---

# 23. Acceptance Criteria

Trang `/admin/students` đạt nếu:

| Tiêu chí                                | Đạt / Không |
| --------------------------------------- | ----------- |
| Student không truy cập được             |             |
| Admin xem được danh sách học viên       |             |
| Không hiển thị cột avatar trong bảng    |             |
| Search theo tên/email/phone hoạt động   |             |
| Admin mở được chi tiết học viên         |             |
| Hiển thị đúng khóa học viên đã enrolled |             |
| Hiển thị đúng tiến độ học               |             |
| Hiển thị đúng submissions của học viên  |             |
| Hiển thị đúng certificates của học viên |             |
| Admin gán khóa cho học viên được        |             |
| Không tạo enrollment trùng              |             |
| Admin block/unblock học viên được       |             |
| Empty state hiển thị đúng               |             |
| Responsive dùng ổn                      |             |

---

# 24. Chốt scope `/admin/students`

```text
/admin/students cần có:

1. Admin layout chung
2. Page header
3. Student summary cards
4. Student search
5. Student table không hiển thị avatar
6. Student detail drawer/page
7. Profile info
8. Learning profile
9. Enrollments của học viên
10. Progress theo khóa
11. Submissions của học viên
12. Certificates của học viên
13. Actions: view, enroll, block/unblock
14. Empty/loading/error state
```

Nói ngắn gọn: **`/admin/students` là nơi admin quản lý học viên theo từng người: thông tin, nhu cầu học, khóa học, tiến độ, bài nộp và chứng chỉ. Admin không cần quản lý ảnh đại diện tại đây để giữ bảng gọn và thực dụng.**
