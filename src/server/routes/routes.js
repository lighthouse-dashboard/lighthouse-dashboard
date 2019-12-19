import joi from '@hapi/joi';
import getRecentAuditsHandler from '../handler/get-recent-audits-handler';
import runAudit from '../handler/run-audit-handler';

export default [
    {
        method: 'GET',
        path: '/data/{id}',
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
        method: 'GET',
        path: '/run/{id}',
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
        path: '/',
        handler: {
            file: 'templates/index.html',
        },
    },
    {
        method: 'GET',
        path: '/assets/{param*}',
        handler: {
            directory: {
                path: '.',
                redirectToSlash: true,
                index: true,
            }
        }
    }
]
