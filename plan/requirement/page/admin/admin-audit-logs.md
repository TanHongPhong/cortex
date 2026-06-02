# `/admin/audit-logs` — Lịch sử thao tác

**Status:** P1
**Owner area:** Admin
**Source of truth:** `plan/requirement/page_function_matrix.md`, `plan/requirement/unified_database_schema.md`
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
- Bắt buộc log: confirm paid, refund to balance, balance reset, issue/revoke [[requirement/page/website/certificate|certificate]], publish/archive course, change role, instructor assignment/permission change, review moderation, announcement publish/archive, [[requirement/page/student/coupon|coupon]] create/update/archive, webhook manual match, resource publish/archive, video asset retry/fail, enrollment cancel/override, delete/restore content.
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
- #cortex/page/admin
- #cortex/plan
- #cortex/requirement

### Navigation
- **Breadcrumbs:** [[CORTEX_PLAN_MOC|Plan Home]] / [[requirement/page|Requirements]] / [[requirement/page/admin/admin|Admin Dashboard]]

### Relations
- **Outgoing Links:** [[requirement/page/student/coupon|/coupon — Coupon của tôi / Nhập mã giảm giá]], [[requirement/page/website/certificate|/certificate — Trang chứng chỉ]]
- **Incoming Links (Backlinks):** [[PLAN_CONFLICT_AUDIT|Plan Conflict Audit - CORTEX Requirements]]
