import joi from '@hapi/joi';

export const barChartDataSetModel = joi.object({
    label: joi
        .string()
        .required(),

    date: joi
        .array()
        .items(joi.number()),
}).label('reports.ChartDatasetModel');

export const barChartDataModel = joi.object({
    labels: joi
        .array()
        .items(joi.string())
        .required(),

    datasets: joi
        .array()
        .items(barChartDataSetModel),
}).label('reports.BarChartDataModel');
