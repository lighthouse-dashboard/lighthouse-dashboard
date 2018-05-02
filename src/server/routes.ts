import {ServerRoute} from "hapi";

const joi = require('joi');

import * as project from './handlers/project';
import * as build from './handlers/build';
import * as artifact from './handlers/artifact';
import * as misc from './handlers/misc';
import * as login from './handlers/login';

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const MONTH = 30 * 24 * HOUR;

const ROUTES: ServerRoute[] = [
    {
        method: 'POST',
        path: '/auth/login',
        handler: login.login,
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
        handler: misc.getVersion,
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
        handler: project.getAllProjects,
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
        handler: project.invalidateCache,
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
        handler: build.getBranchBuilds,
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
        handler: build.getBranchTrend,
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
        handler: build.getLatestBuilds,
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
        handler: build.getRunningBuild,
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
        handler: project.getHistory,
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
        handler: build.getBuildInfo,
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
        handler: build.getDreiguard,
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
        handler: artifact.getArtifacts,
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
        handler: artifact.getArtifacts,
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
        handler: build.getBuildChartData,
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

export default ROUTES;
