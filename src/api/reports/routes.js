import config from '../../../config/server';
import { LIFE_TIME } from '../../config/cache';
import getHtmlReportHandler from './controller/get-html-report';
import getLatestReportValues from './controller/get-latest-report-values';
import getReports from './controller/get-reports';
import getSpeedReportOverview from './controller/get-speed-report-overview';
import { barChartDataModel } from './schemas/bar-chart-data-model';
import { reportIdParamModel } from './schemas/report-id-param-model';
import { reportModelList } from './schemas/report-model';
import { siteIdParamModel } from './schemas/siteid-param-model';

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
                params: siteIdParamModel,
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
                params: reportIdParamModel,
            },
            cache: {
                expiresIn: LIFE_TIME,
                privacy: 'private',
            },
            response: {
                schema: reportModelList,
            },
        },
    },
    {
        method: 'GET',
        path: '/api/reports/report/{id}',
        handler: getHtmlReportHandler,
        options: {
            description: 'Get lighthouse html report',
            tags: ['api', 'reports'],
            auth: 'jwt',
            validate: {
                params: reportIdParamModel,
            },
            cache: {
                expiresIn: LIFE_TIME,
                privacy: 'public',
            },
        },
    },
];
