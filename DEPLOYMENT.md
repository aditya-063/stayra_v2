# Zero-Cost Deployment Guide (Vercel)

You can put this application live **right now for free** using Vercel.

Because we built a smart **Mock Data Fallback**, we don't even need to set up a complex database for the first demo. The app will automatically detect it can't reach the database and show your beautiful "The Royal Atlantis" mock data instead.

## Step 1: Push to GitHub
If you haven't already, push your code to a GitHub repository:
1.  Initialize git: `git init`
2.  Add files: `git add .`
3.  Commit: `git commit -m "Ready for deploy"`
4.  Push to your GitHub repo (create one at [github.new](https://github.new) if needed).

## Step 2: Deploy to Vercel
1.  Go to [vercel.com](https://vercel.com) and Sign Up (Free).
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your GitHub repository.
4.  **Framework Preset**: It should auto-detect "Next.js".
5.  **Environment Variables**: 
    -   You can skip this! 
    -   Since we are using the "Demo Mode" (Mock Data), we don't need `DATABASE_URL`.
6.  Click **"Deploy"**.

## Step 3: Success!
-   Vercel will build your site (takes ~1 minute).
-   Once done, you will get a live URL (e.g., `stayra-app.vercel.app`).
-   Share it with anyone!

---

## (Optional) Advanced: Enabling Real Auth
If you want the "Login" feature to actually save users, you need a free Postgres database.
1.  On Vercel, go to **Storage** tab.
2.  Click **Create Database** -> Select **Postgres (Serverless)**.
3.  Accept the defaults (Region: US East usually fine).
4.  Go to **Settings** -> **Environment Variables**.
5.  It should auto-populate `POSTGRES_URL` etc.
6.  You would need to update `schema.prisma` to use `provider = "postgresql"` and re-deploy.

**Recommendation:** Stick to **Step 1 & 2** for today. It's free, instant, and "Stayra" looks perfect in demo mode.
