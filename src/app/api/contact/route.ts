import { NextRequest, NextResponse } from 'next/server';

interface ContactData {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  subject?: string;
  message: string;
  type: string;
}

// Mock email function - replace with SendGrid in production
async function sendEmail(data: ContactData) {
  // In production, you would use SendGrid here:
  // const sgMail = require('@sendgrid/mail');
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  
  console.log('📧 Email would be sent with data:', {
    to: 'info@quickfix-services.com',
    from: 'noreply@quickfix-services.com',
    subject: `New ${data.type} from ${data.name}`,
    text: `
      Name: ${data.name}
      Email: ${data.email}
      Phone: ${data.phone || 'Not provided'}
      Service: ${data.service || data.subject || 'General inquiry'}
      Message: ${data.message}
    `,
    html: `
      <h3>New ${data.type} Request</h3>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
      <p><strong>Service:</strong> ${data.service || data.subject || 'General inquiry'}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `
  });
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true };
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Basic validation
    if (!data.name || !data.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Send email
    await sendEmail(data);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Your message has been sent successfully!' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    
    return NextResponse.json(
      { 
        error: 'An error occurred while processing your request. Please try again or call us directly.' 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      message: 'Contact API is working',
      endpoints: {
        POST: 'Submit contact form or booking request'
      }
    },
    { status: 200 }
  );
}