---
categories:
  - "[[Projects]]"
  - "[[Blueprint]]"
  - "[[Blueprint Web]]"
  - "[[Requirements]]"
  - "[[Admin Dashboard]]"
type: ["[[Design Guideline]]"]
org: ["[[Blueprint]]"]
start: 2026-06-02
year: 2026
url: https://github.com/TanHongPhong/blueprint
status: "[[Design Source of Truth]]"
---

# Admin Dashboard Design — Warm Operational System

**Inspired by:** Lovable design language  
**Applies to:** `/admin` and all `/admin/*` operational pages.

## 1. Design intent

Admin pages should be efficient, scannable, and trustworthy. Keep the Lovable warmth, but adapt it to a dense operations dashboard for course, order, payment, certificate, lead, and audit workflows.

Core visual foundation:

- Background: `#f7f4ed`
- Primary text: `#1c1c1c`
- Body/meta text: `#5f5f5d`
- Passive borders: `#eceae4`
- Interactive borders: `rgba(28,28,28,0.4)`
- Primary action: charcoal button with inset shadow
- No heavy box shadows; containment comes from borders, spacing, and table structure

## 2. Admin visual rules

| Element | Rule |
| ------- | ---- |
| Dashboard shell | Sidebar + topbar with cream surfaces and subtle borders. |
| Data tables | Dense, readable rows with clear sorting/filtering controls. |
| KPI cards | Compact bordered cards, strong metric, short label, no decorative excess. |
| Forms | Group fields into practical sections; avoid giant marketing-style cards. |
| Dangerous actions | Require clear visual distinction and confirmation state. |
| Role filtering | Instructor content edit sees only Courses and Lessons UI affordances. |

## 3. Typography

Use `Camera Plain Variable`, `ui-sans-serif`, `system-ui`.

| Role | Size | Weight | Notes |
| ---- | ---- | ------ | ----- |
| Page title | 32-40px | 600 | Admin pages need clear hierarchy without hero scale. |
| Section title | 20-24px | 600 | Table/form sections. |
| KPI number | 32-48px | 600 | Large enough to scan quickly. |
| Table text | 14-16px | 400 | Dense operational reading. |
| Meta/help text | 13-14px | 400 | Status, timestamps, helper copy. |
| Button text | 14-16px | 400 | Match control density. |

## 4. Layout patterns

### Admin overview

- First viewport: KPI cards, pending submissions, finance/order alerts, operational alerts.
- Use grid cards for metrics, then queue/table modules below.
- Quick actions should be compact buttons with icons where available.

### Admin list pages

- Page header: title, short status/context, primary create action.
- Toolbar: search, filters, status tabs, export/bulk actions if relevant.
- Main body: table first for operational entities; card grid only where visual inspection matters.
- Pagination and empty states must be explicit.

### Admin edit/create pages

- Use sectioned forms with clear save/cancel.
- Place destructive actions away from primary save flow.
- Show validation and permission constraints near the affected fields.

## 5. Component guidance

| Component | Treatment |
| --------- | --------- |
| KPI card | `#eceae4` border, 8-12px radius, no heavy shadow, metric first. |
| Table | Cream surface, subtle row dividers, sticky header when useful. |
| Filter bar | Compact controls, 6px radius, visible active filter state. |
| Status badge | Warm neutral chips; stronger contrast only for urgent states. |
| Modal/dialog | Bordered cream panel, 8px radius, clear primary/secondary actions. |
| Primary button | `#1c1c1c` background, `#fcfbf8` text, 6px radius, inset shadow. |

## 6. Admin role variants

### Full admin

May see all admin modules: courses, lessons, students, submissions, certificates, orders, coupons, payments, invoices, leads, resources, announcements, reviews, audit logs, revenue/referrals where enabled.

### Instructor content edit

Use the same admin shell, but render only:

- `/admin/courses`
- `/admin/lessons`

Do not render hidden/disabled links for finance, students, certificates, leads, announcements, reviews, audit logs, system users, revenue, or referrals.

## 7. Do / Do not

Do:

- Optimize for repeated operational use.
- Keep tables readable and controls compact.
- Use warm borders and restrained surfaces.
- Make permission boundaries visible by omission.

Do not:

- Use large public-site hero sections in admin.
- Use card-heavy marketing layouts for tabular data.
- Use pure white as the dashboard base.
- Use saturated color as the main UI language.
- Depend on disabled buttons for unauthorized actions.

---

## Obsidian Meta

### Tags
- #blueprint/design/admin
- #blueprint/page/admin
- #blueprint/plan

### Navigation
- **Breadcrumbs:** [[BLUEPRINT_PLAN_MOC|Plan Home]] / [[web/page|Requirements]] / [[web/page/admin/admin|Admin Dashboard]]
