import {Request} from "hapi";

const { deleteProjectsCache } = require('../utils/utils');

export default async(req: Request) => {
    await deleteProjectsCache(req.params.branch);
    return {};
};
