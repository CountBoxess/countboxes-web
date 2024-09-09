module.exports = {
  apps: [
    // Aplicação React (frontend)
    {
      name: 'tabi_frontend',
      script: 'serve',
      args: 'build',
      watch: true,
      env: {
        PM2_SERVE_PATH: './build',
        PM2_SERVE_PORT: 3000,
        PM2_SERVE_SPA: 'true',
        NODE_ENV: 'production'
      }
    }
  ]
};
