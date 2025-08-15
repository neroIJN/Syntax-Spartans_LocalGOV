# Next.js Route Groups and URL Structure

## Important Note About Next.js Routing

This project uses Next.js App Router with route groups (folders with parentheses). Understanding this routing structure is crucial for frontend integration.

### How Route Groups Work

In Next.js App Router, folders with parentheses (like `(citizen)`) create route groups that **don't affect the URL path**:

```
app/
  (citizen)/
    dashboard/
      page.tsx   # URL: /dashboard (NOT /citizen/dashboard)
  (officer)/
    dashboard/
    page.tsx     # URL: /dashboard (for officers)
  auth/
    login/
      page.tsx   # URL: /auth/login
```

### Potential Issues and Solutions

#### URL Path Confusion

The most common issue is trying to access a route with the group name in the URL, which won't work:
- ❌ `/citizen/dashboard` (incorrect path)
- ✅ `/dashboard` (correct path)

#### Route Conflicts

You cannot have two pages that resolve to the same URL path. For example:
- `app/(citizen)/dashboard/page.tsx` → URL: `/dashboard`
- `app/dashboard/page.tsx` → URL: `/dashboard`

This causes a conflict error: "You cannot have two parallel pages that resolve to the same path."

#### Redirects for User Experience

To help users who might try the incorrect URL, we've added redirects:
- `app/citizen/dashboard/page.tsx` redirects to `/dashboard`

### Integration Tips

1. **Use correct URLs in links and redirects:**
   ```jsx
   // Correct
   <Link href="/dashboard">Dashboard</Link>
   
   // Incorrect
   <Link href="/citizen/dashboard">Dashboard</Link>
   ```

2. **Handle role-based access properly:**
   ```jsx
   // This works because both citizen and officer dashboards have the same URL path
   router.push('/dashboard'); // Will go to the appropriate dashboard based on user role
   ```

3. **Be mindful when accessing pages directly:**
   Always use the correct URL path without the route group name.

### Benefits of Route Groups

- Organize code by role/access level without affecting URLs
- Share layouts across related routes
- Create multiple root layouts in a single app
- Split large applications into sections

## References

- [Next.js Route Groups Documentation](https://nextjs.org/docs/app/building-your-application/routing/route-groups)
- [App Router Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)
