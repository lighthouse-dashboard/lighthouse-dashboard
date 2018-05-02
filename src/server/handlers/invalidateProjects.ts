import { Request } from "hapi";

import { deleteProjectsCache } from '../services/project';

export default async (req: Request) => {
    await deleteProjectsCache(req.params.branch);
    return {};
};
