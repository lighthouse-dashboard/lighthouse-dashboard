/**
 * Create a fake site object
 * @param {Partial<Sites.SiteModel>}data
 * @return {Sites.SiteModel}
 */
export default function createFakeSite(data = {}) {
    return {
        id: 'foo',
        name: 'foo',
        url: 'http://foo.com',
        device: 'desktop',
        order: 0,
        is_favorite: true,
        last_audit: (new Date()).toISOString(),
        is_scheduled: true,
        ...data
    };
}
