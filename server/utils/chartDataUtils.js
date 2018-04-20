function groupResultsByReportTag(buildData) {
    const { artifacts } = buildData;
    const endpoints = {};

    artifacts.forEach((item) => {
        if (!endpoints[item.data.url]) {
            endpoints[item.data.url] = [];
        }
        endpoints[item.data.url].push(item.data);
    });
    return endpoints;
}

function buildChartDataFromTaggedResults(taggedResults) {
    const keys = Object.keys(taggedResults);
    const result = {};
    let chartCategories = [];

    keys.forEach((key) => {
        const reports = taggedResults[key];
        if (!result[key]) {
            result[key] = { columns: [] };
        }

        reports.forEach((item) => {
            const {
                budget,
                categories,
                tag
            } = item;

            if (!categories) {
                return;
            }

            const shrinkedCategories = categories.map((_item) => {
                return _item.score;
            });

            const shrinkedBudget = categories.map((_item) => {
                return budget[_item.id] ? budget[_item.id] : null;
            });

            chartCategories = categories.map((_item) => {
                return _item.name;
            });

            result[key].columns.push(
                [`Report ${tag ? tag : ''}`, ...shrinkedCategories],
                [`Budget ${tag ? tag : ''}`, ...shrinkedBudget],
            );
        });
    });

    return {columns: result, categories: chartCategories};
}

module.exports = {
    buildChartDataFromTaggedResults,
    groupResultsByReportTag,
};
