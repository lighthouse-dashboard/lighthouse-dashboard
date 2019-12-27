import promiseSeq from 'promise-sequential';
import CONFIG from '../../../dashboard.config';
import { getSites } from '../database/sites';
import createLighthouseReport from '../utils/create-lighthouse-report';

export default [
    {
        name: 'run-audits',
        schedule: CONFIG.SERVER.CRONJOB.RUN_AUDITS,
        handler: () => {
            getSites()
                .then(
                    /**
                     *
                     * @param {SiteConfig[]} sites
                     * @return {*}
                     */
                    (sites) => {
                        return promiseSeq(sites.map(site => {
                            return () => createLighthouseReport(site);
                        }));
                    });
        },
    },
];
