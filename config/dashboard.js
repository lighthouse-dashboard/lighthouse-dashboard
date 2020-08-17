const getCssVar = require('../assets/src/js/app/utils/get-css-var');

module.exports = {
    title: 'Lighthouse Dashboard',
    /**
     * Formatting used for time entries
     * @type {string}
     */

    // Config for the project overview chart
    siteOverviewChart: {
        fields: [
            'performance',
            'seo',
            'pwa',
            'accessibility',
            'best-practices',
        ],
    },

    // Config for the widget which shows the latest audited projects
    latestAuditChart: {
        // Amount of projects to be shown
        limit: 4,
        // Fields to be visible
        fields: [
            'performance',
            // 'seo',
            // 'pwa',
            // 'accessibility',
            // 'best-practices',
        ],
    },

    // Bar comparison chart
    favoriteProjectsComparison: {
        fields: [
            'performance',
            'seo',
            // 'pwa',
            'accessibility',
            // 'best-practices',
        ],
    },

    // Config for the favorite projects overview widget
    favoriteProjectsOverview: {
        colSize: 3,
    },

    // Colors used in the charts
    chartColors: [
        getCssVar('--color--chart-color-1'),
        getCssVar('--color--chart-color-2'),
        getCssVar('--color--chart-color-3'),
        getCssVar('--color--chart-color-4'),
        getCssVar('--color--chart-color-5'),
        getCssVar('--color--chart-color-6'),
    ],

    // Collection of configs for custom menu entries available for every page
    customProjectMenuEntries: [
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
