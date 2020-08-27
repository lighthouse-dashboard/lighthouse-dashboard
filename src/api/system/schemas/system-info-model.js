import * as joi from '@hapi/joi';

export const systemInfoModel = joi.object({
    _id: joi.any(),
    last_run: joi.date().optional(),
    is_running: joi.boolean().default(false),
}).label('system.SystemInfoModel');
