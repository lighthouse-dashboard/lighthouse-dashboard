import {Request, ServerRoute} from "hapi";
import Container from 'servicecontainer/bin/Container';
import {MINUTE} from '../../config/route-constants';
import ProjectController from './ProjectController';

const joi = require('joi');

export default function (container: Container): ServerRoute[] {
    return [
        {
            method: 'GET',
            path: '/api/projects/{branch}',
            handler: (req: Request) => container.get<ProjectController>('controller.project').getAll(req),
            options: {
                cache: {
                    expiresIn: MINUTE,
                    privacy: 'public',
                },
                tags: ['api'],
                description: 'Get list of valid projects for a given branch',
                validate: {
                    query: {
                        access_token: joi.string()
                            .description('API Secret. Can also be passed as Bearer token'),
                    },
                    params: {
                        branch: joi.string()
                            .required()
                            .description('Branch of the project'),
                    },
                },
            },
        },

        {
            method: 'DELETE',
            path: '/api/projects/{branch}',
            handler: (req: Request) => container.get<ProjectController>('controller.project').invalidateCaches(req),
            options: {
                tags: ['api'],
                description: 'Invalidate cache of fetched projects',
                validate: {
                    query: {
                        access_token: joi.string()
                            .description('API Secret. Can also be passed as Bearer token'),
                    },
                    params: {
                        branch: joi.string()
                            .required()
                            .description('Branch of the project'),
                    },
                },
            },
        },

        {
            method: 'GET',
            path: '/api/projects/{vcs}/{username}/{project}/branch/{branch}/history',
            handler: (req: Request) => container.get<ProjectController>('controller.project').getHistory(req),
            options: {
                cache: {
                    expiresIn: 15 * MINUTE,
                    privacy: 'public',
                },
                tags: ['api'],
                description: 'Get all builds with dashboard artifacts',
                validate: {
                    query: {
                        access_token: joi.string()
                            .description('API Secret. Can also be passed as Bearer token'),
                    },
                    params: {
                        vcs: joi.string()
                            .required()
                            .description('VCS Type'),
                        username: joi.string()
                            .required()
                            .description('Username used to fetch CircleCI projects'),
                        project: joi.string()
                            .required()
                            .description('Specific CI project'),
                        branch: joi.string()
                            .required()
                            .description('Branch name'),
                    },
                },
            },
        },
    ];
}
