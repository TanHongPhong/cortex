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

# `/admin/audit-logs` — Lịch sử thao tác

**Status:** P1
**Owner area:** Admin
**Source of truth:** `plan/web/page_function_matrix.md`, `plan/web/unified_database_schema.md`
**Design source:** [[web/page/admin/design|Admin Dashboard Design — Warm Operational System]]
**Build decision:** Build

## 1. Mục tiêu trang

Admin xem lịch sử thao tác nhạy cảm để truy vết lỗi dữ liệu, thao tác tài chính và thay đổi quyền.

---

## 2. Layout chính

| Khu vực | Yêu cầu |
| ------- | ------- |
| Table | Actor, role, action, entity_type, entity_id, created_at. |
| Filters | Actor, action, entity_type, date range. |
| Detail drawer | Metadata JSON, IP address nếu có. |
| Export | CSV theo filter nếu cần. |
| Empty state | “Chưa có audit log trong khoảng lọc.” |

---

## 3. Data cần dùng

| Bảng | Dữ liệu |
| ---- | ------ |
| `audit_logs` | Log append-only |
| `users` | Actor |

---

## 4. Rule chức năng

- Trang này read-only.
- Không sửa/xóa audit log qua UI thường.
- Action filter phải dùng canonical action list trong `unified_database_schema.md`.
- Bắt buộc hỗ trợ các nhóm action: commerce, learning access, certificate/template, course/content, video, people/roles, P1 ops/moderation.
- Ví dụ action canonical: `payment.webhook_processed`, `payment.qr_webhook_verified`, `order.mark_paid_from_qr_webhook`, `order.refund_to_balance`, `certificate.issue`, `certificate.revoke`, `module.create`, `module.update`, `module.reorder`, `lesson.create`, `lesson.update`, `lesson.type_change`, `lesson.reorder`, `quiz.create`, `quiz.update`, `video_asset.retry`, `video_asset.fail`, `submission.review`, `announcement.publish`, `review.hide`.
- Instructor không được xem audit log toàn hệ thống.

---

## 5. Acceptance Criteria

| Tiêu chí | Đạt / Không |
| -------- | ----------- |
| Admin lọc/xem chi tiết audit log được | |
| Không có action sửa/xóa log | |
| Metadata đủ để truy vết entity bị thay đổi | |
| Instructor/student không truy cập được | |

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
