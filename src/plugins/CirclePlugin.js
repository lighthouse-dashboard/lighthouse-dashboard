import Vue from 'vue';
import path from 'path';

export default class CirclePlugin {
    static install(_Vue, opts) {
        _Vue.prototype.$circle = new CirclePlugin();
    }

    getArtifacts(vcs, username, project, token) {
        return Vue.http
            .get(
                `https://circleci.com/api/v1.1/project/${vcs}/${username}/${
                project
                }/latest/artifacts?circle-token=${token}&filter=completed`
            )
            .then(resp => {
                return resp.body;
            });
    }

    getBuildInfo({ vcs, username, project, token }) {
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

            p.push(this.getBuildInfo({
                vcs,
                username,
                project,
                token
            })
                .then(data => {
                    const { stop_time, vcs_revision } = data;
                    projectConfig.vcs_revision = vcs_revision;
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

    getArtifactsByType(type, { vcs, username, project, token }) {
        return this.getArtifacts(vcs, username, project, token)
            .then(artifacts => {
                return artifacts.filter(item => {
                    return path.extname(item.path) === `.${type}` ? item : null;
                });
            });
    }

    getJsonArtifacts(opt) {
        return this.getArtifactsByType('json', opt);
    }

    getHtmlArtifacts(opt) {
        return this.getArtifactsByType('html', opt);
    }

    getDashboardArtifacts(opt) {
        return this.getArtifactsByType('html', opt)
            .then(artifacts => {
                return artifacts.filter((item) => {
                    if (path.basename(item.path).startsWith('dashboard_')) {
                        return item;
                    }
                });
            });
    }
}
