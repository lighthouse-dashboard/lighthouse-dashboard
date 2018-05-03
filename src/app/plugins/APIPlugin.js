import Vue from 'vue';


export default class APIPlugin {
    constructor(api, branch) {
        this.branch = branch;
        this.endpoint = api

    }

    static install(_Vue, opts) {
        _Vue.prototype.$api = new APIPlugin(opts.api, opts.branch);
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
     * @param {string} branch
     * @return {*}
     */
    getLatestBuilds(vcs, username, project, branch = this.branch) {
        return Vue.http
            .get(
                `${this.endpoint}/api/projects/${vcs}/${username}/${project}/branch/${branch}/latest`
            )
            .then(resp => {
                return resp.body;
            });
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
     * Get info for given build
     *
     * @param {string} vcs
     * @param {string} username
     * @param {string} project
     * @param {string|number} build
     * @return {*}
     */
    getBuildInfo(vcs, username, project, build) {
        return Vue.http
            .get(
                `${this.endpoint}/api/projects/${vcs}/${username}/${project}/build/${build}`
            )
            .then(resp => {
                return resp.body;
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
    getBuildChartDataInfo(vcs, username, project, build) {
        return Vue.http
            .get(
                `${this.endpoint}/api/projects/${vcs}/${username}/${project}/build/${build}/chartdata`
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
     * To create the history graph we need to fetch all the artifact data
     * @param {string} vcs
     * @param {string} username
     * @param {string} project
     * @param {string} branch
     * @return {*}
     */
    getProjectHistoryData(vcs, username, project, branch = this.branch) {
        return Vue.http
            .get(
                `${this.endpoint}/api/projects/${vcs}/${username}/${project}/branch/${branch}/history`
            )
            .then(resp => {
                return resp.body;
            })
    }

    /**
     * To create the history graph we need to fetch all the artifact data
     * @param {string} vcs
     * @param {string} username
     * @param {string} project
     * @param {string} branch
     * @param {string|null} category
     * @return {*}
     */
    getProjectTrend(vcs, username, project, branch = this.branch, category = null) {
        return Vue.http
            .get(
                `${this.endpoint}/api/projects/${vcs}/${username}/${project}/branch/${branch}/trending`
            )
            .then(resp => {
                return resp.body;
            });
    }

    getVersion() {
        return Vue.http
            .get(
                `${this.endpoint}/api/version`
            )
            .then(resp => {
                const data = resp.body;
                return data.version;
            });
    }

    getDreiguardData(vcs, username, project, buildNum) {
        return Vue.http
            .get(
                `${this.endpoint}/api/projects/${vcs}/${username}/${project}/build/${buildNum}/dreiguard`
            )
            .then(resp => {
                return resp.body;
            });
    }

    getDreiguardImagesData(vcs, username, project, buildNum) {
        return Vue.http
            .get(
                `${this.endpoint}/api/projects/${vcs}/${username}/${project}/build/${buildNum}/dreiguard/screenshots`
            )
            .then(resp => {
                return resp.body;
            });
    }

}
