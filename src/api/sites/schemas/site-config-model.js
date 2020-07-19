import joi from '@hapi/joi';

export const siteConfigModel = joi.object({
    __v: joi.optional(),
    _id: joi.any(),
    id: joi.string(),
    name: joi.string().required(),
    url: joi.string().required(),
    device: joi.string().required(),
    order: joi.number(),
    is_favorite: joi.boolean().required(),
    last_audit: joi.string(),
    is_scheduled: joi.boolean(),
    thumbnail: joi.optional(),
    is_disabled: joi.boolean(),
}).label('sites.SiteConfigModel');

export const siteConfigModelList = joi
    .array()
    .items(siteConfigModel)
    .label('sites.SiteConfigModelList');
