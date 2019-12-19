/**
 *
 * @param {AuditDocument} asset
 * @returns {NormalizedAsset[]}
 */
export default function normalizeAsset(asset) {
    if (!asset.median) {
        return null;
    }

    return {
        _id: asset._id,
        url: asset.median.finalUrl,
        timings: asset.median.timings,
        generatedTime: asset.median.generatedTime,
        asset: asset.asset,
    }
}
