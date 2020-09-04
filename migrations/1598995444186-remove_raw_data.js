/**
 * Make any changes you need to make to the database here
 */
import { ReportModel } from '../lib/shared/models/report-model';

async function up() {
    await ReportModel.updateMany({
        raw: {
            $ne: null,
        }
    }, { raw: null });
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down() {
    // Write migration here
}

module.exports = { up, down };
