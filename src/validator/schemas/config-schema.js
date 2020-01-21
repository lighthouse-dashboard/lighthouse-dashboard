import joi from '@hapi/joi';

export const REPORT_VALUE_KEYS_SCHEMA = joi
    .array()
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

const COLOR_THEME_CONFIG = joi.object({
    primary: joi.string(),
    accent: joi.string(),
    secondary: joi.string(),
    success: joi.string(),
    info: joi.string(),
    warning: joi.string(),
    error: joi.string(),
    text: joi.string(),
});

export default joi.object({
    DATE_FORMAT: joi.string().required(),

    DASHBOARD: joi.object({
        SITE_OVERVIEW_VALUES: REPORT_VALUE_KEYS_SCHEMA,
        OVERVIEW_BAR_VALUES: REPORT_VALUE_KEYS_SCHEMA,
        LATEST_REPORTS_VALUES: REPORT_VALUE_KEYS_SCHEMA,
    })
        .required(),

    UI: joi.object({
        THEME: joi
            .string()
            .allow('light', 'dark')
            .required(),

        CHART_COLORS: joi.object({
            dark: joi.array().items(joi.string()),
            light: joi.array().items(joi.string()),
        })
            .required(),

        COLOR_THEME: joi.object({
            dark: COLOR_THEME_CONFIG,
            light: COLOR_THEME_CONFIG,
        })
            .required(),
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
            MONGODB_URI: joi.string().required(),
            MONGO_DB_NAME: joi.string().required(),
        }).required(),

        SHOW_ERROR_PAGES: joi.boolean().required(),
    }).required(),
});
