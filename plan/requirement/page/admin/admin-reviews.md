# `/admin/reviews` — Kiểm duyệt đánh giá khóa học

**Status:** P1
**Owner area:** Admin
**Source of truth:** `plan/requirement/page_function_matrix.md`, `plan/requirement/unified_database_schema.md`
**Build decision:** Build

## 1. Mục tiêu trang

Admin kiểm duyệt review/rating của học viên trước khi hiển thị trên public course/home page.

---

## 2. Layout chính

| Khu vực | Yêu cầu |
| ------- | ------- |
| KPI cards | Pending, published, hidden, average rating. |
| Review table | Course, student, rating, title, status, created_at. |
| Filters | Course, rating, status, date range. |
| Detail drawer | Nội dung review, lịch sử moderation. |
| Actions | Publish, hide, reject. |

---

## 3. Data cần dùng

| Bảng | Dữ liệu |
| ---- | ------ |
| `course_reviews` | Rating, title, content, status, moderated_by, moderated_at, moderation_note |
| `users` | Học viên review |
| `courses` | Khóa được review |
| `enrollments` | Kiểm tra user đã enrolled |

---

## 4. Rule chức năng

- Chỉ review từ user đã enrolled mới hợp lệ.
- Mỗi user chỉ có một review active cho mỗi course.
- Publish/hide/reject phải ghi moderation metadata.
- Public website chỉ hiển thị `status = published`.
- Hide/reject không xóa review để giữ audit dữ liệu.

---

## 5. Acceptance Criteria

| Tiêu chí | Đạt / Không |
| -------- | ----------- |
| Lọc được pending/published/hidden/rejected | |
| Publish review làm public page có thể dùng | |
| Reject/hide không hard delete | |
| Không cho review từ user chưa enrolled | |
