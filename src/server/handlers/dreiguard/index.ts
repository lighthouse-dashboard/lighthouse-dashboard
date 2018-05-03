import {Request} from "hapi";


import {ApplicationState} from "../../interfaces/ApplicationState";
import * as dreiguardService from "../../services/dreiguard";

export async function getDiffData(req: Request) {
    const {vcs, username, project, build} = req.params;
    const {token} = <ApplicationState>req.server.app;

    const buildNum = parseInt(build);

    return await dreiguardService.getDiffData(vcs, username, project, buildNum, token);
}

export async function getScreenshots(req: Request) {
    const {vcs, username, project, build} = req.params;
    const {token} = <ApplicationState>req.server.app;
    const buildNum = parseInt(build);

    const images = await dreiguardService.getScreenshots(vcs, username, project, buildNum, token);
    return images;

}

export async function getDiffImages(req: Request) {
    const {vcs, username, project, build} = req.params;
    const {token} = <ApplicationState>req.server.app;
    const buildNum = parseInt(build);

    const images = await dreiguardService.getDiffs(vcs, username, project, buildNum, token);
    return images;

}
