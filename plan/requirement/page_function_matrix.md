# Page Function Matrix — CORTEX

File này là bảng đối chiếu nhanh để đảm bảo từng page có chức năng rõ ràng và không trùng flow dữ liệu.

---

## 1. Public Website

| Route | Vai trò chính | Data chính | CTA / Next step |
| ----- | ------------- | ---------- | --------------- |
| `/` | Giới thiệu CORTEX, dẫn vào khóa học/contact | `courses`, `projects`, `course_reviews`, `leads` nếu có form | `/courses`, `/contact` |
| `/courses` | Product catalog 4 khóa chính + Premium/B2B | `courses`, `course_reviews` | `/courses/[slug]`, `/checkout/:courseSlug`, `/contact?type=...` |
| `/courses/[slug]` | Bán/giải thích từng khóa | `courses`, `modules`, `lessons`, `course_reviews`, `enrollments` | Starter/Core -> `/checkout/:courseSlug`; Advanced/Premium/B2B -> `/contact` |
| `/projects` | Showcase project mẫu/học viên | `projects`, `courses` | `/courses`, demo/source |
| `/certificate` | Giải thích certificate | `certificate_templates`, static content | `/verify-certificate`, `/courses` |
| `/verify-certificate` | Xác thực certificate public | `certificates`, `certificate_templates`, `users`, `courses` | Result valid/revoked/not found |
| `/blog` | Resources Hub + lead magnet | `resources`, `leads` | `/courses`, `/contact` |
| `/contact` | Thu lead Type B | `leads` | Success state, admin xử lý ở `/admin/leads` |
| `/privacy` | Chính sách dữ liệu/consent | static requirement, `leads.consent_privacy_policy` | đọc chính sách trước khi submit form |
| `/terms` | Điều khoản tài khoản/khóa học/certificate | static requirement | đọc điều khoản trước khi mua/học |
| `/refund-policy` | Chính sách refund vào số dư nội bộ | static requirement, `orders`, `account_balance_transactions` | `/contact?type=support` để rút số dư |

---

## 2. Auth & Student Portal

| Route | Vai trò chính | Data chính | CTA / Next step |
| ----- | ------------- | ---------- | --------------- |
| `/login` | Đăng nhập bằng email/password cho student/admin/instructor | `users`/auth | student -> `/dashboard`, instructor -> `/instructor`, admin -> `/admin` |
| `/register` | Tạo user role student | `users`, optional referral param | `/dashboard` hoặc `/login` |
| `/dashboard` | Học tiếp hôm nay + notification preview | `users`, `enrollments`, `courses`, `lessons`, `lesson_progress`, `submissions`, `certificates`, `notifications`, `announcements` | `/learn/[course]/[lesson]`, `/notifications` |
| `/notifications` | Inbox in-app notification | `notifications`, `announcements` | mark read, mở bằng `target_type`/`target_id` hoặc fallback `target_url` |
| `/my-courses` | Danh sách khóa đã enrolled | `enrollments`, `courses`, `lesson_progress`, `submissions`, `quiz_attempts` | `/learn/[course]` |
| `/learn/[course]` | Bản đồ khóa học + announcement/review prompt | `courses`, `modules`, `lessons`, `resources`, `announcements`, `lesson_progress`, `submissions`, `quiz_attempts`, `course_reviews`, `certificates` | `/learn/[course]/[lesson]`, submit review |
| `/learn/[course]/[lesson]` | Học video/resource, quiz, Q&A, nộp assignment/final_project | `lessons`, `video_assets`, `lesson_resources`, `files`, `lesson_progress`, `submissions`, `quizzes`, `quiz_questions`, `quiz_attempts`, `lesson_questions` | Complete/Submit/Ask/Next |
| `/my-certificates` | Chứng chỉ đã cấp | `certificates`, `certificate_templates`, `courses` | Download/verify/copy ID |
| `/profile` | Hồ sơ, learning profile, số dư nội bộ | `users`, `account_balance_transactions` | Save profile/change password/contact support để rút số dư |
| `/checkout/:courseSlug` | Tạo order mua khóa đơn | `users`, `courses`, `orders`, `coupons`, `referral_codes`, `payment_transactions` | `/checkout/success` hoặc `/checkout/failed` |
| `/checkout/success` | Kết quả thanh toán thành công/pending manual | `orders`, `payment_transactions`, `enrollments`, `notifications` | `/learn/[course]` hoặc `/my-orders/:id` |
| `/checkout/failed` | Kết quả thanh toán lỗi/hủy | `orders`, `payment_transactions` | retry checkout hoặc `/my-orders/:id` |
| `/my-orders` | Lịch sử đơn hàng | `orders`, `invoices`, `account_balance_transactions` | `/my-orders/:id` |
| `/my-orders/:id` | Chi tiết order/payment/invoice/refund credit | `orders`, `payment_transactions`, `invoices`, `account_balance_transactions` | retry/download, support qua `/contact?type=support` |
| `/coupon` | Xem/copy coupon nếu cần | `coupons`, `coupon_redemptions`, `orders` | `/checkout/:courseSlug` |
| `/referral` | P2, mã giới thiệu và reward | `referral_codes`, `referral_conversions`, `orders` | copy invite link |
| `/assignments` | Legacy, không build MVP/P1 | Future: `submissions` nếu cần trang tổng hợp | dùng `/learn/[course]/[lesson]` |
| `/submit-project` | Legacy, không build MVP/P1 | Future: `submissions` nếu cần route riêng | dùng `/learn/[course]/[lesson]` |

---

## 3. Instructor Workspace

| Route | Vai trò chính | Data chính | Action chính |
| ----- | ------------- | ---------- | ------------ |
| `/instructor` | Tổng quan khóa được phân công | `users`, `course_instructors`, `courses`, `submissions`, `lesson_questions`, `notifications` | vào queue cần xử lý |
| `/instructor/courses` | Xem khóa/module/lesson theo permission flags | `course_instructors`, `courses`, `modules`, `lessons`, `announcements` | xem curriculum; tạo course announcement chỉ khi `can_manage_announcements = true` |
| `/instructor/submissions` | Duyệt bài nộp khi `can_review_submissions = true` | `course_instructors`, `submissions`, `users`, `courses`, `lessons`, `notifications` | approve/reject/feedback |
| `/instructor/questions` | Trả lời Q&A khi `can_answer_questions = true` | `course_instructors`, `lesson_questions`, `users`, `courses`, `lessons`, `notifications` | answer/mark resolved/hide |

---

## 4. Admin Dashboard

| Route | Vai trò chính | Data chính | Action chính |
| ----- | ------------- | ---------- | ------------ |
| `/admin` | Tổng quan vận hành + commerce/P1 alerts | `users`, `courses`, `resources`, `enrollments`, `orders`, `submissions`, `certificates`, `leads`, `lesson_questions`, `course_reviews`, `notifications` | điều hướng xử lý |
| `/admin/courses` | Quản lý vỏ khóa học | `courses`, `course_faqs`, `course_instructors`, count `lessons`, count `enrollments`, `course_reviews` | create/edit/assign instructor/publish/archive |
| `/admin/resources` | Quản lý public resources/blog hub | `resources`, `files`, `courses`, `leads` | create/edit/publish/archive |
| `/admin/lessons` | Quản lý module/lesson/video assets/resources/quiz | `courses`, `modules`, `lessons`, `video_assets`, `lesson_resources`, `files`, `quizzes`, `quiz_questions` | create/edit/reorder/publish |
| `/admin/students` | Quản lý từng học viên và số dư nội bộ | `users`, `account_balance_transactions`, `enrollments`, `submissions`, `quiz_attempts`, `certificates`, `admin_notes` | view/enroll/block/reset balance sau rút offline |
| `/admin/submissions` | Duyệt assignment/final_project | `submissions`, `users`, `courses`, `lessons`, `notifications`, `audit_logs` | approve/revision_requested/reject/feedback |
| `/admin/certificates` | Cấp/revoke certificate | `certificates`, `certificate_templates`, `users`, `courses`, `enrollments`, `submissions`, `audit_logs` | issue/download/revoke |
| `/admin/certificate-templates` | Quản lý template chứng chỉ | `certificate_templates`, `courses`, `audit_logs` | create/edit/activate/archive |
| `/admin/leads` | Quản lý Type B leads | `leads`, analytics qua `orders.lead_id` | mark contacted/lost |
| `/admin/orders` | Quản lý tiền/order tổng và refund credit | `orders`, `users`, `courses`, `payment_transactions`, `invoices`, `coupons`, `account_balance_transactions`, `audit_logs` | confirm paid/refund to balance/export |
| `/admin/coupons` | Quản lý mã giảm giá | `coupons`, `coupon_redemptions`, `orders`, `audit_logs` | create/edit/pause/archive |
| `/admin/payments` | Theo dõi từng giao dịch/webhook idempotency | `payment_transactions`, `payment_webhook_logs`, `orders` | debug/match transaction, ignored duplicate webhook |
| `/admin/invoices` | Biên nhận/hóa đơn | `invoices`, `orders`, `audit_logs` | create/issue/cancel/download |
| `/admin/referrals` | Referral conversion/reward | `referral_codes`, `referral_conversions`, `orders` | approve/issue/cancel reward |
| `/admin/revenue` | P2 báo cáo doanh thu | `orders`, `payment_transactions`, `coupons`, `referral_codes` | filter/export |
| `/admin/announcements` | Quản lý thông báo global/course | `announcements`, `notifications`, `courses` | create/publish/archive |
| `/admin/reviews` | Kiểm duyệt course reviews | `course_reviews`, `users`, `courses` | publish/hide/reject |
| `/admin/audit-logs` | Xem lịch sử thao tác nhạy cảm | `audit_logs`, `users` | filter/export/read-only |

---

## 5. Flow không được tạo trùng

| Flow | Page chính | Không dùng |
| ---- | ---------- | ---------- |
| Nộp assignment | `/learn/[course]/[lesson]` với `lesson_type = assignment` | `/assignments` trong MVP/P1 |
| Nộp final project | `/learn/[course]/[lesson]` với `lesson_type = final_project` | `/submit-project` trong MVP/P1 |
| Làm quiz | `/learn/[course]/[lesson]` với `lesson_type = quiz` | page quiz rời |
| Q&A bài học | `/learn/[course]/[lesson]` và instructor queue | forum/community lớn trong P1 |
| Announcement | `/admin/announcements` tạo nguồn | tạo notification thủ công thay announcement |
| Notification | `/notifications` delivery cá nhân | dùng notification làm nội dung nguồn |
| Mở quyền học sau mua | `orders.status = paid` -> `enrollments` | tạo enrollment từ pending order |
| Refund order | `/admin/orders` -> credit vào `users.account_balance` + ledger | hoàn tiền gateway tự động hoặc xóa order |
| Ghi nhận thanh toán | `payment_transactions` | ghi đè `orders.transaction_id` như lịch sử duy nhất |
| Báo cáo order cũ | `orders.*_snapshot` | lấy tên/giá khóa hiện tại để report |
| Coupon usage | `coupon_redemptions` applied khi paid | tăng `used_count` khi order còn pending |
| Referral reward | `referral_conversions` khi paid | reward khi order chưa paid |
| Instructor role | `/instructor/*` cho khóa được phân công | cho instructor vào finance/commerce admin |
| Balance withdrawal | User liên hệ `/contact?type=support`, admin reset balance sau xử lý offline | self-service withdrawal trong MVP/P1 |
| Audit trail | `audit_logs` append-only | sửa/xóa log qua UI thường |
