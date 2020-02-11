import * as chromeLauncher from 'chrome-launcher';
import lighthouse from 'lighthouse';
import CONFIG from '../../server.config';
import { DEVICE_CONFIG } from '../config/REPORT_DEVICE_FLAGS';
import logger from '../logger';

/**
 * Create new audit
 * @param {string} url
 * @param {Option} opts
 * @param {LH.Flags} flags
 * @return {Promise<{}>}
 */
async function launchChromeAndRunLighthouse(url, opts, flags) {
    const chrome = await chromeLauncher.launch(opts);
    const port = chrome.port;
    logger.debug(`Chrome started in ${ port }`);
    try {
        logger.info(`Start audit for ${ url }`);
        const results = await lighthouse(url, { ...flags, port });
        logger.info(`Audit for ${ url } completed`);
        await chrome.kill();
        return results.lhr;
    } catch (e) {
        logger.info(`Audit for ${ url } failed. ${ e.message }`);
        logger.error(e.message);
        await chrome.kill();
    }
    throw new Error('Lighthouse encountered an error');
}

/**
 * Run new lighthouse audit and transform it
 * @param {AuditConfig} config
 * @param {AuditTransformer} transformer
 * @return {Report}
 */
export default async function runLighthouse(config, transformer) {
    const { url, device } = config;

    logger.debug(`Run audit for ${ config.url } ${ config.device }`);
    const audit = await launchChromeAndRunLighthouse(
        url,
        {
            chromeFlags: ['--headless', '--no-sandbox'],
            chromePath: CONFIG.AUDIT.CHROMIUM_PATH,
            port: CONFIG.AUDIT.CHROMIUM_PORT,
        },
        {
            ...DEVICE_CONFIG[device],
            hostname: '0.0.0.0',
            // throttling: null,
        },
    );

    return transformer(audit);
}

