#!/usr/bin/env node

/**
 * EspoCRM Setup Wizard for QuickFix Services
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setupWizard() {
  console.log('QuickFix Services - EspoCRM Setup Wizard');
  console.log('=====================================\n');
  
  console.log('Step 1: Choose your EspoCRM setup method\n');
  console.log('1. EspoCRM Cloud - $25/month, 5-minute setup');
  console.log('2. Self-hosted EspoCRM - $10/month hosting');
  console.log('3. I already have EspoCRM running\n');
  
  const setupMethod = await question('Choose option (1-3): ');
  
  let apiUrl;
  
  if (setupMethod === '1') {
    console.log('\nEspoCRM Cloud Setup:');
    console.log('1. Visit: https://www.espocrm.com/cloud/');
    console.log('2. Sign up and choose subdomain: quickfix-services.espocrm.com');
    console.log('3. Complete setup wizard\n');
    
    await question('Press Enter when ready...');
    apiUrl = await question('Enter your EspoCRM URL: ');
  } else {
    apiUrl = await question('Enter your EspoCRM URL: ');
  }
  
  console.log('\nStep 2: API User Setup');
  console.log('In EspoCRM: Administration > API Users > Create');
  console.log('Username: quickfix-api, Active: Yes\n');
  
  const username = await question('Enter API username: ') || 'quickfix-api';
  const password = await question('Enter API password: ');
  
  console.log('\nStep 3: Custom Fields Required');
  console.log('Go to Administration > Entity Manager > Lead > Fields');
  console.log('Add these fields:');
  console.log('- serviceType (Enum): plumbing, electrical, brakes, oil-change, general');
  console.log('- urgencyLevel (Enum): normal, same-day, emergency');
  console.log('- serviceAddress (Text)');
  console.log('- preferredDate (Date)');
  console.log('- preferredTime (Varchar)');
  console.log('- leadScore (Int, 0-100)');
  console.log('- leadType (Enum): booking, contact\n');
  
  await question('Press Enter when custom fields are added...');
  
  // Update .env.local
  const envPath = path.join(process.cwd(), '.env.local');
  let envContent = '';
  
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }
  
  const lines = envContent.split('\\n').filter(line => 
    !line.startsWith('CRM_PROVIDER=') &&
    !line.startsWith('CRM_API_URL=') &&
    !line.startsWith('CRM_USERNAME=') &&
    !line.startsWith('CRM_PASSWORD=')
  );
  
  lines.push('');
  lines.push('# EspoCRM Configuration');
  lines.push('CRM_PROVIDER=espocrm');
  lines.push(`CRM_API_URL=${apiUrl}`);
  lines.push(`CRM_USERNAME=${username}`);
  lines.push(`CRM_PASSWORD=${password}`);
  
  fs.writeFileSync(envPath, lines.join('\\n'));
  
  console.log('\nSetup Complete!');
  console.log('Configuration saved to .env.local');
  console.log('\nNext steps:');
  console.log('1. npm run dev');
  console.log('2. Visit http://localhost:3000/admin to test');
  console.log('3. Check leads appear in EspoCRM\n');
  
  rl.close();
}

setupWizard().catch(console.error);
