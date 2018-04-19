const { forEach, subtract } = require('lodash');

function getBuildScoreSeries(builds) {
    let categoryStore = {};
    builds.forEach(artifacts => {
        artifacts.forEach((artifact) => {
            const { categories } = artifact;
            categoryStore = categories.reduce((acc, category) => {
                if (!acc[category.id]) {
                    acc[category.id] = [];
                }

                acc[category.id].push(category.score);
                return acc;
            }, categoryStore)
        });
    });

    return categoryStore;
}

function getTrendsFromBuilds(builds) {
    const series = getBuildScoreSeries(builds);
    const trend = {};
    forEach(series, (val, key) => {
        trend[key] = subtract(...val);
    });
    return trend;
}


module.exports = {
    getTrendsFromBuilds
};
