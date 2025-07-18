#!/usr/bin/env node

/**
 * Enhanced CRM Integration Test Suite
 * Comprehensive testing for EspoCRM integration
 */

const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

// Test scenarios
const testScenarios = [
  {
    name: 'Basic Lead Test',
    description: 'Standard booking request with all fields',
    data: {
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '704-555-0123',
      service: 'plumbing',
      message: 'Kitchen faucet is leaking and needs repair',
      type: 'booking',
      address: '123 Main St, Charlotte, NC 28202',
      preferredDate: '2025-01-20',
      preferredTime: '10:00 AM',
      urgency: 'normal',
      source: 'test-script'
    },
    expectedScore: 60
  },
  {
    name: 'Emergency Lead Test',
    description: 'High-priority emergency service request',
    data: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      phone: '704-555-URGENT',
      service: 'electrical',
      message: 'EMERGENCY: Complete power outage in building',
      type: 'booking',
      address: '456 Business Ave, Charlotte, NC 28203',
      preferredDate: '2025-01-18',
      preferredTime: 'ASAP',
      urgency: 'emergency',
      source: 'test-script'
    },
    expectedScore: 95
  },
  {
    name: 'Minimal Contact Test',
    description: 'Contact form with minimal information',
    data: {
      name: 'Mike Wilson',
      email: 'mike.wilson@example.com',
      message: 'Question about brake service pricing',
      type: 'contact',
      source: 'test-script'
    },
    expectedScore: 25
  },
  {
    name: 'High-Value Service Test',
    description: 'Same-day brake repair request',
    data: {
      name: 'Lisa Chen',
      email: 'lisa.chen@example.com',
      phone: '704-555-BRAKES',
      service: 'brakes',
      message: 'Brake pedal going to floor - safety concern',
      type: 'booking',
      address: '789 Safe Drive, Charlotte, NC 28204',
      preferredDate: '2025-01-19',
      preferredTime: '2:00 PM',
      urgency: 'same-day',
      source: 'test-script'
    },
    expectedScore: 85
  }
];

function log(message, type = 'info') {
  const colors = {
    info: '\\x1b[36m',     // Cyan
    success: '\\x1b[32m',  // Green
    warning: '\\x1b[33m',  // Yellow
    error: '\\x1b[31m',    // Red
    reset: '\\x1b[0m'      // Reset
  };
  
  const symbols = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌'
  };
  
  console.log(`${colors[type]}${symbols[type]} ${message}${colors.reset}`);
}

async function validateEnvironment() {
  log('Validating environment configuration...', 'info');
  
  const requiredVars = ['CRM_PROVIDER', 'CRM_API_URL', 'CRM_USERNAME', 'CRM_PASSWORD'];
  const missing = requiredVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    log(`Missing environment variables: ${missing.join(', ')}`, 'error');
    return false;
  }
  
  if (process.env.CRM_PROVIDER !== 'espocrm') {
    log(`CRM provider is "${process.env.CRM_PROVIDER}", not EspoCRM`, 'warning');
    return false;
  }
  
  log('Environment configuration valid', 'success');
  return true;
}

async function testEspoCRMConnection() {
  log('Testing EspoCRM API connection...', 'info');
  
  try {
    const auth = Buffer.from(`${process.env.CRM_USERNAME}:${process.env.CRM_PASSWORD}`).toString('base64');
    
    const response = await fetch(`${process.env.CRM_API_URL}/api/v1/Lead`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      log(`Connection successful! Found ${data.total || 0} existing leads`, 'success');
      return { success: true, leadCount: data.total || 0 };
    } else {
      const error = await response.text();
      log(`Connection failed: ${response.status} - ${error}`, 'error');
      return { success: false, error: error, status: response.status };
    }
  } catch (error) {
    log(`Connection test failed: ${error.message}`, 'error');
    return { success: false, error: error.message };
  }
}

async function testWebsiteIntegration(testData) {
  log(`Testing website integration with: ${testData.name}`, 'info');
  
  try {
    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });

    if (response.ok) {
      const result = await response.json();
      log(`Website integration test successful`, 'success');
      return { success: true, data: result };
    } else {
      const error = await response.text();
      log(`Website integration failed: ${response.status} - ${error}`, 'error');
      return { success: false, error: error, status: response.status };
    }
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      log('Website not running. Start with: npm run dev', 'warning');
    } else {
      log(`Website integration test failed: ${error.message}`, 'error');
    }
    return { success: false, error: error.message };
  }
}

async function createTestLead(testData) {
  log(`Creating test lead in EspoCRM: ${testData.name}`, 'info');
  
  try {
    const auth = Buffer.from(`${process.env.CRM_USERNAME}:${process.env.CRM_PASSWORD}`).toString('base64');
    
    const leadData = {
      name: testData.name,
      emailAddress: testData.email,
      phoneNumber: testData.phone || '',
      description: testData.message,
      source: testData.source || 'test-script',
      status: 'New',
      assignedUserId: '1',
      // Custom fields for QuickFix Services
      serviceType: testData.service || '',
      urgencyLevel: testData.urgency || 'normal',
      preferredDate: testData.preferredDate || '',
      preferredTime: testData.preferredTime || '',
      serviceAddress: testData.address || '',
      leadScore: testData.expectedScore || 0,
      leadType: testData.type || 'contact'
    };

    const response = await fetch(`${process.env.CRM_API_URL}/api/v1/Lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify(leadData)
    });

    if (response.ok) {
      const result = await response.json();
      log(`Test lead created successfully! ID: ${result.id}`, 'success');
      return { success: true, leadId: result.id, data: result };
    } else {
      const error = await response.text();
      log(`Lead creation failed: ${response.status} - ${error}`, 'error');
      
      if (error.includes('field') || error.includes('attribute')) {
        log('Custom fields may not be configured. Check ESPOCRM_QUICK_START.md', 'warning');
      }
      
      return { success: false, error: error, status: response.status };
    }
  } catch (error) {
    log(`Lead creation failed: ${error.message}`, 'error');
    return { success: false, error: error.message };
  }
}

async function runTestSuite() {
  console.log('🚀 QuickFix Services - Comprehensive CRM Integration Test Suite');
  console.log('================================================================\\n');
  
  // Step 1: Validate environment
  const envValid = await validateEnvironment();
  if (!envValid) {
    log('Please fix environment configuration before proceeding', 'error');
    return;
  }
  
  // Step 2: Test EspoCRM connection
  const connectionResult = await testEspoCRMConnection();
  if (!connectionResult.success) {
    log('Connection failed. Check your EspoCRM credentials and network', 'error');
    return;
  }
  
  // Step 3: Run test scenarios
  log('\\nRunning test scenarios...', 'info');
  let passedTests = 0;
  let totalTests = testScenarios.length;
  
  for (const scenario of testScenarios) {
    console.log(`\\n📋 ${scenario.name}`);
    console.log(`   ${scenario.description}`);
    
    const result = await createTestLead(scenario.data);
    if (result.success) {
      passedTests++;
      log(`   Lead ID: ${result.leadId}`, 'success');
      log(`   View: ${process.env.CRM_API_URL}/#Lead/view/${result.leadId}`, 'info');
    } else {
      log(`   Failed: ${result.error}`, 'error');
    }
  }
  
  // Step 4: Test website integration (if server running)
  log('\\nTesting website integration...', 'info');
  const websiteResult = await testWebsiteIntegration(testScenarios[0].data);
  if (websiteResult.success) {
    log('Website API integration working correctly', 'success');
  } else {
    log('Website integration test failed (make sure server is running)', 'warning');
  }
  
  // Step 5: Summary
  console.log('\\n📊 Test Summary');
  console.log('================');
  log(`Direct EspoCRM tests: ${passedTests}/${totalTests} passed`, 
      passedTests === totalTests ? 'success' : 'warning');
  log(`Website integration: ${websiteResult.success ? 'PASS' : 'FAIL'}`, 
      websiteResult.success ? 'success' : 'warning');
  
  if (passedTests === totalTests && websiteResult.success) {
    log('\\n🎉 All tests passed! Your EspoCRM integration is working perfectly!', 'success');
    console.log('\\nNext steps:');
    console.log('1. Set up automation workflows in EspoCRM');
    console.log('2. Configure dashboard widgets');
    console.log('3. Train your team on the new system');
    console.log('4. Go live and start capturing real leads!');
  } else {
    log('\\n⚠️  Some tests failed. Please review the errors above.', 'warning');
    console.log('\\nTroubleshooting:');
    console.log('1. Check ESPOCRM_QUICK_START.md for setup instructions');
    console.log('2. Verify all custom fields are added correctly');
    console.log('3. Ensure API user has proper permissions');
    console.log('4. Test website with: npm run dev');
  }
}

if (require.main === module) {
  runTestSuite().catch(error => {
    log(`Test suite failed: ${error.message}`, 'error');
    process.exit(1);
  });
}
