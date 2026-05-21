# `/learn/[course]` — Trang học của một khóa

## 1. Vai trò của trang

Trang này là **trang tổng quan bên trong một khóa học**.

Mục tiêu chính:

```text
Học viên vào /learn/[course] là biết:
1. Khóa này gồm những module nào
2. Mình đã học tới đâu
3. Bài nào đã hoàn thành
4. Bài nào đang học tiếp
5. Bài nào là video, resource, assignment hoặc final project
6. Bài nào bị khóa hoặc chưa mở
```

---

# 2. Layout tổng thể đề xuất

## Desktop layout

```text
┌────────────────────────────────────────────┐
│ Topbar                                     │
├──────────────┬─────────────────────────────┤
│ Sidebar      │ Course Learning Page         │
│              │                             │
│              │ [Course Header]              │
│              │                             │
│              │ [Module/Lesson List] [Info] │
│              │                             │
└──────────────┴─────────────────────────────┘
```

## Bố cục vùng nội dung

```text
[Course Header]
Tên khóa + mô tả + progress + nút Học tiếp

[Main Area]
Bên trái: Module accordion + lesson list
Bên phải: Course info panel
```

---

# 3. Các vùng chính trên trang

## A. Course Header

**Mục đích:** tóm tắt khóa học và đưa học viên vào bài tiếp theo.

| Thành phần   | Yêu cầu                                |
| ------------ | -------------------------------------- |
| Tên khóa     | Ví dụ: AI Agent & Vibe Coding Bootcamp |
| Mô tả ngắn   | 1–2 dòng về mục tiêu khóa              |
| Level badge  | Free / Starter / Core / Advanced       |
| Progress bar | % hoàn thành khóa                      |
| Lesson count | Ví dụ: 8/20 lessons completed          |
| CTA chính    | `Học tiếp bài gần nhất`                |

Ví dụ:

```text
AI Agent & Vibe Coding Bootcamp

Học cách xây website, AI assistant và workflow tự động bằng AI tools.

Progress: 40%
8/20 lessons completed

[Học tiếp bài gần nhất]
```

---

## B. Module List

**Mục đích:** hiển thị cấu trúc khóa học theo module.

Nên làm dạng **accordion**, không nên bung hết quá dài.

| Thành phần         | Yêu cầu                    |
| ------------------ | -------------------------- |
| Module title       | Tên module                 |
| Module description | Mô tả ngắn nếu có          |
| Lesson count       | Số bài trong module        |
| Module progress    | Ví dụ: 3/5 completed       |
| Accordion          | Bấm để mở danh sách lesson |

Ví dụ:

```text
Module 1: AI Workflow Foundation
3/5 lessons completed
[v] mở danh sách bài
```

---

## C. Lesson List

**Mục đích:** cho học viên thấy từng bài trong module, bao gồm bài giảng, tài liệu, bài tập và final project.

Mỗi lesson row nên có:

| Thành phần    | Yêu cầu                                                        |
| ------------- | -------------------------------------------------------------- |
| Lesson title  | Tên bài học                                                    |
| Duration      | Thời lượng nếu là video                                        |
| Type          | Video / Resource / Assignment / Final Project                  |
| Status icon   | Completed / Available / Locked / Pending / Rejected / Approved |
| Current state | Highlight bài đang học                                         |
| Click action  | Bấm vào bài để mở `/learn/[course]/[lesson]`                   |

Ví dụ lesson row:

```text
✓ 2.1 Tư duy Vibe Coding                    [Video]
✓ 2.2 Tạo landing page đầu tiên             [Video]
○ 2.3 Bài tập: Viết prompt tạo layout       [Assignment]
🔒 2.4 Chỉnh sửa UI bằng AI                  [Video]
○ 2.5 Final project: AI Landing Page         [Final Project]
```

---

## C1. Lesson Type

Mỗi item trong module có thể là một loại lesson khác nhau:

| Lesson type     | Ý nghĩa            | Hiển thị      |
| --------------- | ------------------ | ------------- |
| `video`         | Bài giảng video    | Icon play     |
| `resource`      | Tài liệu/tham khảo | Icon tài liệu |
| `assignment`    | Bài tập thực hành  | Icon bài tập  |
| `final_project` | Project cuối khóa  | Icon project  |

Assignment và final project nằm trực tiếp trong module accordion, **không tách thành trang riêng**.

---

## D. Lesson Status

| Trạng thái     | Cách hiển thị                                      |
| -------------- | -------------------------------------------------- |
| Completed      | Dấu check xanh, có thể xem lại                     |
| Available      | Dấu tròn hoặc play icon, có thể bấm vào học        |
| Current        | Highlight nhẹ, ghi “Current lesson”                |
| Locked         | Icon khóa, không bấm được hoặc hiện tooltip        |
| Preview        | Badge `Preview` nếu cho xem thử                    |
| Pending review | Assignment/final project đã nộp, đang chờ duyệt    |
| Rejected       | Assignment/final project bị trả lại, cần chỉnh sửa |
| Approved       | Assignment/final project đã được duyệt             |

---

## E. Course Info Panel

**Mục đích:** vùng bên phải để học viên theo dõi nhanh trạng thái khóa.

| Card                              | Nội dung                                 |
| --------------------------------- | ---------------------------------------- |
| Progress summary                  | % hoàn thành, số bài đã học              |
| Assignment / Final Project status | Chưa nộp / pending / approved / rejected |
| Certificate status                | Chưa đủ điều kiện / có thể tải           |
| Course resources                  | Link tài liệu chung của khóa             |
| Support CTA                       | Nút liên hệ hỗ trợ nếu cần               |

Ví dụ:

```text
Course Progress
40% completed
8/20 lessons

Assignment / Final Project
Not submitted

Certificate
Not eligible yet

[Download course resources]
```

---

# 4. Quy tắc locked lesson

Tùy khóa học, em có thể chọn 1 trong 2 mode.

## Mode 1: Học tự do

```text
Tất cả lesson đều available.
Học viên có thể học bài nào trước cũng được.
```

Phù hợp với:

| Khóa                   | Lý do               |
| ---------------------- | ------------------- |
| Free Workshop          | Nội dung ngắn       |
| Starter Mini Course    | Học nhẹ             |
| Resources-based course | Không cần ép thứ tự |

## Mode 2: Học theo thứ tự

```text
Bài sau chỉ mở khi bài trước hoàn thành.
Nếu bài trước là assignment/final_project, bài sau chỉ mở khi submission được approved.
```

Phù hợp với:

| Khóa                | Lý do                    |
| ------------------- | ------------------------ |
| Core Bootcamp       | Cần đi theo quy trình    |
| Advanced Automation | Nội dung phụ thuộc nhau  |
| Portfolio Coaching  | Cần hoàn thành từng bước |

---

# 5. CTA chính theo trạng thái

| Trường hợp                        | CTA                     |
| --------------------------------- | ----------------------- |
| Chưa học bài nào                  | `Bắt đầu khóa học`      |
| Đang học dở                       | `Học tiếp bài gần nhất` |
| Bài tiếp theo là video/resource   | `Học tiếp bài gần nhất` |
| Bài tiếp theo là assignment       | `Làm bài tập`           |
| Bài tiếp theo là final project    | `Nộp final project`     |
| Assignment/final project pending  | `Xem bài đã nộp`        |
| Assignment/final project rejected | `Chỉnh sửa bài nộp`     |
| Final project đã duyệt            | `Xem certificate`       |
| Khóa completed                    | `Xem lại khóa học`      |

---

# 6. Empty / Error State

## Nếu học viên chưa đăng ký khóa

```text
Bạn chưa có quyền truy cập khóa học này.

Vui lòng đăng ký khóa học hoặc liên hệ May Academy để được hỗ trợ.
[Xem khóa học] [Liên hệ hỗ trợ]
```

## Nếu khóa chưa có lesson

```text
Nội dung khóa học đang được cập nhật.

May Academy sẽ thông báo khi bài học sẵn sàng.
```

## Nếu khóa đã hết hạn

```text
Quyền truy cập khóa học của bạn đã hết hạn.

Vui lòng liên hệ May Academy để được hỗ trợ gia hạn.
```

---

# 7. Yêu cầu chức năng cụ thể

| Nhóm                              | Yêu cầu                                                    |
| --------------------------------- | ---------------------------------------------------------- |
| Auth                              | Chỉ user đã đăng nhập mới truy cập được                    |
| Enrollment check                  | Chỉ học viên đã enrolled khóa này mới xem được             |
| Course data                       | Lấy thông tin khóa từ `courses`                            |
| Module data                       | Lấy module từ `modules` theo course                        |
| Lesson data                       | Lấy lesson từ `lessons` theo module, bao gồm `lesson_type` |
| Progress                          | Tính progress từ `lesson_progress` và `submissions`        |
| Lesson click                      | Bấm lesson dẫn tới `/learn/[course]/[lesson]`              |
| Locked rule                       | Nếu bài bị khóa thì không cho truy cập                     |
| Continue button                   | Dẫn tới lesson chưa hoàn thành gần nhất                    |
| Assignment / Final Project status | Lấy từ `submissions`                                       |
| Certificate status                | Lấy từ `certificates`                                      |
| Responsive                        | Desktop 2 cột, mobile 1 cột                                |

---

# 8. Data cần dùng

| Bảng              | Dữ liệu cần lấy                                 |
| ----------------- | ----------------------------------------------- |
| `users`           | ID học viên hiện tại                            |
| `enrollments`     | Kiểm tra quyền học                              |
| `courses`         | Tên khóa, mô tả, level, thumbnail               |
| `modules`         | Danh sách module                                |
| `lessons`         | Danh sách bài học, `lesson_type`, thứ tự bài    |
| `lesson_progress` | Bài video/resource nào đã hoàn thành            |
| `submissions`     | Trạng thái bài nộp của assignment/final project |
| `certificates`    | Trạng thái chứng chỉ                            |

---

# 9. Logic chính

## Kiểm tra quyền truy cập

```text
Nếu user chưa login:
→ redirect /login

Nếu user chưa enrolled khóa này:
→ hiện access denied hoặc redirect /courses/[slug]

Nếu enrolled hợp lệ:
→ cho xem trang học
```

---

## Tính progress khóa

```text
total_required_lessons = tổng lesson bắt buộc của khóa

completed_lessons =
- video/resource lesson đã completed trong lesson_progress
- assignment/final_project đã approved trong submissions

progress = completed_lessons / total_required_lessons * 100
```

Với `assignment` và `final_project`, chỉ tính hoàn thành khi submission được `approved`.

---

## Xác định bài học tiếp theo

```text
Lấy lesson đầu tiên theo thứ tự chưa completed.

Nếu lesson_type = video/resource:
→ CTA là Học tiếp bài gần nhất

Nếu lesson_type = assignment:
→ CTA là Làm bài tập

Nếu lesson_type = final_project:
→ CTA là Nộp final project

Nếu không còn lesson chưa completed:
→ CTA chuyển sang Xem certificate hoặc Xem lại khóa học
```

---

## Xử lý locked lesson

```text
Nếu course.lock_mode = sequential:
→ lesson chỉ mở khi lesson trước completed

Nếu lesson trước là assignment/final_project:
→ lesson sau chỉ mở khi submission của lesson trước được approved

Nếu course.lock_mode = free:
→ tất cả lesson mở
```

---

# 10. UI style đề xuất

| Phần          | Gợi ý                                                             |
| ------------- | ----------------------------------------------------------------- |
| Course header | Card lớn, rõ progress và CTA                                      |
| Module list   | Accordion gọn, dễ scan                                            |
| Lesson row    | Đơn giản, có icon trạng thái                                      |
| Lesson type   | Có badge nhỏ để phân biệt video/resource/assignment/final project |
| Right panel   | Sticky nhẹ trên desktop                                           |
| Progress bar  | Rõ, dễ thấy                                                       |
| Badge         | Level, status, certificate                                        |
| Mobile        | Module list ưu tiên lên trước, info panel xuống dưới              |
| Animation     | Chỉ dùng accordion/hover nhẹ                                      |

---

# 11. Component cần có

| Component              | Mục đích                                                       |
| ---------------------- | -------------------------------------------------------------- |
| `StudentLayout`        | Sidebar + topbar                                               |
| `CourseLearningHeader` | Header khóa học                                                |
| `ModuleAccordion`      | Danh sách module                                               |
| `LessonRow`            | Từng bài học                                                   |
| `LessonTypeBadge`      | Video / Resource / Assignment / Final Project                  |
| `LessonStatusIcon`     | Completed / available / locked / pending / rejected / approved |
| `CourseInfoPanel`      | Progress, assignment/final project, certificate                |
| `ProgressBar`          | Tiến độ                                                        |
| `StatusBadge`          | Badge trạng thái                                               |
| `AccessDeniedState`    | Khi chưa enrolled                                              |
| `EmptyState`           | Khi chưa có lesson                                             |

---

# 12. Acceptance Criteria

Trang `/learn/[course]` đạt nếu:

| Tiêu chí                                                           | Đạt / Không |
| ------------------------------------------------------------------ | ----------- |
| User chưa login bị chuyển về login                                 |             |
| User chưa enrolled không xem được khóa                             |             |
| Hiển thị đúng tên khóa và mô tả                                    |             |
| Hiển thị đúng module và lesson                                     |             |
| Lesson hiển thị đúng type: video/resource/assignment/final_project |             |
| Lesson completed có dấu check                                      |             |
| Lesson locked có icon khóa                                         |             |
| Assignment/final project pending/rejected/approved hiển thị đúng   |             |
| Progress tính đúng theo lesson completed và submission approved    |             |
| Nút `Học tiếp bài gần nhất` dẫn đúng lesson                        |             |
| Assignment/final project status hiển thị đúng                      |             |
| Certificate status hiển thị đúng                                   |             |
| Responsive tốt trên mobile                                         |             |

---

# 13. Chốt scope `/learn/[course]`

```text
/learn/[course] cần có:

1. Student layout chung
2. Course header
3. Progress tổng khóa
4. CTA học tiếp bài gần nhất
5. Module accordion
6. Lesson list có status
7. Lesson type: video/resource/assignment/final_project
8. Locked lesson nếu học theo thứ tự
9. Course info panel
10. Assignment/final project status
11. Certificate status
12. Empty/access denied state
```

Nói ngắn gọn: **`/learn/[course]` là bản đồ của một khóa học. Học viên phải nhìn được toàn bộ module, biết bài nào là video, bài nào là assignment/final project, biết mình đang ở đâu và học tiếp bài nào.**
