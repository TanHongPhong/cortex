# `/my-courses` — Khóa học của tôi

**Status:** MVP
**Owner area:** Student
**Source of truth:** `plan/requirement/page_function_matrix.md`, `plan/requirement/unified_database_schema.md`
**Build decision:** Build

## 1. Vai trò của trang

Trang này là nơi học viên quản lý toàn bộ khóa học mình đang có quyền truy cập.

Mục tiêu chính:

```text
Học viên vào /my-courses là biết:
1. Mình đã đăng ký những khóa nào
2. Khóa nào đang học
3. Khóa nào đã hoàn thành
4. Tiến độ từng khóa bao nhiêu %
5. Bấm vào đâu để học tiếp
```

---

# 2. Layout tổng thể đề xuất

## Desktop layout

```text
┌────────────────────────────────────────────┐
│ Topbar                                     │
├──────────────┬─────────────────────────────┤
│ Sidebar      │ My Courses                   │
│              │                             │
│              │ [Summary Cards]              │
│              │                             │
│              │ [Course Card] [Course Card]  │
│              │ [Course Card] [Course Card]  │
└──────────────┴─────────────────────────────┘
```

## Mobile layout

```text
Topbar
Page title
Summary cards
Course card 1
Course card 2
Course card 3
Bottom nav / hamburger menu
```

---

# 3. Các vùng chính trên trang

## A. Page Header

**Mục đích:** cho học viên biết đây là danh sách khóa học của mình.

| Thành phần | Yêu cầu                                                     |
| ---------- | ----------------------------------------------------------- |
| Title      | `Khóa học của tôi`                                          |
| Subtitle   | “Theo dõi tiến độ và tiếp tục các khóa học bạn đã đăng ký.” |
| CTA phụ    | `Khám phá thêm khóa học` dẫn về `/courses`                  |

Ví dụ:

```text
Khóa học của tôi

Theo dõi tiến độ học tập và tiếp tục các khóa học của bạn tại CORTEX.
```

---

## B. Summary Cards

**Mục đích:** cho học viên nhìn nhanh tình trạng học tập.

| Card          | Nội dung                |
| ------------- | ----------------------- |
| Total courses | Tổng số khóa đã đăng ký |
| In progress   | Số khóa đang học        |
| Completed     | Số khóa đã hoàn thành   |
| Certificates  | Số chứng chỉ đã nhận    |

Ví dụ:

```text
Total Courses: 3
In Progress: 2
Completed: 1
Certificates: 1
```

**Giai đoạn MVP:** có thể chỉ cần 3 card: `Total Courses`, `In Progress`, `Completed`.

---

## C. Course List / Course Grid

**Mục đích:** hiển thị tất cả khóa học viên đã enrolled.

Mỗi khóa nên hiển thị dưới dạng **course card**.

| Thành phần trên card | Yêu cầu                          |
| -------------------- | -------------------------------- |
| Thumbnail            | Ảnh khóa học                     |
| Course name          | Tên khóa                         |
| Level badge          | Free / Starter / Core / Advanced |
| Status badge         | Active / Completed / Expired     |
| Progress bar         | % hoàn thành                     |
| Lesson count         | Ví dụ: 8/20 lessons completed    |
| Last activity        | Lần học gần nhất, nếu có         |
| Next lesson          | Bài tiếp theo, nếu có            |
| CTA chính            | `Vào học` hoặc `Tiếp tục học`    |

---

# 4. Course Card nên làm như nào

## Card cho khóa đang học

```text
AI Agent & Vibe Coding Bootcamp
Core Program · Active

Progress: 45%
9/20 lessons completed

Next lesson:
Build your first AI landing [[requirement/page|page]]

[Tiếp tục học]
```

## Card cho khóa đã hoàn thành

```text
Prompting + AI Tools Mini Course
Starter · Completed

Progress: 100%
Certificate available

[Xem lại khóa học] [Xem chứng chỉ]
```

## Card cho khóa hết hạn nếu có

```text
Advanced AI Agent Automation
Advanced · Expired

Access expired
[Liên hệ hỗ trợ: /contact?type=support]
```

---

# 5. Trạng thái khóa học

| Status    | Ý nghĩa                            | CTA                |
| --------- | ---------------------------------- | ------------------ |
| Active    | Đang học                           | `Tiếp tục học`     |
| Completed | Đã hoàn thành                      | `Xem lại khóa học` |
| Expired   | Hết quyền truy cập nếu có giới hạn | `/contact?type=support` |
| Pending   | Đang chờ kích hoạt/thanh toán      | `Xem trạng thái`   |

**MVP có thể chỉ cần:** `Active` và `Completed`.

---

# 6. Quy tắc hiển thị

| Trường hợp             | Cách xử lý                                      |
| ---------------------- | ----------------------------------------------- |
| Học viên chưa có khóa  | Hiển thị empty state + nút `Xem khóa học`       |
| Học viên có nhiều khóa | Sắp xếp khóa đang học lên trước                 |
| Khóa completed         | Đưa sau khóa active                             |
| Khóa expired           | Đưa cuối danh sách                              |
| Khóa chưa enrolled     | Không được hiển thị                             |
| Khóa bị [[requirement/page/admin/admin|admin]] hủy/refund | Hiển thị `cancelled` nếu cần lịch sử học; không cho vào lesson |

---

# 7. Empty State

Nếu học viên chưa đăng ký khóa nào:

```text
Bạn chưa có khóa học nào.

Khám phá các khóa học AI tại CORTEX để bắt đầu lộ trình học của bạn.
[Xem khóa học]
```

Có thể thêm mascot nhỏ để trang không bị trống.

---

# 8. Yêu cầu chức năng cụ thể

| Nhóm        | Yêu cầu                                       |
| ----------- | --------------------------------------------- |
| Auth        | Chỉ user đã đăng nhập mới truy cập được       |
| Data access | Chỉ lấy khóa mà user đã enrolled              |
| Course list | Hiển thị toàn bộ khóa đã đăng ký              |
| Progress    | Tính % hoàn thành từng khóa                   |
| Status      | Hiển thị trạng thái active/completed/expired  |
| CTA         | Bấm `Tiếp tục học` dẫn tới bài học tiếp theo  |
| Detail link | Bấm vào card có thể dẫn tới `/learn/[course]` |
| Empty state | Có trạng thái khi chưa có khóa                |
| Responsive  | Desktop dạng grid, mobile dạng list 1 cột     |

---

# 9. Data cần dùng

| Bảng              | Dữ liệu cần lấy                      |
| ----------------- | ------------------------------------ |
| `users`           | ID học viên                          |
| `enrollments`     | Danh sách khóa học viên đã đăng ký   |
| `courses`         | Tên khóa, thumbnail, level, slug     |
| `lessons`         | Tổng số bài trong khóa               |
| `lesson_progress` | Số bài đã hoàn thành                 |
| `certificates`    | Kiểm tra khóa đã có [[requirement/page/website/certificate|certificate]] chưa |

---

# 10. Logic chính

## Lấy danh sách khóa

```text
Lấy tất cả enrollments của user hiện tại
→ join với courses
→ chỉ hiển thị course có enrollment hợp lệ
```

## Tính progress

```text
progress = số lesson đã completed / tổng lesson của khóa * 100
```

## Chọn CTA

```text
Nếu status = active:
→ CTA = Tiếp tục học

Nếu status = completed:
→ CTA = Xem lại khóa học hoặc Xem chứng chỉ

Nếu status = expired:
→ CTA = /contact?type=support
```

## Sắp xếp khóa

```text
1. Active
2. Pending nếu có
3. Completed
4. Expired
```

---

# 11. UI style đề xuất

| Phần         | Gợi ý                              |
| ------------ | ---------------------------------- |
| Layout       | Grid 2–3 cột trên desktop          |
| Card         | Bo góc lớn, shadow nhẹ, rõ tiến độ |
| Badge        | Status và level nên nhìn rõ        |
| Progress bar | Nên nổi bật, dễ đọc                |
| CTA          | Nút chính đặt cuối card            |
| Empty state  | Có mascot nhỏ + CTA về `/courses`  |
| Mobile       | Card full-width, thông tin xếp dọc |

---

# 12. Component cần có

| Component                | Dùng để làm gì                  |
| ------------------------ | ------------------------------- |
| `StudentLayout`          | Sidebar + topbar                |
| `MyCoursesHeader`        | Title + subtitle                |
| `CourseSummaryCards`     | Tổng khóa, đang học, hoàn thành |
| `StudentCourseCard`      | Card từng khóa                  |
| `ProgressBar`            | Hiển thị %                      |
| `StatusBadge`            | Active/completed/expired        |
| `EmptyState`             | Khi chưa có khóa                |
| `ContinueLearningButton` | Dẫn tới bài tiếp theo           |

---

# 13. Acceptance Criteria

Trang `/my-courses` đạt nếu:

| Tiêu chí                                  | Đạt / Không |
| ----------------------------------------- | ----------- |
| Chỉ học viên đăng nhập mới vào được       |             |
| Chỉ hiển thị khóa đã enrolled             |             |
| Có summary tổng quan khóa học             |             |
| Mỗi khóa có tên, level, status, progress  |             |
| Progress từng khóa tính đúng              |             |
| Nút `Tiếp tục học` dẫn đúng bài tiếp theo |             |
| Có empty state nếu chưa có khóa           |             |
| Responsive tốt trên mobile                |             |

---

---

## 🗺️ Obsidian Meta

### Tags
- #cortex/page/student
- #cortex/plan
- #cortex/requirement

### Navigation
- **Breadcrumbs:** [[CORTEX_PLAN_MOC|Plan Home]] / [[requirement/page|Requirements]] / [[requirement/page/student/dashboard|Student Portal]]

### Relations
- **Outgoing Links:** [[requirement/page|1. Public Website — phần người ngoài nhìn thấy]], [[requirement/page/admin/admin|Admin Dashboard — Requirement]], [[requirement/page/website/certificate|/certificate — Trang chứng chỉ]]
- **Incoming Links (Backlinks):** [[requirement/architecture|Architecture — Kiến trúc kỹ thuật CORTEX]]
