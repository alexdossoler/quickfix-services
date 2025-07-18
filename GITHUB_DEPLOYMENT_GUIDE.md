# GitHub Actions Deployment Setup

This guide sets up manual "click-to-deploy" workflow for the QuickFix CRM.

## Features

- Manual deployments only - No auto-deploy on push
- Safety confirmation - Must type "deploy" to confirm  
- Automatic backups - Creates backup before each deployment
- Health checks - Tests the app after deployment
- Auto-rollback - Restores backup if deployment fails
- Deployment summary - Shows URLs and credentials after success

## Setup Steps

### 1. Add SSH Key to GitHub Secrets

Generate SSH key:
```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/quickfix_deploy
```

Copy public key to server:
```bash
ssh-copy-id -i ~/.ssh/quickfix_deploy.pub root@167.71.163.98
```

Add private key to GitHub:
- Go to repo Settings > Secrets and variables > Actions
- Click "New repository secret"
- Name: DROPLET_SSH_KEY
- Value: Contents of ~/.ssh/quickfix_deploy (private key)

### 2. How to Deploy

Go to repo Actions tab > "Deploy QuickFix CRM to Production" > Run workflow
- Select environment: production
- Type "deploy" to confirm
- Click "Run workflow"

### 3. Monitor Deployments

View status in GitHub Actions tab
Check health: curl http://167.71.163.98/api/health
Server management: ssh root@167.71.163.98 && pm2 status

## Development Workflow

1. Create feature branch: git checkout -b feature/new-feature
2. Develop and test locally: npm run dev  
3. Push to GitHub (no deploy): git push origin feature/new-feature
4. Create pull request, review, merge to main
5. Deploy when ready: GitHub Actions > Run workflow > Type "deploy"

This gives you professional CI/CD with full control over when deployments happen!
