TITLE: BloodBridge Program Manual
AUTHOR: <Your Name>
DATE: <YYYY-MM-DD>
VERSION: 1.0

INSTRUCTIONS:
- Paste this content into Word.
- Use Word?s automatic Table of Contents based on the numbered headings.
- Replace <PLACEHOLDER> text and image references with your actual data/screenshots.

============================================================
TABLE OF CONTENTS (AUTO-GENERATE IN WORD)
============================================================
1. INTRODUCTION
2. SYSTEM ARCHITECTURE
   2.1 Database Description
   2.2 Database Schema (Diagrams)
   2.3 Connection Details
3. CODE EXPLANATION
   3.1 Admin Section
   3.2 Blood Donation Section
   3.3 Doctor Section
   3.4 Patient Section
4. ALGORITHMS AND LOGIC
5. TECHNICAL SPECIFICATIONS
6. CONTINUOUS ASSESSMENT NOTES
7. USER GUIDE
   7.1 Getting Started
   7.2 Product Overview
   7.3 Step-by-Step Instructions
   7.4 Troubleshooting / FAQ
8. FORMAL SPECIFICATIONS
   8.1 Requirements Specification
   8.2 Design Specification
   8.3 Testing / Maintenance

============================================================
1. INTRODUCTION
============================================================
Provide a concise overview of BloodBridge (purpose, audience, and programming stack: Next.js 15, TypeScript, MongoDB/Mongoose, Tailwind CSS, React 19). Mention key capabilities: donor management, blood requests, clinician/patient portals, support center.

============================================================
2. SYSTEM ARCHITECTURE
============================================================
2.1 Database Description
- Database name/location.
- Collections: users, roles, requests, donations, notifications, contactmessages, etc.
- Connection file: lib/db/connection.ts (cached Mongoose connection).

2.2 Database Schema (Diagrams)
Provide ERD/entity tables covering fields, data types, primary keys, and foreign keys. Example table:
Collection | Purpose | Key Fields | Notes
users | Accounts & profiles | fullName, email, role ref, hashed password | Roles: admin/donor/doctor/patient
roles | RBAC metadata | name, description, permissions[] | Default roles provided
requests | Blood requests | hospital info, patient info, urgency, fulfillment | requestId auto-generated
notifications | Alerts | recipient, type, priority | Contains virtuals/methods
contactmessages | Support tickets | referenceId, subject, priority, metadata | For continuous assessment

2.3 Connection Details
Document required environment variables (MONGODB_URI, etc.) and any connection strings.

============================================================
3. CODE EXPLANATION (SCREENSHOTS REQUIRED)
============================================================
*Requirement:* Insert screenshots of the code (not full files) under the relevant headings with captions explaining what the captured code does.

3.1 Admin Section
- Describe admin pages/components (example: /admin route).
- Screenshot placeholder: <Insert admin guard screenshot + caption>.
- Source file for screenshot: `app/(main)/admin/page.tsx` (capture the restricted access notice and quick stats cards).

3.2 Blood Donation Section
- Describe donor dashboard stats, scheduling logic (app/(main)/dashboard).
- Screenshot placeholder: <Insert donation module screenshot + caption>.
- Source file for screenshot: `app/(main)/dashboard/page.tsx` (focus on donor insights cards and overdue requests banner).

3.3 Doctor Section
- Show role gating logic from app/(main)/doctor/page.tsx.
- Screenshot placeholder: <Insert doctor module screenshot + caption>.
- Source file for screenshot: `app/(main)/doctor/page.tsx` (highlight the doctor tools grid and triage widgets).

3.4 Patient Section
- Show patient/caregiver logic from app/(main)/patient/page.tsx.
- Screenshot placeholder: <Insert patient tracker screenshot + caption>.
- Source file for screenshot: `app/(main)/patient/page.tsx` (capture the appointment tracker and care team cards).

============================================================
4. ALGORITHMS AND LOGIC
============================================================
Describe unique logic such as:
- Request priority scoring and overdue detection (lib/models/Request.ts).
- Support ticket reference generation (lib/models/ContactMessage.ts).
- AuthContext role helper (hasRole, userRole).
Include pseudo-code or flow descriptions where useful.

============================================================
5. TECHNICAL SPECIFICATIONS
============================================================
List hardware/software requirements: OS, Node.js version, RAM, disk, frameworks, database, tooling (ESLint, TypeScript, npm).

============================================================
6. CONTINUOUS ASSESSMENT NOTES
============================================================
Explain how this manual, with screenshots, architecture, specifications, and user guidance, satisfies continuous assessment requirements (structured, verifiable evidence).

============================================================
7. USER GUIDE
============================================================
7.1 Getting Started
- Installation (`npm install`), environment setup (`.env.local`), `npm run dev`.
- Instructions for creating/logging into an account.
- UI screenshots: capture the login form from `app/auth/login/page.tsx` and the registration form from `app/auth/register/page.tsx`.

7.2 Product Overview
- Summaries of main pages (home, dashboards, doctor/patient portals, support).
- UI screenshots with brief annotations sourced from `app/(main)/page.tsx` (home overview), `app/(main)/blood-availability/page.tsx` (live inventory), and `app/(main)/support/page.tsx` (support center).

7.3 Step-by-Step Instructions
- Task-based guides (e.g., ?Submit a blood request,? ?Monitor donations,? ?Use Support Center?).
- Include plenty of UI screenshots (NOT code) under each task: `app/(main)/request/page.tsx` (submit request), `app/(main)/donate/page.tsx` (monitor donations), `app/(main)/support/page.tsx` (support workflows).

7.4 Troubleshooting / FAQ
- Common issues (MongoDB connection errors, login problems) and resolutions.

============================================================
8. FORMAL SPECIFICATIONS
============================================================
8.1 Requirements Specification
- Functional requirements (donor management, blood request workflow, notifications, role-based views).
- Non-functional requirements (performance, security, reliability).

8.2 Design Specification
- Architecture diagrams: data flow, module interactions.

8.3 Testing / Maintenance
- Describe test coverage (manual tests, linting), known issues, maintenance schedule.

============================================================
SCREENSHOT REMINDER
============================================================
Replace every placeholder with actual screenshots of the code and user interface. Organize them under the headings specified above. Use Word?s ?Insert Caption? feature for clarity.
- Source file quick-reference:
  - Section 3.1: `app/(main)/admin/page.tsx`
  - Section 3.2: `app/(main)/dashboard/page.tsx`
  - Section 3.3: `app/(main)/doctor/page.tsx`
  - Section 3.4: `app/(main)/patient/page.tsx`
  - Section 7.1: `app/auth/login/page.tsx`, `app/auth/register/page.tsx`
  - Section 7.2: `app/(main)/page.tsx`, `app/(main)/blood-availability/page.tsx`, `app/(main)/support/page.tsx`
  - Section 7.3: `app/(main)/request/page.tsx`, `app/(main)/donate/page.tsx`, `app/(main)/support/page.tsx`
