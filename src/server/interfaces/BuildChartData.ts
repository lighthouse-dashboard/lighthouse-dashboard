export interface BuildChartData {
    columns: BuildChartRowsData;
    categories: string[];
}

export interface BuildChartRowsData {
    [key: string]: Array<string | number>[];
}
