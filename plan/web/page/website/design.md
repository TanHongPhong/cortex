---
categories:
  - "[[Projects]]"
  - "[[Blueprint]]"
  - "[[Blueprint Web]]"
  - "[[Public Website]]"
  - "[[Design Guideline]]"
type: ["[[Website Design Guideline]]"]
org: ["[[Blueprint]]"]
start: 2026-06-06
year: 2026
url: https://github.com/TanHongPhong/blueprint
status: "[[MVP]]"
---

# Website Design — Blueprint Mono Blue / Dark Mono Blue

**Source of truth:** bản hướng dẫn thiết kế riêng cho hệ public website Blueprint. Không dùng file này như design tổng cho toàn hệ thống.

**Visual reference:** đối chiếu từ file `edu-blue-palette-explorer.html#blueprint-mono` người dùng cung cấp, lấy theme `mono blue` làm nền cho màu sắc, nhịp trình bày và cách tổ chức hero/card/CTA của public website.

**Scope:** áp dụng cho hệ trang public website: `/`, `/courses`, `/courses/[slug]`, `/projects`, `/certificate`, `/verify-certificate`, `/blog`, `/contact`, `/privacy`, `/terms`, `/refund-policy`, `/404`, `/500`, `/maintenance`.

**Không áp dụng ở giai đoạn này:** student dashboard, student portal, instructor workspace, admin dashboard, checkout/auth nội bộ. Các khu vực này có thể dùng token riêng sau.

## 1. Style Direction

| Thuộc tính | Quy chuẩn |
| ---------- | --------- |
| Tổng thể | Mono blue, academic tech, sạch, premium, hiện đại |
| Palette | Navy blue, sky blue, nền xanh rất nhạt, text xanh đen, accent ấm dùng rất tiết chế |
| Mood | Tin cậy, học thuật, sáng sủa, gọn, có cảm giác dashboard/learning product |
| Hero direction | Layout rộng, headline lớn, CTA rõ, có khối preview/panel nổi bật bên cạnh nội dung |
| Background direction | Nền sáng với lớp grid rất mờ, orb xanh dương mềm hoặc radial glow nhẹ |
| Dark mode | Giữ cùng ngôn ngữ mono blue nhưng chuyển về nền xanh đen sâu, text sáng, highlight xanh lạnh |
| Không dùng | Purple bias, neon cyan, gradient quá gắt, màu nóng làm chủ đạo, visual vui nhộn kiểu mascot |

## 2. CSS Variables

Nếu triển khai bằng CSS variables, gom token vào `:root` và `[data-theme="dark"]`.

```css
:root {
  --bg: #F5F9FF;
  --surface: #FFFFFF;
  --surface-2: #EDF4FF;
  --text: #061A33;
  --muted: #667C99;
  --primary: #0B3D91;
  --secondary: #38BDF8;
  --accent: #F4B942;
  --border: rgba(6, 26, 51, 0.12);
  --soft: 0 18px 46px rgba(11, 61, 145, 0.13);
  --shadow: 0 30px 90px rgba(11, 61, 145, 0.22);
  --grid: rgba(6, 26, 51, 0.05);
}

[data-theme="dark"] {
  --bg: #07111F;
  --surface: #0D1B2E;
  --surface-2: #132640;
  --text: #F7FBFF;
  --muted: #9CB3CC;
  --primary: #7CCBFF;
  --secondary: #38BDF8;
  --accent: #F4B942;
  --border: rgba(247, 251, 255, 0.10);
  --soft: 0 18px 46px rgba(0, 0, 0, 0.24);
  --shadow: 0 30px 90px rgba(0, 0, 0, 0.42);
  --grid: rgba(247, 251, 255, 0.06);
}
```

## 3. Token Usage

| UI phần tử | Token bắt buộc |
| ---------- | -------------- |
| Background chính | `--bg` |
| Navbar public, footer, card chính | `--surface` |
| Card phụ, input, bảng, block nhỏ | `--surface-2` |
| Text chính | `--text` |
| Text phụ, mô tả, metadata | `--muted` |
| CTA chính, active state, link nổi bật | `--primary` |
| Hover, icon highlight, progress bar | `--secondary` |
| Accent tiết chế cho chip, KPI, tiny emphasis | `--accent` |
| Border | `--border`, không dùng viền đen cứng |
| Shadow mềm trên card, panel, sticky CTA | `--soft` |
| Shadow | `--shadow` |
| Grid nền, đường chia rất mờ | `--grid` |

## 4. Component Rules

| Component | Quy chuẩn |
| --------- | --------- |
| CTA chính | Nền gradient từ `--primary` sang blue sáng hơn; chữ trắng; hover nhấc nhẹ 2-4px |
| CTA phụ | Nền `color-mix` từ `--surface` hoặc `--surface-2`, border `--border`, text `--text` hoặc `--primary` |
| Hero preview | Dùng panel lớn bo góc mạnh, có border mờ, shadow sâu, nền pha rất nhẹ từ `--surface` sang `--secondary` |
| Card | Nền `--surface`, border `--border`, shadow `--soft`; ưu tiên cảm giác sạch và học thuật |
| Card phụ | Nền `--surface` hoặc `--surface-2`, bo góc lớn, shadow nhẹ, có thể trong mờ nhẹ nhưng không glass quá tay |
| Badge/chip | Dùng `--accent` cho điểm nhấn nhỏ; không biến accent thành màu phủ diện rộng |
| Input/search | Nền `--surface`, border `--border`, focus ring `--secondary`, không dùng fill tối quá mạnh ở light mode |
| Navbar public | Sticky, nền blur nhẹ pha từ `--bg`, border-bottom `--border`, item active đảo nền sang `--text` hoặc `--primary` |
| Footer public | Có thể dùng nền đậm hơn `--text` hoặc `--primary` cho block CTA cuối trang; text sáng, nút đảo ngược |
| Hover | Ưu tiên translateY nhẹ, tăng shadow, đổi border sang blue nhạt; không nháy màu |
| Progress/diagram | Gradient `--primary -> --secondary -> --accent` chỉ dùng cho bar, chart highlight, không dùng tràn nền |

## 5. Visual Language

| Hạng mục | Quy chuẩn |
| -------- | --------- |
| Hero | Text bên trái, preview/mockup/dashboard bên phải hoặc bên dưới trên mobile |
| Decoration | Orb blur, grid nền, radial light, highlight mềm quanh preview |
| Visual asset | Product mockup, dashboard card, screenshot workflow, certificate mockup, interface crop |
| Illustration | Nếu cần illustration, dùng abstract tech/education shapes; không dùng mascot/nhân vật vui |
| Border radius | Ưu tiên bo tròn lớn `16px-42px` cho panel và card chính |
| Typography feel | Headline đậm, letter-spacing hơi nén, body rộng rãi, đọc nhanh |
| Content density | Mỗi section nên có 1 trọng tâm rõ: headline, 1-2 câu giải thích, CTA hoặc proof block |
| Motion | Float nhẹ, lift nhẹ, progress animation mềm; tránh motion liên tục gây nhiễu |

## 6. Light Mode — Blueprint Mono Blue

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
| `--soft` | `0 18px 46px rgba(11, 61, 145, 0.13)` |
| `--shadow` | `0 30px 90px rgba(11, 61, 145, 0.22)` |
| `--grid` | `rgba(6, 26, 51, 0.05)` |

## 7. Dark Mode — Dark Mono Blue

| Token | Giá trị |
| ----- | ------- |
| `--bg` | `#07111F` |
| `--surface` | `#0D1B2E` |
| `--surface-2` | `#132640` |
| `--text` | `#F7FBFF` |
| `--muted` | `#9CB3CC` |
| `--primary` | `#7CCBFF` |
| `--secondary` | `#38BDF8` |
| `--accent` | `#F4B942` |
| `--border` | `rgba(247, 251, 255, 0.10)` |
| `--soft` | `0 18px 46px rgba(0, 0, 0, 0.24)` |
| `--shadow` | `0 30px 90px rgba(0, 0, 0, 0.42)` |
| `--grid` | `rgba(247, 251, 255, 0.06)` |

## 8. Acceptance Criteria

| Điều kiện | Đạt / Không |
| --------- | ----------- |
| Public website có cả light và dark token rõ ràng | |
| Theme public bám ngôn ngữ `mono blue` từ file palette đối chiếu | |
| Không còn palette public cũ kiểu cyan/purple/neon hoặc màu nóng làm chủ đạo | |
| CTA, card, hover, border, shadow, hero preview dùng token thống nhất | |
| Dark mode giữ nền xanh đen sâu, chữ sáng, highlight xanh lạnh | |
| Student/admin/dashboard chưa bị ép dùng palette public website | |
| MOC và các public page trỏ về `[[web/page/website/design|Website Design — Blueprint Mono Blue / Dark Mono Blue]]` | |

---

## 🗺️ Obsidian Meta

### Tags
- #blueprint/plan
- #blueprint/requirement
- #blueprint/design-system
- #blueprint/page/website

### Navigation
- **Breadcrumbs:** [[BLUEPRINT_PLAN_MOC|Plan Home]] / [[web/page|Requirements]]

### Relations
- **Outgoing Links:** [[web/page|1. Public Website — phần người ngoài nhìn thấy]], [[web/page/website/404|/404 — Trang không tìm thấy]], [[web/page/website/500|/500 — Trang lỗi server]], [[web/page/website/blog|/blog — Blog / Resources Hub]], [[web/page/website/certificate|/certificate — Trang chứng chỉ]], [[web/page/website/contact|/contact — Trang liên hệ]], [[web/page/website/course-detail|/courses/[slug] — Trang chi tiết khóa học]], [[web/page/website/courses|/courses — Product Catalog Page]], [[web/page/website/home|Trang chủ / — Home Page]], [[web/page/website/maintenance|/maintenance — Trang bảo trì hệ thống]], [[web/page/website/privacy|/privacy — Chính sách dữ liệu]], [[web/page/website/projects|/projects — Trang dự án học viên]], [[web/page/website/refund-policy|/refund-policy — Chính sách refund]], [[web/page/website/terms|/terms — Điều khoản sử dụng]], [[web/page/website/verify-certificate|/verify-certificate — Trang xác thực chứng chỉ]]
- **Incoming Links (Backlinks):** [[BLUEPRINT_PLAN_MOC|Plan Home]], [[web/page|1. Public Website — phần người ngoài nhìn thấy]], [[web/page/website/404|/404 — Trang không tìm thấy]], [[web/page/website/500|/500 — Trang lỗi server]], [[web/page/website/certificate|/certificate — Trang chứng chỉ]], [[web/page/website/home|Trang chủ / — Home Page]], [[web/page/website/maintenance|/maintenance — Trang bảo trì hệ thống]], [[web/page/website/projects|/projects — Trang dự án học viên]], [[web/page/website/verify-certificate|/verify-certificate — Trang xác thực chứng chỉ]]
