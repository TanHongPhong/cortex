---
categories:
  - "[[Projects]]"
  - "[[cortex.ai]]"
  - "[[cortex.ai Web]]"
  - "[[Requirements]]"
  - "[[Admin Dashboard]]"
type: ["[[Page Spec]]"]
org: ["[[cortex.ai]]"]
start: 2026-06-02
year: 2026
url: https://github.com/TanHongPhong/cortex
status: ["[[MVP]]", "[[P1]]"]
---

# `/admin/certificates` — Quản lý chứng chỉ

**Status:** MVP + P1
**Owner area:** Admin
**Source of truth:** `plan/web/page_function_matrix.md`, `plan/web/unified_database_schema.md`
**Build decision:** Build

## 1. Mục tiêu trang

Admin dùng trang này để:

```text
1. Xem danh sách chứng chỉ đã cấp
2. Kiểm tra học viên đủ điều kiện nhận [[web/page/website/certificate|certificate]]
3. Cấp [[web/page/website/certificate|certificate]] cho học viên
4. Tạo Certificate ID duy nhất
5. Chọn [[web/page/website/certificate|certificate]] template và tạo/tải file PDF chứng chỉ
6. Revoke chứng chỉ nếu cần
7. Copy link verify [[web/page/website/certificate|certificate]]
```

Trang này quản lý bước cuối của quá trình học:

```text
Học viên học lesson → nộp final project → [[web/page/admin/admin|admin]] duyệt → cấp [[web/page/website/certificate|certificate]]
```

---

# 2. Layout đề xuất

```text
/admin/certificates

[Page Header]
- Title: Quản lý chứng chỉ
- CTA: Cấp chứng chỉ

[Certificate Summary]
- Total certificates
- Valid certificates
- Revoked certificates
- Eligible students nếu có

[Certificate Table]
- Danh sách chứng chỉ

[Eligible Students Section]
- Học viên đủ điều kiện nhưng chưa được cấp

[Issue Certificate Modal]
- Chọn học viên
- Chọn khóa
- Chọn active [[web/page/website/certificate|certificate]] template
- Tạo Certificate ID
- Generate PDF
```

---

# 3. Các vùng chính trên trang

## A. Page Header

| Thành phần | Yêu cầu                                             |
| ---------- | --------------------------------------------------- |
| Title      | `Quản lý chứng chỉ`                                 |
| Subtitle   | “Cấp, tải, xác thực và thu hồi chứng chỉ học viên.” |
| CTA chính  | `Cấp chứng chỉ`                                     |

---

## B. Certificate Summary Cards

| Card                 | Nội dung                             |
| -------------------- | ------------------------------------ |
| Total certificates   | Tổng chứng chỉ đã tạo                |
| Valid certificates   | Chứng chỉ đang hiệu lực              |
| Revoked certificates | Chứng chỉ đã thu hồi                 |
| Eligible students    | Học viên đủ điều kiện nhưng chưa cấp |

MVP scope:

```text
Total certificates
Valid
Revoked
Eligible
```

---

# 4. Certificate Table

## Table columns

| Cột              | Nội dung                          |
| ---------------- | --------------------------------- |
| Student          | Tên học viên                      |
| Course           | Khóa học                          |
| Certificate Code | Mã chứng chỉ                      |
| Status           | valid / revoked                   |
| Issued at        | Ngày cấp                          |
| PDF              | Có file PDF chưa                  |
| Template         | Template/version dùng khi cấp     |
| Actions          | View / Download / Verify / Revoke |

---

## Ví dụ row

```text
Phạm Đức Trí
Course: AI Agent & Vibe Coding Bootcamp
Certificate ID: MAY-AI-2026-0001
Status: Valid
Issued at: 21/05/2026
PDF: Available

[View] [Download] [Verify] [Revoke]
```

---

# 5. Eligible Students Section

## Mục tiêu

Hiển thị học viên **đủ điều kiện nhận [[web/page/website/certificate|certificate]] nhưng chưa được cấp**.

Điều kiện đủ:

```text
Học viên đủ điều kiện [[web/page/website/certificate|certificate]] khi:

1. Có enrollment với status = active hoặc completed
2. Hoàn thành TẤT CẢ lesson có is_required_for_completion = true:
   - video/resource: lesson_progress.completed = true
   - assignment/final_project: [[web/page/instructor/submissions|submissions]].status = approved
3. Final project (nếu khóa có lesson type = final_project) đã được approved
4. Chưa có [[web/page/website/certificate|certificate]] valid cho course đó
```

## Eligible students columns

| Cột           | Nội dung               |
| ------------- | ---------------------- |
| Student       | Tên học viên           |
| Course        | Khóa học               |
| Progress      | 100% hoặc đủ điều kiện |
| Final project | Approved               |
| Completed at  | Ngày hoàn thành nếu có |
| Action        | Issue Certificate      |

---

# 6. Issue Certificate Modal

Khi [[web/page/admin/admin|admin]] bấm `Cấp chứng chỉ`, mở modal.

## Field cần có

| Field                | Bắt buộc             | Ghi chú                       |
| -------------------- | -------------------- | ----------------------------- |
| Student              | Có                   | Chọn học viên                 |
| Course               | Có                   | Chọn khóa học                 |
| Certificate ID       | Có                   | Tự generate, [[web/page/admin/admin|admin]] có thể xem |
| Issued date          | Có                   | Mặc định ngày hiện tại        |
| Certificate template | Không bắt buộc ở MVP | Dùng template mặc định        |
| Note                 | Không                | Ghi chú nội bộ                |

---

## Form mẫu

```text
Cấp chứng chỉ

Student: Phạm Đức Trí
Course: AI Agent & Vibe Coding Bootcamp
Certificate ID: MAY-AI-2026-0001
Issued date: Today

[Generate Certificate]
```

---

# 7. Certificate ID Format

Nên dùng format dễ kiểm tra và có tính nhận diện.

## Gợi ý format

```text
CERT-{YYYY}{RRRR}-{NNNNNN}
```

Ví dụ:

```text
CERT-20265432-000001
CERT-20261234-000002
CERT-20269876-000003
```

## Rule

| Rule       | Mô tả                             |
| ---------- | --------------------------------- |
| Unique     | Certificate ID không được trùng   |
| Readable   | Nhìn vào biết thuộc CORTEX        |
| Verifyable | Dùng được ở `/verify-certificate` |
| Stable     | Sau khi cấp không nên đổi ID      |

---

# 8. Certificate Status

| Status    | Ý nghĩa                 |
| --------- | ----------------------- |
| `valid`   | Chứng chỉ hợp lệ        |
| `revoked` | Chứng chỉ đã bị thu hồi |

MVP chỉ cần 2 trạng thái này.

Future statuses:

```text
expired
pending
```

Nhưng chưa cần ở bản đầu.

---

# 9. Actions trên [[web/page/website/certificate|certificate]]

| Action             | Chức năng                            |
| ------------------ | ------------------------------------ |
| `View`             | Xem chi tiết [[web/page/website/certificate|certificate]]             |
| `Download`         | Tải PDF chứng chỉ                    |
| `Verify`           | Mở link `/verify-certificate?id=...` |
| `Copy verify link` | Copy link xác thực                   |
| `Revoke`           | Thu hồi chứng chỉ                    |
| `Regenerate PDF`   | Tạo lại file PDF nếu cần             |

---

# 10. Revoke Certificate

## Khi nào cần revoke?

| Trường hợp         | Ví dụ                               |
| ------------------ | ----------------------------------- |
| Cấp nhầm           | Sai học viên/sai khóa               |
| Thông tin sai      | Sai tên, sai ngày cấp               |
| Vi phạm quy định   | Gian lận project hoặc dùng bài copy |
| Admin thao tác lỗi | Cấp duplicate hoặc sai template     |

## Revoke modal cần có

| Field            | Bắt buộc       |
| ---------------- | -------------- |
| Reason           | Có             |
| Confirm checkbox | Có             |
| Admin note       | Không bắt buộc |

Ví dụ:

```text
Bạn có chắc muốn thu hồi chứng chỉ này?

Reason:
[Nhập lý do thu hồi]

[Confirm revoke]
```

---

# 11. Certificate Detail

Khi [[web/page/admin/admin|admin]] bấm `View`, mở drawer/modal chi tiết.

## Nội dung cần có

| Nhóm             | Field                                        |
| ---------------- | -------------------------------------------- |
| Student info     | Họ tên, email                                |
| Course info      | Tên khóa, level                              |
| Certificate info | Certificate Code, status, issued date        |
| Verify info      | Verify URL, QR code nếu có                   |
| File info        | Certificate PDF URL                          |
| Audit info       | Issued by ([[web/page/admin/admin|admin]]), revoked by ([[web/page/admin/admin|admin]] nếu có) |
| Admin actions    | Download, copy link, revoke                  |

---

# 12. PDF Generation

## MVP

Ở MVP, có thể làm đơn giản:

```text
Dùng HTML template → generate PDF
```

Certificate PDF fields:

| Thành phần     | Yêu cầu                   |
| -------------- | ------------------------- |
| Tên học viên   | Họ tên chính xác          |
| Tên khóa       | Khóa đã hoàn thành        |
| Ngày cấp       | Issued date               |
| Certificate ID | Mã duy nhất               |
| QR code        | Dẫn đến verify link       |
| Tên đơn vị cấp | CORTEX                    |
| Chữ ký         | Founder/Instructor nếu có |

---

# 13. Verify Link

Mỗi [[web/page/website/certificate|certificate]] phải có link verify:

```text
/verify-certificate?id=MAY-AIAGENT-2026-0001
```

Admin có thể:

```text
1. Mở link verify
2. Copy link verify
3. Tải [[web/page/website/certificate|certificate]] PDF
```

---

# 14. Rule quan trọng

| Trường hợp                     | Cách xử lý                               |
| ------------------------------ | ---------------------------------------- |
| Học viên chưa đủ điều kiện     | Không cho cấp [[web/page/website/certificate|certificate]]                |
| Chưa có final project approved | Không cho cấp [[web/page/website/certificate|certificate]]                |
| Đã có [[web/page/website/certificate|certificate]] cùng course  | Không cấp duplicate                      |
| Certificate ID bị trùng        | Generate lại ID                          |
| Certificate đã revoked         | Không hiển thị là valid ở verify [[web/page|page]]    |
| Revoke [[web/page/website/certificate|certificate]]             | Bắt buộc nhập lý do                      |
| Sai thông tin học viên         | Sửa thông tin rồi regenerate PDF nếu cần |

---

# 15. Yêu cầu chức năng cụ thể

| Nhóm              | Yêu cầu                                 |
| ----------------- | --------------------------------------- |
| Auth              | Chỉ [[web/page/admin/admin|admin]] mới vào được                  |
| Certificate list  | Hiển thị danh sách chứng chỉ            |
| Eligible students | Hiển thị học viên đủ điều kiện cấp      |
| Issue [[web/page/website/certificate|certificate]] | Cấp chứng chỉ cho học viên đủ điều kiện |
| Duplicate check   | Không cấp trùng user + course           |
| Generate ID       | Tạo Certificate ID duy nhất             |
| Generate PDF      | Tạo file [[web/page/website/certificate|certificate]] PDF                |
| Download PDF      | Cho [[web/page/admin/admin|admin]] tải file                      |
| Verify link       | Mở/copy link xác thực                   |
| Revoke            | Thu hồi [[web/page/website/certificate|certificate]] và nhập lý do       |
| Status sync       | Verify [[web/page|page]] hiển thị đúng valid/revoked |
| Responsive        | Ưu tiên desktop, mobile xem được        |

---

# 16. Data cần dùng

| Bảng              | Dữ liệu                                    |
| ----------------- | ------------------------------------------ |
| `certificates`    | Chứng chỉ                                  |
| `users`           | Thông tin học viên                         |
| `courses`         | Khóa học                                   |
| `enrollments`     | Kiểm tra học viên đã học khóa              |
| `lessons`         | Kiểm tra lesson bắt buộc                   |
| `lesson_progress` | Kiểm tra video/resource đã hoàn thành      |
| [[web/page/instructor/submissions|`submissions`]]     | Kiểm tra assignment/final project approved |

---

# 17. Cấu trúc dữ liệu `certificates`

| Field              | Mục đích              |
| ------------------ | --------------------- |
| `id`               | ID record             |
| `certificate_code` | Mã chứng chỉ duy nhất |
| `user_id`          | Học viên              |
| `course_id`        | Khóa học              |
| `issued_at`        | Ngày cấp              |
| `certificate_url`  | Link file PDF         |
| `status`           | valid / revoked       |
| `revoked_reason`   | Lý do thu hồi         |
| `revoked_at`       | Ngày thu hồi          |
| `revoked_by`       | Admin thu hồi         |
| `created_by`       | Admin cấp             |
| `created_at`       | Ngày tạo              |

---

# 18. Logic chính

## Kiểm tra đủ điều kiện [[web/page/website/certificate|certificate]]

```text
Học viên đủ điều kiện nếu:

1. Có enrollment với course
2. Hoàn thành tất cả lesson bắt buộc
3. Assignment bắt buộc đã approved
4. Final project đã approved
5. Chưa có [[web/page/website/certificate|certificate]] valid cho course đó
```

---

## Cấp [[web/page/website/certificate|certificate]]

```text
Admin chọn student + course
→ hệ thống kiểm tra eligibility
→ kiểm tra chưa có [[web/page/website/certificate|certificate]] trùng
→ generate certificate_code
→ generate PDF
→ lưu record vào certificates
→ status = valid
```

---

## Revoke [[web/page/website/certificate|certificate]]

```text
Admin bấm Revoke
→ nhập reason
→ confirm
→ status = revoked
→ lưu revoked_reason, revoked_at, revoked_by
→ verify [[web/page|page]] hiển thị revoked
```

---

## Certificate template rule

```text
Khi cấp [[web/page/website/certificate|certificate]]:
1. Chọn `certificate_templates.status = active`
2. Lưu `certificates.template_id`
3. Lưu `template_name_snapshot`
4. Lưu `template_version_snapshot`
5. Generate PDF và lưu `certificate_url`
```

Certificate đã cấp không render lại theo template mới nếu template bị sửa ở Future.

---

## Verify [[web/page/website/certificate|certificate]]

```text
Người dùng mở:
/verify-certificate?id=certificate_code

Nếu status = valid:
→ hiển thị [[web/page/website/certificate|certificate]] valid

Nếu status = revoked:
→ hiển thị [[web/page/website/certificate|certificate]] revoked

Nếu không tìm thấy:
→ hiển thị [[web/page/website/certificate|certificate]] not found
```

---

# 19. Component cần có

| Component                 | Mục đích                          |
| ------------------------- | --------------------------------- |
| `AdminLayout`             | Sidebar + topbar                  |
| `CertificatesHeader`      | Title + CTA                       |
| `CertificateSummaryCards` | Total, valid, revoked, eligible   |
| `CertificateTable`        | Danh sách [[web/page/website/certificate|certificate]]             |
| `EligibleStudentsTable`   | Danh sách đủ điều kiện cấp        |
| `IssueCertificateModal`   | Cấp [[web/page/website/certificate|certificate]]                   |
| `CertificateDetailDrawer` | Xem chi tiết                      |
| `CertificateTemplateSelect` | Chọn template active khi cấp     |
| `CertificatePreview`      | Preview [[web/page/website/certificate|certificate]] từ template   |
| `RevokeCertificateModal`  | Thu hồi [[web/page/website/certificate|certificate]]               |
| `StatusBadge`             | valid / revoked                   |
| `CopyButton`              | Copy Certificate ID / verify link |
| `EmptyState`              | Khi chưa có [[web/page/website/certificate|certificate]]           |
| `LoadingState`            | Khi đang tải                      |

---

# 20. Empty State

## Chưa có [[web/page/website/certificate|certificate]]

```text
Chưa có chứng chỉ nào được cấp.

Khi học viên hoàn thành khóa học và final project được duyệt, [[web/page/admin/admin|admin]] có thể cấp chứng chỉ tại đây.
```

## Chưa có học viên đủ điều kiện

```text
Chưa có học viên nào đủ điều kiện nhận chứng chỉ.

Học viên cần hoàn thành lesson bắt buộc và final project trước.
```

---

# 21. UI style đề xuất

| Phần              | Gợi ý                                           |
| ----------------- | ----------------------------------------------- |
| Tổng thể          | Admin table rõ ràng, tin cậy                    |
| Certificate table | Ưu tiên Certificate ID, student, course, status |
| Status badge      | Valid xanh, revoked đỏ/xám                      |
| Eligible section  | Đặt trên hoặc dưới table tùy ưu tiên            |
| Detail drawer     | Có thông tin [[web/page/website/certificate|certificate]] + actions              |
| Revoke modal      | Cảnh báo rõ vì đây là hành động nhạy cảm        |
| Mobile            | Xem được, nhưng thao tác chính ưu tiên desktop  |

---

# 22. Acceptance Criteria

Trang `/admin/certificates` đạt nếu:

| Tiêu chí                                         | Đạt / Không |
| ------------------------------------------------ | ----------- |
| Student không truy cập được                      |             |
| Admin xem được danh sách [[web/page/website/certificate|certificate]]             |             |
| Admin thấy học viên đủ điều kiện cấp [[web/page/website/certificate|certificate]] |             |
| Không cấp được nếu học viên chưa đủ điều kiện    |             |
| Không cấp duplicate user + course                |             |
| Certificate ID được tạo unique                   |             |
| Admin cấp [[web/page/website/certificate|certificate]] được                       |             |
| PDF [[web/page/website/certificate|certificate]] được tạo hoặc lưu link           |             |
| Admin copy được verify link                      |             |
| Admin revoke [[web/page/website/certificate|certificate]] được                    |             |
| Revoke bắt buộc có lý do                         |             |
| Verify [[web/page|page]] hiển thị đúng valid/revoked          |             |
| Empty state hiển thị đúng                        |             |
| Responsive dùng ổn                               |             |

---

# 23. Chốt scope `/admin/certificates`

```text
/admin/certificates cần có:

1. Admin layout chung
2. Page header
3. Certificate summary cards
4. Certificate table
5. Eligible students section
6. Issue [[web/page/website/certificate|certificate]] modal
7. Certificate detail drawer
8. Generate Certificate ID
9. Generate/download PDF
10. Copy verify link
11. Revoke [[web/page/website/certificate|certificate]]
12. Empty/loading/error state
```

Nói ngắn gọn: **`/admin/certificates` là nơi cấp và kiểm soát chứng chỉ. Chỉ học viên hoàn thành đủ lesson bắt buộc và final project được duyệt mới đủ điều kiện nhận Certificate of Completion.**

---

## 🗺️ Obsidian Meta

### Tags
- #cortex/page/admin
- #cortex/plan
- #cortex/requirement

### Navigation
- **Breadcrumbs:** [[CORTEX_PLAN_MOC|Plan Home]] / [[web/page|Requirements]] / [[web/page/admin/admin|Admin Dashboard]]

### Relations
- **Outgoing Links:** [[web/page|1. Public Website — phần người ngoài nhìn thấy]], [[web/page/admin/admin|Admin Dashboard — Requirement]], [[web/page/instructor/submissions|/instructor/submissions — Duyệt bài nộp]], [[web/page/website/certificate|/certificate — Trang chứng chỉ]]
- **Incoming Links (Backlinks):** *None*
