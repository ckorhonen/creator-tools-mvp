# Deployment Troubleshooting Guide

This guide helps you diagnose and fix common deployment issues for the Creator Tools MVP.

## 🔍 Quick Diagnosis

### Check Workflow Run Status

1. Go to: https://github.com/ckorhonen/creator-tools-mvp/actions
2. Click on the failed workflow run
3. Expand the failed job to see error messages

### Common Error Patterns

| Error Pattern | Likely Cause | Solution |
|--------------|--------------|----------|
| `CLOUDFLARE_API_TOKEN secret is not set` | Missing GitHub secret | [Configure secrets](#configure-github-secrets) |
| `10000: Authentication error` | Invalid API token | [Regenerate token](#regenerate-cloudflare-api-token) |
| `dist directory not found` | Build failed | [Fix build errors](#fix-build-errors) |
| `npm install failed` | Dependency issue | [Clear cache](#clear-npm-cache) |
| `wrangler.toml not found` | Wrong directory | [Check directory structure](#verify-directory-structure) |

## 🔧 Common Solutions

### Configure GitHub Secrets

**Required secrets:**
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

**Steps:**

1. **Get Cloudflare Account ID**
   - Go to: https://dash.cloudflare.com/
   - Copy your Account ID from the right sidebar

2. **Create Cloudflare API Token**
   - Go to: https://dash.cloudflare.com/profile/api-tokens
   - Click "Create Token"
   - Use template: "Edit Cloudflare Workers"
   - Add permissions:
     - Account → Cloudflare Pages → Edit
     - Account → Cloudflare Workers → Edit
   - Click "Continue to summary" → "Create Token"
   - **Copy the token immediately** (you won't see it again!)

3. **Add Secrets to GitHub**
   - Go to: https://github.com/ckorhonen/creator-tools-mvp/settings/secrets/actions
   - Click "New repository secret"
   - Add `CLOUDFLARE_API_TOKEN` with your token
   - Add `CLOUDFLARE_ACCOUNT_ID` with your account ID

### Regenerate Cloudflare API Token

If your token expired or has wrong permissions:

1. Go to: https://dash.cloudflare.com/profile/api-tokens
2. Find your existing token and click "Roll" or create a new one
3. Update the GitHub secret with the new token
4. Re-run the workflow

### Fix Build Errors

#### TypeScript Errors

```bash
# Run locally to see detailed errors
npm run type-check

# Common fixes:
# 1. Update type definitions
npm install --save-dev @types/node

# 2. Fix import errors
# Check that all imports use correct paths

# 3. Verify tsconfig.json is valid
npx tsc --noEmit
```

#### Vite Build Errors

```bash
# Run build locally
npm run build

# Check for:
# - Missing dependencies
# - Invalid environment variables
# - Syntax errors in components
```

#### Worker Build Errors

```bash
cd workers/api

# Install dependencies
npm install

# Check wrangler configuration
npx wrangler validate

# Deploy locally first
npx wrangler dev
```

### Clear NPM Cache

If you see dependency installation errors:

```bash
# In GitHub Actions (automatic in workflow)
rm -f package-lock.json
npm install

# Locally
rm -rf node_modules package-lock.json
npm install
```

### Verify Directory Structure

Ensure your repository has this structure:

```
creator-tools-mvp/
├── .github/
│   └── workflows/
│       └── deploy.yml          ✅ Must exist
├── src/                        ✅ Frontend source
├── workers/
│   └── api/
│       ├── src/
│       │   └── index.ts        ✅ Worker source
│       ├── wrangler.toml       ✅ Worker config
│       └── package.json        ✅ Worker dependencies
├── package.json                ✅ Frontend dependencies
├── vite.config.ts              ✅ Vite config
└── tsconfig.json               ✅ TypeScript config
```

## 🐛 Specific Error Solutions

### Error: "Authentication error (10000)"

**Cause:** Invalid or expired API token

**Solution:**
1. Regenerate your Cloudflare API token (see above)
2. Verify token has correct permissions:
   - Cloudflare Workers → Edit
   - Cloudflare Pages → Edit
3. Update GitHub secret
4. Re-run workflow

### Error: "Account does not exist"

**Cause:** Wrong Account ID

**Solution:**
1. Go to: https://dash.cloudflare.com/
2. Copy the correct Account ID from the sidebar
3. Update `CLOUDFLARE_ACCOUNT_ID` in GitHub secrets
4. Re-run workflow

### Error: "dist directory not found"

**Cause:** Frontend build failed

**Solution:**
1. Check the "Build" step logs for actual error
2. Run `npm run build` locally to reproduce
3. Common fixes:
   - Fix TypeScript errors
   - Install missing dependencies
   - Fix import paths
   - Check environment variables

### Error: "wrangler.toml not found"

**Cause:** Working directory issue or file missing

**Solution:**
1. Verify `workers/api/wrangler.toml` exists
2. Check workflow uses correct `workingDirectory`:
   ```yaml
   defaults:
     run:
       working-directory: workers/api
   ```

### Error: "Project name already exists"

**Cause:** Cloudflare Pages project already exists with different config

**Solution:**
1. Go to: https://dash.cloudflare.com/ → Pages
2. Delete existing project or use a different name
3. Update `projectName` in `.github/workflows/deploy.yml`

### Error: "Worker name already exists"

**Cause:** Worker already deployed with different config

**Solution:**
1. Go to: https://dash.cloudflare.com/ → Workers & Pages
2. Delete existing Worker or use a different name
3. Update `name` in `workers/api/wrangler.toml`

## 🔍 Debugging Steps

### Step 1: Verify Secrets

```bash
# Check if secrets are set (locally)
# You can't see the values, but you can verify they exist
# Go to: https://github.com/ckorhonen/creator-tools-mvp/settings/secrets/actions
```

### Step 2: Test Build Locally

```bash
# Test frontend build
npm install
npm run type-check
npm run build

# Verify dist/ directory was created
ls -la dist/

# Test worker build
cd workers/api
npm install
npx wrangler validate
npx wrangler dev
```

### Step 3: Manual Deploy Test

```bash
# Try manual deployment to isolate the issue
cd workers/api
npx wrangler deploy

cd ../..
npm run build
npx wrangler pages deploy dist --project-name=creator-tools-mvp
```

### Step 4: Check Cloudflare Dashboard

1. Go to: https://dash.cloudflare.com/
2. Check Workers & Pages section
3. Look for any deployment errors or warnings
4. Verify projects exist and are accessible

## 📊 Monitoring Deployments

### View Deployment Logs

**GitHub Actions:**
- https://github.com/ckorhonen/creator-tools-mvp/actions

**Cloudflare Workers:**
- https://dash.cloudflare.com/ → Workers & Pages → creator-tools-api → Logs

**Cloudflare Pages:**
- https://dash.cloudflare.com/ → Pages → creator-tools-mvp → Deployments

### Test Deployed Services

```bash
# Test API health
curl https://creator-tools-api.ckorhonen.workers.dev/health

# Expected response:
# {"status":"ok","timestamp":"2025-...","database":"not configured"}

# Test frontend
curl -I https://creator-tools-mvp.pages.dev

# Expected: HTTP 200 OK
```

## 🚨 Emergency Rollback

If deployment breaks production:

### Rollback Pages

1. Go to: https://dash.cloudflare.com/ → Pages → creator-tools-mvp
2. Click on "Deployments"
3. Find last working deployment
4. Click "..." → "Rollback to this deployment"

### Rollback Worker

```bash
cd workers/api

# List previous versions
npx wrangler deployments list

# Rollback to previous version
npx wrangler rollback
```

## 💡 Best Practices

1. **Always test locally first**
   ```bash
   npm run build && cd workers/api && npx wrangler dev
   ```

2. **Use workflow_dispatch for testing**
   - Go to Actions → Deploy to Cloudflare → Run workflow
   - Test changes without pushing to main

3. **Check logs immediately after deployment**
   - GitHub Actions summary
   - Cloudflare dashboard

4. **Keep secrets up to date**
   - Rotate API tokens regularly
   - Update GitHub secrets when tokens change

5. **Monitor first request after deployment**
   ```bash
   curl -v https://creator-tools-api.ckorhonen.workers.dev/health
   ```

## 📞 Getting Help

If you're still stuck:

1. **Check existing issues:**
   https://github.com/ckorhonen/creator-tools-mvp/issues

2. **Review recent workflow runs:**
   https://github.com/ckorhonen/creator-tools-mvp/actions

3. **Consult Cloudflare docs:**
   - Workers: https://developers.cloudflare.com/workers/
   - Pages: https://developers.cloudflare.com/pages/

4. **Open a new issue with:**
   - Workflow run URL
   - Error message
   - Steps you've already tried
   - Output of local build test

## ✅ Success Checklist

After fixing deployment issues, verify:

- [ ] GitHub secrets are configured correctly
- [ ] Local build succeeds: `npm run build`
- [ ] Local worker runs: `npx wrangler dev`
- [ ] Workflow run completes successfully
- [ ] Frontend is accessible: https://creator-tools-mvp.pages.dev
- [ ] API health check works: https://creator-tools-api.ckorhonen.workers.dev/health
- [ ] No errors in Cloudflare dashboard

## 📚 Related Documentation

- [DEPLOYMENT_QUICK_START.md](./DEPLOYMENT_QUICK_START.md) - Initial deployment guide
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Complete deployment reference
- [QUICK_FIX_SUMMARY.md](./QUICK_FIX_SUMMARY.md) - Latest deployment status
- [README.md](./README.md) - Project overview
