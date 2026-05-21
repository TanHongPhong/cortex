# CORTEX Project Plan

## 1. Public Website

| Trang                                  | Yêu cầu chức năng cụ thể                                                                                                                                                                    |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| / Trang chủ                            | Hiển thị hero, slogan, mascot/visual 3D, CTA đăng ký học thử; hiển thị khóa nổi bật; hiển thị learning path; hiển thị project/certificate ngắn; có form thu lead hoặc nút dẫn đến /contact. |
| /courses Khóa học                      | Hiển thị danh sách khóa học; mỗi khóa có ảnh, tên, mô tả ngắn, level, thời lượng, giá/trạng thái; có nút "Xem chi tiết"; hỗ trợ lọc theo level/chủ đề.                                      |
| /courses/[slug] Chi tiết khóa học      | Hiển thị tên khóa, mô tả, đối tượng học, đầu ra, lộ trình module/lesson, giá, certificate nhận được; có CTA đăng ký/mua khóa; cho xem preview bài học nếu có.                               |
| /projects Dự án học viên               | Hiển thị project mẫu/học viên; mỗi project có tên, mô tả, hình ảnh, công cụ sử dụng, link demo nếu có; có thể lọc theo loại project.                                                        |
| /certificate Chứng chỉ                 | Giới thiệu mẫu chứng chỉ; hiển thị điều kiện nhận certificate; giải thích Certificate ID, QR verify; có nút sang trang xác thực.                                                            |
| /verify-certificate Xác thực chứng chỉ | Cho nhập Certificate ID; kiểm tra trong database; trả về trạng thái valid/invalid/revoked; hiển thị tên học viên, khóa học, ngày cấp, mã chứng chỉ.                                         |
| /blog Blog/Resources                   | Hiển thị danh sách bài viết/tài nguyên; có danh mục chủ đề; có trang chi tiết bài viết; hỗ trợ SEO title, meta description, ảnh cover.                                                      |
| /contact Liên hệ                       | Form gồm họ tên, email, số điện thoại/Zalo, nhu cầu học, ghi chú; lưu vào bảng leads; hiển thị thông báo gửi thành công; admin xem được lead.                                               |

## 2. Auth & Student Portal

| Trang                                  | Yêu cầu chức năng cụ thể                                                                                                                   |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| /login Đăng nhập                       | Cho đăng nhập bằng email/password hoặc Google; validate lỗi; sau đăng nhập chuyển student về /dashboard, admin về /admin.                  |
| /register Đăng ký                      | Form tạo tài khoản gồm họ tên, email, mật khẩu, số điện thoại; tạo user role student; kiểm tra email trùng; gửi xác thực email nếu có.     |
| /dashboard Dashboard học viên          | Hiển thị khóa đang học, % tiến độ, bài học tiếp theo, trạng thái project, trạng thái certificate; có nút "Tiếp tục học".                   |
| /my-courses Khóa học của tôi           | Hiển thị các khóa học viên đã đăng ký; mỗi khóa có tiến độ, trạng thái active/completed, ngày đăng ký; có nút vào học.                     |
| /learn/[course] Trang học khóa         | Hiển thị danh sách module và lesson; đánh dấu đã học/chưa học; hiển thị tiến độ tổng khóa; chỉ cho xem nếu đã đăng ký khóa.                |
| /learn/[course]/[lesson] Trang bài học | Hiển thị video/text/tài liệu; có nút hoàn thành bài; có nút bài trước/bài sau; lưu tiến độ vào lesson_progress.                            |
| /assignments Bài tập/Project           | Hiển thị danh sách bài cần nộp; trạng thái pending/approved/rejected; hiển thị feedback từ admin; có nút nộp/chỉnh sửa bài nếu chưa duyệt. |
| /submit-project Nộp project            | Form gồm tên project, mô tả, link demo, link source/file nếu có; lưu vào submissions; trạng thái mặc định là pending.                      |
| /my-certificates Chứng chỉ của tôi     | Hiển thị certificate đã nhận; có Certificate ID, tên khóa, ngày cấp, trạng thái; có nút tải PDF và nút mở verify link.                     |
| /profile Hồ sơ cá nhân                 | Cho xem/sửa họ tên, avatar, số điện thoại/Zalo; đổi mật khẩu; không cho tự sửa role.                                                       |

## 3. Admin Dashboard

| Trang                                   | Yêu cầu chức năng cụ thể                                                                                                              |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| /admin Admin Overview                   | Hiển thị tổng lead, tổng học viên, tổng khóa học, số bài nộp chờ duyệt, số certificate đã cấp; chỉ admin truy cập được.               |
| /admin/courses Quản lý khóa học         | Tạo/sửa/xóa/ẩn khóa học; nhập tên, slug, mô tả, level, giá, ảnh thumbnail, trạng thái draft/published.                                |
| /admin/lessons Quản lý module/bài học   | Tạo module theo khóa; tạo lesson trong module; nhập tiêu đề, video URL, nội dung, tài liệu, thứ tự hiển thị.                          |
| /admin/students Quản lý học viên        | Xem danh sách học viên; tìm kiếm theo tên/email; xem khóa đang học, tiến độ, ngày đăng ký; mở profile học viên.                       |
| /admin/enrollments Quản lý đăng ký khóa | Gán khóa cho học viên; đổi trạng thái active/completed/cancelled; xem ngày đăng ký và ngày hoàn thành.                                |
| /admin/leads Quản lý lead               | Xem lead từ form; đổi trạng thái new/contacted/converted/lost; thêm ghi chú tư vấn; lọc theo trạng thái.                              |
| /admin/submissions Duyệt bài nộp        | Xem project học viên nộp; mở link demo/source; duyệt approved/rejected; viết feedback; cập nhật trạng thái bài nộp.                   |
| /admin/certificates Quản lý chứng chỉ   | Tạo certificate cho học viên đạt yêu cầu; tạo Certificate ID; cấp/tắt/revoke certificate; xuất PDF; quản lý trạng thái valid/revoked. |

## 4. Yêu cầu chức năng chung cho toàn hệ thống

| Nhóm          | Yêu cầu bắt buộc                                                                           |
| ------------- | ------------------------------------------------------------------------------------------ |
| Phân quyền    | Student không được vào admin; student chỉ xem khóa đã đăng ký; admin được quản lý toàn bộ. |
| Course access | Chưa đăng ký khóa thì không được vào trang học chi tiết.                                   |
| Progress      | Khi học viên bấm hoàn thành bài, hệ thống lưu tiến độ theo user + lesson.                  |
| Completion    | Khóa chỉ hoàn thành khi đủ điều kiện: hoàn thành bài học + project được duyệt.             |
| Certificate   | Chỉ admin hoặc hệ thống được cấp certificate; mỗi certificate có ID duy nhất.              |
| Lead          | Mọi form đăng ký học thử/liên hệ phải lưu vào database.                                    |
| Validation    | Form bắt buộc kiểm tra email, số điện thoại, field trống, link project.                    |
| Responsive    | Tất cả trang phải dùng tốt trên desktop và mobile.                                         |
