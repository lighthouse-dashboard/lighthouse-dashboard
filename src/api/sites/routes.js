import joi from '@hapi/joi';
import config from '../../../config/server';
import { SiteConfigSchema } from '../../validator/schemas/site-config';
import addSiteHandler from './handlers/add-site';
import createReport from './handlers/create-report';
import createReportByWebhook from './handlers/create-report-by-webhook';
import createReportForAll from './handlers/create-report-for-all';
import deleteSite from './handlers/delete-site';
import { getFavSitesHandler } from './handlers/get-fav-site';
import { getLatestSitesHandler } from './handlers/get-latest-sites';
import { getSiteById } from './handlers/get-site-by-id';
import getSitesHandler from './handlers/get-sites';
import { updateSiteConfigHandler } from './handlers/update-site-config';


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
                }),
            },
            cache: {
                expiresIn: config.API.CACHE_EXPIRES_IN,
                privacy: 'private',
            },
            response: {
                schema: joi.array().items(SiteConfigSchema),
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
                privacy: 'private',
            },
            response: {
                schema: joi.array().items(SiteConfigSchema),
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
                privacy: 'private',
            },
            response: {
                schema: joi.array().items(SiteConfigSchema),
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
                }),
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
                }),
            },
            cache: {
                expiresIn: config.API.CACHE_EXPIRES_IN,
                privacy: 'private',
            },
            response: {
                schema: SiteConfigSchema,
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
                }),
                payload: joi.object({
                    isFavorite: joi.boolean().required(),
                    name: joi.string(),
                    url: joi.string(),
                }),
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
                    isFavorite: joi.boolean(),
                }),
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
                }),
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
                }),
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
