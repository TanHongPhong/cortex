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

# `/admin/payments` — Theo dõi giao dịch thanh toán

**Status:** MVP
**Owner area:** Admin
**Source of truth:** `plan/web/page_function_matrix.md`, `plan/web/unified_database_schema.md`
**Build decision:** Build

## 1. Mục tiêu

Admin xem từng lần thanh toán/thử thanh toán của order, đối soát gateway và debug lỗi.

---

## 2. Layout

```text
/admin/payments

[KPI / Summary]
[Filters: provider, status, date]
[Payment Transactions Table]
[Transaction Detail Drawer]
[Webhook Logs]
```

---

## 3. Table columns

```text
Order code
Provider
Provider transaction ID
Provider event ID
Amount
Currency
Status
Created at
Action
```

---

## 4. Rule

| Trường hợp | Rule |
| ---------- | ---- |
| Payment success | Có thể chuyển order paid nếu match amount/order hợp lệ |
| Payment failed | Không mở quyền học |
| Webhook retry | Không tạo duplicate transaction nếu trùng `provider_transaction_id` hoặc `idempotency_key` |
| Webhook duplicate event | Nếu trùng `provider + provider_event_id`, log mới là `ignored`, không tạo transaction |
| Raw payload | Chỉ đọc, không sửa |
| Manual payment | Admin có thể tạo transaction provider = manual/bank_transfer |

---

## 5. Data cần dùng

| Bảng | Dữ liệu |
| ---- | ------ |
| `payment_transactions` | Giao dịch, `provider_transaction_id`, `idempotency_key`, processed_at |
| `payment_webhook_logs` | Log webhook, provider_event_id, processing_status ignored/processed/failed |
| `orders` | Order status và amount |
| `users` | Customer info |

---

## 6. Acceptance Criteria

| Tiêu chí | Đạt / Không |
| -------- | ----------- |
| Admin xem được payment transactions | |
| Filter provider/status/date hoạt động | |
| Mở được transaction detail | |
| Xem được raw payload/webhook logs | |
| Webhook trùng provider_event_id hiển thị ignored và không tạo duplicate transaction | |
| Không sửa trực tiếp raw payload | |

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
