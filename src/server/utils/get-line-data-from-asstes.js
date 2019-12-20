import { format } from 'date-fns';
import { EXPORTED_TIMINGS } from '../config/export';

/**
 *
 * @param {NormalizedAsset[]} assets
 */
export default function getLineDataFromAssets(assets) {
    const data = {
        labels: [],
        datasets: [],
    };

    data.labels = assets.reduce((acc, asset) => {
        if (asset) {
            acc.push(format(new Date(asset.generatedTime), 'dd/MM hh:mm'));
        } else {
            acc.push(null);
        }

        // acc.push(formatter.format(new Date(asset.generatedTime)));
        return acc;
    }, []);

    EXPORTED_TIMINGS.reduce((datasets, timingKey) => {
        datasets.push(getLineDataSetForKey(assets, timingKey));
        return datasets;
    }, data.datasets)

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
