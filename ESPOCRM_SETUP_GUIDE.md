# 🎯 EspoCRM Setup Guide for QuickFix Services

## What is EspoCRM?
EspoCRM is a powerful open-source CRM that gives you complete control over your lead management. Perfect for businesses that want advanced features without monthly fees.

## 🚀 Quick Setup Options

### Option 1: Cloud Hosting (Recommended for Beginners)
**Providers:**
- EspoCRM Cloud: $25/month (official hosting)
- DigitalOcean: $10-20/month (self-hosted)
- Vultr: $6-12/month (self-hosted)

### Option 2: Self-Hosted (Advanced Users)
**Requirements:**
- PHP 8.0+
- MySQL 5.7+ or MariaDB
- Web server (Apache/Nginx)

## 📋 Step-by-Step Installation

### Method A: EspoCRM Cloud (5 minutes)
1. Go to [espocrm.com/cloud](https://www.espocrm.com/cloud/)
2. Sign up for a trial account
3. Choose your subdomain: `quickfix-services.espocrm.com`
4. Complete the setup wizard
5. Skip to "Configuration" section below

### Method B: DigitalOcean Droplet (15 minutes)
1. **Create Droplet:**
   ```bash
   # Choose Ubuntu 22.04 LTS
   # $10/month basic droplet is sufficient
   ```

2. **Install EspoCRM:**
   ```bash
   # SSH into your droplet
   ssh root@your-droplet-ip

   # Install dependencies
   apt update && apt upgrade -y
   apt install apache2 mysql-server php8.1 php8.1-mysql php8.1-curl php8.1-zip php8.1-gd php8.1-xml php8.1-mbstring unzip curl -y

   # Download EspoCRM
   cd /var/www/html
   wget https://github.com/espocrm/espocrm/releases/latest/download/EspoCRM.zip
   unzip EspoCRM.zip
   chown -R www-data:www-data /var/www/html
   chmod -R 755 /var/www/html

   # Setup MySQL
   mysql_secure_installation
   mysql -u root -p
   CREATE DATABASE espocrm;
   CREATE USER 'espocrmuser'@'localhost' IDENTIFIED BY 'your_strong_password';
   GRANT ALL PRIVILEGES ON espocrm.* TO 'espocrmuser'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;

   # Configure Apache
   systemctl enable apache2
   systemctl start apache2
   ```

3. **Complete Web Setup:**
   - Visit `http://your-droplet-ip`
   - Follow the installation wizard
   - Use database credentials from step 2

## ⚙️ EspoCRM Configuration

### 1. Enable API Access
1. Login as Administrator
2. Go to **Administration → API Users**
3. Create new API user:
   - **Username:** `quickfix-api`
   - **Password:** Generate strong password
   - **API Key:** Generate or note the key
   - **Is Active:** Yes
   - **Teams:** Default team

### 2. Configure Lead Entity
1. Go to **Administration → Entity Manager**
2. Select **Lead** entity
3. Add custom fields for QuickFix Services:

**Custom Fields to Add:**
```
Service Type (Enum):
- Plumbing
- Electrical  
- Carpentry
- Painting
- Battery
- Brakes
- Oil Change
- Diagnostics
- Tires
- Emergency

Urgency Level (Enum):
- Normal
- Same-day
- Emergency

Service Address (Text)
Preferred Date (Date)
Preferred Time (Varchar)
Lead Score (Int, 0-100)
Lead Type (Enum): Booking, Contact
```

### 3. Setup Lead Stages
1. Go to **Administration → Entity Manager → Lead**
2. Click **Fields** → **Status**
3. Configure stages:
   - **New** (default)
   - **Contacted**
   - **Qualified** 
   - **Closed Won**
   - **Closed Lost**

### 4. Create Assignment Rules
1. Go to **Administration → Assignment Rules**
2. Create rule for **Lead** entity:
   - **Condition:** Service Type = Emergency
   - **Assign to:** Your top technician
   - **Email notification:** Yes

## 🔧 Website Integration

### 1. Environment Configuration
Create `.env.local` file with:
```bash
# EspoCRM Configuration
CRM_PROVIDER=espocrm
CRM_API_URL=https://your-espocrm-domain.com
CRM_USERNAME=quickfix-api
CRM_PASSWORD=your_api_user_password
```

### 2. Test the Integration
```bash
# Test API connection
curl -X GET "https://your-espocrm-domain.com/api/v1/Lead" \
  -H "Authorization: Basic $(echo -n 'quickfix-api:your_password' | base64)"
```

### 3. Test Lead Creation
Submit a test booking through your website and check:
1. EspoCRM **Leads** section for new entry
2. Server logs for success/error messages
3. Lead scoring is calculated correctly

## 📊 EspoCRM Features for QuickFix

### Dashboard Setup
1. **Sales Dashboard:**
   - New Leads Today
   - Lead Conversion Rate
   - High-Score Leads (80+)
   - Service Type Breakdown

2. **Service Dashboard:**
   - Emergency Requests
   - Scheduled Services
   - Geographic Distribution
   - Technician Assignments

### Workflow Automation
1. **Auto-Assignment:**
   - Emergency → Senior Technician
   - Brakes/Electrical → Certified Tech
   - Location-based assignment

2. **Follow-up Sequences:**
   - New Lead → Call within 1 hour
   - No Answer → Text message
   - Qualified → Send estimate

### Reports & Analytics
1. **Lead Source Analysis**
2. **Service Type Performance** 
3. **Conversion Rates by Urgency**
4. **Geographic Heat Maps**
5. **Technician Performance**

## 🎯 Best Practices

### Lead Management Workflow
```
New Lead (Auto-created from website)
    ↓
Check Lead Score (80+ = Priority)
    ↓
Contact within SLA (Emergency: 1hr, Normal: 24hr)
    ↓
Update Status → Contacted
    ↓
Qualify & Schedule → Qualified
    ↓
Complete Service → Closed Won
```

### Daily Operations
1. **Morning Review:** Check new leads from overnight
2. **Priority Handling:** Contact 80+ score leads first  
3. **Status Updates:** Keep lead stages current
4. **Follow-ups:** Use EspoCRM reminders

## 💰 Cost Breakdown

### Cloud Options:
- **EspoCRM Cloud:** $25/month (managed)
- **DigitalOcean:** $10/month + domain
- **Vultr:** $6/month + domain

### Features Comparison:
| Feature | Cloud | Self-Hosted |
|---------|-------|-------------|
| Setup Time | 5 min | 2-4 hours |
| Maintenance | None | You manage |
| Customization | Standard | Full control |
| Integrations | Standard | Unlimited |
| Cost | $25/month | $6-10/month |

## 🆘 Troubleshooting

### Common Issues:
1. **API Authentication Failed**
   - Check username/password in .env.local
   - Verify API user is active in EspoCRM

2. **Leads Not Appearing**
   - Check server logs for error messages
   - Verify Lead entity permissions

3. **Custom Fields Missing**
   - Ensure custom fields are created in Entity Manager
   - Check field API names match code

4. **Low Performance**
   - Enable caching in EspoCRM
   - Optimize database queries
   - Consider upgrading server resources

### Support Resources:
- [EspoCRM Documentation](https://docs.espocrm.com/)
- [Community Forum](https://forum.espocrm.com/)
- [API Documentation](https://docs.espocrm.com/development/api/)

## 🚀 Go Live Checklist

- [ ] EspoCRM installed and configured
- [ ] API user created with proper permissions
- [ ] Custom fields added for QuickFix services
- [ ] Environment variables configured
- [ ] Test lead submitted successfully
- [ ] Dashboard configured for daily use
- [ ] Team trained on lead management workflow
- [ ] Backup procedures established

Your EspoCRM integration is now ready to capture and manage all leads from your QuickFix Services website! 🎯
