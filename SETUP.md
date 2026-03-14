# Tenders General Merchant Ltd. — Website & CMS Setup Guide

## Overview

This is a complete enterprise-level corporate website with a powerful CMS dashboard built with:
- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **Backend**: Next.js API Routes (Node.js)
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: JWT + Secure HTTP-only cookies
- **CMS**: Custom headless admin dashboard at `/admin`

---

## Prerequisites

- Node.js 18+
- PostgreSQL 14+ (or Docker)
- npm or yarn

---

## Quick Start (Development)

### 1. Clone and Install

```bash
cd Tenders_Alpha
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your actual values:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/tenders_db"

# JWT (use a strong random secret)
JWT_SECRET="your-super-secret-jwt-key-min-32-chars"

# Admin credentials
ADMIN_EMAIL="admin@tendersgeneralmerchant.com"
ADMIN_PASSWORD="Admin@123456"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Set Up the Database

```bash
# Create and migrate the database
npx prisma migrate dev --name init

# Generate Prisma client
npx prisma generate

# Seed with sample data
npm run db:seed
```

### 4. Run Development Server

```bash
npm run dev
```

Visit:
- **Website**: http://localhost:3000
- **Admin CMS**: http://localhost:3000/admin
- **Login**: admin@tendersgeneralmerchant.com / Admin@123456

---

## Docker Setup (Production)

### 1. Build and Run with Docker Compose

```bash
# Create .env with production values
cp .env.example .env
# Edit .env with production settings

# Start all services
docker-compose up -d

# Run database migrations
docker-compose exec app npx prisma migrate deploy
docker-compose exec app npm run db:seed
```

### 2. Verify Services

```bash
docker-compose ps
docker-compose logs app
```

---

## Vercel Deployment

### 1. Push to GitHub

```bash
git push origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and import your repo
2. Add all environment variables from `.env.example`
3. Set up a Neon or Supabase PostgreSQL database
4. Update `DATABASE_URL` with the production database URL

### 3. Configure `next.config.js` for output

Add to `next.config.js` for standalone output:
```js
output: 'standalone'
```

---

## CMS Admin Dashboard

Access the admin at `/admin/login`

### Default Admin Credentials
- **Email**: admin@tendersgeneralmerchant.com
- **Password**: Admin@123456

> ⚠️ **Change the default password immediately in production!**

### CMS Modules

| Module | Route | Description |
|--------|-------|-------------|
| Dashboard | /admin/dashboard | Overview stats and activity |
| Hero Slides | /admin/hero | Manage homepage slider |
| Services | /admin/services | Add/edit/delete services |
| Projects | /admin/projects | Portfolio management |
| Sister Companies | /admin/sister-companies | Partner company management |
| Team Members | /admin/team | Leadership team |
| Testimonials | /admin/testimonials | Client testimonials |
| Messages | /admin/messages | Contact form submissions |
| Tenders | /admin/tenders | Tender portal submissions |
| Media Library | /admin/media | Upload and manage images |
| Users | /admin/users | Admin user management |
| Settings | /admin/settings | Site-wide settings |

---

## Website Structure

### Public Pages

| Page | Route |
|------|-------|
| Home | / |
| About | /about |
| Services | /services |
| Service Detail | /services/[slug] |
| Projects | /projects |
| Project Detail | /projects/[slug] |
| Sister Companies | /sister-companies |
| Sister Company Detail | /sister-companies/[slug] |
| Contact | /contact |
| Careers | /careers |
| Tender Portal | /tenders |

---

## File Structure

```
/
├── app/
│   ├── (website)/          # Public website pages
│   │   ├── page.tsx        # Home
│   │   ├── about/
│   │   ├── services/
│   │   ├── projects/
│   │   ├── sister-companies/
│   │   ├── contact/
│   │   ├── careers/
│   │   └── tenders/
│   ├── admin/              # CMS admin dashboard
│   │   ├── login/
│   │   ├── dashboard/
│   │   ├── hero/
│   │   ├── services/
│   │   ├── projects/
│   │   ├── sister-companies/
│   │   ├── team/
│   │   ├── testimonials/
│   │   ├── messages/
│   │   ├── media/
│   │   ├── users/
│   │   ├── settings/
│   │   └── tenders/
│   └── api/                # API routes
│       ├── auth/
│       ├── hero/
│       ├── services/
│       ├── projects/
│       ├── sister-companies/
│       ├── contact/
│       ├── media/
│       ├── settings/
│       ├── team/
│       ├── testimonials/
│       ├── users/
│       ├── tenders/
│       ├── dashboard/
│       └── audit-logs/
├── components/
│   ├── website/            # Public website components
│   │   ├── about/
│   │   ├── sections/       # Homepage sections
│   │   ├── HeroSlider.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   └── admin/              # CMS admin components
│       ├── AdminLayoutClient.tsx
│       ├── DashboardClient.tsx
│       ├── HeroManagerClient.tsx
│       ├── ServicesManagerClient.tsx
│       ├── ProjectsManagerClient.tsx
│       ├── MediaLibraryClient.tsx
│       ├── MediaPickerModal.tsx
│       └── ...
├── lib/
│   ├── prisma.ts           # Prisma client
│   ├── auth.ts             # JWT authentication
│   ├── utils.ts            # Utility functions
│   ├── upload.ts           # File upload handling
│   └── validations.ts      # Zod schemas
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Database seeding
├── public/
│   ├── images/             # Static images
│   └── uploads/            # User uploaded files
├── .env.example
├── Dockerfile
├── docker-compose.yml
└── SETUP.md
```

---

## Adding Placeholder Hero Images

For development, add placeholder images at:
- `/public/images/hero/hero-1.jpg`
- `/public/images/hero/hero-2.jpg`

Or use an online image URL in the CMS hero manager.

---

## Database Schema

Key tables:
- `users` — Admin users with roles
- `hero_slides` — Homepage slider
- `hero_typewriter_words` — Typewriter animation words
- `services` — Company services
- `projects` — Project portfolio
- `sister_companies` — Partner companies
- `team_members` — Leadership team
- `testimonials` — Client testimonials
- `contact_messages` — Contact form submissions
- `media_files` — Uploaded media
- `site_settings` — Key-value site settings
- `audit_logs` — Admin action tracking
- `tender_submissions` — Tender portal submissions
- `job_postings` — Career listings

---

## Security Features

- JWT with HTTP-only secure cookies
- Protected admin routes via middleware
- Input validation with Zod
- SQL injection prevention via Prisma
- XSS protection headers
- Rate limiting (recommended for production)
- CSRF protection via SameSite cookies

---

## Performance Features

- Next.js Server Components for fast initial loads
- Image optimization with Next.js Image
- Lazy loading for components
- Code splitting via Next.js
- Static generation where possible
- Efficient database queries with Prisma

---

## Company Information

**Tenders General Merchant Ltd.**

- **Head Office**: 18 Essumei Street Off White House Bus Stop, Okokomaiko Badagry Expressway, Lagos State
- **Branch Office**: 9 Farm Road Off Location Bus Stop, Mbuogba NTA Road, Port Harcourt, Rivers State
- **Phone**: 07065220758 | 08073175838
- **Email**: tendersgeneralmerchant@gmail.com | okechukwuessumei@gmail.com
- **Founded**: 2009 | **Incorporated**: 2012

---

## Support

For technical support or inquiries, contact your system administrator.
