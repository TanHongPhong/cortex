# `/learn/[course]/[lesson]` — Trang bài học

## 1. Vai trò của trang

Trang này là nơi học viên trực tiếp **học bài, xem tài liệu, làm bài tập, nộp project và lưu tiến độ**.

Trang này xử lý 3 loại chính:

```text
1. Video lesson
2. Assignment lesson
3. Final project lesson
```

Trong đó:

| Lesson type     | Mục đích                                             |
| --------------- | ---------------------------------------------------- |
| `video`         | Học bài qua video, xem tài liệu, đánh dấu hoàn thành |
| `assignment`    | Làm bài tập thực hành trong module                   |
| `final_project` | Nộp project cuối khóa để xét hoàn thành/certificate  |

---

# 2. Layout tổng thể

## Desktop layout

```text
┌──────────────────────────────────────────────┐
│ Topbar                                       │
├──────────────┬───────────────────────────────┤
│ Sidebar app  │ Lesson Page                    │
│              │                               │
│              │ [Main Lesson Content] [Lesson Sidebar] │
│              │                               │
│              │ [Resources / Submission Area] │
│              │ [Complete / Submit / Next]    │
└──────────────┴───────────────────────────────┘
```

## Mobile layout

```text
Topbar
Lesson title
Main lesson content
Resources / Submission area
Complete / Submit button
Previous / Next
Lesson list collapsible
```

---

# 3. Phần chung cho mọi lesson

## A. Lesson Header

| Thành phần  | Yêu cầu                                                 |
| ----------- | ------------------------------------------------------- |
| Breadcrumb  | `My Courses > Course Name > Lesson Name`                |
| Tên lesson  | Hiển thị rõ                                             |
| Module      | Bài này thuộc module nào                                |
| Lesson type | Video / Assignment / Final Project                      |
| Status      | Not started / Completed / Pending / Approved / Rejected |
| Duration    | Chỉ cần với video lesson                                |

Ví dụ:

```text
Module 2 — Vibe Coding Basics
Build your first AI landing page
Video · 18 phút · Not completed
```

---

## B. Lesson Sidebar

Sidebar bên phải dùng để chuyển bài nhanh.

| Thành phần        | Yêu cầu                                                  |
| ----------------- | -------------------------------------------------------- |
| Course title      | Tên khóa học                                             |
| Module list       | Danh sách module                                         |
| Lesson list       | Các lesson trong module                                  |
| Lesson type badge | Video / Assignment / Final Project                       |
| Status icon       | Check / current / locked / pending / approved / rejected |
| Current lesson    | Highlight bài đang xem                                   |
| Progress nhỏ      | Ví dụ: 8/20 completed                                    |

Sidebar nên **sticky trên desktop**, mobile thì chuyển thành collapsible.

---

# 4. Trường hợp 1 — `lesson_type = video`

## Mục tiêu

Học viên xem video bài học, tải tài liệu kèm theo và đánh dấu hoàn thành.

## Layout video lesson

```text
[Lesson Header]

[Video Player]

[Lesson Summary]

[Resources]

[Đánh dấu hoàn thành]

[Bài trước] [Bài tiếp theo]
```

## A. Video Player

| Thành phần    | Yêu cầu                                          |
| ------------- | ------------------------------------------------ |
| Video chính   | Nhúng từ YouTube unlisted / Vimeo / Google Drive |
| Aspect ratio  | 16:9                                             |
| Loading state | Có skeleton khi video đang tải                   |
| Error state   | Báo nếu video không load được                    |
| Responsive    | Mobile full width                                |
| Autoplay      | Không autoplay                                   |

---

## B. Lesson Summary

Nằm ngay dưới video.

| Thành phần            | Yêu cầu                           |
| --------------------- | --------------------------------- |
| Mục tiêu bài học      | Bài này giúp học viên làm được gì |
| Nội dung chính        | 3–5 bullet ngắn                   |
| Yêu cầu trước khi học | Nếu có                            |

Ví dụ:

```text
Sau bài này, bạn sẽ biết:
- Cách mô tả ý tưởng landing page cho AI
- Cách dùng AI để tạo layout đầu tiên
- Cách chỉnh prompt để cải thiện giao diện
```

---

## C. Resources / Tài liệu kèm theo

| Loại tài liệu    | Ví dụ                            |
| ---------------- | -------------------------------- |
| Prompt mẫu       | File prompt dùng trong bài       |
| Slide bài học    | PDF hoặc link slide              |
| Template         | Template landing page / workflow |
| Checklist        | Checklist thực hành              |
| Source/demo link | Link demo, GitHub, Figma, Notion |
| Exercise file    | File bài tập nếu có              |

Mỗi resource card nên có:

| Field         | Yêu cầu                        |
| ------------- | ------------------------------ |
| Tên tài liệu  | Rõ ràng                        |
| Loại tài liệu | PDF / Prompt / Link / Template |
| Mô tả ngắn    | 1 dòng                         |
| CTA           | Download / Open / Copy Prompt  |

---

## D. Complete Button

| Thành phần         | Yêu cầu                      |
| ------------------ | ---------------------------- |
| Button chính       | `Đánh dấu hoàn thành`        |
| Sau khi hoàn thành | Đổi thành `Đã hoàn thành`    |
| Action             | Lưu vào `lesson_progress`    |
| Sau khi bấm        | Hiện nút `Học bài tiếp theo` |

Rule:

```text
Khi bấm “Đánh dấu hoàn thành”:
- Lưu user_id
- Lưu lesson_id
- is_completed = true
- completed_at = thời gian hiện tại
```

---

# 5. Trường hợp 2 — `lesson_type = assignment`

## Mục tiêu

Học viên làm bài tập thực hành ngay trong module, không cần trang `/assignments` riêng.

## Layout assignment lesson

```text
[Lesson Header]

[Assignment Requirement]

[Submission Format]

[Criteria / Rubric]

[Submit Form]

[Submission Status + Feedback]

[Bài trước] [Bài tiếp theo]
```

---

## A. Assignment Requirement

| Thành phần      | Yêu cầu                                      |
| --------------- | -------------------------------------------- |
| Tên bài tập     | Ví dụ: Bài tập: Viết prompt tạo landing page |
| Mục tiêu        | Bài tập giúp học viên luyện kỹ năng gì       |
| Yêu cầu cần làm | Mô tả rõ output cần nộp                      |
| Thời gian gợi ý | Ví dụ: 30–45 phút                            |
| Tài liệu hỗ trợ | Link tài liệu/prompt/video liên quan         |

Ví dụ:

```text
Bài tập: Viết prompt tạo landing page

Yêu cầu:
Hãy viết một prompt hoàn chỉnh để yêu cầu AI tạo landing page cho một khóa học online.

Output cần nộp:
- Prompt hoàn chỉnh
- Mô tả ngắn ý tưởng landing page
- Link kết quả nếu có
```

---

## B. Submission Format

| Loại nộp           | Có cần không                                   |
| ------------------ | ---------------------------------------------- |
| Text answer        | Có thể cần                                     |
| Demo link          | Nếu bài tập có sản phẩm                        |
| File/link tài liệu | Nếu học viên làm trên Google Docs/Figma/GitHub |
| Source link        | Không bắt buộc                                 |
| Ghi chú            | Không bắt buộc                                 |

---

## C. Criteria / Rubric

Nên có tiêu chí rõ để học viên biết làm thế nào là đạt.

| Tiêu chí          | Mô tả                                 |
| ----------------- | ------------------------------------- |
| Đúng yêu cầu      | Bài làm đúng đề bài                   |
| Rõ ràng           | Prompt/output dễ hiểu                 |
| Có tính thực hành | Có thể dùng hoặc test được            |
| Có cải thiện      | Học viên có chỉnh sửa sau khi dùng AI |
| Trình bày gọn     | Nộp bài sạch, dễ đọc                  |

---

## D. Submit Form

Form nộp bài tập nên có:

| Field             | Bắt buộc       | Ghi chú                           |
| ----------------- | -------------- | --------------------------------- |
| Nội dung bài làm  | Có             | Textarea                          |
| Link demo/kết quả | Không bắt buộc | Nếu có sản phẩm                   |
| Link file/source  | Không bắt buộc | Google Docs, Figma, GitHub, Drive |
| Ghi chú           | Không          | Gửi thêm cho admin/mentor         |

CTA:

```text
Nộp bài tập
```

---

## E. Submission Status

| Status        | Hiển thị               | CTA                   |
| ------------- | ---------------------- | --------------------- |
| Not submitted | Chưa nộp bài           | `Nộp bài tập`         |
| Pending       | Bài nộp đang chờ duyệt | `Xem bài đã nộp`      |
| Approved      | Bài tập đã được duyệt  | `Học bài tiếp theo`   |
| Rejected      | Bài cần chỉnh sửa      | `Chỉnh sửa & nộp lại` |

Nếu bị rejected, hiển thị feedback:

```text
Feedback:
Prompt của bạn còn quá chung. Hãy bổ sung rõ đối tượng học viên, phong cách giao diện và CTA chính.
```

---

## F. Rule cho assignment lesson

```text
Khi học viên nộp assignment:
- Tạo/cập nhật record trong submissions
- status = pending
- Lưu user_id, course_id, lesson_id
- Nếu rejected thì cho sửa và nộp lại
- Nếu approved thì lesson được tính là completed
```

Nếu khóa học theo thứ tự:

```text
Bài sau chỉ mở khi assignment được approved.
```

---

# 6. Trường hợp 3 — `lesson_type = final_project`

## Mục tiêu

Học viên nộp project cuối khóa để được xét hoàn thành khóa và nhận certificate.

Final project cũng là một lesson, thường nằm cuối module cuối cùng.

Không cần trang riêng:

```text
/submit-project
```

---

## Layout final project lesson

```text
[Lesson Header]

[Final Project Brief]

[Project Requirements]

[Project Output]

[Evaluation Criteria]

[Submit Project Form]

[Review Status + Feedback]

[Certificate Condition]

[Bài trước] [Hoàn thành khóa]
```

---

## A. Final Project Brief

| Thành phần  | Yêu cầu                                                  |
| ----------- | -------------------------------------------------------- |
| Tên project | Ví dụ: Final Project: Build your AI-powered mini product |
| Mục tiêu    | Tổng hợp kỹ năng đã học trong khóa                       |
| Bối cảnh    | Học viên chọn một vấn đề thật để giải quyết              |
| Output cuối | Website / AI assistant / chatbot / automation workflow   |

Ví dụ:

```text
Final Project: Build your AI-powered mini product

Bạn cần xây một sản phẩm AI nhỏ dựa trên kiến thức đã học, ví dụ:
- Landing page tạo bằng AI
- Chatbot hỗ trợ học tập
- AI assistant cá nhân
- Workflow tự động hóa form → sheet → email
```

---

## B. Project Requirements

| Yêu cầu                 | Mô tả                                       |
| ----------------------- | ------------------------------------------- |
| Có ý tưởng rõ           | Project giải quyết vấn đề gì                |
| Có demo                 | Có link demo hoặc video demo                |
| Có mô tả cách hoạt động | Người xem hiểu project làm gì               |
| Có sử dụng AI           | Dùng AI tool, agent, prompt hoặc automation |
| Có tài liệu nộp         | Link source/file nếu có                     |
| Có reflection ngắn      | Học viên viết học được gì                   |

---

## C. Project Output

Học viên cần nộp:

| Field            | Bắt buộc       | Ghi chú                         |
| ---------------- | -------------- | ------------------------------- |
| Tên project      | Có             | Ngắn, rõ                        |
| Mô tả project    | Có             | Mục tiêu, cách hoạt động        |
| Link demo        | Có             | Website/app/video demo          |
| Link source/file | Không bắt buộc | GitHub/Drive/Figma/Notion       |
| Công cụ đã dùng  | Có             | ChatGPT, Claude, Cursor, n8n... |
| Reflection       | Có             | Học được gì, khó khăn gì        |
| Ghi chú          | Không          | Gửi thêm cho mentor/admin       |

---

## D. Evaluation Criteria

| Tiêu chí                | Mô tả                                |
| ----------------------- | ------------------------------------ |
| Hoàn thành đúng yêu cầu | Có đủ output cần nộp                 |
| Tính ứng dụng           | Project giải quyết vấn đề cụ thể     |
| Mức độ dùng AI          | Có ứng dụng AI rõ ràng               |
| Demo hoạt động          | Link demo xem được                   |
| Trình bày rõ            | Mô tả dễ hiểu                        |
| Tính cá nhân            | Không copy nguyên mẫu của người khác |

---

## E. Submit Project Form

CTA chính:

```text
Nộp final project
```

Sau khi nộp:

```text
Project của bạn đã được gửi và đang chờ duyệt.
```

---

## F. Review Status

| Status        | Hiển thị               | CTA                   |
| ------------- | ---------------------- | --------------------- |
| Not submitted | Chưa nộp final project | `Nộp final project`   |
| Pending       | Project đang chờ duyệt | `Xem bài đã nộp`      |
| Approved      | Project đã được duyệt  | `Xem chứng chỉ`       |
| Rejected      | Project cần chỉnh sửa  | `Chỉnh sửa & nộp lại` |

Nếu rejected, hiển thị feedback:

```text
Feedback:
Demo link chưa hoạt động. Vui lòng cập nhật lại link demo và bổ sung mô tả cách project hoạt động.
```

---

## G. Certificate Condition

Hiển thị rõ điều kiện nhận certificate:

```text
Để nhận Certificate of Completion, bạn cần:
1. Hoàn thành các lesson bắt buộc
2. Nộp final project
3. Final project được CORTEX duyệt
```

Nếu final project approved:

```text
Bạn đã hoàn thành điều kiện final project.
Certificate của bạn sẽ được cấp hoặc đang chờ xử lý.
```

---

## H. Rule cho final project lesson

```text
Khi học viên nộp final project:
- Tạo/cập nhật record trong submissions
- lesson_type = final_project
- status = pending
- Admin/mentor duyệt bài
- Nếu rejected thì cho sửa và nộp lại
- Nếu approved thì final project được tính là completed
- Nếu đủ điều kiện, học viên có thể nhận certificate
```

---

# 7. Lesson Navigation

| Nút                 | Chức năng                                |
| ------------------- | ---------------------------------------- |
| `Bài trước`         | Quay lại lesson trước                    |
| `Bài tiếp theo`     | Sang lesson tiếp theo                    |
| `Quay lại khóa học` | Về `/learn/[course]`                     |
| `Xem chứng chỉ`     | Sang `/my-certificates` nếu đủ điều kiện |

Nếu bài tiếp theo bị khóa:

```text
Bạn cần hoàn thành bài hiện tại trước khi mở bài tiếp theo.
```

Nếu bài hiện tại là assignment/final project:

```text
Bạn cần chờ bài nộp được duyệt trước khi mở bài tiếp theo.
```

---

# 8. Trạng thái lesson

| Trạng thái     | Cách hiển thị                                |
| -------------- | -------------------------------------------- |
| Not started    | Icon tròn rỗng                               |
| Current        | Highlight bài đang học                       |
| Completed      | Dấu check                                    |
| Locked         | Icon khóa                                    |
| Pending review | Bài nộp đang chờ duyệt                       |
| Approved       | Bài nộp đã được duyệt                        |
| Rejected       | Bài nộp cần chỉnh sửa                        |
| Video error    | Hiện thông báo lỗi video                     |
| No resources   | Hiện “Bài học này chưa có tài liệu kèm theo” |

---

# 9. Yêu cầu chức năng cụ thể

| Nhóm               | Yêu cầu                                                 |
| ------------------ | ------------------------------------------------------- |
| Auth               | Chỉ user đăng nhập mới xem được                         |
| Enrollment         | Chỉ học viên đã đăng ký khóa mới vào được               |
| Lesson type        | Trang phải render đúng theo `lesson_type`               |
| Video              | Nếu là video lesson, hiển thị video từ `video_url`      |
| Resources          | Hiển thị tài liệu từ `lesson_resources`                 |
| Assignment form    | Nếu là assignment, hiển thị form nộp bài tập            |
| Final project form | Nếu là final project, hiển thị form nộp project         |
| Progress           | Video/resource lưu vào `lesson_progress` khi hoàn thành |
| Submission         | Assignment/final project lưu vào `submissions`          |
| Sidebar            | Hiển thị danh sách module/lesson cùng khóa              |
| Navigation         | Có bài trước/bài tiếp theo                              |
| Lock rule          | Nếu bài bị khóa thì không cho xem                       |
| Responsive         | Mobile video/form full width, sidebar thu gọn           |
| Error state        | Có thông báo nếu video/tài liệu/form lỗi                |

---

# 10. Data cần dùng

| Bảng               | Dữ liệu                                                     |
| ------------------ | ----------------------------------------------------------- |
| `courses`          | Tên khóa, slug                                              |
| `modules`          | Module của khóa                                             |
| `lessons`          | Tên bài, lesson type, video URL, duration, order            |
| `lesson_resources` | Tài liệu dưới video hoặc tài liệu hỗ trợ assignment/project |
| `lesson_progress`  | Trạng thái hoàn thành video/resource                        |
| `submissions`      | Bài nộp assignment/final project                            |
| `enrollments`      | Kiểm tra quyền học                                          |

---

# 11. Cấu trúc dữ liệu `lessons`

| Field                        | Mục đích                                      |
| ---------------------------- | --------------------------------------------- |
| `id`                         | ID lesson                                     |
| `course_id`                  | Thuộc khóa nào                                |
| `module_id`                  | Thuộc module nào                              |
| `title`                      | Tên lesson                                    |
| `lesson_type`                | video / resource / assignment / final_project |
| `content`                    | Nội dung mô tả bài học/bài tập/project        |
| `video_url`                  | Link video nếu là video                       |
| `duration`                   | Thời lượng nếu có                             |
| `order_index`                | Thứ tự lesson                                 |
| `requires_submission`        | true/false                                    |
| `is_required_for_completion` | true/false                                    |
| `status`                     | draft / published / hidden                    |

---

# 12. Cấu trúc dữ liệu `lesson_resources`

| Field         | Mục đích                              |
| ------------- | ------------------------------------- |
| `id`          | ID tài liệu                           |
| `lesson_id`   | Thuộc bài nào                         |
| `title`       | Tên tài liệu                          |
| `type`        | pdf / prompt / link / template / file |
| `description` | Mô tả ngắn                            |
| `url`         | Link tải hoặc mở                      |
| `order_index` | Thứ tự hiển thị                       |

---

# 13. Cấu trúc dữ liệu `submissions`

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
| `reviewed_by`     | Người duyệt                      |

---

# 14. Component cần có

| Component                   | Dùng để làm gì              |
| --------------------------- | --------------------------- |
| `StudentLayout`             | Sidebar + topbar            |
| `LessonHeader`              | Header chung cho mọi lesson |
| `VideoLessonContent`        | Render video lesson         |
| `AssignmentLessonContent`   | Render assignment lesson    |
| `FinalProjectLessonContent` | Render final project lesson |
| `ResourceBox`               | Hiển thị tài liệu           |
| `SubmissionForm`            | Form nộp assignment/project |
| `SubmissionStatusBox`       | Hiển thị trạng thái bài nộp |
| `FeedbackBox`               | Hiển thị feedback từ admin  |
| `LessonSidebar`             | Danh sách module/lesson     |
| `LessonNavigation`          | Bài trước/bài sau           |
| `EmptyState`                | Không có dữ liệu            |
| `ErrorState`                | Lỗi video/form/tài liệu     |

---

# 15. Acceptance Criteria

Trang `/learn/[course]/[lesson]` đạt nếu:

| Tiêu chí                                                                                               | Đạt / Không |
| ------------------------------------------------------------------------------------------------------ | ----------- |
| User chưa login bị chuyển về login                                                                     |             |
| User chưa enrolled không xem được lesson                                                               |             |
| Trang render đúng theo `lesson_type`                                                                   |             |
| Video lesson hiển thị video, resources, complete button                                                |             |
| Assignment lesson hiển thị yêu cầu, form nộp bài, status, feedback                                     |             |
| Final project lesson hiển thị project brief, form nộp project, status, feedback, certificate condition |             |
| Bấm hoàn thành video thì lưu `lesson_progress`                                                         |             |
| Nộp assignment/final project thì lưu `submissions`                                                     |             |
| Rejected submission cho phép chỉnh sửa/nộp lại                                                         |             |
| Approved submission được tính là hoàn thành lesson                                                     |             |
| Sidebar highlight đúng lesson hiện tại                                                                 |             |
| Previous/Next lesson hoạt động đúng                                                                    |             |
| Locked lesson không truy cập được                                                                      |             |
| Responsive tốt trên mobile                                                                             |             |

---

# 16. Chốt scope trang lesson

```text
/learn/[course]/[lesson] cần có:

1. Lesson header
2. Render theo lesson_type:
   - video
   - assignment
   - final_project
3. Video player cho video lesson
4. Resource box dưới video hoặc dưới assignment/project
5. Assignment form cho bài tập
6. Final project form cho project cuối khóa
7. Submission status + feedback
8. Complete button cho video/resource
9. Previous / Next lesson
10. Lesson sidebar
11. Progress saving
12. Submission saving
13. Locked/error/loading state
```

Nói ngắn gọn: **trang lesson là nơi học viên học video, làm assignment và nộp final project trong cùng một flow học. Video giữ layout cũ; assignment và final project có layout riêng, form riêng, trạng thái duyệt riêng.**
