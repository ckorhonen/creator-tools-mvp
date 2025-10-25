# Creator Tools MVP

> **⚠️ Deployment Notice:** GitHub Actions workflow has been fixed! See [DEPLOYMENT_FIX.md](./DEPLOYMENT_FIX.md) for configuration steps.

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

See [QUICKSTART.md](./QUICKSTART.md) for rapid setup instructions.

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [DEPLOYMENT_FIX.md](./DEPLOYMENT_FIX.md) | **START HERE** - Fix deployment issues and configuration |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Complete deployment guide for Cloudflare |
| [DEPLOYMENT_ANALYSIS.md](./DEPLOYMENT_ANALYSIS.md) | Technical analysis of deployment fixes |
| [FEATURES.md](./FEATURES.md) | Detailed feature documentation |
| [QUICKSTART.md](./QUICKSTART.md) | Quick setup guide |
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
- **Cloudflare D1** - SQLite database
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

**Important:** Before deploying, review [DEPLOYMENT_FIX.md](./DEPLOYMENT_FIX.md) for required configuration steps.

### Quick Deploy

```bash
# 1. Configure GitHub Secrets (see DEPLOYMENT_FIX.md)
# 2. Push to main branch
git push origin main

# GitHub Actions will automatically deploy to Cloudflare
```

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

### Environment Variables

Create `.env` file in the root directory:

```bash
VITE_API_URL=https://your-worker-url.workers.dev
VITE_TWITTER_CLIENT_ID=your_twitter_client_id
VITE_LINKEDIN_CLIENT_ID=your_linkedin_client_id
VITE_INSTAGRAM_APP_ID=your_instagram_app_id
```

### Worker Secrets

Set secrets via Wrangler CLI:

```bash
cd workers/api
npx wrangler secret put TWITTER_API_KEY
npx wrangler secret put TWITTER_API_SECRET
npx wrangler secret put LINKEDIN_CLIENT_ID
npx wrangler secret put LINKEDIN_CLIENT_SECRET
npx wrangler secret put INSTAGRAM_APP_ID
npx wrangler secret put INSTAGRAM_APP_SECRET
```

## 📊 Database

The app uses Cloudflare D1 (SQLite) for data storage.

### Schema

```sql
-- Posts table
CREATE TABLE posts (
  id TEXT PRIMARY KEY,
  content TEXT NOT NULL,
  platforms TEXT NOT NULL,
  status TEXT NOT NULL,
  scheduledTime DATETIME,
  publishedTime DATETIME,
  adaptedContent TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Analytics table
CREATE TABLE analytics (
  id TEXT PRIMARY KEY,
  postId TEXT NOT NULL,
  platform TEXT NOT NULL,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (postId) REFERENCES posts(id)
);
```

### Database Setup

```bash
cd workers/api

# Create database
npx wrangler d1 create creator_tools_db

# Initialize schema
npx wrangler d1 execute creator_tools_db --file=./schema.sql
```

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

- **Deployment Issues?** See [DEPLOYMENT_FIX.md](./DEPLOYMENT_FIX.md)
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
