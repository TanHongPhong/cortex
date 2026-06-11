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
start: 2026-06-08
year: 2026
url: https://github.com/TanHongPhong/blueprint
status: "[[Draft]]"
---

# Dashboard Alignment Report - `/dashboard`

**Mục tiêu:** đối chiếu giữa [[web/page/student/dashboard|page spec `/dashboard`]] và dashboard React hiện tại tại `blueprint-lms-dashboard/src/components/DashboardView.tsx`, từ đó chốt hướng chuẩn hóa spec theo UI đang chạy.

**Baseline đối chiếu**

- **Spec gốc:** [[web/page/student/dashboard|`plan/web/page/student/dashboard.md`]]
- **UI gốc:** `blueprint-lms-dashboard/src/components/DashboardView.tsx`
- **Nguyên tắc đánh giá:** ưu tiên câu hỏi "hôm nay tôi cần học gì tiếp?", kiểm tra điều hướng, cấu trúc block, và trạng thái học tập/chứng chỉ.

## Kết luận nhanh

Dashboard hiện tại đã bám đúng tinh thần sản phẩm ở các phần quan trọng nhất: chào mừng, tiếp tục học, current course, notifications preview, my courses preview, và luồng học đi thẳng vào lesson. Tuy vậy, spec hiện tại vẫn đang mô tả một dashboard thiên về các card nghiệp vụ tách biệt hơn so với UI đang chạy.

Hướng chuẩn hóa được chốt trong report này:

1. Lấy dashboard React hiện tại làm baseline giao diện và hành vi.
2. Chỉnh lại spec `/dashboard` để phản ánh đúng hero, preview cards, và rule điều hướng hiện tại.
3. Giữ lại ba yêu cầu từ spec gốc như backlog bổ sung cho dashboard:
   - `Certificate Status Card`
   - `Assignment / Final Project Status` đủ state machine
   - `Empty State` rõ ràng cho các trường hợp chính

## 1. Những gì dashboard hiện tại đã khớp plan

| Hạng mục | Plan | Dashboard hiện tại | Quyết định chuẩn hóa |
| --- | --- | --- | --- |
| Welcome + CTA học tiếp | Có `Welcome Card` và CTA `Tiếp tục học` | Có hero chào mừng và CTA `Tiếp tục học` | Giữ nguyên theo dashboard hiện tại |
| Notifications Preview | Có preview 3-5 thông báo và CTA `/notifications` | Có khối `Thông báo mới` và CTA `Xem tất cả` | Giữ nguyên, cập nhật wording spec theo UI hiện tại |
| Current Course | Có `Current Course Card` | Có card `Khóa học hiện tại` với tiến độ mini | Giữ block này trong spec |
| My Courses Preview | Có preview 2-3 khóa và CTA `/my-courses` | Có khối `Khóa học của tôi` dạng preview | Giữ nguyên |
| Next lesson intent | Có `Next Lesson Card` dẫn vào lesson tương ứng | Có cụm `Bài học & Bài tập cần làm` với next lesson | Giữ intent, chỉnh spec cho khớp cấu trúc UI |
| CTA học tập | CTA học tập đi qua `/learn/[course]/[lesson]` | `Tiếp tục học` và lesson CTA đều đi vào luồng learn | Giữ invariant này |
| Trọng tâm dashboard | Dashboard trả lời "hôm nay cần học gì tiếp?" | Hero, current course, next lesson đều ưu tiên điều đó | Giữ làm nguyên tắc cốt lõi của spec |

## 2. Những gì dashboard hiện tại nhiều hơn plan

| Hạng mục | Plan | Dashboard hiện tại | Quyết định chuẩn hóa |
| --- | --- | --- | --- |
| Hero visual | Plan chỉ mô tả welcome card chức năng | Hero có gradient, illustration, treatment đậm hơn | Giữ lại; spec nên mô tả là allowed presentation layer |
| CTA `Mua khóa học` trong hero | Không được nêu là CTA nổi bật | Có CTA mua khóa học ngay cạnh CTA học tiếp | Giữ lại như secondary commercial CTA |
| Learning momentum card | Không có block riêng | Có card `Giữ vững nhịp học tập` | Giữ như supporting card, không bắt buộc MVP |
| Gộp `Next Lesson` + `Homework` | Plan tách thành hai card `Next Lesson` và `Assignment / Final Project Status` | UI gộp thành cụm `Bài học & Bài tập cần làm` | Chấp nhận cấu trúc gộp này trong spec, miễn rule điều hướng đúng |
| Editorial polish | Plan thiên về wireframe nghiệp vụ | UI có treatment card/preview giàu cảm giác sản phẩm hơn | Không xem là lệch spec; chỉ cần không phá trọng tâm học tập |

## 3. Những gì plan có nhưng dashboard hiện tại còn thiếu hoặc chưa đủ

| Hạng mục | Plan | Dashboard hiện tại | Quyết định chuẩn hóa |
| --- | --- | --- | --- |
| Progress Card riêng biệt | Có `Progress Card` độc lập | Progress đang rải ở current course và course previews | **Có thể gộp vào block hiện tại** nếu spec chấp nhận progress embedded |
| Certificate Status Card | Có card trạng thái chứng chỉ rõ ràng | Chưa có block riêng trên dashboard | **Bắt buộc bổ sung** vào backlog dashboard |
| Assignment / Final Project Status state machine | Có đủ `not submitted/pending/approved/rejected` | Chỉ mới có homework intent, chưa đủ state nghiệp vụ | **Bắt buộc bổ sung** vào backlog dashboard |
| Empty State no-course | Có empty state rõ | Chưa có block empty state rõ trên dashboard | **Bắt buộc bổ sung** |
| Empty State no-assignment | Có empty state rõ | Chưa biểu đạt riêng | **Có thể gộp vào block hiện tại** |
| Empty State no-certificate | Có empty state rõ | Chưa có block chứng chỉ để chứa state này | **Future enhancement** sau khi có certificate status card |

## 4. Quyết định chuẩn hóa

### Spec update now

- Chuẩn hóa spec `/dashboard` theo dashboard React hiện tại ở các phần:
  - hero đầu trang
  - preview notifications
  - `Current Course`
  - `My Courses Preview`
  - CTA `Tiếp tục học`
- Viết lại rule điều hướng:
  - `Tiếp tục học` dẫn vào lesson hiện tại/lesson tiếp theo
  - `Current Course` và `My Courses Preview` từ dashboard dẫn về `/my-courses`
  - preview notifications dẫn về `/notifications`
- Cho phép spec mô tả `Next Lesson` và `Homework` dưới dạng một cụm kết hợp thay vì bắt buộc hai card tách rời.
- Bổ sung note rằng dashboard có thể chứa một supporting motivational card mà không làm lệch scope cốt lõi.

### Dashboard add next

- Bổ sung `Certificate Status Card` lên dashboard.
- Nâng cụm homework hiện tại thành trạng thái `Assignment / Final Project` đúng nghiệp vụ:
  - `not submitted`
  - `pending`
  - `approved`
  - `rejected`
- Thiết kế empty states rõ cho:
  - chưa có khóa học
  - chưa có assignment/final project cần làm
  - chưa có certificate

### Do not change

- Không kéo dashboard quay lại wireframe card thuần chức năng cũ.
- Không đưa lại route riêng cho assignment/project.
- Không đổi rule rằng CTA học tập đi vào `/learn/[course]/[lesson]`.

## 5. Đề xuất chỉnh lại page spec `/dashboard`

- Sửa phần `Layout tổng thể` để phản ánh dashboard hiện tại:
  - hero trên cùng
  - preview notifications
  - current course
  - cụm next lesson/homework
  - my courses preview
  - supporting motivational card
- Sửa phần `Current Course Card`:
  - card từ dashboard dẫn về `/my-courses`
  - lesson CTA mới là entry đi vào chi tiết học
- Sửa phần `Next Lesson Card` và `Assignment / Final Project Status Card`:
  - cho phép một cụm card kết hợp là implementation hợp lệ
  - nhưng phải giữ rule CTA và rule trạng thái theo lesson/submission
- Cập nhật `Acceptance Criteria` để phản ánh behavior đang chạy:
  - `Tiếp tục học` vào lesson đúng
  - `Khóa học của tôi` không dẫn nhầm sang course detail
  - notifications preview đi đúng `/notifications`

## 6. Checklist cho người sửa spec / triển khai tiếp

- [ ] Thêm link từ page spec `/dashboard` sang report alignment này
- [ ] Thêm link từ `BLUEPRINT_PLAN_MOC` sang report alignment này
- [ ] Đồng bộ `dashboard.md` theo các quyết định trong mục `Spec update now`
- [ ] Tạo backlog UI cho `Certificate Status Card`
- [ ] Tạo backlog UI cho `Assignment / Final Project Status` đủ state machine
- [ ] Bổ sung empty states chính vào dashboard implementation

## 🗺️ Obsidian Meta

### Tags

- #blueprint/audit
- #blueprint/page/student
- #blueprint/dashboard
- #blueprint/spec-alignment

### Navigation

- **Breadcrumbs:** [[BLUEPRINT_PLAN_MOC|Plan Home]] / [[web/page|Requirements]] / [[web/page/student/dashboard|Student Portal]]

### Relations

- **Outgoing Links:** [[web/page/student/dashboard|/dashboard — Trang tổng quan học viên]], [[web/page/student/my-courses|/my-courses — Khóa học của tôi]], [[web/page/student/notifications|/notifications — Thông báo của tôi]], [[web/page/student/my-certificates|/my-certificates — Chứng chỉ của tôi]]
- **Incoming Links (Backlinks):** [[BLUEPRINT_PLAN_MOC|Blueprint Plan Map of Content (MOC)]]
