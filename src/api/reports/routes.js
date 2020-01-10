import joi from '@hapi/joi';
import { createReportHandler, getRecentReportsHandler, getSpeedReportOverviewHandler, getLatestReportValuesHandler } from './controller';

export default [
    {
        method: 'GET',
        path: '/api/reports/overview',
        handler: getSpeedReportOverviewHandler,
        options: {
            description: 'Get chart data for speed overview of favorited projects',
            tags: ['api', 'reports'],
        },
    },

    {
        method: 'GET',
        path: '/api/reports/{id}/latest',
        handler: getLatestReportValuesHandler,
        options: {
            description: 'Get latest report for site',
            tags: ['api', 'reports'],
            validate: {
                params: joi.object({
                    id: joi
                        .string()
                        .required(),
                }),
            },
        },
    },
    {
        method: 'GET',
        path: '/api/reports/{id}/recent',
        handler: getRecentReportsHandler,
        options: {
            description: 'Get recent report entries for site',
            tags: ['api', 'reports'],
            validate: {
                params: joi.object({
                    id: joi
                        .string()
                        .required(),
                }),
            },
        },
    },
    {
        method: 'POST',
        path: '/api/reports/{id}',
        handler: createReportHandler,
        options: {
            description: 'Execute new audit for site',
            tags: ['api', 'reports'],
            validate: {
                payload: joi.object({
                    token: joi.string()
                        .required()
                }),
                params: joi.object({
                    id: joi.string()
                        .required(),
                }),
            },
        },
    },
];
