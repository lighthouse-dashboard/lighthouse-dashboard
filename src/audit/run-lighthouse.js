import * as chromeLauncher from 'chrome-launcher';
import lighthouse from 'lighthouse';
import CONFIG from '../../dashboard.config';
import { DEVICE_CONFIG } from '../config/REPORT_DEVICE_FLAGS';
import { debug, error } from '../utils/logger';

const chromiumBinary = require('chromium-binary');

/**
 *
 * @param {string} url
 * @param {Option} opts
 * @param {LH.Flags} flags
 * @param {LH.Config.Json} config
 * @return {Promise<{}>}
 */
async function launchChromeAndRunLighthouse(url, opts, flags) {
    debug('Starting chrome');
    const chrome = await chromeLauncher.launch(opts);
    const port = chrome.port;
    debug(`Chrome started in ${ port }`);
    try {
        debug(`Start lighthouse fro ${ url }`);
        const results = await lighthouse(url, { ...flags, port });
        await chrome.kill();
        return results.lhr;
    } catch (e) {
        error(e);
        await chrome.kill();
    }
    throw new Error('Lighthouse encountered an error');
}

/**
 *
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
            chromePath: CONFIG.SERVER.AUDIT.CHROMIUM_PATH || chromiumBinary.path,
            port: CONFIG.SERVER.AUDIT.CHROMIUM_PORT,
        },
        {
            ...DEVICE_CONFIG[device],
            // hostname: '0.0.0.0',
            // throttling: null,
        },
    );

    return transformer(audit);
}

