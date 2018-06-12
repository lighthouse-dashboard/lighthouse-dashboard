import {Request} from "hapi";
import {ApplicationState} from "../../Interfaces/ApplicationState";
import ProjectService from "../../Service/ProjectService";

export default class ProjectController {
    projectService: ProjectService;

    constructor(projectService: ProjectService) {
        this.projectService = projectService;
    }

    public async getAll(req: Request) {
        const {branch} = req.params;
        const {token} = <ApplicationState>req.server.app;

        return this.projectService.getAll(branch, token);
    };

    public async invalidateCaches(req: Request) {
        const {branch} = req.params;
        await this.projectService.invalidateProjectsCache(branch);
        return {};
    };

    public getHistory(req: Request) {
        const {vcs, username, project, branch} = req.params;
        const {limit, token} = <ApplicationState>req.server.app;

        return this.projectService.getHistoryData(vcs, username, project, branch, token, limit);
    };
}
