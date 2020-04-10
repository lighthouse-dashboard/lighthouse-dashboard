import joi from '@hapi/joi';

export const siteIdParamModel = joi.object({
    siteId: joi
        .string()
        .required()
        .label('reports.SiteIdParamModel'),
});
