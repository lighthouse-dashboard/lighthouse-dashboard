import * as chromeLauncher from 'chrome-launcher';
import lighthouse from 'lighthouse';
import { DEVICE_CONFIG } from '../../../src/config/REPORT_DEVICE_FLAGS';
import logger from '../../logger';

/**
 * Create new audit
 * @param {string} url
 * @param {Option} opts
 * @param {LH.Flags} flags
 * @return {LH.Result}
 */
async function launchChromeAndRunLighthouse(url, opts, flags) {
    let chrome = null;
    try {
        chrome = await chromeLauncher.launch(opts);
        const port = chrome.port;
        logger.debug(`Chrome started in ${ port }`);
        logger.info(`Start audit for ${ url }`);

        const results = await lighthouse(url, { ...flags, port, skipAudits: [] });
        logger.info(`Audit for ${ url } completed`);

        await chrome.kill();
        results.lhr.timing.entries = [];
        return results.lhr;
    } catch (e) {
        logger.error(`Audit for ${ url } failed. ${ e.message }`);
        if (chrome) {
            await chrome.kill();
        }
        throw e;
    }
}

/**
 * Run new lighthouse audit and transform it
 * @param {Pick<Reports.Report, 'url' | 'device'>} config
 * @param {string} chromePath Path to the chrome binary
 * @param {number} port Port used fo rdebugging
 * @param {AuditTransformer} transformer
 * @return {Promise<LighthhouseReport.Result>}
 */
export default async function runLighthouse({ config, chromePath, port, transformer }) {
    const { url, device } = config;

    logger.debug(`Run audit for ${ url } ${ device }`);
    const audit = await launchChromeAndRunLighthouse(
        url,
        {
            chromeFlags: ['--disable-gpu', '--headless', '--enable-logging', '--no-sandbox'],
            chromePath: chromePath,
            port: port,
        },
        {
            ...DEVICE_CONFIG[device],
            hostname: '0.0.0.0',
            // throttling: null,
        },
    );

    return { transformed: transformer(audit), raw: audit };
}

