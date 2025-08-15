# LocalGov Frontend

This is the frontend application for the LocalGov project, built with Next.js, TypeScript, and Tailwind CSS.

## Routing Structure

This project uses Next.js App Router with route groups. Route groups are designated by folders with parentheses, and they allow for logical organization of routes without affecting the URL structure.

### Important Route Groups:

- `app/(citizen)/` - Contains pages for authenticated citizens
- `app/(officer)/` - Contains pages for authenticated officers
- `app/(public)/` - Contains public pages

### URL Paths:

When using route groups, the folder name with parentheses does NOT appear in the URL path:

- `app/(citizen)/dashboard/page.tsx` → URL: `/dashboard`
- `app/(officer)/dashboard/page.tsx` → URL: `/dashboard` (same URL, different page based on user role)
- `app/auth/login/page.tsx` → URL: `/auth/login`

### Redirects:

To help users who might try to access `/citizen/dashboard` (which doesn't work due to the route group structure), we've added redirects:

- `app/citizen/dashboard/page.tsx` → Redirects to `/dashboard`
- `app/dashboard-redirect/page.tsx` → Redirects to `/dashboard`

## Authentication

The application uses JWT-based authentication with a MySQL database. Authentication state is managed with the `useAuth` hook, and routes are protected with the `AuthGuard` component.

### Testing Authentication:

1. Start the backend server and frontend development server
2. Create a test user if needed
3. Access the login page at `/auth/login`
4. Use the test page at `/test` to verify authentication functionality

## Development

### Getting Started:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

### Building for Production:

```bash
npm run build
npm start
```

## Important Pages:

- `/dashboard` - Main dashboard for authenticated users
- `/auth/login` - Login page
- `/auth/register` - Registration page
- `/test` - Test page for authentication functionality

## Common Issues:

### Routing Conflicts:

If you see an error like:

```
You cannot have two parallel pages that resolve to the same path.
```

Check that you don't have two pages trying to serve the same URL path. This can happen if you have:

- A page in a route group: `app/(citizen)/dashboard/page.tsx`
- A page with the same name: `app/dashboard/page.tsx`

These would both try to serve the `/dashboard` URL, causing a conflict.

### Next.js Route Groups:

Remember that folders with parentheses (like `(citizen)`) don't appear in the URL path. This can be confusing if you're trying to access a page at `/citizen/dashboard` when it's actually available at `/dashboard`.
