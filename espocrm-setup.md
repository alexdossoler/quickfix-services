# EspoCRM Setup for QuickFix Services

## 🎯 Quick Setup (Choose Option A or B)

### Option A: EspoCRM Cloud (Easiest - 5 minutes)
1. Go to https://www.espocrm.com/cloud/
2. Sign up for trial: quickfix-services.espocrm.com  
3. Complete setup wizard
4. Create API user in Administration → API Users
5. Add to .env.local:
```
CRM_PROVIDER=espocrm
CRM_API_URL=https://quickfix-services.espocrm.com
CRM_USERNAME=quickfix-api
CRM_PASSWORD=your_api_password
```

### Option B: Self-Hosted DigitalOcean (Advanced - 30 minutes)
1. Create Ubuntu 22.04 droplet ($10/month)
2. Install LAMP stack + EspoCRM
3. Configure domain/SSL
4. Set up API access
5. Add to .env.local:
```
CRM_PROVIDER=espocrm
CRM_API_URL=https://your-domain.com
CRM_USERNAME=quickfix-api  
CRM_PASSWORD=your_api_password
```

## ⚙️ EspoCRM Configuration

### 1. Create API User
- Administration → API Users → Create
- Username: quickfix-api
- Generate strong password
- Is Active: Yes

### 2. Add Custom Fields for Leads
- Service Type (Dropdown): Plumbing, Electrical, Brakes, etc.
- Urgency Level (Dropdown): Normal, Same-day, Emergency
- Service Address (Text)
- Preferred Date (Date)
- Preferred Time (Text)
- Lead Score (Number 0-100)

## 🔧 Automation Setup

### 3. Lead Assignment Workflow
Create workflow in Administration → Workflows:
```
Name: QuickFix Lead Auto-Assignment
Target Entity: Lead
Trigger: After Record Created
Conditions: Source = website
Actions:
- Assign to Manager (User ID 1)
- Create follow-up task
- Send notification email
```

### 4. Emergency Lead Workflow
```
Name: Emergency Lead Priority
Target Entity: Lead
Trigger: After Record Created
Conditions: Urgency = emergency OR Lead Score >= 90
Actions:
- Send urgent email to manager
- Create immediate task
- Set high priority
```

### 5. Lead Scoring Formula
```
Name: Lead Score Calculation
Target Entity: Lead
Trigger: Before Record Saved
Formula:
$score = 0;
if (urgencyLevel == 'emergency') $score = $score + 40;
if (serviceType == 'electrical') $score = $score + 30;
if (!string\isEmpty(phoneNumber)) $score = $score + 15;
leadScore = $score;
```

## 📊 Dashboard Setup

### 6. Create Dashboard Widgets
- **Today's Leads**: List widget showing leads created today
- **High Priority**: Leads with score >= 80
- **Emergency Queue**: Urgent leads needing immediate attention
- **Conversion Chart**: Lead to opportunity conversion rates

## 🧪 Testing & Verification

### 7. Test the Integration
```bash
# Option 1: Use admin dashboard
# Visit http://localhost:3000/admin
# Use CRM Test Dashboard to send test leads

# Option 2: Use test script
npm run test-crm

# Option 3: Manual API test
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Customer",
    "email": "test@example.com",
    "phone": "704-555-0123",
    "service": "plumbing",
    "urgency": "emergency",
    "message": "Urgent plumbing repair needed",
    "type": "booking"
  }'
```

### 8. Verification Checklist
- [ ] Test lead appears in EspoCRM
- [ ] Custom fields populated correctly
- [ ] Lead score calculated automatically
- [ ] Assignment workflow triggered
- [ ] Follow-up task created
- [ ] Email notifications sent
- [ ] Dashboard widgets updated

## 🚀 Benefits of EspoCRM

✅ Open source - no vendor lock-in
✅ Complete lead management pipeline  
✅ Custom workflows & automation
✅ Advanced reporting & analytics
✅ Email integration & templates
✅ Calendar & task management
✅ Mobile app available
✅ Full API access for integrations

## 💰 Cost Comparison
- **Cloud**: $25/month (managed)
- **Self-hosted**: $10/month (DigitalOcean)
- **Features**: Full CRM, unlimited contacts, workflows

## 🆘 Troubleshooting

### Common Issues:
1. **401 Unauthorized**: Check API credentials
2. **Custom fields not saving**: Verify field names match code
3. **Leads not appearing**: Check assignment rules
4. **Workflows not triggering**: Verify conditions and user permissions

### Support Resources:
- EspoCRM Documentation: https://docs.espocrm.com/
- Community Forum: https://forum.espocrm.com/
- API Docs: https://docs.espocrm.com/development/api/

Your leads will automatically flow from website → EspoCRM with smart scoring and automation! 🎉
