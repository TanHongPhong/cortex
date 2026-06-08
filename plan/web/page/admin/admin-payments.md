---
categories:
  - "[[Projects]]"
  - "[[Blueprint]]"
  - "[[Blueprint Web]]"
  - "[[Requirements]]"
  - "[[Admin Dashboard]]"
type: ["[[Page Spec]]"]
org: ["[[Blueprint]]"]
start: 2026-06-02
year: 2026
url: https://github.com/TanHongPhong/blueprint
status: "[[MVP]]"
---

# `/admin/payments` — Theo dõi giao dịch thanh toán

**Status:** MVP
**Owner area:** Admin
**Source of truth:** `plan/web/page_function_matrix.md`, `plan/web/unified_database_schema.md`
**Design source:** [[web/page/admin/design|Admin Dashboard Design — Warm Operational System]]
**Build decision:** Build

## 1. Mục tiêu

Admin xem từng lần thanh toán/thử thanh toán QR của order, đối soát provider webhook và debug lỗi.

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
| Payment success | Chỉ webhook QR hợp lệ được chuyển order paid khi match amount/order/transaction |
| Payment failed | Không mở quyền học |
| QR providers | MVP/P1 chỉ hỗ trợ `momo` và `vnpay` |
| Provider verification | Phải verify chữ ký/hash, amount, currency, order_id, provider_transaction_id và idempotency trước khi cập nhật order |
| Webhook retry | Không tạo duplicate transaction nếu trùng `provider_transaction_id` hoặc `idempotency_key` |
| Webhook duplicate event | Nếu trùng `provider + provider_event_id`, log mới là `ignored`, không tạo transaction |
| Raw payload | Chỉ đọc, không sửa |
| Payment confirmation source | Chỉ webhook QR hợp lệ được ghi nhận paid; không có upload biên lai hoặc nút admin đổi paid |

---

## 5. Data cần dùng

| Bảng | Dữ liệu |
| ---- | ------ |
| `payment_transactions` | Giao dịch QR, `provider_transaction_id`, `idempotency_key`, `qr_payload`, `qr_expires_at`, processed_at |
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
| Không có action tạo transaction ngoài webhook, upload biên lai hoặc nút admin đổi paid | |

---

## 🗺️ Obsidian Meta

### Tags
- #blueprint/page/admin
- #blueprint/plan
- #blueprint/requirement

### Navigation
- **Breadcrumbs:** [[BLUEPRINT_PLAN_MOC|Plan Home]] / [[web/page|Requirements]] / [[web/page/admin/admin|Admin Dashboard]]

### Relations
- **Outgoing Links:** *None*
- **Incoming Links (Backlinks):** *None*
