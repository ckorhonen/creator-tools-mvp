# Quick Start Guide

Get Creator Tools MVP running in under 5 minutes! ⚡

## 🚀 Local Development (2 minutes)

```bash
# 1. Clone the repository
git clone https://github.com/ckorhonen/creator-tools-mvp.git
cd creator-tools-mvp

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev

# 4. Open in browser
# Visit http://localhost:5173
```

That's it! The app is now running with mock data. You can:
- ✅ Create posts with the composer
- ✅ See scheduled posts on the calendar
- ✅ View analytics dashboard
- ✅ Test platform previews

## 🌐 Deploy to Cloudflare (10 minutes)

### Prerequisites
- Cloudflare account (free tier works)
- GitHub account

### Step 1: Fork and Deploy Frontend (3 minutes)

1. **Connect to Cloudflare Pages**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages
   - Click "Create a project" → "Connect to Git"
   - Select `ckorhonen/creator-tools-mvp`
   - Configure:
     - Framework: **Vite**
     - Build command: `npm run build`
     - Build output: `dist`
   - Click "Save and Deploy"

2. **Your site is live!** 🎉
   - URL: `https://creator-tools-mvp.pages.dev`

### Step 2: Deploy Workers API (7 minutes)

```bash
# 1. Install Wrangler CLI
npm install -g wrangler

# 2. Login to Cloudflare
wrangler login

# 3. Navigate to Workers directory
cd workers/api
npm install

# 4. Create D1 database
wrangler d1 create creator_tools_db

# 5. Copy the database_id from output and update wrangler.toml
# Edit: workers/api/wrangler.toml
# Add database_id under [[d1_databases]]

# 6. Initialize database
wrangler d1 execute creator_tools_db --file=./schema.sql

# 7. Deploy!
wrangler deploy

# Your API is live! 🎉
# URL: https://creator-tools-api.<your-subdomain>.workers.dev
```

### Step 3: Connect Frontend to API (1 minute)

1. Go to Cloudflare Pages → Your project → Settings → Environment variables
2. Add variable:
   - Name: `VITE_API_URL`
   - Value: `https://creator-tools-api.<your-subdomain>.workers.dev`
3. Click "Save"
4. Trigger a redeploy

**Done!** Your app is now fully deployed and functional! 🎊

## 🔌 Connect Social Platforms (Optional)

Want to actually post to Twitter, LinkedIn, and Instagram? Set up OAuth:

### Twitter/X
```bash
# 1. Get API keys from developer.twitter.com
# 2. Set secrets
wrangler secret put TWITTER_API_KEY
wrangler secret put TWITTER_API_SECRET
```

### LinkedIn
```bash
# 1. Get credentials from linkedin.com/developers
# 2. Set secrets
wrangler secret put LINKEDIN_CLIENT_ID
wrangler secret put LINKEDIN_CLIENT_SECRET
```

### Instagram
```bash
# 1. Get credentials from developers.facebook.com
# 2. Set secrets
wrangler secret put INSTAGRAM_APP_ID
wrangler secret put INSTAGRAM_APP_SECRET
```

**That's it!** See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed platform setup.

---

## 📖 What's Next?

- Read [README.md](./README.md) for full overview
- Check [FEATURES.md](./FEATURES.md) for detailed features
- Follow [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup
- Explore the code and customize!

## 💡 Quick Tips

**Create Your First Post**
1. Click "✨ Create Post"
2. Select platforms (Twitter, LinkedIn, Instagram)
3. Type your content
4. Watch character counters update in real-time
5. Click "👁️ Show Platform Previews"
6. Set schedule time or save as draft
7. Click "📅 Schedule Post"

**View Analytics**
1. Click "📊 Analytics" tab
2. See unified metrics across all platforms
3. Compare platform performance
4. Check top performing posts

**Test Locally**
- All data stored in localStorage
- No backend needed for basic testing
- Create posts and see them on calendar
- Analytics show mock data

## 🐛 Troubleshooting

**Port 5173 already in use?**
```bash
# Kill the process or use a different port
npm run dev -- --port 3000
```

**Build fails?**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Workers deployment fails?**
```bash
# Make sure you're logged in
wrangler whoami

# Check your account ID
wrangler whoami | grep "Account ID"

# Re-deploy
wrangler deploy
```

---

## 🎯 MVP Scope

This is a **minimal but polished MVP** focusing on:
- ✅ Core scheduling functionality
- ✅ Beautiful, intuitive UX
- ✅ Cross-platform posting (Twitter, LinkedIn, Instagram)
- ✅ Unified analytics dashboard
- ✅ Cloudflare Workers deployment

**Not included in MVP** (coming soon):
- ❌ Media upload
- ❌ Team collaboration
- ❌ Advanced analytics
- ❌ AI content suggestions
- ❌ Mobile app

---

## 📞 Need Help?

- 📖 Read the [full documentation](./README.md)
- 🐛 [Open an issue](https://github.com/ckorhonen/creator-tools-mvp/issues)
- 💬 Questions? [@ckorhonen](https://github.com/ckorhonen)

**Happy creating! 🚀**
