---
categories:
  - "[[Projects]]"
  - "[[cortex.ai]]"
  - "[[cortex.ai Web]]"
  - "[[Requirements]]"
  - "[[Admin Dashboard]]"
type: ["[[Page Spec]]"]
org: ["[[cortex.ai]]"]
start: 2026-06-02
year: 2026
url: https://github.com/TanHongPhong/cortex
status: "[[MVP]]"
---

# `/admin/orders` — Quản lý đơn hàng

**Status:** MVP
**Owner area:** Admin
**Source of truth:** `plan/web/page_function_matrix.md`, `plan/web/unified_database_schema.md`
**Build decision:** Build

## 1. Mục tiêu trang

Admin dùng trang này để:

```text
1. Xem danh sách đơn hàng
2. Theo dõi doanh thu theo trạng thái thanh toán
3. Kiểm tra học viên đã mua khóa nào
4. Xác nhận thanh toán thủ công nếu cần
5. Xử lý pending / paid / refunded
6. Xuất CSV/Excel phục vụ kế toán, đối soát, khai báo thuế
```

Trang này quản lý **dữ liệu tiền**, khác với quyền học (enrollment) được quản lý trong Student Detail Drawer.

---

# 2. Layout đề xuất

```text
/admin/orders

[Page Header]
- Title: Quản lý đơn hàng
- CTA: Tạo đơn thủ công nếu cần
- CTA: Export CSV / Excel

[KPI Cards]
- Total Revenue
- Paid Orders
- Pending Orders
- Refunded Orders
- Revenue This Month
- Average Order Value

[Date Range Filter]
- From date
- To date
- Payment status
- Course

[Order Table]
- Danh sách đơn hàng

[Order Detail Drawer]
- Thông tin đơn
- Thông tin học viên
- Course snapshot
- Billing snapshot
- Coupon/referral
- Payment transactions
- Invoice/receipt
- Actions
```

---

# 3. KPI Cards cần có

## KPI chính

| KPI                 | Ý nghĩa                      |
| ------------------- | ---------------------------- |
| Total Revenue       | Tổng doanh thu đã thanh toán |
| Revenue This Month  | Doanh thu tháng hiện tại     |
| Paid Orders         | Số đơn đã thanh toán         |
| Pending Orders      | Số đơn đang chờ thanh toán   |
| Refunded Orders     | Số đơn đã hoàn tiền          |
| Average Order Value | Giá trị trung bình mỗi đơn   |

## Công thức KPI

```text
Total Revenue = tổng final_amount của orders có status = paid

Revenue This Month = tổng final_amount của đơn paid trong tháng hiện tại

Paid Orders = count orders where status = paid

Pending Orders = count orders where status = pending

Refunded Orders = count orders where status = refunded

Average Order Value = Total Revenue / Paid Orders
```

## MVP scope

```text
1. Total Revenue
2. Revenue This Month
3. Paid Orders
4. Pending Orders
5. Refunded Orders
6. Average Order Value
```

---

# 4. Date Range / Filter

Trang orders cần có filter vì liên quan xuất báo cáo.

| Filter         | Mục đích                           |
| -------------- | ---------------------------------- |
| From date      | Lọc từ ngày                        |
| To date        | Lọc đến ngày                       |
| Payment status | pending / paid / failed / refunded |
| Course         | Lọc theo khóa                      |
| Payment method | bank transfer / cash / online      |

MVP cần tối thiểu:

```text
Date range + Status filter + Course filter
```

---

# 5. Order Table

## Table columns

| Cột          | Nội dung                              |
| ------------ | ------------------------------------- |
| Order ID     | Mã đơn hàng (ORD-YYYY-NNNNNN)         |
| Student      | Tên học viên                          |
| Email        | Email                                 |
| Phone/Zalo   | Số liên hệ                            |
| Course       | Khóa học                              |
| Coupon       | Coupon/referral nếu có                |
| Final amount | Số tiền thực thu                      |
| Status       | pending / paid / failed / refunded    |
| Paid at      | Ngày thanh toán                       |
| Created at   | Ngày tạo đơn                          |
| Actions      | View / Confirm paid / Refund / Export |

---

## Ví dụ row

```text
Order: MAY-ORD-2026-0001

Student: Phạm Đức Trí
Email: tri@email.com
Phone/Zalo: 09xxxxxxxx

Course: AI Agent & Vibe Coding Bootcamp
Amount: 2.990.000đ
Discount: 300.000đ
Final amount: 2.690.000đ

Payment method: Bank transfer
Status: Paid
Paid at: 21/05/2026

[View] [Export]
```

---

# 6. Order Status

| Status      | Ý nghĩa                     |
| ----------- | --------------------------- |
| `pending`   | Đã tạo đơn, chưa thanh toán |
| `paid`      | Đã thanh toán               |
| `failed`    | Thanh toán lỗi              |
| `refunded`  | Đã hoàn tiền                |
| `cancelled` | Đã hủy đơn                  |

MVP có thể dùng trước:

```text
pending
paid
refunded
cancelled
```

---

# 7. Actions trên đơn hàng

| Action              | Chức năng                  |
| ------------------- | -------------------------- |
| `View`              | Xem chi tiết đơn           |
| `Confirm paid`      | Xác nhận đã thanh toán     |
| `Mark refunded`     | Đánh dấu hoàn tiền         |
| `Cancel order`      | Hủy đơn chưa thanh toán    |
| `Create enrollment` | Tạo quyền học nếu đơn paid |
| `Export row`        | Xuất riêng đơn đó          |
| `Copy order ID`     | Copy mã đơn                |

---

# 8. Order Detail Drawer

Khi [[web/page/admin/admin|admin]] bấm `View`, mở drawer chi tiết.

## Các phần trong detail

```text
Order Detail

[Order Info]
[Student Info]
[Course Snapshot]
[Billing Info]
[Coupon / Referral]
[Payment Transactions]
[Invoice / Receipt]
[Enrollment Link]
[Admin Notes]
[Actions]
```

---

## A. Order Info

| Field      | Nội dung                              |
| ---------- | ------------------------------------- |
| Order ID   | Mã đơn                                |
| Status     | pending / paid / refunded / cancelled |
| Created at | Ngày tạo                              |
| Updated at | Lần cập nhật cuối                     |

## B. Student Info

| Field      | Nội dung            |
| ---------- | ------------------- |
| Full name  | Họ tên              |
| Email      | Email               |
| Phone/Zalo | Liên hệ             |
| User ID    | Nếu đã có tài khoản |

## C. Course Snapshot

| Field             | Nội dung                                         |
| ----------------- | ------------------------------------------------ |
| Course ID         | Khóa học liên kết hiện tại                       |
| Course title      | `course_title_snapshot`                          |
| Course price      | `course_price_snapshot`                          |
| Current course    | Link tới khóa hiện tại nếu chưa bị archive/delete |
| Enrollment status | Đã gán quyền học chưa                            |

## D. Billing Info

| Field             | Nội dung                         |
| ----------------- | -------------------------------- |
| Billing name      | Tên người mua                    |
| Billing email     | Email nhận biên nhận/hóa đơn     |
| Billing phone     | Số điện thoại/Zalo               |
| Billing address   | Địa chỉ                          |
| Company name      | Tên công ty nếu có               |
| Tax code          | Mã số thuế nếu có                |
| Invoice requested | Có yêu cầu invoice/receipt không |

## E. Coupon / Referral

| Field                | Nội dung                         |
| -------------------- | -------------------------------- |
| Coupon code snapshot | Mã [[web/page/student/coupon|coupon]] tại thời điểm mua      |
| Coupon ID            | Coupon hiện tại nếu còn tồn tại  |
| Referral code ID     | Referral nếu có                  |
| Discount amount      | Tổng tiền giảm                   |

## F. Payment Info

| Field           | Nội dung                        |
| --------------- | ------------------------------- |
| Original amount | Giá gốc                         |
| Discount        | Số tiền giảm giá                |
| Final amount    | Số tiền thực thu                |
| Payment status  | unpaid / paid / refunded / partially_refunded |
| Payment method  | bank_transfer / cash / online   |
| Transaction ID  | Mã giao dịch chính/legacy       |
| Payment proof   | Ảnh/link chứng từ chuyển khoản  |
| Paid at         | Ngày thanh toán                 |
| Refunded at     | Ngày hoàn tiền                  |
| Refund reason   | Lý do hoàn tiền                 |
| Note            | Ghi chú thanh toán              |
| Created by      | Admin tạo đơn (nếu thủ công)    |

## G. Payment Transactions

Hiển thị danh sách giao dịch từ `payment_transactions`:

```text
Provider
Provider transaction ID
Amount
Currency
Status
Created at
```

Không ghi đè transaction cũ khi user/admin thử thanh toán lại. Tạo record mới để audit.

---

# 9. Export dữ liệu

## Export cần có

| Loại export           | Mục đích                      |
| --------------------- | ----------------------------- |
| Export CSV            | Dễ mở bằng Google Sheet/Excel |
| Export Excel          | Gửi kế toán dễ hơn            |
| Export current filter | Xuất theo bộ lọc đang chọn    |
| Export paid only      | Chỉ xuất đơn đã thanh toán    |
| Export by month       | Xuất theo tháng/quý/năm       |

## Export columns

```text
Order ID
Student name
Email
Phone
Course
Amount
Discount amount
Final amount
Payment method
Payment status
Paid at
Created at
Transaction code
Note
```

**Lưu ý:** để khai báo thuế thực tế, em nên hỏi kế toán cần thêm mã số thuế, địa chỉ, loại hóa đơn hay thông tin pháp lý nào không. Nhưng hệ thống nên chuẩn bị sẵn dữ liệu order/payment trước.

---

# 10. Flow vận hành đơn hàng

## Flow mua khóa / đăng ký khóa

```text
Lead hoặc student đăng ký khóa
→ tạo order status = pending
→ [[web/page/admin/admin|admin]]/online payment xác nhận thanh toán
→ order status = paid
→ tạo enrollment status = active
→ học viên được vào học
```

## Flow [[web/page/admin/admin|admin]] xác nhận chuyển khoản

```text
Admin mở /admin/orders
→ tìm đơn pending
→ kiểm tra giao dịch ngân hàng
→ bấm Confirm paid
→ nhập paid_at + provider_transaction_id nếu có
→ order status = paid
→ tạo enrollment
```

## Flow hoàn tiền

```text
Admin mở order
→ bấm Mark refunded
→ nhập refund reason
→ order status = refunded
→ order payment_status = refunded
→ cộng orders.final_amount vào users.account_balance
→ tạo account_balance_transactions.type = refund_credit
→ chuyển enrollment liên quan sang cancelled
→ ghi audit_logs cho refund và balance credit
```

---

# 11. Rule quan trọng

| Trường hợp               | Cách xử lý                                      |
| ------------------------ | ----------------------------------------------- |
| Order paid               | Có thể tạo enrollment                           |
| Order pending            | Chưa nên cho học                                |
| Order refunded           | Cộng refund vào số dư nội bộ và cancel enrollment |
| Order cancelled          | Không tạo enrollment                            |
| Student đã có enrollment | Không tạo enrollment trùng                      |
| Đơn paid rồi             | Không sửa amount tùy tiện                       |
| Hoàn tiền                | Phải nhập lý do                                 |
| Export thuế              | Chỉ nên xuất đơn paid/refunded theo khoảng ngày |

---

# 12. Yêu cầu chức năng cụ thể

| Nhóm              | Yêu cầu                                          |
| ----------------- | ------------------------------------------------ |
| Auth              | Chỉ [[web/page/admin/admin|admin]] mới vào được                           |
| KPI cards         | Hiển thị doanh thu, paid, pending, refunded, AOV |
| Order list        | Hiển thị danh sách đơn hàng                      |
| Date filter       | Lọc theo khoảng ngày                             |
| Status filter     | Lọc pending / paid / refunded / cancelled        |
| Course filter     | Lọc theo khóa học                                |
| Order detail      | Xem đầy đủ thông tin đơn                         |
| Confirm paid      | Xác nhận đơn đã thanh toán                       |
| Create enrollment | Tạo quyền học sau khi paid                       |
| Refund            | Đánh dấu refunded, nhập lý do, credit vào account balance |
| Export            | Xuất CSV/Excel theo filter                       |
| Safety            | Không tạo enrollment trùng                       |
| Responsive        | Ưu tiên desktop, mobile xem được                 |

---

# 13. Data cần dùng

| Bảng          | Dữ liệu                             |
| ------------- | ----------------------------------- |
| `orders`      | Đơn hàng                            |
| `payment_transactions` | Từng lần thanh toán/thử thanh toán |
| `payment_webhook_logs` | Debug webhook nếu có gateway |
| `users`       | Học viên                            |
| `courses`     | Khóa học                            |
| `enrollments` | Quyền học sau khi thanh toán        |
| `leads`       | Nếu order tạo từ lead               |
| `coupons`     | Mã giảm giá                         |
| `coupon_redemptions` | Lịch sử dùng [[web/page/student/coupon|coupon]], reserved_expires_at |
| `referral_codes` | Mã giới thiệu                    |
| `invoices` | Biên nhận/hóa đơn, invoice_version/replaced_invoice_id |
| `account_balance_transactions` | Ledger refund_credit/reset số dư |
| `audit_logs` | Log refund, balance credit, enrollment cancel/override |

---

# 14. Cấu trúc dữ liệu `orders`

| Field                   | Mục đích                                       |
| ----------------------- | ---------------------------------------------- |
| `id`                    | ID đơn                                         |
| `order_code`            | Mã đơn hàng                                    |
| `user_id`               | Học viên                                       |
| `lead_id`               | Lead source analytics                          |
| `course_id`             | Khóa học                                       |
| `amount`                | Giá gốc                                        |
| `discount_amount`       | Giảm giá                                       |
| `final_amount`          | Số tiền thực thu                               |
| `currency`              | VND                                            |
| `status`                | pending / paid / failed / refunded / cancelled |
| `payment_status`        | unpaid / paid / refunded / partially_refunded  |
| `payment_method`        | bank_transfer / cash / online / manual         |
| `transaction_id`        | Mã giao dịch chính/legacy                      |
| `payment_proof_url`     | Chứng từ chuyển khoản                          |
| `billing_name`          | Tên billing                                    |
| `billing_email`         | Email billing                                  |
| `billing_phone`         | Phone billing                                  |
| `billing_address`       | Địa chỉ billing                                |
| `company_name`          | Tên công ty                                    |
| `tax_code`              | Mã số thuế                                     |
| `invoice_requested`     | Có yêu cầu invoice không                       |
| `course_title_snapshot` | Tên khóa lúc mua                               |
| `course_price_snapshot` | Giá khóa lúc mua                               |
| `coupon_id`             | Coupon nếu có                                  |
| `coupon_code_snapshot`  | Mã [[web/page/student/coupon|coupon]] lúc mua                              |
| `referral_code_id`      | Referral nếu có                                |
| `paid_at`               | Ngày thanh toán                                |
| `refunded_at`           | Ngày hoàn tiền                                 |
| `refund_reason`         | Lý do hoàn tiền                                |
| `note`                  | Ghi chú nội bộ                                 |
| `created_by`            | Admin tạo đơn nếu thủ công                     |
| `created_at`            | Ngày tạo                                       |
| `updated_at`            | Ngày cập nhật                                  |

---

# 15. Cấu trúc dữ liệu `payment_transactions`

MVP nên dùng bảng này để không mất lịch sử các lần thử thanh toán.

| Field                     | Mục đích                              |
| ------------------------- | ------------------------------------- |
| `id`                      | ID transaction                        |
| `order_id`                | Thuộc đơn nào                         |
| `provider`                | bank_transfer / momo / vnpay / manual |
| `provider_transaction_id` | Mã giao dịch từ provider              |
| `idempotency_key`         | Key chống duplicate khi retry/webhook |
| `amount`                  | Số tiền thanh toán                    |
| `currency`                | VND                                   |
| `status`                  | pending / success / failed / refunded |
| `raw_payload`             | Dữ liệu từ cổng thanh toán nếu có     |
| `processed_at`            | Thời điểm xử lý                       |
| `created_at`              | Ngày tạo                              |
| `updated_at`              | Ngày cập nhật                         |

---

# 16. Logic chính

## Tạo order

```text
Admin hoặc hệ thống tạo order
→ generate order_code
→ status = pending
→ payment_status = unpaid
→ lưu user_id, lead_id nếu có
→ lưu course_id, amount, discount, final_amount
→ snapshot course_title_snapshot + course_price_snapshot
```

## Confirm paid

```text
Admin bấm Confirm paid
→ nhập payment_method, paid_at, provider_transaction_id nếu có
→ tạo payment_transactions.status = success nếu chưa có
→ order.status = paid
→ order.payment_status = paid
→ nếu chưa có enrollment:
   tạo enrollment status = active
```

## Refund

```text
Admin bấm Mark refunded
→ bắt buộc nhập refund_reason
→ order.status = refunded
→ order.payment_status = refunded
→ refunded_at = hiện tại
→ tạo account_balance_transactions refund_credit với amount = orders.final_amount
→ users.account_balance tăng tương ứng
→ coupon_redemptions.status = refunded, coupons.used_count giữ nguyên
→ referral_conversions.reward_status = cancelled nếu có
→ enrollment sinh từ order chuyển cancelled để khóa quyền học
→ ghi audit_logs
```

## Export

```text
Admin chọn date range/status/course
→ bấm Export CSV hoặc Excel
→ hệ thống xuất danh sách order theo filter
```

---

# 17. Component cần có

| Component           | Mục đích                                |
| ------------------- | --------------------------------------- |
| `AdminLayout`       | Sidebar + topbar                        |
| `OrdersHeader`      | Title + CTA export                      |
| `OrderKpiCards`     | Doanh thu, paid, pending, refunded, AOV |
| `OrderDateFilter`   | Lọc theo ngày                           |
| `OrderStatusFilter` | Lọc theo trạng thái                     |
| `OrderTable`        | Danh sách đơn                           |
| `OrderDetailDrawer` | Chi tiết đơn                            |
| `ConfirmPaidModal`  | Xác nhận thanh toán                     |
| `RefundModal`       | Hoàn tiền                               |
| `ExportButton`      | Xuất CSV/Excel                          |
| `StatusBadge`       | pending / paid / refunded / cancelled   |
| `EmptyState`        | Khi chưa có đơn                         |
| `LoadingState`      | Khi đang tải                            |

---

# 18. Empty State

## Chưa có đơn hàng

```text
Chưa có đơn hàng nào.

Đơn hàng sẽ xuất hiện khi học viên đăng ký/mua khóa hoặc [[web/page/admin/admin|admin]] tạo đơn thủ công.
```

## Không tìm thấy đơn theo bộ lọc

```text
Không tìm thấy đơn hàng phù hợp.

Thử thay đổi khoảng ngày, trạng thái hoặc khóa học.
```

---

# 19. UI style đề xuất

| Phần          | Gợi ý                                                       |
| ------------- | ----------------------------------------------------------- |
| Tổng thể      | Admin finance table, rõ và thực dụng                        |
| KPI cards     | Số tiền lớn, dễ đọc                                         |
| Revenue       | Format VND rõ ràng                                          |
| Table         | Ưu tiên paid_at, final_amount, status                       |
| Status badge  | Pending vàng, paid xanh, refunded tím/xám, cancelled đỏ nhẹ |
| Export button | Đặt rõ ở header hoặc cạnh filter                            |
| Desktop       | Ưu tiên bảng rộng                                           |
| Mobile        | Có thể xem card list, export ưu tiên desktop                |

---

# 20. Acceptance Criteria

Trang `/admin/orders` đạt nếu:

| Tiêu chí                                        | Đạt / Không |
| ----------------------------------------------- | ----------- |
| Student không truy cập được                     |             |
| Admin xem được KPI doanh thu                    |             |
| Admin xem được danh sách đơn hàng               |             |
| Admin lọc đơn theo ngày/status/course           |             |
| Admin mở được chi tiết đơn                      |             |
| Admin confirm paid được                         |             |
| Confirm paid tạo enrollment nếu chưa có         |             |
| Không tạo enrollment trùng                      |             |
| Admin mark refunded được và bắt buộc nhập lý do |             |
| Refund tạo `account_balance_transactions` và cộng đúng `users.account_balance` |             |
| Refund chuyển enrollment liên quan sang `cancelled` |             |
| Admin export CSV/Excel được                     |             |
| Export đúng theo bộ lọc                         |             |
| Empty state hiển thị đúng                       |             |
| Responsive dùng ổn                              |             |

---

# 21. Chốt scope `/admin/orders`

```text
/admin/orders cần có:

1. Admin layout chung
2. Page header
3. KPI cards:
   - Total Revenue
   - Revenue This Month
   - Paid Orders
   - Pending Orders
   - Refunded Orders
   - Average Order Value
4. Date range filter
5. Status/course filter
6. Order table
7. Order detail drawer
8. Confirm paid
9. Auto/manual create enrollment after paid
10. Mark refunded
11. Export CSV/Excel
12. Empty/loading/error state
```

Nói ngắn gọn: **`/admin/orders` là trang quản lý tiền và xuất dữ liệu kế toán. Nó nên tách khỏi Student Detail Drawer, vì orders là giao dịch tài chính, còn enrollments là quyền học.**

---

## 🗺️ Obsidian Meta

### Tags
- #cortex/page/admin
- #cortex/plan
- #cortex/requirement

### Navigation
- **Breadcrumbs:** [[CORTEX_PLAN_MOC|Plan Home]] / [[web/page|Requirements]] / [[web/page/admin/admin|Admin Dashboard]]

### Relations
- **Outgoing Links:** [[web/page/admin/admin|Admin Dashboard — Requirement]], [[web/page/student/coupon|/coupon — Coupon của tôi / Nhập mã giảm giá]]
- **Incoming Links (Backlinks):** *None*
