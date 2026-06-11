---
categories:
  - "[[Projects]]"
  - "[[Blueprint]]"
  - "[[Blueprint Web]]"
  - "[[MOC]]"
type: ["[[MOC]]"]
org: ["[[Blueprint]]"]
start: 2026-06-02
year: 2026
url: https://github.com/TanHongPhong/blueprint
status: "[[Planned]]"
---

# 🗺️ Blueprint Plan Map of Content (MOC)

Welcome to the Blueprint Product Plan & Specifications Dashboard. This Map of Content serves as the central hub for navigating the entire architecture, course roadmaps, and page specs.

---

## 🧭 System Audits & Roadmaps
- **Course Roadmaps & Details:**
  - [[analysis/course_vn|1. MindX — AI Agent Engineer]]
  - [[analysis/course_eng|A. Roadmap từng khóa AI Agent quốc tế]]
  - [[analysis/AI_AGENT_ROADMAP|🤖 AI Agent Mastery Roadmap: From No-Code to Engineer]]


## ⚙️ Core Architecture & Requirements
- [[web/page|1. Public Website — phần người ngoài nhìn thấy]]
- [[web/architecture|Architecture — Kiến trúc kỹ thuật Blueprint]]
- [[web/hard_notes|Hard Notes]]
- [[web/infrastructure|Infrastructure — Hạ tầng triển khai Blueprint]]
- [[web/page_function_matrix|Page Function Matrix — Blueprint]]
- [[web/security|Security — Bảo mật hệ thống Blueprint]]
- [[web/unified_database_schema|💎 Unified Database Schema - Blueprint Project]]


## 🖥️ Page Specifications

### 🌐 Public Website
*The public-facing pages, catalog, checkout, and informational hub.*
- **Main Hub Note:** [[web/page/website/home|Website Home Page]]
- **Design Guideline:** [[web/page/website/design|Website Design — Blueprint Mono / Dark Mono]]
- **All Pages:**
  - [[web/page/website/404|/404 — Trang không tìm thấy]]
  - [[web/page/website/500|/500 — Trang lỗi server]]
  - [[web/page/website/blog|/blog — Blog / Resources Hub]]
  - [[web/page/website/certificate|/certificate — Trang chứng chỉ]]
  - [[web/page/website/contact|/contact — Trang liên hệ]]
  - [[web/page/website/courses|/courses — Product Catalog Page]]
  - [[web/page/website/course-detail|/courses/[slug] — Trang chi tiết khóa học]]
  - [[web/page/website/maintenance|/maintenance — Trang bảo trì hệ thống]]
  - [[web/page/website/privacy|/privacy — Chính sách dữ liệu]]
  - [[web/page/website/projects|/projects — Trang dự án học viên]]
  - [[web/page/website/refund-policy|/refund-policy — Chính sách refund]]
  - [[web/page/website/terms|/terms — Điều khoản sử dụng]]
  - [[web/page/website/verify-certificate|/verify-certificate — Trang xác thực chứng chỉ]]


### 🎓 Student Portal
*The login-authenticated learning environment and student dashboard.*
- **Main Hub Note:** [[web/page/student/dashboard|Student Dashboard]]
- **Alignment Report:** [[web/page/student/dashboard-alignment-report|Dashboard Alignment Report - `/dashboard`]]
- **All Pages:**
  - [[web/page/student/assignments|/assignments — Legacy / Không ưu tiên MVP]]
  - [[web/page/student/checkout|/checkout/:courseSlug — Thanh toán khóa học]]
  - [[web/page/student/checkout-result|/checkout/success và /checkout/failed — Kết quả thanh toán]]
  - [[web/page/student/forgot-password|/forgot-password — Quên mật khẩu]]
  - [[web/page/student/learn-course|/learn/[course] — Trang học của một khóa]]
  - [[web/page/student/learn-lesson|/learn/[course]/[lesson] — Trang bài học]]
  - [[web/page/student/login|/login — Đăng nhập]]
  - [[web/page/student/my-certificates|/my-certificates — Chứng chỉ của tôi]]
  - [[web/page/student/my-courses|/my-courses — Khóa học của tôi]]
  - [[web/page/student/my-orders|/my-orders và /my-orders/:id — Đơn hàng của tôi]]
  - [[web/page/student/notifications|/notifications — Thông báo của tôi]]
  - [[web/page/student/profile|/profile — Hồ sơ cá nhân]]
  - [[web/page/student/register|/register — Đăng ký tài khoản]]
  - [[web/page/student/submit-project|/submit-project — Legacy / Không ưu tiên MVP]]


### 💼 Instructor Workspace
*The operational tools for course instructors to review assigned courses and grade submissions.*
- **Main Hub Note:** [[web/page/instructor/overview|Instructor Overview]]
- **All Pages:**
  - [[web/page/instructor/courses|/instructor/courses — Khóa được phân công]]
  - [[web/page/instructor/submissions|/instructor/submissions — Duyệt bài nộp]]


### 👑 Admin Dashboard
*The high-level administrative interface for manage courses, orders, certificates, and audits.*
- **Main Hub Note:** [[web/page/admin/admin|Admin Overview]]
- **All Pages:**
  - [[web/page/admin/admin-overview|/admin — Admin Overview]]
  - [[web/page/admin/admin-announcements|/admin/announcements — Quản lý thông báo]]
  - [[web/page/admin/admin-audit-logs|/admin/audit-logs — Lịch sử thao tác]]
  - [[web/page/admin/admin-certificate-templates|/admin/certificate-templates — Quản lý template chứng chỉ]]
  - [[web/page/admin/admin-certificates|/admin/certificates — Quản lý chứng chỉ]]
  - [[web/page/admin/admin-coupons|/admin/coupons — Quản lý mã giảm giá]]
  - [[web/page/admin/admin-courses|/admin/courses — Quản lý khóa học]]
  - [[web/page/admin/admin-invoices|/admin/invoices — Quản lý biên nhận / hóa đơn]]
  - [[web/page/admin/admin-leads|/admin/leads — Quản lý Type B Leads]]
  - [[web/page/admin/admin-lessons|/admin/lessons — Quản lý module/bài học]]
  - [[web/page/admin/admin-orders|/admin/orders — Quản lý đơn hàng]]
  - [[web/page/admin/admin-payments|/admin/payments — Theo dõi giao dịch thanh toán]]
  - [[web/page/admin/admin-referrals|/admin/referrals — Future Quản lý referral]]
  - [[web/page/admin/admin-resources|/admin/resources — Quản lý Resources Hub]]
  - [[web/page/admin/admin-revenue|/admin/revenue — Future/P2 Dashboard doanh thu]]
  - [[web/page/admin/admin-reviews|/admin/reviews — Kiểm duyệt đánh giá khóa học]]
  - [[web/page/admin/admin-students|/admin/students — Quản lý học viên]]
  - [[web/page/admin/admin-submissions|/admin/submissions — Duyệt bài nộp]]
  - [[web/page/admin/admin-system-users|/admin/system/users — System Users]]


---

## 🏷️ System Tags
- #blueprint/moc
- #blueprint/index
- #blueprint/plan
- #blueprint/requirement
- #blueprint/course
- #blueprint/page/website
- #blueprint/page/student
- #blueprint/page/instructor
- #blueprint/page/admin
