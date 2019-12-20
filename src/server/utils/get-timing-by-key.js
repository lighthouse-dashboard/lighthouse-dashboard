/**
 *
 * @param {ReportValue[]} values
 * @param {string} key
 * @return {ReportValue}
 */
export default function getReportValueByKey(values, key) {
    return values.find(t => t.id === key);
}

/**
 *
 * @param {ReportValue[]} values
 * @param {string} key
 * @return {number}
 */
export function getTimingValueByKey(values, key) {
    const timing = getReportValueByKey(values, key);
    if (!timing) {
        return null;
    }
    return timing.value;
}
