import {Request} from "hapi";

const { deleteProjectsCache } = require('../utils/utils');

export default async(req: Request) => {
    return await deleteProjectsCache(req.params.branch);
};
