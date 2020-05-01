# Dashboard Config
    
    {
        /**
         * Formatting used for time entries
         * @type {string}
         */
        dateFormat: 'dd/MM/yy HH:mm',
    
        /**
         * Config for the dashboard page
         */
        page_dashboard: {
            // Is the container fluid or fixed
            isFluid: false,
    
            // Widgets to be visible on the landing page
            charts: [
                'favorite-projects-comparison',
                'latest-audits',
                'favorite-projects-overview',
            ],
        },
    
        // Config for the projects page
        page_projects: {
            // Is the container fluid or fixed
            isFluid: true,
    
            // Amount of widgets per row
            colSize: 3,
        },
    
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
            // How many widgets per row
            colSize: 3,
    
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
    
        // Configuration for the theme
        ui: {
            // Colors used in the charts
            chartColors: charts,
            // Material UI theme colors
            theme: {
                dark: theme,
                light: theme,
            },
        },
    
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
    }
