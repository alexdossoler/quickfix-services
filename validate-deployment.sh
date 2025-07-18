#!/bin/bash
# Local deployment validation script

set -e

echo "🧪 Running local deployment validation..."

# Test build
echo "📦 Testing build process..."
npm run build

# Test production start (briefly)
echo "🚀 Testing production start..."
timeout 10s npm run start &
SERVER_PID=$!
sleep 5

# Test health endpoints
echo "🔍 Testing health endpoints..."
curl -f http://localhost:3000/api/health > /dev/null && echo "✅ /api/health endpoint working"
curl -f http://localhost:3000/health > /dev/null && echo "✅ /health endpoint working"

# Stop server
kill $SERVER_PID 2>/dev/null || true

echo ""
echo "✅ Local validation complete!"
echo "🚀 Ready for deployment to production server!"