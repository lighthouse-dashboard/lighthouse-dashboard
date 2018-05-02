import { BudgetInterface } from 'Interfaces';
import {
    BuildChartData, BuildChartRowsData,
    BuildInterface,
    CircleArtifactInterface,
    CircleReportContentInterface,
    GroupedBuildReports,
    ReportCategoryInterface,
} from "Interfaces";

export function groupResultsByReportTag(buildData: BuildInterface): GroupedBuildReports {
    const { artifacts } = buildData;
    const endpoints: GroupedBuildReports = {};

    artifacts.forEach((item: CircleArtifactInterface) => {
        if (!endpoints[item.data.url]) {
            endpoints[item.data.url] = [];
        }

        endpoints[item.data.url].push(item.data);
    });
    return endpoints;
}

function getCategoryScores(categories: ReportCategoryInterface[]): number[] {
    return categories.map((item) => {
        return item.score;
    });
}

function getCategoryBudget(categories: ReportCategoryInterface[], budget: BudgetInterface): number[] {
    return categories.map((_item) => {
        return <number>(budget[_item.id] ? budget[_item.id] : null);
    });
}

function getCategoryNames(categories: ReportCategoryInterface[]) {
    return categories.map((_item) => {
        return _item.name;
    });
}

export function fillColumn(key: string, reports: CircleReportContentInterface[], columns: BuildChartRowsData, chartCategories: string[]) {
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
        const shrinkedCategories = getCategoryScores(categories)
        const shrinkedBudget = getCategoryBudget(categories, budget);
        chartCategories = getCategoryNames(categories);

        const name = tag;
        columns[key].push(
            [`Report ${name}`, ...shrinkedCategories],
            [`Budget ${name}`, ...shrinkedBudget],
        );
    });
}

export function buildChartDataFromTaggedResults(taggedResults: GroupedBuildReports): BuildChartData {
    const keys = Object.keys(taggedResults);
    const columns: BuildChartRowsData = {};
    let chartCategories: string[] = [];

    keys.forEach((key) => {
        const reports = taggedResults[key];
        fillColumn(key, reports, columns, chartCategories);
    });

    return { columns, categories: chartCategories };
}
