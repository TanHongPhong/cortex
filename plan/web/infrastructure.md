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
status: "[[Deployment & Operations Guide]]"
---

# Infrastructure — Hạ tầng triển khai CORTEX

**Version:** 1.0
**Last Updated:** 2026-06-01
**Status:** Deployment & Operations Guide

---

## 1. Hosting Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                        Cloudflare CDN                        │
│                     (Static assets, edge cache)              │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                      Vercel (Frontend)                        │
│               Next.js App (SSR + API Routes)                  │
│               Serverless Functions (API)                      │
└─────────────────────────┬───────────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          │               │               │
┌─────────▼─────┐ ┌───────▼───────┐ ┌─────▼─────────┐
│   PostgreSQL  │ │  Cloudflare   │ │  Cloudflare   │
│   (Supabase/  │ │  R2 Storage   │ │  Stream       │
│    Railway)   │ │  (Files)      │ │  (Video)      │
└───────────────┘ └───────────────┘ └───────────────┘
```

---

## 2. Services & Providers

| Service | Provider | Purpose | Tier |
|---------|----------|---------|------|
| Frontend Hosting | Vercel | Next.js SSR + API | Pro ($20/mo) |
| Database | Supabase / Railway | PostgreSQL | Free → Pro |
| File Storage | Cloudflare R2 | Images, PDFs, documents | Free tier (10GB) |
| Video Hosting | Cloudflare Stream | Video encoding + streaming | $1 per 1000 min |
| CDN | Cloudflare | Edge caching, DNS | Free tier |
| Email | Resend | Transactional email | Free (100/day) → Pro |
| Monitoring | Sentry | Error tracking | Free tier |
| Analytics | Vercel Analytics | Page views, Web Vitals | Free tier |
| Uptime | BetterStack | Uptime monitoring | Free tier |

---

## 3. Environment Setup

### 3.1. Environments

| Environment | URL | Purpose |
|-------------|-----|---------|
| Development | localhost:3000 | Local development |
| Staging | staging.cortex.vn | Testing before production |
| Production | cortex.vn | Live application |

### 3.2. Environment Variables

```env
# ===== Application =====
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://cortex.vn
NEXT_PUBLIC_APP_NAME=CORTEX

# ===== Database =====
DATABASE_URL=postgresql://user:password@host:5432/cortex?sslmode=require

# ===== Authentication =====
JWT_SECRET=<32-random-chars>
JWT_REFRESH_SECRET=<32-random-chars>
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# ===== File Storage (Cloudflare R2) =====
STORAGE_PROVIDER=cloudflare_r2
R2_ACCOUNT_ID=<cloudflare-account-id>
R2_ACCESS_KEY_ID=<r2-access-key>
R2_SECRET_ACCESS_KEY=<r2-secret-key>
R2_BUCKET=cortex-files
R2_PUBLIC_URL=https://files.cortex.vn

# ===== Video (Cloudflare Stream) =====
VIDEO_PROVIDER=cloudflare_stream
CF_ACCOUNT_ID=<cloudflare-account-id>
CF_STREAM_API_TOKEN=<stream-api-token>

# ===== Email (Resend) =====
EMAIL_PROVIDER=resend
RESEND_API_KEY=<resend-api-key>
EMAIL_FROM=noreply@cortex.vn

# ===== Payment Gateway (Momo/VNPay) =====
PAYMENT_PROVIDERS=momo,vnpay
MOMO_PARTNER_CODE=<momo-partner-code>
MOMO_ACCESS_KEY=<momo-access-key>
MOMO_SECRET_KEY=<momo-secret-key>
MOMO_ENDPOINT=<momo-endpoint>
VNPAY_TMN_CODE=<vnpay-terminal-code>
VNPAY_HASH_SECRET=<vnpay-hash-secret>
VNPAY_PAYMENT_URL=<vnpay-payment-url>
PAYMENT_RETURN_URL=https://cortex.vn/checkout/success
PAYMENT_FAILED_URL=https://cortex.vn/checkout/failed
PAYMENT_WEBHOOK_URL=https://cortex.vn/api/webhooks/payment

# ===== Rate Limiting (Upstash Redis) =====
UPSTASH_REDIS_REST_URL=<upstash-url>
UPSTASH_REDIS_REST_TOKEN=<upstash-token>

# ===== Monitoring =====
SENTRY_DSN=<sentry-dsn>
```

---

## 4. Database Setup

### 4.1. Supabase Configuration

```text
1. Tạo project trên Supabase
2. Lấy connection string (Transaction mode)
3. Set DATABASE_URL trong environment
4. Chạy Prisma migration
```

### 4.2. Prisma Migration

```bash
# Generate Prisma client
npx prisma generate

# Run migration
npx prisma migrate dev --name init

# Push to production
npx prisma migrate deploy

# Seed data
npx prisma db seed
```

### 4.3. Database Backup

| Task | Frequency | Retention |
|------|-----------|-----------|
| Automated backup | Daily | 7 days (Supabase) |
| Manual backup | Weekly | 30 days |
| Point-in-time recovery | Continuous | 7 days |

---

## 5. Deployment Pipeline

### 5.1. CI/CD Flow

```text
Push to main
→ GitHub Actions
→ Run tests
→ Build Next.js
→ Deploy to Vercel (production)

Push to staging
→ GitHub Actions
→ Run tests
→ Build Next.js
→ Deploy to Vercel (staging)
```

### 5.2. GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main, staging]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npx prisma generate
      - run: npm run lint
      - run: npm run test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### 5.3. Database Migration in Production

```bash
# Before deploy, run migration
npx prisma migrate deploy

# If migration fails, rollback
npx prisma migrate resolve --rolled-back <migration-name>
```

---

## 6. Monitoring & Alerting

### 6.1. Error Tracking (Sentry)

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.1,
  environment: process.env.NODE_ENV
})
```

### 6.2. Uptime Monitoring (BetterStack)

| Check | URL | Interval | Alert |
|-------|-----|----------|-------|
| Homepage | https://cortex.vn | 1 min | Email + SMS |
| API Health | https://cortex.vn/api/health | 1 min | Email + SMS |
| Database | Internal | 5 min | Email |

### 6.3. Performance Monitoring (Vercel Analytics)

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| First Contentful Paint | < 1.5s | > 3s |
| Largest Contentful Paint | < 2.5s | > 4s |
| Cumulative Layout Shift | < 0.1 | > 0.25 |
| First Input Delay | < 100ms | > 300ms |
| API Response Time | < 200ms | > 1s |

### 6.4. Alert Channels

| Severity | Channel | Response Time |
|----------|---------|---------------|
| Critical (down) | SMS + Email + Slack | 5 min |
| High (errors spike) | Email + Slack | 30 min |
| Medium (slow) | Slack | 2 hours |
| Low (info) | Email digest | Daily |

---

## 7. Logging Strategy

### 7.1. Log Levels

| Level | Usage |
|-------|-------|
| ERROR | System errors, unhandled exceptions, payment failures |
| WARN | Rate limit hits, failed auth attempts, deprecated API usage |
| INFO | User actions, order creation, enrollment, [[web/page/website/certificate|certificate]] issued |
| DEBUG | Development only, detailed request/response |

### 7.2. Structured Logging

```typescript
// lib/logger.ts
import pino from 'pino'

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: process.env.NODE_ENV === 'development'
    ? { target: 'pino-pretty' }
    : undefined
})

// Usage
logger.info({
  userId: user.id,
  action: 'order.created',
  orderId: order.id,
  amount: order.finalAmount
}, 'New order created')
```

### 7.3. Log Retention

| Log Type | Retention |
|----------|-----------|
| Application logs | 7 days |
| Audit logs | 1 year (database) |
| Error logs | 30 days |
| Access logs | 7 days |

---

## 8. Backup & Recovery

### 8.1. Backup Strategy

| Data | Method | Frequency | Retention |
|------|--------|-----------|-----------|
| Database | Supabase automated | Daily | 7 days |
| Database | Manual pg_dump | Weekly | 30 days |
| Files (R2) | R2 versioning | Continuous | 30 days |
| Environment vars | Encrypted in GitHub Secrets | On change | Current |

### 8.2. Recovery Procedures

```text
Database Recovery:
1. Identify point in time to restore
2. Use Supabase [[web/page/student/dashboard|dashboard]] or pg_restore
3. Verify data integrity
4. Update application if needed

File Recovery:
1. Check R2 versioning history
2. Restore specific versions if needed
3. Verify file URLs still work

Full Disaster Recovery:
1. Spin up new Supabase project
2. Restore from latest backup
3. Update DATABASE_URL
4. Redeploy application
5. Verify all services connected
```

---

## 9. Scaling Strategy

### 9.1. Current Scale (MVP)

| Metric | Expected |
|--------|----------|
| Users | 100-500 |
| Concurrent users | 50-100 |
| Database size | < 1GB |
| File storage | < 10GB |
| Video storage | < 100 hours |

### 9.2. Scale Triggers

| Metric | Threshold | Action |
|--------|-----------|--------|
| Response time | > 1s avg | Optimize queries, add caching |
| Database connections | > 80% pool | Upgrade plan, add read replicas |
| Storage | > 80% quota | Upgrade plan |
| Error rate | > 1% | Investigate immediately |

### 9.3. Scaling Path

```text
MVP (Current):
- Vercel Pro
- Supabase Free/Pro
- Cloudflare Free

Growth (1000+ users):
- Vercel Pro
- Supabase Pro (dedicated)
- Cloudflare Pro
- Redis caching (Upstash Pro)

Scale (10000+ users):
- Vercel Enterprise
- Dedicated PostgreSQL
- Read replicas
- Redis cluster
- CDN optimization
```

---

## 10. Cost Estimation

### 10.1. Monthly Cost (MVP)

| Service | Cost |
|---------|------|
| Vercel Pro | $20 |
| Supabase Free | $0 |
| Cloudflare R2 (10GB) | $0.15 |
| Cloudflare Stream (100h) | $100 |
| Resend (100 emails/day) | $0 |
| Sentry (5k errors) | $0 |
| BetterStack | $0 |
| **Total** | **~$120/mo** |

### 10.2. Monthly Cost (Growth - 1000 users)

| Service | Cost |
|---------|------|
| Vercel Pro | $20 |
| Supabase Pro | $25 |
| Cloudflare R2 (100GB) | $1.50 |
| Cloudflare Stream (500h) | $[[web/page/website/500|500]] |
| Resend Pro | $20 |
| Upstash Redis | $10 |
| Sentry Team | $26 |
| **Total** | **~$600/mo** |

---

## 11. Disaster Recovery Plan

### 11.1. Incident Response

```text
1. DETECT: Monitoring alerts trigger
2. ASSESS: Determine severity and impact
3. COMMUNICATE: Notify affected users if needed
4. FIX: Implement fix or workaround
5. VERIFY: Confirm service restored
6. REVIEW: Post-incident analysis
```

### 11.2. Rollback Procedure

```text
Code Rollback:
1. Revert to previous Vercel deployment
2. Verify application works
3. Investigate issue

Database Rollback:
1. Stop application ([[web/page/website/maintenance|maintenance]] mode)
2. Restore database from backup
3. Run any needed data fixes
4. Restart application
5. Verify data integrity
```

---

## 12. Security Operations

### 12.1. Access Control

| Access | Who | Method |
|--------|-----|--------|
| GitHub repo | Core team | GitHub teams |
| Vercel [[web/page/student/dashboard|dashboard]] | DevOps lead | Vercel teams |
| Supabase [[web/page/student/dashboard|dashboard]] | DevOps lead | Supabase teams |
| Cloudflare | DevOps lead | Cloudflare teams |
| Production env vars | DevOps lead | Vercel encrypted |

### 12.2. Secret Rotation

| Secret | Rotation Frequency |
|--------|-------------------|
| JWT_SECRET | Every 90 days |
| Database password | Every 90 days |
| API keys | Every 90 days |
| R2 credentials | Every 90 days |

---

## 13. Development Workflow

### 13.1. Local Setup

```bash
# Clone repo
git clone https://github.com/cortex/cortex.git
cd cortex

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your values

# Setup database
npx prisma migrate dev
npx prisma db seed

# Start development
npm run dev
```

### 13.2. Branch Strategy

```text
main          → Production (auto-deploy)
staging       → Staging (auto-deploy)
feature/*     → Feature branches (PR to staging)
hotfix/*      → Hotfix branches (PR to main)
```

### 13.3. PR Requirements

- [ ] Code review approval
- [ ] All tests passing
- [ ] Lint passing
- [ ] No TypeScript errors
- [ ] Migration tested (if applicable)

---

## 🗺️ Obsidian Meta

### Tags
- #cortex/plan
- #cortex/requirement

### Navigation
- **Breadcrumbs:** [[CORTEX_PLAN_MOC|Plan Home]] / [[web/page|Requirements]]

### Relations
- **Outgoing Links:** [[web/page/student/dashboard|/dashboard — Trang tổng quan học viên]], [[web/page/website/500|/500 — Trang lỗi server]], [[web/page/website/certificate|/certificate — Trang chứng chỉ]], [[web/page/website/maintenance|/maintenance — Trang bảo trì hệ thống]]
- **Incoming Links (Backlinks):** *None*
