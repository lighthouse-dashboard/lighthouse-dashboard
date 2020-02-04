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
 * @param {LH.Config.Json} config
 * @return {Promise<{}>}
 */
async function launchChromeAndRunLighthouse(url, opts, flags) {
    logger.debug('Starting chrome');
    const chrome = await chromeLauncher.launch(opts);
    const port = chrome.port;
    logger.debug(`Chrome started in ${ port }`);
    try {
        logger.info(`Start lighthouse fro ${ url }`);
        const results = await lighthouse(url, { ...flags, port });
        await chrome.kill();
        return results.lhr;
    } catch (e) {
        logger.error(e);
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
    const { pageUrl, device } = config;

    const audit = await launchChromeAndRunLighthouse(
        pageUrl,
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

