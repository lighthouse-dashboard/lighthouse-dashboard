import joi from '@hapi/joi';
import dashboardViewHandler from '../handler/dashboard-view-handler';
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
        handler: dashboardViewHandler,
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
