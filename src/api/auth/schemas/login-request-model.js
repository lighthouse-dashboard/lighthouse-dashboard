import joi from '@hapi/joi';

export const loginRequestModel = joi.object({
    password: joi.string().required(),
}).label('LoginRequestModel');
