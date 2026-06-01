# `/submit-project` — Legacy / Không ưu tiên MVP

**Status:** Legacy
**Owner area:** Student
**Source of truth:** `plan/requirement/page_function_matrix.md`, `plan/requirement/unified_database_schema.md`
**Build decision:** Not MVP

**Scope / Build decision:** Không build trong MVP/P1 vì final project đã là một lesson.

**Mục tiêu cũ:** học viên gửi project cuối khóa.

| Khu vực      | Future nếu cần route riêng                          |
| ------------ | ---------------------------------------------------- |
| Form         | Tên project, mô tả, link demo, link source, ghi chú. |
| File upload  | Legacy route không build MVP/P1; nếu upload nội bộ thì dùng `files`, nếu không dùng link ngoài. |
| Submit state | Sau khi gửi, status là `pending`.                    |
| Edit rule    | Cho sửa nếu bài chưa được approved.                  |

---

## Quyết định hiện tại

Final project là một lesson:

```text
lessons.lesson_type = final_project
submissions.lesson_id = final_project_lesson_id
```

Form nộp project đặt tại:

```text
/learn/[course]/[lesson]
```

Không tạo route nộp project riêng để tránh bài nộp không gắn lesson, khó tính progress và khó xét certificate.

---

## Data cần dùng

| Bảng | Dữ liệu |
| ---- | ------ |
| `submissions` | Chỉ dùng nếu Future cần trang project submission riêng |

---

## Acceptance Criteria

| Tiêu chí | Đạt / Không |
| -------- | ----------- |
| Route này không được build trong MVP/P1 | |
| Final project mở tại `/learn/[course]/[lesson]` | |
