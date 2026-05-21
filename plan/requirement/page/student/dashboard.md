# `/dashboard` — Trang tổng quan học viên

## 1. Vai trò của trang

Dashboard là **màn hình trung tâm** sau khi học viên đăng nhập.

Mục tiêu chính:

```text
Học viên vào dashboard là biết ngay:
1. Mình đang học khóa nào
2. Đã học được bao nhiêu %
3. Bài tiếp theo là gì
4. Assignment/final project đang ở trạng thái nào
5. Certificate đã đủ điều kiện chưa
```

---

# 2. Layout tổng thể đề xuất

## Desktop layout

```text
┌────────────────────────────────────────────┐
│ Topbar: Logo / Notification / User avatar  │
├──────────────┬─────────────────────────────┤
│ Sidebar      │ Dashboard Content            │
│              │                             │
│ Dashboard    │ [Welcome + Continue Button] │
│ My Courses   │                             │
│ Certificates │ [Current Course] [Progress] │
│ Profile      │ [Next Lesson]    [Assignment/Project] │
│              │ [Certificate]    [My Courses]│
└──────────────┴─────────────────────────────┘
```

## Mobile layout

```text
Topbar
Welcome card
Current course
Progress
Next lesson
Assignment / Final project status
Certificate status
My courses preview
Bottom navigation / hamburger menu
```

---

# 3. Các vùng chính trên trang

## A. Welcome Card

**Mục đích:** tạo cảm giác cá nhân hóa và đưa học viên vào hành động học tiếp.

| Thành phần | Yêu cầu                           |
| ---------- | --------------------------------- |
| Greeting   | “Chào mừng trở lại, [Tên] 👋”     |
| Subtitle   | Một câu ngắn nhắc học tiếp        |
| CTA chính  | `Tiếp tục học`                    |
| Visual     | Mascot nhỏ hoặc icon AI/Rubik nhẹ |

Ví dụ nội dung:

```text
Chào mừng trở lại, Trí 👋
Tiếp tục khóa học AI của bạn hôm nay.
```

**Rule CTA:**

Nút `Tiếp tục học` dẫn đến lesson chưa hoàn thành gần nhất:

```text
/learn/[course]/[lesson]
```

Lesson này có thể là:

```text
video / resource / assignment / final_project
```

---

## B. Current Course Card

**Mục đích:** cho học viên biết khóa đang học chính.

| Thành phần    | Yêu cầu                                |
| ------------- | -------------------------------------- |
| Thumbnail     | Ảnh khóa học                           |
| Tên khóa      | Ví dụ: AI Agent & Vibe Coding Bootcamp |
| Level badge   | Free / Starter / Core / Advanced       |
| Status        | Active / Completed / Expired           |
| Progress mini | % hoàn thành                           |
| CTA           | `Vào khóa học`                         |

**Logic hiển thị:**

| Trường hợp    | Cách xử lý                            |
| ------------- | ------------------------------------- |
| Có 1 khóa     | Hiển thị khóa đó                      |
| Có nhiều khóa | Hiển thị khóa học gần đây nhất        |
| Không có khóa | Hiện empty state + nút `Xem khóa học` |

---

## C. Progress Card

**Mục đích:** hiển thị tiến độ học rõ ràng.

| Thành phần      | Yêu cầu                              |
| --------------- | ------------------------------------ |
| Progress bar    | % hoàn thành khóa                    |
| Lesson count    | Ví dụ: 8/20 bài đã học               |
| Module hiện tại | Ví dụ: Module 2 — Vibe Coding Basics |
| Text trạng thái | “Bạn đang đi được 40% khóa học”      |

Ví dụ:

```text
Tiến độ học tập
40% completed
8/20 lessons done
Current module: Vibe Coding Basics
```

**Cách tính progress:**

```text
Số lesson đã hoàn thành / Tổng số lesson bắt buộc của khóa * 100
```

Với `assignment` hoặc `final_project`, chỉ tính hoàn thành khi bài nộp đã được `approved`.

---

## D. Next Lesson Card

**Mục đích:** giúp học viên không phải suy nghĩ “học tiếp ở đâu”.

| Thành phần        | Yêu cầu                                       |
| ----------------- | --------------------------------------------- |
| Tên bài tiếp theo | Lấy lesson chưa hoàn thành gần nhất           |
| Lesson type       | Video / Resource / Assignment / Final Project |
| Thuộc module nào  | Module name                                   |
| Thời lượng        | Nếu có                                        |
| CTA               | `Học bài tiếp theo` hoặc `Xem bài tập`        |

Ví dụ với video lesson:

```text
Bài học tiếp theo
Build your first AI landing page
Module 2 — Vibe Coding Basics
[Học bài tiếp theo]
```

Ví dụ với assignment lesson:

```text
Bài tiếp theo
Bài tập: Viết prompt tạo landing page
Module 2 — Vibe Coding Basics
[Xem bài tập]
```

**Rule:**

Nếu học viên đã hoàn thành hết video/resource lesson nhưng còn assignment hoặc final project chưa hoàn thành, card chuyển thành:

```text
Bạn đã hoàn thành phần bài học.
Tiếp theo: Hoàn thành bài tập/project trong khóa.
[Xem bài tập]
```

Nếu tất cả lesson, assignment và final project đều hoàn thành:

```text
Bạn đã hoàn thành khóa học.
Tiếp theo: Kiểm tra trạng thái chứng chỉ.
[Xem chứng chỉ]
```

CTA luôn dẫn trực tiếp đến lesson tương ứng:

```text
/learn/[course]/[lesson]
```

Không dẫn sang:

```text
/assignments
/submit-project
```

---

## E. Assignment / Final Project Status Card

**Mục đích:** theo dõi trạng thái bài tập hoặc project cuối khóa gần nhất.

| Status        | Nội dung hiển thị            | CTA                                   |
| ------------- | ---------------------------- | ------------------------------------- |
| Not submitted | Bạn chưa nộp bài tập/project | `Nộp bài`                             |
| Pending       | Bài nộp đang chờ duyệt       | `Xem bài đã nộp`                      |
| Approved      | Bài nộp đã được duyệt        | `Tiếp tục học` hoặc `Xem certificate` |
| Rejected      | Bài nộp cần chỉnh sửa        | `Chỉnh sửa bài nộp`                   |

CTA sẽ dẫn trực tiếp đến lesson dạng `assignment` hoặc `final_project`:

```text
/learn/[course]/[lesson]
```

**Nếu rejected:** hiển thị feedback ngắn từ admin.

Ví dụ:

```text
Assignment status: Cần chỉnh sửa
Feedback: Demo link chưa hoạt động, vui lòng cập nhật lại.
[Chỉnh sửa bài nộp]
```

---

## F. Certificate Status Card

**Mục đích:** cho học viên biết khi nào nhận được chứng chỉ.

| Status       | Hiển thị                           | CTA               |
| ------------ | ---------------------------------- | ----------------- |
| Not eligible | Chưa đủ điều kiện nhận certificate | `Xem điều kiện`   |
| Eligible     | Đủ điều kiện, chờ cấp certificate  | `Xem trạng thái`  |
| Issued       | Certificate đã được cấp            | `Tải certificate` |
| Revoked      | Certificate không còn hiệu lực     | `Liên hệ hỗ trợ`  |

Nếu đã cấp:

```text
Certificate of Completion
ID: MAY-AI-2026-0001
[Download PDF] [Verify]
```

**Điều kiện certificate:**
Học viên phải hoàn thành các lesson bắt buộc và final project phải được `approved`.

---

## G. My Courses Preview

**Mục đích:** cho học viên xem nhanh các khóa đã đăng ký.

| Thành phần | Yêu cầu               |
| ---------- | --------------------- |
| Hiển thị   | 2–3 khóa gần nhất     |
| Mỗi khóa   | Tên, progress, status |
| CTA        | `Xem tất cả khóa học` |

Dẫn đến:

```text
/my-courses
```

---

# 4. Empty State quan trọng

## Khi học viên chưa đăng ký khóa nào

```text
Bạn chưa có khóa học nào.

Khám phá các khóa học AI tại May Academy để bắt đầu lộ trình học của bạn.
[Xem khóa học]
```

## Khi chưa có assignment/final project cần làm

```text
Bạn chưa có bài tập hoặc project cần nộp ở thời điểm này.
Hãy tiếp tục học các bài tiếp theo trong khóa.
[Tiếp tục học]
```

## Khi chưa có certificate

```text
Bạn chưa có chứng chỉ nào.
Hoàn thành bài học và final project để nhận Certificate of Completion.
```

---

# 5. Component cần thiết

| Component                     | Dùng để làm gì                      |
| ----------------------------- | ----------------------------------- |
| `StudentLayout`               | Khung sidebar + topbar              |
| `WelcomeCard`                 | Lời chào + CTA học tiếp             |
| `CurrentCourseCard`           | Khóa học gần nhất                   |
| `ProgressCard`                | Tiến độ học                         |
| `NextLessonCard`              | Bài học tiếp theo                   |
| `AssignmentProjectStatusCard` | Trạng thái assignment/final project |
| `CertificateStatusCard`       | Trạng thái chứng chỉ                |
| `MyCoursesPreview`            | Danh sách khóa rút gọn              |
| `EmptyState`                  | Khi chưa có dữ liệu                 |
| `StatusBadge`                 | Active, pending, approved, rejected |
| `ProgressBar`                 | Hiển thị % hoàn thành               |

---

# 6. Data cần dùng

| Bảng              | Dùng để lấy gì                                  |
| ----------------- | ----------------------------------------------- |
| `users`           | Tên học viên, avatar                            |
| `enrollments`     | Khóa học viên đã đăng ký                        |
| `courses`         | Tên khóa, thumbnail, level                      |
| `modules`         | Module hiện tại                                 |
| `lessons`         | Tổng lesson, bài tiếp theo, lesson type         |
| `lesson_progress` | Lesson đã hoàn thành                            |
| `submissions`     | Trạng thái bài nộp của assignment/final project |
| `certificates`    | Certificate ID, trạng thái, link PDF            |

---

# 7. Logic chính của dashboard

## Logic chọn current course

```text
Nếu học viên có khóa active:
→ chọn khóa có hoạt động gần nhất

Nếu không có khóa active nhưng có khóa completed:
→ hiển thị khóa hoàn thành gần nhất

Nếu không có khóa nào:
→ hiển thị empty state
```

---

## Logic chọn next lesson

```text
Lấy lesson đầu tiên trong khóa mà học viên chưa completed.

Nếu lesson_type = video/resource:
→ CTA dẫn đến bài học đó.

Nếu lesson_type = assignment/final_project:
→ CTA dẫn đến bài tập/project đó.

Nếu tất cả lesson đã completed:
→ chuyển CTA sang /my-certificates hoặc trạng thái certificate.
```

---

## Logic assignment/final project

```text
Nếu assignment/final_project chưa nộp:
→ Not submitted

Nếu đã nộp nhưng chưa duyệt:
→ Pending

Nếu bị trả lại:
→ Rejected + hiển thị feedback

Nếu đã duyệt:
→ Approved
```

---

## Logic certificate

```text
Nếu chưa hoàn thành các lesson bắt buộc:
→ Not eligible

Nếu còn assignment bắt buộc chưa approved:
→ Not eligible

Nếu final_project chưa nộp:
→ Not eligible

Nếu final_project pending:
→ Waiting for approval

Nếu final_project approved nhưng chưa cấp certificate:
→ Eligible

Nếu certificate đã cấp:
→ Issued
```

---

## Rule mới cho assignment/final project

```text
Assignment và final project không có trang riêng.

Không dùng:
- /assignments
- /submit-project

Tất cả bài tập/project sẽ mở trực tiếp tại:
- /learn/[course]/[lesson]

Trong đó:
- lesson_type = assignment → bài tập thực hành
- lesson_type = final_project → project cuối khóa
```

---

# 8. UI style đề xuất

| Phần          | Style                                                |
| ------------- | ---------------------------------------------------- |
| Nền dashboard | Xám rất nhạt hoặc trắng                              |
| Card          | Bo góc lớn, shadow nhẹ                               |
| CTA chính     | Gradient xanh/cyan/tím theo brand                    |
| Status badge  | Màu nhẹ, dễ phân biệt                                |
| Progress bar  | Rõ, không quá nhỏ                                    |
| Icon          | Dùng icon đơn giản: book, check, certificate, rocket |
| Mascot        | Chỉ dùng nhẹ ở welcome/empty state, không làm rối    |

---

# 9. Thứ tự ưu tiên hiển thị

Trên màn hình đầu tiên, học viên phải thấy ngay:

```text
1. Welcome + Tiếp tục học
2. Current course
3. Progress
4. Next lesson
```

Các phần assignment/final project, certificate, my courses có thể nằm bên dưới nhưng vẫn trong dashboard, không cần cuộn quá dài.

---

# 10. Acceptance Criteria

Trang `/dashboard` đạt nếu:

| Tiêu chí                                                         | Đạt / Không |
| ---------------------------------------------------------------- | ----------- |
| Học viên đăng nhập mới vào được                                  |             |
| Admin không bị dẫn nhầm vào dashboard học viên                   |             |
| Hiển thị đúng tên học viên                                       |             |
| Hiển thị đúng khóa đang học gần nhất                             |             |
| Tính đúng % tiến độ học                                          |             |
| Nút `Tiếp tục học` dẫn đúng bài tiếp theo                        |             |
| Hiển thị đúng trạng thái assignment/final project                |             |
| Hiển thị đúng trạng thái certificate                             |             |
| CTA bài tập/project dẫn đến `/learn/[course]/[lesson]` tương ứng |             |
| Có empty state nếu chưa có khóa                                  |             |
| Responsive tốt trên mobile                                       |             |

---

# 11. Chốt scope `/dashboard`

```text
/dashboard cần có:

1. Student layout chung
2. Welcome card
3. Current course card
4. Progress card
5. Next lesson card
6. Assignment / Final Project Status Card
7. Certificate status card
8. My courses preview
9. Empty state
```

Nói ngắn gọn: **dashboard là trang “hôm nay tôi cần học gì tiếp?”. Vì vậy thiết kế phải ưu tiên current course, progress và next lesson. Assignment/final project chỉ là trạng thái theo dõi và sẽ dẫn thẳng vào lesson tương ứng trong khóa học.**
