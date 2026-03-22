# MSDSM Alumni Portal

A full‑stack alumni management portal for MSDSM (IIT Indore / IIM Indore). The portal provides student and admin views to manage alumni records, jobs, events, placements, messages, and map locations. It integrates with Supabase (Postgres SQL + Auth) and includes a Node/Express backend for admin CRUD.

## Key Features

- Student portal with dashboard, alumni directory, jobs, events, messages, and map view
- Admin dashboard for student records, placements, and events management
- Supabase integration for data storage and authentication
- Job application flow with modal form and Supabase storage
- Responsive UI with shared header/footer and consistent theme

## Tech Stack

- Frontend: Angular 13
- Backend: Node.js + Express
- Database: Supabase Postgres (SQL)
- Auth: Supabase Auth (email/password)
- Maps: Leaflet

## Prerequisites

- Node.js 16+
- Supabase project (URL + anon key + service role key)

## Setup

### 1) Install dependencies

```bash
npm install
```

### 2) Environment configuration

Create `.env` in the project root (do not commit):

```
DATABASE_URL=postgresql://postgres:<password>@db.<project_ref>.supabase.co:5432/postgres
SUPABASE_URL=https://<project_ref>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service_role_key>
JWT_SECRET=<any_random_string>
```

Update Angular environments (do not commit secrets):

`src/environments/environment.ts`

```ts
export const environment = {
  production: false,
  supabaseUrl: 'YOUR_SUPABASE_URL',
  supabaseKey: 'YOUR_SUPABASE_ANON_KEY'
};
```

`src/environments/environment.prod.ts`

```ts
export const environment = {
  production: true,
  supabaseUrl: 'YOUR_SUPABASE_URL',
  supabaseKey: 'YOUR_SUPABASE_ANON_KEY'
};
```

### 3) Start backend

```bash
node server.js
```

### 4) Start frontend

```bash
ng serve
```

App runs at: `http://localhost:4200`

## Supabase Auth Setup

- Create Auth users in Supabase (Authentication → Users)
- Their emails must match `mail_id` in `Admin_list` / `Studentslist_2025`

Bulk creation (optional):

```bash
node scripts/create-auth-users.js
```

## Database Tables (Supabase SQL)

Core tables used in this project:

- alumni
- jobs
- events
- placements
- news
- careers
- messages
- job_applications

Role tables:

- Admin_list
- Studentslist_2025

## Routing Overview

- /signin – login page
- /student – student landing page
- /dashboard – dashboard
- /alumni – alumni directory
- /jobs – job listings + apply
- /events – events
- /messages – chat/messaging
- /map-locations – alumni map
- /admin – admin dashboard

## Notes

- The frontend reads Supabase directly using the anon key.
- Admin CRUD (students, placements, events) is handled by the backend.
- Supabase RLS must allow authenticated users to read their own records.

## Demo & Screens

See `demo/` folder or PPT for screenshots. Placeholders included.

If you need help running the project, please contact the team.
