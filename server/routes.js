const joi = require('joi');

const HOUR = 60 * 60 * 1000;
const MONTH = 30 * 24 * HOUR;

module.exports = [
    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'dist',
                index: ['index.html']
            }
        },
        options: {
            auth: false,
            cache: {
                expiresIn: HOUR,
                privacy: 'public'
            }
        }
    },

    {
        method: 'POST',
        path: '/auth/login',
        handler: require('./handlers/postLogin'),
        options: {
            auth: false,
            validate: {
                payload: {
                    password: joi.string().min(6).max(32).required().description('Password')
                }
            },
        }
    },

    {
        method: 'GET',
        path: '/api/artifacts',
        handler: require('./handlers/artifactProxyHandler'),
        options: {
            cache: {
                expiresIn: MONTH,
                privacy: 'public'
            }
        }
    },
    {
        method: 'GET',
        path: '/api/projects/{branch}',
        handler: require('./handlers/getAllProjects'),
    },
    {
        method: 'DELETE',
        path: '/api/projects/{branch}',
        handler: require('./handlers/invalidateProjects'),
    },
    {
        method: 'GET',
        path: '/api/projects/{vcs}/{username}/{project}/branch/{branch}',
        handler: require('./handlers/getBranchBuilds'),
    },
    {
        method: 'GET',
        path: '/api/projects/{vcs}/{username}/{project}/branch/{branch}/latest',
        handler: require('./handlers/getBranchLatestBuildInfo'),
    },
    {
        method: 'GET',
        path: '/api/projects/{vcs}/{username}/{project}/branch/{branch}/running',
        handler: require('./handlers/getBranchRunningBuild'),
    },

    {
        method: 'GET',
        path: '/api/projects/{vcs}/{username}/{project}/build/{build}',
        handler: require('./handlers/getBuildInfo'),
        options: {
            cache: {
                expiresIn: MONTH,
                privacy: 'public'
            }
        }
    },
    {
        method: 'GET',
        path: '/api/projects/{vcs}/{username}/{project}/build/{build}/artifacts',
        handler: require('./handlers/getArtifacts'),
        options: {
            cache: {
                expiresIn: MONTH,
                privacy: 'public'
            }
        }
    },
];
