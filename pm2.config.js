module.exports = {
    apps: [
        {
            name: 'trading-backend',
            script: 'node dist/main',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                DOTENV_CONFIG_PATH: './.env',
            }
        },
    ],
};
