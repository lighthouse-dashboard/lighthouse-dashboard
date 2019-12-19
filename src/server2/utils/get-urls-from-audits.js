/**
 *
 * @param {AuditDocument} audit
 */
export default function getUrlsFromAudits(audit) {
    if (!audit || !audit.median) {
        return null;
    }
    return audit.median.requestedUrl;
}
