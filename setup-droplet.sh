#!/bin/bash
# QuickFix Services Setup

APP_PATH="/var/www/quickfix-services"

# Create directories
sudo mkdir -p $APP_PATH/logs
sudo chown -R $USER:$USER $APP_PATH

# Install dependencies
sudo apt-get update
sudo apt-get install -y nginx
sudo npm install -g pm2

echo "Setup complete!"
echo "App path: $APP_PATH"
