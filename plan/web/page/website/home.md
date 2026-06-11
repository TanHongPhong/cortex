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

# Trang chủ `/` — Home Page

**Status:** MVP
**Owner area:** Public
**Source of truth:** `plan/web/page_function_matrix.md`, `plan/web/unified_database_schema.md`
**Build decision:** Build

## 1. Mục tiêu của trang

Trang chủ phải làm được 4 việc:

| Mục tiêu         | Mô tả                                                             |
| ---------------- | ----------------------------------------------------------------- |
| Giới thiệu nhanh | Người xem hiểu Blueprint là nền tảng học AI / AI Agent / Vibe Coding |
| Tạo ấn tượng     | Có hero rõ ràng, nội dung nổi bật và khối minh họa phù hợp        |
| Dẫn người dùng   | Điều hướng sang khóa học, lộ trình, [[web/page/website/certificate|certificate]], [[web/page/website/contact|contact]]          |
| Thu lead         | Có CTA và form/nút đăng ký học thử                                |

---

# 2. Cấu trúc section đề xuất

## Section 1: Header / Navigation

**Mục đích:** giúp người dùng đi nhanh đến các phần quan trọng.

| Thành phần  | Yêu cầu                                             |
| ----------- | --------------------------------------------------- |
| Logo        | Hiển thị logo Blueprint                                |
| Menu        | Home, Courses, Projects, Certificate, Blog, Contact |
| CTA phải có | Nút `Đăng ký học thử`                               |
| Menu mobile | Có menu thu gọn trên mobile                         |

---

## Section 2: Hero Section

**Mục đích:** 5 giây đầu phải hiểu web này dạy gì.

| Thành phần   | Yêu cầu                                                      |
| ------------ | ------------------------------------------------------------ |
| Headline     | Câu lớn, rõ lợi ích                                          |
| Subheadline  | Giải thích ngắn Blueprint giúp ai, học gì                       |
| CTA chính    | `Đăng ký học thử`                                            |
| CTA phụ      | `Xem lộ trình học` hoặc `Khám phá khóa học`                  |
| Khối minh họa | Preview sản phẩm, hình minh họa hoặc mockup phù hợp           |
| Trust badges | “Beginner-friendly”, “Project-based”, “Certificate included” |

**Gợi ý nội dung:**

```text
Học AI Agent & Vibe Coding từ con số 0

Blueprint giúp bạn học AI theo hướng thực chiến:
biết dùng AI, tạo sản phẩm, tự động hóa công việc và xây portfolio cá nhân.
```

---

## Section 3: Problem Section

**Mục đích:** đánh vào nỗi đau người học AI.

| Nội dung cần có         | Cách thể hiện                                             |
| ----------------------- | --------------------------------------------------------- |
| Học AI bị rối           | “Không biết bắt đầu từ đâu”                               |
| Quá nhiều tool          | “ChatGPT, Claude, Cursor, n8n… học cái nào trước?”        |
| Học xong không làm được | “Biết lý thuyết nhưng không tạo được sản phẩm”            |
| Sợ code                 | “Muốn làm web/app nhưng chưa đủ nền tảng lập trình”       |

---

## Section 4: Solution Section

**Mục đích:** giới thiệu Blueprint là giải pháp.

| Thành phần      | Yêu cầu                                                   |
| --------------- | --------------------------------------------------------- |
| Tiêu đề         | “Blueprint giúp bạn học AI theo cách thực chiến hơn”         |
| 3 giá trị chính | Học có lộ trình, học qua project, có sản phẩm/certificate |
| Nội dung bổ trợ | Có thể kèm mô tả quy trình học hoặc luồng giá trị         |
  
**Nội dung nên nhấn mạnh:**

```text
Không học tool rời rạc. Không học lý thuyết lan man.
Mỗi khóa học đều hướng đến một sản phẩm hoặc project cụ thể.
```

---

## Section 5: Learning Path

**Mục đích:** cho người học thấy lộ trình rõ.

| Bước                 | Nội dung                                            |
| -------------------- | --------------------------------------------------- |
| 1. AI Foundation     | Hiểu AI, prompt, cách dùng AI cho học tập/công việc |
| 2. Vibe Coding       | Tạo website, landing [[web/page|page]], prototype bằng AI        |
| 3. AI Agent          | Xây chatbot, workflow, assistant tự động            |
| 4. Portfolio Project | Làm project cuối khóa để đưa vào CV/portfolio       |

**CTA:** `Xem chi tiết lộ trình`

---

## Section 6: Featured Courses

**Mục đích:** dẫn người dùng sang trang khóa học.

| Thành phần card khóa học | Yêu cầu                                                 |
| ------------------------ | ------------------------------------------------------- |
| Tên khóa                 | Ví dụ: AI Foundation, Vibe Coding Lab, AI Agent Builder |
| Mô tả ngắn               | 1–2 dòng                                                |
| Level                    | Beginner / Intermediate                                 |
| Thời lượng               | Ví dụ: 4 tuần                                           |
| Kết quả                  | Học xong làm được gì                                    |
| CTA                      | `Xem chi tiết`                                          |

**Số lượng:** 3 khóa nổi bật là đủ.

---

## Section 7: Project Showcase

**Mục đích:** tăng niềm tin rằng học xong làm được sản phẩm.

| Thành phần    | Yêu cầu                                  |
| ------------- | ---------------------------------------- |
| Project cards | 3–4 project mẫu                          |
| Mỗi project   | Tên, mô tả ngắn, ảnh/demo, tool dùng     |
| CTA           | `Xem thêm project`                       |
| Giai đoạn đầu | Có thể ghi rõ là “Project mẫu từ Blueprint” |

**Project gợi ý:**

| Project              | Mô tả                            |
| -------------------- | -------------------------------- |
| AI Study Assistant   | Trợ lý học tập cá nhân           |
| Landing Page Builder | Web landing [[web/page|page]] tạo bằng AI     |
| Customer Support Bot | Chatbot hỗ trợ khách hàng        |
| Automation Workflow  | Tự động hóa form → sheet → email |

---

## Section 8: Certificate Preview

**Mục đích:** cho người học thấy học xong có chứng chỉ.

| Thành phần          | Yêu cầu                                                 |
| ------------------- | ------------------------------------------------------- |
| Mẫu [[web/page/website/certificate|certificate]] | Có tên học viên, khóa học, ngày cấp, Certificate ID, QR |
| Điều kiện nhận      | Hoàn thành bài học + nộp project + được duyệt           |
| CTA                 | `Tìm hiểu chứng chỉ` hoặc `Xác thực chứng chỉ`          |
| Lưu ý               | Ghi rõ là Certificate of Completion                     |

**Không nên:** nói quá như bằng cấp chính quy.

---

## Section 9: Why Blueprint

**Mục đích:** nêu lý do nên học ở đây.

| Điểm mạnh         | Mô tả ngắn                             |
| ----------------- | -------------------------------------- |
| Beginner-friendly | Phù hợp người mới                      |
| Project-based     | Học qua sản phẩm thực tế               |
| AI-first workflow | Học cách dùng AI để làm việc nhanh hơn |
| Portfolio-ready   | Có project để đưa vào CV               |
| Certificate       | Có chứng chỉ hoàn thành                |
| Community/support | Có hỗ trợ học viên                     |

---

## Section 10: FAQ ngắn

**Mục đích:** xử lý phản đối trước khi đăng ký.

| Câu hỏi cần có                       |
| ------------------------------------ |
| Em chưa biết code có học được không? |
| Khóa học dành cho ai?                |
| Học xong có làm được sản phẩm không? |
| Có chứng chỉ không?                  |
| Học online hay offline?              |
| Cần laptop cấu hình mạnh không?      |

**CTA cuối FAQ:** `Cần tư vấn? Liên hệ Blueprint`

---

## Section 11: Final CTA

**Mục đích:** chốt hành động cuối trang.

| Thành phần | Yêu cầu                               |
| ---------- | ------------------------------------- |
| Headline   | Kêu gọi bắt đầu học                   |
| Subtext    | Nhấn mạnh học thực chiến, có lộ trình |
| CTA chính  | `Đăng ký học thử`                     |
| CTA phụ    | `Xem khóa học`                        |

Ví dụ:

```text
Sẵn sàng biến AI thành kỹ năng thật của bạn?

Bắt đầu với lộ trình học AI thực chiến từ Blueprint.
```

---

## Section 12: Footer

| Thành phần        | Yêu cầu                                       |
| ----------------- | --------------------------------------------- |
| Logo + mô tả ngắn | Blueprint là gì                                  |
| Links             | Courses, Projects, Certificate, Blog, Contact |
| Legal             | Terms, Privacy, Refund Policy                 |
| Social            | Facebook, LinkedIn, YouTube, Zalo nếu có      |
| Contact           | Email, phone/Zalo                             |

---

# 3. Yêu cầu chức năng của trang chủ

| Nhóm             | Yêu cầu                                                                 |
| ---------------- | ----------------------------------------------------------------------- |
| CTA              | Các nút CTA phải dẫn đúng đến `/contact`, `/courses`, hoặc form đăng ký |
| Lead form        | Nếu có form ngay trên home, phải lưu dữ liệu vào bảng `leads`           |
| Course display   | Featured courses lấy dữ liệu từ bảng `courses`                          |
| Project display  | Project showcase lấy dữ liệu từ bảng [[web/page/website/projects|`projects`]] hoặc data tĩnh ban đầu  |
| Certificate link | Nút [[web/page/website/certificate|certificate]] dẫn đến `/certificate` hoặc `/verify-certificate`       |
| Loading state    | Nếu analysis/project chưa load, hiển thị skeleton/loading                 |
| Empty state      | Nếu chưa có khóa/project, hiển thị nội dung mẫu hoặc thông báo phù hợp  |

---

# 4. Data cần dùng cho trang chủ

| Dữ liệu                | Nguồn                     |
| ---------------------- | ------------------------- |
| Featured courses       | `courses`                 |
| Project showcase       | [[web/page/website/projects|`projects`]] hoặc data tĩnh |
| Lead form              | Lưu vào `leads`           |
| Certificate preview    | Template tĩnh             |
| Blog/resource mới nhất | `resources`               |

---

# 5. Bảng màu sử dụng

Áp dụng bảng màu `mono blue` cho trang chủ:

| Token | Giá trị |
| ----- | ------- |
| `--bg` | `#F5F9FF` |
| `--surface` | `#FFFFFF` |
| `--surface-2` | `#EDF4FF` |
| `--text` | `#061A33` |
| `--muted` | `#667C99` |
| `--primary` | `#0B3D91` |
| `--secondary` | `#38BDF8` |
| `--accent` | `#F4B942` |
| `--border` | `rgba(6, 26, 51, 0.12)` |

---

# 6. Acceptance Criteria

Trang chủ được xem là đạt nếu:

| Điều kiện                                      | Đạt / Không |
| ---------------------------------------------- | ----------- |
| Người dùng hiểu Blueprint dạy gì trong 5 giây đầu |             |
| Có CTA đăng ký học thử rõ ràng                 |             |
| Có section lộ trình học                        |             |
| Có section khóa học nổi bật                    |             |
| Có project/certificate để tăng niềm tin        |             |
| Form lead hoạt động và lưu vào database        |             |
| Header/Footer đầy đủ link                      |             |
| Có bố cục đầy đủ trên mobile                   |             |

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
- **Outgoing Links:** [[web/page/website/design|Website Design — Blueprint Mono Blue / Dark Mono Blue]], [[web/page|1. Public Website — phần người ngoài nhìn thấy]], [[web/page/website/certificate|/certificate — Trang chứng chỉ]], [[web/page/website/contact|/contact — Trang liên hệ]], [[web/page/website/projects|/projects — Trang dự án học viên]]
- **Incoming Links (Backlinks):** *None*
