# Hard Notes

`hard_notes.md` không phải build contract. File này chỉ giữ các lưu ý future/ops chưa cần đổi schema/page ngay; mọi quyết định P1 đã chốt phải nằm trong source-of-truth chính như [[requirement/unified_database_schema|unified_database_schema.md]], [[requirement/security|security.md]], [[requirement/architecture|architecture.md]], [[requirement/page_function_matrix|page_function_matrix.md]], [[requirement/page|page.md]] và [[requirement/page|page]] docs.

## Infrastructure / Jobs

| Hạng mục | Lưu ý future/ops |
| -------- | ---------------- |
| Backup/restore drill | Checklist vận hành để verify PostgreSQL backup, R2 assets, [[requirement/page/website/certificate|certificate]] PDFs và invoices. Không đổi schema/page P1. |
| Job contracts | Default vận hành cho background jobs: idempotency key = `job_name + source_type + source_id`, retry tối đa 3 lần, failed state lưu để [[requirement/page/admin/admin|admin]] thấy trong [[requirement/page/student/dashboard|dashboard]]/log. |
| Notification retry workflow | P1 background retry tối đa 3 lần; sau đó `[[requirement/page/student/notifications|notifications]].delivery_status = failed`. Admin xem failed notification nhưng chưa có manual retry UI. |

## Product / Content Future

| Hạng mục | Lưu ý future/ops |
| -------- | ---------------- |
| Invoice/VAT policy | P1 `invoices` là receipt/biên nhận nội bộ, không phải hóa đơn VAT hợp pháp. VAT/e-invoice mở requirement riêng sau. |
| Resource taxonomy seed | P1 schema đã chốt `resource_type`, `category`, `tags`, `author_name`, SEO fields và gated download behavior. Seed list category/tag ban đầu là việc vận hành content, không đổi schema. |
| Admin notes future | P1 không build `admin_notes` và không tạo bảng trong schema hiện tại. Nếu cần CRM/support note sau này, mở lại bằng requirement riêng. |

---

## 🗺️ Obsidian Meta

### Tags
- #cortex/plan
- #cortex/requirement

### Navigation
- **Breadcrumbs:** [[CORTEX_PLAN_MOC|Plan Home]] / [[requirement/page|Requirements]]

### Relations
- **Outgoing Links:** [[requirement/architecture|Architecture — Kiến trúc kỹ thuật CORTEX]], [[requirement/page|1. Public Website — phần người ngoài nhìn thấy]], [[requirement/page/admin/admin|Admin Dashboard — Requirement]], [[requirement/page/student/dashboard|/dashboard — Trang tổng quan học viên]], [[requirement/page/student/notifications|/notifications — Thông báo của tôi]], [[requirement/page/website/certificate|/certificate — Trang chứng chỉ]], [[requirement/page_function_matrix|Page Function Matrix — CORTEX]], [[requirement/security|Security — Bảo mật hệ thống CORTEX]], [[requirement/unified_database_schema|💎 Unified Database Schema - CORTEX Project]]
- **Incoming Links (Backlinks):** [[PLAN_CONFLICT_AUDIT|Plan Conflict Audit - CORTEX Requirements]]
