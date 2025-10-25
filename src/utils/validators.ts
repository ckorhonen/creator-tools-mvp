import { Platform } from '../types';
import { PLATFORM_CONFIGS } from '../config/platforms';

/**
 * Validate content length for a platform
 */
export function validateContentLength(
  content: string,
  platform: Platform
): { valid: boolean; message?: string } {
  const config = PLATFORM_CONFIGS[platform];
  const length = content.length;

  if (length === 0) {
    return { valid: false, message: 'Content cannot be empty' };
  }

  if (length > config.maxLength) {
    return {
      valid: false,
      message: `Content exceeds ${config.name} limit of ${config.maxLength} characters`,
    };
  }

  return { valid: true };
}

/**
 * Validate that at least one platform is selected
 */
export function validatePlatformSelection(platforms: Platform[]): {
  valid: boolean;
  message?: string;
} {
  if (platforms.length === 0) {
    return { valid: false, message: 'Please select at least one platform' };
  }
  return { valid: true };
}

/**
 * Validate scheduled time
 */
export function validateScheduledTime(scheduledTime: Date | string): {
  valid: boolean;
  message?: string;
} {
  const time = typeof scheduledTime === 'string' ? new Date(scheduledTime) : scheduledTime;
  const now = new Date();

  if (isNaN(time.getTime())) {
    return { valid: false, message: 'Invalid date/time' };
  }

  if (time < now) {
    return { valid: false, message: 'Scheduled time must be in the future' };
  }

  return { valid: true };
}

/**
 * Extract hashtags from content
 */
export function extractHashtags(content: string): string[] {
  const hashtagRegex = /#([a-zA-Z0-9_]+)/g;
  const matches = content.match(hashtagRegex);
  return matches ? matches.map(tag => tag.substring(1)) : [];
}

/**
 * Extract mentions from content
 */
export function extractMentions(content: string): string[] {
  const mentionRegex = /@([a-zA-Z0-9_]+)/g;
  const matches = content.match(mentionRegex);
  return matches ? matches.map(mention => mention.substring(1)) : [];
}

/**
 * Extract URLs from content
 */
export function extractUrls(content: string): string[] {
  const urlRegex = /https?:\/\/[^\s]+/g;
  const matches = content.match(urlRegex);
  return matches || [];
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}