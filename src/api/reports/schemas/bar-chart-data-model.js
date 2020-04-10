import joi from '@hapi/hapi';

export const barChartDataSetModel = joi.object({
    label: joi
        .string()
        .required(),

    date: joi
        .array()
        .items(joi.number()),
}).label('reports.ChartDataSetModel');

export const barChartDataModel = joi.object({
    labels: joi
        .array()
        .items(joi.string())
        .required(),

    datasets: joi
        .array()
        .items(barChartDataSetModel),
}).label('reports.BarChartDataModel');
