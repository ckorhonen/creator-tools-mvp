import { ScheduledPost } from '../types';
import { PLATFORM_CONFIGS } from '../config/platforms';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns';

interface ScheduleCalendarProps {
  posts: ScheduledPost[];
  onPostClick: (post: ScheduledPost) => void;
}

export function ScheduleCalendar({ posts, onPostClick }: ScheduleCalendarProps) {
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getPostsForDay = (day: Date) => {
    return posts.filter(post => isSameDay(new Date(post.scheduledTime), day));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {format(now, 'MMMM yyyy')}
        </h2>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
            {day}
          </div>
        ))}
        
        {days.map(day => {
          const dayPosts = getPostsForDay(day);
          const today = isToday(day);
          
          return (
            <div
              key={day.toString()}
              className={`min-h-[100px] border rounded-lg p-2 ${
                today ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-200'
              }`}
            >
              <div className={`text-sm font-medium mb-1 ${
                today ? 'text-blue-600' : 'text-gray-600'
              }`}>
                {format(day, 'd')}
              </div>
              
              <div className="space-y-1">
                {dayPosts.map(post => (
                  <button
                    key={post.id}
                    onClick={() => onPostClick(post)}
                    className="w-full text-left p-1.5 rounded bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-1 mb-1">
                      {post.platforms.map(platform => (
                        <span key={platform} className="text-[10px]">
                          {PLATFORM_CONFIGS[platform].icon}
                        </span>
                      ))}
                    </div>
                    <div className="truncate">
                      {format(new Date(post.scheduledTime), 'HH:mm')}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}