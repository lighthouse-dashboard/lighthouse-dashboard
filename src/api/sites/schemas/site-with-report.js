import joi from '@hapi/joi';
import { reportModel } from '../../reports/schemas/report-model-schema';
import { siteConfigModel } from './site-config-model';

export const siteWithReport = joi.object({
    site: siteConfigModel,
    report: joi.object({
        ...reportModel,
        hasRaw: joi.boolean().required(),
    }),
})
    .label('sites.SiteWithReport');

export const siteWithReportList = joi.array().items(siteWithReport);
