export interface BarChartData {
    labels: string[];
    datasets: BarChartDataSet[];
}

export interface BarChartDataSet {
    name: string,
    values: number[]
}
