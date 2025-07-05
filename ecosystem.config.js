module.exports = {
  apps: [
    {
      name: 'quickfix-services',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/quickfix-services',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3001  // Different port to avoid conflicts
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true
    }
  ]
};