/**
 * Create new faked report
 * @return {Report}
 */
export default function createFakeReport() {
    return {
        id: 'foo',
        siteId: 'foo',
        createdAt: (new Date()).toString(),
        message: 'Fake Report',
        git_commit: 'Fake report',
        raw: null,
        hasRawData: true,
        values: [
            {
                id: 'performance',
                value: Math.round(Math.random() * 100),
            },
            {
                id: 'seo',
                value: Math.round(Math.random() * 100),
            },
            {
                id: 'accessibility',
                value: Math.round(Math.random() * 100),
            },
            {
                id: 'best-practices',
                value: Math.round(Math.random() * 100),
            },
            {
                id: 'pwa',
                value: Math.round(Math.random() * 100),
            },
        ],
    };
}
