#!/bin/bash
# QuickFix CRM Production Deployment Script

set -e

echo "🚀 Starting QuickFix CRM Production Deployment..."

# Configuration
APP_NAME="quickfix-services"
APP_PATH="/var/www/quickfix-services"
DOMAIN="charlotteservicehub.com"
NODE_VERSION="18"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_error "This script should not be run as root"
   exit 1
fi

print_status "Checking Node.js version..."
node_version=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$node_version" -lt "$NODE_VERSION" ]; then
    print_error "Node.js version must be $NODE_VERSION or higher. Current: $(node -v)"
    exit 1
fi

print_status "Building production application..."
npm run build

print_status "Creating production directory..."
sudo mkdir -p $APP_PATH/logs
sudo chown -R $USER:$USER $APP_PATH

print_status "Copying application files..."
sudo cp -r .next $APP_PATH/
sudo cp -r public $APP_PATH/
sudo cp -r src $APP_PATH/
sudo cp package*.json $APP_PATH/
sudo cp next.config.* $APP_PATH/
sudo cp tailwind.config.* $APP_PATH/
sudo cp postcss.config.* $APP_PATH/
sudo cp tsconfig.json $APP_PATH/
sudo cp .env.production $APP_PATH/.env.local
sudo cp ecosystem.config.js $APP_PATH/

print_status "Installing production dependencies..."
cd $APP_PATH
sudo npm ci --only=production

print_status "Setting up PM2..."
sudo npm install -g pm2
pm2 delete $APP_NAME 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save
pm2 startup

print_status "Setting up Nginx..."
sudo tee /etc/nginx/sites-available/$DOMAIN > /dev/null << NGINX_EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    
    # Redirect HTTP to HTTPS
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name $DOMAIN www.$DOMAIN;
    
    # SSL Configuration (assuming SSL certificates are already set up)
    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https:;" always;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    # Main application
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        
        # Security for admin areas
        location /crm {
            proxy_pass http://localhost:3001;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
            
            # Rate limiting for CRM access
            limit_req zone=crm_limit burst=5 nodelay;
        }
        
        location /admin {
            proxy_pass http://localhost:3001;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
            
            # Rate limiting for admin access
            limit_req zone=admin_limit burst=3 nodelay;
        }
    }
    
    # Static files
    location /_next/static/ {
        proxy_pass http://localhost:3001;
        proxy_cache_valid 200 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Images and assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://localhost:3001;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}

# Rate limiting zones
http {
    limit_req_zone \$binary_remote_addr zone=crm_limit:10m rate=10r/m;
    limit_req_zone \$binary_remote_addr zone=admin_limit:10m rate=5r/m;
}
NGINX_EOF

# Enable the site
sudo ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

print_status "Setting up log rotation..."
sudo tee /etc/logrotate.d/$APP_NAME > /dev/null << LOG_EOF
$APP_PATH/logs/*.log {
    daily
    missingok
    rotate 7
    compress
    delaycompress
    notifempty
    create 0644 $USER $USER
    postrotate
        pm2 reload $APP_NAME
    endscript
}
LOG_EOF

print_status "Setting up monitoring..."
cat > $APP_PATH/healthcheck.js << 'HEALTH_EOF'
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/health',
  method: 'GET',
  timeout: 5000
};

const req = http.request(options, (res) => {
  if (res.statusCode === 200) {
    console.log('✅ Health check passed');
    process.exit(0);
  } else {
    console.log('❌ Health check failed');
    process.exit(1);
  }
});

req.on('error', (err) => {
  console.log('❌ Health check error:', err.message);
  process.exit(1);
});

req.on('timeout', () => {
  console.log('❌ Health check timeout');
  req.destroy();
  process.exit(1);
});

req.end();
HEALTH_EOF

# Setup cron job for health checks
(crontab -l 2>/dev/null; echo "*/5 * * * * cd $APP_PATH && node healthcheck.js >> logs/health.log 2>&1") | crontab -

print_status "Deployment completed successfully! 🎉"
echo ""
echo "📋 DEPLOYMENT SUMMARY:"
echo "======================"
echo "🌐 Application URL: https://$DOMAIN"
echo "🔧 Admin Login: https://$DOMAIN/admin/login"
echo "📊 CRM Dashboard: https://$DOMAIN/crm"
echo "📁 App Directory: $APP_PATH"
echo "📋 PM2 Status: pm2 status"
echo "📄 Logs: pm2 logs $APP_NAME"
echo ""
echo "🔐 SECURITY NOTES:"
echo "=================="
echo "• Change admin password in .env.local"
echo "• Set up SendGrid API key for emails"
echo "• Configure SSL certificates if not done"
echo "• Review security headers in Nginx config"
echo ""
echo "🚀 Your QuickFix CRM is now live in production!"
