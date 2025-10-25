# GitHub Secrets Setup Guide

This guide walks you through setting up the required GitHub repository secrets for automated deployment.

## Required Secrets

### 1. CLOUDFLARE_API_TOKEN
**Required for**: Both frontend and workers deployment

**How to get it**:
1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click on your profile icon (top right)
3. Select **My Profile**
4. Click **API Tokens** in the left sidebar
5. Click **Create Token**
6. Use the **Edit Cloudflare Workers** template or create custom token with:
   - Account > Cloudflare Pages > Edit
   - Account > Workers Scripts > Edit
   - Account > Account Settings > Read
7. Copy the token (you won't be able to see it again!)

### 2. CLOUDFLARE_ACCOUNT_ID
**Required for**: Both frontend and workers deployment

**How to get it**:
1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select any domain (or go to Workers & Pages)
3. Your Account ID is visible in the right sidebar
4. Or find it in the URL: `https://dash.cloudflare.com/{ACCOUNT_ID}/...`

---

## Optional Secrets (Frontend Environment Variables)

### 3. VITE_API_URL
**Purpose**: URL of your deployed Cloudflare Workers API

**Format**: `https://creator-tools-api.{your-subdomain}.workers.dev`

**When to set**: After first Workers deployment

### 4. VITE_TWITTER_CLIENT_ID
**Purpose**: Twitter/X OAuth client ID for authentication

**How to get it**:
1. Go to [Twitter Developer Portal](https://developer.twitter.com/portal)
2. Create or select your app
3. Find **Client ID** in OAuth 2.0 settings

### 5. VITE_LINKEDIN_CLIENT_ID
**Purpose**: LinkedIn OAuth client ID for authentication

**How to get it**:
1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Create or select your app
3. Find **Client ID** in Auth tab

### 6. VITE_INSTAGRAM_APP_ID
**Purpose**: Instagram/Facebook app ID for authentication

**How to get it**:
1. Go to [Meta for Developers](https://developers.facebook.com/)
2. Create or select your app
3. Find **App ID** in Settings > Basic

---

## How to Add Secrets to GitHub

### Method 1: GitHub Web Interface
1. Go to your repository: `https://github.com/ckorhonen/creator-tools-mvp`
2. Click **Settings** tab
3. In the left sidebar, click **Secrets and variables** > **Actions**
4. Click **New repository secret**
5. Enter the secret name (exactly as shown above)
6. Paste the secret value
7. Click **Add secret**
8. Repeat for each secret

### Method 2: GitHub CLI
```bash
# Install GitHub CLI if needed: https://cli.github.com/

# Login
gh auth login

# Add secrets
gh secret set CLOUDFLARE_API_TOKEN
# Paste value when prompted

gh secret set CLOUDFLARE_ACCOUNT_ID
# Paste value when prompted

# Optional secrets
gh secret set VITE_API_URL
gh secret set VITE_TWITTER_CLIENT_ID
gh secret set VITE_LINKEDIN_CLIENT_ID
gh secret set VITE_INSTAGRAM_APP_ID
```

---

## Verification

### Check Secrets Are Set
1. Go to: `https://github.com/ckorhonen/creator-tools-mvp/settings/secrets/actions`
2. You should see all secrets listed (values are hidden for security)

### Test Deployment
1. Make a small change to the repository
2. Commit and push to main branch
3. Go to: `https://github.com/ckorhonen/creator-tools-mvp/actions`
4. Watch the workflow run

---

## Troubleshooting

### "CLOUDFLARE_API_TOKEN is not set" Error
**Solution**: Make sure you've added the secret with the exact name `CLOUDFLARE_API_TOKEN` (all caps)

### "Authentication failed" Error
**Possible causes**:
- API token expired or invalid
- API token doesn't have correct permissions
- Account ID is incorrect

**Solution**: 
1. Generate a new API token with Workers and Pages permissions
2. Verify your Account ID from Cloudflare dashboard
3. Update the secrets in GitHub

### Deployment Succeeds but Frontend Shows Errors
**Possible cause**: Missing VITE_* environment variables

**Solution**: 
1. Add the optional VITE_* secrets
2. Re-run the workflow or push a new commit

---

## Security Best Practices

✅ **DO**:
- Use API tokens with minimum required permissions
- Rotate API tokens regularly
- Never commit secrets to the repository
- Use GitHub's secret management

❌ **DON'T**:
- Share API tokens in plain text
- Store secrets in .env files that are committed
- Use overly permissive API tokens
- Reuse the same token across multiple projects

---

## Next Steps After Setup

1. ✅ Add required secrets (CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID)
2. ✅ Push to main branch to trigger deployment
3. ✅ Check GitHub Actions for successful deployment
4. ⏳ Note the deployed URLs from the workflow logs
5. ⏳ Add VITE_API_URL secret with your Workers URL
6. ⏳ Set up OAuth apps and add client IDs as secrets
7. ⏳ Follow DEPLOYMENT.md for database setup

---

## Quick Reference

| Secret Name | Required | Purpose |
|-------------|----------|---------|
| `CLOUDFLARE_API_TOKEN` | ✅ Yes | Deploy to Cloudflare |
| `CLOUDFLARE_ACCOUNT_ID` | ✅ Yes | Identify Cloudflare account |
| `VITE_API_URL` | ⏳ Later | Frontend API endpoint |
| `VITE_TWITTER_CLIENT_ID` | ⏳ Optional | Twitter OAuth |
| `VITE_LINKEDIN_CLIENT_ID` | ⏳ Optional | LinkedIn OAuth |
| `VITE_INSTAGRAM_APP_ID` | ⏳ Optional | Instagram OAuth |

---

**Ready to Deploy?** After adding the required secrets, any push to main will trigger automatic deployment! 🚀
