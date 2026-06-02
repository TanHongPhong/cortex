---
categories:
  - "[[Projects]]"
  - "[[cortex.ai]]"
  - "[[cortex.ai Web]]"
  - "[[System Audit]]"
type: ["[[System Audit]]"]
org: ["[[cortex.ai]]"]
start: 2026-06-02
year: 2026
url: https://github.com/TanHongPhong/cortex
status: "[[Planned]]"
---

# Plan Conflict Audit - CORTEX Requirements

Ngày đọc: 2026-06-02

## Phạm vi đã check

Đã đối chiếu toàn bộ `plan/web/` hiện tại:

- Source-of-truth tổng: [[web/page_function_matrix|`page_function_matrix.md`]], [[web/page|`page.md`]], [[web/unified_database_schema|`unified_database_schema.md`]], [[web/security|`security.md`]], [[web/architecture|`architecture.md`]], [[web/infrastructure|`infrastructure.md`]], [[web/hard_notes|`hard_notes.md`]].
- Page docs: public website, student, instructor, [[web/page/admin/admin|admin]].
- Lưu ý: [[web/hard_notes|`hard_notes.md`]] tự khai báo không phải build contract, nên chỉ dùng để phân loại future/ops, không dùng để override schema/page.

## Kết luận ngắn

Tài liệu requirement hiện tại đã thống nhất tốt về hướng sản phẩm chính: không có trang student assignment/referral/coupon riêng, không có `/admin/revenue`, [[web/page/student/checkout|checkout]] chỉ mua một khóa, instructor chỉ chấm bài và Q&A trong course được gán.

Conflict còn lại chủ yếu nằm ở tầng chi tiết: route có trong matrix nhưng thiếu file detail, format [[web/page/website/certificate|certificate]] ID bị lệch ví dụ, audit action naming không đồng bộ, foreign key cascade trái với rule giữ lịch sử, retention policy trái với soft-delete policy, và một số scope MVP/P1 bị lẫn.

## Conflict P0 - cần chốt trước khi build/migrate

### 1. FK cascade trái với policy giữ lịch sử và không propagate soft delete

Bằng chứng:

- [[web/unified_database_schema|`unified_database_schema.md`]] đặt `modules.course_id`, `lessons.course_id`, `lessons.module_id`, `enrollments.course_id`, `lesson_progress.user_id`, `lesson_progress.lesson_id`, `[[web/page/instructor/submissions|submissions]].user_id/course_id/lesson_id`, `certificates.user_id/course_id` là `ON DELETE CASCADE`.
- Cùng file lại chốt: course soft delete không tự động xóa enrollments, user soft delete không tự động xóa/set null enrollments/submissions/orders, và record lịch sử phải giữ để phục vụ learning/finance/audit.
- `orders.course_id` đã dùng `ON DELETE RESTRICT` để tránh mất lịch sử, nhưng `enrollments`, [[web/page/instructor/submissions|`submissions`]], `certificates` lại cascade.

Rủi ro:

- Nếu có hard delete ở DB hoặc migration/tool cleanup chạy nhầm, lịch sử học tập/chứng chỉ/bài nộp có thể bị xóa theo.
- Trái với rule [[web/page/admin/admin|admin]] [[web/page|page]]: analysis/user có dữ liệu vận hành thì ưu tiên archive/block, không xóa.

Quyết định đề xuất:

- Các entity lịch sử (`enrollments`, [[web/page/instructor/submissions|`submissions`]], `certificates`, `lesson_progress`, `quiz_attempts`, `orders`, `invoices`, `audit_logs`) dùng `ON DELETE RESTRICT` hoặc `NO ACTION`.
- Chỉ cascade cho child content thuần cấu trúc khi parent chắc chắn chỉ được xóa lúc draft/empty, hoặc chuyển sang soft delete/hidden nếu đã có lịch sử.
- Thêm một bảng "FK policy" trong schema: `configuration/content draft`, `learning history`, `commerce history`, `audit/history`.

### 2. Security retention "auto-delete soft deleted records sau 90 ngày" trái với policy giữ lịch sử

Bằng chứng:

- [[web/security|`security.md`]] mục data retention ghi `Soft deleted records | 90 days | Auto-delete after 90 days`.
- [[web/unified_database_schema|`unified_database_schema.md`]] lại chốt không hard delete orders, [[web/page/website/certificate|certificate]] revoke không xóa record, soft delete user/course không propagate và vẫn giữ lịch sử vận hành.

Rủi ro:

- Cleanup job có thể xóa record đang cần cho audit, finance, [[web/page/website/certificate|certificate]] verification, student history.
- Không rõ "soft deleted records" áp dụng cho bảng nào.

Quyết định đề xuất:

- Đổi retention thành theo nhóm bảng:
  - `password_reset_tokens`: xóa sau expiry.
  - `payment_webhook_logs`: có thể prune/archived sau 90 ngày nếu đã có audit/event summary.
  - `audit_logs`: archive sau 1 năm, không xóa trong P1 nếu chưa có archival policy.
  - `orders`, `invoices`, `certificates`, [[web/page/instructor/submissions|`submissions`]], `enrollments`, `account_balance_transactions`: không auto-delete trong P1.
  - `users.deleted_at`: không auto-delete nếu có liên kết lịch sử; nếu user rỗng thì mở requirement riêng.

### 3. Certificate ID format thống nhất ở rule nhưng ví dụ bị lệch

Bằng chứng:

- Schema/security/verify [[web/page|page]] chốt regex `^CERT-\d{8}-\d{6}$` và format `CERT-{YYYY}{RRRR}-{NNNNNN}`.
- Nhiều ví dụ trong [[web/page|page]] detail lại dùng `MAY-AI-2026-0001` hoặc `MAY-AIAGENT-2026-0001`, không match regex.

Rủi ro:

- Verify [[web/page|page]], [[web/page/website/certificate|certificate]] [[web/page|page]], [[web/page/admin/admin|admin]] certificates và student [[web/page/student/my-certificates|my-certificates]] có thể build theo 2 format khác nhau.
- QR/link verify có thể fail nếu copy theo ví dụ cũ.

Quyết định đề xuất:

- Chốt format P1: `CERT-{YYYY}{RRRR}-{NNNNNN}`.
- Đổi tất cả ví dụ `MAY-*` thành `CERT-*`.
- Nếu muốn brand-readable code nào như `MAY-AI-*`, mở requirement riêng và update regex/schema/security cùng lúc.

### 4. Audit action naming không đồng bộ giữa lesson detail và schema

Bằng chứng:

- [[web/unified_database_schema|`unified_database_schema.md`]] danh sách action bắt buộc chỉ có `course.publish/archive/delete`, `lesson.publish/archive/delete/reorder`, `submission.review`, ...
- [[web/page/admin/admin-lessons|`admin-lessons.md`]] dùng thêm `module.create`, `module.update`, `module.reorder`, `module.archive`, `module.delete`, `lesson.create`, `lesson.update`, `lesson.type_change`.

Rủi ro:

- Dev không biết action nào là canonical khi implement audit.
- Admin audit log filter/export có thể thiếu event create/update/type_change.

Quyết định đề xuất:

- Mở rộng danh sách canonical trong schema, không cắt bỏ action chi tiết.
- Chốt naming group:
  - `module.create/update/reorder/archive/delete`
  - `lesson.create/update/type_change/reorder/publish/archive/delete`
  - `quiz.create/update/archive`
  - `video_asset.retry/fail/archive`
- Page [[web/page/admin/admin-audit-logs|admin-audit-logs]] phải tham chiếu đúng danh sách canonical này.

## Conflict P1 - cần chốt để build route/page đúng coverage

### 5. Route có trong matrix nhưng thiếu file detail riêng

Bằng chứng:

- Matrix có `/reset-password`, `/projects/[slug]`, `/blog/[slug]`, `/admin/courses/[id]`, `/admin/students/[id]`, các route nested `/admin/lessons/*`, `/admin/submissions/*`, `/instructor/courses/*`, `/instructor/submissions/*`.
- File detail riêng chỉ có một số [[web/page|page]] gom chung, ví dụ [[web/page/student/forgot-password|`forgot-password.md`]] gom cả `/reset-password`, [[web/page/student/checkout-result|`checkout-result.md`]] gom success/failed, [[web/page/website/projects|`projects.md`]] gom cả detail.

Đây không phải conflict nghiêm trọng nếu chấp nhận "gom file", nhưng hiện matrix là source-of-truth route và [[web/page|page]] docs đang không cùng granularity.

Quyết định đề xuất:

- Chốt convention: route nested có thể nằm chung file nếu title nói rõ "covers route X/Y".
- Thêm mục "Covered routes" ở đầu mỗi file [[web/page|page]] detail.
- Hoặc tách file detail cho route có logic riêng:
  - `student/reset-password.md`
  - `website/blog-detail.md`
  - `website/project-detail.md`
  - `[[web/page/admin/admin|admin]]/admin-course-detail.md`
  - `[[web/page/admin/admin|admin]]/admin-student-detail.md`

### 6. Scope MVP/P1 bị lẫn ở một số [[web/page|page]]

Bằng chứng:

- Matrix đánh dấu `/notifications`, instructor workspace, `/admin/resources`, `/admin/announcements`, `/admin/reviews`, `/admin/audit-logs`, `/admin/system/users/new` là P1 hoặc P1 ops.
- Một số file tổng [[web/page|`page.md`]] liệt kê chung các route đó không tách build phase; [[web/page/admin/admin|`admin.md`]] có "MVP + P1" và thứ tự phase riêng.

Rủi ro:

- Sprint MVP có thể bị kéo qua P1 nếu dev đọc [[web/page|`page.md`]] như build all.

Quyết định đề xuất:

- Thêm cột `Phase` vào [[web/page_function_matrix|`page_function_matrix.md`]]: `MVP`, `P1`, `Future`.
- Page detail đầu file phải có `Status` và `Build decision` như đang làm; [[web/page|`page.md`]] nên ghi rõ là catalog tổng, không phải sprint MVP checklist.
- Tạo `MVP_BUILD_ORDER.md` nếu cần, tách khỏi full requirement.

### 7. Checkout success/failed route và file name không trùng

Bằng chứng:

- Matrix/page chốt hai route `/checkout/success` và `/checkout/failed`.
- File detail là [[web/page/student/checkout-result|`checkout-result.md`]], gom cả hai route.

Rủi ro:

- Nhỏ, chủ yếu là coverage/discovery. Dev có thể tìm file theo route và không thấy.

Quyết định đề xuất:

- Giữ file gom chung nhưng thêm "Covered routes: `/checkout/success`, `/checkout/failed`" ở đầu file.
- Không cần tách nếu không muốn tăng số file.

## Conflict P2 - cần dọn sạch để tránh hiểu nhầm

### 8. Referral reward có `cash` trong enum nhưng refund/withdrawal P1 là offline/no self-service

Bằng chứng:

- `referral_codes.reward_type` có `cash`.
- Matrix chốt balance withdrawal là user liên hệ support, không self-service; [[web/page/student/referral|referral]] conversion xem trong `/admin/orders`, không có trang [[web/page/student/referral|referral]] riêng.

Đây không sai tuyệt đối, vì `cash` có thể là reward offline. Nhưng cần ghi rõ nếu giữ.

Quyết định đề xuất:

- Nếu P1 vẫn cho reward offline, đổi mô tả `cash` thành "offline_cash_reward_manual".
- Nếu chưa vận hành cash reward, bỏ `cash` khỏi P1 enum và đưa vào future.

### 9. `payment_transactions` duplicate rule nhắc `provider_event_id` nhưng field này nằm ở webhook logs

Bằng chứng:

- `payment_transactions` business rule nói duplicate nếu trùng `provider + provider_event_id`.
- Bảng `payment_transactions` không có field `provider_event_id`; field này nằm ở `payment_webhook_logs`.

Rủi ro:

- Dev có thể thêm sai field vào transactions hoặc implement duplicate check sai tầng.

Quyết định đề xuất:

- Rule transaction: duplicate theo `provider + idempotency_key` hoặc `provider + provider_transaction_id`.
- Rule webhook log: duplicate theo `provider + provider_event_id`.
- Khi webhook processed thành transaction, link qua `order_id`/`provider_transaction_id`, không cần duplicate event id trên transaction trừ khi có requirement mới.

## Không thấy conflict lớn

Những điểm sau đã thống nhất tốt trong requirement hiện tại:

- Không có `/admin/revenue`; revenue/report nằm trong `/admin/orders`.
- Không có trang student [[web/page/student/coupon|coupon]]/referral riêng; [[web/page/student/coupon|coupon]]/referral đi qua [[web/page/student/checkout|checkout]]/register/login URL/session.
- Assignment, final project, quiz nằm trong `/learn/[course]/[lesson]`, không tạo route riêng.
- Instructor không quản lý analysis/video/student/announcement/commerce/certificate; chỉ read-only curriculum, chấm submission, trả lời Q&A theo course assignment.
- Checkout mua một khóa một order; không có `order_items` trong MVP/P1.
- Refund P1 là credit nội bộ vào `users.account_balance`, withdrawal qua support/admin offline.
- Blog/resource hub dùng `resources`, không tạo bảng [[web/page/website/blog|blog]] song song.

## Plan xử lý conflict

### Phase 1 - Chốt rule canonical

1. Chốt [[web/unified_database_schema|`unified_database_schema.md`]] là canonical cho DB, nhưng sửa FK delete policy để khớp rule giữ lịch sử.
2. Chốt [[web/page/website/certificate|certificate]] ID P1 là `CERT-{YYYY}{RRRR}-{NNNNNN}`.
3. Chốt audit action canonical và bổ sung missing module/lesson create/update/type_change.
4. Chốt retention theo nhóm bảng, không dùng rule chung "soft deleted records auto-delete 90 days".

### Phase 2 - Sửa tài liệu source-of-truth

1. Update [[web/unified_database_schema|`unified_database_schema.md`]]:
   - FK policy table.
   - Certificate examples.
   - Payment duplicate rule tách transaction/webhook.
   - Audit action list.
2. Update [[web/security|`security.md`]]:
   - Certificate examples/regex giữ đồng bộ.
   - Data retention theo nhóm bảng.
3. Update [[web/page_function_matrix|`page_function_matrix.md`]]:
   - Thêm cột phase.
   - Thêm convention "route nested có thể covered by file chung".

### Phase 3 - Sửa [[web/page|page]] docs bị lệch

1. Đổi tất cả ví dụ [[web/page/website/certificate|certificate]] `MAY-*` thành `CERT-*`.
2. Thêm `Covered routes` vào các file gom nhiều route:
   - `[[web/page|page]]/student/forgot-password.md`
   - `[[web/page|page]]/student/checkout-result.md`
   - `[[web/page|page]]/website/blog.md`
   - `[[web/page|page]]/website/projects.md`
   - `[[web/page|page]]/admin/admin-courses.md`
   - `[[web/page|page]]/admin/admin-students.md`
   - `[[web/page|page]]/admin/admin-lessons.md`
   - `[[web/page|page]]/admin/admin-submissions.md`
   - [[web/page/instructor/courses|`page/instructor/courses.md`]]
   - `[[web/page|page]]/instructor/submissions.md`
3. Update [[web/page/admin/admin-audit-logs|`admin-audit-logs.md`]] để list action canonical mới.

### Phase 4 - Verify lại

1. Chạy grep route deprecated:
   - `/admin/revenue`, `/admin/referrals`, `/referral`, `/coupon`, `/assignments`, `/submit-project`.
2. Chạy grep [[web/page/website/certificate|certificate]] example:
   - Không còn `MAY-AI` hoặc `MAY-AIAGENT`.
3. Chạy grep audit action:
   - Tất cả action trong [[web/page|page]] docs có trong canonical list.
4. Chạy grep FK:
   - Các history table không còn `ON DELETE CASCADE` trái policy.

## Thứ tự ưu tiên nếu thời gian hạn chế

1. Sửa FK/retention trước vì ảnh hưởng migration và mất dữ liệu.
2. Sửa [[web/page/website/certificate|certificate]] format vì ảnh hưởng verify public và QR.
3. Sửa audit action canonical vì ảnh hưởng logging và [[web/page/admin/admin|admin]] audit.
4. Sửa route coverage/phase labels vì ảnh hưởng planning và build order.

---

## 🗺️ Obsidian Meta

### Tags
- #cortex/plan

### Navigation
- **Breadcrumbs:** [[CORTEX_PLAN_MOC|Plan Home]]

### Relations
- **Outgoing Links:** [[web/architecture|Architecture — Kiến trúc kỹ thuật CORTEX]], [[web/hard_notes|Hard Notes]], [[web/infrastructure|Infrastructure — Hạ tầng triển khai CORTEX]], [[web/page|1. Public Website — phần người ngoài nhìn thấy]], [[web/page/admin/admin|Admin Dashboard — Requirement]], [[web/page/admin/admin-audit-logs|/admin/audit-logs — Lịch sử thao tác]], [[web/page/admin/admin-lessons|/admin/lessons — Quản lý module/bài học]], [[web/page/instructor/courses|/instructor/courses — Khóa được phân công]], [[web/page/instructor/submissions|/instructor/submissions — Duyệt bài nộp]], [[web/page/student/checkout|/checkout/:courseSlug — Thanh toán khóa học]], [[web/page/student/checkout-result|/checkout/success và /checkout/failed — Kết quả thanh toán]], [[web/page/student/coupon|/coupon — Coupon của tôi / Nhập mã giảm giá]], [[web/page/student/forgot-password|/forgot-password — Quên mật khẩu]], [[web/page/student/my-certificates|/my-certificates — Chứng chỉ của tôi]], [[web/page/student/referral|/referral — Mã giới thiệu]], [[web/page/website/blog|/blog — Blog / Resources Hub]], [[web/page/website/certificate|/certificate — Trang chứng chỉ]], [[web/page/website/projects|/projects — Trang dự án học viên]], [[web/page_function_matrix|Page Function Matrix — CORTEX]], [[web/security|Security — Bảo mật hệ thống CORTEX]], [[web/unified_database_schema|💎 Unified Database Schema - CORTEX Project]]
- **Incoming Links (Backlinks):** *None*
