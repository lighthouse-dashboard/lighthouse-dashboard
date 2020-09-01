import joi from '@hapi/joi';

export const siteConfigModel = joi.object({
    id: joi.string(),
    name: joi.string().required(),
    url: joi.string().required(),
    device: joi.string().required(),
    order: joi.number(),
    is_favorite: joi.boolean().required(),
    last_audit: joi.string(),

    createdAt: joi.string()
        .optional(),

    updatedAt: joi.string()
        .optional(),
    is_scheduled: joi.boolean(),
    thumbnail: joi.optional(),
    is_disabled: joi.boolean(),
    is_public: joi.boolean(),
}).label('SiteConfigModel');

export const siteConfigModelList = joi
    .array()
    .items(siteConfigModel)
    .label('SiteConfigList');
