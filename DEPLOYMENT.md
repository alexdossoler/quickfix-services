# QuickFix Services Deployment

## Setup on Droplet

1. Run: `chmod +x setup-droplet.sh && ./setup-droplet.sh`
2. Copy nginx config: `sudo cp nginx-subdomain.conf /etc/nginx/sites-available/`
3. Enable site and reload nginx
4. Set GitHub secrets in repository settings

## GitHub Secrets Required

- DEPLOY_HOST: your_droplet_ip
- DEPLOY_USER: your_username  
- DEPLOY_KEY: your_ssh_private_key
- DEPLOY_PATH: /var/www/quickfix-services

## Access

- Subdomain: quickfix.yourdomain.com
- App runs on port 3001 internally
