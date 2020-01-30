/**
 * Transform a lighthouse report
 * @param {string} pageId
 * @param {LH.Result} audit
 * @return {Report}
 */
export default function lighthouseTransformer(pageId, audit) {
    const { categories } = audit;

    const values = Object.keys(categories).reduce((acc, category) => {
        const results = categories[category];
        acc.push({
            id: results.id,
            value: Math.round(results.score * 100),
        });
        return acc;
    }, []);

    return {
        createdAt: new Date().toISOString(),
        siteId: pageId,
        values,
    };
}
