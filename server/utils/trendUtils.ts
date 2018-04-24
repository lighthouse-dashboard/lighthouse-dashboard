import {
    BuildInterface,
    CircleReportContentInterface,
    ReportCategoryInterface, CategoriesScoreInterface, ReportDataSeriesInterface,
    TaggedBuildDataInterface, TaggedBuildDataSeriesInterface
} from '../Interfaces';

const {forEach, takeRight, subtract} = require('lodash');


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

export function setupSeriesData(builds: BuildInterface[]): TaggedBuildDataInterface {
    let series: TaggedBuildDataInterface = {};

    forEach(builds, (build: BuildInterface) => {
        forEach(build.artifactContent, (artifact: CircleReportContentInterface) => {
            if (!series[artifact.key]) {
                series[artifact.key] = {
                    series: {},
                    categories: [],
                    build: {},
                    budget: {},
                    trend: {}
                };
            }

            series[artifact.key].series = populateCategorySeriesData(artifact.categories, series[artifact.key].series);
            series[artifact.key].build = setCategorySeriesData(artifact.categories, {});
            series[artifact.key].categories.push(build.build_num);
            series[artifact.key].budget = artifact.budget;
        });
    });

    return series;
}

export function calculateTrendForSeries(taggedSeries: TaggedBuildDataInterface): TaggedBuildDataInterface {
    forEach(taggedSeries, (data: TaggedBuildDataSeriesInterface) => {
        const categories = data.series;
        forEach(categories, (series: number[], category: string) => {
            data.trend[category] = getTrendForSeries(series);
        });
    });

    return taggedSeries;
}
