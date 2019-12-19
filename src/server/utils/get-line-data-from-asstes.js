/**
 *
 * @param {NormalizedAsset[]} assets
 */
export default function getLineDataFromAssets(assets) {
    const data = {
        labels: [],
        datasets: [],
    };
    const mainTiming = assets[0].timings;

    data.labels = assets.reduce((acc, asset) => {
        if (asset) {
            acc.push(asset.generatedTime);
        } else {
            acc.push(null);
        }

        // acc.push(formatter.format(new Date(asset.generatedTime)));
        return acc;
    }, []);

    for (let i = 0; i < mainTiming.length; i++) {
        const key = mainTiming[i].id;
        data.datasets.push(getLineDataSetForKey(assets, key));
    }
    return data;
}

/**
 *
 * @param {NormalizedAsset[]} assets
 * @param {string} key
 * @return {*}
 */
function getLineDataSetForKey(assets, key) {
    return assets.reduce((dataSet, asset) => {
        dataSet.data.push(getTimingValueForKey(asset.timings, key));
        return dataSet;
    }, {
        label: key,
        data: []
    });
}

/**
 *
 * @param {Timing[]} timings
 * @return {*}
 */
function getTimingValueForKey(timings, id) {
    return timings.find(t => t.id === id).timing || null;
}
