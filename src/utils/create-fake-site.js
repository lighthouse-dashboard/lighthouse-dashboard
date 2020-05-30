export default function createFakeSite() {
    return {
        id: 'foo',
        name: 'foo',
        url: 'http://foo.com',
        device: 'desktop',
        order: 0,
        is_favorite: true,
        token: 'foo',
        last_audit: (new Date()).toISOString(),
    };
}
