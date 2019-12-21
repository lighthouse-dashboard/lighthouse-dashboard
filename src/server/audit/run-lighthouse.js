import * as chromeLauncher from 'chrome-launcher';
import lighthouse from 'lighthouse';

/**
 *
 * @param {string} url
 * @param {Option} opts
 * @param {LH.Flags} flags
 * @param {LH.Config.Json} config
 * @return {Promise<{}>}
 */
async function launchChromeAndRunLighthouse(url, opts, flags) {
    const chrome = await chromeLauncher.launch(opts);
    const port = chrome.port;

    const results = await lighthouse(url, { ...flags, port });
    await chrome.kill();
    return results.lhr;
}

/**
 *
 * @param {AuditConfig} config
 * @param {AuditTransformer} transformer
 * @return {Report}
 */
export default async function runLighthouse(config, transformer) {
    const { pageUrl } = config;

    const audit = await launchChromeAndRunLighthouse(
        pageUrl,
        {
            chromeFlags: ['--headless', '--no-sandbox'],
            chromePath: process.env.CHROMIUM_PATH,
            port: 9222,
        },
        {
            // hostname: '0.0.0.0',
            emulatedFormFactor: 'desktop',
            throttlingMethod: 'provided'
            // throttling: null,
        },
    );

    return transformer(audit);
}

