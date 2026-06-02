# `/instructor/questions` — Trả lời Q&A

**Status:** P1
**Owner area:** Instructor
**Source of truth:** `plan/requirement/page_function_matrix.md`, `plan/requirement/unified_database_schema.md`
**Build decision:** Build

## 1. Mục tiêu trang

Instructor xử lý câu hỏi học viên trong từng lesson, trả lời và mark resolved.

---

## 2. Layout chính

| Khu vực | Yêu cầu |
| ------- | ------- |
| Question queue | Course, lesson, student, status, created_at. |
| Filters | Course, lesson, open/answered/resolved/hidden. |
| Thread drawer | Câu hỏi, replies, instructor/admin answers. |
| Reply composer | Trả lời bằng text, có preview đơn giản. |
| Actions | Reply, mark resolved, hide nếu vi phạm. |

---

## 3. Data cần dùng

| Bảng | Dữ liệu |
| ---- | ------ |
| `lesson_questions` | Thread Q&A |
| `course_instructors` | Xác định khóa instructor được trả lời |
| `users` | Người hỏi/trả lời |
| `courses`, `lessons` | Ngữ cảnh |
| [[requirement/page/student/notifications|`notifications`]] | Báo cho người hỏi khi có câu trả lời |

---

## 4. Rule chức năng

- Instructor chỉ thấy question thuộc assigned courses.
- Instructor chỉ trả lời/mark resolved/hide nếu `course_instructors.can_answer_questions = true`.
- Reply từ instructor/admin có `is_instructor_answer = true`.
- Mark resolved cập nhật `resolved_at`, `resolved_by`.
- Khi có instructor answer, tạo `[[requirement/page/student/notifications|notifications]].type = question_answered` cho người hỏi.

---

## 5. Acceptance Criteria

| Tiêu chí | Đạt / Không |
| -------- | ----------- |
| Queue lọc đúng open/answered/resolved | |
| Instructor không có `can_answer_questions` không thấy action trả lời | |
| Reply tạo đúng thread theo `parent_id` | |
| Student nhận notification khi được trả lời | |
| Hide không hard delete câu hỏi | |

---

## 🗺️ Obsidian Meta

### Tags
- #cortex/page/instructor
- #cortex/plan
- #cortex/requirement

### Navigation
- **Breadcrumbs:** [[CORTEX_PLAN_MOC|Plan Home]] / [[requirement/page|Requirements]] / [[requirement/page/instructor/overview|Instructor Workspace]]

### Relations
- **Outgoing Links:** [[requirement/page/student/notifications|/notifications — Thông báo của tôi]]
- **Incoming Links (Backlinks):** [[requirement/architecture|Architecture — Kiến trúc kỹ thuật CORTEX]], [[requirement/page|1. Public Website — phần người ngoài nhìn thấy]], [[requirement/page/admin/admin|Admin Dashboard — Requirement]], [[requirement/page/admin/admin-overview|/admin — Admin Overview]], [[requirement/page/instructor/courses|/instructor/courses — Khóa được phân công]], [[requirement/page/instructor/overview|/instructor — Instructor Overview]]
