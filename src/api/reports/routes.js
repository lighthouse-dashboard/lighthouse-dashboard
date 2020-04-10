import joi from '@hapi/joi';
import config from '../../../config/server';
import getHtmlReportHandler from './controller/get-html-report';
import getLatestReportValues from './controller/get-latest-report-values';
import getReports from './controller/get-reports';
import getSpeedReportOverview from './controller/get-speed-report-overview';
import { barChartDataModel } from './schemas/bar-chart-data-model';
import { reportModel } from './schemas/report-model';

export default [
    {
        method: 'GET',
        path: '/api/reports/overview',
        handler: getSpeedReportOverview,
        options: {
            description: 'Get chart data for speed overview of favorited projects',
            tags: ['api', 'reports'],
            auth: 'jwt',
            cache: {
                expiresIn: config.API.CACHE_EXPIRES_IN,
                privacy: 'private',
            },
            response: {
                schema: barChartDataModel,
            },
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
                        .required()
                        .label('SiteId'),
                }),
            },
            cache: {
                expiresIn: config.API.CACHE_EXPIRES_IN,
                privacy: 'private',
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
                        .required()
                        .label('ReportId'),
                }),
            },
            cache: {
                expiresIn: config.API.CACHE_EXPIRES_IN,
                privacy: 'private',
            },
            response: {
                schema: reportModel,
            },
        },
    },
    {
        method: 'GET',
        path: '/api/reports/report/{reportId}',
        handler: getHtmlReportHandler,
        options: {
            description: 'Get lighthouse html report',
            tags: ['api', 'reports'],
            auth: 'jwt',
            validate: {
                params: joi.object({
                    reportId: joi
                        .string()
                        .required()
                        .label('ReportId'),
                }),
            },
            cache: {
                expiresIn: config.API.CACHE_EXPIRES_IN,
                privacy: 'private',
            },
        },
    },
];
