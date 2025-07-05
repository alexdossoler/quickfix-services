import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

interface ContactData {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  subject?: string;
  message: string;
  type: string;
  address?: string;
  preferredDate?: string;
  preferredTime?: string;
  urgency?: string;
}

// Real SendGrid email function
async function sendEmail(data: ContactData) {
  const apiKey = process.env.SENDGRID_API_KEY;
  
  // If no API key or test key, log to console instead
  if (!apiKey || apiKey === 'test_key_console_only') {
    console.log('📧 BOOKING NOTIFICATION (Console Mode):', {
      type: data.type === 'booking' ? 'BOOKING REQUEST' : 'CONTACT FORM',
      name: data.name,
      phone: data.phone,
      email: data.email,
      service: data.service,
      address: data.address,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      urgency: data.urgency,
      message: data.message
    });
    return { success: true };
  }

  // Real SendGrid email
  sgMail.setApiKey(apiKey);
  const toEmail = 'info@quick-fix-handyman.com';
  const subject = `New ${data.type === 'booking' ? 'Booking' : 'Contact'} from ${data.name}`;
  const html = `
    <h2>🛠️ QuickFix Services - New ${data.type === 'booking' ? 'Booking Request' : 'Contact Form'}</h2>
    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; font-family: Arial, sans-serif;">
      <h3 style="color: #2563eb; margin-top: 0;">Customer Information</h3>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
      <p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone || 'Not provided'}</a></p>
      
      <h3 style="color: #2563eb;">Service Details</h3>
      <p><strong>Service Requested:</strong> ${data.service || data.subject || 'General inquiry'}</p>
      ${data.address ? `<p><strong>Service Address:</strong> ${data.address}</p>` : ''}
      ${data.preferredDate ? `<p><strong>Preferred Date:</strong> ${data.preferredDate}</p>` : ''}
      ${data.preferredTime ? `<p><strong>Preferred Time:</strong> ${data.preferredTime}</p>` : ''}
      ${data.urgency ? `<p><strong>Urgency Level:</strong> <span style="color: ${data.urgency === 'emergency' ? '#dc2626' : data.urgency === 'same-day' ? '#f59e0b' : '#16a34a'};">${data.urgency.charAt(0).toUpperCase() + data.urgency.slice(1)}</span></p>` : ''}
      
      ${data.message ? `<h3 style="color: #2563eb;">Customer Message</h3><p style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #2563eb;">${data.message}</p>` : ''}
      
      <hr style="margin: 20px 0;">
      <p style="color: #6b7280; font-size: 14px;">
        <strong>Next Steps:</strong><br>
        1. Contact customer within 2 hours<br>
        2. Confirm availability for requested date/time<br>
        3. Provide free estimate<br>
        4. Schedule the service
      </p>
    </div>
  `;
  
  const msg = {
    to: toEmail,
    from: 'noreply@charlotteservicehub.com',
    subject,
    html,
  };
  
  await sgMail.send(msg);
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