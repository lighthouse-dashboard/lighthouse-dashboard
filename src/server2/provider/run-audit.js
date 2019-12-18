import chromium from 'chromium';
import PWMetrics from 'pwmetrics';

/**
 *
 * @param {string} url
 * @param {number} runs
 * @param {'desktop'|'mobile} device
 * @return {Promise<AuditDocument>}
 */
export default async function runAudit(url, runs, device) {
    const parsedUrl = new URL(url);

    const options = {
        flags: {
            chromePath: chromium.path,
            runs,
            emulatedFormFactor: device,
            chromeFlags: '--headless' // run in headless Chrome
        }
    };

    const pwMetrics = new PWMetrics(url, options); // _All available configuration options_ can be used as `options`
    /** @type {Audit} */
    const metricsData = await pwMetrics.start();

    return {
        ...metricsData,
        asset: parsedUrl.host,
    }
}
