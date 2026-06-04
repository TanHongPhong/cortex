---
categories:
  - "[[Projects]]"
  - "[[cortex.ai]]"
  - "[[cortex.ai Web]]"
  - "[[Requirements]]"
  - "[[Public Website]]"
type: ["[[Page Spec]]"]
org: ["[[cortex.ai]]"]
start: 2026-06-02
year: 2026
url: https://github.com/TanHongPhong/cortex
status: "[[MVP]]"
---

# `/projects` — Trang dự án học viên

**Status:** MVP
**Owner area:** Public
**Source of truth:** `plan/web/page_function_matrix.md`, `plan/web/unified_database_schema.md`
**Build decision:** Build
**Covered routes:** `/projects`; project detail uses an MVP modal. Future route: `/projects/[slug]`.

## 1. Mục tiêu trang

| Mục tiêu          | Mô tả                                                       |
| ----------------- | ----------------------------------------------------------- |
| Tăng độ tin cậy   | Chứng minh học viên học xong có thể làm sản phẩm thật       |
| Showcase đầu ra   | Cho người xem thấy kết quả sau khóa học                     |
| Hỗ trợ bán khóa   | Dẫn người xem từ project → khóa học liên quan               |
| Tạo cảm hứng      | Người mới nhìn vào thấy “mình cũng có thể làm được”         |
| Tách biệt dữ liệu | Projects là bảng độc lập, không tự động nhận từ [[web/page/instructor/submissions|submissions]] |

---

# 2. Cấu trúc trang đề xuất

```text
/projects

1. Page Header
2. Featured Projects
3. Project Gallery
4. Project Categories
5. How students build projects
6. Related Courses CTA
7. Final CTA
```

---

# 3. Section 1 — Page Header

**Mục đích:** giới thiệu đây là nơi trưng bày sản phẩm học viên/project mẫu.

| Thành phần | Yêu cầu                                               |
| ---------- | ----------------------------------------------------- |
| Title      | “Dự án học viên tại CORTEX”                           |
| Subtitle   | Nói rõ học viên học qua project thực tế               |
| CTA chính  | `Xem khóa học`                                        |
| CTA phụ    | `Đăng ký học thử`                                     |
| Visual     | Có thể dùng mockup web/app/AI agent hoặc mascot Rubik |

**Gợi ý nội dung:**

```text
Không chỉ học lý thuyết. Tại CORTEX, mỗi khóa học đều hướng đến một sản phẩm hoặc project có thể đưa vào portfolio.
```

---

# 4. Section 2 — Featured Projects

**Mục đích:** show 3–4 project nổi bật nhất.

| Thành phần project card | Yêu cầu                                   |
| ----------------------- | ----------------------------------------- |
| Ảnh preview             | Screenshot website/app/workflow           |
| Tên project             | Rõ, dễ hiểu                               |
| Mô tả ngắn              | 2–3 dòng                                  |
| Loại project            | Website / AI Agent / Automation / Chatbot |
| Khóa liên quan          | Ví dụ: Core Bootcamp                      |
| Công cụ dùng            | ChatGPT, Claude, Cursor, Make, n8n...     |
| CTA                     | `Xem demo` / `Xem chi tiết`               |

**Project gợi ý ban đầu:**

| Project                  | Mô tả                                     |
| ------------------------ | ----------------------------------------- |
| AI Study Assistant       | Trợ lý học tập cá nhân dùng AI            |
| AI Landing Page Builder  | Landing [[web/page|page]] được tạo bằng Vibe Coding    |
| Customer Support Bot     | Chatbot hỗ trợ khách hàng cơ bản          |
| Form-to-Email Automation | Workflow tự động từ form sang email/sheet |

---

# 5. Section 3 — Project Gallery

**Mục đích:** hiển thị nhiều project dạng thư viện.

| Thành phần   | Yêu cầu                                                        |
| ------------ | -------------------------------------------------------------- |
| Grid project | lưới project                                                   |
| Project card | Ảnh, tên, mô tả, tag, khóa liên quan                           |
| Badge        | `Student Project`, `Sample Project`, `Featured`                |
| CTA          | `View project` hoặc `Xem demo`                                 |
| Empty state  | Nếu chưa có project học viên, hiển thị project mẫu của academy |

**Lưu ý quan trọng:**
Giai đoạn đầu chưa có học viên thì nên ghi rõ là **Sample Project by CORTEX**, không nên giả làm project học viên.

---

# 6. Section 4 — Project Categories

**Mục đích:** giúp người xem hiểu các nhóm project có thể làm.

| Category            | Mô tả                                     |
| ------------------- | ----------------------------------------- |
| Vibe Coding Website | Website, landing [[web/page|page]], portfolio          |
| AI Assistant        | Trợ lý học tập, trợ lý cá nhân, chatbot   |
| Workflow Automation | Tự động hóa form, email, sheet, báo cáo   |
| Business AI Agent   | Agent hỗ trợ bán hàng, CSKH, vận hành     |
| Portfolio Project   | Project cuối khóa để đưa vào CV/portfolio |

**UI:** 5 card nhỏ, có icon.

---

# 7. Section 5 — How students build projects

**Mục đích:** giải thích quy trình làm project tại CORTEX.

| Bước                   | Nội dung                                |
| ---------------------- | --------------------------------------- |
| 1. Chọn vấn đề         | Học viên chọn một vấn đề thật           |
| 2. Thiết kế ý tưởng    | Xác định user, use case, output         |
| 3. Build bằng AI tools | Dùng AI để tạo web, agent hoặc workflow |
| 4. Test & improve      | Kiểm tra, sửa lỗi, tối ưu               |
| 5. Submit project      | Nộp demo/source/mô tả                   |
| 6. Nhận feedback       | Mentor/admin góp ý và duyệt             |

**UI:** timeline 6 bước hoặc horizontal process.

---

# 8. Section 6 — Related Courses CTA

**Mục đích:** dẫn người xem từ project sang khóa học.

| Project type           | Gợi ý khóa                                |
| ---------------------- | ----------------------------------------- |
| Website / Landing Page | Vibe Coding / Core Bootcamp               |
| Chatbot / AI Assistant | AI Agent & Vibe Coding Bootcamp           |
| Automation Workflow    | Advanced AI Agent for Business Automation |
| Portfolio Project      | Premium Mentoring / Portfolio Coaching    |

**CTA gợi ý:**

```text
Muốn tự xây project giống vậy?
Bắt đầu với AI Agent & Vibe Coding Bootcamp.
```

Nút: `Xem khóa học phù hợp`

---

# 9. Section 7 — Final CTA

| Thành phần | Yêu cầu                                                |
| ---------- | ------------------------------------------------------ |
| Headline   | “Sẵn sàng xây project AI đầu tiên của bạn?”            |
| Subtext    | Nhấn mạnh học qua project, có feedback, có [[web/page/website/certificate|certificate]] |
| CTA chính  | `Đăng ký học thử`                                      |
| CTA phụ    | `Xem khóa học`                                         |

---

# 10. Yêu cầu chức năng cụ thể

| Nhóm             | Yêu cầu                                                    |
| ---------------- | ---------------------------------------------------------- |
| Hiển thị project | Lấy project từ bảng `projects` (độc lập với [[web/page/instructor/submissions|`submissions`]]) |
| Project card     | Có ảnh, tên, mô tả, category, khóa liên quan, link demo    |
| Project detail   | MVP dùng modal; Future có thể tách `/projects/[slug]`       |
| Project status   | Chỉ hiển thị project `published`                           |
| Badge            | Phân biệt `Sample Project` và `Student Project`            |
| CTA khóa học     | Project có thể link đến khóa liên quan                     |
| Empty state      | Nếu chưa có project học viên, hiển thị project mẫu         |
| Responsive       | Grid project hiển thị tốt trên mobile                      |
| Admin control    | Admin có thể thêm/ẩn/sửa project thủ công trong [[web/page/student/dashboard|dashboard]]  |

---

# 11. Data cần có

Bảng nên thêm: `projects`

| Field               | Mục đích                               |
| ------------------- | -------------------------------------- |
| `id`                | ID project                             |
| `title`             | Tên project                            |
| `slug`              | Link chi tiết nếu có                   |
| `short_description` | Mô tả ngắn                             |
| `thumbnail_url`     | Ảnh preview                            |
| `demo_url`          | Link demo                              |
| `source_url`        | Link source nếu public                 |
| `category`          | Website / Agent / Automation / Chatbot |
| `type`              | sample_project / student_project       |
| `course_id`         | Khóa liên quan                         |
| `display_order`     | Thứ tự hiển thị public                 |
| `published_at`      | Thời điểm public                       |
| `student_name`      | Tên học viên, chỉ hiển thị khi có consent public |
| `tools_used`        | Công cụ sử dụng                        |
| `status`            | draft / published / hidden             |
| `created_at`        | Ngày tạo                               |

---

# 12. UI/UX nên làm

| Phần        | Gợi ý                                   |
| ----------- | --------------------------------------- |
| Style       | Sạch, hiện đại, giống portfolio gallery |
| Card        | Ảnh lớn, text ngắn, badge rõ            |
| Hover       | Hover nhẹ, hiện nút xem demo            |
| Visual      | Dùng screenshot thật/mockup đẹp         |
| Category    | Dùng tag màu nhẹ, không quá sặc sỡ      |
| Empty state | Có mascot + câu hướng dẫn               |
| Mobile      | Card 1 cột, CTA rõ                      |

---

# 13. Quy tắc hiển thị

| Trường hợp               | Cách xử lý                                  |
| ------------------------ | ------------------------------------------- |
| Chưa có project học viên | Hiển thị project mẫu của CORTEX             |
| Project chưa public      | Không hiển thị                              |
| Không có demo link       | Hiển thị nút `Xem mô tả` thay vì `Xem demo` |
| Có tên học viên          | Chỉ hiển thị khi học viên cho phép          |
| Project nổi bật          | Gắn badge `Featured`                        |
| Project thuộc khóa nào   | Hiển thị badge khóa liên quan               |

---

# 14. Acceptance Criteria

Trang `/projects` đạt nếu:

| Tiêu chí                                                 | Đạt / Không |
| -------------------------------------------------------- | ----------- |
| Hiển thị được project mẫu hoặc project học viên          |             |
| Mỗi project có ảnh, tên, mô tả, category, khóa liên quan |             |
| Có phân biệt Sample Project và Student Project           |             |
| Có CTA xem demo hoặc xem chi tiết                        |             |
| Có section giải thích quy trình làm project              |             |
| Có CTA dẫn về khóa học liên quan                         |             |
| Responsive tốt trên mobile                               |             |
| Không fake project học viên khi chưa có dữ liệu thật     |             |

---

---

## 🗺️ Obsidian Meta

### Tags
- #cortex/page/website
- #cortex/plan
- #cortex/requirement

### Navigation
- **Breadcrumbs:** [[CORTEX_PLAN_MOC|Plan Home]] / [[web/page|Requirements]] / [[web/page/website/home|Public Website]]

### Relations
- **Outgoing Links:** [[web/page|1. Public Website — phần người ngoài nhìn thấy]], [[web/page/instructor/submissions|/instructor/submissions — Duyệt bài nộp]], [[web/page/student/dashboard|/dashboard — Trang tổng quan học viên]], [[web/page/website/certificate|/certificate — Trang chứng chỉ]]
- **Incoming Links (Backlinks):** [[analysis/course_eng|A. Roadmap từng khóa AI Agent quốc tế]], [[web/architecture|Architecture — Kiến trúc kỹ thuật CORTEX]], [[web/page|1. Public Website — phần người ngoài nhìn thấy]], [[web/page/admin/admin-submissions|/admin/submissions — Duyệt bài nộp]], [[web/page/website/home|Trang chủ / — Home Page]], [[web/page_function_matrix|Page Function Matrix — CORTEX]], [[web/unified_database_schema|💎 Unified Database Schema - CORTEX Project]]
