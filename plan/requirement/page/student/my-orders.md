# `/my-orders` và `/my-orders/:id` — Đơn hàng của tôi

**Status:** MVP
**Owner area:** Student
**Source of truth:** `plan/requirement/page_function_matrix.md`, `plan/requirement/unified_database_schema.md`
**Build decision:** Build

## 1. Mục tiêu

Học viên xem lịch sử đơn hàng, trạng thái thanh toán, chi tiết giao dịch, biên nhận/hóa đơn và refund credit nếu có.

---

## 2. `/my-orders`

| Khu vực | Yêu cầu |
| ------- | ------- |
| Page header | `Đơn hàng của tôi` |
| Order list | Order code, course snapshot, final amount, status, created_at |
| Status badge | pending, paid, failed, refunded, cancelled |
| CTA | `Xem chi tiết`, `Thanh toán lại` nếu pending |
| Empty state | Chưa có đơn hàng nào |

---

## 3. `/my-orders/:id`

| Khu vực | Yêu cầu |
| ------- | ------- |
| Order info | order_code, status, payment_status, created_at, paid_at |
| Course snapshot | course_title_snapshot, course_price_snapshot |
| Billing info | billing name/email/phone/company/tax/address |
| Coupon/referral | coupon_code_snapshot, discount_amount, [[requirement/page/student/referral|referral]] code nếu có |
| Payment transactions | provider, amount, currency, status, created_at |
| Invoice/receipt | invoice_code, status, invoice_url nếu có |
| Refund credit | Nếu order refunded, hiển thị số tiền đã cộng vào `users.account_balance` và hướng dẫn liên hệ [[requirement/page/admin/admin|admin]] để rút |

---

## 4. Data Access Rule

```text
Chỉ lấy orders where user_id = current_user.id.
Không cho user xem order của người khác dù biết ID.
```

---

## 5. Data cần dùng

| Bảng | Dữ liệu |
| ---- | ------ |
| `orders` | order history, course snapshot, billing snapshot |
| `payment_transactions` | payment attempts/history |
| `invoices` | receipt/invoice download |
| `account_balance_transactions` | refund_credit ledger liên quan order |

---

## 6. Acceptance Criteria

| Tiêu chí | Đạt / Không |
| -------- | ----------- |
| User chưa [[requirement/page/student/login|login]] bị redirect | |
| Chỉ hiển thị order của user hiện tại | |
| Order list dùng course snapshot | |
| Chi tiết đơn hiển thị payment transactions | |
| Có invoice/receipt nếu đã tạo | |
| Refunded order hiển thị rõ tiền được cộng vào số dư nội bộ, không báo đã hoàn gateway | |
| Empty state rõ ràng | |

---

## 🗺️ Obsidian Meta

### Tags
- #cortex/page/student
- #cortex/plan
- #cortex/requirement

### Navigation
- **Breadcrumbs:** [[CORTEX_PLAN_MOC|Plan Home]] / [[requirement/page|Requirements]] / [[requirement/page/student/dashboard|Student Portal]]

### Relations
- **Outgoing Links:** [[requirement/page/admin/admin|Admin Dashboard — Requirement]], [[requirement/page/student/login|/login — Đăng nhập]], [[requirement/page/student/referral|/referral — Mã giới thiệu]]
- **Incoming Links (Backlinks):** [[requirement/architecture|Architecture — Kiến trúc kỹ thuật CORTEX]]
