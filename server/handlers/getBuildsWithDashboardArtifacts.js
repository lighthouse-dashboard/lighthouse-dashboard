const {sortBy} = require('lodash');

const { getBranchBuilds, getDashboardArtifacts, getArtifactContent } = require('../utils');

function getDashboardContentsByBuild(buildArtifacts, token) {
    return Promise.all(buildArtifacts.map((item) => {
        return getArtifactContent(item.url, token)
            .then((data) => {
                return data;
            })
    }));
}


module.exports = async (req, h) => {
    const { vcs, username, project, branch } = req.params;
    const { limit, token } = req.server.app;

    return getBranchBuilds(vcs, username, project, branch, token, limit)
        .then((builds) => {
            const p = builds.map((item) => {
                return getDashboardArtifacts(vcs, username, project, item.build_num, token)
                    .then((artifacts) => {
                        return { build_num: item.build_num, artifacts };
                    })
            });
            return Promise.all(p);
        })
        .then((builds) => {
            return sortBy(builds, ['build_num']);
        })
        .then((builds) => {
            return Promise.all(builds.map((item) => {
                return getDashboardContentsByBuild(item.artifacts, token)
                    .then((data) => {
                        item.artifactContent = data;
                        return item;
                    })
            }));
        })
};
