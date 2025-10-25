/**
 * Cloudflare Workers API for Creator Tools MVP
 * Handles scheduling, publishing, and analytics aggregation
 */

export interface Env {
  DB?: D1Database; // Optional to allow deployment without database
  TWITTER_API_KEY?: string;
  TWITTER_API_SECRET?: string;
  LINKEDIN_CLIENT_ID?: string;
  LINKEDIN_CLIENT_SECRET?: string;
  INSTAGRAM_APP_ID?: string;
  INSTAGRAM_APP_SECRET?: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // Health check
      if (path === '/health') {
        return jsonResponse({ 
          status: 'ok', 
          timestamp: new Date().toISOString(),
          database: env.DB ? 'configured' : 'not configured'
        }, corsHeaders);
      }

      // Check if database is configured for endpoints that need it
      if (!env.DB && path.startsWith('/api/')) {
        return jsonResponse({ 
          error: 'Database not configured',
          message: 'Please configure the D1 database binding. See DEPLOYMENT.md for instructions.'
        }, corsHeaders, 503);
      }

      // Schedule a post
      if (path === '/api/posts' && request.method === 'POST') {
        const post = await request.json();
        const id = await schedulePost(env.DB!, post);
        return jsonResponse({ id, message: 'Post scheduled successfully' }, corsHeaders);
      }

      // Get scheduled posts
      if (path === '/api/posts' && request.method === 'GET') {
        const posts = await getScheduledPosts(env.DB!);
        return jsonResponse({ posts }, corsHeaders);
      }

      // Publish a post
      if (path.startsWith('/api/posts/') && path.endsWith('/publish') && request.method === 'POST') {
        const postId = path.split('/')[3];
        await publishPost(env, postId);
        return jsonResponse({ message: 'Post published successfully' }, corsHeaders);
      }

      // Get analytics
      if (path === '/api/analytics' && request.method === 'GET') {
        const analytics = await getAnalytics(env.DB!);
        return jsonResponse({ analytics }, corsHeaders);
      }

      // OAuth callback handlers
      if (path.startsWith('/api/auth/')) {
        const platform = path.split('/')[3];
        if (platform === 'twitter' || platform === 'linkedin' || platform === 'instagram') {
          const token = await handleOAuthCallback(env, platform, url.searchParams);
          return jsonResponse({ token }, corsHeaders);
        }
      }

      return jsonResponse({ error: 'Not found' }, corsHeaders, 404);
    } catch (error) {
      console.error('API Error:', error);
      return jsonResponse(
        { error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' },
        corsHeaders,
        500
      );
    }
  },

  // Cron trigger for publishing scheduled posts
  async scheduled(event: ScheduledEvent, env: Env) {
    if (!env.DB) {
      console.log('Skipping scheduled job: database not configured');
      return;
    }
    console.log('Running scheduled publish job');
    await processScheduledPosts(env);
  },
};

// Helper functions

function jsonResponse(data: any, headers: Record<string, string>, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });
}

async function schedulePost(db: D1Database, post: any): Promise<string> {
  const id = crypto.randomUUID();
  await db
    .prepare(
      `INSERT INTO posts (id, content, platforms, scheduled_time, status, adapted_content, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      id,
      post.content,
      JSON.stringify(post.platforms),
      post.scheduledTime,
      'scheduled',
      JSON.stringify(post.adaptedContent || {}),
      new Date().toISOString()
    )
    .run();
  return id;
}

async function getScheduledPosts(db: D1Database): Promise<any[]> {
  const result = await db.prepare('SELECT * FROM posts WHERE status = ? ORDER BY scheduled_time ASC').bind('scheduled').all();
  return result.results || [];
}

async function publishPost(env: Env, postId: string): Promise<void> {
  if (!env.DB) {
    throw new Error('Database not configured');
  }

  const post = await env.DB.prepare('SELECT * FROM posts WHERE id = ?').bind(postId).first();
  
  if (!post) {
    throw new Error('Post not found');
  }

  const platforms = JSON.parse(post.platforms as string);
  const adaptedContent = JSON.parse(post.adapted_content as string);

  // Publish to each platform
  for (const platform of platforms) {
    const content = adaptedContent[platform] || post.content;
    await publishToPlatform(env, platform, content);
  }

  // Update post status
  await env.DB.prepare('UPDATE posts SET status = ?, published_at = ? WHERE id = ?')
    .bind('published', new Date().toISOString(), postId)
    .run();
}

async function publishToPlatform(env: Env, platform: string, content: string): Promise<void> {
  console.log(`Publishing to ${platform}:`, content);
  
  // Implement actual API calls here
  switch (platform) {
    case 'twitter':
      // await twitterAPI.createTweet(env.TWITTER_API_KEY, content);
      break;
    case 'linkedin':
      // await linkedinAPI.createPost(env.LINKEDIN_CLIENT_ID, content);
      break;
    case 'instagram':
      // await instagramAPI.createPost(env.INSTAGRAM_APP_ID, content);
      break;
  }
}

async function getAnalytics(db: D1Database): Promise<any> {
  // Aggregate analytics from all posts
  const result = await db.prepare(
    `SELECT 
      COUNT(*) as total_posts,
      SUM(CAST(json_extract(metrics, '$.impressions') AS INTEGER)) as total_impressions,
      SUM(CAST(json_extract(metrics, '$.engagements') AS INTEGER)) as total_engagements
     FROM posts
     WHERE status = 'published'`
  ).first();

  return result || { total_posts: 0, total_impressions: 0, total_engagements: 0 };
}

async function handleOAuthCallback(env: Env, platform: string, params: URLSearchParams): Promise<string> {
  const code = params.get('code');
  if (!code) {
    throw new Error('No authorization code provided');
  }

  // Exchange code for access token
  // Implementation depends on each platform's OAuth flow
  console.log(`Handling OAuth callback for ${platform}`);
  
  return 'mock_access_token';
}

async function processScheduledPosts(env: Env): Promise<void> {
  if (!env.DB) {
    console.log('Database not configured');
    return;
  }

  const now = new Date().toISOString();
  const posts = await env.DB.prepare(
    'SELECT * FROM posts WHERE status = ? AND scheduled_time <= ?'
  ).bind('scheduled', now).all();

  for (const post of posts.results || []) {
    try {
      await publishPost(env, post.id as string);
      console.log(`Published post ${post.id}`);
    } catch (error) {
      console.error(`Failed to publish post ${post.id}:`, error);
      await env.DB.prepare('UPDATE posts SET status = ? WHERE id = ?')
        .bind('failed', post.id)
        .run();
    }
  }
}
