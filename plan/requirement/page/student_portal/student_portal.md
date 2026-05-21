# 1. Layout tổng cho toàn bộ Student Portal

## Cấu trúc khung chung

```text
┌──────────────────────────────────────────────┐
│ Top Bar: Logo, Search nhỏ, Notification, User │
├───────────────┬──────────────────────────────┤
│ Sidebar       │ Main Content                  │
│ - Dashboard   │ Nội dung từng trang            │
│ - My Courses  │                              │
│ - Assignments │                              │
│ - Certificates│                              │
│ - Profile     │                              │
└───────────────┴──────────────────────────────┘
```

## Sidebar nên có

| Menu         | Dẫn tới            |
| ------------ | ------------------ |
| Dashboard    | `/dashboard`       |
| My Courses   | `/my-courses`      |
| Assignments  | `/assignments`     |
| Certificates | `/my-certificates` |
| Profile      | `/profile`         |
| Support      | `/support` nếu có  |
| Logout       | Đăng xuất          |

## Nguyên tắc thiết kế

| Nguyên tắc              | Cách làm                                                     |
| ----------------------- | ------------------------------------------------------------ |
| Không cuộn dài          | Mỗi trang chia thành card/khu vực rõ ràng                    |
| Ưu tiên hành động chính | Mỗi trang có 1 CTA nổi bật                                   |
| Học tiếp nhanh          | Luôn có nút `Tiếp tục học` hoặc `Học bài tiếp theo`          |
| Dữ liệu rõ              | Progress, status, deadline, certificate phải nhìn thấy nhanh |
| Desktop-first           | Student Portal ưu tiên desktop/laptop                        |
| Mobile vẫn dùng được    | Sidebar chuyển thành bottom nav hoặc hamburger               |

---

# 2. `/dashboard` — Trang tổng quan học viên

## Mục tiêu

Học viên vào là biết: **đang học khóa nào, học tiếp bài gì, tiến độ bao nhiêu, project/certificate ra sao.**

## Layout đề xuất

```text
Dashboard

[Welcome Card + Continue Learning Button]

[Current Course Card]    [Progress Card]
[Next Lesson Card]       [Certificate Status Card]

[Project Status Card]
[My Courses Preview]
```

## Các vùng cần có

| Vùng               | Nội dung                                 | CTA                 |
| ------------------ | ---------------------------------------- | ------------------- |
| Welcome card       | Chào mừng trở lại, tên học viên          | `Tiếp tục học`      |
| Current course     | Khóa học gần nhất đang học               | `Vào khóa học`      |
| Progress card      | % hoàn thành, số bài đã học              | Không cần           |
| Next lesson        | Bài học tiếp theo                        | `Học bài tiếp theo` |
| Project status     | Chưa nộp / pending / approved / rejected | `Nộp project`       |
| Certificate status | Chưa đủ điều kiện / có thể tải           | `Xem chứng chỉ`     |
| My courses preview | 2–3 khóa gần nhất                        | `Xem tất cả`        |

## Quy tắc hiển thị

| Trường hợp            | Cách xử lý                            |
| --------------------- | ------------------------------------- |
| Chưa có khóa          | Hiện empty state + nút `Xem khóa học` |
| Có nhiều khóa         | Ưu tiên khóa học gần nhất             |
| Project rejected      | Hiện feedback ngắn + nút chỉnh sửa    |
| Certificate available | Hiện nút tải PDF/verify               |

---

# 3. `/my-courses` — Khóa học của tôi

## Mục tiêu

Học viên xem toàn bộ khóa mình đã đăng ký.

## Layout đề xuất

```text
My Courses

[Summary Cards]
- Total courses
- In progress
- Completed

[Course List Grid]
[Course Card] [Course Card]
[Course Card] [Course Card]
```

## Course card cần có

| Thành phần   | Mô tả                        |
| ------------ | ---------------------------- |
| Thumbnail    | Ảnh khóa học                 |
| Tên khóa     | Tên khóa đã đăng ký          |
| Level        | Starter / Core / Advanced    |
| Progress bar | % hoàn thành                 |
| Status       | Active / Completed / Expired |
| Last lesson  | Bài học gần nhất             |
| CTA          | `Vào học`                    |

## Rule

```text
Chỉ hiển thị khóa học viên đã enrolled.
Không hiện khóa chưa mua/chưa được gán.
```

---

# 4. `/learn/[course]` — Trang học của một khóa

## Mục tiêu

Học viên xem toàn bộ cấu trúc khóa và biết mình đang ở đâu.

## Layout đề xuất

```text
Course Learning Page

[Course Header]
Tên khóa + progress + CTA học tiếp

┌──────────────────────┬──────────────────────┐
│ Module/Lesson List   │ Course Info Panel     │
│ Accordion modules    │ Progress, project,    │
│ Lessons              │ certificate status    │
└──────────────────────┴──────────────────────┘
```

## Các vùng cần có

| Vùng             | Nội dung                                     |
| ---------------- | -------------------------------------------- |
| Course header    | Tên khóa, mô tả ngắn, % hoàn thành           |
| Continue button  | Dẫn tới bài chưa học gần nhất                |
| Module accordion | Module 1, 2, 3...                            |
| Lesson list      | Tên bài, trạng thái, thời lượng              |
| Right panel      | Progress, project status, certificate status |

## Lesson status

| Trạng thái | UI                 |
| ---------- | ------------------ |
| Completed  | Dấu check          |
| Available  | Có thể bấm vào học |
| Locked     | Icon khóa          |
| Current    | Highlight nhẹ      |

## Rule

```text
Nếu khóa yêu cầu học theo thứ tự:
- Bài sau bị khóa cho đến khi hoàn thành bài trước.
Nếu không:
- Tất cả bài available.
```

---

# 5. `/learn/[course]/[lesson]` — Trang bài học

## Mục tiêu

Học viên tập trung học bài, xem tài liệu, đánh dấu hoàn thành.

## Layout đề xuất

```text
Lesson Page

┌──────────────────────────────┬──────────────────────┐
│ Lesson Content               │ Lesson Sidebar        │
│ - Video/Text                 │ - Module list         │
│ - Resources                  │ - Lesson status       │
│ - Complete button            │                      │
└──────────────────────────────┴──────────────────────┘

[Previous Lesson]        [Next Lesson]
```

## Vùng chính

| Vùng            | Nội dung                         |
| --------------- | -------------------------------- |
| Lesson header   | Tên bài, module, thời lượng      |
| Lesson content  | Video hoặc text                  |
| Resource box    | File, prompt, template, link tải |
| Complete button | `Đánh dấu hoàn thành`            |
| Sidebar         | Danh sách bài trong khóa         |
| Navigation      | Bài trước / bài tiếp theo        |

## Rule

```text
Khi bấm “Đánh dấu hoàn thành”:
- Tạo/cập nhật record trong lesson_progress
- Cập nhật % tiến độ khóa học
- Mở khóa bài tiếp theo nếu có lock theo thứ tự
```

## UX quan trọng

| Trường hợp        | Cách xử lý                                        |
| ----------------- | ------------------------------------------------- |
| Bài đã hoàn thành | Button đổi thành `Đã hoàn thành`                  |
| Bài có tài liệu   | Hiện resource box rõ                              |
| Bài bị khóa       | Không cho truy cập, redirect về `/learn/[course]` |
| Video chưa load   | Hiện loading/skeleton                             |

---

# 6. `/assignments` — Bài tập / Project

## Mục tiêu

Học viên xem tất cả bài tập/project cần nộp và trạng thái duyệt.

## Layout đề xuất

```text
Assignments

[Status Summary]
- Not submitted
- Pending
- Approved
- Rejected

[Assignment List]
[Assignment Card]
[Assignment Card]
```

## Assignment card cần có

| Thành phần     | Mô tả                                         |
| -------------- | --------------------------------------------- |
| Tên assignment | Ví dụ: Final Project                          |
| Khóa liên quan | Thuộc khóa nào                                |
| Deadline       | Nếu có                                        |
| Status         | Not submitted / pending / approved / rejected |
| Feedback       | Hiện nếu admin đã phản hồi                    |
| CTA            | Nộp bài / xem bài / chỉnh sửa                 |

## Status xử lý

| Status        | CTA                   |
| ------------- | --------------------- |
| Not submitted | `Nộp bài`             |
| Pending       | `Xem bài đã nộp`      |
| Approved      | `Xem kết quả`         |
| Rejected      | `Chỉnh sửa & nộp lại` |

---

# 7. `/submit-project` — Nộp project

## Mục tiêu

Học viên gửi project cuối khóa.

## Layout đề xuất

```text
Submit Project

[Project Requirement Summary]

[Submit Form]
- Project title
- Description
- Demo link
- Source link
- Notes

[Submit Button]
```

## Form cần có

| Field         | Bắt buộc       | Ghi chú                   |
| ------------- | -------------- | ------------------------- |
| Tên project   | Có             | Ngắn, rõ                  |
| Mô tả project | Có             | Mục tiêu, cách hoạt động  |
| Link demo     | Có             | Website/app/video demo    |
| Link source   | Không bắt buộc | GitHub/Drive nếu có       |
| Ghi chú       | Không          | Gửi thêm cho mentor/admin |

## Rule

| Trường hợp      | Cách xử lý             |
| --------------- | ---------------------- |
| Nộp lần đầu     | Status = `pending`     |
| Chưa approved   | Cho chỉnh sửa          |
| Đã approved     | Không cho sửa, chỉ xem |
| Rejected        | Cho sửa và nộp lại     |
| Thiếu demo link | Báo lỗi                |

---

# 8. `/my-certificates` — Chứng chỉ của tôi

## Mục tiêu

Học viên xem, tải và xác thực chứng chỉ.

## Layout đề xuất

```text
My Certificates

[Summary]
- Total certificates
- Valid certificates

[Certificate List]
[Certificate Card]
[Certificate Card]
```

## Certificate card cần có

| Thành phần     | Mô tả                    |
| -------------- | ------------------------ |
| Tên khóa       | Khóa đã hoàn thành       |
| Certificate ID | Mã chứng chỉ             |
| Ngày cấp       | Issued date              |
| Status         | Valid / Revoked          |
| Actions        | Tải PDF, verify, copy ID |

## Empty state

```text
Bạn chưa có chứng chỉ nào.
Hoàn thành khóa học và project để nhận Certificate of Completion.
```

---

# 9. `/profile` — Hồ sơ cá nhân

## Mục tiêu

Học viên quản lý thông tin cá nhân và tài khoản.

## Layout đề xuất

```text
Profile

[Profile Card]
- Avatar
- Name
- Email

[Personal Information Form]
[Learning Profile Form]
[Account Security]
```

## Các vùng cần có

| Vùng             | Nội dung                                   |
| ---------------- | ------------------------------------------ |
| Profile card     | Avatar, họ tên, email                      |
| Personal info    | Họ tên, phone/Zalo                         |
| Learning profile | Nhu cầu học, mức độ hiện tại, mục tiêu học |
| Account info     | Email, ngày tạo tài khoản                  |
| Security         | Đổi mật khẩu                               |

## Rule

| Field             | Cho sửa không           |
| ----------------- | ----------------------- |
| Họ tên            | Có                      |
| Avatar            | Có                      |
| Phone/Zalo        | Có                      |
| Learning interest | Có                      |
| Current level     | Có                      |
| Learning goal     | Có                      |
| Email             | Không nên cho sửa ở MVP |
| Role              | Không cho sửa           |

---

# 10. Điều hướng giữa các trang

## Flow học tập chính

```text
/dashboard
→ bấm Tiếp tục học
→ /learn/[course]/[lesson]
→ hoàn thành bài
→ bài tiếp theo
→ hoàn thành khóa
→ /assignments
→ /submit-project
→ project approved
→ /my-certificates
```

## Flow xem khóa

```text
/dashboard
→ /my-courses
→ /learn/[course]
→ /learn/[course]/[lesson]
```

## Flow project/certificate

```text
/assignments
→ /submit-project
→ admin duyệt
→ /my-certificates
→ /verify-certificate
```

---

# 11. Component dùng chung cho cụm Student Portal

| Component             | Dùng ở đâu                            |
| --------------------- | ------------------------------------- |
| StudentSidebar        | Tất cả trang student                  |
| TopBar                | Tất cả trang student                  |
| CourseCard            | Dashboard, My Courses                 |
| ProgressBar           | Dashboard, My Courses, Learn Course   |
| StatusBadge           | Project, certificate, course          |
| LessonList            | Learn Course, Lesson Page             |
| ModuleAccordion       | Learn Course                          |
| EmptyState            | My Courses, Certificates, Assignments |
| ResourceBox           | Lesson Page                           |
| CertificateCard       | My Certificates                       |
| ProjectSubmissionCard | Assignments                           |

---

# 12. Data chính cần cho cụm này

| Data              | Dùng ở trang                           |
| ----------------- | -------------------------------------- |
| `users`           | Dashboard, Profile                     |
| `courses`         | Dashboard, My Courses, Learn           |
| `enrollments`     | Dashboard, My Courses                  |
| `modules`         | Learn Course, Lesson Page              |
| `lessons`         | Learn Course, Lesson Page              |
| `lesson_progress` | Dashboard, Progress, Complete lesson   |
| `submissions`     | Dashboard, Assignments, Submit Project |
| `certificates`    | Dashboard, My Certificates             |

---