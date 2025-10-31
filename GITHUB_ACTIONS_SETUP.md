# GitHub Actions Setup Guide

This guide explains how to configure GitHub Actions secrets for automated deployments.

## Required Secrets

To enable the GitHub Actions workflow for automated deployments, you need to configure the following secrets in your repository:

### 1. Navigate to Repository Settings
1. Go to your repository on GitHub: `https://github.com/ckorhonen/creator-tools-mvp`
2. Click on **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**

### 2. Add Cloudflare Secrets

#### CLOUDFLARE_API_TOKEN
- **Value**: Your Cloudflare API Token
- **How to get it**:
  1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
  2. Click **Create Token**
  3. Use **Edit Cloudflare Workers** template or create custom token with:
     - Account - Cloudflare Pages:Edit
     - Account - Cloudflare Workers:Edit
     - Account - D1:Edit
  4. Copy the token value

#### CLOUDFLARE_ACCOUNT_ID
- **Value**: Your Cloudflare Account ID
- **How to get it**:
  1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
  2. Select any domain/site
  3. Scroll down on the Overview page
  4. Find **Account ID** in the right sidebar
  5. Copy the value

### 3. Add Frontend Environment Variables

These secrets are used to configure the frontend application:

#### VITE_API_URL
- **Value**: Your Cloudflare Workers API URL
- **Example**: `https://creator-tools-api.your-subdomain.workers.dev`
- **Note**: Deploy the Workers API first to get this URL

#### VITE_TWITTER_CLIENT_ID
- **Value**: Your Twitter/X OAuth 2.0 Client ID
- **How to get it**: See [DEPLOYMENT.md](./DEPLOYMENT.md#twitterx-api-setup)

#### VITE_LINKEDIN_CLIENT_ID
- **Value**: Your LinkedIn OAuth 2.0 Client ID
- **How to get it**: See [DEPLOYMENT.md](./DEPLOYMENT.md#linkedin-api-setup)

#### VITE_INSTAGRAM_APP_ID
- **Value**: Your Instagram/Facebook App ID
- **How to get it**: See [DEPLOYMENT.md](./DEPLOYMENT.md#instagram-api-setup)

## Workflow Behavior

### Automatic Deployments

The workflow runs automatically when:
- **Commits are pushed to `main` branch**: Full deployment (frontend + workers)
- **Pull requests target `main` branch**: Preview deployment

### Jobs

1. **deploy-frontend**: Builds and deploys the React frontend to Cloudflare Pages
2. **deploy-workers**: Deploys the API to Cloudflare Workers

## Prerequisites Before First Deployment

### 1. Create D1 Database

Before the first Workers deployment, you must create the D1 database:

```bash
cd workers/api
wrangler d1 create creator_tools_db
```

Copy the `database_id` from the output.

### 2. Update wrangler.toml

Edit `workers/api/wrangler.toml` and add your `database_id`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "creator_tools_db"
database_id = "your-actual-database-id-here"  # Replace this
```

### 3. Initialize Database

Run the schema to create tables:

```bash
wrangler d1 execute creator_tools_db --file=./schema.sql
```

### 4. Set Cloudflare Workers Secrets

Set the API secrets for social platforms:

```bash
wrangler secret put TWITTER_API_KEY
wrangler secret put TWITTER_API_SECRET
wrangler secret put LINKEDIN_CLIENT_ID
wrangler secret put LINKEDIN_CLIENT_SECRET
wrangler secret put INSTAGRAM_APP_ID
wrangler secret put INSTAGRAM_APP_SECRET
```

## Troubleshooting

### Error: Missing Secrets

If deployment fails with "Secret not found" errors:
1. Verify all secrets are added in GitHub repository settings
2. Check secret names match exactly (case-sensitive)
3. Secrets may take a few seconds to propagate after adding

### Error: Database Not Found

If Workers deployment fails with database errors:
1. Ensure D1 database is created: `wrangler d1 list`
2. Verify `database_id` is set in `wrangler.toml`
3. Check database is initialized: `wrangler d1 execute creator_tools_db --command="SELECT name FROM sqlite_master WHERE type='table'"`

### Error: API Token Invalid

If deployment fails with authentication errors:
1. Regenerate API token with correct permissions
2. Update `CLOUDFLARE_API_TOKEN` secret in GitHub
3. Ensure token hasn't expired

### Error: npm ci Failed

If npm install fails:
1. The workflow automatically falls back to `npm install` if `package-lock.json` is missing
2. Consider committing `package-lock.json` files for reproducible builds:
   ```bash
   npm install  # Generate package-lock.json
   git add package-lock.json
   git commit -m "Add package-lock.json for reproducible builds"
   ```

## Manual Deployment

If automated deployment fails, you can deploy manually:

### Deploy Frontend
```bash
npm install
npm run build
npx wrangler pages deploy dist --project-name=creator-tools-mvp
```

### Deploy Workers
```bash
cd workers/api
npm install
wrangler deploy
```

## Monitoring

### View Deployment Logs

1. Go to **Actions** tab in your repository
2. Click on the latest workflow run
3. Click on a job to see detailed logs

### View Cloudflare Logs

```bash
# Stream Workers logs
wrangler tail

# View Pages deployment logs
# Go to Cloudflare Dashboard → Pages → Your Project → Deployments
```

## Next Steps

After successful deployment:

1. ✅ Test the deployed application
2. ✅ Configure custom domain (optional)
3. ✅ Set up monitoring alerts
4. ✅ Review and optimize build times
5. ✅ Consider adding staging environment

---

For more detailed deployment information, see [DEPLOYMENT.md](./DEPLOYMENT.md).
