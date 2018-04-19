const { forEach, subtract } = require('lodash');

function populateCategoryScoreStore(artifact) {
    const { categories } = artifact;
    return categories.reduce((acc, category) => {
        acc[category.id] = category.score;
        return acc;
    }, {});
}

function populateCategoryStore(artifact, categoryStore) {
    const { categories } = artifact;
    return categories.reduce((acc, category) => {
        if (!acc[category.id]) {
            acc[category.id] = [];
        }

        acc[category.id].push(category.score);
        return acc;
    }, categoryStore);
}

function getBuildScoreSeries(builds) {
    let categoryStore = {};
    let categoryScoreStore = {};
    builds.forEach(artifacts => {
        artifacts.forEach((artifact) => {
            categoryScoreStore = populateCategoryScoreStore(artifact);
            categoryStore = populateCategoryStore(artifact, categoryStore);
        });
    });

    return { series: categoryStore, build: categoryScoreStore };
}

function getScoreSeriesByReport(builds) {
    const { series, build } = getBuildScoreSeries(builds);
    const trend = {};
    forEach(series, (val, key) => {
        trend[key] = subtract(...val);
    });
    return { trend, build };
}

function getTrendsFromBuilds(builds) {
    let tags = {};
    forEach(builds, (artifacts) => {
        forEach(artifacts, (report, tag) => {
            if (!tags[tag]) {
                tags[tag] = [];
            }
            tags[tag].push(report);
        });
    });

    forEach(tags, (_builds, key) => {
        tags[key] = getScoreSeriesByReport(_builds);
    });

    return tags;
}

module.exports = {
    getTrendsFromBuilds,
};
