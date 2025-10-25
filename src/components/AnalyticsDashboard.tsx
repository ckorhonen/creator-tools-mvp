import { UnifiedAnalytics } from '../types';
import { PLATFORM_CONFIGS } from '../config/platforms';

interface AnalyticsDashboardProps {
  analytics: UnifiedAnalytics;
}

export function AnalyticsDashboard({ analytics }: AnalyticsDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          title="Total Impressions"
          value={analytics.totalImpressions.toLocaleString()}
          icon="👁️"
          color="blue"
        />
        <MetricCard
          title="Total Engagements"
          value={analytics.totalEngagements.toLocaleString()}
          icon="❤️"
          color="red"
        />
        <MetricCard
          title="Engagement Rate"
          value={`${analytics.engagementRate.toFixed(2)}%`}
          icon="📊"
          color="green"
        />
        <MetricCard
          title="Posts Published"
          value={analytics.totalPosts.toString()}
          icon="📝"
          color="purple"
        />
      </div>

      {/* Platform Breakdown */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Platform Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(analytics.platformBreakdown).map(([platform, data]) => {
            const config = PLATFORM_CONFIGS[platform as keyof typeof PLATFORM_CONFIGS];
            const engagementRate = data.impressions > 0
              ? ((data.engagements / data.impressions) * 100).toFixed(2)
              : '0.00';
            
            return (
              <div
                key={platform}
                className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{config.icon}</span>
                  <h4 className="font-semibold text-gray-900">{config.name}</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Impressions</span>
                    <span className="font-semibold text-gray-900">
                      {data.impressions.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Engagements</span>
                    <span className="font-semibold text-gray-900">
                      {data.engagements.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Posts</span>
                    <span className="font-semibold text-gray-900">
                      {data.posts}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="text-gray-600">Engagement Rate</span>
                    <span className="font-bold text-green-600">
                      {engagementRate}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Posts */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Top Performing Posts</h3>
        <div className="space-y-3">
          {analytics.topPosts.map((post, index) => {
            const config = PLATFORM_CONFIGS[post.platform];
            return (
              <div
                key={post.id}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{config.icon}</span>
                    <span className="text-xs font-medium text-gray-500">
                      {config.name}
                    </span>
                  </div>
                  <p className="text-gray-900 truncate">{post.content}</p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="text-sm font-semibold text-gray-900">
                    {post.engagements.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">engagements</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Time Series Chart (Simplified) */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Engagement Trend</h3>
        <div className="h-64 flex items-end justify-between gap-2">
          {analytics.timeSeriesData.slice(-14).map((data, index) => {
            const maxEngagements = Math.max(...analytics.timeSeriesData.map(d => d.engagements));
            const height = (data.engagements / maxEngagements) * 100;
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors"
                     style={{ height: `${height}%`, minHeight: '4px' }}
                     title={`${data.engagements} engagements`}
                />
                <div className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-top-left">
                  {data.date}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string;
  icon: string;
  color: string;
}) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    red: 'from-red-500 to-red-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <span className="text-3xl">{icon}</span>
        <div className={`w-12 h-12 bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} rounded-lg opacity-20`} />
      </div>
      <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}