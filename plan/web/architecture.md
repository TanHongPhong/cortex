---
categories:
  - "[[Projects]]"
  - "[[Blueprint]]"
  - "[[Blueprint Web]]"
  - "[[Requirements]]"
type: ["[[Technical Specification]]"]
org: ["[[Blueprint]]"]
start: 2026-06-02
year: 2026
url: https://github.com/TanHongPhong/blueprint
status: "[[Single Source of Truth for Technical Architecture]]"
---

# Architecture — Kiến trúc kỹ thuật Blueprint

**Version:** 1.0
**Last Updated:** 2026-06-01
**Status:** Single Source of Truth for Technical Architecture

---

## 1. Tech Stack

| Layer | Technology | Lý do |
|-------|-----------|-------|
| Frontend | Next.js 14+ (App Router) | SSR/SSG, SEO, Server Components |
| UI Library | Tailwind CSS + shadcn/ui | Consistent design system, accessible |
| State Management | React Query (TanStack) + Zustang | Server state + client state separation |
| Backend | Next.js API Routes / Server Actions | Fullstack trong một repo |
| Database | PostgreSQL | ACID, relational data integrity |
| ORM | Prisma | Type-safe, migration support |
| Auth | Custom JWT + bcrypt | Không phụ thuộc OAuth provider |
| File Storage | Cloudflare R2 / S3-compatible | Scalable, cost-effective |
| Video Hosting | Cloudflare Stream / Bunny Stream | Secure streaming, token-based access |
| Email | Resend / Nodemailer | Transactional email |
| Payment | Momo/VNPay QR payment (MVP) | QR payment session, webhook confirmation, transaction idempotency |
| Hosting | Vercel (frontend) + Railway/Supabase (DB) | Easy deployment, auto-scaling |
| CDN | Cloudflare | Global edge caching |
| Monitoring | Vercel Analytics + Sentry | Performance + error tracking |

---

## 2. Project Structure

```
blueprint/
├── app/                          # Next.js App Router
│   ├── (public)/                 # Public routes (no auth required)
│   │   ├── page.tsx              # Home page
│   │   ├── courses/
│   │   │   ├── page.tsx          # Course list
│   │   │   └── [slug]/page.tsx   # Course detail
│   │   ├── projects/page.tsx
│   │   ├── certificate/page.tsx
│   │   ├── verify-certificate/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx          # Resources hub
│   │   │   └── [slug]/page.tsx   # Resource detail
│   │   ├── contact/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── terms/page.tsx
│   │   └── refund-policy/page.tsx
│   │
│   ├── (auth)/                   # Auth routes
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   └── reset-password/page.tsx
│   │
│   ├── (student)/                # Student portal (auth required, role=student)
│   │   ├── layout.tsx            # Student layout with sidebar
│   │   ├── dashboard/page.tsx
│   │   ├── notifications/page.tsx
│   │   ├── my-courses/page.tsx
│   │   ├── learn/
│   │   │   ├── [course]/page.tsx
│   │   │   └── [course]/[lesson]/page.tsx
│   │   ├── my-certificates/page.tsx
│   │   ├── my-orders/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── profile/page.tsx
│   │
│   ├── (checkout)/               # Standalone checkout flow (auth required, no student sidebar)
│   │   ├── checkout/
│   │   │   ├── [courseSlug]/page.tsx
│   │   │   ├── success/page.tsx
│   │   │   └── failed/page.tsx
│   │
│   ├── (instructor)/             # Instructor workspace (auth required, role=instructor)
│   │   ├── layout.tsx            # Instructor layout
│   │   ├── page.tsx              # Overview
│   │   ├── courses/page.tsx
│   │   └── submissions/page.tsx
│   │
│   ├── (admin)/                  # Admin dashboard (auth required; content routes also allow assigned instructor edit)
│   │   ├── layout.tsx            # Admin layout with role-filtered sidebar
│   │   ├── page.tsx              # Overview
│   │   ├── courses/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── lessons/page.tsx
│   │   ├── students/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── submissions/page.tsx
│   │   ├── certificates/page.tsx
│   │   ├── certificate-templates/page.tsx
│   │   ├── orders/page.tsx
│   │   ├── coupons/page.tsx
│   │   ├── payments/page.tsx
│   │   ├── invoices/page.tsx
│   │   ├── leads/page.tsx
│   │   ├── resources/page.tsx
│   │   ├── announcements/page.tsx
│   │   ├── reviews/page.tsx
│   │   ├── system/
│   │   │   └── users/page.tsx
│   │   └── audit-logs/page.tsx
│   │
│   └── api/                      # API routes
│       ├── auth/
│       │   ├── login/route.ts
│       │   ├── register/route.ts
│       │   ├── forgot-password/route.ts
│       │   ├── reset-password/route.ts
│       │   └── me/route.ts
│       ├── courses/route.ts
│       ├── lessons/route.ts
│       ├── enrollments/route.ts
│       ├── submissions/route.ts
│       ├── certificates/route.ts
│       ├── orders/route.ts
│       ├── payments/route.ts
│       ├── leads/route.ts
│       ├── notifications/route.ts
│       └── webhooks/
│           └── payment/route.ts
│
├── components/                   # Shared components
│   ├── ui/                       # shadcn/ui components
│   ├── layout/                   # Layout components
│   │   ├── PublicLayout.tsx
│   │   ├── StudentLayout.tsx
│   │   ├── InstructorLayout.tsx
│   │   └── AdminLayout.tsx
│   ├── forms/                    # Form components
│   └── shared/                   # Shared business components
│
├── lib/                          # Utility libraries
│   ├── db.ts                     # Prisma client
│   ├── auth.ts                   # JWT utilities
│   ├── email.ts                  # Email service
│   ├── storage.ts                # File storage
│   ├── video.ts                  # Video provider integration
│   ├── payment.ts                # Payment provider
│   └── utils.ts                  # General utilities
│
├── prisma/                       # Database schema
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
│
├── public/                       # Static assets
│   ├── images/
│   └── fonts/
│
├── types/                        # TypeScript types
│   └── index.ts
│
├── middleware.ts                  # Auth middleware
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

Future/P2 routes intentionally not shown in the MVP app tree:

- `/admin/referrals`
- `/admin/revenue`

---

## 3. API Design

### 3.1. Naming Convention

```
GET    /api/resources           # List
GET    /api/resources/:id       # Detail
POST   /api/resources           # Create
PUT    /api/resources/:id       # Update
DELETE /api/resources/:id       # Delete (soft)
```

### 3.2. Response Format

```typescript
// Success response
{
  success: true,
  data: T,
  message?: string
}

// Paginated response
{
  success: true,
  data: T[],
  pagination: {
    [[web/page|page]]: number,
    limit: number,
    total: number,
    totalPages: number
  }
}

// Error response
{
  success: false,
  error: {
    code: string,        // e.g., "VALIDATION_ERROR", "NOT_FOUND", "UNAUTHORIZED"
    message: string,     // Human-readable message
    details?: any        // Additional error context
  }
}
```

### 3.3. HTTP Status Codes

| Code | Usage |
|------|-------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request / Validation Error |
| 401 | Unauthorized (not logged in) |
| 403 | Forbidden (wrong role) |
| [[web/page/website/404|404]] | Not Found |
| 409 | Conflict (duplicate email, etc.) |
| 422 | Unprocessable Entity |
| 429 | Rate Limited |
| [[web/page/website/500|500]] | Internal Server Error |

### 3.4. Pagination

```
GET /api/courses?[[web/page|page]]=1&limit=10&status=published
```

### 3.5. Filtering

```
GET /admin/orders?status=paid&course_id=xxx&from=2026-01-01&to=2026-12-31
```

---

## 4. Authentication Strategy

### 4.1. JWT-based Auth

```typescript
// Token structure
{
  sub: string,        // user_id
  email: string,
  role: 'student' | 'instructor' | '[[web/page/admin/admin|admin]]',
  iat: number,
  exp: number
}

// Access token: 15 minutes
// Refresh token: 7 days
```

### 4.2. Middleware Flow

```typescript
// middleware.ts
1. Check cookie for access token
2. Verify JWT signature and expiry
3. If expired, try refresh token
4. Attach user to request context
5. Route protection:
   - /admin/courses* và /admin/lessons* → require role = [[web/page/admin/admin|admin]] OR instructor with `course_instructors.can_edit_course_content = true` for the target course
   - /admin/* còn lại → require role = [[web/page/admin/admin|admin]]
   - /instructor/* → require role = instructor OR [[web/page/admin/admin|admin]]
   - (student)/* → require role = student
   - (public)/* → no auth required
```

---

## 5. Database Access Patterns

### 5.1. Prisma Client

```typescript
// lib/db.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
```

### 5.2. Soft Delete Middleware

```prisma
// prisma/schema.prisma
// Use @@map for table names, handle soft delete in application layer
```

### 5.3. Common Queries

```typescript
// Get active enrollments for a user
const enrollments = await db.enrollment.findMany({
  where: {
    userId: user.id,
    deletedAt: null,
    status: 'active'
  },
  include: { course: true }
})

// Get pending [[web/page/instructor/submissions|submissions]] for [[web/page/admin/admin|admin]]
const [[web/page/instructor/submissions|submissions]] = await db.submission.findMany({
  where: {
    status: 'pending',
    deletedAt: null
  },
  include: {
    user: { select: { id: true, fullName: true, email: true } },
    course: true,
    lesson: true
  },
  orderBy: { submittedAt: 'desc' }
})
```

---

## 6. Caching Strategy

| Resource | Cache Location | TTL | Invalidation |
|----------|---------------|-----|--------------|
| Course list (public) | CDN edge | 5 min | On course update |
| Course detail (public) | CDN edge | 5 min | On course update |
| User session | Redis/memory | 15 min | On logout |
| KPI [[web/page/student/dashboard|dashboard]] | No cache | - | Real-time |
| Resources/blog | CDN edge | 10 min | On resource update |

---

## 7. Background Jobs (Future)

| Job | Trigger | Action |
|-----|---------|--------|
| Enrollment creation | order.status = paid | Create enrollment record |
| Notification delivery | Various events | Create notification records |
| Certificate PDF generation | Admin issue [[web/page/website/certificate|certificate]] | Generate PDF, upload to storage |
| Cleanup expired tokens | Cron (hourly) | Delete used/expired password_reset_tokens |
| Cleanup expired coupon reservations | Cron (hourly) | Cancel reserved redemptions past expiry |
| Video processing webhook | Provider callback | Update video_assets status |

---

## 8. Environment Variables

```env
# Database
DATABASE_URL=postgresql://...

# Auth
JWT_SECRET=...
JWT_REFRESH_SECRET=...
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# File Storage
STORAGE_PROVIDER=cloudflare_r2
R2_ACCOUNT_ID=...
R2_ACCESS_KEY=...
R2_SECRET_KEY=...
R2_BUCKET=...
R2_PUBLIC_URL=...

# Video
VIDEO_PROVIDER=cloudflare_stream
CF_STREAM_ACCOUNT_ID=...
CF_STREAM_API_TOKEN=...

# Email
EMAIL_PROVIDER=resend
RESEND_API_KEY=...
EMAIL_FROM=noreply@blueprint.vn

# Payment Gateway
PAYMENT_PROVIDERS=momo,vnpay
MOMO_PARTNER_CODE=...
MOMO_ACCESS_KEY=...
MOMO_SECRET_KEY=...
MOMO_ENDPOINT=...
VNPAY_TMN_CODE=...
VNPAY_HASH_SECRET=...
VNPAY_PAYMENT_URL=...
PAYMENT_RETURN_URL=https://blueprint.vn/checkout/success
PAYMENT_FAILED_URL=https://blueprint.vn/checkout/failed
PAYMENT_WEBHOOK_URL=https://blueprint.vn/api/webhooks/payment

# App
NEXT_PUBLIC_APP_URL=https://blueprint.vn
NODE_ENV=production
```

---

## 🗺️ Obsidian Meta

### Tags
- #blueprint/plan
- #blueprint/requirement

### Navigation
- **Breadcrumbs:** [[BLUEPRINT_PLAN_MOC|Plan Home]] / [[web/page|Requirements]]

### Relations
- **Outgoing Links:** [[web/page|1. Public Website — phần người ngoài nhìn thấy]], [[web/page/admin/admin|Admin Dashboard — Requirement]], [[web/page/instructor/submissions|/instructor/submissions — Duyệt bài nộp]], [[web/page/student/checkout|/checkout/:courseSlug — Thanh toán khóa học]], [[web/page/student/dashboard|/dashboard — Trang tổng quan học viên]], [[web/page/student/forgot-password|/forgot-password — Quên mật khẩu]], [[web/page/student/login|/login — Đăng nhập]], [[web/page/student/my-certificates|/my-certificates — Chứng chỉ của tôi]], [[web/page/student/my-courses|/my-courses — Khóa học của tôi]], [[web/page/student/my-orders|/my-orders và /my-orders/:id — Đơn hàng của tôi]], [[web/page/student/notifications|/notifications — Thông báo của tôi]], [[web/page/student/profile|/profile — Hồ sơ cá nhân]], [[web/page/student/register|/register — Đăng ký tài khoản]], [[web/page/website/404|/404 — Trang không tìm thấy]], [[web/page/website/500|/500 — Trang lỗi server]], [[web/page/website/blog|/blog — Blog / Resources Hub]], [[web/page/website/certificate|/certificate — Trang chứng chỉ]], [[web/page/website/contact|/contact — Trang liên hệ]], [[web/page/website/privacy|/privacy — Chính sách dữ liệu]], [[web/page/website/projects|/projects — Trang dự án học viên]], [[web/page/website/refund-policy|/refund-policy — Chính sách refund]], [[web/page/website/terms|/terms — Điều khoản sử dụng]], [[web/page/website/verify-certificate|/verify-certificate — Trang xác thực chứng chỉ]]
- **Incoming Links (Backlinks):** [[analysis/course_eng|A. Roadmap từng khóa AI Agent quốc tế]], [[analysis/course_vn|1. MindX — AI Agent Engineer]], [[web/hard_notes|Hard Notes]]
