# `/admin/courses` — Quản lý khóa học

**Status:** MVP
**Owner area:** Admin
**Source of truth:** `plan/requirement/page_function_matrix.md`, `plan/requirement/unified_database_schema.md`
**Build decision:** Build

**Lưu ý:** Chỉ admin mới có quyền tạo/sửa/xóa khóa học. Instructor không có quyền truy cập.

## 1. Mục tiêu trang

Admin dùng trang này để:

```text
1. Tạo khóa học mới
2. Chỉnh sửa thông tin khóa học
3. Quản lý trạng thái khóa: draft / published / archived
4. Quản lý level, giá, thời lượng, thumbnail
5. Cấu hình khóa có certificate hay không
6. Cấu hình khóa học tự do hoặc học theo thứ tự
7. Điều hướng sang trang quản lý module/lesson của khóa
```

Trang này chỉ quản lý **thông tin tổng quan của khóa học**.
Nội dung chi tiết như module, video, assignment, final project sẽ quản lý ở:

```text
/admin/lessons
```

---

# 2. Layout đề xuất

```text
/admin/courses

[Page Header]
- Title: Quản lý khóa học
- CTA: Tạo khóa học

[Course Summary]
- Total courses
- Published
- Draft
- Archived nếu cần

[Course Table / Course List]
- Hiển thị toàn bộ 4–6 khóa học

[Create/Edit Course Modal or Page]
```

Không cần Search/Filter Bar ở MVP vì số lượng khóa ít.

---

# 3. Các vùng chính trên trang

## A. Page Header

| Thành phần | Yêu cầu                                   |
| ---------- | ----------------------------------------- |
| Title      | `Quản lý khóa học`                        |
| Subtitle   | “Tạo và quản lý các khóa học của CORTEX.” |
| CTA chính  | `Tạo khóa học`                            |

CTA `Tạo khóa học` mở modal hoặc trang tạo khóa mới.

---

## B. Course Summary Cards

| Card              | Nội dung                   |
| ----------------- | -------------------------- |
| Total courses     | Tổng số khóa               |
| Published courses | Khóa đang public           |
| Draft courses     | Khóa đang nháp             |
| Archived courses  | Khóa đã ẩn/lưu trữ, nếu có |

MVP có thể chỉ cần:

```text
Total courses
Published
Draft
```

---

## C. Course List

Vì số lượng khóa học ban đầu chỉ khoảng **4–6 khóa**, trang này không cần search/filter.

Admin chỉ cần xem toàn bộ khóa học trong một bảng hoặc card list gọn.

Ưu tiên hiển thị khóa theo thứ tự sản phẩm:

```text
1. Free Workshop
2. Starter Mini Course
3. Core Bootcamp
4. Advanced Automation
5. Premium Mentoring
6. B2B Training
```

**Future:** Nếu số lượng khóa tăng nhiều hơn, bổ sung search/filter.

---

# 4. Course Table

## Table columns

| Cột         | Nội dung                                         |
| ----------- | ------------------------------------------------ |
| Thumbnail   | Ảnh khóa học                                     |
| Course name | Tên khóa                                         |
| Level       | Free / Starter / Core / Advanced / Premium / B2B |
| Price       | Giá hoặc custom                                  |
| Status      | draft / published / archived                     |
| Lessons     | Số lesson trong khóa                             |
| Students    | Số học viên enrolled                             |
| Certificate | Có / Không                                       |
| Updated at  | Lần cập nhật gần nhất                            |
| Actions     | Edit / Manage Lessons / Assign Instructor / Preview / Archive |

---

## Ví dụ row

```text
[Thumbnail]
AI Agent & Vibe Coding Bootcamp
Core · Main product
Price: 2.990.000đ
Status: Published
Lessons: 24
Students: 38
Certificate: Yes

[Edit] [Manage Lessons] [Assign Instructor] [Preview] [Archive]
```

---

# 5. Create/Edit Course Form

## Field cần có

| Field                 | Bắt buộc             | Ghi chú                                               |
| --------------------- | -------------------- | ----------------------------------------------------- |
| Course title          | Có                   | Tên khóa học                                          |
| Slug                  | Có                   | URL khóa học                                          |
| Short description     | Có                   | Mô tả ngắn hiển thị trên card                         |
| Full description      | Không bắt buộc ở MVP | Nội dung chi tiết khóa                                |
| Thumbnail             | Nên có               | Ảnh khóa học                                          |
| Level/Product type    | Có                   | Free / Starter / Core / Advanced / Premium / B2B      |
| Price direction       | Có                   | Free / Low / Main product / Higher / Highest / Custom |
| Price amount          | Không bắt buộc       | Có thể để trống nếu custom                            |
| Duration              | Có                   | Ví dụ: 4 tuần                                         |
| Format                | Có                   | Online / Live / Self-paced / Hybrid                   |
| Status                | Có                   | draft / published / archived                          |
| Certificate available | Có                   | true / false                                          |
| Lock mode             | Có                   | free / sequential                                     |
| Featured              | Không bắt buộc       | Có hiển thị nổi bật không                             |

---

# 6. Level / Product Type

Dựa theo bộ sản phẩm em định làm:

| Level    | Product                            | Price direction |
| -------- | ---------------------------------- | --------------- |
| Free     | 1-hour AI workshop                 | Free            |
| Starter  | Prompting + AI tools mini course   | Low             |
| Core     | AI Agent & Vibe Coding Bootcamp    | Main product    |
| Advanced | AI Agent for Business Automation   | Higher          |
| Premium  | 1:1 mentoring / portfolio coaching | Highest         |
| B2B      | AI training for clubs, teams, SMEs | Custom          |

**Rule:**
Premium và B2B vẫn có thể lưu trong `courses`, nhưng ngoài public page `/courses` thì nên tách thành section riêng, không gộp chung 4 course card chính.

---

# 7. Course Status

| Status      | Ý nghĩa                                           |
| ----------- | ------------------------------------------------- |
| `draft`     | Khóa đang soạn, chưa hiển thị public              |
| `published` | Khóa đang public và có thể hiển thị ngoài website |
| `archived`  | Khóa đã ẩn/lưu trữ, không nhận học viên mới       |

## Rule

```text
draft → không hiển thị ngoài public
published → hiển thị ở /courses và /courses/[slug]
archived → không hiển thị public, admin vẫn xem được
```

---

# 8. Actions trên từng khóa

| Action           | Chức năng                                                                  |
| ---------------- | -------------------------------------------------------------------------- |
| `Edit`           | Sửa thông tin khóa (Lưu `updated_by`)                                      |
| `Manage Lessons` | Sang `/admin/lessons?course_id=...`                                        |
| `Assign Instructor` | Gán instructor vào `course_instructors`                                 |
| `Manage FAQ`      | Quản lý FAQ public của khóa qua `course_faqs`                              |
| `Preview`        | Mở `/courses/[slug]`                                                       |
| `Publish`        | Chuyển draft thành published                                               |
| `Unpublish`      | Chuyển published về draft                                                  |
| `Archive`        | Lưu trữ/ẩn khóa (set `status = archived`)                                  |
| `Delete`         | Xóa mềm (set `deleted_at = now()`) chỉ khi chưa có enrollment; nếu đã có học viên thì dùng archive |

---

# 9. Rule quan trọng

| Trường hợp                   | Cách xử lý                                             |
| ---------------------------- | ------------------------------------------------------ |
| Course đã có học viên        | Không xóa vĩnh viễn, chỉ dùng archive hoặc soft delete |
| Slug bị trùng                | Báo lỗi, không cho lưu                                 |
| Thiếu title/slug/status      | Không cho submit                                       |
| Status = published           | Phải có title, slug, mô tả ngắn, thumbnail cơ bản      |
| Certificate available = true | Khóa có thể cấp certificate khi học viên đủ điều kiện  |
| Lock mode = sequential       | Lesson phải học theo thứ tự                            |
| Lock mode = free             | Học viên có thể học tự do                              |
| Course ordering              | Hiển thị khóa theo thứ tự sản phẩm đã định             |
| Total students cache         | Tự động cập nhật khi có enrollment mới/cancelled       |
| Audit trail                  | Mọi thao tác tạo/sửa lưu `created_by` / `updated_by`   |
| Instructor permissions       | Khi assign instructor phải set flags: `can_view_course`, `can_answer_questions`, `can_review_submissions`, `can_view_student_progress`. Instructor chỉ chấm bài & hỗ trợ học viên, không quản lý khóa/video/học viên/announcement. |

---

# 10. Yêu cầu chức năng cụ thể

| Nhóm            | Yêu cầu                                    |
| --------------- | ------------------------------------------ |
| Auth            | Chỉ admin mới vào được                     |
| Course list     | Hiển thị toàn bộ 4–6 khóa học              |
| Course ordering | Hiển thị khóa theo thứ tự sản phẩm đã định |
| Create course   | Tạo khóa học mới                           |
| Edit course     | Sửa thông tin khóa                         |
| Publish/archive | Đổi trạng thái khóa                        |
| Slug validation | Không cho slug trùng                       |
| Delete rule     | Chỉ xóa khóa chưa có học viên              |
| Manage lessons  | Có nút dẫn sang `/admin/lessons`           |
| Assign instructor | Gán instructor và permission flags rõ ràng |
| Public preview  | Có nút xem trang public                    |
| Responsive      | Ưu tiên desktop, mobile xem được           |

---

# 11. Data cần dùng

| Bảng           | Dữ liệu                                |
| -------------- | -------------------------------------- |
| `courses`      | Thông tin khóa học                     |
| `modules`      | Đếm số module nếu cần                  |
| `lessons`      | Đếm số lesson                          |
| `course_instructors` | Instructor được phân công theo khóa và permission flags |
| `course_faqs`  | FAQ public theo khóa, status/order_index |
| `enrollments`  | Đếm số học viên enrolled               |
| `certificates` | Kiểm tra certificate liên quan nếu cần |

---

# 12. Cấu trúc dữ liệu `courses`

| Field                   | Mục đích                                              |
| ----------------------- | ----------------------------------------------------- |
| `id`                    | ID khóa học                                           |
| `title`                 | Tên khóa                                              |
| `slug`                  | URL khóa học                                          |
| `short_description`     | Mô tả ngắn                                            |
| `description`           | Mô tả đầy đủ                                          |
| `thumbnail_url`         | Ảnh khóa học                                          |
| `level`                 | Free / Starter / Core / Advanced / Premium / B2B      |
| `price_direction`       | Free / Low / Main product / Higher / Highest / Custom |
| `price_amount`          | Giá cụ thể nếu có                                     |
| `duration`              | Thời lượng                                            |
| `format`                | Online / Live / Self-paced / Hybrid                   |
| `status`                | draft / published / archived                          |
| `certificate_available` | true / false                                          |
| `lock_mode`             | free / sequential                                     |
| `is_featured`           | true / false                                          |
| `display_order`         | Thứ tự hiển thị khóa                                  |
| `created_at`            | Ngày tạo                                              |
| `updated_at`            | Ngày cập nhật                                         |

Nên có thêm `display_order` để admin kiểm soát thứ tự 4–6 khóa.

---

# 13. Logic chính

## Tạo khóa học

```text
Admin nhập form
→ validate title, slug, level, status
→ kiểm tra slug trùng
→ lưu vào courses
→ status mặc định nên là draft
```

## Publish khóa học

```text
Nếu khóa đủ thông tin bắt buộc:
→ cho chuyển status = published

Nếu thiếu thông tin:
→ báo admin bổ sung trước khi publish
```

## Archive khóa học

```text
Nếu không muốn mở bán nữa:
→ status = archived
→ không hiển thị ngoài public
→ học viên đã enrolled active vẫn có thể học, trừ khi enrollment bị cancelled/expired/refunded
```

## Delete khóa học

```text
Nếu khóa chưa có enrollment:
→ cho xóa

Nếu đã có enrollment:
→ không xóa
→ chỉ cho archive
```

---

# 14. Component cần có

| Component            | Mục đích                            |
| -------------------- | ----------------------------------- |
| `AdminLayout`        | Sidebar + topbar                    |
| `CoursesHeader`      | Title + CTA tạo khóa                |
| `CourseSummaryCards` | Tổng khóa, published, draft         |
| `CourseTable`        | Danh sách khóa                      |
| `CourseFormModal`    | Tạo/sửa khóa                        |
| `StatusBadge`        | draft / published / archived        |
| `LevelBadge`         | Free / Starter / Core / Advanced... |
| `ConfirmDialog`      | Xác nhận archive/delete             |
| `EmptyState`         | Khi chưa có khóa                    |
| `LoadingState`       | Khi đang tải dữ liệu                |

Không cần component `CourseFilterBar` ở MVP.

---

# 15. Empty State

Nếu chưa có khóa học nào:

```text
Chưa có khóa học nào.

Hãy tạo khóa học đầu tiên cho CORTEX.
[Tạo khóa học]
```

---

# 16. UI style đề xuất

| Phần             | Gợi ý                                         |
| ---------------- | --------------------------------------------- |
| Tổng thể         | Admin app, rõ ràng, ít hiệu ứng               |
| Table/List       | Vì chỉ có 4–6 khóa nên bảng phải gọn, dễ nhìn |
| Course thumbnail | Nhỏ, không chiếm quá nhiều chỗ                |
| Status badge     | Màu nhẹ, dễ phân biệt                         |
| Create/Edit form | Chia nhóm thông tin: Basic, Pricing, Settings |
| Desktop          | Table full-width                              |
| Mobile           | Có thể chuyển table thành card list           |

---

# 17. Acceptance Criteria

Trang `/admin/courses` đạt nếu:

| Tiêu chí                                          | Đạt / Không |
| ------------------------------------------------- | ----------- |
| Student không truy cập được                       |             |
| Admin xem được danh sách khóa                     |             |
| Danh sách khóa hiển thị gọn, đúng thứ tự sản phẩm |             |
| Admin tạo được khóa mới                           |             |
| Admin sửa được khóa                               |             |
| Slug không được trùng                             |             |
| Admin publish/archive được khóa                   |             |
| Khóa đã có enrollment không bị xóa nhầm           |             |
| Nút Manage Lessons dẫn đúng `/admin/lessons`      |             |
| Empty state hiển thị đúng                         |             |
| Responsive dùng ổn                                |             |

---

# 18. Chốt scope `/admin/courses`

```text
/admin/courses cần có:

1. Admin layout chung
2. Page header + Create Course button
3. Course summary cards
4. Course table/list hiển thị toàn bộ 4–6 khóa
5. Create/edit course form
6. Status control: draft/published/archived
7. Actions: edit, manage lessons, assign instructor, preview, archive
8. Delete protection nếu course đã có enrollment
9. Empty/loading/error state
```

Nói ngắn gọn: **`/admin/courses` là nơi quản lý “vỏ khóa học”: tên, mô tả, giá, level, trạng thái, certificate và lock mode. Vì số lượng khóa ít nên không cần search/filter ở MVP; chỉ cần bảng/list rõ ràng và đúng thứ tự sản phẩm.**
