# `/admin/leads` — Quản lý Type B Leads

**Status:** MVP
**Owner area:** Admin
**Source of truth:** `plan/requirement/page_function_matrix.md`, `plan/requirement/unified_database_schema.md`
**Build decision:** Build

> **Trạng thái:** Trang `/admin/leads` tồn tại như là trang riêng để quản lý Type B leads (khách hàng tiềm năng từ [[requirement/page/website/contact|contact]] [[requirement/page|page]], workshop, B2B).
> **Ngày cập nhật:** 2026-05-23

---

## 1. Tổng Quan

Trong MVP, **có trang `/admin/leads` độc lập** để quản lý các **Type B Leads** — khách hàng tiềm năng chưa có tài khoản nhưng đã để lại thông tin liên hệ.

- **Type A Lead**: User đã đăng ký tài khoản (`users`) nhưng chưa có `enrollment` active. Quản lý trong `/admin/students` (Student Detail Drawer).
- **Type B Lead**: Khách hàng chưa có tài khoản, điền form liên hệ. Quản lý trong **`/admin/leads`** riêng biệt. Lead là entity độc lập, không chuyển đổi trực tiếp thành student record.

---

## 2. Source của Type B Leads

Type B Leads được tạo ra từ:

| Source            | Mô tả                                              |
| ----------------- | -------------------------------------------------- |
| `/contact`        | Form tư vấn/liên hệ                                |
| Workshop signup   | Đăng ký workshop (nếu không tạo account đồng thời) |
| Resource download | Lead magnet form                                   |
| B2B inquiry       | Yêu cầu tư vấn doanh nghiệp                        |

Tất cả điền vào bảng `leads` với `source` tương ứng.

---

## 3. Trang `/admin/leads`

### Mục tiêu

Quản lý toàn bộ Type B leads: xem, tìm kiếm, cập nhật status.

### Các khu vực cần có

| Khu vực       | Nội dung                                            |
| ------------- | --------------------------------------------------- |
| Leads table   | Tên, email, phone, nhu cầu, nguồn, status, ngày tạo |
| Search/filter | Tìm theo tên/email/phone; lọc theo status, source   |
| Lead detail   | Xem thông tin chi tiết, ghi chú, update status      |
| Quick actions | Mark as contacted, delete                           |

### Lead table columns

| Cột          | Nội dung           |
| ------------ | ------------------ |
| Name         | Họ tên             |
| Email        | Email              |
| Phone        | Số điện thoại      |
| Interest     | Nhu cầu quan tâm   |
| Source       | Nguồn lead         |
| Status       | new/contacted/lost |
| Created date | Ngày tạo           |
| Actions      | View / Edit        |

### Lead Status Flow

```
new → contacted → (closed/lost)
         ↘
          lost
```

---

## 4. Lead → Order Relationship (Analytics Tracking)

Type B Leads là entity độc lập, **không có trường `converted_user_id`**.

Mối liên hệ với User/Order được track qua `orders.lead_id`:

| Flow                    | Mô tả                                                             |
| :---------------------- | :---------------------------------------------------------------- |
| Lead đăng ký tài khoản  | Tạo `users` mới tại `/register` — **không** tự động gán vào leads |
| Lead mua khóa học       | Tạo `orders` với `lead_id` trỏ đến lead gốc (analytics)           |
| Order paid → enrollment | Tự động tạo `enrollments` cho `orders.user_id`                    |

**Admin không chuyển đổi lead thành student tại `/admin/leads`.**  
Lead xuất hiện trong `/admin/students` chỉ khi lead đó **tự đăng ký tài khoản** và có enrollment.

Lead status flow đơn giản:

```
new → contacted → lost
```

**Note:** Không có status `converted`. Phân tích conversion rate dựa trên: count(orders WHERE lead_id = X) > 0.

---

## 5. Data Structure (Bảng `leads`)

| Field        | Type      | Constraint     | Description                         |
| :----------- | :-------- | :------------- | :---------------------------------- |
| `id`         | UUID      | PK             | Định danh duy nhất                  |
| `full_name`  | String    | Not Null       | Họ tên                              |
| `email`      | String    | Not Null       | Email                               |
| `phone`      | String    | -              | Số điện thoại/Zalo                  |
| `interest`   | String    | -              | Nhu cầu quan tâm                    |
| `message`    | Text      | -              | Nội dung yêu cầu                    |
| `source`     | String    | -              | contact_page, workshop_signup, etc. |
| `source_entity_type` | String | -          | Entity nguồn: resource, course, [[requirement/page|page]] |
| `source_entity_id` | UUID | -              | ID entity nguồn nếu có               |
| `consent_marketing` | Boolean | Default: false | Đồng ý nhận tư vấn/marketing        |
| `consent_privacy_policy` | Boolean | Default: false | Đồng ý chính sách dữ liệu          |
| `utm_source` | String    | -              | UTM source                          |
| `utm_medium` | String    | -              | UTM medium                          |
| `utm_campaign` | String  | -              | UTM campaign                        |
| `landing_page_url` | String | -            | URL landing [[requirement/page|page]] nguồn              |
| `status`     | Enum      | Not Null       | `new`, `contacted`, `lost`          |
| `created_at` | Timestamp | Default: now() | Ngày tạo                            |

---

## 6. Acceptance Criteria

- [ ] Trang `/admin/leads` tồn tại với đầy đủ CRUD (view, search, filter, update status)
- [ ] Leads table hiển thị đầy đủ thông tin từ form [[requirement/page/website/contact|contact]]
- [ ] Lead detail [[requirement/page|page]] cho phép xem message và chuyển status
- [ ] KPI Overview đếm số leads Type B mới (status = `new`)
- [ ] Không nhầm lẫn Type A (users chưa mua) với Type B (chưa có account)

---

## 7. Luồng Tổng thể

```
Contact Form → leads (Type B, status=new) → /admin/leads ([[requirement/page/admin/admin|admin]] xử lý tiếp cận)
```

---

## 8. Lưu Ý

- Type B leads chỉ có trong `/admin/leads`, không xuất hiện trong student table.
- Student table chỉ hiển thị `users` table. Type A lead = user chưa có enrollment active.
- Enrollments được quản lý trong Student Detail Drawer, không có trang `/admin/enrollments` riêng.
- Leads không được chuyển thành student trong hệ thống quản lý lead.

---

## 🗺️ Obsidian Meta

### Tags
- #cortex/page/admin
- #cortex/plan
- #cortex/requirement

### Navigation
- **Breadcrumbs:** [[CORTEX_PLAN_MOC|Plan Home]] / [[requirement/page|Requirements]] / [[requirement/page/admin/admin|Admin Dashboard]]

### Relations
- **Outgoing Links:** [[requirement/page|1. Public Website — phần người ngoài nhìn thấy]], [[requirement/page/admin/admin|Admin Dashboard — Requirement]], [[requirement/page/website/contact|/contact — Trang liên hệ]]
- **Incoming Links (Backlinks):** *None*
