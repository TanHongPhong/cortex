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
status: "[[MVP]]"
---

# `/admin/coupons` — Quản lý mã giảm giá

**Status:** MVP
**Owner area:** Admin
**Source of truth:** `plan/web/page_function_matrix.md`, `plan/web/unified_database_schema.md`
**Design source:** [[web/page/admin/design|Admin Dashboard Design — Warm Operational System]]
**Build decision:** Build

## 1. Mục tiêu

Admin tạo, sửa, tạm dừng và theo dõi coupon mà không làm sai lịch sử đơn hàng.

---

## 2. Layout

```text
/admin/coupons

[Page Header + Create Coupon]
[KPI Cards]
[Filter]
[Coupon Table]
[Create/Edit Coupon Form]
[Redemption Drawer]
```

---

## 3. KPI

| KPI | Ý nghĩa |
| --- | ------- |
| Active Coupons | Số coupon đang active |
| Total Redemptions | Số lượt applied |
| Revenue from Coupons | Doanh thu từ đơn paid có coupon |
| Discount Given | Tổng discount_amount từ coupon |
| Expiring Soon | Coupon sắp hết hạn |

---

## 4. Form tạo/sửa coupon

| Nhóm | Field |
| ---- | ----- |
| Basic info | code, name, description, status |
| Discount rule | discount_type, discount_value, max_discount_amount, min_order_amount |
| Usage rule | usage_limit_total, usage_limit_per_user, starts_at, expires_at |
| Applicability | applicable_scope, course_id, level |
| Stacking | is_stackable |

---

## 5. Rule

| Trường hợp | Cách xử lý |
| ---------- | ---------- |
| Code trùng | Không cho lưu |
| Coupon đã có redemption | Không hard delete, dùng archived |
| Coupon expired | Không cho apply, có thể tự set status expired bằng cron |
| Coupon paused | Không cho apply nhưng giữ lịch sử |
| Usage count | Chỉ tăng khi redemption applied |
| Refund | Redemption chuyển refunded, `coupons.used_count` giữ nguyên để audit |

---

## 6. Data cần dùng

| Bảng | Dữ liệu |
| ---- | ------ |
| `coupons` | coupon configuration |
| `coupon_redemptions` | usage history, reserved_expires_at cleanup |
| `orders` | revenue/discount/order status |
| `audit_logs` | Log coupon create/update/archive |
| `courses` | scope theo analysis/level |
| `users` | created_by, updated_by, user sử dụng |

---

## 7. Acceptance Criteria

| Tiêu chí | Đạt / Không |
| -------- | ----------- |
| Student không truy cập được | |
| Admin tạo/sửa coupon được | |
| Không tạo code trùng | |
| Validate discount rule đúng | |
| Hiển thị usage/redemption đúng | |
| Không hard delete coupon đã dùng | |
| Coupon archived không apply được | |

---

## 🗺️ Obsidian Meta

### Tags
- #blueprint/page/admin
- #blueprint/plan
- #blueprint/requirement

### Navigation
- **Breadcrumbs:** [[BLUEPRINT_PLAN_MOC|Plan Home]] / [[web/page|Requirements]] / [[web/page/admin/admin|Admin Dashboard]]

### Relations
- **Outgoing Links:** *None*
- **Incoming Links (Backlinks):** *None*
