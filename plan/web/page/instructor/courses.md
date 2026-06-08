---
categories:
  - "[[Projects]]"
  - "[[Blueprint]]"
  - "[[Blueprint Web]]"
  - "[[Requirements]]"
  - "[[Instructor Workspace]]"
type: ["[[Page Spec]]"]
org: ["[[Blueprint]]"]
start: 2026-06-02
year: 2026
url: https://github.com/TanHongPhong/blueprint
status: "[[P1]]"
---

# `/instructor/courses` — Khóa được phân công

**Status:** P1
**Owner area:** Instructor
**Source of truth:** `plan/web/page_function_matrix.md`, `plan/web/unified_database_schema.md`
**Design source:** [[web/page/instructor/design|Instructor Workspace Design — Focused Review Console]]
**Build decision:** Build
**Covered routes:** `/instructor/courses` and read-only assigned-course detail inside the same page.

## 1. Mục tiêu trang

Instructor xem curriculum và trạng thái học viên của các khóa được phân công. Mặc định là read-only; nếu assignment có `can_edit_course_content = true`, instructor có lối mở content edit cho khóa đó.

**Nguyên tắc:** Instructor chỉ xử lý khóa được phân công. Content edit chỉ áp dụng khi `course_instructors.can_edit_course_content = true`; các quyền tài chính, học viên, certificate và phân quyền vẫn là [[web/page/admin/admin|admin]]. Riêng quyền tạo thông báo (announcements) đã được phân quyền cho Instructor đối với các khóa học phụ trách.

---

## 2. Layout chính

| Khu vực | Yêu cầu |
| ------- | ------- |
| Course list | Tên khóa, status, số học viên, pending [[web/page/instructor/submissions|submissions]]. |
| Course detail | Module/lesson read-only mặc định, lesson type, resource summary. |
| Student progress | Xem tiến độ học viên nếu `can_view_student_progress = true`. |
| Actions | Xem submission queue theo permission flags; nếu `can_edit_course_content = true` thì hiện `Edit Course Content` và `Manage Lessons`. |

---

## 3. Data cần dùng

| Bảng | Dữ liệu |
| ---- | ------ |
| `courses` | Khóa được phân công |
| `course_instructors` | Permission phân công khóa |
| `modules`, `lessons` | Curriculum; read-only mặc định, editable qua admin content routes nếu có `can_edit_course_content` |
| [[web/page/instructor/submissions|`submissions`]] | Pending count |

---

## 4. Rule chức năng

- Instructor mặc định **chỉ xem** curriculum (module/lesson).
- Instructor có `can_edit_course_content = true` được sửa course content, FAQ, module, lesson, resource, quiz và video asset của assigned course qua `/admin/courses*` và `/admin/lessons*`.
- Instructor content edit **không được** tạo khóa mới, assign instructor/staff, publish/unpublish/archive/delete course, module hoặc lesson.
- Instructor **được quyền** tạo/sửa/xóa announcement — nhưng chỉ giới hạn trong phạm vi các khóa học được phân công.
- Instructor **không được** sửa giá, publish/archive course hoặc xem doanh thu.
- Instructor chỉ thấy submission queue nếu có permission flag tương ứng.
- `can_view_student_progress = true` mới được xem tiến độ học viên trong khóa.

---

## 5. Acceptance Criteria

| Tiêu chí | Đạt / Không |
| -------- | ----------- |
| Chỉ thấy assigned courses | |
| Không có finance metrics | |
| Curriculum hiển thị đúng module/lesson | |
| Instructor không có `can_edit_course_content` không thấy action sửa lesson hoặc upload video | |
| Instructor có `can_edit_course_content` thấy link content edit cho assigned course | |
| Được tạo/sửa announcement cho khóa được gán | |
| Hiển thị danh mục announcements trong Workspace | |

---

## 🗺️ Obsidian Meta

### Tags
- #blueprint/page/instructor
- #blueprint/plan
- #blueprint/requirement

### Navigation
- **Breadcrumbs:** [[BLUEPRINT_PLAN_MOC|Plan Home]] / [[web/page|Requirements]] / [[web/page/instructor/overview|Instructor Workspace]]

### Relations
- **Outgoing Links:** [[web/page/admin/admin|Admin Dashboard — Requirement]], [[web/page/instructor/submissions|/instructor/submissions — Duyệt bài nộp]]
- **Incoming Links (Backlinks):** *None*
