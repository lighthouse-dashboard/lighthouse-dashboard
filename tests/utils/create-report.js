/**
 * Create new report
 * @param {Partial<Report>} report
 * @return {Report}
 */
export default function createReport(report) {
    return {
        createdAt: '',
        git_commit: '',
        id: '',
        values: [],
        siteId: '',
        message: '',
        ...report,
    };
}
