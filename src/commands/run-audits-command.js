import promiseSeq from 'promise-sequential';
import { getAllSites } from '../database/sites';
import createLighthouseReport from '../utils/create-lighthouse-report';

async function runAuditsCommand() {
    const sites = await getAllSites();
    promiseSeq(sites.map(site => {
        return () => createLighthouseReport(site);
    }));
}

runAuditsCommand();
