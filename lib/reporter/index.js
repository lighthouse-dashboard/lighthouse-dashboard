import logger from '../logger';
import qm from './integrations/quickmetrics';

/** @type {Reporter.Reporter[]} */
const reporters = [qm].map((reporter) => reporter()).filter((reporter) => !!reporter);

logger.debug(`Loaded ${ reporters.length } reporter(s)`);

/**
 * Send event to all reporters
 * @param {string} eventName
 * @param {object|number|string|undefined} data
 */
export default function(eventName, data) {
    logger.debug(`Dispatching event ${ eventName }`);
    reporters.forEach((reporter) => {
        reporter(eventName, data);
    });
}
