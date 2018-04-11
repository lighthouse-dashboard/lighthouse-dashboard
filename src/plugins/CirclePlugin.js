import Vue from 'vue';
import path from 'path';

import sortBuildArtifactsByUrl from './helper';

const API = 'http://localhost:3000';

export default class CirclePlugin {
    constructor(branch, limit) {
        this.branch = branch;
        this.limit = limit;

    }

    static install(_Vue, opts) {
        _Vue.prototype.$circle = new CirclePlugin(opts.branch, opts.limit);
    }

    /**
     * Find all projects that have supported lighthouse artifacts
     * @param token
     * @return {*}
     */
    getAllProjects(branch = this.branch) {
        return Vue.http.get(`${API}/api/projects`)
            .then((resp) => {
                return resp.body;
            })
            .then((projects) => {
                const p = projects.map((project) => {
                    const projectConfig = {
                        vcs: 'github',
                        username: project.username,
                        project: project.reponame,
                    };
                    return this.checkIfProjectIsSupported(projectConfig, branch)
                        .then((isSupported) => {
                            if (!isSupported) {
                                return
                            }
                            return projectConfig
                        })
                });
                return Promise.all(p);
            })
            .then(projects => {
                return projects.filter((item) => {
                    if (item) {
                        return item;
                    }
                })
            })
    }

    /**
     * Check if project is supported
     * @param vcs
     * @param username
     * @param project
     * @param token
     * @return {*}
     */
    checkIfProjectIsSupported(config, branch = this.branch) {
        return this.getLatestBuildInfo(config, branch)
            .then((build) => {
                if (!build) {
                    return [];
                }
                return this.getDashboardArtifacts(config, build.build_num)
            })
            .then(artifacts => {
                if (!artifacts || artifacts.length <= 0) {
                    return false;
                }

                return true;
            })
    }

    /**
     * Get all artifacts for specific build
     * @param vcs
     * @param username
     * @param project
     * @param token
     * @param build
     * @return {*}
     */
    getArtifacts({ vcs, username, project }, build = 'latest') {
        return Vue.http
            .get(
                `${API}/api/projects/${vcs}/${username}/${project}/build/${build}/artifacts`
            )
            .then(resp => {
                return resp.body;
            });
    }

    /**
     * Get latest build
     * @param vcs
     * @param username
     * @param project
     * @param token
     * @return {*}
     */
    getLatestBuildInfo({ vcs, username, project }, branch = this.branch) {
        return Vue.http
            .get(
                `${API}/api/projects/${vcs}/${username}/${project}/branch/${branch}/latest`
            )
            .then(resp => {
                return resp.body.shift();
            });
    }

    /**
     * Get info for given build
     * @param vcs
     * @param username
     * @param project
     * @param token
     * @param build
     * @return {*}
     */
    getBuildInfo({ vcs, username, project }, build, branch = this.branch) {
        if (!build) {
            return this.getLatestBuildInfo({ vcs, username, project }, branch);
        }

        return Vue.http
            .get(
                `${API}/api/projects/${vcs}/${username}/${project}/build/${build}`
            )
            .then(resp => {
                return resp.body;
            });
    }

    /**
     * Check if project has running build
     * @param vcs
     * @param username
     * @param project
     * @param token
     * @return {*}
     */
    hasRunningBuild({ vcs, username, project }, branch = this.branch) {
        return Vue.http
            .get(
                `${API}/api/projects/${vcs}/${username}/${project}/branch/${branch}/running`
            )
            .then(resp => {
                return resp.body.length > 0;
            });
    }

    /**
     * Get all builds for oroject
     * @param vcs
     * @param username
     * @param project
     * @param token
     * @return {*}
     */
    getAllBuilds({ vcs, username, project }, limit = this.limit, branch = this.branch) {
        return Vue.http
            .get(
                `${API}/api/projects/${vcs}/${username}/${project}/branch/${branch}`
            )
            .then(resp => {
                return resp.body;
            });
    }

    /**
     * Get artifacts filtered by type
     * @param type
     * @param vcs
     * @param username
     * @param project
     * @param token
     * @param build
     * @return {*}
     */
    getArtifactsByType(type, { vcs, username, project }, build = 'latest') {
        return this.getArtifacts({ vcs, username, project }, build)
            .then(artifacts => {
                return artifacts.filter(item => {
                    return path.extname(item.path) === `.${type}` ? item : null;
                });
            });
    }

    /**
     * Get artifact content
     * @param url
     * @return {*}
     */
    getArtifact(url) {
        return Vue.http.get(`${API}/api/artifacts?url=${url}`)
            .then((resp) => {
                return resp.body;
            })
    }

    /**
     * Get all json artifacts
     * @param opt
     * @param build
     * @return {*}
     */
    getJsonArtifacts(opt, build = 'latest') {
        return this.getArtifactsByType('json', opt, build);
    }

    /**
     * Get HTML artifacts
     * @param opt
     * @param build
     * @return {*}
     */
    getHtmlArtifacts(opt, build = 'latest') {
        return this.getArtifactsByType('html', opt, build);
    }

    /**
     * Get Dashboard Artifact
     * @param opt
     * @param build
     * @return {*}
     */
    getDashboardArtifacts(opt, build = 'latest') {
        return this.getArtifactsByType('json', opt, build)
            .then(artifacts => {
                return artifacts.filter((item) => {

                    if (path.basename(item.path).indexOf('.dashboard.') !== -1) {
                        return item;
                    }
                });
            });
    }

    /**
     * Get content for dashboard artifacts
     * @param buildArtifacts
     * @param token
     * @return {Promise<[any]>}
     */
    getDashboardContentsByBuild(buildArtifacts) {
        return Promise.all(buildArtifacts.map((item) => {
            return this.getArtifact(item.url)
                .then((data) => {
                    return data;
                })
        }));
    }

    /**
     * To create the history graph we need to fetch all the artifact data and restructure it in this format:
     *
     * - URL1
     *  - scores
     *      - Performance: []
     *      - SEO: []
     *      - ...: []
     *
     *  - builds: []
     * - URL2
     *  - ...
     *
     * @param opt
     * @return {*}
     */
    getAllBuildsWithDashboardArtifacts(opt, limit = this.limit, branch = this.branch) {
        return this.getAllBuilds(opt, limit, branch)
            .then(builds => {
                this.builds = builds;
                const p = builds.map((item) => {
                    return this.getDashboardArtifacts(opt, item.build_num)
                        .then((artifacts) => {
                            return { build_num: item.build_num, artifacts };
                        })
                });
                return Promise.all(p);
            })
            .then((builds) => {
                return builds.sort((item1, item2) => {
                    return item1.build_num > item2.build_num
                })
            })
            .then((builds) => {
                return Promise.all(builds.map((item) => {
                    return this.getDashboardContentsByBuild(item.artifacts, this.token)
                        .then((data) => {
                            item.artifactContent = data;
                            return item;
                        })
                }));
            })
            .then((builds) => {
                return sortBuildArtifactsByUrl(builds);
            })
    }

    /**
     * Sort all projects by it's latest build
     * @param projects
     * @return {Promise<any[]>}
     */
    sortProjectByLatestBuild(projects, branch = this.branch) {
        const p = [];
        for (let i = 0; i < projects.length; i++) {
            const projectConfig = projects[i];
            const {
                vcs,
                username,
                project,
            } = projectConfig;

            p.push(this.getLatestBuildInfo({
                vcs,
                username,
                project,
            }, branch)
                .then(data => {
                    const { stop_time, build_num } = data;
                    projectConfig.buildIdentifier = build_num;
                    return {
                        date: new Date(stop_time),
                        config: projectConfig
                    };
                }));
        }

        return Promise.all(p)
            .then((all) => {
                all = all.sort((a, b) => {
                    return a.date < b.date;
                });
                all = all.map((item) => {
                    return item.config;
                });
                return all;
            });
    }
}
