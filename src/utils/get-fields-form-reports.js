/**
 * Get fields form a report
 * @param {Reports.Report} report
 * @return {string[]}
 */
export const getFieldsFromReport = (report) => {
    if (!report) {
        return [];
    }

    return report.values.reduce((acc, value) => {
        acc.push(value.id);
        return acc;
    }, []);
};
