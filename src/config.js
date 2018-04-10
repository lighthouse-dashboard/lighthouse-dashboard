module.exports = {
    refreshInterval: 1000 * 15,
    buildsLimit: 5,
    dateFormat: 'DD-MM-YYYY HH:mm:SS',
    layout: 'list',
    defaultBranch: 'master',
    circleToken: process.env.CIRCLE_TOKEN.toString()
};
