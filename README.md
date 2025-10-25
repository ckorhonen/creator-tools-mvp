# Creator Tools MVP

> **✅ DEPLOYMENT FIXED!** The GitHub Actions workflow is now ready to deploy. See [DEPLOYMENT_QUICK_START.md](./DEPLOYMENT_QUICK_START.md) for 5-minute setup instructions.

A minimal but polished content scheduling MVP for Twitter/X, LinkedIn, and Instagram with unified analytics. Built with React, TypeScript, and Cloudflare Workers.

![Project Status](https://img.shields.io/badge/status-mvp-blue)
![Build Status](https://github.com/ckorhonen/creator-tools-mvp/actions/workflows/deploy.yml/badge.svg)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 📝 **Multi-Platform Scheduling** - Schedule posts to Twitter/X, LinkedIn, and Instagram
- 🎨 **Platform-Specific Adaptation** - Automatically adapt content for each platform
- 📊 **Unified Analytics Dashboard** - View performance metrics across all platforms
- ⏰ **Smart Scheduling** - Cron-based automatic publishing
- 🎯 **Character Counting** - Real-time validation for platform limits
- 📱 **Responsive Design** - Beautiful UI that works on all devices

## 🚀 Quick Start

**New to this project?** Start here:

1. **[DEPLOYMENT_QUICK_START.md](./DEPLOYMENT_QUICK_START.md)** ⭐ - Deploy in 5 minutes
2. **[QUICKSTART.md](./QUICKSTART.md)** - Development setup guide

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [DEPLOYMENT_QUICK_START.md](./DEPLOYMENT_QUICK_START.md) | **START HERE** - Deploy with minimal configuration (5 min) |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Complete deployment guide for Cloudflare |
| [FEATURES.md](./FEATURES.md) | Detailed feature documentation |
| [QUICKSTART.md](./QUICKSTART.md) | Local development setup |
| [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) | Project overview and architecture |
| [SCREENSHOTS.md](./SCREENSHOTS.md) | Visual guide with screenshots |

## 🏗️ Architecture

```
creator-tools-mvp/
├── src/                    # React frontend
│   ├── components/         # UI components
│   ├── services/          # Platform API integrations
│   ├── types/             # TypeScript definitions
│   └── utils/             # Utility functions
├── workers/api/           # Cloudflare Workers backend
│   ├── src/               # Worker code
│   ├── schema.sql         # D1 database schema
│   └── wrangler.toml      # Worker configuration
└── .github/workflows/     # GitHub Actions CI/CD
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **date-fns** - Date manipulation

### Backend
- **Cloudflare Workers** - Serverless API
- **Cloudflare D1** - SQLite database (optional)
- **TypeScript** - Type safety

### Infrastructure
- **Cloudflare Pages** - Frontend hosting
- **GitHub Actions** - CI/CD
- **Wrangler** - Cloudflare CLI

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- Cloudflare account (free tier)
- Wrangler CLI

### Local Development

```bash
# Clone the repository
git clone https://github.com/ckorhonen/creator-tools-mvp.git
cd creator-tools-mvp

# Install frontend dependencies
npm install

# Start development server
npm run dev

# In another terminal, start the Workers API
cd workers/api
npm install
npx wrangler dev
```

Visit `http://localhost:5173` to see the app.

## 🚢 Deployment

### GitHub Actions (Recommended)

The easiest way to deploy is via GitHub Actions:

1. **Configure Secrets** (2 minutes)
   - Go to: Settings → Secrets and variables → Actions
   - Add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`
   - See [DEPLOYMENT_QUICK_START.md](./DEPLOYMENT_QUICK_START.md) for details

2. **Push to Deploy** (automatic)
   ```bash
   git push origin main
   ```
   
   Or manually trigger: Actions → Deploy to Cloudflare → Run workflow

3. **Access Your App**
   - Frontend: `https://creator-tools-mvp.pages.dev`
   - API: `https://creator-tools-api.ckorhonen.workers.dev`

### Manual Deploy

```bash
# Deploy Workers API
cd workers/api
npm install
npx wrangler deploy

# Build and deploy frontend
cd ../..
npm install
npm run build
npx wrangler pages deploy dist --project-name=creator-tools-mvp
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive deployment instructions.

## 🔧 Configuration

### Minimal Configuration (Required)

Only these two secrets are required for deployment:
- `CLOUDFLARE_API_TOKEN` - From Cloudflare Dashboard
- `CLOUDFLARE_ACCOUNT_ID` - From Cloudflare Dashboard

### Optional Configuration

Add these for full functionality:

**Environment Variables** (`.env`):
```bash
VITE_API_URL=https://your-worker-url.workers.dev
VITE_TWITTER_CLIENT_ID=your_twitter_client_id
VITE_LINKEDIN_CLIENT_ID=your_linkedin_client_id
VITE_INSTAGRAM_APP_ID=your_instagram_app_id
```

**Worker Secrets** (via Wrangler CLI):
```bash
cd workers/api
npx wrangler secret put TWITTER_API_KEY
npx wrangler secret put TWITTER_API_SECRET
npx wrangler secret put LINKEDIN_CLIENT_ID
npx wrangler secret put LINKEDIN_CLIENT_SECRET
npx wrangler secret put INSTAGRAM_APP_ID
npx wrangler secret put INSTAGRAM_APP_SECRET
```

## 📊 Database (Optional)

The app works without a database, but to enable post scheduling and analytics:

```bash
cd workers/api

# Create database
npx wrangler d1 create creator_tools_db

# Update workers/api/wrangler.toml with database_id

# Initialize schema
npx wrangler d1 execute creator_tools_db --file=./schema.sql
```

See [DEPLOYMENT_QUICK_START.md](./DEPLOYMENT_QUICK_START.md) for detailed instructions.

## 🧪 Testing

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build test
npm run build
```

## 📈 Cost Estimate

All infrastructure runs on Cloudflare's **free tier**:

| Service | Free Tier | Usage |
|---------|-----------|-------|
| Workers | 100K req/day | API backend |
| D1 Database | 5M reads/month | Data storage |
| Pages | Unlimited | Frontend hosting |
| **Total** | **$0/month** | MVP deployment |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Issues & Support

- **Deployment Issues?** See [DEPLOYMENT_QUICK_START.md](./DEPLOYMENT_QUICK_START.md)
- **Bug Reports:** [Open an issue](https://github.com/ckorhonen/creator-tools-mvp/issues)
- **Questions:** [Start a discussion](https://github.com/ckorhonen/creator-tools-mvp/discussions)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Cloudflare Workers](https://workers.cloudflare.com/)
- UI inspired by modern SaaS design patterns
- Platform APIs: [Twitter](https://developer.twitter.com/), [LinkedIn](https://www.linkedin.com/developers/), [Instagram](https://developers.facebook.com/products/instagram/)

## 🗺️ Roadmap

- [x] Multi-platform content scheduling
- [x] Unified analytics dashboard
- [x] Automatic content adaptation
- [x] Cloudflare Workers deployment
- [x] GitHub Actions CI/CD
- [ ] User authentication
- [ ] Team collaboration features
- [ ] Advanced analytics & insights
- [ ] Media library management
- [ ] AI-powered content suggestions

## 📞 Contact

Chris Korhonen - [@ckorhonen](https://github.com/ckorhonen)

Project Link: [https://github.com/ckorhonen/creator-tools-mvp](https://github.com/ckorhonen/creator-tools-mvp)

---

**Made with ❤️ for content creators**
