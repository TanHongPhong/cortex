# `/instructor/courses` — Khóa được phân công

**Status:** P1
**Owner area:** Instructor
**Source of truth:** `plan/requirement/page_function_matrix.md`, `plan/requirement/unified_database_schema.md`
**Build decision:** Build

## 1. Mục tiêu trang

Instructor xem curriculum và trạng thái học viên của các khóa được phân công (read-only).

**Nguyên tắc:** Instructor chỉ xem — không sửa lesson content, không upload video, không quản lý khóa/học viên. Tất cả quản lý nội dung là quyền của admin.

---

## 2. Layout chính

| Khu vực | Yêu cầu |
| ------- | ------- |
| Course list | Tên khóa, status, số học viên, pending submissions, open questions. |
| Course detail | Module/lesson **read-only**, lesson type, resource summary. |
| Student progress | Xem tiến độ học viên nếu `can_view_student_progress = true`. |
| Actions | Xem submission queue, question queue theo permission flags. |

---

## 3. Data cần dùng

| Bảng | Dữ liệu |
| ---- | ------ |
| `courses` | Khóa được phân công |
| `course_instructors` | Permission phân công khóa |
| `modules`, `lessons` | Curriculum (read-only) |
| `submissions` | Pending count |
| `lesson_questions` | Open question count |

---

## 4. Rule chức năng

- Instructor **chỉ xem** curriculum (module/lesson) — không được sửa, thêm, xóa lesson.
- Instructor **không được** upload video, sửa lesson content, quản lý module.
- Instructor **không được** tạo/sửa/xóa announcement — đây là quyền của admin.
- Instructor **không được** sửa giá, publish/archive course hoặc xem doanh thu.
- Instructor chỉ thấy submission queue và question queue nếu có permission flag tương ứng.
- `can_view_student_progress = true` mới được xem tiến độ học viên trong khóa.

---

## 5. Acceptance Criteria

| Tiêu chí | Đạt / Không |
| -------- | ----------- |
| Chỉ thấy assigned courses | |
| Không có finance metrics | |
| Curriculum hiển thị đúng module/lesson (read-only) | |
| Không có action sửa/xóa lesson hoặc upload video | |
| Không có action tạo/sửa announcement | |
| Không hiển thị action announcement | |