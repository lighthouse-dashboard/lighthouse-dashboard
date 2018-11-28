import { ReportDataSeries, CategoriesScore, ProjectSeriesData, ProjectArtifactTagData } from '../Interfaces/ProjectSeriesData';
import Build from '../Interfaces/Build';
import CircleArtifact from '../Interfaces/Artifact';
import ReportCategory from '@dreipol/lighthouse-runner/dist/Interfaces/ReportCategory';
import ReportResult from '@dreipol/lighthouse-runner/dist/Interfaces/ReportResult';

const { forEach, takeRight, subtract } = require('lodash');

function populateCategorySeriesData(categories: ReportCategory[], series: ReportDataSeries): ReportDataSeries {
    forEach(categories, (category: ReportCategory) => {
        if (!series[category.id]) {
            series[category.id] = [];
        }
        series[category.id].push(category.score);
    });

    return series;
}

function setCategorySeriesData(categories: ReportCategory[], series: CategoriesScore): CategoriesScore {
    forEach(categories, (category: ReportCategory) => {
        series[category.id] = category.score;
    });

    return series;
}

function getTrendForSeries(series: number[]): number {
    const lastTwoValues = takeRight(series, 2);
    return subtract(...lastTwoValues.reverse());
}

export function setupSeriesData(builds: Build[]): ProjectSeriesData {
    const series: ProjectSeriesData = {};

    forEach(builds, (build: Build) => {
        forEach(build.artifacts, (artifact: CircleArtifact) => {
            const data = <ReportResult> artifact.data;

            if (!series[data.key]) {
                series[data.key] = {
                    url: data.url,
                    tag: data.tag,
                    categories: [],
                    series: {},
                    build: {},
                    budget: {},
                    trend: {},
                };
            }

            series[data.key].series = populateCategorySeriesData(data.categories, series[data.key].series);
            series[data.key].build = setCategorySeriesData(data.categories, {});
            series[data.key].categories.push(build.build_num);
            series[data.key].budget = data.budget;
        });
    });

    return series;
}

export function calculateTrendForSeries(taggedSeries: ProjectSeriesData): ProjectSeriesData {
    forEach(taggedSeries, (data: ProjectArtifactTagData) => {
        const categories = data.series;
        forEach(categories, (series: number[], category: string) => {
            data.trend[category] = getTrendForSeries(series);
        });
    });

    return taggedSeries;
}
