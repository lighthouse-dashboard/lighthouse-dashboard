import joi from '@hapi/joi';

export const SiteConfigSchema = joi.object({
    id: joi.string().required(),
    name: joi.string().required(),
    url: joi.string().required(),
    device: joi.string().required(),
    order: joi.number(),
    isFavorite: joi.boolean().required(),
    token: joi.string().required(),
    last_audit: joi.string(),
}).label('SiteConfig');
