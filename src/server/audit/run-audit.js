import PWMetrics from 'pwmetrics';
import url from 'url';
import chromePaths from 'chrome-paths';


/**
 * Run Audit
 * @param {string} pageUrl
 * @param {number} runs
 * @param {'desktop'|'mobile} device
 * @return {Promise<AuditDocument>}
 */
export default async function runAudit(pageUrl, runs, device) {
    console.log('info', `Start new audit ${ pageUrl } ${ runs } ${ device }`);

    const parsedUrl = new url.parse(pageUrl);

    const options = {
        flags: {
            //chromePath: process.env.CHROME_BIN,
            runs,
            json: false,
            showOutput: false,
            emulatedFormFactor: device,
            chromePath: chromePaths.chromeCanary
            //chromeFlags: '--headless' // run in headless Chrome
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
