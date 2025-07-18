# 🎯 EspoCRM Quick Start Guide for QuickFix Services

## 🚀 Choose Your Setup Path

### Option A: EspoCRM Cloud (Recommended - 5 minutes)
```bash
# 1. Visit https://www.espocrm.com/cloud/
# 2. Sign up for trial
# 3. Choose: quickfix-services.espocrm.com
# 4. Complete wizard
# 5. Note your login details
```

### Option B: Self-Hosted (Advanced - 30 minutes)
```bash
# DigitalOcean Droplet Setup
# 1. Create Ubuntu 22.04 droplet ($10/month)
# 2. Install LAMP stack
# 3. Download EspoCRM
# 4. Configure domain/SSL
```

## ⚙️ Step-by-Step Configuration

### Step 1: Create API User (2 minutes)
1. Login to your EspoCRM instance
2. Go to **Administration** → **API Users**
3. Click **Create API User**
4. Fill in:
   ```
   Username: quickfix-api
   First Name: QuickFix
   Last Name: API
   Is Active: ✓ Yes
   Authentication Method: Basic
   ```
5. **Save** and copy the generated password

### Step 2: Add Custom Fields (5 minutes)
Go to **Administration** → **Entity Manager** → **Lead** → **Fields**

Add these 7 fields:

#### 1. Service Type
```
Field Name: serviceType
Type: Enum
Options (one per line):
plumbing
electrical
brakes
oil-change
general
heating-cooling
emergency
```

#### 2. Urgency Level
```
Field Name: urgencyLevel
Type: Enum
Options:
normal
same-day
emergency
Default: normal
```

#### 3. Service Address
```
Field Name: serviceAddress
Type: Text
Max Length: 255
```

#### 4. Preferred Date
```
Field Name: preferredDate
Type: Date
```

#### 5. Preferred Time
```
Field Name: preferredTime
Type: Varchar
Max Length: 50
```

#### 6. Lead Score
```
Field Name: leadScore
Type: Int
Min: 0
Max: 100
Default: 0
```

#### 7. Lead Type
```
Field Name: leadType
Type: Enum
Options:
booking
contact
Default: contact
```

### Step 3: Configure Layout (2 minutes)
1. Go to **Administration** → **Layout Manager**
2. Click **Lead** → **Detail**
3. Drag custom fields to layout sections
4. **Save** layout

### Step 4: Update Website Config (1 minute)
Add to your `.env.local` file:
```bash
CRM_PROVIDER=espocrm
CRM_API_URL=https://your-espocrm-instance.com
CRM_USERNAME=quickfix-api
CRM_PASSWORD=your_generated_password
```

### Step 5: Test Integration (2 minutes)
```bash
# Option 1: Use admin dashboard
npm run dev
# Visit http://localhost:3000/admin
# Send test lead

# Option 2: Use test script
npm run test-crm
```

## 🔧 Automation Setup (Optional - 10 minutes)

### Auto-Assignment Workflow
1. **Administration** → **Workflows** → **Create Workflow**
2. **Target Entity**: Lead
3. **Trigger**: After Record Created
4. **Conditions**: Source equals "website"
5. **Actions**: 
   - Assign to User (select manager)
   - Create Task (follow-up reminder)

### Emergency Alert Workflow
1. **Create Workflow**
2. **Target Entity**: Lead
3. **Conditions**: Urgency Level equals "emergency"
4. **Actions**: Send email notification

## 📊 Dashboard Widgets

### Today's Leads Widget
1. Go to **Home** dashboard
2. **Add Widget** → **List**
3. **Entity**: Lead
4. **Filter**: Created Today
5. **Fields**: Name, Service Type, Urgency, Score

### High Priority Leads
1. **Add Widget** → **List**
2. **Filter**: Lead Score >= 80 AND Status = New
3. **Fields**: Name, Phone, Service, Urgency

## 🧪 Testing Checklist

- [ ] EspoCRM instance accessible
- [ ] API user created and active
- [ ] All 7 custom fields added
- [ ] Layout configured
- [ ] Website .env.local updated
- [ ] Test lead created successfully
- [ ] Custom fields populated in EspoCRM
- [ ] Auto-assignment working (if configured)
- [ ] Dashboard widgets showing data

## 🚀 Go Live!

Once testing is complete:
1. **Announce to team**: New CRM system is live
2. **Monitor first day**: Check all leads are captured
3. **Train team**: Show how to use EspoCRM interface
4. **Optimize**: Adjust workflows based on usage

## 💡 Pro Tips

### Lead Scoring Formula
The system automatically calculates scores:
- Emergency service: +40 points
- Electrical/Plumbing: +30 points  
- Has phone number: +15 points
- Has address: +20 points
- Same-day urgency: +25 points

### Quick Actions
- **High-score leads** (80+): Call within 15 minutes
- **Emergency requests**: Immediate response required
- **Normal leads**: Follow up within 2 hours
- **Contact forms**: Respond within 4 hours

### Performance Tracking
Monitor these metrics:
- Response time to new leads
- Lead-to-customer conversion rate
- Average lead score trends
- Service type distribution

## 🆘 Troubleshooting

### Common Issues:
1. **401 Unauthorized**: Check API credentials
2. **Custom fields not saving**: Verify field names exactly match
3. **Leads not appearing**: Check assignment rules
4. **Workflows not triggering**: Verify conditions and permissions

### Get Help:
- **EspoCRM Docs**: https://docs.espocrm.com/
- **Community Forum**: https://forum.espocrm.com/
- **Admin Dashboard**: http://localhost:3000/admin (for testing)

Your QuickFix Services lead management is now fully automated! 🎉