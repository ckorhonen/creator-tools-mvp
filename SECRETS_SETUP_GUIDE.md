# GitHub Secrets Setup Guide

This guide provides step-by-step instructions for configuring all GitHub repository secrets needed for the "Deploy to Cloudflare" workflow.

## Required Secrets (Must Configure Before First Deploy)

### 1. CLOUDFLARE_API_TOKEN

**Purpose**: Authenticate GitHub Actions with Cloudflare to deploy Workers and Pages.

**Steps to Get Token**:
1. Log into [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Click on your profile icon (top right) → **API Tokens**
3. Click **Create Token**
4. Use the **"Edit Cloudflare Workers"** template or create custom token with:
   - **Permissions**:
     - Account - Cloudflare Pages - Edit
     - Account - Cloudflare Workers Scripts - Edit
     - Account - D1 - Edit (optional, for database)
   - **Account Resources**: Include - Your Account
   - **Zone Resources**: All zones (or specific zone if using custom domain)
5. Click **Continue to summary** → **Create Token**
6. Copy the token (you won't be able to see it again!)

**Add to GitHub**:
1. Go to your repository → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `CLOUDFLARE_API_TOKEN`
4. Value: Paste your Cloudflare API token
5. Click **Add secret**

---

### 2. CLOUDFLARE_ACCOUNT_ID

**Purpose**: Identify which Cloudflare account to deploy to.

**Steps to Get Account ID**:
1. Log into [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Go to **Workers & Pages** from the sidebar
3. Your Account ID appears in the right sidebar under "Account details"
   - Or copy it from the URL: `dash.cloudflare.com/<ACCOUNT_ID>/workers`

**Add to GitHub**:
1. Go to your repository → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `CLOUDFLARE_ACCOUNT_ID`
4. Value: Paste your Account ID (32-character hex string)
5. Click **Add secret**

---

## Optional Secrets (Recommended for Full Functionality)

### 3. VITE_API_URL

**Purpose**: Configure the frontend to connect to your deployed Workers API.

**Default**: `https://creator-tools-api.workers.dev` (fallback if not set)

**When to Set**: After your first successful Workers deployment.

**Steps**:
1. Deploy the Workers API first (it will use a workers.dev subdomain)
2. Copy the deployed URL from workflow output or Cloudflare Dashboard
3. Add to GitHub:
   - Name: `VITE_API_URL`
   - Value: Your Workers URL (e.g., `https://creator-tools-api.your-subdomain.workers.dev`)

---

### 4. VITE_TWITTER_CLIENT_ID

**Purpose**: Enable Twitter/X OAuth authentication in the app.

**Steps to Get Client ID**:
1. Go to [Twitter Developer Portal](https://developer.twitter.com/)
2. Create a new app or select existing app
3. Go to **Settings** → **User authentication settings** → **Set up**
4. Configure OAuth 2.0:
   - **Type of App**: Web App
   - **Callback URL**: `https://your-app-url.pages.dev/auth/twitter/callback`
   - **Website URL**: Your app URL
5. Save and copy the **Client ID**

**Add to GitHub**:
- Name: `VITE_TWITTER_CLIENT_ID`
- Value: Your Twitter OAuth Client ID

---

### 5. VITE_LINKEDIN_CLIENT_ID

**Purpose**: Enable LinkedIn OAuth authentication in the app.

**Steps to Get Client ID**:
1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Click **Create app**
3. Fill in app details and create
4. Go to **Auth** tab
5. Copy the **Client ID**
6. Add redirect URL: `https://your-app-url.pages.dev/auth/linkedin/callback`

**Add to GitHub**:
- Name: `VITE_LINKEDIN_CLIENT_ID`
- Value: Your LinkedIn Client ID

---

### 6. VITE_INSTAGRAM_APP_ID

**Purpose**: Enable Instagram OAuth authentication in the app.

**Steps to Get App ID**:
1. Go to [Meta for Developers](https://developers.facebook.com/)
2. Click **My Apps** → **Create App**
3. Select **Consumer** → **Continue**
4. Fill in app details and create
5. Add **Instagram Basic Display** product
6. Go to **Basic Display** → **Create New App**
7. Copy the **Instagram App ID**
8. Configure redirect URL: `https://your-app-url.pages.dev/auth/instagram/callback`

**Add to GitHub**:
- Name: `VITE_INSTAGRAM_APP_ID`
- Value: Your Instagram App ID

---

## Quick Reference Table

| Secret Name | Required | Where to Get It | Purpose |
|-------------|----------|-----------------|---------|
| `CLOUDFLARE_API_TOKEN` | ✅ Yes | Cloudflare Dashboard → Profile → API Tokens | Deploy to Cloudflare |
| `CLOUDFLARE_ACCOUNT_ID` | ✅ Yes | Cloudflare Dashboard → Workers → Account Details | Identify your account |
| `VITE_API_URL` | ⚠️ Recommended | After Workers deployment | Connect frontend to API |
| `VITE_TWITTER_CLIENT_ID` | ❌ Optional | Twitter Developer Portal | Twitter OAuth |
| `VITE_LINKEDIN_CLIENT_ID` | ❌ Optional | LinkedIn Developers | LinkedIn OAuth |
| `VITE_INSTAGRAM_APP_ID` | ❌ Optional | Meta for Developers | Instagram OAuth |

---

## Verification

After adding secrets, verify they're configured correctly:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. You should see all configured secrets listed (values are hidden)
3. Click **Update** on any secret to change its value
4. Secrets are available to workflow runs immediately

---

## Security Best Practices

✅ **Do**:
- Rotate API tokens regularly
- Use token-specific permissions (principle of least privilege)
- Delete tokens you're no longer using
- Review secret access logs in GitHub

❌ **Don't**:
- Share tokens in code, commits, or issues
- Use personal access tokens for production
- Give tokens more permissions than needed
- Commit .env files with secrets to the repository

---

## Troubleshooting

### "Unauthorized" or "Authentication failed"
- Check `CLOUDFLARE_API_TOKEN` is valid and not expired
- Verify token has correct permissions
- Regenerate token if needed

### "Account not found"
- Verify `CLOUDFLARE_ACCOUNT_ID` is correct
- Check you're logged into the right Cloudflare account

### "API URL not working"
- Make sure Workers API deployed successfully
- Verify `VITE_API_URL` matches actual Workers URL
- Check for CORS issues in browser console

### "OAuth not working"
- Verify OAuth secrets are correctly set
- Check redirect URLs match in provider settings
- Ensure OAuth apps are in "production" mode, not "development"

---

## Next Steps

After configuring secrets:

1. Push a commit to `main` branch (or manually trigger workflow)
2. Go to **Actions** tab to watch deployment progress
3. Both "Deploy Frontend" and "Deploy Workers API" jobs should succeed
4. Note the deployed URLs from workflow output
5. Update `VITE_API_URL` with your Workers URL
6. Visit your deployed frontend and test functionality

For post-deployment database setup, see **DEPLOYMENT_FIX_SUMMARY.md**.
