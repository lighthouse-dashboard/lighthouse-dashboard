import {
    BuildChartData, BuildChartRowsData,
    BuildInterface,
    CircleArtifactInterface,
    CircleReportContentInterface,
    GroupedBuildReports,
} from "../Interfaces";

export function groupResultsByReportTag(buildData: BuildInterface): GroupedBuildReports {
    const { artifacts } = buildData;
    const endpoints:GroupedBuildReports = {};

    artifacts.forEach((item:CircleArtifactInterface) => {
        if (!endpoints[item.data.url]) {
            endpoints[item.data.url] = [];
        }

        endpoints[item.data.url].push(item.data);
    });
    return endpoints;
}

export function buildChartDataFromTaggedResults(taggedResults: GroupedBuildReports): BuildChartData {
    const keys = Object.keys(taggedResults);
    const columns: BuildChartRowsData = {};
    let chartCategories:string[] = [];

    keys.forEach((key) => {
        const reports = taggedResults[key];
        if (!columns[key]) {
            columns[key] = [];
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

            const shrinkedCategories: number[] = categories.map((_item) => {
                return _item.score;
            });

            const shrinkedBudget = categories.map((_item) => {
                return budget[_item.id] ? budget[_item.id] : null;
            });

            chartCategories = categories.map((_item) => {
                return _item.name;
            });

            columns[key].push(
                [`Report ${tag ? tag : ''}`, ...shrinkedCategories],
                [`Budget ${tag ? tag : ''}`, ...shrinkedBudget],
            );
        });
    });

    return {columns, categories: chartCategories};
}
