---
categories:
  - "[[Projects]]"
  - "[[Blueprint]]"
  - "[[Blueprint Web]]"
  - "[[Requirements]]"
  - "[[Public Website]]"
type: ["[[Page Spec]]"]
org: ["[[Blueprint]]"]
start: 2026-06-02
year: 2026
url: https://github.com/TanHongPhong/blueprint
status: "[[MVP]]"
---

# `/verify-certificate` — Trang xác thực chứng chỉ

**Status:** MVP
**Owner area:** Public
**Source of truth:** `plan/web/page_function_matrix.md`, `plan/web/unified_database_schema.md`
**Build decision:** Build

## 1. Mục tiêu trang

| Mục tiêu       | Mô tả                                       |
| -------------- | ------------------------------------------- |
| Xác thực nhanh | Người dùng nhập Certificate ID để kiểm tra  |
| Tránh làm giả  | Hiển thị chứng chỉ có hợp lệ hay không      |
| Không rối UI   | Không cần nhiều section, không cần cuộn dài |

---

# 2. Bố cục trang đề xuất

```text
[Header]

Verify Certificate

Nhập Certificate ID để kiểm tra chứng chỉ được cấp bởi Blueprint.

[Input Certificate ID]
[Button: Verify]

[Kết quả xác thực]

[Footer mini]
```

---

# 3. Định dạng Certificate ID

Certificate ID tuân theo định dạng:

**Format**: `CERT-{YYYYRRRR}-{NNNNNN}`

- `{YYYYRRRR}`: 8 chữ số gồm năm cấp `YYYY` + 4 chữ số ngẫu nhiên `RRRR`
- `{NNNNNN}`: 6 chữ số tự động tăng (000001-999999)
- **Ví dụ hợp lệ**: `CERT-20260234-000123`

**Xác thực input**:

- Sử dụng regex: `^CERT-\d{8}-\d{6}$`
- Phải bắt đầu bằng `CERT-`
- Theo sau bởi 8 chữ số (YYYY + RRRR)
- Theo sau bởi dấy `-` và 6 chữ số (NNNNNN)
- Không chấp nhận chữ cái, ký tự đặc biệt, hoặc khoảng trắng.

---

# 4. Thành phần chính

| Thành phần | Yêu cầu                                        |
| ---------- | ---------------------------------------------- |
| Title      | `Verify Certificate` hoặc `Xác thực chứng chỉ` |
| Mô tả ngắn | Giải thích nhập Certificate ID để kiểm tra     |
| Input      | Ô nhập Certificate ID                          |
| Button     | Nút `Verify`                                   |
| Result box | Hiển thị kết quả sau khi kiểm tra              |
| Link phụ   | `Tìm hiểu về chứng chỉ` dẫn tới `/certificate` |

---

# 4. Trạng thái kết quả

## A. Khi chứng chỉ hợp lệ

Hiển thị box trạng thái dùng [[web/page/website/design|Blueprint Mono Blue / Dark Mono Blue]]: nền `--surface`, border `--border`, badge `--accent`, text trạng thái `--primary`.

```text
Certificate is valid

Student: Nguyễn Văn A
Course: AI Agent & Vibe Coding Bootcamp
Issued date: 21/05/2026
Certificate ID: CERT-20260234-000001
Status: Valid
```

---

## B. Khi không tìm thấy

```text
Certificate not found

We could not find a [[web/page/website/certificate|certificate]] with this ID.
Please check the Certificate ID and try again.
```

---

## C. Khi chứng chỉ bị thu hồi

```text
Certificate revoked

This [[web/page/website/certificate|certificate]] was issued before but is no longer valid.
Please [[web/page/website/contact|contact]] Blueprint for more information.
```

---

# 5. Yêu cầu chức năng cụ thể

| Nhóm           | Yêu cầu                                                     |
| -------------- | ----------------------------------------------------------- |
| Input          | Cho nhập Certificate ID                                     |
| Validate       | Không cho verify nếu input trống                            |
| Search         | Kiểm tra ID trong bảng `certificates`                       |
| Valid result   | Hiển thị thông tin chứng chỉ nếu hợp lệ                     |
| Invalid result | Báo không tìm thấy nếu sai ID                               |
| Revoked result | Báo đã thu hồi nếu status là revoked                        |
| Privacy        | Không hiển thị email, số điện thoại học viên                |
| QR support     | Link QR trên [[web/page/website/certificate|certificate]] dẫn trực tiếp tới trang này kèm ID |

---

# 6. Data cần hiển thị

| Field              | Hiển thị |
| ------------------ | -------- |
| `certificate_code` | Có       |
| `student_name`     | Có       |
| `course_name`      | Có       |
| `issued_at`        | Có       |
| `status`           | Có       |
| `email`            | Không    |
| `phone`            | Không    |

---

# 7. URL hỗ trợ

Cần hỗ trợ 2 cách:

```text
/verify-certificate
```

Người dùng tự nhập ID.

```text
/verify-certificate?id=CERT-20260234-000001
```

Quét QR tự động mở và kiểm tra ID.

---

# 8. Acceptance Criteria

| Tiêu chí | Đạt / Không |
| -------- | ----------- |
| Verify [[web/page/website/certificate|certificate]] valid hiển thị đúng thông tin public | |
| Certificate revoked hiển thị trạng thái revoked | |
| Certificate không tồn tại hiển thị not found | |
| Không hiển thị email/phone học viên | |

---

## 🗺️ Obsidian Meta

### Tags
- #blueprint/page/website
- #blueprint/plan
- #blueprint/requirement

### Navigation
- **Breadcrumbs:** [[BLUEPRINT_PLAN_MOC|Plan Home]] / [[web/page|Requirements]] / [[web/page/website/home|Public Website]]

### Relations
- **Outgoing Links:** [[web/page/website/design|Website Design — Blueprint Mono Blue / Dark Mono Blue]], [[web/page/website/certificate|/certificate — Trang chứng chỉ]], [[web/page/website/contact|/contact — Trang liên hệ]]
- **Incoming Links (Backlinks):** [[web/architecture|Architecture — Kiến trúc kỹ thuật Blueprint]]
