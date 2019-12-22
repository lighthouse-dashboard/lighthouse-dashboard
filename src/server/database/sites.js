import { SITES_CONFIG_COLLECTION } from '../config/db';
import connectDatabase from '../database/connect-database';
import getDatabase from './connect-database';

/**
 * Get list of sites from DB
 * @return {Promise<SiteConfig[]>}
 */
export async function getSites() {
    const { database, client } = await getDatabase();
    const collection = database.collection(SITES_CONFIG_COLLECTION);

    return new Promise((resolve, reject) => {
        collection
            .find()
            .sort({ $natural: -1 })
            .toArray((error, data) => {
                if (error) {
                    return reject(error);
                }

                if (!data || data.length === 0) {
                    return resolve({});
                }

                return resolve(data);
            });
        client.close();
    });
}

/**
 * Add new site to DB
 * @param {SiteConfig} config
 * @return {Promise<void>}
 */
export async function addSite(config) {
    const { database, client } = await connectDatabase();
    const siteCollection = database.collection(SITES_CONFIG_COLLECTION);
    siteCollection.insertOne(config);
    client.close();
}

/**
 * Get config for specific site
 * @param {string} id
 * @return {Promise<SiteConfig | null>}
 */
export async function getSiteConfigById(id) {
    const { database, client } = await getDatabase();
    const collection = database.collection(SITES_CONFIG_COLLECTION);

    return new Promise((resolve, reject) => {
        collection
            .find({ id: id })
            .limit(1)
            .toArray((error, data) => {
                if (error) {
                    return reject(error);
                }

                if (!data || data.length === 0) {
                    return resolve(null);
                }

                return resolve(data.pop());
            });
        client.close();
    });
}
