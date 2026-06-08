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

# `/contact` — Trang liên hệ

**Status:** MVP
**Owner area:** Public
**Source of truth:** `plan/web/page_function_matrix.md`, `plan/web/unified_database_schema.md`
**Build decision:** Build

## 1. Mục tiêu trang

| Mục tiêu            | Mô tả                                                     |
| ------------------- | --------------------------------------------------------- |
| Thu lead            | Lấy thông tin người quan tâm khóa học                     |
| Tư vấn khóa phù hợp | Biết người dùng cần workshop, bootcamp, mentoring hay B2B |
| Tạo kênh liên hệ    | Cho người dùng biết cách liên hệ Blueprint                   |

---

# 2. Bố cục trang đề xuất

```text
/contact

1. Header ngắn
2. Contact Form
3. Contact Info
4. Success Message
```

---

# 3. Section 1 — Header

| Thành phần | Yêu cầu                                                                     |
| ---------- | --------------------------------------------------------------------------- |
| Title      | `Liên hệ Blueprint`                                                            |
| Subtitle   | “Để lại thông tin, Blueprint sẽ tư vấn khóa học phù hợp với mục tiêu của bạn.” |

---

# 4. Section 2 — Contact Form

Form cần có các field sau:

| Field              | Bắt buộc | Ghi chú              |
| ------------------ | -------- | -------------------- |
| Họ và tên          | Có       | Text input           |
| Email              | Có       | Validate email       |
| Số điện thoại/Zalo | Có       | Dùng để tư vấn nhanh |
| Nhu cầu quan tâm   | Có       | Dropdown             |
| Ghi chú            | Không    | Textarea ngắn        |

Dropdown **Nhu cầu quan tâm** nên gồm:

```text
- Workshop miễn phí
- Starter mini course
- AI Agent & Vibe Coding Bootcamp
- Advanced AI Agent Automation
- Mentoring 1:1 / Portfolio coaching
- B2B training cho team/club/SME
- Chưa biết, cần tư vấn
```

CTA:

```text
Gửi thông tin tư vấn
```

---

# 5. Section 3 — Contact Info

Hiển thị gọn bên cạnh hoặc dưới form:

| Thông tin          | Nội dung                             |
| ------------------ | ------------------------------------ |
| Email              | Email chính thức của Blueprint          |
| Zalo/Phone         | Số liên hệ tư vấn                    |
| Social             | Facebook / LinkedIn / YouTube nếu có |
| Thời gian phản hồi | Ví dụ: “Phản hồi trong 24–48 giờ”    |

---

# 6. Sau khi gửi form

Khi gửi thành công, hiển thị:

```text
Cảm ơn bạn! Blueprint đã nhận thông tin và sẽ liên hệ tư vấn sớm.
```

Dữ liệu lưu vào bảng `leads`.

---

# 7. Yêu cầu chức năng

| Nhóm          | Yêu cầu                                                 |
| ------------- | ------------------------------------------------------- |
| Submit form   | Lưu lead vào database                                   |
| Validation    | Không cho gửi nếu thiếu tên, email, phone/Zalo, nhu cầu |
| Lead source   | Lưu nguồn là `contact_page`                             |
| Lead status   | Mặc định là `new`                                       |
| Success state | Hiển thị thông báo gửi thành công                       |
| Error state   | Báo lỗi nếu gửi thất bại                                |
| Responsive    | Mobile form 1 cột, desktop có thể 2 cột                 |

---

# 8. Data cần lưu vào `leads`

| Field        | Nội dung           |
| ------------ | ------------------ |
| `full_name`  | Họ tên             |
| `email`      | Email              |
| `phone`      | Số điện thoại/Zalo |
| `interest`   | Nhu cầu quan tâm   |
| `message`    | Ghi chú            |
| `source`     | contact_page       |
| `source_entity_type` | [[web/page|`page`]] hoặc entity nguồn nếu form đặt trong resource/course |
| `source_entity_id` | ID entity nguồn nếu có |
| `consent_marketing` | Đồng ý nhận tư vấn/marketing |
| `consent_privacy_policy` | Đồng ý chính sách dữ liệu |
| `utm_source` | UTM source nếu có |
| `utm_medium` | UTM medium nếu có |
| `utm_campaign` | UTM campaign nếu có |
| `landing_page_url` | URL trang gửi form |
| `status`     | new                |
| `created_at` | Thời gian gửi      |

---

Trang này phải **rõ và ít phân tâm**: người dùng vào là biết cần điền form để được tư vấn.

---

# 9. Acceptance Criteria

| Tiêu chí | Đạt / Không |
| -------- | ----------- |
| Submit tạo `leads.status = new` | |
| Thiếu field bắt buộc thì không gửi được | |
| Success/error state rõ ràng | |
| Lead source lưu `contact_page` hoặc source tương ứng | |

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
- **Incoming Links (Backlinks):** [[web/architecture|Architecture — Kiến trúc kỹ thuật Blueprint]], [[web/page/admin/admin|Admin Dashboard — Requirement]], [[web/page/admin/admin-leads|/admin/leads — Quản lý Type B Leads]], [[web/page/admin/admin-students|/admin/students — Quản lý học viên]], [[web/page/website/course-detail|/courses/[slug] — Trang chi tiết khóa học]], [[web/page/website/courses|/courses — Product Catalog Page]], [[web/page/website/home|Trang chủ / — Home Page]], [[web/page/website/verify-certificate|/verify-certificate — Trang xác thực chứng chỉ]]
