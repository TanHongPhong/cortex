---
categories:
  - "[[Projects]]"
  - "[[cortex.ai]]"
  - "[[cortex.ai Web]]"
  - "[[Requirements]]"
  - "[[Admin Dashboard]]"
type: ["[[Page Spec]]"]
org: ["[[cortex.ai]]"]
start: 2026-06-02
year: 2026
url: https://github.com/TanHongPhong/cortex
status: "[[P1]]"
---

# `/admin/resources` — Quản lý Resources Hub

**Status:** P1
**Owner area:** Admin
**Source of truth:** `plan/web/page_function_matrix.md`, `plan/web/unified_database_schema.md`
**Build decision:** Build tối thiểu để vận hành `/blog` và homepage resources.

---

## 1. Mục tiêu

Admin tạo, sửa, publish/archive tài liệu public cho Resources Hub. Đây là nơi vận hành bảng `resources`, không tạo bảng nội dung public song song.

---

## 2. Layout chính

| Khu vực | Yêu cầu |
| ------- | ------- |
| Resource table | Title, type, category, course, access_type, status, published_at. |
| Filters | Status, resource_type, category, course. |
| Editor | Title, slug, excerpt, content, file/external URL, thumbnail, access_type. |
| Preview | Xem resource trước khi publish. |

---

## 3. Data cần dùng

| Bảng | Dữ liệu |
| ---- | ------ |
| `resources` | Nội dung, type, course_id, access_type, status |
| `files` | File download/thumbnail nếu upload nội bộ |
| `courses` | Gắn resource với course nếu là course resource |
| `leads` | Lead capture khi `access_type = email_required` |

---

## 4. Permission / Rule

- Chỉ [[web/page/admin/admin|admin]] được tạo/sửa/publish/archive resource.
- Public [[web/page|page]] chỉ hiển thị `resources.status = published`.
- `access_type = email_required` phải tạo `leads` trước khi cho tải file.
- Lead từ resource phải ghi `source = resource_download`, `source_entity_type = resource`, `source_entity_id = resources.id`.
- `access_type = student_only` yêu cầu user có enrollment active với `resources.course_id`.
- Nếu resource dùng file nội bộ thì dùng `file_id`; nếu là link ngoài thì dùng `external_url`.

---

## 5. Empty/Error State

| State | UI |
| ----- | -- |
| Chưa có resource | Hiển thị empty state và CTA `Create resource`. |
| File lỗi | Báo lỗi upload/file unavailable, không publish nếu resource download thiếu file/link. |
| Slug trùng | Báo lỗi slug đã tồn tại. |

---

## 6. Acceptance Criteria

| Tiêu chí | Đạt / Không |
| -------- | ----------- |
| Admin tạo/sửa/publish/archive resource được | |
| Public `/blog` chỉ lấy resource published | |
| Resource download dùng `file_id` hoặc `external_url` đúng rule | |
| Lead capture hoạt động với `access_type = email_required` | |
| Lead capture lưu được source entity của resource | |
| Course resource lọc được bằng `course_id` | |

---

## 🗺️ Obsidian Meta

### Tags
- #cortex/page/admin
- #cortex/plan
- #cortex/requirement

### Navigation
- **Breadcrumbs:** [[CORTEX_PLAN_MOC|Plan Home]] / [[web/page|Requirements]] / [[web/page/admin/admin|Admin Dashboard]]

### Relations
- **Outgoing Links:** [[web/page|1. Public Website — phần người ngoài nhìn thấy]], [[web/page/admin/admin|Admin Dashboard — Requirement]]
- **Incoming Links (Backlinks):** *None*
