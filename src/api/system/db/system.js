import { SYSTEM_COLLECTION } from '../../../config/db';

const SYSTEM_INFO_ENTRY_ID = 1;
/**
 * Get system info object
 * @param {Db} database
 * @return {System.Info | null}
 */
export const getSystemObject = async (database) => {
    const collection = database.collection(SYSTEM_COLLECTION);
    return (await collection
        .find({ _id: SYSTEM_INFO_ENTRY_ID })
        .toArray()).pop();
};

/**
 *
 * @param {Db} database
 * @param {Database} date
 * @return {Promise<void>}
 */
export const updateSystemObject = async (database, date) => {
    const collection = database.collection(SYSTEM_COLLECTION);
    await collection.updateOne(
        { _id: SYSTEM_INFO_ENTRY_ID },
        { $set: { worker_last_run: date } },
        { upsert: true }
    );
};
