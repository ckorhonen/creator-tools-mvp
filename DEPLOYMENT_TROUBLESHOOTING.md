# Deployment Troubleshooting Guide

## Common Deployment Issues and Solutions

### Issue 1: Missing package-lock.json

**Problem**: The GitHub Actions workflow fails because it can't find `package-lock.json` files.

**Solution**: 
1. For the root project:
   ```bash
   npm install
   git add package-lock.json
   git commit -m "Add package-lock.json"
   ```

2. For the workers API:
   ```bash
   cd workers/api
   npm install
   git add package-lock.json
   git commit -m "Add workers API package-lock.json"
   ```

### Issue 2: Empty database_id in wrangler.toml

**Problem**: The `database_id` field in `workers/api/wrangler.toml` is empty or missing.

**Solution**:
1. Create the D1 database first:
   ```bash
   cd workers/api
   wrangler d1 create creator_tools_db
   ```

2. Copy the `database_id` from the output and update `wrangler.toml`:
   ```toml
   [[d1_databases]]
   binding = "DB"
   database_name = "creator_tools_db"
   database_id = "your-database-id-here"  # Replace with actual ID
   ```

3. Initialize the database schema:
   ```bash
   wrangler d1 execute creator_tools_db --file=./schema.sql
   ```

### Issue 3: Missing GitHub Secrets

**Problem**: Deployment fails because required secrets are not set.

**Solution**: Add the following secrets in GitHub repository settings (Settings → Secrets and variables → Actions):

- `CLOUDFLARE_API_TOKEN` - Your Cloudflare API token with Workers and Pages permissions
- `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID
- `VITE_API_URL` - The URL where your Workers API will be deployed
- `VITE_TWITTER_CLIENT_ID` - Twitter/X OAuth client ID
- `VITE_LINKEDIN_CLIENT_ID` - LinkedIn OAuth client ID
- `VITE_INSTAGRAM_APP_ID` - Instagram app ID

### Issue 4: Wrangler Authentication in CI/CD

**Problem**: Wrangler can't authenticate during GitHub Actions deployment.

**Solution**: The workflow uses `cloudflare/wrangler-action@v3` which handles authentication automatically via the `CLOUDFLARE_API_TOKEN` secret. Make sure this secret is properly set.

## Pre-Deployment Checklist

Before deploying to production:

- [ ] All required GitHub secrets are configured
- [ ] D1 database is created and database_id is set in wrangler.toml
- [ ] Database schema is initialized
- [ ] package-lock.json files are committed (optional but recommended)
- [ ] All environment-specific secrets are set in Cloudflare Workers
- [ ] Custom domain DNS is configured (if using)

## Testing Locally

### Frontend
```bash
npm install
npm run dev
```

### Workers API
```bash
cd workers/api
npm install
npm run dev
```

## Manual Deployment

If automated deployment fails, you can deploy manually:

### Frontend
```bash
npm install
npm run build
npx wrangler pages deploy dist --project-name=creator-tools-mvp
```

### Workers API
```bash
cd workers/api
npm install
npx wrangler deploy
```

## Getting Help

If you continue to experience issues:

1. Check the GitHub Actions logs for detailed error messages
2. Review the Cloudflare dashboard for deployment status
3. Verify all secrets and environment variables are set correctly
4. Ensure your Cloudflare account has the necessary permissions
