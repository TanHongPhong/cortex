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
