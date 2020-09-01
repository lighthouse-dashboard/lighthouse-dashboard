import joi from '@hapi/joi';

export const reportValueModel = joi.object({
    id: joi
        .string()
        .required(),

    value: joi
        .number()
        .required(),
}).label('ReportValueModel');


export const reportModel = {
    siteId: joi
        .string()
        .required(),

    createdAt: joi.string()
        .optional(),

    updatedAt: joi.string()
        .optional(),

    message: joi
        .string()
        .allow(null),

    git_commit: joi
        .string()
        .allow(null),

    raw: joi.alternatives()
        .try(joi.boolean(), joi.object())
        .allow(null)
        .optional(),

    hasRawData: joi
        .boolean(),

    values: joi
        .array()
        .items(reportValueModel),
};

export const reportModelSchema = joi.object(reportModel).label('ReportModel');

export const reportModelList = joi
    .array()
    .items(reportModelSchema)
    .label('reports.ReportModelList');
