import Vue from 'vue';
import path from 'path';

export default class CirclePlugin {
    static install(_Vue, opts) {
        _Vue.prototype.$circle = new CirclePlugin();
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
        if(!build){
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

    getArtifactsByType(type, { vcs, username, project, token }, build = 'latest') {
        return this.getArtifacts(vcs, username, project, token, build)
            .then(artifacts => {
                return artifacts.filter(item => {
                    return path.extname(item.path) === `.${type}` ? item : null;
                });
            });
    }

    getJsonArtifacts(opt, build= 'latest') {
        return this.getArtifactsByType('json', opt, build);
    }

    getHtmlArtifacts(opt, build= 'latest') {
        return this.getArtifactsByType('html', opt, build);
    }

    getDashboardArtifacts(opt, build= 'latest') {
        return this.getArtifactsByType('html', opt, build)
            .then(artifacts => {
                return artifacts.filter((item) => {
                    if (path.basename(item.path).startsWith('dashboard_')) {
                        return item;
                    }
                });
            });
    }
}
