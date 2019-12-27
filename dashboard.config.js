require('dotenv').config();

export default {
    DATE_FORMAT: 'dd/MM HH:mm',
    UI: {
        USE_DARK_MODE: true,
    },

    SERVER: {
        HOST: process.env.HOST || '0.0.0.0',
        PORT: process.env.PORT || 3000,
        API: {
            AUTH_TOKEN: 'Foo',
            SITE_REPORT_LIMIT: 10,
            REPORT_VALUES: [
                'performance',
                'seo',
                'pwa',
                'accessibility',
                'best-practices',
            ],
        },
        AUDIT: {
            CHROMIUM_PATH: process.env.CHROMIUM_PATH,
            CHROMIUM_PORT: 9222,
        },
        DB: {
            MONGO_DB_URL: process.env.MONGO_DB_URL,
            MONGO_DB_NAME: process.env.MONGO_DB_NAME,
        },
        SHOW_ERROR_PAGES: process.env.SHOW_ERROR_PAGES,
        CRONJOB: {
            ENABLED: true,
            RUN_AUDITS: '*/30 * * * *',
        },
    },
};
