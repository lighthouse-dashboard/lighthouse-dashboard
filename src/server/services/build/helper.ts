import { GroupedBuildReports } from "../../interfaces/GroupedBuildReports";
import Build from "../../interfaces/Build";
import CircleArtifact from "../../interfaces/Artifact";
import { Budget } from "../../interfaces/ProjectSeriesData";
import { ReportCategory } from "../../interfaces/ReportCategory";
import { CircleReportContent } from "../../interfaces/CircleReportContent";
import { BuildChartRowsData, BuildChartData } from '../../interfaces/BuildChartData';

export function groupResultsByReportTag(artifacts: CircleArtifact[]): GroupedBuildReports {
    const endpoints: GroupedBuildReports = {};

    artifacts.forEach((item: CircleArtifact) => {
        if (!endpoints[item.data.url]) {
            endpoints[item.data.url] = [];
        }

        endpoints[item.data.url].push(item.data);
    });
    return endpoints;
}

function getCategoryScores(categories: ReportCategory[]): number[] {
    return categories.map((item) => {
        return item.score;
    });
}

function getCategoryBudget(categories: ReportCategory[], budget: Budget): number[] {
    return categories.map((_item) => {
        return <number>(budget[_item.id] ? budget[_item.id] : null);
    });
}

function getCategoryNames(categories: ReportCategory[]) {
    return categories.map((_item) => {
        return _item.name;
    });
}

export function fillColumn(key: string, reports: CircleReportContent[], columns: BuildChartRowsData): string[] {
    if (!columns[key]) {
        columns[key] = [];
    }

    let chartCategories: string[] = [];
    reports.forEach((item: CircleReportContent) => {
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

    return chartCategories;
}

export function buildChartDataFromTaggedResults(taggedResults: GroupedBuildReports): BuildChartData {
    const keys = Object.keys(taggedResults);
    const columns: BuildChartRowsData = {};
    let chartCategories: string[] = [];

    keys.forEach((key) => {
        const reports = taggedResults[key];
        chartCategories = fillColumn(key, reports, columns);
    });

    return { columns, categories: chartCategories };
}
