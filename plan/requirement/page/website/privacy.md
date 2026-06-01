# `/privacy` — Chính sách dữ liệu

**Status:** MVP
**Owner area:** Public
**Source of truth:** `plan/requirement/page_function_matrix.md`, `plan/requirement/unified_database_schema.md`
**Build decision:** Build static page

## 1. Mục tiêu

Giải thích dữ liệu CORTEX thu thập, mục đích sử dụng và quyền riêng tư cơ bản để user/lead hiểu trước khi gửi form hoặc mua khóa.

## 2. Layout chính

| Khu vực | Yêu cầu |
| ------- | ------- |
| Header | Tiêu đề rõ: `Chính sách dữ liệu` |
| Data collected | Họ tên, email, phone/Zalo, nhu cầu học, order, learning progress |
| Usage | Tư vấn học tập, vận hành khóa học, thanh toán, certificate verification |
| Consent | Giải thích `leads.consent_privacy_policy` |
| Contact | CTA `/contact?type=support` nếu cần yêu cầu hỗ trợ dữ liệu |

## 3. Data cần dùng

Static content. Không cần bảng CMS trong MVP/P1.

## 4. Permission / Rule

- Public route, không yêu cầu login.
- Không hiển thị dữ liệu cá nhân thật trên trang.
- Form lead/contact phải link về trang này khi yêu cầu consent privacy policy.

## 5. Empty/Error State

| State | UI |
| ----- | -- |
| Nội dung chưa cấu hình | Hiển thị static fallback đã duyệt trong requirement |

## 6. Acceptance Criteria

| Tiêu chí | Đạt / Không |
| -------- | ----------- |
| Public truy cập `/privacy` được | |
| Nội dung giải thích rõ consent dữ liệu | |
| Contact/lead form có thể link tới trang này | |
