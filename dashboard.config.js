const colorPreference = require('./src/utils/color-preference');
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
        THEME: colorPreference ? 'dark' : 'light',
        // THEME: 'dark',
        CHART_COLORS: {
            dark: [
                '#009888',
                '#5698ef',
                '#7ca0d2',
                '#539b8d',
                '#023e68',
            ],
            light: [
                '#539b8d',
                '#ffcc80',
                '#7ca0d2',
                '#539b8d',
                '#023e68',
            ],
        },
        COLOR_THEME: {
            dark: {
                primary: '#009888',
                text: '#f7f7f7',
                accent: '#ff9800',
                secondary: '#5698ef',
                success: '#4caf50',
                info: '#2196f3',
                warning: '#fb8c00',
                error: '#ff5252',
            },
            light: {
                primary: '#539b8d',
                text: '#333333',
                accent: '#e91e63',
                secondary: '#ffcc80',
                success: '#4caf50',
                info: '#2196f3',
                warning: '#fb8c00',
                error: '#ff5252',
            },
        },
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
            CHROMIUM_PATH: process.env.GOOGLE_CHROME_BIN,
            CHROMIUM_PORT: 9222,
        },
        DB: {
            MONGO_DB_URI: process.env.MONGODB_URI,
        },
        SHOW_ERROR_PAGES: process.env.SHOW_ERROR_PAGES || false,
    },
};
