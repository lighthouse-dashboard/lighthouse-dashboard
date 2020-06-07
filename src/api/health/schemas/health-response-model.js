import joi from '@hapi/joi';

export const healthResponseModel = joi.object({
    rabbitmq: joi.object().allow(null),
    db_connection: joi.boolean().required(),
    uptime: joi.number().required(),
}).label('health.HealthResponseModel');
