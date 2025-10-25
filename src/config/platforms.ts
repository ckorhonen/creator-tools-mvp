import { Platform, PlatformConfig } from '../types';

export const PLATFORM_CONFIGS: Record<Platform, PlatformConfig> = {
  twitter: {
    name: 'Twitter/X',
    icon: '𝕏',
    color: '#000000',
    maxLength: 280,
    supportsImages: true,
    supportsVideo: true,
    supportsLinks: true,
    hashtagsRecommended: true,
  },
  linkedin: {
    name: 'LinkedIn',
    icon: '💼',
    color: '#0A66C2',
    maxLength: 3000,
    supportsImages: true,
    supportsVideo: true,
    supportsLinks: true,
    hashtagsRecommended: true,
  },
  instagram: {
    name: 'Instagram',
    icon: '📸',
    color: '#E4405F',
    maxLength: 2200,
    supportsImages: true,
    supportsVideo: true,
    supportsLinks: false,
    hashtagsRecommended: true,
  },
};

export const adaptContentForPlatform = (content: string, platform: Platform): string => {
  const config = PLATFORM_CONFIGS[platform];
  
  let adapted = content;
  
  // Truncate if too long
  if (adapted.length > config.maxLength) {
    adapted = adapted.substring(0, config.maxLength - 3) + '...';
  }
  
  // Remove links for Instagram
  if (platform === 'instagram' && !config.supportsLinks) {
    adapted = adapted.replace(/https?:\/\/[^\s]+/g, '');
  }
  
  // Add platform-specific formatting
  if (platform === 'linkedin') {
    // LinkedIn prefers more professional tone and line breaks
    adapted = adapted.replace(/([.!?])\s+/g, '$1\n\n');
  }
  
  return adapted.trim();
};