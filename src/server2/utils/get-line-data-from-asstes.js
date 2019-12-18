/**
 *
 * @param {NormalizedAsset[]} assets
 */
export default function getLineDataFromAssets(assets) {
    const data = {};
    const mainTiming = assets[0].timings;
    for (let i = 0; i < mainTiming.length; i++) {
        data[mainTiming[i].id] = assets.reduce((acc, asset) => {
            acc.push(asset.timings[i].timing);
            return acc;
        }, []);
    }
    return data;
}
