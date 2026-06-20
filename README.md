# Online Complaint and Feedback System

## Prerequisites

- Node.js 18+
- PostgreSQL 14+

## Setup

### Database

1. Create a PostgreSQL database:

   ```bash
   createdb complaints
   ```

2. Run the init script:

   ```bash
   psql -d complaints -f backend/init.sql
   ```

3. Update `backend/.env` with your actual `DB_URL`, `JWT_SECRET`, and `PORT`.

### Backend

```bash
cd backend
npm install
npm run dev
```

The backend runs on `http://localhost:5000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

## Default Admin

- Email: `admin@system.com`
- Password: Update the hash in `init.sql` with a real bcrypt hash before running.

Generate a hash with:

```bash
node -e "const bcrypt = require('bcrypt'); bcrypt.hash('your-password', 10).then(console.log)"
```
