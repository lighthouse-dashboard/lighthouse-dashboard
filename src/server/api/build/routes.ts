import {Request, ServerRoute} from 'hapi';
import BuildController from './BuildController';
import Container from 'servicecontainer/bin/Container';
import {MINUTE, MONTH} from '../../config/route-constants';

const joi = require('joi');

export default function(container: Container): ServerRoute[] {
    return [
        {
            method: 'GET',
            path: '/api/projects/{vcs}/{username}/{project}/branch/{branch}',
            handler: (req: Request) => container.get<BuildController>('controller.build').getBranchBuilds(req),
            options: {
                cache: {
                    expiresIn: MINUTE,
                    privacy: 'public',
                },
                tags: ['api'],
                description: 'Get all builds for project on specific branch',
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
                            .description('Branch of the project'),
                    },
                },
            },
        },

        {
            method: 'GET',
            path: '/api/projects/{vcs}/{username}/{project}/branch/{branch}/trending',
            handler: (req: Request) => container.get<BuildController>('controller.build').getBranchTrend(req),
            options: {
                cache: {
                    expiresIn: 15 * MINUTE,
                    privacy: 'public',
                },
                tags: ['api'],
                description: 'Get all builds for project on specific branch',
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
                            .description('Branch of the project'),
                    },
                },
            },
        },

        {
            method: 'GET',
            path: '/api/projects/{vcs}/{username}/{project}/branch/{branch}/latest',
            handler: (req: Request) => container.get<BuildController>('controller.build').getLatest(req),
            options: {
                cache: {
                    expiresIn: MINUTE,
                    privacy: 'public',
                },
                tags: ['api'],
                description: 'Get latest build',
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
                            .description('Branch of the project'),
                    },
                },
            },
        },

        {
            method: 'GET',
            path: '/api/projects/{vcs}/{username}/{project}/branch/{branch}/running',
            handler: (req: Request) => container.get<BuildController>('controller.build').getRunning(req),
            options: {
                cache: {
                    expiresIn: MINUTE,
                    privacy: 'public',
                },
                tags: ['api'],
                description: 'Get current running build',
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
                            .description('Branch of the project'),
                    },
                },
            },
        },

        {
            method: 'GET',
            path: '/api/projects/{vcs}/{username}/{project}/build/{build}',
            handler: (req: Request) => container.get<BuildController>('controller.build').get(req),
            options: {
                cache: {
                    expiresIn: MONTH,
                    privacy: 'public',
                },
                tags: ['api'],
                description: 'Get current running build',
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
                        build: joi.alternatives()
                            .try(joi.string(), joi.number())
                            .required()
                            .description('Build number'),
                    },
                },
            },
        },

        {
            method: 'GET',
            path: '/api/projects/{vcs}/{username}/{project}/build/{build}/dreiguard',
            handler: (req: Request) => container.get<BuildController>('controller.build').getDreiguardDiffReport(req),
            options: {
                cache: {
                    expiresIn: MONTH,
                    privacy: 'public',
                },
                tags: ['api'],
                description: 'Get current running build',
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
                        build: joi.alternatives()
                            .try(joi.string(), joi.number())
                            .required()
                            .description('Build number'),
                    },
                },
            },
        },
        {
            method: 'GET',
            path: '/api/projects/{vcs}/{username}/{project}/build/{build}/dreihouse',
            handler: (req: Request) => container.get<BuildController>('controller.build').getDreihouseData(req),
            options: {
                cache: {
                    expiresIn: MONTH,
                    privacy: 'public',
                },
                tags: ['api'],
                description: 'Get current running build',
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
                        build: joi.alternatives()
                            .try(joi.string(), joi.number())
                            .required()
                            .description('Build number'),
                    },
                },
            },
        },
        {
            method: 'GET',
            path: '/api/projects/{vcs}/{username}/{project}/build/{build}/dreiguard/screenshots',
            handler: (req: Request) => container.get<BuildController>('controller.build').getScreenshots(req),
            options: {
                cache: {
                    expiresIn: MONTH,
                    privacy: 'public',
                },
                tags: ['api'],
                description: 'Get current running build',
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
                        build: joi.alternatives()
                            .try(joi.string(), joi.number())
                            .required()
                            .description('Build number'),
                    },
                },
            },
        },
        {
            method: 'GET',
            path: '/api/projects/{vcs}/{username}/{project}/build/{build}/dreiguard/diffs',
            handler: (req: Request) => container.get<BuildController>('controller.build').getDiffImages(req),
            options: {
                cache: {
                    expiresIn: MONTH,
                    privacy: 'public',
                },
                tags: ['api'],
                description: 'Get current running build',
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
                        build: joi.alternatives()
                            .try(joi.string(), joi.number())
                            .required()
                            .description('Build number'),
                    },
                },
            },
        },

        {
            method: 'GET',
            path: '/api/projects/{vcs}/{username}/{project}/build/latest/artifacts',
            handler: (req: Request) => container.get<BuildController>('controller.build').getArtifacts(req),
            options: {
                tags: ['api'],
                description: 'Get all artifacts for build',
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
                    },
                },
            },
        },

        {
            method: 'GET',
            path: '/api/projects/{vcs}/{username}/{project}/build/{build}/artifacts',
            handler: (req: Request) => container.get<BuildController>('controller.build').getArtifacts(req),
            options: {
                cache: {
                    expiresIn: MONTH,
                    privacy: 'public',
                },
                tags: ['api'],
                description: 'Get all artifacts for build',
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
                        build: joi.alternatives()
                            .try(joi.string(), joi.number())
                            .required()
                            .description('Build number'),
                    },
                },
            },
        },

        {
            method: 'GET',
            path: '/api/projects/{vcs}/{username}/{project}/build/{build}/chartdata',
            handler: (req: Request) => container.get<BuildController>('controller.build').getBuildChartData(req),
            options: {
                cache: {
                    expiresIn: MONTH,
                    privacy: 'public',
                },
                tags: ['api'],
                description: 'Get all chart data for build',
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
                        build: joi.alternatives()
                            .try(joi.string(), joi.number())
                            .required()
                            .description('Build number'),
                    },
                },
            },
        },
    ];
}
