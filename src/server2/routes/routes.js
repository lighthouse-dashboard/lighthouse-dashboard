import joi from '@hapi/joi';
import getRecentAuditsHandler from '../handler/get-recent-audits-handler';
import runAudit from '../handler/run-audit-handler';

export default [
    {
        method: 'GET',
        path: '/assets/{asset}',
        handler: getRecentAuditsHandler,
        options: {
            validate: {
                params: joi.object({
                    asset: joi.string().required(),
                }),
            },
        },
    },
    {
        method: 'GET',
        path: '/run',
        handler: runAudit,
        options: {
            validate: {
                query: joi.object({
                    device: joi.any().allow('desktop', 'mobile').default('desktop'),
                    page: joi.string().uri({
                        scheme: ['http', 'https'],
                    }).required(),
                    runs: joi.number().min(1).max(5).default(3)
                }),
            },
        },
    },
    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.',
                redirectToSlash: true,
                index: true,
            }
        }
    }
]
