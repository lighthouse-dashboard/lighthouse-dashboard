import joi from '@hapi/joi';
import getSitesHandler from '../handler/get-sites-handler';
import getRecentAuditsHandler from '../handler/get-recent-audits-handler';
import runAudit from '../handler/run-audit-handler';

export default [
    {
        method: 'GET',
        path: '/api/{id}',
        handler: getRecentAuditsHandler,
        options: {
            validate: {
                params: joi.object({
                    id: joi.string().required(),
                }),
            },
        },
    },
    {
        method: 'POST',
        path: '/api/{id}',
        handler: runAudit,
        options: {
            validate: {
                params: joi.object({
                    id: joi.string().required(),
                }),
            },
        },
    },
    {
        method: 'GET',
        path: '/api',
        handler: getSitesHandler,
    },
    {
        method: 'GET',
        path: '/',
        handler: {
            file: 'templates/index.html',
        },
    },

    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.',
                redirectToSlash: true,
                index: false,
            },
        },
    },
];
