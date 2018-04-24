import {
    BuildInterface, ChartDataEntryInterface,
    CircleArtifactInterface, CircleReportContentInterface, TaggedChartColumns,
    TagGroupedArtifactDataInterface
} from "../Interfaces";

function groupResultsByReportTag(buildData: BuildInterface): TagGroupedArtifactDataInterface {
    const { artifacts } = buildData;
    const endpoints:TagGroupedArtifactDataInterface = {};

    artifacts.forEach((item:CircleArtifactInterface) => {
        if (!endpoints[item.data.url]) {
            endpoints[item.data.url] = [];
        }

        endpoints[item.data.url].push(item.data);
    });
    return endpoints;
}

function buildChartDataFromTaggedResults(taggedResults: TagGroupedArtifactDataInterface): ChartDataEntryInterface {
    const keys = Object.keys(taggedResults);
    const result: TaggedChartColumns = {};
    let chartCategories:string[] = [];

    keys.forEach((key) => {
        const reports = taggedResults[key];
        if (!result[key]) {
            result[key] = [];
        }

        reports.forEach((item: CircleReportContentInterface) => {
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

            result[key].push(
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
