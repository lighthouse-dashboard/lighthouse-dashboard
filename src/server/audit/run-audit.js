import PWMetrics from 'pwmetrics';
import url from 'url';


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
            json: true,
            showOutput: true,
            emulatedFormFactor: device,
            port: 9222,
            hostname: '0.0.0.0',
            chromePath: require('puppeteer').executablePath(),
            chromeFlags: '--disable-gpu --headless --no-sandbox',
        },
    };

    const pwMetrics = new PWMetrics(pageUrl, options); // _All available configuration options_ can be used as `options`
    /** @type {Audit} */
    const metricsData = await pwMetrics.start();

    return {
        ...metricsData,
        asset: parsedUrl.host,
    };
}
