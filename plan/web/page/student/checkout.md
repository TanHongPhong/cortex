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
status: "[[MVP]]"
---

# `/checkout/:courseSlug` — Thanh toán khóa học

**Status:** MVP
**Owner area:** Student
**Source of truth:** `plan/web/page_function_matrix.md`, `plan/web/unified_database_schema.md`
**Build decision:** Build

## 1. Mục tiêu

User đã đăng nhập mua **một khóa học** và tạo order có snapshot đầy đủ để không sai dữ liệu lịch sử.

---

## 2. Layout

```text
Checkout

[Course Summary]
[Coupon / Referral]
[Billing Information]
[Payment Method]
[Order Summary]
[CTA: Thanh toán]
```

---

## 3. Data cần dùng

| Bảng | Dữ liệu |
| ---- | ------ |
| `users` | current user, name, email, phone |
| `courses` | title, slug, price_amount, duration, certificate_available |
| `orders` | order pending và snapshot |
| `coupons` | validate [[web/page/student/coupon|coupon]] |
| `coupon_redemptions` | reserved/applied [[web/page/student/coupon|coupon]], reserved_expires_at |
| `referral_codes` | validate [[web/page/student/referral|referral]] |
| `payment_transactions` | từng lần thanh toán, idempotency_key |

---

## 4. Flow

```text
1. User mở /checkout/:courseSlug
2. Backend lấy course published
3. Tạo hoặc cập nhật order pending của user cho course
4. Snapshot course title + price vào order
5. User nhập [[web/page/student/coupon|coupon]]/referral nếu có
6. Backend validate và tính discount
7. User nhập billing info và chọn payment method
8. Tạo payment_transaction
9. Nếu paid:
   - orders.status = paid
   - orders.payment_status = paid
   - tạo enrollment active
10. Nếu manual transfer:
   - order giữ pending
   - [[web/page/admin/admin|admin]] xác nhận trong /admin/orders
```

---

## 5. Rule an toàn

| Trường hợp | Rule |
| ---------- | ---- |
| User chưa [[web/page/student/login|login]] | Redirect `/login?next=/checkout/:courseSlug` |
| Course không published | Không cho checkout |
| Course free | Có thể tạo enrollment trực tiếp, không cần order paid |
| Coupon hết hạn | Báo invalid, không ghi discount |
| Referral tự dùng | Báo invalid |
| Account balance | Không dùng để thanh toán/mua khóa trong MVP/P1 |
| Order paid rồi | Không cho sửa amount/discount |
| Payment retry | Tạo transaction mới, không ghi đè transaction cũ |

---

## 6. Acceptance Criteria

| Tiêu chí | Đạt / Không |
| -------- | ----------- |
| User chưa [[web/page/student/login|login]] bị redirect | |
| Course summary hiển thị đúng | |
| Order tạo snapshot course | |
| Coupon/referral validate backend | |
| Billing fields lưu vào order | |
| Payment transaction được tạo | |
| Paid order tạo enrollment | |
| Không tạo enrollment trùng | |
| Có success/error state | |

---

## 🗺️ Obsidian Meta

### Tags
- #cortex/page/student
- #cortex/plan
- #cortex/requirement

### Navigation
- **Breadcrumbs:** [[CORTEX_PLAN_MOC|Plan Home]] / [[web/page|Requirements]] / [[web/page/student/dashboard|Student Portal]]

### Relations
- **Outgoing Links:** [[web/page/admin/admin|Admin Dashboard — Requirement]], [[web/page/student/coupon|/coupon — Coupon của tôi / Nhập mã giảm giá]], [[web/page/student/login|/login — Đăng nhập]], [[web/page/student/referral|/referral — Mã giới thiệu]]
- **Incoming Links (Backlinks):** [[PLAN_CONFLICT_AUDIT|Plan Conflict Audit - CORTEX Requirements]], [[web/architecture|Architecture — Kiến trúc kỹ thuật CORTEX]], [[web/page|1. Public Website — phần người ngoài nhìn thấy]], [[web/page/admin/admin|Admin Dashboard — Requirement]], [[web/page/admin/admin-revenue|/admin/revenue — Dashboard doanh thu]], [[web/page/student/checkout-result|/checkout/success và /checkout/failed — Kết quả thanh toán]], [[web/page/student/coupon|/coupon — Coupon của tôi / Nhập mã giảm giá]], [[web/page/website/course-detail|/courses/slug — Trang chi tiết khóa học]], [[web/page/website/courses|/courses — Product Catalog Page]], [[web/page_function_matrix|Page Function Matrix — CORTEX]], [[web/unified_database_schema|💎 Unified Database Schema - CORTEX Project]]
