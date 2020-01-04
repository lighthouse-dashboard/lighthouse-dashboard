import promiseSeq from 'promise-sequential';
import { getSites } from '../database/sites';
import createLighthouseReport from '../utils/create-lighthouse-report';

async function runAuditsCommand() {
    const sites = await getSites();
    promiseSeq(sites.map(site => {
        return () => createLighthouseReport(site);
    }));
}

runAuditsCommand();
