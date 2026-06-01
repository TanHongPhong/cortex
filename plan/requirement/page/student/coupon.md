# `/coupon` — Coupon của tôi / Nhập mã giảm giá

**Status:** Optional/P1
**Owner area:** Student
**Source of truth:** `plan/requirement/page_function_matrix.md`, `plan/requirement/unified_database_schema.md`
**Build decision:** Optional

## 1. Mục tiêu

Trang này là trang phụ, không bắt buộc trong MVP nếu checkout đã có ô nhập coupon. Nếu build, trang dùng để học viên xem mã đang có, hiểu điều kiện dùng và copy mã sang checkout.

---

## 2. Quyết định scope

| Hạng mục | Quyết định |
| -------- | ---------- |
| MVP checkout | Coupon input nằm trực tiếp trong `/checkout/:courseSlug` |
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
| `courses` | course/level áp dụng |

---

## 5. Rule an toàn

| Trường hợp | Rule |
| ---------- | ---- |
| Coupon expired/paused/archived | Không hiển thị trong available |
| Coupon first_order | Chỉ valid nếu user chưa có order paid |
| Coupon course-specific | Chỉ valid khi checkout đúng course |
| Coupon level-specific | Chỉ valid khi course.level khớp |
| Usage per user | Check `coupon_redemptions` status applied/reserved; reserved quá `reserved_expires_at` không tính giữ chỗ |

---

## 6. Acceptance Criteria

| Tiêu chí | Đạt / Không |
| -------- | ----------- |
| Chỉ user login mới xem được | |
| Hiển thị coupon còn hiệu lực | |
| Hiển thị điều kiện dùng rõ ràng | |
| Copy code hoạt động | |
| Không hiển thị coupon archived/deleted | |
