import {Request, RequestQuery} from "hapi";
import {ApplicationState, TaggedBuildDataInterface, TaggedBuildDataSeriesInterface} from "../Interfaces";

const {getProjectTrendData} = require('../utils/utils');

export default async (req: Request) => {
    const {vcs, username, project, branch} = req.params;
    const category = <string>(<RequestQuery>req.query)['category'];
    const {token} = <ApplicationState>req.server.app;

    return getProjectTrendData(vcs, username, project, branch, token)
        .then((trend: TaggedBuildDataInterface) => {
            if (!category) {
                return trend;
            }

            let res: {
                [key: string]: TaggedBuildDataSeriesInterface;
            } = {};
            res[category] = trend[category];
            return res;
        });
};
