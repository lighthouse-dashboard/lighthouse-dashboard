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

export const AVAILABLE_CHARTS = joi
    .array()
    .items(
        joi.string().valid(
            'favorite-projects-comparison',
            'latest-audits',
            'favorite-projects-overview',
        ),
    )
    .min(1)
    .max(3)
    .required();

export const CHART_CONFIG = joi.object({
    colSize: joi
        .number()
        .min(1)
        .max(12),
    limit: joi.number().min(1),
    fields: REPORT_VALUE_KEYS_SCHEMA,
});

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

const CUSTOM_MENU_ENTRY = joi.object({
    name: joi.string().required(),
    link: joi.function().required(),
});

export default joi.object({
    DATE_FORMAT: joi.string().required(),

    DASHBOARD: joi.object({
        TITLE: joi.string(),
        UPDATE_INTERVAL: joi
            .number()
            .min(1000)
            .required(),
        PAGE_DASHBOARD: joi.object({
            IS_FLUID: joi.boolean().required(),
            CHARTS: AVAILABLE_CHARTS,
        }),
        PAGE_PROJECTS: joi.object({
            IS_FLUID: joi.boolean().required(),
            colSize: joi
                .number()
                .min(1)
                .max(12),
        }),

        SITE_OVERVIEW_CHART: joi.object({
            fields: REPORT_VALUE_KEYS_SCHEMA,
        }),

        latestAudits: CHART_CONFIG,
        favoriteProjectsComparison: CHART_CONFIG,
        favoriteProjectsOverview: joi.object({
            colSize: joi
                .number()
                .min(1)
                .max(12),
        }),
    })
        .required(),

    UI: joi.object({
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

    PROJECT_MENU_CUSTOM_ENTRIES: joi.array().items(CUSTOM_MENU_ENTRY),
});
