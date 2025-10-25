import { useState } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState<'schedule' | 'analytics'>('schedule')

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Creator Tools MVP
          </h1>
          <p className="text-gray-600 mt-1">
            Content scheduling and analytics for Whop creators
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('schedule')}
                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                  activeTab === 'schedule'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                📅 Schedule
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                  activeTab === 'analytics'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                📊 Analytics
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'schedule' ? (
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Content Scheduler
                </h2>
                <p className="text-gray-600">
                  Schedule your content releases and manage your posting calendar
                </p>
                <div className="mt-6">
                  <button className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600">
                    Create Schedule
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Analytics Dashboard
                </h2>
                <p className="text-gray-600">
                  Track your content performance and audience engagement
                </p>
                <div className="mt-6 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">0</div>
                    <div className="text-sm text-gray-600">Total Views</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">0</div>
                    <div className="text-sm text-gray-600">Engagement</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">0</div>
                    <div className="text-sm text-gray-600">Posts</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
