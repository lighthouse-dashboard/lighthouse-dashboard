const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

function launchChromeAndRunLighthouse(url, opts, config = null) {
    return chromeLauncher.launch({ chromeFlags: opts.chromeFlags }).then(chrome => {
        opts.port = chrome.port;
        return lighthouse(url, opts, config).then(results => {
            // use results.lhr for the JS-consumeable output
            // https://github.com/GoogleChrome/lighthouse/blob/master/types/lhr.d.ts
            // use results.report for the HTML/JSON/CSV output as a string
            // use results.artifacts for the trace/screenshots/other specific case you need (rarer)
            return chrome.kill().then(() => results.lhr)
        });
    });
}

/**
 *
 * @param {AuditConfig} config
 * @param {AuditTransformer} transformer
 */
export default async function runLighthouse(config, transformer) {
    const { pageUrl } = config;

    const opts = {
        chromeFlags: ['--headless'],
    };

    const audit = await launchChromeAndRunLighthouse(pageUrl, opts);
    return transformer(audit);
}

