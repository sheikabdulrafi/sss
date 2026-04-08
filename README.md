# HRMS + Payroll SaaS (Multi-Tenant)

A full-stack HRMS and payroll platform with multi-tenancy, configurable payroll rules, dynamic employee fields, and document generation.

## Stack
- **Frontend:** Next.js (App Router) + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** MongoDB + Mongoose
- **Auth:** JWT + Role-based permissions
- **Files:** Multer uploads
- **Docs:** PDFKit (offer letters, payslips)
- **Exports:** ExcelJS payroll export

## Core SaaS Design
- Every business entity is tenant-scoped via `companyId`.
- Super admin can manage multiple companies.
- Admin/HR operate within their own company.

## Modules Included
- Company configuration (branding, HR settings)
- Dynamic fields builder (`config.dynamicEmployeeFields`)
- RBAC roles: `SUPER_ADMIN`, `ADMIN`, `HR`, `EMPLOYEE`
- Employee lifecycle records
- Payroll engine with configurable rules
- Document templates + placeholder rendering
- Dashboard analytics

## API Endpoints
- `POST /api/auth/login`
- `POST /api/company`
- `GET /api/company`
- `PUT /api/company`
- `POST /api/config/payroll`
- `GET /api/config`
- `CRUD /api/employees`
- `POST /api/payroll/run`
- `GET /api/payroll`
- `GET /api/payroll/export/:id`
- `POST /api/documents/templates`
- `GET /api/documents/employee/:employeeId/:type`
- `GET /api/documents/payslip/:runId/:employeeId`
- `GET /api/dashboard`

## Run Locally

### 1) Backend
```bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev
```

### 2) Frontend
```bash
cd frontend
npm install
npm run dev
```

Set API URL if needed:
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Seed Users
- Super Admin: `superadmin@hrms.com` / `Admin@123`
- Company Admin (Acme): `admin@acme.com` / `Admin@123`

## Notes
- Uploads are served from `backend/src/uploads`.
- Dynamic employee fields are rendered in admin employee form.
- Payroll uses company-level configurable percentages and deductions.
