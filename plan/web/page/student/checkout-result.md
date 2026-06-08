---
categories:
  - "[[Projects]]"
  - "[[Blueprint]]"
  - "[[Blueprint Web]]"
  - "[[Requirements]]"
  - "[[Student Portal]]"
type: ["[[Page Spec]]"]
org: ["[[Blueprint]]"]
start: 2026-06-02
year: 2026
url: https://github.com/TanHongPhong/blueprint
status: "[[MVP]]"
---

# `/checkout/success` và `/checkout/failed` — Kết quả thanh toán

**Status:** MVP
**Owner area:** Student
**Source of truth:** `plan/web/page_function_matrix.md`, `plan/web/unified_database_schema.md`
**Design source:** [[web/page/student/design|Student Portal Design — Warm Learning Workspace]]
**Build decision:** Build
**Covered routes:** `/checkout/success`, `/checkout/failed`
**Layout decision:** Standalone checkout result route. Không dùng student dashboard shell, không render student sidebar.

## 1. Mục tiêu

Hiển thị kết quả sau [[web/page/student/checkout|checkout]] và hướng user đến bước tiếp theo dựa trên trạng thái `orders.status` và `orders.payment_status`.

Trang kết quả thanh toán nằm cùng flow standalone checkout, tách khỏi dashboard. Layout chỉ có minimal header, result panel, order summary/action links; không có sidebar student portal.

---

## 2. `/checkout/success`

| Trường hợp | Hiển thị | CTA chính |
| ---------- | -------- | --------- |
| `orders.status = paid` | Thanh toán thành công, khóa đã mở | `Vào học` |
| `orders.status = refunded` | Đơn đã refund, tiền đã cộng vào số dư tài khoản | `Xem đơn hàng` |
| Webhook pending sau khi quét QR | Hệ thống đang chờ provider gửi/xác nhận webhook | `Xem đơn hàng` |
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
| User cancelled | Bạn đã hủy thanh toán | `Quay lại [[web/page/student/checkout|checkout]]` |
| QR expired / webhook timeout | Mã QR đã hết hạn hoặc chưa nhận được webhook hợp lệ từ Momo/VNPay | `Thử lại` |

Nếu QR expired hoặc có giao dịch bị lệch trạng thái quá lâu, CTA phụ là:

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
| Webhook pending không báo nhầm là paid | |
| Failed state cho thử lại hoặc xem đơn hàng | |
| Refunded state nói rõ refund vào số dư nội bộ, rút tiền qua [[web/page/admin/admin|admin]] support | |
| Không hiển thị dữ liệu thanh toán nhạy cảm | |
| Success/failed pages không render student dashboard sidebar | |
| CTA điều hướng rõ: vào học, xem đơn hàng, thử lại hoặc liên hệ support | |
| Không có CTA self-confirm hoặc upload biên lai | |

---

## 🗺️ Obsidian Meta

### Tags
- #blueprint/page/student
- #blueprint/plan
- #blueprint/requirement

### Navigation
- **Breadcrumbs:** [[BLUEPRINT_PLAN_MOC|Plan Home]] / [[web/page|Requirements]] / [[web/page/student/checkout|Standalone Checkout]]

### Relations
- **Outgoing Links:** [[web/page/admin/admin|Admin Dashboard — Requirement]], [[web/page/student/checkout|/checkout/:courseSlug — Thanh toán khóa học]]
- **Incoming Links (Backlinks):** *None*
