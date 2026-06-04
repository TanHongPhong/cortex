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

# `/my-certificates` — Chứng chỉ của tôi

**Status:** MVP
**Owner area:** Student
**Source of truth:** `plan/web/page_function_matrix.md`, `plan/web/unified_database_schema.md`
**Build decision:** Build

## 1. Mục tiêu

Học viên vào trang này để:

```text
1. Xem các chứng chỉ đã được cấp
2. Tải file PDF [[web/page/website/certificate|certificate]]
3. Copy Certificate ID
4. Mở trang verify [[web/page/website/certificate|certificate]]
5. Biết mình chưa có chứng chỉ vì lý do gì
```

---

# 2. Layout đề xuất

```text
My Certificates

[Summary Cards]
- Total certificates
- Valid certificates
- Eligible/pending issue count nếu cần hiển thị computed state

[Certificate List]
[Certificate Card]
[Certificate Card]

[Empty State nếu chưa có chứng chỉ]
```

---

# 3. Các vùng chính trên trang

## A. Page Header

| Thành phần | Yêu cầu                                                      |
| ---------- | ------------------------------------------------------------ |
| Title      | `Chứng chỉ của tôi`                                          |
| Subtitle   | “Xem, tải và xác thực các chứng chỉ bạn đã nhận tại CORTEX.” |
| CTA phụ    | `Xem khóa học của tôi` dẫn về `/my-courses`                  |

---

## B. Summary Cards

| Card                 | Nội dung                           |
| -------------------- | ---------------------------------- |
| Total certificates   | Tổng số chứng chỉ đã được cấp      |
| Valid certificates   | Số chứng chỉ còn hiệu lực          |
| Revoked certificates | Số chứng chỉ đã bị thu hồi, nếu có |
| Eligible/pending issue | Số khóa đủ điều kiện nhưng chưa được cấp, computed từ learning progress nếu cần |

**MVP có thể chỉ cần:**

```text
Total certificates
Valid certificates
```

---

## C. Certificate List

Hiển thị danh sách chứng chỉ học viên đã được cấp.

Mỗi chứng chỉ hiển thị dạng card.

| Thành phần     | Mô tả                    |
| -------------- | ------------------------ |
| Tên khóa       | Khóa đã hoàn thành       |
| Certificate ID | Mã chứng chỉ             |
| Ngày cấp       | Issued date              |
| Status         | Valid / Revoked          |
| Actions        | Tải PDF, verify, copy ID |

---

# 4. Certificate Card

## Card trạng thái valid

```text
AI Agent & Vibe Coding Bootcamp

Certificate of Completion
Certificate ID: CERT-20260234-000001
Issued date: 21/05/2026
Status: Valid

[Download PDF] [Verify] [Copy ID]
```

## Card trạng thái revoked

```text
AI Agent & Vibe Coding Bootcamp

Certificate ID: CERT-20260234-000001
Issued date: 21/05/2026
Status: Revoked

This [[web/page/website/certificate|certificate]] is no longer valid.

[Verify] [Contact Support]
```

---

# 5. Actions trên [[web/page/website/certificate|certificate]] card

| Action            | Chức năng                                    |
| ----------------- | -------------------------------------------- |
| `Download PDF`    | Tải file chứng chỉ                           |
| `Verify`          | Mở `/verify-certificate?id=certificate_id`   |
| `Copy ID`         | Copy mã chứng chỉ                            |
| `Contact Support` | Dẫn đến `/contact?type=support` nếu [[web/page/website/certificate|certificate]] có vấn đề |

---

# 6. Empty State

Nếu học viên chưa có chứng chỉ nào:

```text
Bạn chưa có chứng chỉ nào.

Hoàn thành khóa học và final project để nhận Certificate of Completion.
[Xem khóa học của tôi]
```

Nếu học viên đã hoàn thành nhưng đang chờ cấp:

```text
Bạn đã đủ điều kiện nhận chứng chỉ.

Certificate của bạn đang chờ CORTEX xử lý.
[Xem trạng thái khóa học]
```

---

# 7. Rule cấp chứng chỉ

Certificate chỉ hiển thị khi đã được cấp trong bảng `certificates`.

Điều kiện để đủ điều kiện nhận [[web/page/website/certificate|certificate]]:

```text
1. Học viên đã enrolled khóa học
2. Hoàn thành các lesson bắt buộc
3. Assignment bắt buộc, nếu có, đã approved
4. Final project đã approved
5. Admin hoặc hệ thống cấp [[web/page/website/certificate|certificate]]
```

---

# 8. Yêu cầu chức năng cụ thể

| Nhóm             | Yêu cầu                                      |
| ---------------- | -------------------------------------------- |
| Auth             | Chỉ user đăng nhập mới xem được              |
| Data access      | Chỉ xem [[web/page/website/certificate|certificate]] của chính user đó        |
| Certificate list | Lấy danh sách từ bảng `certificates`         |
| Status           | Hiển thị Valid / Revoked; pending issue là computed state, không phải `certificates.status` |
| Download         | Cho tải PDF nếu có `certificate_url`         |
| Verify           | Dẫn sang `/verify-certificate?id=...`        |
| Copy ID          | Copy Certificate ID vào clipboard            |
| Empty state      | Hiển thị khi chưa có [[web/page/website/certificate|certificate]]             |
| Privacy          | Không hiển thị email/số điện thoại trên card |
| Responsive       | Mobile card xếp 1 cột                        |

---

# 9. Data cần dùng

| Bảng           | Dữ liệu                                                |
| -------------- | ------------------------------------------------------ |
| `users`        | ID học viên hiện tại                                   |
| `certificates` | Certificate ID, status, issued date, PDF URL           |
| `courses`      | Tên khóa liên quan                                     |
| `enrollments`  | Kiểm tra khóa học của học viên                         |
| [[web/page/instructor/submissions|`submissions`]]  | Kiểm tra final project nếu cần hiển thị pending reason |

---

# 10. Cấu trúc dữ liệu `certificates`

| Field              | Mục đích                |
| ------------------ | ----------------------- |
| `id`               | ID [[web/page/website/certificate|certificate]]          |
| `certificate_code` | Mã chứng chỉ duy nhất   |
| `user_id`          | Học viên nhận chứng chỉ |
| `course_id`        | Khóa học liên quan      |
| `issued_at`        | Ngày cấp                |
| `certificate_url`  | Link file PDF           |
| `status`           | valid / revoked         |
| `revoked_reason`   | Lý do thu hồi, nếu có   |
| `created_at`       | Ngày tạo record         |

---

# 11. Định dạng Certificate ID

Để đảm bảo tính duy nhất, an toàn và chuyên nghiệp, mã chứng chỉ (`certificate_code`) tuân theo định dạng sau:

**Format**: `CERT-{YYYY}{RRRR}-{NNNNNN}`

- `{YYYY}`: Năm cấp chứng chỉ (ví dụ: 2026)
- `{RRRR}`: 4 chữ số ngẫu nhiên (0001-9999) để tránh việc đoán ID dễ dàng
- `{NNNNNN}`: Số thứ tự tăng dần (auto-increment sequence) từ 000001-999999
- **Ví dụ**: `CERT-20260234-000123`

**Thuật toán tạo**:

1. Lấy năm hiện tại.
2. Generate random 4 digits.
3. Lấy giá trị tiếp theo từ sequence `certificate_seq` trong database.
4. Format thành chuỗi trên và lưu vào `certificate_code`.

---

# 12. Logic chính

## Lấy danh sách [[web/page/website/certificate|certificate]]

```text
Lấy tất cả certificates có user_id = current_user.id
→ join với courses để lấy tên khóa
→ sắp xếp issued_at mới nhất lên trước
```

## Verify link

```text
/verify-certificate?id=CERT-20260234-000001
```

## Download PDF

```text
Nếu certificate_url tồn tại:
→ cho tải PDF

Nếu chưa có certificate_url:
→ hiển thị “Certificate file is being prepared”
```

---

# 12. Component cần có

| Component                 | Mục đích                  |
| ------------------------- | ------------------------- |
| `StudentLayout`           | Sidebar + topbar          |
| `CertificateSummaryCards` | Tổng số [[web/page/website/certificate|certificate]]       |
| `CertificateCard`         | Hiển thị từng [[web/page/website/certificate|certificate]] |
| `StatusBadge`             | Valid / Revoked / Pending |
| `CopyButton`              | Copy Certificate ID       |
| `EmptyState`              | Khi chưa có chứng chỉ     |
| `LoadingState`            | Khi đang tải dữ liệu      |

---

# 13. Acceptance Criteria

Trang `/my-certificates` đạt nếu:

| Tiêu chí                                           | Đạt / Không |
| -------------------------------------------------- | ----------- |
| User chưa [[web/page/student/login|login]] bị chuyển về [[web/page/student/login|login]]                 |             |
| Chỉ hiển thị [[web/page/website/certificate|certificate]] của user hiện tại         |             |
| Certificate card có tên khóa, ID, ngày cấp, status |             |
| Nút Download PDF hoạt động nếu có file             |             |
| Nút Verify mở đúng trang xác thực                  |             |
| Nút Copy ID copy đúng mã chứng chỉ                 |             |
| Revoked [[web/page/website/certificate|certificate]] hiển thị rõ trạng thái         |             |
| Có empty state nếu chưa có chứng chỉ               |             |
| Responsive tốt trên mobile                         |             |

---

# 14. Chốt scope `/my-certificates`

```text
/my-certificates cần có:

1. Student layout chung
2. Page header
3. Summary cards
4. Certificate list
5. Certificate card
6. Download PDF
7. Verify link
8. Copy Certificate ID
9. Empty state
10. Loading/error state
```

Nói ngắn gọn: **trang này chỉ để quản lý chứng chỉ đã được cấp. Việc xét đủ điều kiện nằm ở analysis/lesson/final project, còn `/my-certificates` chỉ hiển thị, tải và xác thực [[web/page/website/certificate|certificate]].**

---

## 🗺️ Obsidian Meta

### Tags
- #cortex/page/student
- #cortex/plan
- #cortex/requirement

### Navigation
- **Breadcrumbs:** [[CORTEX_PLAN_MOC|Plan Home]] / [[web/page|Requirements]] / [[web/page/student/dashboard|Student Portal]]

### Relations
- **Outgoing Links:** [[web/page/instructor/submissions|/instructor/submissions — Duyệt bài nộp]], [[web/page/student/login|/login — Đăng nhập]], [[web/page/website/certificate|/certificate — Trang chứng chỉ]]
- **Incoming Links (Backlinks):** [[web/architecture|Architecture — Kiến trúc kỹ thuật CORTEX]]
