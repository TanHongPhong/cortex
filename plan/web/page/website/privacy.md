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

# `/privacy` — Chính sách dữ liệu

**Status:** MVP
**Owner area:** Public
**Source of truth:** `plan/web/page_function_matrix.md`, `plan/web/unified_database_schema.md`
**Build decision:** Build static [[web/page|page]]

## 1. Mục tiêu

Giải thích dữ liệu Blueprint thu thập, mục đích sử dụng và quyền riêng tư cơ bản để user/lead hiểu trước khi gửi form hoặc mua khóa.

## 2. Layout chính

| Khu vực | Yêu cầu |
| ------- | ------- |
| Header | Tiêu đề rõ: `Chính sách dữ liệu` |
| Data collected | Họ tên, email, phone/Zalo, nhu cầu học, order, learning progress |
| Usage | Tư vấn học tập, vận hành khóa học, thanh toán, [[web/page/website/certificate|certificate]] verification |
| Consent | Giải thích `leads.consent_privacy_policy` |
| Contact | CTA `/contact?type=support` nếu cần yêu cầu hỗ trợ dữ liệu |

## 3. Data cần dùng

Static content. Không cần bảng CMS trong MVP/P1.

## 4. Permission / Rule

- Public route, không yêu cầu [[web/page/student/login|login]].
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

---

## 🗺️ Obsidian Meta

### Tags
- #blueprint/page/website
- #blueprint/plan
- #blueprint/requirement

### Navigation
- **Breadcrumbs:** [[BLUEPRINT_PLAN_MOC|Plan Home]] / [[web/page|Requirements]] / [[web/page/website/home|Public Website]]

### Relations
- **Outgoing Links:** [[web/page/website/design|Website Design — Blueprint Mono / Dark Mono]], [[web/page|1. Public Website — phần người ngoài nhìn thấy]], [[web/page/student/login|/login — Đăng nhập]], [[web/page/website/certificate|/certificate — Trang chứng chỉ]]
- **Incoming Links (Backlinks):** [[web/architecture|Architecture — Kiến trúc kỹ thuật Blueprint]], [[web/page|1. Public Website — phần người ngoài nhìn thấy]]
