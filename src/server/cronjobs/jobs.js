import promiseSeq from 'promise-sequential';
import { getSites } from '../database/sites';
import createLighthouseReport from '../utils/create-lighthouse-report';

export default [
    {
        name: 'run-audits',
        schedule: '*/30 * * * *',
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
