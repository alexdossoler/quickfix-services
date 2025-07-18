import { NextRequest, NextResponse } from 'next/server';
import { validateSession } from '@/lib/auth';

// Auth middleware
function requireAuth(request: NextRequest) {
  const sessionToken = request.cookies.get('admin-session')?.value;
  const session = validateSession(sessionToken);
  
  if (!session.isAuthenticated) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }
  
  return null;
}

// Mock data for development
const mockLeads = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '704-555-0123',
    service: 'plumbing',
    message: 'Kitchen faucet is leaking and needs repair urgently',
    type: 'booking',
    address: '123 Main St, Charlotte, NC 28202',
    preferredDate: '2025-01-20',
    preferredTime: '10:00 AM',
    urgency: 'same-day',
    source: 'website',
    status: 'new',
    createdAt: '2025-01-15T10:30:00Z',
    leadScore: 85,
    estimatedValue: 250
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@email.com',
    phone: '704-555-0456',
    service: 'electrical',
    message: 'Need to install new ceiling fan in living room',
    type: 'booking',
    address: '456 Oak Ave, Charlotte, NC 28203',
    preferredDate: '2025-01-22',
    preferredTime: '2:00 PM',
    urgency: 'normal',
    source: 'google-ads',
    status: 'contacted',
    createdAt: '2025-01-14T14:15:00Z',
    leadScore: 70,
    estimatedValue: 180
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'mbrown@company.com',
    phone: '704-555-0789',
    service: 'hvac',
    message: 'AC unit not cooling properly, needs inspection',
    type: 'booking',
    address: '789 Pine St, Charlotte, NC 28204',
    preferredDate: '2025-01-25',
    preferredTime: '9:00 AM',
    urgency: 'emergency',
    source: 'referral',
    status: 'qualified',
    createdAt: '2025-01-13T09:45:00Z',
    leadScore: 95,
    estimatedValue: 450
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@gmail.com',
    phone: '704-555-0321',
    service: 'carpentry',
    message: 'Looking for custom shelving installation in home office',
    type: 'contact',
    address: '321 Elm Dr, Charlotte, NC 28205',
    urgency: 'normal',
    source: 'social-media',
    status: 'proposal',
    createdAt: '2025-01-12T16:20:00Z',
    leadScore: 60,
    estimatedValue: 320
  },
  {
    id: '5',
    name: 'David Miller',
    email: 'david.miller@outlook.com',
    phone: '704-555-0654',
    service: 'auto-repair',
    message: 'Car making strange noise when braking, mobile service needed',
    type: 'booking',
    address: '654 Maple Rd, Charlotte, NC 28206',
    preferredDate: '2025-01-21',
    preferredTime: '11:00 AM',
    urgency: 'same-day',
    source: 'website',
    status: 'negotiation',
    createdAt: '2025-01-11T11:10:00Z',
    leadScore: 80,
    estimatedValue: 150
  },
  {
    id: '6',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@yahoo.com',
    phone: '704-555-0987',
    service: 'painting',
    message: 'Need exterior house painting, 2-story home',
    type: 'contact',
    address: '987 Cedar St, Charlotte, NC 28207',
    urgency: 'normal',
    source: 'google-ads',
    status: 'closed-won',
    createdAt: '2025-01-10T13:30:00Z',
    leadScore: 75,
    estimatedValue: 1200
  },
  {
    id: '7',
    name: 'Robert Johnson',
    email: 'rob.johnson@email.com',
    phone: '704-555-1111',
    service: 'appliance-repair',
    message: 'Washing machine not draining water properly',
    type: 'booking',
    address: '111 Birch Lane, Charlotte, NC 28208',
    preferredDate: '2025-01-23',
    preferredTime: '3:00 PM',
    urgency: 'normal',
    source: 'referral',
    status: 'new',
    createdAt: '2025-01-16T08:20:00Z',
    leadScore: 65,
    estimatedValue: 120
  },
  {
    id: '8',
    name: 'Jennifer Lee',
    email: 'jen.lee@company.net',
    phone: '704-555-2222',
    service: 'landscaping',
    message: 'Need help with garden cleanup and mulch installation',
    type: 'contact',
    address: '222 Spruce Dr, Charlotte, NC 28209',
    urgency: 'normal',
    source: 'website',
    status: 'contacted',
    createdAt: '2025-01-15T15:45:00Z',
    leadScore: 55,
    estimatedValue: 200
  }
];

export async function GET(request: NextRequest) {
  // Check authentication
  const authError = requireAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    
    // Filter leads based on query parameters
    let filteredLeads = [...mockLeads];
    
    if (status && status !== 'all') {
      filteredLeads = filteredLeads.filter(lead => lead.status === status);
    }
    
    // Apply limit
    if (limit > 0) {
      filteredLeads = filteredLeads.slice(0, limit);
    }
    
    // Calculate comprehensive analytics
    const analytics = {
      totalLeads: mockLeads.length,
      newLeads: mockLeads.filter(l => l.status === 'new').length,
      contactedLeads: mockLeads.filter(l => l.status === 'contacted').length,
      qualifiedLeads: mockLeads.filter(l => l.status === 'qualified').length,
      wonLeads: mockLeads.filter(l => l.status === 'closed-won').length,
      lostLeads: mockLeads.filter(l => l.status === 'closed-lost').length,
      conversionRate: mockLeads.length > 0 ? 
        ((mockLeads.filter(l => l.status === 'closed-won').length / mockLeads.length) * 100).toFixed(1) + '%' : '0%',
      totalValue: mockLeads.reduce((sum, lead) => sum + (lead.estimatedValue || 0), 0),
      avgLeadScore: mockLeads.length > 0 ? 
        (mockLeads.reduce((sum, lead) => sum + (lead.leadScore || 0), 0) / mockLeads.length).toFixed(1) : '0'
    };
    
    // Service breakdown
    const serviceBreakdown = mockLeads.reduce((acc, lead) => {
      const service = lead.service || 'other';
      acc[service] = (acc[service] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Lead sources
    const leadSources = mockLeads.reduce((acc, lead) => {
      const source = lead.source || 'unknown';
      acc[source] = (acc[source] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Pretty format for easy reading
    if (format === 'pretty') {
      return new Response(
        JSON.stringify({
          "📊 CRM Dashboard Summary": {
            "🎯 Quick Stats": {
              "Total Leads": analytics.totalLeads,
              "New Leads": analytics.newLeads,
              "Conversion Rate": analytics.conversionRate,
              "Pipeline Value": `$${analytics.totalValue.toLocaleString()}`,
              "Average Lead Score": analytics.avgLeadScore
            },
            "📈 Pipeline Breakdown": {
              "New": analytics.newLeads,
              "Contacted": analytics.contactedLeads,
              "Qualified": analytics.qualifiedLeads,
              "Won": analytics.wonLeads,
              "Lost": analytics.lostLeads
            },
            "🔧 Services": serviceBreakdown,
            "📍 Lead Sources": leadSources
          },
          "👥 Recent Leads": filteredLeads.map(lead => ({
            "Name": lead.name,
            "Email": lead.email,
            "Phone": lead.phone || 'N/A',
            "Service": lead.service || 'N/A',
            "Status": lead.status,
            "Urgency": lead.urgency || 'normal',
            "Lead Score": lead.leadScore || 0,
            "Estimated Value": lead.estimatedValue ? `$${lead.estimatedValue}` : 'N/A',
            "Created": new Date(lead.createdAt).toLocaleDateString(),
            "Message": lead.message.substring(0, 100) + (lead.message.length > 100 ? '...' : '')
          }))
        }, null, 2),
        {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
          }
        }
      );
    }
    
    // Standard API response
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      meta: {
        total: filteredLeads.length,
        limit: limit,
        hasMore: filteredLeads.length < mockLeads.length,
        filters: { status, limit }
      },
      analytics,
      serviceBreakdown,
      leadSources,
      leads: filteredLeads
    });
    
  } catch {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch leads',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Check authentication
  const authError = requireAuth(request);
  if (authError) return authError;

  try {
    const leadData = await request.json();
    
    // Validate required fields
    if (!leadData.name || !leadData.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Generate new lead
    const newLead = {
      id: (mockLeads.length + 1).toString(),
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone || '',
      service: leadData.service || 'other',
      message: leadData.message || '',
      type: leadData.type || 'contact',
      address: leadData.address || '',
      preferredDate: leadData.preferredDate || '',
      preferredTime: leadData.preferredTime || '',
      urgency: leadData.urgency || 'normal',
      source: 'api',
      status: 'new',
      createdAt: new Date().toISOString(),
      leadScore: Math.floor(Math.random() * 40) + 60, // 60-100
      estimatedValue: leadData.estimatedValue || 0
    };

    // In a real app, save to database
    mockLeads.push(newLead);

    return NextResponse.json({
      success: true,
      message: 'Lead created successfully',
      lead: newLead,
      timestamp: new Date().toISOString()
    });

  } catch (err) {
    console.error('Error creating lead:', err);
    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
    );
  }
}