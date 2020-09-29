import { lt } from 'semver';
import { version } from '../../package.json';
import { getLatestRemoteVersion } from './remote-version-service';

/**
 * Check if the local version is less than the remote one
 * @param {string} currentVersion - semver version string
 * @return {Promise<boolean>}
 */
export const hasNewVersionAvailable = async (currentVersion = version) => {
    const latestVersion = await getLatestRemoteVersion();
    if (!currentVersion || !latestVersion) {
        return false;
    }
    return lt(currentVersion, latestVersion);
};

/**
 * Get the URL to the latest release page
 * @return {Promise<string>}
 */
export const getReleaseUrl = async () => {
    const latestVersion = await getLatestRemoteVersion();
    return `https://github.com/lighthouse-dashboard/lighthouse-dashboard/releases/tag/v${ latestVersion }`;
};
