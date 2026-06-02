# 🗺️ CORTEX Plan Map of Content (MOC)

Welcome to the CORTEX Product Plan & Specifications Dashboard. This Map of Content serves as the central hub for navigating the entire architecture, course roadmaps, and page specs.

---

## 🧭 System Audits & Roadmaps
- **System Audit:** [[PLAN_CONFLICT_AUDIT|Plan Conflict Audit - CORTEX Requirements]]
- **Course Roadmaps & Details:**
  - [[course/course_vn|1. MindX — AI Agent Engineer]]
  - [[course/course_eng|A. Roadmap từng khóa AI Agent quốc tế]]
  - [[course/AI_AGENT_ROADMAP|🤖 AI Agent Mastery Roadmap: From No-Code to Engineer]]


## ⚙️ Core Architecture & Requirements
- [[requirement/page|1. Public Website — phần người ngoài nhìn thấy]]
- [[requirement/architecture|Architecture — Kiến trúc kỹ thuật CORTEX]]
- [[requirement/hard_notes|Hard Notes]]
- [[requirement/infrastructure|Infrastructure — Hạ tầng triển khai CORTEX]]
- [[requirement/page_function_matrix|Page Function Matrix — CORTEX]]
- [[requirement/security|Security — Bảo mật hệ thống CORTEX]]
- [[requirement/unified_database_schema|💎 Unified Database Schema - CORTEX Project]]


## 🖥️ Page Specifications

### 🌐 Public Website
*The public-facing pages, catalog, checkout, and informational hub.*
- **Main Hub Note:** [[requirement/page/website/home|Website Home Page]]
- **All Pages:**
  - [[requirement/page/website/404|/404 — Trang không tìm thấy]]
  - [[requirement/page/website/500|/500 — Trang lỗi server]]
  - [[requirement/page/website/blog|/blog — Blog / Resources Hub]]
  - [[requirement/page/website/certificate|/certificate — Trang chứng chỉ]]
  - [[requirement/page/website/contact|/contact — Trang liên hệ]]
  - [[requirement/page/website/courses|/courses — Product Catalog Page]]
  - [[requirement/page/website/course-detail|/courses/slug — Trang chi tiết khóa học]]
  - [[requirement/page/website/maintenance|/maintenance — Trang bảo trì hệ thống]]
  - [[requirement/page/website/privacy|/privacy — Chính sách dữ liệu]]
  - [[requirement/page/website/projects|/projects — Trang dự án học viên]]
  - [[requirement/page/website/refund-policy|/refund-policy — Chính sách refund]]
  - [[requirement/page/website/terms|/terms — Điều khoản sử dụng]]
  - [[requirement/page/website/verify-certificate|/verify-certificate — Trang xác thực chứng chỉ]]


### 🎓 Student Portal
*The login-authenticated learning environment and student dashboard.*
- **Main Hub Note:** [[requirement/page/student/dashboard|Student Dashboard]]
- **All Pages:**
  - [[requirement/page/student/assignments|/assignments — Legacy / Không ưu tiên MVP]]
  - [[requirement/page/student/checkout|/checkout/:courseSlug — Thanh toán khóa học]]
  - [[requirement/page/student/checkout-result|/checkout/success và /checkout/failed — Kết quả thanh toán]]
  - [[requirement/page/student/coupon|/coupon — Coupon của tôi / Nhập mã giảm giá]]
  - [[requirement/page/student/forgot-password|/forgot-password — Quên mật khẩu]]
  - [[requirement/page/student/learn-course|/learn/course — Trang học của một khóa]]
  - [[requirement/page/student/learn-lesson|/learn/course/lesson — Trang bài học]]
  - [[requirement/page/student/login|/login — Đăng nhập]]
  - [[requirement/page/student/my-certificates|/my-certificates — Chứng chỉ của tôi]]
  - [[requirement/page/student/my-courses|/my-courses — Khóa học của tôi]]
  - [[requirement/page/student/my-orders|/my-orders và /my-orders/:id — Đơn hàng của tôi]]
  - [[requirement/page/student/notifications|/notifications — Thông báo của tôi]]
  - [[requirement/page/student/profile|/profile — Hồ sơ cá nhân]]
  - [[requirement/page/student/referral|/referral — Mã giới thiệu]]
  - [[requirement/page/student/register|/register — Đăng ký tài khoản]]
  - [[requirement/page/student/submit-project|/submit-project — Legacy / Không ưu tiên MVP]]


### 💼 Instructor Workspace
*The operational tools for course instructors to grade submissions and reply to Q&A.*
- **Main Hub Note:** [[requirement/page/instructor/overview|Instructor Overview]]
- **All Pages:**
  - [[requirement/page/instructor/courses|/instructor/courses — Khóa được phân công]]
  - [[requirement/page/instructor/questions|/instructor/questions — Trả lời Q&A]]
  - [[requirement/page/instructor/submissions|/instructor/submissions — Duyệt bài nộp]]


### 👑 Admin Dashboard
*The high-level administrative interface for manage courses, orders, certificates, and audits.*
- **Main Hub Note:** [[requirement/page/admin/admin|Admin Overview]]
- **All Pages:**
  - [[requirement/page/admin/admin-overview|/admin — Admin Overview]]
  - [[requirement/page/admin/admin-announcements|/admin/announcements — Quản lý thông báo]]
  - [[requirement/page/admin/admin-audit-logs|/admin/audit-logs — Lịch sử thao tác]]
  - [[requirement/page/admin/admin-certificate-templates|/admin/certificate-templates — Quản lý template chứng chỉ]]
  - [[requirement/page/admin/admin-certificates|/admin/certificates — Quản lý chứng chỉ]]
  - [[requirement/page/admin/admin-coupons|/admin/coupons — Quản lý mã giảm giá]]
  - [[requirement/page/admin/admin-courses|/admin/courses — Quản lý khóa học]]
  - [[requirement/page/admin/admin-invoices|/admin/invoices — Quản lý biên nhận / hóa đơn]]
  - [[requirement/page/admin/admin-leads|/admin/leads — Quản lý Type B Leads]]
  - [[requirement/page/admin/admin-lessons|/admin/lessons — Quản lý module/bài học]]
  - [[requirement/page/admin/admin-orders|/admin/orders — Quản lý đơn hàng]]
  - [[requirement/page/admin/admin-payments|/admin/payments — Theo dõi giao dịch thanh toán]]
  - [[requirement/page/admin/admin-referrals|/admin/referrals — Quản lý referral]]
  - [[requirement/page/admin/admin-resources|/admin/resources — Quản lý Resources Hub]]
  - [[requirement/page/admin/admin-revenue|/admin/revenue — Dashboard doanh thu]]
  - [[requirement/page/admin/admin-reviews|/admin/reviews — Kiểm duyệt đánh giá khóa học]]
  - [[requirement/page/admin/admin-students|/admin/students — Quản lý học viên]]
  - [[requirement/page/admin/admin-submissions|/admin/submissions — Duyệt bài nộp]]
  - [[requirement/page/admin/admin-system-users-new|/admin/system/users/new — Hidden Staff Account Creation]]


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
