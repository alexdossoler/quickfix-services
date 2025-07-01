module.exports = {
  apps: [
    {
      name: 'quickfix-services',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/quickfix-services', // Update this path
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true
    }
  ]
};