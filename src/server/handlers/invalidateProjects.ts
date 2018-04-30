import { Request } from "hapi";

const { deleteProjectsCache } = require('../utils');

export default async (req: Request) => {
    await deleteProjectsCache(req.params.branch);
    return {};
};
