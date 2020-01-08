import joi from '@hapi/joi';

export const REPORT_VALUE_KEYS_SCHEMA = joi.array()

    .items(
        joi.string().valid(
            'performance',
            'seo',
            'pwa',
            'accessibility',
            'best-practices',
        ),
    )
    .min(1)
    .max(5)
    .required();

export default joi.object({
    DATE_FORMAT: joi.string().required(),
    DASHBOARD: joi.object({
        SITE_OVERVIEW_VALUES: REPORT_VALUE_KEYS_SCHEMA,
        OVERVIEW_BAR_VALUES: REPORT_VALUE_KEYS_SCHEMA,
        LATEST_REPORTS_VALUES: REPORT_VALUE_KEYS_SCHEMA,
    }).required(),

    UI: joi.object({
        USE_DARK_MODE: joi.boolean().required(),
        CHART_COLORS: joi.array().items(joi.string()),
    }).required(),

    SERVER: joi.object({
        HOST: joi.string().required(),
        PORT: joi.number().required(),
        API: joi.object({
            LOGIN_PASS: joi.string().required(),
            JWT_SECRET: joi.string().required(),
            SITE_REPORT_LIMIT: joi.number().min(1)
                .required(),
        }).required(),

        AUDIT: joi.object({
            CHROMIUM_PATH: joi.string(),
            CHROMIUM_PORT: joi.number(),
        }).required(),

        DB: joi.object({
            MONGO_DB_URL: joi.string().required(),
            MONGO_DB_NAME: joi.string().required(),
        }),
        SHOW_ERROR_PAGES: joi.boolean().required(),
    }).required(),
});
