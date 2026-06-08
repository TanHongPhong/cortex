---
categories:
  - "[[Projects]]"
  - "[[Blueprint]]"
  - "[[Blueprint Web]]"
  - "[[Requirements]]"
  - "[[Admin Dashboard]]"
type: ["[[Page Spec]]"]
org: ["[[Blueprint]]"]
start: 2026-06-02
year: 2026
url: https://github.com/TanHongPhong/blueprint
status: "[[P1]]"
---

# `/admin/certificate-templates` — Quản lý template chứng chỉ

**Status:** P1
**Owner area:** Admin
**Source of truth:** `plan/web/page_function_matrix.md`, `plan/web/unified_database_schema.md`
**Design source:** [[web/page/admin/design|Admin Dashboard Design — Warm Operational System]]
**Build decision:** Build

## 1. Mục tiêu trang

Admin tạo, preview và kích hoạt template dùng khi cấp [[web/page/website/certificate|certificate]].

---

## 2. Layout chính

| Khu vực | Yêu cầu |
| ------- | ------- |
| Header | Title, CTA `Tạo template`. |
| Template table | Name, course scope, version, status, preview. |
| Editor | Name, course_id optional, preview_image_url, layout_json. |
| Preview | Render mẫu với tên học viên/khóa giả lập. |
| Actions | Save draft, activate, archive. |

---

## 3. Data cần dùng

| Bảng | Dữ liệu |
| ---- | ------ |
| `certificate_templates` | Template layout/version/status |
| `courses` | Template theo khóa nếu có |
| `certificates` | Template đã được dùng khi cấp |

---

## 4. Rule chức năng

- Chỉ template `active` được dùng để issue [[web/page/website/certificate|certificate]].
- Có thể có template global hoặc template riêng cho course.
- Certificate đã cấp lưu snapshot template, không render lại bằng template mới.
- Không archive template nếu policy yêu cầu giữ để audit, hoặc archive nhưng vẫn cho [[web/page/website/certificate|certificate]] cũ trỏ tới.

---

## 5. Acceptance Criteria

| Tiêu chí | Đạt / Không |
| -------- | ----------- |
| Admin tạo/sửa/preview template được | |
| Chỉ active template dùng để cấp [[web/page/website/certificate|certificate]] | |
| Certificate cũ giữ snapshot khi template đổi | |
| Empty/error state rõ ràng | |

---

## 🗺️ Obsidian Meta

### Tags
- #blueprint/page/admin
- #blueprint/plan
- #blueprint/requirement

### Navigation
- **Breadcrumbs:** [[BLUEPRINT_PLAN_MOC|Plan Home]] / [[web/page|Requirements]] / [[web/page/admin/admin|Admin Dashboard]]

### Relations
- **Outgoing Links:** [[web/page/website/certificate|/certificate — Trang chứng chỉ]]
- **Incoming Links (Backlinks):** *None*
