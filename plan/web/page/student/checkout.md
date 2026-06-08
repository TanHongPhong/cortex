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

# `/checkout/:courseSlug` — Thanh toán khóa học

**Status:** MVP
**Owner area:** Student
**Source of truth:** `plan/web/page_function_matrix.md`, `plan/web/unified_database_schema.md`
**Design source:** [[web/page/student/design|Student Portal Design — Warm Learning Workspace]]
**Build decision:** Build
**Layout decision:** Standalone checkout route. Không dùng student dashboard shell, không render student sidebar.

## 1. Mục tiêu

User đã đăng nhập mua **một khóa học** và tạo order có snapshot đầy đủ để không sai dữ liệu lịch sử.

---

## 2. Layout

Checkout là một trang riêng ở `/checkout/:courseSlug`, tách khỏi `/dashboard` và các trang student portal có sidebar. User có thể đã đăng nhập, nhưng UI không dùng left sidebar của dashboard để tránh phân tâm trong flow thanh toán.

```text
Standalone Checkout Layout

[Minimal Header: Blueprint logo + Back to course]

[Main checkout column]
  [Course Summary]
  [Coupon / Referral]
  [Billing Information]
  [Payment Method]
  [QR Payment Panel]

[Sticky order summary column]
  [Order Summary]
  [CTA: Tạo mã QR thanh toán]
```

| Khu vực | Rule |
| ------- | ---- |
| Header | Minimal, chỉ logo Blueprint, link quay lại course detail hoặc catalog, không có student nav/sidebar |
| Main content | Form thanh toán tập trung, desktop 2 cột; mobile 1 cột |
| QR Payment Panel | Sau khi tạo transaction pending, hiển thị QR lớn như `plan/web/visualize/student/11-checkout-qr-payment.png`, countdown hết hạn, amount, provider, order code và trạng thái realtime |
| Order summary | Desktop sticky bên phải; mobile đặt dưới form trước CTA |
| Footer/support | Có link support nhỏ `/contact?type=support`, không mở dashboard navigation |
| Sidebar | Không render sidebar student dashboard, không hiển thị menu Dashboard/My Courses/Profile |

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
| `payment_transactions` | từng lần thanh toán, provider, provider_transaction_id, idempotency_key, qr_payload, qr_expires_at |
| `payment_webhook_logs` | webhook từ Momo/VNPay sau khi user quét QR |

---

## 4. Flow

```text
1. User mở /checkout/:courseSlug
2. Backend lấy course published
3. Tạo hoặc cập nhật order pending của user cho course
4. Snapshot course title + price vào order
5. User nhập coupon/referral nếu có
6. Backend validate và tính discount
7. User nhập billing info và chọn Momo hoặc VNPay
8. Backend tạo payment_transaction pending và request provider tạo QR payment session
9. UI hiển thị QR, order code, final amount, provider, countdown và trạng thái "Đang chờ quét/thanh toán"
10. User quét QR bằng app Momo/VNPay/ngân hàng rồi xác nhận trên app provider
11. Provider gửi webhook về `/api/webhooks/payment`
12. Backend verify chữ ký/hash, amount, currency, order_id, provider_transaction_id và idempotency
13. UI poll hoặc subscribe trạng thái order/transaction; không cho user tự xác nhận đã trả tiền
14. Nếu webhook xác nhận paid:
   - orders.status = paid
   - orders.payment_status = paid
   - payment_transactions.status = success
   - tạo enrollment active
   - tự chuyển user sang /checkout/success
15. Nếu QR hết hạn hoặc provider báo failed/cancelled:
   - ghi payment_transactions.status = failed nếu có kết quả chắc chắn
   - không tạo enrollment
   - dẫn user sang /checkout/failed hoặc /my-orders/:id
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
| Payment retry | Tạo QR transaction mới, không ghi đè transaction cũ |
| QR expired | Không nhận client-side confirm; tạo QR mới nếu user muốn thử lại |
| Payment confirmation | Không có self-confirm, không upload biên lai, không có nút "Tôi đã chuyển khoản" |
| Webhook payment | Phải verify chữ ký/hash, amount, currency, order_id, provider_transaction_id và idempotency trước khi mark paid |

---

## 6. Acceptance Criteria

| Tiêu chí | Đạt / Không |
| -------- | ----------- |
| User chưa [[web/page/student/login|login]] bị redirect | |
| Course summary hiển thị đúng | |
| Order tạo snapshot course | |
| Coupon/referral validate backend | |
| Billing fields lưu vào order | |
| Payment transaction pending được tạo trước khi hiển thị QR | |
| QR payment panel hiển thị QR, countdown, amount, provider và order code | |
| Webhook hợp lệ mới mark paid; client không tự confirm thanh toán | |
| Paid order tạo enrollment | |
| Không tạo enrollment trùng | |
| Có success/error state | |
| Checkout không render student dashboard sidebar | |
| Header checkout là minimal header riêng, không dùng dashboard shell | |

---

## 🗺️ Obsidian Meta

### Tags
- #blueprint/page/student
- #blueprint/plan
- #blueprint/requirement

### Navigation
- **Breadcrumbs:** [[BLUEPRINT_PLAN_MOC|Plan Home]] / [[web/page|Requirements]] / [[web/page/student/checkout|Standalone Checkout]]

### Relations
- **Outgoing Links:** [[web/page/admin/admin|Admin Dashboard — Requirement]], [[web/page/student/login|/login — Đăng nhập]]
- **Incoming Links (Backlinks):** [[web/architecture|Architecture — Kiến trúc kỹ thuật Blueprint]], [[web/page|1. Public Website — phần người ngoài nhìn thấy]], [[web/page/admin/admin|Admin Dashboard — Requirement]], [[web/page/admin/admin-revenue|/admin/revenue — Dashboard doanh thu]], [[web/page/student/checkout-result|/checkout/success và /checkout/failed — Kết quả thanh toán]], [[web/page/website/course-detail|/courses/[slug] — Trang chi tiết khóa học]], [[web/page/website/courses|/courses — Product Catalog Page]], [[web/page_function_matrix|Page Function Matrix — Blueprint]], [[web/unified_database_schema|💎 Unified Database Schema - Blueprint Project]]
