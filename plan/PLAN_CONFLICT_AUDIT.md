# Plan Conflict Audit - CORTEX Requirements

Ngay doc: 2026-06-02

## Pham vi da check

Da doi chieu toan bo `plan/requirement/` hien tai:

- Source-of-truth tong: [[requirement/page_function_matrix|`page_function_matrix.md`]], [[requirement/page|`page.md`]], [[requirement/unified_database_schema|`unified_database_schema.md`]], [[requirement/security|`security.md`]], [[requirement/architecture|`architecture.md`]], [[requirement/infrastructure|`infrastructure.md`]], [[requirement/hard_notes|`hard_notes.md`]].
- Page docs: public website, student, instructor, [[requirement/page/admin/admin|admin]].
- Luu y: [[requirement/hard_notes|`hard_notes.md`]] tu khai bao khong phai build contract, nen chi dung de phan loai future/ops, khong dung de override schema/page.

## Ket luan ngan

Tai lieu requirement hien tai da thong nhat tot ve huong san pham chinh: khong co trang student assignment/referral/coupon rieng, khong co `/admin/revenue`, [[requirement/page/student/checkout|checkout]] chi mua mot khoa, instructor chi cham bai va Q&A trong course duoc gan.

Conflict con lai chu yeu nam o tang chi tiet: route co trong matrix nhung thieu file detail, format [[requirement/page/website/certificate|certificate]] ID bi lech vi du, audit action naming khong dong bo, foreign key cascade trai voi rule giu lich su, retention policy trai voi soft-delete policy, va mot so scope MVP/P1 bi lan.

## Conflict P0 - can chot truoc khi build/migrate

### 1. FK cascade trai voi policy giu lich su va khong propagate soft delete

Bang chung:

- [[requirement/unified_database_schema|`unified_database_schema.md`]] dat `modules.course_id`, `lessons.course_id`, `lessons.module_id`, `enrollments.course_id`, `lesson_progress.user_id`, `lesson_progress.lesson_id`, `[[requirement/page/instructor/submissions|submissions]].user_id/course_id/lesson_id`, `certificates.user_id/course_id` la `ON DELETE CASCADE`.
- Cung file lai chot: course soft delete khong tu dong xoa enrollments, user soft delete khong tu dong xoa/set null enrollments/submissions/orders, va record lich su phai giu de phuc vu learning/finance/audit.
- `orders.course_id` da dung `ON DELETE RESTRICT` de tranh mat lich su, nhung `enrollments`, [[requirement/page/instructor/submissions|`submissions`]], `certificates` lai cascade.

Rui ro:

- Neu co hard delete o DB hoac migration/tool cleanup chay nham, lich su hoc tap/chung chi/bai nop co the bi xoa theo.
- Trai voi rule [[requirement/page/admin/admin|admin]] [[requirement/page|page]]: course/user co du lieu van hanh thi uu tien archive/block, khong xoa.

Quyet dinh de xuat:

- Cac entity lich su (`enrollments`, [[requirement/page/instructor/submissions|`submissions`]], `certificates`, `lesson_progress`, `quiz_attempts`, `orders`, `invoices`, `audit_logs`) dung `ON DELETE RESTRICT` hoac `NO ACTION`.
- Chi cascade cho child content thuan cau truc khi parent chac chan chi duoc xoa luc draft/empty, hoac chuyen sang soft delete/hidden neu da co lich su.
- Them mot bang "FK policy" trong schema: `configuration/content draft`, `learning history`, `commerce history`, `audit/history`.

### 2. Security retention "auto-delete soft deleted records sau 90 ngay" trai voi policy giu lich su

Bang chung:

- [[requirement/security|`security.md`]] muc data retention ghi `Soft deleted records | 90 days | Auto-delete after 90 days`.
- [[requirement/unified_database_schema|`unified_database_schema.md`]] lai chot khong hard delete orders, [[requirement/page/website/certificate|certificate]] revoke khong xoa record, soft delete user/course khong propagate va van giu lich su van hanh.

Rui ro:

- Cleanup job co the xoa record dang can cho audit, finance, [[requirement/page/website/certificate|certificate]] verification, student history.
- Khong ro "soft deleted records" ap dung cho bang nao.

Quyet dinh de xuat:

- Doi retention thanh theo nhom bang:
  - `password_reset_tokens`: xoa sau expiry.
  - `payment_webhook_logs`: co the prune/archived sau 90 ngay neu da co audit/event summary.
  - `audit_logs`: archive sau 1 nam, khong xoa trong P1 neu chua co archival policy.
  - `orders`, `invoices`, `certificates`, [[requirement/page/instructor/submissions|`submissions`]], `enrollments`, `account_balance_transactions`: khong auto-delete trong P1.
  - `users.deleted_at`: khong auto-delete neu co lien ket lich su; neu user rong thi mo requirement rieng.

### 3. Certificate ID format thong nhat o rule nhung vi du bi lech

Bang chung:

- Schema/security/verify [[requirement/page|page]] chot regex `^CERT-\d{8}-\d{6}$` va format `CERT-{YYYY}{RRRR}-{NNNNNN}`.
- Nhieu vi du trong [[requirement/page|page]] detail lai dung `MAY-AI-2026-0001` hoac `MAY-AIAGENT-2026-0001`, khong match regex.

Rui ro:

- Verify [[requirement/page|page]], [[requirement/page/website/certificate|certificate]] [[requirement/page|page]], [[requirement/page/admin/admin|admin]] certificates va student [[requirement/page/student/my-certificates|my-certificates]] co the build theo 2 format khac nhau.
- QR/link verify co the fail neu copy theo vi du cu.

Quyet dinh de xuat:

- Chot format P1: `CERT-{YYYY}{RRRR}-{NNNNNN}`.
- Doi tat ca vi du `MAY-*` thanh `CERT-*`.
- Neu muon brand-readable code nhu `MAY-AI-*`, mo requirement rieng va update regex/schema/security cung luc.

### 4. Audit action naming khong dong bo giua lesson detail va schema

Bang chung:

- [[requirement/unified_database_schema|`unified_database_schema.md`]] danh sach action bat buoc chi co `course.publish/archive/delete`, `lesson.publish/archive/delete/reorder`, `submission.review`, ...
- [[requirement/page/admin/admin-lessons|`admin-lessons.md`]] dung them `module.create`, `module.update`, `module.reorder`, `module.archive`, `module.delete`, `lesson.create`, `lesson.update`, `lesson.type_change`.

Rui ro:

- Dev khong biet action nao la canonical khi implement audit.
- Admin audit log filter/export co the thieu event create/update/type_change.

Quyet dinh de xuat:

- Mo rong danh sach canonical trong schema, khong cat bo action chi tiet.
- Chot naming group:
  - `module.create/update/reorder/archive/delete`
  - `lesson.create/update/type_change/reorder/publish/archive/delete`
  - `quiz.create/update/archive`
  - `video_asset.retry/fail/archive`
- Page [[requirement/page/admin/admin-audit-logs|admin-audit-logs]] phai tham chieu dung danh sach canonical nay.

## Conflict P1 - can chot de build route/page dung coverage

### 5. Route co trong matrix nhung thieu file detail rieng

Bang chung:

- Matrix co `/reset-password`, `/projects/[slug]`, `/blog/[slug]`, `/admin/courses/[id]`, `/admin/students/[id]`, cac route nested `/admin/lessons/*`, `/admin/submissions/*`, `/instructor/courses/*`, `/instructor/submissions/*`.
- File detail rieng chi co mot so [[requirement/page|page]] gom chung, vi du [[requirement/page/student/forgot-password|`forgot-password.md`]] gom ca `/reset-password`, [[requirement/page/student/checkout-result|`checkout-result.md`]] gom success/failed, [[requirement/page/website/projects|`projects.md`]] gom ca detail.

Day khong phai conflict nghiem trong neu chap nhan "gom file", nhung hien matrix la source-of-truth route va [[requirement/page|page]] docs dang khong cung granularity.

Quyet dinh de xuat:

- Chot convention: route nested co the nam chung file neu title noi ro "covers route X/Y".
- Them muc "Covered routes" o dau moi file [[requirement/page|page]] detail.
- Hoac tach file detail cho route co logic rieng:
  - `student/reset-password.md`
  - `website/blog-detail.md`
  - `website/project-detail.md`
  - `[[requirement/page/admin/admin|admin]]/admin-course-detail.md`
  - `[[requirement/page/admin/admin|admin]]/admin-student-detail.md`

### 6. Scope MVP/P1 bi lan o mot so [[requirement/page|page]]

Bang chung:

- Matrix danh dau `/notifications`, instructor workspace, `/admin/resources`, `/admin/announcements`, `/admin/reviews`, `/admin/audit-logs`, `/admin/system/users/new` la P1 hoac P1 ops.
- Mot so file tong [[requirement/page|`page.md`]] liet ke chung cac route do khong tach build phase; [[requirement/page/admin/admin|`admin.md`]] co "MVP + P1" va thu tu phase rieng.

Rui ro:

- Sprint MVP co the bi keo qua P1 neu dev doc [[requirement/page|`page.md`]] nhu build all.

Quyet dinh de xuat:

- Them cot `Phase` vao [[requirement/page_function_matrix|`page_function_matrix.md`]]: `MVP`, `P1`, `Future`.
- Page detail dau file phai co `Status` va `Build decision` nhu dang lam; [[requirement/page|`page.md`]] nen ghi ro la catalog tong, khong phai sprint MVP checklist.
- Tao `MVP_BUILD_ORDER.md` neu can, tach khoi full requirement.

### 7. Checkout success/failed route va file name khong trung

Bang chung:

- Matrix/page chot hai route `/checkout/success` va `/checkout/failed`.
- File detail la [[requirement/page/student/checkout-result|`checkout-result.md`]], gom ca hai route.

Rui ro:

- Nho, chu yeu la coverage/discovery. Dev co the tim file theo route va khong thay.

Quyet dinh de xuat:

- Giu file gom chung nhung them "Covered routes: `/checkout/success`, `/checkout/failed`" o dau file.
- Khong can tach neu khong muon tang so file.

## Conflict P2 - can don sach de tranh hieu nham

### 8. Referral reward co `cash` trong enum nhung refund/withdrawal P1 la offline/no self-service

Bang chung:

- `referral_codes.reward_type` co `cash`.
- Matrix chot balance withdrawal la user lien he support, khong self-service; [[requirement/page/student/referral|referral]] conversion xem trong `/admin/orders`, khong co trang [[requirement/page/student/referral|referral]] rieng.

Day khong sai tuyet doi, vi `cash` co the la reward offline. Nhung can ghi ro neu giu.

Quyet dinh de xuat:

- Neu P1 van cho reward offline, doi mo ta `cash` thanh "offline_cash_reward_manual".
- Neu chua van hanh cash reward, bo `cash` khoi P1 enum va dua vao future.

### 9. `payment_transactions` duplicate rule nhac `provider_event_id` nhung field nay nam o webhook logs

Bang chung:

- `payment_transactions` business rule noi duplicate neu trung `provider + provider_event_id`.
- Bang `payment_transactions` khong co field `provider_event_id`; field nay nam o `payment_webhook_logs`.

Rui ro:

- Dev co the them sai field vao transactions hoac implement duplicate check sai tang.

Quyet dinh de xuat:

- Rule transaction: duplicate theo `provider + idempotency_key` hoac `provider + provider_transaction_id`.
- Rule webhook log: duplicate theo `provider + provider_event_id`.
- Khi webhook processed thanh transaction, link qua `order_id`/`provider_transaction_id`, khong can duplicate event id tren transaction tru khi co requirement moi.

## Khong thay conflict lon

Nhung diem sau da thong nhat tot trong requirement hien tai:

- Khong co `/admin/revenue`; revenue/report nam trong `/admin/orders`.
- Khong co trang student [[requirement/page/student/coupon|coupon]]/referral rieng; [[requirement/page/student/coupon|coupon]]/referral di qua [[requirement/page/student/checkout|checkout]]/register/login URL/session.
- Assignment, final project, quiz nam trong `/learn/[course]/[lesson]`, khong tao route rieng.
- Instructor khong quan ly course/video/student/announcement/commerce/certificate; chi read-only curriculum, cham submission, tra loi Q&A theo course assignment.
- Checkout mua mot khoa mot order; khong co `order_items` trong MVP/P1.
- Refund P1 la credit noi bo vao `users.account_balance`, withdrawal qua support/admin offline.
- Blog/resource hub dung `resources`, khong tao bang [[requirement/page/website/blog|blog]] song song.

## Plan xu ly conflict

### Phase 1 - Chot rule canonical

1. Chot [[requirement/unified_database_schema|`unified_database_schema.md`]] la canonical cho DB, nhung sua FK delete policy de khop rule giu lich su.
2. Chot [[requirement/page/website/certificate|certificate]] ID P1 la `CERT-{YYYY}{RRRR}-{NNNNNN}`.
3. Chot audit action canonical va bo sung missing module/lesson create/update/type_change.
4. Chot retention theo nhom bang, khong dung rule chung "soft deleted records auto-delete 90 days".

### Phase 2 - Sua tai lieu source-of-truth

1. Update [[requirement/unified_database_schema|`unified_database_schema.md`]]:
   - FK policy table.
   - Certificate examples.
   - Payment duplicate rule tach transaction/webhook.
   - Audit action list.
2. Update [[requirement/security|`security.md`]]:
   - Certificate examples/regex giu dong bo.
   - Data retention theo nhom bang.
3. Update [[requirement/page_function_matrix|`page_function_matrix.md`]]:
   - Them cot phase.
   - Them convention "route nested co the covered by file chung".

### Phase 3 - Sua [[requirement/page|page]] docs bi lech

1. Doi tat ca vi du [[requirement/page/website/certificate|certificate]] `MAY-*` thanh `CERT-*`.
2. Them `Covered routes` vao cac file gom nhieu route:
   - `[[requirement/page|page]]/student/forgot-password.md`
   - `[[requirement/page|page]]/student/checkout-result.md`
   - `[[requirement/page|page]]/website/blog.md`
   - `[[requirement/page|page]]/website/projects.md`
   - `[[requirement/page|page]]/admin/admin-courses.md`
   - `[[requirement/page|page]]/admin/admin-students.md`
   - `[[requirement/page|page]]/admin/admin-lessons.md`
   - `[[requirement/page|page]]/admin/admin-submissions.md`
   - [[requirement/page/instructor/courses|`page/instructor/courses.md`]]
   - `[[requirement/page|page]]/instructor/submissions.md`
3. Update [[requirement/page/admin/admin-audit-logs|`admin-audit-logs.md`]] de list action canonical moi.

### Phase 4 - Verify lai

1. Chay grep route deprecated:
   - `/admin/revenue`, `/admin/referrals`, `/referral`, `/coupon`, `/assignments`, `/submit-project`.
2. Chay grep [[requirement/page/website/certificate|certificate]] example:
   - Khong con `MAY-AI` hoac `MAY-AIAGENT`.
3. Chay grep audit action:
   - Tat ca action trong [[requirement/page|page]] docs co trong canonical list.
4. Chay grep FK:
   - Cac history table khong con `ON DELETE CASCADE` trai policy.

## Thu tu uu tien neu thoi gian han che

1. Sua FK/retention truoc vi anh huong migration va mat du lieu.
2. Sua [[requirement/page/website/certificate|certificate]] format vi anh huong verify public va QR.
3. Sua audit action canonical vi anh huong logging va [[requirement/page/admin/admin|admin]] audit.
4. Sua route coverage/phase labels vi anh huong planning va build order.

---

## 🗺️ Obsidian Meta

### Tags
- #cortex/plan

### Navigation
- **Breadcrumbs:** [[CORTEX_PLAN_MOC|Plan Home]]

### Relations
- **Outgoing Links:** [[requirement/architecture|Architecture — Kiến trúc kỹ thuật CORTEX]], [[requirement/hard_notes|Hard Notes]], [[requirement/infrastructure|Infrastructure — Hạ tầng triển khai CORTEX]], [[requirement/page|1. Public Website — phần người ngoài nhìn thấy]], [[requirement/page/admin/admin|Admin Dashboard — Requirement]], [[requirement/page/admin/admin-audit-logs|/admin/audit-logs — Lịch sử thao tác]], [[requirement/page/admin/admin-lessons|/admin/lessons — Quản lý module/bài học]], [[requirement/page/instructor/courses|/instructor/courses — Khóa được phân công]], [[requirement/page/instructor/submissions|/instructor/submissions — Duyệt bài nộp]], [[requirement/page/student/checkout|/checkout/:courseSlug — Thanh toán khóa học]], [[requirement/page/student/checkout-result|/checkout/success và /checkout/failed — Kết quả thanh toán]], [[requirement/page/student/coupon|/coupon — Coupon của tôi / Nhập mã giảm giá]], [[requirement/page/student/forgot-password|/forgot-password — Quên mật khẩu]], [[requirement/page/student/my-certificates|/my-certificates — Chứng chỉ của tôi]], [[requirement/page/student/referral|/referral — Mã giới thiệu]], [[requirement/page/website/blog|/blog — Blog / Resources Hub]], [[requirement/page/website/certificate|/certificate — Trang chứng chỉ]], [[requirement/page/website/projects|/projects — Trang dự án học viên]], [[requirement/page_function_matrix|Page Function Matrix — CORTEX]], [[requirement/security|Security — Bảo mật hệ thống CORTEX]], [[requirement/unified_database_schema|💎 Unified Database Schema - CORTEX Project]]
- **Incoming Links (Backlinks):** *None*
