const { forEach, subtract, last } = require('lodash');

function getBuildScoreSeries(builds) {
    let categoryStore = {};
    let categoryScoreStore = {};
    builds.forEach(artifacts => {
        artifacts.forEach((artifact) => {
            const { categories } = artifact;
            categoryStore = categories.reduce((acc, category) => {
                if (!acc[category.id]) {
                    acc[category.id] = [];
                }

                acc[category.id].push(category.score);
                categoryScoreStore[category.id] = category.score;
                return acc;
            }, categoryStore)
        });
    });

    return { series: categoryStore, build: categoryScoreStore};
}

function getScoreSeriesByReport(builds) {
    const {series, build }= getBuildScoreSeries(builds);
    const trend = {};
    forEach(series, (val, key) => {
        trend[key] = subtract(...val);
    });
    return {trend, build};
}

function getTrendsFromBuilds(builds) {
    let tags = {};
    forEach(builds, (artifacts) => {
        forEach(artifacts, (report, tag) => {
            if (!tags[tag]) {
                tags[tag] = []
            }
            tags[tag].push(report);

        });
    });

    forEach(tags, (builds, key) => {
        tags[key] = getScoreSeriesByReport(builds);
    });

    return tags;
}

module.exports = {
    getTrendsFromBuilds
};
