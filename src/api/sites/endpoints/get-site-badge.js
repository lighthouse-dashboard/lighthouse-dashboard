import Boom from '@hapi/boom';
import joi from '@hapi/joi';
import nodeHtmlToImage from 'node-html-to-image';
import { getLatestReportBySiteId } from '../../../../lib/shared/services/report-service';
import { getSiteConfigById } from '../../../../lib/shared/services/site-service';
import { LONG } from '../../../config/cache';
import { getReportValueScoreByKey } from '../../../utils/get-report-value-score-by-key';
import renderTemplate from '../../../utils/render-template';

/**
 * Get site by id controller
 * @param {object} params
 * @return {Promise<Sites.SiteModel|Boom<null>>}
 */
async function getSiteBadge({ params, query }, h) {
    const { id } = params;
    const { type } = query;
    const site = await getSiteConfigById(id);
    const latestReport = await getLatestReportBySiteId(id);

    const values = {
        performance: getReportValueScoreByKey(latestReport.values, 'performance'),
        accessibility: getReportValueScoreByKey(latestReport.values, 'accessibility'),
        seo: getReportValueScoreByKey(latestReport.values, 'seo'),
        pwa: getReportValueScoreByKey(latestReport.values, 'pwa'),
        bestPractices: getReportValueScoreByKey(latestReport.values, 'best-practices'),
    };

    const html = await renderTemplate('./templates/views/badge.twig', { site, values, report: latestReport });

    return h.response(html)
        .encoding('binary')
        .header('Content-type', `image/svg+xml`)
        .header('Content-disposition', `attachment; filename=${ site.name }`);
}

export default {
    method: 'GET',
    path: '/api/sites/{id}/badge',
    handler: getSiteBadge,
    options: {
        description: 'Get project stats badge by id',
        tags: ['api', 'sites'],
        auth: false,
        validate: {
            params: joi.object({
                id: joi.string().required(),
            }).label('sites.SiteId'),
            query: joi.object({
                type: joi.string().optional(),
            }),
        },
        cache: {
            expiresIn: LONG,
            privacy: 'private',
        },
    },
};
