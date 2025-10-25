export type Platform = 'twitter' | 'linkedin' | 'instagram';

export interface PlatformConfig {
  name: string;
  icon: string;
  color: string;
  maxLength: number;
  supportsImages: boolean;
  supportsVideo: boolean;
  supportsLinks: boolean;
  hashtagsRecommended: boolean;
}

export interface ScheduledPost {
  id: string;
  content: string;
  platforms: Platform[];
  scheduledTime: Date;
  status: 'scheduled' | 'published' | 'failed' | 'draft';
  mediaUrls?: string[];
  adaptedContent?: Record<Platform, string>;
  createdAt: Date;
  publishedAt?: Date;
}

export interface PostMetrics {
  postId: string;
  platform: Platform;
  impressions: number;
  engagements: number;
  clicks: number;
  shares: number;
  comments: number;
  likes: number;
  fetchedAt: Date;
}

export interface UnifiedAnalytics {
  totalImpressions: number;
  totalEngagements: number;
  totalPosts: number;
  engagementRate: number;
  platformBreakdown: Record<Platform, {
    impressions: number;
    engagements: number;
    posts: number;
  }>;
  topPosts: Array<{
    id: string;
    content: string;
    platform: Platform;
    engagements: number;
    impressions: number;
  }>;
  timeSeriesData: Array<{
    date: string;
    impressions: number;
    engagements: number;
  }>;
}

export interface PlatformConnection {
  platform: Platform;
  connected: boolean;
  username?: string;
  lastSync?: Date;
  accessToken?: string;
}