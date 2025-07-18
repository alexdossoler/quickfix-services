import { Lead, CRMConfig } from './crm-types';

// Lead scoring algorithm
export function calculateLeadScore(lead: Lead): number {
  let score = 0;
  
  // Service type scoring
  if (lead.service) {
    const highValueServices = ['emergency', 'brakes', 'electrical', 'plumbing'];
    if (highValueServices.includes(lead.service)) score += 30;
    else score += 15;
  }
  
  // Urgency scoring
  if (lead.urgency === 'emergency') score += 40;
  else if (lead.urgency === 'same-day') score += 25;
  else score += 10;
  
  // Contact info completeness
  if (lead.phone) score += 15;
  if (lead.email) score += 10;
  if (lead.address) score += 20;
  
  return Math.min(score, 100);
}

// Process lead data
export function processLead(data: Record<string, unknown>, source: string = 'website'): Lead {
  const lead: Lead = {
    name: String(data.name || ''),
    email: String(data.email || ''),
    phone: data.phone ? String(data.phone) : undefined,
    service: data.service ? String(data.service) : undefined,
    message: String(data.message || ''),
    type: data.type === 'booking' ? 'booking' : 'contact',
    address: data.address ? String(data.address) : undefined,
    preferredDate: data.preferredDate ? String(data.preferredDate) : undefined,
    preferredTime: data.preferredTime ? String(data.preferredTime) : undefined,
    urgency: (data.urgency === 'emergency' || data.urgency === 'same-day') ? data.urgency as 'emergency' | 'same-day' : 'normal',
    source,
    status: 'new',
    createdAt: new Date().toISOString()
  };
  
  lead.leadScore = calculateLeadScore(lead);
  return lead;
}

// Airtable Integration
export async function sendToAirtable(lead: Lead, config: CRMConfig): Promise<boolean> {
  try {
    const recordData = {
      records: [{
        fields: {
          'Name': lead.name,
          'Email': lead.email,
          'Phone': lead.phone || '',
          'Service': lead.service || '',
          'Message': lead.message,
          'Type': lead.type,
          'Address': lead.address || '',
          'Preferred Date': lead.preferredDate || '',
          'Preferred Time': lead.preferredTime || '',
          'Urgency': lead.urgency,
          'Source': lead.source,
          'Status': 'New',
          'Lead Score': lead.leadScore,
          'Created': lead.createdAt
        }
      }]
    };
    
    const response = await fetch(`${config.apiUrl}/v0/${config.database}/Leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`
      },
      body: JSON.stringify(recordData)
    });
    
    return response.ok;
  } catch (error) {
    console.error('Airtable integration error:', error);
    return false;
  }
}

// HubSpot Integration
export async function sendToHubSpot(lead: Lead, config: CRMConfig): Promise<boolean> {
  try {
    const contactData = {
      properties: {
        firstname: lead.name.split(' ')[0],
        lastname: lead.name.split(' ').slice(1).join(' ') || lead.name,
        email: lead.email,
        phone: lead.phone,
        hs_lead_status: 'NEW',
        lifecyclestage: 'lead',
        service_type: lead.service,
        urgency_level: lead.urgency,
        lead_source: lead.source
      }
    };
    
    const response = await fetch(`${config.apiUrl}/crm/v3/objects/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`
      },
      body: JSON.stringify(contactData)
    });
    
    return response.ok;
  } catch (error) {
    console.error('HubSpot integration error:', error);
    return false;
  }
}

// EspoCRM Integration
export async function sendToEspoCRM(lead: Lead, config: CRMConfig): Promise<boolean> {
  try {
    const auth = Buffer.from(`${config.username}:${config.password}`).toString('base64');
    
    const leadData = {
      name: lead.name,
      emailAddress: lead.email,
      phoneNumber: lead.phone || '',
      description: lead.message,
      source: lead.source,
      status: 'New',
      assignedUserId: '1', // Default admin user
      // Custom fields for QuickFix Services
      serviceType: lead.service || '',
      urgencyLevel: lead.urgency || 'normal',
      preferredDate: lead.preferredDate || '',
      preferredTime: lead.preferredTime || '',
      serviceAddress: lead.address || '',
      leadScore: lead.leadScore || 0,
      leadType: lead.type,
      createdAt: lead.createdAt
    };
    
    const response = await fetch(`${config.apiUrl}/api/v1/Lead`, {
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
      console.log('✅ EspoCRM lead created:', result.id);
      return true;
    } else {
      const error = await response.text();
      console.error('❌ EspoCRM error:', response.status, error);
      return false;
    }
  } catch (error) {
    console.error('EspoCRM integration error:', error);
    return false;
  }
}

// Main CRM sender
export async function sendToCRM(lead: Lead, config: CRMConfig): Promise<boolean> {
  console.log(`📊 Sending lead to ${config.provider.toUpperCase()}:`, {
    name: lead.name,
    email: lead.email,
    service: lead.service,
    score: lead.leadScore
  });
  
  switch (config.provider) {
    case 'airtable':
      return await sendToAirtable(lead, config);
    case 'hubspot':
      return await sendToHubSpot(lead, config);
    case 'espocrm':
      return await sendToEspoCRM(lead, config);
    default:
      console.error('Unknown CRM provider:', config.provider);
      return false;
  }
}