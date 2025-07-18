import { NextResponse } from 'next/server';

export async function GET() {
  const documentation = {
    "🚀 QuickFix CRM API Documentation": {
      "📖 Overview": "Easy-to-read CRM API for leads and analytics",
      "🔗 Base URL": "http://localhost:3000/api/crm",
      
      "📊 Quick Access": {
        "Pretty Format": "/api/crm/leads?format=pretty",
        "New Leads Only": "/api/crm/leads?status=new&format=pretty", 
        "Analytics Summary": "/api/crm/leads?limit=0&format=pretty",
        "Documentation": "/api/crm/docs"
      },
      
      "🎯 Example Commands": {
        "View All Leads": "curl 'http://localhost:3000/api/crm/leads?format=pretty'",
        "Get New Leads": "curl 'http://localhost:3000/api/crm/leads?status=new&format=pretty'",
        "Create Lead": "curl -X POST '/api/crm/leads' -H 'Content-Type: application/json' -d '{\"name\":\"Test\",\"email\":\"test@example.com\",\"message\":\"Test\",\"type\":\"contact\"}'"
      }
    }
  };

  return NextResponse.json(documentation);
}