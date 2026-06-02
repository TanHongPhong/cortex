---
categories:
  - "[[Projects]]"
  - "[[cortex.ai]]"
  - "[[cortex.ai Web]]"
  - "[[Requirements]]"
  - "[[Student Portal]]"
type: ["[[Page Spec]]"]
org: ["[[cortex.ai]]"]
start: 2026-06-02
year: 2026
url: https://github.com/TanHongPhong/cortex
status: "[[Optional/P1]]"
---

# `/coupon` — Coupon của tôi / Nhập mã giảm giá

**Status:** Optional/P1
**Owner area:** Student
**Source of truth:** `plan/web/page_function_matrix.md`, `plan/web/unified_database_schema.md`
**Build decision:** Optional

## 1. Mục tiêu

Trang này là trang phụ, không bắt buộc trong MVP nếu [[web/page/student/checkout|checkout]] đã có ô nhập coupon. Nếu build, trang dùng để học viên xem mã đang có, hiểu điều kiện dùng và copy mã sang [[web/page/student/checkout|checkout]].

---

## 2. Quyết định scope

| Hạng mục | Quyết định |
| -------- | ---------- |
| MVP [[web/page/student/checkout|checkout]] | Coupon input nằm trực tiếp trong `/checkout/:courseSlug` |
| `/coupon` | Trang phụ, chỉ build nếu muốn user có nơi xem mã/campaign |
| Coupon ownership | Coupon không nhất thiết thuộc riêng một user |
| Coupon history | Lấy từ `coupon_redemptions` của current user |

---

## 3. Layout nếu build

```text
Coupon

[Available Coupons]
[Used Coupons]
[Coupon Rules]
```

---

## 4. Data cần dùng

| Bảng | Dữ liệu |
| ---- | ------ |
| `coupons` | code, discount_type, value, scope, starts/expires, status |
| `coupon_redemptions` | user đã dùng mã nào, order nào, redeemed_amount, status, reserved_expires_at |
| `orders` | đơn đã áp dụng coupon |
| `courses` | analysis/level áp dụng |

---

## 5. Rule an toàn

| Trường hợp | Rule |
| ---------- | ---- |
| Coupon expired/paused/archived | Không hiển thị trong available |
| Coupon first_order | Chỉ valid nếu user chưa có order paid |
| Coupon course-specific | Chỉ valid khi [[web/page/student/checkout|checkout]] đúng course |
| Coupon level-specific | Chỉ valid khi course.level khớp |
| Usage per user | Check `coupon_redemptions` status applied/reserved; reserved quá `reserved_expires_at` không tính giữ chỗ |

---

## 6. Acceptance Criteria

| Tiêu chí | Đạt / Không |
| -------- | ----------- |
| Chỉ user [[web/page/student/login|login]] mới xem được | |
| Hiển thị coupon còn hiệu lực | |
| Hiển thị điều kiện dùng rõ ràng | |
| Copy code hoạt động | |
| Không hiển thị coupon archived/deleted | |

---

## 🗺️ Obsidian Meta

### Tags
- #cortex/page/student
- #cortex/plan
- #cortex/requirement

### Navigation
- **Breadcrumbs:** [[CORTEX_PLAN_MOC|Plan Home]] / [[web/page|Requirements]] / [[web/page/student/dashboard|Student Portal]]

### Relations
- **Outgoing Links:** [[web/page/student/checkout|/checkout/:courseSlug — Thanh toán khóa học]], [[web/page/student/login|/login — Đăng nhập]]
- **Incoming Links (Backlinks):** [[PLAN_CONFLICT_AUDIT|Plan Conflict Audit - CORTEX Requirements]], [[web/architecture|Architecture — Kiến trúc kỹ thuật CORTEX]], [[web/page|1. Public Website — phần người ngoài nhìn thấy]], [[web/page/admin/admin|Admin Dashboard — Requirement]], [[web/page/admin/admin-audit-logs|/admin/audit-logs — Lịch sử thao tác]], [[web/page/admin/admin-coupons|/admin/coupons — Quản lý mã giảm giá]], [[web/page/admin/admin-orders|/admin/orders — Quản lý đơn hàng]], [[web/page/admin/admin-overview|/admin — Admin Overview]], [[web/page/admin/admin-revenue|/admin/revenue — Dashboard doanh thu]], [[web/page/student/checkout|/checkout/:courseSlug — Thanh toán khóa học]], [[web/page_function_matrix|Page Function Matrix — CORTEX]], [[web/unified_database_schema|💎 Unified Database Schema - CORTEX Project]]
