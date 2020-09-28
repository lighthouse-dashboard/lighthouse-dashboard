import joi from '@hapi/joi';

export const GetScheduledResponseSchema = joi
    .array()
    .items(joi.object({
        _id: joi.object(),
        name: joi.string().required(),
        url: joi.string().required(),
    }))
    .label('GetScheduledResponseSchema');

export default GetScheduledResponseSchema;
