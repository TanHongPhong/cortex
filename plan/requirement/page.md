# 1. Public Website — phần người ngoài nhìn thấy

## `/` Trang chủ

**Mục tiêu:** làm người mới hiểu May Academy là gì và bấm đăng ký.

| Khu vực             | Nên làm như nào                                                                                                 |
| ------------------- | --------------------------------------------------------------------------------------------------------------- |
| Hero section        | Có headline mạnh, subheadline ngắn, mascot/visual Rubik 3D, 2 nút CTA: “Đăng ký học thử” và “Xem lộ trình học”. |
| Problem section     | Nêu vấn đề: người mới học AI bị rối, không biết bắt đầu, học tool rời rạc, không làm được sản phẩm.             |
| Solution section    | Giới thiệu May Academy là nơi học AI thực chiến qua project.                                                    |
| Learning path       | Hiển thị 3–4 bước: AI Foundation → Vibe Coding → AI Agent → Portfolio Project.                                  |
| Featured courses    | Hiển thị 3 khóa nổi bật bằng card.                                                                              |
| Project showcase    | Show vài project mẫu/học viên để tăng niềm tin.                                                                 |
| Certificate preview | Có ảnh mẫu chứng chỉ, giải thích học xong nhận certificate.                                                     |
| Final CTA           | Lặp lại nút đăng ký học thử/cuộc tư vấn.                                                                        |

**Nút chính:** `Đăng ký học thử`
**Dữ liệu cần lấy:** courses, projects, certificate preview, leads.

---

## `/courses` Trang danh sách khóa học

**Mục tiêu:** giúp người học chọn khóa phù hợp.

| Khu vực      | Nên làm như nào                                                                              |
| ------------ | -------------------------------------------------------------------------------------------- |
| Header       | Tiêu đề: “Chọn lộ trình học AI phù hợp với bạn”.                                             |
| Filter       | Lọc theo level: Beginner, Intermediate; lọc theo chủ đề: AI, Vibe Coding, Automation, Agent. |
| Course cards | Mỗi khóa có ảnh, tên, mô tả ngắn, level, thời lượng, giá, kết quả học được.                  |
| CTA card     | Nút “Xem chi tiết” và “Đăng ký học thử”.                                                     |

**Nút chính:** `Xem chi tiết`
**Không nên:** nhồi quá nhiều text vào card. Card chỉ nên ngắn, rõ, dễ so sánh.

---

## `/courses/[slug]` Trang chi tiết khóa học

**Mục tiêu:** thuyết phục người xem đăng ký khóa đó.

| Khu vực           | Nên làm như nào                                                         |
| ----------------- | ----------------------------------------------------------------------- |
| Course hero       | Tên khóa, mô tả ngắn, level, thời lượng, giá, CTA đăng ký.              |
| Who is this for   | Khóa này dành cho ai: sinh viên, người mới, người muốn làm project AI.  |
| Learning outcomes | Học xong làm được gì, ví dụ: tạo landing page, chatbot, AI workflow.    |
| Curriculum        | Danh sách module và lesson dạng accordion.                              |
| Project output    | Project cuối khóa học viên phải làm.                                    |
| Certificate       | Điều kiện nhận chứng chỉ.                                               |
| FAQ ngắn          | Trả lời các câu hỏi: cần biết code không, học bao lâu, có hỗ trợ không. |
| Sticky CTA        | Desktop có nút đăng ký cố định bên phải hoặc cuối trang.                |

**Nút chính:** `Đăng ký khóa học` hoặc `Đăng ký tư vấn`
**Quan trọng:** trang này phải bán được, không chỉ liệt kê bài học.

---

## `/projects` Trang dự án học viên

**Mục tiêu:** chứng minh học xong làm được sản phẩm thật.

| Khu vực              | Nên làm như nào                                                         |
| -------------------- | ----------------------------------------------------------------------- |
| Project grid         | Hiển thị project dạng card.                                             |
| Project card         | Có tên project, ảnh/demo, mô tả ngắn, kỹ năng dùng, tên khóa liên quan. |
| Project detail/modal | Bấm vào xem mô tả chi tiết, link demo, link source nếu public.          |
| Filter               | Lọc theo loại: Website, AI Agent, Automation, Chatbot, Portfolio.       |

**Nút chính:** `Xem demo`
**Giai đoạn đầu:** nếu chưa có học viên, dùng **project mẫu của academy**, đừng fake project học viên.

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

## `/blog` Blog / Resources

**Mục tiêu:** kéo traffic và tạo niềm tin chuyên môn.

| Khu vực     | Nên làm như nào                                          |
| ----------- | -------------------------------------------------------- |
| Blog list   | Danh sách bài viết dạng card.                            |
| Category    | AI Basics, Prompt, Vibe Coding, AI Agent, Career, Tools. |
| Blog detail | Có tiêu đề, mục lục, nội dung, ảnh, CTA cuối bài.        |
| Lead magnet | Một số tài liệu yêu cầu để lại email/Zalo để tải.        |

**Nút chính:** `Tải tài liệu miễn phí` hoặc `Đăng ký học thử`.

---

## `/contact` Trang liên hệ

**Mục tiêu:** thu lead.

| Khu vực       | Nên làm như nào                                          |
| ------------- | -------------------------------------------------------- |
| Contact form  | Họ tên, email, số điện thoại/Zalo, nhu cầu học, ghi chú. |
| Contact info  | Email, fanpage, Zalo, địa chỉ nếu có.                    |
| Success state | Sau khi gửi form, báo “May Academy đã nhận thông tin”.   |
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

| Khu vực             | Nên làm như nào                                                       |
| ------------------- | --------------------------------------------------------------------- |
| KPI cards           | Tổng lead, học viên, khóa học, bài nộp chờ duyệt, certificate đã cấp. |
| Recent leads        | Lead mới nhất.                                                        |
| Pending submissions | Bài đang chờ duyệt.                                                   |
| Quick actions       | Tạo khóa, thêm lesson, xem lead, cấp certificate.                     |

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

| Khu vực        | Nên làm như nào                                     |
| -------------- | --------------------------------------------------- |
| Student table  | Tên, email, phone, số khóa học, trạng thái.         |
| Search/filter  | Tìm theo tên/email, lọc theo khóa.                  |
| Student detail | Xem khóa đã đăng ký, tiến độ, project, certificate. |
| Actions        | Gán khóa, khóa tài khoản nếu cần.                   |

---

## `/admin/enrollments` Quản lý đăng ký khóa

**Mục tiêu:** gán khóa cho học viên.

| Khu vực          | Nên làm như nào                               |
| ---------------- | --------------------------------------------- |
| Enrollment table | Học viên, khóa học, trạng thái, ngày đăng ký. |
| Add enrollment   | Chọn học viên + chọn khóa để gán.             |
| Status           | Active, completed, cancelled.                 |
| Manual control   | Admin có thể đánh dấu hoàn thành nếu cần.     |

---

## `/admin/leads` Quản lý lead

**Mục tiêu:** xử lý người quan tâm.

| Khu vực         | Nên làm như nào                                   |
| --------------- | ------------------------------------------------- |
| Lead table      | Tên, phone/Zalo, email, nhu cầu, ngày gửi.        |
| Status pipeline | New, contacted, converted, lost.                  |
| Notes           | Admin thêm ghi chú tư vấn.                        |
| Actions         | Đổi trạng thái, tạo học viên từ lead nếu đã chốt. |

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
