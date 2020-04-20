import joi from '@hapi/joi';
import { reportModel } from '../../reports/schemas/report-model';
import { siteConfigModel } from './site-config-model';

export const siteWithReport = joi.object({
    site: siteConfigModel,
    report: reportModel,
})
    .label('sites.SiteWithReport');

export const siteWithReportList = joi.array().items(siteWithReport);
