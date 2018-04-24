module.exports = {
    buildStatusInterval: 1000 * 60,
    refreshInterval: 1000 * 60,
    dateFormat: 'YYYY-MM-DD HH:mm:SS',
    dateShortFormat: 'MM/DD HH:mm',
    layout: 'list',
    defaultBranch: 'master',
    selectableBranches: ['develop', 'master'],
    apiEndpoint: process.env.API_ENDPOINT,
    chartColors: ["#607D8B", "#66bb6a"]
};
