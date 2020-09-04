import { SiteModel } from '../lib/shared/models/sites-model';

/**
 * Make any changes you need to make to the database here
 */
async function up() {
    await SiteModel.updateMany({}, { is_public: false });
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down() {
    await SiteModel.updateMany({}, { is_public: null });
}

module.exports = { up, down };
