# REEF website

The public website of the Roundtable of Entrepreneurship Educators of Florida (REEF), live at [reef.center](https://reef.center). It is a single-page React site (Vite, TypeScript, Tailwind) with Privacy and Terms pages and a PHP contact form handler.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run typecheck
npm run build
```

The build goes to `dist/`, including `.htaccess` and `api/contact.php` from `public/`. `npm run preview` serves it locally (the contact form needs PHP, so it only works on the real host).

## Deploy

Merging to `main` runs `.github/workflows/deploy.yml`, which builds the site and deploys `dist/` from `main` through the GitHub "production" environment, using an upload key the server only accepts for writing into the site folder. Automatic deploys on push are enabled by the `DEPLOY_ENABLED` repository variable; the workflow can also be run by hand, with a dry run by default.
