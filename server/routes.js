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
        config: {
            auth: {
                strategy: 'basic',
            }
        },
    },

    {
        method: 'GET',
        path: '/api/artifacts',
        handler: require('./handlers/artifactProxyHandler'),
        config: {
            auth: {
                strategy: 'basic',
            }
        },
    },
    {
        method: 'GET',
        path: '/api/projects',
        handler: require('./handlers/getAllProjects'),
        config: {
            auth: {
                strategy: 'basic',
            }
        },
    },
    {
        method: 'GET',
        path: '/api/projects/{vcs}/{username}/{project}/branch/{branch}',
        handler: require('./handlers/getBranchBuilds'),
        config: {
            auth: {
                strategy: 'basic',
            }
        },
    },
    {
        method: 'GET',
        path: '/api/projects/{vcs}/{username}/{project}/branch/{branch}/latest',
        handler: require('./handlers/getBranchLatestBuildInfo'),
        config: {
            auth: {
                strategy: 'basic',
            }
        },
    },
    {
        method: 'GET',
        path: '/api/projects/{vcs}/{username}/{project}/branch/{branch}/running',
        handler: require('./handlers/getBranchRunningBuild'),
        config: {
            auth: {
                strategy: 'basic',
            }
        },
    },

    {
        method: 'GET',
        path: '/api/projects/{vcs}/{username}/{project}/build/{build}',
        handler: require('./handlers/getBuildInfo'),
        config: {
            auth: {
                strategy: 'basic',
            }
        },
    },
    {
        method: 'GET',
        path: '/api/projects/{vcs}/{username}/{project}/build/{build}/artifacts',
        handler: require('./handlers/getArtifacts'),
        config: {
            auth: {
                strategy: 'basic',
            }
        },
    },
];
