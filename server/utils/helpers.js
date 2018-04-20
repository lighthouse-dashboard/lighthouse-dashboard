const { get, compact } = require('lodash');
const { extname } = require('path');

const { getArtifactsForBuild } = require('./api');

function filterSupportedProjects(projects, branch, token) {
    const p = projects.map((project) => {
        if (!get(project, `branches.${ branch }.last_success.build_num`)) {
            return null;
        }

        const lastSucceededBuild = project.branches[branch].last_success;

        return isBuildSupported('github', project.username, project.reponame, lastSucceededBuild.build_num, token)
            .then((isSupported) => {
                if (!isSupported) {
                    return null;
                }

                return {
                    vcs: 'github',
                    username: project.username,
                    project: project.reponame,
                    lastBuild: lastSucceededBuild
                };
            });
    });

    return Promise.all(p)
        .then(data => {
            return compact(data);
        })
        .then( sortFilteredProjects );
}

function sortFilteredProjects(projects){
    return projects.sort((projectA, projectB) => {
        const timeA = new Date(projectA.lastBuild.stop_time);
        const timeB = new Date(projectB.lastBuild.stop_time);
        return timeA <= timeB;
    });
}

function isBuildSupported(vcs, username, project, build, token) {
    return getArtifactsForBuild(vcs, username, project, build, token)
        .then(artifacts => {
            return getArtifactsByType('json', artifacts);
        })
        .then(artifacts => {
            return !(!artifacts || artifacts.length <= 0);
        });
}


function getArtifactsByType(type, artifacts) {
    return Promise.resolve(artifacts.filter(item => {
        return extname(item.path) === `.${ type }` ? item : null;
    }));
}


module.exports = {
    filterSupportedProjects,
    getArtifactsByType,
    isBuildSupported,
};
