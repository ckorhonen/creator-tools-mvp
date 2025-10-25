# Deployment Guide

> **⚠️ IMPORTANT: Deployment Issues Fixed!**
> 
> If you experienced deployment failures, see [DEPLOYMENT_FIX.md](./DEPLOYMENT_FIX.md) for:
> - Quick fix for missing package-lock.json files (already applied)
> - Steps to configure D1 database
> - GitHub Actions secrets configuration
> - Troubleshooting guide
>
> The workflow has been updated to handle missing lock files automatically.

Complete guide for deploying Creator Tools MVP to Cloudflare.

## Prerequisites

- Cloudflare account
- Node.js 18+
- Wrangler CLI installed (`npm install -g wrangler`)
- Authenticated with Cloudflare (`wrangler login`)

## Part 1: Deploy Cloudflare Workers API

### Step 1: Create D1 Database

```bash
cd workers/api
npm install

# Create the database
wrangler d1 create creator_tools_db

# Copy the database_id from output
# Example output:
# [[d1_databases]]
# binding = "DB"
# database_name = "creator_tools_db"
# database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

### Step 2: Update wrangler.toml

Edit `workers/api/wrangler.toml` and add the `database_id`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "creator_tools_db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"  # Your database ID here
```

### Step 3: Initialize Database

```bash
# Run the schema.sql file to create tables
wrangler d1 execute creator_tools_db --file=./schema.sql

# Verify tables were created
wrangler d1 execute creator_tools_db --command="SELECT name FROM sqlite_master WHERE type='table'"
```

### Step 4: Set API Secrets

```bash
# Twitter/X API credentials
wrangler secret put TWITTER_API_KEY
# Enter your key when prompted

wrangler secret put TWITTER_API_SECRET
# Enter your secret when prompted

# LinkedIn API credentials
wrangler secret put LINKEDIN_CLIENT_ID
wrangler secret put LINKEDIN_CLIENT_SECRET

# Instagram API credentials
wrangler secret put INSTAGRAM_APP_ID
wrangler secret put INSTAGRAM_APP_SECRET
```

### Step 5: Deploy Workers

```bash
# Deploy to Cloudflare
wrangler deploy

# Note the deployed URL, e.g.:
# https://creator-tools-api.<your-subdomain>.workers.dev
```

### Step 6: Test the API

```bash
# Test health endpoint
curl https://creator-tools-api.<your-subdomain>.workers.dev/health

# Should return:
# {"status":"ok","timestamp":"2024-01-15T12:00:00.000Z"}
```

## Part 2: Deploy Frontend to Cloudflare Pages

### Step 1: Configure Environment Variables

Create `.env.production` in the project root:

```bash
VITE_API_URL=https://creator-tools-api.<your-subdomain>.workers.dev
VITE_TWITTER_CLIENT_ID=your_twitter_client_id
VITE_LINKEDIN_CLIENT_ID=your_linkedin_client_id
VITE_INSTAGRAM_APP_ID=your_instagram_app_id
```

### Step 2: Build the Frontend

```bash
cd ../..
npm install
npm run build

# This creates a 'dist' folder with production build
```

### Step 3: Deploy to Cloudflare Pages

#### Option A: Using Wrangler CLI

```bash
# Deploy to Cloudflare Pages
npx wrangler pages deploy dist --project-name=creator-tools-mvp

# Note the deployed URL, e.g.:
# https://creator-tools-mvp.pages.dev
```

#### Option B: Using Cloudflare Dashboard

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages**
3. Click **Create a project**
4. Select **Direct Upload**
5. Upload the `dist` folder
6. Add environment variables in **Settings** → **Environment variables**

#### Option C: Connect to GitHub (Recommended)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages**
3. Click **Create a project**
4. Click **Connect to Git**
5. Select your GitHub repository: `ckorhonen/creator-tools-mvp`
6. Configure build settings:
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/`
7. Add environment variables
8. Click **Save and Deploy**

### Step 4: Configure Custom Domain (Optional)

1. In Cloudflare Pages, go to **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain (e.g., `creator-tools.com`)
4. Follow DNS configuration instructions
5. Wait for SSL certificate to provision

## Part 3: Configure Platform APIs

### Twitter/X API Setup

1. Go to [developer.twitter.com](https://developer.twitter.com)
2. Create a new app or use existing
3. Enable **OAuth 2.0**
4. Add callback URL:
   - Development: `http://localhost:5173/auth/twitter/callback`
   - Production: `https://creator-tools-mvp.pages.dev/auth/twitter/callback`
5. Copy **Client ID** and **Client Secret**
6. Add to Wrangler secrets (already done in Part 1)

### LinkedIn API Setup

1. Go to [linkedin.com/developers](https://www.linkedin.com/developers/)
2. Create a new app
3. Add product: **Share on LinkedIn**
4. Add redirect URLs:
   - Development: `http://localhost:5173/auth/linkedin/callback`
   - Production: `https://creator-tools-mvp.pages.dev/auth/linkedin/callback`
5. Copy **Client ID** and **Client Secret**
6. Add to Wrangler secrets (already done in Part 1)

### Instagram API Setup

1. Go to [developers.facebook.com](https://developers.facebook.com)
2. Create a new app or use existing
3. Add product: **Instagram Basic Display**
4. Configure Instagram Basic Display:
   - Add redirect URI: `https://creator-tools-mvp.pages.dev/auth/instagram/callback`
5. Switch to **Live Mode** (after review)
6. Copy **App ID** and **App Secret**
7. Add to Wrangler secrets (already done in Part 1)

## Part 4: Verify Deployment

### Test Frontend

1. Visit your deployed URL: `https://creator-tools-mvp.pages.dev`
2. Click **Create Post**
3. Enter content and select platforms
4. Verify character counters work
5. Check platform previews

### Test API Integration

```bash
# Test scheduling a post
curl -X POST https://creator-tools-api.<your-subdomain>.workers.dev/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Test post from Creator Tools MVP!",
    "platforms": ["twitter", "linkedin"],
    "scheduledTime": "2024-01-20T15:00:00Z",
    "adaptedContent": {
      "twitter": "Test post from Creator Tools MVP! 🚀",
      "linkedin": "Test post from Creator Tools MVP!\n\nExcited to share this with you all."
    }
  }'

# Get scheduled posts
curl https://creator-tools-api.<your-subdomain>.workers.dev/api/posts

# Get analytics
curl https://creator-tools-api.<your-subdomain>.workers.dev/api/analytics
```

### Test Cron Trigger

The cron trigger runs every 5 minutes automatically. To test manually:

```bash
# Trigger the cron job manually
wrangler dev --test-scheduled

# Check logs
wrangler tail
```

## Part 5: Monitoring & Maintenance

### View Logs

```bash
# Stream real-time logs
wrangler tail

# Filter logs
wrangler tail --format=pretty
```

### Check Database

```bash
# Query database
wrangler d1 execute creator_tools_db --command="SELECT * FROM posts LIMIT 10"

# Check post count
wrangler d1 execute creator_tools_db --command="SELECT COUNT(*) as total FROM posts"

# View scheduled posts
wrangler d1 execute creator_tools_db --command="SELECT * FROM posts WHERE status='scheduled'"
```

### Update Deployment

```bash
# Update Workers API
cd workers/api
wrangler deploy

# Update Frontend (if using direct upload)
cd ../..
npm run build
npx wrangler pages deploy dist

# Or just push to GitHub if using automatic deploys
git push origin main
```

## Troubleshooting

### Issue: CORS Errors

**Solution**: Check that CORS headers are properly set in Workers:

```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};
```

### Issue: Database Not Found

**Solution**: Verify database binding in `wrangler.toml`:

```bash
wrangler d1 list
```

### Issue: Cron Not Running

**Solution**: Check cron configuration in `wrangler.toml` and Workers dashboard

### Issue: API Keys Not Working

**Solution**: Re-set secrets:

```bash
wrangler secret list
wrangler secret put TWITTER_API_KEY
```

## Cost Estimates

### Cloudflare Workers (Free Tier)
- 100,000 requests/day
- 10ms CPU time per request
- Sufficient for MVP with moderate usage

### Cloudflare D1 (Free Tier)
- 5 million reads/month
- 100,000 writes/month
- 5 GB storage
- Perfect for MVP

### Cloudflare Pages (Free Tier)
- 500 builds/month
- Unlimited requests
- Unlimited bandwidth

**Total MVP Cost**: $0/month (within free tiers)

## Next Steps

1. ✅ Set up monitoring and alerts
2. ✅ Configure custom domain
3. ✅ Enable analytics in Cloudflare Dashboard
4. ✅ Set up backup strategy for D1 database
5. ✅ Implement rate limiting
6. ✅ Add authentication layer
7. ✅ Set up CI/CD pipeline

---

**Deployment Complete! 🎉**

Your Creator Tools MVP is now live and ready to help creators schedule content across platforms.
