import joi from '@hapi/joi';

export default joi.object({
    HOST: joi.string().required(),
    PORT: joi.number().required(),

    API: joi.object({
        SITE_REPORT_LIMIT: joi.number().min(1)
            .required(),
    }).required(),

    AUDIT: joi.object({
        CHROMIUM_PATH: joi.string(),
        CHROMIUM_PORT: joi.number(),
    }).required(),

    SHOW_ERROR_PAGES: joi.boolean().required(),
    LOGGERS: joi.array(),
    EXCEPTION_HANDLERS: joi.array(),
    HAPI_PLUGINS: joi.array(),
}).required();
