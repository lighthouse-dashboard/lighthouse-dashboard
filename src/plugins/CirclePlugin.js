import Vue from 'vue';
import path from 'path';

import sortBuildArtifactsByUrl from './helper';

export default class CirclePlugin {
    static install(_Vue, opts) {
        _Vue.prototype.$circle = new CirclePlugin();
    }

    /**
     * Find all projects that have supported lighthouse artifacts
     * @param token
     * @return {*}
     */
    getAllProjects(token) {
        return Vue.http.get(`https://circleci.com/api/v1.1/projects?circle-token=${token}`)
            .then((resp) => {
                return resp.body;
            })
            .then((projects) => {
                const p = projects.map((project) => {
                    const projectConfig = {
                        vcs: 'github',
                        username: project.username,
                        project: project.reponame,
                        token
                    };
                    return this.checkIfProjectIsSupported(projectConfig)
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
    checkIfProjectIsSupported({ vcs, username, project, token }) {
        return this.getLatestBuildInfoForBranch({ vcs, username, project, token }, Vue.config.defaultBranch)
            .then((build) => {
                if (!build) {
                    return [];
                }
                return this.getDashboardArtifacts({ vcs, username, project, token }, build.build_num)
            })
            .then(artifacts => {
                if (!artifacts || artifacts.length <= 0) {
                    return false;
                }

                return true;
            })
    }

    /**
     * Get last build for given branch
     * @param vcs
     * @param username
     * @param project
     * @param token
     * @param branch
     * @return {*}
     */
    getLatestBuildInfoForBranch({ vcs, username, project, token }, branch) {
        return Vue.http
            .get(
                `https://circleci.com/api/v1.1/project/${vcs}/${username}/${project}/tree/${branch}?circle-token=${token}&limit=1&filter=completed`
            )
            .then(resp => {
                return resp.body.shift();
            });
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
    getArtifacts(vcs, username, project, token, build = 'latest') {
        return Vue.http
            .get(
                `https://circleci.com/api/v1.1/project/${vcs}/${username}/${
                    project
                    }/${build}/artifacts?circle-token=${token}&filter=completed`
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
    getLatestBuildInfo({ vcs, username, project, token }) {
        return Vue.http
            .get(
                `https://circleci.com/api/v1.1/project/${vcs}/${username}/${
                    project
                    }?circle-token=${token}&limit=1&filter=completed`
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
    getBuildInfo({ vcs, username, project, token }, build) {
        if (!build) {
            return this.getLatestBuildInfo({ vcs, username, project, token });
        }

        return Vue.http
            .get(
                `https://circleci.com/api/v1.1/project/${vcs}/${username}/${
                    project
                    }/${build}?circle-token=${token}`
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
    hasRunningBuild({ vcs, username, project, token }) {
        return Vue.http
            .get(
                `https://circleci.com/api/v1.1/project/${vcs}/${username}/${
                    project
                    }?circle-token=${token}&filter=running`
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
    getAllBuilds({ vcs, username, project, token }, limit= Vue.config.buildsLimit) {
        return Vue.http
            .get(
                `https://circleci.com/api/v1.1/project/${vcs}/${username}/${
                    project
                    }?circle-token=${token}&filter=completed&limit=${limit}`
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
    getArtifactsByType(type, { vcs, username, project, token }, build = 'latest') {
        return this.getArtifacts(vcs, username, project, token, build)
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
    getArtifact(url, token = '') {
        return Vue.http.get(`http://localhost:3000/artifacts?url=${url}&circle-token=${token}`)
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
    getDashboardContentsByBuild(buildArtifacts, token) {
        return Promise.all(buildArtifacts.map((item) => {
            return this.getArtifact(item.url, token)
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
    getAllBuildsWithDashboardArtifacts(opt) {
        return this.getAllBuilds(opt, 10)
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
            .then( (builds) => {
                return builds.sort((item1, item2) => {
                    return item1.build_num > item2.build_num
                })
            })
            .then((builds) => {
                return Promise.all(builds.map((item) => {
                    return this.getDashboardContentsByBuild(item.artifacts, opt.token)
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
    sortProjectByLatestBuild(projects) {
        const p = [];
        for (let i = 0; i < projects.length; i++) {
            const projectConfig = projects[i];
            const {
                vcs,
                username,
                project,
                token
            } = projectConfig;

            p.push(this.getLatestBuildInfo({
                vcs,
                username,
                project,
                token
            })
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
