require('dotenv').config();

module.exports = {
    DATE_FORMAT: 'dd/MM/yy HH:mm',
    DASHBOARD: {
        TITLE: 'dreipol performance',

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
        CHART_COLORS: {
            dark: [
                '#00876c',
                '#76ac7f',
                '#bfd0a1',
                '#fff6d2',
                '#efc18d',
                '#e5855f',
                '#d43d51',
            ],
            light: [
                '#00876c',
                '#76ac7f',
                '#bfd0a1',
                '#fff6d2',
                '#efc18d',
                '#e5855f',
                '#d43d51',
            ],
        },

        COLOR_THEME: {
            dark: {
                primary: '#5de3ff',
                text: '#f7f7f7',
                secondary: '#004c6d',
                accent: '#e91e63',
            },
            light: {
                primary: '#004c6d',
                text: '#333333',
                secondary: '#5de3ff',
                accent: '#e91e63',
            },
        },
    },

    PROJECT_MENU_CUSTOM_ENTRIES: [
        {
            name: 'CSS Stats',
            link: function(url) {
                return `https://cssstats.com/stats?url=${ url }`;
            },
        },
    ],
};
