import {ServerRoute} from "hapi";
import ServiceContainer from 'servicecontainer';
const joi = require('joi');

import ProjectController from "./controller/ProjectController";
import BuildController from "./controller/BuildController";
import LoginController from "./controller/LoginController";
import VersionController from "./controller/VersionController";

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const MONTH = 30 * 24 * HOUR;

export default function () {
    const container = ServiceContainer.get();
    if (!container) {
        throw new Error('Container not created');
    }

    const ROUTES: ServerRoute[] = [
        {
            method: 'POST',
            path: '/auth/login',
            handler: container.get<LoginController>('controller.login').login,
            options: {
                auth: false,
                validate: {
                    payload: {
                        password: joi.string().min(6)
                            .max(32)
                            .required()
                            .description('Password'),
                    },
                },
            },
        },
        {
            method: 'GET',
            path: '/api/version',
            handler: container.get<VersionController>('controller.version').getVersion,
            options: {
                cache: {
                    expiresIn: HOUR,
                    privacy: 'public',
                },
                tags: ['api'],
                description: 'Get the current api version',
                validate: {
                    query: {
                        access_token: joi.string()
                            .description('API Secret. Can also be passed as Bearer token'),
                    },
                },
            },
        },
        {
            method: 'GET',
            path: '/api/projects/{branch}',
            handler: container.get<ProjectController>('controller.project').getAll,
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
            handler: container.get<ProjectController>('controller.project').invalidateCaches,
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
            path: '/api/projects/{vcs}/{username}/{project}/branch/{branch}',
            handler: container.get<BuildController>('controller.build').getBranchBuilds,
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
            handler: container.get<BuildController>('controller.build').getBranchTrend,
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
            handler: container.get<BuildController>('controller.build').getLatest,
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
            handler: container.get<BuildController>('controller.build').getRunning,
            options: {
                cache: {
                    expiresIn: MINUTE,
                    privacy: 'public'
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
            path: '/api/projects/{vcs}/{username}/{project}/branch/{branch}/history',
            handler: container.get<ProjectController>('controller.project').getHistory,
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

        {
            method: 'GET',
            path: '/api/projects/{vcs}/{username}/{project}/build/{build}',
            handler: container.get<BuildController>('controller.build').get,
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
            handler: container.get<BuildController>('controller.build').getDreiguardDiffReport,
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
            handler: container.get<BuildController>('controller.build').getScreenshots,
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
            handler: container.get<BuildController>('controller.build').getDiffImages,
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
            handler: container.get<BuildController>('controller.build').getArtifacts,
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
            handler: container.get<BuildController>('controller.build').getArtifacts,
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
            handler: container.get<BuildController>('controller.build').getBuildChartData,
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

        {
            method: 'GET',
            path: '/{param*}',
            handler: {
                directory: {
                    path: '../dist/app',
                    index: ['index.html'],
                },
            },
            options: {
                auth: false,
            },
        },
    ];

    return ROUTES;
}
