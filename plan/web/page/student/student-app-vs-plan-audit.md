---
categories:
  - "[[Projects]]"
  - "[[Blueprint]]"
  - "[[Blueprint Web]]"
  - "[[Requirements]]"
  - "[[Student Portal]]"
  - "[[Audit]]"
type: ["[[Audit Report]]"]
org: ["[[Blueprint]]"]
start: 2026-06-09
year: 2026
url: https://github.com/TanHongPhong/blueprint
status: "[[Draft]]"
---

# Student App vs Plan Audit

**Mục tiêu:** đối chiếu app thực tế trong `blueprint-lms-dashboard` với từng page spec của `plan/web/page/student`, để thấy rõ trang nào đã có, trang nào lệch plan, và trang nào trong plan hiện chưa được build trong app demo.

## 1. Phạm vi đối chiếu

**App thực tế được dùng làm baseline**

- `blueprint-lms-dashboard/src/App.tsx`
- Các component đang được mount từ `App.tsx`:
  - `DashboardView.tsx`
  - `MyCoursesView.tsx`
  - `LearnView.tsx`
  - `CertificatesView.tsx`
  - `OrdersView.tsx`
  - `NotificationsView.tsx`
  - `ProfileView.tsx`
  - `CourseHeader.tsx`
  - `CourseTabs.tsx`
  - `CourseContent.tsx`
  - `RightSidebar.tsx`

**Lưu ý quan trọng**

- App hiện tại là student portal demo/simulator, không phải full production app.
- App thực tế chỉ có một tập con route student:
  - `/dashboard`
  - `/my-courses`
  - `/learn/ai-agent-bootcamp`
  - `/learn/ai-agent-bootcamp/:lessonId`
  - `/my-certificates`
  - `/my-orders`
  - `/my-orders/:id`
  - `/notifications`
  - `/profile`
- Các route auth và checkout trong plan hiện **chưa xuất hiện** trong app demo này.
- Hai route legacy `/assignments` và `/submit-project` cũng **không xuất hiện**, và việc đó đúng với build decision hiện tại của plan.

## 2. Kết luận nhanh

App thực tế đang bám tốt vào phần lõi của student portal MVP:

1. Có dashboard học tiếp, notifications preview, current course, my courses, learn overview, learn lesson, certificates, orders, notifications và profile.
2. Rule quan trọng nhất của plan là assignment/final project đi qua `/learn/[course]/[lesson]` đang được app demo thể hiện đúng.
3. Tuy nhiên app thực tế vẫn là một prototype trải nghiệm:
   - nhiều trang dùng mock data cứng
   - thiếu auth flow
   - thiếu checkout flow standalone
   - thiếu các rule dữ liệu/quyền truy cập/empty state/error state ở mức nghiệp vụ thật

## 3. Bản đồ route app thực tế

| Route trong plan | Có trong app thực tế không | Ghi chú |
| --- | --- | --- |
| `/dashboard` | Có | Có view riêng |
| `/my-courses` | Có | Có view riêng |
| `/learn/[course]` | Có | Đang hardcode thành `/learn/ai-agent-bootcamp` |
| `/learn/[course]/[lesson]` | Có | Đang hardcode slug course |
| `/my-certificates` | Có | Có view riêng |
| `/my-orders` | Có | Có view riêng |
| `/my-orders/:id` | Có | Hiển thị trong cùng `OrdersView` |
| `/notifications` | Có | Có view riêng |
| `/profile` | Có | Có view riêng |
| `/login` | Không | Chưa build trong app demo |
| `/register` | Không | Chưa build trong app demo |
| `/forgot-password` | Không | Chưa build trong app demo |
| `/checkout/:courseSlug` | Không | Chưa build trong app demo |
| `/checkout/success` | Không | Chưa build trong app demo |
| `/checkout/failed` | Không | Chưa build trong app demo |
| `/assignments` | Không | Đúng với plan: legacy, không build |
| `/submit-project` | Không | Đúng với plan: legacy, không build |

## 4. Đối chiếu từng page spec

### 4.1 `/dashboard`

**App thực tế đang có**

- Hero welcome + CTA học tiếp
- Preview `Thông báo mới`
- Card `Khóa học hiện tại`
- Preview `Khóa học của tôi`
- Cụm card học tiếp / bài tập trong dashboard
- Điều hướng từ dashboard sang `learn`, `notifications`, `my-courses`, `orders`

**Khớp plan**

- Đúng vai trò “hôm nay tôi cần học gì tiếp?”
- Có CTA học tiếp
- Có preview notifications
- Có current course
- Có my courses preview
- CTA học tập đi vào flow `/learn/...`

**Khác / thiếu so với plan**

- Chưa phản ánh đầy đủ state machine nghiệp vụ cho assignment/final project như spec yêu cầu
- Chưa có `Certificate Status Card` đúng nghĩa trong baseline app
- Empty state trong spec chưa được thể hiện đầy đủ, nhất là no-course/no-certificate
- Logic dữ liệu vẫn là mock, chưa theo `enrollments`, `lesson_progress`, `submissions`, `certificates`

**Kết luận**

- Trang này **đã có và khá sát tinh thần plan**, nhưng spec chi tiết vẫn giàu nghiệp vụ hơn app demo.
- Có thể xem dashboard là trang gần đúng nhất giữa app và plan.

### 4.2 `/my-courses`

**App thực tế đang có**

- Danh sách khóa học dạng card
- Trạng thái `Đang học`, `Đã hoàn thành`, `Chưa học được`, `Hết hạn thẻ`
- Progress bar cho từng khóa
- CTA tiếp tục học hoặc hỗ trợ

**Khớp plan**

- Có danh sách khóa đã enrolled
- Có progress
- Có trạng thái khóa
- Có CTA để đi học tiếp
- Có thể hiện trường hợp active/completed/pending-like/expired-like

**Khác / thiếu so với plan**

- Route detail vẫn đang quay về lesson/course flow chung, chưa có data model thật từ `enrollments`, `courses`, `lesson_progress`
- Spec yêu cầu chỉ hiển thị khóa đã enrolled; app demo hiện hiển thị cả case “pending/chưa học được” và “expired” như dữ liệu giả lập
- Empty state chưa rõ như spec
- Chưa có rule chặn hiển thị khóa không thuộc user ngoài mock

**Kết luận**

- Trang này **đã có UI đúng hướng**, nhưng về nghiệp vụ vẫn là bản mock giàu trình diễn hơn là implementation theo spec dữ liệu.

### 4.3 `/learn/[course]`

**App thực tế đang có**

- Course header với breadcrumb, title, progress, CTA học tiếp
- Tabs:
  - `Nội dung khóa học`
  - `Thông tin khóa học`
  - `Announcements`
  - `Hỏi đáp`
- Accordion module/lesson
- Right sidebar với course info, bài tập/project, tiến độ tổng quan

**Khớp plan**

- Có course map / curriculum
- Có modules và lessons
- Có announcements
- Có Q&A
- Có progress và CTA đi vào lesson

**Khác / thiếu so với plan**

- Route đang hardcode một course duy nhất `ai-agent-bootcamp`, chưa phải slug động đúng nghĩa
- Dữ liệu announcements, Q&A, course info đều là mock
- Right sidebar bài tập/project mới là một block tĩnh, chưa sync submission state thật
- Review prompt/course reviews/certificate state trong spec chưa được triển khai rõ

**Kết luận**

- Trang này **đã có cấu trúc rất gần plan**, nhưng mới là demo cho một course cố định.

### 4.4 `/learn/[course]/[lesson]`

**App thực tế đang có**

- Breadcrumb từ course sang lesson
- Hiển thị lesson title, loại bài
- Chế độ bài giảng và chế độ assignment dùng chung trong một lesson view
- Có upload file, nhập mô tả, đính kèm link cho bài tập
- Có submit bài tập ngay trong lesson
- Có prev/next lesson

**Khớp plan**

- Rule lớn nhất của plan đang đúng:
  - assignment không có route riêng
  - final project/assignment nằm trong lesson flow
- Có xử lý nhiều loại lesson trong cùng khung học
- Có complete/submit/next flow ở mức demo

**Khác / thiếu so với plan**

- App đang coi `Quiz` như assignment ở một số chỗ, chưa tách rõ lesson type `video`, `resource`, `quiz`, `assignment`, `final_project`
- Chưa thấy state từ `submissions` như `pending`, `approved`, `revision_requested`, `rejected`
- Chưa có `video_assets`, `lesson_resources`, `quiz_attempts` thật; chủ yếu là mock
- Chưa có access control thật cho lesson locked ngoài simulation local

**Kết luận**

- Đây là trang **đúng hướng kiến trúc plan nhất** vì đã giữ assignment bên trong lesson.
- Điểm lệch lớn nhất nằm ở typing và state machine nghiệp vụ, không nằm ở layout chính.

### 4.5 `/my-certificates`

**App thực tế đang có**

- Danh sách chứng chỉ
- Certificate card với preview
- Mã chứng chỉ
- Trạng thái `issued` và `in_progress`
- CTA tải xuống, copy mã, share link verify

**Khớp plan**

- Có danh sách chứng chỉ đã cấp
- Có download/copy ID/verify intent
- Có distinction giữa chứng chỉ đã sẵn sàng và đang học

**Khác / thiếu so với plan**

- Dùng mock certificate list, chưa bám `certificates`, `certificate_templates`, `courses`
- Link verify đang là intent UX, chưa phải route verify thật trong app này
- Chưa thể hiện rõ revoked/not found/permission rule
- Tiêu đề trang đang thiên về “Chứng chỉ & Chứng nhận” trình diễn hơn spec student portal tối giản

**Kết luận**

- Trang này **đã có đầy đủ cảm giác sản phẩm**, nhưng vẫn thiếu phần dữ liệu/quy tắc cấp chứng chỉ đúng theo plan.

### 4.6 `/my-orders` và `/my-orders/:id`

**App thực tế đang có**

- Order list với filter theo trạng thái
- Order detail trong cùng view
- Có mã đơn, giá, payment method, transaction id, buyer info
- Có refund case
- Có invoice/download actions dạng mock

**Khớp plan**

- Có list và detail
- Có các status `paid`, `pending`, `failed`, `refunded`, `cancelled`
- Có payment transaction summary
- Có invoice/receipt intent
- Có hiển thị refund credit style

**Khác / thiếu so với plan**

- Detail chưa thật sự là route/page tách riêng mà là state trong cùng component
- Dữ liệu hoàn toàn mock, chưa có access rule thật `user_id = current_user.id`
- Chưa có retry flow gắn với checkout thật
- Chưa phân biệt rõ internal balance ledger với gateway refund ngoài level trình diễn

**Kết luận**

- Trang này **cover được nhiều nội dung spec nhất về mặt UI**, nhưng vẫn thiếu enforcement dữ liệu và flow payment thật.

### 4.7 `/notifications`

**App thực tế đang có**

- Header + unread count
- `Đánh dấu tất cả đã đọc`
- Filter tabs
- Notification list
- Click item mở modal detail rồi có thể điều hướng sang khu vực liên quan

**Khớp plan**

- Có inbox notification
- Có unread/read state
- Có mark all as read
- Có target navigation intent tới certificates, orders, learn, Q&A

**Khác / thiếu so với plan**

- App đang mở detail modal trước, không phải click là đi thẳng `target_url`
- Filter category khác wording plan
- Chưa có error state/retry state
- Chưa có data rule thật `notifications.user_id = current_user.id`
- Một số `targetMenu` đang điều hướng nội bộ app demo thay vì route thật

**Kết luận**

- Trang này **đã khá gần plan về hành vi**, chỉ khác ở cách mở detail và mức độ mock hóa dữ liệu.

### 4.8 `/profile`

**App thực tế đang có**

- Hồ sơ cá nhân
- Thông tin cá nhân
- Hồ sơ học tập
- Trạng thái tài khoản
- Đổi mật khẩu qua modal
- Hiển thị số dư nội bộ

**Khớp plan**

- Có personal info
- Có learning profile
- Có account information
- Có đổi mật khẩu
- Có mục liên quan số dư nội bộ như matrix yêu cầu

**Khác / thiếu so với plan**

- Có thêm các CTA như `Mua khóa học`, `Nạp tiền` mang tính demo, không được mô tả rõ trong page spec
- Một số field trong plan như certificate-accuracy intent có thể suy ra nhưng chưa được nói rõ trong UI
- Chưa có persistence/backend validation thật cho save profile và change password
- Chưa có rule lỗi cụ thể, ví dụ password policy ngoài mức kiểm tra confirm

**Kết luận**

- Đây là trang **khá sát spec**, chỉ đang giàu hiệu ứng và CTA demo hơn requirement gốc.

### 4.9 `/login`

**App thực tế**

- Không có route này trong app demo.

**So với plan**

- Plan yêu cầu build.
- App thực tế hiện chưa cover auth screen nào.

**Kết luận**

- **Thiếu hoàn toàn** trong app demo hiện tại.

### 4.10 `/register`

**App thực tế**

- Không có route này trong app demo.

**So với plan**

- Plan yêu cầu build.
- App thực tế chưa có form tạo tài khoản student.

**Kết luận**

- **Thiếu hoàn toàn** trong app demo hiện tại.

### 4.11 `/forgot-password`

**App thực tế**

- Không có route này trong app demo.

**So với plan**

- Plan yêu cầu build.
- App thực tế chưa có forgot/reset password flow độc lập.

**Kết luận**

- **Thiếu hoàn toàn** trong app demo hiện tại.

### 4.12 `/checkout/:courseSlug`

**App thực tế**

- Không có standalone checkout route.
- Các CTA “Mua khóa học” trong app đang dẫn về khu vực orders/navigation demo, không phải checkout thật.

**So với plan**

- Plan yêu cầu một route checkout standalone, không dùng student shell/sidebar.
- Có QR payment panel, webhook-only confirmation, coupon/referral, order summary.

**Kết luận**

- **Thiếu hoàn toàn** trong app demo hiện tại.

### 4.13 `/checkout/success` và `/checkout/failed`

**App thực tế**

- Không có các route result page này.

**So với plan**

- Plan yêu cầu route standalone riêng sau checkout.

**Kết luận**

- **Thiếu hoàn toàn** trong app demo hiện tại.

### 4.14 `/assignments`

**App thực tế**

- Không có route này.

**So với plan**

- Plan hiện chốt route này là legacy, không build MVP/P1.

**Kết luận**

- **Đang đúng với plan** vì route này không nên tồn tại trong app MVP/P1.

### 4.15 `/submit-project`

**App thực tế**

- Không có route này.

**So với plan**

- Plan hiện chốt route này là legacy, không build MVP/P1.

**Kết luận**

- **Đang đúng với plan** vì route này không nên tồn tại trong app MVP/P1.

## 5. Các điểm lệch hệ thống lớn nhất

### A. App demo mới cover student learning shell, chưa cover auth và commerce shell

- Có student portal sau login
- Chưa có login/register/forgot-password
- Chưa có checkout standalone
- Chưa có checkout result standalone

### B. App đang hardcode một course slug duy nhất

- Plan mô tả route động `/learn/[course]`
- App thực tế chỉ có `/learn/ai-agent-bootcamp`

Điều này ổn cho demo, nhưng chưa phải implementation đúng nghĩa route spec.

### C. App bám đúng quyết định bỏ route assignment/project riêng

Đây là điểm khớp rất quan trọng:

- Không có `/assignments`
- Không có `/submit-project`
- Assignment nằm trong lesson view

### D. App dùng mock state nhiều hơn rule nghiệp vụ thật

Các trang đang hiển thị rất tốt về UX, nhưng thiếu:

- access control thật
- backend validation thật
- data fetching thật
- empty/error/loading state theo nghiệp vụ thật
- state machine chuẩn cho `submissions`, `orders`, `certificates`, `notifications`

## 6. Kết luận chốt

Nếu lấy `blueprint-lms-dashboard` làm baseline app thực tế hiện tại, thì có thể chốt như sau:

1. **Đã có và tương đối sát plan:** `/dashboard`, `/my-courses`, `/learn/[course]`, `/learn/[course]/[lesson]`, `/my-certificates`, `/my-orders`, `/notifications`, `/profile`
2. **Chưa có trong app demo nhưng plan yêu cầu build:** `/login`, `/register`, `/forgot-password`, `/checkout/:courseSlug`, `/checkout/success`, `/checkout/failed`
3. **Không có và điều đó đúng với plan:** `/assignments`, `/submit-project`

Nói ngắn gọn:

- App thực tế hiện là một **student portal learning demo khá hoàn chỉnh về mặt trải nghiệm học**.
- Plan tổng thể thì rộng hơn app demo hiện tại vì còn bao gồm **auth flow** và **commerce/checkout flow standalone**.
- Phần khớp tốt nhất giữa app và plan là **học tiếp trong course/lesson**.
- Phần thiếu lớn nhất là **auth + checkout + data/business rules thật**.

## 🗺️ Obsidian Meta

### Tags

- #blueprint/audit
- #blueprint/page/student
- #blueprint/student-portal

### Navigation

- **Breadcrumbs:** [[BLUEPRINT_PLAN_MOC|Plan Home]] / [[web/page|Requirements]] / [[web/page/student/dashboard|Student Portal]]

### Relations

- **Outgoing Links:** [[web/page/student/dashboard|/dashboard — Trang tổng quan học viên]], [[web/page/student/my-courses|/my-courses — Khóa học của tôi]], [[web/page/student/learn-course|/learn/[course] — Trang tổng quan khóa học]], [[web/page/student/learn-lesson|/learn/[course]/[lesson] — Trang bài học]], [[web/page/student/my-certificates|/my-certificates — Chứng chỉ của tôi]], [[web/page/student/my-orders|/my-orders và /my-orders/:id — Đơn hàng của tôi]], [[web/page/student/notifications|/notifications — Thông báo của tôi]], [[web/page/student/profile|/profile — Hồ sơ cá nhân]], [[web/page/student/checkout|/checkout/:courseSlug — Thanh toán khóa học]], [[web/page/student/checkout-result|/checkout/success và /checkout/failed — Kết quả thanh toán]]
- **Incoming Links (Backlinks):** *None*
