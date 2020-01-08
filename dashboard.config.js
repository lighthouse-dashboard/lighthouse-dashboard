require('dotenv').config();

module.exports = {
    DATE_FORMAT: 'dd/MM HH:mm',
    DASHBOARD: {
        SITE_OVERVIEW_VALUES: [
            'performance',
            'seo',
            'pwa',
            'accessibility',
            'best-practices',
        ],

        OVERVIEW_BAR_VALUES: [
            'performance',
            'best-practices',
        ],

        LATEST_REPORTS_VALUES: [
            'performance',
            'seo',
            // 'accessibility',
            // 'pwa',
            // 'best-practices',
        ],
    },

    UI: {
        USE_DARK_MODE: true,
        CHART_COLORS: ['#d8db81', '#a24cef', '#7ca0d2', '#539b8d', '#023e68'],
    },

    SERVER: {
        HOST: process.env.HOST || '0.0.0.0',
        PORT: process.env.PORT || 3000,
        API: {
            LOGIN_PASS: process.env.LOGIN_PASS,
            JWT_SECRET: process.env.JWT_SECRET,
            SITE_REPORT_LIMIT: 50,
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
    },
};
