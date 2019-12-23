import { info } from 'fancy-log';
import cron from 'node-cron';
import jobs from './jobs';

export default function setupCronjobs() {
    jobs.forEach(job => {
        cron.schedule(job.schedule, job.handler);
        info(`Registered cronjob ${ job.name } `, job.schedule);
    });
}
