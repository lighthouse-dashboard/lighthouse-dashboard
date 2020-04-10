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

    AUDIT: joi.object({
        CHROMIUM_PATH: joi
            .string(),

        CHROMIUM_PORT: joi
            .number(),
    }).required(),

}).required();
