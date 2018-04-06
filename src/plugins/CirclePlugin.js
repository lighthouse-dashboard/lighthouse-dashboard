import Vue from 'vue';
import path from 'path';

export default class CirclePlugin {
    static install(_Vue, opts) {
        _Vue.prototype.$circle = new CirclePlugin();
    }

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

    getLatestBuildInfoForBranch({ vcs, username, project, token }, branch) {
        return Vue.http
            .get(
                `https://circleci.com/api/v1.1/project/${vcs}/${username}/${project}/tree/${branch}?circle-token=${token}&limit=1&filter=completed`
            )
            .then(resp => {
                return resp.body.shift();
            });
    }

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

    getAllBuilds({ vcs, username, project, token }) {
        return Vue.http
            .get(
                `https://circleci.com/api/v1.1/project/${vcs}/${username}/${
                    project
                    }?circle-token=${token}&filter=completed&limit=${Vue.config.buildsLimit}`
            )
            .then(resp => {
                return resp.body;
            });
    }

    getArtifactsByType(type, { vcs, username, project, token }, build = 'latest') {
        return this.getArtifacts(vcs, username, project, token, build)
            .then(artifacts => {
                return artifacts.filter(item => {
                    return path.extname(item.path) === `.${type}` ? item : null;
                });
            });
    }

    getJsonArtifacts(opt, build = 'latest') {
        return this.getArtifactsByType('json', opt, build);
    }

    getHtmlArtifacts(opt, build = 'latest') {
        return this.getArtifactsByType('html', opt, build);
    }

    getDashboardArtifacts(opt, build = 'latest') {
        return this.getArtifactsByType('html', opt, build)
            .then(artifacts => {
                return artifacts.filter((item) => {
                    if (path.basename(item.path).startsWith('dashboard_')) {
                        return item;
                    }
                });
            });
    }

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
