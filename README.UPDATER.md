Wasla Updater (next app) — setup

This Next.js app will serve the updater manifest at:

  https://wasla-updater.backendglitch.com/latest.json

and static APKs under:

  https://wasla-updater.backendglitch.com/updates/apks/<file>.apk

Files placed under `public/` are served statically. The repository includes:

- `public/latest.json` - the current manifest (example present).
- `public/updates/apks/` - place your APK files here (e.g. `wasla-v4.apk`).

Publish endpoint

To update the manifest programmatically (no apk upload), POST JSON to:

  POST https://wasla-updater.backendglitch.com/api/publish

Body (JSON):
{
  "versionCode": 4,
  "apkUrl": "https://wasla-updater.backendglitch.com/updates/apks/wasla-v4.apk",
  "notes": "optional notes"
}

The endpoint will write `public/latest.json` (works when the app is hosted on a server with a writable filesystem).

Notes about APK uploads

- This app does not handle binary uploads to `public/updates/apks` by default. You can upload APKs via SFTP/SSH, rsync, or your CI/CD pipeline into `public/updates/apks/`.
- If you plan to deploy to a serverless platform (Vercel, Netlify), the filesystem is read-only at runtime. In that case, host APKs in object storage (S3, Cloudflare R2) and set `apkUrl` accordingly.

Shadcn UI setup

This project can use shadcn/ui for the frontend UI. To install locally:

1. Install dependencies

```bash
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

2. Install shadcn/ui (run from project root):

```bash
npx @shadcn/cli@latest init
npx @shadcn/cli@latest add button dialog --install
```

Follow the official shadcn docs to integrate components into `app/`.

Deployment

- Point the DNS for `wasla-updater.backendglitch.com` to your host (server or load balancer).
- Deploy the Next app (e.g., `pm2`, `docker`, `systemd`, or your hosting provider).
- Ensure `public/updates/apks` contains the APKs and `public/latest.json` points to them.

If you want, I can:
- Add a small admin UI to upload APKs (requires writable filesystem on host), or
- Add CI scripts to upload APKs to object storage and update `latest.json` automatically.

Tell me which option you prefer and I will implement it.
