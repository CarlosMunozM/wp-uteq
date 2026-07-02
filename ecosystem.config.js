module.exports = {
  apps: [
    {
      name: 'uteq_website',
      cwd: '/usr/share/nginx/html/WP-UTEQ',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
