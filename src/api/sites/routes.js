import joi from '@hapi/joi';
import addSiteHandler from './add-site';
import deleteSite from './delete-site';
import { getFavSitesHandler } from './get-fav-site';
import { getLatestSitesHandler } from './get-latest-sites';
import { getSiteById } from './get-site-by-id';
import { getSitesHandler } from './get-sites';
import { updateSiteConfigHandler } from './update-site-config';

export default [
    {
        method: 'GET',
        path: '/api/sites',
        handler: getSitesHandler,
        options: {
            description: 'Get all configured sites',
            tags: ['api', 'sites'],
        },
    },
    {
        method: 'GET',
        path: '/api/sites/latest',
        handler: getLatestSitesHandler,
        options: {
            description: 'Get latest audited sites',
            tags: ['api', 'sites'],
        },
    },
    {
        method: 'GET',
        path: '/api/sites/fav',
        handler: getFavSitesHandler,
        options: {
            description: 'Get favorited sites',
            tags: ['api', 'sites'],
        },
    },
    {
        method: 'DELETE',
        path: '/api/sites/{id}',
        handler: deleteSite,
        options: {
            description: 'Delete site',
            tags: ['api', 'sites'],
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
            validate: {
                params: joi.object({
                    id: joi.string().required(),
                }),
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
            validate: {
                params: joi.object({
                    id: joi.string().required(),
                }),
                payload: joi.object({
                    is_favorite: joi.boolean().required(),
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
            validate: {
                payload: joi.object({
                    url: joi
                        .string()
                        .required(),
                    id: joi
                        .string()
                        .required(),
                    device: joi
                        .string()
                        .allow('desktop', 'mobile')
                        .required(),
                    isFavorite: joi.boolean(),
                }),
            },
        },
    },
];
