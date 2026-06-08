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
status: "[[P2]]"
---

# `/admin/revenue` — Dashboard doanh thu

**Status:** P2
**Owner area:** Admin
**Source of truth:** `plan/web/page_function_matrix.md`, `plan/web/unified_database_schema.md`
**Design source:** [[web/page/admin/design|Admin Dashboard Design — Warm Operational System]]
**Build decision:** Future

## 1. Mục tiêu

Báo cáo doanh thu theo thời gian, khóa học, payment method, coupon và referral sau khi `orders`/`payment_transactions` đã ổn định.

---

## 2. Scope

Trang này là P2, không block MVP [[web/page/student/checkout|checkout]].

MVP báo cáo doanh thu trước mắt nằm trong `/admin/orders`.

---

## 3. KPI đề xuất

| KPI | Cách tính |
| --- | --------- |
| Gross Revenue | Tổng `orders.amount` của paid orders |
| Discount Given | Tổng `orders.discount_amount` của paid orders |
| Net Revenue | Tổng `orders.final_amount` của paid orders |
| Refund Amount | Tổng order/refund theo status refunded; đây là credit vào account balance nội bộ |
| Revenue by Course | Group by `course_id` + snapshot title |
| Coupon Revenue | Paid orders có `coupon_id` |
| Referral Revenue | Paid orders có `referral_code_id` |

---

## 4. Rule

| Trường hợp | Rule |
| ---------- | ---- |
| Course đổi tên | Report hiển thị snapshot trong order |
| Refunded order | Tách riêng refund, không cộng vào paid revenue hiện tại; không hiểu là gateway refund tự động |
| Deleted course | Vẫn report được nhờ snapshot |
| Coupon archived | Lịch sử revenue vẫn giữ |

---

## 5. Data cần dùng

| Bảng | Dữ liệu |
| ---- | ------ |
| `orders` | revenue source of truth |
| `account_balance_transactions` | refund_credit ledger đối soát số dư |
| `payment_transactions` | đối soát theo giao dịch |
| `courses` | course metadata hiện tại |
| `coupons` | coupon metadata hiện tại |
| `referral_codes` | referral metadata hiện tại |

---

## 6. Acceptance Criteria

| Tiêu chí | Đạt / Không |
| -------- | ----------- |
| Filter date range hoạt động | |
| Revenue dùng paid orders | |
| Refund hiển thị riêng | |
| Report không sai khi analysis/coupon đổi tên | |
| Export được dữ liệu theo filter | |

---

## 🗺️ Obsidian Meta

### Tags
- #blueprint/page/admin
- #blueprint/plan
- #blueprint/requirement

### Navigation
- **Breadcrumbs:** [[BLUEPRINT_PLAN_MOC|Plan Home]] / [[web/page|Requirements]] / [[web/page/admin/admin|Admin Dashboard]]

### Relations
- **Outgoing Links:** [[web/page/student/checkout|/checkout/:courseSlug — Thanh toán khóa học]]
- **Incoming Links (Backlinks):** *None*
