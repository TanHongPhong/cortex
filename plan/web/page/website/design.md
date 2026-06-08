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

# Website Design — Blueprint Mono / Dark Mono

**Source of truth:** bản hướng dẫn thiết kế riêng cho hệ public website Blueprint. Không dùng file này như design tổng cho toàn hệ thống.

**Scope:** áp dụng cho hệ trang public website: `/`, `/courses`, `/courses/[slug]`, `/projects`, `/certificate`, `/verify-certificate`, `/blog`, `/contact`, `/privacy`, `/terms`, `/refund-policy`, `/404`, `/500`, `/maintenance`.

**Không áp dụng ở giai đoạn này:** student dashboard, student portal, instructor workspace, admin dashboard, checkout/auth nội bộ. Các khu vực này có thể dùng token riêng sau.

## 1. Style Direction

| Thuộc tính | Quy chuẩn |
| ---------- | --------- |
| Tổng thể | Đơn sắc, professional, gọn, hiện đại |
| Palette | Trắng / đen / xám than / xanh dương |
| Mood | Premium, sạch, dễ đọc, không màu mè |
| Dark mode | Đen sâu, card xám than, chữ trắng, điểm nhấn xanh dương |
| Không dùng | Cyan neon, vàng, cam, hồng, tím, card quá xanh |

## 2. CSS Variables

Nếu triển khai bằng CSS variables, gom token vào `:root` và `[data-theme="dark"]`.

```css
:root {
  --bg: #EFF6FF;
  --surface: #FFFFFF;
  --surface-2: #F8FBFF;
  --text: #0B1F33;
  --muted: #61738A;
  --primary: #1E40AF;
  --secondary: #3B82F6;
  --accent: #DBEAFE;
  --border: rgba(11, 31, 51, 0.12);
  --shadow: 0 24px 70px rgba(30, 64, 175, 0.16);
}

[data-theme="dark"] {
  --bg: #05070A;
  --surface: #0B0F14;
  --surface-2: #111827;
  --text: #F8FAFC;
  --muted: #94A3B8;
  --primary: #60A5FA;
  --secondary: #3B82F6;
  --accent: #1E293B;
  --border: rgba(248, 250, 252, 0.10);
  --shadow: 0 28px 80px rgba(0, 0, 0, 0.45);
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
| Badge, subtle highlight, selected row, soft block | `--accent` |
| Border | `--border`, không dùng viền đen cứng |
| Shadow | `--shadow` |

## 4. Component Rules

| Component | Quy chuẩn |
| --------- | --------- |
| CTA chính | Nền `--primary`, chữ tương phản cao; hover chuyển `--secondary` hoặc gradient nhẹ |
| CTA phụ | Nền transparent hoặc `--surface`, border `--border`, text `--text` hoặc `--primary` |
| Card | Nền `--surface`, border `--border`, shadow `--shadow`; không dùng glass màu mè |
| Card phụ | Nền `--surface-2`, border `--border`, shadow nhẹ hơn hoặc không shadow |
| Badge/chip | Nền `--accent`, text `--primary` ở light; dark mode dùng text `--text` hoặc `--primary` nếu đủ contrast |
| Input/search | Nền `--surface-2`, border `--border`, focus ring `--secondary` |
| Navbar public | Nền `--surface` có thể hơi trong suốt, border-bottom `--border`, shadow rất nhẹ |
| Footer public | Nền `--surface`, border-top `--border`, text phụ `--muted` |
| Hover | Ưu tiên thay border/shadow/nền `--surface-2`; không đổi sang màu nóng |
| Progress/diagram | Có thể dùng gradient rất nhẹ `#1E40AF -> #3B82F6 -> #60A5FA` |

## 5. Light Mode — Blueprint Mono

| Token | Giá trị |
| ----- | ------- |
| `--bg` | `#EFF6FF` |
| `--surface` | `#FFFFFF` |
| `--surface-2` | `#F8FBFF` |
| `--text` | `#0B1F33` |
| `--muted` | `#61738A` |
| `--primary` | `#1E40AF` |
| `--secondary` | `#3B82F6` |
| `--accent` | `#DBEAFE` |
| `--border` | `rgba(11, 31, 51, 0.12)` |
| `--shadow` | `0 24px 70px rgba(30, 64, 175, 0.16)` |

## 6. Dark Mode — Dark Blueprint Mono

| Token | Giá trị |
| ----- | ------- |
| `--bg` | `#05070A` |
| `--surface` | `#0B0F14` |
| `--surface-2` | `#111827` |
| `--text` | `#F8FAFC` |
| `--muted` | `#94A3B8` |
| `--primary` | `#60A5FA` |
| `--secondary` | `#3B82F6` |
| `--accent` | `#1E293B` |
| `--border` | `rgba(248, 250, 252, 0.10)` |
| `--shadow` | `0 28px 80px rgba(0, 0, 0, 0.45)` |

## 7. Acceptance Criteria

| Điều kiện | Đạt / Không |
| --------- | ----------- |
| Public website có cả light và dark token rõ ràng | |
| Không còn palette public cũ kiểu cyan/purple/neon/màu nóng | |
| CTA, card, hover, border, shadow dùng token thống nhất | |
| Dark mode giữ nền đen/xám than, chữ trắng, điểm nhấn xanh dương | |
| Student/admin/dashboard chưa bị ép dùng palette public website | |
| MOC và các public page trỏ về `[[web/page/website/design|Website Design — Blueprint Mono / Dark Mono]]` | |

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
