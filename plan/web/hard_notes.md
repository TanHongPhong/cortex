---
categories:
  - "[[Projects]]"
  - "[[cortex.ai]]"
  - "[[cortex.ai Web]]"
  - "[[Requirements]]"
type: ["[[Technical Specification]]"]
org: ["[[cortex.ai]]"]
start: 2026-06-02
year: 2026
url: https://github.com/TanHongPhong/cortex
status: "[[Planned]]"
---

# Hard Notes

`hard_notes.md` không phải build contract. File này chỉ giữ các lưu ý future/ops chưa cần đổi schema/page ngay; mọi quyết định P1 đã chốt phải nằm trong source-of-truth chính như [[web/unified_database_schema|unified_database_schema.md]], [[web/security|security.md]], [[web/architecture|architecture.md]], [[web/page_function_matrix|page_function_matrix.md]], [[web/page|page.md]] và [[web/page|page]] docs.

## Infrastructure / Jobs

| Hạng mục | Lưu ý future/ops |
| -------- | ---------------- |
| Backup/restore drill | Checklist vận hành để verify PostgreSQL backup, R2 assets, [[web/page/website/certificate|certificate]] PDFs và invoices. Không đổi schema/page P1. |
| Job contracts | Default vận hành cho background jobs: idempotency key = `job_name + source_type + source_id`, retry tối đa 3 lần, failed state lưu để [[web/page/admin/admin|admin]] thấy trong [[web/page/student/dashboard|dashboard]]/log. |
| Notification retry workflow | P1 background retry tối đa 3 lần; sau đó `[[web/page/student/notifications|notifications]].delivery_status = failed`. Admin xem failed notification nhưng chưa có manual retry UI. |

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
- **Breadcrumbs:** [[CORTEX_PLAN_MOC|Plan Home]] / [[web/page|Requirements]]

### Relations
- **Outgoing Links:** [[web/architecture|Architecture — Kiến trúc kỹ thuật CORTEX]], [[web/page|1. Public Website — phần người ngoài nhìn thấy]], [[web/page/admin/admin|Admin Dashboard — Requirement]], [[web/page/student/dashboard|/dashboard — Trang tổng quan học viên]], [[web/page/student/notifications|/notifications — Thông báo của tôi]], [[web/page/website/certificate|/certificate — Trang chứng chỉ]], [[web/page_function_matrix|Page Function Matrix — CORTEX]], [[web/security|Security — Bảo mật hệ thống CORTEX]], [[web/unified_database_schema|💎 Unified Database Schema - CORTEX Project]]
- **Incoming Links (Backlinks):** [[PLAN_CONFLICT_AUDIT|Plan Conflict Audit - CORTEX Requirements]]
