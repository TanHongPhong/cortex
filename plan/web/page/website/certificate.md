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

# `/certificate` — Trang chứng chỉ

**Status:** MVP
**Owner area:** Public
**Source of truth:** `plan/web/page_function_matrix.md`, `plan/web/unified_database_schema.md`
**Build decision:** Build

## 1. Mục tiêu trang

| Mục tiêu           | Mô tả                                                   |
| ------------------ | ------------------------------------------------------- |
| Tăng độ tin cậy    | Cho người học thấy Blueprint có hệ thống chứng chỉ rõ ràng |
| Giải thích giá trị | Chứng chỉ dùng để xác nhận hoàn thành khóa học/project  |
| Làm rõ điều kiện   | Học viên biết cần làm gì để được cấp chứng chỉ          |
| Hỗ trợ xác thực    | Dẫn sang trang verify bằng Certificate ID/QR            |

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

**Mục đích:** giới thiệu nhanh chứng chỉ của Blueprint.

| Thành phần | Yêu cầu                                                       |
| ---------- | ------------------------------------------------------------- |
| Title      | “Blueprint Certificate of Completion”                            |
| Subtitle   | Giải thích đây là chứng chỉ hoàn thành khóa học AI thực chiến |
| CTA chính  | `Xác thực chứng chỉ`                                          |
| CTA phụ    | `Xem khóa học có chứng chỉ`                                   |
| Visual     | Ảnh mockup certificate hoặc mascot cầm certificate            |

**Gợi ý nội dung:**

```text
Nhận chứng chỉ hoàn thành sau khi học đủ nội dung, nộp project cuối khóa và được Blueprint duyệt kết quả.
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
| Chữ ký/đơn vị cấp           | Blueprint / Instructor / Founder          |

**UI nên làm:**
Một mockup certificate lớn ở giữa hoặc layout 2 cột: bên trái text, bên phải ảnh certificate.

---

# 5. Section 3 — Certificate Information

**Mục đích:** giải thích chứng chỉ này xác nhận điều gì.

| Nội dung       | Mô tả                                          |
| -------------- | ---------------------------------------------- |
| Loại chứng chỉ | Certificate of Completion                      |
| Cấp bởi        | Blueprint                                         |
| Áp dụng cho    | Các khóa có certificate                        |
| Xác nhận       | Học viên đã hoàn thành nội dung học và project |
| Có thể verify  | Có Certificate ID và QR code                   |

**Nên viết rõ:**

```text
Chứng chỉ xác nhận học viên đã hoàn thành khóa học tại Blueprint, bao gồm bài học, bài tập/project và các yêu cầu hoàn thành khóa.
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
| Verify [[web/page|page]]    | Dẫn tới `/verify-certificate`          |
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
Blueprint Certificate of Completion là chứng chỉ xác nhận hoàn thành khóa học và project tại Blueprint. Đây không phải văn bằng chính quy hoặc chứng chỉ nghề do cơ quan nhà nước cấp.
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
| Certificate preview | Hiển thị mẫu chứng chỉ đẹp, đúng brand Blueprint                                |
| Verify CTA          | Nút xác thực dẫn đúng sang `/verify-certificate`                             |
| Course CTA          | Nút xem khóa học dẫn sang `/courses`                                         |
| Responsive          | Certificate preview phải hiển thị đẹp trên mobile                            |
| Policy note         | Có ghi rõ certificate là chứng chỉ hoàn thành, không phải văn bằng chính quy |
| Dynamic data        | Lấy preview từ `certificate_templates` nếu có template active                |
| SEO                 | Có title/description riêng cho trang certificate                             |

---

# 12. Data cần dùng

Trang này ưu tiên lấy dữ liệu từ `certificate_templates`. Nếu chưa có template active, có thể fallback sang nội dung tĩnh.

| Field               | Mục đích                         |
| ------------------- | -------------------------------- |
| `name`              | Tên mẫu chứng chỉ                |
| `course_id`         | Template riêng cho khóa nếu có   |
| `preview_image_url` | Ảnh mẫu certificate              |
| `layout_json`       | Nội dung/layout/placeholder      |
| `version`           | Version template                 |
| `status`            | draft / active / archived        |

---

# 13. UI/UX nên làm

| Phần               | Gợi ý                                    |
| ------------------ | ---------------------------------------- |
| Style              | Premium, sạch, đáng tin                  |
| Màu                | Theo [[web/page/website/design|Blueprint Mono / Dark Mono]]: trắng/đen/xám than/xanh dương |
| Certificate mockup | Nên lớn, rõ, có QR và ID                 |
| Icon               | Dùng icon check, QR, shield, certificate |
| Layout             | 2 cột ở desktop, 1 cột ở mobile          |
| Tone               | Tin cậy, chuyên nghiệp, không nói quá    |

---

# 14. Acceptance Criteria

Trang `/certificate` đạt nếu:

| Tiêu chí                                        | Đạt / Không |
| ----------------------------------------------- | ----------- |
| Người xem hiểu certificate của Blueprint là gì     |             |
| Có ảnh/mẫu chứng chỉ rõ ràng                    |             |
| Có điều kiện nhận certificate                   |             |
| Có giải thích Certificate ID và QR verify       |             |
| Có CTA sang `/verify-certificate`               |             |
| Có CTA sang `/courses`                          |             |
| Có policy note tránh hiểu sai giá trị chứng chỉ |             |
| Responsive tốt trên mobile                      |             |

---

---

## 🗺️ Obsidian Meta

### Tags
- #blueprint/page/website
- #blueprint/plan
- #blueprint/requirement

### Navigation
- **Breadcrumbs:** [[BLUEPRINT_PLAN_MOC|Plan Home]] / [[web/page|Requirements]] / [[web/page/website/home|Public Website]]

### Relations
- **Outgoing Links:** [[web/page/website/design|Website Design — Blueprint Mono / Dark Mono]], [[web/page|1. Public Website — phần người ngoài nhìn thấy]]
- **Incoming Links (Backlinks):** [[analysis/course_eng|A. Roadmap từng khóa AI Agent quốc tế]], [[web/architecture|Architecture — Kiến trúc kỹ thuật Blueprint]], [[web/hard_notes|Hard Notes]], [[web/infrastructure|Infrastructure — Hạ tầng triển khai Blueprint]], [[web/page|1. Public Website — phần người ngoài nhìn thấy]], [[web/page/admin/admin|Admin Dashboard — Requirement]], [[web/page/admin/admin-audit-logs|/admin/audit-logs — Lịch sử thao tác]], [[web/page/admin/admin-certificate-templates|/admin/certificate-templates — Quản lý template chứng chỉ]], [[web/page/admin/admin-certificates|/admin/certificates — Quản lý chứng chỉ]], [[web/page/admin/admin-courses|/admin/courses — Quản lý khóa học]], [[web/page/admin/admin-lessons|/admin/lessons — Quản lý module/bài học]], [[web/page/admin/admin-overview|/admin — Admin Overview]], [[web/page/admin/admin-students|/admin/students — Quản lý học viên]], [[web/page/admin/admin-submissions|/admin/submissions — Duyệt bài nộp]], [[web/page/instructor/submissions|/instructor/submissions — Duyệt bài nộp]], [[web/page/student/dashboard|/dashboard — Trang tổng quan học viên]], [[web/page/student/learn-course|/learn/[course] — Trang học của một khóa]], [[web/page/student/learn-lesson|/learn/[course]/[lesson] — Trang bài học]], [[web/page/student/my-certificates|/my-certificates — Chứng chỉ của tôi]], [[web/page/student/my-courses|/my-courses — Khóa học của tôi]], [[web/page/student/notifications|/notifications — Thông báo của tôi]], [[web/page/student/profile|/profile — Hồ sơ cá nhân]], [[web/page/student/submit-project|/submit-project — Legacy / Không ưu tiên MVP]], [[web/page/website/course-detail|/courses/[slug] — Trang chi tiết khóa học]], [[web/page/website/courses|/courses — Product Catalog Page]], [[web/page/website/home|Trang chủ / — Home Page]], [[web/page/website/privacy|/privacy — Chính sách dữ liệu]], [[web/page/website/projects|/projects — Trang dự án học viên]], [[web/page/website/terms|/terms — Điều khoản sử dụng]], [[web/page/website/verify-certificate|/verify-certificate — Trang xác thực chứng chỉ]], [[web/page_function_matrix|Page Function Matrix — Blueprint]], [[web/security|Security — Bảo mật hệ thống Blueprint]], [[web/unified_database_schema|💎 Unified Database Schema - Blueprint Project]]
