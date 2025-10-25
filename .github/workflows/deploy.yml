name: Deploy to Cloudflare

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
  workflow_dispatch:  # Allow manual triggers

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    name: Deploy Frontend to Cloudflare Pages
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          # No cache configuration for root - package-lock.json not tracked

      - name: Install dependencies
        run: |
          # Use npm install since package-lock.json might not be committed
          npm install
        
      - name: Build
        run: npm run build
        env:
          # Use secrets with fallback to default values for initial deployment
          VITE_API_URL: ${{ secrets.VITE_API_URL || 'https://creator-tools-api.ckorhonen.workers.dev' }}
          VITE_TWITTER_CLIENT_ID: ${{ secrets.VITE_TWITTER_CLIENT_ID || '' }}
          VITE_LINKEDIN_CLIENT_ID: ${{ secrets.VITE_LINKEDIN_CLIENT_ID || '' }}
          VITE_INSTAGRAM_APP_ID: ${{ secrets.VITE_INSTAGRAM_APP_ID || '' }}

      - name: Verify build output
        run: |
          echo "Checking dist directory..."
          ls -la dist/ || echo "⚠️  dist directory not found"
          
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: creator-tools-mvp
          directory: dist
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}

  deploy-workers:
    runs-on: ubuntu-latest
    name: Deploy Workers API
    defaults:
      run:
        working-directory: workers/api
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          # Enable cache for Workers API which has package-lock.json
          cache: 'npm'
          cache-dependency-path: 'workers/api/package-lock.json'

      - name: Install dependencies
        run: npm ci

      - name: Verify wrangler.toml
        run: |
          echo "Checking wrangler.toml configuration..."
          cat wrangler.toml

      - name: Deploy to Cloudflare Workers
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          workingDirectory: workers/api
