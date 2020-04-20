import joi from '@hapi/joi';

export const reportValueModel = joi.object({
    id: joi
        .string()
        .required(),

    value: joi
        .number()
        .required(),
}).label('reports.ReportValueModel');


export const reportModel = joi.object({
    _id: joi
        .object(),

    siteId: joi
        .string()
        .required(),

    createdAt: joi
        .string()
        .required(),

    message: joi
        .string()
        .allow(null),

    git_commit: joi
        .string()
        .allow(null),

    raw: joi.alternatives()
        .try(joi.boolean(), joi.object())
        .allow(null),

    hasRawData: joi
        .boolean(),

    values: joi
        .array()
        .items(reportValueModel),
}).label('reports.ReportModel');

export const reportModelList = joi
    .array()
    .items(reportModel)
    .label('reports.ReportModelList');
