import joi from '@hapi/joi';

export const reportValueModel = joi.object({
    //mongoose ID
    _id: joi
        .object(),


    id: joi
        .string()
        .required(),

    value: joi
        .number()
        .required(),
}).label('reports.ReportValueModel');


export const reportModel = {
    // mongoose ID
    _id: joi
        .object(),

    __v: joi
        .number(),

    siteId: joi
        .string()
        .required(),

    createdAt: joi.object()
        .required(),

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

export const reportModelSchema = joi.object(reportModel).label('reports.ReportModel');

export const reportModelList = joi
    .array()
    .items(reportModelSchema)
    .label('reports.ReportModelList');
