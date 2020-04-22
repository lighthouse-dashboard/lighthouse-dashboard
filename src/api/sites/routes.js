import joi from '@hapi/joi';
import config from '../../../config/server';
import addSiteHandler from './handlers/add-site';
import createReport from './handlers/create-report';
import createReportByWebhook from './handlers/create-report-by-webhook';
import createReportForAll from './handlers/create-report-for-all';
import deleteSite from './handlers/delete-site';
import { getFavSitesHandler } from './handlers/get-fav-site';
import { getLatestSitesHandler } from './handlers/get-latest-sites';
import getLatestSitesReport from './handlers/get-latest-sites-report';
import { getSiteById } from './handlers/get-site-by-id';
import getSitesHandler from './handlers/get-sites';
import { updateSiteConfigHandler } from './handlers/update-site-config';
import { siteConfigModel, siteConfigModelList } from './schemas/site-config-model';
import { siteWithReportList } from './schemas/site-with-report';

export default [
    {
        method: 'GET',
        path: '/api/sites',
        handler: getSitesHandler,
        options: {
            auth: 'jwt',
            description: 'Get all configured sites',
            tags: ['api', 'sites'],
            validate: {
                query: joi.object({
                    query: joi.string(),
                }).label('sites.Query'),
            },
            cache: {
                expiresIn: config.API.CACHE_EXPIRES_IN,
                privacy: 'public',
            },
            response: {
                schema: siteConfigModelList,
            },
        },
    },
    {
        method: 'GET',
        path: '/api/sites/latest',
        handler: getLatestSitesHandler,
        options: {
            description: 'Get latest audited sites',
            tags: ['api', 'sites'],
            auth: 'jwt',
            cache: {
                expiresIn: config.API.CACHE_EXPIRES_IN,
                privacy: 'public',
            },
            response: {
                schema: siteConfigModelList,
            },
        },
    },
    {
        method: 'GET',
        path: '/api/sites/latest-reports',
        handler: getLatestSitesReport,
        options: {
            description: 'Get latest audited sites with report',
            tags: ['api', 'sites'],
            auth: 'jwt',
            cache: {
                expiresIn: config.API.CACHE_EXPIRES_IN,
                privacy: 'public',
            },
            response: {
                schema: siteWithReportList,
            },
        },
    },
    {
        method: 'GET',
        path: '/api/sites/fav',
        handler: getFavSitesHandler,
        options: {
            description: 'Get favorited sites',
            tags: ['api', 'sites'],
            auth: 'jwt',
            cache: {
                expiresIn: config.API.CACHE_EXPIRES_IN,
                privacy: 'public',
            },
            response: {
                schema: siteConfigModelList,
            },
        },
    },
    {
        method: 'DELETE',
        path: '/api/sites/{id}',
        handler: deleteSite,
        options: {
            description: 'Delete site',
            tags: ['api', 'sites'],
            auth: 'jwt',
            validate: {
                params: joi.object({
                    id: joi.string().required(),
                }).label('sites.SiteId'),
            },
        },
    },
    {
        method: 'GET',
        path: '/api/sites/{id}',
        handler: getSiteById,
        options: {
            description: 'Get project config by id',
            tags: ['api', 'sites'],
            auth: 'jwt',
            validate: {
                params: joi.object({
                    id: joi.string().required(),
                }).label('sites.SiteId'),
            },
            cache: {
                expiresIn: config.API.CACHE_EXPIRES_IN,
                privacy: 'public',
            },
            response: {
                schema: siteConfigModel,
            },
        },
    },
    {
        method: 'PUT',
        path: '/api/sites/{id}',
        handler: updateSiteConfigHandler,
        options: {
            description: 'Get project config by id',
            tags: ['api', 'sites'],
            auth: 'jwt',
            validate: {
                params: joi.object({
                    id: joi.string().required(),
                }).label('sites.SiteId'),
                payload: joi.object({
                    is_favorite: joi.boolean().required(),
                    name: joi.string(),
                    url: joi.string(),
                }).label('sites.SiteUpdateModel'),
            },
        },
    },
    {
        method: 'POST',
        path: '/api/sites',
        handler: addSiteHandler,
        options: {
            description: 'Add new site configuration',
            tags: ['api', 'sites'],
            auth: 'jwt',
            validate: {
                payload: joi.object({
                    url: joi
                        .string(),
                    name: joi
                        .string(),
                    device: joi
                        .string()
                        .allow('desktop', 'mobile'),
                    is_favorite: joi.boolean(),
                }).label('sites.CreateSiteModel'),
            },
        },
    },
    {
        method: 'POST',
        path: '/api/sites/{id}',
        handler: createReport,
        options: {
            description: 'Create new report',
            tags: ['api', 'sites'],
            auth: 'jwt',
            validate: {
                params: joi.object({
                    id: joi
                        .string()
                        .required(),
                }).label('sites.SiteId'),
            },
        },
    },
    {
        method: 'POST',
        path: '/api/webhook/{token}',
        handler: createReportByWebhook,
        options: {
            description: 'Add new site audit',
            tags: ['api', 'sites'],
            auth: false,
            validate: {
                params: joi.object({
                    token: joi
                        .string()
                        .required(),
                }).label('sites.SiteToken'),
            },
        },
    },
    {
        method: 'POST',
        path: '/api/sites/all',
        handler: createReportForAll,
        options: {
            description: 'Add new site audit for every site',
            tags: ['api', 'sites'],
            auth: 'jwt',
        },
    },
];
