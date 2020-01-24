// const colorPreference = require('./src/utils/color-preference');
require('dotenv').config();

module.exports = {
    DATE_FORMAT: 'dd/MM HH:mm',
    DASHBOARD: {
        TITLE: 'My Dashboard',
        UPDATE_INTERVAL: 30000,
        PAGE_DASHBOARD: {
            IS_FLUID: false,
            CHARTS: [
                'favorite-projects-comparison',
                'latest-audits',
                'favorite-projects-overview',
            ],
        },
        PAGE_PROJECTS: {
            IS_FLUID: false,
            colSize: 3,
        },

        SITE_OVERVIEW_CHART: {
            fields: [
                'performance',
                'seo',
                'pwa',
                'accessibility',
                'best-practices',
            ],
        },
        latestAudits: {
            colSize: 3,
            limit: 12,
            fields: [
                'performance',
                'seo',
                'pwa',
                'accessibility',
                'best-practices',
            ],
        },

        favoriteProjectsComparison: {
            fields: [
                'performance',
                'seo',
                // 'pwa',
                'accessibility',
                // 'best-practices',
            ],
        },

        favoriteProjectsOverview: {
            colSize: 3,
        },
    },

    UI: {
        // THEME: colorPreference ? 'dark' : 'light',
        THEME: 'dark',
        CHART_COLORS: {
            dark: [
                '#C5F4C4',
                '#97D68E',
                '#7B9878',
                '#a2a7ac',
                '#707B9A',
            ],
            light: [
                '#DE594D',
                '#EFCB6E',
                '#DACAAE',
                '#5CBE9E',
                '#546C54',
            ],
        },
        COLOR_THEME: {
            dark: {
                primary: '#D37549',
                secondary: '#bf4223',
                text: '#d6a99d',
                accent: '#546B8F',
            },
            light: {
                primary: '#DE594D',
                text: '#333333',
                secondary: '#ffcc80',
                accent: '#e91e63',
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
