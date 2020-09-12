import Twig from 'twig';

/**
 * Promisified twig render
 * @param {string} file
 * @param {object} data
 * @return {Promise<string>}
 */
export default function renderTemplate(file, data) {
    return new Promise((resolve, reject) => {
        Twig.renderFile(file, data, (err, html) => {
            if (err) {
                return reject(err);
            }
            return resolve(html);
        });
    });
}
