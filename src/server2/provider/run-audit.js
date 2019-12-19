import chromium from 'chromium';
import PWMetrics from 'pwmetrics';
import url from 'url';

/**
 *
 * @param {string} url
 * @param {number} runs
 * @param {'desktop'|'mobile} device
 * @return {Promise<AuditDocument>}
 */
export default async function runAudit(pageUrl, runs = 2, device = 'desktop') {
    const parsedUrl = new url.parse(pageUrl);

    const options = {
        flags: {
            chromePath: chromium.path,
            runs,
            json: true,
            showOutput: false,
            emulatedFormFactor: device,
            chromeFlags: '--headless' // run in headless Chrome
        }
    };

    const pwMetrics = new PWMetrics(pageUrl, options); // _All available configuration options_ can be used as `options`
    /** @type {Audit} */
    const metricsData = await pwMetrics.start();

    return {
        ...metricsData,
        asset: parsedUrl.host,
    }
}
