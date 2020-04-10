import joi from '@hapi/joi';

export const reportValueModel = joi.object({
    id: joi.string().required(),
    siteId: joi.string().required(),
    createdAt: joi.string().required(),
    message: joi.string().allow(null),
    git_commit: joi.string().allow(null),
    raw: joi.object().allow(null),
    hasRawData: joi.boolean(),
}).label('reports.ReportValueModel');


export const reportModel = joi.object({
    id: joi.string().required(),
    siteId: joi.string().required(),
    createdAt: joi.string().required(),
    message: joi.string().allow(null),
    git_commit: joi.string().allow(null),
    raw: joi.object().optional(),
    hasRawData: joi.boolean(),
    values: joi.array().items(reportValueModel),
}).label('reports.ReportModel');
