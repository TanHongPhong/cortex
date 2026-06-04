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
status: ["[[MVP]]", "[[P1]]"]
---

# Admin Dashboard — Requirement

**Status:** MVP + P1
**Owner area:** Admin
**Source of truth:** `plan/web/page_function_matrix.md`, `plan/web/unified_database_schema.md`
**Build decision:** Build

## 1. Mục tiêu tổng

Admin Dashboard dùng để CORTEX quản lý toàn bộ hệ thống học:

```text
1. Quản lý khóa học
2. Quản lý module/lesson
3. Quản lý học viên
4. Duyệt bài nộp assignment/final project
5. Cấp và kiểm soát [[web/page/website/certificate|certificate]]
6. Quản lý đơn hàng, [[web/page/student/coupon|coupon]], thanh toán và biên nhận
7. Quản lý announcement, review, template [[web/page/website/certificate|certificate]], audit log
8. Xem tổng quan vận hành
```

---

# 2. Cấu trúc route admin

| Trang                 | Phase | Mục đích                               |
| --------------------- | ----- | -------------------------------------- |
| `/admin`              | MVP + P1 | Tổng quan hệ thống                     |
| `/admin/courses`      | MVP | Quản lý khóa học                       |
| `/admin/orders`       | MVP | Quản lý đơn hàng và thanh toán         |
| `/admin/coupons`      | MVP | Quản lý mã giảm giá                    |
| `/admin/payments`     | MVP | Theo dõi giao dịch thanh toán          |
| `/admin/invoices`     | MVP | Quản lý biên nhận/hóa đơn              |
| `/admin/referrals`    | Future | Theo dõi chương trình giới thiệu       |
| `/admin/revenue`      | Future/P2 | Dashboard doanh thu                    |
| `/admin/lessons`      | MVP + P1 | Quản lý module và lesson               |
| `/admin/students`     | MVP | Quản lý học viên                       |
| `/admin/submissions`  | MVP | Duyệt bài nộp assignment/final project |
| `/admin/certificates` | MVP + P1 | Cấp và quản lý chứng chỉ               |
| `/admin/certificate-templates` | P1 | Quản lý template chứng chỉ     |
| `/admin/leads`        | MVP | Quản lý lead tiềm năng (Type B)        |
| `/admin/announcements` | P1 | Quản lý thông báo hệ thống/khóa học    |
| `/admin/reviews`      | P1 | Kiểm duyệt đánh giá khóa học           |
| `/admin/audit-logs`   | P1 | Xem lịch sử thao tác nhạy cảm          |

---

# 3. Layout chung cho Admin Dashboard

## Admin layout

```text
┌──────────────────────────────────────────────┐
│ Top Bar: Search / Notification / Admin Avatar │
├───────────────┬──────────────────────────────┤
│ Admin Sidebar │ Main Content                  │
│ - Overview    │ Nội dung từng trang            │
│ - Courses     │                              │
│ - Orders      │                              │
│ - Coupons     │                              │
│ - Payments    │                              │
│ - Lessons     │                              │
│ - Students    │                              │
│ - Submissions │                              │
│ - Certificates│                              │
│ - P1 Ops      │                              │
└───────────────┴──────────────────────────────┘
```

## Sidebar admin

| Menu         | Dẫn tới               |
| ------------ | --------------------- |
| Overview     | `/admin`              |
| Courses      | `/admin/courses`      |
| Resources    | `/admin/resources`    |
| Orders       | `/admin/orders`       |
| Coupons      | `/admin/coupons`      |
| Payments     | `/admin/payments`     |
| Invoices     | `/admin/invoices`     |
| Referrals    | `/admin/referrals` (Future) |
| Revenue      | `/admin/revenue` (Future/P2) |
| Lessons      | `/admin/lessons`      |
| Students     | `/admin/students`     |
| Submissions  | `/admin/submissions`  |
| Certificates | `/admin/certificates` |
| Certificate Templates | `/admin/certificate-templates` |
| Announcements | `/admin/announcements` |
| Reviews      | `/admin/reviews`      |
| Audit Logs   | `/admin/audit-logs`   |
| Leads        | `/admin/leads`        |
| Logout       | Đăng xuất             |

**Sidebar theo role:** Nếu `users.role = course_editor`, dùng cùng admin layout nhưng chỉ render `Courses` và `Lessons`. Các menu finance, học viên, phân quyền, audit, certificate, announcement, review, lead và system user không được render hoặc expose qua command/search nội bộ.

---

# 4. `/admin` — Admin Overview

## Mục tiêu

Admin nhìn nhanh tình hình hệ thống.

## Các khu vực cần có

| Khu vực             | Nội dung                                                                                |
| ------------------- | --------------------------------------------------------------------------------------- |
| KPI cards           | Tổng học viên, tổng khóa học, đơn paid/pending, doanh thu, bài nộp chờ duyệt, [[web/page/website/certificate|certificate]] đã cấp |
| Pending [[web/page/instructor/submissions|submissions]] | Assignment/final project đang chờ duyệt                                                 |
| P1 alerts           | Câu hỏi chưa trả lời, review thấp/chờ duyệt, notification delivery failed                |
| Quick actions       | Tạo khóa, thêm lesson, duyệt bài, cấp [[web/page/website/certificate|certificate]]                                       |

## KPI nên hiển thị

| KPI                 | Ý nghĩa                           |
| ------------------- | --------------------------------- |
| Total students      | Tổng học viên                     |
| Active enrollments  | Số đăng ký khóa đang active       |
| Published courses   | Số khóa đang mở                   |
| Paid orders         | Số đơn đã thanh toán              |
| Pending orders      | Số đơn đang chờ thanh toán        |
| Total revenue       | Tổng doanh thu paid               |
| Pending [[web/page/instructor/submissions|submissions]] | Bài nộp đang chờ duyệt            |
| Certificates issued | Số chứng chỉ đã cấp               |
| New leads           | Số lead Type B mới ([[web/page/website/contact|contact]] [[web/page|page]]) |
| Open [[web/page/instructor/questions|questions]]      | Câu hỏi lesson chưa trả lời       |
| Pending reviews     | Review khóa học chờ duyệt         |
| Failed [[web/page/student/notifications|notifications]] | Notification delivery lỗi        |

---

# 5. `/admin/courses` — Quản lý khóa học

## Mục tiêu

Tạo, sửa, ẩn và quản lý các khóa học.

## Các khu vực cần có

| Khu vực          | Nội dung                                        |
| ---------------- | ----------------------------------------------- |
| Course table     | Tên khóa, level, giá, trạng thái, số học viên   |
| Create/Edit form | Tên, slug, mô tả, thumbnail, giá, level, status |
| Status           | Draft, published, archived                      |
| Actions          | Xem, sửa, ẩn, xóa nếu chưa có học viên          |

## Field khóa học

| Field                 | Ghi chú                                          |
| --------------------- | ------------------------------------------------ |
| Title                 | Tên khóa                                         |
| Slug                  | URL khóa học                                     |
| Short description     | Mô tả ngắn                                       |
| Description           | Mô tả đầy đủ                                     |
| Level                 | Free / Starter / Core / Advanced / Premium / B2B |
| Price                 | Giá hoặc custom                                  |
| Thumbnail             | Ảnh khóa học                                     |
| Status                | draft / published / archived                     |
| Certificate available | Có [[web/page/website/certificate|certificate]] không                             |
| Lock mode             | free / sequential                                |

---

# 6. `/admin/lessons` — Quản lý module/bài học

## Mục tiêu

Xây nội dung học: module, video lesson, resource, quiz, assignment và final project.

## Các khu vực cần có

| Khu vực        | Nội dung                                                         |
| -------------- | ---------------------------------------------------------------- |
| Select course  | Chọn khóa cần chỉnh                                              |
| Module manager | Tạo/sửa/xóa module                                               |
| Lesson manager | Tạo lesson trong module                                          |
| Lesson form    | Title, lesson type, video source, content, resource URL/file, thứ tự bài |
| Drag/drop      | Kéo thả thứ tự module/lesson nếu làm được                        |

## Lesson type cần hỗ trợ

| Lesson type     | Mục đích           |
| --------------- | ------------------ |
| `video`         | Bài giảng video    |
| `resource`      | Tài liệu/tham khảo |
| `quiz`          | Quiz kiểm tra nhanh |
| `assignment`    | Bài tập thực hành  |
| `final_project` | Project cuối khóa  |

## Field lesson

| Field                   | Ghi chú                                       |
| ----------------------- | --------------------------------------------- |
| Title                   | Tên lesson                                    |
| Course                  | Thuộc khóa nào                                |
| Module                  | Thuộc module nào                              |
| Lesson type             | video / resource / quiz / assignment / final_project |
| Content                 | Nội dung mô tả bài                            |
| Video source            | Chọn/upload `video_assets` từ streaming provider cho video lesson |
| Resources               | Tài liệu kèm theo                             |
| Requires submission     | true/false                                    |
| Required for completion | true/false                                    |
| Order index             | Thứ tự bài                                    |
| Status                  | draft / published / hidden                    |

---

# 7. `/admin/students` — Quản lý học viên

## Mục tiêu

Theo dõi học viên, tiến độ học, khóa đã đăng ký, bài nộp và [[web/page/website/certificate|certificate]].

## Các khu vực cần có

| Khu vực        | Nội dung                                               |
| -------------- | ------------------------------------------------------ |
| Student table  | Tên, email, phone, số khóa học, trạng thái             |
| Search/filter  | Tìm theo tên/email, lọc theo khóa                      |
| Student detail | Xem khóa đã đăng ký, tiến độ, [[web/page/instructor/submissions|submissions]], [[web/page/website/certificate|certificate]] |
| Actions        | Gán khóa, khóa tài khoản nếu cần                       |

## Student table columns

| Cột          | Nội dung              |
| ------------ | --------------------- |
| Name         | Họ tên                |
| Email        | Email                 |
| Phone/Zalo   | Liên hệ               |
| Courses      | Số khóa đã enrolled   |
| Status       | active / blocked      |
| Created date | Ngày tạo tài khoản    |
| Actions      | View / Enroll / Block |

---

# 8. `/admin/submissions` — Duyệt bài nộp

## Mục tiêu

Duyệt bài nộp của học viên, gồm:

```text
1. Assignment trong module
2. Final project cuối khóa
```

## Các khu vực cần có

| Khu vực           | Nội dung                                               |
| ----------------- | ------------------------------------------------------ |
| Submission table  | Học viên, khóa, lesson, loại bài, trạng thái, ngày nộp |
| Submission detail | Xem mô tả, link demo, link source/file                 |
| Feedback box      | Admin viết nhận xét                                    |
| Actions           | Approve, reject, mark `revision_requested`             |

## Submission status

| Status   | Ý nghĩa             |
| -------- | ------------------- |
| pending  | Đang chờ duyệt      |
| approved | Đã duyệt            |
| revision_requested | Cần chỉnh sửa và nộp lại |
| rejected | Từ chối, không tính hoàn thành |
| rejected | Bị trả lại, cần sửa |

## Rule

```text
Assignment approved → lesson đó được tính hoàn thành.

Final project approved → học viên đủ điều kiện xét [[web/page/website/certificate|certificate]] nếu đã hoàn thành các lesson bắt buộc.
```

---

# 9. `/admin/orders` — Quản lý đơn hàng

## Mục tiêu

Quản lý giao dịch tài chính tổng của từng lần mua khóa, trạng thái gateway và enrollment được mở sau khi webhook/callback hợp lệ.

## Các khu vực cần có

| Khu vực | Nội dung |
| ------- | -------- |
| KPI cards | Revenue, paid orders, pending orders, refunded amount |
| Order table | Order code, customer, course snapshot, final amount, status |
| Order detail | Billing, [[web/page/student/coupon|coupon]]/referral, payment transactions, invoice, enrollment |
| Actions | View gateway transactions, cancel pending order, refund, export |

## Rule

```text
Order paid → tạo enrollment active nếu chưa có.
Không tạo enrollment trùng.
Không sửa amount/discount sau khi order paid.
```

---

# 10. `/admin/coupons` — Quản lý mã giảm giá

## Mục tiêu

Tạo/sửa/tạm dừng [[web/page/student/coupon|coupon]] và theo dõi [[web/page/student/coupon|coupon]] redemptions.

## Các khu vực cần có

| Khu vực | Nội dung |
| ------- | -------- |
| Coupon table | Code, discount type, value, scope, usage, status |
| Coupon form | Discount rule, usage limit, applicability, stacking |
| Redemption detail | User, order, redeemed amount, status |

## Rule

```text
Coupon đã có redemption thì không hard delete.
Chỉ tăng used_count khi order paid và redemption applied.
```

---

# 11. `/admin/payments`, `/admin/invoices`, `/admin/referrals`, `/admin/revenue`

## Mục tiêu

Các trang commerce phụ trợ để đối soát giao dịch, xuất biên nhận, theo dõi [[web/page/student/referral|referral]] và báo cáo doanh thu. MVP build `/admin/payments` và `/admin/invoices`; `/admin/referrals` và `/admin/revenue` là Future/P2.

| Route | Phase | Chức năng |
| ----- | ----- | --------- |
| `/admin/payments` | MVP | Xem `payment_transactions`, webhook logs, debug thanh toán |
| `/admin/invoices` | MVP | Tạo/issue/cancel/download receipt hoặc invoice |
| `/admin/referrals` | Future | Theo dõi [[web/page/student/referral|referral]] codes, conversions, reward |
| `/admin/revenue` | Future/P2 | P2 [[web/page/student/dashboard|dashboard]] doanh thu theo thời gian/analysis/payment/coupon |

## Rule

```text
payment_transactions là lịch sử từng lần thanh toán.
invoices lấy dữ liệu từ billing snapshot trên orders.
[[web/page/student/referral|referral]] reward chỉ active khi order paid.
Revenue report dùng order snapshot để không sai khi analysis/coupon thay đổi ở Future.
```

---

# 12. `/admin/certificates` — Quản lý chứng chỉ

## Mục tiêu

Cấp và kiểm soát [[web/page/website/certificate|certificate]].

## Các khu vực cần có

| Khu vực           | Nội dung                                             |
| ----------------- | ---------------------------------------------------- |
| Certificate table | Certificate ID, học viên, khóa, ngày cấp, trạng thái |
| Issue [[web/page/website/certificate|certificate]] | Chọn học viên + khóa đủ điều kiện để cấp             |
| PDF generation    | Tạo file [[web/page/website/certificate|certificate]] từ template                     |
| Actions           | View, download, revoke, copy verify link             |

## Rule

```text
Certificate ID phải unique, không trùng.
Chỉ cấp [[web/page/website/certificate|certificate]] khi học viên đủ điều kiện.
```

## Điều kiện cấp [[web/page/website/certificate|certificate]]

```text
1. Học viên đã enrolled khóa học
2. Hoàn thành các lesson bắt buộc
3. Assignment bắt buộc đã approved
4. Final project đã approved
5. Chưa từng được cấp [[web/page/website/certificate|certificate]] cho khóa đó
```

---

# 13. Flow vận hành chính của Admin Dashboard

---

## Flow 1 — Tạo khóa học

```text
/admin/courses
→ tạo khóa học
→ set level, price, status
→ published khi sẵn sàng
```

---

## Flow 2 — Xây nội dung khóa học

```text
/admin/lessons
→ chọn course
→ tạo module
→ tạo lesson
→ chọn lesson_type:
   - video
   - resource
   - assignment
   - final_project
→ set thứ tự bài
→ publish lesson
```

---

## Flow 3 — Bán khóa và mở quyền học

```text
/checkout/:courseSlug
→ tạo order pending với course snapshot
→ user thanh toán qua Momo/VNPay
→ gateway callback/webhook hợp lệ mark paid
→ order.status = paid
→ tạo enrollment active
→ học viên thấy khóa trong /my-courses
```

---

## Flow 4 — Coupon / payment / invoice

```text
/admin/coupons
→ tạo [[web/page/student/coupon|coupon]] và usage rule
→ [[web/page/student/checkout|checkout]] validate [[web/page/student/coupon|coupon]]
→ order paid thì coupon_redemptions = applied

/admin/payments
→ xem payment_transactions/webhook logs

/admin/invoices
→ tạo receipt/invoice từ order paid
```

---

## Flow 5 — Học viên học và nộp bài

```text
Student học tại /learn/[course]/[lesson]
→ video/resource hoàn thành bằng lesson_progress
→ assignment/final_project nộp vào [[web/page/instructor/submissions|submissions]]
→ admin duyệt ở /admin/submissions
```

---

## Flow 6 — Duyệt bài nộp

```text
/admin/submissions
→ mở submission detail
→ xem link demo/source/text
→ viết feedback
→ approve hoặc reject

Nếu approved:
→ lesson tính completed

Nếu rejected:
→ học viên sửa và nộp lại
```

---

## Flow 7 — Cấp [[web/page/website/certificate|certificate]]

```text
/admin/certificates
→ chọn học viên + khóa học
→ kiểm tra điều kiện
→ tạo Certificate ID
→ generate PDF
→ status = valid
→ học viên thấy [[web/page/website/certificate|certificate]] ở /my-certificates
```

---

# 14. Component dùng chung

| Component            | Dùng ở đâu                                   |
| -------------------- | -------------------------------------------- |
| `AdminLayout`        | Tất cả trang admin                           |
| `AdminSidebar`       | Menu admin                                   |
| `AdminTopbar`        | Search, notification, avatar                 |
| `KpiCard`            | Overview                                     |
| `DataTable`          | Courses, Students, Submissions, Certificates |
| `StatusBadge`        | Trạng thái khóa, order, payment, submission, [[web/page/website/certificate|certificate]] |
| `SearchFilterBar`    | Tìm kiếm/lọc                                 |
| `CreateEditModal`    | Tạo/sửa dữ liệu                              |
| `ConfirmDialog`      | Xóa, revoke, block                           |
| `FeedbackBox`        | Duyệt [[web/page/instructor/submissions|submissions]]                            |
| `OrderDetailDrawer`  | Chi tiết order/payment/invoice               |
| `CouponFormModal`    | Tạo/sửa [[web/page/student/coupon|coupon]]                               |
| `PaymentLogDrawer`   | Xem payment transaction/webhook payload      |
| `CertificatePreview` | Quản lý [[web/page/website/certificate|certificate]]                          |
| `EmptyState`         | Khi chưa có dữ liệu                          |
| `LoadingState`       | Khi đang tải                                 |

---

# 15. Data chính cần dùng

| Bảng               | Dùng cho                                   |
| ------------------ | ------------------------------------------ |
| `users`            | Admin, học viên                            |
| `courses`          | Khóa học                                   |
| `resources`        | Resource/blog hub và course resources      |
| `modules`          | Module trong khóa                          |
| `lessons`          | Video, resource, quiz, assignment, final project |
| `video_assets`     | Video streaming provider asset cho video lesson |
| `lesson_resources` | Tài liệu kèm lesson                        |
| `files`            | File metadata cho resource/attachment/PDF    |
| `course_instructors` | Phân công instructor theo khóa           |
| `account_balance_transactions` | Ledger refund/reset số dư nội bộ |
| `enrollments`      | Học viên đăng ký khóa                      |
| `lesson_progress`  | Tiến độ học video/resource                 |
| [[web/page/instructor/submissions|`submissions`]]      | Bài nộp assignment/final project           |
| `certificates`     | Chứng chỉ                                  |
| `orders`           | Đơn hàng, doanh thu, [[web/page/student/checkout|checkout]]              |
| `coupons`          | Mã giảm giá                                |
| `coupon_redemptions` | Lịch sử dùng [[web/page/student/coupon|coupon]]                      |
| `payment_transactions` | Giao dịch thanh toán                    |
| `payment_webhook_logs` | Debug webhook thanh toán                |
| `invoices`         | Biên nhận/hóa đơn                          |
| `referral_codes`   | Mã giới thiệu                              |
| `referral_conversions` | Conversion/reward [[web/page/student/referral|referral]]              |
| `announcements`    | Thông báo global/course                    |
| [[web/page/student/notifications|`notifications`]]    | Delivery thông báo in-app cá nhân          |
| `lesson_questions` | Q&A theo lesson                            |
| `quizzes`          | Quiz gắn với lesson                        |
| `quiz_questions`   | Câu hỏi quiz                               |
| `quiz_attempts`    | Lần làm quiz và kết quả                    |
| `course_reviews`   | Review/rating khóa học                     |
| `certificate_templates` | Template cấp chứng chỉ                |
| `audit_logs`       | Lịch sử thao tác admin/instructor/course_editor |

---

# 16. Phân quyền admin

## MVP/P1

```text
Role chính thức:
- admin
- course_editor
- instructor
- student
```

## Future role expansion

| Role        | Quyền                                  |
| ----------- | -------------------------------------- |
| super_admin | Toàn quyền                             |
| admin       | Quản lý vận hành toàn hệ thống         |
| course_editor | Vào `/admin/courses*` và `/admin/lessons*` để chỉnh nội dung khóa học |
| instructor  | Chấm bài & hỗ trợ học viên (read-only curriculum) |
| student     | Học viên                               |

## Rule quan trọng

```text
Student không được vào /admin.
Instructor vào /instructor, không vào finance/commerce admin.
Course editor chỉ vào /admin/courses* và /admin/lessons*; sidebar chỉ hiện Courses và Lessons.

--- Content editing ---
Admin và course_editor được upload video và quản lý nội dung khóa học trong /admin/courses* và /admin/lessons*.
Course editor không được assign instructor/staff, không xem học viên/order/revenue, không publish/archive/delete các phần nhạy cảm nếu action đó ảnh hưởng enrollment/order.

--- Admin là người duy nhất có quyền vận hành hệ thống ---
Admin mới được quản lý học viên: gán khóa, block/unblock.
Admin mới được tạo/sửa/xóa announcement.
Admin mới được refund order và đối soát giao dịch gateway. Admin không có action đổi order sang `paid`; trạng thái `paid` chỉ sinh từ transaction success hợp lệ của Momo/VNPay.
Admin mới được reset số dư sau khi xử lý rút tiền offline.
Admin mới được tạo/sửa/archive [[web/page/student/coupon|coupon]].
Admin mới được cấp/revoke [[web/page/website/certificate|certificate]].
Admin mới được xem audit logs toàn hệ thống.

--- Instructor chỉ chấm bài & hỗ trợ ---
Instructor chỉ duyệt submission (approve/reject/revision_requested).
Instructor chỉ trả lời Q&A lesson.
Instructor xem curriculum read-only — không sửa lesson, không upload video.
Instructor không quản lý khóa học, học viên, video hay announcement.
Instructor không cấp/revoke [[web/page/website/certificate|certificate]].
```

---

# 17. Thứ tự build MVP Admin Dashboard

## Phase 1 — Admin nền tảng

| Thứ tự | Trang                           |
| ------ | ------------------------------- |
| 1      | Admin layout + sidebar + topbar |
| 2      | `/admin` Overview               |
| 3      | `/admin/courses`                |
| 4      | `/admin/lessons`                |

## Phase 2 — Commerce MVP

| Thứ tự | Trang              |
| ------ | ------------------ |
| 5      | `/admin/orders`    |
| 6      | `/admin/coupons`   |
| 7      | `/admin/payments`  |
| 8      | `/admin/invoices`  |

## Phase 3 — Quản lý học viên

| Thứ tự | Trang             |
| ------ | ----------------- |
| 9      | `/admin/students` |

## Phase 4 — Duyệt bài và [[web/page/website/certificate|certificate]]

| Thứ tự | Trang                 |
| ------ | --------------------- |
| 10     | `/admin/submissions`  |
| 11     | `/admin/certificates` |

## Future/P2 — Referral và revenue nâng cao

| Thứ tự | Trang              |
| ------ | ------------------ |
| Future | `/admin/referrals` |
| P2     | `/admin/revenue`   |

## Phase 6 — P1 Learning Operations

| Thứ tự | Trang                          |
| ------ | ------------------------------ |
| 14     | `/admin/announcements`         |
| 15     | `/admin/reviews`               |
| 16     | `/admin/certificate-templates` |
| 17     | `/admin/audit-logs`            |

---

# 18. Scope chốt cho Admin Dashboard

```text
Admin Dashboard cần có:

1. /admin
   - KPI (students, enrollments, courses, orders, revenue, [[web/page/instructor/submissions|submissions]], certificates, new leads)
   - Pending [[web/page/instructor/submissions|submissions]]
   - Quick actions

2. /admin/courses
   - Course table
   - Create/edit course
   - Course status
   - Manage lessons button

3. /admin/orders
   - Order table
   - Date/status/course filters
   - Order detail drawer
   - Gateway paid -> create enrollment
   - Refund/cancel
   - Export CSV/Excel

4. /admin/coupons
   - Coupon table
   - Create/edit [[web/page/student/coupon|coupon]]
   - Usage limit and applicability
   - Redemption stats

5. /admin/payments
   - Payment transactions table
   - Provider/status filters
   - Webhook/debug payload view

6. /admin/invoices
   - Create receipt/invoice from paid order
   - Issue/cancel/download

7. /admin/lessons
   - Select course
   - Module manager
   - Lesson manager
   - Lesson type: video/resource/quiz/assignment/final_project

8. /admin/students
   - Student table
   - Student detail drawer (5 tabs: Profile, Learning, Enrollments, Submissions, Certificates)
   - Search
   - Block/unblock
   - Gán khóa trong Enrollments tab

9. /admin/submissions
   - Duyệt assignment/final project
   - Approve/reject/feedback
   - Filter status/type/course

10. /admin/certificates
   - Cấp [[web/page/website/certificate|certificate]]
   - Generate PDF từ certificate_templates
   - Revoke
   - Copy verify link
   - Eligible students section

Future. /admin/referrals
   - Referral code table
   - Conversion table
   - Reward status workflow

P2. /admin/revenue
   - Revenue reporting by date/analysis/payment/coupon
   - Built after orders/payment_transactions are stable

13. /admin/announcements
   - Global/course announcement
   - Publish -> create [[web/page/student/notifications|notifications]]

14. /admin/reviews
   - Moderate course_reviews
   - Publish/hide/reject

15. /admin/certificate-templates
   - Manage active [[web/page/website/certificate|certificate]] templates
   - Preserve snapshot for issued certificates

16. /admin/audit-logs
   - Read-only activity trail
   - Filter by actor/action/entity
```

Nói ngắn gọn: **Admin Dashboard là trung tâm vận hành của CORTEX: tạo khóa → bán khóa → đối soát thanh toán online → mở quyền học tự động → theo dõi học → duyệt bài → cấp chứng chỉ.**

---

# 19. Acceptance Criteria

| Tiêu chí | Đạt / Không |
| -------- | ----------- |
| Route admin trong matrix có trang detail hoặc section tương ứng | |
| Admin role có quyền commerce, content, [[web/page/website/certificate|certificate]], P1 ops | |
| Instructor không có quyền commerce/revenue/payment/coupon/invoice | |
| Data chính khớp [[web/unified_database_schema|`unified_database_schema.md`]] | |

---

## 🗺️ Obsidian Meta

### Tags
- #cortex/page/admin
- #cortex/plan
- #cortex/requirement

### Navigation
- **Breadcrumbs:** [[CORTEX_PLAN_MOC|Plan Home]] / [[web/page|Requirements]] / [[web/page/admin/admin|Admin Dashboard]]

### Relations
- **Outgoing Links:** [[web/page|1. Public Website — phần người ngoài nhìn thấy]], [[web/page/instructor/questions|/instructor/questions — Trả lời Q&A]], [[web/page/instructor/submissions|/instructor/submissions — Duyệt bài nộp]], [[web/page/student/checkout|/checkout/:courseSlug — Thanh toán khóa học]], [[web/page/student/coupon|/coupon — Coupon của tôi / Nhập mã giảm giá]], [[web/page/student/dashboard|/dashboard — Trang tổng quan học viên]], [[web/page/student/notifications|/notifications — Thông báo của tôi]], [[web/page/student/referral|/referral — Mã giới thiệu]], [[web/page/website/certificate|/certificate — Trang chứng chỉ]], [[web/page/website/contact|/contact — Trang liên hệ]], [[web/unified_database_schema|💎 Unified Database Schema - CORTEX Project]]
- **Incoming Links (Backlinks):** [[web/architecture|Architecture — Kiến trúc kỹ thuật CORTEX]], [[web/hard_notes|Hard Notes]], [[web/page|1. Public Website — phần người ngoài nhìn thấy]], [[web/page/admin/admin-announcements|/admin/announcements — Quản lý thông báo]], [[web/page/admin/admin-certificates|/admin/certificates — Quản lý chứng chỉ]], [[web/page/admin/admin-courses|/admin/courses — Quản lý khóa học]], [[web/page/admin/admin-leads|/admin/leads — Quản lý Type B Leads]], [[web/page/admin/admin-lessons|/admin/lessons — Quản lý module/bài học]], [[web/page/admin/admin-orders|/admin/orders — Quản lý đơn hàng]], [[web/page/admin/admin-overview|/admin — Admin Overview]], [[web/page/admin/admin-resources|/admin/resources — Quản lý Resources Hub]], [[web/page/admin/admin-students|/admin/students — Quản lý học viên]], [[web/page/admin/admin-submissions|/admin/submissions — Duyệt bài nộp]], [[web/page/admin/admin-system-users-new|/admin/system/users/new — Hidden Staff Account Creation]], [[web/page/instructor/courses|/instructor/courses — Khóa được phân công]], [[web/page/instructor/overview|/instructor — Instructor Overview]], [[web/page/instructor/submissions|/instructor/submissions — Duyệt bài nộp]], [[web/page/student/assignments|/assignments — Legacy / Không ưu tiên MVP]], [[web/page/student/checkout|/checkout/:courseSlug — Thanh toán khóa học]], [[web/page/student/checkout-result|/checkout/success và /checkout/failed — Kết quả thanh toán]], [[web/page/student/dashboard|/dashboard — Trang tổng quan học viên]], [[web/page/student/learn-lesson|/learn/analysis/lesson — Trang bài học]], [[web/page/student/login|/login — Đăng nhập]], [[web/page/student/my-courses|/my-courses — Khóa học của tôi]], [[web/page/student/my-orders|/my-orders và /my-orders/:id — Đơn hàng của tôi]], [[web/page/student/profile|/profile — Hồ sơ cá nhân]], [[web/page/student/register|/register — Đăng ký tài khoản]], [[web/page/website/blog|/blog — Blog / Resources Hub]], [[web/page/website/maintenance|/maintenance — Trang bảo trì hệ thống]], [[web/page/website/refund-policy|/refund-policy — Chính sách refund]], [[web/page_function_matrix|Page Function Matrix — CORTEX]], [[web/security|Security — Bảo mật hệ thống CORTEX]], [[web/unified_database_schema|💎 Unified Database Schema - CORTEX Project]]
