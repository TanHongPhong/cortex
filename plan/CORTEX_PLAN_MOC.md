---
categories:
  - "[[Projects]]"
  - "[[cortex.ai]]"
  - "[[cortex.ai Web]]"
  - "[[MOC]]"
type: ["[[MOC]]"]
org: ["[[cortex.ai]]"]
start: 2026-06-02
year: 2026
url: https://github.com/TanHongPhong/cortex
status: "[[Planned]]"
---

# 🗺️ CORTEX Plan Map of Content (MOC)

Welcome to the CORTEX Product Plan & Specifications Dashboard. This Map of Content serves as the central hub for navigating the entire architecture, course roadmaps, and page specs.

---

## 🧭 System Audits & Roadmaps
- **System Audit:** [[PLAN_CONFLICT_AUDIT|Plan Conflict Audit - CORTEX Requirements]]
- **Course Roadmaps & Details:**
  - [[analysis/course_vn|1. MindX — AI Agent Engineer]]
  - [[analysis/course_eng|A. Roadmap từng khóa AI Agent quốc tế]]
  - [[analysis/AI_AGENT_ROADMAP|🤖 AI Agent Mastery Roadmap: From No-Code to Engineer]]


## ⚙️ Core Architecture & Requirements
- [[web/page|1. Public Website — phần người ngoài nhìn thấy]]
- [[web/architecture|Architecture — Kiến trúc kỹ thuật CORTEX]]
- [[web/hard_notes|Hard Notes]]
- [[web/infrastructure|Infrastructure — Hạ tầng triển khai CORTEX]]
- [[web/page_function_matrix|Page Function Matrix — CORTEX]]
- [[web/security|Security — Bảo mật hệ thống CORTEX]]
- [[web/unified_database_schema|💎 Unified Database Schema - CORTEX Project]]


## 🖥️ Page Specifications

### 🌐 Public Website
*The public-facing pages, catalog, checkout, and informational hub.*
- **Main Hub Note:** [[web/page/website/home|Website Home Page]]
- **All Pages:**
  - [[web/page/website/404|/404 — Trang không tìm thấy]]
  - [[web/page/website/500|/500 — Trang lỗi server]]
  - [[web/page/website/blog|/blog — Blog / Resources Hub]]
  - [[web/page/website/certificate|/certificate — Trang chứng chỉ]]
  - [[web/page/website/contact|/contact — Trang liên hệ]]
  - [[web/page/website/courses|/courses — Product Catalog Page]]
  - [[web/page/website/course-detail|/courses/slug — Trang chi tiết khóa học]]
  - [[web/page/website/maintenance|/maintenance — Trang bảo trì hệ thống]]
  - [[web/page/website/privacy|/privacy — Chính sách dữ liệu]]
  - [[web/page/website/projects|/projects — Trang dự án học viên]]
  - [[web/page/website/refund-policy|/refund-policy — Chính sách refund]]
  - [[web/page/website/terms|/terms — Điều khoản sử dụng]]
  - [[web/page/website/verify-certificate|/verify-certificate — Trang xác thực chứng chỉ]]


### 🎓 Student Portal
*The login-authenticated learning environment and student dashboard.*
- **Main Hub Note:** [[web/page/student/dashboard|Student Dashboard]]
- **All Pages:**
  - [[web/page/student/assignments|/assignments — Legacy / Không ưu tiên MVP]]
  - [[web/page/student/checkout|/checkout/:courseSlug — Thanh toán khóa học]]
  - [[web/page/student/checkout-result|/checkout/success và /checkout/failed — Kết quả thanh toán]]
  - [[web/page/student/coupon|/coupon — Coupon của tôi / Nhập mã giảm giá]]
  - [[web/page/student/forgot-password|/forgot-password — Quên mật khẩu]]
  - [[web/page/student/learn-course|/learn/course — Trang học của một khóa]]
  - [[web/page/student/learn-lesson|/learn/analysis/lesson — Trang bài học]]
  - [[web/page/student/login|/login — Đăng nhập]]
  - [[web/page/student/my-certificates|/my-certificates — Chứng chỉ của tôi]]
  - [[web/page/student/my-courses|/my-courses — Khóa học của tôi]]
  - [[web/page/student/my-orders|/my-orders và /my-orders/:id — Đơn hàng của tôi]]
  - [[web/page/student/notifications|/notifications — Thông báo của tôi]]
  - [[web/page/student/profile|/profile — Hồ sơ cá nhân]]
  - [[web/page/student/referral|/referral — Mã giới thiệu]]
  - [[web/page/student/register|/register — Đăng ký tài khoản]]
  - [[web/page/student/submit-project|/submit-project — Legacy / Không ưu tiên MVP]]


### 💼 Instructor Workspace
*The operational tools for course instructors to grade submissions and reply to Q&A.*
- **Main Hub Note:** [[web/page/instructor/overview|Instructor Overview]]
- **All Pages:**
  - [[web/page/instructor/courses|/instructor/courses — Khóa được phân công]]
  - [[web/page/instructor/questions|/instructor/questions — Trả lời Q&A]]
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
  - [[web/page/admin/admin-referrals|/admin/referrals — Quản lý referral]]
  - [[web/page/admin/admin-resources|/admin/resources — Quản lý Resources Hub]]
  - [[web/page/admin/admin-revenue|/admin/revenue — Dashboard doanh thu]]
  - [[web/page/admin/admin-reviews|/admin/reviews — Kiểm duyệt đánh giá khóa học]]
  - [[web/page/admin/admin-students|/admin/students — Quản lý học viên]]
  - [[web/page/admin/admin-submissions|/admin/submissions — Duyệt bài nộp]]
  - [[web/page/admin/admin-system-users-new|/admin/system/users/new — Hidden Staff Account Creation]]


---

## 🏷️ System Tags
- #cortex/moc
- #cortex/index
- #cortex/plan
- #cortex/requirement
- #cortex/course
- #cortex/page/website
- #cortex/page/student
- #cortex/page/instructor
- #cortex/page/admin
