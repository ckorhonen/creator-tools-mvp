import { useState, useEffect } from 'react';
import { ScheduledPost, UnifiedAnalytics } from './types';
import { PostComposer } from './components/PostComposer';
import { ScheduleCalendar } from './components/ScheduleCalendar';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState<'schedule' | 'analytics'>('schedule');
  const [showComposer, setShowComposer] = useState(false);
  const [posts, setPosts] = useState<ScheduledPost[]>([]);
  const [analytics, setAnalytics] = useState<UnifiedAnalytics>({
    totalImpressions: 12543,
    totalEngagements: 876,
    totalPosts: 24,
    engagementRate: 6.98,
    platformBreakdown: {
      twitter: { impressions: 5234, engagements: 387, posts: 10 },
      linkedin: { impressions: 4521, engagements: 312, posts: 8 },
      instagram: { impressions: 2788, engagements: 177, posts: 6 },
    },
    topPosts: [
      {
        id: '1',
        content: 'Just launched our new feature! 🚀 Check it out and let us know what you think.',
        platform: 'twitter',
        engagements: 145,
        impressions: 2341,
      },
      {
        id: '2',
        content: 'Excited to share insights from our latest creator survey. The results are fascinating!',
        platform: 'linkedin',
        engagements: 98,
        impressions: 1876,
      },
      {
        id: '3',
        content: 'Behind the scenes of content creation ✨',
        platform: 'instagram',
        engagements: 87,
        impressions: 1543,
      },
    ],
    timeSeriesData: [
      { date: '1/15', impressions: 1200, engagements: 85 },
      { date: '1/16', impressions: 980, engagements: 72 },
      { date: '1/17', impressions: 1450, engagements: 103 },
      { date: '1/18', impressions: 1100, engagements: 68 },
      { date: '1/19', impressions: 1580, engagements: 125 },
      { date: '1/20', impressions: 1320, engagements: 91 },
      { date: '1/21', impressions: 1670, engagements: 134 },
      { date: '1/22', impressions: 1890, engagements: 156 },
      { date: '1/23', impressions: 1430, engagements: 98 },
      { date: '1/24', impressions: 1550, engagements: 112 },
      { date: '1/25', impressions: 1720, engagements: 143 },
      { date: '1/26', impressions: 1260, engagements: 87 },
      { date: '1/27', impressions: 1840, engagements: 151 },
      { date: '1/28', impressions: 1980, engagements: 167 },
    ],
  });

  // Load posts from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('scheduledPosts');
    if (saved) {
      setPosts(JSON.parse(saved));
    }
  }, []);

  // Save posts to localStorage when updated
  useEffect(() => {
    localStorage.setItem('scheduledPosts', JSON.stringify(posts));
  }, [posts]);

  const handleSchedulePost = (postData: Omit<ScheduledPost, 'id' | 'createdAt'>) => {
    const newPost: ScheduledPost = {
      ...postData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setPosts([...posts, newPost]);
    setShowComposer(false);
  };

  const handlePostClick = (post: ScheduledPost) => {
    console.log('Post clicked:', post);
    // Could open a modal with post details
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Creator Tools MVP
              </h1>
              <p className="text-gray-600 mt-1">
                Content scheduling and unified analytics for creators
              </p>
            </div>
            {activeTab === 'schedule' && (
              <button
                onClick={() => setShowComposer(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all transform hover:scale-105"
              >
                ✨ Create Post
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
          <nav className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('schedule')}
              className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-all ${
                activeTab === 'schedule'
                  ? 'border-blue-600 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl">📅</span>
                <span>Schedule</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-all ${
                activeTab === 'analytics'
                  ? 'border-blue-600 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl">📊</span>
                <span>Analytics</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Content */}
        {showComposer ? (
          <PostComposer
            onSchedule={handleSchedulePost}
            onCancel={() => setShowComposer(false)}
          />
        ) : activeTab === 'schedule' ? (
          <div>
            {posts.length > 0 ? (
              <ScheduleCalendar posts={posts} onPostClick={handlePostClick} />
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <div className="text-6xl mb-4">📅</div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  No posts scheduled yet
                </h2>
                <p className="text-gray-600 mb-6">
                  Create your first post to start scheduling content across platforms
                </p>
                <button
                  onClick={() => setShowComposer(true)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  ✨ Create Your First Post
                </button>
              </div>
            )}
          </div>
        ) : (
          <AnalyticsDashboard analytics={analytics} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-600 text-sm">
          Built with ❤️ by{' '}
          <a
            href="https://github.com/ckorhonen"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Chris Korhonen
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
