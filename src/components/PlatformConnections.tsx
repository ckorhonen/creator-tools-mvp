import { useState, useEffect } from 'react';
import { Platform, PlatformConnection } from '../types';
import { PLATFORM_CONFIGS } from '../config/platforms';
import { PlatformService } from '../services/platformService';

interface PlatformConnectionsProps {
  onConnectionChange?: (platform: Platform, connected: boolean) => void;
}

export function PlatformConnections({ onConnectionChange }: PlatformConnectionsProps) {
  const [connections, setConnections] = useState<Record<Platform, boolean>>({
    twitter: false,
    linkedin: false,
    instagram: false,
  });
  const [loading, setLoading] = useState<Platform | null>(null);

  const platformService = PlatformService.getInstance();

  useEffect(() => {
    // Check connection status for all platforms
    const checkConnections = async () => {
      const statuses = await Promise.all(
        (Object.keys(PLATFORM_CONFIGS) as Platform[]).map(async platform => ({
          platform,
          connected: await platformService.isConnected(platform),
        }))
      );

      const connectionMap = statuses.reduce((acc, { platform, connected }) => {
        acc[platform] = connected;
        return acc;
      }, {} as Record<Platform, boolean>);

      setConnections(connectionMap);
    };

    checkConnections();
  }, []);

  const handleConnect = async (platform: Platform) => {
    setLoading(platform);
    try {
      const token = await platformService.authenticate(platform);
      localStorage.setItem(`${platform}_token`, token);
      setConnections(prev => ({ ...prev, [platform]: true }));
      onConnectionChange?.(platform, true);
    } catch (error) {
      console.error(`Failed to connect to ${platform}:`, error);
      alert(`Failed to connect to ${PLATFORM_CONFIGS[platform].name}`);
    } finally {
      setLoading(null);
    }
  };

  const handleDisconnect = async (platform: Platform) => {
    localStorage.removeItem(`${platform}_token`);
    setConnections(prev => ({ ...prev, [platform]: false }));
    onConnectionChange?.(platform, false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Platform Connections</h2>
      <div className="space-y-4">
        {(Object.keys(PLATFORM_CONFIGS) as Platform[]).map(platform => {
          const config = PLATFORM_CONFIGS[platform];
          const isConnected = connections[platform];
          const isLoading = loading === platform;

          return (
            <div
              key={platform}
              className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{config.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900">{config.name}</h3>
                  <p className="text-sm text-gray-500">
                    {isConnected ? '✅ Connected' : '❌ Not connected'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => (isConnected ? handleDisconnect(platform) : handleConnect(platform))}
                disabled={isLoading}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  isConnected
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading ? '⏳ Connecting...' : isConnected ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          );
        })}
      </div>
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-900">
          <strong>🔒 Privacy Notice:</strong> We only request permissions to post content and view
          analytics. Your credentials are stored securely and never shared.
        </p>
      </div>
    </div>
  );
}