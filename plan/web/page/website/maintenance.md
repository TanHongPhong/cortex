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

# `/maintenance` — Trang bảo trì hệ thống

**Status:** MVP
**Owner area:** System
**Source of truth:** `plan/web/page_function_matrix.md`, `plan/web/unified_database_schema.md`
**Build decision:** Build

## 1. Mục tiêu

Hiển thị trang bảo trì khi hệ thống đang được nâng cấp, giữ user biết tình trạng và quay lại sau.

---

## 2. Trigger

| Trường hợp | Trigger |
|-----------|---------|
| Planned maintenance | Admin bật maintenance mode trước khi deploy |
| Emergency fix | Hotfix khẩn cấp cần downtime |
| Database migration | Migration lớn cần downtime |
| Provider outage | Cloudflare/Supabase/Vercel outage |

---

## 3. Maintenance Mode Activation

### Cách bật maintenance mode

```text
Option 1: Environment variable
→ Set MAINTENANCE_MODE=true trong Vercel
→ Next.js middleware redirect tất cả request về /maintenance

Option 2: Feature flag
→ Set flag trong database
→ Middleware check flag trước khi render

Option 3: Static [[web/page|page]]
→ Deploy static maintenance [[web/page|page]]
→ Redirect tất cả traffic về trang này
```

### Middleware logic

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const isMaintenance = process.env.MAINTENANCE_MODE === 'true'

  if (isMaintenance) {
    // Cho phép truy cập [[web/page/admin/admin|admin]] để quản lý
    if (request.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.next()
    }

    // Cho phép truy cập API health check
    if (request.nextUrl.pathname === '/api/health') {
      return NextResponse.next()
    }

    // Redirect tất cả về maintenance [[web/page|page]]
    return NextResponse.redirect(new URL('/maintenance', request.url))
  }
}
```

---

## 4. Layout

```text
┌─────────────────────────────────────────────┐
│                                             │
│   [Illustration bảo trì hoặc icon công cụ] │
│                                             │
│          🔧 Bảo trì hệ thống 🔧            │
│                                             │
│   Blueprint đang được nâng cấp để mang đến     │
│   trải nghiệm tốt hơn cho bạn.              │
│                                             │
│   Thời gian dự kiến:                        │
│   📅 [Ngày] từ [Giờ] đến [Giờ]            │
│                                             │
│   Chúng tôi sẽ quay lại sớm nhất có thể!   │
│                                             │
│   ─────────────────────────────────────     │
│                                             │
│   Cập nhật mới nhất:                        │
│   [Thông tin về quá trình bảo trì]         │
│                                             │
│   Liên hệ khẩn cấp:                        │
│   📧 support@blueprint.vn                      │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 5. Nội dung hiển thị

| Thành phần | Nội dung | Dynamic? |
|-----------|---------|:--------:|
| Visual | Illustration maintenance hoặc icon công cụ | ❌ |
| Tiêu đề | `Bảo trì hệ thống` | ❌ |
| Mô tả | `Blueprint đang được nâng cấp để mang đến trải nghiệm tốt hơn cho bạn.` | ❌ |
| Thời gian | `📅 [Ngày] từ [Giờ] đến [Giờ]` | ✅ |
| Cập nhật | Thông tin về quá trình bảo trì | ✅ |
| Contact | `📧 support@blueprint.vn` | ❌ |
| Social | Link Facebook/Zalo để cập nhật | ❌ |

---

## 6. Dynamic Content

### Admin có thể cập nhật

```text
/admin/maintenance (hoặc setting trong /admin)

Fields:
- is_maintenance: boolean
- maintenance_message: string (thông báo tùy chỉnh)
- estimated_start: datetime
- estimated_end: datetime
- update_message: string (cập nhật mới nhất)
- contact_email: string
```

### API endpoint

```typescript
// GET /api/maintenance-status
{
  "is_maintenance": true,
  "message": "Blueprint đang được nâng cấp...",
  "estimated_start": "2026-06-01T02:00:00Z",
  "estimated_end": "2026-06-01T06:00:00Z",
  "update": "Đang cập nhật database, hoàn thành 60%",
  "contact_email": "support@blueprint.vn"
}
```

---

## 7. Countdown Timer

```text
Nếu có estimated_end:
→ Hiện countdown "Còn lại: HH:MM:SS"
→ Tự động refresh khi hết thời gian

Nếu không có estimated_end:
→ Hiện "Chúng tôi sẽ quay lại sớm nhất có thể!"
```

---

## 8. Auto-refresh Logic

```text
1. Khi user ở trang maintenance:
   → Poll /api/maintenance-status mỗi 30 giây
   → Nếu is_maintenance = false → redirect về /

2. Khi countdown hết:
   → Tự động refresh trang
   → Nếu vẫn maintenance → hiện "Vui lòng đợi thêm"
```

---

## 9. SEO

| Field | Value |
|-------|-------|
| Status code | 503 (Service Unavailable) |
| Title | `Bảo trì hệ thống - Blueprint` |
| Description | `Blueprint đang được bảo trì. Vui lòng quay lại sau.` |
| Retry-After | 3600 (1 hour) |
| noindex | Có (không index trang maintenance) |

---

## 10. Email Notification (Optional)

```text
Trước khi bảo trì:
→ Gửi email cho user đã đăng ký thông báo
→ Nội dung: thời gian, lý do, ảnh hưởng

Sau khi bảo trì:
→ Gửi email thông báo hệ thống đã hoạt động bình thường
```

---

## 11. Maintenance Types

| Type | Thời gian | Thông báo trước | Email |
|------|----------|----------------|-------|
| Planned | 2-6 giờ | 24-48 giờ | Có |
| Emergency | < 1 giờ | Không | Không |
| Quick fix | < 15 phút | Không | Không |

---

## 12. UI Style

| Phần | Style |
|------|-------|
| Layout | Center aligned, đơn giản |
| Visual | Illustration maintenance hoặc icon công cụ |
| Màu | Theo [[web/page/website/design|Blueprint Mono Blue / Dark Mono Blue]]: nền `--bg`, panel `--surface`, text phụ `--muted` |
| Typography | Tiêu đề lớn, text nhỏ hơn |
| Countdown | Timer nổi bật bằng `--primary` hoặc `--secondary`, không dùng màu nóng |
| Mobile | Full width, responsive |

---

## 13. Admin Controls

| Control | Mô tả |
|---------|-------|
| Toggle maintenance | Bật/tắt maintenance mode |
| Set message | Tùy chỉnh thông báo |
| Set time range | Đặt thời gian bắt đầu/kết thúc |
| Update status | Cập nhật tiến trình bảo trì |
| Emergency contacts | Hiển thị liên hệ khẩn cấp |

---

## 14. Acceptance Criteria

| Tiêu chí | Đạt / Không |
|---------|-----------|
| Bật maintenance mode redirect về /maintenance | |
| Status code trả về 503 | |
| Hiển thị thời gian bảo trì | |
| Countdown timer hoạt động | |
| Auto-refresh khi hết thời gian | |
| Poll API để check maintenance status | |
| Admin có thể cập nhật nội dung | |
| Admin vẫn truy cập được /admin | |
| API health check vẫn hoạt động | |
| Responsive trên mobile | |
| Không index trang maintenance (noindex) | |
| Retry-After header được set | |

---

## 🗺️ Obsidian Meta

### Tags
- #blueprint/page/website
- #blueprint/plan
- #blueprint/requirement

### Navigation
- **Breadcrumbs:** [[BLUEPRINT_PLAN_MOC|Plan Home]] / [[web/page|Requirements]] / [[web/page/website/home|Public Website]]

### Relations
- **Outgoing Links:** [[web/page/website/design|Website Design — Blueprint Mono Blue / Dark Mono Blue]], [[web/page|1. Public Website — phần người ngoài nhìn thấy]], [[web/page/admin/admin|Admin Dashboard — Requirement]]
- **Incoming Links (Backlinks):** [[web/infrastructure|Infrastructure — Hạ tầng triển khai Blueprint]]
