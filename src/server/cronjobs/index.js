import cron from 'node-cron';

import jobs from './jobs';

export default function setupCronjobs() {
    jobs.map(job => {
        cron.schedule(job.schedule, job.handler);
        console.log(`Registered cronjob ${ job.name } `, job.schedule);
    })
}
