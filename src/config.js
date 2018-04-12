module.exports = {
    buildStatusInterval: 1000 * 15,
    refreshInterval: 1000 * 60,
    dateFormat: 'DD-MM-YYYY HH:mm:SS',
    layout: 'list',
    defaultBranch: 'master',
    selectableBranches : ['develop', 'master'],
    apiEndpoint : process.env.API_ENDPOINT
};
