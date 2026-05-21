# `/admin` — Admin Overview

## 1. Mục tiêu trang

Admin vào trang này để biết nhanh:

```text
1. Hôm nay có bao nhiêu lead mới
2. Có bao nhiêu học viên đang học
3. Có bao nhiêu bài nộp đang chờ duyệt
4. Có bao nhiêu certificate đã cấp
5. Có việc gì cần xử lý ngay
```

Trang này **không dùng để chỉnh sửa sâu**, mà dùng để **xem nhanh + điều hướng sang trang quản lý chi tiết**.

---

# 2. Layout đề xuất

```text
Admin Overview

[Welcome / Summary Header]

[KPI Cards]
- Total Leads
- New Leads
- Active Students
- Pending Submissions
- Certificates Issued
- Published Courses

[Quick Actions]

[Recent Leads]          [Pending Submissions]

[Recent Enrollments]    [Certificate Activity]
```

---

# 3. Các vùng chính trên trang

## A. Welcome / Summary Header

| Thành phần  | Yêu cầu                                         |
| ----------- | ----------------------------------------------- |
| Title       | `Admin Dashboard` hoặc `Overview`               |
| Subtitle    | Tóm tắt tình hình hệ thống                      |
| Date filter | Today / 7 days / 30 days nếu cần                |
| CTA nhanh   | `Tạo khóa học`, `Xem lead mới`, `Duyệt bài nộp` |

Ví dụ:

```text
Welcome back, Admin 👋
Here is what is happening in May Academy today.
```

---

## B. KPI Cards

Đây là phần quan trọng nhất của overview.

| KPI                 | Ý nghĩa                       | Click tới                           |
| ------------------- | ----------------------------- | ----------------------------------- |
| Total Leads         | Tổng số lead trong hệ thống   | `/admin/leads`                      |
| New Leads           | Lead mới chưa xử lý           | `/admin/leads?status=new`           |
| Active Students     | Học viên đang hoạt động       | `/admin/students`                   |
| Active Enrollments  | Lượt đăng ký khóa đang active | `/admin/enrollments`                |
| Published Courses   | Khóa học đang public          | `/admin/courses`                    |
| Pending Submissions | Bài nộp đang chờ duyệt        | `/admin/submissions?status=pending` |
| Certificates Issued | Chứng chỉ đã cấp              | `/admin/certificates`               |

## MVP nên hiển thị 6 KPI này trước

```text
1. New Leads
2. Active Students
3. Published Courses
4. Active Enrollments
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
| `Xem lead mới`    | `/admin/leads?status=new`           |
| `Duyệt bài nộp`   | `/admin/submissions?status=pending` |
| `Cấp certificate` | `/admin/certificates`               |

UI nên là các button/card nhỏ, không cần quá màu mè.

---

## D. Recent Leads

**Mục tiêu:** admin thấy ngay ai vừa để lại thông tin.

| Cột      | Nội dung                           |
| -------- | ---------------------------------- |
| Name     | Tên lead                           |
| Contact  | Email hoặc phone/Zalo              |
| Interest | Nhu cầu quan tâm                   |
| Source   | contact page / workshop / resource |
| Status   | new / contacted / converted / lost |
| Action   | `View` hoặc `Update status`        |

Chỉ hiển thị **5 lead mới nhất**.

CTA cuối block:

```text
View all leads
```

Dẫn tới:

```text
/admin/leads
```

---

## E. Pending Submissions

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

## F. Recent Enrollments

**Mục tiêu:** theo dõi học viên mới được gán/mua khóa.

| Cột         | Nội dung                       |
| ----------- | ------------------------------ |
| Student     | Tên học viên                   |
| Course      | Khóa được đăng ký              |
| Status      | active / completed / cancelled |
| Enrolled at | Ngày đăng ký                   |
| Action      | `View`                         |

CTA:

```text
View enrollments
```

Dẫn tới:

```text
/admin/enrollments
```

---

## G. Certificate Activity

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
| Date range           | MVP có thể chưa cần, sau thêm filter 7/30 ngày     |
| Quick action         | Các nút dẫn đúng trang quản lý                     |
| Recent leads         | Hiển thị lead mới nhất                             |
| Pending submissions  | Hiển thị bài nộp đang chờ duyệt                    |
| Recent enrollments   | Hiển thị đăng ký khóa gần nhất                     |
| Certificate activity | Hiển thị certificate mới cấp hoặc pending          |
| Responsive           | Desktop ưu tiên, mobile vẫn xem được               |
| Empty state          | Nếu chưa có dữ liệu, hiển thị trạng thái trống gọn |

---

# 6. Data cần dùng

| Bảng           | Dùng để lấy gì                                               |
| -------------- | ------------------------------------------------------------ |
| `leads`        | Total leads, new leads, recent leads                         |
| `users`        | Total students, student info                                 |
| `courses`      | Published courses, draft courses                             |
| `enrollments`  | Active enrollments, recent enrollments                       |
| `lessons`      | Không bắt buộc cho overview, chỉ cần nếu tính content status |
| `submissions`  | Pending submissions                                          |
| `certificates` | Certificates issued, certificate activity                    |

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
| `AdminOverviewHeader`      | Title + subtitle + date filter |
| `KpiCard`                  | Hiển thị số liệu               |
| `QuickActionCard`          | Nút thao tác nhanh             |
| `RecentLeadsTable`         | Lead mới                       |
| `PendingSubmissionsTable`  | Bài nộp chờ duyệt              |
| `RecentEnrollmentsTable`   | Enrollment mới                 |
| `CertificateActivityTable` | Hoạt động certificate          |
| `StatusBadge`              | new / pending / active / valid |
| `EmptyState`               | Khi chưa có dữ liệu            |
| `LoadingState`             | Khi đang tải dữ liệu           |

---

# 9. Empty State

## Khi chưa có lead

```text
Chưa có lead mới.
Lead từ contact form, workshop hoặc resource download sẽ xuất hiện tại đây.
```

## Khi chưa có submission pending

```text
Không có bài nộp nào đang chờ duyệt.
```

## Khi chưa có enrollment

```text
Chưa có học viên nào được gán khóa học.
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
| Có recent leads                       |             |
| Có pending submissions                |             |
| Có recent enrollments                 |             |
| Có certificate activity               |             |
| Có empty state khi chưa có dữ liệu    |             |
| Responsive dùng ổn trên mobile/tablet |             |

---

# 12. Chốt scope `/admin`

```text
/admin cần có:

1. Admin layout chung
2. Welcome / summary header
3. KPI cards
4. Quick actions
5. Recent leads
6. Pending submissions
7. Recent enrollments
8. Certificate activity
9. Empty/loading state
```

Nói ngắn gọn: **`/admin` là trang tổng quan vận hành. Admin không chỉnh sửa sâu ở đây, mà dùng nó để nhìn nhanh tình hình và đi đến đúng trang cần xử lý.**
