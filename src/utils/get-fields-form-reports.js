/**
 *
 * @param {Reports.Report} report
 * @return {string[]}
 */
export const getFieldsFromReport = (report) => (
    report.values.reduce((acc, value) => {
        acc.push(value.id);
        return acc;
    }, [])
)
