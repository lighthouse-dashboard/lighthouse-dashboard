const { get, compact, forEach } = require('lodash');
const { extname, basename } = require('path');

const { getArtifactsForBuild, getArtifactContent } = require('./api');

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
                    lastBuild: lastSucceededBuild,
                };
            });
    });

    return Promise.all(p)
        .then(data => {
            return compact(data);
        })
        .then(sortFilteredProjects);
}

function sortFilteredProjects(projects) {
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

function getDashboardArtifacts(vcs, username, project, build, token) {
    return getArtifactsForBuild(vcs, username, project, build, token)
        .then(artifacts => {
            return getArtifactsByType('json', artifacts);
        })
        .then(artifacts => {
            return artifacts.filter((item) => {
                if (basename(item.path).indexOf('.dashboard.') !== -1) {
                    return item;
                }
                return null;
            });
        });
}

function getArtifactsForBuilds(builds, vcs, username, project, token) {
    const data = builds.map((item) => {
        return getDashboardArtifacts(vcs, username, project, item.build_num, token)
            .then((artifacts) => {
                return { build_num: item.build_num, artifacts };
            });
    });

    return Promise.all(data);
}

function loadArtifactsContentForBuilds(builds, token) {
    const p = builds.map((item) => {
        return getDashboardContentsByBuild(item.artifacts, token)
            .then((data) => {
                item.artifactContent = data;
                return item;
            });
    });
    return Promise.all(p);
}

function getDashboardContentsByBuild(buildArtifacts, token) {
    return Promise.all(buildArtifacts.map((item) => {
        return getArtifactContent(item.url, token)
            .then((data) => {
                if (!data.key) {
                    data.key = `${ data.tag }:${ data.url }`;
                }
                return data;
            });
    }));
}

function getCategoryObjectFromReportResult(report) {
    let categories = {};

    forEach(report.categories, (category) => {
        categories[category.id] = category.score;
    });

    return categories;
}

module.exports = {
    filterSupportedProjects,
    getArtifactsByType,
    isBuildSupported,
    getArtifactsForBuilds,
    loadArtifactsContentForBuilds,
    getCategoryObjectFromReportResult,
};
