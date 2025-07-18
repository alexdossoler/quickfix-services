# 🚀 Manual Deployment to 167.71.163.98

## Step 1: Build and Package Locally
```bash
# Build the application
npm run build

# Create deployment package
tar --exclude='node_modules' --exclude='.git' -czf quickfix-deploy.tar.gz .
```

## Step 2: Upload to Server
```bash
# Upload the package
scp quickfix-deploy.tar.gz root@167.71.163.98:/tmp/
```

## Step 3: Connect to Server and Set Up
```bash
# Connect to server
ssh root@167.71.163.98

# Update system
apt-get update

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Install PM2 and Nginx
npm install -g pm2
apt-get install -y nginx

# Create app directory
mkdir -p /var/www/quickfix-services
cd /var/www/quickfix-services

# Extract and install
tar -xzf /tmp/quickfix-deploy.tar.gz
npm ci --only=production
cp .env.production .env.local
```

## Step 4: Start Application
```bash
# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## Step 5: Configure Nginx
```bash
# Create Nginx config
cat > /etc/nginx/sites-available/quickfix << 'NGINX_EOF'
server {
    listen 80;
    server_name 167.71.163.98;
    
    location / {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
NGINX_EOF

# Enable site
ln -sf /etc/nginx/sites-available/quickfix /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
```

## Step 6: Configure Firewall
```bash
ufw allow 22
ufw allow 80
ufw allow 443
ufw --force enable
```

## Step 7: Verify Deployment
```bash
# Check status
pm2 status
curl http://167.71.163.98/api/health
```

## Access Your CRM
- **Main Site**: http://167.71.163.98
- **Admin Login**: http://167.71.163.98/admin/login
- **CRM Dashboard**: http://167.71.163.98/crm

**Credentials**: admin / QuickFix2025!Production
