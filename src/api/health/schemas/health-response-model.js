import joi from '@hapi/joi';

export const healthResponseModel = joi.object({
    rabbitmq: joi.string().required(),
    db_connection: joi.string().required(),
    uptime: joi.number().required(),
}).label('health.HealthResponseModel');
