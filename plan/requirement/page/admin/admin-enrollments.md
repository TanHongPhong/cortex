# `/admin/enrollments` — Quản lý đăng ký khóa

## 1. Mục tiêu trang

Admin dùng trang này để:

```text
1. Gán khóa học cho học viên
2. Xem học viên đang học khóa nào
3. Quản lý trạng thái đăng ký khóa
4. Hủy / hoàn thành / gia hạn quyền học nếu cần
5. Tránh tạo enrollment trùng
6. Theo dõi ngày đăng ký và ngày hoàn thành khóa
```

Trang này quản lý theo góc nhìn **học viên đã được gán vào khóa học nào**.

---

# 2. Layout đề xuất

```text
/admin/enrollments

[Page Header]
- Title: Quản lý đăng ký khóa
- CTA: Gán khóa cho học viên

[Enrollment Summary]
- Total enrollments
- Active
- Completed
- Cancelled / Expired

[Enrollment Table]
- Danh sách lượt đăng ký khóa

[Create/Edit Enrollment Modal]
- Chọn học viên
- Chọn khóa học
- Chọn trạng thái
```

---

# 3. Các vùng chính trên trang

## A. Page Header

| Thành phần | Yêu cầu                                                |
| ---------- | ------------------------------------------------------ |
| Title      | `Quản lý đăng ký khóa`                                 |
| Subtitle   | “Gán khóa học cho học viên và quản lý trạng thái học.” |
| CTA chính  | `Gán khóa cho học viên`                                |

---

## B. Enrollment Summary Cards

| Card                  | Nội dung                          |
| --------------------- | --------------------------------- |
| Total enrollments     | Tổng lượt đăng ký khóa            |
| Active enrollments    | Đang học                          |
| Completed enrollments | Đã hoàn thành                     |
| Cancelled enrollments | Đã hủy                            |
| Expired enrollments   | Hết hạn, nếu có dùng thời hạn học |

MVP có thể chỉ cần:

```text
Total enrollments
Active
Completed
Cancelled
```

---

# 4. Enrollment Table

## Cột nên có

| Cột          | Nội dung                                         |
| ------------ | ------------------------------------------------ |
| Student      | Tên học viên                                     |
| Email        | Email học viên                                   |
| Phone/Zalo   | Thông tin liên hệ                                |
| Course       | Tên khóa học                                     |
| Level        | Free / Starter / Core / Advanced / Premium / B2B |
| Status       | active / completed / cancelled / expired         |
| Progress     | % hoàn thành khóa                                |
| Enrolled at  | Ngày được gán khóa                               |
| Completed at | Ngày hoàn thành nếu có                           |
| Actions      | View / Update / Cancel                           |

---

## Ví dụ row

```text
Phạm Đức Trí
tri@email.com
Zalo: 09xxxxxxxx

Course: AI Agent & Vibe Coding Bootcamp
Level: Core
Status: Active
Progress: 45%
Enrolled at: 21/05/2026

[View] [Update] [Cancel]
```

---

# 5. Có cần search/filter không?

Với enrollment, **nên có search nhẹ**, vì số học viên sẽ tăng theo thời gian.

## MVP nên có

| Chức năng     | Mục đích                          |
| ------------- | --------------------------------- |
| Search        | Tìm theo tên/email/phone học viên |
| Status filter | active / completed / cancelled    |
| Course filter | Lọc theo khóa học                 |

Nếu muốn cực gọn ở bản đầu:

```text
Search theo tên/email + Status filter
```

---

# 6. Create Enrollment Modal

Khi admin bấm `Gán khóa cho học viên`, mở modal.

## Field cần có

| Field             | Bắt buộc | Ghi chú                  |
| ----------------- | -------- | ------------------------ |
| Student           | Có       | Chọn học viên            |
| Course            | Có       | Chọn khóa học            |
| Status            | Có       | Mặc định `active`        |
| Enrolled date     | Có       | Mặc định ngày hiện tại   |
| Access expires at | Không    | Nếu khóa có thời hạn học |
| Note              | Không    | Ghi chú nội bộ           |

---

## Form mẫu

```text
Gán khóa cho học viên

Student: [Chọn học viên]
Course: [Chọn khóa học]
Status: Active
Enrolled date: Today
Access expires at: Optional
Note: Optional

[Gán khóa]
```

---

# 7. Edit / Update Enrollment

Admin có thể cập nhật trạng thái học.

| Field             | Có thể sửa                 |
| ----------------- | -------------------------- |
| Status            | Có                         |
| Completed at      | Có, nếu status = completed |
| Access expires at | Có, nếu có thời hạn        |
| Note              | Có                         |
| Course            | Không nên sửa sau khi tạo  |
| Student           | Không nên sửa sau khi tạo  |

Nếu gán nhầm student/course, nên **cancel enrollment cũ** rồi tạo enrollment mới.

---

# 8. Enrollment Status

| Status      | Ý nghĩa          | Học viên có quyền học không? |
| ----------- | ---------------- | ---------------------------- |
| `active`    | Đang học         | Có                           |
| `completed` | Đã hoàn thành    | Có thể vẫn xem lại           |
| `cancelled` | Đã hủy quyền học | Không                        |
| `expired`   | Hết hạn truy cập | Không hoặc tùy policy        |

## MVP status nên dùng

```text
active
completed
cancelled
```

`expired` có thể để sau nếu chưa có chính sách thời hạn học.

---

# 9. Actions trên từng enrollment

| Action           | Chức năng                                     |
| ---------------- | --------------------------------------------- |
| `View`           | Xem chi tiết enrollment                       |
| `Update`         | Sửa trạng thái enrollment                     |
| `Mark completed` | Đánh dấu hoàn thành thủ công nếu cần          |
| `Cancel`         | Hủy quyền học                                 |
| `Reactivate`     | Kích hoạt lại enrollment đã hủy               |
| `View student`   | Sang `/admin/students` hoặc mở student detail |
| `View course`    | Sang `/admin/courses` hoặc `/admin/lessons`   |

---

# 10. Rule quan trọng

| Trường hợp                         | Cách xử lý                                       |
| ---------------------------------- | ------------------------------------------------ |
| Student đã có enrollment cùng khóa | Không tạo enrollment trùng                       |
| Status = active                    | Học viên được truy cập khóa                      |
| Status = cancelled                 | Học viên không được truy cập khóa                |
| Status = completed                 | Học viên hoàn thành khóa, có thể xét certificate |
| Final project chưa approved        | Không nên tự động completed                      |
| Admin mark completed thủ công      | Cần confirm rõ                                   |
| Enrollment có certificate          | Không nên xóa enrollment                         |
| Xóa enrollment                     | Không nên làm ở MVP, chỉ cancel                  |

---

# 11. Điều kiện tự động completed

Có thể để hệ thống tự cập nhật `completed` khi:

```text
1. Học viên hoàn thành tất cả lesson bắt buộc
2. Assignment bắt buộc đã approved
3. Final project đã approved
```

Nếu chưa làm auto ở MVP, admin có thể mark completed thủ công sau khi kiểm tra.

---

# 12. Yêu cầu chức năng cụ thể

| Nhóm                 | Yêu cầu                                                 |
| -------------------- | ------------------------------------------------------- |
| Auth                 | Chỉ admin mới vào được                                  |
| Enrollment list      | Hiển thị danh sách đăng ký khóa                         |
| Search/filter        | Tìm theo học viên, lọc theo khóa/status                 |
| Create enrollment    | Gán khóa cho học viên                                   |
| Duplicate check      | Không cho gán trùng student + course                    |
| Update status        | Sửa active/completed/cancelled                          |
| Cancel enrollment    | Hủy quyền học thay vì xóa                               |
| Progress view        | Hiển thị tiến độ khóa nếu có                            |
| Certificate relation | Enrollment completed có thể xét certificate             |
| Safety               | Không xóa enrollment có progress/submission/certificate |
| Responsive           | Ưu tiên desktop, mobile xem được                        |

---

# 13. Data cần dùng

| Bảng              | Dữ liệu                             |
| ----------------- | ----------------------------------- |
| `users`           | Danh sách học viên                  |
| `courses`         | Danh sách khóa                      |
| `enrollments`     | Lượt đăng ký khóa                   |
| `lessons`         | Tổng lesson để tính progress        |
| `lesson_progress` | Lesson video/resource đã hoàn thành |
| `submissions`     | Assignment/final project đã nộp     |
| `certificates`    | Kiểm tra chứng chỉ đã cấp chưa      |

---

# 14. Cấu trúc dữ liệu `enrollments`

| Field               | Mục đích                                 |
| ------------------- | ---------------------------------------- |
| `id`                | ID enrollment                            |
| `user_id`           | Học viên                                 |
| `course_id`         | Khóa học                                 |
| `status`            | active / completed / cancelled / expired |
| `enrolled_at`       | Ngày gán khóa                            |
| `completed_at`      | Ngày hoàn thành                          |
| `access_expires_at` | Ngày hết hạn nếu có                      |
| `note`              | Ghi chú nội bộ                           |
| `created_by`        | Admin tạo enrollment                     |
| `created_at`        | Ngày tạo                                 |
| `updated_at`        | Ngày cập nhật                            |

---

# 15. Logic chính

## Tạo enrollment

```text
Admin chọn student
→ chọn course
→ kiểm tra student chưa có enrollment cùng course
→ tạo enrollment status = active
→ enrolled_at = ngày hiện tại
```

## Kiểm tra enrollment trùng

```text
Nếu tồn tại enrollment với:
user_id = selected_user
course_id = selected_course
status = active hoặc completed

→ không cho tạo mới
→ báo admin: Học viên đã có khóa học này
```

## Cancel enrollment

```text
Admin bấm Cancel
→ confirm
→ status = cancelled
→ học viên không còn quyền truy cập khóa
```

## Mark completed

```text
Admin bấm Mark completed
→ hệ thống nhắc kiểm tra progress/final project
→ nếu xác nhận
→ status = completed
→ completed_at = hiện tại
```

---

# 16. Tính progress trong enrollment table

```text
total_required_lessons = tổng lesson bắt buộc của course

completed_lessons =
- video/resource lesson completed trong lesson_progress
- assignment/final_project approved trong submissions

progress = completed_lessons / total_required_lessons * 100
```

---

# 17. Component cần có

| Component                | Mục đích                           |
| ------------------------ | ---------------------------------- |
| `AdminLayout`            | Sidebar + topbar                   |
| `EnrollmentsHeader`      | Title + CTA                        |
| `EnrollmentSummaryCards` | Tổng enrollment, active, completed |
| `EnrollmentSearchFilter` | Search/filter nhẹ                  |
| `EnrollmentTable`        | Danh sách enrollment               |
| `EnrollmentFormModal`    | Gán khóa/sửa trạng thái            |
| `ProgressBar`            | Hiển thị tiến độ                   |
| `StatusBadge`            | active / completed / cancelled     |
| `ConfirmDialog`          | Confirm cancel/mark completed      |
| `EmptyState`             | Khi chưa có enrollment             |
| `LoadingState`           | Khi đang tải                       |

---

# 18. Empty State

## Chưa có enrollment

```text
Chưa có học viên nào được gán khóa học.

Hãy gán khóa đầu tiên cho học viên.
[Gán khóa cho học viên]
```

## Không tìm thấy kết quả

```text
Không tìm thấy đăng ký khóa phù hợp.

Thử kiểm tra lại tên học viên, email hoặc khóa học.
```

---

# 19. UI style đề xuất

| Phần           | Gợi ý                                                 |
| -------------- | ----------------------------------------------------- |
| Tổng thể       | Admin table rõ ràng                                   |
| Table          | Ưu tiên dễ scan theo học viên + khóa                  |
| Status badge   | Active xanh, completed tím/xanh, cancelled xám/đỏ nhẹ |
| Progress       | Progress bar nhỏ trong table                          |
| Modal gán khóa | Gọn, chỉ field cần thiết                              |
| Mobile         | Table chuyển thành card list                          |

---

# 20. Acceptance Criteria

Trang `/admin/enrollments` đạt nếu:

| Tiêu chí                                         | Đạt / Không |
| ------------------------------------------------ | ----------- |
| Student không truy cập được                      |             |
| Admin xem được danh sách enrollments             |             |
| Admin tạo enrollment mới được                    |             |
| Không tạo được enrollment trùng student + course |             |
| Admin cập nhật status được                       |             |
| Cancel enrollment chặn quyền học                 |             |
| Progress hiển thị đúng                           |             |
| Mark completed cập nhật completed_at             |             |
| Empty state hiển thị đúng                        |             |
| Responsive dùng ổn                               |             |

---

# 21. Chốt scope `/admin/enrollments`

```text
/admin/enrollments cần có:

1. Admin layout chung
2. Page header
3. Enrollment summary cards
4. Search/filter nhẹ
5. Enrollment table
6. Create enrollment modal
7. Update enrollment status
8. Duplicate enrollment protection
9. Cancel / reactivate / mark completed
10. Progress display
11. Empty/loading/error state
```

Nói ngắn gọn: **`/admin/enrollments` là nơi admin gán khóa cho học viên và kiểm soát quyền truy cập khóa học. Không nên xóa enrollment ở MVP; chỉ nên dùng status active/completed/cancelled để quản lý.**
