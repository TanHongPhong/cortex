---
categories:
  - "[[Projects]]"
  - "[[Blueprint]]"
  - "[[Blueprint Web]]"
  - "[[Requirements]]"
type: ["[[Technical Specification]]"]
org: ["[[Blueprint]]"]
start: 2026-06-02
year: 2026
url: https://github.com/TanHongPhong/blueprint
status: "[[Planned]]"
---

# Page Function Matrix — Blueprint

File này là bảng đối chiếu nhanh để đảm bảo từng [[web/page|page]] có chức năng rõ ràng, không trùng flow dữ liệu và không nhầm full requirement catalog với checklist build MVP.

**Route coverage convention:** Route nested có thể được mô tả chung trong một file detail nếu file đó có mục `Covered routes`. Chỉ tách file riêng khi route có layout/logic đủ lớn để cần spec độc lập.

---

## 1. Public Website

| Route | Phase | Vai trò chính | Data chính | CTA / Next step |
| ----- | ----- | ------------- | ---------- | --------------- |
| `/` | MVP | Giới thiệu Blueprint, dẫn vào khóa học/contact | `courses`, [[web/page/website/projects|`projects`]], `course_reviews`, `leads` nếu có form | `/courses`, `/contact` |
| `/courses` | MVP | Product catalog 4 khóa chính + Premium/B2B | `courses`, `course_reviews` | `/courses/[slug]`, `/checkout/:courseSlug`, `/contact?type=...` |
| `/courses/[slug]` | MVP | Bán/giải thích từng khóa | `courses`, `modules`, `lessons`, `course_reviews`, `enrollments` | Starter/Core -> `/checkout/:courseSlug`; Advanced/Premium/B2B -> `/contact` |
| `/projects` | MVP | Showcase project mẫu/học viên | [[web/page/website/projects|`projects`]], `courses` | `/courses`, demo/source |
| `/certificate` | MVP | Giải thích [[web/page/website/certificate|certificate]] | `certificate_templates`, static content | `/verify-certificate`, `/courses` |
| `/verify-certificate` | MVP | Xác thực [[web/page/website/certificate|certificate]] public | `certificates`, `certificate_templates`, `users`, `courses` | Result valid/revoked/not found |
| `/blog` | MVP | Resources Hub + lead magnet | `resources`, `leads` | `/courses`, `/contact` |
| `/contact` | MVP | Thu lead Type B | `leads` | Success state, [[web/page/admin/admin|admin]] xử lý ở `/admin/leads` |
| `/privacy` | MVP | Chính sách dữ liệu/consent | static requirement, `leads.consent_privacy_policy` | đọc chính sách trước khi submit form |
| `/terms` | MVP | Điều khoản tài khoản/khóa học/certificate | static requirement | đọc điều khoản trước khi mua/học |
| `/refund-policy` | MVP | Chính sách refund vào số dư nội bộ | static requirement, `orders`, `account_balance_transactions` | `/contact?type=support` để rút số dư |
| `/404` | MVP | Trang không tìm thấy (system [[web/page|page]]) | static | `/`, `/courses`, search |
| `/500` | MVP | Trang lỗi server (system [[web/page|page]]) | static, Sentry logging | retry, `/`, `/contact?type=support` |
| `/maintenance` | MVP | Trang bảo trì (system [[web/page|page]]) | `maintenance_status` API, countdown | auto-refresh khi hết thời gian |

---

## 2. Auth & Student Portal

| Route | Phase | Vai trò chính | Data chính | CTA / Next step |
| ----- | ----- | ------------- | ---------- | --------------- |
| `/login` | MVP | Đăng nhập bằng email/password cho student/admin/instructor | `users`/auth | student -> `/dashboard`, instructor -> `/instructor`, [[web/page/admin/admin|admin]] -> `/admin` |
| `/register` | MVP | Tạo user role student | `users`, optional referral param | `/dashboard` hoặc `/login` |
| `/forgot-password` | MVP | Gửi reset password link qua email | `users`, `password_reset_tokens` | Success message -> check email |
| `/reset-password` | MVP | Đặt lại mật khẩu mới từ token | `users`, `password_reset_tokens` | `/login` with success message |
| `/dashboard` | MVP | Học tiếp hôm nay + notification preview | `users`, `enrollments`, `courses`, `lessons`, `lesson_progress`, [[web/page/instructor/submissions|`submissions`]], `certificates`, [[web/page/student/notifications|`notifications`]], `announcements` | `/learn/[course]/[lesson]`, `/notifications` |
| `/notifications` | P1 | Inbox in-app notification | [[web/page/student/notifications|`notifications`]], `announcements` | mark read, mở bằng `target_type`/`target_id` hoặc fallback `target_url` |
| `/my-courses` | MVP | Danh sách khóa đã enrolled | `enrollments`, `courses`, `lesson_progress`, [[web/page/instructor/submissions|`submissions`]], `quiz_attempts` | `/learn/[course]` |
| `/learn/[course]` | MVP | Bản đồ khóa học + announcement/review prompt | `courses`, `modules`, `lessons`, `resources`, `announcements`, `lesson_progress`, [[web/page/instructor/submissions|`submissions`]], `quiz_attempts`, `course_reviews`, `certificates` | `/learn/[course]/[lesson]`, submit review |
| `/learn/[course]/[lesson]` | MVP + P1 | Học video/resource, quiz, nộp assignment/final_project | `lessons`, `video_assets`, `lesson_resources`, `files`, `lesson_progress`, [[web/page/instructor/submissions|`submissions`]], `quizzes`, `quiz_questions`, `quiz_attempts` | Complete/Submit/Next |
| `/my-certificates` | MVP | Chứng chỉ đã cấp | `certificates`, `certificate_templates`, `courses` | Download/verify/copy ID |
| `/profile` | MVP | Hồ sơ, learning [[web/page/student/profile|profile]], số dư nội bộ | `users`, `account_balance_transactions` | Save [[web/page/student/profile|profile]]/change password/contact support để rút số dư |
| `/checkout/:courseSlug` | MVP | Tạo order mua khóa đơn; standalone QR checkout layout, không có student sidebar hoặc self-confirm | `users`, `courses`, `orders`, `coupons`, `referral_codes`, `payment_transactions` | hiển thị QR, chờ webhook, rồi `/checkout/success` hoặc `/checkout/failed` |
| `/checkout/success` | MVP | Kết quả thanh toán QR thành công hoặc pending webhook confirmation; standalone checkout result layout | `orders`, `payment_transactions`, `enrollments`, [[web/page/student/notifications|`notifications`]] | `/learn/[course]` hoặc `/my-orders/:id` |
| `/checkout/failed` | MVP | Kết quả QR hết hạn/thanh toán lỗi/hủy; standalone checkout result layout | `orders`, `payment_transactions` | tạo QR mới hoặc `/my-orders/:id` |
| `/my-orders` | MVP | Lịch sử đơn hàng | `orders`, `invoices`, `account_balance_transactions` | `/my-orders/:id` |
| `/my-orders/:id` | MVP | Chi tiết order/payment/invoice/refund credit | `orders`, `payment_transactions`, `invoices`, `account_balance_transactions` | retry/download, support qua `/contact?type=support` |
| `/assignments` | Not MVP/P1 | Legacy, không build MVP/P1 | Future: [[web/page/instructor/submissions|`submissions`]] nếu cần trang tổng hợp | dùng `/learn/[course]/[lesson]` |
| `/submit-project` | Not MVP/P1 | Legacy, không build MVP/P1 | Future: [[web/page/instructor/submissions|`submissions`]] nếu cần route riêng | dùng `/learn/[course]/[lesson]` |

---

## 3. Instructor Workspace

| Route | Phase | Vai trò chính | Data chính | Action chính |
| ----- | ----- | ------------- | ---------- | ------------ |
| `/instructor` | P1 | Tổng quan khóa được phân công | `users`, `course_instructors`, `courses`, [[web/page/instructor/submissions|`submissions`]], [[web/page/student/notifications|`notifications`]] | vào queue cần xử lý |
| `/instructor/courses` | P1 | Xem khóa/module/lesson; mở content edit nếu `can_edit_course_content = true` | `course_instructors`, `courses`, `modules`, `lessons` | xem curriculum; instructor có quyền edit mở `/admin/courses` hoặc `/admin/lessons` theo khóa được phân công |
| `/instructor/submissions` | P1 | Duyệt bài nộp khi `can_review_submissions = true` | `course_instructors`, [[web/page/instructor/submissions|`submissions`]], `users`, `courses`, `lessons`, [[web/page/student/notifications|`notifications`]] | approve/reject/feedback |


---

## 4. Admin Dashboard

| Route | Phase | Vai trò chính | Data chính | Action chính |
| ----- | ----- | ------------- | ---------- | ------------ |
| `/admin` | MVP + P1 | Tổng quan vận hành + commerce/P1 alerts | `users`, `courses`, `resources`, `enrollments`, `orders`, [[web/page/instructor/submissions|`submissions`]], `certificates`, `leads`, `course_reviews`, [[web/page/student/notifications|`notifications`]] | điều hướng xử lý |
| `/admin/courses` | MVP | Quản lý vỏ khóa học; instructor có `can_edit_course_content = true` được chỉnh content của khóa được phân công | `courses`, `course_faqs`, `course_instructors`, count `lessons`, count `enrollments`, `course_reviews` | admin: create/edit/assign instructor/publish/archive; instructor edit: edit assigned course content, FAQ, manage lessons |
| `/admin/resources` | P1 | Quản lý public resources/blog hub | `resources`, `files`, `courses`, `leads` | create/edit/publish/archive |
| `/admin/lessons` | MVP + P1 | Quản lý module/lesson/video assets/resources/quiz; instructor có `can_edit_course_content = true` được chỉnh content của khóa được phân công | `courses`, `modules`, `lessons`, `video_assets`, `lesson_resources`, `files`, `quizzes`, `quiz_questions`, `course_instructors` | admin/instructor edit: create/edit/reorder content; admin giữ quyền publish/archive/delete nhạy cảm |
| `/admin/students` | MVP | Quản lý từng học viên và số dư nội bộ | `users`, `account_balance_transactions`, `enrollments`, [[web/page/instructor/submissions|`submissions`]], `quiz_attempts`, `certificates`, `admin_notes` | view/enroll/block/reset balance sau rút offline |
| `/admin/submissions` | MVP | Duyệt assignment/final_project | [[web/page/instructor/submissions|`submissions`]], `users`, `courses`, `lessons`, [[web/page/student/notifications|`notifications`]], `audit_logs` | approve/revision_requested/reject/feedback |
| `/admin/certificates` | MVP + P1 | Cấp/revoke [[web/page/website/certificate|certificate]] | `certificates`, `certificate_templates`, `users`, `courses`, `enrollments`, [[web/page/instructor/submissions|`submissions`]], `audit_logs` | issue/download/revoke |
| `/admin/certificate-templates` | P1 | Quản lý template chứng chỉ | `certificate_templates`, `courses`, `audit_logs` | create/edit/activate/archive |
| `/admin/leads` | MVP | Quản lý Type B leads | `leads`, analytics qua `orders.lead_id` | mark contacted/lost |
| `/admin/orders` | MVP | Quản lý tiền/order tổng, QR payment status và refund credit | `orders`, `users`, `courses`, `payment_transactions`, `invoices`, `coupons`, `account_balance_transactions`, `audit_logs` | view QR transactions/webhook logs/refund to balance/export |
| `/admin/coupons` | MVP | Quản lý mã giảm giá | `coupons`, `coupon_redemptions`, `orders`, `audit_logs` | create/edit/pause/archive |
| `/admin/payments` | MVP | Theo dõi từng giao dịch/webhook idempotency | `payment_transactions`, `payment_webhook_logs`, `orders` | debug/match transaction, ignored duplicate webhook |
| `/admin/invoices` | MVP | Biên nhận/hóa đơn | `invoices`, `orders`, `audit_logs` | create/issue/cancel/download |
| `/admin/referrals` | Future | Referral conversion/reward | `referral_codes`, `referral_conversions`, `orders` | approve/issue/cancel reward |
| `/admin/revenue` | Future/P2 | P2 báo cáo doanh thu | `orders`, `payment_transactions`, `coupons`, `referral_codes` | filter/export |
| `/admin/announcements` | P1 | Quản lý thông báo global/course | `announcements`, [[web/page/student/notifications|`notifications`]], `courses` | create/publish/archive |
| `/admin/reviews` | P1 | Kiểm duyệt course reviews | `course_reviews`, `users`, `courses` | publish/hide/reject |
| `/admin/audit-logs` | P1 | Xem lịch sử thao tác nhạy cảm | `audit_logs`, `users` | filter/export/read-only |
| `/admin/system/users` | P1 | Quản lý tài khoản nội bộ admin/instructor | `users`, `course_instructors`, `audit_logs`, `password_reset_tokens` | search/filter/create/block/reset permissions |

---

## 5. Flow không được tạo trùng

| Flow | Page chính | Không dùng |
| ---- | ---------- | ---------- |
| Nộp assignment | `/learn/[course]/[lesson]` với `lesson_type = assignment` | `/assignments` trong MVP/P1 |
| Nộp final project | `/learn/[course]/[lesson]` với `lesson_type = final_project` | `/submit-project` trong MVP/P1 |
| Làm quiz | `/learn/[course]/[lesson]` với `lesson_type = quiz` | [[web/page|page]] quiz rời |

| Announcement | `/admin/announcements` tạo nguồn | tạo notification thủ công thay announcement |
| Notification | `/notifications` delivery cá nhân | dùng notification làm nội dung nguồn |
| Mở quyền học sau mua | `orders.status = paid` -> `enrollments` | tạo enrollment từ pending order |
| Refund order | `/admin/orders` -> credit vào `users.account_balance` + ledger | hoàn tiền gateway tự động hoặc xóa order |
| Ghi nhận thanh toán | QR `payment_transactions` + `payment_webhook_logs` | ghi đè `orders.transaction_id` như lịch sử duy nhất hoặc cho admin tự đổi paid |
| Báo cáo order cũ | `orders.*_snapshot` | lấy tên/giá khóa hiện tại để report |
| Coupon usage | `coupon_redemptions` applied khi paid | tăng `used_count` khi order còn pending |
| Referral reward | `referral_conversions` khi paid | reward khi order chưa paid |
| Instructor role | `/instructor/*` cho khóa được phân công | cho instructor vào finance/commerce [[web/page/admin/admin|admin]] |
| Instructor content edit | `/admin/courses*`, `/admin/lessons*` content-only theo `course_instructors.can_edit_course_content` | quyền global content editor hoặc full admin |
| Balance withdrawal | User liên hệ `/contact?type=support`, [[web/page/admin/admin|admin]] reset balance sau xử lý offline | self-service withdrawal trong MVP/P1 |
| Audit trail | `audit_logs` append-only | sửa/xóa log qua UI thường |

---

## 🗺️ Obsidian Meta

### Tags
- #blueprint/plan
- #blueprint/requirement

### Navigation
- **Breadcrumbs:** [[BLUEPRINT_PLAN_MOC|Plan Home]] / [[web/page|Requirements]]

### Relations
- **Outgoing Links:** [[web/page|1. Public Website — phần người ngoài nhìn thấy]], [[web/page/admin/admin|Admin Dashboard — Requirement]], [[web/page/instructor/submissions|/instructor/submissions — Duyệt bài nộp]], [[web/page/student/checkout|/checkout/:courseSlug — Thanh toán khóa học]], [[web/page/student/notifications|/notifications — Thông báo của tôi]], [[web/page/student/profile|/profile — Hồ sơ cá nhân]], [[web/page/website/certificate|/certificate — Trang chứng chỉ]], [[web/page/website/projects|/projects — Trang dự án học viên]]
- **Incoming Links (Backlinks):** [[web/hard_notes|Hard Notes]]
