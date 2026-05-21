# `/admin/submissions` — Duyệt bài nộp

## 1. Mục tiêu trang

Admin dùng trang này để:

```text
1. Xem tất cả bài nộp của học viên
2. Duyệt assignment trong module
3. Duyệt final project cuối khóa
4. Xem link demo, source, nội dung nộp
5. Viết feedback cho học viên
6. Approve hoặc reject bài nộp
7. Quyết định bài học/project có được tính hoàn thành hay không
```

Trang này rất quan trọng vì ảnh hưởng trực tiếp đến:

```text
lesson progress
course completion
certificate eligibility
```

---

# 2. Layout đề xuất

```text
/admin/submissions

[Page Header]
- Title: Duyệt bài nộp
- Subtitle: Quản lý assignment và final project của học viên

[Submission Summary]
- Pending
- Approved
- Rejected
- Final projects pending

[Submission Table]
- Danh sách bài nộp

[Submission Detail Drawer]
- Thông tin học viên
- Nội dung bài nộp
- Link demo/source
- Feedback
- Approve / Reject
```

---

# 3. Các vùng chính trên trang

## A. Page Header

| Thành phần | Yêu cầu                                                         |
| ---------- | --------------------------------------------------------------- |
| Title      | `Duyệt bài nộp`                                                 |
| Subtitle   | “Xem, phản hồi và duyệt assignment/final project của học viên.” |
| CTA phụ    | `Xem học viên` dẫn đến `/admin/students`                        |

---

## B. Submission Summary Cards

| Card                   | Nội dung                     |
| ---------------------- | ---------------------------- |
| Pending submissions    | Bài đang chờ duyệt           |
| Approved submissions   | Bài đã duyệt                 |
| Rejected submissions   | Bài bị trả lại               |
| Final projects pending | Final project đang chờ duyệt |

MVP nên có:

```text
Pending
Approved
Rejected
```

---

# 4. Submission Table

## Cột nên có

| Cột          | Nội dung                      |
| ------------ | ----------------------------- |
| Student      | Tên học viên                  |
| Course       | Khóa học                      |
| Lesson       | Tên assignment/final project  |
| Type         | assignment / final_project    |
| Status       | pending / approved / rejected |
| Submitted at | Ngày nộp                      |
| Reviewed at  | Ngày duyệt nếu có             |
| Actions      | Review / View                 |

---

## Ví dụ row

```text
Phạm Đức Trí
Course: AI Agent & Vibe Coding Bootcamp
Lesson: Final Project — AI Landing Page
Type: final_project
Status: Pending
Submitted at: 21/05/2026

[Review]
```

---

# 5. Search / Filter

Trang này nên có filter vì bài nộp có thể tăng nhanh.

| Bộ lọc        | Mục đích                      |
| ------------- | ----------------------------- |
| Search        | Tìm theo tên học viên/email   |
| Status filter | pending / approved / rejected |
| Type filter   | assignment / final_project    |
| Course filter | Lọc theo khóa học             |

MVP có thể chỉ cần:

```text
Status filter + Type filter
```

Ưu tiên mặc định:

```text
Hiển thị pending submissions trước.
```

---

# 6. Submission Detail Drawer

Khi admin bấm `Review`, mở drawer hoặc modal chi tiết.

## Các phần trong detail

```text
Submission Detail

[Student Info]
[Course & Lesson Info]
[Submission Content]
[Submitted Links]
[Review Status]
[Feedback Box]
[Approve / Reject Actions]
```

---

## A. Student Info

| Field            | Nội dung             |
| ---------------- | -------------------- |
| Full name        | Họ tên học viên      |
| Email            | Email                |
| Phone/Zalo       | Thông tin liên hệ    |
| Current progress | Tiến độ khóa nếu cần |

---

## B. Course & Lesson Info

| Field                   | Nội dung                     |
| ----------------------- | ---------------------------- |
| Course                  | Tên khóa                     |
| Module                  | Module chứa lesson           |
| Lesson                  | Assignment/final project nào |
| Type                    | assignment / final_project   |
| Required for completion | true / false                 |

---

## C. Submission Content

| Field           | Nội dung                         |
| --------------- | -------------------------------- |
| Submission text | Nội dung học viên nộp            |
| Project title   | Nếu là final project             |
| Tools used      | Công cụ đã dùng                  |
| Reflection      | Học viên học được gì/khó khăn gì |
| Note            | Ghi chú thêm nếu có              |

---

## D. Submitted Links

| Link       | Yêu cầu                          |
| ---------- | -------------------------------- |
| Demo URL   | Link sản phẩm/video demo         |
| Source URL | GitHub/Drive/Figma/Notion nếu có |
| File URL   | Nếu có upload file sau này       |

Admin cần mở được link trong tab mới.

---

# 7. Feedback Box

Admin dùng để phản hồi bài nộp.

| Field           | Yêu cầu               |
| --------------- | --------------------- |
| Feedback text   | Nhận xét cho học viên |
| Review decision | approve / reject      |
| Reviewed by     | Admin duyệt           |
| Reviewed at     | Thời gian duyệt       |

Ví dụ feedback khi reject:

```text
Demo link chưa hoạt động. Em cần cập nhật lại link demo và bổ sung phần mô tả cách project vận hành.
```

Ví dụ feedback khi approve:

```text
Project đạt yêu cầu. Ý tưởng rõ, demo hoạt động và có ứng dụng AI đúng trọng tâm.
```

---

# 8. Actions duyệt bài

| Action             | Chức năng                     |
| ------------------ | ----------------------------- |
| `Approve`          | Duyệt bài nộp                 |
| `Reject`           | Trả bài để học viên chỉnh sửa |
| `Request revision` | Có thể dùng chung với reject  |
| `Open demo`        | Mở link demo                  |
| `View student`     | Xem học viên                  |
| `View course`      | Xem khóa học liên quan        |

---

# 9. Submission Status

| Status     | Ý nghĩa         | Ảnh hưởng                   |
| ---------- | --------------- | --------------------------- |
| `pending`  | Chờ admin duyệt | Chưa tính hoàn thành        |
| `approved` | Đã duyệt        | Lesson được tính hoàn thành |
| `rejected` | Cần sửa         | Học viên được nộp lại       |

---

# 10. Rule quan trọng

| Trường hợp                  | Cách xử lý                                |
| --------------------------- | ----------------------------------------- |
| Bài mới nộp                 | Status mặc định `pending`                 |
| Admin approve assignment    | Lesson assignment được tính completed     |
| Admin approve final project | Final project được tính completed         |
| Final project approved      | Học viên có thể đủ điều kiện certificate  |
| Admin reject                | Phải có feedback                          |
| Rejected submission         | Học viên được sửa và nộp lại              |
| Approved submission         | Không nên cho học viên sửa nữa            |
| Submission đã approved      | Nếu muốn đổi lại rejected, cần confirm rõ |

---

# 11. Điều kiện approve

## Với assignment

Admin kiểm tra:

```text
1. Bài làm đúng yêu cầu
2. Có nội dung nộp rõ ràng
3. Link/file nếu có mở được
4. Đạt tiêu chí rubric
```

## Với final project

Admin kiểm tra:

```text
1. Có tên project rõ ràng
2. Có mô tả project
3. Có demo link hoạt động
4. Có ứng dụng AI/tool/automation rõ
5. Có reflection hoặc mô tả quá trình làm
6. Không copy nguyên mẫu của người khác
```

---

# 12. Yêu cầu chức năng cụ thể

| Nhóm                 | Yêu cầu                                                   |
| -------------------- | --------------------------------------------------------- |
| Auth                 | Chỉ admin mới vào được                                    |
| Submission list      | Hiển thị danh sách bài nộp                                |
| Default view         | Mặc định ưu tiên bài pending                              |
| Filter               | Lọc theo status, type, course                             |
| Submission detail    | Xem đầy đủ nội dung bài nộp                               |
| Link opening         | Mở demo/source trong tab mới                              |
| Feedback             | Admin viết feedback                                       |
| Approve              | Chuyển status sang approved                               |
| Reject               | Chuyển status sang rejected và yêu cầu feedback           |
| Completion sync      | Submission approved thì lesson được tính hoàn thành       |
| Certificate relation | Final project approved thì kiểm tra điều kiện certificate |
| Safety               | Đổi trạng thái approved/rejected cần confirm              |
| Responsive           | Ưu tiên desktop, mobile xem được                          |

---

# 13. Data cần dùng

| Bảng              | Dữ liệu                            |
| ----------------- | ---------------------------------- |
| `submissions`     | Bài nộp                            |
| `users`           | Thông tin học viên                 |
| `courses`         | Khóa học                           |
| `modules`         | Module chứa lesson                 |
| `lessons`         | Assignment/final project lesson    |
| `lesson_progress` | Có thể sync trạng thái hoàn thành  |
| `certificates`    | Kiểm tra điều kiện cấp certificate |
| `enrollments`     | Kiểm tra khóa học của học viên     |

---

# 14. Cấu trúc dữ liệu `submissions`

| Field             | Mục đích                         |
| ----------------- | -------------------------------- |
| `id`              | ID bài nộp                       |
| `user_id`         | Học viên                         |
| `course_id`       | Khóa học                         |
| `lesson_id`       | Assignment/final project lesson  |
| `submission_type` | assignment / final_project       |
| `submission_text` | Nội dung nộp                     |
| `project_title`   | Tên project nếu là final project |
| `demo_url`        | Link demo                        |
| `source_url`      | Link source/file                 |
| `tools_used`      | Công cụ đã dùng                  |
| `reflection`      | Học viên tự đánh giá/học được gì |
| `status`          | pending / approved / rejected    |
| `feedback`        | Nhận xét admin                   |
| `submitted_at`    | Ngày nộp                         |
| `reviewed_at`     | Ngày duyệt                       |
| `reviewed_by`     | Admin duyệt                      |

---

# 15. Logic chính

## Lấy danh sách submissions

```text
Lấy submissions
→ join users, courses, lessons
→ mặc định sort:
   1. pending trước
   2. submitted_at mới nhất
```

## Approve submission

```text
Admin bấm Approve
→ confirm
→ submissions.status = approved
→ feedback = feedback admin nhập
→ reviewed_at = hiện tại
→ reviewed_by = admin hiện tại

Nếu lesson_type = assignment hoặc final_project:
→ lesson được tính completed
```

## Reject submission

```text
Admin bấm Reject
→ bắt buộc nhập feedback
→ submissions.status = rejected
→ reviewed_at = hiện tại
→ reviewed_by = admin hiện tại
→ học viên được phép sửa và nộp lại
```

## Final project approved

```text
Nếu submission_type = final_project
và status = approved:

→ kiểm tra học viên đã hoàn thành các lesson bắt buộc chưa
→ nếu đủ điều kiện:
   học viên eligible for certificate
```

---

# 16. Component cần có

| Component                | Mục đích                      |
| ------------------------ | ----------------------------- |
| `AdminLayout`            | Sidebar + topbar              |
| `SubmissionsHeader`      | Title + subtitle              |
| `SubmissionSummaryCards` | Pending / Approved / Rejected |
| `SubmissionFilterBar`    | Status/type/course filter     |
| `SubmissionTable`        | Danh sách bài nộp             |
| `SubmissionDetailDrawer` | Chi tiết bài nộp              |
| `SubmittedLinksBox`      | Demo/source/file links        |
| `FeedbackBox`            | Admin nhập feedback           |
| `ReviewActions`          | Approve / Reject              |
| `StatusBadge`            | pending / approved / rejected |
| `ConfirmDialog`          | Confirm approve/reject        |
| `EmptyState`             | Khi chưa có bài nộp           |
| `LoadingState`           | Khi đang tải                  |

---

# 17. Empty State

## Không có bài pending

```text
Không có bài nộp nào đang chờ duyệt.
```

## Chưa có bài nộp nào

```text
Chưa có bài nộp nào.

Assignment và final project của học viên sẽ xuất hiện tại đây sau khi được nộp.
```

## Không tìm thấy kết quả

```text
Không tìm thấy bài nộp phù hợp với bộ lọc hiện tại.
```

---

# 18. UI style đề xuất

| Phần             | Gợi ý                                           |
| ---------------- | ----------------------------------------------- |
| Tổng thể         | Admin review workspace, rõ, tập trung duyệt bài |
| Table            | Ưu tiên pending lên đầu                         |
| Status badge     | Pending vàng, approved xanh, rejected đỏ nhẹ    |
| Detail drawer    | Rộng hơn bình thường để xem nội dung/link       |
| Feedback box     | Đặt gần actions approve/reject                  |
| Link demo/source | Nút mở rõ ràng                                  |
| Mobile           | Có thể xem được, nhưng ưu tiên desktop          |

---

# 19. Acceptance Criteria

Trang `/admin/submissions` đạt nếu:

| Tiêu chí                                                        | Đạt / Không |
| --------------------------------------------------------------- | ----------- |
| Student không truy cập được                                     |             |
| Admin xem được danh sách submissions                            |             |
| Pending submissions hiển thị ưu tiên                            |             |
| Admin filter theo status/type/course được                       |             |
| Admin mở được submission detail                                 |             |
| Admin xem được nội dung, demo link, source link                 |             |
| Admin approve submission được                                   |             |
| Admin reject submission được                                    |             |
| Reject bắt buộc có feedback                                     |             |
| Approved submission được tính là lesson completed               |             |
| Final project approved có thể kích hoạt eligibility certificate |             |
| Empty state hiển thị đúng                                       |             |
| Responsive dùng ổn                                              |             |

---

# 20. Chốt scope `/admin/submissions`

```text
/admin/submissions cần có:

1. Admin layout chung
2. Page header
3. Submission summary cards
4. Filter theo status/type/course
5. Submission table
6. Submission detail drawer
7. Submitted links box
8. Feedback box
9. Approve / Reject actions
10. Completion sync
11. Certificate eligibility check nếu final project approved
12. Empty/loading/error state
```

Nói ngắn gọn: **`/admin/submissions` là nơi admin duyệt bài tập và final project. Approve thì bài học được tính hoàn thành; reject thì học viên phải sửa và nộp lại. Final project approved là bước quan trọng để xét certificate.**
