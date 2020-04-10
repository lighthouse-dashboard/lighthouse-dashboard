import joi from '@hapi/joi';

export const siteConfigModel = joi.object({
    _id: joi.any(),
    id: joi.string(),
    name: joi.string().required(),
    url: joi.string().required(),
    device: joi.string().required(),
    order: joi.number(),
    is_favorite: joi.boolean().required(),
    token: joi.string().required(),
    last_audit: joi.string(),
}).label('sites.SiteConfigModel');

export const siteConfigModelList = joi
    .array()
    .items(siteConfigModel)
    .label('sites.SiteConfigModelList');
