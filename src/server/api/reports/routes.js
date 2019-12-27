import joi from '@hapi/joi';
import { createReportHandler, getRecentReportsHandler, getSpeedReportOverviewHandler } from './controller';

export default [
    {
        method: 'GET',
        path: '/api/reports/overview',
        handler: getSpeedReportOverviewHandler,
    },

    {
        method: 'GET',
        path: '/api/reports/{id}/recent',
        handler: getRecentReportsHandler,
        options: {
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
