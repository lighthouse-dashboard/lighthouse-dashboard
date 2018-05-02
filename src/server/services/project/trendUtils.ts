import { CircleArtifactInterface } from '../../Interfaces';
import {
    BuildInterface,
    CircleReportContentInterface,
    ReportCategoryInterface, CategoriesScoreInterface, ReportDataSeriesInterface,
    ProjectSeriesData, ProjectArtifactTagData
} from '../../Interfaces';

const { forEach, takeRight, subtract } = require('lodash');

function populateCategorySeriesData(categories: ReportCategoryInterface[], series: ReportDataSeriesInterface): ReportDataSeriesInterface {
    forEach(categories, (category: ReportCategoryInterface) => {
        if (!series[category.id]) {
            series[category.id] = [];
        }
        series[category.id].push(category.score);
    });

    return series;
}

function setCategorySeriesData(categories: ReportCategoryInterface[], series: CategoriesScoreInterface): CategoriesScoreInterface {
    forEach(categories, (category: ReportCategoryInterface) => {
        series[category.id] = category.score;
    });

    return series;
}

function getTrendForSeries(series: number[]): number {
    const lastTwoValues = takeRight(series, 2);
    return subtract(...lastTwoValues.reverse());
}

export function setupSeriesData(builds: BuildInterface[]): ProjectSeriesData {
    let series: ProjectSeriesData = {};

    forEach(builds, (build: BuildInterface) => {
        forEach(build.artifacts, (artifact: CircleArtifactInterface) => {
            const data = artifact.data;
            
            if (!series[data.key]) {
                series[data.key] = {
                    series: {},
                    categories: [],
                    build: {},
                    budget: {},
                    trend: {}
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
