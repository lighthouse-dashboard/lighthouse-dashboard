import joi from '@hapi/joi';
import glob from 'glob';
import path from 'path';
import { MEDIUM } from '../../../config/cache';

/**
 *
 * Get logfiles
 * @return {Promise<string[]>}
 */
function getLogFiles() {
    return new Promise((resolve, reject) => {
        glob(path.resolve(__dirname, '../../../../logs/*.log'), {}, (er, files) => {
            if (er) {
                return reject(er);
            }

            const mappedFiles = files.map(f => path.basename(f));
            return resolve(mappedFiles);
        });
    });
}

export default {
    method: 'GET',
    path: '/api/system/logfiles',
    handler: getLogFiles,
    options: {
        description: 'Get logfiles',
        tags: ['api', 'system'],
        auth: 'jwt',
        response: {
            schema: joi.array().items(joi.string()),
        },
        cache: {
            expiresIn: MEDIUM,
            privacy: 'private',
        },
    },
};
