# CORTEX Project Plan

## 1. Public Website

| Trang                                  | Yêu cầu chức năng cụ thể                                                                                                                                                                                                              |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| / Trang chủ                            | Hero với mascot Rubik 3D, problem/solution section, learning path, featured courses, project showcase, certificate preview, final CTA. Lấy dữ liệu từ courses, projects.                                                              |
| /courses Khóa học                      | Product catalog page: hiển thị 4 khóa chính (Free Workshop, Starter, Core, Advanced) dưới dạng card grid. Premium Mentoring và B2B Training hiển thị bằng section riêng. Không filter.                                                |
| /courses/[slug] Chi tiết khóa học      | Hero (level badge, tên, mô tả, thông tin nhanh), overview, who is this for, what you will learn, curriculum accordion, project output, certificate preview, pricing, FAQ, related courses, final CTA.                                 |
| /projects Dự án học viên               | Featured projects, project gallery (grid), category cards đơn giản, timeline quy trình làm project, related courses CTA. Projects là bảng độc lập, không tự động từ submissions. Hiển thị sample project nếu chưa có student project. |
| /certificate Chứng chỉ                 | Certificate preview, điều kiện nhận, giá trị sử dụng, giải thích Certificate ID/QR verify, CTA sang verify page.                                                                                                                      |
| /verify-certificate Xác thực chứng chỉ | Input Certificate ID, hiển thị kết quả valid/invalid/revoked (không hiển thị email/phone).                                                                                                                                            |
| /blog Resources Hub                    | Kho tài liệu: featured resources, resource categories, resource library, lead magnet section (form thu lead), latest articles, CTA sang khóa học.                                                                                     |
| /contact Liên hệ                       | Form (họ tên, email, phone/Zalo, nhu cầu học, ghi chú) lưu vào leads; hiển thị thông tin liên hệ; success message.                                                                                                                    |

## 2. Auth & Student Portal

| Trang                                  | Yêu cầu chức năng cụ thể                                                                                                                        |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| /login Đăng nhập                       | Cho đăng nhập bằng email/password hoặc Google; validate lỗi; sau đăng nhập chuyển student về /dashboard, admin về /admin.                       |
| /register Đăng ký                      | Form tạo tài khoản gồm họ tên, email, mật khẩu, số điện thoại; tạo user role student; kiểm tra email trùng; gửi xác thực email nếu có.          |
| /dashboard Dashboard học viên          | Hiển thị khóa đang học, % tiến độ, bài học tiếp theo, trạng thái project, trạng thái certificate; có nút "Tiếp tục học".                        |
| /my-courses Khóa học của tôi           | Hiển thị các khóa học viên đã đăng ký; mỗi khóa có tiến độ, trạng thái active/completed, ngày đăng ký; có nút vào học.                          |
| /order-history Lịch sử đơn hàng        | Xem danh sách các đơn hàng đã mua, trạng thái thanh toán, hóa đơn điện tử.                                                                      |
| /learn/[course] Trang học khóa         | Hiển thị danh sách module và lesson; đánh dấu đã học/chưa học; hiển thị tiến độ tổng khóa; chỉ cho xem nếu đã đăng ký khóa.                     |
| /learn/[course]/[lesson] Trang bài học | Hiển thị video/text/tài liệu; có nút hoàn thành bài; có nút bài trước/bài sau; lưu tiến độ vào lesson_progress.                                 |
| /assignments Bài tập/Project           | Hiển thị danh sách bài cần nộp; trạng thái pending/approved/rejected; hiển thị feedback từ admin; có nút nộp/chỉnh sửa bài nếu chưa duyệt.      |
| /submit-project Nộp project            | Form gồm tên project, mô tả, link demo, link source/file, công cụ đã dùng, bài học rút ra; lưu vào submissions; trạng thái mặc định là pending. |
| /my-certificates Chứng chỉ của tôi     | Hiển thị certificate đã nhận; có Certificate ID, tên khóa, ngày cấp, trạng thái; có nút tải PDF và nút mở verify link.                          |
| /profile Hồ sơ cá nhân                 | Cho xem/sửa họ tên, avatar, số điện thoại/Zalo; đổi mật khẩu; không cho tự sửa role.                                                            |

## 3. Admin Dashboard

| Trang                                 | Yêu cầu chức năng cụ thể                                                                                                               |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| /admin Admin Overview                 | Hiển thị tổng học viên, tổng khóa học, số bài nộp chờ duyệt, số certificate đã cấp, active enrollments; chỉ admin truy cập được.       |
| /admin/courses Quản lý khóa học       | Tạo/sửa/xóa/ẩn khóa học; nhập tên, slug, mô tả, level, giá, ảnh thumbnail, trạng thái draft/published.                                 |
| /admin/orders Quản lý đơn hàng        | Xem danh sách đơn hàng; lọc theo trạng thái (pending, paid, failed); xem chi tiết thanh toán.                                          |
| /admin/lessons Quản lý module/bài học | Tạo module theo khóa; tạo lesson trong module; nhập tiêu đề, video URL, nội dung, tài liệu, thứ tự hiển thị.                           |
| /admin/students Quản lý học viên      | Xem danh sách học viên; tìm kiếm theo tên/email; xem khóa đang học, tiến độ, ngày đăng ký; student detail drawer với enrollments.      |
| /admin/submissions Duyệt bài nộp      | Xem bài nộp (assignment/final project); mở demo/source; duyệt approved/rejected; viết feedback; trạng thái bài nộp.                    |
| /admin/certificates Quản lý chứng chỉ | Tạo certificate cho học viên đạt yêu cầu; tạo Certificate ID theo format `CERT-YYYYRRRR-NNNNNN`; cấp/tắt/revoke certificate; xuất PDF. |

## 4. Yêu cầu chức năng chung cho toàn hệ thống

| Nhóm           | Yêu cầu bắt buộc                                                                                                                |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Phân quyền     | Student không được vào admin; student chỉ xem khóa đã đăng ký; admin được quản lý toàn bộ.                                      |
| Course access  | Chưa đăng ký khóa thì không được vào trang học chi tiết. Ngoại trừ các khóa cấp độ 'Free' được mở công khai cho mọi người dùng. |
| Progress       | Khi học viên bấm hoàn thành bài, hệ thống lưu tiến độ theo user + lesson.                                                       |
| Completion     | Khóa chỉ hoàn thành khi đủ điều kiện: hoàn thành bài học + project được duyệt.                                                  |
| Certificate    | Chỉ admin hoặc hệ thống được cấp certificate; mỗi certificate có ID duy nhất.                                                   |
| Lead           | Mọi form đăng ký học thử/liên hệ phải lưu vào database.                                                                         |
| Validation     | Form bắt buộc kiểm tra email, số điện thoại, field trống, link project.                                                         |
| Responsive     | Tất cả trang phải dùng tốt trên desktop và mobile.                                                                              |
| Data Integrity | **Soft Delete**: Không xóa vĩnh viễn user, courses, lessons, orders, submissions; dùng `deleted_at`.                            |
| Audit Trail    | Mọi thay đổi quan trọng (cấp khóa, duyệt bài, cấp chứng chỉ) phải lưu `created_by`, `updated_by`.                               |
| Performance    | Tận dụng Composite Index cho các query lọc theo trạng thái (status) và định danh (ID).                                          |
