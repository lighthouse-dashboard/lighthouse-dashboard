import joi from '@hapi/joi';

export const reportIdParamModel = joi.object({
    id: joi
        .string()
        .required()
        .label('reports.ReportIdParamModel'),
});
