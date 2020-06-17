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

const CUSTOM_MENU_ENTRY = joi.object({
    name: joi.string().required(),
    link: joi.function().required(),
});

export default joi.object({
    title: joi.string().required(),
    dateFormat: joi.string().required(),

    siteOverviewChart: joi.object({
        fields: REPORT_VALUE_KEYS_SCHEMA,
    }),

    latestAuditChart: CHART_CONFIG,

    favoriteProjectsComparison: CHART_CONFIG,

    favoriteProjectsOverview: joi.object({
        colSize: joi
            .number()
            .min(1)
            .max(12),
    }),

    ui: joi.object({
        chartColors: joi
            .array()
            .items(joi.string())
            .required(),

    }).required(),

    customProjectMenuEntries: joi.array().items(CUSTOM_MENU_ENTRY),
});
