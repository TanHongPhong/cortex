# `/admin/announcements` — Quản lý thông báo

**Status:** P1
**Owner area:** Admin
**Source of truth:** `plan/requirement/page_function_matrix.md`, `plan/requirement/unified_database_schema.md`
**Build decision:** Build

**Lưu ý:** Chỉ [[requirement/page/admin/admin|admin]] mới có quyền tạo/sửa/xóa announcement. Instructor không có quyền truy cập.

## 1. Mục tiêu trang

Admin tạo thông báo global hoặc theo khóa học. Khi publish, hệ thống tạo notification cá nhân cho đúng nhóm người nhận.

---

## 2. Layout chính

| Khu vực | Yêu cầu |
| ------- | ------- |
| Header | Title, CTA `Tạo thông báo`. |
| KPI cards | Published, draft, archived, failed deliveries. |
| Table | Title, scope, course, priority, status, published_at, created_by. |
| Filters | Scope, course, status, priority. |
| Form | Scope global/course, title, content, priority, status. |
| Actions | Save draft, publish, archive. |

---

## 3. Data cần dùng

| Bảng | Dữ liệu |
| ---- | ------ |
| `announcements` | Nội dung nguồn của thông báo |
| [[requirement/page/student/notifications|`notifications`]] | Delivery cá nhân sau khi publish |
| `courses` | Course scope |
| `users`, `enrollments` | Xác định người nhận |

---

## 4. Rule chức năng

- `scope = global` gửi cho toàn bộ user active.
- `scope = course` chỉ gửi cho enrolled student của course và instructor được phân công.
- Publish không sửa ngầm notification đã delivered; nếu sửa nội dung quan trọng, tạo announcement mới.
- Archive announcement không xóa notification lịch sử.

---

## 5. Acceptance Criteria

| Tiêu chí | Đạt / Không |
| -------- | ----------- |
| Admin tạo draft/publish/archive được | |
| Course announcement chỉ tới đúng người có quyền học/course assignment | |
| Publish tạo `[[requirement/page/student/notifications|notifications]].type = announcement` | |
| Có empty/error state | |
| Không hard delete announcement đã publish | |

---

## 🗺️ Obsidian Meta

### Tags
- #cortex/page/admin
- #cortex/plan
- #cortex/requirement

### Navigation
- **Breadcrumbs:** [[CORTEX_PLAN_MOC|Plan Home]] / [[requirement/page|Requirements]] / [[requirement/page/admin/admin|Admin Dashboard]]

### Relations
- **Outgoing Links:** [[requirement/page/admin/admin|Admin Dashboard — Requirement]], [[requirement/page/student/notifications|/notifications — Thông báo của tôi]]
- **Incoming Links (Backlinks):** *None*
