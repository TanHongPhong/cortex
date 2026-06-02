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

# `/admin/invoices` — Quản lý biên nhận / hóa đơn

**Status:** MVP
**Owner area:** Admin
**Source of truth:** `plan/web/page_function_matrix.md`, `plan/web/unified_database_schema.md`
**Build decision:** Build

## 1. Mục tiêu

Admin tạo, phát hành, hủy và tải biên nhận/hóa đơn dựa trên order paid.

---

## 2. Layout

```text
/admin/invoices

[KPI / Summary]
[Invoice Table]
[Invoice Detail Drawer]
[Create/Issue Invoice Modal]
```

---

## 3. Rule dữ liệu

| Trường hợp | Rule |
| ---------- | ---- |
| Tạo invoice | Chỉ tạo từ order paid |
| Dữ liệu buyer | Lấy từ billing snapshot trên order |
| Order chưa paid | Không issue invoice |
| Invoice issued | Không sửa âm thầm; nếu sai thì cancel và tạo lại theo quy trình |
| Invoice cancelled | Không xóa record |
| Billing correction after issued | Tạo invoice version mới, không sửa âm thầm bản đã issued |

---

## 4. Data cần dùng

| Bảng | Dữ liệu |
| ---- | ------ |
| `invoices` | invoice code, invoice_version, replaced_invoice_id, buyer, amount, status, file |
| `orders` | billing snapshot, final_amount, status |
| `users` | customer info nếu cần đối chiếu |

---

## 5. Acceptance Criteria

| Tiêu chí | Đạt / Không |
| -------- | ----------- |
| Admin xem danh sách invoices | |
| Tạo invoice từ order paid được | |
| Dữ liệu invoice lấy từ order snapshot | |
| Invoice issued nếu sửa billing thì tạo version mới | |
| Issue/cancel invoice được | |
| Download invoice_url hoạt động nếu có | |

---

## 🗺️ Obsidian Meta

### Tags
- #cortex/page/admin
- #cortex/plan
- #cortex/requirement

### Navigation
- **Breadcrumbs:** [[CORTEX_PLAN_MOC|Plan Home]] / [[web/page|Requirements]] / [[web/page/admin/admin|Admin Dashboard]]

### Relations
- **Outgoing Links:** *None*
- **Incoming Links (Backlinks):** *None*
