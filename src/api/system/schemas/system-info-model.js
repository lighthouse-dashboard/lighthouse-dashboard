import * as joi from '@hapi/joi';

export const systemInfoModel = joi.object({
    _id: joi.any(),
    worker_last_run: joi.date().optional(),
}).label('system.SystemInfoModel');
