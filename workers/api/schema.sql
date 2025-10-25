-- Creator Tools MVP Database Schema

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY,
  content TEXT NOT NULL,
  platforms TEXT NOT NULL, -- JSON array of platforms
  scheduled_time TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('scheduled', 'published', 'failed', 'draft')),
  adapted_content TEXT, -- JSON object with platform-specific content
  media_urls TEXT, -- JSON array of media URLs
  created_at TEXT NOT NULL,
  published_at TEXT,
  updated_at TEXT
);

CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_scheduled_time ON posts(scheduled_time);
CREATE INDEX idx_posts_created_at ON posts(created_at);

-- Post metrics table
CREATE TABLE IF NOT EXISTS post_metrics (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL,
  platform TEXT NOT NULL,
  impressions INTEGER DEFAULT 0,
  engagements INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  fetched_at TEXT NOT NULL,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

CREATE INDEX idx_metrics_post_id ON post_metrics(post_id);
CREATE INDEX idx_metrics_platform ON post_metrics(platform);
CREATE INDEX idx_metrics_fetched_at ON post_metrics(fetched_at);

-- Platform connections table
CREATE TABLE IF NOT EXISTS platform_connections (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  platform TEXT NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  token_expires_at TEXT,
  username TEXT,
  connected_at TEXT NOT NULL,
  last_sync TEXT
);

CREATE INDEX idx_connections_user_platform ON platform_connections(user_id, platform);

-- Users table (simplified for MVP)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TEXT NOT NULL,
  last_login TEXT
);

CREATE INDEX idx_users_email ON users(email);