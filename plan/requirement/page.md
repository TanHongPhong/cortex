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
| Certificate preview | Có ảnh mẫu chứng chỉ, giải thích học xong nhận certificate.                                                     |
| Final CTA           | Lặp lại nút đăng ký học thử/cuộc tư vấn.                                                                        |

**Nút chính:** `Đăng ký học thử`
**Dữ liệu cần lấy:** courses, projects, certificate preview, leads.

---

## `/courses` Trang danh sách khóa học

**Mục tiêu:** hiển thị bộ sản phẩm học AI của CORTEX, giúp người học chọn khóa phù hợp.

**Cấu trúc theo website/courses.md:**

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

**Cấu trúc theo website/course-detail.md:**

- Course Hero: Level badge, tên khóa, mô tả ngắn, thông tin nhanh (duration, format, certificate), CTA chính, CTA phụ, visual.
- Course Overview: Khóa này là gì, vấn đề giải quyết, cách giúp, kết quả chính.
- Who is this for?: Đối tượng phù hợp.
- What you will learn: 6–7 điểm chính dạng icon grid.
- Curriculum / Modules: Accordion hiển thị module và lesson preview.
- Project Output: Nhấn mạnh project cuối khóa.
- Certificate Preview: Nếu khóa có certificate.
- Pricing / Enrollment: Giá, bao gồm gì, CTA theo loại khóa.
- FAQ, Related Courses, Final CTA.

| Khu vực           | Nên làm như nào                                                         |
| ----------------- | ----------------------------------------------------------------------- |
| Course hero       | Level badge, tên khóa, mô tả ngắn, thời lượng, hình thức, certificate.  |
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
- Starter → `Đăng ký mini course`
- Core → `Đăng ký Bootcamp`
- Advanced → `Nhận tư vấn khóa nâng cao`
- Premium → `Đăng ký mentoring 1:1`
- B2B → `Liên hệ đào tạo đội nhóm`

**Quan trọng:** trang này phải bán được, không chỉ liệt kê bài học. CTA phải đúng với loại khóa.

---

## `/projects` Trang dự án học viên

**Mục tiêu:** chứng minh học xong làm được sản phẩm thật.

**Cấu trúc theo website/projects.md:**

- Featured Projects: 3–4 project nổi bật.
- Project Gallery: Grid hiển thị nhiều project.
- Project Categories: 5 category cards (Vibe Coding Website, AI Assistant, Workflow Automation, Business AI Agent, Portfolio Project).
- How students build projects: Timeline 6 bước.
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

**Mục tiêu:** giải thích certificate có ý nghĩa gì và điều kiện nhận.

| Khu vực             | Nên làm như nào                                                                        |
| ------------------- | -------------------------------------------------------------------------------------- |
| Certificate preview | Hiển thị mẫu certificate đẹp, có tên học viên, khóa học, ngày cấp, Certificate ID, QR. |
| Điều kiện nhận      | Hoàn thành bài học + nộp project + được duyệt.                                         |
| Giá trị sử dụng     | Có thể đưa vào CV, portfolio, LinkedIn, nhưng không phải văn bằng chính quy.           |
| Verify explanation  | Giải thích người khác có thể kiểm tra chứng chỉ bằng ID/QR.                            |

**Nút chính:** `Xác thực chứng chỉ`
**Cần rõ:** certificate là **Certificate of Completion**, không nên gọi quá đà như bằng cấp chính thức.

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

**Cấu trúc theo website/blog.md:**

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
| Admin link    | Dữ liệu form phải vào admin leads.                       |

**Nút chính:** `Gửi thông tin`.

---

# 2. Student Portal — phần học viên đăng nhập

## `/login` Đăng nhập

**Mục tiêu:** cho học viên/admin vào đúng hệ thống.

| Khu vực         | Nên làm như nào                               |
| --------------- | --------------------------------------------- |
| Login form      | Email + password.                             |
| Google login    | Có thể thêm để tiện.                          |
| Forgot password | Link đặt lại mật khẩu.                        |
| Role redirect   | Student vào `/dashboard`, admin vào `/admin`. |

**Cần có:** validate lỗi sai mật khẩu/email không tồn tại.

---

## `/register` Đăng ký tài khoản

**Mục tiêu:** tạo tài khoản học viên.

| Khu vực       | Nên làm như nào                                    |
| ------------- | -------------------------------------------------- |
| Register form | Họ tên, email, password, số điện thoại.            |
| Validation    | Kiểm tra email trùng, password đủ mạnh.            |
| Default role  | Tài khoản mới mặc định là `student`.               |
| Success       | Tạo xong chuyển về dashboard hoặc trang đăng nhập. |

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

**Nút chính:** `Tiếp tục học`.

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

## `/learn/[course]` Trang học của một khóa

**Mục tiêu:** xem toàn bộ nội dung khóa.

| Khu vực       | Nên làm như nào                                 |
| ------------- | ----------------------------------------------- |
| Course header | Tên khóa, tiến độ tổng, mô tả ngắn.             |
| Module list   | Các module dạng accordion.                      |
| Lesson status | Bài đã học có dấu check, bài chưa học để trống. |
| Locked lesson | Nếu cần học theo thứ tự, khóa bài chưa mở.      |

**Nút chính:** `Học tiếp bài gần nhất`.

---

## `/learn/[course]/[lesson]` Trang bài học

**Mục tiêu:** học bài và lưu tiến độ.

| Khu vực         | Nên làm như nào                             |
| --------------- | ------------------------------------------- |
| Lesson content  | Video hoặc text bài học.                    |
| Resource        | Link tải tài liệu, prompt, file mẫu nếu có. |
| Sidebar         | Danh sách lesson cùng khóa.                 |
| Complete button | Nút “Đánh dấu hoàn thành”.                  |
| Navigation      | Bài trước / Bài tiếp theo.                  |

**Rule:** khi bấm hoàn thành, lưu vào `lesson_progress`.

---

## `/assignments` Bài tập / Project

**Mục tiêu:** học viên xem và nộp bài.

| Khu vực         | Nên làm như nào                             |
| --------------- | ------------------------------------------- |
| Assignment list | Danh sách bài tập/project theo khóa.        |
| Status          | Not submitted, pending, approved, rejected. |
| Feedback        | Hiển thị nhận xét admin nếu có.             |
| CTA             | Nộp bài hoặc chỉnh sửa nếu chưa được duyệt. |

---

## `/submit-project` Nộp project

**Mục tiêu:** học viên gửi project cuối khóa.

| Khu vực      | Nên làm như nào                                      |
| ------------ | ---------------------------------------------------- |
| Form         | Tên project, mô tả, link demo, link source, ghi chú. |
| File upload  | Có thể để sau, trước mắt dùng link là đủ.            |
| Submit state | Sau khi gửi, status là `pending`.                    |
| Edit rule    | Cho sửa nếu bài chưa được approved.                  |

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

# 3. Admin Dashboard — phần quản trị

## `/admin` Admin Overview

**Mục tiêu:** admin nhìn nhanh tình hình hệ thống.

| Khu vực             | Nên làm như nào                                                 |
| ------------------- | --------------------------------------------------------------- |
| KPI cards           | Tổng học viên, khóa học, bài nộp chờ duyệt, certificate đã cấp. |
| Pending submissions | Bài đang chờ duyệt.                                             |
| Quick actions       | Tạo khóa, thêm lesson, duyệt bài, cấp certificate.              |

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
| Lesson form    | Title, video URL, content, resource URL, thứ tự bài. |
| Drag/drop      | Nếu làm được thì cho kéo thả thứ tự lesson.          |

---

## `/admin/students` Quản lý học viên

**Mục tiêu:** theo dõi học viên.

| Khu vực        | Nên làm như nào                                                                   |
| -------------- | --------------------------------------------------------------------------------- |
| Student table  | Tên, email, phone, số khóa học, trạng thái.                                       |
| Search/filter  | Tìm theo tên/email.                                                               |
| Student detail | Xem profile, learning info, enrollments (có gán khóa), submissions, certificates. |
| Actions        | Block/unblock, gán khóa trong detail drawer.                                      |

---

## `/admin/submissions` Duyệt bài nộp

**Mục tiêu:** duyệt project học viên.

| Khu vực           | Nên làm như nào                                |
| ----------------- | ---------------------------------------------- |
| Submission table  | Học viên, khóa, project, trạng thái, ngày nộp. |
| Submission detail | Xem mô tả, link demo, link source.             |
| Feedback box      | Admin viết nhận xét.                           |
| Actions           | Approve, reject, request revision.             |

**Rule:** project approved mới đủ điều kiện nhận certificate.

---

## `/admin/certificates` Quản lý chứng chỉ

**Mục tiêu:** cấp và kiểm soát certificate.

| Khu vực           | Nên làm như nào                                       |
| ----------------- | ----------------------------------------------------- |
| Certificate table | Certificate ID, học viên, khóa, ngày cấp, trạng thái. |
| Issue certificate | Chọn học viên + khóa đủ điều kiện để cấp.             |
| PDF generation    | Tạo file certificate từ template.                     |
| Actions           | View, download, revoke, copy verify link.             |

**Rule:** Certificate ID phải unique, không trùng.

---

# 4. Cách làm UI tổng thể cho toàn hệ thống

| Phần                | Nên làm                                                                             |
| ------------------- | ----------------------------------------------------------------------------------- |
| Public website      | Đẹp, nhiều visual, mascot, 3D, CTA rõ.                                              |
| Student portal      | Gọn, sạch, dễ học, ít hiệu ứng, tập trung nội dung.                                 |
| Admin dashboard     | Thực dụng, bảng dữ liệu rõ, filter/search mạnh.                                     |
| Mobile              | Public website phải đẹp trên mobile; student portal dùng ổn; admin ưu tiên desktop. |
| CTA                 | Mỗi trang chỉ nên có 1 hành động chính rõ ràng.                                     |
| Empty state         | Nếu chưa có khóa/project/certificate thì hiển thị hướng dẫn, không để trang trống.  |
| Loading/error state | Có trạng thái loading, lỗi, gửi thành công, không tìm thấy dữ liệu.                 |
