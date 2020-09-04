/**
 * Make any changes you need to make to the database here
 */
import { RawReportModel } from '../lib/shared/models/raw-report-model';
import { ReportModel } from '../lib/shared/models/report-model';

async function up() {
    const reportModels = await ReportModel.find({
        raw_report_id: { $eq: null },
        raw: {
            $ne: null,
        },
    }).exec();
    for (let i = 0; i < reportModels.length; i++) {
        const model = reportModels[i];
        if (!model.raw) {
            continue;
        }
        const rawReport = new RawReportModel({ raw: model.raw });
        await rawReport.save();
        await ReportModel.updateOne(model.id, { raw_report_id: rawReport.id, raw: null });
    }
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down() {
    // Write migration here
}

module.exports = { up, down };
