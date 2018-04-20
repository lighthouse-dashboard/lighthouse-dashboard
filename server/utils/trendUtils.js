const { forEach, takeRight, subtract } = require('lodash');


function populateCategorySeriesData(categories, series) {
    forEach(categories, (category) => {
        if (!series[category.id]) {
            series[category.id] = [];
        }

        series[category.id].push(category.score);
    });

    return series;
}

function setCategorySeriesData(categories, series) {
    forEach(categories, (category) => {
        series[category.id] = category.score;
    });

    return series;
}

function getTrendForSeries(series) {
    const lastTwoValues = takeRight(series, 2);
    return subtract(...lastTwoValues.reverse());
}

function setupSeriesData(builds) {
    let series = {};

    forEach(builds, (build) => {
        forEach(build.artifactContent, (artifact) => {
            if (!series[artifact.key]) {
                series[artifact.key] = { series: {}, categories: [] };
            }

            series[artifact.key].series = populateCategorySeriesData(artifact.categories, series[artifact.key].series);
            series[artifact.key].build = setCategorySeriesData(artifact.categories, {});
            series[artifact.key].categories.push(build.build_num);
        });
    });

    return series;
}

function calculateTrendForSeries(taggedSeries) {
    forEach(taggedSeries, (data) => {
        const categories = data.series;
        data.trend = {};
        forEach(categories, (serie, category) => {
            data.trend[category] = getTrendForSeries(serie);
        });
    });

    return taggedSeries;
}

module.exports = {
    setupSeriesData,
    calculateTrendForSeries,
};
