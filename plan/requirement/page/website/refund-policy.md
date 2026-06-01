# `/refund-policy` — Chính sách refund

**Status:** MVP
**Owner area:** Public
**Source of truth:** `plan/requirement/page_function_matrix.md`, `plan/requirement/unified_database_schema.md`
**Build decision:** Build static page

## 1. Mục tiêu

Giải thích rõ refund trong MVP/P1 là credit nội bộ vào số dư tài khoản, không phải tự động hoàn tiền qua payment gateway.

## 2. Layout chính

| Khu vực | Yêu cầu |
| ------- | ------- |
| Refund result | Refund được cộng vào `users.account_balance` |
| Withdrawal | User muốn rút tiền liên hệ `/contact?type=support` |
| Admin handling | Admin xử lý rút tiền offline rồi reset balance qua ledger |
| Course access | Refund mặc định chuyển enrollment liên quan sang `cancelled` |
| Order history | User xem trạng thái ở `/my-orders/:id` |

## 3. Data cần dùng

| Bảng | Dữ liệu |
| ---- | ------ |
| `orders` | status/payment_status/refunded_at/refund_reason |
| `users` | account_balance |
| `account_balance_transactions` | refund_credit/admin reset ledger |

## 4. Permission / Rule

- Public route, không yêu cầu login.
- Không nói refund là gateway refund tự động.
- Rút tiền không có self-service trong MVP/P1.
- Admin reset balance sau rút tiền bắt buộc có ledger và audit log.

## 5. Empty/Error State

| State | UI |
| ----- | -- |
| User cần hỗ trợ | CTA `/contact?type=support` |

## 6. Acceptance Criteria

| Tiêu chí | Đạt / Không |
| -------- | ----------- |
| Public truy cập `/refund-policy` được | |
| Nói rõ refund credit vào số dư nội bộ | |
| Nói rõ rút tiền thủ công qua admin | |
| Nói rõ refund có thể khóa quyền học qua enrollment cancelled | |
