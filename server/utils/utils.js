const { getListOfProjects } = require('./api');
const { filterSupportedProjects } = require('./helpers');

function getProjects(branch, token) {
    return getListOfProjects(branch, token)
        .then((projects) => {
            return filterSupportedProjects(projects, branch, token);
        });
}


module.exports = {
    getProjects,
};
