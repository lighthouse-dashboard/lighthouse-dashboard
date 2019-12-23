import joi from '@hapi/joi';
import { addSiteHandler, deleteSiteHandler, getSitesHandler, getFavSitesHandler } from './controller';

export default [
    {
        method: 'GET',
        path: '/api/sites',
        handler: getSitesHandler,
    },
    {
        method: 'GET',
        path: '/api/sites/fav',
        handler: getFavSitesHandler,
    },
    {
        method: 'DELETE',
        path: '/api/sites/{id}',
        handler: deleteSiteHandler,
    },

    {
        method: 'POST',
        path: '/api/sites',
        handler: addSiteHandler,
        options: {
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
                }),
            },
        },
    },
];
