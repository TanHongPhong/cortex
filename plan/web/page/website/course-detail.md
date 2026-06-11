---
categories:
  - "[[Projects]]"
  - "[[Blueprint]]"
  - "[[Blueprint Web]]"
  - "[[Requirements]]"
  - "[[Public Website]]"
type: ["[[Page Spec]]"]
org: ["[[Blueprint]]"]
start: 2026-06-02
year: 2026
url: https://github.com/TanHongPhong/blueprint
status: "[[MVP]]"
---

# `/courses/[slug]` — Trang chi tiết khóa học

**Status:** MVP
**Owner area:** Public
**Source of truth:** `plan/web/page_function_matrix.md`, `plan/web/unified_database_schema.md`
**Build decision:** Build

## 1. Mục tiêu trang

| Mục tiêu            | Mô tả                                                                |
| ------------------- | -------------------------------------------------------------------- |
| Giải thích khóa học | Người xem hiểu khóa này dạy gì                                       |
| Thuyết phục đăng ký | Nêu rõ lợi ích, đầu ra, project, [[web/page/website/certificate|certificate]]                         |
| Giảm phân vân       | Trả lời: có phù hợp không, cần biết code không, học xong làm được gì |
| Chuyển đổi          | Dẫn tới đăng ký học thử, mua khóa, hoặc tư vấn                       |

---

# 2. Cấu trúc trang đề xuất

```text
/courses/[slug]

1. Course Hero
2. Course Overview
3. Who is this for?
4. What you will learn
5. Curriculum / Modules
6. Project Output
7. Certificate Preview
8. Pricing / Enrollment
9. Student Reviews
10. FAQ
11. Related Courses
12. Final CTA
```

---

# 3. Section 1 — Course Hero

**Mục đích:** người xem hiểu ngay khóa này là gì.

| Thành phần      | Yêu cầu                                              |
| --------------- | ---------------------------------------------------- |
| Level badge     | Free / Starter / Core / Advanced                     |
| Tên khóa        | Ví dụ: AI Agent & Vibe Coding Bootcamp               |
| Mô tả ngắn      | 2–3 dòng, nói rõ lợi ích chính                       |
| Thông tin nhanh | Thời lượng, hình thức học, level, [[web/page/website/certificate|certificate]]        |
| CTA chính       | `Đăng ký ngay` / `Tham gia workshop` / `Nhận tư vấn` |
| CTA phụ         | `Xem curriculum`                                     |
| Visual          | Ảnh khóa học, UI 3D hoặc preview project             |

**Ví dụ hero cho Core Bootcamp:**

```text
AI Agent & Vibe Coding Bootcamp

Học cách dùng AI để biến ý tưởng thành website, prototype, chatbot và workflow tự động — thông qua project thực chiến.
```

---

# 4. Section 2 — Course Overview

**Mục đích:** tóm tắt khóa học trong 1 màn hình.

| Nội dung           | Yêu cầu                                   |
| ------------------ | ----------------------------------------- |
| Khóa này là gì?    | Mô tả ngắn, dễ hiểu                       |
| Vấn đề giải quyết  | Người học đang gặp khó khăn gì            |
| Cách khóa học giúp | Học theo project, có hướng dẫn, có đầu ra |
| Kết quả chính      | 3–5 outcome cụ thể                        |

**UI nên làm:** card hoặc block 2 cột: bên trái mô tả, bên phải là thông tin nhanh.

---

# 5. Section 3 — Who is this for?

**Mục đích:** giúp người xem tự xác định có phù hợp không.

| Khóa          | Đối tượng phù hợp                                  |
| ------------- | -------------------------------------------------- |
| Free Workshop | Người mới muốn hiểu AI Agent/Vibe Coding là gì     |
| Starter       | Người mới muốn học prompt và AI tools cơ bản       |
| Core Bootcamp | Người muốn xây sản phẩm thật bằng AI               |
| Advanced      | Người muốn ứng dụng AI Agent vào workflow/business |

**UI:** 3–4 card nhỏ.

Ví dụ:

```text
Khóa này phù hợp nếu bạn:
- Muốn học AI nhưng chưa biết bắt đầu từ đâu
- Muốn tạo website/app prototype bằng AI
- Muốn xây chatbot hoặc workflow tự động
- Muốn có project để đưa vào portfolio
```

---

# 6. Section 4 — What you will learn

**Mục đích:** cho người học thấy nội dung chính, nhưng chưa cần quá chi tiết như curriculum.

| Nội dung học       | Mô tả ngắn                                            |
| ------------------ | ----------------------------------------------------- |
| Prompting          | Biết cách ra lệnh rõ, tạo output tốt                  |
| AI tools           | Biết dùng ChatGPT, Claude, Cursor hoặc tool liên quan |
| Vibe Coding        | Tạo website/prototype bằng AI                         |
| AI Agent           | Hiểu cách agent hoạt động và ứng dụng                 |
| Automation         | Tạo workflow tự động cho việc học/công việc           |
| Portfolio thinking | Biến sản phẩm học thành project có thể show           |

**UI:** icon grid 6 ô.

---

# 7. Section 5 — Curriculum / Modules

**Mục đích:** cho người xem biết khóa học gồm những phần nào.

| Thành phần     | Yêu cầu                              |
| -------------- | ------------------------------------ |
| Module list    | Hiển thị module dạng accordion       |
| Lesson preview | Mỗi module có vài lesson bên trong   |
| Duration       | Có thời lượng ước tính               |
| Locked content | Nội dung chi tiết chỉ mở khi đăng ký |

**Ví dụ module cho Core Bootcamp:**

| Module   | Nội dung                            |
| -------- | ----------------------------------- |
| Module 1 | AI workflow & prompting foundation  |
| Module 2 | Vibe Coding với AI tools            |
| Module 3 | Build landing [[web/page|page]]/prototype        |
| Module 4 | Build AI assistant/chatbot          |
| Module 5 | Automation workflow                 |
| Module 6 | Final project & portfolio packaging |

---

# 8. Section 6 — Project Output

**Mục đích:** nhấn mạnh học xong có sản phẩm thật.

| Thành phần          | Yêu cầu                                   |
| ------------------- | ----------------------------------------- |
| Project cuối khóa   | Nêu rõ học viên phải làm gì               |
| Output cụ thể       | Website, chatbot, automation, portfolio   |
| Tiêu chí hoàn thành | Có demo link, mô tả, workflow hoặc source |
| CTA                 | `Xem project mẫu`                         |

**Ví dụ:**

```text
Project cuối khóa:
Xây một AI-powered mini product, ví dụ landing [[web/page|page]] có AI workflow, chatbot hỗ trợ học tập, hoặc automation xử lý form → sheet → email.
```

---

# 9. Section 7 — Certificate Preview

**Mục đích:** tăng niềm tin và động lực hoàn thành.

| Thành phần        | Yêu cầu                                      |
| ----------------- | -------------------------------------------- |
| Certificate image | Ảnh mẫu chứng chỉ                            |
| Điều kiện nhận    | Hoàn thành lesson + nộp project + được duyệt |
| Certificate ID    | Có mã xác thực riêng                         |
| QR verify         | Dẫn tới `/verify-certificate`                |
| CTA               | `Tìm hiểu chứng chỉ`                         |

**Lưu ý:** ghi rõ là **Certificate of Completion**, không phải bằng cấp chính quy.

---

# 10. Section 8 — Pricing / Enrollment

**Mục đích:** chốt đăng ký.

| Thành phần    | Yêu cầu                                         |
| ------------- | ----------------------------------------------- |
| Giá           | Free / Low / Main product / Higher / Custom     |
| Bao gồm gì    | Bài học, project, tài liệu, hỗ trợ, [[web/page/website/certificate|certificate]] |
| Hình thức học | Online / live / self-paced / hybrid             |
| CTA           | Đăng ký, mua khóa, hoặc nhận tư vấn             |
| Trạng thái    | Open / Coming soon / Closed                     |

**CTA theo từng loại khóa:**

| Loại khóa     | CTA chính                   |
| ------------- | --------------------------- |
| Free Workshop | `Đăng ký workshop miễn phí` |
| Starter       | `Đăng ký mini course` → `/checkout/:courseSlug` |
| Core          | `Đăng ký Bootcamp` → `/checkout/:courseSlug` |
| Advanced      | `Nhận tư vấn khóa nâng cao` |
| Premium       | `Đăng ký mentoring 1:1`     |
| B2B           | `Liên hệ đào tạo đội nhóm`  |

---

# 11. Section 9 — Student Reviews

**Mục đích:** tăng niềm tin bằng review thật từ học viên đã enrolled.

| Thành phần | Yêu cầu |
| ---------- | ------- |
| Rating summary | Điểm trung bình và số review published. |
| Review cards | Tên học viên, rating, title, nội dung ngắn. |
| Empty state | Nếu chưa có review thật, ẩn section hoặc ghi “Review sẽ được cập nhật sau”. |
| Trust rule | Không fake review. Chỉ dùng `course_reviews.status = published`. |

---

# 12. Section 10 — FAQ

**Mục đích:** xử lý phản đối.

| Câu hỏi cần có                                       |
| ---------------------------------------------------- |
| Khóa này dành cho ai?                                |
| Em chưa biết code có học được không?                 |
| Học trong bao lâu?                                   |
| Có bài tập/project không?                            |
| Có chứng chỉ không?                                  |
| Sau khi đăng ký thì học như thế nào?                 |
| Nếu không phù hợp thì có được tư vấn đổi khóa không? |

---

# 13. Section 11 — Related Courses

**Mục đích:** nếu người xem chưa phù hợp khóa này, gợi ý khóa khác.

| Trường hợp             | Gợi ý                       |
| ---------------------- | --------------------------- |
| Đang xem Free Workshop | Gợi ý Starter hoặc Core     |
| Đang xem Starter       | Gợi ý Core Bootcamp         |
| Đang xem Core          | Gợi ý Advanced hoặc Premium |
| Đang xem Advanced      | Gợi ý B2B hoặc Premium      |

**UI:** 2–3 course cards nhỏ.

---

# 13. Section 11 — Final CTA

**Mục đích:** chốt lại hành động cuối trang.

| Thành phần | Yêu cầu                               |
| ---------- | ------------------------------------- |
| Headline   | Nhắc lại lợi ích chính                |
| Subtext    | Học thực chiến, có project, có hỗ trợ |
| CTA chính  | Theo loại khóa                        |
| CTA phụ    | `Nhận tư vấn`                         |

Ví dụ:

```text
Sẵn sàng bắt đầu xây sản phẩm AI đầu tiên của bạn?

Tham gia khóa học và hoàn thành project có thể đưa vào portfolio.
```

---

# 14. Yêu cầu chức năng cụ thể

| Nhóm            | Yêu cầu                                                                                      |
| --------------- | -------------------------------------------------------------------------------------------- |
| Dynamic [[web/page|page]]    | Trang dùng `slug` để lấy dữ liệu từng khóa                                                   |
| Course data     | Lấy từ bảng `courses`                                                                        |
| Curriculum      | Lấy module/lesson từ `modules`, `lessons`                                                    |
| CTA             | CTA thay đổi theo loại khóa: Free, Starter, Core, Advanced, Premium, B2B                     |
| Enrollment      | Starter/Core dẫn [[web/page/student/checkout|checkout]]; Advanced/Premium/B2B dẫn [[web/page/website/contact|contact]]; nếu chưa [[web/page/student/login|login]] thì [[web/page/student/login|login]]/register |
| Coming soon     | Nếu khóa chưa mở, hiển thị `Coming soon` và form nhận thông báo                              |
| Certificate     | Nếu khóa có [[web/page/website/certificate|certificate]], hiển thị [[web/page/website/certificate|certificate]] section                                        |
| Related courses | Gợi ý khóa liên quan                                                                         |
| SEO             | Mỗi khóa có title, description, og image riêng                                               |
| Responsive      | Layout đẹp trên desktop và mobile                                                            |

---

# 15. Data cần có cho trang này

| Bảng           | Dữ liệu dùng                                             |
| -------------- | -------------------------------------------------------- |
| `courses`      | title, slug, level, description, price, duration, status |
| `modules`      | danh sách module thuộc khóa                              |
| `lessons`      | lesson trong từng module                                 |
| `enrollments`  | kiểm tra user đã đăng ký chưa                            |
| `certificates` | kiểm tra khóa có [[web/page/website/certificate|certificate]] không                       |
| `leads`        | lưu người đăng ký tư vấn                                 |
| `course_reviews` | review/rating đã publish                              |
| `course_faqs`  | FAQ riêng của từng khóa, chỉ hiển thị `status = published` |

---

# 16. UI/UX nên làm

| Phần          | Gợi ý                                                  |
| ------------- | ------------------------------------------------------ |
| Hero          | Rộng, đẹp, có visual riêng của khóa                    |
| Core Bootcamp | Nên nổi bật hơn các khóa khác                          |
| Curriculum    | Dùng accordion cho gọn                                 |
| Pricing       | Nên đặt gần giữa/cuối trang và có CTA rõ               |
| Sticky CTA    | Desktop dùng box giá/CTA sticky bên phải               |
| Mobile        | CTA hiện rõ sau hero và cuối trang                     |
| Trust         | Dùng [[web/page/website/certificate|certificate]], project output, FAQ để tăng niềm tin |

---

# 17. Acceptance Criteria

Trang `/courses/[slug]` đạt nếu:

| Tiêu chí                                                  | Đạt / Không |
| --------------------------------------------------------- | ----------- |
| Load đúng dữ liệu theo slug khóa học                      |             |
| Hiển thị rõ tên, level, mô tả, thời lượng, giá/trạng thái |             |
| Có phần đối tượng phù hợp                                 |             |
| Có learning outcomes rõ ràng                              |             |
| Có curriculum/module/lesson                               |             |
| Có project output hoặc kết quả học được                   |             |
| Có [[web/page/website/certificate|certificate]] section nếu khóa có chứng chỉ              |             |
| CTA đúng theo loại khóa                                   |             |
| Có trạng thái coming soon nếu khóa chưa mở                |             |
| Responsive tốt trên mobile                                |             |
| Có SEO metadata riêng cho từng khóa                       |             |

---

---

## 🗺️ Obsidian Meta

### Tags
- #blueprint/page/website
- #blueprint/plan
- #blueprint/requirement

### Navigation
- **Breadcrumbs:** [[BLUEPRINT_PLAN_MOC|Plan Home]] / [[web/page|Requirements]] / [[web/page/website/home|Public Website]]

### Relations
- **Outgoing Links:** [[web/page/website/design|Website Design — Blueprint Mono Blue / Dark Mono Blue]], [[web/page|1. Public Website — phần người ngoài nhìn thấy]], [[web/page/student/checkout|/checkout/:courseSlug — Thanh toán khóa học]], [[web/page/student/login|/login — Đăng nhập]], [[web/page/website/certificate|/certificate — Trang chứng chỉ]], [[web/page/website/contact|/contact — Trang liên hệ]]
- **Incoming Links (Backlinks):** [[web/page|1. Public Website — phần người ngoài nhìn thấy]]
