# Staffex Staffing Solutions - Full Stack Website + HRMS

This repository contains a complete full-stack implementation for **Staffex Staffing Solutions**.

## Tech Stack
- **Frontend:** Next.js 14 + TailwindCSS
- **Backend:** Node.js + Express
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT + bcrypt
- **Uploads:** Multer for resumes
- **Document Generation:** PDFKit for HR letters
- **Export:** ExcelJS for employee exports

## Folder Structure

```text
.
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── templates
│   │   ├── uploads/resumes
│   │   ├── utils
│   │   └── server.js
│   └── .env.example
└── frontend
    ├── app
    │   ├── about
    │   ├── admin
    │   │   ├── employees
    │   │   ├── letters
    │   │   ├── applications
    │   │   └── queries
    │   ├── careers
    │   ├── contact
    │   ├── services
    │   ├── layout.js
    │   └── page.js
    ├── components
    └── lib
```

## Features Delivered

### 1) Public Website
- Home, About, Services, Careers, Contact pages
- Responsive design with TailwindCSS
- Contact form that saves queries in MongoDB
- Job application form with resume upload (PDF/DOC/DOCX)

### 2) Admin Dashboard (JWT Login)
- Admin login with email/password
- Employee Management:
  - Add, edit, delete, search employees
  - Full employee schema support including payroll, IDs, banking, and profile fields
  - Export employees to Excel
- Letter Generator:
  - Show Cause, First/Second/Final Warning, Termination
  - Generate and download PDF by selecting employee + reason
- Applications & Queries:
  - View job applications
  - Download uploaded resumes
  - View contact queries
- Mobile-responsive admin layout

## Backend API Overview

### Public
- `POST /api/public/contact` - submit contact query
- `POST /api/public/careers/apply` - submit job application with resume upload

### Auth
- `POST /api/auth/login` - admin login

### Protected (Bearer Token Required)
- `GET /api/employees` - list/search/filter employees
- `POST /api/employees` - create employee
- `PUT /api/employees/:id` - update employee
- `DELETE /api/employees/:id` - delete employee
- `GET /api/employees/export/excel` - download Excel export
- `POST /api/letters/generate` - generate/download letter PDF
- `GET /api/admin/applications` - list applications
- `GET /api/admin/applications/:id/resume` - download resume
- `GET /api/admin/queries` - list contact queries

## Setup Instructions

### 1. Backend
```bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```

### 3. Open app
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000/api`

### Default Admin Credentials
- Email: `admin@staffex.com`
- Password: `Admin@123`

(You can override credentials in backend `.env`.)
