# Deployment Quick Start Guide

## Current Status

The GitHub Actions workflow has been fixed to deploy without requiring database or OAuth configuration. You can now deploy with minimal setup!

## Minimal Deployment (5 minutes)

To get your application deployed immediately:

### Step 1: Configure Required GitHub Secrets

Go to: `Settings` → `Secrets and variables` → `Actions` → `New repository secret`

Add these two required secrets:

1. **CLOUDFLARE_API_TOKEN**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
   - Click "Create Token"
   - Use the "Edit Cloudflare Workers" template
   - Also add "Cloudflare Pages" permissions
   - Click "Continue to summary" → "Create Token"
   - Copy the token value

2. **CLOUDFLARE_ACCOUNT_ID**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Look for "Account ID" in the right sidebar
   - Copy the ID

### Step 2: Trigger Deployment

Either:
- Push a commit to the `main` branch, OR
- Go to `Actions` → `Deploy to Cloudflare` → `Run workflow`

### Step 3: Access Your Deployed App

After successful deployment (usually 2-3 minutes):
- **Frontend**: `https://creator-tools-mvp.pages.dev`
- **API**: `https://creator-tools-api.ckorhonen.workers.dev`

## What Works Immediately

✅ Frontend UI fully functional
✅ Workers API deployed and responding
✅ Basic routing and navigation
✅ UI components and styling

## What Requires Additional Configuration

### Add Database Support (Optional, 10 minutes)

The app works without a database, but to enable post scheduling and analytics:

```bash
cd workers/api
npx wrangler d1 create creator_tools_db
```

Copy the `database_id` from output, then edit `workers/api/wrangler.toml`:

```toml
# Uncomment and update:
[[d1_databases]]
binding = "DB"
database_name = "creator_tools_db"
database_id = "your-actual-id-here"
```

Initialize schema:
```bash
npx wrangler d1 execute creator_tools_db --file=./schema.sql
```

Commit and push:
```bash
git add workers/api/wrangler.toml
git commit -m "Configure D1 database"
git push
```

### Add Social Media OAuth (Optional, 30-45 minutes)

To enable Twitter, LinkedIn, and Instagram posting:

1. **Twitter/X**
   - Create app at [developer.twitter.com](https://developer.twitter.com)
   - Set callback URL: `https://creator-tools-mvp.pages.dev/auth/twitter/callback`
   - Add `VITE_TWITTER_CLIENT_ID` secret to GitHub

2. **LinkedIn**
   - Create app at [linkedin.com/developers](https://www.linkedin.com/developers/)
   - Set redirect URL: `https://creator-tools-mvp.pages.dev/auth/linkedin/callback`
   - Add `VITE_LINKEDIN_CLIENT_ID` secret to GitHub

3. **Instagram**
   - Create app at [developers.facebook.com](https://developers.facebook.com)
   - Set redirect URI: `https://creator-tools-mvp.pages.dev/auth/instagram/callback`
   - Add `VITE_INSTAGRAM_APP_ID` secret to GitHub

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed OAuth setup instructions.

## Troubleshooting

### Deployment fails with "Missing required parameter: apiToken"
- Ensure `CLOUDFLARE_API_TOKEN` secret is set correctly
- Token must have both Workers and Pages permissions

### Deployment fails with "Missing required parameter: accountId"
- Ensure `CLOUDFLARE_ACCOUNT_ID` secret is set correctly
- Find Account ID in Cloudflare Dashboard sidebar

### Workers deployment succeeds but returns 500 errors
- This is expected without database configuration
- The worker will deploy successfully but some endpoints require D1
- Follow "Add Database Support" steps above

### Frontend shows "Failed to fetch API"
- Workers API may not be deployed yet
- Check that Workers deployment job succeeded
- Verify API URL in `VITE_API_URL` secret matches your worker URL

## Complete Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Full deployment guide
- [README.md](./README.md) - Project overview
- See open issues for known limitations

## Need Help?

Open an issue in this repository with:
- Steps you've completed
- Error messages from Actions logs
- What you expected vs what happened
