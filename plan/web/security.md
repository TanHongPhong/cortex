---
categories:
  - "[[Projects]]"
  - "[[cortex.ai]]"
  - "[[cortex.ai Web]]"
  - "[[Requirements]]"
type: ["[[Technical Specification]]"]
org: ["[[cortex.ai]]"]
start: 2026-06-02
year: 2026
url: https://github.com/TanHongPhong/cortex
status: "[[Security Requirements & Implementation Guide]]"
---

# Security — Bảo mật hệ thống CORTEX

**Version:** 1.0
**Last Updated:** 2026-06-01
**Status:** Security Requirements & Implementation Guide

---

## 1. Authentication Security

### 1.1. Password Policy

| Rule | Requirement |
|------|------------|
| Minimum length | 8 ký tự |
| Hashing | bcrypt với salt rounds = 12 |
| Storage | Chỉ lưu password_hash, không lưu plaintext |
| Reset token | Hash trước khi lưu vào DB |
| Reset expiry | 15 phút |
| Reset one-time | Token chỉ dùng một lần |

### 1.2. JWT Security

| Rule | Requirement |
|------|------------|
| Algorithm | HS256 |
| Access token TTL | 15 phút |
| Refresh token TTL | 7 ngày |
| Token storage | HttpOnly cookie, Secure, SameSite=Strict |
| Token rotation | Refresh token rotate on use |
| Token revocation | Invalidate on password change |

### 1.3. Brute Force Protection

| Endpoint | Rate Limit | Window | Action |
|----------|-----------|--------|--------|
| POST /api/auth/login | 5 attempts | 15 phút | Lock account + notify [[web/page/admin/admin|admin]] |
| POST /api/auth/register | 3 attempts | 15 phút | Block IP temporarily |
| POST /api/auth/forgot-password | 5 attempts | 15 phút | Block IP temporarily |
| POST /api/auth/reset-password | 5 attempts | 15 phút | Block IP temporarily |
| POST /api/contact | 5 attempts | 15 phút | Block IP temporarily |
| POST /api/verify-certificate | 20 attempts | 1 phút | Block IP temporarily |

### 1.4. Session Management

```typescript
// Cookie configuration
{
  httpOnly: true,      // Không cho JS truy cập
  secure: true,        // Chỉ gửi qua HTTPS
  sameSite: 'strict',  // Chống CSRF
  maxAge: 15 * 60,     // 15 phút (access token)
  path: '/'
}
```

---

## 2. Authorization Security

### 2.1. Role-based Access Control (RBAC)

| Route Pattern | student | instructor | [[web/page/admin/admin|admin]] |
|---------------|:-------:|:----------:|:-----:|
| `/(public)/*` | ✅ | ✅ | ✅ |
| `/(auth)/*` | ✅ | ✅ | ✅ |
| `/(student)/*` | ✅ | ❌ | ✅ |
| `/(instructor)/*` | ❌ | ✅ | ✅ |
| `/([[web/page/admin/admin|admin]])/*` | ❌ | ❌ | ✅ |
| `/api/admin/*` | ❌ | ❌ | ✅ |

### 2.2. Resource-level Authorization

```typescript
// Middleware check
async function authorize(request, requiredRole) {
  const user = await getUserFromToken(request)

  if (!user) {
    return 401 // Unauthorized
  }

  if (user.role !== requiredRole && user.role !== '[[web/page/admin/admin|admin]]') {
    return 403 // Forbidden
  }

  // Check if user is blocked
  if (user.status === 'blocked') {
    return 403 // Account blocked
  }
}
```

### 2.3. Data Access Rules

| Entity | Student | Instructor | Admin |
|--------|---------|-----------|-------|
| Own [[web/page/student/profile|profile]] | Read/Write | Read/Write | Read/Write |
| Other users | ❌ | ❌ | Read/Write |
| Own enrollments | Read | ❌ | Read/Write |
| Course curriculum | Read (enrolled) | Read (assigned) | Read/Write |
| Own [[web/page/instructor/submissions|submissions]] | Read/Write | Read/Write (assigned) | Read/Write |
| Own certificates | Read | ❌ | Read/Write |
| Own orders | Read | ❌ | Read/Write |
| All orders | ❌ | ❌ | Read/Write |

---

## 3. Input Validation & Sanitization

### 3.1. Validation Rules

| Field | Rule |
|-------|------|
| Email | RFC 5322 format, lowercase, max 255 chars |
| Password | Min 8 chars, max 128 chars |
| Name | Max 255 chars, no HTML tags |
| Phone | Vietnamese format: 0xxxxxxxxx or +84xxxxxxxxx |
| URL | Valid URL format, max 2048 chars |
| Text content | Strip HTML tags, max 10000 chars |
| UUID | Valid UUID v4 format |
| Certificate ID | Regex: `^CERT-\d{8}-\d{6}$` |

### 3.2. Sanitization

```typescript
// lib/sanitize.ts
import DOMPurify from 'isomorphic-dompurify'

export function sanitizeHtml(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href']
  })
}

export function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, '')
}

export function sanitizeInput(input: string): string {
  return stripHtml(input).trim()
}
```

### 3.3. SQL Injection Prevention

- **Prisma ORM**: Tự động parameterized queries
- **Raw queries**: Không dùng string concatenation
- **Input validation**: Validate trước khi query

---

## 4. CSRF Protection

### 4.1. SameSite Cookies

```typescript
// Cookie attribute
sameSite: 'strict'
```

### 4.2. CSRF Token cho Forms

```typescript
// lib/csrf.ts
import { randomBytes } from 'crypto'

export function generateCsrfToken(): string {
  return randomBytes(32).toString('hex')
}

export function validateCsrfToken(token: string, sessionToken: string): boolean {
  return token === sessionToken
}
```

### 4.3. Origin Check

```typescript
// middleware.ts
const allowedOrigins = [
  'https://cortex.vn',
  'https://www.cortex.vn'
]

function checkOrigin(request: Request): boolean {
  const origin = request.headers.get('origin')
  return origin ? allowedOrigins.includes(origin) : false
}
```

---

## 5. XSS Prevention

### 5.1. Content Security Policy (CSP)

```typescript
// next.config.js
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`
```

### 5.2. Output Encoding

```typescript
// React tự động escape JSX
<p>{userInput}</p>  // Safe

// dangerouslySetInnerHTML chỉ dùng khi đã sanitize
<div dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }} />
```

---

## 6. File Upload Security

### 6.1. Allowed File Types

| Context | Allowed Types | Max Size |
|---------|--------------|----------|
| Avatar | image/jpeg, image/png, image/webp | 2MB |
| Thumbnail | image/jpeg, image/png, image/webp | 5MB |
| Document | application/pdf | 10MB |
| Video | video/mp4, video/webm | 500MB |
| Payment proof | image/jpeg, image/png, application/pdf | 5MB |

### 6.2. File Validation

```typescript
// lib/upload.ts
const ALLOWED_TYPES = {
  avatar: ['image/jpeg', 'image/png', 'image/webp'],
  document: ['application/pdf'],
  video: ['video/mp4', 'video/webm']
}

const MAX_SIZES = {
  avatar: 2 * 1024 * 1024,      // 2MB
  document: 10 * 1024 * 1024,    // 10MB
  video: [[web/page/website/500|500]] * 1024 * 1024       // 500MB
}

export function validateFile(file: File, type: keyof typeof ALLOWED_TYPES) {
  if (!ALLOWED_TYPES[type].includes(file.type)) {
    throw new Error('File type not allowed')
  }
  if (file.size > MAX_SIZES[type]) {
    throw new Error('File too large')
  }
}
```

### 6.3. Storage Security

- Files lưu trên object storage (R2/S3), không lưu trên local filesystem
- Private files dùng signed URLs với TTL
- Public files dùng CDN với cache control
- File names sanitized để tránh path traversal

---

## 7. Video Streaming Security

### 7.1. Signed URLs

```typescript
// lib/video.ts
export async function getSignedVideoUrl(videoAssetId: string, userId: string) {
  // Verify user has access
  const hasAccess = await verifyVideoAccess(userId, videoAssetId)
  if (!hasAccess) throw new Error('Access denied')

  // Generate signed URL with TTL
  const signedUrl = await cloudflareStream.getSignedUrl(videoAssetId, {
    expiresIn: 3600 // 1 hour
  })

  return signedUrl
}
```

### 7.2. Access Control

| Check | Requirement |
|-------|------------|
| User authenticated | Có valid JWT |
| User enrolled | Có enrollment active cho course |
| Course published | course.status = 'published' |
| Lesson published | lesson.status = 'published' |
| Video ready | video_assets.processing_status = 'ready' |

---

## 8. Rate Limiting

### 8.1. Implementation

```typescript
// lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '15 m'),
  analytics: true
})

export async function checkRateLimit(identifier: string) {
  const { success, limit, reset, remaining } = await ratelimit.limit(identifier)
  return { success, limit, reset, remaining }
}
```

### 8.2. Rate Limit Rules

| Endpoint | Limit | Window |
|----------|-------|--------|
| Login | 5 | 15 min |
| Register | 3 | 15 min |
| Forgot password | 5 | 15 min |
| Contact form | 5 | 15 min |
| Verify [[web/page/website/certificate|certificate]] | 20 | 1 min |
| API general | 100 | 1 min |
| File upload | 10 | 1 hour |

---

## 9. Data Protection

### 9.1. Sensitive Data

| Data | Storage | Display | Export |
|------|---------|---------|--------|
| Password | bcrypt hash | ❌ Never | ❌ Never |
| Email | Encrypted at rest | Masked (u***@email.com) | Full ([[web/page/admin/admin|admin]] only) |
| Phone | Encrypted at rest | Masked (09***xxx) | Full ([[web/page/admin/admin|admin]] only) |
| Payment payload | Encrypted at rest | ❌ Never | ❌ Never |
| JWT secret | Environment variable | ❌ Never | ❌ Never |

### 9.2. Data Retention

| Data | Retention | Cleanup |
|------|-----------|---------|
| Soft deleted records | 90 days | Auto-delete after 90 days |
| Password reset tokens | 15 minutes | Auto-delete after expiry |
| Audit logs | 1 year | Archive after 1 year |
| Payment webhooks | 90 days | Auto-delete after 90 days |

---

## 10. Security Headers

```typescript
// middleware.ts
const securityHeaders = {
  'X-DNS-Prefetch-Control': 'on',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-XSS-Protection': '1; mode=block',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': cspHeader
}
```

---

## 11. Security Checklist

### Pre-launch

- [ ] All passwords hashed with bcrypt
- [ ] JWT tokens have short TTL
- [ ] Cookies are HttpOnly, Secure, SameSite=Strict
- [ ] Rate limiting on all auth endpoints
- [ ] Input validation on all forms
- [ ] SQL injection prevention (Prisma ORM)
- [ ] XSS prevention (React auto-escape + CSP)
- [ ] CSRF protection (SameSite + Origin check)
- [ ] File upload validation
- [ ] Video access control
- [ ] Security headers configured
- [ ] HTTPS enforced
- [ ] Environment variables secured
- [ ] Error messages don't leak sensitive info
- [ ] Audit logging for sensitive operations

### Ongoing

- [ ] Regular dependency updates
- [ ] Security patches applied promptly
- [ ] Access logs monitored
- [ ] Failed [[web/page/student/login|login]] attempts tracked
- [ ] Backup verification
- [ ] Incident response plan

---

## 🗺️ Obsidian Meta

### Tags
- #cortex/plan
- #cortex/requirement

### Navigation
- **Breadcrumbs:** [[CORTEX_PLAN_MOC|Plan Home]] / [[web/page|Requirements]]

### Relations
- **Outgoing Links:** [[web/page/admin/admin|Admin Dashboard — Requirement]], [[web/page/instructor/submissions|/instructor/submissions — Duyệt bài nộp]], [[web/page/student/login|/login — Đăng nhập]], [[web/page/student/profile|/profile — Hồ sơ cá nhân]], [[web/page/website/500|/500 — Trang lỗi server]], [[web/page/website/certificate|/certificate — Trang chứng chỉ]]
- **Incoming Links (Backlinks):** [[PLAN_CONFLICT_AUDIT|Plan Conflict Audit - CORTEX Requirements]], [[analysis/course_eng|A. Roadmap từng khóa AI Agent quốc tế]], [[web/hard_notes|Hard Notes]], [[web/page/student/profile|/profile — Hồ sơ cá nhân]]
