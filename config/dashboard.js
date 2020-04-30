const getTheme = require('../assets/src/js/utils/get-theme');

require('dotenv').config();

const { charts, theme } = getTheme();

module.exports = {
    DATE_FORMAT: 'dd/MM/yy HH:mm',
    DASHBOARD: {
        TITLE: 'dreipol',

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
            IS_FLUID: true,
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
            limit: 4,
            fields: [
                'performance',
                // 'seo',
                // 'pwa',
                // 'accessibility',
                // 'best-practices',
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
        CHART_COLORS: charts,
        COLOR_THEME: {
            dark: theme,
            light: theme,
        },
    },

    PROJECT_MENU_CUSTOM_ENTRIES: [
        {
            name: 'CSS Stats',
            link: function(url) {
                return `https://cssstats.com/stats?url=${ url }`;
            },
        },
        {
            name: 'EverySize',
            link: function(url) {
                return `https://everysize-app.kibalabs.com/?url=${ url }`;
            },
        },
    ],
};
