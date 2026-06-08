---
categories:
  - "[[Projects]]"
  - "[[Blueprint]]"
  - "[[Blueprint Web]]"
  - "[[Requirements]]"
  - "[[Student Portal]]"
type: ["[[Page Spec]]"]
org: ["[[Blueprint]]"]
start: 2026-06-02
year: 2026
url: https://github.com/TanHongPhong/blueprint
status: "[[Legacy]]"
---

# `/assignments` — Legacy / Không ưu tiên MVP

**Status:** Legacy
**Owner area:** Student
**Source of truth:** `plan/web/page_function_matrix.md`, `plan/web/unified_database_schema.md`
**Design source:** [[web/page/student/design|Student Portal Design — Warm Learning Workspace]]
**Build decision:** Not MVP

**Scope / Build decision:** Không build trong MVP/P1 vì assignment và final project đã nằm trong lesson flow.

**Mục tiêu cũ:** học viên xem và nộp bài.

| Khu vực         | Future nếu cần trang tổng hợp              |
| --------------- | ------------------------------------------- |
| Assignment list | Danh sách bài tập/project theo khóa.        |
| Status          | Not submitted, pending, approved, rejected. |
| Feedback        | Hiển thị nhận xét [[web/page/admin/admin|admin]] nếu có.             |
| CTA             | Nộp bài hoặc chỉnh sửa nếu chưa được duyệt. |

---

## Quyết định hiện tại

Tất cả assignment và final project phải nằm trong lesson flow:

```text
/learn/[course]/[lesson]
```

Lý do:

| Lý do | Giải thích |
| ----- | ---------- |
| Ít rủi ro dữ liệu | Mỗi bài nộp luôn gắn với `lesson_id` cụ thể |
| Ít route trùng | Không có 2 nơi nộp bài khác nhau |
| Progress rõ hơn | Submission approved trực tiếp tính completed cho lesson |
| Certificate dễ tính | Final project approved nằm trong cùng analysis/lesson structure |

---

## Data cần dùng

| Bảng | Dữ liệu |
| ---- | ------ |
| [[web/page/instructor/submissions|`submissions`]] | Chỉ dùng nếu Future cần trang tổng hợp bài nộp |

---

## Acceptance Criteria

| Tiêu chí | Đạt / Không |
| -------- | ----------- |
| Route này không được build trong MVP/P1 | |
| Tất cả assignment mở tại `/learn/[course]/[lesson]` | |

---

## 🗺️ Obsidian Meta

### Tags
- #blueprint/page/student
- #blueprint/plan
- #blueprint/requirement

### Navigation
- **Breadcrumbs:** [[BLUEPRINT_PLAN_MOC|Plan Home]] / [[web/page|Requirements]] / [[web/page/student/dashboard|Student Portal]]

### Relations
- **Outgoing Links:** [[web/page/admin/admin|Admin Dashboard — Requirement]], [[web/page/instructor/submissions|/instructor/submissions — Duyệt bài nộp]]
- **Incoming Links (Backlinks):** [[analysis/course_eng|A. Roadmap từng khóa AI Agent quốc tế]]
