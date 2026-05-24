# `/admin/orders` — Quản lý đơn hàng

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
- Thanh toán
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

## MVP nên có trước

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

Trang orders nên có filter vì liên quan xuất báo cáo.

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

## Cột nên có

| Cột          | Nội dung                              |
| ------------ | ------------------------------------- |
| Order ID     | Mã đơn hàng (ORD-YYYY-NNNNNN)         |
| Student      | Tên học viên                          |
| Email        | Email                                 |
| Phone/Zalo   | Số liên hệ                            |
| Course       | Khóa học                              |
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

Khi admin bấm `View`, mở drawer chi tiết.

## Các phần trong detail

```text
Order Detail

[Order Info]
[Student Info]
[Course Info]
[Payment Info]
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

## C. Course Info

| Field             | Nội dung                                         |
| ----------------- | ------------------------------------------------ |
| Course            | Tên khóa                                         |
| Level             | Free / Starter / Core / Advanced / Premium / B2B |
| Price             | Giá khóa                                         |
| Enrollment status | Đã gán quyền học chưa                            |

## D. Payment Info

| Field           | Nội dung                        |
| --------------- | ------------------------------- |
| Original amount | Giá gốc                         |
| Discount        | Số tiền giảm giá                |
| Final amount    | Số tiền thực thu                |
| Payment method  | bank_transfer / cash / online   |
| Transaction ID  | Mã giao dịch từ cổng thanh toán |
| Paid at         | Ngày thanh toán                 |
| Refunded at     | Ngày hoàn tiền                  |
| Refund reason   | Lý do hoàn tiền                 |
| Note            | Ghi chú thanh toán              |
| Created by      | Admin tạo đơn (nếu thủ công)    |

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

## Cột nên có trong file export

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
→ admin/online payment xác nhận thanh toán
→ order status = paid
→ tạo enrollment status = active
→ học viên được vào học
```

## Flow admin xác nhận chuyển khoản

```text
Admin mở /admin/orders
→ tìm đơn pending
→ kiểm tra giao dịch ngân hàng
→ bấm Confirm paid
→ nhập paid_at + transaction_code nếu có
→ order status = paid
→ tạo enrollment
```

## Flow hoàn tiền

```text
Admin mở order
→ bấm Mark refunded
→ nhập refund reason
→ order status = refunded
→ tùy policy: cancel enrollment hoặc vẫn giữ quyền học
```

---

# 11. Rule quan trọng

| Trường hợp               | Cách xử lý                                      |
| ------------------------ | ----------------------------------------------- |
| Order paid               | Có thể tạo enrollment                           |
| Order pending            | Chưa nên cho học                                |
| Order refunded           | Cần xem policy có hủy enrollment không          |
| Order cancelled          | Không tạo enrollment                            |
| Student đã có enrollment | Không tạo enrollment trùng                      |
| Đơn paid rồi             | Không sửa amount tùy tiện                       |
| Hoàn tiền                | Phải nhập lý do                                 |
| Export thuế              | Chỉ nên xuất đơn paid/refunded theo khoảng ngày |

---

# 12. Yêu cầu chức năng cụ thể

| Nhóm              | Yêu cầu                                          |
| ----------------- | ------------------------------------------------ |
| Auth              | Chỉ admin mới vào được                           |
| KPI cards         | Hiển thị doanh thu, paid, pending, refunded, AOV |
| Order list        | Hiển thị danh sách đơn hàng                      |
| Date filter       | Lọc theo khoảng ngày                             |
| Status filter     | Lọc pending / paid / refunded / cancelled        |
| Course filter     | Lọc theo khóa học                                |
| Order detail      | Xem đầy đủ thông tin đơn                         |
| Confirm paid      | Xác nhận đơn đã thanh toán                       |
| Create enrollment | Tạo quyền học sau khi paid                       |
| Refund            | Đánh dấu hoàn tiền và nhập lý do                 |
| Export            | Xuất CSV/Excel theo filter                       |
| Safety            | Không tạo enrollment trùng                       |
| Responsive        | Ưu tiên desktop, mobile xem được                 |

---

# 13. Data cần dùng

| Bảng          | Dữ liệu                             |
| ------------- | ----------------------------------- |
| `orders`      | Đơn hàng                            |
| `payments`    | Giao dịch thanh toán nếu tách riêng |
| `users`       | Học viên                            |
| `courses`     | Khóa học                            |
| `enrollments` | Quyền học sau khi thanh toán        |
| `leads`       | Nếu order tạo từ lead               |
| `coupons`     | Nếu có mã giảm giá sau này          |

---

# 14. Cấu trúc dữ liệu `orders`

| Field              | Mục đích                                       |
| ------------------ | ---------------------------------------------- |
| `id`               | ID đơn                                         |
| `order_code`       | Mã đơn hàng                                    |
| `user_id`          | Học viên, nếu đã có tài khoản                  |
| `lead_id`          | Lead, nếu tạo từ lead                          |
| `course_id`        | Khóa học                                       |
| `amount`           | Giá gốc                                        |
| `discount_amount`  | Giảm giá                                       |
| `final_amount`     | Số tiền thực thu                               |
| `currency`         | VND                                            |
| `status`           | pending / paid / failed / refunded / cancelled |
| `payment_method`   | bank_transfer / cash / online                  |
| `transaction_code` | Mã giao dịch nếu có                            |
| `paid_at`          | Ngày thanh toán                                |
| `refunded_at`      | Ngày hoàn tiền                                 |
| `refund_reason`    | Lý do hoàn tiền                                |
| `note`             | Ghi chú nội bộ                                 |
| `created_by`       | Admin tạo đơn nếu thủ công                     |
| `created_at`       | Ngày tạo                                       |
| `updated_at`       | Ngày cập nhật                                  |

---

# 15. Cấu trúc dữ liệu `payments`, nếu tách riêng

MVP có thể chưa cần tách bảng này. Nhưng production nên có.

| Field              | Mục đích                              |
| ------------------ | ------------------------------------- |
| `id`               | ID payment                            |
| `order_id`         | Thuộc đơn nào                         |
| `amount`           | Số tiền thanh toán                    |
| `method`           | bank_transfer / cash / online         |
| `status`           | pending / success / failed / refunded |
| `transaction_code` | Mã giao dịch                          |
| `paid_at`          | Ngày thanh toán                       |
| `raw_data`         | Dữ liệu từ cổng thanh toán nếu có     |

---

# 16. Logic chính

## Tạo order

```text
Admin hoặc hệ thống tạo order
→ generate order_code
→ status = pending
→ lưu user_id hoặc lead_id
→ lưu course_id, amount, discount, final_amount
```

## Confirm paid

```text
Admin bấm Confirm paid
→ nhập payment_method, paid_at, transaction_code nếu có
→ order.status = paid
→ nếu chưa có enrollment:
   tạo enrollment status = active
```

## Refund

```text
Admin bấm Mark refunded
→ bắt buộc nhập refund_reason
→ order.status = refunded
→ refunded_at = hiện tại
→ xử lý enrollment theo policy
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

Đơn hàng sẽ xuất hiện khi học viên đăng ký/mua khóa hoặc admin tạo đơn thủ công.
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
