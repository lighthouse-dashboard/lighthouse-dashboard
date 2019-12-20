import PWMetrics from 'pwmetrics';


/**
 * Run Audit
 * @param {string} pageUrl
 * @param {number} runs
 * @param {'desktop'|'mobile} device
 * @param {function(Audit)}transformer
 * @return {Promise<Audit>}
 */
export default async function runPwmetrics(pageUrl, runs, device, transformer) {
    console.log('info', `Start new audit ${ pageUrl } ${ runs } ${ device }`);

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
    /** @type {Audit } */
    const audit = await pwMetrics.start();
    return transformer(audit);
}
