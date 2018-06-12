import {Request} from 'hapi';

import BuildService from "../../Service/BuildService";
import {ApplicationState} from "../../Interfaces/ApplicationState";
import Build from "../../Interfaces/Build";
import ProjectService from "../../Service/ProjectService";
import CircleArtifact from "../../Interfaces/Artifact";
import ArtifactService from "../../Service/ArtifactService";
import DreiguardService from "../../Service/DreiguardService";
import DreihouseService from "../../Service/DreihouseService";

export default class BuildController {
    buildService: BuildService;
    projectService: ProjectService;
    artifactService: ArtifactService;
    dreiguardService: DreiguardService;
    dreihouseService: DreihouseService;

    constructor(
        projectService: ProjectService,
        buildService: BuildService,
        artifactService: ArtifactService,
        dreiguardService: DreiguardService,
        dreihouseService: DreihouseService) {
        this.projectService = projectService;
        this.buildService = buildService;
        this.artifactService = artifactService;
        this.dreiguardService = dreiguardService;
        this.dreihouseService = dreihouseService;
    }

    public async getBranchBuilds(req: Request) {
        const {vcs, username, project, branch} = req.params;
        const {token, limit} = <ApplicationState>req.server.app;

        const builds = await this.buildService.getLatestBuilds(vcs, username, project, branch, token, limit, 'completed');

        return builds.map((build: Build) => {
            const {build_num} = build; //eslint-disable-line
            return {
                build_num,
            };
        });
    }

    public async getBranchTrend(req: Request) {
        const {vcs, username, project, branch} = req.params;
        const {token} = <ApplicationState>req.server.app;
        return await this.projectService.getTrendData(vcs, username, project, branch, token, 10);
    };

    public async getBuildChartData(req: Request) {
        const {vcs, username, project, build} = req.params;
        const {token} = <ApplicationState>req.server.app;

        return this.dreihouseService.getChartData(vcs, username, project, parseInt(build), token);
    };

    public async getLatest(req: Request) {
        const {vcs, username, project, branch} = req.params;
        const {token} = <ApplicationState>req.server.app;

        return await this.buildService.getLatestBuilds(vcs, username, project, branch, token, 1, 'completed');
    }

    public async getRunning(req: Request) {
        const {vcs, username, project, branch} = req.params;
        const {token} = <ApplicationState>req.server.app;

        return await this.buildService.getLatestBuilds(vcs, username, project, branch, token, 1, 'running');
    }

    public async get(req: Request) {
        const {vcs, username, project, build} = req.params;
        const {token} = <ApplicationState>req.server.app;

        const buildNum = parseInt(build);

        const buildInfo = await this.buildService.getBuild(vcs, username, project, buildNum, token);

        const {build_num, subject, user, build_time_millis, stop_time, status} = buildInfo;
        return {build_num, subject, user, build_time_millis, stop_time, status};
    }

    public async getArtifacts(req: Request) {
        const {vcs, username, project, build} = req.params;
        const {token} = <ApplicationState>req.server.app;
        const artifacts = await this.artifactService.getArtifactsForBuildNum(parseInt(build), vcs, username, project, token);

        return artifacts.map(({url, path}: CircleArtifact) => {
            return {url, path};
        });
    }

    public async getDreihouseData(req: Request) {
        const {vcs, username, project, build} = req.params;
        const {token} = <ApplicationState>req.server.app;

        const buildNum = parseInt(build);

        return await this.dreihouseService.getData(vcs, username, project, buildNum, token);
    }

    public async getDreiguardDiffReport(req: Request) {
        const {vcs, username, project, build} = req.params;
        const {token} = <ApplicationState>req.server.app;

        const buildNum = parseInt(build);

        return await this.dreiguardService.getDiffData(vcs, username, project, buildNum, token);
    }

    public async getScreenshots(req: Request) {
        const {vcs, username, project, build} = req.params;
        const {token} = <ApplicationState>req.server.app;
        const buildNum = parseInt(build);

        return await this.dreiguardService.getScreenshots(vcs, username, project, buildNum, token);
    }

    public async getDiffImages(req: Request) {
        const {vcs, username, project, build} = req.params;
        const {token} = <ApplicationState>req.server.app;
        const buildNum = parseInt(build);

        return await this.dreiguardService.getDiffs(vcs, username, project, buildNum, token);
    }
}
