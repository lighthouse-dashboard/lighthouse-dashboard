import uniq from 'lodash.uniq';
import { getAudits } from '../database/get-adits';
import createAudit from '../utils/create-audit';
import getUrlsFromAudits from '../utils/get-urls-from-audits';

const promiseSerial = funcs =>
    funcs.reduce((promise, func) =>
            promise.then(result =>
                func().then(Array.prototype.concat.bind(result))),
        Promise.resolve([]))

export default [
    {
        name: 'run-audits',
        schedule: '*/15 * * * *',
        handler: () => {
            getAudits()
                .then((audits) => {
                    const urls = uniq(audits.map(getUrlsFromAudits).filter(Boolean));
                    const funcs = [];
                    for (let i = 0; i < urls.length; i++) {
                        funcs.push(() => {
                            console.log('Create scheduled audit', urls[i]);
                            return createAudit(urls[i], 2)
                        });
                    }
                    promiseSerial(funcs);
                })

        },
    },
]
