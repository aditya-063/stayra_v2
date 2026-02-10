# Stayra Deployment & Release Workflow

This document outlines the standard deployment and release process for the Stayra application.

## 🚀 Branch Strategy

We follow a simplified GitFlow strategy:

| Branch   | Environment | URL                | Purpose                                      |
|----------|-------------|--------------------|----------------------------------------------|
| `main`   | Production  | https://stayra.com | Stable, user-facing code                     |
| `dev`    | Preview     | https://dev.stayra.vercel.app | Integration testing, feature verification    |
| `feature/*`| Local     | localhost:3000     | Active development                           |

### Workflow Steps

1. **Development**: Create a feature branch from `dev`.
   ```bash
   git checkout -b feature/my-new-feature
   ```

2. **Pull Request**: Open a PR to `dev`.
   - Vercel automatically deploys a preview URL.
   - Run sanity checks on the preview URL.

3. **Merge to Dev**: Squash and merge to `dev`.
   - Automatically deploys to the designated Preview environment.

4. **Production Release**: 
   - Open a PR from `dev` to `main`.
   - Use the release title pattern: `Release vX.Y.Z - [Description]`.
   - Merge to `main` triggers production deployment.

---

## 🛠️ Environment Configuration

Ensure the following environment variables are set in Vercel project settings:

### Production Environment
- `NODE_ENV`: `production`
- `DATABASE_URL`: Production PostgreSQL connection string (Supabase/Neon)
- `NEXT_PUBLIC_APP_URL`: `https://stayra.com`
- `NEXTAUTH_URL`: `https://stayra.com`
- `JWT_SECRET`: Production-grade random string (min 32 chars)
- `NEXTAUTH_SECRET`: Production-grade random string (min 32 chars)
- `POSTHOG_API_KEY`: Production project key
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`: Production OAuth credentials

### Preview Environment
- `NODE_ENV`: `production` (builds as production)
- `DATABASE_URL`: Preview/Staging PostgreSQL connection string
- `NEXT_PUBLIC_APP_URL`: Vercel system var (`https://$VERCEL_URL`)
- `NEXTAUTH_URL`: Vercel system var (`https://$VERCEL_URL`)

---

## ✅ Pre-Deployment Checklist

Before merging to `main`:

1. **Database Migrations**
   - Check if `prisma/migrations` contains new migrations.
   - Run `npx prisma migrate status` to verify sync.

2. **API Contract Check**
   - Ensure specific `src/types/api.ts` contracts are respected.
   - Verify no breaking changes to `/api/hotels/[id]/offers` or `/api/click`.

3. **Build Verification**
   - Run `npm run build` locally to catch type errors.
   - Run `npm run lint` to catch code issues.

---

## 🚨 Rollback Procedure

If a production deployment fails or introduces a critical bug:

1. **Instant Rollback (Vercel)**
   - Go to Vercel Dashboard > Deployments.
   - Find the last known good deployment (green checkmark).
   - Click "Redeploy" or "Promote to Production".
   - This takes < 1 minute.

2. **Database Rollback**
   - If a migration caused data issues:
   - Connect to DB and revert schema changes manually or via `prisma migrate resolve`.
   - *Note: Down migrations are not natively supported by Prisma, always backup before major schema changes.*

3. **Code Revert**
   - Revert the merge commit on `main`.
   - Push to `main` to trigger a new deployment.

---

## 🔒 Security Best Practices

- **Never commit `.env` files.**
- **Rotate secrets** (JWT, OAuth) periodically.
- **Review dependency updates** (`npm audit`) before releases.
- **Sanitize logs** - ensure no PII or secrets are logged to Vercel logs.
