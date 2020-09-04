import joi from '@hapi/joi';

export const reportValueModel = joi.object({
    // mongoose fields
    __v: joi.any(),
    _id: joi.any(),

    id: joi
        .string()
        .required(),

    value: joi
        .number()
        .required(),
}).label('ReportValueModel');


export const reportModel = {
    // mongoose fields
    __v: joi.any(),
    _id: joi.any(),

    site: joi
        .object()
        .required(),

    raw_report: joi
        .object()
        .optional(),

    createdAt: joi.object()
        .allow(null)
        .optional(),

    updatedAt: joi.object()
        .allow(null)
        .optional(),

    values: joi
        .array()
        .items(reportValueModel),
};

export const reportModelSchema = joi.object(reportModel).label('ReportModel');

export const reportModelList = joi
    .array()
    .items(reportModelSchema)
    .label('reports.ReportModelList');
