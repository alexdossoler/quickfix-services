export interface Lead {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  type: 'booking' | 'contact';
  address?: string;
  preferredDate?: string;
  preferredTime?: string;
  urgency?: 'normal' | 'same-day' | 'emergency';
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
  createdAt: string;
  leadScore?: number;
}

export interface CRMConfig {
  provider: 'airtable' | 'hubspot' | 'pipedrive' | 'espocrm' | 'suitecrm' | 'odoo';
  apiUrl: string;
  apiKey: string;
  database?: string;
  username?: string;
  password?: string;
}

export interface EspoCRMCustomFields {
  serviceType: string;
  urgencyLevel: string;
  serviceAddress: string;
  preferredDate: string;
  preferredTime: string;
  leadScore: number;
  leadType: string;
}

export interface CRMTestResult {
  success: boolean;
  message: string;
  details?: {
    apiUrl?: string;
    username?: string;
    status?: number;
    leadCount?: number;
    leadId?: string;
    error?: string;
  };
}

export interface TestScenario {
  name: string;
  description: string;
  testData: Partial<Lead>;
  expectedResult: 'success' | 'failure';
  checkPoints: string[];
}

export interface APITestSuite {
  connectionTest: {
    endpoint: string;
    method: 'GET' | 'POST';
    expectedStatus: number;
  };
  leadCreationTest: {
    endpoint: string;
    method: 'POST';
    testData: Lead;
    expectedFields: string[];
  };
  errorHandlingTest: {
    scenarios: TestScenario[];
  };
}

export interface CRMValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
  testResults: {
    connection: boolean;
    authentication: boolean;
    customFields: boolean;
    leadCreation: boolean;
  };
}