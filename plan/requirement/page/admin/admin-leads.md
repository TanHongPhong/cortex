# `/admin/leads` — Quản lý lead

## 1. Mục tiêu trang

Admin dùng trang này để:

```text
1. Xem danh sách người quan tâm khóa học
2. Biết lead đến từ nguồn nào
3. Theo dõi nhu cầu học của từng lead
4. Cập nhật trạng thái tư vấn
5. Ghi chú quá trình liên hệ
6. Chuyển lead thành học viên nếu đã chốt
7. Gán khóa cho lead đã chuyển đổi
```

Trang này quản lý người **chưa chắc đã là học viên**. Khi lead đã chốt học thì có thể chuyển sang `student` và tạo `enrollment`.

---

# 2. Layout đề xuất

```text
/admin/leads

[Page Header]
- Title: Quản lý lead
- CTA: Thêm lead thủ công nếu cần

[Lead Summary]
- Total leads
- New leads
- Contacted
- Converted
- Lost

[Lead Table]
- Danh sách lead

[Lead Detail Drawer / Modal]
- Contact info
- Learning interest
- Notes
- Status update
- Convert to student
```

---

# 3. Các vùng chính trên trang

## A. Page Header

| Thành phần | Yêu cầu                                                 |
| ---------- | ------------------------------------------------------- |
| Title      | `Quản lý lead`                                          |
| Subtitle   | “Theo dõi người quan tâm khóa học và quá trình tư vấn.” |
| CTA chính  | `Thêm lead` nếu admin muốn nhập thủ công                |
| CTA phụ    | `Xem học viên` dẫn tới `/admin/students`                |

---

## B. Lead Summary Cards

| Card            | Nội dung                      |
| --------------- | ----------------------------- |
| Total leads     | Tổng số lead                  |
| New leads       | Lead mới chưa xử lý           |
| Contacted leads | Lead đã liên hệ               |
| Converted leads | Lead đã chuyển thành học viên |
| Lost leads      | Lead không chuyển đổi         |

MVP nên có:

```text
Total leads
New
Contacted
Converted
Lost
```

---

# 4. Lead Table

## Cột nên có

| Cột        | Nội dung                           |
| ---------- | ---------------------------------- |
| Name       | Họ tên lead                        |
| Contact    | Email + phone/Zalo                 |
| Interest   | Nhu cầu quan tâm                   |
| Source     | Nguồn lead                         |
| Status     | new / contacted / converted / lost |
| Created at | Ngày gửi thông tin                 |
| Last note  | Ghi chú gần nhất nếu có            |
| Actions    | View / Update / Convert            |

---

## Ví dụ row

```text
Nguyễn Văn A
Email: a@email.com
Zalo: 09xxxxxxxx

Interest: AI Agent & Vibe Coding Bootcamp
Source: contact_page
Status: New
Created: 21/05/2026

[View] [Update Status] [Convert]
```

---

# 5. Lead Source

Lead có thể đến từ nhiều nguồn khác nhau.

| Source              | Ý nghĩa                   |
| ------------------- | ------------------------- |
| `contact_page`      | Form liên hệ              |
| `course_cta`        | CTA từ trang khóa học     |
| `workshop_signup`   | Đăng ký workshop miễn phí |
| `resource_download` | Tải tài liệu miễn phí     |
| `manual`            | Admin nhập thủ công       |
| `b2b_inquiry`       | Liên hệ đào tạo đội nhóm  |
| `mentoring_inquiry` | Liên hệ mentoring 1:1     |

---

# 6. Lead Status

| Status      | Ý nghĩa                           |
| ----------- | --------------------------------- |
| `new`       | Lead mới, chưa xử lý              |
| `contacted` | Đã liên hệ/tư vấn                 |
| `converted` | Đã chuyển thành học viên          |
| `lost`      | Không chuyển đổi                  |
| `invalid`   | Thông tin sai/spam, có thể để sau |

MVP có thể dùng 4 trạng thái:

```text
new
contacted
converted
lost
```

---

# 7. Lead Detail Drawer

Khi admin bấm `View`, mở drawer để xem chi tiết.

## Các phần trong detail

```text
Lead Detail

[Contact Info]
[Learning Interest]
[Lead Source]
[Status]
[Admin Notes]
[Actions]
```

---

## A. Contact Info

| Field      | Nội dung           |
| ---------- | ------------------ |
| Full name  | Họ tên             |
| Email      | Email              |
| Phone/Zalo | Số liên hệ         |
| Created at | Ngày gửi thông tin |

---

## B. Learning Interest

| Field         | Nội dung               |
| ------------- | ---------------------- |
| Interest      | Khóa/nhu cầu quan tâm  |
| Current level | Mức độ hiện tại nếu có |
| Learning goal | Mục tiêu học nếu có    |
| Message       | Ghi chú người dùng gửi |

Ví dụ:

```text
Interest: Core Bootcamp
Current level: Đã dùng ChatGPT cơ bản
Goal: Tạo website/app bằng AI
Message: Em muốn học để làm portfolio cá nhân.
```

---

## C. Admin Notes

Admin có thể thêm ghi chú tư vấn.

| Field      | Nội dung                                 |
| ---------- | ---------------------------------------- |
| Note       | Nội dung ghi chú                         |
| Created by | Admin tạo note                           |
| Created at | Ngày tạo                                 |
| Type       | consulting / follow-up / payment / other |

Ví dụ note:

```text
Đã liên hệ qua Zalo. Bạn quan tâm Core Bootcamp nhưng cần tư vấn thêm về lịch học.
```

---

# 8. Actions trên lead

| Action               | Chức năng                        |
| -------------------- | -------------------------------- |
| `View`               | Xem chi tiết lead                |
| `Update status`      | Đổi new/contacted/converted/lost |
| `Add note`           | Thêm ghi chú tư vấn              |
| `Convert to student` | Tạo tài khoản học viên từ lead   |
| `Create enrollment`  | Gán khóa sau khi convert         |
| `Mark lost`          | Đánh dấu không chuyển đổi        |

---

# 9. Convert Lead to Student

## Mục tiêu

Khi lead đã chốt học, admin có thể chuyển lead thành học viên.

## Flow đề xuất

```text
/admin/leads
→ mở lead detail
→ bấm Convert to student
→ kiểm tra email đã tồn tại chưa
→ nếu chưa có user: tạo user role = student
→ nếu đã có user: dùng user hiện tại
→ chọn khóa cần gán nếu đã chốt
→ tạo enrollment status = active
→ lead status = converted
```

---

## Convert modal cần có

| Field             | Bắt buộc       | Ghi chú               |
| ----------------- | -------------- | --------------------- |
| Full name         | Có             | Lấy sẵn từ lead       |
| Email             | Có             | Lấy sẵn từ lead       |
| Phone/Zalo        | Có             | Lấy sẵn từ lead       |
| Course            | Không bắt buộc | Chọn nếu đã chốt khóa |
| Create enrollment | Không bắt buộc | Checkbox              |
| Note              | Không          | Ghi chú nội bộ        |

---

# 10. Rule quan trọng

| Trường hợp              | Cách xử lý                                                     |
| ----------------------- | -------------------------------------------------------------- |
| Lead email đã có user   | Không tạo user mới, liên kết với user cũ                       |
| Lead converted          | Không convert lại lần 2                                        |
| Lead thiếu email/phone  | Cho admin bổ sung trước khi convert                            |
| Lead chốt khóa          | Tạo enrollment ở `/admin/enrollments` hoặc trong convert modal |
| Lead lost               | Vẫn lưu lại, không xóa                                         |
| Lead spam/sai thông tin | Có thể mark lost hoặc invalid                                  |
| Xóa lead                | Không nên làm ở MVP, chỉ đổi status                            |

---

# 11. Yêu cầu chức năng cụ thể

| Nhóm            | Yêu cầu                          |
| --------------- | -------------------------------- |
| Auth            | Chỉ admin mới vào được           |
| Lead list       | Hiển thị danh sách lead          |
| Search          | Tìm theo tên/email/phone         |
| Status filter   | Lọc new/contacted/converted/lost |
| Source filter   | Có thể để sau                    |
| Lead detail     | Xem đầy đủ thông tin lead        |
| Update status   | Đổi trạng thái lead              |
| Admin notes     | Thêm ghi chú tư vấn              |
| Convert lead    | Chuyển lead thành student        |
| Enrollment      | Có thể gán khóa sau khi convert  |
| Duplicate check | Không tạo user trùng email       |
| Safety          | Không xóa lead ở MVP             |
| Responsive      | Ưu tiên desktop, mobile xem được |

---

# 12. Data cần dùng

| Bảng          | Dữ liệu                             |
| ------------- | ----------------------------------- |
| `leads`       | Thông tin người quan tâm            |
| `users`       | Kiểm tra/tạo student khi convert    |
| `courses`     | Chọn khóa để enroll                 |
| `enrollments` | Gán khóa sau khi convert            |
| `lead_notes`  | Ghi chú tư vấn, nếu tách riêng      |
| `admin_notes` | Có thể dùng chung với ghi chú admin |

---

# 13. Cấu trúc dữ liệu `leads`

| Field               | Mục đích                                              |
| ------------------- | ----------------------------------------------------- |
| `id`                | ID lead                                               |
| `full_name`         | Họ tên                                                |
| `email`             | Email                                                 |
| `phone`             | Phone/Zalo                                            |
| `interest`          | Nhu cầu quan tâm                                      |
| `current_level`     | Mức độ hiện tại nếu có                                |
| `learning_goal`     | Mục tiêu học nếu có                                   |
| `message`           | Ghi chú từ người dùng                                 |
| `source`            | contact_page / workshop_signup / resource_download... |
| `status`            | new / contacted / converted / lost                    |
| `converted_user_id` | User ID nếu đã chuyển thành student                   |
| `created_at`        | Ngày tạo                                              |
| `updated_at`        | Ngày cập nhật                                         |

---

## Bảng `lead_notes`, nếu tách riêng

| Field        | Mục đích                                 |
| ------------ | ---------------------------------------- |
| `id`         | ID note                                  |
| `lead_id`    | Lead liên quan                           |
| `admin_id`   | Admin tạo note                           |
| `note`       | Nội dung ghi chú                         |
| `note_type`  | consulting / follow-up / payment / other |
| `created_at` | Ngày tạo                                 |

---

# 14. Logic chính

## Lấy danh sách lead

```text
Lấy leads
→ sắp xếp created_at mới nhất lên trước
→ hiển thị status, source, interest
```

## Update status

```text
Admin đổi status
→ cập nhật leads.status
→ updated_at = hiện tại
```

## Convert lead

```text
Admin bấm Convert
→ kiểm tra email lead có trong users chưa

Nếu chưa có:
→ tạo user mới role = student
→ copy full_name, email, phone, learning_interest, current_level, learning_goal

Nếu đã có:
→ lấy user_id hiện tại

Nếu admin chọn course:
→ kiểm tra enrollment trùng
→ tạo enrollment status = active

Cuối cùng:
→ leads.status = converted
→ leads.converted_user_id = user_id
```

---

# 15. Component cần có

| Component          | Mục đích                               |
| ------------------ | -------------------------------------- |
| `AdminLayout`      | Sidebar + topbar                       |
| `LeadsHeader`      | Title + CTA                            |
| `LeadSummaryCards` | Total, new, contacted, converted, lost |
| `LeadSearchFilter` | Search + status filter                 |
| `LeadTable`        | Danh sách lead                         |
| `LeadDetailDrawer` | Chi tiết lead                          |
| `LeadStatusBadge`  | new / contacted / converted / lost     |
| `LeadNotesBox`     | Ghi chú tư vấn                         |
| `ConvertLeadModal` | Chuyển lead thành student              |
| `ConfirmDialog`    | Confirm convert/mark lost              |
| `EmptyState`       | Khi chưa có lead                       |
| `LoadingState`     | Khi đang tải                           |

---

# 16. Empty State

## Chưa có lead

```text
Chưa có lead nào.

Lead từ contact form, workshop, resource download hoặc CTA khóa học sẽ xuất hiện tại đây.
```

## Không tìm thấy lead

```text
Không tìm thấy lead phù hợp.

Thử kiểm tra lại tên, email, số điện thoại hoặc trạng thái lead.
```

---

# 17. UI style đề xuất

| Phần          | Gợi ý                                        |
| ------------- | -------------------------------------------- |
| Tổng thể      | Admin table, rõ ràng, ưu tiên thao tác       |
| Lead table    | Hiển thị contact và interest rõ              |
| Status badge  | new, contacted, converted, lost dễ phân biệt |
| Detail drawer | Có note và action convert                    |
| Convert modal | Gọn, tránh nhiều field không cần thiết       |
| Mobile        | Table chuyển thành card list                 |

---

# 18. Acceptance Criteria

Trang `/admin/leads` đạt nếu:

| Tiêu chí                              | Đạt / Không |
| ------------------------------------- | ----------- |
| Student không truy cập được           |             |
| Admin xem được danh sách lead         |             |
| Search theo tên/email/phone hoạt động |             |
| Filter theo status hoạt động          |             |
| Admin xem được chi tiết lead          |             |
| Admin cập nhật status lead được       |             |
| Admin thêm note tư vấn được           |             |
| Admin convert lead thành student được |             |
| Không tạo user trùng email            |             |
| Có thể tạo enrollment khi convert     |             |
| Lead converted lưu converted_user_id  |             |
| Empty state hiển thị đúng             |             |
| Responsive dùng ổn                    |             |

---

# 19. Chốt scope `/admin/leads`

```text
/admin/leads cần có:

1. Admin layout chung
2. Page header
3. Lead summary cards
4. Lead search + status filter
5. Lead table
6. Lead detail drawer
7. Lead notes
8. Update lead status
9. Convert lead to student
10. Optional create enrollment after convert
11. Empty/loading/error state
```

Nói ngắn gọn: **`/admin/leads` là nơi quản lý phễu tư vấn: lead mới → đã liên hệ → chuyển đổi thành học viên → gán khóa. Không nên xóa lead ở MVP, chỉ cập nhật trạng thái để theo dõi lịch sử.**
