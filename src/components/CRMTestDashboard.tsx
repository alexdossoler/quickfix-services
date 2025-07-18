'use client';

import React, { useState } from 'react';

interface TestResult {
  success: boolean;
  message: string;
  details?: Record<string, unknown> | string;
  timestamp?: string;
  testType?: string;
  data?: Record<string, unknown>;
  expectedOutcome?: string;
}

export default function CRMTestDashboard() {
  const [loading, setLoading] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [currentTest, setCurrentTest] = useState<string>('');

  const addTestResult = (result: TestResult) => {
    const newResult = {
      ...result,
      timestamp: new Date().toLocaleTimeString(),
      testType: currentTest
    };
    setTestResults(prev => [newResult, ...prev]);
  };

  const clearResults = () => {
    setTestResults([]);
  };
  const [testLead, setTestLead] = useState({
    name: 'Test Customer',
    email: 'test@quickfixservices.com',
    phone: '704-555-0123',
    service: 'plumbing',
    urgency: 'same-day',
    message: 'Test lead from admin dashboard - urgent kitchen faucet repair needed',
    address: '123 Main St, Charlotte, NC 28202',
    preferredDate: '2025-01-20',
    preferredTime: '10:00 AM',
    type: 'booking'
  });

  const testCRMConnection = async () => {
    setLoading(true);
    setCurrentTest('Connection Test');

    try {
      // Test basic connection with minimal data
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Connection Test',
          email: 'test@quickfixservices.com',
          message: 'Testing CRM connection - please ignore',
          type: 'contact'
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        addTestResult({
          success: true,
          message: 'CRM connection successful! Check your EspoCRM for the test lead.',
          details: result,
          data: {},
          expectedOutcome: 'Test lead should appear in EspoCRM'
        });
      } else {
        addTestResult({
          success: false,
          message: 'CRM connection failed',
          details: result,
          data: {},
          expectedOutcome: 'Test lead should appear in EspoCRM'
        });
      }
    } catch (error) {
      addTestResult({
        success: false,
        message: 'Connection test failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setLoading(false);
    }
  };

  const sendTestLead = async () => {
    setLoading(true);
    setCurrentTest('Lead Creation Test');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testLead)
      });

      const result = await response.json();
      
      if (response.ok) {
        addTestResult({
          success: true,
          message: 'Test lead sent successfully! Check EspoCRM for the new lead with all custom fields.',
          details: result
        });
      } else {
        addTestResult({
          success: false,
          message: 'Failed to send test lead',
          details: result
        });
      }
    } catch (error) {
      addTestResult({
        success: false,
        message: 'Failed to send test lead',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setLoading(false);
    }
  };

  const runEmergencyTest = async () => {
    setLoading(true);
    setCurrentTest('Emergency Lead Test');

    const emergencyLead = {
      ...testLead,
      name: 'Emergency Test Customer',
      urgency: 'emergency',
      service: 'electrical',
      message: 'EMERGENCY: Power outage in entire building - immediate response needed!',
      phone: '704-555-URGENT'
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emergencyLead)
      });

      const result = await response.json();
      
      if (response.ok) {
        addTestResult({
          success: true,
          message: 'Emergency lead test successful! This should have high priority scoring.',
          details: result
        });
      } else {
        addTestResult({
          success: false,
          message: 'Emergency lead test failed',
          details: result
        });
      }
    } catch (error) {
      addTestResult({
        success: false,
        message: 'Emergency lead test failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">CRM Integration Testing Dashboard</h1>
        <p className="text-gray-600">Comprehensive testing suite for EspoCRM integration</p>
      </div>

      {/* Quick Test Actions */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Quick Tests</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={testCRMConnection}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading && currentTest === 'Connection Test' ? 'Testing...' : 'Test Connection'}
          </button>
          
          <button
            onClick={sendTestLead}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading && currentTest === 'Lead Creation Test' ? 'Sending...' : 'Send Test Lead'}
          </button>
          
          <button
            onClick={runEmergencyTest}
            disabled={loading}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
          >
            {loading && currentTest === 'Emergency Lead Test' ? 'Testing...' : 'Emergency Test'}
          </button>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {testResults.length > 0 && `${testResults.length} test(s) completed`}
          </div>
          <button
            onClick={clearResults}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Clear Results
          </button>
        </div>
      </div>

      {/* Custom Test Lead Form */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Custom Test Lead</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">{/* ...existing test lead form fields... */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={testLead.name}
              onChange={(e) => setTestLead(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={testLead.email}
              onChange={(e) => setTestLead(prev => ({ ...prev, email: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              value={testLead.phone}
              onChange={(e) => setTestLead(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
            <select
              value={testLead.service}
              onChange={(e) => setTestLead(prev => ({ ...prev, service: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="plumbing">Plumbing</option>
              <option value="electrical">Electrical</option>
              <option value="brakes">Brake Repair</option>
              <option value="oil-change">Oil Change</option>
              <option value="general">General Handyman</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Urgency</label>
            <select
              value={testLead.urgency}
              onChange={(e) => setTestLead(prev => ({ ...prev, urgency: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="normal">Normal</option>
              <option value="same-day">Same Day</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              value={testLead.type}
              onChange={(e) => setTestLead(prev => ({ ...prev, type: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="booking">Booking</option>
              <option value="contact">Contact</option>
            </select>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Service Address</label>
          <input
            type="text"
            value={testLead.address}
            onChange={(e) => setTestLead(prev => ({ ...prev, address: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea
            value={testLead.message}
            onChange={(e) => setTestLead(prev => ({ ...prev, message: e.target.value }))}
            rows={3}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={sendTestLead}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send Test Lead'}
        </button>
      </div>

      {/* Test Results */}
      {testResults.length > 0 && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Results</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {testResults.map((result, index) => (
              <div 
                key={index}
                className={`border-l-4 p-4 rounded ${
                  result.success ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`font-semibold ${
                    result.success ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {result.success ? '✅' : '❌'} {result.testType || 'Test'}
                  </h3>
                  <span className="text-xs text-gray-500">{result.timestamp}</span>
                </div>
                <p className={result.success ? 'text-green-700' : 'text-red-700'}>
                  {result.message}
                </p>
                
                {result.details && (
                  <details className="mt-3">
                    <summary className="cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-800">
                      View Details
                    </summary>
                    <pre className="mt-2 bg-gray-100 p-3 rounded text-xs overflow-auto max-h-32">
                      {JSON.stringify(result.details, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Setup Instructions */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Testing Instructions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-3 text-gray-800">Before Testing:</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-500">1.</span>
                <span>Ensure EspoCRM instance is running</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">2.</span>
                <span>API user created with proper permissions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">3.</span>
                <span>Custom fields added to Lead entity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">4.</span>
                <span>Environment variables configured in .env.local</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-3 text-gray-800">Test Scenarios:</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-green-500">🔗</span>
                <span><strong>Connection Test:</strong> Verifies basic API connectivity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">📝</span>
                <span><strong>Lead Creation:</strong> Tests full lead with custom fields</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">🚨</span>
                <span><strong>Emergency Test:</strong> High-priority lead scoring</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500">⚙️</span>
                <span><strong>Custom Test:</strong> Use form above for specific scenarios</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-200">
          <h4 className="font-medium text-blue-800 mb-2">Success Indicators:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Test leads appear in EspoCRM within 30 seconds</li>
            <li>• All custom fields (serviceType, urgencyLevel, etc.) are populated</li>
            <li>• Lead score is calculated automatically (0-100 range)</li>
            <li>• Emergency leads show high priority scoring (80+ points)</li>
            <li>• No API errors in the test results</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
