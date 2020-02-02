import joi from '@hapi/joi';
import createReport from './handlers/create-report';
import getLatestReportValues from './handlers/get-latest-report-values';
import getRecentReports from './handlers/get-recent-reports';
import getSpeedReportOverview from './handlers/get-speed-report-overview';

export default [
    {
        method: 'GET',
        path: '/api/reports/overview',
        handler: getSpeedReportOverview,
        options: {
            description: 'Get chart data for speed overview of favorited projects',
            tags: ['api', 'reports'],
        },
    },

    {
        method: 'GET',
        path: '/api/reports/{siteId}/latest',
        handler: getLatestReportValues,
        options: {
            description: 'Get latest report for site',
            tags: ['api', 'reports'],
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
        path: '/api/reports/{id}/recent',
        handler: getRecentReports,
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
        handler: createReport,
        options: {
            description: 'Execute new audit for site',
            tags: ['api', 'reports'],
            auth: false,
            validate: {
                params: joi.object({
                    id: joi.string()
                        .required(),
                }),
                query: joi.object({
                    token: joi.string(),
                }),
            },
        },
    },
];
