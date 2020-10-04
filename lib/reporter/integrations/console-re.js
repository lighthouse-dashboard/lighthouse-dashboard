import consolere from 'console-remote-client';

export const init = () => {
    consolere.connect( 'console.re', '80', process.env.CONSOLE_RE_CHANNEL );
}

export const name = 'console-re';


export const onServerStartup = async () => {
    console.re.log( `Server startup` )
}

export const onServerError = async (error) => {
    console.re.error( error )
}

/**
 * Persist data if audit is complete
 * @param {string} modelName
 * @param {number} deletedCount
 * @return {Promise<void>}
 */
export const onCleanup = async (modelName, deletedCount) => {
    console.re.log( `Cleanup ${ modelName }. Removed ${ deletedCount }` );
};

/**
 * Check for audits
 * @returns {Promise<void>}
 */
export const onAuditCheck = async () => {
    console.re.log( `Checking for audits` );
};

/**
 *
 * @param {Sites.SiteModel} siteConfig
 * @param {string} errorMessage
 * @returns {Promise<void>}
 */
export const onAuditFailed = async (siteConfig, errorMessage) => {
    console.re.error( `Audit failed ${ siteConfig.name } - ${ errorMessage }` );
};

/**
 * Persist data if audit is complete
 * @param {Sites.SiteModel} siteConfig
 * @param {Reports.Report} report
 * @return {Promise<void>}
 */
export const onAuditComplete = async (siteConfig, report) => {
    console.re.error( `Audit completed ${ siteConfig.name }` );
};
