import joi from '@hapi/joi';

export default joi.object({
    API: joi.object({
        SITE_REPORT_LIMIT: joi
            .number()
            .min(1)
            .required(),

        CACHE_EXPIRES_IN: joi
            .number()
            .min(0)
            .required(),
    })
        .required(),

    DB: joi.object({
        MAX_RAW_DATA_HISTORY: joi
            .number()
            .allow(false)
            .required(),

        MAX_REPORTS_HISTORY: joi
            .number()
            .allow(false)
            .required(),
    }),

    AUDIT: joi.object({
        CHROMIUM_PATH: joi
            .string(),

        CHROMIUM_PORT: joi
            .number(),
    }).required(),

}).required();
