---
categories:
  - "[[Projects]]"
  - "[[cortex.ai]]"
  - "[[cortex.ai Web]]"
  - "[[Requirements]]"
  - "[[Instructor Workspace]]"
type: ["[[Page Spec]]"]
org: ["[[cortex.ai]]"]
start: 2026-06-02
year: 2026
url: https://github.com/TanHongPhong/cortex
status: "[[P1]]"
---

# `/instructor/courses` — Khóa được phân công

**Status:** P1
**Owner area:** Instructor
**Source of truth:** `plan/web/page_function_matrix.md`, `plan/web/unified_database_schema.md`
**Build decision:** Build
**Covered routes:** `/instructor/courses` and read-only assigned-course detail inside the same page.

## 1. Mục tiêu trang

Instructor xem curriculum và trạng thái học viên của các khóa được phân công (read-only).

**Nguyên tắc:** Instructor chỉ xem — không sửa lesson content, không upload video, không quản lý khóa/học viên. Quản lý nội dung course/lesson là quyền của [[web/page/admin/admin|admin]] hoặc `course_editor` trong `/admin/courses*` và `/admin/lessons*`.

---

## 2. Layout chính

| Khu vực | Yêu cầu |
| ------- | ------- |
| Course list | Tên khóa, status, số học viên, pending [[web/page/instructor/submissions|submissions]], open [[web/page/instructor/questions|questions]]. |
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
| [[web/page/instructor/submissions|`submissions`]] | Pending count |
| `lesson_questions` | Open question count |

---

## 4. Rule chức năng

- Instructor **chỉ xem** curriculum (module/lesson) — không được sửa, thêm, xóa lesson.
- Instructor **không được** upload video, sửa lesson content, quản lý module.
- Instructor **không được** tạo/sửa/xóa announcement — đây là quyền của [[web/page/admin/admin|admin]].
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

---

## 🗺️ Obsidian Meta

### Tags
- #cortex/page/instructor
- #cortex/plan
- #cortex/requirement

### Navigation
- **Breadcrumbs:** [[CORTEX_PLAN_MOC|Plan Home]] / [[web/page|Requirements]] / [[web/page/instructor/overview|Instructor Workspace]]

### Relations
- **Outgoing Links:** [[web/page/admin/admin|Admin Dashboard — Requirement]], [[web/page/instructor/questions|/instructor/questions — Trả lời Q&A]], [[web/page/instructor/submissions|/instructor/submissions — Duyệt bài nộp]]
- **Incoming Links (Backlinks):** *None*
