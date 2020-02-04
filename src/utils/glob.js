import g from 'glob';
import path from 'path';

/**
 * Create globbing function with default cwd
 * @param {string} pattern
 * @return {Promise<string[]>}
 */
export default function glob(pattern) {
    return new Promise((resolve, reject) => {
        g(pattern, {
            cwd: path.join(__dirname, '../..'),
        }, (err, files) => {
            if (err) {
                return reject(err);
            }
            return resolve(files.map((file) => path.join(__dirname, '../../', file)));
        });
    });
}
