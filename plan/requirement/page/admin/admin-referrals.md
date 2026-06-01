# `/admin/referrals` — Quản lý referral

**Status:** P2
**Owner area:** Admin
**Source of truth:** `plan/requirement/page_function_matrix.md`, `plan/requirement/unified_database_schema.md`
**Build decision:** Future

## 1. Mục tiêu

Admin theo dõi referral codes, conversions và reward.

---

## 2. Layout

```text
/admin/referrals

[KPI Cards]
[Referral Codes Table]
[Conversions Table]
[Reward Action Drawer]
```

---

## 3. KPI

| KPI | Ý nghĩa |
| --- | ------- |
| Active Referral Codes | Mã đang active |
| Paid Conversions | Conversion có order paid |
| Pending Rewards | Reward chưa phát |
| Issued Rewards | Reward đã phát |
| Cancelled Rewards | Reward bị hủy vì refund/abuse |

---

## 4. Rule

| Trường hợp | Rule |
| ---------- | ---- |
| Self-referral | Không hợp lệ |
| Một referred user nhiều đơn | Chỉ tính conversion đầu tiên |
| Order paid | Reward approved |
| Order refunded | Reward cancelled; refund amount được credit vào user balance theo order flow |
| Code paused/archived | Không nhận conversion mới |

---

## 5. Data cần dùng

| Bảng | Dữ liệu |
| ---- | ------ |
| `referral_codes` | owner, code, reward config, status |
| `referral_conversions` | referrer, referred, order, reward status |
| `orders` | order paid/refunded |
| `users` | referrer/referred profile |

---

## 6. Acceptance Criteria

| Tiêu chí | Đạt / Không |
| -------- | ----------- |
| Admin xem referral codes được | |
| Admin xem conversions được | |
| Reward status đúng theo order | |
| Pause/archive code được | |
| Không tính self-referral | |
