# `/admin/coupons` — Quản lý mã giảm giá

**Status:** MVP
**Owner area:** Admin
**Source of truth:** `plan/requirement/page_function_matrix.md`, `plan/requirement/unified_database_schema.md`
**Build decision:** Build

## 1. Mục tiêu

Admin tạo, sửa, tạm dừng và theo dõi [[requirement/page/student/coupon|coupon]] mà không làm sai lịch sử đơn hàng.

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
| Active Coupons | Số [[requirement/page/student/coupon|coupon]] đang active |
| Total Redemptions | Số lượt applied |
| Revenue from Coupons | Doanh thu từ đơn paid có [[requirement/page/student/coupon|coupon]] |
| Discount Given | Tổng discount_amount từ [[requirement/page/student/coupon|coupon]] |
| Expiring Soon | Coupon sắp hết hạn |

---

## 4. Form tạo/sửa [[requirement/page/student/coupon|coupon]]

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
| `coupons` | [[requirement/page/student/coupon|coupon]] configuration |
| `coupon_redemptions` | usage history, reserved_expires_at cleanup |
| `orders` | revenue/discount/order status |
| `audit_logs` | Log [[requirement/page/student/coupon|coupon]] create/update/archive |
| `courses` | scope theo course/level |
| `users` | created_by, updated_by, user sử dụng |

---

## 7. Acceptance Criteria

| Tiêu chí | Đạt / Không |
| -------- | ----------- |
| Student không truy cập được | |
| Admin tạo/sửa [[requirement/page/student/coupon|coupon]] được | |
| Không tạo code trùng | |
| Validate discount rule đúng | |
| Hiển thị usage/redemption đúng | |
| Không hard delete [[requirement/page/student/coupon|coupon]] đã dùng | |
| Coupon archived không apply được | |

---

## 🗺️ Obsidian Meta

### Tags
- #cortex/page/admin
- #cortex/plan
- #cortex/requirement

### Navigation
- **Breadcrumbs:** [[CORTEX_PLAN_MOC|Plan Home]] / [[requirement/page|Requirements]] / [[requirement/page/admin/admin|Admin Dashboard]]

### Relations
- **Outgoing Links:** [[requirement/page/student/coupon|/coupon — Coupon của tôi / Nhập mã giảm giá]]
- **Incoming Links (Backlinks):** *None*
