import BudgetInterface from "@dreipol/lighthouse-runner/dist/Interfaces/BudgetInterface";

export interface ProjectSeriesData {
    [key: string]: ProjectArtifactTagData
}

export interface ProjectArtifactTagData {
    tag: string;
    url: string;
    series: ReportDataSeries;
    build: CategoriesScore;
    categories: number[];
    budget: BudgetInterface,
    trend: CategoriesScore
}

export interface CategoriesScore {
    [key: string]: number;
}



export interface ReportDataSeries {
    [key: string]: number[];
}
