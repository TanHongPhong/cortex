# `/admin/lessons` — Quản lý module/bài học

**Status:** MVP + P1
**Owner area:** Admin
**Source of truth:** `plan/requirement/page_function_matrix.md`, `plan/requirement/unified_database_schema.md`
**Build decision:** Build

**Lưu ý:** Chỉ admin mới có quyền upload video và quản lý nội dung khóa học tại trang này. Instructor không có quyền truy cập.

## 1. Mục tiêu trang

Admin dùng trang này để:

```text
1. Chọn khóa học cần chỉnh nội dung
2. Tạo/sửa/xóa module trong khóa
3. Tạo/sửa/xóa lesson trong module
4. Chọn loại lesson: video / resource / quiz / assignment / final_project
5. Sắp xếp thứ tự module và lesson
6. Gắn tài liệu kèm theo cho từng lesson
7. Cấu hình bài nào bắt buộc để hoàn thành khóa
```

Trang này là nơi quản lý **nội dung học bên trong khóa học**, còn thông tin tổng quan của khóa nằm ở:

```text
/admin/courses
```

---

# 2. Layout đề xuất

```text
/admin/lessons

[Page Header]
- Title: Quản lý module & bài học

[Course Selector]
- Chọn khóa học cần chỉnh

[Main Editor]
Bên trái: Module list
Bên phải: Lesson list + Lesson editor

[Preview / Save Actions]
```

## Layout desktop

```text
┌──────────────────────────────────────────────┐
│ Admin Topbar                                  │
├───────────────┬──────────────────────────────┤
│ Admin Sidebar │ Lessons Management            │
│               │                              │
│               │ [Course Selector]             │
│               │                              │
│               │ [Module List] [Lesson Editor] │
└───────────────┴──────────────────────────────┘
```

---

# 3. Các vùng chính trên trang

## A. Page Header

| Thành phần | Yêu cầu                                               |
| ---------- | ----------------------------------------------------- |
| Title      | `Quản lý module & bài học`                            |
| Subtitle   | “Tạo nội dung học, bài tập và project cho từng khóa.” |
| CTA phụ    | `Quay lại Courses`                                    |
| CTA chính  | `Thêm module` hoặc `Thêm lesson`                      |

---

## B. Course Selector

**Mục đích:** chọn khóa học cần chỉnh nội dung.

| Thành phần      | Yêu cầu                                    |
| --------------- | ------------------------------------------ |
| Dropdown course | Hiển thị danh sách khóa                    |
| Course status   | draft / published / archived               |
| Course level    | Free / Starter / Core / Advanced           |
| Quick link      | `Edit Course Info` dẫn về `/admin/courses` |

Ví dụ:

```text
Course: AI Agent & Vibe Coding Bootcamp
Status: Published
Level: Core
```

---

# 4. Module Manager

## Mục tiêu

Quản lý các module trong khóa.

## Module list cần có

| Thành phần         | Yêu cầu                    |
| ------------------ | -------------------------- |
| Module title       | Tên module                 |
| Module description | Mô tả ngắn                 |
| Lesson count       | Số lesson trong module     |
| Order index        | Thứ tự module              |
| Status             | draft / published / hidden |
| Actions            | Edit / Add lesson / Delete |

## Field module

| Field        | Bắt buộc | Ghi chú                    |
| ------------ | -------- | -------------------------- |
| Module title | Có       | Tên module                 |
| Description  | Không    | Mô tả ngắn                 |
| Order index  | Có       | Thứ tự module              |
| Status       | Có       | draft / published / hidden |

Ví dụ module:

```text
Module 2: Vibe Coding Basics
Description: Học cách biến ý tưởng thành website/prototype bằng AI.
Lessons: 5
Status: Published
```

---

# 5. Lesson Manager

## Mục tiêu

Tạo và quản lý từng lesson trong module.

## Lesson list cần có

| Thành phần   | Yêu cầu                                       |
| ------------ | --------------------------------------------- |
| Lesson title | Tên lesson                                    |
| Lesson type  | video / resource / quiz / assignment / final_project |
| Required     | Có bắt buộc hoàn thành không                  |
| Status       | draft / published / hidden                    |
| Order        | Thứ tự bài                                    |
| Actions      | Edit / Duplicate / Delete                     |

Ví dụ:

```text
✓ 2.1 Tư duy Vibe Coding                  [Video]
✓ 2.2 Tạo landing page đầu tiên           [Video]
○ 2.3 Bài tập: Viết prompt tạo layout     [Assignment]
○ 2.4 Template & resources                [Resource]
○ 2.5 Quiz: Kiểm tra prompt basics        [Quiz]
○ 2.6 Final Project: AI Landing Page      [Final Project]
```

---

# 6. Lesson Type cần hỗ trợ

| Lesson type     | Mục đích           | Admin cần nhập gì                        |
| --------------- | ------------------ | ---------------------------------------- |
| `video`         | Bài giảng video    | Video source từ streaming provider, summary, resources |
| `resource`      | Tài liệu/tham khảo | Nội dung, file/link tài liệu             |
| `quiz`          | Quiz kiểm tra nhanh | Câu hỏi, đáp án, passing score, attempts |
| `assignment`    | Bài tập thực hành  | Yêu cầu, tiêu chí, form nộp              |
| `final_project` | Project cuối khóa  | Project brief, yêu cầu, rubric, form nộp |

---

# 7. Lesson Form chung

Các field dùng chung cho mọi lesson:

| Field                   | Bắt buộc | Ghi chú                                       |
| ----------------------- | -------- | --------------------------------------------- |
| Lesson title            | Có       | Tên bài                                       |
| Lesson type             | Có       | video / resource / quiz / assignment / final_project |
| Module                  | Có       | Thuộc module nào                              |
| Content / description   | Có       | Nội dung mô tả                                |
| Order index             | Có       | Thứ tự bài trong module                       |
| Status                  | Có       | draft / published / hidden                    |
| Required for completion | Có       | true / false                                  |
| Lock rule               | Không    | Theo khóa hoặc custom nếu cần                 |

---

# 8. Form riêng theo từng lesson type

## A. Nếu `lesson_type = video`

| Field          | Bắt buộc | Ghi chú                          |
| -------------- | -------- | -------------------------------- |
| Video source   | Có       | Chọn/upload `video_assets` từ streaming provider |
| Provider status | Có      | pending / processing / ready / failed / archived |
| Duration       | Tự động nếu có | Lấy từ `video_assets.duration_seconds` |
| Lesson summary | Có       | Mục tiêu bài học                 |
| Key points     | Không    | 3–5 ý chính                      |
| Resources      | Không    | Prompt, PDF, template qua `lesson_resources` |

Video source rule:

- Admin upload video mới lên streaming provider hoặc chọn asset đã có trong `video_assets`.
- Provider trả `provider_asset_id`; hệ thống lưu `playback_url`, `embed_url`, `thumbnail_url`, `duration_seconds` khi asset ready.
- Không dùng YouTube/Drive public link làm chuẩn cho paid course. `lessons.video_url` chỉ là legacy/fallback/demo.

CTA admin:

```text
Save Video Lesson
```

---

## B. Nếu `lesson_type = resource`

| Field                   | Bắt buộc       | Ghi chú                   |
| ----------------------- | -------------- | ------------------------- |
| Resource title          | Có             | Tên tài liệu              |
| Description             | Có             | Mô tả ngắn                |
| Resource list           | Có             | File/link/template/prompt |
| Required for completion | Không bắt buộc | Có thể true/false         |

CTA admin:

```text
Save Resource Lesson
```

---

## C. Nếu `lesson_type = quiz`

| Field                   | Bắt buộc | Ghi chú                                  |
| ----------------------- | -------- | ---------------------------------------- |
| Quiz title              | Có       | Tên quiz                                 |
| Description             | Không    | Mô tả ngắn                               |
| Passing score           | Có       | Mặc định 70                              |
| Max attempts            | Không    | NULL là không giới hạn                   |
| Questions               | Có       | single_choice / multiple_choice / short_text |
| Correct answers         | Có       | Chỉ admin/instructor xem; `short_text` lưu accepted answers để auto-grade exact/normalized match |
| Explanation             | Không    | Hiển thị sau submit                      |
| Required for completion | Có       | Nếu true thì cần `quiz_attempts.passed`  |

Rule: `short_text` trong MVP/P1 không chấm tay. Hệ thống trim/lowercase câu trả lời và so với danh sách accepted answers trong `quiz_questions.correct_answer`.

CTA admin:

```text
Save Quiz Lesson
```

---

## D. Nếu `lesson_type = assignment`

| Field                   | Bắt buộc | Ghi chú                      |
| ----------------------- | -------- | ---------------------------- |
| Assignment title        | Có       | Tên bài tập                  |
| Requirement             | Có       | Yêu cầu cần làm              |
| Submission format       | Có       | Text / demo link / file link |
| Criteria / Rubric       | Có       | Tiêu chí duyệt               |
| Suggested time          | Không    | Ví dụ: 30–45 phút            |
| Resources               | Không    | Tài liệu hỗ trợ              |
| Requires submission     | Có       | true                         |
| Required for completion | Có       | thường là true               |

CTA admin:

```text
Save Assignment
```

---

## E. Nếu `lesson_type = final_project`

| Field                      | Bắt buộc | Ghi chú                           |
| -------------------------- | -------- | --------------------------------- |
| Project title              | Có       | Tên project cuối khóa             |
| Project brief              | Có       | Mô tả nhiệm vụ tổng quan          |
| Project requirements       | Có       | Yêu cầu cần nộp                   |
| Project output             | Có       | Demo link, source, reflection     |
| Evaluation criteria        | Có       | Rubric đánh giá                   |
| Certificate condition note | Có       | Nêu điều kiện để nhận certificate |
| Requires submission        | Có       | true                              |
| Required for completion    | Có       | true                              |

CTA admin:

```text
Save Final Project
```

---

# 9. Lesson Resources

Mỗi lesson có thể gắn tài liệu kèm theo.

## Resource types

| Type     | Ví dụ                          |
| -------- | ------------------------------ |
| PDF      | Slide bài học                  |
| Prompt   | Prompt mẫu                     |
| Link     | Demo link, Notion, Docs        |
| Template | Template landing page/workflow |
| File     | File bài tập                   |

## Resource field

| Field       | Bắt buộc |
| ----------- | -------- |
| Title       | Có       |
| Type        | Có       |
| URL/File    | Có       |
| Description | Không    |
| Order index | Không    |

---

# 10. Quản lý Video Assets

Video assets quản lý tại trang `/admin/lessons` (không tách trang riêng).

## Video Asset Table trong Lesson Editor

Khi admin chọn lesson type = video, hiển thị bảng quản lý video assets:

| Cột | Nội dung |
|-----|---------|
| Title | Tên video nội bộ |
| Provider | Cloudflare Stream / Bunny Stream / Vimeo / External URL |
| Provider Asset ID | ID từ provider |
| Processing Status | pending / processing / ready / failed / archived |
| Duration | Thời lượng video |
| Thumbnail | Ảnh preview |
| Actions | View / Retry / Archive |

## Upload Video Flow

```text
1. Admin bấm "Upload Video" trong lesson editor
2. Chọn file video hoặc nhập external URL
3. Nếu dùng streaming provider:
   - Upload lên provider
   - Hệ thống tạo video_assets record với status = pending
   - Provider xử lý encode → status = processing
   - Khi encode xong → status = ready, lưu embed_url, thumbnail, duration
4. Nếu dùng external URL:
   - Nhập URL (YouTube, Vimeo embed, etc.)
   - status = ready ngay
   - Chỉ dùng cho free course / demo, không dùng cho paid course production
```

## Video Asset Fields

| Field | Bắt buộc | Ghi chú |
|-------|----------|---------|
| Title | Có | Tên video nội bộ |
| Provider | Có | cloudflare_stream / bunny_stream / vimeo / external_url |
| Provider Asset ID | Có (nếu dùng provider) | ID từ streaming provider |
| Playback URL | Tự động | URL phát video/tokenized playback |
| Embed URL | Tự động | URL embed player |
| Thumbnail URL | Tự động | Thumbnail từ provider |
| Duration (seconds) | Tự động | Thời lượng video |
| Processing Status | Tự động | pending / processing / ready / failed / archived |
| Visibility | Có | private / unlisted |

## Processing Status Rules

| Status | Ý nghĩa | Lesson publish? | Student access? |
|--------|---------|----------------|-----------------|
| pending | Đang chờ xử lý | ❌ Không | ❌ Không |
| processing | Đang encode | ❌ Không | ❌ Không |
| ready | Sẵn sàng | ✅ Có | ✅ Có |
| failed | Lỗi | ❌ Không | ❌ Không |
| archived | Đã lưu trữ | ❌ Không | ❌ Không |

## Actions trên Video Asset

| Action | Chức năng |
|--------|----------|
| View | Xem preview video |
| Retry | Thử lại nếu status = failed |
| Archive | Lưu trữ video (ẩn nhưng không xóa) |
| Replace | Thay thế video bằng file mới |

## Rule quan trọng

- **Paid course**: Chỉ dùng streaming provider (Cloudflare Stream, Bunny Stream, Vimeo). Không dùng YouTube/Drive public link.
- **Free course**: Có thể dùng external URL (YouTube embed) làm fallback.
- **Lesson publish**: Chỉ publish khi `video_assets.processing_status = ready`.
- **Student playback**: Backend kiểm tra login + enrollment active + course/lesson published trước khi trả embed_url.
- **Security**: Không expose raw private video file. Nếu provider cần signed token, backend phát token sau khi kiểm tra quyền.

---

# 11. Thứ tự module/lesson

Vì khóa học cần flow rõ, admin nên chỉnh được thứ tự.

| Chức năng       | Yêu cầu                                               |
| --------------- | ----------------------------------------------------- |
| Reorder module  | Kéo thả hoặc nút move up/down                         |
| Reorder lesson  | Kéo thả hoặc nút move up/down                         |
| Order index     | Lưu thứ tự vào database                               |
| Sequential mode | Nếu khóa học theo thứ tự, lesson order rất quan trọng |

MVP fallback nếu chưa làm drag/drop:

```text
Dùng nút Move Up / Move Down là đủ.
```

---

# 11. Rule quan trọng

| Trường hợp                               | Cách xử lý                                             |
| ---------------------------------------- | ------------------------------------------------------ |
| Lesson chưa published                    | Không hiển thị với học viên                            |
| Module chưa published                    | Lesson trong module cũng không hiển thị                |
| Video lesson thiếu `video_asset_id` ready | Không cho publish                                      |
| Video provider đang processing/failed    | Không cho publish, hiển thị trạng thái để retry/re-upload |
| Assignment thiếu requirement/rubric      | Không cho publish                                      |
| Final project thiếu project requirements | Không cho publish                                      |
| Xóa lesson đã có progress/submission     | Không nên xóa, chỉ hidden/archive                      |
| Xóa module có lesson                     | Cảnh báo trước khi xóa                                 |
| Khóa sequential                          | Lesson sau chỉ mở khi lesson trước hoàn thành/approved |

---

# 12. Yêu cầu chức năng cụ thể

| Nhóm            | Yêu cầu                                         |
| --------------- | ----------------------------------------------- |
| Auth            | Chỉ admin mới vào được                          |
| Course select   | Chọn khóa cần chỉnh lesson                      |
| Module CRUD     | Tạo/sửa/xóa/ẩn module                           |
| Lesson CRUD     | Tạo/sửa/xóa/ẩn lesson                           |
| Lesson type     | Hỗ trợ video/resource/quiz/assignment/final_project |
| Resources       | Gắn tài liệu vào lesson                         |
| Order           | Sắp xếp module/lesson                           |
| Validation      | Kiểm tra field bắt buộc theo lesson type        |
| Publish control | Draft/published/hidden                          |
| Safety          | Không xóa cứng lesson đã có progress/submission |
| Preview         | Có thể mở preview lesson nếu cần                |

---

# 13. Data cần dùng

| Bảng               | Dữ liệu                                              |
| ------------------ | ---------------------------------------------------- |
| `courses`          | Chọn khóa                                            |
| `modules`          | Module trong khóa                                    |
| `lessons`          | Bài học trong module                                 |
| `video_assets`     | Video streaming asset cho video lesson               |
| `lesson_resources` | Tài liệu kèm lesson                                  |
| `files`            | File nội bộ gắn với tài liệu/attachment              |
| `lesson_progress`  | Kiểm tra lesson đã có người học chưa                 |
| `submissions`      | Kiểm tra assignment/final project đã có bài nộp chưa |

---

# 14. Cấu trúc dữ liệu đề xuất

## Bảng `modules`

| Field         | Mục đích                   |
| ------------- | -------------------------- |
| `id`          | ID module                  |
| `course_id`   | Thuộc khóa nào             |
| `title`       | Tên module                 |
| `description` | Mô tả ngắn                 |
| `order_index` | Thứ tự module              |
| `status`      | draft / published / hidden |
| `created_at`  | Ngày tạo                   |
| `updated_at`  | Ngày cập nhật              |

---

## Bảng `lessons`

| Field                        | Mục đích                                      |
| ---------------------------- | --------------------------------------------- |
| `id`                         | ID lesson                                     |
| `course_id`                  | Thuộc khóa nào                                |
| `module_id`                  | Thuộc module nào                              |
| `title`                      | Tên lesson                                    |
| `lesson_type`                | video / resource / quiz / assignment / final_project |
| `content`                    | Nội dung mô tả bài học/bài tập/project        |
| `video_asset_id`             | FK tới `video_assets.id` nếu là video lesson   |
| `video_url`                  | Legacy/fallback external URL, không phải source chính |
| `duration`                   | Thời lượng nếu có                             |
| `order_index`                | Thứ tự lesson                                 |
| `requires_submission`        | true/false                                    |
| `is_required_for_completion` | true/false                                    |
| `status`                     | draft / published / hidden                    |
| `created_at`                 | Ngày tạo                                      |
| `updated_at`                 | Ngày cập nhật                                 |

---

## Bảng `lesson_resources`

| Field         | Mục đích                              |
| ------------- | ------------------------------------- |
| `id`          | ID resource                           |
| `lesson_id`   | Thuộc lesson nào                      |
| `file_id`     | File nội bộ nếu resource là file upload |
| `title`       | Tên tài liệu                          |
| `type`        | pdf / prompt / link / template / file |
| `description` | Mô tả ngắn                            |
| `url`         | External link fallback nếu không dùng `file_id` |
| `order_index` | Thứ tự hiển thị                       |

---

# 15. Logic chính

## Tạo module

```text
Admin chọn course
→ bấm Add Module
→ nhập title, description, order_index
→ status mặc định = draft
→ lưu vào modules
```

## Tạo lesson

```text
Admin chọn module
→ bấm Add Lesson
→ chọn lesson_type
→ nhập field tương ứng
→ validate theo lesson_type
→ status mặc định = draft
→ lưu vào lessons
```

## Publish lesson

```text
Nếu lesson_type = video:
→ phải có video_asset_id
→ video_assets.processing_status phải là ready
→ nếu processing/failed thì giữ draft/hidden và hiển thị trạng thái upload

Nếu lesson_type = assignment:
→ phải có requirement + criteria

Nếu lesson_type = quiz:
→ phải có ít nhất 1 question
→ phải có passing_score
→ không publish nếu thiếu correct_answer cho choice question

Nếu lesson_type = final_project:
→ phải có project brief + requirements + criteria

Nếu đủ điều kiện:
→ status = published
```

## Xóa lesson

```text
Nếu lesson chưa có progress/submission:
→ có thể xóa

Nếu lesson đã có progress/submission:
→ không xóa cứng
→ chỉ đổi status = hidden
```

---

# 16. Component cần có

| Component            | Mục đích                                     |
| -------------------- | -------------------------------------------- |
| `AdminLayout`        | Sidebar + topbar                             |
| `LessonsHeader`      | Title + CTA                                  |
| `CourseSelector`     | Chọn khóa                                    |
| `ModuleList`         | Danh sách module                             |
| `ModuleFormModal`    | Tạo/sửa module                               |
| `LessonList`         | Danh sách lesson trong module                |
| `LessonFormDrawer`   | Tạo/sửa lesson                               |
| `LessonTypeSelector` | Chọn video/resource/quiz/assignment/final_project |
| `QuizQuestionBuilder` | Tạo câu hỏi, đáp án, điểm và explanation |
| `ResourceManager`    | Gắn tài liệu vào lesson                      |
| `StatusBadge`        | draft/published/hidden                       |
| `ReorderControls`    | Đổi thứ tự                                   |
| `ConfirmDialog`      | Xác nhận xóa/ẩn                              |
| `EmptyState`         | Khi chưa có module/lesson                    |
| `LoadingState`       | Khi đang tải                                 |

---

# 17. Empty State

## Chưa chọn khóa

```text
Chọn một khóa học để bắt đầu quản lý module và bài học.
```

## Khóa chưa có module

```text
Khóa học này chưa có module nào.

Hãy tạo module đầu tiên.
[Thêm module]
```

## Module chưa có lesson

```text
Module này chưa có bài học nào.

Hãy thêm video, resource, quiz, assignment hoặc final project.
[Thêm lesson]
```

---

# 18. UI style đề xuất

| Phần        | Gợi ý                                                  |
| ----------- | ------------------------------------------------------ |
| Tổng thể    | Admin editor, rõ ràng, ưu tiên thao tác                |
| Layout      | 2 cột: module list bên trái, lesson editor bên phải    |
| Lesson type | Dùng badge/icon dễ phân biệt                           |
| Form        | Chia theo nhóm: Basic / Content / Resources / Settings |
| Status      | Badge draft/published/hidden                           |
| Reorder     | Drag/drop nếu làm được, không thì move up/down         |
| Mobile      | Có thể dùng accordion thay vì 2 cột                    |

---

# 19. Acceptance Criteria

Trang `/admin/lessons` đạt nếu:

| Tiêu chí                                                         | Đạt / Không |
| ---------------------------------------------------------------- | ----------- |
| Student không truy cập được                                      |             |
| Admin chọn được course cần chỉnh                                 |             |
| Admin tạo/sửa/ẩn module được                                     |             |
| Admin tạo/sửa/ẩn lesson được                                     |             |
| Lesson hỗ trợ đủ 5 type: video/resource/quiz/assignment/final_project |             |
| Field form thay đổi theo lesson type                             |             |
| Video lesson bắt buộc có `video_asset_id` ready khi publish      |             |
| Admin thấy được trạng thái video processing/ready/failed         |             |
| Assignment bắt buộc có requirement/rubric khi publish            |             |
| Final project bắt buộc có project brief/criteria khi publish     |             |
| Admin gắn được tài liệu vào lesson                               |             |
| Admin sắp xếp được module/lesson                                 |             |
| Không xóa cứng lesson đã có progress/submission                  |             |
| Empty state hiển thị đúng                                        |             |
| Responsive dùng ổn                                               |             |

---

# 20. Chốt scope `/admin/lessons`

```text
/admin/lessons cần có:

1. Admin layout chung
2. Page header
3. Course selector
4. Module manager
5. Lesson manager
6. Lesson type selector:
   - video
   - resource
   - quiz
   - assignment
   - final_project
7. Form riêng theo lesson type
8. Resource manager
9. Reorder module/lesson
10. Status control: draft/published/hidden
11. Delete/hidden protection
12. Empty/loading/error state
```

Nói ngắn gọn: **`/admin/lessons` là nơi admin xây toàn bộ nội dung học của khóa: module, video bài giảng, tài liệu, quiz, bài tập và final project. Đây là trang quan trọng nhất để tạo trải nghiệm học trong Student Portal.**
