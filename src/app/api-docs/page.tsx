import Link from 'next/link';

export default function CRMApiPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            🚀 QuickFix CRM API
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Easy-to-read API endpoints for accessing your CRM data
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-600 mb-3">
                📊 View All Leads (Pretty)
              </h3>
              <Link 
                href="/api/crm/leads?format=pretty"
                target="_blank"
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                View Pretty Format →
              </Link>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-600 mb-3">
                🎯 New Leads Only
              </h3>
              <Link 
                href="/api/crm/leads?status=new&format=pretty"
                target="_blank"
                className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                View New Leads →
              </Link>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">🔗 Quick Access URLs</h3>
            <div className="space-y-2 font-mono text-sm">
              <div>📊 <code>http://localhost:3000/api/crm/leads?format=pretty</code></div>
              <div>🎯 <code>http://localhost:3000/api/crm/leads?status=new&format=pretty</code></div>
              <div>📈 <code>http://localhost:3000/api/crm/leads?limit=0&format=pretty</code></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}