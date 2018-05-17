import {Request} from 'hapi';

import BuildService from "../service/BuildService";
import {ApplicationState} from "../interfaces/ApplicationState";
import Build from "../interfaces/Build";
import ProjectService from "../service/ProjectService";
import CircleArtifact from "../interfaces/Artifact";
import ArtifactService from "../service/ArtifactService";
import DreiguardService from "../service/DreiguardService";
import DreihouseService from "../service/DreihouseService";

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

    getBranchBuilds = async (req: Request) => {
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

    getBranchTrend = async (req: Request) => {
        const {vcs, username, project, branch} = req.params;
        const {token} = <ApplicationState>req.server.app;
        return await this.projectService.getTrendData(vcs, username, project, branch, token, 10)
    };

    getBuildChartData = async (req: Request) => {
        const {vcs, username, project, build} = req.params;
        const {token} = <ApplicationState>req.server.app;

        return this.dreihouseService.getChartData(vcs, username, project, parseInt(build), token);
    };

    getLatest = async (req: Request) => {
        const {vcs, username, project, branch} = req.params;
        const {token} = <ApplicationState>req.server.app;

        return await this.buildService.getLatestBuilds(vcs, username, project, branch, token, 1, 'completed');
    }

    getRunning = async (req: Request) => {
        const {vcs, username, project, branch} = req.params;
        const {token} = <ApplicationState>req.server.app;

        return await this.buildService.getLatestBuilds(vcs, username, project, branch, token, 1, 'running');
    }

    get = async (req: Request) => {
        const {vcs, username, project, build} = req.params;
        const {token} = <ApplicationState>req.server.app;

        const buildNum = parseInt(build);

        const buildInfo = await this.buildService.getBuild(vcs, username, project, buildNum, token);

        const {build_num, subject, user, build_time_millis, stop_time, status} = buildInfo;
        return {build_num, subject, user, build_time_millis, stop_time, status};
    }

    getArtifacts = async (req: Request) => {
        const {vcs, username, project, build} = req.params;
        const {token} = <ApplicationState>req.server.app;
        const artifacts = await this.artifactService.getArtifactsForBuildNum(parseInt(build), vcs, username, project, token);

        return artifacts.map(({url, path}: CircleArtifact) => {
            return {url, path};
        });
    }

    getDreiguardDiffReport = async (req: Request) => {
        const {vcs, username, project, build} = req.params;
        const {token} = <ApplicationState>req.server.app;

        const buildNum = parseInt(build);

        return await this.dreiguardService.getDiffData(vcs, username, project, buildNum, token);
    }

    getScreenshots = async (req: Request) => {
        const {vcs, username, project, build} = req.params;
        const {token} = <ApplicationState>req.server.app;
        const buildNum = parseInt(build);

        return await this.dreiguardService.getScreenshots(vcs, username, project, buildNum, token);
    }

    getDiffImages = async (req: Request) => {
        const {vcs, username, project, build} = req.params;
        const {token} = <ApplicationState>req.server.app;
        const buildNum = parseInt(build);

        return  await this.dreiguardService.getDiffs(vcs, username, project, buildNum, token);
    }
}
