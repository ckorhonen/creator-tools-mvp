// Core types for the creator tools MVP

export interface ScheduledPost {
  id: string;
  title: string;
  content: string;
  scheduledTime: Date;
  status: 'draft' | 'scheduled' | 'published';
  platform: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AnalyticsData {
  views: number;
  engagement: number;
  posts: number;
  period: 'day' | 'week' | 'month';
}

export interface Creator {
  id: string;
  name: string;
  email: string;
  whopUserId: string;
}
