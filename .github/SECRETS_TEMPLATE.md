# GitHub Secrets Configuration Template

This file lists all the secrets needed for the GitHub Actions deployment workflow.

## Quick Setup

Go to: **Repository Settings → Secrets and variables → Actions → New repository secret**

## Required Secrets (For Deployment)

### `CLOUDFLARE_API_TOKEN`
**Description:** API token with permissions for Cloudflare Pages, Workers, and D1  
**How to get:**
1. Visit https://dash.cloudflare.com/profile/api-tokens
2. Click "Create Token"
3. Use template: "Edit Cloudflare Workers"
4. Add these permissions:
   - Account Settings: Read
   - Cloudflare Pages: Edit
   - Workers Scripts: Edit
   - D1: Edit
5. Copy the generated token

**Example value:** `abc123def456ghi789jkl012mno345pqr678stu`

---

### `CLOUDFLARE_ACCOUNT_ID`
**Description:** Your Cloudflare account identifier  
**How to get:**
1. Visit https://dash.cloudflare.com
2. Go to Workers & Pages or select any domain
3. Copy the Account ID from the right sidebar or URL

**Example value:** `1234567890abcdef1234567890abcdef`

---

## Optional Secrets (For Platform Integrations)

### `VITE_API_URL`
**Description:** URL of your deployed Cloudflare Workers API  
**Default:** `https://creator-tools-api.workers.dev`  
**Example value:** `https://api.creator-tools.com`

---

### `VITE_TWITTER_CLIENT_ID`
**Description:** Twitter/X OAuth 2.0 Client ID  
**How to get:**
1. Visit https://developer.twitter.com/en/portal/dashboard
2. Create or select your app
3. Go to "Keys and tokens"
4. Copy the OAuth 2.0 Client ID

**Example value:** `dEFnMUxyZnBxWXNHV2t4`

---

### `VITE_LINKEDIN_CLIENT_ID`
**Description:** LinkedIn OAuth 2.0 Client ID  
**How to get:**
1. Visit https://www.linkedin.com/developers/apps
2. Create or select your app
3. Go to "Auth" tab
4. Copy the Client ID

**Example value:** `86abcdef123456`

---

### `VITE_INSTAGRAM_APP_ID`
**Description:** Instagram/Facebook App ID  
**How to get:**
1. Visit https://developers.facebook.com/apps
2. Create or select your app
3. Go to Settings → Basic
4. Copy the App ID

**Example value:** `123456789012345`

---

## Cloudflare Workers Secrets (Set via CLI)

These secrets are set directly in Cloudflare Workers using the Wrangler CLI:

```bash
cd workers/api

# Twitter/X API credentials
wrangler secret put TWITTER_API_KEY
wrangler secret put TWITTER_API_SECRET

# LinkedIn API credentials
wrangler secret put LINKEDIN_CLIENT_ID
wrangler secret put LINKEDIN_CLIENT_SECRET

# Instagram API credentials
wrangler secret put INSTAGRAM_APP_ID
wrangler secret put INSTAGRAM_APP_SECRET
```

These are NOT GitHub secrets - they're stored securely in Cloudflare Workers environment.

---

## Validation

After adding secrets, verify they're configured:

1. Go to **Settings → Secrets and variables → Actions**
2. Verify all required secrets show in the list
3. Trigger a workflow run to test

---

## Security Notes

- ⚠️ **Never commit secrets to the repository**
- ✅ Secrets are encrypted and only accessible during workflow runs
- 🔒 Use minimal permissions when creating API tokens
- 🔄 Rotate tokens periodically for security

---

## Troubleshooting

### "Secret not found" error
- Double-check the secret name matches exactly (case-sensitive)
- Ensure the secret is added to the repository (not your user account)

### Deployment still skipped
- Verify both `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` are set
- Check workflow logs for validation messages

### API integration not working
- Verify the VITE_* secrets are set correctly
- Check that values don't have extra spaces or quotes
- Rebuild and redeploy after adding secrets

---

## Quick Copy-Paste Checklist

```
Required for deployment:
[ ] CLOUDFLARE_API_TOKEN
[ ] CLOUDFLARE_ACCOUNT_ID

Optional for features:
[ ] VITE_API_URL
[ ] VITE_TWITTER_CLIENT_ID
[ ] VITE_LINKEDIN_CLIENT_ID
[ ] VITE_INSTAGRAM_APP_ID

Workers secrets (via CLI):
[ ] TWITTER_API_KEY
[ ] TWITTER_API_SECRET
[ ] LINKEDIN_CLIENT_ID
[ ] LINKEDIN_CLIENT_SECRET
[ ] INSTAGRAM_APP_ID
[ ] INSTAGRAM_APP_SECRET
```

---

**Ready to deploy?** See [DEPLOYMENT_FIX.md](../DEPLOYMENT_FIX.md) for complete setup instructions.
