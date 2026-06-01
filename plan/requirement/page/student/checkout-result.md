# `/checkout/success` và `/checkout/failed` — Kết quả thanh toán

**Status:** MVP
**Owner area:** Student
**Source of truth:** `plan/requirement/page_function_matrix.md`, `plan/requirement/unified_database_schema.md`
**Build decision:** Build

## 1. Mục tiêu

Hiển thị kết quả sau checkout và hướng user đến bước tiếp theo dựa trên trạng thái `orders.status` và `orders.payment_status`.

---

## 2. `/checkout/success`

| Trường hợp | Hiển thị | CTA chính |
| ---------- | -------- | --------- |
| `orders.status = paid` | Thanh toán thành công, khóa đã mở | `Vào học` |
| `orders.status = refunded` | Đơn đã refund, tiền đã cộng vào số dư tài khoản | `Xem đơn hàng` |
| Manual transfer pending | CORTEX đã nhận thông tin, đang chờ xác nhận | `Xem đơn hàng` |
| Paid nhưng enrollment chưa tạo | Báo đang xử lý quyền học | `Xem đơn hàng` |

Data hiển thị:

```text
Order code
Course title snapshot
Final amount
Payment method
Status
Refund credit nếu có
```

Không hiển thị raw payment payload hoặc thông tin nhạy cảm.

---

## 3. `/checkout/failed`

| Trường hợp | Hiển thị | CTA chính |
| ---------- | -------- | --------- |
| Payment failed | Thanh toán chưa thành công | `Thử lại` |
| User cancelled | Bạn đã hủy thanh toán | `Quay lại checkout` |
| Gateway timeout | Chưa xác nhận được thanh toán | `Xem đơn hàng` |

Nếu user đã chuyển khoản thủ công nhưng hệ thống chưa nhận, CTA phụ là:

```text
Liên hệ hỗ trợ (`/contact?type=support`)
```

---

## 4. Data cần dùng

| Bảng | Dữ liệu |
| ---- | ------ |
| `orders` | order_code, status, payment_status, final_amount, course snapshot |
| `payment_transactions` | transaction status gần nhất |
| `enrollments` | kiểm tra quyền học đã tạo chưa |
| `account_balance_transactions` | refund credit nếu order đã refunded |

---

## 5. Acceptance Criteria

| Tiêu chí | Đạt / Không |
| -------- | ----------- |
| User chỉ xem được order của chính mình | |
| Success paid dẫn được vào khóa học | |
| Manual pending không báo nhầm là paid | |
| Failed state cho thử lại hoặc xem đơn hàng | |
| Refunded state nói rõ refund vào số dư nội bộ, rút tiền qua admin support | |
| Không hiển thị dữ liệu thanh toán nhạy cảm | |
