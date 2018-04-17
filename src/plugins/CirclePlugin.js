import Vue from 'vue';
import path from 'path';

import sortBuildArtifactsByUrl from './helper';


export default class CirclePlugin {
    constructor(api, branch) {
        this.branch = branch;
        this.endpoint = api

    }

    static install(_Vue, opts) {
        _Vue.prototype.$circle = new CirclePlugin(opts.api, opts.branch);
    }

    /**
     * Find all projects that have supported lighthouse artifacts
     * @return {*}
     * @param branch
     */
    getAllProjects(branch = this.branch) {
        return Vue.http.get(`${this.endpoint}/api/projects/${branch}`)
            .then((resp) => {
                return resp.body;
            })
    }

    /**
     * Invalidate projects cache
     * @return {*}
     * @param branch
     */
    invalidateProjectsCache(branch = this.branch) {
        return Vue.http.delete(`${this.endpoint}/api/projects/${branch}`)
            .then((resp) => {
                return resp.body;
            })
    }

    /**
     * Get all artifacts for specific build
     * @param {string} vcs
     * @param {string} username
     * @param {string} project
     * @param {string} build
     * @return {*}
     */
    getArtifacts(vcs, username, project, build = 'latest') {
        return Vue.http
            .get(
                `${this.endpoint}/api/projects/${vcs}/${username}/${project}/build/${build}/artifacts`
            )
            .then(resp => {
                return resp.body;
            });
    }

    /**
     * Get latest build
     *
     * @param {string} vcs
     * @param {string} username
     * @param {string} project
     * @param {string} branch
     * @return {*}
     */
    getLatestBuildInfo(vcs, username, project, branch = this.branch) {
        return Vue.http
            .get(
                `${this.endpoint}/api/projects/${vcs}/${username}/${project}/branch/${branch}/latest`
            )
            .then(resp => {
                return resp.body.shift();
            });
    }

    /**
     * Get info for given build
     *
     * @param {string} vcs
     * @param {string} username
     * @param {string} project
     * @param {string|number} build
     * @param {string} branch
     * @return {*}
     */
    getBuildInfo(vcs, username, project, build, branch = this.branch) {
        if (!build) {
            return this.getLatestBuildInfo(vcs, username, project, branch);
        }

        return Vue.http
            .get(
                `${this.endpoint}/api/projects/${vcs}/${username}/${project}/build/${build}`
            )
            .then(resp => {
                return resp.body;
            });
    }

    /**
     * Check if project has running build
     *
     * @param {string} vcs
     * @param {string} username
     * @param {string} project
     * @param {string} branch
     * @return {*}
     */
    hasRunningBuild(vcs, username, project, branch = this.branch) {
        return Vue.http
            .get(
                `${this.endpoint}/api/projects/${vcs}/${username}/${project}/branch/${branch}/running`
            )
            .then(resp => {
                return resp.body.length > 0;
            });
    }

    /**
     * Get all builds for project
     *
     * @param {string} vcs
     * @param {string} username
     * @param {string} project
     * @param {string} branch
     * @return {*}
     */
    getAllBuilds(vcs, username, project, branch = this.branch) {
        return Vue.http
            .get(
                `${this.endpoint}/api/projects/${vcs}/${username}/${project}/branch/${branch}`
            )
            .then(resp => {
                return resp.body;
            });
    }

    /**
     * Get artifacts filtered by type
     *
     * @param {string} vcs
     * @param {string} username
     * @param {string} project
     * @param {string|number} build
     * @return {*}
     */
    getArtifactsByType(type, vcs, username, project, build = 'latest') {
        return this.getArtifacts(vcs, username, project, build)
            .then(artifacts => {
                return artifacts.filter(item => {
                    return path.extname(item.path) === `.${type}` ? item : null;
                });
            });
    }

    /**
     * Get artifact content
     * @param {string} url
     * @return {*}
     */
    getArtifact(url) {
        return Vue.http.get(`${this.endpoint}/api/artifact?url=${url}`)
            .then((resp) => {
                return resp.body;
            })
    }

    /**
     * Get HTML artifacts
     *
     * @param {string} vcs
     * @param {string} username
     * @param {string} project
     * @param {string|number} build
     * @return {*}
     */
    getHtmlArtifacts(vcs, username, project, build = 'latest') {
        return this.getArtifactsByType('html', vcs, username, project, build);
    }

    /**
     * Get Dashboard Artifact
     *
     * @param {string} vcs
     * @param {string} username
     * @param {string} project
     * @param {string|number} build
     * @return {*}
     */
    getDashboardArtifacts(vcs, username, project, build = 'latest') {
        return this.getArtifactsByType('json', vcs, username, project, build)
            .then(artifacts => {
                return artifacts.filter((item) => {

                    if (path.basename(item.path).indexOf('.dashboard.') !== -1) {
                        return item;
                    }
                });
            });
    }

    /**
     * To create the history graph we need to fetch all the artifact data
     * @param {string} vcs
     * @param {string} username
     * @param {string} project
     * @param {string} branch
     * @return {*}
     */
    getAllBuildsWithDashboardArtifacts(vcs, username, project, branch = this.branch) {
        return Vue.http
            .get(
                `${this.endpoint}/api/projects/${vcs}/${username}/${project}/branch/${branch}/dashboardartifacts`
            )
            .then(resp => {
                return resp.body;
            })
            .then((builds) => {
                return sortBuildArtifactsByUrl(builds);
            })
    }

    /**
     *
     * Check if the project has reached the budget
     *
     * @param {string} vcs
     * @param {string} username
     * @param {string} project
     * @param {string} branch
     * @return {*}
     */
    hasAllartifactsReachedBudget(vcs, username, project, build = 'latest') {
        return this.getDashboardArtifacts(vcs, username, project, build)
            .then((artifacts) => {
                return Promise.all(artifacts.map((artifact) => {
                    return this.getArtifact(artifact.url)
                }))
            })
            .then((artifacts) => {
                return Promise.all(artifacts.filter((artifact) => {
                    const { categories, budget } = artifact;
                    const keys = Object.keys(categories);
                    for (let i = 0; i < keys.length; i++) {
                        const key = keys[i];
                        const { id, score } = categories[key];

                        if (budget[id] && score < budget[id]) {
                            return artifact
                        }
                    }
                }));
            })
            .then((reports) => {
                return (reports.length === 0)
            })
    }
}
