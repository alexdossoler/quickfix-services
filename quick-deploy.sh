#!/bin/bash
# Quick deployment without local build

set -e

SERVER_IP="167.71.163.98"
SERVER_USER="root"
APP_NAME="quickfix-services"
APP_PATH="/var/www/quickfix-services"

echo "🚀 Quick deploying QuickFix CRM to $SERVER_IP..."

# Create deployment package (without building locally)
echo "📦 Creating deployment package..."
rm -f quickfix-deploy.tar.gz
tar --exclude='node_modules' --exclude='.git' --exclude='*.tar.gz' --exclude='.next' -czf quickfix-deploy.tar.gz .

echo "📤 Uploading to server..."
scp quickfix-deploy.tar.gz $SERVER_USER@$SERVER_IP:/tmp/

echo "�� Deploying on server..."
ssh $SERVER_USER@$SERVER_IP << 'ENDSSH'
set -e

APP_PATH="/var/www/quickfix-services"
APP_NAME="quickfix-services"

echo "🔧 Setting up server environment..."

# Update system
apt-get update -y

# Install Node.js if not present
if ! command -v node &> /dev/null; then
    echo "Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt-get install -y nodejs
fi

# Install PM2 if not present
if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2..."
    npm install -g pm2
fi

# Install Nginx if not present
if ! command -v nginx &> /dev/null; then
    echo "Installing Nginx..."
    apt-get install -y nginx
fi

# Create app directory
mkdir -p $APP_PATH/logs
cd $APP_PATH

# Extract application
echo "📦 Extracting application..."
tar -xzf /tmp/quickfix-deploy.tar.gz
rm /tmp/quickfix-deploy.tar.gz

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build on server
echo "🔨 Building application on server..."
npm run build

# Copy environment file
cp .env.production .env.local

# Stop existing PM2 process if running
pm2 delete $APP_NAME 2>/dev/null || true

# Start application with PM2
echo "🚀 Starting application..."
pm2 start ecosystem.config.js
pm2 save

# Configure Nginx
echo "🌐 Configuring Nginx..."
cat > /etc/nginx/sites-available/quickfix << 'NGINX_EOF'
server {
    listen 80;
    server_name 167.71.163.98;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # Main application
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Health check
    location /api/health {
        proxy_pass http://localhost:3001;
        access_log off;
    }
}
NGINX_EOF

# Enable site
ln -sf /etc/nginx/sites-available/quickfix /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test and reload Nginx
nginx -t
systemctl reload nginx
systemctl enable nginx

# Configure firewall
ufw allow 22
ufw allow 80
ufw allow 443
ufw --force enable

echo ""
echo "✅ Deployment completed!"
echo "📋 Application Status:"
pm2 status
echo ""
echo "🌐 Your QuickFix CRM is now live at:"
echo "   http://167.71.163.98"
echo "   http://167.71.163.98/admin/login"
echo "   http://167.71.163.98/crm"
echo ""
echo "🔐 Admin Credentials:"
echo "   Username: admin"
echo "   Password: QuickFix2025!Production"

ENDSSH

echo ""
echo "🎉 Deployment completed successfully!"
echo ""
echo "🌐 Access your QuickFix CRM at:"
echo "   http://167.71.163.98"
echo "   http://167.71.163.98/admin/login"
echo "   http://167.71.163.98/crm"
echo ""
echo "🔐 Admin Credentials:"
echo "   Username: admin"
echo "   Password: QuickFix2025!Production"

