export enum REPORT_VALUE_KEYS {
    PERFORMANCE = 'performance',
    SEO = 'seo',
    PWA = 'pwa',
    ACCESSIBILITY = 'accessibility',
    BEST_PRACTICES = 'best-practices',
}

export interface DashboardConfig {
    dateFormat: string;
    DASHBOARD: {
        SITE_OVERVIEW_VALUES: REPORT_VALUE_KEYS[],
        OVERVIEW_BAR_VALUES: REPORT_VALUE_KEYS[],
        LATEST_REPORTS_VALUES: REPORT_VALUE_KEYS[],
    };
    UI: {
        THEME: string;
        chartColors: string[];
    };
    SERVER: {
        HOST: string;
        PORT: number;
        API: {
            LOGIN_PASS: string;
            JWT_SECRET: string;
            SITE_REPORT_LIMIT: number;
        };
        AUDIT: {
            CHROMIUM_PATH: string;
            CHROMIUM_PORT: number;
        };
        DB: {
            MONGODB_URI: string;
            MONGO_DB_NAME: string;
        };
    }

}
