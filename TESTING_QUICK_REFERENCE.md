# 🧪 API Integration Testing - Quick Reference

## Your EspoCRM Integration Testing is Ready! 

I've provided you with comprehensive testing tools and guides:

### 🖥️ **Admin Dashboard Testing** (Recommended)
**URL**: http://localhost:3000/admin

**Available Tests**:
- **Connection Test**: Verifies EspoCRM API connectivity
- **Lead Creation Test**: Tests full lead with all custom fields  
- **Emergency Test**: Tests high-priority lead scoring
- **Custom Test Form**: Build your own test scenarios

**How to Use**:
1. Visit http://localhost:3000/admin
2. Click test buttons to run different scenarios
3. View real-time results with detailed feedback
4. Check EspoCRM to verify leads were created

### 💻 **Command Line Testing**
**Command**: `npm run test-crm`

**What it Tests**:
- Environment configuration validation
- EspoCRM API connection
- Multiple lead creation scenarios
- Website API integration
- Lead scoring algorithm accuracy

### 📊 **Test Scenarios Included**

#### 1. Basic Lead Test
- Normal priority plumbing request
- All fields populated
- Expected score: ~60 points

#### 2. Emergency Lead Test  
- High-priority electrical emergency
- Urgent response needed
- Expected score: ~95 points

#### 3. Minimal Contact Test
- Simple contact form inquiry
- Basic information only
- Expected score: ~25 points

#### 4. High-Value Service Test
- Same-day brake repair
- Safety-critical service
- Expected score: ~85 points

### ✅ **Success Indicators**

When testing works correctly, you should see:
- ✅ Test leads appear in EspoCRM within 30 seconds
- ✅ All custom fields populated (serviceType, urgencyLevel, etc.)
- ✅ Lead scores calculated automatically (0-100 range)
- ✅ Emergency leads show high priority (80+ points)
- ✅ No API errors in test results

### 🔧 **EspoCRM Custom Fields Required**

Your EspoCRM Lead entity needs these 7 custom fields:

1. **serviceType** (Enum): plumbing, electrical, brakes, oil-change, general, heating-cooling, emergency
2. **urgencyLevel** (Enum): normal, same-day, emergency
3. **serviceAddress** (Text): Max length 255
4. **preferredDate** (Date)
5. **preferredTime** (Varchar): Max length 50
6. **leadScore** (Int): Range 0-100
7. **leadType** (Enum): booking, contact

### 🚨 **Common Issues & Quick Fixes**

**Issue**: Connection Test Fails (401 Error)
**Fix**: Check API credentials in .env.local, ensure API user is active

**Issue**: Custom Fields Not Saving
**Fix**: Verify all 7 fields added with exact names (camelCase)

**Issue**: Website Integration Failed
**Fix**: Ensure dev server running with `npm run dev`

**Issue**: Leads Not Appearing in EspoCRM
**Fix**: Check assignment rules and user permissions

### 📋 **Quick Testing Steps**

1. **Setup Complete?**
   - [ ] EspoCRM instance running
   - [ ] API user created
   - [ ] Custom fields added
   - [ ] .env.local configured

2. **Test Connection**:
   ```bash
   # Option 1: Use admin dashboard
   # Visit http://localhost:3000/admin
   # Click "Test Connection"
   
   # Option 2: Use command line
   npm run test-crm
   ```

3. **Verify in EspoCRM**:
   - Login to your EspoCRM instance
   - Go to Leads menu
   - Look for test leads with your name
   - Check all custom fields are populated

4. **Test Website Integration**:
   - Visit http://localhost:3000
   - Submit a booking or contact form
   - Verify lead appears in EspoCRM

### 🎯 **Next Steps After Testing**

Once all tests pass:
1. **Set up automation workflows** in EspoCRM
2. **Configure dashboard widgets** for monitoring
3. **Train your team** on the new system
4. **Go live** and start capturing real leads!

### 💡 **Pro Tips**

- **Test regularly**: Run tests after any EspoCRM changes
- **Use realistic data**: Test with actual customer scenarios
- **Monitor performance**: Check response times and accuracy
- **Document issues**: Keep track of any problems for troubleshooting

Your EspoCRM integration testing setup is comprehensive and ready to use! 🚀

**Ready to test?** Visit http://localhost:3000/admin to get started!