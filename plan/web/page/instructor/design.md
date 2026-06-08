---
categories:
  - "[[Projects]]"
  - "[[Blueprint]]"
  - "[[Blueprint Web]]"
  - "[[Requirements]]"
  - "[[Instructor Workspace]]"
type: ["[[Design Guideline]]"]
org: ["[[Blueprint]]"]
start: 2026-06-02
year: 2026
url: https://github.com/TanHongPhong/blueprint
status: "[[Design Source of Truth]]"
---

# Instructor Workspace Design — Focused Review Console

**Inspired by:** Lovable design language  
**Applies to:** `/instructor`, `/instructor/courses`, `/instructor/submissions`.

## 1. Design intent

Instructor pages are an operational workspace for grading submissions and supporting students. The experience should feel warm like the student portal, but denser and more task-focused.

Use the same Lovable-inspired foundation:

- Background: `#f7f4ed`
- Primary text: `#1c1c1c`
- Secondary text: `#5f5f5d`
- Passive border: `#eceae4`
- Interactive border: `rgba(28,28,28,0.4)`
- Primary action: charcoal button with inset shadow

## 2. Instructor visual rules

| Element | Rule |
| ------- | ---- |
| Workspace background | Cream `#f7f4ed`; keep the tone consistent with student/admin. |
| Tables/queues | Use bordered rows or compact cards; avoid heavy data-grid chrome. |
| Priority states | Pending, needs revision, approved, unresolved, resolved must be easy to scan. |
| Actions | Primary action should be review/reply; secondary actions stay subdued. |
| Density | Denser than student portal, lighter than admin dashboard. |
| Empty states | Short and operational: no pending submissions. |

## 3. Typography

Use `Camera Plain Variable`, `ui-sans-serif`, `system-ui`.

| Role | Size | Weight | Notes |
| ---- | ---- | ------ | ----- |
| Page title | 32-40px | 600 | Clear workspace heading, not marketing scale. |
| Queue title | 20-24px | 600 | Submission review blocks. |
| Row title | 16-18px | 400-600 | Student name, lesson, course. |
| Body | 16px | 400 | Comments, question preview, review copy. |
| Meta | 13-14px | 400 | Dates, course, lesson, status. |

## 4. Layout patterns

### Overview

- Show assigned courses, pending submissions, unread notifications.
- Queues should appear above secondary analytics.
- Quick links should be compact icon/text actions, not large marketing cards.

### Submission review

- Desktop: list/queue on the left or top, review detail in the main pane.
- Mobile: queue first, detail page after selection.
- Review actions must be fixed or repeated near the final decision area.


## 5. Component guidance

| Component | Treatment |
| --------- | --------- |
| Queue item | Cream card/row, `#eceae4` border, 8px radius, clear status badge. |
| Status badge | Neutral warm chips; reserve strong contrast for pending/needs action. |
| Review panel | Bordered content area with submission content, files, rubric, comment box. |
| Reply box | Cream input, 6px radius, visible focus ring, primary reply button. |
| Assigned course card | Compact course summary with student count and queue counts. |

## 6. Do / Do not

Do:

- Put pending work in the first viewport.
- Keep review and reply actions obvious.
- Use compact but breathable queues.
- Preserve role limits visually: no commerce/admin management affordances.

Do not:

- Show admin finance, coupon, order, revenue, student-management patterns.
- Use public-site hero composition.
- Use heavy shadows or saturated accents.
- Hide permission-disabled actions as disabled buttons; omit them.

---

## Obsidian Meta

### Tags
- #blueprint/design/instructor
- #blueprint/page/instructor
- #blueprint/plan

### Navigation
- **Breadcrumbs:** [[BLUEPRINT_PLAN_MOC|Plan Home]] / [[web/page|Requirements]] / [[web/page/instructor/overview|Instructor Overview]]

