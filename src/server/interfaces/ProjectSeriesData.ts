export interface ProjectSeriesData {
    [key: string]: ProjectArtifactTagData
}

export interface ProjectArtifactTagData {
    series: ReportDataSeries;
    build: CategoriesScore;
    categories: number[];
    budget: Budget,
    trend: CategoriesScore
}

export interface CategoriesScore {
    [key: string]: number;
}

export interface Budget {
    [key: string]: number;
}


export interface ReportDataSeries {
    [key: string]: number[];
}