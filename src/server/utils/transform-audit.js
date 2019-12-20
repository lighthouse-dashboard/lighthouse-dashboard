/**
 *
 * @param {string} id
 * @param {Audit} audit
 * @returns {Report}
 */
export default function transformAudit(id, audit) {
    return {
        siteId: id,
        values: transformTimings(audit.median.timings),
        createdAt: audit.median.generatedTime,
    };
}

/**
 *
 * @param {Timing[]} timings
 * @returns {ReportValue}
 */
function transformTimings(timings) {
    return timings.map((t) => {
        return {
            id: t.id,
            value: t.timing,
        };
    });
}
