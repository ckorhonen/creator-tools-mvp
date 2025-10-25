import { useState } from 'react';
import { Platform, ScheduledPost } from '../types';
import { PLATFORM_CONFIGS, adaptContentForPlatform } from '../config/platforms';

interface PostComposerProps {
  onSchedule: (post: Omit<ScheduledPost, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

export function PostComposer({ onSchedule, onCancel }: PostComposerProps) {
  const [content, setContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(['twitter']);
  const [scheduledTime, setScheduledTime] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const togglePlatform = (platform: Platform) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleSubmit = () => {
    const adaptedContent = selectedPlatforms.reduce((acc, platform) => {
      acc[platform] = adaptContentForPlatform(content, platform);
      return acc;
    }, {} as Record<Platform, string>);

    onSchedule({
      content,
      platforms: selectedPlatforms,
      scheduledTime: new Date(scheduledTime),
      status: scheduledTime ? 'scheduled' : 'draft',
      adaptedContent,
    });
  };

  const getCharacterCount = (platform: Platform) => {
    const adapted = adaptContentForPlatform(content, platform);
    const config = PLATFORM_CONFIGS[platform];
    return {
      count: adapted.length,
      max: config.maxLength,
      percentage: (adapted.length / config.maxLength) * 100,
    };
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Post</h2>

      {/* Platform Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select Platforms
        </label>
        <div className="flex gap-3">
          {(Object.keys(PLATFORM_CONFIGS) as Platform[]).map(platform => {
            const config = PLATFORM_CONFIGS[platform];
            const isSelected = selectedPlatforms.includes(platform);
            return (
              <button
                key={platform}
                onClick={() => togglePlatform(platform)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
              >
                <span className="text-xl">{config.icon}</span>
                <span className="font-medium">{config.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Content
        </label>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={6}
        />
      </div>

      {/* Character Counters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {selectedPlatforms.map(platform => {
          const { count, max, percentage } = getCharacterCount(platform);
          const config = PLATFORM_CONFIGS[platform];
          const isOverLimit = count > max;
          return (
            <div
              key={platform}
              className="bg-gray-50 rounded-lg p-3 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {config.icon} {config.name}
                </span>
                <span
                  className={`text-sm font-semibold ${
                    isOverLimit ? 'text-red-600' : 'text-gray-600'
                  }`}
                >
                  {count}/{max}
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    isOverLimit ? 'bg-red-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Schedule Time */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Schedule Time (optional)
        </label>
        <input
          type="datetime-local"
          value={scheduledTime}
          onChange={e => setScheduledTime(e.target.value)}
          min={new Date().toISOString().slice(0, 16)}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Preview Toggle */}
      <button
        onClick={() => setShowPreview(!showPreview)}
        className="mb-4 text-blue-600 hover:text-blue-700 font-medium text-sm"
      >
        {showPreview ? '✖️ Hide' : '👁️ Show'} Platform Previews
      </button>

      {/* Platform Previews */}
      {showPreview && (
        <div className="mb-6 space-y-4">
          {selectedPlatforms.map(platform => {
            const adapted = adaptContentForPlatform(content, platform);
            const config = PLATFORM_CONFIGS[platform];
            return (
              <div
                key={platform}
                className="border border-gray-200 rounded-lg p-4 bg-gray-50"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">{config.icon}</span>
                  <span className="font-semibold text-gray-900">
                    {config.name} Preview
                  </span>
                </div>
                <p className="text-gray-800 whitespace-pre-wrap">{adapted}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={!content || selectedPlatforms.length === 0}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {scheduledTime ? '📅 Schedule Post' : '💾 Save Draft'}
        </button>
      </div>
    </div>
  );
}