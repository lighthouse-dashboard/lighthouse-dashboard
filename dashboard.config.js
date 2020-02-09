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
                '#c5f4c4',
                '#97d68e',
                '#7b9878',
                '#a2a7ac',
                '#707b9a',
            ],
            light: [
                '#de6416',
                '#efa34e',
                '#fbcc98',
                '#65beb1',
                '#7b9b7b',
            ],
        },

        COLOR_THEME: {
            dark: {
                primary: '#d37549',
                secondary: '#bf4223',
                text: '#fff',
                accent: '#546b8f',
            },
            light: {
                primary: '#de594d',
                text: '#333333',
                secondary: '#ffcc80',
                accent: '#e91e63',
            },
        },
    },
};
