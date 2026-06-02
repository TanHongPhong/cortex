---
categories:
  - "[[Projects]]"
  - "[[cortex.ai]]"
  - "[[cortex.ai Web]]"
  - "[[Requirements]]"
  - "[[Student Portal]]"
type: ["[[Page Spec]]"]
org: ["[[cortex.ai]]"]
start: 2026-06-02
year: 2026
url: https://github.com/TanHongPhong/cortex
status: "[[MVP]]"
---

# `/profile` — Hồ sơ cá nhân

**Status:** MVP
**Owner area:** Student
**Source of truth:** `plan/web/page_function_matrix.md`, `plan/web/unified_database_schema.md`
**Build decision:** Build

## 1. Mục tiêu

Học viên vào trang này để:

```text
1. Xem và cập nhật thông tin cá nhân
2. Cập nhật nhu cầu học tập
3. Quản lý thông tin tài khoản
4. Đổi mật khẩu
5. Đảm bảo thông tin dùng cho [[web/page/website/certificate|certificate]] là chính xác
```

---

# 2. Layout đề xuất

```text
Profile

[Profile Card]
- Avatar
- Full name
- Email
- Role: Student

[Personal Information]
- Họ tên
- Phone/Zalo
- Avatar

[Learning Profile]
- Nhu cầu học
- Mức độ hiện tại
- Mục tiêu học

[Account Information]
- Email
- Ngày tạo tài khoản
- Trạng thái tài khoản

[Account Security]
- Đổi mật khẩu
```

---

# 3. Các vùng chính trên trang

## A. Profile Card

**Mục đích:** hiển thị nhanh danh tính học viên.

| Thành phần | Yêu cầu                  |
| ---------- | ------------------------ |
| Avatar     | Ảnh đại diện học viên    |
| Full name  | Họ tên học viên          |
| Email      | Email tài khoản          |
| Role       | Hiển thị `Student`       |
| CTA        | `Cập nhật hồ sơ` nếu cần |

Ví dụ:

```text
Phạm Đức Trí
tri@email.com
Student
```

---

## B. Personal Information

**Mục đích:** quản lý thông tin cá nhân cơ bản.

| Field      | Cho sửa không           | Ghi chú                       |
| ---------- | ----------------------- | ----------------------------- |
| Họ và tên  | Có                      | Dùng cho hồ sơ và [[web/page/website/certificate|certificate]] |
| Phone/Zalo | Có                      | Dùng để tư vấn/hỗ trợ         |
| Avatar     | Có                      | Upload hoặc nhập link ảnh     |
| Email      | Không nên cho sửa ở MVP | Chỉ hiển thị                  |

**Form cần có:**

```text
Họ và tên
Số điện thoại/Zalo
Avatar

[Lưu thay đổi]
```

---

## C. Learning Profile

**Mục đích:** giúp CORTEX hiểu nhu cầu học của học viên.

| Field             | Loại input                 |
| ----------------- | -------------------------- |
| Learning interest | Dropdown                   |
| Current level     | Dropdown                   |
| Learning goal     | Dropdown hoặc multi-select |

### Learning interest

```text
- Workshop miễn phí
- Starter mini course
- AI Agent & Vibe Coding Bootcamp
- Advanced AI Agent Automation
- Mentoring 1:1 / Portfolio coaching
- B2B training
- Chưa biết, cần tư vấn
```

### Current level

```text
- Mới bắt đầu, chưa biết nhiều về AI
- Đã dùng ChatGPT/AI tools cơ bản
- Đã từng dùng AI để học/làm việc
- Biết một ít coding
- Đã từng làm automation/workflow
```

### Learning goal

```text
- Học AI để tăng năng suất cá nhân
- Tạo website/app bằng AI
- Xây AI Agent/chatbot
- Tự động hóa công việc
- Làm portfolio/CV
- Ứng dụng AI cho team/doanh nghiệp
```

---

## D. Account Information

**Mục đích:** hiển thị thông tin tài khoản, không cho chỉnh nhiều.

| Field              | Cho sửa không           |
| ------------------ | ----------------------- |
| Email              | Không nên cho sửa ở MVP |
| Role               | Không cho sửa           |
| Ngày tạo tài khoản | Không cho sửa           |
| Account status     | Không cho sửa           |

Ví dụ:

```text
Email: tri@email.com
Role: Student
Created at: 21/05/2026
Status: Active
```

---

## E. Account Security

**Mục đích:** cho học viên đổi mật khẩu.

| Field                | Yêu cầu        |
| -------------------- | -------------- |
| Current password     | Bắt buộc       |
| New password         | Bắt buộc       |
| Confirm new password | Phải trùng     |
| CTA                  | `Đổi mật khẩu` |

Rule:

```text
- Mật khẩu mới tối thiểu 6–8 ký tự
- Confirm password phải trùng
- Sau khi đổi thành công, hiển thị thông báo
```

---

# 4. Rule chỉnh sửa thông tin

| Field             | Rule                |
| ----------------- | ------------------- |
| Họ tên            | Cho sửa             |
| Avatar            | Cho sửa             |
| Phone/Zalo        | Cho sửa             |
| Learning interest | Cho sửa             |
| Current level     | Cho sửa             |
| Learning goal     | Cho sửa             |
| Email             | Không cho sửa ở MVP |
| Role              | Không cho sửa       |
| Account status    | Chỉ [[web/page/admin/admin|admin]] quản lý   |

---

# 5. Yêu cầu chức năng cụ thể

| Nhóm             | Yêu cầu                                       |
| ---------------- | --------------------------------------------- |
| Auth             | Chỉ user đã đăng nhập mới vào được            |
| Data access      | User chỉ xem/sửa hồ sơ của chính mình         |
| Update profile   | Lưu thay đổi vào `users`                      |
| Avatar           | Cho upload hoặc nhập avatar URL               |
| Learning profile | Lưu nhu cầu học, level, mục tiêu học          |
| Account balance  | Hiển thị số dư nội bộ chỉ đọc và CTA liên hệ [[web/page/admin/admin|admin]] để rút tiền |
| Password         | Cho đổi mật khẩu                              |
| Validation       | Kiểm tra field trống, số điện thoại, password |
| Success state    | Hiển thị thông báo lưu thành công             |
| Error state      | Hiển thị lỗi nếu cập nhật thất bại            |
| Responsive       | Mobile form xếp 1 cột                         |

---

# 6. Data cần dùng

| Bảng                      | Dữ liệu                                         |
| ------------------------- | ----------------------------------------------- |
| `users`                   | Họ tên, email, phone, role, avatar, learning_interest, current_level, learning_goal, account_balance |
| `account_balance_transactions` | Ledger refund/reset số dư nội bộ gần nhất |
| `password_reset_tokens`   | Forgot/change password flow nếu cần token xác thực |

---

# 7. Cấu trúc dữ liệu đề xuất

Nếu dùng một bảng `users`:

| Field               | Mục đích           |
| ------------------- | ------------------ |
| `id`                | ID user            |
| `full_name`         | Họ tên             |
| `email`             | Email              |
| `phone`             | Số điện thoại/Zalo |
| `avatar_url`        | Ảnh đại diện       |
| `role`              | student/instructor/admin |
| `learning_interest` | Nhu cầu học        |
| `current_level`     | Mức độ hiện tại    |
| `learning_goal`     | Mục tiêu học       |
| `account_balance`   | Số dư nội bộ từ refund, chỉ đọc |
| `status`            | active/blocked     |
| `created_at`        | Ngày tạo           |

Rule: MVP/P1 dùng một bảng `users` cho profile và learning profile; không tạo bảng hồ sơ riêng.

---

# 8. Component cần có

| Component             | Mục đích                    |
| --------------------- | --------------------------- |
| `StudentLayout`       | Sidebar + topbar            |
| `ProfileCard`         | Hiển thị avatar, tên, email |
| `PersonalInfoForm`    | Form thông tin cá nhân      |
| `LearningProfileForm` | Form nhu cầu học            |
| `AccountInfoCard`     | Thông tin tài khoản         |
| `BalanceCard`         | Số dư nội bộ, lịch sử gần nhất, CTA `/contact?type=support` |
| `ChangePasswordForm`  | Đổi mật khẩu                |
| `SuccessMessage`      | Báo lưu thành công          |
| `ErrorMessage`        | Báo lỗi                     |

---

# 9. Acceptance Criteria

Trang `/profile` đạt nếu:

| Tiêu chí                                                        | Đạt / Không |
| --------------------------------------------------------------- | ----------- |
| User chưa [[web/page/student/login|login]] bị chuyển về [[web/page/student/login|login]]                              |             |
| Hiển thị đúng thông tin học viên                                |             |
| Học viên sửa được họ tên, phone/Zalo, avatar                    |             |
| Học viên sửa được learning interest/current level/learning goal |             |
| Email chỉ hiển thị, không cho sửa ở MVP                         |             |
| Role không cho sửa                                              |             |
| Số dư nội bộ chỉ đọc, không cho tự rút/self-service withdrawal  |             |
| Đổi mật khẩu hoạt động đúng                                     |             |
| Có success/error state                                          |             |
| Responsive tốt trên mobile                                      |             |

---

# 10. Chốt scope `/profile`

```text
/profile cần có:

1. Student layout chung
2. Profile card
3. Personal information form
4. Learning profile form
5. Account information
6. Account [[web/security|security]] / đổi mật khẩu
7. Success/error state
```

Nói ngắn gọn: **`/profile` là nơi học viên quản lý thông tin cá nhân và nhu cầu học. Không cần làm phức tạp, chỉ cần đủ thông tin cho tài khoản, tư vấn, hỗ trợ và [[web/page/website/certificate|certificate]].**

---

## 🗺️ Obsidian Meta

### Tags
- #cortex/page/student
- #cortex/plan
- #cortex/requirement

### Navigation
- **Breadcrumbs:** [[CORTEX_PLAN_MOC|Plan Home]] / [[web/page|Requirements]] / [[web/page/student/dashboard|Student Portal]]

### Relations
- **Outgoing Links:** [[web/page/admin/admin|Admin Dashboard — Requirement]], [[web/page/student/login|/login — Đăng nhập]], [[web/page/website/certificate|/certificate — Trang chứng chỉ]], [[web/security|Security — Bảo mật hệ thống CORTEX]]
- **Incoming Links (Backlinks):** [[web/architecture|Architecture — Kiến trúc kỹ thuật CORTEX]], [[web/page|1. Public Website — phần người ngoài nhìn thấy]], [[web/page/admin/admin-referrals|/admin/referrals — Quản lý referral]], [[web/page/admin/admin-students|/admin/students — Quản lý học viên]], [[web/page/instructor/overview|/instructor — Instructor Overview]], [[web/page/student/register|/register — Đăng ký tài khoản]], [[web/page_function_matrix|Page Function Matrix — CORTEX]], [[web/security|Security — Bảo mật hệ thống CORTEX]]
