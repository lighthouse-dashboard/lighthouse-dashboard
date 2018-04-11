module.exports = [
    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'dist',
                index: ['index.html']
            }
        }
    },

    {
        method: 'GET',
        path: '/api/artifacts',
        handler: require('./handlers/artifactProxyHandler'),
    },
    {
        method: 'GET',
        path: '/api/projects',
        handler: require('./handlers/getAllProjects'),
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
    },
    {
        method: 'GET',
        path: '/api/projects/{vcs}/{username}/{project}/build/{build}/artifacts',
        handler: require('./handlers/getArtifacts'),
    },
];
