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
| `notifications` | Báo cho người hỏi khi có câu trả lời |

---

## 4. Rule chức năng

- Instructor chỉ thấy question thuộc assigned courses.
- Instructor chỉ trả lời/mark resolved/hide nếu `course_instructors.can_answer_questions = true`.
- Reply từ instructor/admin có `is_instructor_answer = true`.
- Mark resolved cập nhật `resolved_at`, `resolved_by`.
- Khi có instructor answer, tạo `notifications.type = question_answered` cho người hỏi.

---

## 5. Acceptance Criteria

| Tiêu chí | Đạt / Không |
| -------- | ----------- |
| Queue lọc đúng open/answered/resolved | |
| Instructor không có `can_answer_questions` không thấy action trả lời | |
| Reply tạo đúng thread theo `parent_id` | |
| Student nhận notification khi được trả lời | |
| Hide không hard delete câu hỏi | |
