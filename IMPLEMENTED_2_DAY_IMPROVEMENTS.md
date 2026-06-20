# Implemented 2-Day Improvements

These changes focus on presentation-ready Web Development and HCI improvements without rebuilding the whole project.

## What was added

### Backend
- Server-side validation for registration, login, ticket creation, and replies.
- Email normalization to lowercase before database checks/saves.
- Name validation: letters, spaces, hyphens, and apostrophes only.
- Strong password validation: uppercase, lowercase, number, special character, minimum 8 characters.
- Ticket validation: valid type/category pair, valid priority, required description, minimum 10 characters, max 1000 characters.
- Basic input sanitization by stripping HTML tags from free-text fields.
- Rate limiting for login, registration, ticket submission, and replies.
- Status flow guardrail: `Open -> In Progress -> Resolved -> Closed`.
- Activity logs for ticket status updates, ticket deletion, user creation, user deletion, user activation/deactivation, and user role updates.
- Super Admin guardrails: cannot delete/deactivate/change own account, and cannot remove the last active Admin/Super Admin.
- Super Admin endpoint for activity logs: `GET /api/superadmin/activity-logs`.

### Frontend
- Registration form validation with stronger, clearer messages.
- Password strength meter.
- Login/admin login validation before submit.
- Ticket form validation with live description character counter.
- Submit buttons disabled while loading to prevent double submission.
- 403 Forbidden page.
- PrivateRoute now redirects unauthorized users to `/403`.
- Admin status changes now ask for confirmation before updating.
- Super Admin user/ticket destructive actions ask for confirmation.
- Super Admin Activity Logs tab.
- More consistent loading, empty, and error handling.

## Files changed most importantly

### Backend
- `server/controllers/authController.js`
- `server/controllers/ticketController.js`
- `server/controllers/adminController.js`
- `server/controllers/superAdminController.js`
- `server/routes/authRoutes.js`
- `server/routes/ticketRoutes.js`
- `server/routes/superAdminRoutes.js`
- `server/middleware/rateLimit.js`
- `server/services/activityLogService.js`
- `server/util/validation.js`
- `server/db/migrations/009_create_activity_logs.sql`
- `server/db/schema.sql`

### Frontend
- `client/src/pages/user/Register.jsx`
- `client/src/pages/user/Login.jsx`
- `client/src/pages/user/NewTicket.jsx`
- `client/src/pages/user/TicketDetail.jsx`
- `client/src/pages/admin/AdminLogin.jsx`
- `client/src/pages/admin/AdminDashboard.jsx`
- `client/src/pages/admin/AdminTicketDetail.jsx`
- `client/src/pages/admin/SuperAdmin.jsx`
- `client/src/pages/Forbidden.jsx`
- `client/src/components/PrivateRoute.jsx`
- `client/src/router.jsx`
- `client/src/utils/validation.js`
- `client/src/services/api.js`

## Database step required

Run this in DBeaver before testing Activity Logs:

```sql
SOURCE server/db/migrations/009_create_activity_logs.sql;
```

If DBeaver does not support `SOURCE`, open `server/db/migrations/009_create_activity_logs.sql`, copy the full SQL, and run it directly.

## How to test

1. Run database migration `009_create_activity_logs.sql`.
2. Start backend and frontend.
3. Register with invalid names, invalid email, weak password, and mismatched confirm password. Confirm clear errors appear.
4. Register with a valid account and submit a ticket.
5. Try submitting an empty/short ticket description. Confirm it is blocked.
6. Log in as admin and try changing ticket status out of order, such as `Open -> Resolved`. It should be blocked.
7. Change status in order: `Open -> In Progress -> Resolved -> Closed`.
8. Log in as Super Admin and open `Manage Users -> Activity Logs` to see logged actions.
9. Try accessing Super Admin pages as normal user/admin. You should be sent to `/403`.

## Build verification

Frontend build was tested successfully with:

```bash
npm run build
```
