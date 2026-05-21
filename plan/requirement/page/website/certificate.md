# `/certificate` — Trang chứng chỉ

## 1. Mục tiêu trang

| Mục tiêu           | Mô tả                                                        |
| ------------------ | ------------------------------------------------------------ |
| Tăng độ tin cậy    | Cho người học thấy May Academy có hệ thống chứng chỉ rõ ràng |
| Giải thích giá trị | Chứng chỉ dùng để xác nhận hoàn thành khóa học/project       |
| Làm rõ điều kiện   | Học viên biết cần làm gì để được cấp chứng chỉ               |
| Hỗ trợ xác thực    | Dẫn sang trang verify bằng Certificate ID/QR                 |

---

# 2. Cấu trúc trang đề xuất

```text
/certificate

1. Page Header
2. Certificate Preview
3. Certificate Information
4. Requirements to Receive Certificate
5. Verification System
6. How to Use Certificate
7. Certificate Policy Note
8. Related CTA
```

---

# 3. Section 1 — Page Header

**Mục đích:** giới thiệu nhanh chứng chỉ của May Academy.

| Thành phần | Yêu cầu                                                       |
| ---------- | ------------------------------------------------------------- |
| Title      | “May Academy Certificate of Completion”                       |
| Subtitle   | Giải thích đây là chứng chỉ hoàn thành khóa học AI thực chiến |
| CTA chính  | `Xác thực chứng chỉ`                                          |
| CTA phụ    | `Xem khóa học có chứng chỉ`                                   |
| Visual     | Ảnh mockup certificate hoặc mascot cầm certificate            |

**Gợi ý nội dung:**

```text
Nhận chứng chỉ hoàn thành sau khi học đủ nội dung, nộp project cuối khóa và được May Academy duyệt kết quả.
```

---

# 4. Section 2 — Certificate Preview

**Mục đích:** cho người xem thấy mẫu chứng chỉ.

| Thành phần trên certificate | Yêu cầu                                |
| --------------------------- | -------------------------------------- |
| Tên học viên                | Hiển thị tên người nhận                |
| Tên khóa học                | Ví dụ: AI Agent & Vibe Coding Bootcamp |
| Ngày cấp                    | Ngày hoàn thành/cấp chứng chỉ          |
| Certificate ID              | Mã chứng chỉ duy nhất                  |
| QR Code                     | Dẫn tới trang `/verify-certificate`    |
| Chữ ký/đơn vị cấp           | May Academy / Instructor / Founder     |

**UI nên làm:**
Một mockup certificate lớn ở giữa hoặc layout 2 cột: bên trái text, bên phải ảnh certificate.

---

# 5. Section 3 — Certificate Information

**Mục đích:** giải thích chứng chỉ này xác nhận điều gì.

| Nội dung       | Mô tả                                          |
| -------------- | ---------------------------------------------- |
| Loại chứng chỉ | Certificate of Completion                      |
| Cấp bởi        | May Academy                                    |
| Áp dụng cho    | Các khóa có certificate                        |
| Xác nhận       | Học viên đã hoàn thành nội dung học và project |
| Có thể verify  | Có Certificate ID và QR code                   |

**Nên viết rõ:**

```text
Chứng chỉ xác nhận học viên đã hoàn thành khóa học tại May Academy, bao gồm bài học, bài tập/project và các yêu cầu hoàn thành khóa.
```

---

# 6. Section 4 — Requirements to Receive Certificate

**Mục đích:** làm rõ điều kiện nhận chứng chỉ.

| Điều kiện                  | Mô tả                                         |
| -------------------------- | --------------------------------------------- |
| Hoàn thành bài học         | Học viên hoàn thành đủ lesson yêu cầu         |
| Hoàn thành bài tập/project | Nộp project cuối khóa hoặc bài tập bắt buộc   |
| Được duyệt                 | Admin/mentor duyệt project đạt yêu cầu        |
| Thông tin hợp lệ           | Họ tên học viên đúng để in certificate        |
| Không vi phạm quy định     | Không gian lận, không dùng bài của người khác |

**UI:** checklist 4–5 dòng.

---

# 7. Section 5 — Verification System

**Mục đích:** giải thích cách xác thực chứng chỉ.

| Thành phần     | Yêu cầu                                |
| -------------- | -------------------------------------- |
| Certificate ID | Mỗi chứng chỉ có mã riêng, không trùng |
| QR Code        | Quét QR để mở trang verify             |
| Verify page    | Dẫn tới `/verify-certificate`          |
| Kết quả verify | Hiển thị valid/invalid/revoked         |

**Thông tin hiển thị khi verify:**

| Field               | Có hiển thị không  |
| ------------------- | ------------------ |
| Tên học viên        | Có                 |
| Tên khóa học        | Có                 |
| Ngày cấp            | Có                 |
| Certificate ID      | Có                 |
| Trạng thái          | Có                 |
| Email/số điện thoại | Không nên hiển thị |

---

# 8. Section 6 — How to Use Certificate

**Mục đích:** hướng dẫn học viên dùng certificate sau khi nhận.

| Cách dùng     | Mô tả                                                    |
| ------------- | -------------------------------------------------------- |
| CV            | Ghi vào phần Certifications hoặc Projects                |
| Portfolio     | Đưa certificate/project vào website cá nhân              |
| LinkedIn      | Chia sẻ chứng chỉ và project hoàn thành                  |
| Phỏng vấn     | Dùng project + certificate để chứng minh năng lực học AI |
| Hồ sơ học tập | Lưu lại như minh chứng hoàn thành khóa                   |

---

# 9. Section 7 — Certificate Policy Note

**Mục đích:** tránh hiểu sai giá trị pháp lý của certificate.

Nên có một đoạn ngắn:

```text
May Academy Certificate of Completion là chứng chỉ xác nhận hoàn thành khóa học và project tại May Academy. Đây không phải văn bằng chính quy hoặc chứng chỉ nghề do cơ quan nhà nước cấp.
```

Phần này nên đặt rõ nhưng không cần làm quá nặng.

---

# 10. Section 8 — Related CTA

**Mục đích:** dẫn người dùng đi tiếp.

| CTA                         | Dẫn tới               |
| --------------------------- | --------------------- |
| `Xác thực chứng chỉ`        | `/verify-certificate` |
| `Xem khóa học có chứng chỉ` | `/courses`            |
| `Đăng ký học thử`           | `/contact`            |
| `Tư vấn khóa phù hợp`       | `/contact`            |

---

# 11. Yêu cầu chức năng cụ thể

| Nhóm                | Yêu cầu                                                                      |
| ------------------- | ---------------------------------------------------------------------------- |
| Certificate preview | Hiển thị mẫu chứng chỉ đẹp, đúng brand May Academy                           |
| Verify CTA          | Nút xác thực dẫn đúng sang `/verify-certificate`                             |
| Course CTA          | Nút xem khóa học dẫn sang `/courses`                                         |
| Responsive          | Certificate preview phải hiển thị đẹp trên mobile                            |
| Policy note         | Có ghi rõ certificate là chứng chỉ hoàn thành, không phải văn bằng chính quy |
| Dynamic data        | Nếu sau này có nhiều loại certificate, lấy dữ liệu từ database               |
| SEO                 | Có title/description riêng cho trang certificate                             |

---

# 12. Data cần dùng

Ban đầu trang này có thể dùng **nội dung tĩnh**. Sau này nếu mở rộng thì có thể dùng bảng `certificate_templates`.

| Field               | Mục đích               |
| ------------------- | ---------------------- |
| `template_name`     | Tên mẫu chứng chỉ      |
| `course_type`       | Áp dụng cho khóa nào   |
| `preview_image_url` | Ảnh mẫu certificate    |
| `description`       | Mô tả loại certificate |
| `requirements`      | Điều kiện nhận         |
| `status`            | active/inactive        |

---

# 13. UI/UX nên làm

| Phần               | Gợi ý                                    |
| ------------------ | ---------------------------------------- |
| Style              | Premium, sạch, đáng tin                  |
| Màu                | Blue/cyan/purple theo brand              |
| Certificate mockup | Nên lớn, rõ, có QR và ID                 |
| Icon               | Dùng icon check, QR, shield, certificate |
| Layout             | 2 cột ở desktop, 1 cột ở mobile          |
| Tone               | Tin cậy, chuyên nghiệp, không nói quá    |

---

# 14. Acceptance Criteria

Trang `/certificate` đạt nếu:

| Tiêu chí                                         | Đạt / Không |
| ------------------------------------------------ | ----------- |
| Người xem hiểu certificate của May Academy là gì |             |
| Có ảnh/mẫu chứng chỉ rõ ràng                     |             |
| Có điều kiện nhận certificate                    |             |
| Có giải thích Certificate ID và QR verify        |             |
| Có CTA sang `/verify-certificate`                |             |
| Có CTA sang `/courses`                           |             |
| Có policy note tránh hiểu sai giá trị chứng chỉ  |             |
| Responsive tốt trên mobile                       |             |

---
