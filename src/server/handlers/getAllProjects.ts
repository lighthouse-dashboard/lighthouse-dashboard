import { ApplicationState } from "../Interfaces";
import { Request } from "hapi";

import {getProjects} from '../services/project'

export default async (req: Request) => {
    const { branch } = req.params;
    const { token } = <ApplicationState>req.server.app;

    return getProjects(branch, token);
};
