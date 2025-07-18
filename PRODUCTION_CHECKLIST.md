# 🚀 QuickFix CRM Production Deployment Checklist

## Pre-Deployment Requirements

### ✅ Server Setup
- [ ] VPS/Server with Ubuntu 20.04+ 
- [ ] Domain name pointed to server IP
- [ ] SSL certificate configured (Let's Encrypt)
- [ ] Node.js 18+ installed
- [ ] Nginx installed
- [ ] PM2 installed globally

### ✅ Environment Configuration
- [ ] Update `.env.production` with real values:
  - [ ] Strong admin password
  - [ ] SendGrid API key
  - [ ] Production domain URL
  - [ ] Session secret
- [ ] Database setup (if using external DB)
- [ ] Email service configuration

### ✅ Security Checklist
- [ ] Change default admin credentials
- [ ] Configure firewall (UFW)
- [ ] Set up fail2ban
- [ ] Review Nginx security headers
- [ ] Enable rate limiting
- [ ] Configure log rotation

## Deployment Steps

### 1. 📦 Prepare Application
```bash
# Build the application
npm run build

# Test production build locally
npm start
```

### 2. 🚀 Deploy to Production
```bash
# Run deployment script
./deploy.sh
```

### 3. 🔧 Post-Deployment Verification
```bash
# Check PM2 status
pm2 status

# Check application logs
pm2 logs quickfix-services

# Test health endpoint
curl https://charlotteservicehub.com/api/health

# Test CRM access
curl https://charlotteservicehub.com/admin/login
```

### 4. 🔐 Security Configuration
```bash
# Update admin password
nano /var/www/quickfix-services/.env.local

# Restart application
pm2 restart quickfix-services

# Check Nginx configuration
sudo nginx -t
sudo systemctl status nginx
```

### 5. 📊 Monitoring Setup
```bash
# Check PM2 monitoring
pm2 monit

# View logs
tail -f /var/www/quickfix-services/logs/combined.log

# Check health checks
tail -f /var/www/quickfix-services/logs/health.log
```

## Production URLs

- **🏠 Main Website**: https://charlotteservicehub.com
- **🔐 Admin Login**: https://charlotteservicehub.com/admin/login
- **📊 CRM Dashboard**: https://charlotteservicehub.com/crm
- **📋 API Documentation**: https://charlotteservicehub.com/api-docs
- **🏥 Health Check**: https://charlotteservicehub.com/api/health

## Default Credentials (CHANGE IMMEDIATELY)

- **Username**: admin
- **Password**: QuickFix2025!Production

## Monitoring & Maintenance

### Daily Checks
- [ ] Check PM2 status: `pm2 status`
- [ ] Review error logs: `pm2 logs quickfix-services --err`
- [ ] Health check: `curl https://charlotteservicehub.com/api/health`

### Weekly Maintenance
- [ ] Review application logs
- [ ] Check disk space: `df -h`
- [ ] Update packages: `npm audit`
- [ ] Backup data if using database

### Monthly Tasks
- [ ] Security updates: `sudo apt update && sudo apt upgrade`
- [ ] SSL certificate renewal (if manual)
- [ ] Performance review
- [ ] User access audit

## Troubleshooting

### Common Issues
1. **504 Gateway Timeout**
   - Check PM2: `pm2 status`
   - Restart app: `pm2 restart quickfix-services`

2. **500 Internal Server Error**
   - Check logs: `pm2 logs quickfix-services`
   - Verify environment variables

3. **Login Issues**
   - Verify admin credentials in `.env.local`
   - Check auth API: `curl -X POST https://domain.com/api/auth/login`

4. **SSL Issues**
   - Check certificate: `sudo certbot certificates`
   - Renew if needed: `sudo certbot renew`

### Emergency Contacts
- **Server Provider**: [Your VPS provider]
- **Domain Registrar**: [Your domain provider]
- **Development Team**: [Your team contact]

## Backup Strategy

### Automated Backups
- Application files: `/var/www/quickfix-services`
- Logs: `/var/www/quickfix-services/logs`
- Configuration: `.env.local`, `ecosystem.config.js`

### Manual Backup Commands
```bash
# Backup application
sudo tar -czf quickfix-backup-$(date +%Y%m%d).tar.gz /var/www/quickfix-services

# Backup database (if applicable)
# pg_dump or mysqldump commands here
```

## Performance Optimization

### Nginx Optimization
- Gzip compression enabled ✅
- Static file caching ✅
- Rate limiting configured ✅

### Application Optimization
- Production build optimized ✅
- Image optimization enabled ✅
- API response caching ready ✅

## Success Metrics

### Application Health
- [ ] Uptime > 99.5%
- [ ] Response time < 2 seconds
- [ ] Zero critical errors
- [ ] SSL grade A+

### Business Metrics
- [ ] Lead capture working
- [ ] CRM accessible to admins
- [ ] Email notifications sent
- [ ] Analytics tracking leads

---

🎉 **Production deployment completed successfully!**

Your QuickFix CRM is now live and ready to help grow your handyman and mobile mechanic business!
