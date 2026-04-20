Alright—now we lock it in properly. This is a **clean, investor-grade PRD for SAC** with sharper positioning, clearer scope, and execution realism.

---
login credentials:
email: shankhadeepmondal7@gmail.com
password: 92324556
# 🏗️ PRODUCT REQUIREMENTS DOCUMENT (PRD)

## Product Name: **SAC — Smart Asset & Construction**

### Tagline:

**“The Operating System for Construction & Logistics”**

---

# 1. 🚨 Problem Statement

Construction and logistics in emerging markets operate in silos:

* Projects tracked in Excel/WhatsApp
* Transport managed separately (calls/manual coordination)
* No real-time visibility into materials, delays, or costs
* Frequent delays due to poor coordination between site & logistics

### Core Problem:

> **Disconnection between construction execution and transport logistics leads to delays, cost overruns, and operational inefficiency.**

---

# 2. 💡 Solution

**SAC** is a unified SaaS platform that connects:

* 🏗️ Project execution (construction)
* 🚚 Logistics (transport)
* 📊 Real-time operational intelligence

### Core Insight:

> SAC is not just software—it’s a **coordination layer** between physical work (construction) and movement (transport).

---

# 3. 🎯 Target Market

## Primary

* Small & mid-sized construction companies (10–200 employees)
* Local contractors & subcontractors

## Secondary

* Fleet owners serving construction
* Real estate developers

## Initial Geography

* India (Tier 1 + Tier 2)

---

# 4. 🧠 Value Proposition

| Stakeholder       | Value                     |
| ----------------- | ------------------------- |
| Owner             | Cost control, visibility  |
| Site Manager      | Task + material tracking  |
| Transport Manager | Fleet + delivery tracking |
| Driver            | Simple job execution      |
| Finance           | Expense + billing clarity |

---

# 5. 🧩 Product Architecture

## 5.1 SAC Build (Construction)

### Features

* Project creation & lifecycle tracking
* Task management (assign, update, status)
* Daily site reports (text + images)
* Workforce tracking (attendance)
* Material usage logging
* Budget vs actual tracking

---

## 5.2 SAC Move (Transport)

### Features

* Fleet management (vehicles)
* Driver management
* Delivery/job creation
* Status tracking (Pending → In Transit → Delivered)
* Fuel tracking (basic)
* Maintenance logs (basic)

---

## 5.3 SAC Core (Shared Platform)

* Authentication (RBAC)
* Notifications (SMS / push)
* Dashboard (cross-module insights)
* Admin panel
* Billing & subscriptions

---

## 5.4 Integration Layer (KEY DIFFERENTIATOR)

### Core Workflow:

1. Site requests material
2. Delivery job created
3. Vehicle + driver assigned
4. Delivery tracked
5. Completion updates:

   * Material inventory
   * Project cost

👉 This creates a **closed-loop execution system**

---

# 6. 🔑 MVP Scope (Phase 1 — 6–8 weeks)

## Must-Have Features

### Construction

* Create project
* Add tasks
* Assign users
* Update progress

### Transport

* Add vehicles
* Add drivers
* Create delivery
* Update delivery status

### Shared

* Login/signup
* Role-based access (Admin, Manager, Driver)
* Basic dashboard

---

## Excluded (Phase 2+)

* GPS tracking
* AI features
* Advanced analytics
* Offline sync

---

# 7. 🧱 System Architecture

## Frontend

* React (Web)
* Tailwind CSS

## Backend

* Supabase (MVP)

  * PostgreSQL
  * Auth
  * Realtime

## Future

* Node.js microservices
* Event-driven architecture (Kafka)

---

## Architecture Flow

```
Client (Web/Mobile)
      ↓
API Layer (Supabase / Node)
      ↓
PostgreSQL Database
      ↓
Realtime Updates (WebSockets)
```

---

# 8. 🗄️ Data Model (Core)

### Users

* id
* name
* role (admin, manager, driver)

### Projects

* id
* name
* location
* budget

### Tasks

* id
* project_id
* assigned_to
* status
* progress

### Vehicles

* id
* vehicle_number
* type
* status

### Drivers

* id
* name
* license
* phone

### Deliveries

* id
* project_id
* vehicle_id
* driver_id
* origin
* destination
* status

---

# 9. 🔄 Core Workflows

## Workflow 1: Project Execution

* Create project → add tasks → assign → track progress

## Workflow 2: Delivery Execution

* Create delivery → assign vehicle/driver → update status → mark delivered

## Workflow 3: Integrated Flow

* Material request → delivery → completion → project updated

---

# 10. 📊 KPIs

## Product

* Daily active users (DAU)
* Tasks completed per project
* Deliveries per day

## Business

* MRR
* CAC
* Churn

## Operational

* Delivery success rate
* Project delay reduction %
* Cost savings %

---

# 11. 💰 Business Model

## Pricing

| Plan       | Price       | Target            |
| ---------- | ----------- | ----------------- |
| Basic      | ₹999/month  | Small teams       |
| Pro        | ₹2999/month | Growing companies |
| Enterprise | Custom      | Large orgs        |

## Add-ons

* GPS tracking
* Advanced analytics
* AI insights

---

# 12. 🚀 Go-To-Market Strategy

## Phase 1

* Direct outreach to contractors
* On-ground demos

## Phase 2

* Logistics partnerships
* Referral programs

## Phase 3

* Digital marketing + SEO

---

# 13. ⚠️ Risks & Mitigation

| Risk                 | Mitigation             |
| -------------------- | ---------------------- |
| Low tech adoption    | Simple UI + onboarding |
| Poor connectivity    | Offline mode (Phase 2) |
| Fragmented workflows | Strong integration UX  |

---

# 14. 🧠 Competitive Advantage

| Category          | Gap                |
| ----------------- | ------------------ |
| ERP tools         | Too complex        |
| Construction apps | No logistics       |
| Logistics tools   | No project context |

👉 SAC advantage:

> **Unified execution + logistics platform**

---

# 15. 🔮 Roadmap

## Phase 2

* GPS tracking
* Mobile app (Android-first)
* Offline mode

## Phase 3

* AI:

  * Delay prediction
  * Cost forecasting
  * Route optimization

## Phase 4

* Marketplace:

  * Hire transport
  * Rent equipment

---

# 16. 🏁 Execution Plan

## Month 1–2

* Build MVP

## Month 3

* Pilot with 2–3 companies

## Month 4–6

* Iterate + scale

---

# 17. 🔥 Investor Narrative

> **SAC is building the operating system for construction in emerging markets by solving the most critical inefficiency: the disconnect between project execution and logistics.**

---

# 18. 💣 What Makes This Big

* Massive, underserved market
* High inefficiency = high ROI product
* Strong expansion:

  * Finance
  * Marketplace
  * AI layer

---

If you want to push this to the next level, the *real execution unlock* is:

👉 UI/UX (what users actually touch)
👉 Database schema (production-level)
👉 Build roadmap (daily tasks)

Say:

* **“Design SAC UI (full app screens)”**
* **“Give me Supabase schema + APIs”**
* **“30-day build plan”**

And we’ll move from idea → actual product.
supabase password:Mondal@2022

project url:https://nlvfgmscetcufqdmitmx.supabase.co
publishable key:sb_publishable_bfdhbsbegT_iLiamF1DP0w_CDULgNCn
dirrect connection string:postgresql://postgres:[YOUR-PASSWORD]@db.nlvfgmscetcufqdmitmx.supabase.co:5432/postgres


