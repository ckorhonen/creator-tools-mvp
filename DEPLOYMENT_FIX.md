# Deployment Fix Guide

## Issues Found and Fixed

### 1. ✅ Missing package-lock.json Files (FIXED)
**Problem:** The GitHub Actions workflow used `npm ci` which requires `package-lock.json` files, but they were not committed to the repository.

**Solution Applied:** Updated `.github/workflows/deploy.yml` to check for `package-lock.json` existence and fall back to `npm install` if not found.

### 2. ⚠️ Cloudflare D1 Database Not Configured (REQUIRES MANUAL SETUP)
**Problem:** The `wrangler.toml` file has an empty `database_id` field, which will cause the Workers deployment to fail.

**Solution Required:** You need to create a D1 database and update the configuration.

## Next Steps to Complete Deployment

### Step 1: Generate package-lock.json Files (Recommended)

For better reproducibility and faster CI builds, generate and commit lock files:

```bash
# In root directory
npm install
git add package-lock.json

# In workers/api directory
cd workers/api
npm install
git add package-lock.json

cd ../..
git commit -m "Add package-lock.json files for reproducible builds"
git push
```

### Step 2: Create and Configure Cloudflare D1 Database

1. **Create the D1 Database:**
   ```bash
   cd workers/api
   npx wrangler d1 create creator_tools_db
   ```

2. **Copy the database ID** from the output (it will look like: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

3. **Update wrangler.toml:**
   ```bash
   # Edit workers/api/wrangler.toml
   # Replace the empty database_id with your actual database ID
   ```

   Or use this command:
   ```bash
   # Replace YOUR_DATABASE_ID with the actual ID from step 1
   sed -i 's/database_id = ""/database_id = "YOUR_DATABASE_ID"/' workers/api/wrangler.toml
   ```

4. **Initialize the database schema:**
   ```bash
   npx wrangler d1 execute creator_tools_db --file=./schema.sql --remote
   ```

5. **Commit the changes:**
   ```bash
   git add workers/api/wrangler.toml
   git commit -m "Configure D1 database ID"
   git push
   ```

### Step 3: Configure GitHub Secrets

Ensure these secrets are set in your GitHub repository settings (Settings → Secrets and variables → Actions):

#### Required for Frontend Deployment:
- `CLOUDFLARE_API_TOKEN` - Your Cloudflare API token with Pages and Workers permissions
- `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID
- `VITE_API_URL` - The URL where your Workers API will be deployed (e.g., `https://api.creator-tools.com`)

#### Optional (for platform integrations):
- `VITE_TWITTER_CLIENT_ID`
- `VITE_LINKEDIN_CLIENT_ID`
- `VITE_INSTAGRAM_APP_ID`

#### Required for Workers Deployment:
The same `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` from above.

#### Additional Worker Secrets (set via CLI):
```bash
cd workers/api
npx wrangler secret put TWITTER_API_KEY
npx wrangler secret put TWITTER_API_SECRET
npx wrangler secret put LINKEDIN_CLIENT_ID
npx wrangler secret put LINKEDIN_CLIENT_SECRET
npx wrangler secret put INSTAGRAM_APP_ID
npx wrangler secret put INSTAGRAM_APP_SECRET
```

### Step 4: Verify Deployment

After completing the above steps, push to main to trigger a new deployment:

```bash
git push origin main
```

Monitor the deployment at:
https://github.com/ckorhonen/creator-tools-mvp/actions

## Quick Checklist

- [x] Fixed GitHub Actions workflow to handle missing lock files
- [ ] Generate and commit package-lock.json files (recommended)
- [ ] Create D1 database
- [ ] Update wrangler.toml with database ID
- [ ] Initialize database schema
- [ ] Configure GitHub secrets
- [ ] Test deployment

## Troubleshooting

### If the build still fails:

1. **Check the Actions log** for specific error messages
2. **Verify all secrets are set** in GitHub repository settings
3. **Ensure wrangler.toml has a valid database_id**
4. **Make sure you have proper Cloudflare API permissions** (Pages:Edit, Workers:Edit, D1:Edit)

### Local Testing

Test the deployment locally before pushing:

```bash
# Test frontend build
npm install
npm run build

# Test workers deployment
cd workers/api
npm install
npx wrangler dev
```

## Additional Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Cloudflare D1 Documentation](https://developers.cloudflare.com/d1/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)
