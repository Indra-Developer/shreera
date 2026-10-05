# Shreera Store

Responsive Shreera fashion storefront built with Next.js, TypeScript, React, and Tailwind CSS.

## Run locally

Use Node.js 20.9 or newer:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run verify
```

This runs ESLint, TypeScript validation, and the production build.

## Push to GitHub

Create an empty repository on GitHub, then run these commands from this folder:

```bash
git init
git add .
git commit -m "Build Shreera storefront"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

Replace the remote URL with the repository you created. Do not commit `.env` files, `.next`, `node_modules`, or `.vercel`; they are already excluded in `.gitignore`.

## Deploy to Vercel

1. Sign in to Vercel and choose **Add New → Project**.
2. Import the GitHub repository.
3. Keep the detected framework as **Next.js** and the default build settings.
4. Add any required environment variables in Vercel before deploying.
5. Select **Deploy**. Future pushes to `main` will create new production deployments.

No custom Vercel configuration is required for this Next.js App Router project.
