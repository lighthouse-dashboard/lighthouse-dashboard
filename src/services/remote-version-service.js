import GH from 'github-api';
import NodeCache from 'node-cache';
import { clean } from 'semver';
import logger from '../../lib/logger';

const cache = new NodeCache( { stdTTL: 60 * 60 * 6 } ); // Set TTL to 6 hours
const LATEST_VERSION_KEY = 'latest_release';

/**
 * Invalidate local version cache
 */
export const invalidateCache = () => {
    cache.del( LATEST_VERSION_KEY );
}

/**
 * Get list of all available remote versions
 * @return {Promise<string[]>}
 */
const getAllRemoteVersions = async () => {
    const gh = new GH();
    const repo = gh.getRepo( 'lighthouse-dashboard', 'lighthouse-dashboard' );
    try {
        const { data } = await repo.listTags();
        return data.map( (tag) => {
            return clean( tag.name );
        } );
    } catch (e) {
        logger.debug( e.message );
        return [];
    }
};

/**
 * Get latest version available on GitHub
 * @return {Promise<string | null>}
 */
export const getLatestRemoteVersion = async () => {
    const latestVersion = cache.get( LATEST_VERSION_KEY );
    if (!latestVersion) {
        const version = (await getAllRemoteVersions()).shift();
        if (!version) {
            return null;
        }
        cache.set( LATEST_VERSION_KEY, version );
        return version;
    }
    return latestVersion;
};
