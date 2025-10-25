# Cloudflare Deployment Setup Guide

**Time Required**: 10-15 minutes  
**Difficulty**: Easy  
**Prerequisites**: Cloudflare account (free tier works)

---

## 🎯 Overview

This guide walks you through configuring the required secrets to enable automatic deployment to Cloudflare Pages (frontend) and Cloudflare Workers (API) via GitHub Actions.

## ✅ Prerequisites

- GitHub repository access (you already have this!)
- Cloudflare account - [Sign up free](https://dash.cloudflare.com/sign-up)

---

## 📋 Step-by-Step Instructions

### Step 1: Get Cloudflare API Token (5 minutes)

1. **Navigate to API Tokens**:
   - Go to: https://dash.cloudflare.com/profile/api-tokens
   - Click the **"Create Token"** button

2. **Select Template**:
   - Use the **"Edit Cloudflare Workers"** template
   - Click **"Use template"**

3. **Review Permissions** (should include):
   - ✅ Account → Cloudflare Pages → Edit
   - ✅ Account → Workers Scripts → Edit
   - ✅ Account → Account Settings → Read

4. **Create Token**:
   - Click **"Continue to summary"**
   - Click **"Create Token"**
   - **⚠️ IMPORTANT**: Copy the token immediately - you'll only see it once!
   - Format: `aBcD123...` (long alphanumeric string)

5. **Save Token Securely**:
   - Keep it in a password manager or secure note
   - You'll add it to GitHub in Step 3

---

### Step 2: Get Cloudflare Account ID (2 minutes)

1. **Navigate to Dashboard**:
   - Go to: https://dash.cloudflare.com
   
2. **Locate Account ID**:
   - Select any domain OR go to **Workers & Pages** section
   - Look in the **right sidebar** for **"Account ID"**
   - It will be a 32-character hexadecimal string
   - Format: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`

3. **Copy Account ID**:
   - Click the copy icon next to the Account ID
   - You'll add it to GitHub in Step 3

---

### Step 3: Add Secrets to GitHub (3 minutes)

1. **Navigate to Repository Secrets**:
   - **Direct Link**: https://github.com/ckorhonen/creator-tools-mvp/settings/secrets/actions
   - Or manually: Repository → Settings → Secrets and variables → Actions

2. **Add CLOUDFLARE_API_TOKEN**:
   - Click **"New repository secret"**
   - **Name**: `CLOUDFLARE_API_TOKEN` ⚠️ (exact, case-sensitive)
   - **Value**: Paste the API token from Step 1
   - Click **"Add secret"**

3. **Add CLOUDFLARE_ACCOUNT_ID**:
   - Click **"New repository secret"** again
   - **Name**: `CLOUDFLARE_ACCOUNT_ID` ⚠️ (exact, case-sensitive)
   - **Value**: Paste the Account ID from Step 2
   - Click **"Add secret"**

4. **Verify Secrets**:
   - You should see both secrets listed
   - Secret values are hidden (this is correct)

---

### Step 4: Trigger Deployment (2 minutes)

**Option A: Push Empty Commit** (Recommended):
```bash
git commit --allow-empty -m "🚀 Deploy with Cloudflare secrets configured"
git push origin main
```

**Option B: Manual Workflow Trigger**:
1. Go to: https://github.com/ckorhonen/creator-tools-mvp/actions
2. Click **"Deploy to Cloudflare"** workflow
3. Click **"Run workflow"** dropdown
4. Click green **"Run workflow"** button

**Option C: Make Any Code Change**:
```bash
# Make any edit, then:
git add .
git commit -m "Update: your message here"
git push origin main
```

---

### Step 5: Verify Deployment (3 minutes)

1. **Monitor Workflow**:
   - Go to: https://github.com/ckorhonen/creator-tools-mvp/actions
   - Watch the latest **"Deploy to Cloudflare"** run
   - Both jobs should show ✅ green checkmarks (takes ~3-5 minutes)

2. **Test Frontend**:
   - Open: https://creator-tools-mvp.pages.dev
   - You should see the application loading
   - Interface should be fully functional

3. **Test API**:
   - Open: https://creator-tools-api.ckorhonen.workers.dev/health
   - Expected response:
     ```json
     {
       "status": "ok",
       "timestamp": "2025-01-26T...",
       "database": "not configured"
     }
     ```

4. **Check Cloudflare Dashboard**:
   - **Pages**: https://dash.cloudflare.com/pages
     - Should show `creator-tools-mvp` project
   - **Workers**: https://dash.cloudflare.com/workers
     - Should show `creator-tools-api` worker

---

## ✅ Success Checklist

- [ ] Cloudflare API token created and copied
- [ ] Cloudflare Account ID located and copied
- [ ] Both secrets added to GitHub repository
- [ ] GitHub Actions workflow triggered
- [ ] Both deployment jobs completed successfully (✅)
- [ ] Frontend accessible at https://creator-tools-mvp.pages.dev
- [ ] API health endpoint responding at .../health
- [ ] Deployments visible in Cloudflare dashboard

---

## 🔧 Troubleshooting

### Deployment Still Fails After Adding Secrets

**Check Secret Names** (must be exact, case-sensitive):
- ✅ Correct: `CLOUDFLARE_API_TOKEN`
- ❌ Wrong: `cloudflare_api_token`, `CLOUDFLARE_TOKEN`, `CF_API_TOKEN`
- ✅ Correct: `CLOUDFLARE_ACCOUNT_ID`
- ❌ Wrong: `cloudflare_account_id`, `CLOUDFLARE_ACCOUNT`, `CF_ACCOUNT_ID`

**Verify API Token Permissions**:
1. Go to: https://dash.cloudflare.com/profile/api-tokens
2. Find your token in the list
3. Check it has these permissions:
   - Cloudflare Pages → Edit
   - Workers Scripts → Edit
   - Account Settings → Read
4. If missing permissions, create a new token with correct permissions

**Check Account ID Format**:
- Must be exactly 32 characters
- Only contains: a-f, 0-9 (hexadecimal)
- No spaces, dashes, or special characters
- Example valid format: `a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4`

**Token Expired or Inactive**:
1. Go to: https://dash.cloudflare.com/profile/api-tokens
2. Check token status shows "Active"
3. If expired or inactive, create a new token
4. Update the secret in GitHub with the new token

### Frontend Loads but API Doesn't Work

**Check CORS Configuration**:
- Workers may need CORS headers configured
- Check `workers/api/src/index.ts` for CORS setup

**Database Not Configured** (Expected Initially):
- Database endpoints will return 503 until D1 database is set up
- This is normal and documented in the API responses
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for database setup steps

### GitHub Actions Shows "Secrets Not Found"

**Secret Names are Case-Sensitive**:
- GitHub Actions is case-sensitive for secret names
- Ensure you used UPPERCASE: `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`
- Delete and recreate secrets if names don't match exactly

**Secrets Added to Wrong Location**:
- Secrets must be in: Settings → Secrets and variables → **Actions** (not Dependabot or Codespaces)
- Use this direct link: https://github.com/ckorhonen/creator-tools-mvp/settings/secrets/actions

---

## 🎉 Next Steps

Once deployment is successful:

### Optional: Configure Social Platform Integration

Add these optional secrets for social media features:
- `VITE_TWITTER_CLIENT_ID` - Twitter/X OAuth client ID
- `VITE_LINKEDIN_CLIENT_ID` - LinkedIn OAuth client ID  
- `VITE_INSTAGRAM_APP_ID` - Instagram app ID

See [GITHUB_SECRETS_SETUP.md](./GITHUB_SECRETS_SETUP.md) for details.

### Optional: Set Up D1 Database

For full functionality (post scheduling, analytics):
1. Create D1 database in Cloudflare
2. Update `workers/api/wrangler.toml` with database ID
3. Initialize database schema
4. Redeploy

See [DEPLOYMENT.md](./DEPLOYMENT.md) for database setup guide.

---

## 📚 Additional Resources

- **Cloudflare Workers Docs**: https://developers.cloudflare.com/workers/
- **Cloudflare Pages Docs**: https://developers.cloudflare.com/pages/
- **GitHub Actions Secrets**: https://docs.github.com/en/actions/security-guides/encrypted-secrets
- **Repository Deployment Guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Current Status**: [DEPLOYMENT_STATUS_CURRENT.md](./DEPLOYMENT_STATUS_CURRENT.md)

---

## 💬 Need Help?

If you encounter issues not covered in this guide:
1. Check the [GitHub Actions logs](https://github.com/ckorhonen/creator-tools-mvp/actions) for specific error messages
2. Review [DEPLOYMENT_TROUBLESHOOTING.md](./DEPLOYMENT_TROUBLESHOOTING.md) for common issues
3. Create a new issue with:
   - Workflow run URL
   - Error message from logs
   - Steps you've already tried

---

**Last Updated**: 2025-01-26  
**Estimated Total Time**: 10-15 minutes  
**Difficulty**: Easy ⭐
