---
categories:
  - "[[Projects]]"
  - "[[cortex.ai]]"
  - "[[cortex.ai Web]]"
  - "[[Requirements]]"
type: ["[[Technical Specification]]"]
org: ["[[cortex.ai]]"]
start: 2026-06-02
year: 2026
url: https://github.com/TanHongPhong/cortex
status: "[[Planned]]"
---

# 1. Public Website — phần người ngoài nhìn thấy

## `/` Trang chủ

**Mục tiêu:** làm người mới hiểu CORTEX là gì và bấm đăng ký.

| Khu vực             | Nên làm như nào                                                                                                 |
| ------------------- | --------------------------------------------------------------------------------------------------------------- |
| Hero section        | Có headline mạnh, subheadline ngắn, mascot/visual Rubik 3D, 2 nút CTA: “Đăng ký học thử” và “Xem lộ trình học”. |
| Problem section     | Nêu vấn đề: người mới học AI bị rối, không biết bắt đầu, học tool rời rạc, không làm được sản phẩm.             |
| Solution section    | Giới thiệu CORTEX là nơi học AI thực chiến qua project.                                                         |
| Learning path       | Hiển thị 3–4 bước: AI Foundation → Vibe Coding → AI Agent → Portfolio Project.                                  |
| Featured courses    | Hiển thị 3 khóa nổi bật bằng card.                                                                              |
| Project showcase    | Show vài project mẫu/học viên để tăng niềm tin.                                                                 |
| Certificate preview | Có ảnh mẫu chứng chỉ, giải thích học xong nhận [[web/page/website/certificate|certificate]].                                                     |
| Final CTA           | Lặp lại nút đăng ký học thử/cuộc tư vấn.                                                                        |

**Nút chính:** `Đăng ký học thử`
**Dữ liệu cần lấy:** courses, [[web/page/website/projects|projects]], [[web/page/website/certificate|certificate]] preview, leads.

---

## `/courses` Trang danh sách khóa học

**Mục tiêu:** hiển thị bộ sản phẩm học AI của CORTEX, giúp người học chọn khóa phù hợp.

**Cấu trúc theo [[web/page/website/courses|website/courses.md]]:**

- Hiển thị **4 khóa chính** (Free Workshop, Starter Mini Course, Core Bootcamp, Advanced Automation) dưới dạng card grid.
- Phần **Premium Mentoring** và **B2B Training** tách riêng (không trong grid).
- Các section preview: “What you can learn”, “Projects you can build”, “Certificate preview”, FAQ, Final CTA.

| Khu vực    | Nên làm như nào                                                                            |
| ---------- | ------------------------------------------------------------------------------------------ |
| Header     | Tiêu đề: “Khóa học AI tại CORTEX”, subtitle giới thiệu 4 loại khóa.                        |
| Main cards | 4 card: Free/Starter/Core/Advanced, mỗi card có level badge, tên, mô tả ngắn, output, CTA. |
| Premium    | Section riêng: “1:1 Mentoring / Portfolio Coaching” với CTA đăng ký tư vấn.                |
| B2B        | Section riêng: “AI Training for Teams & Organizations” với CTA liên hệ B2B.                |
| CTA card   | Mỗi card có nút `Xem chi tiết` hoặc `Đăng ký ngay` theo loại khóa.                         |

**Nút chính:** `Xem chi tiết` (với Free Workshop thì là `Đăng ký workshop miễn phí`)
**Không nên:** Không cần search/filter vì số khóa ít (4–6). Không gộp Premium/B2B vào grid.

---

## `/courses/[slug]` Trang chi tiết khóa học

**Mục tiêu:** thuyết phục người xem đăng ký khóa đó.

**Cấu trúc theo [[web/page/website/course-detail|website/course-detail.md]]:**

- Course Hero: Level badge, tên khóa, mô tả ngắn, thông tin nhanh (duration, format, [[web/page/website/certificate|certificate]]), CTA chính, CTA phụ, visual.
- Course Overview: Khóa này là gì, vấn đề giải quyết, cách giúp, kết quả chính.
- Who is this for?: Đối tượng phù hợp.
- What you will learn: 6–7 điểm chính dạng icon grid.
- Curriculum / Modules: Accordion hiển thị module và lesson preview.
- Project Output: Nhấn mạnh project cuối khóa.
- Certificate Preview: Nếu khóa có [[web/page/website/certificate|certificate]].
- Pricing / Enrollment: Giá, bao gồm gì, CTA theo loại khóa.
- FAQ, Related Courses, Final CTA.

| Khu vực           | Nên làm như nào                                                         |
| ----------------- | ----------------------------------------------------------------------- |
| Course hero       | Level badge, tên khóa, mô tả ngắn, thời lượng, hình thức, [[web/page/website/certificate|certificate]].  |
| Who is this for   | Khóa này dành cho ai: sinh viên, người mới, người muốn làm project AI.  |
| Learning outcomes | Học xong làm được gì, ví dụ: tạo landing page, chatbot, AI workflow.    |
| Curriculum        | Danh sách module và lesson dạng accordion, có preview lesson.           |
| Project output    | Project cuối khóa học viên phải làm.                                    |
| Certificate       | Điều kiện nhận chứng chỉ (nếu khóa có).                                 |
| Pricing           | Giá theo loại: Free/Low/Main product/Higher/Custom.                     |
| FAQ ngắn          | Trả lời các câu hỏi: cần biết code không, học bao lâu, có hỗ trợ không. |
| Sticky CTA        | Desktop có nút đăng ký cố định bên phải hoặc cuối trang.                |

**Nút chính:** CTA thay đổi theo loại khóa:

- Free Workshop → `Đăng ký workshop miễn phí`
- Starter → `Đăng ký mini course` hoặc dẫn `/checkout/:courseSlug`
- Core → `Đăng ký Bootcamp` hoặc dẫn `/checkout/:courseSlug`
- Advanced → `Nhận tư vấn khóa nâng cao`
- Premium → `Đăng ký mentoring 1:1`
- B2B → `Liên hệ đào tạo đội nhóm`

**Quan trọng:** trang này phải bán được, không chỉ liệt kê bài học. CTA phải đúng với loại khóa.

---

## `/projects` Trang dự án học viên

**Mục tiêu:** chứng minh học xong làm được sản phẩm thật.

**Cấu trúc theo [[web/page/website/projects|website/projects.md]]:**

- Featured Projects: 3–4 project nổi bật.
- Project Gallery: Grid hiển thị nhiều project.
- Project Categories: 5 category cards (Vibe Coding Website, AI Assistant, Workflow Automation, Business AI Agent, Portfolio Project).
- How students build [[web/page/website/projects|projects]]: Timeline 6 bước.
- Related Courses CTA: Dẫn sang khóa học liên quan.
- Final CTA.

| Khu vực              | Nên làm như nào                                                                     |
| -------------------- | ----------------------------------------------------------------------------------- |
| Project grid         | Hiển thị project dạng card, có ảnh, tên, mô tả, category, khóa liên quan.           |
| Project card         | Có badge `Sample Project` (nếu là mẫu) hoặc `Student Project`.                      |
| Project detail/modal | Bấm vào xem mô tả chi tiết, link demo, link source nếu public.                      |
| Category             | Dùng category tabs đơn giản: Website, AI Assistant, Automation, Chatbot, Portfolio. |
| Empty state          | Giai đoạn đầu dùng project mẫu của academy, không fake student project.             |

**Nút chính:** `Xem demo`
**Lưu ý:** Giai đoạn đầu chưa có học viên, hiển thị rõ "Sample Project by CORTEX".

---

## `/certificate` Trang chứng chỉ

**Mục tiêu:** giải thích [[web/page/website/certificate|certificate]] có ý nghĩa gì và điều kiện nhận.

| Khu vực             | Nên làm như nào                                                                        |
| ------------------- | -------------------------------------------------------------------------------------- |
| Certificate preview | Hiển thị mẫu [[web/page/website/certificate|certificate]] đẹp, có tên học viên, khóa học, ngày cấp, Certificate ID, QR. |
| Điều kiện nhận      | Hoàn thành bài học + nộp project + được duyệt.                                         |
| Giá trị sử dụng     | Có thể đưa vào CV, portfolio, LinkedIn, nhưng không phải văn bằng chính quy.           |
| Verify explanation  | Giải thích người khác có thể kiểm tra chứng chỉ bằng ID/QR.                            |

**Nút chính:** `Xác thực chứng chỉ`
**Cần rõ:** [[web/page/website/certificate|certificate]] là **Certificate of Completion**, không nên gọi quá đà như bằng cấp chính thức.

---

## `/verify-certificate` Trang xác thực chứng chỉ

**Mục tiêu:** kiểm tra chứng chỉ thật hay giả.

| Khu vực        | Nên làm như nào                                               |
| -------------- | ------------------------------------------------------------- |
| Search box     | Cho nhập Certificate ID.                                      |
| Result valid   | Hiển thị: tên học viên, tên khóa, ngày cấp, trạng thái valid. |
| Result invalid | Báo không tìm thấy chứng chỉ.                                 |
| Result revoked | Báo chứng chỉ đã bị thu hồi nếu có.                           |

**Nút chính:** `Verify`
**Không nên hiển thị:** email, số điện thoại, dữ liệu cá nhân nhạy cảm.

---

## `/blog` Blog / Resources Hub

**Mục tiêu:** kéo traffic và tạo niềm tin chuyên môn, đóng vai trò là kho tài liệu học AI.

**Cấu trúc theo [[web/page/website/blog|website/blog.md]]:**

- Page Header: Giới thiệu kho tài liệu (Resources Hub).
- Featured Resources: 3–4 tài liệu quan trọng (Roadmap, Checklist, Prompt Pack).
- Resource Categories: AI Basics, Prompting, Vibe Coding, AI Agent, Automation, Career & Portfolio, Tool Guides.
- Resource Library: Danh sách toàn bộ tài liệu/bài viết dạng card.
- Lead Magnet Section: Thu lead từ tài liệu miễn phí (Yêu cầu email/Zalo để tải).
- Latest Articles: 3–6 bài mới nhất.
- CTA sang khóa học.

| Khu vực     | Nên làm như nào                                                                            |
| ----------- | ------------------------------------------------------------------------------------------ |
| Blog list   | Danh sách tài liệu dạng card, có tag type (Article, Roadmap, Template, Guide) và category. |
| Category    | Category chips cho phép lọc nhanh theo chủ đề.                                             |
| Blog detail | Có tiêu đề, mục lục, nội dung, ảnh, CTA cuối bài, hỗ trợ SEO.                              |
| Lead magnet | Form thu lead khi tải tài liệu giá trị cao.                                                |

**Nút chính:** `Tải tài liệu miễn phí` hoặc `Đăng ký học thử`.
**Tên hiển thị:** Resources Hub.

---

## `/contact` Trang liên hệ

**Mục tiêu:** thu lead.

| Khu vực       | Nên làm như nào                                          |
| ------------- | -------------------------------------------------------- |
| Contact form  | Họ tên, email, số điện thoại/Zalo, nhu cầu học, ghi chú. |
| Contact info  | Email, fanpage, Zalo, địa chỉ nếu có.                    |
| Success state | Sau khi gửi form, báo “CORTEX đã nhận thông tin”.        |
| Admin link    | Dữ liệu form phải vào [[web/page/admin/admin|admin]] leads.                       |

**Nút chính:** `Gửi thông tin`.

---

## `/privacy` Chính sách dữ liệu

**Mục tiêu:** giải thích cách CORTEX thu thập, dùng và bảo vệ dữ liệu user/lead.

| Khu vực | Requirement |
| ------- | ----------- |
| Data collected | Email, họ tên, phone/Zalo, nhu cầu học, order, learning progress. |
| Consent | Form lead phải yêu cầu đồng ý chính sách dữ liệu qua `leads.consent_privacy_policy`. |
| Data use | Tư vấn học tập, vận hành khóa học, order/payment, [[web/page/website/certificate|certificate]] verification. |
| Sensitive data | Không public email/phone/payment payload. |

---

## `/terms` Điều khoản sử dụng

**Mục tiêu:** đặt rule về tài khoản, quyền học, nội dung khóa và [[web/page/website/certificate|certificate]].

| Khu vực | Requirement |
| ------- | ----------- |
| Account | Login chỉ bằng email/password; user chịu trách nhiệm bảo mật tài khoản. |
| Course access | Paid course yêu cầu enrollment active; refund/cancel có thể khóa quyền học. |
| Certificate | Certificate là Certificate of Completion, không phải văn bằng chính quy. |
| Content | Không chia sẻ trái phép video/resource paid course. |

---

## `/refund-policy` Chính sách refund

**Mục tiêu:** giải thích refund trong MVP/P1 là credit nội bộ vào số dư tài khoản.

| Khu vực | Requirement |
| ------- | ----------- |
| Refund result | Admin mark refunded sẽ cộng tiền vào `users.account_balance`. |
| Withdrawal | User muốn rút tiền liên hệ `/contact?type=support`; không có self-service withdrawal. |
| Admin reset | Sau khi xử lý rút tiền offline, [[web/page/admin/admin|admin]] tạo ledger reset balance về `0`. |
| Learning access | Refund mặc định chuyển enrollment liên quan sang `cancelled`. |

---

## `/checkout/:courseSlug` Thanh toán khóa học

**Mục tiêu:** cho user đã đăng nhập mua một khóa đơn, tạo order pending và xử lý thanh toán/coupon/referral.

| Khu vực              | Nên làm như nào                                                                       |
| -------------------- | ------------------------------------------------------------------------------------- |
| Course summary       | Hiển thị `course_title_snapshot`, giá, thời lượng, [[web/page/website/certificate|certificate]].                       |
| Coupon/referral      | Cho nhập mã, validate backend, hiển thị số tiền giảm.                                 |
| Billing form         | Họ tên, email, phone, địa chỉ, công ty, mã số thuế, yêu cầu hóa đơn.                  |
| Payment method       | Thanh toán online qua Momo hoặc VNPay, ghi nhận bằng `payment_transactions`.           |
| Gateway redirect     | Tạo transaction pending rồi chuyển user sang cổng thanh toán.                          |
| Order summary        | Giá gốc, discount, final amount, currency.                                            |
| Success/error states | Sau submit chuyển `/checkout/success` hoặc `/checkout/failed` tùy kết quả thanh toán. |

**Rule dữ liệu:** tạo `orders` với snapshot khóa học ngay khi [[web/page/student/checkout|checkout]] bắt đầu. Không sửa snapshot sau khi order đã paid.

---

## `/checkout/success` Thanh toán thành công

**Mục tiêu:** xác nhận đơn đã thanh toán thành công qua Momo/VNPay sau khi gateway callback/webhook hợp lệ.

| Khu vực      | Nên làm như nào                                                |
| ------------ | -------------------------------------------------------------- |
| Result       | Hiển thị trạng thái order: paid, failed, cancelled hoặc pending gateway confirmation. |
| Order info   | Mã đơn, khóa học, số tiền, phương thức thanh toán.             |
| Next action  | Nếu paid: `Vào học`; nếu pending: `Xem đơn hàng`; nếu failed/cancelled: thử lại. |
| Data [[web/page/website/privacy|privacy]] | Không hiển thị payload thanh toán nhạy cảm.                    |

---

## `/checkout/failed` Thanh toán lỗi/hủy

**Mục tiêu:** cho user biết thanh toán chưa thành công và cách thử lại.

| Khu vực     | Nên làm như nào                                      |
| ----------- | ---------------------------------------------------- |
| Error state | Báo thanh toán thất bại/hủy.                         |
| Retry CTA   | `Thử thanh toán lại` dẫn về [[web/page/student/checkout|checkout]] hoặc order.     |
| Support CTA | `Liên hệ hỗ trợ` dẫn `/contact?type=support` nếu gateway timeout hoặc lệch trạng thái quá lâu. |

---

# 2. Student Portal — phần học viên đăng nhập

## `/login` Đăng nhập

**Mục tiêu:** cho học viên/admin vào đúng hệ thống.

| Khu vực         | Nên làm như nào                               |
| --------------- | --------------------------------------------- |
| Login form      | Email + password.                             |
| Forgot password | Link đặt lại mật khẩu.                        |
| Role redirect   | Student vào `/dashboard`, instructor vào `/instructor`, `course_editor` vào `/admin/courses`, [[web/page/admin/admin|admin]] vào `/admin`. |

**Cần có:** validate lỗi sai mật khẩu/email không tồn tại.
**Không build:** Google OAuth và email verification trong MVP/P1.

---

## `/register` Đăng ký tài khoản

**Mục tiêu:** tạo tài khoản học viên.

| Khu vực       | Nên làm như nào                                    |
| ------------- | -------------------------------------------------- |
| Register form | Họ tên, email, password, số điện thoại.            |
| Validation    | Kiểm tra email trùng, password đủ mạnh.            |
| Default role  | Tài khoản mới mặc định là `student`.               |
| Success       | Tạo xong chuyển về [[web/page/student/dashboard|dashboard]] hoặc trang đăng nhập. |

**Không cho user tự chọn role.**

---

## `/dashboard` Dashboard học viên

**Mục tiêu:** học viên vào là biết học tiếp cái gì.

| Khu vực            | Nên làm như nào                       |
| ------------------ | ------------------------------------- |
| Welcome card       | “Chào mừng trở lại, [Tên]”.           |
| Current course     | Khóa đang học gần nhất.               |
| Progress           | % hoàn thành khóa.                    |
| Next lesson        | Bài học tiếp theo.                    |
| Project status     | Chưa nộp / Đang chờ duyệt / Đã duyệt. |
| Certificate status | Chưa đủ điều kiện / Có thể tải.       |
| Notification preview | Thông báo mới: bài được duyệt, [[web/page/website/certificate|certificate]], announcement, Q&A. |

**Nút chính:** `Tiếp tục học`.

---

## `/notifications` Thông báo của tôi

**Mục tiêu:** học viên xem in-app notification và đi thẳng tới việc cần xử lý.

| Khu vực        | Nên làm như nào                                             |
| -------------- | ----------------------------------------------------------- |
| Notification list | Hiển thị title, body, type, thời gian, trạng thái read/unread. |
| Filters        | All, unread, course, payment, submission, [[web/page/website/certificate|certificate]].      |
| Actions        | Mark as read, mark all read, mở `target_url`.              |
| Empty state    | Nếu chưa có thông báo, hiển thị hướng dẫn học tiếp.        |
| Permission     | Chỉ xem notification có `user_id = current_user.id`.        |

**Rule:** notification là delivery cá nhân. Announcement vẫn là nguồn nội dung riêng.

---

## `/my-courses` Khóa học của tôi

**Mục tiêu:** xem tất cả khóa đã đăng ký.

| Khu vực      | Nên làm như nào                            |
| ------------ | ------------------------------------------ |
| Course list  | Danh sách khóa học viên đang có quyền học. |
| Progress bar | Hiển thị % hoàn thành từng khóa.           |
| Status       | Active, completed, expired nếu có.         |
| CTA          | Nút “Vào học”.                             |

**Rule:** chỉ hiện khóa học viên đã đăng ký/enrolled.

---

## `/my-orders` Lịch sử đơn hàng

**Mục tiêu:** học viên xem các đơn đã tạo, trạng thái thanh toán, biên nhận/hóa đơn.

| Khu vực      | Nên làm như nào                                                 |
| ------------ | --------------------------------------------------------------- |
| Order list   | Mã đơn, khóa học snapshot, final amount, status, created_at.    |
| Status       | pending, paid, failed, refunded, cancelled.                     |
| Actions      | Xem chi tiết, tải biên nhận nếu có, thanh toán lại nếu pending. |
| Privacy rule | Chỉ xem được order có `user_id = current_user.id`.              |

---

## `/my-orders/:id` Chi tiết đơn hàng

**Mục tiêu:** hiển thị chi tiết một order, payment history và invoice/receipt.

| Khu vực              | Nên làm như nào                                           |
| -------------------- | --------------------------------------------------------- |
| Order information    | Order code, status, payment_status, created/paid/refund.  |
| Course snapshot      | Tên khóa và giá tại thời điểm mua.                        |
| Billing information  | Thông tin billing user đã nhập.                           |
| Payment transactions | Danh sách giao dịch, provider, amount, status.            |
| Invoice/receipt      | Link tải nếu đã tạo.                                      |

---

## `/learn/[course]` Trang học của một khóa

**Mục tiêu:** xem toàn bộ nội dung khóa.

| Khu vực       | Nên làm như nào                                 |
| ------------- | ----------------------------------------------- |
| Course header | Tên khóa, tiến độ tổng, mô tả ngắn.             |
| Module list   | Các module dạng accordion.                      |
| Lesson status | Bài đã học có dấu check, bài chưa học để trống. |
| Locked lesson | Nếu cần học theo thứ tự, khóa bài chưa mở.      |
| Announcements | Thông báo mới của khóa học nếu có.              |
| Review prompt | Nếu học viên đã học đủ điều kiện, mời review khóa học. |

**Nút chính:** `Học tiếp bài gần nhất`.

---

## `/learn/[course]/[lesson]` Trang bài học

**Mục tiêu:** học bài và lưu tiến độ.

| Khu vực         | Nên làm như nào                             |
| --------------- | ------------------------------------------- |
| Lesson content  | Video hoặc text bài học.                    |
| Resource        | Link tải tài liệu, prompt, file mẫu nếu có. |
| Quiz area       | Nếu `lesson_type = quiz`, hiển thị câu hỏi và kết quả. |
| Q&A             | Thread hỏi đáp theo lesson.                 |
| Sidebar         | Danh sách lesson cùng khóa.                 |
| Complete button | Nút “Đánh dấu hoàn thành”.                  |
| Navigation      | Bài trước / Bài tiếp theo.                  |

**Rule:** khi bấm hoàn thành, lưu vào `lesson_progress`. Quiz required chỉ hoàn thành khi có `quiz_attempts.passed = true`. Q&A chỉ cho enrolled student xem/tạo.

---

## `/assignments` Bài tập / Project (legacy / không ưu tiên)

**Mục tiêu cũ:** học viên xem và nộp bài.

**Quyết định mới:** không build route này trong MVP nếu đã triển khai lesson type `assignment` và `final_project`.

| Khu vực         | Nên làm như nào                             |
| --------------- | ------------------------------------------- |
| Assignment list | Danh sách bài tập/project theo khóa.        |
| Status          | Not submitted, pending, approved, rejected. |
| Feedback        | Hiển thị nhận xét [[web/page/admin/admin|admin]] nếu có.             |
| CTA             | Nộp bài hoặc chỉnh sửa nếu chưa được duyệt. |

**Rule hiện tại:** tất cả bài tập/project mở trực tiếp tại `/learn/[course]/[lesson]`.

---

## `/submit-project` Nộp project (legacy / không ưu tiên)

**Mục tiêu cũ:** học viên gửi project cuối khóa.

**Quyết định mới:** không build route này trong MVP. Final project là một `lesson` có `lesson_type = final_project`.

| Khu vực      | Nên làm như nào                                      |
| ------------ | ---------------------------------------------------- |
| Form         | Tên project, mô tả, link demo, link source, ghi chú. |
| File upload  | Có thể để sau, trước mắt dùng link là đủ.            |
| Submit state | Sau khi gửi, status là `pending`.                    |
| Edit rule    | Cho sửa nếu bài chưa được approved.                  |

**Rule hiện tại:** form nộp project nằm tại `/learn/[course]/[lesson]`.

---

## `/my-certificates` Chứng chỉ của tôi

**Mục tiêu:** học viên xem/tải chứng chỉ.

| Khu vực          | Nên làm như nào                                 |
| ---------------- | ----------------------------------------------- |
| Certificate list | Danh sách chứng chỉ đã được cấp.                |
| Certificate card | Tên khóa, ngày cấp, Certificate ID, trạng thái. |
| Actions          | Tải PDF, mở link verify, copy Certificate ID.   |

---

## `/profile` Hồ sơ cá nhân

**Mục tiêu:** học viên quản lý thông tin cá nhân.

| Khu vực      | Nên làm như nào                                |
| ------------ | ---------------------------------------------- |
| Profile form | Họ tên, avatar, phone/Zalo.                    |
| Account info | Email, ngày tạo tài khoản.                     |
| Password     | Đổi mật khẩu.                                  |
| Security     | Không cho sửa role/email nếu chưa có xác thực. |

---

## `/referral` Mã giới thiệu (Future)

**Mục tiêu:** học viên xem mã giới thiệu, invite link, conversion và reward.

| Khu vực                | Nên làm như nào                                             |
| ---------------------- | ----------------------------------------------------------- |
| My [[web/page/student/referral|referral]] code       | Hiển thị mã và nút copy invite link.                        |
| Reward rule            | Giải thích người được giới thiệu giảm gì, người giới thiệu nhận gì. |
| Successful referrals   | Danh sách conversion đã paid/approved.                      |
| Pending rewards        | Reward pending/approved/issued/cancelled.                   |
| Abuse prevention       | Không cho user tự dùng mã của chính mình.                   |

---

# 3. Admin Dashboard — phần quản trị

## `/admin` Admin Overview

**Mục tiêu:** [[web/page/admin/admin|admin]] nhìn nhanh tình hình hệ thống.

| Khu vực             | Nên làm như nào                                                 |
| ------------------- | --------------------------------------------------------------- |
| KPI cards           | Học viên, khóa học, doanh thu, paid/pending orders, bài chờ duyệt, [[web/page/website/certificate|certificate]]. |
| Commerce alerts     | Pending orders, failed payments, invoice requested.             |
| Pending [[web/page/instructor/submissions|submissions]] | Bài đang chờ duyệt.                                             |
| Quick actions       | Tạo khóa, thêm lesson, duyệt bài, cấp [[web/page/website/certificate|certificate]].              |

---

## `/admin/orders` Quản lý đơn hàng

**Mục tiêu:** quản lý tiền, trạng thái thanh toán, export báo cáo và tạo enrollment sau khi paid.

| Khu vực             | Nên làm như nào                                                        |
| ------------------- | ---------------------------------------------------------------------- |
| KPI cards           | Revenue, paid orders, pending orders, refunded amount, [[web/page/student/coupon|coupon]] discount. |
| Filters             | Date range, status, course, payment method.                            |
| Order table         | Order code, customer, course snapshot, amount, discount, status.        |
| Order detail drawer | Billing, [[web/page/student/coupon|coupon]]/referral, transactions, invoice, enrollment status.     |
| Actions             | Xem giao dịch gateway, cancel pending order, refund to balance, create invoice. |

**Rule:** order paid tạo enrollment idempotent, không tạo trùng.

---

## `/admin/coupons` Quản lý mã giảm giá

**Mục tiêu:** tạo, sửa, tạm dừng, theo dõi hiệu quả [[web/page/student/coupon|coupon]].

| Khu vực      | Nên làm như nào                                             |
| ------------ | ----------------------------------------------------------- |
| KPI cards    | Active coupons, redemptions, revenue, discount given.       |
| Coupon table | Code, type, value, scope, usage, dates, status.             |
| Form         | Basic info, discount rule, usage rule, applicability, stack. |
| Safety       | Không hard delete [[web/page/student/coupon|coupon]] đã có redemption; dùng archived.   |

---

## `/admin/payments` Theo dõi giao dịch

**Mục tiêu:** xem từng `payment_transactions` và debug thanh toán.

| Khu vực      | Nên làm như nào                                                |
| ------------ | -------------------------------------------------------------- |
| Table        | Order code, provider, provider_transaction_id, amount, status. |
| Filters      | Provider, status, date range.                                  |
| Detail       | Raw payload, order link, webhook logs nếu có.                  |
| Safety       | Không sửa raw payload; chỉ tạo transaction điều chỉnh nếu cần. |

---

## `/admin/invoices` Quản lý biên nhận/hóa đơn

**Mục tiêu:** tạo và tải receipt/invoice từ order paid.

| Khu vực | Nên làm như nào                                        |
| ------- | ------------------------------------------------------ |
| Table   | Invoice code, order code, buyer, amount, status.       |
| Actions | Create, issue, cancel, download PDF.                   |
| Rule    | Dữ liệu lấy từ billing snapshot trên order.            |

---

## `/admin/referrals` Theo dõi [[web/page/student/referral|referral]] (Future)

**Mục tiêu:** quản lý mã giới thiệu, conversion và reward.

| Khu vực     | Nên làm như nào                                          |
| ----------- | -------------------------------------------------------- |
| Code table  | User, code, usage, reward rule, status.                  |
| Conversions | Referrer, referred user, order, reward status.           |
| Actions     | Pause code, approve/issue/cancel reward.                 |

---

## `/admin/revenue` Dashboard doanh thu (Future/P2)

**Mục tiêu:** báo cáo doanh thu sau khi dữ liệu order/payment ổn định.

| Khu vực | Nên làm như nào                                            |
| ------- | ---------------------------------------------------------- |
| KPI     | Revenue by month, by course, by payment method, [[web/page/student/coupon|coupon]] use. |
| Charts  | Ưu tiên sau MVP, không block [[web/page/student/checkout|checkout]]/admin orders.         |
| Export  | Dùng cùng filter với `/admin/orders`.                       |

---

## `/admin/announcements` Quản lý thông báo

**Mục tiêu:** [[web/page/admin/admin|admin]] tạo thông báo global hoặc theo khóa học.

| Khu vực | Nên làm như nào |
| ------- | --------------- |
| Table | Title, scope, course, priority, status, published_at. |
| Form | Scope global/course, title, content, priority, publish time. |
| Actions | Save draft, publish, archive. |
| Rule | Publish announcement tạo [[web/page/student/notifications|`notifications`]] cho đúng người nhận. |

---

## `/admin/reviews` Kiểm duyệt đánh giá khóa học

**Mục tiêu:** kiểm soát review/rating trước khi public.

| Khu vực | Nên làm như nào |
| ------- | --------------- |
| Table | Course, student, rating, title, status, created_at. |
| Filters | Course, rating, status. |
| Actions | Publish, hide, reject. |
| Rule | Chỉ review từ enrolled student mới hợp lệ. |

---

## `/admin/certificate-templates` Quản lý template chứng chỉ

**Mục tiêu:** tạo và kích hoạt template dùng để cấp [[web/page/website/certificate|certificate]].

| Khu vực | Nên làm như nào |
| ------- | --------------- |
| Template list | Name, course scope, version, status, preview. |
| Editor | Layout JSON hoặc form cấu hình placeholder. |
| Actions | Preview, activate, archive. |
| Rule | Certificate đã cấp giữ snapshot template, không render lại theo template mới. |

---

## `/admin/audit-logs` Lịch sử thao tác

**Mục tiêu:** xem log thao tác nhạy cảm để giảm rủi ro dữ liệu.

| Khu vực | Nên làm như nào |
| ------- | --------------- |
| Table | Actor, role, action, entity, created_at. |
| Filters | Actor, action, entity_type, date range. |
| Detail | Metadata JSON, IP nếu có. |
| Rule | Read-only, không sửa/xóa audit log qua UI thường. |

---

## `/admin/courses` Quản lý khóa học

**Mục tiêu:** tạo và chỉnh khóa học.

| Khu vực          | Nên làm như nào                                  |
| ---------------- | ------------------------------------------------ |
| Course table     | Tên khóa, level, giá, trạng thái, số học viên.   |
| Create/Edit form | Tên, slug, mô tả, thumbnail, giá, level, status. |
| Status           | Draft, published, archived.                      |
| Actions          | Xem, sửa, ẩn, xóa nếu chưa có học viên.          |

---

## `/admin/lessons` Quản lý module/bài học

**Mục tiêu:** xây nội dung học.

| Khu vực        | Nên làm như nào                                      |
| -------------- | ---------------------------------------------------- |
| Select course  | Chọn khóa cần chỉnh.                                 |
| Module manager | Tạo/sửa/xóa module.                                  |
| Lesson manager | Tạo lesson trong module.                             |
| Lesson form    | Title, video source, content, resource URL/file, quiz, thứ tự bài. |
| Drag/drop      | Nếu làm được thì cho kéo thả thứ tự lesson.          |

---

## `/admin/students` Quản lý học viên

**Mục tiêu:** theo dõi học viên.

| Khu vực        | Nên làm như nào                                                                   |
| -------------- | --------------------------------------------------------------------------------- |
| Student table  | Tên, email, phone, số khóa học, trạng thái.                                       |
| Search/filter  | Tìm theo tên/email.                                                               |
| Student detail | Xem [[web/page/student/profile|profile]], learning info, enrollments (có gán khóa), [[web/page/instructor/submissions|submissions]], certificates. |
| Actions        | Block/unblock, gán khóa trong detail drawer.                                      |

---

## `/admin/submissions` Duyệt bài nộp

**Mục tiêu:** duyệt project học viên.

| Khu vực           | Nên làm như nào                                |
| ----------------- | ---------------------------------------------- |
| Submission table  | Học viên, khóa, project, trạng thái, ngày nộp. |
| Submission detail | Xem mô tả, link demo, link source.             |
| Feedback box      | Admin viết nhận xét.                           |
| Actions           | Approve, reject, mark `revision_requested`.    |

**Rule:** project approved mới đủ điều kiện nhận [[web/page/website/certificate|certificate]].

---

## `/admin/certificates` Quản lý chứng chỉ

**Mục tiêu:** cấp và kiểm soát [[web/page/website/certificate|certificate]].

| Khu vực           | Nên làm như nào                                       |
| ----------------- | ----------------------------------------------------- |
| Certificate table | Certificate ID, học viên, khóa, ngày cấp, trạng thái. |
| Issue [[web/page/website/certificate|certificate]] | Chọn học viên + khóa đủ điều kiện để cấp.             |
| PDF generation    | Tạo file [[web/page/website/certificate|certificate]] từ template.                     |
| Actions           | View, download, revoke, copy verify link.             |

**Rule:** Certificate ID phải unique, không trùng.

---

# 4. Instructor Workspace — phần giảng viên (Chuyên trách chấm bài & hỗ trợ học viên)

**Nguyên tắc phân quyền:**
- **Admin** quản lý vận hành hệ thống: học viên, gán khóa, announcement, tài chính, phân quyền và audit.
- **Course editor** chỉ chỉnh nội dung khóa học trong `/admin/courses*` và `/admin/lessons*`, gồm course content, module, lesson, resource, quiz và video asset.
- **Instructor** chỉ chấm bài (duyệt [[web/page/instructor/submissions|submissions]]) và hỗ trợ học viên (trả lời Q&A) trong khóa được phân công.
- Instructor KHÔNG được upload video, sửa lesson content, quản lý khóa/học viên, tạo announcement.

## `/instructor` Instructor Overview

**Mục tiêu:** instructor xem nhanh các việc cần xử lý trong khóa được phân công.

| Khu vực | Nên làm như nào |
| ------- | --------------- |
| KPI cards | Assigned courses, pending [[web/page/instructor/submissions|submissions]], open [[web/page/instructor/questions|questions]], unread [[web/page/student/notifications|notifications]]. |
| Queues | Bài chờ duyệt, câu hỏi chưa trả lời. |
| Permission | Chỉ thấy dữ liệu khóa được phân công. |
| Flags | Dựa trên `course_instructors`: `can_view_course`, `can_answer_questions`, `can_review_submissions`, `can_view_student_progress`. |

---

## `/instructor/courses` Khóa được phân công

**Mục tiêu:** instructor xem nội dung khóa và trạng thái học viên ở mức vận hành (read-only).

| Khu vực | Nên làm như nào |
| ------- | --------------- |
| Course list | Các khóa instructor được phân công. |
| Curriculum | Module/lesson **read-only**; instructor KHÔNG được sửa lesson content, upload video, hay quản lý khóa. |
| Student progress | Xem tiến độ học viên nếu `can_view_student_progress = true`. |
| Permission | Không xem commerce/revenue của khóa. Không tạo/sửa announcement. |

---

## `/instructor/submissions` Duyệt bài

**Mục tiêu:** instructor duyệt assignment/final project của khóa được phân công.

| Khu vực | Nên làm như nào |
| ------- | --------------- |
| Queue | Submission pending theo khóa/lesson. |
| Detail | Nội dung bài, link demo/source, lịch sử feedback. |
| Actions | Approve, reject, mark `revision_requested`. |
| Side effect | Tạo notification `submission_reviewed` cho học viên. |
| Permission | Chỉ xử lý nếu `can_review_submissions = true`; không cấp [[web/page/website/certificate|certificate]]. |

---

## `/instructor/questions` Trả lời Q&A

**Mục tiêu:** instructor xử lý câu hỏi lesson.

| Khu vực | Nên làm như nào |
| ------- | --------------- |
| Question queue | Open/answered/resolved theo khóa và lesson. |
| Thread | Xem câu hỏi và các reply. |
| Actions | Reply, mark resolved, hide nếu vi phạm. |
| Side effect | Tạo notification `question_answered` cho người hỏi. |
| Permission | Chỉ xử lý nếu `can_answer_questions = true`. |

**Rule tổng thể:**
- Instructor chỉ chấm bài và trả lời Q&A — không quản lý khóa học, video, học viên hay announcement.
- Instructor không có quyền vào order/payment/coupon/invoice/referral/revenue.
- Quản lý nội dung khóa (video, lesson, module) là quyền của [[web/page/admin/admin|admin]] hoặc `course_editor` trong `/admin/courses*` và `/admin/lessons*`; quản lý học viên vẫn là quyền của [[web/page/admin/admin|admin]].

---

# 5. Cách làm UI tổng thể cho toàn hệ thống

| Phần                | Nên làm                                                                             |
| ------------------- | ----------------------------------------------------------------------------------- |
| Public website      | Đẹp, nhiều visual, mascot, 3D, CTA rõ.                                              |
| Student portal      | Gọn, sạch, dễ học, ít hiệu ứng, tập trung nội dung.                                 |
| Instructor workspace | Gọn, chỉ tập trung chấm bài và trả lời câu hỏi. Không có quyền quản lý khóa/học viên/video.                    |
| Admin [[web/page/student/dashboard|dashboard]]     | Thực dụng, bảng dữ liệu rõ, filter/search mạnh.                                     |
| Mobile              | Public website phải đẹp trên mobile; student portal dùng ổn; [[web/page/admin/admin|admin]] ưu tiên desktop. |
| CTA                 | Mỗi trang chỉ nên có 1 hành động chính rõ ràng.                                     |
| Empty state         | Nếu chưa có khóa/project/certificate thì hiển thị hướng dẫn, không để trang trống.  |
| Loading/error state | Có trạng thái loading, lỗi, gửi thành công, không tìm thấy dữ liệu.                 |

---

## 🗺️ Obsidian Meta

### Tags
- #cortex/plan
- #cortex/requirement

### Navigation
- **Breadcrumbs:** [[CORTEX_PLAN_MOC|Plan Home]] / [[web/page|Requirements]]

### Relations
- **Outgoing Links:** [[web/page/admin/admin|Admin Dashboard — Requirement]], [[web/page/instructor/questions|/instructor/questions — Trả lời Q&A]], [[web/page/instructor/submissions|/instructor/submissions — Duyệt bài nộp]], [[web/page/student/checkout|/checkout/:courseSlug — Thanh toán khóa học]], [[web/page/student/coupon|/coupon — Coupon của tôi / Nhập mã giảm giá]], [[web/page/student/dashboard|/dashboard — Trang tổng quan học viên]], [[web/page/student/notifications|/notifications — Thông báo của tôi]], [[web/page/student/profile|/profile — Hồ sơ cá nhân]], [[web/page/student/referral|/referral — Mã giới thiệu]], [[web/page/website/blog|/blog — Blog / Resources Hub]], [[web/page/website/certificate|/certificate — Trang chứng chỉ]], [[web/page/website/course-detail|/courses/slug — Trang chi tiết khóa học]], [[web/page/website/courses|/courses — Product Catalog Page]], [[web/page/website/privacy|/privacy — Chính sách dữ liệu]], [[web/page/website/projects|/projects — Trang dự án học viên]]
- **Incoming Links (Backlinks):** [[analysis/course_vn|1. MindX — AI Agent Engineer]], [[web/architecture|Architecture — Kiến trúc kỹ thuật CORTEX]], [[web/hard_notes|Hard Notes]], [[web/page/admin/admin|Admin Dashboard — Requirement]], [[web/page/admin/admin-certificates|/admin/certificates — Quản lý chứng chỉ]], [[web/page/admin/admin-courses|/admin/courses — Quản lý khóa học]], [[web/page/admin/admin-leads|/admin/leads — Quản lý Type B Leads]], [[web/page/admin/admin-lessons|/admin/lessons — Quản lý module/bài học]], [[web/page/admin/admin-resources|/admin/resources — Quản lý Resources Hub]], [[web/page/admin/admin-reviews|/admin/reviews — Kiểm duyệt đánh giá khóa học]], [[web/page/admin/admin-system-users-new|/admin/system/users/new — Hidden Staff Account Creation]], [[web/page/student/dashboard|/dashboard — Trang tổng quan học viên]], [[web/page/student/learn-course|/learn/course — Trang học của một khóa]], [[web/page/student/learn-lesson|/learn/analysis/lesson — Trang bài học]], [[web/page/student/my-courses|/my-courses — Khóa học của tôi]], [[web/page/website/certificate|/certificate — Trang chứng chỉ]], [[web/page/website/contact|/contact — Trang liên hệ]], [[web/page/website/course-detail|/courses/slug — Trang chi tiết khóa học]], [[web/page/website/courses|/courses — Product Catalog Page]], [[web/page/website/home|Trang chủ / — Home Page]], [[web/page/website/maintenance|/maintenance — Trang bảo trì hệ thống]], [[web/page/website/privacy|/privacy — Chính sách dữ liệu]], [[web/page/website/projects|/projects — Trang dự án học viên]], [[web/page/website/refund-policy|/refund-policy — Chính sách refund]], [[web/page/website/terms|/terms — Điều khoản sử dụng]], [[web/page_function_matrix|Page Function Matrix — CORTEX]], [[web/unified_database_schema|💎 Unified Database Schema - CORTEX Project]]
