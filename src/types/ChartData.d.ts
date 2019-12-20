export interface ChartData {
    labels: string[];
    datasets: ChartDataDataSet[];
}

export interface ChartDataDataSet {
    label: string;
    date: number[];
}
