import {Budget} from "@dreipol/lighthouse-config";

export interface ProjectSeriesData {
    [key: string]: ProjectArtifactTagData
}

export interface ProjectArtifactTagData {
    tag: string;
    url: string;
    series: ReportDataSeries;
    build: CategoriesScore;
    categories: number[];
    budget: Budget,
    trend: CategoriesScore
}

export interface CategoriesScore {
    [key: string]: number;
}



export interface ReportDataSeries {
    [key: string]: number[];
}
