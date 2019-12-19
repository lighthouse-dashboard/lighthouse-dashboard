/**
 *
 * @param {NormalizedAsset[]} assets
 */
export default function getLineDataFromAssets(assets) {
    const data = {};
    const mainTiming = assets[0].timings;

    data['x'] = assets.reduce((acc, asset) => {
        if (asset) {
            acc.push(asset.generatedTime);
        } else {
            acc.push(null);
        }

        // acc.push(formatter.format(new Date(asset.generatedTime)));
        return acc;
    }, []);

    for (let i = 0; i < mainTiming.length; i++) {
        data[mainTiming[i].id] = assets.reduce((acc, asset) => {
            if (!asset || !asset.timings) {
                acc.push(null);
            } else {
                acc.push(asset.timings[i].timing);
            }
            return acc;
        }, []);
    }
    return data;
}
