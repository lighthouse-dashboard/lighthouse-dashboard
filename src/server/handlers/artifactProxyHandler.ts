import {Request} from "hapi";
import {ApplicationState} from "../Interfaces";

const {getArtifact} = require('../utils/utils');

export default async (req: Request) => {
    const query: any = req.query;
    const url: string = query['url'];

    const {token} = <ApplicationState>req.server.app;

    return await getArtifact(url, token);
};
