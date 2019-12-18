/**
 *
 * @param {AuditDocument[]} assets
 * @returns {NormalizedAsset[]}
 */
export default function normalizeAsset(asset) {
    if (!asset.median) {
        return null;
    }

    return {
        url: asset.median.finalUrl,
        timings: asset.median.timings,
        generatedTime: asset.median.generatedTime,
        asset: asset.asset,
    }
}
