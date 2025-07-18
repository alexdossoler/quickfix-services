# Production HTTPS Setup Guide

## QuickFix CRM - HTTPS Domain Setup

Your QuickFix CRM is now ready for production HTTPS deployment at charlotteservicehub.com.

### Current Status

- Application Running: Port 3001 with PM2
- Nginx Configured: Ready for domain and SSL  
- Certbot Installed: Ready for Let's Encrypt
- Environment Updated: Canonical URL configured

### Required DNS Updates

Update your DNS records to point to the server:

| Record | Type | Name | Value | TTL |
|--------|------|------|-------|-----|
| A | @ | charlotteservicehub.com | 167.71.163.98 | 5 min |
| A | @ | www.charlotteservicehub.com | 167.71.163.98 | 5 min |

### Steps to Complete HTTPS Setup

1. Wait for DNS Propagation
   Check: dig +short charlotteservicehub.com
   Should return: 167.71.163.98

2. Run SSL Setup Script
   ssh root@167.71.163.98
   /root/setup-ssl.sh

3. Verify HTTPS Setup
   curl -I https://charlotteservicehub.com/api/health

### Final URLs

- Main Site: https://charlotteservicehub.com
- Admin Login: https://charlotteservicehub.com/admin/login
- CRM Dashboard: https://charlotteservicehub.com/crm
- Health Check: https://charlotteservicehub.com/api/health

### Admin Credentials

Username: admin
Password: QuickFix2025!Production

Your QuickFix CRM is production-ready!
