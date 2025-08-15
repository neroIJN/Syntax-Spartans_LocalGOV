# Authentication Testing Guide

This guide will help you test the complete authentication system in the LocalGOV application.

## Setup Instructions

### 1. Start the Backend Server

Open a terminal and navigate to the backend directory:

```bash
cd E:\MY\PROJECTS\WEB APP\Syntax-Spartans_LocalGOV\backend
```

Install dependencies if you haven't already:

```bash
npm install
```

Start the server:

```bash
npm start
```

### 2. Create a Test User

In a new terminal, run the test user creation script:

```bash
cd E:\MY\PROJECTS\WEB APP\Syntax-Spartans_LocalGOV\backend
node create-test-user.js
```

This will create a test user with the following credentials:
- Email: test@example.com
- Password: password123

### 3. Start the Frontend

Open a new terminal and navigate to the frontend directory:

```bash
cd E:\MY\PROJECTS\WEB APP\Syntax-Spartans_LocalGOV\frontend
```

Install dependencies if you haven't already:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Testing Routes

### Test Page
Navigate to `http://localhost:3000/test` to access the authentication test page. This page allows you to:
- Test login functionality
- Test token verification
- Check current authentication state
- Navigate to different pages to test redirects

### Login Page
Navigate to `http://localhost:3000/auth/login` and login with:
- Email: test@example.com
- Password: password123

After successful login, you should be redirected to the dashboard.

### Dashboard
Access the dashboard at `http://localhost:3000/dashboard`. If you're authenticated, you'll see the dashboard. If not, you'll be redirected to the login page.

### Redirect Test
Try accessing `http://localhost:3000/citizen/dashboard`. You should be automatically redirected to `/dashboard`.

## Important Note About Next.js Routing

This project uses Next.js App Router with route groups (folders with parentheses). These route groups allow for logical organization of routes without affecting the URL structure.

For example:
- Files in `app/(citizen)/dashboard/page.tsx` are accessed at `/dashboard` (not `/citizen/dashboard`)
- Files in `app/(officer)/dashboard/page.tsx` would also be accessed at `/dashboard`

This can be confusing because the URL path doesn't reflect the folder structure. We've set up redirects to help with this:
- `app/citizen/dashboard/page.tsx` redirects to `/dashboard`
- `app/dashboard-redirect/page.tsx` also redirects to `/dashboard`

When testing, make sure to use the correct URL paths:
- Use `/dashboard` to access the dashboard (not `/citizen/dashboard`)
- Use `/auth/login` for the login page
- Use `/test` for the test page

## Authentication Flow

1. User logs in via `/auth/login`
2. Backend validates credentials and returns a JWT token
3. Frontend stores the token in localStorage
4. Protected routes check for the token via the AuthGuard component
5. If no token exists, user is redirected to login
6. Dashboard route (`/dashboard`) shows the citizen dashboard if authenticated
