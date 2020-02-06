import joi from '@hapi/joi';

export default joi.object({
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
        MONGO_DB_URI: joi.string().required(),
    }).required(),

    SHOW_ERROR_PAGES: joi.boolean().required(),
    LOGGERS: joi.array(),
    EXCEPTION_HANDLERS: joi.array(),
    HAPI_PLUGINS: joi.array(),
}).required();
