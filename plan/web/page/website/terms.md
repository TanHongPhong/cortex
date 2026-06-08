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

# `/terms` — Điều khoản sử dụng

**Status:** MVP
**Owner area:** Public
**Source of truth:** `plan/web/page_function_matrix.md`, `plan/web/unified_database_schema.md`
**Build decision:** Build static [[web/page|page]]

## 1. Mục tiêu

Đặt rule cơ bản về tài khoản, quyền học, nội dung khóa học, thanh toán và [[web/page/website/certificate|certificate]] để giảm hiểu nhầm khi user đăng ký/mua khóa.

## 2. Layout chính

| Khu vực | Yêu cầu |
| ------- | ------- |
| Account | Login bằng email/password; user tự bảo mật tài khoản |
| Course access | Paid course yêu cầu enrollment active |
| Content use | Không chia sẻ trái phép video/resource paid course |
| Certificate | Certificate là Certificate of Completion, không phải văn bằng chính quy |
| Refund reference | Link `/refund-policy` |

## 3. Data cần dùng

Static content. Không cần bảng CMS trong MVP/P1.

## 4. Permission / Rule

- Public route, không yêu cầu [[web/page/student/login|login]].
- Nội dung không được hứa quyền lợi ngoài scope requirement.
- Certificate wording phải thống nhất với `/certificate`.

## 5. Empty/Error State

| State | UI |
| ----- | -- |
| Nội dung chưa cấu hình | Hiển thị static fallback đã duyệt trong requirement |

## 6. Acceptance Criteria

| Tiêu chí | Đạt / Không |
| -------- | ----------- |
| Public truy cập `/terms` được | |
| Điều khoản khóa học/certificate rõ ràng | |
| Có link sang refund policy | |

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
- **Incoming Links (Backlinks):** [[web/architecture|Architecture — Kiến trúc kỹ thuật Blueprint]]
