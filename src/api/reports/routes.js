import joi from '@hapi/joi';
import getLatestReportValues from './handlers/get-latest-report-values';
import getReports from './handlers/get-reports';
import getSpeedReportOverview from './handlers/get-speed-report-overview';

export default [
    {
        method: 'GET',
        path: '/api/reports/overview',
        handler: getSpeedReportOverview,
        options: {
            description: 'Get chart data for speed overview of favorited projects',
            tags: ['api', 'reports'],
            auth: 'jwt',
        },
    },
    {
        method: 'GET',
        path: '/api/reports/{siteId}/latest',
        handler: getLatestReportValues,
        options: {
            description: 'Get latest report for site',
            tags: ['api', 'reports'],
            auth: 'jwt',
            validate: {
                params: joi.object({
                    siteId: joi
                        .string()
                        .required(),
                }),
            },
        },
    },
    {
        method: 'GET',
        path: '/api/reports/{id}',
        handler: getReports,
        options: {
            description: 'Get recent report entries for site',
            tags: ['api', 'reports'],
            auth: 'jwt',
            validate: {
                params: joi.object({
                    id: joi
                        .string()
                        .required(),
                }),
            },
        },
    },
];
