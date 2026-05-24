# `/admin` — Admin Overview

## 1. Mục tiêu trang

Admin vào trang này để biết nhanh:

```text
1. Có bao nhiêu học viên đang học
2. Có bao nhiêu bài nộp đang chờ duyệt
3. Có bao nhiêu certificate đã cấp
4. Có việc gì cần xử lý ngay
```

Trang này **không dùng để chỉnh sửa sâu**, mà dùng để **xem nhanh + điều hướng sang trang quản lý chi tiết**.

---

# 2. Layout đề xuất

```text
Admin Overview

[Welcome / Summary Header]

[KPI Cards]
- Active Students
- Active Enrollments
- Published Courses
- Pending Submissions
- Certificates Issued
- New Leads

[Quick Actions]

[Pending Submissions]

[Certificate Activity]
```

---

# 3. Các vùng chính trên trang

## A. Welcome / Summary Header

| Thành phần | Yêu cầu                                          |
| ---------- | ------------------------------------------------ |
| Title      | `Admin Dashboard` hoặc `Overview`                |
| Subtitle   | Tóm tắt tình hình hệ thống                       |
| CTA nhanh  | `Tạo khóa học`, `Duyệt bài nộp`, `Cấp chứng chỉ` |

Ví dụ:

```text
Welcome back, Admin 👋
Here is what is happening in CORTEX today.
```

---

## B. KPI Cards

Đây là phần quan trọng nhất của overview.

| KPI                 | Ý nghĩa                       | Click tới                           |
| ------------------- | ----------------------------- | ----------------------------------- |
| New Leads           | Lead mới chưa xử lý           | `/admin/leads?status=new` (nếu có)  |
| Active Students     | Học viên đang hoạt động       | `/admin/students`                   |
| Active Enrollments  | Lượt đăng ký khóa đang active | `/admin/students` (trong drawer)    |
| Published Courses   | Khóa học đang public          | `/admin/courses`                    |
| Pending Submissions | Bài nộp đang chờ duyệt        | `/admin/submissions?status=pending` |
| Certificates Issued | Chứng chỉ đã cấp              | `/admin/certificates`               |

## MVP nên hiển thị 5-6 KPI này

```text
1. New Leads (nếu có leads page)
2. Active Students
3. Active Enrollments
4. Published Courses
5. Pending Submissions
6. Certificates Issued
```

---

## C. Quick Actions

**Mục tiêu:** admin bấm nhanh để làm việc thường gặp.

| Action            | Dẫn tới                             |
| ----------------- | ----------------------------------- |
| `Tạo khóa học`    | `/admin/courses?action=create`      |
| `Thêm lesson`     | `/admin/lessons`                    |
| `Duyệt bài nộp`   | `/admin/submissions?status=pending` |
| `Cấp certificate` | `/admin/certificates`               |

UI nên là các button/card nhỏ, không cần quá màu mè.

---

## D. Pending Submissions

**Mục tiêu:** admin biết bài nào đang chờ duyệt.

| Cột          | Nội dung                   |
| ------------ | -------------------------- |
| Student      | Tên học viên               |
| Course       | Khóa học                   |
| Lesson       | Assignment/final project   |
| Type         | assignment / final_project |
| Submitted at | Ngày nộp                   |
| Action       | `Review`                   |

Chỉ hiển thị **5 bài nộp pending mới nhất**.

CTA:

```text
Review all submissions
```

Dẫn tới:

```text
/admin/submissions?status=pending
```

---

## E. Certificate Activity

**Mục tiêu:** theo dõi chứng chỉ mới cấp hoặc cần xử lý.

| Cột            | Nội dung        |
| -------------- | --------------- |
| Student        | Tên học viên    |
| Course         | Khóa học        |
| Certificate ID | Mã chứng chỉ    |
| Status         | valid / revoked |
| Issued at      | Ngày cấp        |
| Action         | `View`          |

Nếu có học viên đủ điều kiện nhưng chưa cấp certificate, có thể hiện thêm:

```text
Students eligible for certificate: 3
```

CTA:

```text
Manage certificates
```

---

# 4. Trạng thái nên highlight

Trang overview nên ưu tiên hiển thị các việc cần xử lý:

| Trạng thái              | Cách hiển thị                 |
| ----------------------- | ----------------------------- |
| New leads > 0           | Highlight nhẹ                 |
| Pending submissions > 0 | Highlight rõ hơn              |
| Certificate pending > 0 | Hiện reminder                 |
| Course draft            | Nhắc nếu có khóa chưa publish |
| Student blocked/issue   | Hiện trong alert nếu có       |

---

# 5. Yêu cầu chức năng cụ thể

| Nhóm                 | Yêu cầu                                            |
| -------------------- | -------------------------------------------------- |
| Auth                 | Chỉ admin mới vào được `/admin`                    |
| KPI data             | Tính số liệu từ database                           |
| Quick action         | Các nút dẫn đúng trang quản lý                     |
| Pending submissions  | Hiển thị bài nộp đang chờ duyệt                    |
| Certificate activity | Hiển thị certificate mới cấp hoặc pending          |
| Responsive           | Desktop ưu tiên, mobile vẫn xem được               |
| Empty state          | Nếu chưa có dữ liệu, hiển thị trạng thái trống gọn |

---

# 6. Data cần dùng

| Bảng           | Dùng để lấy gì                   |
| -------------- | -------------------------------- |
| `users`        | Total students                   |
| `courses`      | Published courses                |
| `enrollments`  | Active enrollments               |
| `submissions`  | Pending submissions              |
| `certificates` | Certificates issued              |
| `leads`        | New leads (nếu cần hiển thị KPI) |

---

# 7. Logic KPI

## New Leads

```text
count leads where status = new
```

## Active Students

```text
count users where role = student and status = active
```

## Published Courses

```text
count courses where status = published
```

## Active Enrollments

```text
count enrollments where status = active
```

## Pending Submissions

```text
count submissions where status = pending
```

## Certificates Issued

```text
count certificates where status = valid
```

---

# 8. Component cần có

| Component                  | Mục đích                       |
| -------------------------- | ------------------------------ |
| `AdminLayout`              | Sidebar + topbar admin         |
| `AdminOverviewHeader`      | Title + subtitle               |
| `KpiCard`                  | Hiển thị số liệu               |
| `QuickActionCard`          | Nút thao tác nhanh             |
| `PendingSubmissionsTable`  | Bài nộp chờ duyệt              |
| `CertificateActivityTable` | Hoạt động certificate          |
| `StatusBadge`              | new / pending / active / valid |
| `EmptyState`               | Khi chưa có dữ liệu            |
| `LoadingState`             | Khi đang tải dữ liệu           |

---

# 9. Empty State

## Khi chưa có submission pending

```text
Không có bài nộp nào đang chờ duyệt.
```

## Khi chưa có certificate

```text
Chưa có chứng chỉ nào được cấp.
```

---

# 10. UI style đề xuất

| Phần      | Style                                 |
| --------- | ------------------------------------- |
| Tổng thể  | Dashboard app, sạch, rõ, ít hiệu ứng  |
| KPI cards | Bo góc, số lớn, label ngắn            |
| Alert     | Dùng màu nhẹ để nhắc việc cần xử lý   |
| Tables    | Gọn, chỉ 5 dòng gần nhất              |
| CTA       | Text link hoặc button nhỏ             |
| Desktop   | Ưu tiên 2 cột bên dưới KPI            |
| Mobile    | Card xếp dọc, table có thể thành list |

---

# 11. Acceptance Criteria

Trang `/admin` đạt nếu:

| Tiêu chí                              | Đạt / Không |
| ------------------------------------- | ----------- |
| Student không truy cập được `/admin`  |             |
| Admin xem được KPI tổng quan          |             |
| KPI tính đúng theo database           |             |
| Có quick actions dẫn đúng trang       |             |
| Có pending submissions                |             |
| Có certificate activity               |             |
| Có empty state khi chưa có dữ liệu    |             |
| Responsive dùng ổn trên mobile/tablet |             |

---

# 12. Chốt scope `/admin`

```text
/admin cần có:

1. Admin layout chung
2. Welcome / summary header
3. KPI cards (6 cards)
4. Quick actions
5. Pending submissions
6. Certificate activity
7. Empty/loading state
```

Nói ngắn gọn: **`/admin` là trang tổng quan vận hành. Admin không chỉnh sửa sâu ở đây, mà dùng nó để nhìn nhanh tình hình và đi đến đúng trang cần xử lý.**
