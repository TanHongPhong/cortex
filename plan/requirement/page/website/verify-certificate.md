# `/verify-certificate` — Trang xác thực chứng chỉ

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

Nhập Certificate ID để kiểm tra chứng chỉ được cấp bởi May Academy.

[Input Certificate ID]
[Button: Verify]

[Kết quả xác thực]

[Footer mini]
```

---

# 3. Thành phần chính

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

Hiển thị box màu tích cực:

```text
Certificate is valid

Student: Nguyễn Văn A
Course: AI Agent & Vibe Coding Bootcamp
Issued date: 21/05/2026
Certificate ID: MAY-AI-2026-0001
Status: Valid
```

---

## B. Khi không tìm thấy

```text
Certificate not found

We could not find a certificate with this ID.
Please check the Certificate ID and try again.
```

---

## C. Khi chứng chỉ bị thu hồi

```text
Certificate revoked

This certificate was issued before but is no longer valid.
Please contact May Academy for more information.
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
| QR support     | Link QR trên certificate dẫn trực tiếp tới trang này kèm ID |

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

# 7. URL nên hỗ trợ

Nên hỗ trợ 2 cách:

```text
/verify-certificate
```

Người dùng tự nhập ID.

```text
/verify-certificate?id=MAY-AI-2026-0001
```

Quét QR tự động mở và kiểm tra ID.

---
