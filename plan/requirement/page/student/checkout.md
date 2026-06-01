# `/checkout/:courseSlug` — Thanh toán khóa học

**Status:** MVP
**Owner area:** Student
**Source of truth:** `plan/requirement/page_function_matrix.md`, `plan/requirement/unified_database_schema.md`
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
| `coupons` | validate coupon |
| `coupon_redemptions` | reserved/applied coupon, reserved_expires_at |
| `referral_codes` | validate referral |
| `payment_transactions` | từng lần thanh toán, idempotency_key |

---

## 4. Flow

```text
1. User mở /checkout/:courseSlug
2. Backend lấy course published
3. Tạo hoặc cập nhật order pending của user cho course
4. Snapshot course title + price vào order
5. User nhập coupon/referral nếu có
6. Backend validate và tính discount
7. User nhập billing info và chọn payment method
8. Tạo payment_transaction
9. Nếu paid:
   - orders.status = paid
   - orders.payment_status = paid
   - tạo enrollment active
10. Nếu manual transfer:
   - order giữ pending
   - admin xác nhận trong /admin/orders
```

---

## 5. Rule an toàn

| Trường hợp | Rule |
| ---------- | ---- |
| User chưa login | Redirect `/login?next=/checkout/:courseSlug` |
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
| User chưa login bị redirect | |
| Course summary hiển thị đúng | |
| Order tạo snapshot course | |
| Coupon/referral validate backend | |
| Billing fields lưu vào order | |
| Payment transaction được tạo | |
| Paid order tạo enrollment | |
| Không tạo enrollment trùng | |
| Có success/error state | |
