/**
 * Get a ReportValue by key
 * @param {Reports.ReportValue[]} values
 * @param {string} key
 * @return {Reports.ReportValue}
 */
export default function getReportValueByKey(values, key) {
    return values.find(t => t.id === key) || null;
}

/**
 * Get a value by key
 * @param {Reports.ReportValue[]} values
 * @param {string} key
 * @return {number | null}
 */
export function getReportValueScoreByKey(values, key) {
    const timing = getReportValueByKey(values, key);
    if (!timing) {
        return null;
    }
    return timing.value;
}
