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

# `/courses` — Product Catalog Page

**Status:** MVP
**Owner area:** Public
**Source of truth:** `plan/web/page_function_matrix.md`, `plan/web/unified_database_schema.md`
**Build decision:** Build

Trang `/courses` là product catalog gọn cho bộ khóa học Blueprint. Trọng tâm là 4 thẻ khóa học chính; Premium và B2B tách thành section riêng để tránh làm rối lựa chọn.

## 1. Mục tiêu trang

| Mục tiêu                    | Mô tả                                                |
| --------------------------- | ---------------------------------------------------- |
| Hiển thị bộ sản phẩm học AI | Cho người xem biết Blueprint đang có những lựa chọn nào |
| Đẩy mạnh sản phẩm chính     | Làm nổi bật **AI Agent & Vibe Coding Bootcamp**      |
| Không làm rối               | Không search/filter, không marketplace               |
| Dẫn người dùng đi tiếp      | Xem chi tiết khóa, đăng ký workshop, hoặc tư vấn     |

---

# 2. Cấu trúc trang đề xuất

```text
/courses

1. Page Header
2. Main Course Cards: Free / Starter / Core / Advanced
3. Preview nhẹ: What you can learn
4. Preview nhẹ: Projects you can build
5. Premium Mentoring Section
6. B2B Training Section
7. Certificate / Outcome Preview
8. FAQ ngắn
9. Final CTA
```

---

# 3. Section 1 — Page Header

**Mục đích:** giới thiệu nhanh toàn bộ sản phẩm học AI của Blueprint.

| Thành phần | Yêu cầu                                                                     |
| ---------- | --------------------------------------------------------------------------- |
| Title      | “Khóa học AI tại Blueprint”                                                    |
| Subtitle   | Nói rõ có workshop miễn phí, khóa nhập môn, bootcamp chính và khóa nâng cao |
| CTA chính  | `Tham gia workshop miễn phí`                                                |
| CTA phụ    | `Nhận tư vấn khóa phù hợp`                                                  |

**Gợi ý nội dung:**

```text
Chọn cách học AI phù hợp với bạn — từ workshop miễn phí, khóa nhập môn, bootcamp thực chiến đến đào tạo AI automation nâng cao.
```

---

# 4. Section 2 — Main Course Cards

Chỉ hiển thị **4 thẻ chính** ở khu vực đầu.

| Level    | Product                          | Price direction | Vai trò trên trang               |
| -------- | -------------------------------- | --------------- | -------------------------------- |
| Free     | 1-hour AI workshop               | Free            | Lead magnet, kéo người mới vào   |
| Starter  | Prompting + AI tools mini course | Low             | Sản phẩm dễ mua, entry-level     |
| Core     | AI Agent & Vibe Coding Bootcamp  | Main product    | Sản phẩm chính, cần nổi bật nhất |
| Advanced | AI Agent for Business Automation | Higher          | Cho người học nghiêm túc hơn     |

---

## Cách thiết kế 4 card

| Card          | Cách làm                                                       |
| ------------- | -------------------------------------------------------------- |
| Free Workshop | Card nhẹ, dễ vào, nhấn mạnh “học thử miễn phí trong 1 giờ”     |
| Starter       | Card entry-level, nhấn mạnh “học prompt + AI tools nền tảng”   |
| Core          | Card nổi bật nhất, có badge `Most Popular` hoặc `Main Program` |
| Advanced      | Card nâng cao, nhấn mạnh automation cho công việc/business     |

---

## Nội dung từng card

| Khóa                | Nội dung nên hiển thị                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------- |
| Free Workshop       | 1 giờ học thử AI, hiểu AI Agent/Vibe Coding là gì, xem demo sản phẩm, phù hợp người mới           |
| Starter             | Học prompting, ChatGPT/Claude/Cursor cơ bản, AI workflow cá nhân, bài tập nhỏ                     |
| Core Bootcamp       | Học Vibe Coding, xây landing [[web/page|page]]/app prototype, AI Agent, automation workflow, project cuối khóa |
| Advanced Automation | Học thiết kế AI Agent cho quy trình kinh doanh, automation nhiều bước, tối ưu workflow            |

---

## Field bắt buộc trên mỗi card

| Thành phần      | Yêu cầu                                     |
| --------------- | ------------------------------------------- |
| Level badge     | Free / Starter / Core / Advanced            |
| Tên sản phẩm    | Rõ, ngắn                                    |
| Mô tả           | 2–3 dòng                                    |
| Phù hợp với ai  | Beginner / creator / founder / người đi làm |
| Output          | Học xong có gì                              |
| Price direction | Free / Low / Main product / Higher          |
| CTA             | `Xem chi tiết`, `Đăng ký ngay`, hoặc `/checkout/:courseSlug` với khóa paid self-serve |

---

# 5. Section 3 — Preview nhẹ: What you can learn

**Mục đích:** cho người xem thấy nội dung học, nhưng không quá dài.

| Chủ đề preview      | Mô tả ngắn                                     |
| ------------------- | ---------------------------------------------- |
| Prompting           | Viết prompt rõ, tạo output tốt hơn             |
| AI Tools            | Dùng ChatGPT, Claude, Cursor, automation tools |
| Vibe Coding         | Biến ý tưởng thành website/app prototype       |
| AI Agent            | Xây assistant, chatbot, workflow tự động       |
| Business Automation | Ứng dụng AI vào quy trình công việc            |

**UI:** 5 card nhỏ hoặc icon grid.

---

# 6. Section 4 — Preview nhẹ: Projects you can build

**Mục đích:** tăng cảm giác “học xong làm được thật”.

| Project mẫu                        | Gắn với khóa  |
| ---------------------------------- | ------------- |
| Personal AI Study Assistant        | Starter/Core  |
| AI Landing Page Builder            | Core          |
| Simple Customer Support Bot        | Core/Advanced |
| Form → Sheet → Email Automation    | Advanced      |
| Portfolio Website with AI Workflow | Core/Premium  |

**UI:** 3–5 project preview card, không cần quá chi tiết.

---

# 7. Section 5 — Premium Mentoring tách riêng

Phần này **không để chung trong course card grid**.

## `/courses` nên hiển thị như một section riêng:

| Thành phần | Yêu cầu                                                          |
| ---------- | ---------------------------------------------------------------- |
| Title      | “Need personal guidance?” hoặc “Mentoring cá nhân 1:1”           |
| Product    | 1:1 mentoring / portfolio coaching                               |
| Mức giá    | Highest / custom                                                 |
| Mục tiêu   | Giúp học viên làm portfolio, sửa project, định hướng ứng dụng AI |
| CTA        | `Đăng ký tư vấn 1:1`                                             |

**Mô tả ngắn:**

```text
Dành cho học viên muốn được mentor sát hơn để hoàn thiện project, xây portfolio cá nhân hoặc định hướng ứng dụng AI vào mục tiêu riêng.
```

**CTA dẫn tới:** `/contact?type=mentoring`

---

# 8. Section 6 — B2B Training tách riêng

Phần này cũng **không gộp vào card khóa học**.

| Thành phần | Yêu cầu                                              |
| ---------- | ---------------------------------------------------- |
| Title      | “AI Training for Teams & Organizations”              |
| Đối tượng  | Clubs, teams, SMEs                                   |
| Nội dung   | Workshop AI, automation training, custom AI workflow |
| Giá        | Custom                                               |
| CTA        | `Liên hệ đào tạo đội nhóm`                           |

**Mô tả ngắn:**

```text
Blueprint thiết kế chương trình đào tạo AI riêng cho câu lạc bộ, đội nhóm và doanh nghiệp nhỏ muốn ứng dụng AI vào học tập, vận hành hoặc tự động hóa công việc.
```

**CTA dẫn tới:** `/contact?type=b2b`

---

# 9. Section 7 — Certificate / Outcome Preview

**Mục đích:** nhắc nhẹ về đầu ra và chứng chỉ.

| Thành phần          | Yêu cầu                        |
| ------------------- | ------------------------------ |
| Certificate preview | Ảnh mẫu [[web/page/website/certificate|certificate]]            |
| Điều kiện           | Hoàn thành bài học + project   |
| Output              | Project / portfolio / workflow |
| CTA                 | `Tìm hiểu chứng chỉ`           |

**Không cần viết dài.** Chỉ cần preview nhẹ để dẫn sang `/certificate`.

---

# 10. Section 8 — FAQ ngắn

Chỉ cần 4–5 câu hỏi.

| Câu hỏi                                  | Mục đích                         |
| ---------------------------------------- | -------------------------------- |
| Em nên bắt đầu từ khóa nào?              | Hướng người mới vào Free/Starter |
| Chưa biết code có học được không?        | Giảm rào cản                     |
| Bootcamp khác mini course như nào?       | Làm rõ Core product              |
| Có chứng chỉ không?                      | Tăng niềm tin                    |
| Có tư vấn riêng hoặc đào tạo team không? | Dẫn sang Premium/B2B             |

---

# 11. Section 9 — Final CTA

| Thành phần | Yêu cầu                                        |
| ---------- | ---------------------------------------------- |
| Headline   | “Chưa biết nên chọn khóa nào?”                 |
| Subtext    | Blueprint có thể tư vấn theo mục tiêu học của bạn |
| CTA chính  | `Nhận tư vấn khóa phù hợp`                     |
| CTA phụ    | `Tham gia workshop miễn phí`                   |

---

# 12. Yêu cầu chức năng cụ thể

| Nhóm                | Yêu cầu                                                    |
| ------------------- | ---------------------------------------------------------- |
| Hiển thị khóa       | Hiển thị 4 khóa chính: Free, Starter, Core, Advanced       |
| Không search/filter | Vì số lượng khóa ít                                        |
| Core nổi bật        | Bootcamp phải có visual/badge nổi bật hơn các card còn lại |
| Premium tách riêng  | Không nằm trong 4 card chính, hiển thị bằng section riêng  |
| B2B tách riêng      | Không nằm trong 4 card chính, hiển thị bằng section riêng  |
| CTA card            | Mỗi card có nút xem chi tiết hoặc đăng ký                  |
| Checkout            | Starter/Core nếu mở bán self-serve thì CTA dẫn `/checkout/:courseSlug` |
| CTA Premium/B2B     | Dẫn về [[web/page/website/contact|contact]] form riêng theo nhu cầu                     |
| Responsive          | Desktop: 4 card hoặc 2x2; mobile: 1 cột                    |
| Coming soon         | Nếu khóa chưa mở, hiển thị badge `Coming soon`             |
| Lead tracking       | CTA tư vấn/workshop nên lưu lead source                    |

---

# 13. Data cần dùng

| Bảng | Dữ liệu |
| ---- | ------ |
| `courses` | 4 khóa chính, Premium, B2B, status, price, CTA |
| `course_reviews` | Rating/review published nếu hiển thị social proof |
| `leads` | Lead source từ CTA tư vấn/workshop |

---

# 14. Layout đề xuất

```text
[Header]

Khóa học AI tại Blueprint
Subtitle + CTA workshop + CTA tư vấn

[Free Workshop] [Starter Mini Course] [Core Bootcamp - nổi bật] [Advanced Automation]

What you can learn
[Prompting] [AI Tools] [Vibe Coding] [AI Agent] [Automation]

Projects you can build
[AI Assistant] [Landing Page] [Chatbot] [Automation Workflow]

Premium 1:1 Mentoring / Portfolio Coaching
[CTA tư vấn 1:1]

B2B AI Training for Teams, Clubs, SMEs
[CTA liên hệ B2B]

Certificate & Outcomes Preview
[CTA tìm hiểu chứng chỉ]

FAQ ngắn

Final CTA
```

---

# 15. Acceptance Criteria

| Tiêu chí | Đạt / Không |
| -------- | ----------- |
| Hiển thị đúng 4 khóa chính | |
| Starter/Core CTA dẫn [[web/page/student/checkout|checkout]] khi self-serve | |
| Advanced/Premium/B2B CTA dẫn [[web/page/website/contact|contact]] | |
| Premium và B2B không nằm trong grid 4 khóa chính | |
| Mobile hiển thị 1 cột rõ ràng | |

---

## 🗺️ Obsidian Meta

### Tags
- #blueprint/page/website
- #blueprint/plan
- #blueprint/requirement

### Navigation
- **Breadcrumbs:** [[BLUEPRINT_PLAN_MOC|Plan Home]] / [[web/page|Requirements]] / [[web/page/website/home|Public Website]]

### Relations
- **Outgoing Links:** [[web/page/website/design|Website Design — Blueprint Mono / Dark Mono]], [[web/page|1. Public Website — phần người ngoài nhìn thấy]], [[web/page/student/checkout|/checkout/:courseSlug — Thanh toán khóa học]], [[web/page/website/certificate|/certificate — Trang chứng chỉ]], [[web/page/website/contact|/contact — Trang liên hệ]]
- **Incoming Links (Backlinks):** [[web/page|1. Public Website — phần người ngoài nhìn thấy]]
