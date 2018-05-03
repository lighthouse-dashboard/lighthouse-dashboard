import {Request} from "hapi";

import * as buildService from '../../services/build'
import {getTrendData} from "../../services/project";
import {ApplicationState} from "../../interfaces/ApplicationState";
import Build from "../../interfaces/Build";
import * as dreiguardService from '../../services/dreiguard';

export async function getBranchBuilds(req: Request) {
    const {vcs, username, project, branch} = req.params;
    const {token, limit} = <ApplicationState>req.server.app;

    const builds = await buildService.getLatestBuilds(vcs, username, project, branch, token, limit, 'completed');

    return builds.map((build: Build) => {
        const {build_num} = build; //eslint-disable-line
        return {
            build_num,
        };
    });
};

export async function getBranchTrend(req: Request) {
    const {vcs, username, project, branch} = req.params;
    const {token} = <ApplicationState>req.server.app;

    return await getTrendData(vcs, username, project, branch, token, 10)
};

export async function getLatestBuilds(req: Request) {
    const {vcs, username, project, branch} = req.params;
    const {token} = <ApplicationState>req.server.app;

    return await buildService.getLatestBuilds(vcs, username, project, branch, token, 1, 'completed');
};

export async function getRunningBuild(req: Request) {
    const {vcs, username, project, branch} = req.params;
    const {token} = <ApplicationState>req.server.app;

    return await buildService.getLatestBuilds(vcs, username, project, branch, token, 1, 'running');
};


export async function getBuildChartData(req: Request) {
    const {vcs, username, project, build} = req.params;
    const {token} = <ApplicationState>req.server.app;

    return buildService.getChartData(vcs, username, project, parseInt(build), token);
};

export async function getBuildInfo(req: Request) {
    const {vcs, username, project, build} = req.params;
    const {token} = <ApplicationState>req.server.app;

    const buildNum = parseInt(build);

    const buildInfo = await buildService.getBuild(vcs, username, project, buildNum, token);

    const {build_num, subject, user, build_time_millis, stop_time, status} = buildInfo;
    return {build_num, subject, user, build_time_millis, stop_time, status};
};

export async function getDreiguard(req: Request) {
    const {vcs, username, project, build} = req.params;
    const {token} = <ApplicationState>req.server.app;

    const buildNum = parseInt(build);

    return await dreiguardService.getDiffData(vcs, username, project, buildNum, token);
}

export async function getDreiguardScreenshots(req: Request) {
    const {vcs, username, project, build} = req.params;
    const {token} = <ApplicationState>req.server.app;
    const buildNum = parseInt(build);

    const images = await dreiguardService.getScreenshots(vcs, username, project, buildNum, token);
    return images;

}

export async function getDreiguardDiffs(req: Request) {
    const {vcs, username, project, build} = req.params;
    const {token} = <ApplicationState>req.server.app;
    const buildNum = parseInt(build);

    const images = await dreiguardService.getDiffs(vcs, username, project, buildNum, token);
    return images;

}
