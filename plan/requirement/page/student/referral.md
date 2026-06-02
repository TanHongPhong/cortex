# `/referral` — Mã giới thiệu

**Status:** P2
**Owner area:** Student
**Source of truth:** `plan/requirement/page_function_matrix.md`, `plan/requirement/unified_database_schema.md`
**Build decision:** Future

## 1. Mục tiêu

Cho học viên xem mã giới thiệu, invite link, conversion và reward.

---

## 2. Layout

```text
Referral

[My Referral Code]
[Reward Rule]
[Successful Referrals]
[Pending / Issued Rewards]
```

---

## 3. Data cần dùng

| Bảng | Dữ liệu |
| ---- | ------ |
| `referral_codes` | code, status, reward_type, reward_value |
| `referral_conversions` | referred user, order, reward_status |
| `orders` | order paid/refunded |
| `users` | referrer/referred user |

---

## 4. Rule

| Trường hợp | Rule |
| ---------- | ---- |
| User chưa có code | Tạo code hoặc hiện CTA yêu cầu tạo |
| User copy link | Link dạng `/register?ref=CODE` hoặc `/checkout/:courseSlug?ref=CODE` |
| Tự dùng mã của mình | Không cho apply |
| Một referred user mua nhiều đơn | Chỉ conversion đầu tiên được reward |
| Order refunded | Reward chuyển cancelled |

---

## 5. Acceptance Criteria

| Tiêu chí | Đạt / Không |
| -------- | ----------- |
| User thấy referral code của mình | |
| Copy invite link hoạt động | |
| Hiển thị successful referrals | |
| Hiển thị pending/issued/cancelled rewards | |
| Không lộ email/số điện thoại người được giới thiệu nếu không cần | |

---

## 🗺️ Obsidian Meta

### Tags
- #cortex/page/student
- #cortex/plan
- #cortex/requirement

### Navigation
- **Breadcrumbs:** [[CORTEX_PLAN_MOC|Plan Home]] / [[requirement/page|Requirements]] / [[requirement/page/student/dashboard|Student Portal]]

### Relations
- **Outgoing Links:** *None*
- **Incoming Links (Backlinks):** [[PLAN_CONFLICT_AUDIT|Plan Conflict Audit - CORTEX Requirements]], [[requirement/architecture|Architecture — Kiến trúc kỹ thuật CORTEX]], [[requirement/page|1. Public Website — phần người ngoài nhìn thấy]], [[requirement/page/admin/admin|Admin Dashboard — Requirement]], [[requirement/page/admin/admin-referrals|/admin/referrals — Quản lý referral]], [[requirement/page/admin/admin-revenue|/admin/revenue — Dashboard doanh thu]], [[requirement/page/student/checkout|/checkout/:courseSlug — Thanh toán khóa học]], [[requirement/page/student/my-orders|/my-orders và /my-orders/:id — Đơn hàng của tôi]], [[requirement/page_function_matrix|Page Function Matrix — CORTEX]], [[requirement/unified_database_schema|💎 Unified Database Schema - CORTEX Project]]
